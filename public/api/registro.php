<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', '/tmp/php_errors.log');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$dbname = 'simplyen_simplyenglish';
$username = 'simplyen_admon';
$password = 'corsu5-Munkyg-xaxpyc';

$jwt_secret = 'simply_english_jwt_secret_2025_very_secure_key';

$bot_token = "8270319060:AAEhvFemccYqqLLveb8X9t8m3NT9YGQaTQM";
$chat_id = "-4831902561";

function logDebug($message) {
    error_log('[SIMPLY_ENGLISH_DEBUG] ' . $message);
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function validatePhone($phone) {
    return preg_match('/^[\+]?[0-9\s\-\(\)]{10,}$/', $phone);
}

function generateJWT($userId, $email, $secret) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode([
        'userId' => $userId,
        'email' => $email,
        'iat' => time(),
        'exp' => time() + (7 * 24 * 60 * 60)
    ]);
    
    $base64Header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    
    $signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, $secret, true);
    $base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    return $base64Header . "." . $base64Payload . "." . $base64Signature;
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

    logDebug('Mensaje enviado a Telegram exitosamente');
    return true;
}

function formatRegistrationMessage($data, $userId) {
    $programas_nombres = [
        'CONOCER_INDIVIDUAL' => 'CONOCER Nivel Individual',
        'CONOCER_PAQUETE' => 'Paquete CONOCER (3 Niveles)',
        'CENNI_BASICO' => 'Certificación CENNI Básico',
        'CENNI_PLUS' => 'Certificación CENNI Plus',
        'CENNI_PRO' => 'Certificación CENNI Pro'
    ];

    $niveles_nombres = [
        'principiante' => 'Principiante (A1)',
        'basico' => 'Básico (A2)',
        'intermedio-bajo' => 'Intermedio Bajo (B1)',
        'intermedio' => 'Intermedio (B2)',
        'avanzado' => 'Avanzado (C1)',
        'superior' => 'Superior (C2)',
        'cenni-evaluation' => 'CENNI - Evaluación específica',
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
    
    $is_cenni = strpos($data['programaInteres'], 'CENNI') !== false;
    
    if ($is_cenni) {
        $message .= "• *Tipo:* Certificación CENNI\n";
        $message .= "• *Evaluación:* Coordinación específica requerida\n";
    } else {
        $message .= "• *Nivel Actual:* $nivel_texto\n";
        if (isset($data['nivelConocerCompletado']) && isset($data['nivelConocerActual'])) {
            $message .= "• *CONOCER Completado:* {$data['nivelConocerCompletado']}\n";
            $message .= "• *CONOCER Actual:* {$data['nivelConocerActual']}\n";
        }
    }

    if (!$is_cenni) {
        if (!empty($data['horarioPreferencia']) && $data['horarioPreferencia'] !== 'cenni-coordinado') {
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

        if (!empty($data['experienciaPrevia']) && $data['experienciaPrevia'] !== 'CENNI - No aplica') {
            $experiencia = strlen($data['experienciaPrevia']) > 100 
                ? substr($data['experienciaPrevia'], 0, 100) . '...' 
                : $data['experienciaPrevia'];
            $message .= "\n📚 *Experiencia Previa:*\n$experiencia\n";
        }

        if (!empty($data['objetivos']) && $data['objetivos'] !== 'Certificación CENNI') {
            $objetivos = strlen($data['objetivos']) > 100 
                ? substr($data['objetivos'], 0, 100) . '...' 
                : $data['objetivos'];
            $message .= "\n🎯 *Objetivos:*\n$objetivos\n";
        }
    }

    $message .= "\n🆔 *ID Usuario:* $userId\n";
    $message .= "🕐 *Fecha Registro:* $fecha\n";
    $message .= "━━━━━━━━━━━━━━━━━━━━\n";
    
    if ($is_cenni) {
        $message .= "⚡ *Acción requerida:* Contactar para coordinación de evaluación CENNI";
    } else {
        $message .= "⏰ *Acción requerida:* Contactar en 24 horas para evaluación inicial";
    }

    return $message;
}

function determinarCategoriaPrograma($programa_codigo) {
    if (strpos($programa_codigo, 'CENNI') !== false) {
        return 'CENNI';
    } elseif (strpos($programa_codigo, 'CONOCER_PAQUETE') !== false) {
        return 'CONOCER_PAQUETE';
    } elseif (strpos($programa_codigo, 'CONOCER') !== false) {
        return 'CONOCER_INDIVIDUAL';
    }
    return 'OTRO';
}

logDebug('Script iniciado');

try {
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
    
    $tableCheck = $pdo->query("SHOW TABLES LIKE 'usuarios'");
    if ($tableCheck->rowCount() == 0) {
        logDebug('La tabla usuarios no existe, creándola...');
        
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
            nivel_conocer_actual INT DEFAULT 0,
            nivel_conocer_completado INT DEFAULT 0,
            experiencia_previa TEXT,
            objetivos TEXT,
            horario_preferencia VARCHAR(50),
            modalidad_preferencia VARCHAR(50),
            fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            activo TINYINT(1) DEFAULT 1,
            INDEX idx_email (email),
            INDEX idx_programa (programa_interes),
            INDEX idx_activo (activo)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
        
        $pdo->exec($createTable);
        logDebug('Tabla usuarios creada exitosamente');
    } else {
        $columns = $pdo->query("DESCRIBE usuarios")->fetchAll(PDO::FETCH_COLUMN);
        
        if (!in_array('nivel_conocer_actual', $columns)) {
            $pdo->exec("ALTER TABLE usuarios ADD COLUMN nivel_conocer_actual INT DEFAULT 0 AFTER nivel_actual");
            logDebug('Columna nivel_conocer_actual agregada');
        }
        
        if (!in_array('nivel_conocer_completado', $columns)) {
            $pdo->exec("ALTER TABLE usuarios ADD COLUMN nivel_conocer_completado INT DEFAULT 0 AFTER nivel_conocer_actual");
            logDebug('Columna nivel_conocer_completado agregada');
        }
        
        if (!in_array('fecha_actualizacion', $columns)) {
            $pdo->exec("ALTER TABLE usuarios ADD COLUMN fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER fecha_registro");
            logDebug('Columna fecha_actualizacion agregada');
        }
    }
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        logDebug('Procesando petición POST');
        
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
        
        if (!validateEmail($data['email'])) {
            logDebug('Email inválido: ' . $data['email']);
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'El formato del email no es válido'
            ]);
            exit();
        }
        
        if (!validatePhone($data['telefono'])) {
            logDebug('Teléfono inválido: ' . $data['telefono']);
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'El formato del teléfono no es válido'
            ]);
            exit();
        }
        
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
        
        $categoria_programa = determinarCategoriaPrograma($data['programaInteres']);
        logDebug('Categoría del programa: ' . $categoria_programa);
        
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
            (int)($data['nivelConocerActual'] ?? 0),
            (int)($data['nivelConocerCompletado'] ?? 0),
            $data['experienciaPrevia'] ?? null,
            $data['objetivos'] ?? null,
            $data['horarioPreferencia'] ?? null,
            $data['modalidadPreferencia'] ?? 'online'
        ];
        
        logDebug('Datos preparados para inserción: ' . print_r($insertData, true));
        
        $sql = "INSERT INTO usuarios (
            nombre, apellido_paterno, apellido_materno, email, telefono, 
            fecha_nacimiento, genero, direccion, ciudad, estado, codigo_postal,
            programa_interes, nivel_actual, nivel_conocer_actual, nivel_conocer_completado,
            experiencia_previa, objetivos, horario_preferencia, modalidad_preferencia, 
            fecha_registro, fecha_actualizacion, activo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), 1)";
        
        logDebug('Ejecutando query SQL');
        $stmt = $pdo->prepare($sql);
        $result = $stmt->execute($insertData);
        
        if ($result) {
            $userId = $pdo->lastInsertId();
            $token = generateJWT($userId, $data['email'], $jwt_secret);
            
            logDebug('Usuario insertado exitosamente con ID: ' . $userId);
            
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
                        'programaInteres' => $data['programaInteres'],
                        'categoriaPrograma' => $categoria_programa
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
        
        $stmt = $pdo->prepare("
            SELECT id, nombre, apellido_paterno, apellido_materno, email, telefono,
                   programa_interes, nivel_actual, nivel_conocer_actual, nivel_conocer_completado,
                   fecha_registro, activo
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