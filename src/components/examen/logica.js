// Rekenwerk van het oefenexamen, los van de opmaak (zodat het te testen is).
// Let op: gebruik Array.from(set), nooit [...set]. De Docusaurus-build zet [...set] om naar
// [].concat(set), wat bij een Set niet werkt (dan tel je 0 en onthoud je niets).

// Fisher-Yates: een eerlijk geschudde kopie.
export function schud(lijst, rnd = Math.random) {
  const a = lijst.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Kies `aantal` stellingen uit `pool`, eerst stellingen die nog niet gezien zijn.
// Zijn er te weinig ongeziene, dan begint deze pool opnieuw: de rest komt uit de al geziene.
// Geeft de keuze terug en de nieuwe lijst geziene id's voor deze pool.
export function kiesUitPool(pool, aantal, gezien, rnd = Math.random) {
  const n = Math.min(aantal, pool.length);
  const nieuw = schud(pool.filter((v) => !gezien.has(v.id)), rnd);
  let gekozen = nieuw.slice(0, n);
  let opnieuw = false;
  if (gekozen.length < n) {
    opnieuw = true;
    const oud = schud(pool.filter((v) => gezien.has(v.id)), rnd);
    gekozen = gekozen.concat(oud.slice(0, n - gekozen.length));
  }
  const poolIds = new Set(pool.map((v) => v.id));
  const gezienNa = new Set(opnieuw ? [] : Array.from(gezien).filter((id) => poolIds.has(id)));
  gekozen.forEach((v) => gezienNa.add(v.id));
  return {gekozen, gezienNa, opnieuw};
}

// Stel een examen samen: een deel uit de rol, de rest uit de basis.
// Met aandeelWaar (bijv. 0.6) bevat elk examen precies dat deel "waar"-stellingen,
// zodat steeds "waar" (of steeds "niet waar") kiezen nooit genoeg is om te slagen.
export function stelExamenSamen({rolVragen, basisVragen, aantal, aandeelRol, aandeelWaar = null, gezien, rnd = Math.random}) {
  const doelRol = Math.min(rolVragen.length, Math.round(aantal * aandeelRol));
  const doelBasis = Math.min(basisVragen.length, aantal - doelRol);
  const waar = (lijst) => lijst.filter((v) => v.waar);
  const onwaar = (lijst) => lijst.filter((v) => !v.waar);

  // Deelpools: per bron (rol/basis), en bij een vaste verhouding ook per antwoord.
  let delen;
  let doelWaar = null;
  if (aandeelWaar === null) {
    delen = [{pool: rolVragen, n: doelRol, rol: true}, {pool: basisVragen, n: doelBasis}];
  } else {
    doelWaar = Math.round((doelRol + doelBasis) * aandeelWaar);
    const rolWaar = Math.min(waar(rolVragen).length, Math.round(doelRol * aandeelWaar));
    const basisWaar = Math.min(waar(basisVragen).length, Math.max(0, doelWaar - rolWaar));
    delen = [
      {pool: waar(rolVragen), n: rolWaar, rol: true},
      {pool: onwaar(rolVragen), n: doelRol - rolWaar, rol: true},
      {pool: waar(basisVragen), n: basisWaar},
      {pool: onwaar(basisVragen), n: doelBasis - basisWaar},
    ];
  }
  const resultaten = delen.map((d) => ({...d, ...kiesUitPool(d.pool, Math.max(0, d.n), gezien, rnd)}));
  const gekozen = resultaten.flatMap((r) => r.gekozen);

  // Te weinig stellingen in een deelpool? Vul aan, zo mogelijk met het juiste antwoord.
  const extra = [];
  const vulAan = (kandidaten, hoeveel) => {
    const al = new Set([...gekozen, ...extra].map((v) => v.id));
    const vrij = kandidaten.filter((v) => !al.has(v.id));
    const nieuw = schud(vrij.filter((v) => !gezien.has(v.id)), rnd);
    const oud = schud(vrij.filter((v) => gezien.has(v.id)), rnd);
    extra.push(...[...nieuw, ...oud].slice(0, Math.max(0, hoeveel)));
  };
  const alles = [...rolVragen, ...basisVragen];
  if (doelWaar !== null) {
    const huidig = () => [...gekozen, ...extra];
    vulAan(waar(alles), doelWaar - huidig().filter((v) => v.waar).length);
    vulAan(onwaar(alles), (aantal - doelWaar) - huidig().filter((v) => !v.waar).length);
  }
  vulAan(alles, aantal - gekozen.length - extra.length);

  const vragen = schud([...gekozen, ...extra], rnd);
  const gezienNa = new Set(resultaten.flatMap((r) => Array.from(r.gezienNa)));
  extra.forEach((v) => gezienNa.add(v.id));
  const opnieuw = resultaten.some((r) => r.rol && r.opnieuw);
  // Geziene id's van andere rollen blijven bewaard.
  const hier = new Set([...rolVragen, ...basisVragen].map((v) => v.id));
  Array.from(gezien).forEach((id) => { if (!hier.has(id)) gezienNa.add(id); });
  return {vragen, gezienNa, opnieuw};
}

export function telGoed(antwoorden) {
  return antwoorden.filter((a) => a.goed).length;
}

export function percentage(goed, totaal) {
  return totaal ? Math.round((goed / totaal) * 100) : 0;
}

// Vervangt {naam} in een tekst door waarden.
export function vul(tekst, waarden) {
  return String(tekst || '').replace(/\{(\w+)\}/g, (m, k) => (k in waarden ? String(waarden[k]) : m));
}
