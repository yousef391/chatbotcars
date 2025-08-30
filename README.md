# Car Price Scraper - React Website

A beautiful, modern React application for the AI-powered car price scraper that uses Gemini AI to extract prices from natural language and searches Ouedkniss for available cars.

## 🚀 Features

- **🤖 AI-Powered Price Extraction**: Uses Google's Gemini AI to understand natural language in Darija, French, and Arabic
- **🚗 Real-time Car Search**: Searches Ouedkniss for cars within your budget range
- **💬 Modern Chatbot Interface**: Natural conversation flow with smooth animations
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🎨 Beautiful UI**: Modern design with Framer Motion animations and Lucide React icons
- **⚡ Fast Performance**: Optimized React components with efficient state management

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons
- **CSS3** - Modern styling with gradients and glass morphism
- **FastAPI** - Backend API with CORS support

## 📦 Installation

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+ with pip
- FastAPI backend running (see main.py)

### Setup

1. **Install React dependencies:**
   ```bash
   cd website
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Start the FastAPI backend:**
   ```bash
   # In the root directory
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Open the application:**
   - React dev server: http://localhost:3000
   - FastAPI backend: http://localhost:8000

## 🏗️ Project Structure

```
website/
├── public/
│   └── index.html          # Main HTML template
├── src/
│   ├── App.js              # Main React component
│   ├── App.css             # Component styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🎯 Usage

### For Users

1. **Open the website** in your browser
2. **Type your budget** in natural language:
   - "I want a car for 300 million"
   - "Show me cars around 500 million"
   - "Bghit siyara b 400 million" (Darija)
3. **Press Enter** or click the send button
4. **View results** in beautiful car cards below

### For Developers

#### Adding New Features

1. **New Components**: Create in `src/components/`
2. **Styling**: Use CSS modules or add to `App.css`
3. **Animations**: Use Framer Motion for smooth transitions
4. **Icons**: Import from `lucide-react`

#### Customizing the UI

- **Colors**: Update CSS custom properties in `App.css`
- **Animations**: Modify Framer Motion variants
- **Layout**: Adjust grid and flexbox properties
- **Icons**: Replace Lucide React icons

## 🔧 Configuration

### API Configuration

The React app automatically proxies API calls to the FastAPI backend. Update the proxy in `package.json` if needed:

```json
{
  "proxy": "http://localhost:8000"
}
```

### Environment Variables

Create a `.env` file for environment-specific settings:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_TITLE=Car Price Scraper
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px-1199px (adjusted layout)
- **Mobile**: <768px (mobile-optimized)

## 🎨 Design System

### Colors
- **Primary**: `#667eea` to `#764ba2` (gradient)
- **Secondary**: `#f093fb` to `#f5576c` (gradient)
- **Success**: `#4ade80`
- **Warning**: `#fbbf24`
- **Error**: `#ef4444`

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Animations
- **Duration**: 0.2s-0.6s
- **Easing**: ease-in-out
- **Library**: Framer Motion

## 🚀 Deployment

### Development Build

```bash
npm run build
```

### Production Deployment

1. **Build the React app:**
   ```bash
   npm run build
   ```

2. **Deploy to platforms:**
   - **Vercel** (recommended): Connect GitHub repo
   - **Netlify**: Drag and drop `build` folder
   - **GitHub Pages**: Use `gh-pages` package
   - **AWS S3**: Upload `build` contents

3. **Update API URL** for production in your deployment platform

### Docker Deployment

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🔍 Performance Optimization

- **Code Splitting**: React.lazy() for route-based splitting
- **Memoization**: React.memo() for expensive components
- **Bundle Analysis**: `npm run build --analyze`
- **Image Optimization**: Use WebP format and lazy loading

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure FastAPI has CORS middleware
2. **API Connection**: Check proxy configuration in package.json
3. **Build Errors**: Clear node_modules and reinstall
4. **Styling Issues**: Check CSS import order

### Debug Mode

```bash
# Enable React DevTools
npm start

# Check console for errors
# Use React DevTools browser extension
```

## 📈 Performance Metrics

- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **First Input Delay**: <100ms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **Inter Font** for typography
- **Google Gemini AI** for price extraction

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the FastAPI backend documentation

---

**Happy coding! 🚗✨**
