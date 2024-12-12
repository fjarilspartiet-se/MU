// pages/mentorship.tsx
'use client';

import { GetStaticProps } from 'next';
import MainLayout from '../components/MainLayout';
import { useTranslations } from 'next-intl';
import { 
  MessageSquare, 
  Calendar,
  Clock,
  Star,
  User,
  ChevronRight,
  Mail
} from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  availability: 'available' | 'limited' | 'unavailable';
  rating: number;
  totalMentees: number;
  avatar?: string;
}

interface MentorshipSession {
  id: string;
  mentorId: string;
  mentorName: string;
  date: string;
  topic: string;
  status: 'upcoming' | 'completed';
}

const MentorshipPage = () => {
  const t = useTranslations('mentorship');

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Maria Svensson',
      title: t('mentors.philosopher.title'),
      bio: t('mentors.philosopher.bio'),
      specialties: ['Philosophy', 'Ethics', 'Critical Thinking'],
      availability: 'available',
      rating: 4.8,
      totalMentees: 12
    },
    {
      id: '2',
      name: 'Erik Bergman',
      title: t('mentors.practitioner.title'),
      bio: t('mentors.practitioner.bio'),
      specialties: ['Meditation', 'Mindfulness', 'Personal Development'],
      availability: 'limited',
      rating: 4.9,
      totalMentees: 8
    }
  ];

  const upcomingSessions: MentorshipSession[] = [
    {
      id: '1',
      mentorId: '1',
      mentorName: 'Maria Svensson',
      date: '2024-12-15T14:00:00',
      topic: t('sessions.philosophical.topic'),
      status: 'upcoming'
    }
  ];

  const MentorCard = ({ mentor }: { mentor: Mentor }) => {
    const availabilityColor = {
      available: 'text-green-600 bg-green-50',
      limited: 'text-yellow-600 bg-yellow-50',
      unavailable: 'text-red-600 bg-red-50'
    }[mentor.availability];

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-primary-200 transition-all duration-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-heading font-medium text-lg text-gray-900">
                    {mentor.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {mentor.title}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${availabilityColor}`}>
                  {t(`availability.${mentor.availability}`)}
                </span>
              </div>
              
              <p className="text-gray-600 mt-2 mb-3">
                {mentor.bio}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.specialties.map(specialty => (
                  <span 
                    key={specialty}
                    className="px-2 py-1 text-xs rounded-full bg-primary-50 text-primary-700"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{mentor.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{mentor.totalMentees} {t('mentees')}</span>
                </div>
                <button className="px-3 py-1.5 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
                  {t('connect')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SessionCard = ({ session }: { session: MentorshipSession }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-medium text-gray-900">
                {session.topic}
              </h4>
              <p className="text-sm text-gray-600">
                {t('with')} {session.mentorName}
              </p>
            </div>
            <span className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-full">
              {session.status === 'upcoming' ? t('upcoming') : t('completed')}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(session.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-primary-500" />
              <div>
                <h1 className="text-2xl font-heading font-semibold text-gray-900">
                  {t('title')}
                </h1>
                <p className="text-gray-600 mt-1">
                  {t('subtitle')}
                </p>
              </div>
            </div>
            <button
              className="px-4 py-2 bg-primary-600 text-white rounded-lg 
                       hover:bg-primary-700 transition-colors duration-200
                       flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              {t('requestMentor')}
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content - Mentors list */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-heading font-medium text-gray-900 mb-4">
              {t('availableMentors')}
            </h2>
            <div className="space-y-6">
              {mentors.map(mentor => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          </div>

          {/* Sidebar - Upcoming sessions */}
          <div>
            <h2 className="text-lg font-heading font-medium text-gray-900 mb-4">
              {t('upcomingSessions')}
            </h2>
            <div className="space-y-4">
              {upcomingSessions.map(session => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = 'sv' }) => {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
};

export default MentorshipPage;
