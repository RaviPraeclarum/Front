import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import Countdown from './components/Countdown';
import Quiz from './components/Quiz';
import Results from './components/Results';
import WinnerScreen from './components/WinnerScreen';
import { QuizProvider } from './context/QuizContext';

function App() {
  return (
    <QuizProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/countdown" element={<Countdown />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/winner" element={<WinnerScreen />} />
          </Routes>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;
