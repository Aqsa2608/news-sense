from transformers import pipeline

summarizer1 = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6",
    device = -1,
    framework="pt",
    local_files_only=True
)

def summarize(article,summarizer1):
    result = summarizer1(
        article,
        max_length = 120,
        min_length = 25,
        do_sample = False
    )
    return result[0]["summary_text"]

