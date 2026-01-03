# Prophet Arena Architecture

## System Overview

Prophet Arena is a modular, scalable system for evaluating LLM predictive intelligence across real-world forecasting tasks. The system follows a three-stage pipeline: Event Extraction, Context Construction, and Probabilistic Prediction with Evaluation.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                       │
│  Dashboard • Event Management • Predictions • Analytics     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│               Backend API (FastAPI)                         │
│  ┌─────────────┐ ┌─────────────┐ ┌──────────────┐          │
│  │ Events API  │ │ Predictions │ │ Evaluation   │          │
│  │ & Markets   │ │ & LLM Calls │ │ & Metrics    │          │
│  └─────────────┘ └─────────────┘ └──────────────┘          │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ↓               ↓               ↓
    ┌─────────┐    ┌──────────┐    ┌─────────┐
    │PostgreSQL│   │ External │   │  Redis  │
    │Database  │   │LLM APIs  │   │ Cache   │
    └─────────┘    └──────────┘    └─────────┘
```

## Component Architecture

### 1. Frontend (Next.js + TypeScript)

**Purpose**: User interface for browsing events, viewing predictions, and analyzing results.

**Key Components**:
- **Pages**: 
  - `/dashboard`: Overview of system metrics
  - `/events`: Event listing and details
  - `/predictions`: Prediction results and analysis
  - `/analytics`: Performance metrics and leaderboards
  
- **UI Components**:
  - EventCard: Display event information
  - PredictionForm: Submit and view predictions
  - MetricsChart: Visualize performance metrics
  - CalibrationPlot: Display calibration analysis

**State Management**: Zustand for global state

**API Integration**: TanStack Query for server state management

### 2. Backend API (FastAPI + Python)

**Purpose**: Core application logic, database management, and LLM integration.

**Key Modules**:

#### `api/` - API Routes
- `events.py`: Event CRUD and market management
- `predictions.py`: Prediction submission and retrieval
- `metrics.py`: Evaluation metrics and analytics
- `llm.py`: LLM prediction pipeline

#### `models/` - Database Models (SQLAlchemy)
- `Event`: Forecasting events
- `Market`: Binary markets within events
- `Prediction`: LLM predictions
- `PredictionMetrics`: Evaluation results
- `User`: User management

#### `services/` - Business Logic
- `event_service.py`: Event extraction and market creation
- `prediction_service.py`: Prediction handling and storage
- `llm_service.py`: LLM API interactions
- `evaluation_service.py`: Metric calculation
- `context_service.py`: Context construction

#### `schemas/` - Pydantic Models
- Request/response validation
- Type safety

### 3. Database (PostgreSQL)

**Schema**:

```sql
-- Events Table
CREATE TABLE events (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category VARCHAR,
  created_at TIMESTAMP,
  resolved_at TIMESTAMP,
  resolution_value VARCHAR,
  status ENUM ('pending', 'active', 'resolved', 'archived')
);

-- Markets Table
CREATE TABLE markets (
  id UUID PRIMARY KEY,
  event_id UUID REFERENCES events(id),
  rule TEXT NOT NULL,
  outcome_yes VARCHAR,
  outcome_no VARCHAR,
  market_price DECIMAL,
  resolved BOOLEAN,
  resolution_value BOOLEAN
);

-- Predictions Table
CREATE TABLE predictions (
  id UUID PRIMARY KEY,
  market_id UUID REFERENCES markets(id),
  llm_model VARCHAR,
  predicted_probability DECIMAL,
  rationale TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Metrics Table
CREATE TABLE prediction_metrics (
  id UUID PRIMARY KEY,
  prediction_id UUID REFERENCES predictions(id),
  brier_score DECIMAL,
  calibration_error DECIMAL,
  market_return DECIMAL,
  created_at TIMESTAMP
);
```

### 4. LLM Integration

**Supported Models**:
- OpenAI (GPT-4, GPT-3.5)
- Anthropic Claude
- Open-source models via Ollama

**LLM Pipeline**:
1. **Context Construction**: Assemble news sources and market data
2. **Prompt Engineering**: Construct specialized prompts
3. **API Calls**: Send predictions to LLM
4. **Response Parsing**: Extract probabilities and rationales
5. **Validation**: Ensure valid probability ranges [0, 1]

## Data Flow

### Event Extraction Pipeline
```
External Markets (Kalshi, Metaculus)
         ↓
Event Discovery Service
         ↓
Market Normalization
         ↓
Database Storage
         ↓
Frontend Display
```

### Prediction Pipeline
```
Event + Market
         ↓
Context Construction
  ├─ News Retrieval
  └─ Market Snapshots
         ↓
LLM Prompt Generation
         ↓
LLM API Call
         ↓
Response Parsing
         ↓
Validation & Storage
         ↓
Metrics Calculation
         ↓
Frontend Display
```

## Evaluation Metrics

### Brier Score
Measures absolute forecast accuracy:
```
BS = (1/n) * Σ(predicted - actual)²
```

### Calibration Error (ECE)
Measures reliability:
```
ECE = Σ|accuracy(bin) - confidence(bin)| * n(bin)
```

### Market Return
Measures economic value:
```
Return = profit / initial_investment
```

## Deployment Architecture

### Docker Containers
- **Backend**: FastAPI + Uvicorn
- **Frontend**: Next.js with Node runtime
- **Database**: PostgreSQL 16
- **Cache**: Redis 7

### Environment
```
production/
  ├─ API Server (8000)
  ├─ Web Server (3000)
  ├─ Database (5432)
  └─ Cache (6379)
```

## Scalability Considerations

1. **Database**: PostgreSQL with connection pooling
2. **Caching**: Redis for prediction caching
3. **Async**: FastAPI async/await for I/O operations
4. **Load Balancing**: Nginx/HAProxy in production
5. **Monitoring**: Prometheus + Grafana

## Security

- API authentication via JWT tokens
- Rate limiting on prediction endpoints
- Input validation with Pydantic
- SQL injection prevention with SQLAlchemy ORM
- HTTPS/TLS in production

## Development Workflow

1. **Local Development**: Docker Compose for full stack
2. **Testing**: pytest for backend, Jest for frontend
3. **CI/CD**: GitHub Actions for automated testing
4. **Deployment**: Container registry → Kubernetes or serverless
