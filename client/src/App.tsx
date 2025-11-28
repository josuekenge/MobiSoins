import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Catch-all route for SPA - redirects to home */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
