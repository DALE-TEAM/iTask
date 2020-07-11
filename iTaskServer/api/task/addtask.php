<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../../vendor/autoload.php';

use \Firebase\JWT\JWT;

include_once 'config/cors.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    $data = json_decode(file_get_contents("php://input"));
 
     $name = $data->name;
     $note = $data->note;
     $dateP= $data->dateP;
    // $timeP= $data->timeP;
     $timeP= '9:00';
     $priority=$data->priority;
     $state = 'pending';
     $favorite = $data->favorite;
     $url = $data->url;
     $remindersKey = $data->reminder;


 
      $sql = $conn->query("INSERT INTO tasks (name, note, dateP,timeP,priority,state,favorite,url,remindersKey) 
                            VALUES ('$name', '$note', '$dateP','$timeP','$priority','$state','$favorite','$url','$remindersKey')");
     if ($sql) {

        $last_id = $remindersKey;
             
        //aggiungere add numTask su REMINDERS    
        $sql2= $conn->query ("SELECT numTask from reminders WHERE reminder_id='$last_id';");
        if($sql2->num_rows > 0){
            $data2=$sql2->fetch_assoc();
            $numTask = $data1['numTask'];
            $numTask=$numTask+1;
            $sql3=$conn->query("UPDATE reminders SET numTask = '$numTask' WHERE `reminders`.`reminder_id` = '$last_id';");
             if($sql3){
                http_response_code(201);
             }
             else{
                 http_response_code(500);
                 echo json_encode(array('message' => 'Internal Server error in update reminders set num task '));
             }
         }
        else {
         http_response_code(500);
         echo json_encode(array('message' => 'Internal Server error '));
         }
     
        }
        else{
            http_response_code(500);
            echo json_encode(array('message' => 'Internal Server error  '));  
        }
 
 

   //return

   exit (json_encode($last_id));
}