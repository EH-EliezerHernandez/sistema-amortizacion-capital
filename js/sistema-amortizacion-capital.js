function transformTipoInteres(tipoInteres){
    return tipoInteres / 100;
}
function calcularCuotaMensual(tipoInteres,capitalPendiente){
    let cuotaMensual = capitalPendiente * tipoInteres /(1-Math.pow(1+tipoInteres,-3));
    cuotaMensual= cuotaMensual.toFixed(2);
    return cuotaMensual;
}

function calcularInteres(capitalPendiente,tipoInteres){
    const interes = (capitalPendiente * tipoInteres).toFixed(2);
    return interes;
}

function calcularAmortizacion(cuotaMensual,interes){
    const amortizacion = (cuotaMensual - interes).toFixed(2);
    return amortizacion;
}
function calcularCapitalPendiente(capitalPendiente,amortizacion){
    const nuevoCapitalPendiente = (capitalPendiente - amortizacion).toFixed(2);
    return nuevoCapitalPendiente;
}
function validarCampos(objectPrestamo){
    const {tipoInteres,amortizacion,cantidadMeses} = objectPrestamo;
    return tipoInteres != 0 && amortizacion != 0 && cantidadMeses != 0;
}
function calcularTablaAmortizacion(tipoInteres,capitalPendiente,cantidadMeses){
    const objectAmortizacion = {
        ano:0,
        cuotaMensual: 0,
        interes: 0,
        amortizacion: 0,
        capitalPendiente, 
    }
    const listTablaAmortizacion = [];
    
    listTablaAmortizacion.push(objectAmortizacion);
    tipoInteres = transformTipoInteres(tipoInteres);
    const cuotaMensual = calcularCuotaMensual(tipoInteres,capitalPendiente);
    
    for(let i = 1; i <= cantidadMeses ; i++){
        const {capitalPendiente} = listTablaAmortizacion[i - 1];
        const ano = i;
        const interes = calcularInteres(capitalPendiente,tipoInteres);
        const amortizacion = calcularAmortizacion(cuotaMensual,interes);
        const capitalPendienteActual = calcularCapitalPendiente(capitalPendiente,amortizacion);
        listTablaAmortizacion.push({
            ano,
            cuotaMensual,
            interes,
            amortizacion,
            capitalPendiente: capitalPendienteActual,
        });
    }

    return listTablaAmortizacion;
}
function limpiarHTML(){
    const $results = document.querySelector("#results");
    
    while($results.lastElementChild.className != "label--result"){
            $results.removeChild($results.lastElementChild);
    }
}
function mostrarResultados(list){
    const $results = document.querySelector("#results");
    
    limpiarHTML();

    list.forEach(element => {
        for( const key in  element){
            let newElement = document.createElement("P");
            newElement.textContent = element[key];
            newElement.style.textAlign = "center";
            $results.appendChild(newElement);
        }
    })
}

function capturarDatos(buttonPorcent){
    const $campoCapitalPendiente = document.querySelector("#loan");
    const $campoCantidadMeses = document.querySelector("#time");

    const objectPrestamo = {
        capitalPendiente: $campoCapitalPendiente.value,
        cantidadMeses: $campoCantidadMeses.value,
        tipoInteres: buttonPorcent,
    };
    console.log(objectPrestamo);
    return objectPrestamo;
}

function validarCampo(value){
    return value === "";
}

function alertCampo(target){
    const value = target.value;
    if(validarCampo(value)){
        target.style.border = "1px solid green";
    }else{
        target.style.border = "1px solid red";
    }
}

function callEvents(){
    const $form = document.querySelector("#form");
    let objectPrestamo = {
        tipoInteres: 0,
        capitalPendiente: 0,
        amortizacion: 0,
    };
    let buttonPorcent = 0;

    mostrarResultados([{
        ano:0,
        cuotaMensual: 0,
        interes: 0,
        amortizacion: 0,
        capitalPendiente: 0, 
    }]);

    
    $form.addEventListener("onkeypress",(evt) => {
        const target = evt.target;
        
        if(target.id === "loan" || target.id === "time"){
            objectPrestamo = capturarDatos(buttonPorcent);
            if(validarCampos(objectPrestamo)){
                let {tipoInteres,capitalPendiente,cantidadMeses} = objectPrestamo;
                const listAmortizacion = calcularTablaAmortizacion(tipoInteres,capitalPendiente,cantidadMeses);
                mostrarResultados(listAmortizacion);
            }
        }
    });

    $form.addEventListener("click",evt =>{
        const target = evt.target;
        if(target.id === "loan" || target.id === "time"){ 
            alertCampo(target);
        }else{
            if(target.classList[0] === "button-porcent"){
                buttonPorcent = target.value;
                objectPrestamo = capturarDatos(buttonPorcent);
               
                if(validarCampos(objectPrestamo)){
                    let {tipoInteres,capitalPendiente,cantidadMeses} = objectPrestamo;
                    const listAmortizacion = calcularTablaAmortizacion(tipoInteres,capitalPendiente,cantidadMeses);
                    mostrarResultados(listAmortizacion);
                }
            }
        } 
    })
    
}
callEvents();