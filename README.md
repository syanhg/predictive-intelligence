# Prophet Arena: Arena for Predictive Intelligence

[![GitHub](https://img.shields.io/badge/GitHub-syanhg%2Fpredictive--intelligence-blue?logo=github)](https://github.com/syanhg/predictive-intelligence)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Python 3.9+](https://img.shields.io/badge/Python-3.9%2B-blue)](https://www.python.org/downloads/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)](https://www.typescriptlang.org/)

## Overview

Prophet Arena is a comprehensive, open-source implementation of a live forecasting benchmark for evaluating and understanding Large Language Models' (LLMs) predictive intelligence. Based on the research paper **"LLM-as-a-Prophet: Understanding Predictive Intelligence with Prophet Arena"**, this project provides a modular, extensible framework for:

- **Live Event Extraction**: Continuously collect real-world forecasting events from prediction markets
- **Context Construction**: Build comprehensive prediction contexts from news sources and market data
- **Probabilistic Forecasting**: Enable LLMs to generate well-calibrated probabilistic predictions
- **Multi-dimensional Evaluation**: Assess forecasts using Brier score, calibration error, and market returns
- **Mechanistic Analysis**: Understand how LLMs internalize knowledge and engage with external sources

## Key Features

### 📊 Multi-Dimensional Evaluation
- **Brier Score**: Measure absolute forecast accuracy
- **Calibration Error**: Assess reliability and confidence calibration
- **Market Return**: Evaluate economic value against market consensus

### 🔄 Modular Pipeline
1. **Event & Market Extraction**: Real-time event discovery from prediction markets
2. **Context Construction**: Automated news retrieval and market snapshot integration
3. **Prediction**: LLM-powered probabilistic forecasting
4. **Evaluation**: Comprehensive performance metrics across multiple dimensions

### 🧠 Mechanistic Analysis
- Knowledge internalization tracking
- Source utilization analysis
- Reasoning synthesis evaluation
- Evidence extraction quality assessment
- Uncertainty quantification

### 🚀 Deployment Ready
- Docker containerization for easy deployment
- GitHub Actions CI/CD pipeline
- Vercel-ready frontend
- Scalable backend architecture

## Project Structure

```
predictive-intelligence/
├── frontend/              # Next.js/React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Next.js pages
│   │   ├── api/           # API routes
│   │   └── lib/           # Utility functions
│   ├── public/            # Static assets
│   └── package.json
├── backend/               # Python backend API
│   ├── app/
│   │   ├── api/           # FastAPI routes
│   │   ├── models/        # Database models
│   │   ├── services/      # Business logic
│   │   └── schemas/       # Pydantic schemas
│   ├── notebooks/         # Jupyter notebooks for analysis
│   ├── requirements.txt
│   └── main.py
├── docker/                # Docker configuration
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
├── docs/                  # Documentation
│   ├── ARCHITECTURE.md    # System architecture
│   ├── API.md             # API documentation
│   ├── DEPLOYMENT.md      # Deployment guides
│   └── DEVELOPMENT.md     # Development setup
└── README.md              # This file
```

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- Docker (optional)
- PostgreSQL (for production)

### Local Development

#### 1. Clone the repository
```bash
git clone https://github.com/syanhg/predictive-intelligence.git
cd predictive-intelligence
```

#### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Run migrations
alembic upgrade head

# Start the backend server
uvicorn main:app --reload
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with your API endpoint

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose -f docker/docker-compose.yml up -d

# Access the application
# Frontend: http://localhost:3000
# API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **API Client**: TanStack Query

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.9+
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Async**: AsyncIO + HTTPX
- **LLM Integration**: OpenAI API, Anthropic API
- **Data Validation**: Pydantic

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel (frontend), AWS/Render (backend)

## API Overview

### Events API
```bash
# List events
GET /api/events?status=active&limit=20

# Get event details
GET /api/events/{event_id}

# Create prediction
POST /api/events/{event_id}/predictions
```

### Predictions API
```bash
# Get predictions for an event
GET /api/predictions?event_id={event_id}

# Submit LLM prediction
POST /api/predictions
{
  "event_id": "uuid",
  "market_id": "uuid",
  "probability": 0.65,
  "rationale": "..."
}

# Get evaluation metrics
GET /api/predictions/{prediction_id}/metrics
```

### Evaluation API
```bash
# Get Brier score
GET /api/metrics/brier?time_range=7d

# Get calibration analysis
GET /api/metrics/calibration

# Get market return analysis
GET /api/metrics/market_return
```

For complete API documentation, see [API.md](docs/API.md) or visit `/docs` when the backend is running.

## Configuration

### Environment Variables

**Backend (.env)**
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost/prophet_arena

# LLM APIs
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Prediction Markets
KALSHI_API_KEY=...
KALSHI_API_SECRET=...

# Server
HOST=0.0.0.0
PORT=8000
DEBUG=False
```

**Frontend (.env.local)**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Development

### Running Tests

```bash
# Backend tests
cd backend
pytest
pytest --cov  # with coverage

# Frontend tests
cd frontend
npm test
npm run test:coverage
```

### Code Quality

```bash
# Backend
cd backend
black .
flake8 .
mypy app/

# Frontend
cd frontend
npm run lint
npm run format
```

### Database Migrations

```bash
cd backend

# Create migration
alembic revision --autogenerate -m "Add new column"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## Deployment

### Vercel (Frontend)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy:
```bash
vercel deploy --prod
```

### AWS/Render (Backend)

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions on deploying to:
- AWS EC2/ECS
- Render
- DigitalOcean
- Heroku

### GitHub Pages (Static Demo)

```bash
cd frontend
npm run build
npm run export

# Push to gh-pages branch
git subtree push --prefix out origin gh-pages
```

## Key Metrics & Evaluation

### Brier Score
Measures the mean squared difference between predicted and actual probabilities:
```
BS = (1/n) * Σ(predicted_prob - actual_outcome)²
```
Lower is better. Range: [0, 1]

### Expected Calibration Error (ECE)
Measures reliability of probability estimates:
```
ECE = Σ |accuracy(bin) - confidence(bin)| * n(bin)
```
Lower is better. Range: [0, 1]

### Market Return
Measures economic value relative to market consensus:
```
Return = (1 / initial_investment) * profit
```
Higher is better.

## Research Paper

This implementation is based on:

**"LLM-as-a-Prophet: Understanding Predictive Intelligence with Prophet Arena"**
- Authors: Qingchuan Yang, Simon Mahns, Sida Li, et al.
- Published: December 2025
- [arXiv:2510.17638v2](https://arxiv.org/abs/2510.17638v2)

The paper systematically evaluates LLMs' forecasting capabilities across 1,300+ real-world events from prediction markets, revealing both emerging strengths and persistent bottlenecks in LLM predictive intelligence.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 (Python) and Google TypeScript style guide
- Write tests for new features
- Update documentation
- Use meaningful commit messages

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- Original paper authors: Qingchuan Yang, Simon Mahns, Sida Li, et al.
- Prediction market data: Kalshi, Metaculus
- LLM providers: OpenAI, Anthropic, Meta

## Citation

If you use Prophet Arena in your research, please cite:

```bibtex
@article{yang2025llm,
  title={LLM-as-a-Prophet: Understanding Predictive Intelligence with Prophet Arena},
  author={Yang, Qingchuan and Mahns, Simon and Li, Sida and others},
  journal={arXiv preprint arXiv:2510.17638},
  year={2025}
}
```

## Support

- 📖 [Documentation](docs/)
- 🐛 [Issue Tracker](https://github.com/syanhg/predictive-intelligence/issues)
- 💬 [Discussions](https://github.com/syanhg/predictive-intelligence/discussions)
- 📧 Email: support@example.com

## Roadmap

- [ ] Real-time event streaming
- [ ] Advanced LLM reasoning chains
- [ ] Ensemble forecasting methods
- [ ] Web3 integration for decentralized predictions
- [ ] Mobile app
- [ ] Advanced analytics dashboard
- [ ] Automated strategy generation

## Related Projects

- [Metaculus](https://www.metaculus.com/) - Forecasting platform
- [Good Judgment Open](https://www.gjopen.com/) - Collaborative forecasting
- [Kalshi](https://www.kalshi.com/) - Prediction markets

---

**Made with ❤️ by the Predictive Intelligence team**
