<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Habilitar reporte de errores para debug
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', '/tmp/php_errors.log');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'u624785608_simplyenglish';
$username = 'u624785608_spenglish';
$password = 'SPAdmon2025#';

$jwt_secret = 'simply_english_jwt_secret_2025_very_secure_key';

// Configuración de Telegram
$bot_token = "8270319060:AAEhvFemccYqqLLveb8X9t8m3NT9YGQaTQM";
$chat_id = "-4952090570";

// Función para logging de debug
function logDebug($message) {
    error_log('[SIMPLY_ENGLISH_DEBUG] ' . $message);
}

// Función para validar email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Función para validar teléfono
function validatePhone($phone) {
    return preg_match('/^[\+]?[0-9\s\-\(\)]{10,}$/', $phone);
}

// Función para generar JWT (simplificada)
function generateJWT($userId, $email, $secret) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode([
        'userId' => $userId,
        'email' => $email,
        'iat' => time(),
        'exp' => time() + (7 * 24 * 60 * 60) // 7 días
    ]);
    
    $base64Header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    
    $signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, $secret, true);
    $base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    return $base64Header . "." . $base64Payload . "." . $base64Signature;
}

// Función para enviar mensaje a Telegram
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

    logDebug('Mensaje enviado a Telegram exitosamente');
    return true;
}

// Función para formatear los datos de registro para Telegram
function formatRegistrationMessage($data, $userId) {
    $programas_nombres = [
        'simply-mensual' => 'Simply English - Plan Mensual',
        'simply-trimestral' => 'Simply English - Plan Trimestral',
        'cenni-basico' => 'Certificación CENNI Básico',
        'cenni-plus' => 'Certificación CENNI Plus',
        'cenni-pro' => 'Certificación CENNI Pro'
    ];

    $niveles_nombres = [
        'principiante' => 'Principiante (A1)',
        'basico' => 'Básico (A2)',
        'intermedio-bajo' => 'Intermedio Bajo (B1)',
        'intermedio' => 'Intermedio (B2)',
        'avanzado' => 'Avanzado (C1)',
        'superior' => 'Superior (C2)',
        'no-se' => 'No está seguro (evaluación requerida)'
    ];

    $programa_texto = isset($programas_nombres[$data['programaInteres']]) 
        ? $programas_nombres[$data['programaInteres']] 
        : $data['programaInteres'];

    $nivel_texto = isset($niveles_nombres[$data['nivelActual']]) 
        ? $niveles_nombres[$data['nivelActual']] 
        : $data['nivelActual'];

    $fecha = date('d/m/Y H:i:s');

    $message = "🎉 *NUEVO REGISTRO DE ESTUDIANTE*\n\n";
    $message .= "👤 *Datos Personales:*\n";
    $message .= "• *Nombre:* {$data['nombre']} {$data['apellidoPaterno']}";
    if (!empty($data['apellidoMaterno'])) {
        $message .= " {$data['apellidoMaterno']}";
    }
    $message .= "\n";
    $message .= "• *Email:* {$data['email']}\n";
    $message .= "• *Teléfono:* {$data['telefono']}\n";
    $message .= "• *Fecha Nacimiento:* {$data['fechaNacimiento']}\n";
    
    if (!empty($data['genero'])) {
        $generos = [
            'masculino' => 'Masculino',
            'femenino' => 'Femenino',
            'otro' => 'Otro',
            'prefiero-no-decir' => 'Prefiere no decir'
        ];
        $genero_texto = isset($generos[$data['genero']]) ? $generos[$data['genero']] : $data['genero'];
        $message .= "• *Género:* $genero_texto\n";
    }

    $message .= "\n📍 *Ubicación:*\n";
    $message .= "• *Dirección:* {$data['direccion']}\n";
    $message .= "• *Ciudad:* {$data['ciudad']}, {$data['estado']}\n";
    $message .= "• *Código Postal:* {$data['codigoPostal']}\n";

    $message .= "\n🎓 *Información Académica:*\n";
    $message .= "• *Programa:* $programa_texto\n";
    $message .= "• *Nivel Actual:* $nivel_texto\n";

    if (!empty($data['horarioPreferencia'])) {
        $horarios = [
            '4pm-5pm' => '4:00 PM - 5:00 PM',
            '5pm-6pm' => '5:00 PM - 6:00 PM',
            '6pm-7pm' => '6:00 PM - 7:00 PM',
            '7pm-8pm' => '7:00 PM - 8:00 PM',
            '8pm-9pm' => '8:00 PM - 9:00 PM',
            'flexible' => 'Flexible'
        ];
        $horario_texto = isset($horarios[$data['horarioPreferencia']]) 
            ? $horarios[$data['horarioPreferencia']] 
            : $data['horarioPreferencia'];
        $message .= "• *Horario Preferido:* $horario_texto\n";
    }

    if (!empty($data['modalidadPreferencia'])) {
        $modalidades = [
            'online' => 'En línea',
            'presencial' => 'Presencial',
            'hibrida' => 'Híbrida',
            'sin-preferencia' => 'Sin preferencia'
        ];
        $modalidad_texto = isset($modalidades[$data['modalidadPreferencia']]) 
            ? $modalidades[$data['modalidadPreferencia']] 
            : $data['modalidadPreferencia'];
        $message .= "• *Modalidad:* $modalidad_texto\n";
    }

    if (!empty($data['experienciaPrevia'])) {
        $experiencia = strlen($data['experienciaPrevia']) > 100 
            ? substr($data['experienciaPrevia'], 0, 100) . '...' 
            : $data['experienciaPrevia'];
        $message .= "\n📚 *Experiencia Previa:*\n$experiencia\n";
    }

    if (!empty($data['objetivos'])) {
        $objetivos = strlen($data['objetivos']) > 100 
            ? substr($data['objetivos'], 0, 100) . '...' 
            : $data['objetivos'];
        $message .= "\n🎯 *Objetivos:*\n$objetivos\n";
    }

    $message .= "\n🆔 *ID Usuario:* $userId\n";
    $message .= "🕐 *Fecha Registro:* $fecha\n";
    $message .= "━━━━━━━━━━━━━━━━━━━━\n";
    $message .= "⏰ *Acción requerida:* Contactar en 24 horas para evaluación inicial";

    return $message;
}

logDebug('Script iniciado');

try {
    // Intentar conectar a la base de datos
    logDebug('Intentando conectar a la base de datos...');
    
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
    ];
    
    $pdo = new PDO($dsn, $username, $password, $options);
    logDebug('Conexión a base de datos exitosa');
    
    // Verificar que la tabla existe
    $tableCheck = $pdo->query("SHOW TABLES LIKE 'usuarios'");
    if ($tableCheck->rowCount() == 0) {
        logDebug('La tabla usuarios no existe, creándola...');
        
        // Crear tabla si no existe
        $createTable = "
        CREATE TABLE usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            apellido_paterno VARCHAR(100) NOT NULL,
            apellido_materno VARCHAR(100),
            email VARCHAR(150) NOT NULL UNIQUE,
            telefono VARCHAR(20) NOT NULL,
            fecha_nacimiento DATE NOT NULL,
            genero ENUM('masculino', 'femenino', 'otro', 'prefiero-no-decir'),
            direccion TEXT NOT NULL,
            ciudad VARCHAR(100) NOT NULL,
            estado VARCHAR(100) NOT NULL,
            codigo_postal VARCHAR(10) NOT NULL,
            programa_interes VARCHAR(100) NOT NULL,
            nivel_actual VARCHAR(50) NOT NULL,
            experiencia_previa TEXT,
            objetivos TEXT,
            horario_preferencia VARCHAR(50),
            modalidad_preferencia VARCHAR(50),
            fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            activo TINYINT(1) DEFAULT 1
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
        
        $pdo->exec($createTable);
        logDebug('Tabla usuarios creada exitosamente');
    } else {
        logDebug('Tabla usuarios existe');
    }
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        logDebug('Procesando petición POST');
        
        // Leer datos JSON
        $input = file_get_contents('php://input');
        logDebug('Input raw: ' . $input);
        
        $data = json_decode($input, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            logDebug('Error al decodificar JSON: ' . json_last_error_msg());
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Error en el formato de datos JSON'
            ]);
            exit();
        }
        
        logDebug('Datos decodificados: ' . print_r($data, true));
        
        // Validar campos obligatorios
        $required_fields = ['nombre', 'apellidoPaterno', 'email', 'telefono', 'fechaNacimiento', 
                           'direccion', 'ciudad', 'estado', 'codigoPostal', 'programaInteres', 'nivelActual'];
        
        $missing_fields = [];
        foreach ($required_fields as $field) {
            if (empty($data[$field])) {
                $missing_fields[] = $field;
            }
        }
        
        if (!empty($missing_fields)) {
            logDebug('Campos faltantes: ' . implode(', ', $missing_fields));
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Campos obligatorios faltantes: ' . implode(', ', $missing_fields)
            ]);
            exit();
        }
        
        // Validar email
        if (!validateEmail($data['email'])) {
            logDebug('Email inválido: ' . $data['email']);
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'El formato del email no es válido'
            ]);
            exit();
        }
        
        // Validar teléfono
        if (!validatePhone($data['telefono'])) {
            logDebug('Teléfono inválido: ' . $data['telefono']);
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'El formato del teléfono no es válido'
            ]);
            exit();
        }
        
        // Verificar si el usuario ya existe
        logDebug('Verificando si el email ya existe: ' . $data['email']);
        $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
        $stmt->execute([$data['email']]);
        
        if ($stmt->fetch()) {
            logDebug('Email ya registrado: ' . $data['email']);
            http_response_code(409);
            echo json_encode([
                'success' => false,
                'message' => 'Ya existe un usuario registrado con este email'
            ]);
            exit();
        }
        
        // Preparar datos para inserción
        $insertData = [
            $data['nombre'],
            $data['apellidoPaterno'],
            $data['apellidoMaterno'] ?? null,
            $data['email'],
            $data['telefono'],
            $data['fechaNacimiento'],
            $data['genero'] ?? null,
            $data['direccion'],
            $data['ciudad'],
            $data['estado'],
            $data['codigoPostal'],
            $data['programaInteres'],
            $data['nivelActual'],
            $data['experienciaPrevia'] ?? null,
            $data['objetivos'] ?? null,
            $data['horarioPreferencia'] ?? null,
            $data['modalidadPreferencia'] ?? null
        ];
        
        logDebug('Datos preparados para inserción: ' . print_r($insertData, true));
        
        // Insertar nuevo usuario
        $sql = "INSERT INTO usuarios (
            nombre, apellido_paterno, apellido_materno, email, telefono, 
            fecha_nacimiento, genero, direccion, ciudad, estado, codigo_postal,
            programa_interes, nivel_actual, experiencia_previa, objetivos,
            horario_preferencia, modalidad_preferencia, fecha_registro, activo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 1)";
        
        logDebug('Ejecutando query SQL');
        $stmt = $pdo->prepare($sql);
        $result = $stmt->execute($insertData);
        
        if ($result) {
            $userId = $pdo->lastInsertId();
            $token = generateJWT($userId, $data['email'], $jwt_secret);
            
            logDebug('Usuario insertado exitosamente con ID: ' . $userId);
            
            // Enviar notificación a Telegram
            logDebug('Enviando notificación a Telegram...');
            $telegram_message = formatRegistrationMessage($data, $userId);
            $telegram_sent = sendTelegramMessage($bot_token, $chat_id, $telegram_message);
            
            if (!$telegram_sent) {
                logDebug('Advertencia: No se pudo enviar notificación a Telegram');
            }
            
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Registro completado exitosamente',
                'data' => [
                    'userId' => (int)$userId,
                    'token' => $token,
                    'usuario' => [
                        'nombre' => $data['nombre'],
                        'apellidoPaterno' => $data['apellidoPaterno'],
                        'email' => $data['email'],
                        'programaInteres' => $data['programaInteres']
                    ]
                ]
            ]);
        } else {
            $errorInfo = $stmt->errorInfo();
            logDebug('Error al insertar usuario: ' . print_r($errorInfo, true));
            throw new Exception('Error al insertar usuario: ' . $errorInfo[2]);
        }
        
    } else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        logDebug('Procesando petición GET');
        
        // Endpoint para obtener usuarios (opcional)
        $stmt = $pdo->prepare("
            SELECT id, nombre, apellido_paterno, apellido_materno, email, telefono,
                   programa_interes, nivel_actual, fecha_registro, activo
            FROM usuarios WHERE activo = 1 ORDER BY fecha_registro DESC LIMIT 50
        ");
        $stmt->execute();
        $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'data' => $usuarios,
            'total' => count($usuarios)
        ]);
        
    } else {
        logDebug('Método no permitido: ' . $_SERVER['REQUEST_METHOD']);
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'message' => 'Método no permitido'
        ]);
    }
    
} catch (PDOException $e) {
    logDebug('Error de PDO: ' . $e->getMessage());
    logDebug('Código de error PDO: ' . $e->getCode());
    logDebug('Stack trace: ' . $e->getTraceAsString());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error de conexión a la base de datos',
        'debug' => [
            'error' => $e->getMessage(),
            'code' => $e->getCode()
        ]
    ]);
    
} catch (Exception $e) {
    logDebug('Error general: ' . $e->getMessage());
    logDebug('Stack trace: ' . $e->getTraceAsString());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error interno del servidor',
        'debug' => [
            'error' => $e->getMessage()
        ]
    ]);
}

logDebug('Script finalizado');
?>