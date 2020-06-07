// Setear esto al antojo:
var alto = 30;
document.querySelector("#duracion_input").value = 50;

var dibugrid = document.querySelector('#dibugrid');
var h = dibugrid.clientHeight;
var lado = h/alto;
var w = dibugrid.clientWidth - dibugrid.clientWidth % lado;
var ancho = w/lado;

// Coordenadas tortuga
var tortuga_fila = 0;
var tortuga_columna = 0;

function construir_grilla(alto){
    
    var ancho_ventana = Math.min(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    var alto_ventana  = Math.min(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
    
    console.log("Las dimensiones del espacio disponible para dibugrid son " + dibugrid.clientHeight + ", " + dibugrid.clientWidth);
    console.log("Calculado: " + h + " de altura dividido " + alto + " son " + lado + " de lado. Entran " + ancho + " de ancho, ocupando " + w + " de los " + dibugrid.clientWidth);
    
    // Configuro grid
    dibugrid.style.gridTemplateRows    = 'repeat(' + alto + ',' + lado + 'px)';
    dibugrid.style.gridTemplateColumns = 'repeat(' + ancho + ',' + lado + 'px)';
    
    // Crear pixeles
    for (var i=0; i < ancho*alto; i++){
        var pixel = document.createElement('div');
        pixel.classList.add('pixel');
        dibugrid.appendChild(pixel);
    }
}
construir_grilla(alto);


// Crear tortuga,
var tortuga = document.createElement('div');
function construir_tortuga(){
    tortuga.classList.add('tortuga');
    tortuga.style.backgroundColor = 'rgb(0,255,0, 0.3)';
    
    // darle tamaño adecuado
    var tortuga_padding = 2;
    tortuga.style.width = (lado - tortuga_padding * 2) + 'px';
    tortuga.style.height = (lado - tortuga_padding * 2) + 'px';
    
    // colocarla en el medio de la primera celda,
    var primera_celda = dibugrid.children[0];
    
    var grid_margin = 3;
    tortuga.style.top = primera_celda.getBoundingClientRect().top + tortuga_padding;
    tortuga.style.left = primera_celda.getBoundingClientRect().left + tortuga_padding;
    
    document.body.appendChild(tortuga);
    
}
construir_tortuga();

// colorea el pixel en (colu, fila)
function colorear(colu, fila, color){
    //console.log(dibugrid.children[fila * ancho + colu]);
    var i =fila * ancho + colu
    if (i >= 0 && i <= ancho*alto)
        dibugrid.children[fila * ancho + colu].style.backgroundColor = color;
}


function escribir(char){
    var codigo = document.querySelector("#codigo_expandido");
    codigo.value += char;
    sincronizar_compacto();
}

function comandar_tortuga(char){
    if (char == 'd') tortuga_columna = (ancho + tortuga_columna + 1) % ancho;
    if (char == 'a') tortuga_columna = (ancho + tortuga_columna - 1) % ancho;
    if (char == 'w') tortuga_fila = (alto + tortuga_fila - 1) % alto;
    if (char == 's') tortuga_fila = (alto + tortuga_fila + 1) % alto;
    if ('zxcvbnm'.includes(char)) {
        var color = document.querySelector("#color_"+char).value;
        colorear(tortuga_columna, tortuga_fila, color);
    }
    tortuga.style.translate = (tortuga_columna * lado) + 'px ' + (tortuga_fila * lado) + 'px';
}



function limpiar(){
    for (var i = 0; i < dibugrid.children.length; i++) {
        dibugrid.children[i].style.backgroundColor = 'white';
    }
}

