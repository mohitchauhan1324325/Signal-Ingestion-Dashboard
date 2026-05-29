# Signal Ingestion Dashboard

A full-stack application that ingests trading signals, validates them, prevents duplicates, and displays them in a dashboard.

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- SQLite

### Frontend
- React
- Axios

## Features

- Submit signals through a form
- Validate signal data
- Prevent duplicate signals using unique ID
- View all signals
- Filter signals by symbol
- Loading state
- Error state
- Empty state

## Signal Format

```json
{
  "id": "abc123",
  "symbol": "AAPL",
  "action": "BUY",
  "price": 182.4,
  "timestamp": "2026-05-29T12:00:00"
}
```

## Setup

### Backend

```bash
cd backend

pip install fastapi uvicorn sqlalchemy pydantic

uvicorn main:app --reload
```

Backend runs at:

```txt
http://127.0.0.1:8000
```

Swagger Documentation:

```txt
http://127.0.0.1:8000/docs
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```txt
http://localhost:5173
```

## API Endpoints

### Create Signal

```http
POST /signals
```

### Get Signals

```http
GET /signals
```

### Filter By Symbol

```http
GET /signals?symbol=AAPL
```

## Assumptions

- Every signal ID is unique.
- Only BUY and SELL actions are allowed.
- Price must be greater than zero.

## Database Choice

SQLite was chosen because it is lightweight, requires no additional setup, and is sufficient for the scope of this assignment.

## Improvements With More Time

- Unit tests
- Docker support
- Authentication
- Pagination
- PostgreSQL
- Kafka for high-volume signal ingestion

## Bonus Question

If signals arrive thousands of times per second, I would introduce a message queue such as Apache Kafka and process signals asynchronously. I would also move from SQLite to PostgreSQL for better scalability."# Signal-Ingestion-Dashboard" 
