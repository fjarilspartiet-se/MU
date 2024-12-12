'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  BookOpen, 
  Layers, 
  CircleHelp, 
  Lightbulb, 
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Save
} from 'lucide-react';

interface ExplorationLevel {
  id: string;
  name: string;
  description: string;
  examples: string[];
  supportingQuestions: string[];
}

interface ReflectionStep {
  step: number;
  response: string;
}

const AdaptivePhilosophicalPrompt = () => {
  const t = useTranslations('prompts.philosophical');
  const [selectedLevel, setSelectedLevel] = useState<string>('personal');
  const [showGuidance, setShowGuidance] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<ReflectionStep[]>([
    { step: 0, response: '' }
  ]);

  const explorationLevels: ExplorationLevel[] = [
    {
      id: 'personal',
      name: t('levels.personal.name'),
      description: t('levels.personal.description'),
      examples: t.raw('levels.personal.examples'),
      supportingQuestions: t.raw('levels.personal.supporting')
    },
    {
      id: 'analytical',
      name: t('levels.analytical.name'),
      description: t('levels.analytical.description'),
      examples: t.raw('levels.analytical.examples'),
      supportingQuestions: t.raw('levels.analytical.supporting')
    },
    {
      id: 'contemplative',
      name: t('levels.contemplative.name'),
      description: t('levels.contemplative.description'),
      examples: t.raw('levels.contemplative.examples'),
      supportingQuestions: t.raw('levels.contemplative.supporting')
    }
  ];

  const currentLevel = explorationLevels.find(level => level.id === selectedLevel);

  const steps = [
    {
      title: t('initial.title'),
      description: t('initial.description'),
      prompt: t('initial.prompt'),
      guidance: t('initial.guidance')
    },
    {
      title: t('explore.title'),
      description: t('explore.description'),
      prompt: t('explore.prompt'),
      guidance: t('explore.guidance')
    },
    {
      title: t('insight.title'),
      description: t('insight.description'),
      prompt: t('insight.prompt'),
      guidance: t('insight.guidance')
    }
  ];

  const handleResponseChange = (response: string) => {
    const updatedResponses = [...responses];
    updatedResponses[currentStep] = {
      step: currentStep,
      response: response
    };
    setResponses(updatedResponses);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (!responses[currentStep + 1]) {
        setResponses([...responses, { step: currentStep + 1, response: '' }]);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    // Here we would typically save to a backend
    console.log('Saving reflection:', {
      level: selectedLevel,
      responses,
      timestamp: new Date()
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary-500" />
            <div>
              <h2 className="text-xl font-heading font-medium text-gray-900">
                {t('title')}
              </h2>
              <p className="text-sm text-gray-500">
                {steps[currentStep].title}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowGuidance(!showGuidance)}
            className="p-2 text-gray-500 hover:text-primary-600 rounded-full hover:bg-primary-50"
          >
            <CircleHelp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Guidance Panel */}
      {showGuidance && (
        <div className="p-4 bg-primary-50 border-b border-primary-100">
          <h3 className="font-heading font-medium text-primary-900 mb-2">
            {t('guidance.title')}
          </h3>
          <ul className="text-sm text-primary-800 space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 mt-0.5 rounded-full bg-primary-200 flex-shrink-0" />
              <span>{t('guidance.personal')}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 mt-0.5 rounded-full bg-primary-300 flex-shrink-0" />
              <span>{t('guidance.pace')}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 mt-0.5 rounded-full bg-primary-400 flex-shrink-0" />
              <span>{t('guidance.depth')}</span>
            </li>
          </ul>
        </div>
      )}

      {/* Exploration Levels */}
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex gap-2">
          {explorationLevels.map(level => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2
                ${level.id === selectedLevel 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              <Layers className="w-4 h-4" />
              {level.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {currentLevel && (
          <div className="space-y-6">
            {/* Current Step Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">
                {steps[currentStep].title}
              </h3>
              <p className="text-gray-600 mb-4">
                {steps[currentStep].description}
              </p>
              <p className="text-sm text-gray-500 italic">
                {steps[currentStep].guidance}
              </p>
            </div>

            {/* Supporting Questions */}
            <div className="space-y-3">
              <h4 className="font-heading font-medium text-gray-900">
                {t('supportingQuestions')}
              </h4>
              <ul className="space-y-2">
                {currentLevel.supportingQuestions.map((question, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 mt-1 text-primary-500" />
                    <span className="text-gray-700">{question}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('yourThoughts')}
              </label>
              <textarea
                className="w-full h-32 p-3 border border-gray-200 rounded-lg 
                         focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder={t('placeholder')}
                value={responses[currentStep]?.response || ''}
                onChange={(e) => handleResponseChange(e.target.value)}
              />
            </div>

            {/* Examples */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-heading font-medium text-gray-900 mb-2">
                {t('examples')}
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {currentLevel.examples.map((example, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 mt-1 text-primary-500" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer with Navigation */}
      <div className="p-6 border-t border-gray-100 bg-gray-50">
        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviousStep}
            className={`px-4 py-2 rounded-lg flex items-center gap-2
              ${currentStep > 0
                ? 'text-gray-700 hover:bg-gray-200'
                : 'text-gray-400 cursor-not-allowed'
              }`}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4" />
            {t('previous')}
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg 
                       hover:bg-primary-700 transition-colors duration-200
                       flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {t('saveReflection')}
            </button>
            
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleNextStep}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg 
                         hover:bg-primary-700 transition-colors duration-200
                         flex items-center gap-2"
              >
                {t('continue')}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptivePhilosophicalPrompt;
