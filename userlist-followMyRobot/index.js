//抓取user list
const robotList = []
let filteredRobots = [] //搜尋清單
let howManyUserOnePageShouldGet = 20
let showHowManyUserInOnePage = 20
let likeList = JSON.parse(localStorage.getItem('favoriteRobot')) || []
let currPage = 1
//生成卡片
function userCardGenerator(robot) {
  let htmlContent = ''
  robot.forEach((robot) => {
    const robotId = robot.id;
    const imgSrc = robot.avatar;
    const userAccount = robot.name + " " + robot.surname;
    htmlContent += `<div>
    <div class="mb-2">
      <div class="card" id="userCard${robotId}">
        <img src="${imgSrc}" />
        <div class="card-body">
          <h5 class="card-title">${userAccount}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-user" data-bs-toggle="modal" data-bs-target="#user-modal" onclick="getUserDetail(${robotId})">
            More
          </button>
          <button class="btn btn-info btn-add-favorite" onclick="addToFavorite(${robotId})" title="追隨">+</button>
        </div>
      </div>
    </div>
  </div>`;
  })

  document.querySelector('#user-panel').innerHTML = htmlContent
}

function getUserDetail(id) {
  const requestURL = "https://user-list.alphacamp.io/api/v1/users/" + id;
  axios
    .get(requestURL)
    .then((response) => {
      //console.log(response.data);
      const userAccount = response.data.name + " " + response.data.surname;
      const birthday = response.data.birthday;
      const age = response.data.age;
      const email = response.data.email;
      insertData("userName", userAccount);
      insertData("birthday", birthday);
      insertData("age", age);
      insertData("email", email);
    })
    .catch((err) => console.log(err));
}

function insertData(id, data) {
  const element = document.getElementById(id);
  element.innerText = data;
}
//從localStorage移除
function removeFromCokie(currList, id) {
  currList.splice(currList.findIndex((robot) => robot.id === id), 1)
  localStorage.setItem('favoriteRobot', JSON.stringify(currList))
}
//收藏卡片
function addToFavorite(id) {
  let favoriteRobotList = JSON.parse(localStorage.getItem('favoriteRobot')) || [];
  const robot = robotList.find((robot) => robot.id === id)
  if (favoriteRobotList.some((robot) => robot.id === id)) {
    removeFromCokie(favoriteRobotList, id)
    turnLikeEffect(favoriteRobotList, id)
    return alert("已經取消追隨")
  }
  favoriteRobotList.push(robot)
  localStorage.setItem('favoriteRobot', JSON.stringify(favoriteRobotList))
  turnLikeEffect(null, id)
  alert("加入追隨")
}
//卡片頁面數nav bar

function addPaginator(size) {
  let html = ""
  let lastPageIndex = "";
  lastPageIndex = size && size > 0 ? size : Math.ceil(
    Object.keys(robotList).length / showHowManyUserInOnePage
  );
  for (let i = 1; i <= lastPageIndex; i++) {
    html += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`
  }
  document.getElementById("paginator").innerHTML = html
}

function getArrayOfRobot(pageIndex) {
  const userIdStart = (pageIndex - 1) * howManyUserOnePageShouldGet
  const userIdEnd = userIdStart + showHowManyUserInOnePage
  const pageSlice = robotList
  return pageSlice.slice(userIdStart, userIdEnd)
}

function turnLikeEffect(currList, id) {
  //剛載入或是重新導向回來的時候
  currList = currList !== null ? JSON.parse(localStorage.getItem('favoriteRobot')) : []
  if (id < 0) {
    currList.forEach((robot) => {
      followHandler(robot.id)
    })
  } else {
    followHandler(id)
  }
}
//追隨設定
function followHandler(id) {
  const data = document.getElementById("userCard" + id)
  const elements = data.getElementsByTagName("button")
  for (var i = 0; i < elements.length; i++) {
    //如果偵測到目前是追隨中/非追隨中，把預設的網頁重新渲染
    if (elements[i].classList.contains("bi")) {
      followThisRobot(elements[i], false)
    } else if (elements[i].classList.contains("btn-add-favorite")) {
      followThisRobot(elements[i], true)
    }
  }
}

function followThisRobot(element, bool) {
  if (bool) {
    element.classList.add("bi")
    element.classList.add("bi-heart")
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg>`
    element.title = "取消追隨"
  } else {
    element.classList.remove("bi")
    element.classList.remove("bi-heart")
    element.innerHTML = "+"
    element.title = "追隨"
  }
}

function renderRobotPage(robot, size) {
  userCardGenerator(robot)
  addPaginator(size)
}

function changeItemInPageButtonText(text) {
  const button = document.getElementById("dropdownMenu2")
  button.innerText = text
}

window.onload = function() {
  const searchForm = document.querySelector("#search-form")
  const searchInput = document.querySelector("#search-input")
  const dropdownMenu = document.querySelector(".dropdown-menu")
  console.log(searchForm)
  console.log(dropdownMenu)
  const paginator = document.querySelector("#paginator")
  //listen to search form
  searchForm.addEventListener("keyup", function onSearchFormKeyup() {
    const keyword = searchInput.value.trim().toLowerCase();
    filteredRobots = robotList.filter(function(robot) {
      return robot.name.toLowerCase().includes(keyword) || robot.surname.toLowerCase().includes(keyword)
    }
    );
    if (filteredRobots.length === 0) {
      return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`);
    }
    renderRobotPage(filteredRobots, filteredRobots.length)
  });

  dropdownMenu.addEventListener("click", function onSearchFormClick(event) {
    console.log("in!-")
    if (event.target.tagName !== "A") return
    showHowManyUserInOnePage = Number(event.target.innerText) || 1
    renderRobotPage(getArrayOfRobot(currPage), null)
    changeItemInPageButtonText("item in page(" + showHowManyUserInOnePage + ")")
    turnLikeEffect([], -1)
  });

  // listen to paginator
  paginator.addEventListener("click", function onPaginatorClicked(event) {
    if (event.target.tagName !== "A") return
    const page = Number(event.target.innerText) || 1
    renderRobotPage(getArrayOfRobot(page), null)
    currPage = page
  });
}


axios
  .get(`https://user-list.alphacamp.io/api/v1/users`)
  .then((response) => {
    robotList.push(...response.data.results)
    renderRobotPage(getArrayOfRobot(1), null)
    turnLikeEffect([], -1)
  })
  .catch((err) => console.log(err));