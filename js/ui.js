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