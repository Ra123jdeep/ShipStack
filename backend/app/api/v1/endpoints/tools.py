from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.tool import Tool
from app.schemas.tool import Tool as ToolSchema, ToolCreate

router = APIRouter()

@router.post("/", response_model=ToolSchema)
def create_tool(tool: ToolCreate, db: Session = Depends(get_db)):
    db_tool = Tool(**tool.dict())
    db.add(db_tool)
    db.commit()
    db.refresh(db_tool)
    return db_tool

@router.get("/", response_model=List[ToolSchema])
def read_tools(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tools = db.query(Tool).offset(skip).limit(limit).all()
    return tools

@router.get("/search", response_model=List[ToolSchema])
def search_tools(q: str, db: Session = Depends(get_db)):
    # Basic search for now, to be replaced with Vector Search later
    return db.query(Tool).filter(Tool.name.contains(q) | Tool.description.contains(q)).all()
