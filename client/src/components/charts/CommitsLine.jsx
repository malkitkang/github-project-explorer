import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export default function CommitsLine({ owner, repo }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`);
        if (res.status === 202) {
          setData(null); // stats not ready yet
          setLoading(false);
          return;
        }
        const json = await res.json();
        const weeks = json.slice(-12); // last 12 weeks
        setData({
          labels: weeks.map(w => new Date(w.week * 1000).toLocaleDateString()),
          datasets: [
            {
              label: "Commits per Week",
              data: weeks.map(w => w.total),
              borderColor: "#60a5fa",
              backgroundColor: "rgba(96,165,250,0.3)",
              fill: true,
              tension: 0.3
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [owner, repo]);

  if (loading) return <p>Loading commits...</p>;
  if (!data) return <p>No commit activity data available</p>;

  return <Line data={data} />;
}
