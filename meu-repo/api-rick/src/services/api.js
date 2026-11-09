const BASE = "https://rickandmortyapi.com/api";

export async function request(url, signal) {
  let response;
  try {
    response = await fetch(url, { signal });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new Error("Não foi possível conectar à API. Verifique sua conexão.");
  }
  if (!response.ok) {
    const error = new Error(response.status === 404 ? "Nenhum resultado encontrado." : `Erro na API (${response.status}).`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export function charactersUrl(name) {
  return `${BASE}/character/?name=${encodeURIComponent(name)}`;
}

export async function getMany(type, urls, signal) {
  const ids = [...new Set(urls.map((url) => url.split("/").pop()).filter((id) => /^\d+$/.test(id)))];
  const results = [];
  for (let i = 0; i < ids.length; i += 40) {
    const data = await request(`${BASE}/${type}/${ids.slice(i, i + 40).join(",")}`, signal);
    results.push(...(Array.isArray(data) ? data : [data]));
  }
  return results;
}
