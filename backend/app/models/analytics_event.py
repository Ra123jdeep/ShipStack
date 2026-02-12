from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime
import enum

class EventType(str, enum.Enum):
    CLICK = "click"
    STACK_GEN = "stack_generation"
    FAVORITE = "favorite"
    VIEW = "view"

class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String, index=True)  # click, stack_gen, etc.
    tool_id = Column(Integer, ForeignKey("tools.id"), nullable=True)
    event_metadata = Column(JSON, nullable=True)  # Flexible field for extra data
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

    # Relationships
    tool = relationship("Tool", backref="events")
