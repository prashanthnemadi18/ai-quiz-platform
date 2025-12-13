"use client";

import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, Trophy, Target, Users, Star, ArrowRight, CheckCircle, BookOpen, BarChart3, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 relative overflow-hidden">
      {/* Stunning animated background with floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient blobs with realistic movement */}
        <motion.div 
          className="absolute w-[800px] h-[800px] bg-gradient-to-br from-blue-400/30 via-sky-400/25 to-cyan-400/30 rounded-full blur-3xl"
          animate={{ 
            x: [0, 150, -50, 0],
            y: [0, 100, -50, 0],
            scale: [1, 1.3, 0.9, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '-20%', left: '-15%' }}
        />
        <motion.div 
          className="absolute w-[700px] h-[700px] bg-gradient-to-br from-violet-400/25 via-purple-400/20 to-pink-400/25 rounded-full blur-3xl"
          animate={{ 
            x: [0, -120, 80, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.4, 0.8, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: '-20%', right: '-15%' }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/20 via-teal-400/15 to-emerald-400/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, -80, 0],
            y: [0, -100, 80, 0],
            scale: [1, 1.5, 0.7, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '35%', right: '10%' }}
        />
        
        {/* Floating bubble particles with realistic physics */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full backdrop-blur-sm"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              background: `radial-gradient(circle, ${
                ['rgba(59, 130, 246, 0.4)', 'rgba(14, 165, 233, 0.4)', 'rgba(6, 182, 212, 0.4)'][Math.floor(Math.random() * 3)]
              }, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * -300 - 200, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Shimmer effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 360 }}
            className="inline-block mb-8 relative"
          >
            {/* Glow effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl blur-2xl opacity-50"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative w-28 h-28 bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-14 h-14 text-white drop-shadow-lg" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-7xl font-black text-gray-900 mb-4 drop-shadow-sm"
          >
            Master Any Subject with
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-7xl font-black mb-8 relative"
          >
            <motion.span 
              className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              AI-Powered Quizzes
            </motion.span>
            {/* Sparkle effects */}
            <motion.div
              className="absolute -top-4 -right-4"
              animate={{ 
                scale: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-700 mb-10 max-w-3xl mx-auto font-medium"
          >
            Transform your learning with intelligent quizzes, instant feedback, and personalized analytics
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link href="/login">
              <motion.div 
                whileHover={{ scale: 1.08, y: -8 }} 
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                {/* Button glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-50"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Button size="lg" className="relative bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 hover:from-blue-600 hover:via-sky-600 hover:to-cyan-600 text-white px-12 py-8 text-xl rounded-2xl shadow-2xl font-bold overflow-hidden group">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6 mr-2" />
                  </motion.div>
                  Get Started Free
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {[
            { icon: Users, value: '10K+', label: 'Active Students', gradient: 'from-blue-400 to-cyan-400' },
            { icon: Target, value: '95%', label: 'Success Rate', gradient: 'from-green-400 to-emerald-400' },
            { icon: Zap, value: '50K+', label: 'Quizzes Completed', gradient: 'from-yellow-400 to-orange-400' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <Card className="relative bg-white/90 backdrop-blur-xl border-2 border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                
                {/* Floating bubble decoration */}
                <motion.div 
                  className="absolute w-24 h-24 bg-blue-400/10 rounded-full blur-2xl"
                  animate={{ 
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ top: '10%', right: '10%' }}
                />
                
                <CardContent className="relative p-8 text-center">
                  <motion.div 
                    className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    animate={{ y: [0, -5, 0] }}
                    style={{ animationDuration: '3s', animationIterationCount: 'infinite' }}
                  >
                    <stat.icon className="w-10 h-10 text-white drop-shadow-lg" />
                  </motion.div>
                  <motion.h3 
                    className="text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.8 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-gray-600 font-semibold text-lg">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-black text-gray-900 text-center mb-4">Powerful Features</h2>
          <p className="text-gray-600 text-xl text-center mb-12">Everything you need for better learning</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: 'AI-Powered', desc: 'Smart question generation', gradient: 'from-purple-400 to-pink-400' },
              { icon: BookOpen, title: 'Any Subject', desc: 'Study what you want', gradient: 'from-blue-400 to-cyan-400' },
              { icon: BarChart3, title: 'Analytics', desc: 'Track your progress', gradient: 'from-green-400 to-emerald-400' },
              { icon: Trophy, title: 'Instant Feedback', desc: 'Learn from mistakes', gradient: 'from-yellow-400 to-orange-400' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <Card className="relative bg-white/90 backdrop-blur-xl border-2 border-white/50 shadow-xl hover:shadow-2xl h-full transition-all duration-500 overflow-hidden group">
                  {/* Hover gradient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Floating bubble */}
                  <motion.div 
                    className="absolute w-16 h-16 bg-blue-400/10 rounded-full blur-xl"
                    animate={{ 
                      x: [0, 20, 0],
                      y: [0, -15, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    style={{ top: '5%', right: '5%' }}
                  />
                  
                  <CardContent className="relative p-6">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      transition={{ duration: 0.5 }}
                      animate={{ 
                        y: [0, -8, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      style={{ animationDuration: '4s', animationIterationCount: 'infinite' }}
                    >
                      <feature.icon className="w-8 h-8 text-white drop-shadow-lg" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mb-20"
        >
          <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-black text-gray-900 mb-6">Why Choose AI-Based Personalized Learning & Testing Platform?</h2>
                  <p className="text-xl text-gray-600 mb-8">Get the best tools to accelerate your learning journey</p>
                  
                  <div className="space-y-4">
                    {[
                      'Personalized learning experience',
                      'Instant AI-generated quizzes',
                      'Real-time performance tracking',
                      'Download detailed PDF reports',
                      'Study any subject, anytime',
                      '100% free to get started'
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium text-lg">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -20, 0]
                  }}
                  transition={{ 
                    opacity: { delay: 1.7 },
                    scale: { delay: 1.7 },
                    y: { duration: 3, repeat: Infinity }
                  }}
                  className="relative"
                >
                  <div className="w-full h-96 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 rounded-3xl flex items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Star className="w-32 h-32 text-white mx-auto mb-4 fill-white" />
                      </motion.div>
                      <h3 className="text-4xl font-black text-white">Ready to Get Started?</h3>
                      <p className="text-xl text-white/90 mt-2">Join thousands of successful learners</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 border-0 shadow-2xl">
            <CardContent className="p-16">
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Rocket className="w-20 h-20 text-white mx-auto mb-6" />
              </motion.div>
              <h2 className="text-5xl font-black text-white mb-4">Start Learning Today!</h2>
              <p className="text-2xl text-white/90 mb-10">Create your free account in minutes</p>
              <Link href="/login">
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-8 text-2xl rounded-2xl shadow-2xl font-black">
                    <Sparkles className="w-7 h-7 mr-3" />
                    Get Started Now
                    <ArrowRight className="w-7 h-7 ml-3" />
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
