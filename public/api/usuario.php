<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', '/tmp/php_errors.log');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'u624785608_simplyenglish';
$username = 'u624785608_spenglish';
$password = 'SPAdmon2025#';

// Configuración de Telegram
$bot_token = "8270319060:AAEhvFemccYqqLLveb8X9t8m3NT9YGQaTQM";
$chat_id = "-4831902561";

function logDebug($message) {
    error_log('[USUARIO_API_DEBUG] ' . $message);
}

function sendTelegramMessage($bot_token, $chat_id, $message) {
    $telegram_data = [
        'chat_id' => $chat_id,
        'text' => $message,
        'parse_mode' => 'Markdown'
    ];

    $telegram_url = "https://api.telegram.org/bot$bot_token/sendMessage";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $telegram_url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($telegram_data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    curl_close($ch);

    if ($curl_error) {
        logDebug('Error cURL Telegram: ' . $curl_error);
        return false;
    }

    $telegram_response = json_decode($response, true);
    
    if ($http_code !== 200 || !$telegram_response['ok']) {
        logDebug('Error respuesta Telegram: ' . $response);
        return false;
    }

    return true;
}

try {
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
    ];
    
    $pdo = new PDO($dsn, $username, $password, $options);
    logDebug('Conexión exitosa a la base de datos');
    
    $request_uri = $_SERVER['REQUEST_URI'];
    $path = parse_url($request_uri, PHP_URL_PATH);
    $query = parse_url($request_uri, PHP_URL_QUERY);
    
    // Extraer el email de la URL: ?email={email} o /api/usuario/{email}
    $email = null;
    
    // Método 1: Query parameter (?email=...)
    if ($query) {
        parse_str($query, $params);
        if (isset($params['email'])) {
            $email = $params['email'];
        }
    }
    
    // Método 2: Path parameter (/api/usuario/{email})
    if (!$email) {
        $path_parts = explode('/', trim($path, '/'));
        if (count($path_parts) >= 3 && $path_parts[1] === 'usuario') {
            $email = urldecode($path_parts[2]);
        }
    }
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && $email) {
        logDebug('Buscando usuario con email: ' . $email);
        buscarUsuario($pdo, $email);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Datos JSON inválidos']);
            exit();
        }
        
        if (isset($input['action'])) {
            switch ($input['action']) {
                case 'crear_suscripcion':
                    crearSuscripcion($pdo, $input, $bot_token, $chat_id);
                    break;
                case 'confirmar_pago':
                    confirmarPago($pdo, $input, $bot_token, $chat_id);
                    break;
                case 'obtener_opciones':
                    obtenerOpciones($pdo, $input);
                    break;
                default:
                    http_response_code(400);
                    echo json_encode(['success' => false, 'error' => 'Acción no válida']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Acción requerida']);
        }
        
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Endpoint no válido']);
    }

} catch (Exception $e) {
    logDebug('Error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error interno del servidor',
        'debug' => $e->getMessage()
    ]);
}

function buscarUsuario($pdo, $email) {
    try {
        // Buscar usuario básico
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ? AND activo = 1");
        $stmt->execute([$email]);
        $usuario = $stmt->fetch();
        
        if (!$usuario) {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'error' => 'Usuario no encontrado'
            ]);
            return;
        }
        
        logDebug('Usuario encontrado: ' . $usuario['nombre']);
        
        // Usar la vista para obtener información completa
        $stmt = $pdo->prepare("SELECT * FROM vista_usuario_completo WHERE email = ?");
        $stmt->execute([$email]);
        $usuario_completo = $stmt->fetch();
        
        // Obtener opciones de pago disponibles
        $opciones_pago = obtenerOpcionesPago($pdo, $usuario['id']);
        
        // Obtener historial de suscripciones completadas
        $stmt = $pdo->prepare("
            SELECT s.*, tp.codigo, tp.nombre as programa_nombre, tp.categoria,
                   s.nivel_inicio, s.nivel_fin, s.fecha_inicio, s.fecha_fin
            FROM suscripciones s
            JOIN tipos_programa tp ON s.tipo_programa_id = tp.id
            WHERE s.usuario_id = ? AND s.estado = 'COMPLETADA'
            ORDER BY s.fecha_fin DESC
        ");
        $stmt->execute([$usuario['id']]);
        $historial = $stmt->fetchAll();
        
        echo json_encode([
            'success' => true,
            'data' => [
                'usuario' => $usuario_completo,
                'opciones_pago' => $opciones_pago,
                'historial_completado' => $historial,
                'puede_pagar' => count($opciones_pago) > 0,
                'mensaje_estado' => generarMensajeEstado($usuario_completo, $opciones_pago)
            ]
        ]);
        
    } catch (Exception $e) {
        logDebug('Error al buscar usuario: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error al buscar usuario'
        ]);
    }
}

function obtenerOpcionesPago($pdo, $usuario_id) {
    try {
        // Obtener información del usuario
        $stmt = $pdo->prepare("
            SELECT nivel_conocer_completado, 
                   (SELECT COUNT(*) FROM suscripciones WHERE usuario_id = ? AND estado = 'ACTIVA') as tiene_suscripcion_activa,
                   (SELECT COUNT(*) FROM suscripciones s JOIN pagos p ON s.id = p.suscripcion_id 
                    WHERE s.usuario_id = ? AND s.estado = 'PENDIENTE' AND p.estado = 'PENDIENTE') as tiene_pago_pendiente
            FROM usuarios WHERE id = ?
        ");
        $stmt->execute([$usuario_id, $usuario_id, $usuario_id]);
        $usuario_info = $stmt->fetch();
        
        if (!$usuario_info) {
            return [];
        }
        
        $nivel_completado = (int)$usuario_info['nivel_conocer_completado'];
        $tiene_suscripcion_activa = (int)$usuario_info['tiene_suscripcion_activa'] > 0;
        $tiene_pago_pendiente = (int)$usuario_info['tiene_pago_pendiente'] > 0;
        
        // Si tiene suscripción activa (pagada), no puede comprar más
        if ($tiene_suscripcion_activa) {
            return [];
        }
        
        // Si tiene pago pendiente, mostrar las mismas opciones para que pueda pagar
        // No bloquear las opciones si solo tiene pago pendiente
        
        $opciones = [];
        
        if ($nivel_completado < 8) {
            // Obtener precios actuales
            $stmt = $pdo->prepare("SELECT * FROM tipos_programa WHERE codigo IN ('CONOCER_INDIVIDUAL', 'CONOCER_PAQUETE')");
            $stmt->execute();
            $programas = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $precio_individual = 0;
            $precio_paquete = 0;
            foreach ($programas as $programa) {
                if ($programa['codigo'] === 'CONOCER_INDIVIDUAL') {
                    $precio_individual = $programa['precio'];
                }
                if ($programa['codigo'] === 'CONOCER_PAQUETE') {
                    $precio_paquete = $programa['precio'];
                }
            }
            
            $siguiente_nivel = $nivel_completado + 1;
            
            // Opción individual
            $opciones[] = [
                'tipo' => 'CONOCER_INDIVIDUAL',
                'codigo' => 'CONOCER_INDIVIDUAL',
                'nombre' => "CONOCER Nivel $siguiente_nivel",
                'descripcion' => "Acceso al nivel $siguiente_nivel de CONOCER",
                'precio' => $precio_individual,
                'nivel_inicio' => $siguiente_nivel,
                'nivel_fin' => $siguiente_nivel,
                'duracion_meses' => 1,
                'categoria' => 'CONOCER_INDIVIDUAL'
            ];
            
            // Opción paquete (si puede tomar 3 niveles sin pasar del 8)
            if ($siguiente_nivel + 2 <= 8) {
                $nivel_fin_paquete = $siguiente_nivel + 2;
                $opciones[] = [
                    'tipo' => 'CONOCER_PAQUETE',
                    'codigo' => 'CONOCER_PAQUETE',
                    'nombre' => "Paquete CONOCER Niveles $siguiente_nivel-$nivel_fin_paquete",
                    'descripcion' => "Acceso a 3 niveles consecutivos de CONOCER",
                    'precio' => $precio_paquete,
                    'nivel_inicio' => $siguiente_nivel,
                    'nivel_fin' => $nivel_fin_paquete,
                    'duracion_meses' => 3,
                    'categoria' => 'CONOCER_PAQUETE',
                    'ahorro' => ($precio_individual * 3) - $precio_paquete
                ];
            }
        } else {
            // Ya completó CONOCER, puede tomar CENNI
            $stmt = $pdo->prepare("SELECT * FROM tipos_programa WHERE categoria = 'CENNI' ORDER BY precio ASC");
            $stmt->execute();
            $programas_cenni = $stmt->fetchAll();
            
            foreach ($programas_cenni as $programa) {
                $opciones[] = [
                    'tipo' => 'CENNI',
                    'codigo' => $programa['codigo'],
                    'nombre' => $programa['nombre'],
                    'descripcion' => $programa['descripcion'],
                    'precio' => $programa['precio'],
                    'categoria' => 'CENNI'
                ];
            }
        }
        
        return $opciones;
        
    } catch (Exception $e) {
        logDebug('Error al obtener opciones de pago: ' . $e->getMessage());
        return [];
    }
}

function generarMensajeEstado($usuario, $opciones) {
    if (!$usuario) return "Usuario no encontrado";
    
    $nivel_completado = (int)$usuario['nivel_conocer_completado'];
    
    // Verificar si tiene pago pendiente
    if ($usuario['pago_activo_id'] && $usuario['estado_pago'] === 'PENDIENTE') {
        return "Tienes un pago pendiente. Completa tu pago para activar tu suscripción o selecciona una nueva opción.";
    }
    
    switch ($usuario['estado_estudiante']) {
        case 'PUEDE_EMPEZAR_NIVEL_1':
            return "¡Bienvenido! Puedes empezar tu aprendizaje desde el Nivel 1 de CONOCER.";
        
        case 'PUEDE_CONTINUAR_SIGUIENTE_NIVEL':
            $siguiente = $nivel_completado + 1;
            return "¡Excelente progreso! Has completado el nivel $nivel_completado. Puedes continuar con el nivel $siguiente.";
        
        case 'PUEDE_TOMAR_CENNI':
            return "¡Felicidades! Has completado todos los niveles CONOCER. Ahora puedes obtener tu certificación CENNI.";
        
        case 'PAGO_PENDIENTE':
            return "Tienes un pago pendiente. Completa tu pago para activar tu suscripción.";
        
        case 'CURSANDO_ACTUALMENTE':
            $nivel_actual = $usuario['nivel_conocer_actual'] ?? $usuario['nivel_inicio'];
            return "Actualmente estás cursando el nivel $nivel_actual. ¡Sigue adelante!";
        
        default:
            return "Contacta a un asesor para obtener información sobre tu siguiente paso.";
    }
}

function crearSuscripcion($pdo, $data, $bot_token, $chat_id) {
    try {
        if (empty($data['usuario_id']) || empty($data['tipo_programa']) || empty($data['nivel_inicio'])) {
            throw new Exception('Datos insuficientes para crear suscripción');
        }
        
        $pdo->beginTransaction();
        
        // Obtener información del programa
        $stmt = $pdo->prepare("SELECT * FROM tipos_programa WHERE codigo = ?");
        $stmt->execute([$data['tipo_programa']]);
        $programa = $stmt->fetch();
        
        if (!$programa) {
            throw new Exception('Programa no encontrado');
        }
        
        // Verificar suscripciones existentes
        $stmt = $pdo->prepare("
            SELECT s.*, p.estado as estado_pago 
            FROM suscripciones s 
            LEFT JOIN pagos p ON s.id = p.suscripcion_id 
            WHERE s.usuario_id = ? AND s.estado IN ('ACTIVA', 'PENDIENTE')
            ORDER BY s.fecha_creacion DESC
        ");
        $stmt->execute([$data['usuario_id']]);
        $suscripcion_existente = $stmt->fetch();
        
        if ($suscripcion_existente) {
            // Si hay suscripción ACTIVA (pagada), no permitir nueva
            if ($suscripcion_existente['estado'] === 'ACTIVA') {
                throw new Exception('El usuario ya tiene una suscripción activa');
            }
            
            // Si hay suscripción PENDIENTE (sin pagar), cancelarla y crear nueva
            if ($suscripcion_existente['estado'] === 'PENDIENTE') {
                logDebug('Cancelando suscripción pendiente existente: ' . $suscripcion_existente['id']);
                
                // Cancelar suscripción pendiente
                $stmt = $pdo->prepare("UPDATE suscripciones SET estado = 'CANCELADA' WHERE id = ?");
                $stmt->execute([$suscripcion_existente['id']]);
                
                // Cancelar pago pendiente asociado
                $stmt = $pdo->prepare("UPDATE pagos SET estado = 'CANCELADO' WHERE suscripcion_id = ? AND estado = 'PENDIENTE'");
                $stmt->execute([$suscripcion_existente['id']]);
                
                logDebug('Suscripción y pago pendientes cancelados exitosamente');
            }
        }
        
        // Crear nueva suscripción
        $fecha_inicio = date('Y-m-d');
        $fecha_fin = null;
        if ($programa['duracion_meses']) {
            $fecha_fin = date('Y-m-d', strtotime("+{$programa['duracion_meses']} months"));
        }
        
        $nivel_inicio = (int)$data['nivel_inicio'];
        $nivel_fin = isset($data['nivel_fin']) ? (int)$data['nivel_fin'] : $nivel_inicio;
        
        $stmt = $pdo->prepare("
            INSERT INTO suscripciones 
            (usuario_id, tipo_programa_id, nivel_inicio, nivel_fin, fecha_inicio, fecha_fin, estado) 
            VALUES (?, ?, ?, ?, ?, ?, 'PENDIENTE')
        ");
        
        $stmt->execute([
            $data['usuario_id'],
            $programa['id'],
            $nivel_inicio,
            $nivel_fin,
            $fecha_inicio,
            $fecha_fin
        ]);
        
        $suscripcion_id = $pdo->lastInsertId();
        logDebug('Nueva suscripción creada con ID: ' . $suscripcion_id);
        
        // Crear nuevo pago pendiente
        $stmt = $pdo->prepare("
            INSERT INTO pagos 
            (usuario_id, suscripcion_id, tipo_programa_id, monto, estado) 
            VALUES (?, ?, ?, ?, 'PENDIENTE')
        ");
        
        $stmt->execute([
            $data['usuario_id'],
            $suscripcion_id,
            $programa['id'],
            $programa['precio']
        ]);
        
        $pago_id = $pdo->lastInsertId();
        logDebug('Nuevo pago creado con ID: ' . $pago_id);
        
        $pdo->commit();
        
        // Enviar notificación a Telegram
        $stmt = $pdo->prepare("SELECT nombre, apellido_paterno, email FROM usuarios WHERE id = ?");
        $stmt->execute([$data['usuario_id']]);
        $usuario = $stmt->fetch();
        
        $accion_realizada = $suscripcion_existente ? "NUEVA SUSCRIPCIÓN (Reemplazó pendiente)" : "NUEVA SUSCRIPCIÓN";
        
        $mensaje_telegram = "💳 *$accion_realizada*\n\n";
        $mensaje_telegram .= "👤 *Usuario:* {$usuario['nombre']} {$usuario['apellido_paterno']}\n";
        $mensaje_telegram .= "📧 *Email:* {$usuario['email']}\n";
        $mensaje_telegram .= "📚 *Programa:* {$programa['nombre']}\n";
        if ($programa['categoria'] !== 'CENNI') {
            $mensaje_telegram .= "🎯 *Niveles:* $nivel_inicio";
            if ($nivel_fin > $nivel_inicio) {
                $mensaje_telegram .= " al $nivel_fin";
            }
            $mensaje_telegram .= "\n";
        }
        $mensaje_telegram .= "💰 *Monto:* $" . number_format($programa['precio'], 2) . " MXN\n";
        $mensaje_telegram .= "📅 *Fecha:* " . date('d/m/Y H:i:s') . "\n";
        $mensaje_telegram .= "🆔 *Suscripción ID:* $suscripcion_id\n";
        $mensaje_telegram .= "🆔 *Pago ID:* $pago_id\n\n";
        
        if ($suscripcion_existente) {
            $mensaje_telegram .= "📝 *Nota:* Se canceló automáticamente la suscripción pendiente anterior\n";
        }
        
        $mensaje_telegram .= "⏰ *Estado:* Pendiente de pago\n";
        $mensaje_telegram .= "━━━━━━━━━━━━━━━━━━━━";
        
        sendTelegramMessage($bot_token, $chat_id, $mensaje_telegram);
        
        echo json_encode([
            'success' => true,
            'data' => [
                'suscripcion_id' => $suscripcion_id,
                'pago_id' => $pago_id,
                'monto' => $programa['precio'],
                'programa' => $programa['nombre'],
                'referencia' => "SE-" . str_pad($pago_id, 6, '0', STR_PAD_LEFT),
                'accion' => $suscripcion_existente ? 'reemplazada' : 'creada'
            ]
        ]);
        
    } catch (Exception $e) {
        $pdo->rollback();
        logDebug('Error al crear suscripción: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error al crear suscripción: ' . $e->getMessage()
        ]);
    }
}

function confirmarPago($pdo, $data, $bot_token, $chat_id) {
    try {
        if (empty($data['pago_id'])) {
            throw new Exception('ID de pago requerido');
        }
        
        $pdo->beginTransaction();
        
        // Obtener información del pago
        $stmt = $pdo->prepare("
            SELECT p.*, s.usuario_id, s.tipo_programa_id, s.nivel_inicio, s.nivel_fin,
                   u.nombre, u.apellido_paterno, u.email,
                   tp.nombre as programa_nombre, tp.categoria
            FROM pagos p
            JOIN suscripciones s ON p.suscripcion_id = s.id
            JOIN usuarios u ON s.usuario_id = u.id
            JOIN tipos_programa tp ON s.tipo_programa_id = tp.id
            WHERE p.id = ?
        ");
        $stmt->execute([$data['pago_id']]);
        $pago_info = $stmt->fetch();
        
        if (!$pago_info) {
            throw new Exception('Pago no encontrado');
        }
        
        // Actualizar estado del pago
        $stmt = $pdo->prepare("
            UPDATE pagos 
            SET estado = 'COMPLETADO', 
                fecha_pago = NOW(),
                metodo_pago = ?,
                referencia_externa = ?,
                datos_openpay = ?
            WHERE id = ?
        ");
        
        $stmt->execute([
            $data['metodo_pago'] ?? 'MANUAL',
            $data['referencia_externa'] ?? null,
            isset($data['datos_openpay']) ? json_encode($data['datos_openpay']) : null,
            $data['pago_id']
        ]);
        
        // Activar suscripción
        $stmt = $pdo->prepare("
            UPDATE suscripciones 
            SET estado = 'ACTIVA'
            WHERE id = ?
        ");
        $stmt->execute([$pago_info['suscripcion_id']]);
        
        // Actualizar nivel del usuario si es CONOCER
        if ($pago_info['categoria'] === 'CONOCER_INDIVIDUAL' || $pago_info['categoria'] === 'CONOCER_PAQUETE') {
            $stmt = $pdo->prepare("
                UPDATE usuarios 
                SET nivel_conocer_actual = ?
                WHERE id = ?
            ");
            $stmt->execute([$pago_info['nivel_inicio'], $pago_info['usuario_id']]);
        }
        
        $pdo->commit();
        
        // Enviar notificación a Telegram
        $mensaje_telegram = "✅ *PAGO CONFIRMADO*\n\n";
        $mensaje_telegram .= "👤 *Usuario:* {$pago_info['nombre']} {$pago_info['apellido_paterno']}\n";
        $mensaje_telegram .= "📧 *Email:* {$pago_info['email']}\n";
        $mensaje_telegram .= "📚 *Programa:* {$pago_info['programa_nombre']}\n";
        if ($pago_info['categoria'] !== 'CENNI') {
            $mensaje_telegram .= "🎯 *Niveles:* {$pago_info['nivel_inicio']}";
            if ($pago_info['nivel_fin'] > $pago_info['nivel_inicio']) {
                $mensaje_telegram .= " al {$pago_info['nivel_fin']}";
            }
            $mensaje_telegram .= "\n";
        }
        $mensaje_telegram .= "💰 *Monto:* $" . number_format($pago_info['monto'], 2) . " MXN\n";
        $mensaje_telegram .= "📅 *Fecha Pago:* " . date('d/m/Y H:i:s') . "\n";
        $mensaje_telegram .= "🆔 *Pago ID:* {$data['pago_id']}\n\n";
        $mensaje_telegram .= "🎉 *Estado:* ¡ACTIVO! El estudiante puede comenzar.\n";
        $mensaje_telegram .= "━━━━━━━━━━━━━━━━━━━━";
        
        sendTelegramMessage($bot_token, $chat_id, $mensaje_telegram);
        
        echo json_encode([
            'success' => true,
            'message' => 'Pago confirmado exitosamente',
            'data' => [
                'pago_id' => $data['pago_id'],
                'estado' => 'COMPLETADO',
                'suscripcion_activa' => true
            ]
        ]);
        
    } catch (Exception $e) {
        $pdo->rollback();
        logDebug('Error al confirmar pago: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error al confirmar pago: ' . $e->getMessage()
        ]);
    }
}

function obtenerOpciones($pdo, $data) {
    try {
        if (empty($data['usuario_id'])) {
            throw new Exception('ID de usuario requerido');
        }
        
        $opciones = obtenerOpcionesPago($pdo, $data['usuario_id']);
        
        echo json_encode([
            'success' => true,
            'data' => $opciones
        ]);
        
    } catch (Exception $e) {
        logDebug('Error al obtener opciones: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error al obtener opciones'
        ]);
    }
}

logDebug('Script finalizado');
?>