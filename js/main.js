import { PAYS_DATA } from './data.js';
import { creerCarte } from './ui.js';

const conteneurGrille = document.querySelector('.results-grid') || document.querySelector('section:last-of-type');

function afficherPays(liste) {
  const fragment = document.createDocumentFragment();
  liste.forEach(p => fragment.append(creerCarte(p)));
  conteneurGrille.replaceChildren(fragment);
}


afficherPays(PAYS_DATA);