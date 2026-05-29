from sqlalchemy import Column, String, Float, DateTime
from database import Base


class Signal(Base):
    __tablename__ = "signals"

    id = Column(String, primary_key=True, unique=True)
    symbol = Column(String, nullable=False)
    action = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    timestamp = Column(DateTime, nullable=False)