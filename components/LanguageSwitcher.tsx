// components/LanguageSwitcher.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useUser } from '../context/UserContext';

const LanguageSwitcher = () => {
  const router = useRouter();
  const t = useTranslations('common');
  const { updatePreferences } = useUser();
  
  const languages = [
    { code: 'sv', name: 'Svenska' },
    { code: 'en', name: 'English' }
  ];

  const switchLanguage = (locale: string) => {
    // Update the user preferences which will handle the routing
    updatePreferences({ language: locale });
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-500" />
      <select
        value={router.locale}
        onChange={(e) => switchLanguage(e.target.value)}
        className="text-sm bg-transparent border-none focus:ring-0 cursor-pointer text-gray-700 hover:text-primary-600"
        aria-label={t('language.select')}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
