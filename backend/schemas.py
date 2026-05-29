from pydantic import BaseModel, field_validator
from typing import Literal
from datetime import datetime


class SignalCreate(BaseModel):
    id: str
    symbol: str
    action: Literal["BUY", "SELL"]
    price: float
    timestamp: datetime

    @field_validator("price")
    @classmethod
    def validate_price(cls, value):
        if value <= 0:
            raise ValueError("Price must be greater than 0")
        return value


class SignalResponse(BaseModel):
    id: str
    symbol: str
    action: str
    price: float
    timestamp: datetime

    model_config = {
        "from_attributes": True
    }