const silabaRandom = document.querySelector('#silabaRandom');
const btnEnviarDato = document.querySelector('#btnEnviar');
const respuestaTexto = document.querySelector('#respuesta');
// btn
const btnHiragana = document.querySelector('#hira');
const btnKatakana = document.querySelector('#kara');
// los contadores
const aciertos = document.querySelector('#aciertos');
const cantidad = document.querySelector('#cantidad');


let contadortotal = 1;
let contadorAciertos = 0;


// Contadores
function verificarAcierto(){
    // Añadir los valores del contador al html
        aciertos.innerHTML = contadorAciertos;
        cantidad.innerHTML = contadortotal;
}
function contadorCero(){
    // Resetea contadores segun el cambio de kata/hira
    contadortotal = 1
    contadorAciertos = 0
}
// Se crea  una constante para generar una aleatoridad en el array de silabas
function InicioLetrahi (){
    silabaActual = []
    respuestaCorrecta = []
    verificarAcierto()
    const posicionAleatoria = Math.floor(Math.random()*hiragana.length);
    respuestaCorrecta = hiraRoma[posicionAleatoria];
    silabaActual = hiragana[posicionAleatoria];
    silabaRandom.innerHTML = silabaActual;
    respuestaTexto.value = '';
}
// katakana
function InicioLetraka (){
    silabaActual = []
    respuestaCorrecta = []
    verificarAcierto()
    const posicionAleatoria = Math.floor(Math.random()*katakana.length);
    respuestaCorrecta = hiraRoma[posicionAleatoria];
    silabaActual = katakana[posicionAleatoria];
    silabaRandom.innerHTML = silabaActual;
    respuestaTexto.value = '';
}
function verificarRespuestakata(){
    InicioLetraka ()
    btnEnviarDato.addEventListener ("click", () => {
        let textAreaDeRespuesta = document.querySelector('#respuesta').value;
        if (respuestaCorrecta == textAreaDeRespuesta.toLocaleLowerCase()) {
            contadorAciertos++;
            InicioLetraka();
        }else if (respuestaCorrecta != textAreaDeRespuesta.toLocaleLowerCase()){
            InicioLetraka;
        }
        contadortotal++;
        console.log(`${respuestaCorrecta} - contador: ${contadortotal} - contadorAciertos ${contadorAciertos} `);
    });
}


// Verifica si el texto colocado es igual que el simbolo 
function verificarRespuesta(){
    InicioLetrahi ()
    btnEnviarDato.addEventListener ("click", () => {
        let textAreaDeRespuesta = document.querySelector('#respuesta').value;
        if (respuestaCorrecta == textAreaDeRespuesta.toLocaleLowerCase()) {
            contadorAciertos++
            InicioLetrahi ();
        }else{
            InicioLetrahi ();
        }
        contadortotal++
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

btnKatakana.addEventListener('click', () => {
    btnHiragana.classList.remove('on');
    btnKatakana.classList.remove('off');
    btnHiragana.classList.add('off');
    btnKatakana.classList.add('on');
    contadorCero();
    InicioLetraka();
});
btnHiragana.addEventListener('click', () => {
    btnHiragana.classList.remove('off');
    btnKatakana.classList.remove('on');
    btnHiragana.classList.add('on');
    btnKatakana.classList.add('off');
    contadorCero()
    InicioLetrahi()
});

InicioLetrahi()
verificarRespuesta()

// verificarRespuesta(hiragana)
console.log(btnHiragana)
console.log(btnKatakana)