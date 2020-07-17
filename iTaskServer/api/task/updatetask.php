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


    $sql0= $conn->query("SELECT remindersKey from tasks WHERE task_id='$id'");
    
        $result=$sql0->fetch_assoc();
        $last_id = $result['remindersKey'];
    
    $sql = $conn->query("UPDATE tasks 
        SET name='$name',
            note='$note',
            dateP= '$dateP',
            timeP='$timeP',
            priority='$priority',
            favorite='$favorite',
            URL='$url',
            remindersKey='$remindersKey'
        WHERE task_id='$id'");
    
    if ($sql) {
        $sql2= $conn->query ("SELECT numTask from reminders WHERE reminder_id='$last_id';");
        if($sql2->num_rows > 0){
            $data2=$sql2->fetch_assoc();
            $numTask = $data2['numTask'];
            $numTask=$numTask-1;
            $sql3=$conn->query("UPDATE reminders SET numTask = '$numTask' WHERE `reminders`.`reminder_id` = '$last_id';");
                if($sql3){
                 http_response_code(200);
                 $sql4= $conn->query ("SELECT numTask from reminders WHERE reminder_id='$remindersKey';");
                 $data3=$sql4->fetch_assoc();
                 $numTask = $data3['numTask'];
                 $numTask=$numTask+1;
                 $sql5=$conn->query("UPDATE reminders SET numTask = '$numTask' WHERE `reminders`.`reminder_id` = '$remindersKey';");
                }
                else{
                 http_response_code(500);
                 echo json_encode(array('message' => 'Internal Server error in update reminders set num task '));
                }
        }
        else {
        http_response_code(500);
        }
        http_response_code(200);
        echo json_encode(array('message' => 'Task modificata'));


    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Internal Server error  '));

    }
   // exit (json_encode($remindersKey));
} else {
    http_response_code(405);
}
