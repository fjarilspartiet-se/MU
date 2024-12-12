// pages/learning.tsx
'use client';

import { GetStaticProps } from 'next';
import MainLayout from '../components/MainLayout';
import { useTranslations } from 'next-intl';
import { BookOpen, Brain, Users, Target, ChevronRight } from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

const LearningPage = () => {
  const t = useTranslations('learning');

  const learningPaths: LearningPath[] = [
    {
      id: 'philosophical',
      title: t('paths.philosophical.title'),
      description: t('paths.philosophical.description'),
      icon: Brain,
      progress: 45,
      status: 'in-progress'
    },
    {
      id: 'collaborative',
      title: t('paths.collaborative.title'),
      description: t('paths.collaborative.description'),
      icon: Users,
      progress: 0,
      status: 'not-started'
    },
    {
      id: 'personal',
      title: t('paths.personal.title'),
      description: t('paths.personal.description'),
      icon: Target,
      progress: 0,
      status: 'not-started'
    }
  ];

  const LearningPathCard = ({ path }: { path: LearningPath }) => {
    const Icon = path.icon;
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-primary-200 transition-all duration-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary-100">
              <Icon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-heading font-medium text-lg text-gray-900">
                  {path.title}
                </h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600 mt-1 mb-4">
                {path.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-2 bg-primary-500 rounded-full"
                      style={{ width: `${path.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {path.progress}% {t('completed')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary-500" />
            <div>
              <h1 className="text-2xl font-heading font-semibold text-gray-900">
                {t('title')}
              </h1>
              <p className="text-gray-600 mt-1">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {learningPaths.map(path => (
            <LearningPathCard key={path.id} path={path} />
          ))}
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

export default LearningPage;
