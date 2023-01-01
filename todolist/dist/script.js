// 初始變數
const todoList = document.querySelector("#my-todo");
const doneList = document.querySelector("#my-done");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");
const originalInputColor = document.getElementById("new-todo").style
  .borderColor;
const tdListInput = document.getElementById("new-todo");
let serialNum = 0;
// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

for (let todo of todos) {
  addItem("todo", todo);
}

// 函式 CRUD
function addItem(trigger, text) {
  let newItem = document.createElement("li");
  const check = "checked";
  newItem.innerHTML = `
    <label for="todo" class="${
      trigger === "done" ? "checked" : ""
    }">${text}</label>
    <i class="delete fa fa-trash"}"></i>
  `;
  newItem.setAttribute("id", "drag" + serialNum);
  newItem.setAttribute("draggable", true);
  newItem.setAttribute("ondragstart", "drag(event)");
  if (trigger === "todo") {
    todoList.appendChild(newItem);
  } else if (trigger === "done") {
    doneList.appendChild(newItem);
  }
  recoverInput();
  serialNum++;
}
// Create
input.addEventListener("keyup", function () {
  if (event.key === "Enter" || event.keyCode === 13) {
    clickEventHadle();
  }
});

addBtn.addEventListener("click", clickEventHadle);

function clickEventHadle(event) {
  const inputValue = input.value.trim();
  if (inputValue.length > 0) {
    addItem("todo", inputValue);
    recoverInput();
  } else {
    showInputErrorMsg();
  }
}

//recover and change input content
function recoverInput() {
  tdListInput.value = "";
  tdListInput.placeholder = "add item";
  tdListInput.style.borderColor = originalInputColor;
}

function showInputErrorMsg() {
  tdListInput.value = "";
  tdListInput.placeholder = "don't enter blank";
  tdListInput.style.borderColor = "red";
}
// Delete and check
todoList.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    addItem("done", target.innerHTML);
    target.parentElement.remove();
  }
});

doneList.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    target.classList.toggle("checked");
  }
});

//drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  /*原本想用drag的方式來轉移Phase，但是失敗了，
  可以拉，但是當我的物件拉到<li>跟<i> tag中間的時候，
  就會把物件放在中間，不知道該如何解決。
  */
  if (ev.target.closest("li")) {
    return;
  } else {
    /**/
  }
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}