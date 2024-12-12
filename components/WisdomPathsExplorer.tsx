'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TreePine, BookOpen, Star, Lock, ChevronRight, Award } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  completed: boolean;
  tags: string[];
}

interface PathData {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

const WisdomPathsExplorer = () => {
  console.log('Rendering WisdomPathsExplorer');
  const t = useTranslations('wisdom');
  const [viewMode, setViewMode] = useState<'paths' | 'library'>('paths');
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample paths data
  const paths: PathData[] = [
    {
      id: 'metaphysical',
      name: t('paths.metaphysical.name'),
      description: t('paths.metaphysical.description'),
      questions: [
        {
          id: 'existence',
          title: t('paths.metaphysical.questions.existence.title'),
          description: t('paths.metaphysical.questions.existence.description'),
          unlocked: true,
          completed: false,
          tags: ['existence', 'reality', 'fundamental']
        }
      ]
    },
    {
      id: 'epistemological',
      name: t('paths.epistemological.name'),
      description: t('paths.epistemological.description'),
      questions: [
        {
          id: 'certainty',
          title: t('paths.epistemological.questions.certainty.title'),
          description: t('paths.epistemological.questions.certainty.description'),
          unlocked: false,
          completed: false,
          tags: ['knowledge', 'certainty', 'truth']
        }
      ]
    }
  ];

  const PathCard = ({ path }: { path: PathData }) => (
    <div 
      className={`
        p-6 rounded-xl border border-gray-200 hover:border-primary-200 
        transition-all duration-200 cursor-pointer
        ${selectedPath === path.id ? 'bg-primary-50 border-primary-300' : 'bg-white'}
      `}
      onClick={() => setSelectedPath(path.id)}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary-100">
          <Star className="w-6 h-6 text-primary-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-medium text-lg text-gray-900 mb-2">
            {path.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {path.description}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500">
              {t('progress', { completed: path.questions.filter(q => q.completed).length, total: path.questions.length })}
            </span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full">
              <div 
                className="h-2 bg-primary-500 rounded-full"
                style={{ 
                  width: `${(path.questions.filter(q => q.completed).length / path.questions.length) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const QuestionCard = ({ question }: { question: Question }) => (
    <div className={`
      p-4 rounded-lg border
      ${question.unlocked 
        ? 'border-gray-200 hover:border-primary-200 cursor-pointer' 
        : 'border-gray-100 bg-gray-50'
      }
    `}>
      <div className="flex items-start gap-3">
        {question.unlocked ? (
          <div className="p-2 rounded-lg bg-primary-50">
            <ChevronRight className="w-4 h-4 text-primary-500" />
          </div>
        ) : (
          <div className="p-2 rounded-lg bg-gray-100">
            <Lock className="w-4 h-4 text-gray-400" />
          </div>
        )}
        <div>
          <h4 className={`font-medium mb-1
            ${question.unlocked ? 'text-gray-900' : 'text-gray-500'}
          `}>
            {question.title}
          </h4>
          <p className={`text-sm
            ${question.unlocked ? 'text-gray-600' : 'text-gray-400'}
          `}>
            {question.description}
          </p>
          {question.unlocked && (
            <div className="flex flex-wrap gap-2 mt-2">
              {question.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-primary-50 text-primary-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {question.completed && (
          <div className="ml-auto">
            <Award className="w-5 h-5 text-primary-500" />
          </div>
        )}
      </div>
    </div>
  );

  const filteredQuestions = paths.flatMap(path => 
    path.questions.filter(question => 
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
          {t('title')}
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('paths')}
            className={`
              px-4 py-2 rounded-lg flex items-center gap-2
              ${viewMode === 'paths' 
                ? 'bg-primary-100 text-primary-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <TreePine className="w-4 h-4" />
            <span>{t('viewModes.paths')}</span>
          </button>
          <button
            onClick={() => setViewMode('library')}
            className={`
              px-4 py-2 rounded-lg flex items-center gap-2
              ${viewMode === 'library' 
                ? 'bg-primary-100 text-primary-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t('viewModes.library')}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'paths' ? (
        <div className="space-y-6">
          {paths.map(path => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Search */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                        focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Questions grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredQuestions.map(question => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WisdomPathsExplorer;
