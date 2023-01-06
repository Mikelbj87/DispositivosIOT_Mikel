<?php

require('fpdf.php');
class PDF extends FPDF {
   //Cabecera de p�gina
	function Header() {
      //Logo
	$this->Image("../imagenes/Logo.jpg", 5, 5, 50, 25, "JPG");
 
      //Arial bold 15
	 
	    $this->SetFont('Arial', 'B', 24);
      //Movernos a la derecha
		$this->Cell(160,10,utf8_decode('Listado dispositivos IOT'),2,0,'R');
		$this->Ln();
		$this->Cell(70);
		
        $this->SetFillColor(224,224,224);
		$this->Cell(90,10,utf8_decode('==========================='),2,0,'R',True);
      //Salto de línea
		$this->Ln(15);

	}
// Pie de p�gina
function Footer() {
    // Posición: a 1,5 cm del final
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',12);
    // N�mero de página
    $this->Cell(0,10,'Mikel Bermejo Jorge  ' ,0,0,'C');
	   $this->SetFont('Arial','I',8);
	   $this->Cell(0,10,'  Pgna.: '.$this->PageNo() ,0,0,'C');
}
}
$w=array(20,110,20,20,20);
$alturafila=5;
$alturafila2=8;
 
//Creaci�n del objeto de la clase heredada
$pdf=new PDF();
$pdf->SetMargins(10, 15 , 20);
$pdf->AddPage();

$pdf->SetFillColor(224,224,224);
$pdf->Ln(5);
$pdf->SetFont('Arial','B',10);
$pdf->SetDrawColor(0,80,180);
$pdf->SetFillColor(247,255,196);
$pdf->SetTextColor(220,50,50);
    // Ancho del borde (1 mm)
$pdf->SetLineWidth(0.2);

$pdf->Cell(20,$alturafila2,utf8_decode('Tipo'),1,0,'L',True);
$pdf->Cell(110,$alturafila2,utf8_decode('Direccion'),1,0,'C');
$pdf->Cell(20,$alturafila2,utf8_decode('Fecha'),1,0,'L',True);
$pdf->Cell(20,$alturafila2,utf8_decode('Hora'),1,0,'C');
$pdf->Cell(20,$alturafila2,utf8_decode('Cantidad'),1,1,'L',True);

$pdf->SetFont('Arial','',10);
 $pdf->SetDrawColor(0,80,180);
    $pdf->SetFillColor(230,230,0);
    $pdf->SetTextColor(0,0,0);
    // Ancho del borde (1 mm)
    $pdf->SetLineWidth(0.2);

	
function cabecera($pdf) {

 $pdf->SetMargins(10, 15 , 20);
$pdf->SetFillColor(224,224,224);
$pdf->Ln(5);
$pdf->SetFont('Arial','B',10);
$pdf->SetDrawColor(0,80,180);
$pdf->SetFillColor(247,255,196);
$pdf->SetTextColor(220,50,50);
    // Ancho del borde (1 mm)
$pdf->SetLineWidth(2);
$alturafila2=8;
 
$pdf->Cell(20,$alturafila2,utf8_decode('Tipo'),1,0,'L',True);
$pdf->Cell(110,$alturafila2,utf8_decode('Direccion '),1,0,'C');
$pdf->Cell(20,$alturafila2,utf8_decode('Fecha'),1,0,'L',True);
$pdf->Cell(20,$alturafila2,utf8_decode('Hora'),1,0,'C');
$pdf->Cell(20,$alturafila2,utf8_decode('Cantidad'),1,1,'L',True);

$pdf->SetFont('Arial','',10);
 $pdf->SetDrawColor(0,80,180);
    $pdf->SetFillColor(230,230,0);
    $pdf->SetTextColor(0,0,0);
    // Ancho del borde (1 mm)
    $pdf->SetLineWidth(0.2);
	 $pdf->SetFillColor(226,247,254);
	 $pdf->Ln(5);
}

include '../php/conexionBd.php';
if ($connect->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
} else {
    $sql = "select * from IOT_MikelB order by id";
    $resultado = mysqli_query($connect, $sql);

    if (!$resultado) {
        echo "Error";
    } else {
		$pintaFondo='True';
		$nlinea=0;
		 $pdf->SetFillColor(226,247,254);
        while ($fila = mysqli_fetch_row($resultado)) {
			$pdf->Cell($w[0],$alturafila2,utf8_decode($fila[1]),1,0,'L',$pintaFondo);
			$pdf->Cell($w[1],$alturafila2,utf8_decode($fila[7]),1,0,'L',$pintaFondo);
			$pdf->Cell($w[2],$alturafila2,utf8_decode($fila[4]),1,0,'L',$pintaFondo);
			$pdf->Cell($w[3],$alturafila2,utf8_decode($fila[3]),1,0,'C',$pintaFondo);
			$pdf->Cell($w[4],$alturafila2,utf8_decode($fila[2]),1,0,'R',$pintaFondo);
			$pdf->Ln();
			if(	$pintaFondo=='True'){	$pintaFondo='';}else{$pintaFondo='True';}
			$nlinea=$nlinea+1;

			if($nlinea>10){$nlinea=0;$pdf->AddPage();

            cabecera($pdf);
			}
	     }
    } 

mysqli_free_result($resultado);
$pdf->Ln();

$filename="EUrbanos.pdf";
$pdf->Output($filename,"D");

	}
	?>