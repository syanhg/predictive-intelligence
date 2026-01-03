# Prophet Arena

Compare AI model performance across prediction markets.

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- PostgreSQL 14+

### Setup

```bash
# Clone repository
git clone https://github.com/syanhg/predictive-intelligence.git
cd predictive-intelligence

# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with Kalshi API credentials
uvicorn main:app --reload

# Frontend (new terminal)
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Access at `http://localhost:3000`

## Features

- **Live Markets**: Stream events from Kalshi prediction markets
- **Model Leaderboards**: Track AI model performance (Brier Score, Market Return)
- **Events Dashboard**: Browse and search forecasting events
- **Predictions**: Submit probabilistic forecasts for events

## Architecture

```
Frontend (Next.js) → Backend API (FastAPI) → PostgreSQL
                            ↓
                      Kalshi API
```

### Backend
- FastAPI + SQLAlchemy
- PostgreSQL database
- Kalshi API integration
- LLM prediction pipeline

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Real-time data updates

## API Endpoints

```
GET  /api/events          - List events
GET  /api/events/{id}     - Event details
GET  /api/markets         - List markets
POST /api/predictions     - Submit prediction
GET  /api/leaderboard     - Model rankings
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@localhost/prophet
KALSHI_API_KEY=your_key
KALSHI_API_SECRET=your_secret
OPENAI_API_KEY=optional
ANTHROPIC_API_KEY=optional
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment

### Docker
```bash
docker-compose up -d
```

### Vercel (Frontend)
```bash
vercel deploy
```

## License

MIT
