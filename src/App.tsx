import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import { initialGlobalState, initialSessionState } from './store/module';
import NotFound from './pages/NotFound';
import Analytics from './pages/Analytics'
import 'highlight.js/styles/github.css';

function App() {
  initialGlobalState();
  initialSessionState();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Analytics" element={<Analytics />} />
        
      </Routes>
    </Router>
  );
}

export default App;
