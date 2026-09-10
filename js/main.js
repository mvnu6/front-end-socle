import { PAYS_DATA } from './data.js';
import { creerCarte } from './ui.js';

const conteneurGrille = document.querySelector('.results-grid');
const filtreRegion = document.getElementById('filtre-region');

function afficherPays(liste) {
  const fragment = document.createDocumentFragment();
  liste.forEach(p => fragment.append(creerCarte(p)));
  conteneurGrille.replaceChildren(fragment);
}


filtreRegion.addEventListener('change', (e) => {
  const region = e.target.value;
  if (region === 'toutes') {
    afficherPays(PAYS_DATA);
  } else {
    const paysFiltres = PAYS_DATA.filter(p => p.region === region);
    afficherPays(paysFiltres);
  }
});

conteneurGrille.addEventListener('click', (e) => {
  const carte = e.target.closest('.carte');
  if (!carte) return;

  const codePays = carte.dataset.code;
  const paysSelectionne = PAYS_DATA.find(p => p.code === codePays);

  if (paysSelectionne) {
    alert(`Détails de ${paysSelectionne.nom}\nCapitale: ${paysSelectionne.capitale}\nPopulation: ${paysSelectionne.population.toLocaleString('fr-FR')}`);
  }
});

afficherPays(PAYS_DATA);