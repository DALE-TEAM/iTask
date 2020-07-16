<?php
include_once '../config/database.php';
include_once '../config/cors.php';
include_once '../../vendor/autoload.php';

use \Firebase\JWT\JWT;


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $email = $data->email;
	$name = $data->name;
    $surname = $data->lastname;

    $password='admin1234';

    // Hash Password
    $hashed = password_hash($password, PASSWORD_DEFAULT);

    // U can do validation like unique username etc....


    $sql = $conn->query("INSERT INTO users (name, surname, email, password) VALUES ('$name', '$surname', '$email', '$hashed')");
    
    if ($sql) {

        $sql2 = $conn->query("SELECT * FROM users WHERE email = '$email'");
        
        if ($sql2->num_rows > 0) {
            
            $user = $sql2->fetch_assoc();
                
            $key = "auth_token";  // JWT KEY
                
            $payload = array(
                'user_id' => $user['user_id'],
                'name' => $user['name'],
                'surname' => $user['surname'],
                'email' => $user['email'],
                'img' => $user['img']
            );

            $token = JWT::encode($payload, $key);
            http_response_code(200);
            echo json_encode(array('token' => $token)); 

        } else {
            http_response_code(400);
            echo 'errore';
        }
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Failed!'));
    }
}