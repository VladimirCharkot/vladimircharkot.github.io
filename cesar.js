abc = 'abcdefghijklmnñopqrstuvwxyz'
ABC = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'

function encriptar(){
    var texto = stripAcentos(document.querySelector("#input").value);
    var shift = parseInt(document.querySelector("#shift").value);
    var out = document.querySelector("#output");
    if (!shift || !texto) return;
    out.value = cesar(texto, shift);
}

function cesar(texto, shift){
    
    var encriptado = "";
    
    for(var i=0; i < texto.length; i++){
        
        if (abc.includes(texto[i])){
            encriptado += abc[(abc.indexOf(texto[i]) + shift + abc.length) % abc.length];
        }else if (ABC.includes(texto[i])){
            encriptado += ABC[(ABC.indexOf(texto[i]) + shift + abc.length) % ABC.length];
        }else{
            encriptado += texto[i];
        }
        
    }
    
    return encriptado;
    
}


function stripAcentos(texto){
    return texto.replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u');
}

encriptar();
