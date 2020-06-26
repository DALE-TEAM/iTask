<?php
include_once '../config/database.php';
include_once '../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $email = $data->email;
	$password = $data->password;
	$name = $data->nome;
    $surname = $data->cognome;

    // Hash Password
    $hashed = password_hash($password, PASSWORD_DEFAULT);

    // U can do validation like unique username etc....


    $sql = $conn->query("INSERT INTO users (name, surname, email, password) VALUES ('$name', '$surname', '$email', '$hashed')");
    if ($sql) {
        http_response_code(201);
        echo json_encode(array('message' => 'User created'));
    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Internal Server error  '));

    }
} else {
    http_response_code(405);
}

