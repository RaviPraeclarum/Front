import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

export default function Quiz() {
  const navigate = useNavigate();
  const { 
    user, 
    questions, 
    quiz, 
    actions, 
    clubConfig 
  } = useQuiz();
  
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[quiz.currentQuestion];
  const progress = ((quiz.currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    if (!currentQuestion) {
      // Quiz is complete
      actions.endGame();
      navigate('/results');
      return;
    }

    // Reset for new question
    setTimeRemaining(currentQuestion.timeLimit);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowFeedback(false);

    // Start timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz.currentQuestion, currentQuestion]);

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const timeBonus = Math.max(0, timeRemaining - 10); // Bonus for quick answers
    
    // Show feedback briefly
    setShowFeedback(true);
    
    setTimeout(() => {
      actions.answerQuestion(
        quiz.currentQuestion,
        answerIndex,
        isCorrect,
        timeBonus
      );
      setShowFeedback(false);
    }, 1500);
  };

  const handleTimeUp = () => {
    if (!isAnswered) {
      setIsAnswered(true);
      setShowFeedback(true);
      
      setTimeout(() => {
        actions.answerQuestion(
          quiz.currentQuestion,
          -1, // No answer selected
          false,
          0
        );
        setShowFeedback(false);
      }, 1500);
    }
  };

  const getAnswerClass = (index) => {
    if (!isAnswered) {
      return selectedAnswer === index 
        ? 'bg-primary-100 border-primary-500' 
        : 'hover:bg-gray-50';
    }
    
    if (index === currentQuestion.correctAnswer) {
      return 'bg-green-100 border-green-500';
    }
    
    if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
      return 'bg-red-100 border-red-500';
    }
    
    return 'bg-gray-50';
  };

  const getAnswerIcon = (index) => {
    if (!isAnswered) return null;
    
    if (index === currentQuestion.correctAnswer) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    
    if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center space-x-3">
            <img 
              src={clubConfig.logo} 
              alt={`${clubConfig.name} logo`}
              className="h-10 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <p className="text-sm text-gray-500">Playing as</p>
              <p className="font-semibold text-gray-900">{user.nickname}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 text-primary-600">
              <Trophy className="w-5 h-5" />
              <span className="font-bold">{quiz.score}</span>
            </div>
            <p className="text-xs text-gray-500">points</p>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {quiz.currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <Clock className={`w-5 h-5 ${timeRemaining <= 10 ? 'text-red-600' : 'text-primary-600'}`} />
            <span className={`text-xl font-bold ${timeRemaining <= 10 ? 'text-red-600' : 'text-gray-900'}`}>
              {timeRemaining}s
            </span>
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          key={quiz.currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="card mb-8"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-center">
            {currentQuestion?.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-4">
            {currentQuestion?.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left flex items-center justify-between ${getAnswerClass(index)}`}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
              >
                <span className="font-medium text-gray-900">{option}</span>
                {getAnswerIcon(index)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-white rounded-lg px-6 py-3 shadow-lg">
                {selectedAnswer === currentQuestion?.correctAnswer ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-lg font-semibold text-green-600">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-red-600" />
                    <span className="text-lg font-semibold text-red-600">Incorrect</span>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Question Indicator */}
        {isAnswered && !showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6"
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
            <p className="text-sm text-gray-500 mt-2">Next question...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
} 