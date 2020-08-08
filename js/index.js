// Display Hamburger Contents
function openBurger() {
  var x = document.getElementsByClassName("buttons2");

  if (x[0].style.display === "block") {
    x[0].style.display = "none";
  } else {
    x[0].style.display = "block";
  }
}
