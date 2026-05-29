from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import engine, SessionLocal
from models import Base, Signal
from schemas import SignalCreate, SignalResponse

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Signal Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {
        "message": "Signal Dashboard API"
    }


@app.post(
    "/signals",
    response_model=SignalResponse,
    status_code=status.HTTP_201_CREATED
)
def create_signal(
    signal: SignalCreate,
    db: Session = Depends(get_db)
):
    existing_signal = (
        db.query(Signal)
        .filter(Signal.id == signal.id)
        .first()
    )

    if existing_signal:
        raise HTTPException(
            status_code=400,
            detail="Duplicate signal ID"
        )

    new_signal = Signal(
        id=signal.id,
        symbol=signal.symbol.upper(),
        action=signal.action,
        price=signal.price,
        timestamp=signal.timestamp
    )

    db.add(new_signal)
    db.commit()
    db.refresh(new_signal)

    return new_signal


@app.get(
    "/signals",
    response_model=list[SignalResponse]
)
def get_signals(
    symbol: str | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Signal)

    if symbol:
        query = query.filter(
            func.lower(Signal.symbol)
            == symbol.lower()
        )

    signals = (
        query
        .order_by(Signal.timestamp.desc())
        .all()
    )

    return signals