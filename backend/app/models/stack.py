from sqlalchemy import Column, Integer, String, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base

class Stack(Base):
    __tablename__ = "stacks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    user_type = Column(String) # Student, Startup, etc.
    
    # Storing the stack components as JSON for flexibility
    # Structure: {"frontend": "Next.js", "backend": "FastAPI", "database": "PostgreSQL"}
    components = Column(JSON) 
    
    generated_reasoning = Column(String)
    trust_score = Column(Float)
