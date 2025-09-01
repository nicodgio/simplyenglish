<?php
ob_start();
error_reporting(0);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$host = 'localhost';
$dbname = 'u624785608_simplyenglish';
$username = 'u624785608_spenglish';
$password = 'SPAdmon2025#';

function sendCleanResponse($data) {
    ob_clean();
    echo json_encode($data);
    exit;
}

function procesarPago($conn, $data) {
    try {
        if (!isset($data['pago_id']) || !isset($data['token_id'])) {
            throw new Exception("Faltan datos requeridos");
        }
        
        $pago_id = $data['pago_id'];
        $token_id = $data['token_id'];
        
        $stmt = $conn->prepare("SELECT p.*, u.nombre, u.apellido_paterno, u.email 
                               FROM pagos p 
                               JOIN usuarios u ON p.usuario_id = u.id 
                               WHERE p.id = ? AND p.estado = 'PENDIENTE'");
        $stmt->bind_param("i", $pago_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows == 0) {
            throw new Exception("Pago no encontrado o ya procesado");
        }
        
        $pago = $result->fetch_assoc();
        
        // Simular pago exitoso y actualizar base de datos
        $charge_id = 'test_' . uniqid();
        
        $stmt = $conn->prepare("UPDATE pagos SET 
                               estado = 'COMPLETADO',
                               fecha_pago = NOW(),
                               referencia_externa = ?
                               WHERE id = ?");
        $stmt->bind_param("si", $charge_id, $pago_id);
        $stmt->execute();
        
        if (isset($pago['suscripcion_id'])) {
            $stmt = $conn->prepare("UPDATE suscripciones SET estado = 'ACTIVA' WHERE id = ?");
            $stmt->bind_param("i", $pago['suscripcion_id']);
            $stmt->execute();
        }
        
        return [
            'success' => true,
            'message' => 'Pago procesado exitosamente',
            'charge_id' => $charge_id
        ];
        
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendCleanResponse(['success' => false, 'error' => 'Método no permitido']);
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || !isset($input['action'])) {
        sendCleanResponse(['success' => false, 'error' => 'Acción requerida']);
    }
    
    $conn = new mysqli($host, $username, $password, $dbname);
    if ($conn->connect_error) {
        sendCleanResponse(['success' => false, 'error' => 'Error de base de datos']);
    }
    
    $conn->set_charset("utf8");
    
    if ($input['action'] === 'procesar_pago') {
        $result = procesarPago($conn, $input);
        sendCleanResponse($result);
    }
    
    sendCleanResponse(['success' => false, 'error' => 'Acción no válida']);
    
} catch (Exception $e) {
    sendCleanResponse(['success' => false, 'error' => $e->getMessage()]);
}
?>