from sqlalchemy import Column, Integer, String, Float, Enum
from app.core.database import Base
import enum

class TrustLabel(str, enum.Enum):
    STABLE = "Stable"
    TRENDING = "Trending"
    EXPERIMENTAL = "Experimental"

class Tool(Base):
    __tablename__ = "tools"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    category = Column(String, index=True) # Frontend, Backend, AI, Database, etc.
    trust_score = Column(Float, default=50.0)
    trust_label = Column(String, default=TrustLabel.EXPERIMENTAL.value)
    official_url = Column(String, nullable=True)
    icon_url = Column(String, nullable=True)
    quote = Column(String, nullable=True)
    tags = Column(String, nullable=True) # Comma separated list of tags
