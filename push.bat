@echo off
echo Initializing Git...
git init

echo Adding files...
git add .

echo Committing...
git commit -m "Initial commit for Vercel deployment"

echo Adding remote origin...
git remote add origin https://github.com/Ra123jdeep/ShipStack.git

echo Pushing to GitHub...
git push -u origin main

echo Done!
pause
