abc = 'abcdefghijklmnñopqrstuvwxyz'
ABC = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'

const arriba = document.querySelector("#arriba");

function agregar_variable(){
    var cont = document.createElement("div");
    cont.classList.add("lista");
    
    var cabecera = document.createElement("div");
    cabecera.classList.add("cabecera");
    var btn_eliminar = document.createElement("button");
    btn_eliminar.classList.add("cerrar");
    btn_eliminar.innerHTML = "X";
    btn_eliminar.addEventListener("click",e => e.target.parentElement.parentElement.remove());
    var lbl_titulo = document.createElement("label");
    lbl_titulo.innerHTML = "Nombre";
    
    cabecera.appendChild(lbl_titulo);
    cabecera.appendChild(btn_eliminar);
    
    var titulo = document.createElement("input");
    var lbl_valores = document.createElement("label");
    lbl_valores.innerHTML = "Valores";
    var valores = document.createElement("textarea");
    
    cont.appendChild(cabecera);
    cont.appendChild(titulo);
    cont.appendChild(lbl_valores);
    cont.appendChild(valores);
    
    arriba.appendChild(cont);
    
}


function stripAcentos(texto){
    return texto.replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u');
}

function aplicar(){
    
    var listas = document.querySelectorAll(".lista");
    var variables = {};
    
    for (var i=0; i<listas.length; i++){
        var nombre = listas[i].querySelector("input").value;
        var elementos = listas[i].querySelector("textarea").value;
        variables[nombre] = elementos.split("\n");
    }
    
    var plantilla = document.querySelector("#plantilla").value;
    var res = aplicar_variables(plantilla, variables);
    
    document.querySelector("#salida").value = res;
    
}

function aplicar_variables(plantilla, variables){
    var res = plantilla;
    var re = /\[(\w+)\]/g;
    var r = null;
    
    console.log("Aplicando", variables, "a", res);
    
    while (r = re.exec(res)){
        if (!(r[1] in variables))
            console.log("Encontré una variable que no tengo");
        if (r[1] in variables)
            res = res.replace(r[0], pickRandom(variables[r[1]]));
    }
    return res;
}

function pickRandom(lista){
    return lista[Math.floor(Math.random() * lista.length)];
}

document.querySelector("#plantilla").value = "Hoy en [lugar] agarré una [cosa] y se me cayó";
agregar_variable();
agregar_variable();

var listas = document.querySelectorAll(".lista");
var titu = listas[0].querySelector(".lista input");
titu.value = "cosa";
var cosas = listas[0].querySelector(".lista textarea");
cosas.value = "piedra\nojota\nllave"

var titu = listas[1].querySelector(".lista input");
titu.value = "lugar";
var cosas = listas[1].querySelector(".lista textarea");
cosas.value = "casa\nla calle\nel colegio";

aplicar()
