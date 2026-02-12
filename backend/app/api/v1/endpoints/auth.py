from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from app.api import deps
from app.core import security
from app.core.database import get_db
from app.models.user import User
from app.models.otp import OTP
from app.schemas.auth import OTPRequest, OTPVerify, Token, User as UserSchema, UserUpdate
import random
import string

router = APIRouter()

def generate_otp():
    return "".join(random.choices(string.digits, k=6))

@router.post("/request-otp")
def request_otp(data: OTPRequest, db: Session = Depends(get_db)):
    # 1. Generate OTP
    code = generate_otp()
    
    # 2. Store OTP
    # Check if OTP exists for email, delete old ones
    db.query(OTP).filter(OTP.email == data.email).delete()
    
    new_otp = OTP(
        email=data.email,
        code=code,
        expires_at=datetime.utcnow() 
        # TODO: Add expiration time (e.g. + 15 mins)
    )
    db.add(new_otp)
    db.commit()
    
    # 3. Send Email (Mock)
    print(f"========================================")
    print(f"LOGIN OTP FOR {data.email}: {code}")
    print(f"========================================")
    
    # Write to file for dev testing
    with open("d:/ShipStack/backend/otp_log.txt", "w") as f:
        f.write(code)
    
    return {"message": "OTP sent successfully"}

@router.post("/verify-otp", response_model=Token)
def verify_otp(data: OTPVerify, db: Session = Depends(get_db)):
    # 1. Verify Code
    otp_record = db.query(OTP).filter(OTP.email == data.email, OTP.code == data.code).first()
    if not otp_record:
        raise HTTPException(status_code=400, detail="Invalid OTP")
        
    # 2. Find or Create User
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        user = User(email=data.email)
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # 3. Generate Token
    access_token = security.create_access_token(data={"sub": str(user.id)})
    
    # 4. Clean up OTP
    db.delete(otp_record)
    db.commit()
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/me", response_model=UserSchema)
def read_users_me(current_user: User = Depends(deps.get_current_user)):
    return current_user

@router.patch("/users/me", response_model=UserSchema)
def update_user_me(
    data: UserUpdate,
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(get_db)
):
    if data.full_name:
        current_user.full_name = data.full_name
    if data.avatar_url:
        current_user.avatar_url = data.avatar_url
        
    db.commit()
    db.refresh(current_user)
    return current_user
