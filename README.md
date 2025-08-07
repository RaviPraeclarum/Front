# FANZIO - Football Fan Engagement Platform

A web-based platform that engages football fans during halftime through live quiz games. Built with React, Tailwind CSS, and Framer Motion.

## 🚀 Features

### Frontend (Mobile-Responsive)
- **Landing Page**: Club-branded welcome screen with call-to-action
- **Onboarding**: Simple nickname and email entry
- **Live Countdown**: Animated countdown before quiz starts
- **Quiz Interface**: Timed multiple choice questions with real-time feedback
- **Results Screen**: Real-time ranking and leaderboard
- **Winner Screen**: Prize information and claim instructions

### Core Functionality
- **Real-time Quiz Logic**: Everyone starts at the same time
- **Timed Questions**: 30-second time limit per question
- **Score Calculation**: Points for correct answers + time bonuses
- **Leaderboard**: Real-time ranking system
- **Prize System**: Winner determination and prize distribution

### Technical Features
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion for engaging UX
- **State Management**: React Context for global state
- **Modern UI**: Tailwind CSS for beautiful, consistent design

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fanzio-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🎮 How to Use

### For Fans
1. **Landing Page**: Scan QR code or visit the landing page
2. **Onboarding**: Enter nickname and email
3. **Countdown**: Wait for the live countdown to begin
4. **Quiz**: Answer 5 timed questions about the club
5. **Results**: See your ranking and score
6. **Prizes**: If you're a winner, claim your prize!

### For Clubs (Future Features)
- Upload club logo and branding
- Customize quiz questions
- View player analytics
- Export participant data
- Manage sponsor integrations

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage.jsx # Welcome screen
│   ├── Onboarding.jsx  # User registration
│   ├── Countdown.jsx   # Pre-quiz countdown
│   ├── Quiz.jsx        # Main quiz interface
│   ├── Results.jsx     # Final rankings
│   └── WinnerScreen.jsx # Prize information
├── context/
│   └── QuizContext.jsx # Global state management
├── App.jsx             # Main app component
└── main.jsx           # Entry point
```

## 🎯 MVP Features

### ✅ Completed
- [x] Landing page with club branding
- [x] User onboarding (nickname + email)
- [x] Live countdown timer
- [x] Timed quiz with 5 questions
- [x] Real-time scoring system
- [x] Results leaderboard
- [x] Winner screen with prizes
- [x] Mobile-responsive design
- [x] Smooth animations and transitions

### 🔄 Future Enhancements
- [ ] Backend API integration
- [ ] Real-time multiplayer functionality
- [ ] Admin dashboard for clubs
- [ ] Database for persistent data
- [ ] Email notifications
- [ ] QR code generation
- [ ] Analytics and reporting
- [ ] Sponsor management system

## 🎨 Customization

### Club Branding
Update the `clubConfig` object in `src/context/QuizContext.jsx`:

```javascript
clubConfig: {
  name: 'Your Club Name',
  logo: '/path/to/logo.png',
  primaryColor: '#0ea5e9',
  secondaryColor: '#eab308',
  sponsorLogos: ['/sponsor1.png', '/sponsor2.png'],
}
```

### Quiz Questions
Modify the `questions` array in the same file:

```javascript
questions: [
  {
    id: 1,
    question: "Your custom question?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 0, // Index of correct answer
    timeLimit: 30,
  },
  // ... more questions
]
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Custom domain configuration available

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure custom domain if needed

### Other Platforms
- **Firebase Hosting**: Upload `dist` folder
- **AWS S3**: Static website hosting
- **GitHub Pages**: Deploy from repository

## 📊 Analytics & Data

### Current Implementation
- Mock leaderboard for demonstration
- Local state management
- No persistent data storage

### Future Implementation
- Real-time database (Firebase/Supabase)
- User analytics tracking
- Email collection and management
- Sponsor engagement metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Roadmap

### Phase 1 (Current MVP)
- ✅ Basic quiz functionality
- ✅ Mobile-responsive design
- ✅ Club branding system

### Phase 2 (Backend Integration)
- 🔄 Real-time multiplayer
- 🔄 Database integration
- 🔄 Email notifications
- 🔄 Analytics dashboard

### Phase 3 (Advanced Features)
- 🔄 Admin panel for clubs
- 🔄 Sponsor management
- 🔄 Advanced analytics
- 🔄 Multi-club support

## 📞 Support

For questions or support, please contact the development team.

---

**FANZIO** - Engaging football fans, one quiz at a time! ⚽🎯
