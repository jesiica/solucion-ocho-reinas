var solucion = [];
var N = 8; 

var esValido = function(posicion){ 
    var n = posicion.length;
    var valido = posicion[0] != -1; 

    for(var i=0; i < n && valido; i++){ 
        var q1 = [i, posicion[i]]; 

            for(var j = i + 1; j < n && valido && q1[1] >= 0; j++){ 
                var q2 = [j, posicion[j]]; 
                if ( q2[1] != -1 &&  
                        ( q2[0] == q1[0] || // misma fila 
                        q2[1] == q1[1] || // misma columna 
                        
                        Math.abs(q2[0] - q1[0]) == Math.abs(q2[1] - q1[1] ) ) ) { // misma diagonal 
                            valido = false; 
                        } 
            } 
    } 
    return valido; 
}; 

// Resolucion del problema con posicion fija
var resolver = function(sol, actual, fija){ 
    if(actual == N) return sol; // Solucion valida
    if(actual == fija){ // Ignorar posicion 
        return resolver(sol, actual + 1, fija); 
    } 
    for(var i=0; i < N; i++){ 
        sol[actual] = i; // Cambio temporal 
        if(esValido(sol)){ 
            var solaux = resolver(sol, actual+1, fija); 
            if(esValido(solaux)){ 
                return solaux; 
            } 
        } 
        sol[actual] = -1; // cambio temporal
    } 
    return [-1]; 
}; 

// Lee las coordenadas fijas de casa pieza para reolver
console.log("escribe una coordenada, ejemplo: 1,2")
var stdin = process.openStdin(); 
var stdout = process.stdout; 

stdin.once('data', function(text){ 
    stdin.destroy(); 
    var queen = String("1,1").match(/[0-9]/g); 
    for(var i=0; i < N; i++) solucion[i] = -1; 
        solucion[queen[0]] = queen[1]; 
        solucion = resolver(solucion, 0, queen[0]); 
            var soluc = [];

    for (var i = 0; i <= solucion.length; i++) {
        if (!isNaN(parseInt(solucion[i])))
            soluc.push("("+(i+1)+","+(parseInt(solucion[i])+1)+")"); 
    };
    console.log('solucion: [' + soluc + ']'); // [-1] no entra como solucion
    printSol(solucion); 
}); 

// Mostrar solucion 

var printSol = function(sol){ 
    for(var i=0; i < N; i++){ 
        for(var j=0; j < N; j++){ 
            if (sol[i] == j) stdout.write(' # '); 
            else stdout.write(' · '); 
} 
    stdout.write('\n'); 
    } 
};