import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Users, Clock, Star } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { clubConfig } = useQuiz();

  const handleStartQuiz = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center"
                style={{ backgroundColor: clubConfig.primaryColor }}
              >
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">FANZIO</h1>
            </div>
            <div className="flex items-center space-x-4">
              <img 
                src={clubConfig.logo} 
                alt={`${clubConfig.name} logo`}
                className="h-12 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="text-primary-600">Live</span> Quiz
                <br />
                <span className="text-secondary-600">Challenge</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Test your knowledge about {clubConfig.name} and compete with fellow fans in real-time!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>15 minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>Live competition</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Trophy className="w-5 h-5" />
                  <span>Win prizes</span>
                </div>
              </div>

              <motion.button
                onClick={handleStartQuiz}
                className="btn-primary text-lg px-8 py-4 text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join the Quiz Now!
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Competition</h3>
              <p className="text-gray-600">Compete with fans in real-time during halftime</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Club Knowledge</h3>
              <p className="text-gray-600">Test your knowledge about {clubConfig.name}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Win Prizes</h3>
              <p className="text-gray-600">Top performers win exclusive prizes</p>
            </motion.div>
          </div>
        </div>

        {/* Sponsors Section */}
        {clubConfig.sponsorLogos && clubConfig.sponsorLogos.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-500 mb-4">Sponsored by</p>
              <div className="flex justify-center items-center space-x-8">
                {clubConfig.sponsorLogos.map((logo, index) => (
                  <img
                    key={index}
                    src={logo}
                    alt="Sponsor logo"
                    className="h-12 w-auto opacity-60"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 