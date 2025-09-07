const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getBookmarks() {
  const res = await fetch(`${API_URL}/api/bookmarks`);
  if (!res.ok) throw new Error("Failed to fetch bookmarks");
  return res.json();
}

export async function saveBookmark(repo) {
  // map GitHub repo fields to our backend shape
  const payload = {
    repoId: repo.id,
    fullName: repo.full_name,
    name: repo.name,
    ownerLogin: repo.owner?.login,
    htmlUrl: repo.html_url,
    description: repo.description,
    stars: repo.stargazers_count,
    language: repo.language,
    topics: repo.topics || []
  };
  const res = await fetch(`${API_URL}/api/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to save bookmark");
  return res.json();
}

export async function deleteBookmark(id) {
  const res = await fetch(`${API_URL}/api/bookmarks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete bookmark");
  return res.json();
}

export async function updateNote(id, note) {
  const res = await fetch(`${API_URL}/api/bookmarks/${id}/note`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note })
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}
