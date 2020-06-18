
function texto_a_arbol(texto_box){
    var ls = texto_box.split("\n");
    if (ls.length == 0) return {};
    
    var raices = [];
    
    var raiz = {};
    raiz['name'] = ls[0];
    //raiz['children'] = []
    var nivel_anterior = 1;
    
    for (var i=1; i<ls.length; i++){
        var l = ls[i];
        var texto = l.trimLeft();
        var nivel = l.length - texto.length;
        console.log("Leyendo ", texto, ", nivel ", nivel);
        
        if (nivel == 0 && texto == "") break;
        
        if(nivel - nivel_anterior > 1){
            console.log("Diferencia abrupta!");
            break;
        }
        
        if(nivel == nivel_anterior){
            if (!('children' in raiz)) raiz['children'] = [];
            raiz['children'].push({'name' : texto});
            console.log(raiz['name'], " <+ ", texto);
        }
        
        if (nivel - nivel_anterior == 1) {      // nivel + 1
            raices.push(raiz);
            console.log("Raíces <+ ", raiz);
            raiz = raiz['children'][raiz['children'].length - 1];
            console.log("Raíz <- ", raiz);
            nivel_anterior = nivel;
            
            if (!('children' in raiz)) raiz['children'] = [];
            raiz['children'].push({'name' : texto});
            console.log(raiz['name'], " <+ ", texto);
        }
        
        if (nivel_anterior - nivel > 0) {      // nivel - 1
            for (var j = 0; j < nivel_anterior - nivel; j++){
                raiz = raices.pop();
                console.log("Raíz <- ", raiz);
            }
            if (texto){
                raiz['children'].push({'name' : texto});
                console.log(raiz['name'], " <+ ", texto);
            }
            nivel_anterior = nivel;
        }
        
    }
    
    while(raices.length) raiz = raices.pop();
    
    return raiz;
    
}








let data_test = {
    "name": "Libros",
    "children": [
                 {
                 "name": "Ficción",
                 "children": [
                              {
                              "name": "Realismo fantástico",
                              "children": [
                                           {"name": "El retorno de los brujos", "autor": "Louis Pauwels"},
                                           {"name": "Alicia en el país de las maravillas", "autor": "Lewis Carroll"},
                                           {"name": "Mundodisco", "autor": "Terry Pratchett"}
                                           ]
                              },
                              {
                              "name": "Ciencia ficción",
                              "children": [
                                           {"name": "Yo, robot", "autor": "Isaac Asimov"},
                                           {"name": "Los propios dioses", "autor": "Isaac Asimov"}
                                           ]
                              },
                              {
                              "name": "Literatura",
                              "children": [
                                           {"name": "Demian", "autor": "Hermann Hesse"},
                                           {"name": "El principito", "autor": "Antoine de Saint-Exupery"},
                                           {"name": "El señor de los anillos", "autor": "J. R. R. Tolkien"}
                                           ]
                              }
                              ]
                 },
                 {
                 "name": "No-ficcion",
                 "children": [
                              {
                              "name": "Filosofía",
                              "children": [
                                           {"name": "El sentido práctico", "autor": "Pierre Bourdieu"},
                                           {"name": "Comentarios sobre el vivir", "autor": "Jiddu Krishnamurti"}
                                           ]
                              },
                              {
                              "name": "Ciencia",
                              "children": [
                                           {"name": "Caos", "autor": "James Gleick"},
                                           {"name": "El origen de las especies", "autor": "Charles Darwin"}
                                           ]
                              }
                              ]
                 }
                 ]
}




var width = 400;

function arbol(data){
    
    var format = d3.format(",");
    var nodeSize = 17;
    let i = 0;
    var root =  d3.hierarchy(data).eachBefore(d => d.index = i++);
    
    var nodes = root.descendants();
    
    var svg = d3.create("svg")
    //.attr("viewBox", [-nodeSize / 2, -nodeSize * 3 / 2, width, (nodes.length + 1) * nodeSize])
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .style("overflow", "visible");
    
    var link = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#999")
    .selectAll("path")
    .data(root.links())
    .join("path")
    .attr("d", d => `
          M${d.source.depth * nodeSize},${d.source.index * nodeSize}
          V${d.target.index * nodeSize}
          h${nodeSize}
          `);
    
    var node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("transform", d => `translate(0,${d.index * nodeSize})`);
    
    node.append("circle")
    .attr("cx", d => d.depth * nodeSize)
    .attr("r", 2.5)
    .attr("fill", d => d.children ? null : "#999");
    
    node.append("text")
    .attr("dy", "0.32em")
    .attr("x", d => d.depth * nodeSize + 6)
    .text(d => d.data.name);
    
    node.append("title")
    .text(d => d.ancestors().reverse().map(d => d.data.name).join("/"));
    
    /*for (var {label, value, format, x} of columns) {
        svg.append("text")
        .attr("dy", "0.32em")
        .attr("y", -nodeSize)
        .attr("x", x)
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .text(label);
        
        node.append("text")
        .attr("dy", "0.32em")
        .attr("x", x)
        .attr("text-anchor", "end")
        .attr("fill", d => d.children ? null : "#555")
        .data(root.copy().sum(value).descendants())
        .text(d => format(d.value, d));
    }*/
    
    return svg.node();
}



/*columns = [
    {
        label: "Size",
        value: d => d.value,
        format,
        x: 280
    },
    {
        label: "Count",
        value: d => d.children ? 0 : 1,
        format: (value, d) => d.children ? format(value) : "-",
        x: 340
    }
]*/




//arbol(data);

function updateArbol(texto){
    var area_arbol = document.querySelector("#arbol");
    area_arbol.innerHTML = "";
    
    var data = texto_a_arbol(texto);
    console.log("Creando arbol con ", data);
    area_arbol.appendChild(arbol(data));
}




tippy('#codigo', {
      allowHTML: true,
      content: '<p>Escribí en esta caja una lista; poné espacios al principio de cada línea para indicar el nivel al que pertenece. ¡No se puede aumentar varios niveles a la vez! Si una línea está por ejemplo en el nivel 1, no puede la siguiente estar en nivel 3... el programa deja de funcionar ¡porque no sabe qué dibujar! Tampoco puede haber más de un nivel 0... ¡solo puede haber una raíz!</p>',
      theme: 'azure',
      placement: 'right',
      // Debug:
      //hideOnClick: false,
      //trigger: 'click'
      });




document.querySelector('#codigo').value = (`Videojuegos
 Aventura
  Roblox
   Adopt Me
   Jailbreak
  Minecraft
  Horizon
 Ficción
  God of war
  Dragon ball
 Armas
  Fortnite
  Free fire
  Call of duty
 Plataforma
  Plants vs Zombies
  Super Mario Bros`)

updateArbol(document.querySelector("#codigo").value);









/*
// funciones para descargar como png, tomadas de:
// http://bl.ocks.org/Rokotyan/0556f8facbaf344507cdc45dc3622177

d3.select('#descargar').on('click', function(){
        var svg = document.querySelector('svg');
        var svgString = getSVGString(svg);
        var width = svg.width.baseVal.value;
        var height = svg.height.baseVal.value;
        var width = 1000;
        var height = 1000;
        svgString2Image( svgString, 2*width, 2*height, 'png', save ); // passes Blob and filesize String to the callback
        
        function save( dataBlob, filesize ){
                saveAs( dataBlob, 'árbol.png' ); // FileSaver.js function
        }
});



// Below are the functions that handle actual exporting:
// getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
function getSVGString( svgNode ) {
    svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    var cssStyleText = getCSSStyles( svgNode );
    appendCSS( cssStyleText, svgNode );
    
    var serializer = new XMLSerializer();
    var svgString = serializer.serializeToString(svgNode);
    svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
    svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix
    
    return svgString;
    
    function getCSSStyles( parentElement ) {
        var selectorTextArr = [];
        
        // Add Parent element Id and Classes to the list
        selectorTextArr.push( '#'+parentElement.id );
        for (var c = 0; c < parentElement.classList.length; c++)
            if ( !contains('.'+parentElement.classList[c], selectorTextArr) )
                selectorTextArr.push( '.'+parentElement.classList[c] );
        
        // Add Children element Ids and Classes to the list
        var nodes = parentElement.getElementsByTagName("*");
        for (var i = 0; i < nodes.length; i++) {
            var id = nodes[i].id;
            if ( !contains('#'+id, selectorTextArr) )
                selectorTextArr.push( '#'+id );
            
            var classes = nodes[i].classList;
            for (var c = 0; c < classes.length; c++)
                if ( !contains('.'+classes[c], selectorTextArr) )
                    selectorTextArr.push( '.'+classes[c] );
        }
        
        // Extract CSS Rules
        var extractedCSSText = "";
        for (var i = 0; i < document.styleSheets.length; i++) {
            var s = document.styleSheets[i];
            
            try {
                if(!s.cssRules) continue;
            } catch( e ) {
                if(e.name !== 'SecurityError') throw e; // for Firefox
                continue;
            }
            
            var cssRules = s.cssRules;
            for (var r = 0; r < cssRules.length; r++) {
                if ( contains( cssRules[r].selectorText, selectorTextArr ) )
                    extractedCSSText += cssRules[r].cssText;
            }
        }
        
        
        return extractedCSSText;
        
        function contains(str,arr) {
            return arr.indexOf( str ) === -1 ? false : true;
        }
        
    }
    
    function appendCSS( cssText, element ) {
        var styleElement = document.createElement("style");
        styleElement.setAttribute("type","text/css");
        styleElement.innerHTML = cssText;
        var refNode = element.hasChildNodes() ? element.children[0] : null;
        element.insertBefore( styleElement, refNode );
    }
}


function svgString2Image( svgString, width, height, format, callback ) {
    var format = format ? format : 'png';
    
    var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) ) ); // Convert SVG string to data URL
    
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    
    canvas.width = width;
    canvas.height = height;
    
    var image = new Image();
    image.onload = function() {
        context.clearRect ( 0, 0, width, height );
        context.drawImage(image, 0, 0, width, height);
        
        canvas.toBlob( function(blob) {
                      var filesize = Math.round( blob.length/1024 ) + ' KB';
                      if ( callback ) callback( blob, filesize );
                      });
        
        
    };
    
    image.src = imgsrc;
}




// Download 2
var svg = d3.select("svg");
var width = svg.node().width.baseVal.value;
var height = svg.node().height.baseVal.value;
// Download solution

function getDownloadURL(svg, callback) {
    var canvas;
    var source = svg.parentNode.innerHTML;

    var image = d3.select('body').append('img')
    .style('display', 'none')
    .attr('width', width)
    .attr('height', height)
    .node();
    
    image.onerror = function(e) {
        console.log(e);
        callback(new Error('An error occurred while attempting to load SVG'));
    };
    image.onload = function() {
        canvas = d3.select('body').append('canvas')
        .style('display', 'none')
        .attr('width', width)
        .attr('height', height)
        .node();
        
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        var url = canvas.toDataURL('image/png');
        
        d3.selectAll([ canvas, image ]).remove();
        
        callback(null, url);
    };
    image.src = 'data:image/svg+xml,' + encodeURIComponent(source);
}

function updateDownloadURL(svg, link) {
    getDownloadURL(svg, function(error, url) {
               if (error) {
                   console.error(error);
               } else {
                   link.href = url;
               }
           });
}

updateDownloadURL(svg.node(), document.getElementById('download'));
*/
