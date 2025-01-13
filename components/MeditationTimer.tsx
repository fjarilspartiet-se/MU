import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Settings,
  ChevronRight,
  Bell,
  Headphones,
  Clock
} from 'lucide-react';

const MeditationTimer = () => {
  const t = useTranslations('meditation');
  const [duration, setDuration] = useState(10); // minutes
  const [remainingSeconds, setRemainingSeconds] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [intervalBells, setIntervalBells] = useState(5); // minutes between bells
  const [guidedMeditation, setGuidedMeditation] = useState<null | {
    id: string;
    title: string;
    duration: number;
    audioUrl: string;
  }>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bellRef = useRef<HTMLAudioElement | null>(null);

  // Sample guided meditations - would come from backend
  const guidedMeditations = [
    {
      id: 'basic-mindfulness',
      title: t('guided.basicMindfulness'),
      duration: 10,
      audioUrl: '/meditations/basic-mindfulness.mp3'
    },
    {
      id: 'loving-kindness',
      title: t('guided.lovingKindness'),
      duration: 15,
      audioUrl: '/meditations/loving-kindness.mp3'
    }
  ];

  const presets = [
    { id: 'mindfulness', duration: 10, name: t('presets.mindfulness') },
    { id: 'breath', duration: 15, name: t('presets.breath') },
    { id: 'body-scan', duration: 20, name: t('presets.bodyScan') },
    { id: 'loving-kindness', duration: 20, name: t('presets.lovingKindness') }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          // Play interval bell if enabled and at the right time
          if (soundEnabled && intervalBells > 0 && prev % (intervalBells * 60) === 0 && prev !== duration * 60) {
            bellRef.current?.play();
          }
          return prev - 1;
        });
      }, 1000);
    } else if (remainingSeconds === 0 && soundEnabled) {
      bellRef.current?.play();
    }
    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds, intervalBells, soundEnabled, duration]);

  // Handle guided meditation audio
  useEffect(() => {
    if (guidedMeditation && audioRef.current) {
      audioRef.current.src = guidedMeditation.audioUrl;
      if (isRunning) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [guidedMeditation, isRunning]);

  const handleStart = useCallback(() => {
    setIsRunning(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setRemainingSeconds(duration * 60);
  }, [duration]);

  const handlePresetSelect = useCallback((preset: typeof presets[0]) => {
    setSelectedPreset(preset.id);
    setDuration(preset.duration);
    setRemainingSeconds(preset.duration * 60);
    setIsRunning(false);
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-heading font-medium text-gray-900">
          {t('timer.title')}
        </h2>
      </div>

      {/* Timer Display */}
      <div className="p-8 flex flex-col items-center justify-center">
        <div className="text-6xl font-mono font-medium text-gray-900 mb-8">
          {formatTime(remainingSeconds)}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleReset}
            className="p-3 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <RotateCcw className="w-6 h-6" />
          </button>

          <button
            onClick={isRunning ? handlePause : handleStart}
            className="p-4 bg-primary-600 text-white rounded-full hover:bg-primary-700
                     transition-colors duration-200"
          >
            {isRunning ? 
              <Pause className="w-8 h-8" /> : 
              <Play className="w-8 h-8" />
            }
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-3 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            {soundEnabled ? 
              <Volume2 className="w-6 h-6" /> : 
              <VolumeX className="w-6 h-6" />
            }
          </button>
        </div>
      </div>

      {/* Audio Elements */}
      <audio ref={audioRef} />
      <audio ref={bellRef} src="/sounds/meditation-bell.mp3" />

      {/* Practice Type Selection */}
      <div className="px-6 pb-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setGuidedMeditation(null)}
            className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2
              ${!guidedMeditation ? 'bg-primary-100 text-primary-700' : 'bg-gray-50 text-gray-600'}
            `}
          >
            <Clock className="w-4 h-4" />
            <span>{t('types.timer')}</span>
          </button>
          <button
            onClick={() => setGuidedMeditation(guidedMeditations[0])}
            className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2
              ${guidedMeditation ? 'bg-primary-100 text-primary-700' : 'bg-gray-50 text-gray-600'}
            `}
          >
            <Headphones className="w-4 h-4" />
            <span>{t('types.guided')}</span>
          </button>
        </div>

        {!guidedMeditation ? (
          /* Timer Presets */
          <>
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              {t('presets.title')}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset)}
                  className={`p-4 rounded-lg text-left transition-colors duration-200
                    ${selectedPreset === preset.id
                      ? 'bg-primary-50 border-2 border-primary-200'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className={`font-medium ${
                        selectedPreset === preset.id ? 'text-primary-900' : 'text-gray-900'
                      }`}>
                        {preset.name}
                      </h4>
                      <p className={`text-sm ${
                        selectedPreset === preset.id ? 'text-primary-600' : 'text-gray-500'
                      }`}>
                        {preset.duration} {t('timer.minutes')}
                      </p>
                    </div>
                    <Bell className={`w-4 h-4 ${
                      selectedPreset === preset.id ? 'text-primary-500' : 'text-gray-400'
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Guided Meditations */
          <>
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              {t('guided.title')}
            </h3>
            <div className="space-y-3">
              {guidedMeditations.map((meditation) => (
                <button
                  key={meditation.id}
                  onClick={() => setGuidedMeditation(meditation)}
                  className={`w-full p-4 rounded-lg text-left transition-colors duration-200
                    ${meditation.id === guidedMeditation?.id
                      ? 'bg-primary-50 border-2 border-primary-200'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className={`font-medium ${
                        meditation.id === guidedMeditation?.id ? 'text-primary-900' : 'text-gray-900'
                      }`}>
                        {meditation.title}
                      </h4>
                      <p className={`text-sm ${
                        meditation.id === guidedMeditation?.id ? 'text-primary-600' : 'text-gray-500'
                      }`}>
                        {meditation.duration} {t('timer.minutes')}
                      </p>
                    </div>
                    <Headphones className={`w-4 h-4 ${
                      meditation.id === guidedMeditation?.id ? 'text-primary-500' : 'text-gray-400'
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Settings */}
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        {!guidedMeditation && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('settings.intervalBells')}
            </label>
            <select
              value={intervalBells}
              onChange={(e) => setIntervalBells(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="0">{t('settings.noBells')}</option>
              <option value="5">5 {t('settings.minutes')}</option>
              <option value="10">10 {t('settings.minutes')}</option>
              <option value="15">15 {t('settings.minutes')}</option>
            </select>
          </div>
        )}
        
        <button
          className="w-full flex items-center justify-between text-gray-600 
                   hover:text-gray-900 transition-colors duration-200"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            <span>{t('settings.title')}</span>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MeditationTimer;
