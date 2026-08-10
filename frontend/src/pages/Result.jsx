import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const category = location.state?.category || "Unknown";
  const confidence = location.state?.confidence || 0;
  const recommendations = location.state?.recommendations || [];

  return (
    <div className="app">
      <Header />

      <main className="result-container">
        <h1>Analysis Result</h1>

        {/* ================= CATEGORY ================= */}
        <div className="result-card">
          <p className="result-label">Predicted Category</p>

          <h2 className="category">{category}</h2>
        </div>

        {/* ================= CONFIDENCE ================= */}
        <div className="result-card">
          <p className="result-label">Confidence Score</p>

          <h2>{confidence}%</h2>

          <div className="progress-background">
            <div
              className="progress-bar"
              style={{
                width: `${confidence}%`,
              }}
            ></div>
          </div>
        </div>

        {/* ================= RECOMMENDATIONS ================= */}
        <section className="recommendation-section">
          <h2>Recommended Articles</h2>

          <p className="recommendation-subtitle">
            Explore similar news articles:
          </p>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {recommendations.map((article, index) => (
              <div
                key={index}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e1e5eb",
                  borderRadius: "12px",
                  padding: "20px",
                  height: "300px",
                  boxSizing: "border-box",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* CATEGORY */}
                <div
                  style={{
                    color: "#2563eb",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "10px",
                    textTransform: "capitalize",
                  }}
                >
                  {article.category}
                </div>

                {/* TITLE */}
                <h3
                  style={{
                    fontSize: "19px",
                    lineHeight: "1.3",
                    margin: "0 0 12px 0",
                    color: "#111827",
                  }}
                >
                  {article.title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  style={{
                    color: "#55708f",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    margin: 0,
                    height: "95px",
                    overflow: "hidden",
                  }}
                >
                  {article.description
                    ? article.description.substring(0, 180)
                    : "No description available."}

                  {article.description && article.description.length > 180
                    ? "..."
                    : ""}
                </p>

                {/* READ ARTICLE */}
                <button
                  style={{
                    marginTop: "auto",
                    width: "fit-content",
                    background: "none",
                    border: "none",
                    color: "#2563eb",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  onClick={() =>
                    navigate("/article", {
                      state: {
                        article: article,
                      },
                    })
                  }
                >
                  Read Article →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CHECK ANOTHER ARTICLE ================= */}
        <button className="primary-button" onClick={() => navigate("/home")}>
          Check Another Article
        </button>
      </main>
    </div>
  );
}

export default Result;
