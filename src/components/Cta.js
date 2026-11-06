import React from 'react';
import Link from '@docusaurus/Link';

// Gebruik in een blog:
// <Cta titel="Deze rollen leren invullen?">
// Tekst van het blok.
// </Cta>
export default function Cta({titel, children}) {
  return (
    <aside className="post-cta">
      <h2>{titel}</h2>
      <div>{children}</div>
      <div className="cta-row">
        <Link className="btn" to="/#contact">Vraag een training aan</Link>
        <Link className="btn btn-ghost" to="/#trainingen">Bekijk het aanbod</Link>
      </div>
    </aside>
  );
}
