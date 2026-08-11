from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import re
import time

app = Flask(__name__)
CORS(app)


# ============================================================
# LOAD MODEL FILES
# ============================================================

with open("categorization_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("tfidf_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

with open("news_dataset.pkl", "rb") as f:
    news_dataset = pickle.load(f)

print("Model loaded successfully!")
print("Dataset columns:", news_dataset.columns.tolist())


# ============================================================
# FIND IMPORTANT DATASET COLUMNS ONCE
# ============================================================

category_column = None
title_column = None
text_column = None


for col in news_dataset.columns:

    col_name = str(col).lower().strip()

    if category_column is None and col_name in [
        "category",
        "categories",
        "label",
        "class"
    ]:
        category_column = col

    if title_column is None and col_name in [
        "title",
        "headline",
        "name"
    ]:
        title_column = col

    if text_column is None and col_name in [
        "text",
        "article",
        "content",
        "description"
    ]:
        text_column = col


print("Category column:", category_column)
print("Title column:", title_column)
print("Text column:", text_column)


# ============================================================
# HOME ROUTE
# ============================================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "News-Sense API is running"
    })


# ============================================================
# ANALYZE ARTICLE
# ============================================================

@app.route("/analyze", methods=["POST"])
def analyze():

    start_time = time.time()

    try:

        # ----------------------------------------------------
        # GET DATA
        # ----------------------------------------------------

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


        # ----------------------------------------------------
        # LIMIT ARTICLE SIZE
        # ----------------------------------------------------
        # Prevent extremely large webpages from slowing
        # down TF-IDF processing.

        MAX_ARTICLE_LENGTH = 10000

        if len(article) > MAX_ARTICLE_LENGTH:

            article = article[:MAX_ARTICLE_LENGTH]

            print(
                "Article truncated to",
                MAX_ARTICLE_LENGTH,
                "characters"
            )


        print(
            "Article length:",
            len(article),
            "characters"
        )


        # ----------------------------------------------------
        # TF-IDF
        # ----------------------------------------------------

        tfidf_start = time.time()

        article_vector = vectorizer.transform([article])

        print(
            "TF-IDF time:",
            round(time.time() - tfidf_start, 4),
            "seconds"
        )


        # ----------------------------------------------------
        # PREDICTION
        # ----------------------------------------------------

        prediction_start = time.time()

        prediction = model.predict(article_vector)[0]

        print(
            "Prediction time:",
            round(time.time() - prediction_start, 4),
            "seconds"
        )


        # ----------------------------------------------------
        # CONFIDENCE
        # ----------------------------------------------------

        confidence_start = time.time()

        probabilities = model.predict_proba(article_vector)[0]

        confidence = float(
            np.max(probabilities) * 100
        )

        print(
            "Confidence time:",
            round(time.time() - confidence_start, 4),
            "seconds"
        )


        # ====================================================
        # RECOMMENDATIONS
        # ====================================================

        recommendations = []


        if category_column is not None:

            # ------------------------------------------------
            # Find matching category
            # ------------------------------------------------

            matching_articles = news_dataset[
                news_dataset[category_column]
                .astype(str)
                .str.lower()
                .eq(str(prediction).lower())
            ]


            # ------------------------------------------------
            # Get maximum 3 recommendations
            # ------------------------------------------------

            matching_articles = matching_articles.head(3)


            for _, row in matching_articles.iterrows():

                title = "Recommended News Article"

                description = ""


                # --------------------------------------------
                # TITLE
                # --------------------------------------------

                if title_column is not None:

                    value = row[title_column]

                    if value is not None:

                        title = str(value)


                # --------------------------------------------
                # DESCRIPTION
                # --------------------------------------------

                if text_column is not None:

                    value = row[text_column]

                    if value is not None:

                        description = str(value)


                # --------------------------------------------
                # Limit recommendation description
                # --------------------------------------------

                if len(description) > 500:

                    description = description[:500] + "..."


                recommendations.append({

                    "category": str(prediction),

                    "title": title,

                    "description": description

                })


        # ====================================================
        # TOTAL TIME
        # ====================================================

        total_time = time.time() - start_time

        print(
            "TOTAL ANALYZE TIME:",
            round(total_time, 4),
            "seconds"
        )


        # ====================================================
        # RESPONSE
        # ====================================================

        return jsonify({

            "category": str(prediction),

            "confidence": round(
                confidence,
                1
            ),

            "recommendations": recommendations,

            "processing_time": round(
                total_time,
                3
            )

        })


    except Exception as e:

        print(
            "ERROR:",
            str(e)
        )


        return jsonify({

            "error": str(e)

        }), 500


# ============================================================
# SUMMARIZE ARTICLE
# ============================================================

@app.route("/summarize", methods=["POST"])
def summarize():

    try:

        # ----------------------------------------------------
        # GET DATA
        # ----------------------------------------------------

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


        # ----------------------------------------------------
        # LIMIT ARTICLE SIZE
        # ----------------------------------------------------

        MAX_ARTICLE_LENGTH = 10000

        if len(article) > MAX_ARTICLE_LENGTH:

            article = article[:MAX_ARTICLE_LENGTH]


        # ----------------------------------------------------
        # SPLIT SENTENCES
        # ----------------------------------------------------

        sentences = re.split(
            r'(?<=[.!?])\s+',
            article
        )


        sentences = [
            sentence.strip()
            for sentence in sentences
            if sentence.strip()
        ]


        # ----------------------------------------------------
        # CREATE SUMMARY
        # ----------------------------------------------------

        if len(sentences) <= 3:

            summary = " ".join(sentences)

        else:

            summary = " ".join(
                sentences[:3]
            )


        # ----------------------------------------------------
        # RESPONSE
        # ----------------------------------------------------

        return jsonify({

            "summary": summary

        })


    except Exception as e:

        print(
            "SUMMARY ERROR:",
            str(e)
        )


        return jsonify({

            "error": str(e)

        }), 500


# ============================================================
# RUN SERVER
# ============================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )