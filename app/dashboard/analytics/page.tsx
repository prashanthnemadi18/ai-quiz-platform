"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Trophy, 
  Target, 
  Clock,
  BookOpen,
  Award,
  Zap,
  CheckCircle,
  XCircle,
  Brain,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import StepIndicator from '@/components/dashboard/StepIndicator';

interface QuizResult {
  id: string;
  subject: string;
  topic: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  date: string;
  difficulty: string;
  timeSpent: number;
  questionTypes?: string;
}

interface SubjectPerformance {
  subject: string;
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  totalQuestions: number;
  correctAnswers: number;
}

export default function AnalyticsPage() {
  const [quizzes, setQuizzes] = useState<QuizResult[]>([]);
  const [subjectPerformance, setSubjectPerformance] = useState<SubjectPerformance[]>([]);
  const [overallStats, setOverallStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    totalTime: 0,
    totalQuestions: 0,
    correctAnswers: 0
  });

  useEffect(() => {
    const studentData = localStorage.getItem('student');
    if (studentData) {
      const student = JSON.parse(studentData);
      const progressKey = `progress_${student.id}`;
      const progress = JSON.parse(localStorage.getItem(progressKey) || '{}');
      
      if (progress.quizzes) {
        setQuizzes(progress.quizzes);
        calculateAnalytics(progress.quizzes);
      }
    }
  }, []);

  const calculateAnalytics = (quizData: QuizResult[]) => {
    // Overall stats
    const totalQuizzes = quizData.length;
    const totalScore = quizData.reduce((sum, q) => sum + q.score, 0);
    const averageScore = totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;
    const bestScore = Math.max(...quizData.map(q => q.score), 0);
    const totalTime = quizData.reduce((sum, q) => sum + (q.timeSpent || 0), 0);
    const totalQuestions = quizData.reduce((sum, q) => sum + q.totalQuestions, 0);
    const correctAnswers = quizData.reduce((sum, q) => sum + q.correctAnswers, 0);

    setOverallStats({
      totalQuizzes,
      averageScore,
      bestScore,
      totalTime,
      totalQuestions,
      correctAnswers
    });

    // Subject-wise performance
    const subjectMap = new Map<string, SubjectPerformance>();
    
    quizData.forEach(quiz => {
      const existing = subjectMap.get(quiz.subject) || {
        subject: quiz.subject,
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalQuestions: 0,
        correctAnswers: 0
      };

      existing.totalQuizzes++;
      existing.averageScore = Math.round(
        ((existing.averageScore * (existing.totalQuizzes - 1)) + quiz.score) / existing.totalQuizzes
      );
      existing.bestScore = Math.max(existing.bestScore, quiz.score);
      existing.totalQuestions += quiz.totalQuestions;
      existing.correctAnswers += quiz.correctAnswers;

      subjectMap.set(quiz.subject, existing);
    });

    setSubjectPerformance(Array.from(subjectMap.values()));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 70) return 'from-blue-500 to-cyan-600';
    if (score >= 50) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: 'Excellent', color: 'bg-green-100 text-green-700 border-green-200' };
    if (score >= 70) return { text: 'Good', color: 'bg-blue-100 text-blue-700 border-blue-200' };
    if (score >= 50) return { text: 'Average', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    return { text: 'Needs Improvement', color: 'bg-red-100 text-red-700 border-red-200' };
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  if (quizzes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50 p-8">
        <div className="max-w-7xl mx-auto">
          <StepIndicator currentStep={3} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-violet-100 to-blue-100 rounded-full mb-6">
              <BarChart3 className="w-12 h-12 text-violet-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Analytics Yet</h2>
            <p className="text-gray-600 text-lg mb-8">
              Complete some quizzes to see your performance analytics!
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Step Indicator */}
        <StepIndicator currentStep={3} />
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-600 to-blue-600 rounded-3xl mb-6 shadow-2xl">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Performance Analytics
          </h1>
          <p className="text-gray-600 text-lg">
            Detailed insights into your learning progress
          </p>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-gray-900">{overallStats.totalQuizzes}</p>
                  <p className="text-gray-600 text-sm">Total Quizzes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-gray-900">{overallStats.averageScore}%</p>
                  <p className="text-gray-600 text-sm">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-gray-900">{overallStats.bestScore}%</p>
                  <p className="text-gray-600 text-sm">Best Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-gray-900">{formatTime(overallStats.totalTime)}</p>
                  <p className="text-gray-600 text-sm">Time Spent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Accuracy Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-violet-600" />
                Overall Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Questions Answered Correctly</span>
                  <span className="text-sm font-bold text-violet-600">
                    {overallStats.totalQuestions > 0 
                      ? Math.round((overallStats.correctAnswers / overallStats.totalQuestions) * 100)
                      : 0}%
                  </span>
                </div>
                <Progress 
                  value={overallStats.totalQuestions > 0 
                    ? (overallStats.correctAnswers / overallStats.totalQuestions) * 100 
                    : 0} 
                  className="h-3"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {overallStats.correctAnswers} of {overallStats.totalQuestions} questions correct
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Correct</span>
                  </div>
                  <p className="text-3xl font-bold text-green-600">{overallStats.correctAnswers}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-semibold text-gray-700">Incorrect</span>
                  </div>
                  <p className="text-3xl font-bold text-red-600">
                    {overallStats.totalQuestions - overallStats.correctAnswers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subject-wise Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-violet-600" />
                Subject-wise Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectPerformance.map((subject, index) => (
                  <motion.div
                    key={subject.subject}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-6 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-violet-300 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${getScoreColor(subject.averageScore)} rounded-xl flex items-center justify-center shadow-lg`}>
                          <BookOpen className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{subject.subject}</h3>
                          <p className="text-sm text-gray-600">{subject.totalQuizzes} quizzes completed</p>
                        </div>
                      </div>
                      <Badge className={`${getScoreBadge(subject.averageScore).color} border px-4 py-2`}>
                        {getScoreBadge(subject.averageScore).text}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-2xl font-bold text-violet-600">{subject.averageScore}%</p>
                        <p className="text-xs text-gray-600">Avg Score</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-2xl font-bold text-green-600">{subject.bestScore}%</p>
                        <p className="text-xs text-gray-600">Best Score</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-2xl font-bold text-blue-600">{subject.totalQuestions}</p>
                        <p className="text-xs text-gray-600">Questions</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-2xl font-bold text-orange-600">
                          {Math.round((subject.correctAnswers / subject.totalQuestions) * 100)}%
                        </p>
                        <p className="text-xs text-gray-600">Accuracy</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Quizzes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-violet-600" />
                Recent Quiz History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quizzes.slice().reverse().slice(0, 10).map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-violet-300 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-12 h-12 bg-gradient-to-br ${getScoreColor(quiz.score)} rounded-xl flex items-center justify-center shadow-lg`}>
                          <span className="text-white font-bold text-lg">{quiz.score}%</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">{quiz.subject}</h4>
                          <p className="text-sm text-gray-600">{quiz.topic}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs border-violet-300 text-violet-700 bg-violet-50">
                              {quiz.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-blue-300 text-blue-700 bg-blue-50">
                              {quiz.correctAnswers}/{quiz.totalQuestions} correct
                            </Badge>
                            <Badge variant="outline" className="text-xs border-gray-300 text-gray-700 bg-gray-50">
                              {formatTime(quiz.timeSpent)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {new Date(quiz.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
