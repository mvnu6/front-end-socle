export function creerCarte(pays) {
  const article = document.createElement('article');
  article.classList.add('carte');
  article.dataset.code = pays.code;

  const titre = document.createElement('h3');
  titre.textContent = pays.nom;

  const cap = document.createElement('p');
  cap.textContent = `Capitale : ${pays.capitale}`;

  const reg = document.createElement('p');
  reg.textContent = `Région : ${pays.region}`;

  const pop = document.createElement('p');
  pop.textContent = `Population : ${pays.population.toLocaleString('fr-FR')}`;

  article.append(titre, cap, reg, pop);
  return article;
}

export function annoncerStatut(message) {
  const zoneStatut = document.querySelector('[role="status"]');
  if (zoneStatut) zoneStatut.textContent = message;
}


export function afficherErreur(conteneur, message, callbackReessayer) {
  conteneur.replaceChildren();
  const div = document.createElement('div');
  div.classList.add('erreur-box');

  const p = document.createElement('p');
  p.textContent = message;

  const btn = document.createElement('button');
  btn.textContent = 'Réessayer';
  btn.addEventListener('click', callbackReessayer);

  div.append(p, btn);
  conteneur.append(div);
}