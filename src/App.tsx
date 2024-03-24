import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import PodcastDetailsPage from './pages/PodcastDetailsPage';
import Header from './components/Header';

function App() {
  
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetailsPage />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<PodcastDetailsPage />} />
        </Routes>
      </Router>
  );
}

export default App;