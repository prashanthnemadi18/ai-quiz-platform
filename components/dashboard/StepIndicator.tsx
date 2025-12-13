"use client";

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Step {
  number: number;
  title: string;
  description: string;
  href: string;
}

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Dashboard',
      description: 'Welcome & Overview',
      href: '/dashboard'
    },
    {
      number: 2,
      title: 'Take Quiz',
      description: 'Test Your Knowledge',
      href: '/dashboard/take-quiz'
    },
    {
      number: 3,
      title: 'Analytics',
      description: 'View Performance',
      href: '/dashboard/analytics'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mb-12">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <Link href={step.href} className="flex flex-col items-center cursor-pointer group">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  delay: index * 0.15 
                }}
                className="relative"
              >
                {/* Glow effect for current step */}
                {currentStep === step.number && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 blur-xl opacity-50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center justify-center w-20 h-20 rounded-full border-4 transition-all duration-300 ${
                    currentStep === step.number
                      ? 'bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 border-violet-400 shadow-2xl'
                      : currentStep > step.number
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-green-400 shadow-lg group-hover:scale-105'
                      : 'bg-white border-gray-300 shadow-md group-hover:border-violet-300 group-hover:shadow-lg'
                  }`}
                >
                  {currentStep > step.number ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Check className="w-10 h-10 text-white" strokeWidth={3} />
                    </motion.div>
                  ) : currentStep === step.number ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-10 h-10 text-white" />
                    </motion.div>
                  ) : (
                    <span className="text-3xl font-bold text-gray-400 group-hover:text-violet-500 transition-colors">
                      {step.number}
                    </span>
                  )}
                </motion.div>
              </motion.div>
              
              {/* Step Info */}
              <motion.div 
                className="mt-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.2 }}
              >
                <p className={`font-bold text-base transition-colors ${
                  currentStep === step.number 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600' 
                    : currentStep > step.number
                    ? 'text-green-600 group-hover:text-green-700'
                    : 'text-gray-400 group-hover:text-violet-500'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-700 transition-colors">{step.description}</p>
              </motion.div>
            </Link>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-2 mx-6 mb-16 relative">
                <div className="h-full rounded-full bg-gray-300" />
                <motion.div 
                  className={`absolute top-0 left-0 h-full rounded-full ${
                    currentStep > step.number
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : 'bg-gray-300'
                  }`}
                  initial={{ width: '0%' }}
                  animate={{ width: currentStep > step.number ? '100%' : '0%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                {/* Animated dots */}
                {currentStep > step.number && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
                    animate={{ left: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
