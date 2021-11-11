// Accordion

var acc = document.getElementsByClassName("accordion1");
var i;

const addAccordianEventListener = () => {
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      console.log("CLICKED ACCORDIAN");
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      var accord = this.querySelector(".accordion1 .fa");
      if (panel.style.display === "block") {
        accord.classList.remove("fa-minus");
        accord.classList.add("fa-plus");
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
        accord.classList.remove("fa-plus");
        accord.classList.add("fa-minus");
      }
    });
  }
}

// Collapse

var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    console.log("clicked");
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    var collapse = this.querySelector(".collapsible .fa");
    if (content.style.display === "block") {
      collapse.classList.remove("fa-angle-up");
      collapse.classList.add("fa-angle-down");
      content.style.display = "none";
    } else {
      content.style.display = "block";
      collapse.classList.add("fa-angle-up");
      collapse.classList.remove("fa-angle-down");
    }
  });
}

//Hamburger

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





