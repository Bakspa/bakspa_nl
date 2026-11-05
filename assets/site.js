// Gedeeld script voor subpagina's (blog): mobiel menu en jaartal.
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
    });
  }
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
