<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../../vendor/autoload.php';

use \Firebase\JWT\JWT;

include_once 'config/cors.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
   // echo 'Get';
   
   if(isset($_GET['idAll'])){
        $id= $conn->real_escape_string($_GET['idAll']);
        $sql= $conn->query("SELECT t.*
                            FROM tasks as t,userReminder
                            WHERE t.remindersKey=userReminder.reminder 
                            AND userReminder.user='$id'
                            AND t.state='pending';");
         if($sql){
            $numeroTotTask= $sql->num_rows;
            http_response_code(200);

        }
        else{
            http_response_code(500);
        }
       
    }
    if(isset($_GET['idToday'])){
        $id= $conn->real_escape_string($_GET['idToday']);
        $dataOdierna=date ("Y/m/d");
        $sql= $conn->query("SELECT t.*
                            FROM tasks as t,userReminder
                            WHERE t.remindersKey=userReminder.reminder 
                            AND userReminder.user='$id'
                            AND t.dateP='$dataOdierna'
                            AND t.state='pending';");
         if($sql){
            $numeroTotTask= $sql->num_rows;
            http_response_code(200);

        }
        else{
            http_response_code(500);
        }
       
    }
    
    if(isset($_GET['idFavorite'])){
        $id= $conn->real_escape_string($_GET['idFavorite']);
        $sql= $conn->query("SELECT t.*
                            FROM tasks as t,userReminder
                            WHERE t.remindersKey=userReminder.reminder 
                            AND userReminder.user='$id'
                            AND t.favorite='star'
                            AND t.state='pending';");
         if($sql){
            $numeroTotTask= $sql->num_rows;
            http_response_code(200);

        }
        else{
            http_response_code(500);
        }
       
    }
    
    
    //return

    exit (json_encode($numeroTotTask));
}

