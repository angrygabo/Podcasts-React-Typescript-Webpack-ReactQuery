import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/home/Home';
import DetailsPage from './pages/details/DetailsPage';

// Components & template parts
import Header from './components/Header';

function App() {
  
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:podcastId" element={<DetailsPage />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<DetailsPage />} />
        </Routes>
      </Router>
  );
}

export default App;