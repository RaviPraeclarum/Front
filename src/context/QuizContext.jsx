import { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
  user: {
    nickname: '',
    email: '',
  },
  gameSession: {
    id: null,
    clubId: 'demo-club', // For MVP, using demo club
    startTime: null,
    endTime: null,
  },
  quiz: {
    currentQuestion: 0,
    answers: [],
    score: 0,
    timeRemaining: 0,
    isActive: false,
  },
  results: {
    players: [],
    winners: [],
    userRank: null,
  },
  clubConfig: {
    name: 'Demo Football Club',
    logo: '/demo-logo.png',
    primaryColor: '#0ea5e9',
    secondaryColor: '#eab308',
    sponsorLogos: ['/sponsor1.png', '/sponsor2.png'],
  },
  questions: [
    {
      id: 1,
      question: "In what year was the club founded?",
      options: ["1890", "1900", "1910", "1920"],
      correctAnswer: 0,
      timeLimit: 30,
    },
    {
      id: 2,
      question: "Who is the all-time top scorer?",
      options: ["John Smith", "Mike Johnson", "David Wilson", "Chris Brown"],
      correctAnswer: 1,
      timeLimit: 30,
    },
    {
      id: 3,
      question: "How many goals were conceded this season?",
      options: ["15", "20", "25", "30"],
      correctAnswer: 2,
      timeLimit: 30,
    },
    {
      id: 4,
      question: "What is the club's home stadium called?",
      options: ["City Stadium", "Home Ground", "Main Arena", "Central Park"],
      correctAnswer: 0,
      timeLimit: 30,
    },
    {
      id: 5,
      question: "Which player has the most appearances?",
      options: ["Player A", "Player B", "Player C", "Player D"],
      correctAnswer: 2,
      timeLimit: 30,
    },
  ],
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case 'START_GAME':
      return {
        ...state,
        gameSession: {
          ...state.gameSession,
          id: action.payload.sessionId,
          startTime: new Date().toISOString(),
        },
        quiz: {
          ...state.quiz,
          isActive: true,
          currentQuestion: 0,
          answers: [],
          score: 0,
        },
      };
    case 'ANSWER_QUESTION':
      const { questionIndex, answerIndex, isCorrect, timeBonus } = action.payload;
      const newAnswers = [...state.quiz.answers];
      newAnswers[questionIndex] = { answerIndex, isCorrect, timeBonus };
      
      return {
        ...state,
        quiz: {
          ...state.quiz,
          answers: newAnswers,
          score: state.quiz.score + (isCorrect ? 10 + (timeBonus || 0) : 0),
          currentQuestion: state.quiz.currentQuestion + 1,
        },
      };
    case 'SET_TIME_REMAINING':
      return {
        ...state,
        quiz: {
          ...state.quiz,
          timeRemaining: action.payload,
        },
      };
    case 'END_GAME':
      return {
        ...state,
        gameSession: {
          ...state.gameSession,
          endTime: new Date().toISOString(),
        },
        quiz: {
          ...state.quiz,
          isActive: false,
        },
      };
    case 'SET_RESULTS':
      return {
        ...state,
        results: action.payload,
      };
    case 'SET_CLUB_CONFIG':
      return {
        ...state,
        clubConfig: { ...state.clubConfig, ...action.payload },
      };
    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const value = {
    ...state,
    dispatch,
    actions: {
      setUser: (userData) => dispatch({ type: 'SET_USER', payload: userData }),
      startGame: (sessionId) => dispatch({ type: 'START_GAME', payload: { sessionId } }),
      answerQuestion: (questionIndex, answerIndex, isCorrect, timeBonus) =>
        dispatch({
          type: 'ANSWER_QUESTION',
          payload: { questionIndex, answerIndex, isCorrect, timeBonus },
        }),
      setTimeRemaining: (time) => dispatch({ type: 'SET_TIME_REMAINING', payload: time }),
      endGame: () => dispatch({ type: 'END_GAME' }),
      setResults: (results) => dispatch({ type: 'SET_RESULTS', payload: results }),
      setClubConfig: (config) => dispatch({ type: 'SET_CLUB_CONFIG', payload: config }),
    },
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
} 