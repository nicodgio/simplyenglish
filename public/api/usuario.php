<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$dbname = 'simplyen_simplyenglish';
$username = 'simplyen_admon';
$password = 'corsu5-Munkyg-xaxpyc';

function sendResponse($data) {
    echo json_encode($data);
    exit();
}

function logError($message) {
    error_log('[USUARIO_API] ' . $message);
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    $email = null;
    if (isset($_GET['email'])) {
        $email = $_GET['email'];
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET' && $email) {
        buscarUsuario($pdo, $email);
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || !isset($input['action'])) {
            sendResponse(['success' => false, 'error' => 'Acción requerida']);
        }

        if ($input['action'] === 'crear_suscripcion') {
            crearSuscripcion($pdo, $input);
        } else {
            sendResponse(['success' => false, 'error' => 'Acción no válida']);
        }
    }

    sendResponse(['success' => false, 'error' => 'Endpoint no válido']);

} catch (Exception $e) {
    logError('Error general: ' . $e->getMessage());
    sendResponse([
        'success' => false,
        'error' => 'Error interno del servidor',
        'debug' => $e->getMessage()
    ]);
}

function buscarUsuario($pdo, $email) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ? AND activo = 1");
        $stmt->execute([$email]);
        $usuario = $stmt->fetch();

        if (!$usuario) {
            sendResponse(['success' => false, 'error' => 'Usuario no encontrado']);
        }

        $usuario_completo = construirDatosUsuario($pdo, $usuario);
        
        // Verificar si tiene pagos completados o suscripciones activas
        $stmt_activa = $pdo->prepare("
            SELECT COUNT(*) as tiene_activa 
            FROM pagos p
            LEFT JOIN suscripciones s ON p.suscripcion_id = s.id
            WHERE p.usuario_id = ? AND (p.estado = 'COMPLETADO' OR s.estado = 'ACTIVA')
        ");
        $stmt_activa->execute([$usuario['id']]);
        $activa_info = $stmt_activa->fetch();

        if ($activa_info['tiene_activa'] > 0) {
            sendResponse([
                'success' => true,
                'data' => [
                    'usuario' => $usuario_completo,
                    'puede_pagar' => false,
                    'opciones_pago' => [],
                    'suscripciones' => [['estado' => 'ACTIVA']],
                    'mensaje_estado' => 'Su suscripción académica se encuentra ACTIVA. No requiere procesamiento de pagos adicionales.'
                ]
            ]);
        }
        
        $opciones_pago = obtenerOpcionesPago($pdo, $usuario['id']);
        $suscripcion_activa = obtenerSuscripcionActiva($pdo, $usuario['id']);

        if ($suscripcion_activa) {
            sendResponse([
                'success' => true,
                'data' => [
                    'usuario' => $usuario_completo,
                    'opciones_pago' => [],
                    'suscripcion_activa' => $suscripcion_activa,
                    'puede_pagar' => false,
                    'mensaje_estado' => 'Su suscripción académica se encuentra ACTIVA. No requiere procesamiento de pagos adicionales.'
                ]
            ]);
        } elseif ($usuario_completo['pago_activo_id'] && $usuario_completo['estado_pago'] === 'PENDIENTE') {
            sendResponse([
                'success' => true,
                'data' => [
                    'usuario' => $usuario_completo,
                    'opciones_pago' => [],
                    'puede_pagar' => false,
                    'mensaje_estado' => 'Se ha identificado un proceso de pago pendiente. Complete la transacción para activar su suscripción académica.'
                ]
            ]);
        } elseif (count($opciones_pago) > 0) {
            sendResponse([
                'success' => true,
                'data' => [
                    'usuario' => $usuario_completo,
                    'opciones_pago' => $opciones_pago,
                    'puede_pagar' => true,
                    'mensaje_estado' => generarMensajeEstado($usuario_completo, $opciones_pago)
                ]
            ]);
        } else {
            sendResponse([
                'success' => true,
                'data' => [
                    'usuario' => $usuario_completo,
                    'opciones_pago' => [],
                    'puede_pagar' => false,
                    'mensaje_estado' => 'No se encontraron opciones de pago disponibles. Contacte a un asesor para más información.'
                ]
            ]);
        }

    } catch (Exception $e) {
        logError('Error buscando usuario: ' . $e->getMessage());
        sendResponse([
            'success' => false,
            'error' => 'Error al buscar usuario',
            'debug' => $e->getMessage()
        ]);
    }
}

function obtenerSuscripcionActiva($pdo, $usuario_id) {
    try {
        $stmt = $pdo->prepare("
            SELECT s.*, tp.nombre as programa_nombre, tp.descripcion as programa_descripcion
            FROM suscripciones s
            LEFT JOIN tipos_programa tp ON s.tipo_programa_id = tp.id
            WHERE s.usuario_id = ? AND s.estado = 'ACTIVA'
            ORDER BY s.fecha_inicio DESC
            LIMIT 1
        ");
        $stmt->execute([$usuario_id]);
        return $stmt->fetch();
    } catch (Exception $e) {
        logError('Error obteniendo suscripción activa: ' . $e->getMessage());
        return null;
    }
}

function construirDatosUsuario($pdo, $usuario) {
    $usuario_completo = $usuario;
    
    $stmt = $pdo->prepare("SELECT id, estado FROM pagos WHERE usuario_id = ? AND estado = 'PENDIENTE' ORDER BY fecha_creacion DESC LIMIT 1");
    $stmt->execute([$usuario['id']]);
    $pago_pendiente = $stmt->fetch();
    
    $usuario_completo['pago_activo_id'] = $pago_pendiente ? $pago_pendiente['id'] : null;
    $usuario_completo['estado_pago'] = $pago_pendiente ? $pago_pendiente['estado'] : null;
    
    $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM suscripciones WHERE usuario_id = ? AND estado = 'ACTIVA'");
    $stmt->execute([$usuario['id']]);
    $tiene_activa = $stmt->fetch()['count'] > 0;
    
    $stmt = $pdo->prepare("SELECT estado, fecha_pago FROM pagos WHERE usuario_id = ? AND estado = 'COMPLETADO' ORDER BY fecha_pago DESC LIMIT 1");
    $stmt->execute([$usuario['id']]);
    $ultimo_pago_completado = $stmt->fetch();
    
    $nivel_completado = intval($usuario['nivel_conocer_completado'] ?? 0);
    
    if ($tiene_activa) {
        $usuario_completo['estado_estudiante'] = 'CURSANDO_ACTUALMENTE';
        if ($ultimo_pago_completado) {
            $usuario_completo['ultimo_pago_fecha'] = $ultimo_pago_completado['fecha_pago'];
        }
    } elseif ($pago_pendiente) {
        $usuario_completo['estado_estudiante'] = 'PAGO_PENDIENTE';
    } elseif ($nivel_completado == 0) {
        $usuario_completo['estado_estudiante'] = 'PUEDE_EMPEZAR_NIVEL_1';
    } elseif ($nivel_completado < 8) {
        $usuario_completo['estado_estudiante'] = 'PUEDE_CONTINUAR_SIGUIENTE_NIVEL';
    } else {
        $usuario_completo['estado_estudiante'] = 'PUEDE_TOMAR_CENNI';
    }
    
    return $usuario_completo;
}

function obtenerOpcionesPago($pdo, $usuario_id) {
    try {
        $stmt = $pdo->prepare("
            SELECT nivel_conocer_completado, 
                   (SELECT COUNT(*) FROM suscripciones WHERE usuario_id = ? AND estado = 'ACTIVA') as tiene_activa
            FROM usuarios WHERE id = ?
        ");
        $stmt->execute([$usuario_id, $usuario_id]);
        $info = $stmt->fetch();
        
        if (!$info) {
            return [];
        }
        
        if ($info['tiene_activa'] > 0) {
            return [];
        }
        
        $nivel_completado = intval($info['nivel_conocer_completado'] ?? 0);
        $opciones = [];
        
        if ($nivel_completado < 8) {
            $stmt = $pdo->prepare("SELECT * FROM tipos_programa WHERE activo = 1 AND categoria IN ('CONOCER_INDIVIDUAL', 'CONOCER_PAQUETE')");
            $stmt->execute();
            $programas = $stmt->fetchAll();
            
            $siguiente_nivel = $nivel_completado + 1;
            
            foreach ($programas as $programa) {
                if ($programa['categoria'] === 'CONOCER_INDIVIDUAL') {
                    $opciones[] = [
                        'tipo' => 'CONOCER_INDIVIDUAL',
                        'codigo' => $programa['codigo'],
                        'nombre' => "CONOCER Nivel $siguiente_nivel",
                        'descripcion' => "Acceso al nivel $siguiente_nivel de CONOCER",
                        'precio' => floatval($programa['precio']),
                        'nivel_inicio' => $siguiente_nivel,
                        'nivel_fin' => $siguiente_nivel,
                        'categoria' => 'CONOCER_INDIVIDUAL'
                    ];
                } elseif ($programa['categoria'] === 'CONOCER_PAQUETE' && $siguiente_nivel + 2 <= 8) {
                    $nivel_fin = $siguiente_nivel + 2;
                    $opciones[] = [
                        'tipo' => 'CONOCER_PAQUETE',
                        'codigo' => $programa['codigo'],
                        'nombre' => "Paquete CONOCER Niveles $siguiente_nivel-$nivel_fin",
                        'descripcion' => "Acceso a 3 niveles consecutivos de CONOCER",
                        'precio' => floatval($programa['precio']),
                        'nivel_inicio' => $siguiente_nivel,
                        'nivel_fin' => $nivel_fin,
                        'categoria' => 'CONOCER_PAQUETE'
                    ];
                }
            }
        } else {
            $stmt = $pdo->prepare("SELECT * FROM tipos_programa WHERE activo = 1 AND categoria = 'CENNI'");
            $stmt->execute();
            $programas_cenni = $stmt->fetchAll();
            
            foreach ($programas_cenni as $programa) {
                $opciones[] = [
                    'tipo' => 'CENNI',
                    'codigo' => $programa['codigo'],
                    'nombre' => $programa['nombre'],
                    'descripcion' => $programa['descripcion'],
                    'precio' => floatval($programa['precio']),
                    'categoria' => 'CENNI'
                ];
            }
        }
        
        return $opciones;
        
    } catch (Exception $e) {
        logError('Error obteniendo opciones: ' . $e->getMessage());
        return [];
    }
}

function generarMensajeEstado($usuario, $opciones) {
    if (!$usuario) return "Usuario no encontrado";
    
    $nivel_completado = intval($usuario['nivel_conocer_completado'] ?? 0);
    
    if ($usuario['pago_activo_id'] && $usuario['estado_pago'] === 'PENDIENTE') {
        return "Tienes un pago pendiente. Completa tu pago para activar tu suscripción.";
    }
    
    switch ($usuario['estado_estudiante'] ?? 'DESCONOCIDO') {
        case 'PUEDE_EMPEZAR_NIVEL_1':
            return "Bienvenido. Puedes empezar tu aprendizaje desde el Nivel 1 de CONOCER.";
        case 'PUEDE_CONTINUAR_SIGUIENTE_NIVEL':
            $siguiente = $nivel_completado + 1;
            return "Has completado el nivel $nivel_completado. Puedes continuar con el nivel $siguiente.";
        case 'PUEDE_TOMAR_CENNI':
            return "Has completado todos los niveles CONOCER. Ahora puedes obtener tu certificación CENNI.";
        case 'PAGO_PENDIENTE':
            return "Tienes un pago pendiente. Completa tu pago para activar tu suscripción.";
        case 'CURSANDO_ACTUALMENTE':
            return "Tienes una suscripción activa. Continúa con tu aprendizaje.";
        default:
            return "Contacta a un asesor para obtener información sobre tu siguiente paso.";
    }
}

function crearSuscripcion($pdo, $data) {
    try {
        logError('Datos recibidos: ' . json_encode($data));
        
        if (empty($data['tipo_programa']) || empty($data['nivel_inicio'])) {
            sendResponse(['success' => false, 'error' => 'Faltan tipo_programa o nivel_inicio']);
        }
        
        $usuario_id = null;
        if (!empty($data['usuario_id'])) {
            $usuario_id = $data['usuario_id'];
        } elseif (!empty($data['email'])) {
            $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ? AND activo = 1");
            $stmt->execute([$data['email']]);
            $usuario = $stmt->fetch();
            if ($usuario) {
                $usuario_id = $usuario['id'];
            }
        }
        
        if (!$usuario_id) {
            sendResponse(['success' => false, 'error' => 'No se pudo identificar el usuario. Incluye usuario_id o email']);
        }
        
        $tipo_programa = $data['tipo_programa'];
        $nivel_inicio = intval($data['nivel_inicio']);
        $nivel_fin = isset($data['nivel_fin']) ? intval($data['nivel_fin']) : $nivel_inicio;
        
        $stmt = $pdo->prepare("SELECT * FROM tipos_programa WHERE codigo = ? AND activo = 1");
        $stmt->execute([$tipo_programa]);
        $programa = $stmt->fetch();
        
        if (!$programa) {
            sendResponse(['success' => false, 'error' => 'Tipo de programa no encontrado']);
        }
        
        $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM suscripciones WHERE usuario_id = ? AND estado = 'ACTIVA'");
        $stmt->execute([$usuario_id]);
        if ($stmt->fetch()['count'] > 0) {
            sendResponse(['success' => false, 'error' => 'El usuario ya tiene una suscripción activa']);
        }
        
        $stmt = $pdo->prepare("UPDATE suscripciones SET estado = 'CANCELADA' WHERE usuario_id = ? AND estado = 'PENDIENTE'");
        $stmt->execute([$usuario_id]);
        
        $stmt = $pdo->prepare("UPDATE pagos SET estado = 'CANCELADO' WHERE usuario_id = ? AND estado = 'PENDIENTE'");
        $stmt->execute([$usuario_id]);
        
        $stmt = $pdo->prepare("
            INSERT INTO suscripciones (usuario_id, tipo_programa_id, nivel_inicio, nivel_fin, estado, fecha_creacion) 
            VALUES (?, ?, ?, ?, 'PENDIENTE', NOW())
        ");
        $stmt->execute([$usuario_id, $programa['id'], $nivel_inicio, $nivel_fin]);
        $suscripcion_id = $pdo->lastInsertId();
        
        $stmt = $pdo->prepare("
            INSERT INTO pagos (usuario_id, suscripcion_id, tipo_programa_id, monto, estado, fecha_creacion) 
            VALUES (?, ?, ?, ?, 'PENDIENTE', NOW())
        ");
        $stmt->execute([$usuario_id, $suscripcion_id, $programa['id'], $programa['precio']]);
        $pago_id = $pdo->lastInsertId();
        
        sendResponse([
            'success' => true,
            'data' => [
                'suscripcion_id' => $suscripcion_id,
                'pago_id' => $pago_id,
                'monto' => $programa['precio'],
                'referencia' => "SE-" . str_pad($pago_id, 6, '0', STR_PAD_LEFT)
            ]
        ]);
        
    } catch (Exception $e) {
        logError('Error creando suscripción: ' . $e->getMessage());
        sendResponse([
            'success' => false,
            'error' => 'Error al crear suscripción',
            'debug' => $e->getMessage()
        ]);
    }
}
?>