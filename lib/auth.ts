/**
 * Simple authentication utilities
 * In production, replace with proper auth (NextAuth, Clerk, etc.)
 */

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
}

export function getStudent(): Student | null {
  if (typeof window === 'undefined') return null;
  
  const studentData = localStorage.getItem('student');
  if (studentData) {
    return JSON.parse(studentData);
  }
  return null;
}

export function setStudent(student: Student) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('student', JSON.stringify(student));
}

export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('student');
}

export function isAuthenticated(): boolean {
  return getStudent() !== null;
}
