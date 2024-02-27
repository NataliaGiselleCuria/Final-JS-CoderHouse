

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
        nivelDificultad = parseInt(prompt("Ingresá el numero correspondiente a la dificultad que quieras jugar: \n \n 1. 6 letras \n 2. 7 letras \n 3. 8 letras \n 4. 9 letras"));   
    } while (nivelDificultad<1 || nivelDificultad>5);
    
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
   
    while(intentos < 5 && !fin){

        let palabraIngresada = prompt("Intento "+ intentos +". \n " + coincidencias + " \nIngrese una palabra de "+ palabraGanadora.length +" letras:");

        while(palabraIngresada.length != palabraGanadora.length){

            palabraIngresada = prompt("La palabra debe tener "+ palabraGanadora.length +" letras.\n Intento "+ intentos +". Ingrese la palabra:");
            palabraIngresada = palabraGanadora.toLowerCase();
        }

        if(palabraGanadora === palabraIngresada){

            alert("GANASTE! \n La palabra correcta es " + palabraIngresada.toUpperCase() + "! \n Y lo hiciste en " + intentos-1 + " intentos")

            fin=true;
            break;
    
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
}