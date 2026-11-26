import React from 'react';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

// Toont alleen de leestijd (geen datum en geen auteur), plus een korte
// verwijzing naar "Over mij", waar staat hoe de artikelen met AI gemaakt worden.
export default function BlogPostItemHeaderInfo() {
  const {metadata} = useBlogPost();
  const minutes = metadata.readingTime ? Math.ceil(metadata.readingTime) : null;
  return (
    <p className="bk-readtime">
      {minutes ? `${minutes} min lezen · ` : ''}
      <Link to="/#over">Gemaakt met hulp van AI</Link>
    </p>
  );
}
