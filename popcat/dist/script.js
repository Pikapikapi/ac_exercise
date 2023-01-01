const audio = new Audio(
  "https://www.myinstants.com/media/sounds/pop-cat-original-meme_3ObdYkj.mp3"
);
const divChangePic = document.getElementById("picHere");

function setImageVisible(id) {
  var img = document.getElementById(id);
  img.style.visibility =
    window.getComputedStyle(img).visibility === "hidden" ? "visible" : "hidden";
}

function addPopCounter() {
  let popCounter = parseInt(document.getElementById("popCounter").innerText);
  let divPopCounter = document.getElementById("popCounter");
  divPopCounter.innerText = ++popCounter;
}

divChangePic.addEventListener("mousedown", (e) => {
  const picIdNode = [].slice.call(e.target.parentElement.children);
  picIdNode.forEach((node) => {
    setImageVisible(node.id);
  });
  audio.play();
  addPopCounter();
});

divChangePic.addEventListener("mouseup", (e) => {
  const picIdNode = [].slice.call(e.target.parentElement.children);
  picIdNode.forEach((node) => {
    setImageVisible(node.id);
  });
});