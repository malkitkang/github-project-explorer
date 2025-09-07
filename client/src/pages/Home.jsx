import React, { useState, useEffect } from "react";
import { searchRepositories } from "../services/githubAPI";
import RepoCard from "../components/RepoCard";
import BookmarksDrawer from "../components/BookmarksDrawer";

export default function Home() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("react");
  const [language, setLanguage] = useState("");
  const [sort, setSort] = useState("stars");
  const [error, setError] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchRepos();
  }, [q, language, sort]);

  async function fetchRepos() {
    setLoading(true);
    setError("");
    try {
      let query = q ? q : "stars:>1000";
      if (language) query += ` language:${language}`;
      const data = await searchRepositories(query, sort);
      setRepos(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🔍 GitHub Project Explorer</h1>
        <button
          className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500"
          onClick={() => setDrawerOpen(true)}
        >
          ⭐ Bookmarks
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search repositories..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border rounded px-3 py-2">
          <option value="">All Languages</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="Go">Go</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded px-3 py-2">
          <option value="stars">Sort: Stars</option>
          <option value="updated">Sort: Updated</option>
        </select>
        <button
          onClick={fetchRepos}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Repo List */}
      {loading && <p>Loading repositories...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      {/* Bookmarks Drawer */}
      <BookmarksDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
