import { init, register } from 'svelte-i18n';

register('hr', () => import('$lib/locales/hr.json'));
register('en', () => import('$lib/locales/en.json'));

init({
  fallbackLocale: 'hr',
  initialLocale: 'hr' 
});