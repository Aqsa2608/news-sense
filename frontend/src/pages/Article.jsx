import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Article() {
  const location = useLocation();
  const navigate = useNavigate();

  const article = location.state?.article;

  // If no article is available
  if (!article) {
    return (
      <div className="app">
        <Header />

        <main className="result-container">
          <h1>Article Not Found</h1>

          <button
            className="primary-button"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />

      <main className="result-container">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            color: "#2563eb",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            padding: "0",
            marginBottom: "20px",
          }}
        >
          ← Back to Recommendations
        </button>


        {/* Article Card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e1e5eb",
            borderRadius: "14px",
            padding: "30px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
          }}
        >

          {/* Category */}
          <p
            style={{
              color: "#2563eb",
              fontSize: "15px",
              fontWeight: "600",
              textTransform: "capitalize",
              marginBottom: "12px",
            }}
          >
            {article.category}
          </p>


          {/* Title */}
          <h1
            style={{
              color: "#111827",
              fontSize: "32px",
              lineHeight: "1.3",
              marginBottom: "20px",
            }}
          >
            {article.title}
          </h1>


          {/* Full Article */}
          <div
            style={{
              color: "#374151",
              fontSize: "17px",
              lineHeight: "1.8",
              whiteSpace: "pre-line",
            }}
          >
            {article.description}
          </div>

        </div>


        {/* Back Button */}
        <button
          className="primary-button"
          onClick={() => navigate(-1)}
          style={{
            marginTop: "25px",
          }}
        >
          Back to Recommendations
        </button>

      </main>
    </div>
  );
}

export default Article;