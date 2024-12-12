console.log('Loading MainLayout');

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home,
  BookOpen,
  Compass,
  Users,
  MessageSquare,
  Settings,
  Menu,
  X,
  Layout as LayoutIcon,
  GraduationCap
} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useUser } from '../context/UserContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const t = useTranslations('navigation');
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { profile } = useUser();

  const mainNavigation = [
    { name: 'dashboard', href: '/', icon: Home },
    { name: 'reflect', href: '/reflect', icon: BookOpen },
    { name: 'philosophical', href: '/philosophical', icon: Compass },
    { name: 'learning', href: '/learning', icon: GraduationCap },
    { name: 'groups', href: '/groups', icon: Users },
    { name: 'mentorship', href: '/mentorship', icon: MessageSquare }
  ];

  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar - mobile */}
      <div className="bg-white shadow-sm lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:block shadow-lg lg:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <LayoutIcon className="h-8 w-8 text-primary-600" />
            <span className="ml-3 text-xl font-heading font-semibold text-gray-900">
              MU
            </span>
          </div>

          {/* Main navigation */}
          <nav className="flex-1 px-4 py-4">
            <div className="space-y-1">
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center px-4 py-2 text-sm font-medium rounded-lg
                      ${active 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className={`
                      mr-3 h-5 w-5
                      ${active ? 'text-primary-500' : 'text-gray-400'}
                    `} />
                    {t(`items.${item.name}`)}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <div className="space-y-4">
              {/* User info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200">
                  {profile?.avatar && (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{profile?.name}</p>
                  <p className="text-xs text-gray-500">{t(`profile.${profile?.role}`)}</p>
                </div>
              </div>

              {/* Language switcher */}
              <div className="py-2 border-t border-gray-100">
                <LanguageSwitcher />
              </div>

              {/* Settings link */}
              <div className="border-t border-gray-100 pt-2">
                <Link
                  href="/settings"
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-lg
                    ${isActive('/settings')
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Settings className={`
                    mr-3 h-5 w-5
                    ${isActive('/settings') ? 'text-primary-500' : 'text-gray-400'}
                  `} />
                  {t('items.settings')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
