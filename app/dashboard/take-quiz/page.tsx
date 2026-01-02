"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Flag,
  Sparkles,
  Trophy,
  RefreshCw,
  Download
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import StepIndicator from '@/components/dashboard/StepIndicator';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: string;
  explanation?: string;
}

export default function TakeQuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [quizConfig, setQuizConfig] = useState({
    subject: '',
    topic: '',
    difficulty: 'auto',
    questionTypes: ['mcq'], // Default to MCQ only
    questionCount: 5,
    timeLimit: 0 // 0 means no time limit
  });
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [configuring, setConfiguring] = useState(true);
  const [generating, setGenerating] = useState(false);

  const generateQuestions = async () => {
    setGenerating(true);
    try {
      const { generateEducationalContent } = await import('@/ai/flows/generate-educational-content');
      
      // Pass the selected question types to AI
      const result = await generateEducationalContent({
        topic: `${quizConfig.subject}: ${quizConfig.topic}`,
        questionCount: quizConfig.questionCount,
        types: quizConfig.questionTypes as any, // This will be ['mcq'], ['tf'], ['short'], or combinations
        difficulty: quizConfig.difficulty === 'auto' ? undefined : quizConfig.difficulty as any
      });

      const formattedQuestions: Question[] = result.questions.map((q: any, index: number) => ({
        id: index + 1,
        question: q.question,
        options: q.choices || ['True', 'False'],
        correctAnswer: q.choices ? q.choices.findIndex((c: string) => c === q.answer) : 0,
        subject: quizConfig.subject,
        difficulty: quizConfig.difficulty === 'auto' ? 'Mixed' : quizConfig.difficulty,
        explanation: q.explanation || `The correct answer is: ${q.answer}`
      }));

      setQuestions(formattedQuestions);
      setConfiguring(false);
      setGenerating(false);
    } catch (error) {
      console.error('Error generating questions:', error);
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (quizStarted && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        
        // Handle time limit countdown
        if (quizConfig.timeLimit > 0) {
          setTimeRemaining(prev => {
            if (prev <= 1) {
              // Time's up! Auto-submit
              handleSubmit();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, quizCompleted]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    if (quizConfig.timeLimit > 0) {
      setTimeRemaining(quizConfig.timeLimit * 60); // Convert minutes to seconds
    }
  };

  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setQuizCompleted(true);
    
    // Calculate results
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);
    
    // Save results to localStorage
    const studentData = localStorage.getItem('student');
    if (studentData) {
      const student = JSON.parse(studentData);
      const progressKey = `progress_${student.id}`;
      const progress = JSON.parse(localStorage.getItem(progressKey) || '{}');
      
      const quizResult = {
        id: Date.now().toString(),
        subject: quizConfig.subject,
        topic: quizConfig.topic,
        score: score,
        totalQuestions: questions.length,
        correctAnswers: correct,
        date: new Date().toISOString(),
        difficulty: quizConfig.difficulty,
        timeSpent: timeElapsed,
        questionTypes: quizConfig.questionTypes.join(', ')
      };

      const updatedProgress = {
        ...progress,
        quizzes: [...(progress.quizzes || []), quizResult],
        totalQuizzes: (progress.totalQuizzes || 0) + 1,
        averageScore: progress.totalQuizzes 
          ? Math.round(((progress.averageScore * progress.totalQuizzes) + score) / (progress.totalQuizzes + 1))
          : score,
        bestScore: Math.max(progress.bestScore || 0, score),
        totalQuestions: (progress.totalQuestions || 0) + questions.length,
        correctAnswers: (progress.correctAnswers || 0) + correct,
        hoursStudied: (progress.hoursStudied || 0) + Math.round(timeElapsed / 3600),
        lastActivityDate: new Date().toISOString()
      };

      localStorage.setItem(progressKey, JSON.stringify(updatedProgress));
    }

    // Redirect to analytics after 5 seconds
    setTimeout(() => {
      router.push('/dashboard/analytics');
    }, 5000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper function to decode HTML entities
  const decodeHTML = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const downloadPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    const studentData = localStorage.getItem('student');
    const student = studentData ? JSON.parse(studentData) : { name: 'Student' };
    
    const correct = questions.filter((q, i) => selectedAnswers[i] === q.correctAnswer).length;
    const score = Math.round((correct / questions.length) * 100);
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(88, 28, 135); // violet
    doc.text('Quiz Results and Answer Key', 105, 20, { align: 'center' });
    
    // Student Info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Student: ${decodeHTML(student.name)}`, 20, 35);
    doc.text(`Subject: ${decodeHTML(quizConfig.subject)}`, 20, 42);
    doc.text(`Topic: ${decodeHTML(quizConfig.topic)}`, 20, 49);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 56);
    doc.text(`Score: ${score}% (${correct}/${questions.length})`, 20, 63);
    doc.text(`Time: ${formatTime(timeElapsed)}`, 20, 70);
    
    // Line separator
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 75, 190, 75);
    
    let yPos = 85;
    
    // Questions and Answers
    questions.forEach((q, index) => {
      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      const userAnswer = selectedAnswers[index];
      const isCorrect = userAnswer === q.correctAnswer;
      
      // Question number and text
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'bold');
      doc.text(`Question ${index + 1}:`, 20, yPos);
      yPos += 7;
      
      doc.setFont(undefined, 'normal');
      const decodedQuestion = decodeHTML(q.question);
      const questionLines = doc.splitTextToSize(decodedQuestion, 170);
      doc.text(questionLines, 20, yPos);
      yPos += questionLines.length * 7;
      
      // Options
      q.options.forEach((option, optIndex) => {
        const letter = String.fromCharCode(65 + optIndex);
        const isUserAnswer = userAnswer === optIndex;
        const isCorrectAnswer = q.correctAnswer === optIndex;
        
        if (isCorrectAnswer) {
          doc.setTextColor(34, 197, 94); // green
          doc.setFont(undefined, 'bold');
        } else if (isUserAnswer && !isCorrect) {
          doc.setTextColor(239, 68, 68); // red
          doc.setFont(undefined, 'bold');
        } else {
          doc.setTextColor(100, 100, 100);
          doc.setFont(undefined, 'normal');
        }
        
        const decodedOption = decodeHTML(option);
        const optionText = `${letter}) ${decodedOption}`;
        const optionLines = doc.splitTextToSize(optionText, 165);
        doc.text(optionLines, 25, yPos);
        yPos += optionLines.length * 6;
      });
      
      // Your answer
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'normal');
      yPos += 3;
      const yourAnswerText = userAnswer !== undefined 
        ? `Your Answer: ${String.fromCharCode(65 + userAnswer)} - ${isCorrect ? 'Correct' : 'Incorrect'}`
        : 'Your Answer: Not answered';
      doc.text(yourAnswerText, 25, yPos);
      yPos += 7;
      
      // Correct answer
      doc.setTextColor(34, 197, 94);
      doc.text(`Correct Answer: ${String.fromCharCode(65 + q.correctAnswer)}`, 25, yPos);
      yPos += 7;
      
      // Explanation
      if (q.explanation) {
        doc.setTextColor(88, 28, 135); // violet
        doc.setFont(undefined, 'bold');
        doc.text('Explanation:', 25, yPos);
        yPos += 6;
        
        doc.setTextColor(60, 60, 60);
        doc.setFont(undefined, 'normal');
        const decodedExplanation = decodeHTML(q.explanation);
        const explanationLines = doc.splitTextToSize(decodedExplanation, 165);
        doc.text(explanationLines, 25, yPos);
        yPos += explanationLines.length * 6;
      }
      
      // Separator line
      yPos += 5;
      doc.setDrawColor(220, 220, 220);
      doc.line(20, yPos, 190, yPos);
      yPos += 10;
    });
    
    // Save the PDF
    const fileName = `Quiz_${quizConfig.subject}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(selectedAnswers).length;

  if (configuring) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50 p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <StepIndicator currentStep={2} />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-600 to-blue-600 rounded-3xl mb-6 shadow-2xl">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Configure Your Quiz
            </h1>
            <p className="text-gray-600 text-lg">
              Choose your subject, topic, and preferences
            </p>
          </motion.div>

          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Subject Name</label>
                <input
                  type="text"
                  value={quizConfig.subject}
                  onChange={(e) => setQuizConfig({...quizConfig, subject: e.target.value})}
                  placeholder="e.g., Computer Science, Mathematics, Physics, History"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none"
                />
                <p className="text-xs text-gray-500">Enter any subject you want to study</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Topic</label>
                <input
                  type="text"
                  value={quizConfig.topic}
                  onChange={(e) => setQuizConfig({...quizConfig, topic: e.target.value})}
                  placeholder="e.g., Data Structures, Calculus, Photosynthesis, World War II"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none"
                />
                <p className="text-xs text-gray-500">Specify the topic within your subject</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Difficulty</label>
                <div className="grid grid-cols-4 gap-3">
                  {['auto', 'easy', 'medium', 'hard'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setQuizConfig({...quizConfig, difficulty: diff})}
                      className={`p-3 rounded-xl font-semibold capitalize transition-all ${
                        quizConfig.difficulty === diff
                          ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Question Types</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'mcq', label: 'Multiple Choice' },
                    { value: 'tf', label: 'True/False' },
                    { value: 'short', label: 'Fill in Blank' }
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => {
                        const types = quizConfig.questionTypes.includes(type.value)
                          ? quizConfig.questionTypes.filter(t => t !== type.value)
                          : [...quizConfig.questionTypes, type.value];
                        // Ensure at least one type is selected
                        if (types.length > 0) {
                          setQuizConfig({...quizConfig, questionTypes: types});
                        }
                      }}
                      className={`p-3 rounded-xl font-semibold text-sm transition-all ${
                        quizConfig.questionTypes.includes(type.value)
                          ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Selected: {quizConfig.questionTypes.map(t => 
                    t === 'mcq' ? 'Multiple Choice' : 
                    t === 'tf' ? 'True/False' : 
                    'Fill in Blank'
                  ).join(', ')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Number of Questions</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={quizConfig.questionCount}
                    onChange={(e) => setQuizConfig({...quizConfig, questionCount: Math.max(1, Math.min(100, Number(e.target.value)))})}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none"
                    placeholder="e.g., 10"
                  />
                  <p className="text-xs text-gray-500">Choose 1-100 questions</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Time Limit (minutes)</label>
                  <input
                    type="number"
                    min="0"
                    max="180"
                    value={quizConfig.timeLimit}
                    onChange={(e) => setQuizConfig({...quizConfig, timeLimit: Math.max(0, Math.min(180, Number(e.target.value)))})}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none"
                    placeholder="0 = No limit"
                  />
                  <p className="text-xs text-gray-500">0 = No time limit</p>
                </div>
              </div>

              {/* Quiz Summary */}
              <div className="p-4 bg-gradient-to-r from-violet-50 to-blue-50 rounded-xl border-2 border-violet-200">
                <h3 className="font-bold text-gray-900 mb-2">Quiz Summary:</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>📚 <strong>Subject:</strong> {quizConfig.subject || 'Not set'}</p>
                  <p>📖 <strong>Topic:</strong> {quizConfig.topic || 'Not set'}</p>
                  <p>🎯 <strong>Difficulty:</strong> {quizConfig.difficulty.charAt(0).toUpperCase() + quizConfig.difficulty.slice(1)}</p>
                  <p>❓ <strong>Questions:</strong> {quizConfig.questionCount}</p>
                  <p>⏱️ <strong>Time Limit:</strong> {quizConfig.timeLimit > 0 ? `${quizConfig.timeLimit} minutes` : 'No limit'}</p>
                  <p>📝 <strong>Types:</strong> {quizConfig.questionTypes.map(t => 
                    t === 'mcq' ? 'Multiple Choice' : 
                    t === 'tf' ? 'True/False' : 
                    'Fill in Blank'
                  ).join(', ')}</p>
                </div>
              </div>

              <Button
                onClick={generateQuestions}
                disabled={!quizConfig.subject || !quizConfig.topic || quizConfig.questionTypes.length === 0 || generating}
                className="w-full h-14 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold text-lg shadow-xl"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating {quizConfig.questionCount} Questions...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Quiz
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50 p-8">
        <div className="max-w-4xl mx-auto">
          <StepIndicator currentStep={2} />
          <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full"
        >
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-violet-600 to-blue-600 rounded-3xl mb-6 shadow-2xl"
              >
                <Brain className="w-12 h-12 text-white" />
              </motion.div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Ready to Start?</h1>
              <p className="text-gray-600 text-lg mb-8">
                You're about to take a quiz with {questions.length} questions. Good luck!
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-violet-50 rounded-xl border-2 border-violet-200">
                  <p className="text-3xl font-bold text-violet-600">{questions.length}</p>
                  <p className="text-sm text-gray-600">Questions</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <p className="text-3xl font-bold text-blue-600 capitalize">{quizConfig.difficulty}</p>
                  <p className="text-sm text-gray-600">Difficulty</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                  <p className="text-3xl font-bold text-green-600">
                    {quizConfig.timeLimit > 0 ? `${quizConfig.timeLimit}min` : 'No Limit'}
                  </p>
                  <p className="text-sm text-gray-600">Time Limit</p>
                </div>
              </div>

              <Button
                onClick={handleStartQuiz}
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-12 py-6 text-lg rounded-xl shadow-xl"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const correct = questions.filter((q, i) => selectedAnswers[i] === q.correctAnswer).length;
    const score = Math.round((correct / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50 p-8">
        <div className="max-w-4xl mx-auto">
          <StepIndicator currentStep={2} />
          <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full"
        >
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-2xl"
              >
                <Trophy className="w-12 h-12 text-white" />
              </motion.div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Completed!</h1>
              <p className="text-gray-600 text-lg mb-8">
                Great job! Here's how you performed:
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                  <p className="text-4xl font-bold text-green-600">{score}%</p>
                  <p className="text-sm text-gray-600">Score</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <p className="text-4xl font-bold text-blue-600">{correct}/{questions.length}</p>
                  <p className="text-sm text-gray-600">Correct</p>
                </div>
                <div className="p-6 bg-violet-50 rounded-xl border-2 border-violet-200">
                  <p className="text-4xl font-bold text-violet-600">{formatTime(timeElapsed)}</p>
                  <p className="text-sm text-gray-600">Time</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center mb-6">
                <Button
                  onClick={downloadPDF}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF Report
                </Button>
                <Button
                  onClick={() => router.push('/dashboard/analytics')}
                  size="lg"
                  variant="outline"
                >
                  View Analytics
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <p className="text-gray-600 text-sm mb-4">Auto-redirecting to analytics in 5 seconds...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5 }}
                  className="bg-gradient-to-r from-violet-600 to-blue-600 h-2 rounded-full"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <StepIndicator currentStep={2} />
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quiz in Progress</h1>
              <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {quizConfig.timeLimit > 0 ? (
              <Badge className={`px-4 py-2 ${
                timeRemaining < 60 
                  ? 'bg-red-100 text-red-700 border-red-200 animate-pulse' 
                  : timeRemaining < 180
                  ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                  : 'bg-green-100 text-green-700 border-green-200'
              }`}>
                <Clock className="w-4 h-4 mr-2" />
                {formatTime(timeRemaining)} Left
              </Badge>
            ) : (
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                {formatTime(timeElapsed)}
              </Badge>
            )}
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
              {answeredCount}/{questions.length} Answered
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-gray-600 text-center">{Math.round(progress)}% Complete</p>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white font-bold text-lg">{currentQuestion + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline" className="border-violet-300 text-violet-700 bg-violet-50">
                        {currentQ.subject}
                      </Badge>
                      <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                        {currentQ.difficulty}
                      </Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentQ.question}</h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectAnswer(index)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-violet-500 bg-gradient-to-r from-violet-50 to-blue-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-violet-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          selectedAnswers[currentQuestion] === index
                            ? 'bg-gradient-to-br from-violet-600 to-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-gray-900 font-medium flex-1">{option}</span>
                        {selectedAnswers[currentQuestion] === index && (
                          <CheckCircle className="w-6 h-6 text-violet-600" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                  index === currentQuestion
                    ? 'bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg'
                    : selectedAnswers[index] !== undefined
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={answeredCount < questions.length}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Flag className="w-4 h-4 mr-2" />
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
