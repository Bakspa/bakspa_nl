import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

// Toont alleen de leestijd: geen datum en geen auteur.
export default function BlogPostItemHeaderInfo() {
  const {metadata} = useBlogPost();
  const minutes = metadata.readingTime ? Math.ceil(metadata.readingTime) : null;
  if (!minutes) return null;
  return <p className="bk-readtime">{minutes} min lezen</p>;
}
