<?php
    include_once '../config/cors.php';
    include_once '../config/database.php';
    include_once '../../vendor/autoload.php';



    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        // $data = json_decode(file_get_contents("php://input"));

        $condition = $conn->real_escape_string($_GET['word']);

        // $sql = $conn->query(" SELECT reminder_id, tasks.task_id AS task_id, reminders.name AS nameR, tasks.name AS nameT 
        //     FROM reminders, tasks 
        //     WHERE reminders.reminder_id=tasks.remindersKey 
        //         AND (reminders.name LIKE '%$condition%' OR tasks.name LIKE '%$condition%') ");


        $sql= $conn->query("SELECT * FROM reminders WHERE name LIKE '%$condition%'");
        $result= array();


        if ($sql) {
            http_response_code(201);
                while ($d = $sql->fetch_assoc()){
                        $result[]=$d;
                }

        }
        else {
            http_response_code(500);
            echo json_encode(array('message' => 'Internal Server error  '));

        }
        exit (json_encode($result));
    }

    else {
        http_response_code(405);
    }