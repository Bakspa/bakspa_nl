// Kleine hulpfuncties voor het oefenexamen: taal, opslag in de browser en (later) tellen.
// Alles werkt ook als de browser opslag blokkeert; dan wordt er gewoon niets onthouden.

const TAAL_SLEUTEL = 'bakspa-oefenexamen-taal';
const GEZIEN_SLEUTEL = 'bakspa-oefenexamen-gezien';

export function leesTaal() {
  try {
    const p = new URLSearchParams(window.location.search).get('lang');
    if (p === 'en' || p === 'nl') return p;
    const opgeslagen = window.localStorage.getItem(TAAL_SLEUTEL);
    if (opgeslagen === 'en' || opgeslagen === 'nl') return opgeslagen;
  } catch (e) { /* geen toegang tot URL of opslag */ }
  return 'nl';
}

export function bewaarTaal(taal) {
  try {
    window.localStorage.setItem(TAAL_SLEUTEL, taal);
    const url = new URL(window.location.href);
    if (taal === 'nl') url.searchParams.delete('lang');
    else url.searchParams.set('lang', taal);
    window.history.replaceState(null, '', url.toString());
  } catch (e) { /* niet erg */ }
}

export function leesGezien() {
  try {
    const lijst = JSON.parse(window.localStorage.getItem(GEZIEN_SLEUTEL) || '[]');
    return new Set(Array.isArray(lijst) ? lijst : []);
  } catch (e) {
    return new Set();
  }
}

export function bewaarGezien(set) {
  try {
    window.localStorage.setItem(GEZIEN_SLEUTEL, JSON.stringify([...set]));
  } catch (e) { /* niet erg */ }
}

export function leesParam(naam) {
  try {
    return new URLSearchParams(window.location.search).get(naam) || '';
  } catch (e) {
    return '';
  }
}

export const isJa = (v) => v === true || v === 'ja' || v === 'Ja';

// Tellen (stap 2, nog niet actief).
// Hier komt later één anonieme melding naar een teller (bijv. Supabase in de EU):
//   meld('gestart', {rol, taal})
//   meld('afgerond', {rol, taal, goed, totaal})
//   meld('vragen', {getoond: [id, ...], goed: [id, ...]})
// Zonder naam, e-mail, IP-adres of cookies. Tot die tijd doet deze functie niets.
export function meld(gebeurtenis, gegevens) { // eslint-disable-line no-unused-vars
}
