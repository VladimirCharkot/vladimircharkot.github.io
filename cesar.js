abc = 'abcdefghijklmnñopqrstuvwxyz'
ABC = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'

const TextField = mdc.textField.MDCTextField;

function encriptar(){
    
    var texto_input = new TextField(document.querySelector('#input'));
    var texto = stripAcentos(texto_input.value);
    
    var shift_input = new TextField(document.querySelector('#shift'));
    var shift = parseInt(shift_input.value);
    
    var out = new TextField(document.querySelector('#output'));
    if (!shift || !texto) return;
    out.value = cesar(texto, shift);
    
}

function cesar(texto, shift){
    
    var encriptado = "";
    
    for(var i=0; i < texto.length; i++){
        
        if (abc.includes(texto[i])){
            encriptado += abc[(abc.indexOf(texto[i]) + shift + abc.length) % abc.length];
        }else if (ABC.includes(texto[i])){
            encriptado += ABC[(ABC.indexOf(texto[i]) + shift + ABC.length) % ABC.length];
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
