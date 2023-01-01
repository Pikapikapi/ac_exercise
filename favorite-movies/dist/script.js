'use strict'

// 資料
const movies = [{
  title: 'The Avengers',
  image: 'https://assets-lighthouse.alphacamp.co/uploads/image/file/15305/TheAvengersPoster.jpg',
  rating: 0
},
{
  title: 'Our Times',
  image: 'https://assets-lighthouse.alphacamp.co/uploads/image/file/15304/OurtimesPoster.jpeg',
  rating: 0
},
{
  title: 'Aquaman',
  image: 'https://assets-lighthouse.alphacamp.co/uploads/image/file/15303/AquamanPoster.jpg',
  rating: 0
}]

// 選取節點
const dataPanel = document.querySelector('#data-panel')

// 函式
function displayMovieList (movies) {
  let htmlContent = `
    <table class="table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Rating</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
    `
  for (let i = 0; i < movies.length; i++) {
    htmlContent += `
        <tr>
          <td>
            <img src="${movies[i].image}" width="70" class="img-thumbnail">
          </td>
          <td>${movies[i].title}</td>
          <td>
            <span class="fa fa-thumbs-up"></span>
            <span class="fa fa-thumbs-down px-2"></span>
            <span>${movies[i].rating}</span>
          </td>
          <td>
            <button class="btn btn-sm btn-success fa fa-thumbs-up"></button>
          </td>
          <td>
            <button class="btn btn-sm btn-danger movie-remove">X</button>
          </td>
        </tr>
      `
  }
  htmlContent += `
      </tbody>
    </table>
  `
  return htmlContent
}

// 將組合好的字串傳回節點，修改內容
dataPanel.innerHTML = displayMovieList(movies)

function triggerHandler(triggerObj, index, buttonFunction){
  switch(buttonFunction) {      
    case 'Super like':
      movies[index].rating += 10
      break
    case 'Like':
      movies[index].rating += 1
      break
    case 'Not like':
      if((movies[index].rating - 1) < 0) return alert('評分不能小於0')
      movies[index].rating -= 1
      break
    case 'Movie remove':
      movies.splice(index,1)
      triggerObj.remove()
      return
    default:
      break
  }
  triggerObj.innerText = movies[index].rating
}

dataPanel.addEventListener('click', (event) => {
  const eventTargetParent = event.target.parentElement
  let classify = ''
  let triggerObj = ''
  if(event.target.classList.contains('fa-thumbs-up') && event.target.classList.contains('btn-success')) {
    classify = 'Super like'
    triggerObj = eventTargetParent.previousElementSibling.children[2]
  } else if (event.target.classList.contains('fa-thumbs-up')) {
    classify = 'Like'
    triggerObj = eventTargetParent.children[2]
  } else if (event.target.classList.contains('fa-thumbs-down')) {
    classify = 'Not like'
    triggerObj = eventTargetParent.children[2]
  } else if (event.target.classList.contains('movie-remove')) {
    classify = 'Movie remove'
    triggerObj = eventTargetParent.parentElement
  } else {
    return
  }
  const movieTitle = eventTargetParent.parentElement.children[1].innerText
  const index = movies.findIndex(element => element.title === movieTitle)
  triggerHandler(triggerObj, index, classify)
})