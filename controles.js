
function leer_tecla(e){
    // Si estoy en el textarea no quiero capturar el teclado:
    var on_codigo = (document.activeElement.id == 'codigo_expandido' || document.activeElement.id == 'codigo_compacto');
    if (on_codigo) return;
    
    console.log(e);
    //console.log(` ${e.code}`);
    
    var comando = '';
    if (e.key == 'Escape')                                      limpiar();
    if (e.key == ' ')                                           play();
    if (e.key == 'ArrowRight' || e.key == 'd' || e.key == 'D')  comando = 'd';
    if (e.key == 'ArrowLeft' || e.key == 'a' || e.key == 'A')   comando = 'a';
    if (e.key == 'ArrowDown' || e.key == 's' || e.key == 'S')   comando = 's';
    if (e.key == 'ArrowUp' || e.key == 'w' || e.key == 'W')     comando = 'w';
    if ('zxcvbnm'.includes(e.key))                              comando = e.key;
    
    comandar_tortuga(comando);
    show(comando, 1);
    
    var escribir_encendido = document.querySelector("#escribir_switch").checked;
    if (escribir_encendido) escribir(comando);
    
    
}

window.onkeyup = leer_tecla;



function leer(c, d){
    // highlight
    comandar_tortuga(c);
    show(c, d/1000);
}

function play(){
    var c = document.querySelector("#codigo_expandido").value;
    console.log("Play!");
    
    var delta = document.querySelector("#duracion_input").value;
    
    for (var i=0; i<c.length; i++){
        //leer(c[i]);
        let comando = c[i];
        setTimeout(() => { leer(comando); }, i*delta);
    }
}




/* "pause animations"
 var computedStyle = window.getComputedStyle(boxOne),
 marginLeft = computedStyle.getPropertyValue('margin-left');
 */
