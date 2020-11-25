const currentLocation = location.href;
const menuItem = document.querySelectorAll(".kolor");
const menuLength = menuItem.length
for (let i = 0; i < menuLength; i++) {
  if (menuItem[i].href == currentLocation){
    menuItem[i].className = "aktiv"
  }
}

// const btns = document.querySelectorAll("a");
// const header = document.getElementById("id03");

// header.addEventListener("click", function (e) {
//   const id = e.target.dataset.id;
//   if (id) {
//     //remove active from other button
//     btns.forEach(function (btn) {
//       btn.classList.remove("aktiv");
//       e.target.classList.add("aktiv");
//     });
//   }
// });