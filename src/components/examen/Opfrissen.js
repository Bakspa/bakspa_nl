import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import {PageMetadata} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import Tekst from '@site/src/components/Tekst';
import {vul, percentage} from './logica';
import {leesTaal, bewaarTaal, leesParam} from './hulp';

// Pagina "Opfrissen of certificeren". Teksten: examen/teksten.yml (onderdeel opfrissen).
// Na het examen komt de bezoeker hier met ?rol=rte&score=26&van=30 (en eventueel &lang=en).

export default function Opfrissen({teksten}) {
  const {home, trainingen} = usePluginData('bakspa-inhoud');
  const [taal, setTaal] = useState('nl');
  const [rol, setRol] = useState('');
  const [score, setScore] = useState(null);

  useEffect(() => {
    setTaal(leesTaal());
    setRol(leesParam('rol'));
    const goed = parseInt(leesParam('score'), 10);
    const van = parseInt(leesParam('van'), 10);
    if (Number.isFinite(goed) && Number.isFinite(van) && van > 0 && goed >= 0 && goed <= van) setScore({goed, van});
  }, []);

  const t = teksten.opfrissen[taal];
  const e = teksten.examen[taal];
  const rolInfo = teksten.rollen.find((r) => r.code === rol);
  const rolNaam = rolInfo ? rolInfo[taal] : '';
  // Alleen een training noemen die echt in het aanbod staat.
  const training = rolInfo && trainingen.some((c) => c.titel === rolInfo.training) ? rolInfo.training : '';
  const scoreTekst = score ? `${score.goed}/${score.van} (${percentage(score.goed, score.van)}%)` : '';

  const onderwerp = vul(t.mail_onderwerp, {rol: rolNaam || 'SAFe®'});
  const body = vul(t.mail_tekst, {rol: rolNaam || 'SAFe®', score: scoreTekst || '-'});
  const mailto = `mailto:${home.contact.email}?subject=${encodeURIComponent(onderwerp)}&body=${encodeURIComponent(body)}`;

  function wisselTaal() {
    const nieuw = taal === 'nl' ? 'en' : 'nl';
    setTaal(nieuw);
    bewaarTaal(nieuw);
  }

  return (
    <Layout title={t.titel} description={t.beschrijving}>
      <Head><html lang={taal} /></Head>
      {/* Preview-afbeelding voor LinkedIn e.d. Bron: illustraties/oefenexamen.html */}
      <PageMetadata image="/img/oefenexamen.png" />
      <main className="bk examen">
        <section className="section">
          <div className="wrap">
            <div className="examen-top">
              <p className="eyebrow">{t.eyebrow}</p>
              <button type="button" className="chip" onClick={wisselTaal} lang={taal === 'nl' ? 'en' : 'nl'}>{e.taal}</button>
            </div>
            <header className="section-head">
              <h1>{t.kop}</h1>
              {scoreTekst && rolNaam && <p className="lead examen-jouw-score">{vul(t.score, {score: scoreTekst, rol: rolNaam})}</p>}
              <p><Tekst>{t.intro}</Tekst></p>
            </header>
            <div className="two-col">
              {t.blokken.map((b) => (
                <article key={b.titel} className="panel">
                  <h3>{b.titel}</h3>
                  <p><Tekst>{b.tekst}</Tekst></p>
                  <ul className="checks">{b.punten.map((p) => <li key={p}><Tekst>{p}</Tekst></li>)}</ul>
                </article>
              ))}
            </div>
            {training && <p className="examen-training"><Tekst>{vul(t.training, {training})}</Tekst></p>}
            <div className="cta-row">
              <a className="btn" href={mailto}>{t.knop}</a>
              <Link className="btn btn-ghost" to="/#trainingen">{t.knop_tweede}</Link>
            </div>
            <p className="note">
              <Link to={`/oefenexamen/${rol ? `?rol=${rol}` : ''}`}>← {t.terug}</Link>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
