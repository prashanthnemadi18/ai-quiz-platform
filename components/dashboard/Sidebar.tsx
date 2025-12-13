"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Brain,
  BarChart3,
  Sparkles,
  LogOut,
  User
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const menuItems = [
  { 
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    href: '/dashboard',
    gradient: 'from-purple-500 to-pink-500',
    description: 'Welcome & Overview',
    exact: true
  },
  { 
    icon: Brain, 
    label: 'Take Quiz', 
    href: '/dashboard/take-quiz',
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Test Your Knowledge',
    exact: false
  },
  { 
    icon: BarChart3, 
    label: 'Analytics', 
    href: '/dashboard/analytics',
    gradient: 'from-green-500 to-emerald-500',
    description: 'View Performance',
    exact: false
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const studentData = localStorage.getItem('student');
    if (studentData) {
      setStudent(JSON.parse(studentData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('student');
    router.push('/login');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        aria-label="Toggle menu"
      >
        <motion.div
          animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </motion.div>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-72 bg-gradient-to-br from-blue-50 via-sky-50 to-white border-r border-blue-100/50 p-6 z-50 shadow-xl overflow-y-auto transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Animated bubble decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div 
          className="absolute w-24 h-24 bg-sky-400/10 rounded-full blur-2xl"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '40%', right: '10%' }}
        />
        <motion.div 
          className="absolute w-28 h-28 bg-cyan-400/10 rounded-full blur-2xl"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: '20%', left: '15%' }}
        />
      </div>

      {/* Logo */}
      <Link href="/dashboard">
        <motion.div 
          className="relative flex items-center gap-3 mb-8 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Brain className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent block leading-tight">
              AI-Based Personalized Learning & Testing Platform
            </span>
            <span className="text-xs text-sky-600 font-medium">Learning Platform</span>
          </div>
        </motion.div>
      </Link>

      {/* User Profile */}
      {student && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8 p-4 rounded-2xl bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 shadow-lg overflow-hidden"
        >
          {/* Bubble decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
          
          <div className="flex items-center gap-3 relative z-10">
            <motion.div 
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <User className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm truncate">{student.name}</p>
              <p className="text-blue-100 text-xs truncate">{student.email}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="relative space-y-3 mb-8">
        <p className="text-xs font-bold text-sky-600 uppercase tracking-wider px-3 mb-4">Menu</p>
        {menuItems.map((item, index) => {
          const isActive = item.exact 
            ? pathname === item.href 
            : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-blue-100/50'
                }`}
              >
                {/* Bubble effect for active item */}
                {isActive && (
                  <>
                    <motion.div
                      className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full -ml-6 -mb-6"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </>
                )}

                {/* Icon with bubble background */}
                <motion.div 
                  className={`relative w-10 h-10 rounded-lg flex items-center justify-center ${
                    isActive 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-gradient-to-br from-blue-100 to-sky-100'
                  }`}
                  whileHover={{ rotate: 5 }}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                </motion.div>

                {/* Text */}
                <div className="flex-1 relative z-10">
                  <p className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-800'}`}>
                    {item.label}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                    {item.description}
                  </p>
                </div>

                {/* Arrow indicator for active */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative z-10"
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </motion.div>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-6 right-6">
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 text-gray-700 hover:text-white transition-all duration-300 border border-blue-100/50 hover:border-transparent shadow-md hover:shadow-lg overflow-hidden group"
        >
          {/* Bubble decoration on hover */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <motion.div 
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-100 to-pink-100 group-hover:bg-white/20 flex items-center justify-center transition-all relative z-10"
            whileHover={{ rotate: 10 }}
          >
            <LogOut className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
          </motion.div>
          <span className="font-semibold text-sm relative z-10">Logout</span>
        </motion.button>
      </div>
    </aside>
    </>
  );
}
