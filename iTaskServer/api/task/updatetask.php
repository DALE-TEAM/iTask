<?php
include_once '../config/database.php';
include_once '../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $id = $data->id;
    $name = $data->name;
    $note = $data->note;
    $favorite = $data->favorite;
   
    $dateP= $data->dateP;
    $timeP= $data->timeP;
    $priority=$data->priority;
    $remindersKey = $data->reminder;

    

    if(isset($data->url)){
        $url = $data->url;
    } else {
        $url = '';
    }


    

    $sql = $conn->query("UPDATE tasks 
        SET name='$name',
            note='$note',
            dateP= '$dateP',
            timeP='$timeP',
            priority='$priority',
            URL='$url'
        WHERE task_id='$id'");
    
    if ($sql) {
       
        http_response_code(200);
        echo json_encode(array('message' => 'Task modificata'));


    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Internal Server error  '));

    }
} else {
    http_response_code(405);
}
