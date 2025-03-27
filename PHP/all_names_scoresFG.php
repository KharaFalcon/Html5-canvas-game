<?php
   
    // random leaderboard demo
    
    // open a connection to the database as a PDO
    require 'get_db_connection.php';
    $conn = get_db_connection();

    // a single query with no parameters, so simplest form is good enough
    $query = "select (name,score) from fishGameLeaderboard order by score desc";

    $result = $conn -> query($query);

    // pass an array of names and scores back to the JavaScript program
    echo json_encode($result->fetchAll(PDO::FETCH_COLUMN));

    // close the connection
    $conn = null;
?>