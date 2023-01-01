//TODO 是不是要checkID

let userDetail = document.getElementById("userContent");
const searchButton = document.getElementById("searchFriends");
const genderSelect = document.querySelector('input[name="gender"]:checked')
  .value;
let userName = "";
let gender = "";
let dynamicFriendNumber = -1;
let userData = {
  id: "",
  name: "",
  picture: "",
  email: "",
  gender: ""
};
let userList = [userData];
//onload放進第一張user caard
window.onload = findFriend();
//添加click listener for search friend
searchButton.addEventListener("click", function () {
  const genderSelect = document.querySelector('input[name="gender"]:checked')
    .value;
  repeat(findFriend, 3);
});
//將找朋友的功能脫出，方便click可以在往後擴充功能時不會被影響
function findFriend() {
  if (dynamicFriendNumber === -1) {
    ++dynamicFriendNumber;
    return;
  }
  const apiURL = "https://randomuser.me/api/";
  //找不到條件的朋友就持續重新產生，滿足條件則用finally畫出卡片
  axios
    .get(`${apiURL}`)
    .then(function (response) {
      const data = response.data.results[0];
      console.log(data);
      //使用filterFriendZoneProcessDone來將所有user的資訊進行過濾，並且解耦合
      if (!filterFriendZoneProcessDone(data)) {
        findFriend();
      } else {
        //releaseCurrUserData();
        generalUserDetail(data);
        generalUserCard(dynamicFriendNumber);
        ++dynamicFriendNumber;
      }
    })
    .catch(function (error) {});
}

function generalUserCard(serialNum) {
  document.getElementById("friendZone").innerHTML += `  
  <div id='showRandomGuys${serialNum}' class="card">
    <span id="userName${serialNum}">
      <B>${userData.name}</B>
    </span>
    <img id="randomPicture${serialNum}" class="card-img-top img-thumbnail" src="${userData.picture}" alt="randomGuy">
    <div class="card-body">
      <span id='userContent${serialNum}'>
        ${userData.email}
      </span>
    </div>
  </div>
  `;
}

function generalUserDetail(data) {
  Object.keys(data).forEach((key) => {
    if (key in userData) {
      combineUserData(data, key);
      return;
    }
  });
}

/*function releaseCurrUserData() {
  userDetail.innerHTML = "";
  userName = "";
}*/

function combineUserData(data, key) {
  switch (key) {
    case "id":
      userData.id = data[key].value;
    case "picture":
      userData.picture = data[key].thumbnail;
      break;
    case "name":
      userData.name = `${data[key].first} ${data[key].last}`;
      break;
    case "email":
      userData.email = `${data[key]}`;
      break;
    default:
      break;
  }
}

function isGenderEqualsToUserSelect(gender, userOption) {
  return gender === userOption || userOption === "both";
}

//我知道這個篩選應該是後端應該要處理，只是拿來前端練習跟玩而已
function filterFriendZoneProcessDone(data) {
  //如果有其他篩選條件就放在這個區域
  const checked =
    isGenderEqualsToUserSelect(data["gender"], genderSelect) &&
    !userExistInList(data["id"].value);
  return checked;
}

function userExistInList(catchName) {
  const checked = userList.find(({ name }) => name === catchName);
  return checked;
}

function repeat(func, times) {
  func();
  times && --times && repeat(func, times);
}
