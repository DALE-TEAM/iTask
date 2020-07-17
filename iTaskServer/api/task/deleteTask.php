<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../../vendor/autoload.php';

use \Firebase\JWT\JWT;

include_once 'config/cors.php';



if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    
    $data = array();
    if(isset($_GET['id'])){
         $id= $conn->real_escape_string($_GET['id']);
         $sql= $conn->query("SELECT remindersKey from tasks WHERE task_id='$id'");
        if($sql){
            $result=$sql->fetch_assoc();
            $last_id = $result['remindersKey'];
            
            $sql1= $conn->query("DELETE FROM tasks WHERE tasks.task_id= '$id' ");
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
       
exit (json_encode($last_id));

 }
}
 
 
 