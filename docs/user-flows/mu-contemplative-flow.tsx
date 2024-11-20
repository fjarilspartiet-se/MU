import React, { useState } from 'react';
import { Moon, Sparkles, Book, Heart } from 'lucide-react';

const ContemplativeIntroduction = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Välkommen till det inre utforskandet",
      subtitle: "En plats för reflektion och filosofisk undran",
      content: (
        <div className="space-y-6 text-center">
          <div className="w-20 h-20 mx-auto bg-primary-50 rounded-full flex items-center justify-center">
            <Moon className="w-10 h-10 text-primary-600" />
          </div>
          <div className="max-w-md mx-auto">
            <p className="text-gray-600">
              MU är ett utrymme för att utforska livets djupare frågor, 
              utveckla självkännedom och öva kontemplation på ett tryggt 
              och åldersanpassat sätt.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900">Filosofiskt utforskande</h3>
              <p className="text-sm text-gray-500">Existentiella frågor och dialog</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900">Kontemplativa övningar</h3>
              <p className="text-sm text-gray-500">Meditation och mindfulness</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900">Etisk reflektion</h3>
              <p className="text-sm text-gray-500">Värderingar och mening</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Dagens kontemplation",
      content: (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              "Vad betyder det att vara närvarande?"
            </h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                Ta ett ögonblick att bli stilla. Känn din andning. 
                Observera dina tankar utan att följa med i dem.
              </p>
              <div className="flex justify-center py-4">
                <button className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg">
                  Börja 5 minuters tyst reflektion
                </button>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Efter reflektionen
            </h3>
            <textarea 
              placeholder="Dela dina tankar här..."
              className="w-full h-32 p-3 border border-gray-200 rounded-lg"
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
                {steps[currentStep].title}
              </h1>
              {steps[currentStep].subtitle && (
                <p className="text-gray-600">{steps[currentStep].subtitle}</p>
              )}
            </div>
            {steps[currentStep].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContemplativeIntroduction;
