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
$dbname = 'simplyen_simplyenglish';
$username = 'simplyen_admon';
$password = 'corsu5-Munkyg-xaxpyc';

// Configuración sandbox de OpenPay
$OPENPAY_CONFIG = [
    'id' => 'mzkvkma3reuzgzjf1ysj',
    'private_key' => 'sk_1e324f7fb9904ac3985253f3247b4cb2', // Clave privada para sandbox
    'sandbox' => true
];

function sendCleanResponse($data) {
    ob_clean();
    echo json_encode($data);
    exit;
}

function procesarPago($conn, $data) {
    try {
        // Validar datos requeridos
        if (!isset($data['pago_id']) || !isset($data['token_id'])) {
            throw new Exception("Datos de pago incompletos");
        }

        $pago_id = $data['pago_id'];
        $token_id = $data['token_id'];
        $device_session_id = $data['device_session_id'] ?? 'web_session_' . time();

        // Verificar que el pago existe y está pendiente
        $stmt = $conn->prepare("SELECT p.*, u.nombre, u.apellido_paterno, u.email, u.id as usuario_id
                               FROM pagos p
                               JOIN usuarios u ON p.usuario_id = u.id
                               WHERE p.id = ? AND p.estado = 'PENDIENTE'");
        $stmt->bind_param("i", $pago_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 0) {
            throw new Exception("Pago no encontrado o ya ha sido procesado");
        }

        $pago = $result->fetch_assoc();

        // En sandbox, simular pago exitoso directamente
        // En producción, aquí harías la llamada real a OpenPay API
        if (true) { // Sandbox mode - siempre exitoso
            $charge_id = 'sandbox_charge_' . uniqid();
            $transaction_id = 'txn_' . time() . '_' . rand(1000, 9999);
            
            // Crear estructura de datos de OpenPay para almacenar en JSON
            $datos_openpay = [
                'charge_id' => $charge_id,
                'transaction_id' => $transaction_id,
                'token_id' => $token_id,
                'device_session_id' => $device_session_id,
                'sandbox' => true,
                'fecha_proceso' => date('Y-m-d H:i:s')
            ];
            
            // Convertir a JSON para almacenar en la columna datos_openpay
            $datos_openpay_json = json_encode($datos_openpay);
            
            // Actualizar el pago como completado usando las columnas existentes
            $stmt = $conn->prepare("UPDATE pagos SET
                                   estado = 'COMPLETADO',
                                   fecha_pago = NOW(),
                                   referencia_externa = ?,
                                   autorizacion = ?,
                                   datos_openpay = ?,
                                   metodo_pago = 'tarjeta'
                                   WHERE id = ?");
            $stmt->bind_param("sssi", $charge_id, $transaction_id, $datos_openpay_json, $pago_id);
            
            if (!$stmt->execute()) {
                throw new Exception("Error al actualizar el estado del pago");
            }

            // Activar suscripción si existe
            if (!empty($pago['suscripcion_id'])) {
                $stmt = $conn->prepare("UPDATE suscripciones SET 
                                       estado = 'ACTIVA',
                                       fecha_inicio = NOW()
                                       WHERE id = ?");
                $stmt->bind_param("i", $pago['suscripcion_id']);
                $stmt->execute();
            }

            // Si tienes tabla de logs, puedes registrar aquí
            // Comentado porque no sé si tienes tabla logs_pagos
            /*
            $stmt = $conn->prepare("INSERT INTO logs_pagos (pago_id, usuario_id, evento, detalles, fecha_evento) 
                                   VALUES (?, ?, 'PAGO_COMPLETADO', ?, NOW())");
            $evento_detalles = json_encode([
                'charge_id' => $charge_id,
                'transaction_id' => $transaction_id,
                'modo' => 'sandbox',
                'metodo_pago' => 'tarjeta'
            ]);
            $stmt->bind_param("iis", $pago_id, $pago['usuario_id'], $evento_detalles);
            $stmt->execute();
            */

            return [
                'success' => true,
                'message' => 'Pago procesado exitosamente en modo sandbox',
                'data' => [
                    'charge_id' => $charge_id,
                    'transaction_id' => $transaction_id,
                    'amount' => $pago['monto'],
                    'status' => 'completed',
                    'sandbox_mode' => true
                ]
            ];
        }

    } catch (Exception $e) {
        // Log del error
        error_log("Error en procesarPago: " . $e->getMessage());
        
        return [
            'success' => false,
            'error' => $e->getMessage(),
            'error_code' => 'PAYMENT_PROCESSING_ERROR'
        ];
    }
}

function procesarPagoTienda($conn, $data) {
    try {
        if (!isset($data['pago_id'])) {
            throw new Exception("ID de pago requerido");
        }

        $pago_id = $data['pago_id'];
        
        // Verificar pago
        $stmt = $conn->prepare("SELECT p.*, u.nombre, u.apellido_paterno 
                               FROM pagos p
                               JOIN usuarios u ON p.usuario_id = u.id
                               WHERE p.id = ? AND p.estado = 'PENDIENTE'");
        $stmt->bind_param("i", $pago_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 0) {
            throw new Exception("Pago no encontrado");
        }

        $pago = $result->fetch_assoc();
        
        // Generar referencia de pago en tienda
        $referencia_tienda = 'SE' . str_pad($pago_id, 10, '0', STR_PAD_LEFT);
        
        // Crear estructura de datos para tienda
        $datos_tienda = [
            'tipo' => 'pago_tienda',
            'referencia' => $referencia_tienda,
            'fecha_generacion' => date('Y-m-d H:i:s'),
            'vigencia' => date('Y-m-d H:i:s', strtotime('+7 days'))
        ];
        
        $datos_tienda_json = json_encode($datos_tienda);
        
        // Actualizar pago con referencia de tienda usando columnas existentes
        $stmt = $conn->prepare("UPDATE pagos SET 
                               metodo_pago = 'tienda',
                               referencia_externa = ?,
                               datos_openpay = ?,
                               estado = 'PENDIENTE'
                               WHERE id = ?");
        $stmt->bind_param("ssi", $referencia_tienda, $datos_tienda_json, $pago_id);
        $stmt->execute();

        return [
            'success' => true,
            'message' => 'Ficha de pago generada exitosamente',
            'data' => [
                'referencia' => $referencia_tienda,
                'monto' => $pago['monto'],
                'instrucciones' => 'Presente esta referencia en cualquier tienda OXXO, 7-Eleven o establecimiento autorizado'
            ]
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
        sendCleanResponse(['success' => false, 'error' => 'Método HTTP no permitido']);
    }

    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['action'])) {
        sendCleanResponse(['success' => false, 'error' => 'Acción requerida']);
    }

    // Conexión a base de datos
    $conn = new mysqli($host, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        sendCleanResponse(['success' => false, 'error' => 'Error de conexión a base de datos']);
    }
    
    $conn->set_charset("utf8");

    // Procesar acciones
    switch ($input['action']) {
        case 'procesar_pago':
            $result = procesarPago($conn, $input);
            sendCleanResponse($result);
            break;
            
        case 'procesar_pago_tienda':
            $result = procesarPagoTienda($conn, $input);
            sendCleanResponse($result);
            break;
            
        default:
            sendCleanResponse(['success' => false, 'error' => 'Acción no válida']);
    }

} catch (Exception $e) {
    error_log("Error general en pago.php: " . $e->getMessage());
    sendCleanResponse(['success' => false, 'error' => 'Error interno del servidor']);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>