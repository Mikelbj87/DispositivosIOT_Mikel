<?php

/* en este archivo borramos registros de la base de datos*/
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionBd.php');
$pId=stripslashes($_POST['Id']); 
$consulta = stripslashes("delete from IOT_MikelB  where id=$pId");
echo "ID: ".$pId."  CONSULTA  : ".$consulta;
$sql= mysqli_query($connect,$consulta);
echo "Resultado ".$sql;
mysql_close();

?>