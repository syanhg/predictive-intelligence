from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv
import httpx

load_dotenv()

app = FastAPI(title="Prophet Arena API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Kalshi API endpoints
KALSHI_API_URL = "https://api.kalshi.com/v1"
KALSHI_API_KEY = os.getenv("KALSHI_API_KEY")
KALSHI_API_SECRET = os.getenv("KALSHI_API_SECRET")

@app.get("/")
async def root():
    return {"status": "Prophet Arena API Running"}

@app.get("/api/events")
async def get_events(limit: int = 20, offset: int = 0):
    """
    Fetch live events from Kalshi
    """
    try:
        async with httpx.AsyncClient() as client:
            headers = {
                "Authorization": f"Bearer {KALSHI_API_KEY}"
            }
            response = await client.get(
                f"{KALSHI_API_URL}/markets?limit={limit}&offset={offset}",
                headers=headers
            )
            return response.json()
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )

@app.get("/api/markets")
async def get_markets(ticker: str = None):
    """
    Get markets from Kalshi with optional ticker filter
    """
    try:
        async with httpx.AsyncClient() as client:
            headers = {
                "Authorization": f"Bearer {KALSHI_API_KEY}"
            }
            url = f"{KALSHI_API_URL}/markets"
            if ticker:
                url += f"?ticker={ticker}"
            
            response = await client.get(url, headers=headers)
            return response.json()
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )

@app.get("/api/leaderboard")
async def get_leaderboard():
    """
    Get AI model leaderboard (placeholder)
    """
    return {
        "models": [
            {"name": "GPT-5 (high)", "rank": 1, "brier_score": 0.184, "return": 0.943},
            {"name": "Grok-4", "rank": 2, "brier_score": 0.189, "return": 0.864},
            {"name": "Claude Sonnet 4", "rank": 3, "brier_score": 0.194, "return": 0.909},
        ]
    }

@app.post("/api/predictions")
async def submit_prediction(market_id: str, probability: float, rationale: str = None):
    """
    Submit an LLM prediction for a market
    """
    return {
        "market_id": market_id,
        "probability": probability,
        "rationale": rationale,
        "status": "recorded"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
