import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Clock, 
  Calendar,
  BarChart2,
  BookOpen,
  Users,
  Star,
  Timer,
  Plus 
} from 'lucide-react';

const PracticeDashboard = () => {
  const t = useTranslations('practice');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Example practice data - would come from backend
  const practiceData = [
    { date: '2025-01-06', duration: 15, type: 'mindfulness', notes: 'Morning practice' },
    { date: '2025-01-07', duration: 20, type: 'inquiry', notes: 'Deep investigation' },
    { date: '2025-01-08', duration: 10, type: 'contemplation', notes: 'Evening reflection' }
  ];

  const statsData = {
    totalSessions: 124,
    totalMinutes: 1860,
    averageSession: 15,
    currentStreak: 7
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-gray-900">
              {t('dashboard.title')}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {t('dashboard.subtitle')}
            </p>
          </div>
          <button
            className="px-4 py-2 bg-primary-600 text-white rounded-lg 
                     hover:bg-primary-700 transition-colors duration-200
                     flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t('dashboard.newSession')}
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Timer className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('stats.totalSessions')}</p>
              <p className="text-xl font-medium">{statsData.totalSessions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Clock className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('stats.totalMinutes')}</p>
              <p className="text-xl font-medium">{statsData.totalMinutes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <BarChart2 className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('stats.averageSession')}</p>
              <p className="text-xl font-medium">{statsData.averageSession} min</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Star className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('stats.currentStreak')}</p>
              <p className="text-xl font-medium">{statsData.currentStreak} days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Practice & Support */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Practice Log */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-heading font-medium text-gray-900">
                {t('recentPractice.title')}
              </h2>
              <div className="flex gap-2">
                {['week', 'month', 'year'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded-lg text-sm
                      ${selectedPeriod === period
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {t(`periods.${period}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {practiceData.map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg">
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {session.type}
                      </p>
                      <p className="text-sm text-gray-500">
                        {session.notes}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {session.duration} min
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Resources */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-heading font-medium text-gray-900 mb-4">
                {t('resources.title')}
              </h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50">
                  <BookOpen className="w-4 h-4 text-primary-500" />
                  <span className="text-sm text-gray-600">
                    {t('resources.guidelines')}
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50">
                  <Users className="w-4 h-4 text-primary-500" />
                  <span className="text-sm text-gray-600">
                    {t('resources.community')}
                  </span>
                </button>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-heading font-medium text-gray-900 mb-4">
                {t('nextSteps.title')}
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-900 font-medium">
                    {t('nextSteps.suggestion')}
                  </p>
                  <p className="text-sm text-primary-700 mt-1">
                    {t('nextSteps.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeDashboard;