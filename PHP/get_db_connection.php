<?php

    // returns a PHP data object (PDO)
    
    require // path to cs25320_db_secrets.php fix this so it leads to your secrets file

        //'/aber/eds/PHP/cs25320_db_secrets.php';    // On faculty Linux, also on central, central is /aber/eds

            'M:\documents\cs25320_db_secrets.php';          // On Inf. services Windows, central is M:

    function get_db_connection() {

        $data_source_name = DB_DRIVER.":host=".DB_HOST.";dbname=".DB_NAME;

        try {

            return new PDO($data_source_name, DB_USER, DB_PASSWORD);

        } catch (PDOException $e) {

            // could do something more useful here
            echo "couldn't get a handle on the database ".$e."\n";
            return NULL;
        }
    }
?>