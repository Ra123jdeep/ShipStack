from pydantic import BaseModel
from typing import Optional, Any, Dict, List
from datetime import datetime

class AnalyticsEventBase(BaseModel):
    event_type: str
    tool_id: Optional[int] = None
    event_metadata: Optional[Dict[str, Any]] = None

class AnalyticsEventCreate(AnalyticsEventBase):
    pass

class AnalyticsEvent(AnalyticsEventBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class AnalyticsStats(BaseModel):
    total_clicks: int
    total_stacks: int
    active_builders: int
    top_tools: List[Dict[str, Any]]
    recent_events: List[Dict[str, Any]]
