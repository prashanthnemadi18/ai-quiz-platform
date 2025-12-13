'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Bot, Hand, LayoutDashboard, BarChart3 } from 'lucide-react';

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  {
    href: '/dashboard/content-generator',
    label: 'Content Generator',
    icon: BookOpen,
  },
  {
    href: '/dashboard/gesture-recognition',
    label: 'Gesture Control',
    icon: Hand,
  },
  {
    href: '/dashboard/recommendations',
    label: 'Recommendations',
    icon: Bot,
  },
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    icon: BarChart3,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarContent>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={{ children: item.label, side: 'right' }}
            >
              <Link href={item.href}>
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 flex items-center justify-center rounded ${pathname === item.href ? 'bg-gradient-to-br from-[#00b37e] to-[#00875f] text-white' : 'bg-white/10 text-[#9fe29f]'}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm">{item.label}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
