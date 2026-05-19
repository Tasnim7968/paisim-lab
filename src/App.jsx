import { useMemo, useState } from "react";
import { Upload, Brain, BarChart3, FileText, Sparkles, Database } from "lucide-react";
import Papa from "papaparse";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./App.css";

const starterExperiments = [
  {
    id: 1,
    config: "Sales + Reviews",
    sources: "Sales data, review corpus",
    weighting: "Sales 60%, Reviews 40%",
    accuracy: 81,
    mae: 0.19,
    confidence: 87,
    notes: "Strong at predicting purchase intent.",
  },
  {
    id: 2,
    config: "Survey Heavy",
    sources: "Survey data, interviews",
    weighting: "Surveys 70%, Interviews 30%",
    accuracy: 74,
    mae: 0.26,
    confidence: 79,
    notes: "Better qualitative signal, weaker prediction.",
  },
  {
    id: 3,
    config: "Balanced Multi-Source",
    sources: "Sales, reviews, surveys, interviews",
    weighting: "Equal weighted blend",
    accuracy: 88,
    mae: 0.14,
    confidence: 91,
    notes: "Best overall validation performance.",
  },
];

function App() {
  const [experiments, setExperiments] = useState(starterExperiments);
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);

  const bestExperiment = useMemo(() => {
    return [...experiments].sort((a, b) => b.accuracy - a.accuracy)[0];
  }, [experiments]);

  const avgAccuracy = useMemo(() => {
    return Math.round(
      experiments.reduce((sum, item) => sum + Number(item.accuracy), 0) /
        experiments.length
    );
  }, [experiments]);

  function handleCsvUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const cleaned = results.data.map((row, index) => ({
          id: index + 1,
          config: row.config || `Config ${index + 1}`,
          sources: row.sources || "Unknown",
          weighting: row.weighting || "Not specified",
          accuracy: Number(row.accuracy || 0),
          mae: Number(row.mae || 0),
          confidence: Number(row.confidence || 0),
          notes: row.notes || "No notes added.",
        }));

        setExperiments(cleaned);
      },
    });
  }

  async function generateMemo() {
    setLoading(true);
    setMemo("");

    try {
      const response = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ experiments }),
      });

      const data = await response.json();
      setMemo(data.memo || data.error);
    } catch {
      setMemo("Could not connect to the AI server. Make sure npm run dev is running.");
    }

    setLoading(false);
  }

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="eyebrow">Customer Simulation Intelligence</p>
          <h1>PaiSim Lab</h1>
          <p className="heroText">
            A polished experiment dashboard for testing data source combinations,
            benchmarking simulation accuracy, and generating AI-powered
            recommendation memos for product teams.
          </p>

          <div className="heroActions">
            <label className="uploadBtn">
              <Upload size={18} />
              Upload CSV
              <input type="file" accept=".csv" onChange={handleCsvUpload} />
            </label>

            <button onClick={generateMemo} className="aiBtn">
              <Sparkles size={18} />
              {loading ? "Generating..." : "Generate AI Memo"}
            </button>
          </div>
        </div>

        <div className="heroCard">
          <Brain size={40} />
          <p className="cardLabel">Best Configuration</p>
          <h2>{bestExperiment.config}</h2>
          <p>{bestExperiment.accuracy}% validation accuracy</p>
        </div>
      </section>

      <section className="statsGrid">
        <div className="statCard">
          <Database />
          <p>Experiments Tested</p>
          <h2>{experiments.length}</h2>
        </div>

        <div className="statCard">
          <BarChart3 />
          <p>Average Accuracy</p>
          <h2>{avgAccuracy}%</h2>
        </div>

        <div className="statCard">
          <FileText />
          <p>Lowest Error</p>
          <h2>{Math.min(...experiments.map((e) => e.mae))}</h2>
        </div>
      </section>

      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Benchmark Results</p>
            <h2>Simulation Accuracy by Configuration</h2>
          </div>
        </div>

        <div className="chartBox">
          <ResponsiveContainer width="100%" height={310}>
            <BarChart data={experiments}>
              <XAxis dataKey="config" tick={{ fill: "#6d28d9", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6d28d9", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid #ddd6fe",
                  borderRadius: "14px",
                  color: "#3b0764",
                }}
              />
              <Bar dataKey="accuracy" fill="#8b5cf6" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Experimental Record</p>
            <h2>Configurations Tested</h2>
          </div>
        </div>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Configuration</th>
                <th>Sources</th>
                <th>Weighting</th>
                <th>Accuracy</th>
                <th>MAE</th>
                <th>Confidence</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {experiments.map((item) => (
                <tr key={item.id}>
                  <td>{item.config}</td>
                  <td>{item.sources}</td>
                  <td>{item.weighting}</td>
                  <td>{item.accuracy}%</td>
                  <td>{item.mae}</td>
                  <td>{item.confidence}%</td>
                  <td>{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {memo && (
        <section className="memo">
          <p className="eyebrow">AI Recommendation Memo</p>
          <h2>Founding Team Summary</h2>
          <pre>{memo}</pre>
        </section>
      )}
    </main>
  );
}

export default App;