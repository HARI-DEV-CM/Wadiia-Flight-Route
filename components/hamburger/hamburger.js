var menu = document.querySelector(".menu");
var ham = document.querySelector(".hamburger");
var close = document.querySelector(".hamburger-close");
ham.addEventListener("click", toggleMenu);
close.addEventListener("click", toggleMenu);
menu.classList.contains("showMenu");
function toggleMenu() {
    console.log("CLICKED")
    console.log(menu.classList);
    if (menu.classList.contains("showMenu")) {
        menu.classList.remove("showMenu");
        menu.style.display="none"
    } else {
        menu.classList.add("showMenu");
        menu.style.display="block"
    }
}
// var menuLinks = document.querySelectorAll(".menuLink");
// menuLinks.forEach(
//     function (menuLink) {
//         menuLink.addEventListener("click", toggleMenu);
//     }
// )