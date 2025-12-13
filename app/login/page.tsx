"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, Lock, Mail, ArrowRight, Sparkles, Shield, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentData = {
      id: Date.now().toString(),
      name: name || email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      joinedDate: new Date().toISOString(),
      isOnline: true
    };
    localStorage.setItem('student', JSON.stringify(studentData));
    router.push('/dashboard');
  };

  const features = [
    { icon: Shield, text: 'Secure Authentication', color: 'text-blue-500' },
    { icon: Zap, text: 'Lightning Fast', color: 'text-yellow-500' },
    { icon: CheckCircle, text: 'AI-Powered', color: 'text-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 relative overflow-hidden flex items-center justify-center p-6">
      {/* Stunning animated background with floating bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large animated gradient blobs */}
        <motion.div 
          className="absolute w-[700px] h-[700px] bg-gradient-to-br from-blue-400/30 via-sky-400/20 to-cyan-400/30 rounded-full blur-3xl"
          animate={{ 
            x: [0, 150, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '-15%', left: '-10%' }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] bg-gradient-to-br from-violet-400/25 via-purple-400/20 to-pink-400/25 rounded-full blur-3xl"
          animate={{ 
            x: [0, -120, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: '-15%', right: '-10%' }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/20 via-teal-400/15 to-emerald-400/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 80, 0],
            y: [0, -80, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '40%', right: '15%' }}
        />
        
        {/* Floating bubble particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/30 rounded-full backdrop-blur-sm"
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * -200 - 100, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="space-y-8">
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                    AI-Based Personalized Learning & Testing Platform
                  </h1>
                  <p className="text-gray-600 text-sm">Next-Gen Learning Platform</p>
                </div>
              </motion.div>

              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl font-bold text-gray-900 mb-4 leading-tight"
                >
                  Welcome Back to
                  <span className="block bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Your Learning Journey
                  </span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 text-lg"
                >
                  Secure, adaptive, AI-driven quizzes and automated question generation. 
                  Sign in to continue your progress.
                </motion.p>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-md">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-800 font-semibold">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-3"
              >
                <div className="px-4 py-2 rounded-lg bg-violet-100 border border-violet-200 text-violet-700 text-sm font-medium">
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  AI-Powered
                </div>
                <div className="px-4 py-2 rounded-lg bg-blue-100 border border-blue-200 text-blue-700 text-sm font-medium">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Secure
                </div>
                <div className="px-4 py-2 rounded-lg bg-green-100 border border-green-200 text-green-700 text-sm font-medium">
                  <Zap className="w-4 h-4 inline mr-2" />
                  Fast
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ y: -5 }}
          >
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl overflow-hidden">
              {/* Animated gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              
              {/* Floating bubbles inside card */}
              <motion.div 
                className="absolute w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"
                animate={{ 
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ top: '10%', right: '10%' }}
              />
              <motion.div 
                className="absolute w-24 h-24 bg-sky-400/10 rounded-full blur-2xl"
                animate={{ 
                  x: [0, -40, 0],
                  y: [0, 40, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{ bottom: '15%', left: '10%' }}
              />
              
              <div className="relative z-10">
              <div className="text-center mb-8">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover={{ scale: 1.2, rotate: 45 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 mb-4 shadow-2xl relative"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 blur-xl opacity-50 animate-pulse"></div>
                  <Lock className="w-10 h-10 text-white relative z-10 drop-shadow-lg" />
                </motion.div>
                <motion.h3 
                  className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent mb-2"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Sign In
                </motion.h3>
                <p className="text-gray-600 text-lg">Enter your credentials to access your dashboard</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label htmlFor="name" className="text-gray-700 font-semibold">Full Name</Label>
                  <div className="relative group">
                    <motion.div 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-blue-100 to-sky-100 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Brain className="w-5 h-5 text-blue-600" />
                    </motion.div>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-16 bg-white/80 backdrop-blur-sm border-2 border-blue-100 h-14 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all duration-300 hover:border-blue-300"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="email" className="text-gray-700 font-semibold">Email Address</Label>
                  <div className="relative group">
                    <motion.div 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      <Mail className="w-5 h-5 text-sky-600" />
                    </motion.div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@school.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-16 bg-white/80 backdrop-blur-sm border-2 border-sky-100 h-14 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:bg-white transition-all duration-300 hover:border-sky-300"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
                  <div className="relative group">
                    <motion.div 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Lock className="w-5 h-5 text-cyan-600" />
                    </motion.div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-16 bg-white/80 backdrop-blur-sm border-2 border-cyan-100 h-14 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:bg-white transition-all duration-300 hover:border-cyan-300"
                      required
                    />
                  </div>
                </motion.div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" className="border-gray-300" />
                    <label htmlFor="remember" className="text-sm text-gray-700 cursor-pointer">
                      Remember me
                    </label>
                  </div>
                  <button type="button" className="text-sm text-violet-600 hover:text-violet-700 transition-colors">
                    Forgot password?
                  </button>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.03, y: -2 }} 
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    type="submit"
                    className="relative w-full h-14 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 hover:from-blue-600 hover:via-sky-600 hover:to-cyan-600 text-white font-bold text-lg rounded-xl shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Sign In
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or sign in with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 bg-gray-50 border-gray-300 hover:bg-white hover:border-violet-300 rounded-xl transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 bg-gray-50 border-gray-300 hover:bg-white hover:border-violet-300 rounded-xl transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                      GitHub
                    </Button>
                  </motion.div>
                </div>
              </form>

              <motion.p 
                className="mt-6 text-center text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                By signing in you agree to our{' '}
                <button className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors">Terms</button>
                {' '}and{' '}
                <button className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors">Privacy</button>.
              </motion.p>
              </div>
            </div>

            {/* Mobile branding */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="lg:hidden mt-8 text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  AI-Based Personalized Learning & Testing Platform
                </span>
              </div>
              <p className="text-gray-600 text-sm">Empowering students with AI-driven learning</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
