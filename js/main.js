import { PAYS_DATA } from './data.js';
import { creerCarte } from './ui.js';

const conteneurGrille = document.querySelector('.results-grid') || document.querySelector('section:last-of-type');

function afficherPays(liste) {
  const fragment = document.createDocumentFragment();
  liste.forEach(p => fragment.append(creerCarte(p)));
  conteneurGrille.replaceChildren(fragment);
}

const filtreRegion = document.getElementById('filtre-region');

filtreRegion.addEventListener('change', (e) => {
  const region = e.target.value;
  if (region === 'toutes') {
    afficherPays(PAYS_DATA);
  } else {
    const paysFiltres = PAYS_DATA.filter(p => p.region === region);
    afficherPays(paysFiltres);
  }
});

afficherPays(PAYS_DATA);