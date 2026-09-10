import { obtenirPaysEurope, chercherPays } from './api.js';
import { creerCarte, annoncerStatut, afficherErreur } from './ui.js';

const conteneurGrille = document.querySelector('.results-grid');
const filtreRegion = document.getElementById('filtre-region');
const champRecherche = document.getElementById('recherche');
const formulaire = document.querySelector('form');
formulaire.addEventListener('submit', (e) => e.preventDefault());

let minuteur;
let controleur;


function afficherListe(liste) {
  if (liste.length === 0) {
    conteneurGrille.replaceChildren();
    annoncerStatut('Aucun pays trouvé.');
    const p = document.createElement('p');
    p.textContent = 'Aucun résultat ne correspond à votre recherche.';
    conteneurGrille.append(p);
    return;
  }

  const fragment = document.createDocumentFragment();
  liste.forEach(p => fragment.append(creerCarte(p)));
  conteneurGrille.replaceChildren(fragment);
  annoncerStatut(`${liste.length} pays trouvé(s).`);
}

async function chargerEurope() {
  annoncerStatut('Chargement des pays d\'Europe...');
  try {
    const pays = await obtenirPaysEurope();
    afficherListe(pays);
  } catch (err) {
    annoncerStatut('Erreur lors du chargement.');
    afficherErreur(
      conteneurGrille,
      'Impossible de charger les données. Vérifiez votre connexion.',
      chargerEurope
    );
  }
}

champRecherche.addEventListener('input', () => {
  clearTimeout(minuteur);
  const recherche = champRecherche.value.trim();

  if (recherche === '') {
    chargerEurope();
    return;
  }

  minuteur = setTimeout(async () => {
    controleur?.abort();
    controleur = new AbortController();

    annoncerStatut('Recherche en cours...');
    try {
      const resultats = await chercherPays(recherche);
      afficherListe(resultats);
    } catch (err) {
      if (err.name !== 'AbortError') {
        annoncerStatut('Erreur lors de la recherche.');
        afficherErreur(
          conteneurGrille,
          'Une erreur est survenue lors de la recherche.',
          () => champRecherche.dispatchEvent(new Event('input'))
        );
      }
    }
  }, 300);
});


conteneurGrille.addEventListener('click', (e) => {
  const carte = e.target.closest('.carte');
  if (!carte) return;
  
  const nomPays = carte.querySelector('h3')?.textContent;
  if (nomPays) {
    annoncerStatut(`Carte de ${nomPays} sélectionnée.`);
  }
});




// function afficherPays(liste) {
//   const fragment = document.createDocumentFragment();
//   liste.forEach(p => fragment.append(creerCarte(p)));
//   conteneurGrille.replaceChildren(fragment);
// }


// filtreRegion.addEventListener('change', (e) => {
//   const region = e.target.value;
//   if (region === 'toutes') {
//     afficherPays(PAYS_DATA);
//   } else {
//     const paysFiltres = PAYS_DATA.filter(p => p.region === region);
//     afficherPays(paysFiltres);
//   }
// });

// conteneurGrille.addEventListener('click', (e) => {
//   const carte = e.target.closest('.carte');
//   if (!carte) return;

//   const codePays = carte.dataset.code;
//   const paysSelectionne = PAYS_DATA.find(p => p.code === codePays);

//   if (paysSelectionne) {
//     alert(`Détails de ${paysSelectionne.nom}\nCapitale: ${paysSelectionne.capitale}\nPopulation: ${paysSelectionne.population.toLocaleString('fr-FR')}`);
//   }
// });

chargerEurope();