import React, { useState } from "react";
import LanguagePie from "./charts/LanguagePie";
import IssuesPRBar from "./charts/IssuesPRBar";
import CommitsLine from "./charts/CommitsLine";

export default function RepoDetailsModal({ repo, onClose }) {
  const [tab, setTab] = useState("overview");
  if (!repo) return null;

  const owner = repo.owner.login;
  const name = repo.name;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-3/4 max-h-[90vh] overflow-y-auto rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{repo.full_name}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">✖</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-4">
          <button
            className={tab === "overview" ? "font-bold underline" : ""}
            onClick={() => setTab("overview")}
          >
            Overview
          </button>
          <button
            className={tab === "charts" ? "font-bold underline" : ""}
            onClick={() => setTab("charts")}
          >
            Charts
          </button>
        </div>

        {tab === "overview" && (
          <div>
            <p>{repo.description}</p>
            <p className="text-sm text-gray-600">⭐ Stars: {repo.stargazers_count}</p>
            <p className="text-sm text-gray-600">Language: {repo.language}</p>
            <p className="text-sm text-gray-600">
              Last updated: {new Date(repo.updated_at).toLocaleDateString()}
            </p>
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-blue-500 underline">
              View on GitHub
            </a>
          </div>
        )}

        {tab === "charts" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-4 border rounded">
              <h3 className="font-semibold mb-2">Languages</h3>
              <LanguagePie owner={owner} repo={name} />
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-semibold mb-2">Issues & PRs</h3>
              <IssuesPRBar owner={owner} repo={name} />
            </div>
            <div className="p-4 border rounded md:col-span-2">
              <h3 className="font-semibold mb-2">Commits (last 12 weeks)</h3>
              <CommitsLine owner={owner} repo={name} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
