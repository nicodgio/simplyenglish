<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'u624785608_simplyenglish';
$username = 'u624785608_spenglish';
$password = 'SPAdmon2025#';

// Configuración OpenPay
$OPENPAY_ID = 'mzkvkma3reuzgzjf1ysj';
$OPENPAY_PRIVATE_KEY = 'sk_7e7f366c059a41de8f9f95ed10382024';
$OPENPAY_SANDBOX = true;

// Cargar autoloader de Composer
require_once 'vendor/autoload.php';

function initOpenPay() {
    global $OPENPAY_ID, $OPENPAY_PRIVATE_KEY, $OPENPAY_SANDBOX;
    
    $openpay = Openpay::getInstance($OPENPAY_ID, $OPENPAY_PRIVATE_KEY);
    Openpay::setSandboxMode($OPENPAY_SANDBOX);
    
    return $openpay;
}

function procesarPago($conn, $data) {
    try {
        $pago_id = $data['pago_id'];
        $token_id = $data['token_id'];
        $device_session_id = $data['device_session_id'] ?? 'web_session';
        
        // Obtener datos del pago
        $stmt = $conn->prepare("SELECT p.*, u.nombre, u.apellido_paterno, u.email 
                               FROM pagos p 
                               JOIN usuarios u ON p.usuario_id = u.usuario_id 
                               WHERE p.pago_id = ? AND p.estado = 'PENDIENTE'");
        $stmt->bind_param("i", $pago_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows == 0) {
            throw new Exception("Pago no encontrado o ya procesado");
        }
        
        $pago = $result->fetch_assoc();
        
        // Crear cliente en OpenPay
        $openpay = initOpenPay();
        $customer = $openpay->customers->add([
            'name' => $pago['nombre'],
            'last_name' => $pago['apellido_paterno'],
            'email' => $pago['email'],
            'requires_account' => false
        ]);
        
        // Crear cargo
        $chargeData = [
            'method' => 'card',
            'source_id' => $token_id,
            'amount' => floatval($pago['monto']),
            'currency' => 'MXN',
            'description' => 'Pago Simply English - ' . $pago['descripcion'],
            'order_id' => 'SE-' . str_pad($pago_id, 6, '0', STR_PAD_LEFT),
            'device_session_id' => $device_session_id
        ];
        
        $charge = $customer->charges->create($chargeData);
        
        if ($charge->status == 'completed') {
            // Actualizar pago en base de datos
            $stmt = $conn->prepare("UPDATE pagos SET 
                                   estado = 'COMPLETADO',
                                   fecha_pago = NOW(),
                                   referencia_externa = ?,
                                   metodo_pago = 'card'
                                   WHERE pago_id = ?");
            $stmt->bind_param("si", $charge->id, $pago_id);
            $stmt->execute();
            
            // Activar suscripción
            $stmt = $conn->prepare("UPDATE suscripciones SET estado = 'ACTIVA' WHERE pago_id = ?");
            $stmt->bind_param("i", $pago_id);
            $stmt->execute();
            
            return [
                'success' => true,
                'message' => 'Pago procesado exitosamente',
                'charge_id' => $charge->id,
                'authorization' => $charge->authorization
            ];
        } else {
            throw new Exception("Error al procesar el pago: " . $charge->error_message);
        }
        
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

function generarFichaPago($conn, $data) {
    try {
        $pago_id = $data['pago_id'];
        
        // Obtener datos del pago
        $stmt = $conn->prepare("SELECT p.*, u.nombre, u.apellido_paterno, u.email 
                               FROM pagos p 
                               JOIN usuarios u ON p.usuario_id = u.usuario_id 
                               WHERE p.pago_id = ? AND p.estado = 'PENDIENTE'");
        $stmt->bind_param("i", $pago_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows == 0) {
            throw new Exception("Pago no encontrado o ya procesado");
        }
        
        $pago = $result->fetch_assoc();
        
        // Crear cliente en OpenPay
        $openpay = initOpenPay();
        $customer = $openpay->customers->add([
            'name' => $pago['nombre'],
            'last_name' => $pago['apellido_paterno'],
            'email' => $pago['email'],
            'requires_account' => false
        ]);
        
        // Crear cargo para tienda
        $chargeData = [
            'method' => 'store',
            'amount' => floatval($pago['monto']),
            'currency' => 'MXN',
            'description' => 'Pago Simply English - ' . $pago['descripcion'],
            'order_id' => 'SE-' . str_pad($pago_id, 6, '0', STR_PAD_LEFT),
            'due_date' => date('Y-m-d', strtotime('+3 days'))
        ];
        
        $charge = $customer->charges->create($chargeData);
        
        // Actualizar pago con referencia
        $stmt = $conn->prepare("UPDATE pagos SET 
                               referencia_externa = ?,
                               metodo_pago = 'store'
                               WHERE pago_id = ?");
        $stmt->bind_param("si", $charge->id, $pago_id);
        $stmt->execute();
        
        return [
            'success' => true,
            'data' => [
                'payment_reference' => $charge->payment_method->reference,
                'barcode_url' => $charge->payment_method->barcode_url,
                'pdf_url' => isset($charge->payment_method->pdf_url) ? $charge->payment_method->pdf_url : null
            ]
        ];
        
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// Procesar request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['action'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Acción requerida']);
        exit;
    }
    
    $conn = new mysqli($host, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Error de conexión a la base de datos']);
        exit;
    }
    
    $conn->set_charset("utf8");
    
    switch ($input['action']) {
        case 'procesar_pago':
            $result = procesarPago($conn, $input);
            break;
            
        case 'generar_ficha_pago':
            $result = generarFichaPago($conn, $input);
            break;
            
        default:
            $result = ['success' => false, 'error' => 'Acción no válida'];
            break;
    }
    
    $conn->close();
    echo json_encode($result);
    
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
}
?>