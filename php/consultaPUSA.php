<?php

/* en este archivo creamos una conexion asincrona con la base de datos de bueno bonito y barato para poder
visualizar los registros ya creados*/
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionBd.php');
$contenido=$_POST['Envio'];
$sql = "SELECT * FROM IOT_MikelB ".$contenido;    
$resultado = mysqli_query($connect, $sql);

while ($row = mysqli_fetch_assoc($resultado)) {
    $output[] = $row;
}

print(json_encode($output));
$connect->close();

?>