// pages/settings.tsx
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GetStaticProps } from 'next';
import MainLayout from '../components/MainLayout';
import ProfileEditModal from '../components/ProfileEditModal';
import { useUser } from '../context/UserContext';
import {
  User,
  Globe,
  Bell,
  Lock,
  Moon,
  ChevronRight,
  Mail,
  MessageSquare
} from 'lucide-react';

const SettingsPage = () => {
  const t = useTranslations('settings');
  const { profile, preferences, updatePreferences } = useUser();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const languages = [
    { code: 'sv', name: 'Svenska' },
    { code: 'en', name: 'English' }
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-heading font-semibold text-gray-900 mb-8">
          {t('title')}
        </h1>

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-primary-500" />
                <h2 className="text-lg font-heading font-medium">{t('profile.title')}</h2>
              </div>
              <button 
                onClick={() => setIsProfileModalOpen(true)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                {t('common.edit')}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200">
                {profile?.avatar && (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{profile?.name}</h3>
                <p className="text-sm text-gray-500">{profile?.email}</p>
                <p className="text-sm text-gray-500 mt-1">{profile?.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Sections */}
        <div className="space-y-6">
          {/* Language */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-5 h-5 text-primary-500" />
                <h2 className="text-lg font-heading font-medium">{t('language.title')}</h2>
              </div>
              
              <select
                value={preferences.language}
                onChange={(e) => updatePreferences({ language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-primary-500" />
                <h2 className="text-lg font-heading font-medium">{t('notifications.title')}</h2>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-700">{t('notifications.email')}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.email}
                    onChange={(e) => updatePreferences({
                      notifications: { ...preferences.notifications, email: e.target.checked }
                    })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </label>
                
                <label className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-700">{t('notifications.platform')}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.platform}
                    onChange={(e) => updatePreferences({
                      notifications: { ...preferences.notifications, platform: e.target.checked }
                    })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-5 h-5 text-primary-500" />
                <h2 className="text-lg font-heading font-medium">{t('privacy.title')}</h2>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{t('privacy.shareReflections')}</span>
                  <input
                    type="checkbox"
                    checked={preferences.privacy.shareReflections}
                    onChange={(e) => updatePreferences({
                      privacy: { ...preferences.privacy, shareReflections: e.target.checked }
                    })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </label>
                
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{t('privacy.publicProfile')}</span>
                  <input
                    type="checkbox"
                    checked={preferences.privacy.publicProfile}
                    onChange={(e) => updatePreferences({
                      privacy: { ...preferences.privacy, publicProfile: e.target.checked }
                    })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <ProfileEditModal 
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
        />
      </div>
    </MainLayout>
  );
};

export default SettingsPage;

export const getStaticProps: GetStaticProps = async ({ locale = 'sv' }) => {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
};
