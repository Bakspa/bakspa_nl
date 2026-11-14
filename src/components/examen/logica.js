// Rekenwerk van het oefenexamen, los van de opmaak (zodat het te testen is).

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
  const gezienNa = new Set(opnieuw ? [] : [...gezien].filter((id) => poolIds.has(id)));
  gekozen.forEach((v) => gezienNa.add(v.id));
  return {gekozen, gezienNa, opnieuw};
}

// Stel een examen samen: een deel uit de rol, de rest uit de basis.
export function stelExamenSamen({rolVragen, basisVragen, aantal, aandeelRol, gezien, rnd = Math.random}) {
  const doelRol = Math.min(rolVragen.length, Math.round(aantal * aandeelRol));
  const doelBasis = Math.min(basisVragen.length, aantal - doelRol);
  const rol = kiesUitPool(rolVragen, doelRol, gezien, rnd);
  const basis = kiesUitPool(basisVragen, doelBasis, gezien, rnd);
  // Is de basis te klein, vul dan aan uit de rol (en andersom).
  let extra = [];
  const tekort = aantal - rol.gekozen.length - basis.gekozen.length;
  if (tekort > 0) {
    const al = new Set([...rol.gekozen, ...basis.gekozen].map((v) => v.id));
    extra = schud([...rolVragen, ...basisVragen].filter((v) => !al.has(v.id)), rnd).slice(0, tekort);
  }
  const vragen = schud([...rol.gekozen, ...basis.gekozen, ...extra], rnd);
  const gezienNa = new Set([...rol.gezienNa, ...basis.gezienNa]);
  extra.forEach((v) => gezienNa.add(v.id));
  // Geziene id's van andere rollen blijven bewaard.
  const hier = new Set([...rolVragen, ...basisVragen].map((v) => v.id));
  [...gezien].forEach((id) => { if (!hier.has(id)) gezienNa.add(id); });
  return {vragen, gezienNa, opnieuw: rol.opnieuw};
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
