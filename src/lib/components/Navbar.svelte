<script lang="ts">
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';
    import { page } from '$app/state'; 
    import { goto, onNavigate } from '$app/navigation';
    import type { Session } from '@supabase/supabase-js';

    let session = $state<Session | null>(null);
    let isLoggingOut = $state(false);

    let activePath = $derived(page.url.pathname);

    onNavigate((navigation) => {
        if (!document.startViewTransition) return;
        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });

    onMount(() => {
        supabase.auth.getSession().then(({ data }) => {
            session = data.session;
        });
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, _session) => {
            session = _session;
        });
        return () => authListener.subscription.unsubscribe();
    });

    async function handleSignOut() {
        isLoggingOut = true;
        await supabase.auth.signOut();
        isLoggingOut = false;
        goto('/');
    }

    const isActive = (path: string) => activePath === path || (path !== '/' && activePath.startsWith(path));
</script>

<header class="hidden sm:flex fixed top-6 inset-x-0 z-50 justify-center px-4 pointer-events-none">
    <nav class="pointer-events-auto flex items-center justify-between py-2.5 px-6 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-full w-full max-w-2xl transition-all duration-500 hover:scale-[1.01]">
        
        <a href="/" class="flex items-center mr-8 group" aria-label="Početna stranica">
            <span class="text-xs font-black tracking-[0.2em] text-gray-900 uppercase">
                HORSE<span class="text-blue-600 group-hover:text-blue-500 transition-colors">MASTER</span>
            </span>
        </a>

        <div class="flex items-center space-x-1 bg-gray-100/50 p-1 rounded-full border border-white/50">
            <a href="/about" class="desk-link" class:active={isActive('/about')}>O nama</a>
            <a href="/gallery" class="desk-link" class:active={isActive('/gallery')}>Galerija</a>
            <a href="/contact" class="desk-link" class:active={isActive('/contact')}>Kontakt</a>
        </div>

        <div class="flex items-center ml-8 pl-4 border-l border-gray-300/50">
            {#if session}
                <div class="flex items-center space-x-3">
                    <a href="/admin" class="text-[10px] font-bold uppercase text-gray-400 hover:text-blue-600 transition-colors" class:active={isActive('/admin')}>Admin</a>
                    <button onclick={handleSignOut} disabled={isLoggingOut} class="logout-btn" aria-label="Odjavi se">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                    </button>
                </div>
            {:else}
                <a href="/login" class="p-2 text-gray-400 hover:text-blue-600 transition-all hover:scale-110" aria-label="Prijavi se">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </a>
            {/if}
        </div>
    </nav>
</header>

<div class="sm:hidden fixed bottom-0 inset-x-0 z-50 px-2 pb-6 pt-2 pointer-events-none">
    <nav class="pointer-events-auto bg-white/95 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-2xl flex justify-around items-center py-3">
        
        <a href="/" class="mob-link" class:active={activePath === '/'} aria-label="Početna">
            <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            <span class="text-[9px] font-medium">Početna</span>
        </a>

        <a href="/about" class="mob-link" class:active={isActive('/about')} aria-label="O nama">
            <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="text-[9px] font-medium">O nama</span>
        </a>

        <a href="/gallery" class="relative -top-6 bg-blue-600 text-white p-4 rounded-full shadow-lg border-4 border-gray-50 active:scale-95 transition-transform" aria-label="Galerija">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </a>

        <a href="/contact" class="mob-link" class:active={isActive('/contact')} aria-label="Kontakt">
            <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <span class="text-[9px] font-medium">Kontakt</span>
        </a>

        {#if session}
            <a href="/admin" class="mob-link" class:active={isActive('/admin')} aria-label="Admin panel">
                <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
                <span class="text-[9px] font-medium">Admin</span>
            </a>
            
            <button onclick={handleSignOut} class="mob-link text-red-500" aria-label="Odjava">
                <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                <span class="text-[9px] font-medium">Odjava</span>
            </button>
        {:else}
            <a href="/login" class="mob-link" aria-label="Prijava">
                <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                <span class="text-[9px] font-medium">Prijava</span>
            </a>
        {/if}

    </nav>
</div>

<style>
    .desk-link { @apply px-5 py-2 text-sm font-medium text-gray-500 rounded-full transition-all duration-300; }
    .desk-link.active { @apply bg-white text-blue-600 shadow-sm text-gray-900 font-bold; }
    .desk-link:not(.active):hover { @apply text-blue-600; }
    .logout-btn { @apply p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-red-50 hover:text-red-600 transition-all active:scale-90; }

    .mob-link { @apply flex flex-col items-center justify-center text-gray-400 w-12 transition-colors duration-300; }
    .mob-link.active { @apply text-blue-600; }
</style>