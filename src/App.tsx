import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import PodcastDetailsPage from './pages/PodcastDetailsPage';

function App() {
  
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetailsPage />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<PodcastDetailsPage />} />
        </Routes>
      </Router>
  );
}

export default App;