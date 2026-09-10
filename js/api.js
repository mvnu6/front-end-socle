function normaliserPays(brut) {
  return {
    code: brut.cca2,
    nom: brut.translations?.fra?.common ?? brut.name.common,
    capitale: brut.capital?.[0] ?? 'Non renseignée',
    region: brut.region ?? 'Inconnue',
    population: brut.population ?? 0
  };
}

let cacheTousLesPays = [];


export async function chercherTousLesPays() {
    if (cacheTousLesPays.length > 0) return cacheTousLesPays;
  const url = `https://restcountries.com/v3.1/all`;

  const reponse = await fetch(url);
  if (!reponse.ok) throw new Error(`Erreur HTTP: ${reponse.status}`);

  const donnees = await reponse.json();
  cacheTousLesPays = donnees.map(normaliserPays);
  return cacheTousLesPays;
}

export async function obtenirPaysEurope() {
  const tous = await chargerTousLesPays();
  return tous.filter(p => p.region === 'Europe');
}


export async function chercherPays(nom) {
  const recherche = nom.trim().toLowerCase();
  if (!recherche) return [];
  
  const tous = await chargerTousLesPays();
  return tous.filter(p => p.nom.toLowerCase().includes(recherche));
}