// components/ReflectionEditor.tsx

import React, { useState } from 'react';
import { Save, Hash, Bold, Italic, List, Quote, Link, Image, HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ReflectionEditorProps {
  initialContent?: string;
  onSave?: (content: ReflectionContent) => void;
}

interface ReflectionContent {
  text: string;
  timestamp: Date;
  type: 'daily' | 'philosophical' | 'contemplative' | 'project' | 'question' | 'insight' | 'dream' | 'practice';
  mood?: 'calm' | 'curious' | 'inspired' | 'confused' | 'concerned';
  tags: string[];
  privacy: 'private' | 'mentor' | 'group' | 'public';
}

const ReflectionEditor: React.FC<ReflectionEditorProps> = ({ initialContent = '', onSave }) => {
  const t = useTranslations('editor');
  const [content, setContent] = useState<ReflectionContent>({
    text: initialContent,
    timestamp: new Date(),
    type: 'daily',
    tags: [],
    privacy: 'private'
  });

  const [newTag, setNewTag] = useState('');
  const [showMarkdownHelp, setShowMarkdownHelp] = useState(false);

  const handleAddTag = () => {
    if (newTag && !content.tags.includes(newTag)) {
      setContent({ ...content, tags: [...content.tags, newTag] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setContent({ 
      ...content, 
      tags: content.tags.filter(tag => tag !== tagToRemove) 
    });
  };

  const insertMarkdown = (markdownType: string) => {
    const textArea = document.querySelector('textarea');
    if (!textArea) return;

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const text = content.text;
    let newText = '';

    switch (markdownType) {
      case 'bold':
        newText = text.slice(0, start) + `**${text.slice(start, end) || 'text'}**` + text.slice(end);
        break;
      case 'italic':
        newText = text.slice(0, start) + `_${text.slice(start, end) || 'text'}_` + text.slice(end);
        break;
      case 'list':
        newText = text.slice(0, start) + `\n- ${text.slice(start, end) || 'listitem'}` + text.slice(end);
        break;
      case 'quote':
        newText = text.slice(0, start) + `\n> ${text.slice(start, end) || 'citat'}` + text.slice(end);
        break;
      case 'link':
        newText = text.slice(0, start) + `[${text.slice(start, end) || 'länk'}](url)` + text.slice(end);
        break;
      case 'image':
        newText = text.slice(0, start) + `![${text.slice(start, end) || 'alt text'}](bildurl)` + text.slice(end);
        break;
    }

    setContent({ ...content, text: newText });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
  };

  const ButtonIcon: React.FC<{ children: React.ReactNode; onClick: () => void; label?: string }> = ({ children, onClick, label }) => (
    <button
      onClick={onClick}
      className="p-2 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      title={label}
    >
      {children}
    </button>
  );

  const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
    <select
      {...props}
      className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 
                 hover:border-primary-500 focus:border-primary-500 focus:ring-2 
                 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
    />
  );

  const Tag: React.FC<{ text: string; onRemove: () => void }> = ({ text, onRemove }) => (
    <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm 
                    flex items-center space-x-1 hover:bg-primary-100 transition-colors duration-200">
      <span>{text}</span>
      <button
        onClick={onRemove}
        className="ml-1 hover:text-primary-800 focus:outline-none focus:text-primary-800"
      >
        ×
      </button>
    </span>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-wrap gap-4 items-center">
          <Select
            value={content.type}
            onChange={(e) => setContent({ ...content, type: e.target.value as ReflectionContent['type'] })}
          >
            {Object.entries(t.raw('types')).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </Select>

          <Select
            value={content.mood}
            onChange={(e) => setContent({ ...content, mood: e.target.value as ReflectionContent['mood'] })}
          >
            <option value="">{t('moods.placeholder')}</option>
            {Object.entries(t.raw('moods')).map(([key, value]) => (
              key !== 'placeholder' && <option key={key} value={key}>{value}</option>
            ))}
          </Select>

          <Select
            value={content.privacy}
            onChange={(e) => setContent({ ...content, privacy: e.target.value as ReflectionContent['privacy'] })}
          >
            <option value="private">{t('privacy.private')}</option>
            <option value="mentor">{t('privacy.mentor')}</option>
            <option value="group">{t('privacy.group')}</option>
            <option value="public">{t('privacy.public')}</option>
          </Select>
        </div>
      </div>

      {/* Markdown toolbar */}
      <div className="px-6 py-3 border-b border-gray-200 flex items-center space-x-2 bg-white">
        <ButtonIcon onClick={() => insertMarkdown('bold')} label={t('markdown.bold')}>
          <Bold className="w-4 h-4" />
        </ButtonIcon>
        <ButtonIcon onClick={() => insertMarkdown('italic')} label={t('markdown.italic')}>
          <Italic className="w-4 h-4" />
        </ButtonIcon>
        <ButtonIcon onClick={() => insertMarkdown('list')} label={t('markdown.list')}>
          <List className="w-4 h-4" />
        </ButtonIcon>
        <ButtonIcon onClick={() => insertMarkdown('quote')} label={t('markdown.quote')}>
          <Quote className="w-4 h-4" />
        </ButtonIcon>
        <ButtonIcon onClick={() => insertMarkdown('link')} label={t('markdown.link')}>
          <Link className="w-4 h-4" />
        </ButtonIcon>
        <ButtonIcon onClick={() => insertMarkdown('image')} label={t('markdown.image')}>
          <Image className="w-4 h-4" />
        </ButtonIcon>
        
        <div className="relative ml-auto">
          <ButtonIcon onClick={() => setShowMarkdownHelp(!showMarkdownHelp)} label={t('markdown.help')}>
            <HelpCircle className="w-4 h-4" />
          </ButtonIcon>
          {showMarkdownHelp && (
            <div className="absolute right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 w-64 z-10">
              <h4 className="font-heading text-sm font-medium text-gray-900 mb-2">{t('markdown.help')}</h4>
              <ul className="text-sm space-y-1.5 text-gray-600">
                <li><code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">**text**</code> = <strong>{t('markdown.bold')}</strong></li>
                <li><code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">_text_</code> = <em>{t('markdown.italic')}</em></li>
                <li><code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">- item</code> = {t('markdown.list')}</li>
                <li><code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">{">"} text</code> = {t('markdown.quote')}</li>
                <li><code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">[länk](url)</code> = {t('markdown.link')}</li>
                <li><code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">![alt](bildurl)</code> = {t('markdown.image')}</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="p-6">
        <textarea
          className="w-full h-64 p-4 border border-gray-200 rounded-lg font-mono text-gray-700
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                     transition-colors duration-200 resize-none"
          value={content.text}
          onChange={(e) => setContent({ ...content, text: e.target.value })}
          placeholder={t('placeholder')}
        />
      </div>

      {/* Tags */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2 mb-3">
          <Hash className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            placeholder={t('tags.add')}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm
                       focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                       transition-colors duration-200"
          />
          <button 
            onClick={handleAddTag}
            className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg text-sm
                       hover:bg-primary-200 transition-colors duration-200
                       focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            {t('tags.button')}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {content.tags.map(tag => (
            <Tag key={tag} text={tag} onRemove={() => handleRemoveTag(tag)} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-white">
        <span className="text-sm text-gray-500">
          {t('save.lastSaved', { time: new Date().toLocaleTimeString() })}
        </span>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg 
                     hover:bg-primary-700 transition-colors duration-200
                     focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                     flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{t('save.button')}</span>
        </button>
      </div>
    </div>
  );
};

export default ReflectionEditor;
