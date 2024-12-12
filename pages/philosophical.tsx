// pages/philosophical.tsx
'use client';

import { GetStaticProps } from 'next';
import MainLayout from '../components/MainLayout';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LayoutDashboard, TreePine } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import both components
const WisdomPathsExplorer = dynamic(
  () => import('../components/WisdomPathsExplorer'),
  {
    ssr: false,
    loading: () => <div>Loading wisdom paths...</div>
  }
);

const AdaptivePhilosophicalPrompt = dynamic(
  () => import('../components/AdaptivePhilosophicalPrompt'),
  {
    ssr: false,
    loading: () => <div>Loading prompt...</div>
  }
);

const PhilosophicalPage = () => {
  const t = useTranslations('philosophical');
  const [view, setView] = useState<'prompt' | 'paths'>('paths');

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with view switching */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-heading font-semibold text-gray-900">
              {t('title')}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setView('prompt')}
                className={`
                  px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                  ${view === 'prompt' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{t('viewModes.prompt')}</span>
              </button>
              <button
                onClick={() => setView('paths')}
                className={`
                  px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                  ${view === 'paths' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                <TreePine className="w-4 h-4" />
                <span>{t('viewModes.paths')}</span>
              </button>
            </div>
          </div>
          <p className="mt-2 text-gray-600">
            {t(`descriptions.${view}`)}
          </p>
        </div>

        {/* Main content with view switching */}
        <div className="relative min-h-[600px]">
          {view === 'prompt' ? (
            <div className="transition-opacity duration-300">
              <AdaptivePhilosophicalPrompt />
            </div>
          ) : (
            <div className="transition-opacity duration-300">
              <WisdomPathsExplorer />
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

export default PhilosophicalPage;
