// Kleurt cellen in een RACI-tabel. In het markdown-bestand schrijf je gewoon
// A, R, C of I in een cel; dit script geeft de cel de juiste kleur.
function kleurRaci() {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('.raci td').forEach((td) => {
    const letter = td.textContent.trim();
    if (['A', 'R', 'C', 'I'].includes(letter)) {
      td.classList.add('raci-' + letter);
    }
  });
}

export function onRouteDidUpdate() {
  // Even wachten tot de nieuwe pagina in de DOM staat.
  setTimeout(kleurRaci, 0);
}
