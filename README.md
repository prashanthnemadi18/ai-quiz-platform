# 🎓 AI-Based Personalized Learning & Testing Platform

A modern, AI-powered quiz platform with stunning UI, beautiful animations, and real-time question generation using Google's Gemini AI.

## ✨ Features

### 🎨 Modern Design
- **Beautiful UI/UX**: Clean, modern interface built with React, Next.js 15, and Tailwind CSS
- **Smooth Animations**: Powered by Framer Motion with custom keyframe animations
- **Glassmorphism Effects**: Modern glass-like UI components with backdrop blur
- **Gradient Backgrounds**: Dynamic mesh gradients and animated color transitions
- **Responsive Design**: Fully responsive across all devices

### 🤖 AI-Powered Features
- **Smart Question Generation**: AI generates contextual questions using Google Gemini
- **Adaptive Learning**: Personalized quiz difficulty based on performance
- **Instant Feedback**: Real-time answer validation and explanations
- **Multiple AI Models**: Support for Google Gemini, OpenAI, and Anthropic Claude

### 📊 Analytics & Tracking
- **Performance Dashboard**: Beautiful charts and statistics
- **Progress Tracking**: Monitor your learning journey
- **Score Analytics**: Detailed breakdown of quiz results
- **Study Streaks**: Track daily learning habits
- **PDF Reports**: Download detailed performance reports

### 🎯 User Experience
- **Interactive Animations**: Engaging micro-interactions throughout
- **Confetti Celebrations**: Celebrate achievements with particle effects
- **Dark Mode Ready**: Full dark mode support
- **Smooth Transitions**: Seamless page transitions and loading states
- **Custom Scrollbars**: Styled scrollbars matching the theme

![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)
![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-4285f4)

---

## ✨ Features

### 🎨 Beautiful UI
- **White-themed design** with gradient accents
- **Glassmorphism effects** with backdrop blur
- **Smooth animations** using Framer Motion
- **Interactive hover effects** throughout
- **Responsive design** for all devices

### 🤖 AI-Powered
- **Real-time question generation** using Gemini 2.5 Flash
- **Multiple question types**: MCQ, True/False, Short Answer
- **Difficulty levels**: Easy, Medium, Hard
- **Smart deduplication** to avoid repeat questions
- **Detailed explanations** for each answer

### 📊 Dashboard Features
- **Performance tracking** with stats and charts
- **Achievement system** with badges
- **Quiz history** with detailed results
- **Progress monitoring** over time
- **Personalized recommendations**

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Ai-online-exam
```

2. **Install dependencies**
```bash
cd student
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:3000
```

---

## ☁️ Deploy to Cloud (Get HTTPS Link)

### **🌟 Recommended: Vercel (Free & Easy)**

Get a permanent link like: `https://your-quiz-app.vercel.app`

**Quick Deploy:**
1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Set root directory to `student`
5. Add environment variables
6. Deploy!

**📖 Detailed Guide:** See [VERCEL_DEPLOYMENT_STEPS.md](VERCEL_DEPLOYMENT_STEPS.md)

**🚀 All Deployment Options:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

### **Other Platforms:**
- **Netlify:** https://netlify.com (Free)
- **Railway:** https://railway.app (Free tier)
- **Render:** https://render.com (Free)
- **AWS Amplify:** https://aws.amazon.com/amplify/
- **Azure Static Web Apps:** https://azure.microsoft.com
- **Google Cloud Run:** https://cloud.google.com/run

---

## 🔧 Configuration

The project is pre-configured with a working Gemini API key in `src/.env.local`:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSyDCt8qXJx92r8H7SFKU3gQziDLb5ggPJkw
GEMINI_MODEL=gemini-2.5-flash
```

### Get Your Own API Key (Optional)
1. Visit: https://makersuite.google.com/app/apikey
2. Create a new API key
3. Replace in `src/.env.local`

---

## 📁 Project Structure

```
Ai-online-exam/
├── src/
│   ├── ai/                      # AI integration
│   │   ├── flows/              # AI flows (question generation, etc.)
│   │   └── genkit.ts           # AI configuration
│   ├── app/                    # Next.js app directory
│   │   ├── dashboard/          # Dashboard pages
│   │   ├── login/              # Login page
│   │   └── page.tsx            # Landing page
│   ├── components/             # React components
│   │   ├── ui/                 # UI components (shadcn/ui)
│   │   ├── auth/               # Authentication components
│   │   └── dashboard/          # Dashboard components
│   ├── lib/                    # Utility functions
│   ├── types/                  # TypeScript types
│   └── .env.local              # Environment variables
├── QUICK_START.md              # Quick start guide
├── 🎉_SUCCESS.md               # Setup success guide
└── UI_REDESIGN_COMPLETE.md     # UI documentation
```

---

## 🎯 Usage

### 📱 For Students - How to Use

#### **Step 1: Access the Platform**
- **On Computer**: Open your browser and go to the website URL
- **On Mobile/Tablet**: Open your browser (Chrome, Safari, etc.) and visit the same URL
- **No installation needed** - works directly in your browser!

#### **Step 2: Login**
1. Enter your **Name**, **Email**, and **Password**
2. Click **"Sign In"**
3. You'll be taken to your personal dashboard

#### **Step 3: Take a Quiz**
1. Click **"Take Quiz"** from the sidebar (or hamburger menu on mobile 📱)
2. Choose your subject (e.g., Math, Science, History)
3. Enter the topic you want to study
4. Select difficulty: Easy, Medium, or Hard
5. Choose number of questions (1-50)
6. Click **"Generate Quiz"** - AI creates questions instantly!

#### **Step 4: Answer Questions**
- Read each question carefully
- Click on your answer choice (A, B, C, or D)
- Use **"Next"** to move forward
- Use **"Previous"** to go back
- Track your progress at the top
- Submit when you're done!

#### **Step 5: View Results**
- See your score immediately
- Download PDF report with answers
- Check explanations for each question
- View your performance in Analytics

### 📱 Mobile-Friendly Features
- ✅ **Hamburger Menu**: Tap the menu icon (☰) in top-left corner
- ✅ **Touch-Friendly**: Large buttons easy to tap
- ✅ **Responsive**: Works on any screen size
- ✅ **Swipe Navigation**: Easy to navigate questions
- ✅ **Auto-Save**: Your progress is saved automatically

### 🎓 Student Tips
- **Practice Regularly**: Take quizzes daily to improve
- **Review Mistakes**: Check explanations for wrong answers
- **Track Progress**: Use Analytics to see improvement
- **Start Easy**: Begin with easy difficulty, then increase
- **Take Breaks**: Don't rush, take your time

### Generate Questions

1. Navigate to **Content Generator**: `/dashboard/content-generator`
2. Fill in the form:
   - **Subject**: Choose from dropdown (e.g., "Computer Science")
   - **Topic**: Enter specific topic (e.g., "React Hooks")
   - **Difficulty**: Select Easy, Medium, or Hard
   - **Count**: Choose 1-20 questions
3. Click **"Generate Questions"**
4. Watch AI generate unique questions in real-time!

### Example Topics
- JavaScript Async/Await
- Python List Comprehensions
- React useEffect Hook
- SQL JOIN Operations
- CSS Flexbox Layout
- Git Branching Strategies

---

## 🎨 Tech Stack

### Frontend
- **Next.js 15.5.5** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **shadcn/ui** - UI components
- **Lucide React** - Icons

### AI Integration
- **Google Gemini 2.5 Flash** - Question generation
- **Custom AI flows** - Structured generation
- **Zod** - Schema validation

### Features
- **Server Actions** - API routes
- **Local Storage** - User data
- **Responsive Design** - Mobile-friendly

---

## 🎬 Animations

The project features smooth animations throughout:

- **Page Load**: Staggered entrance animations
- **Cards**: Scale + fade with spring physics
- **Buttons**: Scale on hover/tap
- **Loading**: Rotating brain with pulsing dots
- **Questions**: Staggered appearance
- **Hover Effects**: Interactive feedback

All animations are GPU-accelerated for 60fps performance.

---

## 📊 Available Models

You can switch AI models in `.env.local`:

| Model | Speed | Quality | Use Case |
|-------|-------|---------|----------|
| `gemini-2.5-flash` | ⚡⚡⚡ Very Fast | 🌟🌟🌟 Excellent | **Recommended** |
| `gemini-2.5-pro` | 🐢 Medium | 🌟🌟🌟🌟 Best | High quality |
| `gemini-2.0-flash` | ⚡⚡ Fast | 🌟🌟 Good | Stable |
| `gemini-pro-latest` | 🐢 Medium | 🌟🌟🌟 Great | Latest pro |

---

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

### Environment Variables

Create `src/.env.local`:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

---

## 🎨 UI Customization

### Colors
The project uses a gradient color scheme:
- **Primary**: Blue → Purple → Pink
- **Background**: White with soft blue tints
- **Accents**: Colorful badges and highlights

### Animations
Customize in `src/app/globals.css`:
```css
@keyframes float { ... }
@keyframes glow { ... }
@keyframes gradient-shift { ... }
```

---

## 📱 Responsive Design

The UI is fully responsive:
- **Desktop**: Full 3-column layout
- **Tablet**: 2-column layout
- **Mobile**: Single column stack

All animations adapt to screen size for optimal performance.

---

## 🎉 Features Showcase

### Landing Page
- Hero section with animated gradients
- Feature cards with hover effects
- Stats display
- Call-to-action buttons

### Dashboard
- Performance stats with animations
- Recent quiz history
- Achievement badges
- Progress tracking

### Content Generator
- Real-time AI question generation
- Beautiful loading states
- Gradient question cards
- Interactive options
- Detailed explanations

---

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Quick start guide
- **[🎉_SUCCESS.md](🎉_SUCCESS.md)** - Setup success guide
- **[UI_REDESIGN_COMPLETE.md](UI_REDESIGN_COMPLETE.md)** - UI documentation

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🎊 Acknowledgments

- **Google Gemini AI** - For powerful question generation
- **shadcn/ui** - For beautiful UI components
- **Framer Motion** - For smooth animations
- **Next.js Team** - For the amazing framework

---

## 💡 Support

For issues or questions:
1. Check the documentation files
2. Review the code comments
3. Test with different API keys if needed

---
👤 Author & Profiles

Prashanth Nemadi
🎓 Aspiring Full Stack Developer | AI & Web Technologies Enthusiast

🔗 GitHub: https://github.com/prashanthnemadi18
💼 LinkedIn:https://www.linkedin.com/in/prashanth-nemadi
**Built with ❤️ using Next.js, TypeScript, and Gemini AI**

🚀 **Start generating questions now!** 🎨
#   a i - q u i z - p l a t f o r m  
 