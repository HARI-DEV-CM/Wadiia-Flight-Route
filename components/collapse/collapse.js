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