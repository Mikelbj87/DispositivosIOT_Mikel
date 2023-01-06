<?php

/* en este archivo creamos una conexion asincrona con la base de datos de bueno bonito y barato*/
$host_name = "localhost";
$database = "s022045b_CiudadI";
$user_name = "s022045b_fer2122";
$password = "21Curso_22"; 

    $connect = mysqli_connect($host_name, $user_name, $password, $database);
    if(mysqli_connect_errno()) {
		echo '<p>"Error: Fallo al conectarse a MySQL debido a: '.mysqli_connect_error().'</p>';
    }

?>