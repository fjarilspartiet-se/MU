// pages/practice.tsx
'use client';

import { GetStaticProps } from 'next';
import MainLayout from '../components/MainLayout';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Timer, Layers } from 'lucide-react';

// Dynamically import components to avoid SSR issues with audio
const PracticeDashboard = dynamic(
  () => import('../components/PracticeDashboard'),
  {
    ssr: false,
    loading: () => <div>Loading dashboard...</div>
  }
);

const MeditationTimer = dynamic(
  () => import('../components/MeditationTimer'),
  {
    ssr: false,
    loading: () => <div>Loading timer...</div>
  }
);

const PracticePage = () => {
  const t = useTranslations('practice');
  const [view, setView] = useState<'dashboard' | 'timer'>('dashboard');

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with view switching */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-heading font-semibold text-gray-900">
              {t('title')}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setView('dashboard')}
                className={`
                  px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                  ${view === 'dashboard' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                <Layers className="w-4 h-4" />
                <span>{t('views.dashboard')}</span>
              </button>
              <button
                onClick={() => setView('timer')}
                className={`
                  px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                  ${view === 'timer' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                <Timer className="w-4 h-4" />
                <span>{t('views.timer')}</span>
              </button>
            </div>
          </div>
          <p className="mt-2 text-gray-600">
            {t(`descriptions.${view}`)}
          </p>
        </div>

        {/* Main content */}
        <div className="relative min-h-[600px]">
          {view === 'dashboard' ? (
            <div className="transition-opacity duration-300">
              <PracticeDashboard />
            </div>
          ) : (
            <div className="transition-opacity duration-300">
              <MeditationTimer />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = 'sv' }) => {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
};

export default PracticePage;
