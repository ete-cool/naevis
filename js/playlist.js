const playPause = document.querySelector("#playpause");
const playPauseBtn = document.querySelector("#playpause-btn");
const audio = document.querySelector("#audio");
const prevBtn = document.querySelector("#prevbtn");
const nextBtn = document.querySelector("#nextbtn");
const progress = document.querySelector("#progress");
const currTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".duration-time");
const layer = document.querySelector(".layer");
const volBar = document.querySelector(".bar");
const progressLine = document.querySelector(".progress-line");
const volumeRange = document.querySelector(".volumerange");
const repeatBtn = document.querySelector("#repeat");
const likeBtn = document.querySelector("#like");
const likeIcon = document.querySelector("#likeicon");
const songList = document.querySelector("#songs-list");
const listCloseBtn = document.querySelector("#listclose");

// songs array
const songs = [
  {
    path: 'https://raw.githubusercontent.com/saranshbhardwaj1999/audio/main/Justin_Bieber_Hold_On.mp3',
    displayName: 'Hold On',
    artist: 'Justin Bieber'
  }
];

// Default song index 
let songIndex = 2;

// Song default state
let isPlaying = false;

// Song play function
function playSong() {
  isPlaying = true;
  playPauseBtn.classList.replace("fa-play", "fa-pause");
  audio.play();
}

// Song pause function
function pauseSong() {
  isPlaying = false;
  playPauseBtn.classList.replace("fa-pause", "fa-play");
  audio.pause();
}

// Loading songs
function loadSong(song) {
  audio.src = song.path;
};

// Previous song 
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Progress bar function
function updateProgress(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;
    progressLine.style.width = `${progressPercent}%`;
    if (progressPercent == 100) {
      return nextSong();
    }
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currTime.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function progressSlide(e) {
  const { value } = e.target;
  const progressTime = Math.ceil((audio.duration / 100) * value);
  audio.currentTime = progressTime;
  if (!isPlaying) {
    progressLine.style.width = `${value}%`;
  }
}

function volumeBar() {
  layer.classList.toggle('hide');
  setTimeout(() => {
    if (layer.classList.contains("hide")) {
      layer.classList.remove("hide");
    }
  }, 5000);
}

function setVolume() {
  audio.volume = volumeRange.value;
  const barWidth = (volumeRange.value / 1) * 100;
  volBar.style.width = `${barWidth}%`;
}

function repeat() {
  repeatBtn.classList.toggle('color');
  const repeatBtnState = repeatBtn.classList.contains("color");
  audio.loop = repeatBtnState;
}
function like() {
  if (likeBtn.classList.toggle('color')) {
    likeIcon.classList.replace('far', 'fas');
  } else {
    likeIcon.classList.replace('fas', 'far');
  }
  createHearts();
}

function createHearts() {
  // Create a container for hearts
  const heartContainer = document.createElement('div');
  heartContainer.classList.add('heart-container');
  
  // Append the container to the body
  document.body.appendChild(heartContainer);

  // Create multiple hearts
  for (let i = 0; i < 17; i++) {
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart', 'floating-heart');
    heart.style.left = Math.random() * 100 + 'vw'; // Random position
    heart.style.animationDelay = Math.random() * 2 + 's'; // Random delay

    // Append heart to the container
    heartContainer.appendChild(heart);

    // Remove the heart after animation
    setTimeout(() => {
      heart.remove();
    }, 3000); // Match the duration of the CSS animation
  }
}


// Event listeners
playPause.addEventListener("click", () => (isPlaying ? pauseSong() : playSong())); 
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("input", progressSlide);
volumeRange.addEventListener("input", setVolume);
repeatBtn.addEventListener("click", repeat);
likeBtn.addEventListener("click", like);
document.querySelector("#list")?.addEventListener("click", musicList);
// Lyrics array with timestamps (in seconds)
const lyrics = [
  { time: 0, text: "In my garden," },
  { time: 2, text: "there’s a snake crawling." },
  { time: 5, text: "I’m a wolf. I’m a wolf." },
  { time: 8, text: "Bite your head before you come here." }
];

// Function to display lyrics like a karaoke
function displayLyrics() {
  const currentTime = audio.currentTime; // Get the current time of the audio
  let currentIndex = 0; // To hold the index of the current lyric

  // Find the current lyric index
  for (let i = 0; i < lyrics.length; i++) {
    if (currentTime >= lyrics[i].time) {
      currentIndex = i; // Update the current index if the time matches
    }
  }

  // Determine the previous, current, and next lyrics
  const previousLyric = lyrics[currentIndex - 1] ? lyrics[currentIndex - 1].text : '';
  const currentLyric = lyrics[currentIndex] ? lyrics[currentIndex].text : '';
  const nextLyric = lyrics[currentIndex + 1] ? lyrics[currentIndex + 1].text : '';

  // Update the text content of the .text_box with the karaoke style lyrics
  document.querySelector('.text_box').innerHTML = `
    <p class="faded">${previousLyric}</p><br>
    <p class="highlight">${currentLyric}</p><br>
    <p class="faded">${nextLyric}</p>
  `;
}

// Event listener to update lyrics with time
audio.addEventListener("timeupdate", displayLyrics);
