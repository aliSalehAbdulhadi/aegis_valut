import i18n from '@/i18n';

const DATE_OPTIONS_EN: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const DATE_OPTIONS_AR: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  calendar: 'gregory',
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const locale = i18n.language === 'ar' ? 'ar-SA' : 'en-US';
  const options = i18n.language === 'ar' ? DATE_OPTIONS_AR : DATE_OPTIONS_EN;
  return date.toLocaleDateString(locale, options);
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  const locale = i18n.language === 'ar' ? 'ar-SA' : 'en-US';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return i18n.language === 'ar' ? 'اليوم' : 'Today';
  if (diffDays === 1) return i18n.language === 'ar' ? 'أمس' : 'Yesterday';
  if (diffDays < 7)
    return i18n.language === 'ar'
      ? `منذ ${diffDays} أيام`
      : `${diffDays} days ago`;

  return formatShortDate(dateString);
}
