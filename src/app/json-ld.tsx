'use client';

import config from './config';

const { seo, productionUrl } = config;
const { socials, publisher, bio } = seo;

export default function JsonLdScript() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: publisher.name,
    jobTitle: bio,
    description: seo.description,
    url: productionUrl,
    sameAs: [
      socials.twitter,
      socials.strava,
      socials.github,
      socials.reddit,
      socials.linkedin,
    ].filter(Boolean), // Filter out empty values
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
