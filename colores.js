var claves_colores = ['z','x','c','v','b','n','m'];

var inputs_colores = {};
for (var i = 0; i < claves_colores.length; i++){
    var letra = claves_colores[i];
    inputs_colores[letra] = document.querySelector('#color_' + letra);
}

function set_colores(cols){
    console.log(inputs_colores);
    for (var k in cols){
        inputs_colores[k].value = cols[k];
    }
}

var template_colores = {
    'z' : '#ffffff',
    'x' : '#000000',
    'c' : '#ea907a',
    'v' : '#ffcb74',
    'b' : '#b1b493',
    'n' : '#f4f7c5',
    'm' : '#4f8a8b'
}

set_colores(template_colores);

console.log("Colores");
