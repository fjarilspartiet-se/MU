// pages/reflect/index.tsx
import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import MainLayout from '../../components/MainLayout';
import dynamic from 'next/dynamic';
import { Plus, BookOpen, Filter, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';

// Import ReflectionEditor dynamically to avoid SSR issues
const ReflectionEditor = dynamic(
  () => import('../../components/ReflectionEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse p-6 bg-white rounded-xl">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    ),
  }
);

const ReflectPage = () => {
  const t = useTranslations('reflect');
  const [showEditor, setShowEditor] = useState(false);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          {showEditor ? (
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setShowEditor(false)}
                className="inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t('backToList')}
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-heading font-semibold text-gray-900">
                  {t('title')}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {t('subtitle')}
                </p>
              </div>
              
              <button
                onClick={() => setShowEditor(true)}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-600 text-white
                         hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-primary-500"
              >
                <Plus className="w-5 h-5 mr-2" />
                {t('newReflection')}
              </button>
            </div>
          )}
        </div>

        {/* Main content */}
        {showEditor ? (
          <ReflectionEditor
            onSave={(content) => {
              console.log('Saving reflection:', content);
              setShowEditor(false);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                {/* Filter section */}
                <div>
                  <h3 className="font-heading font-medium text-gray-900 mb-4 flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    {t('filters.title')}
                  </h3>
                  {/* Add filter controls here */}
                </div>

                {/* Categories section */}
                <div>
                  <h3 className="font-heading font-medium text-gray-900 mb-4 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {t('categories.title')}
                  </h3>
                  {/* Add category list here */}
                </div>
              </div>
            </div>

            {/* Reflections list */}
            <div className="lg:col-span-9">
              <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Add reflection list/grid here */}
                <p className="text-gray-500 text-center py-8">
                  {t('empty.message')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ReflectPage;

export const getStaticProps: GetStaticProps = async ({ locale = 'sv' }) => {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
};
