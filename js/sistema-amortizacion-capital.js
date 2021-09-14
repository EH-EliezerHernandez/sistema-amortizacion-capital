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
function calcularTablaAmortizacion(tipoInteres,capitalPendiente,cantidadMeses){
    const tablaAmortizacion = [{
        ano:0,
        cuotaMensual: 0,
        interes: 0,
        amortizacion: 0,
        capitalPendiente, 
    }];

    const cuotaMensual = calcularCuotaMensual(tipoInteres,capitalPendiente);
    for(let i = 1; i <= cantidadMeses ; i++){
        const {capitalPendiente} = tablaAmortizacion[i - 1];
        const ano = i;
        const interes = calcularInteres(capitalPendiente,tipoInteres);
        const amortizacion = calcularAmortizacion(cuotaMensual,interes);
        const capitalPendienteActual = calcularCapitalPendiente(capitalPendiente,amortizacion);
        tablaAmortizacion.push({
            ano,
            cuotaMensual,
            interes,
            amortizacion,
            capitalPendiente: capitalPendienteActual,
        });
    }

    return tablaAmortizacion;
}

console.table(calcularTablaAmortizacion(0.05,6000,3));