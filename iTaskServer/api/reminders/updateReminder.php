<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../../vendor/autoload.php';

use \Firebase\JWT\JWT;


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    $data = json_decode(file_get_contents("php://input"));
 
     
     $name = $data->name;
     $icon = $data->icon;
     $color= $data->color;
     $id =  $data->reminder_id;
 
    $sql = $conn->query("UPDATE reminders SET icon = '$icon', name = '$name ', color = '$color' WHERE reminders.reminder_id = '$id';");
     if ($sql) {

        http_response_code(200);
        
     } else {
         http_response_code(501);
         echo json_encode(array('message' => 'Internal Server error 1234 '));
 
     }
 
 
 

   //return

   exit (json_encode($id));
}
