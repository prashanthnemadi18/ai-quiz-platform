"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const studentData = localStorage.getItem('student');
    if (studentData) {
      setStudent(JSON.parse(studentData));
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!student) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-sky-50/30 relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content - Responsive padding for mobile */}
      <div className="lg:ml-72 min-h-screen p-4 lg:p-6 pt-20 lg:pt-6">
        <main className="w-full max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
