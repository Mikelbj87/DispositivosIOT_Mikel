<?php

/* en este archivo creamos una conexion asincrona con la base de datos de bueno bonito y barato para poder
grabaar un nuevo registro o para poder modificarlo*/
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionBd.php');

$pId=stripslashes($_POST['Id']);
$pTipo=$_POST['Tipo'];
$pCantidad=$_POST['Cantidad'];
$pHora=$_POST['Hora'];
$pFecha=$_POST['Fecha'];
$pLatitud=$_POST['Latitud'];
$pLongitud=$_POST['Longitud'];
$pDireccion=$_POST['Direccion'];
$pDescripcion=$_POST['Descripcion'];

if($pId==0){
$consulta =stripslashes("insert into IOT_MikelB values(0,$pTipo,$pCantidad,$pHora,$pFecha,$pLatitud,$pLongitud,$pDireccion,$pDescripcion)");
} else {
$consulta = stripslashes("update IOT_MikelB set Tipo=$pTipo,Cantidad=$pCantidad,Hora=$pHora,Fecha=$pFecha,Latitud=$pLatitud,Longitud=$pLatitud,Direccion=$pDireccion,Descripcion=$pDescripcion where id=$pId");
}
echo "ID: ".$pId."  CONSULTA  : ".$consulta;
$sql= mysqli_query($connect,$consulta);

echo "Resultado ".$sql;
mysql_close();

?>