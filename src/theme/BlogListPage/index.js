import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

// Blogoverzicht als kaarten: drie naast elkaar, op mobiel onder elkaar.
// De kaart gebruikt per artikel: title, description en image uit de
// gegevens bovenaan het .md-bestand.

function Kaart({post}) {
  const {metadata, frontMatter, assets} = post;
  const viaBaseUrl = useBaseUrl(frontMatter.image || 'img/social-default.png');
  const afbeelding = assets?.image || viaBaseUrl;
  const minuten = metadata.readingTime ? Math.ceil(metadata.readingTime) : null;
  return (
    <Link className="post-card" to={metadata.permalink}>
      <img src={afbeelding} alt="" width="1200" height="627" loading="lazy" />
      <div className="post-card-body">
        {minuten && <p className="post-meta">{minuten} min lezen</p>}
        <h2>{metadata.title}</h2>
        <p>{metadata.description}</p>
      </div>
    </Link>
  );
}

export default function BlogListPage({metadata, items}) {
  return (
    <Layout title={metadata.blogTitle} description={metadata.blogDescription}>
      <main className="bk section blog-overzicht">
        <div className="wrap">
          <header className="section-head">
            <p className="eyebrow">Blog</p>
            <h1>Uit de praktijk</h1>
            <p>{metadata.blogDescription}</p>
          </header>
          <div className="post-grid">
            {items.map(({content}) => (
              <Kaart key={content.metadata.permalink} post={content} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
