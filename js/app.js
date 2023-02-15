const silabaRandom = document.querySelector('#silabaRandom');
const btnEnviarDato = document.querySelector('#btnEnviar');
const respuestaTexto = document.querySelector('#respuesta')
const aciertos = document.querySelector('#aciertos');
const cantidad = document.querySelector('#cantidad');


let contadortotal = 0;
let contadorAciertos = 0;
let silabaActual = []
let respuestaCorrecta = []

// Contadores
function verificarAcierto(){
    // Añadir los valores del contador al html
        aciertos.innerHTML = contadorAciertos;
        cantidad.innerHTML = contadortotal;
}

// Se crea  una constante para generar una aleatoridad en el array de silabas
function InicioLetrahi (){
    const posicionAleatoria = Math.floor(Math.random()*hiragana.length);
    respuestaCorrecta = hiraRoma[posicionAleatoria];
    silabaActual = hiragana[posicionAleatoria];
    silabaRandom.innerHTML = silabaActual;
    respuestaTexto.value = '';
    verificarAcierto();
}

// Verifica si el texto colocado es igual que el simbolo 
function verificarRespuesta(){
    InicioLetrahi ()
    btnEnviarDato.addEventListener ("click", () => {
        let textAreaDeRespuesta = document.querySelector('#respuesta').value;
        if (respuestaCorrecta == textAreaDeRespuesta.toLocaleLowerCase()) {
            contadorAciertos++
        }else if(respuestaCorrecta != textAreaDeRespuesta ){
            
        }
        contadortotal++
        InicioLetrahi ()
        console.log(textAreaDeRespuesta)
        console.log(`${respuestaCorrecta} - contador: ${contadortotal} - contadorAciertos ${contadorAciertos} `);
    });

}

// Usando la tecla enter para apretar el boton cuando sea usado
function enterbtn() {
    var key = event.keyCode;

    if (key === 13) {
        event.preventDefault();
        btnEnviarDato.click();
    }
}
verificarAcierto()
verificarRespuesta();
