// Plugin voor het oefenexamen.
// Leest de map `examen/` (teksten.yml, basis.yml en een bestand per rol, bijv. rte.yml),
// controleert de vragen en maakt twee pagina's:
//   /oefenexamen/                 het examen zelf
//   /opfrissen-of-certificeren/   de vervolgpagina na het examen
// De vragen worden alleen op de examenpagina geladen, niet op de rest van de site.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function leesYaml(bestand) {
  return yaml.load(fs.readFileSync(bestand, 'utf8'));
}

module.exports = function examenPlugin(context) {
  const dir = path.join(context.siteDir, 'examen');
  return {
    name: 'bakspa-examen',
    getPathsToWatch() {
      return [path.join(dir, '*.yml')];
    },
    async loadContent() {
      const teksten = leesYaml(path.join(dir, 'teksten.yml'));
      const vragen = {};
      const ids = new Set();
      for (const file of fs.readdirSync(dir).sort()) {
        if (!file.endsWith('.yml') || file === 'teksten.yml') continue;
        const code = path.basename(file, '.yml');
        const lijst = leesYaml(path.join(dir, file)) || [];
        if (!Array.isArray(lijst)) throw new Error(`examen/${file}: verwacht een lijst met stellingen`);
        vragen[code] = lijst.map((v, i) => {
          const waar = `examen/${file}, stelling ${i + 1}${v && v.id ? ` (${v.id})` : ''}`;
          if (!v || !v.id) throw new Error(`${waar}: id ontbreekt`);
          if (ids.has(v.id)) throw new Error(`${waar}: id ${v.id} komt dubbel voor`);
          ids.add(v.id);
          if (v.antwoord !== 'waar' && v.antwoord !== 'onwaar') throw new Error(`${waar}: antwoord moet "waar" of "onwaar" zijn`);
          if (!v.nl || !v.en) throw new Error(`${waar}: tekst "nl" of "en" ontbreekt`);
          return {id: String(v.id), waar: v.antwoord === 'waar', nl: String(v.nl), en: String(v.en)};
        });
      }
      return {teksten, vragen};
    },
    async contentLoaded({content, actions}) {
      const {createData, addRoute} = actions;
      const tekstenPad = await createData('examen-teksten.json', JSON.stringify(content.teksten));
      const vragenPad = await createData('examen-vragen.json', JSON.stringify(content.vragen));
      const base = context.baseUrl;
      addRoute({
        path: `${base}oefenexamen/`,
        component: '@site/src/components/examen/Oefenexamen.js',
        modules: {teksten: tekstenPad, vragen: vragenPad},
        exact: true,
      });
      addRoute({
        path: `${base}opfrissen-of-certificeren/`,
        component: '@site/src/components/examen/Opfrissen.js',
        modules: {teksten: tekstenPad},
        exact: true,
      });
    },
  };
};
