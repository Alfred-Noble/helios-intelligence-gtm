from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from fastapi import Depends

from app.services.signal_service import (
    SignalService
)

router = APIRouter(
    prefix="/signals",
    tags=["Signals"]
)

@router.get("/")
def get_signals(
    industry: str,
    region: str,
    db: Session = Depends(get_db)
):

    return SignalService.get_news(
        industry=industry,
        region=region,
        db=db
    )