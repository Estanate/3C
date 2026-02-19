
const NomeMsc = document.getElementById('nome-msc');
const NomeBanda = document.getElementById("nome-banda")
const song = document.getElementById("audio");
const capa = document.getElementById("capa");
const play = document.getElementById("play");

const Primavera = {
    NomeMsc : "Primavera",
    NomeBanda : "Yung Lixo",
    file: "Primavera",
}

NomeMsc.innerText = "Primavera";
let isPlaying = false

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if( isPlaying == true){
        pauseSong();
    }

    else{
        playSong();
    }
}
   
play.addEventListener('click', playPauseDecider)