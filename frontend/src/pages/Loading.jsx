import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import LoadingSpinner from "../components/LoadingSpinner";

function Loading() {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const analyzeArticle = async () => {

      try {

        const response = await fetch(
          "https://news-sense-hc4a.onrender.com/analyze",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              article: location.state?.article || "",
            }),
          }
        );

        const data = await response.json();

        navigate("/result", {
          state: {
            article: location.state?.article || "",
            category: data.category,
            confidence: data.confidence,
            recommendations: data.recommendations,
          },
        });

      } catch (error) {

        console.error("API Error:", error);

        alert("Unable to connect to News-Sense API.");

        navigate("/");

      }

    };

    const timer = setTimeout(() => {
      analyzeArticle();
    }, 1500);

    return () => clearTimeout(timer);

  }, [navigate, location.state]);

  return (

    <div className="loading-page">

      <Logo large />

      <LoadingSpinner />

      <h2>Analyzing Article...</h2>

      <p>Please wait a moment.</p>

    </div>

  );
}

export default Loading;