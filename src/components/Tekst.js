import React from 'react';
import Link from '@docusaurus/Link';

// Zet een korte tekst uit de YAML-bestanden om naar opmaak.
// Ondersteunt **vet**, *cursief* en [link](adres).
const PATROON = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

export default function Tekst({children}) {
  if (typeof children !== 'string') return children ?? null;
  return children.split(PATROON).map((stuk, i) => {
    if (/^\*\*[^*]+\*\*$/.test(stuk)) return <strong key={i}>{stuk.slice(2, -2)}</strong>;
    if (/^\*[^*]+\*$/.test(stuk)) return <em key={i}>{stuk.slice(1, -1)}</em>;
    const link = stuk.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, tekst, adres] = link;
      return /^https?:|^mailto:/.test(adres)
        ? <a key={i} href={adres} rel="noopener noreferrer">{tekst}</a>
        : <Link key={i} to={adres}>{tekst}</Link>;
    }
    return <React.Fragment key={i}>{stuk}</React.Fragment>;
  });
}
