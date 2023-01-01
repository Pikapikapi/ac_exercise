//抓取user list
const userDataInFavorite = JSON.parse(localStorage.getItem('favoriteRobot')) || [];
let pageIndex = 1;
let howManyUserOnePageShouldGet = 20;
let showHowManyUserInOnePage = 20;
let contentChange = false;

//不用這個可能生成圖片會被掠過，因為比網頁先載入完成
window.onload = function() {
  userCardGenerator(userDataInFavorite)
  addPaginator()
}

//生成卡片
function userCardGenerator(data) {
  let htmlContent = ''
  data.forEach((user) => {
    const userId = user.id;
    const imgSrc = user.avatar;
    const userAccount = user.name + " " + user.surname;
    htmlContent += `<div>
      <div class="mb-2">
        <div class="card" id="userCard${userId}">
          <img src="${imgSrc}" />
          <div class="card-body">
            <h5 class="card-title">${userAccount}</h5>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-show-user" data-bs-toggle="modal" data-bs-target="#user-modal" onclick="getUserDetail(${userId})">
              More
            </button>
            <button class="btn btn-danger btn-remove-favorite" onclick="removeFromFavorite(${userId})" title="取消追隨">X</button>
          </div>
        </div>
      </div>
    </div>`;
  })
  document.querySelector('#user-panel').innerHTML = htmlContent
}

function getUserDetail(id) {
  const robotDetail = userDataInFavorite.find((robot) => robot.id === id)
  const userAccount = robotDetail.name + " " + robotDetail.surname;
  const birthday = robotDetail.birthday;
  const age = robotDetail.age;
  const email = robotDetail.email;
  insertData("userName", userAccount);
  insertData("birthday", birthday);
  insertData("age", age);
  insertData("email", email);

}

function insertData(id, data) {
  const element = document.getElementById(id);
  element.innerText = data;
}
//移除卡片
function removeFromFavorite(id) {
  // console.log(id);
  const favoriteRobotList = JSON.parse(localStorage.getItem('favoriteRobot')) || []
  const indexInFavoriteList = userDataInFavorite.findIndex((robot) => robot.id === id)
  favoriteRobotList.splice(indexInFavoriteList, 1)
  localStorage.setItem('favoriteRobot', JSON.stringify(favoriteRobotList))
  contentChange = true
  userCardGenerator(favoriteRobotList)
}
//卡片頁面數nav bar
let lastPageIndex = "";
function addPaginator() {
  lastPageIndex = Math.ceil(
    Object.keys(userDataInFavorite).length / showHowManyUserInOnePage
  );
  for (let i = 1; i <= lastPageIndex; i++) {
    document.getElementById(
      "paginator"
    ).innerHTML += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
  }
}
