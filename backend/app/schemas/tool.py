from pydantic import BaseModel
from typing import Optional
from enum import Enum

class TrustLabel(str, Enum):
    STABLE = "Stable"
    TRENDING = "Trending"
    EXPERIMENTAL = "Experimental"

class ToolBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: str
    trust_score: float = 50.0
    trust_label: TrustLabel = TrustLabel.EXPERIMENTAL
    official_url: Optional[str] = None
    icon_url: Optional[str] = None
    quote: Optional[str] = None
    tags: Optional[str] = None

class ToolCreate(ToolBase):
    pass

class Tool(ToolBase):
    id: int

    class Config:
        from_attributes = True
