<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuración de la base de datos
$host = '62.72.50.204';
$dbname = 'u624785608_simplyenglish';
$username = 'u624785608_spenglish';
$password = 'SPAdmon2025#';

$jwt_secret = 'simply_english_jwt_secret_2025_very_secure_key';

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

try {
    // Conectar a la base de datos
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Leer datos JSON
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        // Log para debug (opcional)
        error_log('Datos recibidos: ' . print_r($data, true));
        
        // Validar campos obligatorios
        $required_fields = ['nombre', 'apellidoPaterno', 'email', 'telefono', 'fechaNacimiento', 
                           'direccion', 'ciudad', 'estado', 'codigoPostal', 'programaInteres', 'nivelActual'];
        
        foreach ($required_fields as $field) {
            if (empty($data[$field])) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Todos los campos obligatorios deben ser completados'
                ]);
                exit();
            }
        }
        
        // Validar email
        if (!validateEmail($data['email'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'El formato del email no es válido'
            ]);
            exit();
        }
        
        // Validar teléfono
        if (!validatePhone($data['telefono'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'El formato del teléfono no es válido'
            ]);
            exit();
        }
        
        // Verificar si el usuario ya existe
        $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
        $stmt->execute([$data['email']]);
        
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode([
                'success' => false,
                'message' => 'Ya existe un usuario registrado con este email'
            ]);
            exit();
        }
        
        // Insertar nuevo usuario
        $sql = "INSERT INTO usuarios (
            nombre, apellido_paterno, apellido_materno, email, telefono, 
            fecha_nacimiento, genero, direccion, ciudad, estado, codigo_postal,
            programa_interes, nivel_actual, experiencia_previa, objetivos,
            horario_preferencia, modalidad_preferencia, fecha_registro, activo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 1)";
        
        $stmt = $pdo->prepare($sql);
        $result = $stmt->execute([
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
        ]);
        
        if ($result) {
            $userId = $pdo->lastInsertId();
            $token = generateJWT($userId, $data['email'], $jwt_secret);
            
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Registro completado exitosamente',
                'data' => [
                    'userId' => $userId,
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
            throw new Exception('Error al insertar usuario');
        }
        
    } else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Endpoint para obtener usuarios (opcional)
        $stmt = $pdo->prepare("
            SELECT id, nombre, apellido_paterno, apellido_materno, email, telefono,
                   programa_interes, nivel_actual, fecha_registro, activo
            FROM usuarios WHERE activo = 1 ORDER BY fecha_registro DESC
        ");
        $stmt->execute();
        $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'data' => $usuarios,
            'total' => count($usuarios)
        ]);
        
    } else {
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'message' => 'Método no permitido'
        ]);
    }
    
} catch (PDOException $e) {
    error_log('Error de base de datos: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error de conexión a la base de datos'
    ]);
    
} catch (Exception $e) {
    error_log('Error general: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error interno del servidor'
    ]);
}