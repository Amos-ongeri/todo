

import { useEffect, useState } from "react";
import axios from "axios";
import Background from "../../Components/backgroundComponent/Background";
import './analytics.css';
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

function Analytics({ background }) {
  const [analytics, setAnalytics] = useState({ completedCount: 0, currentCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/analytics")
      .then(res => {
        setAnalytics(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch analytics");
        setLoading(false);
      });
  }, []);

  const totalTasks = analytics.completedCount + analytics.currentCount;

  return (
    <>
      <div id="layout1">
        <div className="analytics-dashboard">
          <h2 className="analytics-title">Analytics</h2>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="analytics-summary">
              <div className="analytics-card">Total Tasks: {totalTasks}</div>
              <div className="analytics-card">Completed: {analytics.completedCount}</div>
              <div className="analytics-card">Pending: {analytics.currentCount}</div>
            </div>
          )}
          <div className="analytics-charts">
            {/* Doughnut chart for completed vs pending tasks */}
            {!loading && !error && (
              <Doughnut
                data={{
                  labels: ["Completed", "Pending"],
                  datasets: [
                    {
                      data: [analytics.completedCount, analytics.currentCount],
                      backgroundColor: ["#4f8cff", "#f3a683"],
                      borderColor: ["#2d6cdf", "#e17055"],
                      borderWidth: 2,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        font: { size: 16 },
                        color: "#333",
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.label || "";
                          const value = context.parsed;
                          return `${label}: ${value}`;
                        },
                      },
                    },
                  },
                }}
                style={{ maxWidth: 350, margin: "0 auto" }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;