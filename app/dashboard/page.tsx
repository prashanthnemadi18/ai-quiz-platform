"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Clock, Target, Trophy, Brain, BarChart3, Zap, ArrowRight, Sparkles, Star, TrendingUp, Flame, Award, Rocket
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StepIndicator from '@/components/dashboard/StepIndicator';

interface StudentData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedDate: string;
  isOnline: boolean;
}

interface StudentProgress {
  quizzes: any[];
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  streak: number;
  totalQuestions: number;
  correctAnswers: number;
  hoursStudied: number;
  lastActivityDate: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    console.log('Dashboard: Checking for student data...');
    const studentData = localStorage.getItem('student');
    console.log('Dashboard: Student data:', studentData);
    
    if (studentData) {
      const parsedStudent = JSON.parse(studentData);
      console.log('Dashboard: Parsed student:', parsedStudent);
      setStudent(parsedStudent);
      
      const progressKey = `progress_${parsedStudent.id}`;
      const savedProgress = localStorage.getItem(progressKey);
      console.log('Dashboard: Progress data:', savedProgress);
      
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      } else {
        const newProgress: StudentProgress = {
          quizzes: [],
          totalQuizzes: 0,
          averageScore: 0,
          bestScore: 0,
          streak: 0,
          totalQuestions: 0,
          correctAnswers: 0,
          hoursStudied: 0,
          lastActivityDate: new Date().toISOString()
        };
        console.log('Dashboard: Creating new progress:', newProgress);
        setProgress(newProgress);
        localStorage.setItem(progressKey, JSON.stringify(newProgress));
      }
    } else {
      console.log('Dashboard: No student data, redirecting to login');
      router.push('/login');
    }

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [router]);

  if (!student || !progress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Brain className="w-16 h-16 text-violet-600" />
          </motion.div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Modern animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          className="absolute w-[600px] h-[600px] bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '-10%', left: '-5%' }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: '-10%', right: '-5%' }}
        />
        <motion.div 
          className="absolute w-[400px] h-[400px] bg-gradient-to-br from-pink-400/15 to-rose-400/15 rounded-full blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, -60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '40%', right: '20%' }}
        />
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-6 py-8 space-y-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Step Indicator */}
        <motion.div variants={itemVariants}>
          <StepIndicator currentStep={1} />
        </motion.div>
        
        {/* Welcome Section */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 p-12 shadow-2xl"
        >
          {/* Animated bubble decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute w-32 h-32 bg-white/10 rounded-full blur-xl"
              animate={{ 
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.5, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ top: '10%', right: '10%' }}
            />
            <motion.div 
              className="absolute w-24 h-24 bg-white/10 rounded-full blur-xl"
              animate={{ 
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              style={{ bottom: '15%', left: '15%' }}
            />
            <motion.div 
              className="absolute w-20 h-20 bg-white/10 rounded-full blur-xl"
              animate={{ 
                x: [0, 50, 0],
                y: [0, -40, 0],
                scale: [1, 1.4, 1]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              style={{ top: '50%', left: '50%' }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 flex items-center gap-3 drop-shadow-lg">
                Welcome back, {student.name}! 
                <motion.span
                  animate={{ 
                    rotate: [0, 14, -8, 14, -4, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-block"
                >
                  👋
                </motion.span>
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-xl mb-6 flex items-center gap-2 drop-shadow"
            >
              <motion.div 
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                animate={{ rotate: 360 }} 
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <Clock className="w-5 h-5" />
              </motion.div>
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </motion.p>
            <div className="flex flex-wrap gap-3">
              {progress.streak > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.5 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-5 py-2.5 text-base shadow-lg hover:bg-white/30 transition-all">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }} 
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Flame className="w-5 h-5 mr-2 drop-shadow-lg" />
                    </motion.div>
                    {progress.streak} Day Streak 🔥
                  </Badge>
                </motion.div>
              )}
              {progress.totalQuizzes > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.6 }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-5 py-2.5 text-base shadow-lg hover:bg-white/30 transition-all">
                    <motion.div 
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }} 
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Trophy className="w-5 h-5 mr-2 drop-shadow-lg" />
                    </motion.div>
                    {progress.totalQuizzes} Quizzes 🏆
                  </Badge>
                </motion.div>
              )}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.7 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-5 py-2.5 text-base shadow-lg hover:bg-white/30 transition-all">
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📧
                  </motion.span>
                  {' '}{student.email}
                </Badge>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Student Performance Overview */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-6">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-8 h-8 text-purple-600" />
            </motion.div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Your Performance Overview
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, value: progress.totalQuizzes, label: 'Quizzes Completed', gradient: 'from-purple-500 via-pink-500 to-red-500', delay: 0, color: 'purple' },
              { icon: Target, value: `${progress.averageScore}%`, label: 'Average Score', gradient: 'from-blue-500 via-cyan-500 to-teal-500', delay: 0.1, color: 'blue' },
              { icon: Trophy, value: `${progress.bestScore}%`, label: 'Best Score', gradient: 'from-yellow-500 via-orange-500 to-red-500', delay: 0.2, color: 'yellow' },
              { icon: Clock, value: `${progress.hoursStudied}h`, label: 'Time Spent', gradient: 'from-green-500 via-emerald-500 to-teal-500', delay: 0.3, color: 'green' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotate: -10 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: stat.delay, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, rotate: 2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center gap-4 relative z-10">
                      <motion.div 
                        className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        animate={{ y: [0, -5, 0] }}
                        style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}
                      >
                        <stat.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div>
                        <motion.p 
                          className="text-4xl font-bold text-gray-900"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: stat.delay + 0.2 }}
                        >
                          {stat.value}
                        </motion.p>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/dashboard/take-quiz">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -5, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer group overflow-hidden relative h-full">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <motion.div 
                        className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm"
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        animate={{ y: [0, -10, 0] }}
                        style={{ animationDuration: '3s', animationIterationCount: 'infinite' }}
                      >
                        <Brain className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-3xl font-bold text-white mb-2">Take a Quiz</h3>
                      <p className="text-pink-100 text-lg">Start a new quiz and test your knowledge</p>
                    </div>
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Link href="/dashboard/analytics">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05, y: -5, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer group overflow-hidden relative h-full">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <motion.div 
                        className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm"
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        animate={{ y: [0, -10, 0] }}
                        style={{ animationDuration: '3s', animationIterationCount: 'infinite', animationDelay: '1s' }}
                      >
                        <BarChart3 className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-3xl font-bold text-white mb-2">View Analytics</h3>
                      <p className="text-cyan-100 text-lg">Analyze your performance and progress</p>
                    </div>
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </motion.div>

        {/* Recent Activity */}
        {progress.quizzes.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </motion.div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Recent Activity
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {progress.quizzes.slice(-3).reverse().map((quiz: any, index: number) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                  whileHover={{ y: -10, rotate: 2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                    <CardContent className="p-6 relative">
                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div>
                          <h4 className="font-bold text-xl text-gray-900">{quiz.subject}</h4>
                          <p className="text-sm text-gray-600">{quiz.topic}</p>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Badge className={`text-base px-3 py-1 ${
                            quiz.score >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                            quiz.score >= 70 ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                            quiz.score >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                            'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                          }`}>
                            {quiz.score}%
                          </Badge>
                        </motion.div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          </motion.div>
                          {quiz.correctAnswers}/{quiz.totalQuestions}
                        </span>
                        <span>•</span>
                        <span>{new Date(quiz.date).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Motivational Section */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 border-0 shadow-2xl overflow-hidden relative animate-gradient">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 animate-pulse-slow"></div>
            <CardContent className="p-12 text-center relative z-10">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Rocket className="w-20 h-20 text-white mx-auto mb-6 filter drop-shadow-lg" />
              </motion.div>
              <motion.h3 
                className="text-4xl font-bold text-white mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {progress.totalQuizzes === 0 
                  ? "Ready to start your learning journey?" 
                  : progress.averageScore >= 80
                  ? "You're doing amazing! Keep it up!"
                  : "Keep practicing to improve your scores!"}
              </motion.h3>
              <p className="text-white/90 text-xl mb-8">
                {progress.totalQuizzes === 0
                  ? "Take your first quiz and begin tracking your progress"
                  : `You've answered ${progress.correctAnswers} questions correctly so far!`}
              </p>
              <Link href="/dashboard/take-quiz">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-10 py-7 text-xl shadow-2xl">
                    <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                      <Sparkles className="w-6 h-6 mr-3" />
                    </motion.div>
                    Start Learning Now
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
