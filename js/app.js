const silabaRandom = document.querySelector('#silabaRandom');
const btnEnviarDato = document.querySelector('#btnEnviar');
const respuestaTexto = document.querySelector('#respuesta');

let contadorIntentos = 0;
let contadorAciertos = 0;
let silabaActual = []
let respuestaCorrecta = []

// Se crea  una constante para generar una aleatoridad en el array de silabas
function InicioLetrahi (){
    const posicionAleatoria = Math.floor(Math.random()*hiragana.length);
    respuestaCorrecta = hiraRoma[posicionAleatoria];
    silabaActual = hiragana[posicionAleatoria];
    silabaRandom.innerHTML = silabaActual;
    verificarRespuesta()
}

// Verifica si el texto colocado es igual que el simbolo 

function verificarRespuesta(){
    respuestaTexto.addEventListener ("click", () => {
        let textAreaDeRespuesta = document.querySelector('#respuesta').value;
        if (respuestaCorrecta == textAreaDeRespuesta) {
            respuestaTexto.value = '';
            contadorAciertos++
            InicioLetrahi ()
        }else if(respuestaCorrecta != textAreaDeRespuesta){
            console.log(`apa, es ${respuestaCorrecta}`);
            contadorIntentos++
        }
    
    });

}
// Cancelar el salto entre linea de texto / es decir cancela enter
function cancelar() {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        var boton = document.getElementById("boton");
        angular.element(boton).triggerHandler('click');
    }
}

InicioLetrahi();
