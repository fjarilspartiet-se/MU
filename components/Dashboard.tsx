import React from 'react';
import { Layout, BookOpen, Users, MessageSquare, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Dashboard = () => {
  const t = useTranslations('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-heading font-semibold text-gray-900">
              {t('title')}
            </h1>
            <div className="flex items-center gap-4">
              <button 
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                title={t('navigation.layout')}
              >
                <Layout className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Learning Journey Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-500" />
                <h2 className="text-lg font-heading font-medium">
                  {t('learningJourney.title')}
                </h2>
              </div>
              <span className="text-sm text-gray-500">
                {t('learningJourney.activePaths', { count: 4 })}
              </span>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-2">{t('learningJourney.currentFocus')}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {t('learningJourney.philosophicalInquiry')}
                  </span>
                  <span className="text-sm font-medium text-primary-600">75%</span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-primary-500 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Group Activities Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-500" />
                <h2 className="text-lg font-heading font-medium">
                  {t('groupActivities.title')}
                </h2>
              </div>
              <span className="text-sm text-gray-500">
                {t('groupActivities.activeGroups', { count: 2 })}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium">{t('groupActivities.philosophyCircle')}</h3>
                  <p className="text-sm text-gray-500">
                    {t('groupActivities.nextMeeting', { days: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mentor Connection Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary-500" />
                <h2 className="text-lg font-heading font-medium">
                  {t('mentorConnection.title')}
                </h2>
              </div>
              <span className="text-sm text-gray-500">
                {t('mentorConnection.unreadMessages', { count: 2 })}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <h3 className="font-medium">Sofia Andersson</h3>
                  <p className="text-sm text-gray-500">{t('mentorConnection.availableForChat')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reflections */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary-500" />
                <h2 className="text-lg font-heading font-medium">
                  {t('recentReflections.title')}
                </h2>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-700">
                {t('recentReflections.viewAll')}
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{t('recentReflections.morningReflection')}</h3>
                    <span className="text-sm text-gray-500">
                      {t('recentReflections.timeAgo', { time: '2 hours' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Today I explored the concept of consciousness and its relationship to personal identity...
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                      {t('recentReflections.tags.philosophy')}
                    </span>
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                      {t('recentReflections.tags.consciousness')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
