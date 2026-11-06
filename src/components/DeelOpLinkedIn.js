import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';

// Gebruik in een blog: <DeelOpLinkedIn tekst="Herkenbaar?" />
export default function DeelOpLinkedIn({tekst = 'Nuttig?'}) {
  const {siteConfig} = useDocusaurusContext();
  const {pathname} = useLocation();
  const url = encodeURIComponent(siteConfig.url + pathname);
  return (
    <p className="share">
      {tekst}{' '}
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noopener noreferrer">
        Deel op LinkedIn →
      </a>
    </p>
  );
}
