(function () {
  var grid = document.getElementById("course-grid");
  var select = document.getElementById("training-select");
  var labels = { leiders: "Leiders", teams: "Teams", rollen: "Rol", portfolio: "Portfolio", techniek: "Techniek" };

  function render(filter) {
    grid.innerHTML = "";
    window.COURSES.filter(function (c) { return filter === "all" || c.cat === filter; })
      .forEach(function (c) {
        var el = document.createElement("article");
        el.className = "course";
        el.innerHTML =
          '<div class="course-top"><span class="tag">' + labels[c.cat] + '</span><span class="days">' + c.days + ' dagen</span></div>' +
          '<h3></h3><p class="course-text"></p><p class="cert"></p>' +
          '<a class="link" href="#contact">Aanvragen →</a>';
        el.querySelector("h3").textContent = c.title;
        el.querySelector(".course-text").textContent = c.text;
        el.querySelector(".cert").textContent = "Certificering: " + c.cert;
        el.querySelector("a").addEventListener("click", function () { select.value = c.title; });
        grid.appendChild(el);
      });
  }

  window.COURSES.forEach(function (c) {
    var o = document.createElement("option");
    o.textContent = c.title;
    select.appendChild(o);
  });

  document.querySelectorAll(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      document.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("is-active"); });
      chip.classList.add("is-active");
      render(chip.dataset.filter);
    });
  });
  render("all");

  // Mobiel menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", false); }
  });

  // Contactformulier -> mailto (GitHub Pages heeft geen server)
  var form = document.getElementById("contact-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var d = new FormData(form);
    var subject = "Aanvraag " + (d.get("vorm") || "") + (d.get("training") ? ": " + d.get("training") : "");
    var body = [
      "Naam: " + d.get("naam"),
      "Organisatie: " + d.get("organisatie"),
      "E-mail: " + d.get("email"),
      "Training: " + (d.get("training") || "nog niet zeker"),
      "Vorm: " + d.get("vorm"),
      "Aantal deelnemers: " + d.get("aantal"),
      "",
      d.get("bericht")
    ].join("\n");
    window.location.href = "mailto:perquin@bakspa.nl?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
