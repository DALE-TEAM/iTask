<?php
include_once '../config/database.php';
include_once '../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $oldemail = $data->oldEmail;
    $newemail = $data->newEmail;

    // U can do validation like unique username etc....

    $id= $conn->real_escape_string($_GET['id']);

    $sql = $conn->query("SELECT * FROM users WHERE email='$oldemail' and user_id='$id'");
    
    if ($sql->num_rows > 0) {

        $sql2 = $conn->query("UPDATE users SET email='$newemail' WHERE email='$oldemail'");
        http_response_code(201);
        echo json_encode(array('message' => 'Email modificata'));

    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Internal Server error  '));

    }
} else {
    http_response_code(405);
}
