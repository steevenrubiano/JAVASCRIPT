$(document).ready(initializeEvents);
function initializeEvents(){
    mostrarDato(); //Al cargar que muestre si ya hay alguna peli
   $("#boton1").click(guardarDato);
   $("#boton2").click(modificarDato);
   $("#boton3").click(borrarDato);
}
//POST
function guardarDato(){
    $.ajax({
        type:"POST",
        data:{
            "id":$("#id").val(),
            "titulo":$("#titulo").val(),
            "director":$("#director").val(),
            "sinopsis":$("#sinopsis").val(),
            "fecha":$("#fecha").val()
        },
        dataType:"json",
        url:"http://localhost:3000/peliculas"
    }).done(mostrarDato).fail(peticionFallida);
}

//DELETE
function borrarDato(){
    $.ajax({
       type:"DELETE",
       dataType:"json",
       url:"http://localhost:3000/peliculas/" + id
   }).done(mostrarDato).fail(peticionFallida);
}

//PUT
function modificarDato(){
    $.ajax({
        type:"PUT",
        data:{
            "id":$("#id").val(),
            "titulo":$("#titulo").val(),
            "director":$("#director").val(),
            "sinopsis":$("#sinopsis").val(),
            "fecha":$("#fecha").val()
        },
        dataType:"json",
        url:"http://localhost:3000/peliculas/" + id
    }).done(mostrarDato).fail(peticionFallida);
}

//GET
function mostrarDato(){
    $.ajax({
        type:"GET",
        dataType:"json",
        url:"http://localhost:3000/peliculas"
    }).done(peticionCompletada).fail(peticionFallida);
}
function peticionCompletada(data){
    $("tbody").empty();
    for(var i=0; i<data.length; i++){
        $("tbody").append("<tr><td>"+data[i].id+"</td><td>"+data[i].titulo+"</td><td>"+data[i].director+"</td><td>"+data[i].sinopsis+"</td><td>"+data[i].fecha+"</td></tr>");
    }
    $("tbody tr").click(seleccionarFila);
}
function peticionFallida(){
    alert("Error al procesar la peticion");
}

function seleccionarFila(){
    let contador = 0;
    let arrayCeldas = new Array();
    $(this).find('td').each(function(){ arrayCeldas[contador] = ($(this).html()); contador++;});
    id = arrayCeldas[0];
    $("#id").val(arrayCeldas[0]);
    $("#titulo").val(arrayCeldas[1]);
    $("#director").val(arrayCeldas[2]);
    $("#sinopsis").val(arrayCeldas[3]);
    $("#fecha").val(arrayCeldas[4]);
}