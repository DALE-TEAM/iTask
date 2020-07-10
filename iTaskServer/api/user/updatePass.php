<?php
include_once '../config/database.php';
include_once '../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

   
    $newPass = $data->newPass;
    $id= $conn->real_escape_string($_GET['id']);
    
    $hashed = password_hash($newPass, PASSWORD_DEFAULT);


    $sql = $conn->query("UPDATE users SET password='$hashed' WHERE user_id='$id'");
    if ($sql) {
        http_response_code(201);
        echo json_encode(array('message' => 'Email modificata'));
    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Internal Server error  '));

    }
} else {
    http_response_code(405);
}
