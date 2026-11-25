// Kleurt cellen in een RACI-tabel. In het markdown-bestand schrijf je gewoon
// A, R, C of I in een cel; dit script geeft de cel de juiste kleur.
function kleurRaci() {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('.raci-tabel td').forEach((td) => {
    const letter = td.textContent.trim();
    if (['A', 'R', 'C', 'I'].includes(letter)) {
      td.classList.add('raci-' + letter);
    }
  });
  // Groepsregels (bijv. **PI Planning**): alleen de eerste cel is gevuld en vetgedrukt.
  document.querySelectorAll('.raci-tabel tr').forEach((tr) => {
    const cellen = Array.from(tr.children);
    if (cellen.length < 2 || !cellen[0].querySelector('strong')) return;
    if (cellen.slice(1).every((c) => c.textContent.trim() === '')) {
      tr.classList.add('raci-groep');
    }
  });
}

export function onRouteDidUpdate() {
  // Even wachten tot de nieuwe pagina in de DOM staat.
  setTimeout(kleurRaci, 0);
}
