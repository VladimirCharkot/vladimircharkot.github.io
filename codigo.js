var codigo_expandido = document.querySelector("#codigo_expandido");
var codigo_compacto = document.querySelector("#codigo_compacto");
var bloques_expandido = document.querySelector("#bloques_expandido");
var bloques_compacto = document.querySelector("#bloques_compacto");

//var test = "sssdawwdwdwdwdwdwssadsasssdaaaaa";

var p = "sdx(dx)3wx";

function tokens_codigo(s){
    var tre = /w|a|s|d|z|x|c|v|b|n|m|\(|\)(\d+)/g
    var tokens = [];
    
    while (r = tre.exec(s)) {
        tokens.push(r);
    }
    
    return tokens;
}


function compactar(s){
    var cre = /([wasdzxcvbnm]+?)\1+/g;
    
    while (r = cre.exec(s)) {
        console.log(r, "& re.lastIndex", cre.lastIndex);
        var ratio = r[0].length / r[1].length;
        s = s.replace(r[0], "("+r[1]+")"+ratio);
    }
    return s;
}

function expandir(s){
    var ere =/\(([wasdzxcvbnm\s]+)\)(\d+)/g;
    var viejo = s;
    var expandido = s;
    
    while (r = ere.exec(s)) {
        console.log(r, "& re.lastIndex", ere.lastIndex);
        var ratio = parseInt(r[2]);
        expandido = expandido.replace(r[0], r[1].repeat(ratio));
    }
    
    console.log(viejo, " expandido a ", expandido);
    var final_rep = /\)(\d+)/;
    if (expandido.includes("(") && final_rep.test(expandido)) return expandir(expandido)
        else return expandido;
}

function sincronizar_compacto(){
    codigo_compacto.value = compactar(codigo_expandido.value);
    bloquificar_expandido(codigo_expandido.value);
    bloquificar_compacto(codigo_compacto.value);
}

function sincronizar_expandido(){
    codigo_expandido.value = expandir(codigo_compacto.value);
    bloquificar_expandido(codigo_expandido.value);
    bloquificar_compacto(codigo_compacto.value);
}



function html_repeticion(){
    var d  = document.createElement('div');
    var bl = document.createElement('div');
    var n  = document.createElement('div');
    d.classList.add('repeticion');
    bl.classList.add('codiguito');
    n.classList.add('numerito');
    d.appendChild(bl);
    d.appendChild(n);
    
    return d;
}

function bloquificar_compacto(p){
    bloques_compacto.innerHTML = '';    // reset
    
    var tokens = tokens_codigo(p);    // tokens del codigo
    
    var nivel = 0;
    var base = bloques_compacto;
    var bases = [];
    
    for (var i = 0; i < tokens.length; i++){
        var t = tokens[i][0][0];
        var n = tokens[i][1]
        
        //console.log('Bloquificando ' + t + ', ' + n);
            
        if (t == '('){
            var rep = html_repeticion();
            base.appendChild(rep);
            bases.push(base);
            base = rep.querySelector('.codiguito');
        }
        
        if (t == ')'){
            var ns = base.parentElement.querySelectorAll('.numerito');
            var num_div = ns[ns.length-1];
            num_div.innerHTML = '<p>'+n+'</p>';
            base = bases.pop();
        }
 
        
        if ('wasdzxcvbnm'.includes(t)){
            
            var b = document.createElement('img');
            
            if ('wasd'.includes(t) ){ b.setAttribute('src', 'flecha-recta.png'); }
            if (t == 'w') { b.style.rotate = '-90deg';  };
            if (t == 'a') { b.style.rotate = '-180deg'; };
            if (t == 's') { b.style.rotate = '90deg';   };
            if (t == 'd') { b.style.rotate = '0deg';    };
            if ('zxcvbnm'.includes(t)) {
                b.setAttribute('src', 'trazo.png');
            }
            
            b.classList.add('bloquecito');
            base.appendChild(b);
        }
        
    }
}

function bloquificar_expandido(p){
    bloques_expandido.innerHTML = '';   // reset
    var ts = tokens_codigo(p);
    
    for (var i = 0; i < ts.length; i++){
        var t = ts[i][0];
        var b = document.createElement("img");
        
        if (t == '(' || t == ')') continue;
        
        if ('wasd'.includes(t) ){ b.setAttribute('src', 'flecha-recta.png'); }
        if (t == 'w') { b.style.rotate = '-90deg';  };
        if (t == 'a') { b.style.rotate = '-180deg'; };
        if (t == 's') { b.style.rotate = '90deg';   };
        if (t == 'd') { b.style.rotate = '0deg';    };
        
        if ('zxcvbnm'.includes(t)) {
            b.setAttribute('src', 'trazo.png');
        }
        
        b.classList.add('bloquecito');
        bloques_expandido.appendChild(b);
        
    }
    
    
}
