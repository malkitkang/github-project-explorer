import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

async function countSearch(q) {
  const res = await fetch(`https://api.github.com/search/issues?q=${q}`);
  const data = await res.json();
  return data.total_count || 0;
}

export default function IssuesPRBar({ owner, repo }) {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    async function load() {
      const openIssues = await countSearch(`repo:${owner}/${repo} type:issue state:open`);
      const closedIssues = await countSearch(`repo:${owner}/${repo} type:issue state:closed`);
      const openPRs = await countSearch(`repo:${owner}/${repo} type:pr state:open`);
      const mergedPRs = await countSearch(`repo:${owner}/${repo} is:pr is:merged`);
      setCounts({ openIssues, closedIssues, openPRs, mergedPRs });
    }
    load();
  }, [owner, repo]);

  if (!counts) return <p>Loading issues/PRs...</p>;

  const data = {
    labels: ["Open Issues", "Closed Issues", "Open PRs", "Merged PRs"],
    datasets: [
      {
        label: "Count",
        data: [
          counts.openIssues,
          counts.closedIssues,
          counts.openPRs,
          counts.mergedPRs
        ],
        backgroundColor: ["#f87171", "#34d399", "#60a5fa", "#a78bfa"]
      }
    ]
  };

  return <Bar data={data} />;
}
