import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Trophy } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

export default function Countdown() {
  const navigate = useNavigate();
  const { user, actions, clubConfig } = useQuiz();
  const [countdown, setCountdown] = useState(10);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Start countdown when component mounts
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsReady(true);
          // Start the game after a brief delay
          setTimeout(() => {
            actions.startGame(`session-${Date.now()}`);
            navigate('/quiz');
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, actions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-center mb-4">
            <img 
              src={clubConfig.logo} 
              alt={`${clubConfig.name} logo`}
              className="h-16 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Get Ready!
          </h1>
          <p className="text-gray-600">
            The quiz is about to begin
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-primary-600 mr-2" />
              <span className="text-lg font-medium text-gray-700">Quiz starts in</span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={countdown}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-6xl font-bold text-primary-600 mb-4"
              >
                {countdown}
              </motion.div>
            </AnimatePresence>

            {isReady && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold text-green-600"
              >
                Let's Go!
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* User Info */}
        <motion.div
          className="card mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-500">You're playing as</p>
              <p className="font-semibold text-gray-900">{user.nickname}</p>
            </div>
          </div>
        </motion.div>

        {/* Game Info */}
        <motion.div
          className="grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-blue-600">5</span>
            </div>
            <p className="text-xs text-gray-600">Questions</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-green-600">30s</span>
            </div>
            <p className="text-xs text-gray-600">Per Question</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-xs text-gray-600">Prizes</p>
          </div>
        </motion.div>

        {/* Loading Animation */}
        {!isReady && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex justify-center space-x-2">
              <motion.div
                className="w-2 h-2 bg-primary-600 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 bg-primary-600 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 bg-primary-600 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Preparing your quiz...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
} 