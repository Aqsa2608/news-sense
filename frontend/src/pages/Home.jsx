import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Home() {
  const [article, setArticle] = useState("");

  const navigate = useNavigate();

  const characterCount = article.trim().length;
  const isValid = characterCount >= 150;

  // ==========================================
  // ANALYZE ARTICLE
  // ==========================================

  const analyzeArticle = () => {
    if (!article.trim()) {
      alert("Please enter a news article first.");
      return;
    }

    if (characterCount < 150) {
      alert("Please enter at least 150 characters.");
      return;
    }

    navigate("/loading", {
      state: {
        article: article
      }
    });
  };

  // ==========================================
  // SUMMARIZE ARTICLE
  // ==========================================

  const summarizeArticle = () => {
    if (!article.trim()) {
      alert("Please enter a news article first.");
      return;
    }

    if (characterCount < 150) {
      alert("Please enter at least 150 characters.");
      return;
    }

    navigate("/summary", {
      state: {
        article: article
      }
    });
  };

  return (
    <div className="app">

      <Header />

      <main className="home-container">

        {/* ==========================================
            HERO SECTION
        ========================================== */}

        <section className="hero-section">

          <h1>Enter News Article</h1>

          <p className="subtitle">
            Paste or type a news article below. We will classify
            its category and recommend similar articles.
          </p>

          {/* ==========================================
              ARTICLE TEXTAREA
          ========================================== */}

          <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            placeholder="Paste or type your news article here..."
          />

          {/* ==========================================
              CHARACTER COUNT
          ========================================== */}

          <p
            style={{
              textAlign: "right",
              fontSize: "14px",
              marginTop: "8px",
              marginBottom: "15px",
              color: isValid ? "#16a34a" : "#dc2626"
            }}
          >
            {characterCount} characters
          </p>

          {/* ==========================================
              MESSAGE
          ========================================== */}

          {characterCount > 0 && characterCount < 150 && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "14px",
                textAlign: "center",
                marginBottom: "15px"
              }}
            >
              Please enter at least 150 characters.
            </p>
          )}

          {characterCount >= 150 && characterCount <= 200 && (
            <p
              style={{
                color: "#16a34a",
                fontSize: "14px",
                textAlign: "center",
                marginBottom: "15px"
              }}
            >
              ✓ Article length is sufficient.
            </p>
          )}

          {characterCount > 200 && (
            <p
              style={{
                color: "#55708f",
                fontSize: "14px",
                textAlign: "center",
                marginBottom: "15px"
              }}
            >
            </p>
          )}

          {/* ==========================================
              ANALYZE BUTTON
          ========================================== */}

          <button
            className="primary-button"
            onClick={analyzeArticle}
            disabled={!isValid}
            style={{
              opacity: isValid ? 1 : 0.6,
              cursor: isValid ? "pointer" : "not-allowed"
            }}
          >
            Analyze Article
          </button>


        </section>

        {/* ==========================================
            FEATURES SECTION
        ========================================== */}

        <section className="features-section">

          <h2>Analyze your article to discover:</h2>

          <div className="feature-list">

            <p>✓ Predicts News Category</p>

            <p>✓ Shows Confidence Score</p>

            <p>✓ Recommends Similar Articles</p>


          </div>

        </section>

      </main>

    </div>
  );
}

export default Home;