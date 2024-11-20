// components/ProfileEditModal.tsx
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, Upload } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileEditModal = ({ isOpen, onClose }: ProfileEditModalProps) => {
  const t = useTranslations('settings.profile');
  const { profile, updateProfile } = useUser();
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    bio: profile?.bio || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg font-heading font-semibold leading-6 text-gray-900">
                {t('edit.title')}
              </h3>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                {/* Avatar upload */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gray-200">
                      {profile?.avatar && (
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 rounded-full bg-primary-600 p-1.5 text-white hover:bg-primary-700"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    {t('edit.avatarHelp')}
                  </p>
                </div>

                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t('edit.nameLabel')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                             focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('edit.emailLabel')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                             focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                {/* Bio field */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    {t('edit.bioLabel')}
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                             focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                {/* Action buttons */}
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm 
                             font-semibold text-white shadow-sm hover:bg-primary-700 focus:ring-2 
                             focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
                  >
                    {t('edit.save')}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm 
                             font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                             hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    {t('edit.cancel')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
