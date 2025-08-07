import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Gift, Mail, MapPin, Calendar, Star } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

export default function WinnerScreen() {
  const navigate = useNavigate();
  const { user, quiz, clubConfig } = useQuiz();

  const prizeInfo = {
    title: "Exclusive Club Merchandise",
    description: "You've won an official {clubConfig.name} merchandise pack!",
    items: [
      "Official team jersey",
      "Club scarf",
      "Stadium tour voucher",
      "Match day program"
    ],
    claimInstructions: "Visit the merchandise stand at the stadium to claim your prize. Show this screen to the staff.",
    validUntil: "Next home match",
    terms: "Prizes must be claimed within 30 days. One prize per person."
  };

  const handleEmailPrize = () => {
    // In a real app, this would send an email with prize details
    alert('Prize details have been sent to your email!');
  };

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
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
            🎉 Congratulations!
          </h1>
          <p className="text-gray-600">
            You're a winner, {user.nickname}!
          </p>
        </motion.div>

        {/* Prize Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card mb-8"
        >
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {prizeInfo.title}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {prizeInfo.description.replace('{clubConfig.name}', clubConfig.name)}
            </p>

            {/* Prize Items */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Prize Includes:</h3>
              <div className="space-y-2">
                {prizeInfo.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-3 text-left"
                  >
                    <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Claim Instructions */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="font-semibold text-blue-900 mb-1">How to Claim:</h4>
                  <p className="text-sm text-blue-800">{prizeInfo.claimInstructions}</p>
                </div>
              </div>
            </div>

            {/* Validity */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Valid until: {prizeInfo.validUntil}</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          <button
            onClick={handleEmailPrize}
            className="w-full btn-secondary flex items-center justify-center space-x-2"
          >
            <Mail className="w-5 h-5" />
            <span>Email Prize Details</span>
          </button>

          <button
            onClick={handlePlayAgain}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <Gift className="w-5 h-5" />
            <span>Play Again</span>
          </button>
        </motion.div>

        {/* Terms */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-6"
        >
          <p className="text-xs text-gray-500">
            {prizeInfo.terms}
          </p>
        </motion.div>

        {/* Sponsor Section */}
        {clubConfig.sponsorLogos && clubConfig.sponsorLogos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-500 mb-3">Prizes sponsored by</p>
            <div className="flex justify-center items-center space-x-4">
              {clubConfig.sponsorLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt="Sponsor logo"
                  className="h-8 w-auto opacity-60"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Confetti Effect */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight + 10,
                opacity: 0,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 