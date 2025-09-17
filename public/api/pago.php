<?php
ob_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
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

$OPENPAY_CONFIG = [
    'id' => 'mzkvkma3reuzgzjf1ysj',
    'private_key' => 'sk_c489fd8353de4d8bbd84646b907645b2',
    'public_key' => 'pk_8e75485c69c34418bbcf1174ef7b17f1',
    'sandbox' => true,
    'api_url' => 'https://sandbox-api.openpay.mx/v1/'
];

function sendCleanResponse($data) {
    ob_clean();
    echo json_encode($data);
    exit;
}

function getGenericErrorMessage($openPayError = null) {
    $errorMessages = [
        'Tu compra no fue procesada. Tarjeta rechazada.',
        'Tarjeta rechazada. Ingrese sus datos correctamente e inténtelo de nuevo.',
        'Error de pago, comuníquese con su banco e inténtelo de nuevo.',
        'Consulte el saldo de su tarjeta e inténtelo más tarde.',
        'Transacción fallida.',
        'Comuníquese con su banco e ingrese sus datos correctamente.'
    ];

    if (!$openPayError) {
        return $errorMessages[0];
    }

    $errorCode = '';
    $errorDesc = '';
    
    if (is_array($openPayError)) {
        $errorCode = $openPayError['error_code'] ?? $openPayError['code'] ?? '';
        $errorDesc = $openPayError['description'] ?? $openPayError['message'] ?? '';
    } else if (is_string($openPayError)) {
        $errorDesc = $openPayError;
    }

    $errorCodeLower = strtolower($errorCode);
    $errorDescLower = strtolower($errorDesc);

    if (strpos($errorCodeLower, 'insufficient_funds') !== false || 
        strpos($errorDescLower, 'insufficient') !== false ||
        strpos($errorDescLower, 'fondos') !== false) {
        return $errorMessages[3];
    }
    
    if (strpos($errorCodeLower, 'card_declined') !== false || 
        strpos($errorCodeLower, 'declined') !== false || 
        strpos($errorDescLower, 'declined') !== false || 
        strpos($errorDescLower, 'rechazada') !== false) {
        return $errorMessages[1];
    }
    
    if (strpos($errorCodeLower, 'processing_error') !== false || 
        strpos($errorCodeLower, 'bank') !== false ||
        strpos($errorDescLower, 'bank') !== false || 
        strpos($errorDescLower, 'banco') !== false) {
        return $errorMessages[2];
    }
    
    if (strpos($errorCodeLower, 'invalid') !== false || 
        strpos($errorDescLower, 'invalid') !== false ||
        strpos($errorDescLower, 'incorrect') !== false ||
        strpos($errorDescLower, 'incorrecto') !== false) {
        return $errorMessages[5];
    }

    return $errorMessages[array_rand($errorMessages)];
}

function callOpenPayAPI($endpoint, $data = null, $method = 'POST') {
    global $OPENPAY_CONFIG;
    
    $url = $OPENPAY_CONFIG['api_url'] . $OPENPAY_CONFIG['id'] . '/' . $endpoint;
    
    error_log("OpenPay URL: " . $url);
    error_log("OpenPay Method: " . $method);
    if ($data) {
        error_log("OpenPay Data: " . json_encode($data, JSON_PRETTY_PRINT));
    }
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Basic ' . base64_encode($OPENPAY_CONFIG['private_key'] . ':')
    ]);
    
    if ($method === 'POST' && $data) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    } elseif ($method === 'GET') {
        curl_setopt($ch, CURLOPT_HTTPGET, true);
    }
    
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    error_log("OpenPay HTTP Code: " . $httpCode);
    error_log("OpenPay Response: " . $response);
    
    curl_close($ch);
    
    return [
        'success' => $httpCode >= 200 && $httpCode < 300,
        'data' => json_decode($response, true),
        'http_code' => $httpCode
    ];
}

function procesarPago($conn, $data) {
    try {
        if (!isset($data['pago_id']) || !isset($data['token_id'])) {
            throw new Exception("Datos de pago incompletos");
        }

        $pago_id = $data['pago_id'];
        $token_id = $data['token_id'];
        $device_session_id = $data['device_session_id'] ?? 'web_session_' . time();

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

        $chargeData = [
            'source_id' => $token_id,
            'method' => 'card',
            'amount' => floatval($pago['monto']),
            'currency' => 'MXN',
            'description' => 'Pago SimplyEnglish - Pago #' . $pago_id,
            'order_id' => 'SE-' . str_pad($pago_id, 6, '0', STR_PAD_LEFT),
            'device_session_id' => $device_session_id,
            'customer' => [
                'name' => $pago['nombre'],
                'last_name' => $pago['apellido_paterno'],
                'email' => $pago['email'],
                'requires_account' => false
            ],
            'use_3d_secure' => true,
            'redirect_url' => 'https://simplyenglish.com.mx/api/pago-3ds-callback.php?pago_id=' . $pago_id
        ];

        error_log("Enviando cargo a OpenPay: " . json_encode($chargeData, JSON_PRETTY_PRINT));

        $response = callOpenPayAPI('charges', $chargeData);

        if (!$response['success']) {
            $error_msg = getGenericErrorMessage($response['data']);
            error_log("Error en OpenPay: " . json_encode($response['data'], JSON_PRETTY_PRINT));
            throw new Exception($error_msg);
        }

        $charge_result = $response['data'];
        $charge_id = $charge_result['id'];
        $status = $charge_result['status'];
        
        error_log("Charge result status: " . $status);
        error_log("Charge result completo: " . json_encode($charge_result, JSON_PRETTY_PRINT));
        
        $datos_openpay = [
            'charge_id' => $charge_id,
            'token_id' => $token_id,
            'device_session_id' => $device_session_id,
            'status' => $status,
            'fecha_proceso' => date('Y-m-d H:i:s'),
            'charge_data' => $charge_result
        ];

        if ($status === 'charge_pending' && isset($charge_result['payment_method']['url'])) {
            $redirect_url = $charge_result['payment_method']['url'];
            
            $datos_openpay['requires_3ds'] = true;
            $datos_openpay['redirect_url'] = $redirect_url;
            
            $stmt = $conn->prepare("UPDATE pagos SET
                                   estado = 'EN_PROCESO',
                                   metodo_pago = 'card',
                                   referencia_externa = ?,
                                   device_session_id = ?,
                                   redirect_url = ?,
                                   three_d_secure_url = ?,
                                   requires_3ds = 1,
                                   datos_openpay = ?,
                                   fecha_actualizacion = NOW()
                                   WHERE id = ?");
            
            $datos_openpay_json = json_encode($datos_openpay);
            
            $stmt->bind_param("sssssi", 
                $charge_id, 
                $device_session_id,
                $redirect_url,
                $redirect_url,
                $datos_openpay_json,
                $pago_id
            );
            
            if (!$stmt->execute()) {
                throw new Exception("Error al actualizar el pago para 3D Secure");
            }

            return [
                'success' => true,
                'requires_3ds' => true,
                'redirect_url' => $redirect_url,
                'message' => 'Se requiere autenticación 3D Secure',
                'data' => [
                    'charge_id' => $charge_id,
                    'redirect_url' => $redirect_url,
                    'amount' => $pago['monto']
                ]
            ];
        }
        
        $transaction_id = $charge_result['authorization'] ?? $charge_id;
        $datos_openpay['requires_3ds'] = false;
        $datos_openpay['authorization'] = $transaction_id;
        $datos_openpay_json = json_encode($datos_openpay);
        
        $nuevo_estado = 'PENDIENTE';
        switch ($status) {
            case 'completed':
                $nuevo_estado = 'COMPLETADO';
                break;
            case 'failed':
                $nuevo_estado = 'FALLIDO';
                break;
            case 'cancelled':
                $nuevo_estado = 'CANCELADO';
                break;
            case 'in_progress':
            case 'charge_pending':
                $nuevo_estado = 'EN_PROCESO';
                break;
        }
        
        error_log("Actualizando pago con estado: " . $nuevo_estado);
        
        $stmt = $conn->prepare("UPDATE pagos SET
                               estado = ?,
                               fecha_pago = ?,
                               metodo_pago = 'card',
                               referencia_externa = ?,
                               autorizacion = ?,
                               device_session_id = ?,
                               requires_3ds = 0,
                               datos_openpay = ?,
                               fecha_actualizacion = NOW()
                               WHERE id = ?");
        
        $fecha_pago = ($nuevo_estado === 'COMPLETADO') ? date('Y-m-d H:i:s') : null;
        
        $stmt->bind_param("ssssssi", 
            $nuevo_estado,
            $fecha_pago,
            $charge_id,
            $transaction_id,
            $device_session_id,
            $datos_openpay_json,
            $pago_id
        );
        
        if (!$stmt->execute()) {
            error_log("Error al ejecutar UPDATE en pagos: " . $stmt->error);
            throw new Exception("Error al actualizar el estado del pago");
        }

        if ($nuevo_estado === 'COMPLETADO' && !empty($pago['suscripcion_id'])) {
            error_log("Activando Pago ID: " . $pago['suscripcion_id']);
            
            $stmt = $conn->prepare("UPDATE suscripciones SET 
                                   estado = 'ACTIVA',
                                   fecha_inicio = NOW(),
                                   fecha_actualizacion = NOW()
                                   WHERE id = ?");
            $stmt->bind_param("i", $pago['suscripcion_id']);
            
            if (!$stmt->execute()) {
                error_log("Error al activar Pago: " . $stmt->error);
            } else {
                error_log("Pago activada exitosamente");
            }
        }

        return [
            'success' => true,
            'requires_3ds' => false,
            'message' => $nuevo_estado === 'COMPLETADO' ? 'Pago procesado exitosamente' : 'Pago en proceso',
            'data' => [
                'charge_id' => $charge_id,
                'transaction_id' => $transaction_id,
                'amount' => $pago['monto'],
                'status' => $nuevo_estado
            ]
        ];

    } catch (Exception $e) {
        error_log("Error en procesarPago: " . $e->getMessage());
        return [
            'success' => false,
            'error' => getGenericErrorMessage($e->getMessage()),
            'error_code' => 'PAYMENT_PROCESSING_ERROR'
        ];
    }
}

function verificarEstadoPago($conn, $data) {
    try {
        if (!isset($data['pago_id'])) {
            throw new Exception("ID de pago requerido");
        }

        $pago_id = $data['pago_id'];

        $stmt = $conn->prepare("SELECT * FROM pagos WHERE id = ?");
        $stmt->bind_param("i", $pago_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 0) {
            throw new Exception("Pago no encontrado");
        }

        $pago = $result->fetch_assoc();

        if ($pago['estado'] === 'COMPLETADO' || $pago['estado'] === 'FALLIDO' || $pago['estado'] === 'CANCELADO') {
            return [
                'success' => true,
                'data' => [
                    'estado' => $pago['estado'],
                    'fecha_pago' => $pago['fecha_pago'],
                    'referencia_externa' => $pago['referencia_externa']
                ]
            ];
        }

        if (!$pago['referencia_externa']) {
            return [
                'success' => true,
                'data' => ['estado' => 'PENDIENTE']
            ];
        }

        $response = callOpenPayAPI('charges/' . $pago['referencia_externa'], null, 'GET');

        if ($response['success'] && isset($response['data']['status'])) {
            $openpay_status = $response['data']['status'];
            $nuevo_estado = 'PENDIENTE';

            switch ($openpay_status) {
                case 'completed':
                    $nuevo_estado = 'COMPLETADO';
                    break;
                case 'failed':
                case 'cancelled':
                    $nuevo_estado = 'FALLIDO';
                    break;
                case 'in_progress':
                case 'charge_pending':
                    $nuevo_estado = 'EN_PROCESO';
                    break;
            }

            if ($nuevo_estado !== $pago['estado']) {
                $fecha_pago = ($nuevo_estado === 'COMPLETADO') ? date('Y-m-d H:i:s') : $pago['fecha_pago'];
                
                $stmt = $conn->prepare("UPDATE pagos SET estado = ?, fecha_pago = ?, fecha_actualizacion = NOW() WHERE id = ?");
                $stmt->bind_param("ssi", $nuevo_estado, $fecha_pago, $pago_id);
                $stmt->execute();

                if ($nuevo_estado === 'COMPLETADO' && $pago['suscripcion_id']) {
                    $stmt = $conn->prepare("UPDATE suscripciones SET estado = 'ACTIVA', fecha_inicio = NOW(), fecha_actualizacion = NOW() WHERE id = ?");
                    $stmt->bind_param("i", $pago['suscripcion_id']);
                    $stmt->execute();
                }
            }

            return [
                'success' => true,
                'data' => [
                    'estado' => $nuevo_estado,
                    'openpay_status' => $openpay_status,
                    'fecha_verificacion' => date('Y-m-d H:i:s')
                ]
            ];
        }

        return [
            'success' => true,
            'data' => ['estado' => $pago['estado']]
        ];

    } catch (Exception $e) {
        error_log("Error en verificarEstadoPago: " . $e->getMessage());
        return [
            'success' => false,
            'error' => getGenericErrorMessage($e->getMessage())
        ];
    }
}

function procesarWebhookOpenPay($conn) {
    try {
        $json_payload = file_get_contents('php://input');
        $webhook_data = json_decode($json_payload, true);
        
        error_log("Webhook OpenPay recibido: " . $json_payload);
        
        if (!$webhook_data || !isset($webhook_data['type'])) {
            throw new Exception("Webhook inválido");
        }

        $event_type = $webhook_data['type'];
        $transaction_data = $webhook_data['transaction'] ?? null;

        if (!$transaction_data || !isset($transaction_data['order_id'])) {
            error_log("Datos de transacción faltantes en webhook");
            return ['success' => true, 'message' => 'Datos faltantes'];
        }

        $order_id = $transaction_data['order_id'];
        
        $pago_id = null;
        if (preg_match('/^SE-(\d+)$/', $order_id, $matches)) {
            $pago_id = intval($matches[1]);
        }

        if (!$pago_id) {
            error_log("No se pudo extraer pago_id del order_id: " . $order_id);
            return ['success' => true, 'message' => 'Order ID no válido'];
        }

        $stmt = $conn->prepare("SELECT * FROM pagos WHERE id = ?");
        $stmt->bind_param("i", $pago_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 0) {
            error_log("Webhook recibido para pago_id no encontrado: " . $pago_id);
            return ['success' => true, 'message' => 'Pago ID no encontrado'];
        }

        $pago = $result->fetch_assoc();
        $nuevo_estado = $pago['estado'];

        switch ($event_type) {
            case 'charge.succeeded':
                $nuevo_estado = 'COMPLETADO';
                break;
            case 'charge.failed':
                $nuevo_estado = 'FALLIDO';
                break;
            case 'charge.cancelled':
                $nuevo_estado = 'CANCELADO';
                break;
            case 'charge.created':
                if ($pago['estado'] === 'PENDIENTE') {
                    $nuevo_estado = 'EN_PROCESO';
                }
                break;
        }

        if ($nuevo_estado !== $pago['estado']) {
            $webhook_info = [
                'event_type' => $event_type,
                'webhook_received' => date('Y-m-d H:i:s'),
                'transaction_status' => $transaction_data['status'] ?? null,
                'authorization' => $transaction_data['authorization'] ?? null,
                'charge_id' => $transaction_data['id'] ?? null
            ];

            $datos_openpay = json_decode($pago['datos_openpay'], true) ?: [];
            $datos_openpay['webhook_info'] = $webhook_info;

            $fecha_pago = ($nuevo_estado === 'COMPLETADO') ? date('Y-m-d H:i:s') : $pago['fecha_pago'];
            $autorizacion = $transaction_data['authorization'] ?? $pago['autorizacion'];
            $charge_id = $transaction_data['id'] ?? $pago['referencia_externa'];
            $datos_json = json_encode($datos_openpay);
            
            $stmt = $conn->prepare("UPDATE pagos SET 
                                   estado = ?, 
                                   fecha_pago = ?,
                                   autorizacion = ?,
                                   referencia_externa = ?,
                                   datos_openpay = ?,
                                   fecha_actualizacion = NOW()
                                   WHERE id = ?");
            
            $stmt->bind_param("sssssi", $nuevo_estado, $fecha_pago, $autorizacion, $charge_id, $datos_json, $pago_id);
            $stmt->execute();

            if ($nuevo_estado === 'COMPLETADO' && $pago['suscripcion_id']) {
                $stmt = $conn->prepare("UPDATE suscripciones SET estado = 'ACTIVA', fecha_inicio = NOW(), fecha_actualizacion = NOW() WHERE id = ?");
                $stmt->bind_param("i", $pago['suscripcion_id']);
                $stmt->execute();
            }
        }

        return [
            'success' => true,
            'message' => 'Webhook procesado correctamente',
            'event_type' => $event_type,
            'new_status' => $nuevo_estado
        ];

    } catch (Exception $e) {
        error_log("Error en webhook: " . $e->getMessage());
        return [
            'success' => false,
            'error' => getGenericErrorMessage($e->getMessage())
        ];
    }
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'GET') {
        sendCleanResponse(['success' => false, 'error' => 'Método HTTP no permitido']);
    }

    $input_raw = file_get_contents('php://input');
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($input_raw)) {
        $decoded = json_decode($input_raw, true);
        
        if (isset($decoded['type']) && isset($decoded['transaction']) && !isset($decoded['action'])) {
            $conn = new mysqli($host, $username, $password, $dbname);
            if ($conn->connect_error) {
                sendCleanResponse(['success' => false, 'error' => 'Error de conexión']);
            }
            $conn->set_charset("utf8");
            
            $result = procesarWebhookOpenPay($conn);
            sendCleanResponse($result);
        }
    }

    $input = json_decode($input_raw, true);
    
    if (!$input || !isset($input['action'])) {
        sendCleanResponse(['success' => false, 'error' => 'Acción requerida']);
    }

    $conn = new mysqli($host, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        sendCleanResponse(['success' => false, 'error' => 'Error de conexión a base de datos']);
    }
    
    $conn->set_charset("utf8");

    switch ($input['action']) {
        case 'procesar_pago':
            $result = procesarPago($conn, $input);
            sendCleanResponse($result);
            break;
            
        case 'verificar_estado_pago':
            $result = verificarEstadoPago($conn, $input);
            sendCleanResponse($result);
            break;
            
        default:
            sendCleanResponse(['success' => false, 'error' => 'Acción no válida']);
    }

} catch (Exception $e) {
    error_log("Error general en pago.php: " . $e->getMessage());
    sendCleanResponse(['success' => false, 'error' => getGenericErrorMessage($e->getMessage())]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>