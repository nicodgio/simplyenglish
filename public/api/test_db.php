<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Diferentes configuraciones para probar (incluyendo variaciones de contraseña)
$configs = [
    [
        'name' => 'localhost_normal_password',
        'host' => 'localhost',
        'dbname' => 'u624785608_simplyenglish',
        'username' => 'u624785608_spenglish',
        'password' => 'SPAdmon2025#'
    ]
];

$results = [];

foreach ($configs as $config) {
    $test_result = [
        'config' => $config['name'],
        'host' => $config['host'],
        'username' => $config['username'],
        'database' => $config['dbname']
    ];
    
    try {
        $dsn = "mysql:host={$config['host']};charset=utf8mb4";
        $pdo = new PDO($dsn, $config['username'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => 5
        ]);
        
        $test_result['connection'] = 'success';
        
        // Verificar base de datos
        $stmt = $pdo->query("SHOW DATABASES LIKE '{$config['dbname']}'");
        $test_result['database_exists'] = $stmt->rowCount() > 0;
        
        if ($test_result['database_exists']) {
            // Conectar a la base de datos específica
            $dsn_with_db = "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4";
            $pdo_db = new PDO($dsn_with_db, $config['username'], $config['password'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);
            
            $test_result['database_connection'] = 'success';
            
            // Obtener información del usuario y base de datos
            $stmt = $pdo_db->query("SELECT USER(), DATABASE()");
            $info = $stmt->fetch(PDO::FETCH_ASSOC);
            $test_result['user_info'] = $info;
            
            // Verificar tablas existentes
            $stmt = $pdo_db->query("SHOW TABLES");
            $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
            $test_result['tables'] = $tables;
            
            // Probar permisos de inserción
            try {
                $pdo_db->query("SELECT 1 FROM usuarios LIMIT 1");
                $test_result['table_usuarios_accessible'] = true;
            } catch (Exception $e) {
                $test_result['table_usuarios_accessible'] = false;
                $test_result['table_error'] = $e->getMessage();
            }
        }
        
    } catch (PDOException $e) {
        $test_result['error'] = [
            'message' => $e->getMessage(),
            'code' => $e->getCode()
        ];
    }
    
    $results[] = $test_result;
}

// Información adicional del servidor
$server_info = [
    'php_version' => PHP_VERSION,
    'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown',
    'server_name' => $_SERVER['SERVER_NAME'] ?? 'unknown',
    'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'unknown'
];

echo json_encode([
    'tests' => $results,
    'server_info' => $server_info
], JSON_PRETTY_PRINT);
?>