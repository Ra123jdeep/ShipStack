from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.stack import Stack
from app.schemas.stack import Stack as StackSchema, StackCreate, StackGenerateRequest
import random

router = APIRouter()

@router.post("/", response_model=StackSchema)
def create_stack(stack: StackCreate, db: Session = Depends(get_db)):
    db_stack = Stack(**stack.dict())
    db.add(db_stack)
    db.commit()
    db.refresh(db_stack)
    return db_stack

@router.get("/", response_model=List[StackSchema])
def read_stacks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    stacks = db.query(Stack).offset(skip).limit(limit).all()
    return stacks

@router.post("/generate", response_model=StackSchema)
def generate_stack(request: StackGenerateRequest, db: Session = Depends(get_db)):
    # Simulation of AI Logic (Replace with LLM later)
    
    # 1. Analyze intent (keyword matching)
    desc = request.description.lower()
    
    desc = request.description.lower()
    
    # 1. Define Templates with Scores
    templates = {
        # --- AI & Data Science ---
        "AI RAG Stack": {
            "keywords": ["ai ", " rag", "chatbot", "llm", "gpt", "model", "training", "hugging face", "vector", "embedding", "assistant"],
            "components": {
                "frontend": "Next.js",
                "backend": "FastAPI (Python)",
                "vector_db": "Pinecone",
                "llm": "OpenAI / LangChain"
            },
            "base_reasoning": "High performance in AI applications and Python ecosystem compatibility."
        },
        "Computer Vision Stack": {
            "keywords": ["vision", "image", "recognition", "detection", "yolo", "opencv", "camera", "video processing", "face"],
            "components": {
                "processing": "OpenCV / YOLO",
                "backend": "FastAPI (Python)",
                "frontend": "React",
                "storage": "S3 / MinIO"
            },
            "base_reasoning": "Standard tools for image processing and high-performance inference."
        },
        "Predictive Analytics Stack": {
            "keywords": ["predict", "prediction", "forecast", "regression", "analytics", "data science", "heart", "disease", "stock", "pandas", "sklearn"],
            "components": {
                "model": "Scikit-learn / XGBoost",
                "backend": "FastAPI",
                "visualization": "Streamlit / Dash",
                "data": "Pandas"
            },
            "base_reasoning": "Optimized for serving ML models and visualizing data insights."
        },
        "NLP & Text Stack": {
            "keywords": ["nlp", "text", "sentiment", "translation", "language", "spacy", "nltk", "summary"],
            "components": {
                "nlp_engine": "Hugging Face / spaCy",
                "backend": "FastAPI",
                "frontend": "Streamlit",
                "database": "Redis (Caching)"
            },
            "base_reasoning": "Specialized for text processing and natural language understanding tasks."
        },
        "Big Data Pipeline": {
            "keywords": ["big data", "pipeline", "etl", "spark", "hadoop", "processing", "batch", "stream"],
            "components": {
                "processing": "Apache Spark",
                "streaming": "Kafka",
                "storage": "Data Lake / Warehouse",
                "orchestration": "Airflow"
            },
            "base_reasoning": "Scalable architecture for handling massive datasets."
        },

        # --- Web Development ---
        "Modern Web Stack": {
            "keywords": ["website", "landing", "page", "portfolio", "blog", "content"],
            "components": {
                "frontend": "Next.js / Astro",
                "styling": "Tailwind CSS",
                "deployment": "Vercel",
                "cms": "Sanity / Strapi"
            },
            "base_reasoning": "Best for performance, SEO, and developer experience."
        },
        "SaaS Starter Stack": {
            "keywords": ["saas", "hacker", "mvp", "startup", "billing", "subscription", "b2b", "product", "service"],
            "components": {
                "frontend": "Next.js",
                "backend": "Node.js (Express)",
                "database": "PostgreSQL",
                "auth": "Supabase"
            },
            "base_reasoning": "Rapid development, authentication, and scalability for SaaS products."
        },
        "E-Commerce Stack": {
            "keywords": ["shop", "store", "commerce", "cart", "payment", "marketplace", "goods", "selling", "retail"],
            "components": {
                "frontend": "Next.js (App Router)",
                "backend": "MedusaJS / Shopify API",
                "database": "PostgreSQL",
                "payments": "Stripe"
            },
            "base_reasoning": "Robust product management and secure payment processing."
        },
        "Real-Time Social Stack": {
            "keywords": ["social", "chat", "messaging", "real-time", "socket", "live", "stream", "collaboration", "community", "forum"],
            "components": {
                "frontend": "React / React Native",
                "backend": "Go (Gin) / Node.js",
                "database": "ScyllaDB / Cassandra",
                "realtime": "WebSocket / Socket.io"
            },
            "base_reasoning": "High concurrency and real-time message delivery."
        },
        "Geo-Spatial Stack": {
            "keywords": ["map", "weather", "location", "gps", "tracking", "navigation", "delivery", "uber", "gis"],
            "components": {
                "frontend": "React (Vite)",
                "backend": "Django (GeoDjango)",
                "api": "Google Maps / OpenWeather",
                "cache": "Redis"
            },
            "base_reasoning": "Handling geo-spatial data and external API integrations efficiently."
        },

        # --- Mobile & App ---
        "Cross-Platform Mobile": {
            "keywords": ["mobile", "app", "ios", "android", "iphone", "phone", "tablet", "native"],
            "components": {
                "framework": "React Native / Flutter",
                "backend": "Firebase / Supabase",
                "api": "Node.js",
                "auth": "OAuth"
            },
            "base_reasoning": "Code reusability across iOS and Android with near-native performance."
        },
        "PWA Stack": {
            "keywords": ["pwa", "progressive", "offline", "web app", "installable"],
            "components": {
                "frontend": "React + Vite",
                "caching": "Service Workers",
                "storage": "IndexedDB",
                "backend": "Serverless Functions"
            },
            "base_reasoning": "Web capabilities with app-like experience and offline support."
        },

        # --- Enterprise & B2B ---
        "Enterprise / FinTech Stack": {
            "keywords": ["banking", "finance", "railway", "enterprise", "system", "logistics", "secure", "transactions", "crm", "erp", "scale", "insurance"],
            "components": {
                "frontend": "Angular",
                "backend": "Java (Spring Boot)",
                "database": "PostgreSQL (Enterprise)",
                "messaging": "Kafka"
            },
            "base_reasoning": "Maximum stability, type safety, and microservices readiness."
        },
        "Internal Tooling Stack": {
            "keywords": ["internal", "tool", "dashboard", "admin", "backoffice", "employee", "management"],
            "components": {
                "frontend": "Retool / Appsmith",
                "backend": "Python / Node Scrips",
                "database": "PostgreSQL",
                "auth": "SSO (Okta)"
            },
            "base_reasoning": "Rapid creation of CRUD interfaces and admin panels."
        },

        # --- Blockchain & Web3 ---
        "Web3 DApp Stack": {
            "keywords": ["blockchain", "crypto", "nft", "web3", "wallet", "decentralized", "token", "smart contract", "solidity"],
            "components": {
                "frontend": "Next.js + RainbowKit",
                "blockchain": "Ethereum / Polygon",
                "contract": "Solidity (Hardhat)",
                "library": "Ethers.js / Viem"
            },
            "base_reasoning": "Standard stack for decentralized applications and wallet integration."
        },
        "DeFi Stack": {
            "keywords": ["defi", "finance", "exchange", "dex", "swap", "yield", "staking"],
            "components": {
                "frontend": "React",
                "indexer": "The Graph",
                "oracle": "Chainlink",
                "contract": "Solidity"
            },
            "base_reasoning": "Reliable data indexing and secure smart contract interaction."
        },

        # --- IoT & Hardware ---
        "IoT Stack": {
            "keywords": ["iot", "hardware", "sensor", "arduino", "raspberry", "pi", "embedded", "device", "home automation"],
            "components": {
                "device": "C++ / MicroPython",
                "communication": "MQTT / Zigbee",
                "backend": "Node-RED / Python",
                "platform": "Home Assistant"
            },
            "base_reasoning": "Lightweight communication and device management."
        },

        # --- Game Development ---
        "Web Game Stack": {
            "keywords": ["game", "gaming", "3d", "2d", "unity", "webgl", "browser game"],
            "components": {
                "engine": "Three.js / Phaser",
                "backend": "Colyseus (Node.js)",
                "physics": "Cannon.js",
                "database": "Redis (Leaderboards)"
            },
            "base_reasoning": "Low-latency multiplayer networking and 3D rendering in browser."
        },

        # --- Desktop ---
        "Desktop App Stack": {
            "keywords": ["desktop", "windows", "mac", "linux", "electron", "application", "exe", "dmg"],
            "components": {
                "framework": "Electron / Tauri",
                "frontend": "React",
                "backend": "Rust / Node.js",
                "database": "SQLite"
            },
            "base_reasoning": "Cross-platform desktop distribution with web technologies."
        },

        # --- DevOps ---
        "Serverless Stack": {
            "keywords": ["serverless", "function", "lambda", "cloud", "aws", "scale"],
            "components": {
                "compute": "AWS Lambda",
                "gateway": "API Gateway",
                "db": "DynamoDB",
                "iac": "Terraform / SST"
            },
            "base_reasoning": "Zero infrastructure management and auto-scaling."
        },
        "Microservices Stack": {
            "keywords": ["microservices", "kubernetes", "k8s", "docker", "cluster", "distributed"],
            "components": {
                "orchestration": "Kubernetes",
                "mesh": "Istio",
                "services": "Go / Python",
                "tracing": "Jaeger"
            },
            "base_reasoning": "Scalable governance for complex distributed systems."
        },

        # --- Healthcare ---
        "Telemedicine Stack": {
            "keywords": ["telemedicine", "health", "doctor", "patient", "medical", "hipaa", "clinic"],
            "components": {
                "video": "WebRTC / Twilio",
                "backend": "Node.js (Compliance)",
                "database": "PostgreSQL (Encrypted)",
                "auth": "Auth0 (HIPAA)"
            },
            "base_reasoning": "Secure, compliant real-time video and data handling."
        },

        # --- Education ---
        "EdTech Stack": {
            "keywords": ["education", "lms", "school", "learning", "course", "quiz", "student", "teacher"],
            "components": {
                "frontend": "React",
                "backend": "Django",
                "cms": "Wagtail",
                "video": "Mux (Streaming)"
            },
            "base_reasoning": "Content management and structured learning paths."
        },

         # --- Media ---
        "Media Streaming Stack": {
            "keywords": ["video", "stream", "music", "audio", "spotify", "netflix", "youtube", "podcast"],
            "components": {
                "storage": "S3 / CDN",
                "transcoding": "FFmpeg",
                "player": "Video.js",
                "backend": "Go"
            },
            "base_reasoning": "High-throughput data delivery and media processing."
        },

         # --- Privacy ---
        "Privacy-First Stack": {
            "keywords": ["privacy", "secure", "encrypted", "e2e", "secret", "vpn", "tor"],
            "components": {
                "encryption": "Signal Protocol",
                "backend": "Rust",
                "storage": "IPFS",
                "client": "Native (C++/Rust)"
            },
            "base_reasoning": "Maximum data security and end-to-end encryption."
        }
    }

    # 2. Score the input against templates
    best_match = "Modern Web Stack"
    highest_score = 0
    selected_template = None

    for name, tmpl in templates.items():
        score = 0
        for keyword in tmpl["keywords"]:
            if keyword in desc:
                score += 1
        
        # Bonus for exact word matches (naive boundary check)
        for word in desc.split():
            if word in tmpl["keywords"]:
                score += 2

        if score > highest_score:
            highest_score = score
            best_match = name
            selected_template = tmpl

    # 3. Construct Response
    stack_name = best_match
    components = {}
    reasoning = "Based on your project description, "

    if selected_template:
        components = selected_template["components"]
        reasoning += f"we selected the {stack_name}. "
        reasoning += selected_template["base_reasoning"]
    else:
        # Default Logic if no strong match
        stack_name = "Modern Web Stack"
        components = {
            "frontend": "React",
            "backend": "Python (FastAPI)",
            "database": "PostgreSQL"
        }
        reasoning += "we recommend a robust, general-purpose stack known for reliability and community support."

    # 2. Adjust for user profile
    if request.user_profile == "Student":
        components["deployment"] = "Vercel (Free Tier)"
        components["database"] = "Supabase (Free Tier)"
        reasoning += " Optimized for free tier usage."
    elif request.user_profile == "Startup Founder":
        components["deployment"] = "AWS / Vercel Pro"
        reasoning += " Optimized for scalability and reliability."

    # 3. Create Stack Object (not saving to DB yet, just returning)
    generated_stack = StackSchema(
        id=random.randint(1000, 9999),
        name=stack_name,
        description=f"Generated stack for: {request.description}",
        user_type=request.user_profile,
        components=components,
        generated_reasoning=reasoning,
        trust_score=random.randint(85, 99)
    )
    
    return generated_stack
