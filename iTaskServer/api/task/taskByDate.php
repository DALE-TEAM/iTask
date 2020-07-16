<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../../vendor/autoload.php';

use \Firebase\JWT\JWT;

include_once 'config/cors.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
   // echo 'Get';
   $data = array();
   if(isset($_GET['id'])){
        $id= $conn->real_escape_string($_GET['id']);
        $date= $conn->real_escape_string($_GET['date']);
        $sql= $conn->query("SELECT t.*
                            FROM tasks as t,userReminder
                            WHERE t.remindersKey=userReminder.reminder
                            AND userReminder.user='$id'
                            AND t.dateP='$date'
                            AND t.state='pending';");
         if($sql){
            while ($d = $sql->fetch_assoc()){
                $data[]=$d;
            }
            http_response_code(200);

        }
        else{
            http_response_code(500);
        }

    }



    //return

    exit (json_encode($data));
}

