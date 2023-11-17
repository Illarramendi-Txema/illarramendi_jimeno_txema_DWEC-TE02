'use strict'

console.log('Empieza el programa')

// ------------------- VARIABLES GLOBALES ------------------------

// capturamos el formulario de introduccion de socios - Ejercicio 1
const formulario = document.querySelector('#formNombre');

// capturamos el contenedor donde escribiremos los socios - Ejercicio 2
const contSocios = document.getElementById('contenedorPintarSocios');

// TODO: array para añadir los socios
cargarSociosJSON()
// ------------------- FUNCIONES ------------------------

// EJERCICIO 1

/*
  funcion para leer del JSON
*/

function cargarSociosJSON() {
  
  let path = 'model/datosSocios.json'

  let request = new Request(path, 
    {headers: new Headers({
      'Content-Type': 'text/json'
    }),
    method: 'GET'
  })

  fetch(request).then(response => {
    response.json().then(data => {
      let mi_json = data.socios;
      aniadirSociosInicialesArray(mi_json);
    })
  })
}

/* 
TODO:  metodo para añadir socios al array 
    cuando arranca la pagina web
*/
var arraySocios = [];

function aniadirSociosInicialesArray(mi_json) {
  let socios = JSON.stringify(mi_json);
  let objetoParseado = JSON.parse(socios);
  arraySocios.push(...objetoParseado);

  /* este bucle lo he hecho con el proposito de comprobar el contenido del array
  (debug artesano) durante la creación del código pero como no modifica lo que
  muestra el navegador no lo borro ni lo comento */
  for (let i = 0; i < arraySocios.length; i++) {
    console.log(arraySocios[i]);
  }
}

/*
    TODO: Meotodo para capturar los datos del socio introducidor en el formulario

*/

function capturarDatosSocio() {
  // TODO: recoger el nombre y apellido del HTML
  let nombre = document.getElementById('fnombre').value;
  let apellido = document.getElementById('fapellido').value;

  // TODO: crear el socio y añadirlo al array
  crearSocio(nombre, apellido);
}

/* 
TODO: 
    Metodo para crear un socio pasandole el nombre y el apellido
    y añadirlo al array
 */
class Socios {
  // constructor
  constructor (id, nombre, apellido) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
  }
}

function crearSocio(nombre, apellido) {
  // TODO: crear objeto socio
  let soci = new Socios(crearID()+1, nombre, apellido);
  // TODO: añadir el objeto al array
  arraySocios.push(soci);
}

/*
TODO: 
    Metodo para crear el ID del socio en funcion del ultimo
    ID que hay en el array de socios
*/

function crearID() {
  // TODO: mirar el id del ultimo socio del array y sumarle uno
  let ultimo = arraySocios.length;
  return ultimo;
}

// EJERCICIO 2

/*
  TODO: metodo que elimina la lista previamente pintada en el contenedor asignado 
  para pintar socios, recorre el array con un bucle y pinta los socios 
*/
function pintarListaSocios() {
  //TODO: borramos todo lo que hay en el div
  borrarLista();
  
  //TODO: bucle para recorrer y pintar el array de socios
  //TODO: debemos añadir los socios a la pagina web
  for (let i = 0; i < arraySocios.length; i++) {
    //formateo el String par que muestre un texto más limpio y sin comillas para cada entrada
    let cadena_socio = ""+JSON.stringify(arraySocios[i].id)+" - "+JSON.stringify(arraySocios[i].nombre)+" "+JSON.stringify(arraySocios[i].apellido)+"";
    var cadena_limpia = cadena_socio.split('"').join(''); 

    let p = document.createElement('p');
    p.textContent = (cadena_limpia);
    contSocios.appendChild(p);
  }
}

//Mejoras

//Esto simplemente borra el contenido del div 'contenedorPintarSocios' no vacia el array
function borrarLista(){
  if (contSocios != null) {
    contSocios.innerHTML = '';
  }
}

//Vacia el array 
function vaciarArray(){
  while(arraySocios.length > 0){
    arraySocios.pop();
  }
}


// ------------------- MAIN ------------------------

// TODO: añadimos los socios iniciales cuando empieza el programa

console.log('Acaba el programa');
