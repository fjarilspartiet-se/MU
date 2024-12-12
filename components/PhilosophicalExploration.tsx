import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GetStaticProps } from 'next';
import MainLayout from '../components/MainLayout';
import AdaptivePhilosophicalPrompt from '../components/AdaptivePhilosophicalPrompt';
import WisdomPathsExplorer from '../components/WisdomPathsExplorer';
import { Layout, TreeDecidious } from 'lucide-react';

const PhilosophicalExploration = () => {
  const t = useTranslations('philosophical');
  const [view, setView] = useState<'prompt' | 'paths'>('paths');

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
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
                <Layout className="w-4 h-4" />
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
                <TreeDecidious className="w-4 h-4" />
                <span>{t('viewModes.paths')}</span>
              </button>
            </div>
          </div>
          <p className="mt-2 text-gray-600">
            {t(`descriptions.${view}`)}
          </p>
        </div>

        {/* Main content */}
        <div className="relative">
          <div className={`transition-opacity duration-300 ${view === 'prompt' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
            <AdaptivePhilosophicalPrompt />
          </div>
          <div className={`transition-opacity duration-300 ${view === 'paths' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
            <WisdomPathsExplorer />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PhilosophicalExploration;
