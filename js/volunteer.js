// Display Hamburger Contents
function openBurger() {
  var x = document.getElementsByClassName("buttons2");

  if (x[0].style.display === "block") {
    x[0].style.display = "none";
  } else {
    x[0].style.display = "block";
  }
}

// Display Lightbox
function unhideLightbox() {

  document.getElementById('lightboxOverlay').classList.remove('hidden');
  document.getElementById('covered').classList.remove('hidden');
  document.body.style.overflow = "hidden";

}

document.getElementById('img1').onclick = unhideLightbox;
document.getElementById('img2').onclick = unhideLightbox;


function closeLightbox(lightboxID) {

	document.getElementById('lightboxOverlay').classList.add('hidden');
	document.getElementById('covered').classList.add('hidden');
  document.body.style.overflow = "scroll";
}

document.getElementById('lightboxOverlay').onclick = closeLightbox;
