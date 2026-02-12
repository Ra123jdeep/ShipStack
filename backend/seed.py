from app.core.database import SessionLocal, engine, Base
from app.models.tool import Tool, TrustLabel
from app.models.stack import Stack
from sqlalchemy import text

# Drop tables to ensure schema update (for dev only)
try:
    Base.metadata.drop_all(bind=engine)
    print("Dropped all tables.")
except Exception as e:
    print(f"Error dropping tables: {e}")

# Create tables
Base.metadata.create_all(bind=engine)
print("Created all tables.")

def seed():
    db = SessionLocal()
    
    # Clear existing data to ensure fresh seed
    db.query(Tool).delete()
    db.commit()
    print("Cleared existing tools.")

    tools = [
        Tool(name="FastAPI", description="Modern, fast (high-performance), web framework for building APIs with Python.", category="APIs & Services", trust_score=98.0, trust_label=TrustLabel.STABLE.value, official_url="https://fastapi.tiangolo.com", quote="The gold standard for Python APIs. Fast, easy, and production-ready by default.", tags="#python,#api,#backend"),
        Tool(name="Next.js", description="The React Framework for the Web.", category="Frontend Frameworks", trust_score=99.0, trust_label=TrustLabel.STABLE.value, official_url="https://nextjs.org", quote="The best way to build React apps. It just works, at any scale.", tags="#react,#frontend,#fullstack"),
        Tool(name="PostgreSQL", description="The World's Most Advanced Open Source Relational Database.", category="Databases", trust_score=97.0, trust_label=TrustLabel.STABLE.value, official_url="https://www.postgresql.org", quote="Reliable, robust, and feature-rich. The default choice for modern apps.", tags="#database,#sql,#infrastructure"),
        Tool(name="LangChain", description="Building applications with LLMs through composability.", category="AI/ML", trust_score=92.0, trust_label=TrustLabel.TRENDING.value, official_url="https://www.langchain.com", quote="The fastest way to go from idea to LLM application.", tags="#ai,#llm,#python"),
        Tool(name="Pinecone", description="The vector database for long-term memory for AI.", category="Databases", trust_score=89.0, trust_label=TrustLabel.TRENDING.value, official_url="https://www.pinecone.io", quote="Vector search made easy. Essential for RAG applications.", tags="#vector-db,#ai,#search"),
        Tool(name="Ollama", description="Get up and running with large language models, locally.", category="AI/ML", trust_score=85.0, trust_label=TrustLabel.EXPERIMENTAL.value, official_url="https://ollama.com", quote="Run Llama 3 locally in seconds. A game changer for local AI dev.", tags="#local-ai,#llm,#inference"),
        Tool(name="Supabase", description="The open source Firebase alternative.", category="Databases", trust_score=95.0, trust_label=TrustLabel.STABLE.value, official_url="https://supabase.com", quote="Build in a weekend, scale to millions. The best backend-as-a-service.", tags="#baas,#postgres,#realtime"),
        Tool(name="TailwindCSS", description="Rapidly build modern websites without ever leaving your HTML.", category="UI Kits", trust_score=96.0, trust_label=TrustLabel.STABLE.value, official_url="https://tailwindcss.com", quote="Once you use it, you can't go back. Styling prescience at its finest.", tags="#css,#ui,#productivity"),
        Tool(name="Framer Motion", description="A production-ready motion library for React.", category="UI Kits", trust_score=94.0, trust_label=TrustLabel.STABLE.value, official_url="https://www.framer.com/motion", quote="Animation logic that actually makes sense. Smooth, declarative power.", tags="#animation,#react,#ui"),
        Tool(name="Vercel", description="Zero-config frontend deployment platform", category="Deployment Tools", trust_score=99.0, trust_label=TrustLabel.STABLE.value, official_url="https://vercel.com", quote="Develop, Preview, Ship. The best frontend developer experience, period.", tags="#deployment,#serverless,#git"),
        Tool(name="Clerk", description="Complete user management and authentication for Next.js.", category="Auth", trust_score=96.0, trust_label=TrustLabel.STABLE.value, official_url="https://clerk.com", quote="Auth that doesn't hurt. Drop-in components that look great.", tags="#auth,#security,#user-mgmt"),
        Tool(name="Stripe", description="Financial infrastructure for the internet.", category="Monetization", trust_score=99.0, trust_label=TrustLabel.STABLE.value, official_url="https://stripe.com", quote="The API for the internet economy. Developer experience is unmatched.", tags="#payments,#fintech,#api"),
        Tool(name="Zapier", description="Automate your workflow by connecting your apps.", category="Automation", trust_score=95.0, trust_label=TrustLabel.STABLE.value, official_url="https://zapier.com", quote="Connects everything to everything. The glue of the internet.", tags="#automation,#workflow,#integration"),
        Tool(name="PostHog", description="The open source product analytics platform.", category="Analytics", trust_score=93.0, trust_label=TrustLabel.TRENDING.value, official_url="https://posthog.com", quote="All the tools you need to build better products, in one suite.", tags="#analytics,#product,#oss"),
        Tool(name="Resend", description="Email for developers. The best API to reach humans.", category="Communication", trust_score=94.0, trust_label=TrustLabel.TRENDING.value, official_url="https://resend.com", quote="Email API explicitly designed for developers. It's actually a joy to use.", tags="#email,#communication,#dev-tool"),
        # New Tools
        Tool(name="Shadcn UI", description="Beautifully designed components that you can copy and paste into your apps.", category="UI Kits", trust_score=98.0, trust_label=TrustLabel.TRENDING.value, official_url="https://ui.shadcn.com", quote="Not a component library. It's a collection of re-usable components.", tags="#ui,#react,#tailwind"),
        Tool(name="tRPC", description="End-to-end typesafe APIs made easy.", category="APIs & Services", trust_score=93.0, trust_label=TrustLabel.STABLE.value, official_url="https://trpc.io", quote="Move fast and break nothing. End-to-end type safety without codegen.", tags="#typescript,#api,#fullstack"),
        Tool(name="Prisma", description="Next-generation Node.js and TypeScript ORM.", category="Databases", trust_score=96.0, trust_label=TrustLabel.STABLE.value, official_url="https://www.prisma.io", quote="Databases made easy. The best ORM for Node.js and TypeScript.", tags="#orm,#database,#typescript"),
        Tool(name="Zod", description="TypeScript-first schema declaration and validation library.", category="APIs & Services", trust_score=97.0, trust_label=TrustLabel.STABLE.value, official_url="https://zod.dev", quote="Designed to be as developer-friendly as possible. Type inference is magic.", tags="#typescript,#validation,#schema"),
        Tool(name="Bun", description="Incredibly fast JavaScript runtime, bundler, test runner, and package manager.", category="Deployment Tools", trust_score=88.0, trust_label=TrustLabel.TRENDING.value, official_url="https://bun.sh", quote="Develop, test, run, and bundle JavaScript & TypeScript projects—all in Bun.", tags="#runtime,#javascript,#performance"),
        Tool(name="Hono", description="Ultrafast web framework for the Edges.", category="Backend Frameworks", trust_score=90.0, trust_label=TrustLabel.TRENDING.value, official_url="https://hono.dev", quote="Fast, lightweight, web-standard. Runs on any runtime.", tags="#web-framework,#edge,#typescript"),
        Tool(name="Astro", description="The web framework for content-driven websites.", category="Frontend Frameworks", trust_score=94.0, trust_label=TrustLabel.STABLE.value, official_url="https://astro.build", quote="Build faster websites with less client-side JavaScript.", tags="#static-site,#frontend,#performance"),
        Tool(name="Remix", description="Focused on web standards and modern web app UX.", category="Frontend Frameworks", trust_score=92.0, trust_label=TrustLabel.STABLE.value, official_url="https://remix.run", quote="Build better websites. Say goodbye to loading spinners.", tags="#react,#fullstack,#web-standards"),
        Tool(name="SvelteKit", description="Web development, streamlined.", category="Frontend Frameworks", trust_score=91.0, trust_label=TrustLabel.STABLE.value, official_url="https://kit.svelte.dev", quote="Rapidly develop robust, performant web applications using Svelte.", tags="#svelte,#frontend,#fullstack"),
        Tool(name="Vue.js", description="The Progressive JavaScript Framework.", category="Frontend Frameworks", trust_score=95.0, trust_label=TrustLabel.STABLE.value, official_url="https://vuejs.org", quote="An approachable, performant and versatile framework for building web UIs.", tags="#frontend,#javascript,#ui"),
        Tool(name="Linear", description="A better way to build products.", category="Productivity", trust_score=96.0, trust_label=TrustLabel.STABLE.value, official_url="https://linear.app", quote="The issue tracker you'll actually enjoy using. Fast and fluid.", tags="#issue-tracking,#project-mgmt,#design"),
        Tool(name="Raycast", description="Your shortcut to everything.", category="Productivity", trust_score=98.0, trust_label=TrustLabel.STABLE.value, official_url="https://www.raycast.com", quote="A blazingly fast, extendable launcher. It replaces Spotlight.", tags="#productivity,#mac,#tools"),
        Tool(name="Excalidraw", description="Virtual whiteboard for sketching hand-drawn like diagrams.", category="Productivity", trust_score=95.0, trust_label=TrustLabel.STABLE.value, official_url="https://excalidraw.com", quote="Collaborative whiteboard that feels like writing on paper.", tags="#whiteboard,#design,#collaboration"),
        Tool(name="Docker", description="Accelerate how you build, share, and run applications.", category="Deployment Tools", trust_score=99.0, trust_label=TrustLabel.STABLE.value, official_url="https://www.docker.com", quote="The de facto standard for building and sharing containerized apps.", tags="#containers,#devops,#infrastructure"),
        Tool(name="Kubernetes", description="Production-Grade Container Orchestration.", category="Deployment Tools", trust_score=98.0, trust_label=TrustLabel.STABLE.value, official_url="https://kubernetes.io", quote="Automated container deployment, scaling, and management.", tags="#orchestration,#containers,#scale"),
        Tool(name="Terraform", description="Automate infrastructure on any cloud.", category="Deployment Tools", trust_score=94.0, trust_label=TrustLabel.STABLE.value, official_url="https://www.terraform.io", quote="Infrastructure as Code. Provision and manage any cloud, infrastructure, or service.", tags="#iac,#infrastructure,#cloud"),
        Tool(name="Redis", description="The open source, in-memory data store.", category="Databases", trust_score=97.0, trust_label=TrustLabel.STABLE.value, official_url="https://redis.io", quote="The world's fastest in-memory database. Cache, vector database, and more.", tags="#cache,#database,#performance"),
        Tool(name="MongoDB", description="The developer data platform.", category="Databases", trust_score=93.0, trust_label=TrustLabel.STABLE.value, official_url="https://www.mongodb.com", quote="A document database with the scalability and flexibility that you want.", tags="#nosql,#database,#json"),
        Tool(name="Neo4j", description="The world's leading graph database.", category="Databases", trust_score=89.0, trust_label=TrustLabel.STABLE.value, official_url="https://neo4j.com", quote="Find hidden patterns and relationships in your data.", tags="#graph-db,#database,#relationships"),
        Tool(name="ClickHouse", description="Fast Open-Source OLAP DBMS.", category="Databases", trust_score=91.0, trust_label=TrustLabel.TRENDING.value, official_url="https://clickhouse.com", quote="Real-time analytics for your app. Blazingly fast.", tags="#analytics,#olap,#database"),
        Tool(name="Hugging Face", description="The AI community building the future.", category="AI/ML", trust_score=97.0, trust_label=TrustLabel.STABLE.value, official_url="https://huggingface.co", quote="The platform where the machine learning community collaborates.", tags="#ml,#models,#datasets"),
        Tool(name="OpenAI API", description="Power your apps with the latest AI models.", category="AI/ML", trust_score=98.0, trust_label=TrustLabel.STABLE.value, official_url="https://openai.com/api", quote="Access GPT-4 and other cutting-edge models via a simple API.", tags="#ai,#llm,#gpt"),
        Tool(name="Replicate", description="Run AI with an API. Scale effectively.", category="AI/ML", trust_score=92.0, trust_label=TrustLabel.TRENDING.value, official_url="https://replicate.com", quote="Run open-source models with one line of code.", tags="#ai,#inference,#gpu"),
        Tool(name="Midjourney", description="AI art generator.", category="AI/ML", trust_score=95.0, trust_label=TrustLabel.TRENDING.value, official_url="https://www.midjourney.com", quote="Create beautiful artwork using the power of AI.", tags="#generative-art,#images,#ai"),
        Tool(name="Stability AI", description="Open source generative AI models.", category="AI/ML", trust_score=91.0, trust_label=TrustLabel.TRENDING.value, official_url="https://stability.ai", quote="Building the foundation for open visual media.", tags="#stable-diffusion,#ai,#open-source"),
        Tool(name="Discord", description="A place to talk and hang out.", category="Communication", trust_score=96.0, trust_label=TrustLabel.STABLE.value, official_url="https://discord.com", quote="The home for communities and friends. Essential for dev communities.", tags="#chat,#community,#voice"),
        Tool(name="Slack", description="Made for people. Built for productivity.", category="Communication", trust_score=95.0, trust_label=TrustLabel.STABLE.value, official_url="https://slack.com", quote="Connect the right people, information, and tools. Get work done.", tags="#messaging,#work,#collaboration"),
        Tool(name="Notion", description="Your connected workspace.", category="Productivity", trust_score=97.0, trust_label=TrustLabel.STABLE.value, official_url="https://www.notion.so", quote="Write, plan, share, and get organized. The all-in-one workspace.", tags="#docs,#wiki,#notes"),
        Tool(name="Figma", description="The collaborative interface design tool.", category="Design", trust_score=99.0, trust_label=TrustLabel.STABLE.value, official_url="https://www.figma.com", quote="Design, prototype, and gather feedback all in one place.", tags="#design,#prototyping,#ui"),
        Tool(name="Storybook", description="Frontend workshop for building UI components and pages in isolation.", category="Frontend Frameworks", trust_score=94.0, trust_label=TrustLabel.STABLE.value, official_url="https://storybook.js.org", quote="Build UI components in isolation. Document and test them properly.", tags="#testing,#ui,#components"),
        Tool(name="Cypress", description="Fast, easy and reliable testing for anything that runs in a browser.", category="Testing", trust_score=93.0, trust_label=TrustLabel.STABLE.value, official_url="https://www.cypress.io", quote="The web has evolved. Finally, testing has too.", tags="#e2e,#testing,#javascript"),
        Tool(name="Jest", description="Delightful JavaScript Testing.", category="Testing", trust_score=95.0, trust_label=TrustLabel.STABLE.value, official_url="https://jestjs.io", quote="Zero config, snapshot testing, and great error messages.", tags="#testing,#unit-test,#javascript"),
        Tool(name="Vitest", description="Blazing Fast Unit Test Framework.", category="Testing", trust_score=92.0, trust_label=TrustLabel.TRENDING.value, official_url="https://vitest.dev", quote="A Vite-native unit test framework. It's fast, really fast.", tags="#testing,#vite,#javascript"),
        Tool(name="Auth0", description="Secure access for everyone. But not just anyone.", category="Auth", trust_score=94.0, trust_label=TrustLabel.STABLE.value, official_url="https://auth0.com", quote="Rapidly integrate authentication and authorization into your apps.", tags="#identity,#sso,#security"),
    ]

    for tool in tools:
        db.add(tool)
    
    db.commit()
    print("Seeded tools.")
    db.close()

if __name__ == "__main__":
    seed()
