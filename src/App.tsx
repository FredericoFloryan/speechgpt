import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import { initialGlobalState, initialSessionState } from './store/module';
import NotFound from './pages/NotFound';
import Analytics from './pages/Analytics'
import Authentication from './pages/Authentication'
import Landing from './pages/Landing'
import 'highlight.js/styles/github.css';

function App() {
  initialGlobalState();
  initialSessionState();
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/Authentication" element={<Authentication />} />
        <Route path="/Home" element={<Home />} />
        
      </Routes>
    </Router>
  );
}

export default App;
