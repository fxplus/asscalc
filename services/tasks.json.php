<?php
require_once("googledocs.php");
// require_once("includes/krumo/class.krumo.php");


$tasks_array = parse_google_schedule(google_input('assignment_tasks.csv'));
// krumo( $tasks_array );

foreach( $tasks_array as $task ) {
  $task['relativeduration'] = (int) $task['duration'];
  unset($task['duration']);
  $task['title'] = $task['phase'];
  unset($task['phase']);
  $tasks[] = $task;
}


if (is_array($tasks)) {
  (function_exists('krumo'))? krumo( $tasks ) : null;
  $json = json_encode($tasks);
  echo (file_put_contents('tasks.json', $json))? "json file created": "json was not created";
}
