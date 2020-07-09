<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../../vendor/autoload.php';

use \Firebase\JWT\JWT;

include_once 'config/cors.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

   $data = array();
   if(isset($_GET['id'])){
        $id= $conn->real_escape_string($_GET['id']);
        $sql= $conn->query("SELECT * FROM tasks	 WHERE remindersKey='$id';");
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
    //return

    exit (json_encode($data));
