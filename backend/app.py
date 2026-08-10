from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# ==========================================
# LOAD MODEL FILES
# ==========================================

with open("categorization_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("tfidf_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

with open("news_dataset.pkl", "rb") as f:
    news_dataset = pickle.load(f)

print("Model loaded successfully!")
print("Dataset columns:", news_dataset.columns.tolist())


# ==========================================
# HOME ROUTE
# ==========================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "News-Sense API is running"
    })


# ==========================================
# ANALYZE ARTICLE
# ==========================================

@app.route("/analyze", methods=["POST"])
def analyze():

    try:

        # --------------------------------------
        # Get article from React
        # --------------------------------------

        data = request.get_json()

        if not data:
            return jsonify({
                "error": "No data received"
            }), 400

        article = data.get("article", "").strip()

        if not article:
            return jsonify({
                "error": "Article is required"
            }), 400


        # --------------------------------------
        # Convert article to TF-IDF
        # --------------------------------------

        article_vector = vectorizer.transform([article])


        # --------------------------------------
        # Predict category
        # --------------------------------------

        prediction = model.predict(article_vector)[0]


        # --------------------------------------
        # Calculate confidence
        # --------------------------------------

        probabilities = model.predict_proba(article_vector)[0]

        confidence = float(
            np.max(probabilities) * 100
        )


        # ======================================
        # RECOMMENDATIONS
        # ======================================

        recommendations = []


        # --------------------------------------
        # Find category column
        # --------------------------------------

        category_column = None

        for col in news_dataset.columns:

            if str(col).lower() in [
                "category",
                "categories",
                "label",
                "class"
            ]:

                category_column = col
                break


        # --------------------------------------
        # Find articles from same category
        # --------------------------------------

        if category_column is not None:

            similar_articles = news_dataset[
                news_dataset[category_column]
                .astype(str)
                .str.lower()
                ==
                str(prediction).lower()
            ]


            # ----------------------------------
            # Get first 3 recommendations
            # ----------------------------------

            for _, row in similar_articles.head(3).iterrows():

                title = "Recommended News Article"

                description = ""


                # ----------------------------------
                # Find title column
                # ----------------------------------

                for col in news_dataset.columns:

                    if str(col).lower() in [
                        "title",
                        "headline",
                        "name"
                    ]:

                        title = str(row[col])

                        break


                # ----------------------------------
                # Find article/text column
                # ----------------------------------

                for col in news_dataset.columns:

                    if str(col).lower() in [
                        "text",
                        "article",
                        "content",
                        "description"
                    ]:

                        description = str(row[col])

                        break


                # ----------------------------------
                # Add recommendation
                # ----------------------------------

                recommendations.append({

                    "category": str(prediction),

                    "title": title,

                    "description": description

                })


        # ======================================
        # SEND RESULT TO REACT
        # ======================================

        return jsonify({

            "category": str(prediction),

            "confidence": round(
                confidence,
                1
            ),

            "recommendations": recommendations

        })


    except Exception as e:

        print("ERROR:", e)

        return jsonify({

            "error": str(e)

        }), 500


# ==========================================
# RUN SERVER
# ==========================================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )