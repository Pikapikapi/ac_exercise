//選取事件
const rgbSliders = document.querySelectorAll("input");
const redRange = document.getElementById("color-r");
const greenRange = document.getElementById("color-g");
const blueRange = document.getElementById("color-b");

//set backgroung to html page default r,g,b(0,0,0)
window.onload = function () {
  changeBackgroundColor();
};
//slider移動=>hexa-code-value 改變
//slider移動=>背景顏色改變
//addEventListener
rgbSliders.forEach((slider) => {
  slider.addEventListener("mousemove", displayChanges);
});

//轉換16進位hexacode
function transferToHexaCode(val) {
  return parseInt(val).toString(16).padStart(2, "0");
}

//三個數值轉換hexacode
function rgbToHexaCode(r, g, b) {
  return (
    "#" + transferToHexaCode(r) + transferToHexaCode(g) + transferToHexaCode(b)
  );
}

function getRGBString() {
  return `rgb(${redRange.value},${greenRange.value},${blueRange.value})`;
}

//找出互補色
function getReverseRGBString() {
  return `
  rgb(
    ${Math.abs(255 - redRange.value)},
    ${Math.abs(255 - greenRange.value)},
    ${Math.abs(255 - blueRange.value)})
  `;
}

//依照RGB回傳改變bgcolor
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRGBString();
  document.body.style.color = getReverseRGBString();
}

function changeHexaCodeValue(e) {
  document.getElementById("hexa-code-value").innerHTML = rgbToHexaCode(
    redRange.value,
    greenRange.value,
    blueRange.value
  );
}

function changeRangeOutputValue(e) {
  e.target.nextElementSibling.value = e.target.value;
}

//串回網頁HexaCode顯示
function displayChanges(e) {
  changeHexaCodeValue(e);
  changeRangeOutputValue(e);
  changeBackgroundColor(e);
}
