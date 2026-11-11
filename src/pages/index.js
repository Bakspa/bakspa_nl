import React, {useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {usePluginData} from '@docusaurus/useGlobalData';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Tekst from '@site/src/components/Tekst';

// De opbouw van de homepage. Alle teksten staan in inhoud/home.yml
// en het trainingsaanbod in inhoud/trainingen.yml.

const LABELS = {leiders: 'Leiders', teams: 'Teams', rollen: 'Rol', portfolio: 'Portfolio', techniek: 'Techniek', micro: 'Micro-credential'};
const FILTERS = [
  ['all', 'Alles'], ['ai', 'AI-Empowered'], ['leiders', 'Leiders & management'], ['teams', 'Teams'],
  ['rollen', 'Specifieke rollen'], ['portfolio', 'Portfolio & product'], ['techniek', 'Techniek'], ['micro', 'Micro-credentials'],
];
const isJa = (v) => v === true || v === 'ja' || v === 'Ja';

function Kop({eyebrow, titel, intro, as: H = 'h2'}) {
  return (
    <header className="section-head">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H><Tekst>{titel}</Tekst></H>
      {intro && <p><Tekst>{intro}</Tekst></p>}
    </header>
  );
}

function Hero({h}) {
  return (
    <section className="bk-hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">{h.eyebrow}</p>
          <h1><Tekst>{h.titel}</Tekst></h1>
          <p className="lead"><Tekst>{h.intro}</Tekst></p>
          <div className="cta-row">
            <Link className="btn" to="#contact">{h.knop}</Link>
            <Link className="btn btn-ghost" to="#trainingen">{h.knop_tweede}</Link>
          </div>
          <ul className="badges" aria-label="Rollen">
            {(h.rollen || []).map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
        <figure className="hero-art" aria-hidden="true">
          <svg viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#303236" strokeWidth="2" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="#3a3c40" strokeWidth="2" strokeDasharray="4 10" />
            <circle cx="200" cy="200" r="100" fill="rgba(242,140,40,0.09)" />
            <g className="dots">
              <circle cx="200" cy="20" r="14" fill="#f28c28" />
              <circle cx="356" cy="110" r="10" fill="#9b9b9b" />
              <circle cx="356" cy="290" r="14" fill="#f5a14f" />
              <circle cx="200" cy="380" r="10" fill="#9b9b9b" />
              <circle cx="44" cy="290" r="14" fill="#f28c28" />
              <circle cx="44" cy="110" r="10" fill="#9b9b9b" />
            </g>
            <circle cx="200" cy="200" r="64" fill="#f28c28" />
            <text x="200" y="198" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="24" fill="#18191b" fontWeight="700">PI</text>
            <text x="200" y="220" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#18191b" fontWeight="600">Planning</text>
          </svg>
        </figure>
      </div>
    </section>
  );
}

function Trainingen({t, lijst, onKies}) {
  const [filter, setFilter] = useState('all');
  const zichtbaar = lijst.filter((c) => filter === 'all' || (filter === 'ai' ? isJa(c.ai) : c.categorie === filter));
  return (
    <section id="trainingen" className="section">
      <div className="wrap">
        <Kop {...t} />
        <div className="filters" role="group" aria-label="Filter trainingen">
          {FILTERS.map(([k, label]) => (
            <button key={k} type="button" className={'chip' + (filter === k ? ' is-active' : '')} onClick={() => setFilter(k)}>{label}</button>
          ))}
        </div>
        <div className="course-grid" aria-live="polite">
          {zichtbaar.map((c) => (
            <article key={c.titel} className={'course' + (isJa(c.ai) ? ' is-ai' : '')}>
              <div className="course-top">
                <span className="tags">
                  <span className="tag">{LABELS[c.categorie] || c.categorie}</span>
                  {isJa(c.ai) && <span className="tag tag-ai">AI</span>}
                  {isJa(c.nieuw) && <span className="tag tag-new">Nieuw</span>}
                </span>
                <span className="days">{c.dagen ? `${c.dagen} dagen` : 'Korte sessie'}</span>
              </div>
              <h3>{c.titel}</h3>
              <p className="course-text">{c.tekst}</p>
              <p className="cert">{c.categorie === 'micro' ? c.certificering : `Certificering: ${c.certificering}`}</p>
              <Link className="link" to="#contact" onClick={() => onKies(c.titel)}>Aanvragen →</Link>
            </article>
          ))}
        </div>
        {t.noot && <p className="note"><Tekst>{t.noot}</Tekst></p>}
      </div>
    </section>
  );
}

function Vormen({v}) {
  return (
    <section id="vormen" className="section section-alt">
      <div className="wrap">
        <Kop {...v} />
        <div className="two-col">
          {v.blokken.map((b) => (
            <article key={b.titel} className="panel">
              <h3>{b.titel}</h3>
              <p><Tekst>{b.tekst}</Tekst></p>
              <ul className="checks">{b.punten.map((p) => <li key={p}><Tekst>{p}</Tekst></li>)}</ul>
            </article>
          ))}
        </div>
        <ol className="steps">
          {v.stappen.map((s) => <li key={s.titel}><strong>{s.titel}</strong><span><Tekst>{s.tekst}</Tekst></span></li>)}
        </ol>
      </div>
    </section>
  );
}

function Rollen({r}) {
  return (
    <section id="rollen" className="section">
      <div className="wrap">
        <Kop {...r} />
        <div className="role-grid">
          {r.blokken.map((b) => (
            <article key={b.titel} className="role">
              <span className="role-icon" aria-hidden="true">{b.icoon}</span>
              <h3>{b.titel}</h3>
              <p><Tekst>{b.tekst}</Tekst></p>
              {b.link && <Link className="link" to={b.link}>{b.link_tekst}</Link>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Over({o}) {
  return (
    <section id="over" className="section section-dark">
      <div className="wrap over-grid">
        <img className="portrait" src={useBaseUrl(o.foto)} alt={o.foto_tekst} width="180" height="180" />
        <div>
          <p className="eyebrow">{o.eyebrow}</p>
          <h2>{o.titel}</h2>
          {o.alineas.map((a, i) => <p key={i}><Tekst>{a}</Tekst></p>)}
        </div>
        <ul className="facts">
          {o.feiten.map((f) => <li key={f.titel}><strong>{f.titel}</strong><span>{f.tekst}</span></li>)}
        </ul>
      </div>
    </section>
  );
}

function BlogKaart({b}) {
  return (
    <Link className="post-card" to={b.link}>
      <img src={useBaseUrl(b.afbeelding)} alt="" width="1200" height="627" loading="lazy" />
      <div className="post-card-body">
        <p className="post-meta">{b.categorie}</p>
        <h3>{b.titel}</h3>
        <p>{b.tekst}</p>
      </div>
    </Link>
  );
}

function Blog({b, linkedin}) {
  return (
    <section id="blog" className="section section-alt">
      <div className="wrap">
        <Kop {...b} />
        <div className="post-grid">{b.uitgelicht.map((p) => <BlogKaart key={p.link} b={p} />)}</div>
        <p className="note"><Link to="/blog">Alle artikelen</Link> · <a href={linkedin} rel="noopener noreferrer">Volg mij op LinkedIn</a></p>
      </div>
    </section>
  );
}

function Faq({f}) {
  return (
    <section id="faq" className="section faq">
      <div className="wrap narrow">
        <Kop {...f} />
        {f.vragen.map((q) => (
          <details key={q.vraag}>
            <summary>{q.vraag}</summary>
            <p><Tekst>{q.antwoord}</Tekst></p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Contact({c, trainingen, gekozen, setGekozen}) {
  function verstuur(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const subject = 'Aanvraag ' + (d.get('vorm') || '') + (d.get('training') ? ': ' + d.get('training') : '');
    const body = [
      'Naam: ' + d.get('naam'), 'Organisatie: ' + d.get('organisatie'), 'E-mail: ' + d.get('email'),
      'Training: ' + (d.get('training') || 'nog niet zeker'), 'Vorm: ' + d.get('vorm'),
      'Aantal deelnemers: ' + d.get('aantal'), '', d.get('bericht'),
    ].join('\n');
    window.location.href = `mailto:${c.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return (
    <section id="contact" className="section section-alt">
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2>{c.titel}</h2>
          <p><Tekst>{c.intro}</Tekst></p>
          <p className="contact-line"><a href={`mailto:${c.email}`}>{c.email}</a></p>
          <p className="contact-line"><a href={c.linkedin} rel="noopener noreferrer">LinkedIn</a></p>
        </div>
        <form className="form" noValidate onSubmit={verstuur}>
          <label>Naam<input name="naam" required autoComplete="name" /></label>
          <label>Organisatie<input name="organisatie" autoComplete="organization" /></label>
          <label>E-mail<input name="email" type="email" required autoComplete="email" /></label>
          <div className="form-row">
            <label>Training
              <select name="training" value={gekozen} onChange={(e) => setGekozen(e.target.value)}>
                <option value="">Nog niet zeker</option>
                {trainingen.map((t) => <option key={t.titel}>{t.titel}</option>)}
              </select>
            </label>
            <label>Vorm<select name="vorm">{c.vormen.map((v) => <option key={v}>{v}</option>)}</select></label>
          </div>
          <label>Aantal deelnemers<input name="aantal" type="number" min="1" inputMode="numeric" /></label>
          <label>Toelichting<textarea name="bericht" rows="4" /></label>
          <button className="btn" type="submit">Verstuur via e-mail</button>
          <p className="form-hint">Dit opent je e-mailprogramma met een vooraf ingevuld bericht.</p>
        </form>
      </div>
    </section>
  );
}

const ANKERS = ['top', 'trainingen', 'vormen', 'rollen', 'over', 'blog', 'faq', 'contact'];

export default function Home() {
  const {home, trainingen} = usePluginData('bakspa-inhoud');
  const brokenLinks = useBrokenLinks();
  ANKERS.forEach((a) => brokenLinks.collectAnchor(a));
  const [gekozen, setGekozen] = useState('');
  return (
    <Layout
      title="SAFe® trainingen in-house en privé"
      description="Gecertificeerde SAFe® trainingen op maat, in-house of privé, gegeven door een Advanced SAFe® Practice Consultant. Plus SAFe® consultancy als jullie implementatie maar half loopt.">
      <main className="bk">
        <Hero h={home.hero} />
        <section className="usp">
          <div className="wrap usp-grid">
            {home.usp.map((u) => <div key={u.titel}><strong>{u.titel}</strong><span><Tekst>{u.tekst}</Tekst></span></div>)}
          </div>
        </section>
        <Trainingen t={home.trainingen} lijst={trainingen} onKies={setGekozen} />
        <Vormen v={home.vormen} />
        <Rollen r={home.rollen} />
        <Over o={home.over} />
        <Blog b={home.blog} linkedin={home.contact.linkedin} />
        <Faq f={home.faq} />
        <Contact c={home.contact} trainingen={trainingen} gekozen={gekozen} setGekozen={setGekozen} />
      </main>
    </Layout>
  );
}
