let primerInput = document.querySelector('.word1').firstElementChild;
let inputs = document.querySelectorAll('.cell');
let keys = document.querySelectorAll('.key');
let levelText = document.querySelectorAll('#levelText');
let currentLevel = 6;
let levels = document.querySelectorAll('#level');

window.onload = function() {
    primerInput.focus();
};

//Definir dificultad del juego:
function setLevel(el){
    if (el.id=="levelDown"){
        if(currentLevel>6){
            currentLevel--;
            levelText[0].innerHTML=currentLevel+" LETRAS";;
        }
    }else if (el.id=="levelUp"){
        if(currentLevel<9){
            currentLevel++;
            levelText[0].innerHTML=currentLevel+" LETRAS";
        }
    }

    switch (currentLevel){
        case 6: 
            levels[1].removeAttribute('class');
            levels[2].removeAttribute('class');
            levels[3].removeAttribute('class');
            break;
        case 7:
            levels[1].setAttribute('class','normal');
            levels[2].removeAttribute('class');
            levels[3].removeAttribute('class');
            break;
        case 8:
            levels[2].setAttribute('class','medium');
            levels[3].removeAttribute('class');
            break;
        case 9:
            levels[3].setAttribute('class','hard');
            break;
    }
}

//funciones de las celdas:
inputs.forEach(function(input) {

    // reasignar valor a un input(celda).
    input.addEventListener('input', function(event) {

        if (event.target.value.length > 1) {
            event.target.value = inputValue.charAt(1);
        }
        
        focusInput(event.target)
    });

    // agregar clase al input(celda) en foco, y sacarselo a todos los demás.
    input.addEventListener('focus', function(event) {
        input.classList.add('cell-focus');

        inputs.forEach(el => {
            if(el!=input){
                el.classList.remove('cell-focus');
            }
        });
    });

    //evitar que se pierda el foco de las celdas.
    input.addEventListener('blur', function(event) {
        let currentInput = event.currentTarget;
        document.addEventListener('click', function(event) {
            checkInput(event, currentInput);
        });
    });
 
});

function checkInput(event,el){
    if(event.target.tagName == "INPUT" && event.target!=el){
        el.classList.remove('cell-focus');
    }  
}

// dirigir el foco automaticamente a la próxima celda una vez rellenada la actual.
function focusInput(currentInput) {
    if (currentInput.value.length === 1) {
        currentInput.nextElementSibling.focus();
    }
}

//dirigir el foco automaticamente a la celda anterior si se borra el contenido de la actual.
function backInput(currentInput, event){
    if (event.key === 'Backspace' || event.key === 'Delete') {
        if (currentInput.value.length === 0) {
            if(!currentInput.id.includes('1')){
                currentInput.previousElementSibling.focus();
            }
        }    
    }
}

//funciones del teclado:
keys.forEach(function(key) {
    key.addEventListener('click', function(event){
        let letter = event.target.innerHTML;    
        let cell;
        inputs.forEach(input => {
            if(input.className.includes('cell-focus')){
                if(event.target.innerHTML== 'ENVIAR' ){

                }else if (event.target.className.includes('borrar') || event.target.className.includes('fa-delete-left')){
                    input.value="";
                    input.previousElementSibling.focus();
                }else{
                    input.value = letter;
                }
                
                cell = input;
            }
        });

        focusInput(cell)
    })
});


function jugar(){   

    const dif1 =["switch", "codigo", "objeto", "string"];
    const dif2 =["funcion", "boolean", "arreglo", "console"];
    const dif3 =["variable", "operador", "programa", "lenguaje"];
    const dif4 =["iteracion", "algoritmo", "sentencia", "condicion"];

    let palabraGanadora = "";
    let coincidencias=[];
    let letrasCorrectas=[];
    let letrasIncorrectas=[];
    let fin = false;

    let intentos = 1; 
    let nivelDificultad = 0;
    let indiceAleatorio =Math.floor(Math.random() * 4);
    
    do{
        nivelDificultad = parseInt(prompt("Ingresá el numero correspondiente a la dificultad que quieras jugar: \n \n 1. 6 letras \n 2. 7 letras \n 3. 8 letras \n 4. 9 letras \n"));   
        console.log(prompt)
    } while ((nivelDificultad<1 || nivelDificultad>4) || isNaN(nivelDificultad) || nivelDificultad==null);
    
    switch (nivelDificultad){
        
        case 1: 
            palabraGanadora = dif1[indiceAleatorio];
            break
        case 2: 
            palabraGanadora = dif2[indiceAleatorio]
            break
        case 3: 
            palabraGanadora = dif3[indiceAleatorio]
            break
        case 4: 
            palabraGanadora = dif4[indiceAleatorio]
            break
    }

    for (let i = 0; i < palabraGanadora.length; i++){
        coincidencias[i]= " _ ";
    }
   
    let palabraIngresada = ""

    while(intentos < 6 && !fin){
        console.log(intentos)

        do{
            palabraIngresada = prompt("Intento "+ intentos +". \n " + coincidencias + " \nIngrese una palabra de "+ palabraGanadora.length +" letras:");

        }while(palabraIngresada=="" || palabraIngresada==null);
       
        while(palabraIngresada.length != palabraGanadora.length){

            palabraIngresada = prompt("La palabra debe tener "+ palabraGanadora.length +" letras.\n Intento "+ intentos +". Ingrese la palabra:");
            palabraIngresada = palabraIngresada.toLowerCase();
        }


        if(palabraGanadora === palabraIngresada){

            alert("GANASTE! \n La palabra correcta es " + palabraGanadora.toUpperCase() + "!")

            fin=true;

            console.log(palabraGanadora)
            console.log(palabraIngresada)
    
        }else{
    
            for (let i = 0; i < palabraGanadora.length; i++) {
    
                if ((palabraGanadora.charAt(i) === palabraIngresada.charAt(i))){
    
                    coincidencias[i] = " " + palabraIngresada.charAt(i) + " ";
    
                } else {
    
                    coincidencias[i] = " _ ";
        
                    if (palabraGanadora.includes(palabraIngresada.charAt(i)) && (!letrasCorrectas.includes(" "+palabraIngresada.charAt(i)+" "))) {
    
                        letrasCorrectas.push(" "+palabraIngresada.charAt(i)+" ");
    
                    } else if (!letrasIncorrectas.includes(" "+palabraIngresada.charAt(i)+" ")){
    
                        letrasIncorrectas.push(" "+palabraIngresada.charAt(i)+" ");
                    }
                }
    
            } 
    
            if(letrasCorrectas.length>0){

                alert("INCORRECTO! \n " + palabraIngresada + " no es la pabra correcta, pero te doy una ayuda...  \n\n " + coincidencias + "\n\nLas letras: - " + letrasCorrectas + " - ESTÁN en la palabra ganadora. \nLas letras: - "+ letrasIncorrectas +" - NO ESTÁN.");
            
            }else{

                alert("INCORRECTO! \n " + palabraIngresada + " no es la pabra correcta, pero te doy una ayuda...  \n\n" + coincidencias + "\n\nLas letras: - "+ letrasIncorrectas +" - NO ESTÁN en la palabra ganadora.");
            }

            intentos++
        }
    }

    if(intentos==5){
        alert("Lo siento, se acabaron los intetos :C");
    }
}