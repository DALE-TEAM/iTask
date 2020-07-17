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
        $sql= $conn->query("SELECT remindersKey from tasks WHERE task_id='$idD'");
        if($sql){
            $result=$sql->fetch_assoc();
            $last_id = $result['remindersKey'];
            
            $sql1= $conn->query("UPDATE `tasks` SET `state` = 'done' WHERE `tasks`.`task_id` = $idD;");
            if($sql1){
                
                $sql2= $conn->query ("SELECT numTask from reminders WHERE reminder_id='$last_id';");
                if($sql2->num_rows > 0){
                    $data2=$sql2->fetch_assoc();
                    $numTask = $data2['numTask'];
                    $numTask=$numTask-1;
                    $sql3=$conn->query("UPDATE reminders SET numTask = '$numTask' WHERE `reminders`.`reminder_id` = '$last_id';");
                        if($sql3){
                         http_response_code(200);
                        }
                        else{
                         http_response_code(500);
                         echo json_encode(array('message' => 'Internal Server error in update reminders set num task '));
                        }
                }
                else {
                http_response_code(500);
                }
            }
            else {
            http_response_code(500);
            }
        }
        else{
           http_response_code(500); 
        }
       
       
        http_response_code(200);
    }


    if(isset($_GET['idP'])){
        $idP= $conn->real_escape_string($_GET['idP']);
        $sql= $conn->query("SELECT remindersKey from tasks WHERE task_id='$idP'");
        if($sql){
            $result=$sql->fetch_assoc();
            $last_id = $result['remindersKey'];
            
            $sql1= $conn->query("UPDATE `tasks` SET `state` = 'pending' WHERE `tasks`.`task_id` = $idP;");
            if($sql1){
                
                $sql2= $conn->query ("SELECT numTask from reminders WHERE reminder_id='$last_id';");
                if($sql2->num_rows > 0){
                    $data2=$sql2->fetch_assoc();
                    $numTask = $data2['numTask'];
                    $numTask=$numTask+1;
                    $sql3=$conn->query("UPDATE reminders SET numTask = '$numTask' WHERE `reminders`.`reminder_id` = '$last_id';");
                        if($sql3){
                         http_response_code(200);
                        }
                        else{
                         http_response_code(500);
                         echo json_encode(array('message' => 'Internal Server error in update reminders set num task '));
                        }
                }
                else {
                http_response_code(500);
                }
            }
            else {
            http_response_code(500);
            }
        }
        else{
           http_response_code(500); 
        }
       


 }
       
    
    //return

    exit (json_encode($data));   
}
