
const NomeMsc = document.getElementById('nome-msc');
const NomeBanda = document.getElementById("nome-banda");
const song = document.getElementById("audio");
const capa = document.getElementById("capa");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const likeButton = document.getElementById("like");
const currentProgress =  document.getElementById("current-progress");
const progressContainer =  document.getElementById("progress-container");
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');


const Primavera = {
    NomeMsc : "Primavera",
    artist : "Yung Lixo",
    file: "Primavera",
    Liked: false
};

const Haley = {
    NomeMsc : "Brisa de Verão",
    artist : "Chrono Rapper",
    file: "Haley",
    Liked: false
};

const Diamonds = {
    NomeMsc : "Diamonds are Forever",
    artist : "bbno$",
    file: "Diamonds-are-forever",
    Liked: false
};

const Uroboros ={ 
    NomeMsc: 'Uroboros',
    artist: "LVCAS",
    file: "uroboros",
    Liked: false
}


let isPlaying = false;
let isShuffled = false;
let RepeatOn = false;
const originalplaylist =[Primavera, Haley, Diamonds, Uroboros];
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

function likeButtoneRender(){
    if(sortedPlaylist[index].Liked === true){
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    }
    else{
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.classList.remove('button-active');
    }
}

function InitalizeSong(){
    capa.src = `images/${sortedPlaylist[index].file}.jpeg`;
    song.src = `musics/${sortedPlaylist[index].file}.mp3`;
    NomeMsc.innerText = sortedPlaylist[index].NomeMsc;
    NomeBanda.innerText = sortedPlaylist[index].artist;
    likeButtoneRender();

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

function updateProgress(){
    const barWidth = (song.currentTime/song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText= toHHMMSS(song.currentTime);
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
    else{
        isShuffled = false;
        sortedPlaylist = [...originalplaylist];
        shuffleButton.classList.remove('button-active')    
    }
}

function repeatButtonClicked(){
    if(RepeatOn === false){
        RepeatOn =  true;
        repeatButton.classList.add('button-active')
    }
    else{
        RepeatOn =  false;
        repeatButton.classList.remove('button-active')
    }
}

function nextOrRepeat(){
    if(RepeatOn === false){
        nextSong();
    }
    else{
        playSong();
    }
}

function toHHMMSS( originalNumber ){
    let hours = Math.floor(originalNumber/3600);
    let minutes =  Math.floor((originalNumber - hours * 3600)/60);
    let secs = Math.floor(originalNumber - (hours * 3600) - (minutes * 60))

    if(originalNumber > 3600){
        return`${hours.toString().padStart(2, '0')}:${minutes}:${secs.toString().padStart(2, '0')}`
    }
    else{
        return`${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    }


function updateTotalTime(){
    
    totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked(){
    if (sortedPlaylist[index].Liked === false){
        sortedPlaylist[index].Liked = true
    }
    else{
        sortedPlaylist[index].Liked = false
    }
    likeButtoneRender();
    localStorage.setItem(
        'playlist',
        JSON.stringify(originalplaylist))
        ;
}
   
InitalizeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong );
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat)
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked)
repeatButton.addEventListener('click', repeatButtonClicked)
likeButton.addEventListener('click', likeButtonClicked);
