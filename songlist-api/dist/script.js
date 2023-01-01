// DEFAULT CODE ////////////////////////
const BASE_URL = 'https://webdev.alphacamp.io/api/lyrics/'
const songList = document.querySelector('#song-list')
const lyricsPanel = document.querySelector('#lyrics-panel')
const album = {
  artist: 'Adele',
  album: '25',
  tracks: [
    'Hello',
    'Send My Love (To Your New Lover)',
    'I Miss You',
    'When We Were Young',
    'Remedy',
    'Water Under the Bridge',
    'River Lea',
    'Love in the Dark',
    'Million Years Ago',
    'All I Ask',
    'Sweetest Devotion'
  ]
}
// WRITE YOUR CODE ////////////////////////
window.onload = insertSongList();

//console.log(album.tracks[0]);//Hello
function insertSongList() {
  const ulSongList = document.getElementById('song-list')
  album.tracks.forEach(songName => {
    ulSongList.innerHTML += `
    <li class="nav-item">
      <a class="nav-link" aria-current="page" href="#">${songName}</a>
    </li>`
  })
}
songList.addEventListener('click',function(event){
  //console.log(event.target.innerText)
  //選中的class變藍
  changeLyricStyle(event.target)
  //找歌詞塞進去
  insertLyric(event.target.innerText)
})
let currentSelectSongItem = ''
function changeLyricStyle(element){
  if(currentSelectSongItem !== '') currentSelectSongItem.classList.remove("active")
  
  currentSelectSongItem = element;
  if(element.classList.contains("active")){
    element.classList.remove("active")
  } else {
    element.classList.add("active")
  }
}                          

function insertLyric(songName) {
  const songRequest = `${album.artist}/${songName}.json`
  //console.log(apiURL)
  axios
    .get(`${BASE_URL}${songRequest}`)
    .then(function (response) {
      const currentPanel = document.getElementById('lyrics-panel')
      currentPanel.innerText = response.data.lyrics
      //console.log(response.data.lyrics)
    })
    .catch(function (error) {
    currentPanel.innerHTML = 'lyrics not found!'
  });
}