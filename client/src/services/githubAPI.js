const BASE_URL = "https://api.github.com";

function authHeader() {
  const token = localStorage.getItem("gh_token"); // optional
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function searchRepositories(query, sort = "stars", order = "desc", page = 1) {
  const url = new URL(`${BASE_URL}/search/repositories`);
  url.searchParams.set("q", query);
  url.searchParams.set("sort", sort);
  url.searchParams.set("order", order);
  url.searchParams.set("per_page", "20");
  url.searchParams.set("page", page);

  const res = await fetch(url, { headers: authHeader() });
  if (!res.ok) throw new Error(`GitHub error: ${res.status}`);
  return res.json();
}
