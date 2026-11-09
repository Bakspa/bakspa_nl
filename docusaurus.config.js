// Configuratie van de Bakspa-site (Docusaurus).
// Teksten staan NIET hier, maar in de map `inhoud/` (homepage, trainingen)
// en in de map `blog/` (artikelen). Zie de readme.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// De site draait op het eigen domein bakspa.nl (zie ook static/CNAME).
const baseUrl = '/';

// Leest alle .yml-bestanden in `inhoud/` en maakt ze beschikbaar voor de homepage.
function inhoudPlugin() {
  const dir = path.join(__dirname, 'inhoud');
  return {
    name: 'bakspa-inhoud',
    getPathsToWatch() {
      return [path.join(dir, '*.yml')];
    },
    async loadContent() {
      const data = {};
      for (const file of fs.readdirSync(dir)) {
        if (file.endsWith('.yml')) {
          data[path.basename(file, '.yml')] = yaml.load(fs.readFileSync(path.join(dir, file), 'utf8'));
        }
      }
      return data;
    },
    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Bakspa',
  tagline: 'SAFe® trainingen in-house en privé',
  favicon: 'img/favicon.svg',

  url: 'https://bakspa.nl',
  baseUrl,
  organizationName: 'Bakspa',
  projectName: 'bakspa_nl',
  // Elke pagina wordt een map met index.html (zoals YottaDots); GitHub Pages vult de / aan.
  trailingSlash: true,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'nl',
    locales: ['nl'],
  },

  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  ],

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          routeBasePath: 'blog',
          blogTitle: 'Blog',
          blogDescription: 'Artikelen over SAFe®-rollen, verantwoordelijkheden en de praktijk van Agile Release Trains.',
          showReadingTime: true,
          blogSidebarCount: 0,
          postsPerPage: 'ALL',
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
          feedOptions: {type: null},
          editUrl: 'https://github.com/Bakspa/bakspa_nl/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {},
      },
    ],
  ],

  plugins: [
    inhoudPlugin,
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Oude adressen (…/blog/artikel.html) sturen door naar de nieuwe.
        fromExtensions: ['html'],
      },
    ],
  ],

  clientModules: [require.resolve('./src/clientModules/raci.js')],

  themeConfig: {
    image: 'img/social-default.png',
    metadata: [
      {name: 'theme-color', content: '#18191b'},
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      logo: {
        alt: 'Bakspa, SAFe Agilisten',
        src: 'img/logo/bakspa-logo-light.png',
        height: 40,
      },
      // Links naast het logo, rechts de aanvraagknop (zoals YottaDots).
      // activeBaseRegex '^$' voorkomt dat de #-links altijd als "actief" oplichten.
      items: [
        {to: '/#trainingen', label: 'Trainingen', position: 'left', activeBaseRegex: '^$'},
        {to: '/#vormen', label: 'In-house & privé', position: 'left', activeBaseRegex: '^$'},
        {to: '/#rollen', label: 'Wat ik doe', position: 'left', activeBaseRegex: '^$'},
        {to: '/blog', label: 'Blog', position: 'left', activeBasePath: 'blog'},
        {to: '/#over', label: 'Over mij', position: 'right', activeBaseRegex: '^$'},
        {to: '/#faq', label: 'Vragen', position: 'right', activeBaseRegex: '^$'},
        {to: '/#contact', label: 'Training aanvragen', position: 'right', className: 'navbar-cta', activeBaseRegex: '^$'},
      ],
    },
    footer: {
      style: 'dark',
      copyright:
        '© ' + new Date().getFullYear() + ' Bakspa · Willem-Peter Perquin<br><span class="footer-tm">SAFe® en Scaled Agile Framework® zijn geregistreerde handelsmerken van Scaled Agile, Inc. Bakspa is geen onderdeel van Scaled Agile, Inc.</span>',
    },
  },
};

module.exports = config;
