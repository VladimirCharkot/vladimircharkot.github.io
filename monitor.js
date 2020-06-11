function reset_anim(entidad){
    var clon = entidad.cloneNode();
    entidad.parentNode.replaceChild(clon, entidad);
}

// Muestra la animación que registra el comando que se está ejecutando
function show(tecla, duracion){
    
    var monitor = document.querySelector("#monitor_div");
    var flecha = document.querySelector("#flecha");
    var trazo = document.querySelector("#trazo");
    
    var mostrar = null;
    if ('wasd'.includes(tecla))    mostrar = flecha;
    if ('zxcvbnm'.includes(tecla)) mostrar = trazo;
    if (!'wasdzxcvbnm'.includes(tecla)) return;
    
    monitor.addEventListener("animationend", () => { }, true);
    
    if (tecla == 'd'){ mostrar.style.transform = "rotate(0deg)"; }
    if (tecla == 'a'){ mostrar.style.transform = "rotate(180deg)"; }
    if (tecla == 'w'){ mostrar.style.transform = "rotate(-90deg)"; }
    if (tecla == 's'){ mostrar.style.transform = "rotate(90deg)"; }
    if ('zxcvbnm'.includes(tecla)){ mostrar.style.transform = "rotate(0deg)"; }
    
    mostrar.style.animation = duracion + "s grow";
    reset_anim(mostrar);
    
}

/*
 var element = document.getElementById("watchme");
 element.addEventListener("animationstart", listener, false);
 element.addEventListener("animationend", listener, false);
 element.addEventListener("animationiteration", listener, false);
 */
