<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../../vendor/autoload.php';

use \Firebase\JWT\JWT;

 if ($_SERVER['REQUEST_METHOD'] == 'POST') {

       $data = json_decode(file_get_contents("php://input"));


        $email = $data->email;
        $id = $data->id;


         $sql = $conn->query("SELECT user_id FROM users WHERE email='$email'");
        if ($sql) {
            if($sql->num_rows > 0){
                $data1=$sql->fetch_assoc();
                $user_id = $data1['user_id'];
                $sql1= $conn->query ("INSERT INTO userReminder (user, reminder) VALUES ('$user_id', '$id')");


                if ($sql1){
                $sql2= $conn->query ("UPDATE reminders SET shared = '1' WHERE reminder_id = '$id';");
                    http_response_code(201);
                   // echo json_encode(array('message' => 'Reminder created'));
                }
                else{
                    http_response_code(501);
                    echo json_encode(array('message' => 'Internal Server error  '));
                }

            }


        } else {
            http_response_code(500);
            echo json_encode(array('message' => 'Internal Server error  '));

        }




      //return

      exit (json_encode($id));
 }

 if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // echo 'Get';
    $data = array();
    if(isset($_GET['id'])){
         $id= $conn->real_escape_string($_GET['id']);
         $sql= $conn->query("SELECT users.email FROM userReminder, users
                             WHERE userReminder.reminder='$id'
                             AND userReminder.user=users.user_id");

         while ($d = $sql->fetch_assoc()){
                 $data[]=$d;

             }

     }




      //return

     exit (json_encode($data));
}


