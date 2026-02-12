from pydantic import BaseModel
from typing import Optional, Dict, Any

class StackBase(BaseModel):
    name: str
    description: Optional[str] = None
    user_type: str
    components: Dict[str, Any]
    generated_reasoning: Optional[str] = None
    trust_score: float = 0.0

class StackCreate(StackBase):
    pass

class StackGenerateRequest(BaseModel):
    description: str
    user_profile: str = "Startup Founder" # Student, Indie Hacker, ML Engineer

class Stack(StackBase):
    id: int

    class Config:
        from_attributes = True
