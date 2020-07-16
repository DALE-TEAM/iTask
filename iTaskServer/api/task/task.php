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
        
       /* if($sql){
            $sql1= $conn->query("SELECT `remindersKey` FROM `tasks` WHERE `task_id` = '$idP';");
            $result = $sql1->fetch_assoc();
            $resRemindersKey = $result['remindersKey'];
          
          
            if ($sql1){
              
                
                $sql2=("SELECT `numTask` FROM `reminders` WHERE `reminder_id` = '$resRemindersKey';");
                $result2=$sql2->fetch_assoc();
                $numTask = $result2['numTask'];
                $numTask--;
               if($sql2){
                    $sql3=$conn->query("UPDATE reminders SET numTask = '$numTask' WHERE reminder_id = '$resRemindersKey';");
                  
                
                   
                }
                else{
                    http_response_code(500);
                 } 
            }
            else{
                http_response_code(500);
            } 
            
        }
        else {
             http_response_code(500);
        }    
        
        */
        http_response_code(200);
    }


    if(isset($_GET['idP'])){
        $idP= $conn->real_escape_string($_GET['idP']);
        $sql= $conn->query("UPDATE `tasks` SET `state` = 'pending' WHERE `tasks`.`task_id` = $idP;");
       
       
    }
    //return

  //  exit (json_encode($data));   
}
