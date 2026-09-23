const ApiUrl = "https://api.tvmaze.com";
const SELECTION_URL = 'https://jsonplaceholder.typicode.com/posts';



export async function getShow() {
    
  const response = await fetch(`${ApiUrl}/shows`);
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getShowById(id) {
  const response = await fetch(`${ApiUrl}/shows/${id}`);

  if (!response.ok) {
    throw new Error(`Série introuvable ou erreur HTTP: ${response.status}`);
  }

  const data = await response.json();
  return data;

}

export async function searchShows(query) {
  const response = await fetch(`${ApiUrl}/search/shows?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error(`Erreur lors de la recherche: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function sendSelection(payload) {
  const response = await fetch(SELECTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de l'envoi de la sélection: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
