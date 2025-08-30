import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  MapPin, 
  Calendar,
  Search,
  Sparkles
} from 'lucide-react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I can help you find cars based on your budget. Just tell me how much you want to spend (in millions), and I\'ll search for available cars on Ouedkniss.',
      examples: [
        'I want a car for 300 million',
        'Show me cars around 500 million',
        'Bghit siyara b 400 million'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [startPage, setStartPage] = useState(1);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addMessage = (content, type = 'user') => {
    const newMessage = {
      id: Date.now(),
      type,
      content
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const searchCars = async (message, customStartPage = 1) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          pages: 5,
          start_page: customStartPage
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to search cars');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const handleSendMessage = async () => {
    const message = inputValue.trim();
    if (!message || isLoading) return;

    addMessage(message, 'user');
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await searchCars(message, 1);
      const { query, count, results: carResults } = response;
      let botMessage = '';
      if (query.message) {
        botMessage += `I found ${count} cars for your search: "${query.message}"\n\n`;
        botMessage += `Searching in price range: ${query.min} - ${query.max} million\n`;
        botMessage += `Pages searched: ${query.pages}`;
      } else {
        botMessage += `Found ${count} cars in the specified price range.`;
      }
      addMessage(botMessage, 'bot');

      let formattedResults = [];
      if (carResults && carResults.name && carResults.name.length > 0) {
        for (let i = 0; i < carResults.name.length; i++) {
          let displayPrice = carResults.price[i] || 'Price Not Available';
          if (displayPrice !== 'Price Not Available') {
            if (typeof displayPrice === 'number') {
              displayPrice = `${displayPrice} Million`;
            } else if (typeof displayPrice === 'string') {
              if (!displayPrice.toLowerCase().includes('million') && !displayPrice.toLowerCase().includes('m')) {
                displayPrice = `${displayPrice} Million`;
              }
            }
          }
          formattedResults.push({
            name: carResults.name[i] || 'Car Name Not Available',
            price: displayPrice,
            location: carResults.location[i] || 'Location Not Available',
            date: carResults.date[i] || 'Date Not Available',
            image: carResults.image ? carResults.image[i] : null,
            url: carResults.url ? carResults.url[i] : null
          });
        }
      }
      if (formattedResults.length > 0) {
        setResults(formattedResults);
        setShowResults(true);
        setStartPage(6); // next start page for load more
      } else {
        addMessage('Sorry, I couldn\'t find any cars matching your criteria. Try adjusting your budget or search terms.', 'bot');
      }
    } catch (error) {
      addMessage('Sorry, something went wrong. Please try again.', 'bot');
    } finally {
      setIsLoading(false);
    }
  };
  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const response = await searchCars(inputValue || messages[messages.length - 1].content, startPage);
      const { results: carResults } = response;
      let newResults = [];
      if (carResults && carResults.name && carResults.name.length > 0) {
        for (let i = 0; i < carResults.name.length; i++) {
          let displayPrice = carResults.price[i] || 'Price Not Available';
          if (displayPrice !== 'Price Not Available') {
            if (typeof displayPrice === 'number') {
              displayPrice = `${displayPrice} Million`;
            } else if (typeof displayPrice === 'string') {
              if (!displayPrice.toLowerCase().includes('million') && !displayPrice.toLowerCase().includes('m')) {
                displayPrice = `${displayPrice} Million`;
              }
            }
          }
          newResults.push({
            name: carResults.name[i] || 'Car Name Not Available',
            price: displayPrice,
            location: carResults.location[i] || 'Location Not Available',
            date: carResults.date[i] || 'Date Not Available',
            image: carResults.image ? carResults.image[i] : null,
            url: carResults.url ? carResults.url[i] : null
          });
        }
      }
      setResults(prev => [...prev, ...newResults]);
      setStartPage(prev => prev + 5);
    } catch (error) {
      addMessage('Sorry, something went wrong while loading more cars.', 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleExampleClick = (example) => {
    setInputValue(example);
    inputRef.current?.focus();
  };

  return (
    <div className="app">
      {/* Header */}
      <motion.header 
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <div className="logo">
            <Car className="logo-icon" />
            <h1>Car Price Scraper</h1>
          </div>
          <p className="subtitle">AI-powered car price extraction and search</p>
        </div>
      </motion.header>

      {/* Main Container */}
      <main className="main-container">
        <motion.div 
          className="chat-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-info">
              <Bot className="chat-icon" />
              <h2>Car Price Assistant</h2>
            </div>
            <div className="status">
              <div className={`status-dot ${isLoading ? 'loading' : 'ready'}`} />
              <span className="status-text">
                {isLoading ? 'Processing...' : 'Ready'}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="messages-container">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.type}-message`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-avatar">
                    {message.type === 'bot' ? <Bot /> : <User />}
                  </div>
                  <div className="message-content">
                    <p>{message.content}</p>
                    {message.examples && (
                      <div className="examples">
                        <p className="examples-title">Try these examples:</p>
                        <div className="examples-list">
                          {message.examples.map((example, index) => (
                            <button
                              key={index}
                              className="example-button"
                              onClick={() => handleExampleClick(example)}
                            >
                              {example}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                className="loading-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="message-avatar">
                  <Bot />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <Loader2 className="spinner" />
                    <span>Searching for cars...</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Results Section */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                className="results-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="results-header">
                  <h3>
                    <Search className="results-icon" />
                    Found Cars
                  </h3>
                  <div className="results-count">
                    {results.length} cars found
                  </div>
                </div>
                <div className="cars-grid">
                  <AnimatePresence>
                   {results.map((car, index) => (
  <motion.div
    key={index}
    className="car-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <a
      href={car.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="car-image-link"
      style={{ display: 'block', marginBottom: '8px' }}
    >
      <img
        src={car.image || "https://cdn.ouedkniss.com/app/img/services.7cf4c4fd.svg"}
        alt={car.name}
        className="car-image"
        style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' }}
      />
    </a>
    <div className="car-header">
      <h4 className="car-name">{car.name || 'Car Name Not Available'}</h4>
      <div className="car-price">{car.price}</div>
    </div>
    <div className="car-details">
      <div className="car-location">
        <MapPin className="detail-icon" />
        <span>{car.location || 'Location Not Available'}</span>
      </div>
      <div className="car-date">
        <Calendar className="detail-icon" />
        <span>{car.date || 'Date Not Available'}</span>
      </div>
    </div>
  </motion.div>
))}
                  </AnimatePresence>
                </div>
                <div style={{ textAlign: 'center', margin: '24px 0' }}>
                  <button
                    className="load-more-button"
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    style={{
                      padding: '10px 24px',
                      fontSize: '1rem',
                      borderRadius: '6px',
                      background: '#007bff',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {isLoading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Section */}
          <div className="input-section">
            <div className="input-container">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell me your budget (e.g., 'I want a car for 300 million')"
                disabled={isLoading}
                className="message-input"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="send-button"
              >
                {isLoading ? <Loader2 className="spinner" /> : <Send />}
              </button>
            </div>
            <div className="input-hint">
              <Sparkles className="hint-icon" />
              <span>You can also specify price range manually or ask for recommendations</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p>Powered by Gemini AI & Ouedkniss Scraper</p>
      </motion.footer>
    </div>
  );
};

export default App;
