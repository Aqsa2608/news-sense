import pickle

files = [
    "categorization_model.pkl",
    "tfidf_vectorizer.pkl",
    "news_dataset.pkl",
    "article_vectors.pkl",
    "article_vectors1.pkl"
]

for filename in files:
    try:
        with open(filename, "rb") as f:
            obj = pickle.load(f)

        print("\n----------------------")
        print(filename)
        print("----------------------")
        print("Type:", type(obj))

        if hasattr(obj, "classes_"):
            print("Classes:", obj.classes_)

        if hasattr(obj, "shape"):
            print("Shape:", obj.shape)

        if hasattr(obj, "get_feature_names_out"):
            features = obj.get_feature_names_out()
            print("Number of features:", len(features))

    except Exception as e:
        print(filename, "ERROR:", e)