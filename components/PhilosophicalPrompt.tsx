import React, { useState } from 'react';
import { BookOpen, ThoughtBubble, Compass, Lightbulb, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const PhilosophicalPrompt = () => {
  const t = useTranslations('prompts.philosophical');
  const [currentStage, setCurrentStage] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);

  const stages = [
    {
      icon: ThoughtBubble,
      title: t('initial.title'),
      description: t('initial.description'),
      prompt: t('initial.prompt'),
      guidance: t('initial.guidance')
    },
    {
      icon: Compass,
      title: t('explore.title'),
      description: t('explore.description'),
      prompt: t('explore.prompt'),
      guidance: t('explore.guidance')
    },
    {
      icon: Lightbulb,
      title: t('insight.title'),
      description: t('insight.description'),
      prompt: t('insight.prompt'),
      guidance: t('insight.guidance')
    }
  ];

  const handleResponse = (response: string) => {
    setResponses([...responses, response]);
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary-500" />
          <h2 className="text-xl font-heading font-medium text-gray-900">
            {t('title')}
          </h2>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {React.createElement(stages[currentStage].icon, {
              className: "w-5 h-5 text-primary-500"
            })}
            <h3 className="text-lg font-heading font-medium text-gray-900">
              {stages[currentStage].title}
            </h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            {stages[currentStage].description}
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-800 font-medium mb-2">
              {stages[currentStage].prompt}
            </p>
            <p className="text-sm text-gray-600">
              {stages[currentStage].guidance}
            </p>
          </div>

          <textarea
            className="w-full h-32 p-3 border border-gray-200 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder={t('placeholder')}
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => currentStage > 0 && setCurrentStage(currentStage - 1)}
            className={`px-4 py-2 rounded-lg text-sm
              ${currentStage > 0
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-gray-400 cursor-not-allowed'
              }`}
            disabled={currentStage === 0}
          >
            {t('previous')}
          </button>

          <button
            onClick={() => handleResponse("Sample response")}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg 
                     hover:bg-primary-700 transition-colors duration-200
                     flex items-center gap-2"
          >
            <span>{currentStage === stages.length - 1 ? t('finish') : t('continue')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhilosophicalPrompt;
