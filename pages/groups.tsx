// pages/groups.tsx
'use client';

import { GetStaticProps } from 'next';
import MainLayout from '../components/MainLayout';
import { useTranslations } from 'next-intl';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  BookOpen,
  ChevronRight,
  Clock
} from 'lucide-react';

interface GroupMember {
  id: string;
  name: string;
  role: 'leader' | 'member';
  avatar?: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  type: 'philosophy' | 'study' | 'project';
  members: GroupMember[];
  nextMeeting?: {
    date: string;
    topic: string;
  };
  activeDiscussions: number;
}

const GroupsPage = () => {
  const t = useTranslations('groups');

  const groups: Group[] = [
    {
      id: 'philosophy-circle',
      name: t('groups.philosophyCircle.name'),
      description: t('groups.philosophyCircle.description'),
      type: 'philosophy',
      members: [
        { id: '1', name: 'Sofia Andersson', role: 'leader' },
        { id: '2', name: 'Erik Larsson', role: 'member' },
        { id: '3', name: 'Maria Nilsson', role: 'member' }
      ],
      nextMeeting: {
        date: '2024-12-15T18:00:00',
        topic: t('groups.philosophyCircle.nextTopic')
      },
      activeDiscussions: 3
    },
    {
      id: 'study-group',
      name: t('groups.studyGroup.name'),
      description: t('groups.studyGroup.description'),
      type: 'study',
      members: [
        { id: '4', name: 'Johan Svensson', role: 'leader' },
        { id: '5', name: 'Anna Bergman', role: 'member' }
      ],
      nextMeeting: {
        date: '2024-12-14T17:00:00',
        topic: t('groups.studyGroup.nextTopic')
      },
      activeDiscussions: 2
    }
  ];

  const GroupCard = ({ group }: { group: Group }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-primary-200 transition-all duration-200">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-heading font-medium text-lg text-gray-900">
                {group.name}
              </h3>
              <p className="text-gray-600 mt-1 mb-4">
                {group.description}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{group.members.length} {t('members')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  <span>{group.activeDiscussions} {t('discussions')}</span>
                </div>
                {group.nextMeeting && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{new Date(group.nextMeeting.date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Next Meeting */}
              {group.nextMeeting && (
                <div className="bg-primary-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-primary-800 text-sm font-medium mb-1">
                    <Clock className="w-4 h-4" />
                    <span>{t('nextMeeting')}</span>
                  </div>
                  <p className="text-sm text-primary-900">
                    {group.nextMeeting.topic}
                  </p>
                </div>
              )}

              {/* Members */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {group.members.slice(0, 3).map(member => (
                    <div 
                      key={member.id}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                    />
                  ))}
                </div>
                {group.members.length > 3 && (
                  <span className="text-sm text-gray-500">
                    +{group.members.length - 3} {t('more')}
                  </span>
                )}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
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
              <Users className="w-8 h-8 text-primary-500" />
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
              <Users className="w-4 h-4" />
              {t('createGroup')}
            </button>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {groups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
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

export default GroupsPage;
