let players = [
  { name: '櫻木花道', pts: 0, reb: 0, ast: 0, stl: 0, blk: 2 },
  { name: '流川楓', pts: 30, reb: 6, ast: 3, stl: 3, blk: 0 },
  { name: '赤木剛憲', pts: 16, reb: 10, ast: 0, stl: 0, blk: 5 },
  { name: '宮城良田', pts: 6, reb: 0, ast: 7, stl: 6, blk: 0 },
  { name: '三井壽', pts: 21, reb: 4, ast: 3, stl: 0, blk: 0 }
]

const dataPanel = document.querySelector('#data-panel')

// write your code here
let scoreListHTML = ''
function displayPlayerList(players) {
  /*players.forEach((scoreBoard) => {
    scoreListHTML += 
      `
      <tr>
      <td>${scoreBoard.name}</td>
      <td>${scoreBoard.pts}<i class="fa fa-plus-circle up"/><i class="fa fa-minus-circle down"/></td>
      <td>${scoreBoard.reb}<i class="fa fa-plus-circle up"/><i class="fa fa-minus-circle down"/></td>
      <td>${scoreBoard.ast}<i class="fa fa-plus-circle up"/><i class="fa fa-minus-circle down"/></td>
      <td>${scoreBoard.stl}<i class="fa fa-plus-circle up"/><i class="fa fa-minus-circle down"/></td>
      <td>${scoreBoard.blk}<i class="fa fa-plus-circle up"/><i class="fa fa-minus-circle down"/></td>
      </tr>
      `
  })*/
  let i = 0;
  players.forEach((playerDetail) => {
    scoreListHTML = '<tr>'
    Object.keys(playerDetail).forEach(key => 
    {
      if(isNaN(playerDetail[key])) {
        scoreListHTML += `<td>${playerDetail[key]}</td>`
      } else {
        scoreListHTML += 
          `<td><a>${playerDetail[key]}</a><i class="fa fa-plus-circle up"></i><i class="fa fa-minus-circle down"></i></td>`
      }
    })
    scoreListHTML += '</tr>'
    document.getElementById('data-panel').innerHTML += scoreListHTML
  })
}

//addEventListener
dataPanel.addEventListener('click', (event) => {
  let tdValue = event.target.parentElement.children[0]
  let score = parseInt(tdValue.innerText)
  if(event.target.classList.contains('fa-plus-circle')) {
    tdValue.innerText = ++score
  } else if(event.target.classList.contains('fa-minus-circle')) {
    if((score - 1) < 0) {
      return alert('數值不能低於0')
    }
    tdValue.innerText = --score
  } 
})

displayPlayerList(players)