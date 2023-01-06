//nada mas empezar el programa empezamos con la posicion del mapa donde nosotros estamos
navigator.geolocation.getCurrentPosition(pos => {
    //aqui tenemos las variables latitud y longitud con sus correspondientes valores
    latitud = pos.coords.latitude;
    longitud = pos.coords.longitude;

    //se las pasamos a la funcion inicio para que cargue el mapa
    inicio(latitud, longitud);
})

//funcion inicio a la que pasamos como argumentos la latitud y posicion acutales
function inicio(latitud, longitud) {
    //posicion inicial contiene las coordenadas actuales
    var posicionInicial = new google.maps.LatLng(latitud, longitud);
    var posicionFinal;

    //variable mapa que crea un mapa en html
    var map = new google.maps.Map(
        document.getElementById('map_canvas'), {
        // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
        center: new google.maps.LatLng(latitud, longitud),
        // zoom del mapa
        zoom: 18,
        // forma del cursor
        draggableCursor: 'auto',
        draggingCursor: 'crosshair',
        // tipo de mapa
        mapTypeId: google.maps.MapTypeId.SATELLITE 
    });

    //evento para cuando hacemos click el el mapa, se copien las coordenadas, la direccion y las distancia
    //entre este punto y la ubicacion actual, mediante una funcion anonima
    google.maps.event.addListener(map, 'click', function (event) {
        //tratamos los datos de donde el usuario clicka en el mapa
        var datolatitud_longitud = event.latLng.toString();
        datolatitud_longitud = datolatitud_longitud.substring(1, datolatitud_longitud.length - 1)
        //separamos el datolatitud_longitud para pasarselo a sus correspondientes variables
        cLatitud.value = (datolatitud_longitud.split(",")[0]).trim();
        cLongitud.value = (datolatitud_longitud.split(",")[1]).trim();
        //le damos a posicion final las coordenadas de donde el usuario a clickado
        posicionFinal = new google.maps.LatLng(cLatitud.value, cLongitud.value);

        //aspecto del icono
        var icono = {
            url: "./imagenes/icono2.png", 
            scaledSize: new google.maps.Size(25, 25), 
            origin: new google.maps.Point(0, 0), 
            anchor: new google.maps.Point(0, 0)
        };
        //maracador que se crea con el icono antes configurado, al que pasamos la posicion donde hicimos click
        //el icono antes creado, el mapa antes configurado y su nombre
        marker = new google.maps.Marker({
            position: event.latLng,
            icon: icono,
            map: map,
            nombre: 'Pepino'
        });
        //llamamos a la funcion leeDireccion() y le pasamos el punto donde el usuario hizo click
        leeDireccion(event.latLng);
        //llamamos a la funcion medir distancia, a la que pasamos la posiscion de nuestra ubicacion actual
        //y la ubicacion donde el usuario hizo click y nos devuelve la distancia en metros entre dichos puntos
        //y la visualiza en el cajon correspondiente
        medirDistancia(posicionInicial, posicionFinal);
    });
}

//Obtiene la longitud y la latitud correspondiente al clic y copia los datos en cajas de texto. Tambien obtiene
//la dirección del lugar donde hacemos clic
function leeDireccion(latlng) {
    //la funcion geocoder nos proporciona la direccion, y le tenemos que pasar un objeto latLng
    geocoder = new google.maps.Geocoder();
    if (latlng != null) {
        //si las coordenadas son correctas, llamamos a una funcion geocode y llamamos a una funcion anonima
        //que a la vez llama a la funcion muestradireccion
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    //llamamos a la funcion MuestraDireccion para visualizar la direccion de las coordenadas
                    MuestraDireccion(latlng, results[0].formatted_address)
                    //de lo contrario mostraremos mensajes de error
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    }
}

//funcion muestradireccion a la que pasamos la direccion y la muestra en sus correspondientes cajas
function MuestraDireccion(latlng, direccion) {
    direccionMapa.innerHTML = direccion;
    cDireccion.value = direccion;
}

//Funcion medir distancia a la que pasamos dos posiciones de google maps y nos devuelve la distancia en metros
function medirDistancia(posicionInicial, posicionFinal) {
    var distancia = google.maps.geometry.spherical.computeDistanceBetween(posicionInicial, posicionFinal);
    //la distancia la devuelve en su correspondiente cajon
    cDescripcion.value = distancia + " metros";
}