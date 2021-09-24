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

