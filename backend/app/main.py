from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Coralytics API")


class Post(BaseModel):
    platform: str
    content: str
    created_at: str | None = None


class AnalysisRequest(BaseModel):
    posts: list[Post]


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/analyze")
def analyze_posts(payload: AnalysisRequest) -> dict[str, object]:
    # TODO: Add VADER sentiment, TF-IDF clustering, and Firestore persistence.
    return {
        "post_count": len(payload.posts),
        "topics": [],
        "sentiment_summary": None,
        "organism_data": {
            "accountAgeDays": 0,
            "topics": [],
        },
    }
