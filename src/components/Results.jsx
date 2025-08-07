import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Medal, Star, Users, Award } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

export default function Results() {
  const navigate = useNavigate();
  const { user, quiz, actions, clubConfig } = useQuiz();
  const [isWinner, setIsWinner] = useState(false);
  const [userRank, setUserRank] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Generate mock leaderboard for demo
    const mockPlayers = [
      { nickname: 'QuizMaster', score: 85, email: 'quiz@example.com' },
      { nickname: 'FootballFan', score: 78, email: 'fan@example.com' },
      { nickname: user.nickname, score: quiz.score, email: user.email },
      { nickname: 'GoalGetter', score: 65, email: 'goal@example.com' },
      { nickname: 'StadiumStar', score: 58, email: 'star@example.com' },
      { nickname: 'MatchMaster', score: 52, email: 'match@example.com' },
      { nickname: 'TeamPlayer', score: 45, email: 'team@example.com' },
      { nickname: 'Champion', score: 38, email: 'champ@example.com' },
    ];

    // Sort by score (highest first)
    const sortedPlayers = mockPlayers.sort((a, b) => b.score - a.score);
    
    // Find user's rank
    const userIndex = sortedPlayers.findIndex(player => player.nickname === user.nickname);
    const rank = userIndex + 1;
    
    setUserRank(rank);
    setLeaderboard(sortedPlayers.slice(0, 10)); // Top 10
    
    // Check if user is a winner (top 3 for demo)
    setIsWinner(rank <= 3);
    
    // Update results in context
    actions.setResults({
      players: sortedPlayers,
      winners: sortedPlayers.slice(0, 3),
      userRank: rank,
    });
  }, [user, quiz.score, actions]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-400">{rank}</span>;
    }
  };

  const getRankClass = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 border-yellow-300';
      case 2:
        return 'bg-gray-100 border-gray-300';
      case 3:
        return 'bg-amber-100 border-amber-300';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const handleContinue = () => {
    if (isWinner) {
      navigate('/winner');
    } else {
      navigate('/');
    }
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
            Quiz Complete!
          </h1>
          <p className="text-gray-600">
            Here's how you performed
          </p>
        </motion.div>

        {/* User Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card mb-8"
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">{user.nickname}</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">{quiz.score}</div>
                <div className="text-sm text-gray-500">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600 mb-1">#{userRank}</div>
                <div className="text-sm text-gray-500">Your Rank</div>
              </div>
            </div>

            <AnimatePresence>
              {isWinner && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full"
                >
                  <Award className="w-5 h-5" />
                  <span className="font-semibold">Congratulations! You're a winner!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Final Rankings
          </h3>
          
          <div className="space-y-3">
            {leaderboard.map((player, index) => (
              <motion.div
                key={player.nickname}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${getRankClass(index + 1)} ${
                  player.nickname === user.nickname ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(index + 1)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {player.nickname}
                      {player.nickname === user.nickname && (
                        <span className="ml-2 text-primary-600">(You)</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{player.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{player.score}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-8"
        >
          <button
            onClick={handleContinue}
            className="btn-primary text-lg px-8 py-4"
          >
            {isWinner ? 'Claim Your Prize!' : 'Play Again'}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-6"
        >
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
            <div>
              <div className="font-semibold text-gray-700">{leaderboard.length}</div>
              <div>Players</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700">{Math.max(...leaderboard.map(p => p.score))}</div>
              <div>Highest Score</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700">{Math.round(leaderboard.reduce((sum, p) => sum + p.score, 0) / leaderboard.length)}</div>
              <div>Average Score</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 