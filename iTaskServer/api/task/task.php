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
        $sql= $conn->query("SELECT * FROM tasks	 WHERE remindersKey='$id' AND state='pending';");
        if($sql){
            while ($d = $sql->fetch_assoc()){
                $data[]=$d;
            }
            http_response_code(201);

        }
        else{
            http_response_code(500);
        }
       
    }
    if(isset($_GET['idTask'])){
        $idTask= $conn->real_escape_string($_GET['idTask']);
        $sql= $conn->query("SELECT favorite from tasks where task_id='$idTask';");
        if($sql){

            $result = $sql->fetch_assoc();
            $resFavorite = $result['favorite'];
            
           $starOutline='star-outline';
           $star='star';

            if($resFavorite == $starOutline){
                $sql1= $conn->query("UPDATE `tasks` SET `favorite`='star' WHERE tasks.task_id='$idTask';");
           // $resFavorite = 'changed in star';
            }
            if($resFavorite == $star){
                $sql1= $conn->query("UPDATE `tasks` SET `favorite`='star-outline' WHERE tasks.task_id='$idTask';");
           // $resFavorite = 'changhed in star-outline';
            }
    
            http_response_code(201);

        }
        else{
            http_response_code(500);
        }
       
    }
    if(isset($_GET['idD'])){
        $idD= $conn->real_escape_string($_GET['idD']);
        $sql= $conn->query("UPDATE `tasks` SET `state` = 'done' WHERE `tasks`.`task_id` = $idD;");
        
            http_response_code(200);

        
       
    }
    if(isset($_GET['idP'])){
        $idP= $conn->real_escape_string($_GET['idP']);
        $sql= $conn->query("UPDATE `tasks` SET `state` = 'pending' WHERE `tasks`.`task_id` = $idP;");
        
            http_response_code(200);

        
    }
    //return

    exit (json_encode($data));
}

/*
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
*/