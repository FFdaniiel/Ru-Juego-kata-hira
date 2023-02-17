const silabaRandom = document.querySelector('#silabaRandom');
const btnEnviarDato = document.querySelector('#btnEnviar');
const respuestaTexto = document.querySelector('#respuesta');
// btn
const btnHiragana = document.querySelector('#hira');
const btnKatakana = document.querySelector('#kara');
// los contadores
const aciertos = document.querySelector('#aciertos');
const cantidad = document.querySelector('#cantidad');
// GUIA
const btnGuia = document.querySelector('#btnGuia');
const contenidoGuia = document.querySelector('#contenido_guia');
const btnguiaCerrar = document.querySelector('#btnGuiaCerrar');


let contadortotal = 0;
let contadorAciertos = 0;

btnactivaHiragana();
// Contadores
function verificarAcierto(){
    // Añadir los valores del contador al html
        aciertos.innerHTML = contadorAciertos;
        cantidad.innerHTML = contadortotal;
}
function contadorCero(){
    // Resetea contadores segun el cambio de kata/hira
    contadortotal = 0
    contadorAciertos = 0
}
// Se crea  una constante para generar una aleatoridad en el array de silabas
function InicioLetrahi (simbolo){
    silabaActual = []
    respuestaCorrecta = []
    verificarAcierto()
    const posicionAleatoria = Math.floor(Math.random()*simbolo.length);
    respuestaCorrecta = hiraRoma[posicionAleatoria];
    silabaActual = simbolo[posicionAleatoria];
    silabaRandom.innerHTML = silabaActual;
    respuestaTexto.value = '';
}
// katakana
function InicioLetraka (simbolo){
    silabaActual = []
    respuestaCorrecta = []
    verificarAcierto()
    const posicionAleatoria = Math.floor(Math.random()*simbolo.length);
    respuestaCorrecta = hiraRoma[posicionAleatoria];
    silabaActual = simbolo[posicionAleatoria];
    silabaRandom.innerHTML = silabaActual;
    respuestaTexto.value = '';
}

// Verifica si el texto colocado es igual que el simbolo 
function verificarRespuesta(simbolo){
    btnEnviarDato.addEventListener ("click", () => {
        let textAreaDeRespuesta = document.querySelector('#respuesta').value;
        if (respuestaCorrecta == textAreaDeRespuesta.toLocaleLowerCase()) {
            contadorAciertos++
            contadortotal++

        }else if (respuestaCorrecta != textAreaDeRespuesta.toLocaleLowerCase() && textAreaDeRespuesta.length > 0){
            contadortotal++
        }
        InicioLetrahi (simbolo);
    });
}

// Usando la tecla enter para apretar el boton cuando sea usado
function enterbtn() {
    var key = event.keyCode;
    let textAreaDeRespuesta = document.querySelector('#respuesta').value;

    if (key === 13) {
        event.preventDefault();
        if(textAreaDeRespuesta.length > 0){

            btnEnviarDato.click();
        }
    }
}
//  eventos para los botones
btnKatakana.addEventListener('click', () => {
    btnHiragana.classList.remove('on');
    btnKatakana.classList.remove('off');
    btnHiragana.classList.add('off');
    btnKatakana.classList.add('on');
    contadorCero();
    InicioLetrahi(katakana);
    verificarRespuesta(katakana)

});
function btnactivaHiragana(){
    InicioLetrahi(hiragana)
    verificarRespuesta(hiragana)
    btnHiragana.addEventListener('click', () => {
        btnHiragana.classList.remove('off');
        btnKatakana.classList.remove('on');
        btnHiragana.classList.add('on');
        btnKatakana.classList.add('off');
        contadorCero()
        verificarRespuesta(hiragana)
        InicioLetrahi(hiragana)

    });
};

btnGuia.addEventListener('click', () =>{
    btnGuia.classList.add('cerrar');
    btnguiaCerrar.classList.remove('cerrar')
    document.querySelector('.guia').style.left = 0;
});

btnguiaCerrar.addEventListener('click', () =>{
    btnguiaCerrar.classList.add('cerrar');
    btnGuia.classList.remove('cerrar')
    document.querySelector('.guia').style.left = '23rem';
});
console.log(btnGuia)
console.log(contenidoGuia)
