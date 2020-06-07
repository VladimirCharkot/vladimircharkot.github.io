city_music = new Audio('city_in_the_clouds.mp3');
city_music.loop = true;

function switch_musica(){
    if (document.querySelector("#musica_switch").checked) city_music.play();
    else city_music.pause();
}
