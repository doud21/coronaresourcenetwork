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
//1
function unhideLightboxOne() {

  document.getElementById('lightboxOverlay').classList.remove('hidden');
  document.getElementById('covered1').classList.remove('hidden');
  document.body.style.overflow = "hidden";

}

document.getElementById('img1').onclick = unhideLightboxOne;

document.getElementById('lightboxOverlay').onclick = closeLightbox;


//2
function unhideLightboxTwo() {

  document.getElementById('lightboxOverlay').classList.remove('hidden');
  document.getElementById('covered2').classList.remove('hidden');
  document.body.style.overflow = "hidden";

}

document.getElementById('img2').onclick = unhideLightboxTwo;


function closeLightbox() {

	document.getElementById('lightboxOverlay').classList.add('hidden');
  document.getElementById('covered1').classList.add('hidden');
	document.getElementById('covered2').classList.add('hidden');
  document.body.style.overflow = "scroll";
}

document.getElementById('lightboxOverlay').onclick = closeLightbox;
