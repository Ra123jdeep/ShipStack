# Start Backend
Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "cd backend; ..\.venv\Scripts\python -m uvicorn app.main:app --reload"

# Start Frontend
Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
