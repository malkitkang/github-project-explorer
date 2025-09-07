import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

export default function LanguagePie({ owner, repo }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${owner}/${repo}/languages`)
      .then(res => res.json())
      .then(json => {
        const labels = Object.keys(json);
        const values = Object.values(json);
        setData({
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: [
                "#f87171", "#60a5fa", "#34d399",
                "#fbbf24", "#a78bfa", "#f472b6"
              ]
            }
          ]
        });
      });
  }, [owner, repo]);

  if (!data) return <p>Loading languages...</p>;

  return <Pie data={data} />;
}
