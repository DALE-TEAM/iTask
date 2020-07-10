<?php 
    include_once '../config/cors.php';
    include_once '../config/database.php';
    include_once '../../vendor/autoload.php';
    

    use \Firebase\JWT\JWT;

    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        if(isset($_GET['user'])){

        $user= $conn->real_escape_string($_GET['user']);
            
        $sql= $conn->query("DELETE FROM users WHERE user_id = $user;");

        }
    
        if ($sql) {
                 http_response_code(201);
 
                 echo json_encode(array('message' => 'Account eliminato correttamente  '));
             }
             else {
                     http_response_code(500);
                    echo json_encode(array('message' => 'Internal Server error   '));
 
                 }
 
    }
     