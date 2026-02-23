
const NomeMsc = document.getElementById('nome-msc');
const NomeBanda = document.getElementById("nome-banda");
const song = document.getElementById("audio");
const capa = document.getElementById("capa");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentProgress =  document.getElementById("current-progress");
const progressContainer =  document.getElementById("progress-container");
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');

const Primavera = {
    NomeMsc : "Primavera",
    artist : "Yung Lixo",
    file: "Primavera"
};

const Haley = {
    NomeMsc : "Brisa de Verão",
    artist : "Chrono Rapper",
    file: "Haley"
};

const Diamonds = {
    NomeMsc : "Diamonds are Forever",
    artist : "bbno$",
    file: "Diamonds-are-forever"
};


let isPlaying = false;
let isShuffled = false;
const originalplaylist =[Primavera, Haley, Diamonds];
let sortedPlaylist = [...originalplaylist];
let index = 0;

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

function InitalizeSong(){
    capa.src = `images/${sortedPlaylist[index].file}.jpeg`;
    song.src = `musics/${sortedPlaylist[index].file}.mp3`;
    NomeMsc.innerText = sortedPlaylist[index].NomeMsc;
    NomeBanda.innerText = sortedPlaylist[index].artist;

}

function previousSong(){
    if(index === 0){
        index = sortedPlaylist.length - 1;
    }
    else{
        index -= 1;
    }
    InitalizeSong();
    playSong();
}

function nextSong(){
    if(index === sortedPlaylist.length - 1 ){
        index = 0;
    }
    else{
        index += 1;
    }
    InitalizeSong();
    playSong();
}

function updateProgressBar(){
    const barWidth = (song.currentTime/song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`)
}

function jumpTo(event){
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition/width) * song.duration;
  song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
    let size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray [randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -=1;
    }
}

function shuffleButtonClicked(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active')
    }
}
   
InitalizeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong );
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked)
