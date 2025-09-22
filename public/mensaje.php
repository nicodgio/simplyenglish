<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, User-Agent');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit();
}

// Usar $_POST para FormData
$input = $_POST;

if (empty($input)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No se recibieron datos']);
    exit();
}

$required_fields = ['nombre', 'email', 'asunto', 'mensaje'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => "El campo $field es requerido"]);
        exit();
    }
}

$bot_token = "8270319060:AAEhvFemccYqqLLveb8X9t8m3NT9YGQaTQM";
$chat_id = "-4831902561";

$nombre = htmlspecialchars(trim($input['nombre']));
$email = htmlspecialchars(trim($input['email']));
$telefono = !empty($input['telefono']) ? htmlspecialchars(trim($input['telefono'])) : 'No proporcionado';
$servicio = !empty($input['servicio']) ? htmlspecialchars(trim($input['servicio'])) : 'No especificado';
$asunto = htmlspecialchars(trim($input['asunto']));
$mensaje = htmlspecialchars(trim($input['mensaje']));

$servicio_nombres = [
    'simply-mensual' => 'Curso Simply English - Plan Mensual',
    'simply-trimestral' => 'Curso Simply English - Plan Trimestral',
    'cenni-basico' => 'Certificación CENNI Básico',
    'cenni-plus' => 'Certificación CENNI Plus',
    'cenni-pro' => 'Certificación CENNI Pro',
    'asesoria' => 'Asesoría Académica',
    'otro' => 'Información General'
];

$servicio_texto = isset($servicio_nombres[$servicio]) ? $servicio_nombres[$servicio] : $servicio;
$fecha = date('d/m/Y H:i:s');

$telegram_message = "🔔 *NUEVO MENSAJE DE CONTACTO*\n\n";
$telegram_message .= "👤 *Nombre:* $nombre\n";
$telegram_message .= "📧 *Email:* $email\n";
$telegram_message .= "📱 *Teléfono:* $telefono\n";
$telegram_message .= "🎯 *Servicio:* $servicio_texto\n";
$telegram_message .= "📋 *Asunto:* $asunto\n\n";
$telegram_message .= "💬 *Mensaje:*\n$mensaje\n\n";
$telegram_message .= "🕐 *Fecha:* $fecha\n";
$telegram_message .= "━━━━━━━━━━━━━━━━━━━━";

$telegram_data = [
    'chat_id' => $chat_id,
    'text' => $telegram_message,
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
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error de conexión: ' . $curl_error]);
    exit();
}

$telegram_response = json_decode($response, true);

if ($http_code !== 200 || !$telegram_response['ok']) {
    error_log("Error Telegram: " . $response);
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al enviar mensaje']);
    exit();
}

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Mensaje enviado correctamente'
]);
?>