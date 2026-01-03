# 🎓 AI-Based Personalized Learning & Testing Platform

A modern, AI-powered quiz platform that generates personalized educational content using Google's Gemini AI. Students can take quizzes on any subject, get instant feedback, and track their progress.

![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)
![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-4285f4)

---

## 📋 Table of Contents

1. [Project Summary](#-project-summary)
2. [How to Run](#-how-to-run)
3. [How to Use](#-how-to-use)
4. [Project Structure](#-project-structure)
5. [Requirements](#-requirements)
6. [Author](#-author)
7. [Overview](#-overview)
8. [Commands Reference](#-commands-reference)

---

## 📝 Project Summary

This is an **AI-powered educational platform** designed for students to:
- Generate custom quizzes on any subject using AI
- Take quizzes with multiple question types (MCQ, True/False, Fill in Blank)
- Get instant feedback and explanations
- Track performance and progress over time
- Download PDF reports of quiz results
- Access from any device (mobile, tablet, computer)

**Key Features:**
- ✅ AI-generated questions using Google Gemini
- ✅ Multiple question types and difficulty levels
- ✅ Real-time progress tracking
- ✅ Beautiful, responsive UI with animations
- ✅ Mobile-friendly design
- ✅ PDF report generation
- ✅ Analytics dashboard

---

## 🚀 How to Run

### **Prerequisites**
Before running the project, ensure you have:
- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### **Installation Steps**

#### **Step 1: Clone the Repository**
```bash
git clone https://github.com/prashanthnemadi18/ai-quiz-platform.git
cd ai-quiz-platform
```

#### **Step 2: Navigate to Project Folder**
```bash
cd student
```

#### **Step 3: Install Dependencies**
```bash
npm install
```

#### **Step 4: Set Up Environment Variables**
The project comes with a pre-configured API key. The `.env.local` file already contains:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSyDCt8qXJx92r8H7SFKU3gQziDLb5ggPJkw
GEMINI_MODEL=gemini-2.5-flash
```

**Optional:** Get your own API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

#### **Step 5: Run Development Server**
```bash
npm run dev
```

#### **Step 6: Open in Browser**
Open your browser and go to:
```
http://localhost:3000
```

**That's it!** The application is now running! 🎉

---

## 💡 How to Use

### **For Students:**

#### **1. Login**
- Open the application
- Enter your **Name**, **Email**, and **Password**
- Click **"Sign In"**

#### **2. Take a Quiz**
1. Click **"Take Quiz"** from the sidebar
2. **Configure your quiz:**
   - **Subject:** Enter subject (e.g., Biology, Math, History)
   - **Topic:** Enter specific topic (e.g., Cells, Algebra, World War II)
   - **Difficulty:** Choose Easy, Medium, Hard, or Auto
   - **Question Types:** Select Multiple Choice, True/False, or Fill in Blank
   - **Number of Questions:** Choose 1-100 questions
   - **Time Limit:** Set timer or choose "No Limit"
3. Click **"Generate Quiz"**
4. Wait for AI to generate questions (10-60 seconds)
5. **Answer questions:**
   - Read each question carefully
   - Select your answer
   - Use "Next" and "Previous" buttons to navigate
   - Track progress at the top
6. Click **"Submit Quiz"** when done

#### **3. View Results**
- See your score immediately
- Download PDF report with answers and explanations
- Review correct and incorrect answers

#### **4. Track Progress**
- Click **"Analytics"** from sidebar
- View all quiz history
- See performance trends
- Track improvement over time

### **For Teachers:**
- Share the deployed link with students
- Monitor student progress
- Create custom quizzes for assignments
- Download student reports

---

## 📁 Project Structure

```
ai-quiz-platform/
│
├── student/                          # Main application folder
│   │
│   ├── ai/                          # AI Integration
│   │   ├── flows/                   # AI generation flows
│   │   │   └── generate-educational-content.ts  # Question generation logic
│   │   ├── genkit.ts               # AI configuration
│   │   └── dev.ts                  # Development utilities
│   │
│   ├── app/                         # Next.js App Directory
│   │   ├── dashboard/              # Dashboard pages
│   │   │   ├── page.tsx           # Main dashboard
│   │   │   ├── layout.tsx         # Dashboard layout
│   │   │   ├── take-quiz/         # Quiz taking page
│   │   │   └── analytics/         # Analytics page
│   │   ├── login/                 # Login page
│   │   ├── page.tsx               # Landing page
│   │   ├── layout.tsx             # Root layout
│   │   └── globals.css            # Global styles
│   │
│   ├── components/                 # React Components
│   │   ├── dashboard/             # Dashboard components
│   │   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   │   └── StepIndicator.tsx # Progress indicator
│   │   ├── ui/                    # UI components (shadcn/ui)
│   │   └── auth/                  # Authentication components
│   │
│   ├── hooks/                      # Custom React Hooks
│   │   ├── use-mobile.tsx        # Mobile detection
│   │   └── use-toast.ts          # Toast notifications
│   │
│   ├── lib/                        # Utility Functions
│   │   ├── utils.ts              # Helper functions
│   │   └── auth.ts               # Authentication utilities
│   │
│   ├── types/                      # TypeScript Types
│   │   ├── quiz.ts               # Quiz type definitions
│   │   └── shims.d.ts            # Type declarations
│   │
│   ├── .env.local                 # Environment variables
│   ├── .env.example               # Example env file
│   ├── .gitignore                 # Git ignore rules
│   ├── package.json               # Dependencies
│   ├── next.config.js             # Next.js configuration
│   ├── tailwind.config.ts         # Tailwind CSS config
│   ├── tsconfig.json              # TypeScript config
│   └── postcss.config.mjs         # PostCSS config
│
├── README.md                       # This file
├── DEPLOYMENT_GUIDE.md            # Deployment instructions
├── STUDENT_GUIDE.md               # Student usage guide
└── VERCEL_DEPLOYMENT_STEPS.md     # Vercel deployment guide
```

---

## 📦 Requirements

### **System Requirements:**
- **Operating System:** Windows, macOS, or Linux
- **Node.js:** Version 18.0 or higher
- **npm:** Version 9.0 or higher
- **RAM:** Minimum 4GB (8GB recommended)
- **Storage:** 500MB free space

### **Dependencies:**

#### **Core Framework:**
- **Next.js** 15.5.5 - React framework
- **React** 18.2.0 - UI library
- **TypeScript** - Type safety

#### **AI Integration:**
- **@google/generative-ai** - Google Gemini AI
- **@anthropic-ai/sdk** - Claude AI (optional)
- **openai** - OpenAI API (optional)

#### **UI & Styling:**
- **Tailwind CSS** 3.4.1 - Utility-first CSS
- **Framer Motion** - Animations
- **Radix UI** - Accessible components
- **Lucide React** - Icons

#### **Utilities:**
- **jsPDF** - PDF generation
- **Zod** - Schema validation
- **clsx** - Class name utilities

### **Browser Requirements:**
- **Chrome** 90+ (Recommended)
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

### **Internet Connection:**
- Required for AI question generation
- Minimum 1 Mbps recommended

---

## 👤 Author

**Prashanth Nemadi**

🎓 Aspiring Full Stack Developer | AI & Web Technologies Enthusiast

### **Connect with Me:**
- 🔗 **GitHub:** [github.com/prashanthnemadi18](https://github.com/prashanthnemadi18)
- 💼 **LinkedIn:** [linkedin.com/in/prashanth-nemadi](https://www.linkedin.com/in/prashanth-nemadi)
- 📧 **Email:** vidhwew@gmail.com

### **About This Project:**
This project was built as part of my journey to learn and master:
- Modern web development with Next.js and TypeScript
- AI integration using Google Gemini
- Responsive UI design with Tailwind CSS
- Full-stack application development

**Contributions and feedback are welcome!** 🙌

---

## 🔍 Overview

### **What is This Platform?**

This is a **comprehensive educational platform** that leverages **AI technology** to create personalized learning experiences for students. The platform uses **Google's Gemini AI** to generate unique, contextual questions on any topic, making it perfect for:

- **Self-study and practice**
- **Exam preparation**
- **Classroom assessments**
- **Homework assignments**
- **Skill evaluation**

### **Key Technologies:**

#### **Frontend:**
- **Next.js 15** - Server-side rendering and routing
- **React 18** - Component-based UI
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Responsive styling
- **Framer Motion** - Smooth animations

#### **Backend:**
- **Next.js API Routes** - Server-side logic
- **Server Actions** - Data mutations
- **Local Storage** - Client-side data persistence

#### **AI Integration:**
- **Google Gemini 2.5 Flash** - Question generation
- **Custom AI flows** - Structured content generation
- **Zod validation** - Schema validation

### **Architecture:**

```
┌─────────────────────────────────────────────────────────┐
│                     User Interface                       │
│  (Next.js + React + Tailwind CSS + Framer Motion)      │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Application Logic                       │
│         (Server Actions + API Routes)                    │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   AI Integration                         │
│              (Google Gemini API)                         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Data Persistence                        │
│              (Local Storage)                             │
└─────────────────────────────────────────────────────────┘
```

### **Features in Detail:**

#### **1. AI-Powered Question Generation**
- Generates unique questions using Google Gemini AI
- Supports multiple question types:
  - Multiple Choice (4 options)
  - True/False
  - Fill in the Blank
- Adjustable difficulty levels (Easy, Medium, Hard)
- Prevents duplicate questions
- Generates 1-100 questions per quiz

#### **2. Interactive Quiz Taking**
- Clean, intuitive interface
- Real-time progress tracking
- Question navigation (Next/Previous)
- Visual indicators for answered questions
- Optional time limits
- Auto-save functionality

#### **3. Comprehensive Analytics**
- Overall performance statistics
- Subject-wise breakdown
- Quiz history with detailed results
- Performance trends over time
- Accuracy metrics
- Time spent tracking

#### **4. PDF Report Generation**
- Downloadable quiz results
- Includes all questions and answers
- Shows correct/incorrect answers
- Provides explanations
- Professional formatting

#### **5. Responsive Design**
- Works on desktop, tablet, and mobile
- Touch-friendly interface
- Hamburger menu for mobile
- Adaptive layouts
- Smooth animations

---

## 🖥️ Commands Reference

### **Development Commands:**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start development server with network access (for mobile testing)
npm run dev:network

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### **Git Commands:**

```bash
# Clone repository
git clone https://github.com/prashanthnemadi18/ai-quiz-platform.git

# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull
```

### **Deployment Commands:**

```bash
# Deploy to Vercel (using CLI)
npx vercel

# Deploy to production
npx vercel --prod

# Check deployment status
npx vercel ls
```

### **Useful Commands:**

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version

# Check npm version
npm --version

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

---

## 🌐 Deployment

### **Deploy to Vercel (Recommended):**

1. **Push code to GitHub**
2. **Go to:** [vercel.com](https://vercel.com)
3. **Import your repository**
4. **Set root directory to:** `student`
5. **Add environment variables**
6. **Deploy!**

**Detailed guide:** See [VERCEL_DEPLOYMENT_STEPS.md](VERCEL_DEPLOYMENT_STEPS.md)

### **Other Platforms:**
- **Netlify:** [netlify.com](https://netlify.com)
- **Railway:** [railway.app](https://railway.app)
- **Render:** [render.com](https://render.com)

---

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment guide
- **[STUDENT_GUIDE.md](STUDENT_GUIDE.md)** - Student usage instructions
- **[MOBILE_ACCESS_GUIDE.md](MOBILE_ACCESS_GUIDE.md)** - Mobile access setup
- **[VERCEL_DEPLOYMENT_STEPS.md](VERCEL_DEPLOYMENT_STEPS.md)** - Vercel deployment

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### **How to Contribute:**
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For powerful question generation
- **Vercel** - For hosting and deployment
- **shadcn/ui** - For beautiful UI components
- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For utility-first styling

---

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review the code comments
3. Open an issue on GitHub
4. Contact the author

---

## 🎉 Quick Start Summary

```bash
# 1. Clone the repository
git clone https://github.com/prashanthnemadi18/ai-quiz-platform.git

# 2. Navigate to project
cd ai-quiz-platform/student

# 3. Install dependencies
npm install

# 4. Run development server
npm run dev

# 5. Open browser
# Go to http://localhost:3000
```

**That's it! Start generating quizzes!** 🚀

---

**Built with ❤️ by Prashanth Nemadi**

**⭐ Star this repo if you find it helpful!**

---

*Last Updated: January 2026*
