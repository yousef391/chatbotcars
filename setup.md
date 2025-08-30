# React App Setup Guide

## Quick Fix for ESLint Error

The ESLint error you're seeing is because the React app needs proper initialization. Here's how to fix it:

### Step 1: Install Dependencies
```bash
cd website
npm install
```

### Step 2: Create Environment File
Create a file called `.env` in the `website` folder with this content:
```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_TITLE=Car Price Scraper
SKIP_PREFLIGHT_CHECK=true
```

### Step 3: Clear Cache and Reinstall
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### Step 4: Start the Development Server
```bash
npm start
```

## Alternative: Create New React App

If the above doesn't work, you can create a fresh React app:

```bash
# Create new React app
npx create-react-app car-scraper-website --template typescript

# Copy our files
cp src/App.js car-scraper-website/src/
cp src/App.css car-scraper-website/src/
cp src/index.css car-scraper-website/src/

# Install additional dependencies
cd car-scraper-website
npm install lucide-react framer-motion axios

# Start the app
npm start
```

## Troubleshooting

### If you still get ESLint errors:
1. Make sure you're in the `website` directory
2. Check that `react-scripts` is properly installed
3. Try running `npm start` with the `--ignore-engines` flag:
   ```bash
   npm start --ignore-engines
   ```

### If the app doesn't start:
1. Check that Node.js version is 16 or higher
2. Make sure all dependencies are installed
3. Try using a different port:
   ```bash
   PORT=3001 npm start
   ```

## Running Both Frontend and Backend

1. **Start the FastAPI backend:**
   ```bash
   # In the root directory
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Start the React frontend:**
   ```bash
   # In the website directory
   npm start
   ```

3. **Access the application:**
   - React app: http://localhost:3000
   - FastAPI backend: http://localhost:8000

## Common Issues and Solutions

### Issue: "react-scripts not found"
**Solution:**
```bash
npm install react-scripts
```

### Issue: "Cannot find module 'react'"
**Solution:**
```bash
npm install react react-dom
```

### Issue: "Port 3000 is already in use"
**Solution:**
```bash
# Use a different port
PORT=3001 npm start
```

### Issue: "Proxy error"
**Solution:**
Make sure the FastAPI backend is running on port 8000 before starting the React app.

## Development Workflow

1. **Backend changes:** The FastAPI server will auto-reload
2. **Frontend changes:** The React app will auto-reload
3. **API calls:** The React app proxies to `http://localhost:8000`

## Production Build

When ready to deploy:

```bash
# Build the React app
npm run build

# The build folder will contain the production files
# You can serve these with any static file server
```

## File Structure After Setup

```
website/
├── node_modules/          # Dependencies
├── public/
│   └── index.html         # HTML template
├── src/
│   ├── App.js            # Main React component
│   ├── App.css           # Component styles
│   ├── index.js          # React entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables
├── .eslintrc.js         # ESLint configuration
├── package.json         # Dependencies and scripts
├── setup.md            # This file
└── README.md           # Documentation
```

## Next Steps

Once the app is running:
1. Test the chatbot interface
2. Try searching for cars
3. Check that the API calls work
4. Customize the UI as needed

Happy coding! 🚗✨
