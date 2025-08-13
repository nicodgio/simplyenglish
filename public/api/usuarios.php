<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuración de la base de datos
$host = '62.72.50.204';
$dbname = 'u624785608_simplyenglish';
$username = 'u624785608_spenglish';
$password = 'SPAdmon2025#';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Obtener ID del usuario desde la URL
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $pathParts = explode('/', $path);
        $userId = end($pathParts);
        
        if (!is_numeric($userId)) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'ID de usuario inválido'
            ]);
            exit();
        }
        
        $stmt = $pdo->prepare("
            SELECT id, nombre, apellido_paterno, apellido_materno, email, telefono,
                   fecha_nacimiento, genero, direccion, ciudad, estado, codigo_postal,
                   programa_interes, nivel_actual, experiencia_previa, objetivos,
                   horario_preferencia, modalidad_preferencia, fecha_registro, activo
            FROM usuarios WHERE id = ? AND activo = 1
        ");
        $stmt->execute([$userId]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($usuario) {
            echo json_encode([
                'success' => true,
                'data' => $usuario
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'message' => 'Usuario no encontrado'
            ]);
        }
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