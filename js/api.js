function normaliserPays(brut) {
  return {
    code: brut.cca2,
    nom: brut.translations?.fra?.common ?? brut.name.common,
    capitale: brut.capital?.[0] ?? 'Non renseignée',
    region: brut.region ?? 'Inconnue',
    population: brut.population ?? 0
  };
}



export async function obtenirPaysEurope() {
    const url = 'https://restcountries.com/v3.1/region/europe?fields=cca2,name,translations,capital,region,population';
  const reponse = await fetch('url');
  if (!reponse.ok)
    { throw new Error(`Erreur HTTP: ${reponse.status}`);
    }
  const donnees = await reponse.json();
  return donnees.map(normaliserPays);
}

export async function chercherPays(nom, signal) {
  const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(nom)}?fields=cca2,name,translations,capital,region,population`;

  const reponse = await fetch(url, { signal });
  if (!reponse.ok) {
    if (reponse.status === 404) return [];
    throw new Error(`Erreur HTTP: ${reponse.status}`);
  }
  const donnees = await reponse.json();
  return donnees.map(normaliserPays);
}