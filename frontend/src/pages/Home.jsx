import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Home() {
  const [article, setArticle] = useState("");

  const navigate = useNavigate();

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

  return (
    <div className="app">

      <Header />

      <main className="home-container">

        <section className="hero-section">

          <h1>Enter News Article</h1>

          <p className="subtitle">
            Paste or type a news article below. We will classify
            its category and recommend similar articles.
          </p>

          <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            placeholder="Paste or type your news article here..."
          />

          <button
            className="primary-button"
            onClick={analyzeArticle}
          >
            Analyze Article
          </button>

        </section>

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