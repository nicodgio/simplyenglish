<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'localhost';
$dbname = 'simplyen_simplyenglish';
$username = 'simplyen_admon';
$password = 'corsu5-Munkyg-xaxpyc';

$OPENPAY_CONFIG = [
    'id' => 'mzkvkma3reuzgzjf1ysj',
    'private_key' => 'sk_7e7f366c059a41de8f9f95ed10382024',
    'sandbox' => true,
    'api_url' => 'https://sandbox-api.openpay.mx/v1/'
];

function callOpenPayAPI($endpoint, $method = 'GET') {
    global $OPENPAY_CONFIG;
    
    $url = $OPENPAY_CONFIG['api_url'] . $OPENPAY_CONFIG['id'] . '/' . $endpoint;
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Basic ' . base64_encode($OPENPAY_CONFIG['private_key'] . ':')
    ]);
    
    if ($method === 'GET') {
        curl_setopt($ch, CURLOPT_HTTPGET, true);
    }
    
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    curl_close($ch);
    
    return [
        'success' => $httpCode >= 200 && $httpCode < 300,
        'data' => json_decode($response, true),
        'http_code' => $httpCode
    ];
}

try {
    if (!isset($_GET['pago_id'])) {
        throw new Exception("ID de pago requerido");
    }

    $pago_id = $_GET['pago_id'];
    
    $conn = new mysqli($host, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception('Error de conexión a base de datos');
    }
    
    $conn->set_charset("utf8");

    $stmt = $conn->prepare("SELECT * FROM pagos WHERE id = ?");
    $stmt->bind_param("i", $pago_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 0) {
        throw new Exception("Pago no encontrado");
    }

    $pago = $result->fetch_assoc();
    
    if (!$pago['referencia_externa']) {
        throw new Exception("No hay referencia de OpenPay para verificar");
    }

    $response = callOpenPayAPI('charges/' . $pago['referencia_externa']);

    if ($response['success'] && isset($response['data']['status'])) {
        $openpay_status = $response['data']['status'];
        $nuevo_estado = 'PENDIENTE';
        $message = '';

        switch ($openpay_status) {
            case 'completed':
                $nuevo_estado = 'COMPLETADO';
                $message = 'Su pago ha sido procesado exitosamente. Su suscripción académica está activa.';
                break;
            case 'failed':
            case 'cancelled':
                $nuevo_estado = 'FALLIDO';
                $message = 'El pago no pudo ser procesado. Por favor, intente nuevamente.';
                break;
            case 'in_progress':
            case 'charge_pending':
                $nuevo_estado = 'EN_PROCESO';
                $message = 'Su pago está siendo procesado. Recibirá una confirmación por correo.';
                break;
        }

        if ($nuevo_estado !== $pago['estado']) {
            $fecha_pago = ($nuevo_estado === 'COMPLETADO') ? date('Y-m-d H:i:s') : $pago['fecha_pago'];
            $authorization = $response['data']['authorization'] ?? $pago['autorizacion'];
            
            $stmt = $conn->prepare("UPDATE pagos SET 
                                   estado = ?, 
                                   fecha_pago = ?,
                                   autorizacion = ?,
                                   fecha_actualizacion = NOW()
                                   WHERE id = ?");
            $stmt->bind_param("sssi", $nuevo_estado, $fecha_pago, $authorization, $pago_id);
            $stmt->execute();

            if ($nuevo_estado === 'COMPLETADO' && $pago['suscripcion_id']) {
                $stmt = $conn->prepare("UPDATE suscripciones SET 
                                       estado = 'ACTIVA', 
                                       fecha_inicio = NOW(),
                                       fecha_actualizacion = NOW()
                                       WHERE id = ?");
                $stmt->bind_param("i", $pago['suscripcion_id']);
                $stmt->execute();
            }
        }

    } else {
        $message = 'No se pudo verificar el estado del pago. Revise su correo electrónico.';
        $nuevo_estado = $pago['estado'];
    }

} catch (Exception $e) {
    error_log("Error en 3DS callback: " . $e->getMessage());
    $message = 'Error en la verificación del pago: ' . $e->getMessage();
    $nuevo_estado = 'ERROR';
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado del Pago - SimplyEnglish</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f8fafc 0%, #e8f0fc 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0, 40, 104, 0.1);
            max-width: 600px;
            text-align: center;
        }
        .success {
            color: #10b981;
            border: 2px solid #10b981;
            background: #ecfdf5;
        }
        .error {
            color: #dc2626;
            border: 2px solid #dc2626;
            background: #fef2f2;
        }
        .warning {
            color: #f59e0b;
            border: 2px solid #f59e0b;
            background: #fffbeb;
        }
        .info {
            color: #3b82f6;
            border: 2px solid #3b82f6;
            background: #eff6ff;
        }
        .status-badge {
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1.1rem;
            margin: 20px 0;
            display: inline-block;
        }
        h1 {
            color: #002868;
            margin-bottom: 20px;
            font-size: 2rem;
        }
        .message {
            font-size: 1.1rem;
            line-height: 1.6;
            margin: 20px 0;
        }
        .close-btn {
            background: #6b7280;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 20px;
        }
        .close-btn:hover {
            background: #4b5563;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>SimplyEnglish</h1>
        
        <?php if (isset($nuevo_estado)): ?>
            <div class="status-badge <?= $nuevo_estado === 'COMPLETADO' ? 'success' : ($nuevo_estado === 'FALLIDO' ? 'error' : ($nuevo_estado === 'EN_PROCESO' ? 'info' : 'warning')) ?>">
                <?php
                switch ($nuevo_estado) {
                    case 'COMPLETADO':
                        echo 'Pago Completado';
                        break;
                    case 'FALLIDO':
                        echo 'Pago Fallido';
                        break;
                    case 'EN_PROCESO':
                        echo 'Pago en Proceso';
                        break;
                    default:
                        echo 'Estado del Pago';
                }
                ?>
            </div>
        <?php endif; ?>
        
        <div class="message">
            <?= htmlspecialchars($message ?? 'Error desconocido') ?>
        </div>
        
        <?php if (isset($pago_id)): ?>
            <p style="color: #6b7280; font-size: 0.9rem;">
                Referencia: SE-<?= str_pad($pago_id, 6, '0', STR_PAD_LEFT) ?>
            </p>
        <?php endif; ?>
        
        <button class="close-btn" onclick="window.close()">
            Cerrar Ventana
        </button>
        
        <script>
            setTimeout(function() {
                if (window.opener) {
                    window.opener.postMessage({
                        type: '3ds_complete',
                        status: '<?= $nuevo_estado ?? 'UNKNOWN' ?>',
                        message: '<?= addslashes($message ?? '') ?>'
                    }, '*');
                }
            }, 1000);
        </script>
    </div>
</body>
</html>