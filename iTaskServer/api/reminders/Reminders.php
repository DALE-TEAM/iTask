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
        $sql= $conn->query("SELECT  reminder_id, icon, name, color, numTask FROM reminders  JOIN userReminder ON reminders.reminder_id = userReminder.reminder 
        WHERE userReminder.user='$id';");
       
        while ($d = $sql->fetch_assoc()){
                $data[]=$d;

            }

    }

    if(isset($_GET['idR'])){
        $id= $conn->real_escape_string($_GET['idR']);
        $sql= $conn->query("SELECT  reminder_id, icon, name, color, numTask FROM reminders  
        WHERE reminder_id='$id';");
       
        while ($d = $sql->fetch_assoc()){
                $data[]=$d;

            }

    }

   
     //return

    exit (json_encode($data));
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    
    $data = array();
    if(isset($_GET['id'])){
         $id= $conn->real_escape_string($_GET['id']);
       
         $sql= $conn->query("DELETE FROM tasks WHERE tasks.remindersKey= '$id' ");
         if($sql){
            $sql1= $conn->query("DELETE FROM userReminder WHERE userReminder.reminder= '$id' ");
            if($sql1){
                $sql2= $conn->query("DELETE FROM reminders WHERE reminders.reminder_id= '$id' ");
                if($sql2){

                }
                else{
                    http_response_code(500);
                }
            }
            else{
                
             }


            $sql1= $conn->query("DELETE r.*, u.*
         FROM reminders AS r, userReminder as u
         WHERE r.reminder_id=u.reminder
         AND r.reminder_id= '$id'");
         if($sql2){
            http_response_code(201);
         }
         else{
            http_response_code(500);
         }
         }
         else {
            http_response_code(500);
         }
         

        
         
 
     }


    
      //return
 
     exit (json_encode($data));
 }
 
 
 if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
       $data = json_decode(file_get_contents("php://input"));
    
        
        $name = $data->name;
        $icon = $data->icon;
        $color= $data->color;
        $user =  $data->user;
    
         $sql = $conn->query("INSERT INTO reminders (name, icon, color) VALUES ('$name', '$icon', '$color')");
        if ($sql) {

            $sql1= $conn->query ("SELECT reminder_id from reminders ORDER BY reminder_id DESC LIMIT 1");
            if($sql1->num_rows > 0){
                $data1=$sql1->fetch_assoc();
                $last_id = $data1['reminder_id'];
            
                $sql2 = $conn->query("INSERT INTO userReminder (user, reminder) VALUES ('$user', '$last_id')");
                if ($sql2){
                    http_response_code(201);
                   // echo json_encode(array('message' => 'Reminder created'));
                }
                else{
                    http_response_code(500);
                    echo json_encode(array('message' => 'Internal Server error  '));
                }
            
            }

           
        } else {
            http_response_code(500);
            echo json_encode(array('message' => 'Internal Server error  '));
    
        }
    
    
    
   
      //return
 
      exit (json_encode($last_id));
 }
