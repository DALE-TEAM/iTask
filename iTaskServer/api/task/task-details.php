<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../../vendor/autoload.php';

use \Firebase\JWT\JWT;

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
   // echo 'Get';
   $data = array();
   if(isset($_GET['id'])){
        $id= $conn->real_escape_string($_GET['id']);
        $sql= $conn->query("SELECT * FROM tasks	 WHERE task_id='$id';");
        if($sql){
            while ($d = $sql->fetch_assoc()){
                $data[]=$d;
            }
            http_response_code(201);

        }
        else{
            http_response_code(500);
        }
        exit (json_encode($data));
    }
}