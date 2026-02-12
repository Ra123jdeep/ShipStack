from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from app.core.database import get_db
from app.models.analytics_event import AnalyticsEvent
from app.models.tool import Tool
from app.models.user import User
from app.schemas.analytics import AnalyticsEventCreate, AnalyticsStats
from typing import List, Any
import datetime

router = APIRouter()

@router.post("/track", response_model=dict)
def track_event(event: AnalyticsEventCreate, db: Session = Depends(get_db)):
    db_event = AnalyticsEvent(
        event_type=event.event_type,
        tool_id=event.tool_id,
        event_metadata=event.event_metadata
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return {"status": "success", "event_id": db_event.id}

@router.get("/stats", response_model=AnalyticsStats)
def get_stats(db: Session = Depends(get_db)):
    # Total Clicks
    total_clicks = db.query(AnalyticsEvent).filter(AnalyticsEvent.event_type == "click").count()
    
    # Total Stacks Generated
    total_stacks = db.query(AnalyticsEvent).filter(AnalyticsEvent.event_type == "stack_generation").count()
    
    # Active Builders - Count registered users
    active_builders = db.query(User).count()
    if active_builders == 0:
        active_builders = 1 # Minimal count for the current visitor

    # Top Tools
    top_tools_query = db.query(
        AnalyticsEvent.tool_id, 
        func.count(AnalyticsEvent.id).label("count")
    ).filter(
        AnalyticsEvent.event_type == "click",
        AnalyticsEvent.tool_id != None
    ).group_by(
        AnalyticsEvent.tool_id
    ).order_by(
        desc("count")
    ).limit(5).all()

    top_tools = []
    for tool_id, count in top_tools_query:
        tool = db.query(Tool).filter(Tool.id == tool_id).first()
        if tool:
            top_tools.append({
                "name": tool.name,
                "count": count,
                "trend": "+5%", # Placeholder trend logic
                "trendUp": True
            })

    # Recent Events
    recent_events_query = db.query(AnalyticsEvent).order_by(
        desc(AnalyticsEvent.timestamp)
    ).limit(10).all()
    
    recent_events = []
    for event in recent_events_query:
        event_text = ""
        icon_type = "activity"
        color = "text-gray-400"
        
        if event.event_type == "click":
            tool = db.query(Tool).filter(Tool.id == event.tool_id).first()
            tool_name = tool.name if tool else "Unknown Tool"
            event_text = f"Builder explored '{tool_name}'"
            icon_type = "click"
            color = "text-blue-400"
        elif event.event_type == "stack_generation":
             event_text = "New stack generated"
             icon_type = "stack"
             color = "text-purple-400"
             
        recent_events.append({
            "id": event.id,
            "text": event_text,
            "time": event.timestamp.isoformat(),
            "type": icon_type,
            "color": color
        })

    return {
        "total_clicks": total_clicks,
        "total_stacks": total_stacks,
        "active_builders": active_builders,
        "top_tools": top_tools,
        "recent_events": recent_events
    }
