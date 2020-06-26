<?php 
    include_once '../config/cors.php';
    include_once '../config/database.php';
    include_once '../../vendor/autoload.php';
    

    use \Firebase\JWT\JWT;

    if($_SERVER['REQUEST_METHOD']== 'POST'){
        $data = json_decode(file_get_contents("php://input"));

        $email = $data->email;
        $pass = $data->password;

        $sql = $conn->query("SELECT * FROM users WHERE email = '$email'");
        if ($sql->num_rows > 0) {
            $user = $sql->fetch_assoc();
           // if (password_verify($pass, $user['password'])) {
                
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
            // } else {
            //     http_response_code(400);
            //     echo json_encode(array('message' => 'Login Failed!'));
            // }
        } else {
            http_response_code(404);
            echo json_encode(array('message' => 'Login Failed!'));
        }
    }