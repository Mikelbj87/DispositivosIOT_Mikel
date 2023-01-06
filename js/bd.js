
//nada mas cargar la pagina
window.onload = function () {
    function modificado() {
        //en el boton pondra grabar registro
        grabarRegistro.value = "Grabar Registro";
    }
    cajasFormulario = document.getElementById("formulario").querySelectorAll("input");
    for (let i = 0; i < cajasFormulario.length; i++) {
        cajasFormulario[i].onmouseout = modificado;
    }

}

//evento para cuando pulsamos el boton de visualizar primer registro
let bPrimero = document.getElementById("visuPrimero");
bPrimero.addEventListener("click", visualizarPrimero, false);
//funcion para visualizar el primer registro de la base de datos
function visualizarPrimero() {
    let condicionSql = " order by id  ASC limit 1"
    generarRegistro(condicionSql)
}


//evento para cuando pulsamos el boton de visualizar ultimo registro
let bUltimo = document.getElementById("visuUltimo");
bUltimo.addEventListener("click", visualizarUltimo, false);
//funcion para visualizar el ultimo registro de la base de datos
function visualizarUltimo() {
    let condicionSql = " order by id  DESC limit 1"
    generarRegistro(condicionSql)
}


//evento para cuando pulsamos el boton de visualizar siguinete registro
let bSiguiente = document.getElementById("bSiguiente");
bSiguiente.addEventListener("click", visualizarSiguiente, false);
//funcion para visualizar el siguiente registro de la base de datos
function visualizarSiguiente() {
    let condicionSql = "where id >" + cId.value + " order by id  ASC limit 1"
    generarRegistro(condicionSql)
}

//evento para cuando pulsamos el boton de visualizar anterior registro
let bAnterior = document.getElementById("bAnterior");
bAnterior.addEventListener("click", visualizarAnterior, false);
//funcion para visualizar el anterior registro de la base de datos
function visualizarAnterior() {
    let condicionSql = "where id <" + cId.value + " order by id  DESC limit 1"
    generarRegistro(condicionSql)
}


//funcion generarRegistro, a la que pasamos una condicion sql y acaba llamando a mostrar consulta, esta funcion
//crea una conexion asincrona con la base de datos para ver el registro de la base de datos que deseemos
function generarRegistro(condicionSql) {
    //creamos conexion asincrona
    var ajaxrequest = new XMLHttpRequest();
    ajaxrequest.open("POST", "http://www.informaticasc.com/curso22_23/mikel/php/consultaPUSA.php", true);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.onreadystatechange = function () {

        if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
            var datosLeidos = ajaxrequest.responseText;

            if (datosLeidos != null) {
                mostrar_consulta(datosLeidos);
            }
        }
    };

    //le enviamos la condicion sql para visualizar l registro, ya sea el siguiente o el anterior
    let envio = "Envio=" + condicionSql;
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(envio);
}


//funcion mostrar consulta que en caso de tener un registro siguiente o anterior llamara a la funcion visualizarRegistro
//de lo contrario se le notificara al usuario
function mostrar_consulta(datos) {
    var lista = new Array();
    lista = JSON.parse(datos);
    if (lista != null) {
        visualizarRegistro(lista[0]);
    } else {
        //mandamos mensaje al usuario
        Swal.fire({
            title: 'No hay mas registros',
            imageUrl: 'imagenes/cancelar.webp',
            imageWidth: 200,
            imageHeight: 200,
        })
    }
}

let nuevo = true;

//funcion visualizar registro, a la que pasamos un registro y ella visualiza cada campo en cada caja correspondiente
function visualizarRegistro(registro) {
    cfc = registro.fecha.split("-");

    let fecha = cfc[0] + "-" + cfc[1] + "-" + cfc[2]

    cId.value = registro.id;
    cTipo.value = registro.tipo;
    cCantidad.value = registro.cantidad;
    cHora.value = registro.hora;
    cFecha.value = fecha;
    cLatitud.value = registro.latitud;
    cLongitud.value = registro.longitud;
    cDireccion.value = registro.direccion;
    cDescripcion.value = registro.descripcion;
    //pasamos la variable booleana nuevo a false
    nuevo = false;
    grabarRegistro.value = "Nuevo Registro";

}

//evento para cuando pulsamos el boton grabar registro
document.getElementById("grabarRegistro").addEventListener("mousedown", (evt) => {
    //si en el boton de grabar registro pone nuevo registro y pulsamos
    if (grabarRegistro.value == "Nuevo Registro") {
        //se ponen todos los campos a 0 esperando rellenarlos
        cId.value = "0";
        cTipo.value = "";
        cCantidad.value = "";
        cHora.value = "";
        cFecha.value = "";
        cLatitud.value = "";
        cLongitud.value = "";
        cDireccion.value = "";
        cDescripcion.value = "";
        //pasamos la variable booleana 0 a true
        nuevo = true;
    }
    //si en el boton grabar registro pone grabar registro
    if (grabarRegistro.value == "Grabar Registro") {
        grabarRegistro.value = "Nuevo Registro";
        //llamamos a la funcion grabar
        grabar()
    }

    event.preventDefault()

    if (evt.button == 2) {
        grabarRegistro.value = "Nuevo Registro"
    }
}, false)


//inicaializamos la variable envio
let envio = "";
//funcion grabar, que graba un nuevo registro en la base de datos
function grabar() {
    datosregistro = "Id=" + 0 + " & Tipo= '" + cTipo.value + "' & Cantidad= '" +
        cCantidad.value + "' & Hora= '" + cHora.value + "' & Fecha= '" + cFecha.value +
        "' & Longitud='" + cLongitud.value + "' & Latitud='" + cLatitud.value + "' & Direccion='" +
        cDireccion.value + "' & Descripcion='" + cDescripcion.value + "'";

    var ajaxrequest = new XMLHttpRequest();

    if (nuevo === true) {
        var jdatoselemento = datosregistro;
        envio = datosregistro;

        ajaxrequest.open("POST", "http://www.informaticasc.com/curso22_23/mikel/php/grabarModificarDispositivoIOT.php", true);

    }
    // Modificar Registro
    else {
        datosregistro = "Id=" + cId.value + " & Tipo= '" + cTipo.value + "' & Cantidad= '" +
            cCantidad.value + "' & Hora= '" + cHora.value + "' & Fecha= '" + cFecha.value + "' & Longitud='" +
            cLongitud.value + "' & Latitud='" + cLatitud.value + "' & Direccion='" + cDireccion.value +
            "' & Descripcion='" + cDescripcion.value + "'";

        envio = datosregistro
        ajaxrequest.open("POST", "http://www.informaticasc.com/curso22_23/mikel/php/grabarModificarDispositivoIOT.php", true);
    }


    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.onreadystatechange = function () {

        if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
            var datosLeidos = ajaxrequest.responseText;
            console.log("Datos Recibidos  :" + datosLeidos);
        }
    };
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajaxrequest.send(envio);
    //mandamos mensaje al usuario
    Swal.fire({
        title: 'Registro grabado con exito',
        imageUrl: 'imagenes/ok.png',
        imageWidth: 200,
        imageHeight: 200,
    })

}

//evento para cuando pulsamos el boton de borrar registro
document.getElementById("borrarRegistro").addEventListener("click", borrarRegistro, false
)
//funcion borrar registro, que mediante una conexion asincrona llamamos al archivo php encargado de borrar de la
//base de dadtos el registro visualizado
function borrarRegistro() {
    var ajaxrequest = new XMLHttpRequest();
    ajaxrequest.open("POST", "http://www.informaticasc.com/curso22_23/mikel/php/borrarRegistroDispositivoIOT.php", true);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.onreadystatechange = function () {

        if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
            var datosLeidos = ajaxrequest.responseText;
            console.log(datosLeidos);
            visualizarPrimero();
        }
    };

    let datosregistro = "Id=" + cId.value;

    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(datosregistro);
    //cuando la consulta es enviada se le envia un mesaje al usuario notificando que todo ok
    Swal.fire({
        title: 'Registro borrado con exito',
        imageUrl: 'imagenes/borrar.png',
        imageWidth: 200,
        imageHeight: 200,
    })
}


