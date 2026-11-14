import React, {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Tekst from '@site/src/components/Tekst';
import {stelExamenSamen, telGoed, percentage, vul} from './logica';
import {leesTaal, bewaarTaal, leesGezien, bewaarGezien, leesParam, isJa, meld} from './hulp';

// Het oefenexamen. Teksten en instellingen: examen/teksten.yml. Vragen: examen/*.yml.
// Fases: kies (rol kiezen) → aftellen (3-2-1) → vraag (30x) → klaar (uitslag).

const FEEDBACK_MS = {goed: 450, fout: 650, laat: 750};

export default function Oefenexamen({teksten, vragen: alleVragen}) {
  const inst = teksten.instellingen;
  const seconden = Number(inst.seconden_per_vraag) || 7;
  const aantal = Number(inst.aantal_vragen) || 30;
  const slaaggrens = Number(inst.slaaggrens) || 85;
  const basis = alleVragen.basis || [];
  const rollen = teksten.rollen.map((r) => ({...r, actief: (alleVragen[r.code] || []).length >= (Number(inst.minimum_vragen_rol) || 1)}));

  const [taal, setTaal] = useState('nl');
  const [rol, setRol] = useState('');
  const [fase, setFase] = useState('kies');
  const [aftel, setAftel] = useState(3);
  const [vragen, setVragen] = useState([]);
  const [index, setIndex] = useState(0);
  const [antwoorden, setAntwoorden] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [info, setInfo] = useState({opnieuw: false, gezien: 0, totaal: 0});
  const kaartRef = useRef(null);
  const stand = useRef({});
  stand.current = {fase, feedback, index, vragen, antwoorden, rol, taal};

  const t = teksten.examen[taal];
  const rolInfo = rollen.find((r) => r.code === rol);

  // Taal en eventueel een vooraf gekozen rol (?rol=rte) uit de adresbalk halen.
  useEffect(() => {
    setTaal(leesTaal());
    const r = leesParam('rol');
    if (rollen.some((x) => x.code === r && x.actief)) setRol(r);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function wisselTaal() {
    const nieuw = taal === 'nl' ? 'en' : 'nl';
    setTaal(nieuw);
    bewaarTaal(nieuw);
  }

  function start() {
    if (!rolInfo || !rolInfo.actief) return;
    const rolVragen = alleVragen[rol];
    const gezien = leesGezien();
    const r = stelExamenSamen({rolVragen, basisVragen: basis, aantal, aandeelRol: Number(inst.aandeel_rol) || 0.67, aandeelWaar: inst.aandeel_waar == null ? null : Number(inst.aandeel_waar), gezien});
    bewaarGezien(r.gezienNa);
    const rolIds = new Set(rolVragen.map((v) => v.id));
    setInfo({opnieuw: r.opnieuw, gezien: Array.from(r.gezienNa).filter((id) => rolIds.has(id)).length, totaal: rolVragen.length});
    setVragen(r.vragen);
    setAntwoorden([]);
    setIndex(0);
    setFeedback(null);
    setAftel(3);
    setFase('aftellen');
    meld('gestart', {rol, taal});
    if (kaartRef.current) kaartRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  // 3-2-1
  useEffect(() => {
    if (fase !== 'aftellen') return undefined;
    if (aftel <= 0) {
      setFase('vraag');
      return undefined;
    }
    const id = setTimeout(() => setAftel((a) => a - 1), 800);
    return () => clearTimeout(id);
  }, [fase, aftel]);

  function beantwoord(waarde) {
    const s = stand.current;
    if (s.fase !== 'vraag' || s.feedback) return;
    const vraag = s.vragen[s.index];
    const goed = waarde !== null && waarde === vraag.waar;
    const nieuw = [...s.antwoorden, {vraag, gegeven: waarde, goed}];
    setAntwoorden(nieuw);
    const soort = waarde === null ? 'laat' : goed ? 'goed' : 'fout';
    setFeedback(soort);
    setTimeout(() => {
      setFeedback(null);
      if (s.index + 1 >= s.vragen.length) {
        setFase('klaar');
        meld('afgerond', {rol: s.rol, taal: s.taal, goed: telGoed(nieuw), totaal: nieuw.length});
        meld('vragen', {getoond: nieuw.map((a) => a.vraag.id), goed: nieuw.filter((a) => a.goed).map((a) => a.vraag.id)});
      } else {
        setIndex(s.index + 1);
      }
    }, FEEDBACK_MS[soort]);
  }

  // De klok: na `seconden` telt de stelling als fout.
  useEffect(() => {
    if (fase !== 'vraag' || feedback) return undefined;
    const id = setTimeout(() => beantwoord(null), seconden * 1000);
    return () => clearTimeout(id);
  }, [fase, index, feedback]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sneltoetsen
  useEffect(() => {
    function toets(e) {
      if (stand.current.fase !== 'vraag') return;
      const k = e.key.toLowerCase();
      if (k === 'arrowleft' || k === 'j' || k === 't') { e.preventDefault(); beantwoord(true); }
      if (k === 'arrowright' || k === 'n' || k === 'f') { e.preventDefault(); beantwoord(false); }
    }
    window.addEventListener('keydown', toets);
    return () => window.removeEventListener('keydown', toets);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const goed = telGoed(antwoorden);
  const pct = percentage(goed, antwoorden.length || aantal);
  const geslaagd = pct >= slaaggrens;
  const fouten = antwoorden.filter((a) => !a.goed);
  const rolNaam = rolInfo ? rolInfo[taal] : '';
  const vraag = vragen[index];

  return (
    <Layout title={t.titel} description={t.beschrijving}>
      <Head><html lang={taal} /></Head>
      <main className="bk examen">
        <section className="section">
          <div className="wrap narrow">
            <div className="examen-top">
              <p className="eyebrow">{t.eyebrow}</p>
              {(fase === 'kies' || fase === 'klaar') && (
                <button type="button" className="chip" onClick={wisselTaal} lang={taal === 'nl' ? 'en' : 'nl'}>{t.taal}</button>
              )}
            </div>

            {fase === 'kies' && (
              <>
                <h1><Tekst>{t.kop}</Tekst></h1>
                <p className="lead"><Tekst>{t.intro}</Tekst></p>
                <ul className="checks">{t.regels.map((r) => <li key={r}>{r}</li>)}</ul>
              </>
            )}

            <div className="examen-kaart" ref={kaartRef}>
              {fase === 'kies' && (
                <>
                  <h2 className="examen-kies-kop">{t.kies_rol}</h2>
                  <div className="examen-rollen" role="radiogroup" aria-label={t.kies_rol}>
                    {rollen.map((r) => (
                      <button
                        key={r.code}
                        type="button"
                        role="radio"
                        aria-checked={rol === r.code}
                        disabled={!r.actief}
                        className={'examen-rol' + (rol === r.code ? ' is-gekozen' : '')}
                        onClick={() => setRol(r.code)}>
                        <span>{r[taal]}</span>
                        {!r.actief && <small>{t.binnenkort}</small>}
                      </button>
                    ))}
                  </div>
                  <button type="button" className="btn examen-start" onClick={start} disabled={!rolInfo}>
                    {rolInfo ? t.start : t.kies_eerst}
                  </button>
                </>
              )}

              {fase === 'aftellen' && (
                <div className="examen-aftel" aria-live="assertive">
                  <p>{t.klaar_voor} · {rolNaam}</p>
                  <strong>{aftel > 0 ? aftel : ''}</strong>
                </div>
              )}

              {fase === 'vraag' && vraag && (
                <div
                  className={'examen-vraag' + (feedback ? ` is-${feedback}` : '')}
                  onCopy={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}>
                  <div className="examen-voortgang">
                    <span>{t.vraag} {index + 1} {t.van} {vragen.length}</span>
                    <span>{rolNaam}</span>
                  </div>
                  <div className="examen-klok" aria-hidden="true">
                    <span key={index} className={feedback ? 'is-gestopt' : ''} style={{animationDuration: `${seconden}s`}} />
                  </div>
                  <p className="examen-stelling" lang={taal}>{vraag[taal]}</p>
                  <div className="examen-knoppen">
                    <button type="button" className="examen-knop is-waar" onClick={() => beantwoord(true)} disabled={!!feedback}>
                      <span aria-hidden="true">←</span> {t.waar}
                    </button>
                    <button type="button" className="examen-knop is-onwaar" onClick={() => beantwoord(false)} disabled={!!feedback}>
                      {t.onwaar} <span aria-hidden="true">→</span>
                    </button>
                  </div>
                  <p className="examen-feedback" aria-live="polite">
                    {feedback === 'goed' && t.goed}
                    {feedback === 'fout' && t.fout}
                    {feedback === 'laat' && t.te_laat}
                  </p>
                </div>
              )}

              {fase === 'klaar' && (
                <div className="examen-uitslag">
                  <p className="eyebrow">{t.uitslag} · {rolNaam}</p>
                  <p className={'examen-score' + (geslaagd ? ' is-geslaagd' : '')}>
                    <strong>{pct}%</strong>
                    <span>{goed} {t.goed_van} {antwoorden.length}</span>
                  </p>
                  <h2>{geslaagd ? t.geslaagd : t.gezakt}</h2>
                  <p>{geslaagd ? t.geslaagd_tekst : t.gezakt_tekst}</p>
                  <div className="cta-row">
                    <Link className="btn" to={`/opfrissen-of-certificeren/?rol=${rol}&score=${goed}&van=${antwoorden.length}${taal === 'en' ? '&lang=en' : ''}`}>
                      {t.cta} →
                    </Link>
                    <button type="button" className="btn btn-ghost" onClick={start}>{t.opnieuw}</button>
                    <button type="button" className="btn btn-ghost" onClick={() => setFase('kies')}>{t.andere_rol}</button>
                  </div>
                  <p className="note">
                    {info.opnieuw ? t.opnieuw_rond + ' ' : ''}
                    {vul(t.gezien, {gezien: info.gezien, totaal: info.totaal})}
                  </p>
                  {isJa(inst.toon_fouten_na_afloop) && fouten.length > 0 && (
                    <details className="examen-fouten">
                      <summary>{t.fouten_kop} ({fouten.length})</summary>
                      <ul>
                        {fouten.map((a) => (
                          <li key={a.vraag.id}>
                            <span>{a.vraag[taal]}</span>
                            <small>
                              {t.juist_antwoord}: <strong>{a.vraag.waar ? t.waar : t.onwaar}</strong>
                              {' · '}{t.jouw_antwoord}: {a.gegeven === null ? t.geen_antwoord : a.gegeven ? t.waar : t.onwaar}
                            </small>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              )}
            </div>

            {(fase === 'kies' || fase === 'klaar') && (
              <div className="examen-voetnoot">
                <p>{t.privacy}</p>
                <p>{t.disclaimer}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
