<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
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

function logDebug($message) {
    error_log('[PROGRAMAS_API_DEBUG] ' . $message);
}

try {
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
    ];
    
    $pdo = new PDO($dsn, $username, $password, $options);
    logDebug('Conexión exitosa a la base de datos');
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        obtenerProgramas($pdo);
    } else {
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'error' => 'Método no permitido'
        ]);
    }

} catch (Exception $e) {
    logDebug('Error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error interno del servidor',
        'debug' => $e->getMessage()
    ]);
}

function obtenerProgramas($pdo) {
    try {
        // Obtener todos los programas activos
        $stmt = $pdo->prepare("
            SELECT id, codigo, nombre, descripcion, categoria, precio, 
                   duracion_meses, cantidad_niveles, activo
            FROM tipos_programa 
            WHERE activo = 1 
            ORDER BY 
                CASE categoria 
                    WHEN 'CONOCER_INDIVIDUAL' THEN 1
                    WHEN 'CONOCER_PAQUETE' THEN 2
                    WHEN 'CENNI' THEN 3
                    ELSE 4
                END,
                precio ASC
        ");
        $stmt->execute();
        $programas = $stmt->fetchAll();
        
        if (empty($programas)) {
            // Si no hay programas, devolver programas por defecto
            $programas_default = [
                [
                    'id' => null,
                    'codigo' => 'CONOCER_INDIVIDUAL',
                    'nombre' => 'CONOCER Nivel Individual',
                    'descripcion' => 'Un nivel de CONOCER',
                    'categoria' => 'CONOCER_INDIVIDUAL',
                    'precio' => 1245.00,
                    'duracion_meses' => 1,
                    'cantidad_niveles' => 1,
                    'activo' => 1
                ],
                [
                    'id' => null,
                    'codigo' => 'CONOCER_PAQUETE',
                    'nombre' => 'Paquete CONOCER (3 Niveles)',
                    'descripcion' => '3 niveles consecutivos de CONOCER',
                    'categoria' => 'CONOCER_PAQUETE',
                    'precio' => 3110.00,
                    'duracion_meses' => 3,
                    'cantidad_niveles' => 3,
                    'activo' => 1
                ],
                [
                    'id' => null,
                    'codigo' => 'CENNI_BASICO',
                    'nombre' => 'Certificación CENNI Básico',
                    'descripcion' => 'Examen básico de certificación',
                    'categoria' => 'CENNI',
                    'precio' => 1866.00,
                    'duracion_meses' => null,
                    'cantidad_niveles' => 1,
                    'activo' => 1
                ],
                [
                    'id' => null,
                    'codigo' => 'CENNI_PLUS',
                    'nombre' => 'Certificación CENNI Plus',
                    'descripción' => 'Examen intermedio de certificación',
                    'categoria' => 'CENNI',
                    'precio' => 2488.00,
                    'duracion_meses' => null,
                    'cantidad_niveles' => 1,
                    'activo' => 1
                ],
                [
                    'id' => null,
                    'codigo' => 'CENNI_PRO',
                    'nombre' => 'Certificación CENNI Pro',
                    'descripcion' => 'Examen avanzado de certificación',
                    'categoria' => 'CENNI',
                    'precio' => 3420.00,
                    'duracion_meses' => null,
                    'cantidad_niveles' => 1,
                    'activo' => 1
                ]
            ];
            
            logDebug('No se encontraron programas en la BD, devolviendo programas por defecto');
            $programas = $programas_default;
        }
        
        // Formatear programas para el frontend
        $programas_formateados = [];
        
        foreach ($programas as $programa) {
            $precio_formateado = number_format($programa['precio'], 0, '.', ',');
            
            // Crear label descriptivo según el tipo
            switch ($programa['categoria']) {
                case 'CONOCER_INDIVIDUAL':
                    $label = "CONOCER Nivel Individual ($" . $precio_formateado . " MXN/nivel)";
                    break;
                    
                case 'CONOCER_PAQUETE':
                    $ahorro = (1245 * 3) - $programa['precio'];
                    $ahorro_formateado = number_format($ahorro, 0, '.', ',');
                    $label = "Paquete CONOCER (3 Niveles) ($" . $precio_formateado . " MXN - Ahorras $" . $ahorro_formateado . ")";
                    break;
                    
                case 'CENNI':
                    $tipo = '';
                    if (strpos($programa['codigo'], 'BASICO') !== false) {
                        $tipo = 'Básico';
                    } elseif (strpos($programa['codigo'], 'PLUS') !== false) {
                        $tipo = 'Plus';
                    } elseif (strpos($programa['codigo'], 'PRO') !== false) {
                        $tipo = 'Pro';
                    }
                    $label = "Certificación CENNI $tipo ($" . $precio_formateado . " MXN)";
                    break;
                    
                default:
                    $label = $programa['nombre'] . " ($" . $precio_formateado . " MXN)";
            }
            
            $programas_formateados[] = [
                'value' => $programa['codigo'],
                'label' => $label,
                'precio' => (float)$programa['precio'],
                'categoria' => $programa['categoria'],
                'duracion_meses' => $programa['duracion_meses'],
                'cantidad_niveles' => (int)$programa['cantidad_niveles'],
                'descripcion' => $programa['descripcion'],
                'id' => $programa['id']
            ];
        }
        
        // Obtener también los niveles de inglés
        $niveles_ingles = [
            [
                'value' => 'principiante',
                'label' => 'Principiante (A1) - Empezar desde Nivel 1',
                'conocer_completado' => 0,
                'conocer_actual' => 1
            ],
            [
                'value' => 'basico',
                'label' => 'Básico (A2) - Empezar desde Nivel 2',
                'conocer_completado' => 1,
                'conocer_actual' => 2
            ],
            [
                'value' => 'intermedio-bajo',
                'label' => 'Intermedio Bajo (B1) - Empezar desde Nivel 3',
                'conocer_completado' => 2,
                'conocer_actual' => 3
            ],
            [
                'value' => 'intermedio',
                'label' => 'Intermedio (B2) - Empezar desde Nivel 4',
                'conocer_completado' => 3,
                'conocer_actual' => 4
            ],
            [
                'value' => 'intermedio-alto',
                'label' => 'Intermedio Alto (B2+) - Empezar desde Nivel 5',
                'conocer_completado' => 4,
                'conocer_actual' => 5
            ],
            [
                'value' => 'avanzado',
                'label' => 'Avanzado (C1) - Empezar desde Nivel 6',
                'conocer_completado' => 5,
                'conocer_actual' => 6
            ],
            [
                'value' => 'avanzado-alto',
                'label' => 'Avanzado Alto (C1+) - Empezar desde Nivel 7',
                'conocer_completado' => 6,
                'conocer_actual' => 7
            ],
            [
                'value' => 'superior',
                'label' => 'Superior (C2) - Empezar desde Nivel 8',
                'conocer_completado' => 7,
                'conocer_actual' => 8
            ],
            [
                'value' => 'no-se',
                'label' => 'No estoy seguro (evaluación requerida)',
                'conocer_completado' => 0,
                'conocer_actual' => 1
            ]
        ];
        
        logDebug('Programas obtenidos exitosamente: ' . count($programas_formateados));
        
        echo json_encode([
            'success' => true,
            'data' => [
                'programas' => $programas_formateados,
                'niveles_ingles' => $niveles_ingles
            ],
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        
    } catch (Exception $e) {
        logDebug('Error al obtener programas: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error al obtener programas de la base de datos'
        ]);
    }
}

logDebug('Script de programas finalizado');
?>