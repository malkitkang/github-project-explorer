const BASE_URL = import.meta.env.VITE_API_URL;

export async function getBookmarks() {
  const res = await fetch(`${BASE_URL}/api/bookmarks`);
  return res.json();
}

export async function addBookmark(bookmark) {
  const res = await fetch(`${BASE_URL}/api/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookmark),
  });
  return res.json();
}

export async function deleteBookmark(id) {
  const res = await fetch(`${BASE_URL}/api/bookmarks/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function updateNote(id, note) {
  const res = await fetch(`${BASE_URL}/api/bookmarks/${id}/note`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note }),
  });
  return res.json();
}
