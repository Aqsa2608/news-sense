import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Home() {
  const [article, setArticle] = useState("");

  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState("");

  const navigate = useNavigate();

  // ================= ANALYZE ARTICLE =================

  const analyzeArticle = () => {
    if (!article.trim()) {
      alert("Please enter a news article first.");
      return;
    }

    navigate("/loading", {
      state: {
        article: article
      }
    });
  };

  // ================= SUMMARIZE ARTICLE =================

  const summarizeArticle = async () => {
    if (!article.trim()) {
      alert("Please enter a news article first.");
      return;
    }

    setLoadingSummary(true);
    setSummary("");
    setSummaryError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/summarize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            article: article
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to summarize article");
      }

      setSummary(data.summary);
    } catch (error) {
      console.error("Summary Error:", error);
      setSummaryError(
        "Unable to summarize the article. Please try again."
      );
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div className="app">

      <Header />

      <main className="home-container">

        <section className="hero-section">

          <h1>Enter News Article</h1>

          <p className="subtitle">
            Paste or type a news article below. We will classify
            its category, recommend similar articles, and summarize it.
          </p>

          <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            placeholder="Paste or type your news article here..."
          />

          {/* ================= BUTTONS ================= */}

          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              marginTop: "20px",
              flexWrap: "wrap"
            }}
          >

            <button
              className="primary-button"
              onClick={analyzeArticle}
            >
              Analyze Article
            </button>

            <button
              className="primary-button"
              onClick={summarizeArticle}
              disabled={loadingSummary}
              style={{
                opacity: loadingSummary ? 0.7 : 1,
                cursor: loadingSummary
                  ? "not-allowed"
                  : "pointer"
              }}
            >
              {loadingSummary
                ? "Summarizing..."
                : "Summarize Article"}
            </button>

          </div>

          {/* ================= SUMMARY ================= */}

          {summaryError && (
            <div
              style={{
                marginTop: "25px",
                padding: "15px",
                background: "#fee2e2",
                color: "#b91c1c",
                borderRadius: "10px",
                textAlign: "left"
              }}
            >
              {summaryError}
            </div>
          )}

          {summary && (
            <div
              style={{
                marginTop: "30px",
                padding: "25px",
                background: "#ffffff",
                border: "1px solid #e1e5eb",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                textAlign: "left"
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: "15px",
                  color: "#111827"
                }}
              >
                Article Summary
              </h2>

              <p
                style={{
                  color: "#55708f",
                  fontSize: "16px",
                  lineHeight: "1.7",
                  margin: 0
                }}
              >
                {summary}
              </p>
            </div>
          )}

        </section>

        {/* ================= FEATURES ================= */}

        <section className="features-section">

          <h2>Analyze your article to discover:</h2>

          <div className="feature-list">

            <p>✓ Predicts News Category</p>
            <p>✓ Shows Confidence Score</p>
            <p>✓ Recommends Similar Articles</p>
            <p>✓ Summarizes News Articles</p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Home;