from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class OTPRequest(BaseModel):
    email: EmailStr

class OTPVerify(BaseModel):
    email: EmailStr
    code: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None

class User(UserBase):
    id: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
