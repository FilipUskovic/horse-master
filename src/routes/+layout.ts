import '$lib/i18n';
import { waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';
import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

injectAnalytics({ mode: dev ? 'development' : 'production' });

export const load: LayoutLoad = async () => {
    // wait for dicitionary before rednering
    await waitLocale();
};