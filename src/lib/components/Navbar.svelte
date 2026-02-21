<script lang="ts">
  import { supabase } from "$lib/supabase";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { goto, onNavigate } from "$app/navigation";
  import type { Session } from "@supabase/supabase-js";
  import {locale, t} from 'svelte-i18n';

  let session = $state<Session | null>(null);
  let isLoggingOut = $state(false);

  let activePath = $derived(page.url.pathname);

  // View Transition 
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
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, _session) => {
        session = _session;
      },
    );
    return () => authListener.subscription.unsubscribe();
  });

  async function handleSignOut() {
    isLoggingOut = true;
    await supabase.auth.signOut();
    isLoggingOut = false;
    goto("/");
  }

  const isActive = (path: string) =>
    activePath === path || (path !== "/" && activePath.startsWith(path));

    function toggleLanguage() {
    $locale = $locale === 'hr' ? 'en' : 'hr';
  }

</script>

<header class="fixed top-0 sm:top-6 inset-x-0 z-50 flex justify-between items-center px-6 py-4 sm:py-0 pointer-events-none">
    
    <a href="/" class="pointer-events-auto group bg-brandDark/40 backdrop-blur-xl py-2.5 px-6 rounded-full border border-white/5 shadow-2xl transition-all hover:scale-105 hover:border-brandBlue/30" aria-label="HorseMaster Početna">
        <span class="text-[10px] font-black tracking-[0.3em] text-brandLight uppercase">
            HORSE<span class="text-brandBlue blue-glow">MASTER</span>
        </span>
    </a>

    <nav class="hidden sm:flex pointer-events-auto items-center space-x-1 bg-brandDark/40 backdrop-blur-xl p-1.5 rounded-full border border-white/5 shadow-2xl">
        <a href="/about" class="desk-link" class:active={isActive("/about")}>{$t('nav.about')}</a>
        <a href="/portfolio" class="desk-link" class:active={isActive("/portfolio")}>{$t('nav.portfolio')}</a>
        <a href="/gallery" class="desk-link" class:active={isActive("/gallery")}>{$t('nav.gallery')}</a>
        <a href="/contact" class="desk-link" class:active={isActive("/contact")}>{$t('nav.contact')}</a>
    </nav>

    <div class="pointer-events-auto flex items-center gap-3">

      <button 
            onclick={toggleLanguage} 
            class="bg-brandDark/40 backdrop-blur-xl px-4 py-2.5 rounded-full border border-white/5 shadow-lg text-[10px] font-black uppercase tracking-widest text-brandLight hover:text-brandBlue transition-all hover:scale-105 active:scale-95" 
            aria-label="Promijeni jezik">
            {$locale}
        </button>


        {#if session}
            <div class="flex items-center gap-2 bg-brandDark/40 backdrop-blur-xl p-1 rounded-full border border-white/5 shadow-lg">
                <a href="/admin" class="text-[10px] font-bold uppercase px-4 text-brandLight/60 hover:text-brandBlue transition-colors" class:active={isActive("/admin")}>Admin</a>
                <button type="button" onclick={handleSignOut} disabled={isLoggingOut} class="logout-btn" aria-label="Odjava">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                </button>
            </div>
        {:else}
            <a href="/login" class="bg-brandDark/40 backdrop-blur-xl p-3 rounded-full border border-white/5 shadow-lg text-brandLight/40 hover:text-brandBlue transition-all hover:scale-110" aria-label="Admin Login">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </a>
        {/if}
    </div>
</header>

<div class="sm:hidden fixed bottom-0 inset-x-0 z-50 px-4 pb-8 pt-2 pointer-events-none">
    <nav class="pointer-events-auto bg-brandDark/80 backdrop-blur-2xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] grid grid-cols-5 items-center h-20">
        
        <a href="/" class="mob-link" class:active={activePath === "/"} aria-label={$t('nav.start')}>
            <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            <span class="text-[8px] font-black uppercase tracking-widest">{$t('nav.start')}</span>
        </a>

        <a href="/about" class="mob-link" class:active={isActive("/about")} aria-label={$t('nav.about')}>
            <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="text-[8px] font-black uppercase tracking-widest">{$t('nav.about')}</span>
        </a>

        <div class="flex justify-center relative">
            <a href="/gallery" class="absolute -top-12 bg-brandBlue text-brandLight p-5 rounded-full shadow-[0_15px_30px_rgba(37,99,235,0.4)] border-[6px] border-brandDark active:scale-90 transition-all duration-300" aria-label="Galerija">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </a>
        </div>

        <a href="/portfolio" class="mob-link" class:active={isActive("/portfolio")} aria-label={$t('nav.portfolio')}>
            <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            <span class="text-[8px] font-black uppercase tracking-widest">{$t('nav.portfolio')}</span>
        </a>

        <a href="/contact" class="mob-link" class:active={isActive("/contact")} aria-label={$t('nav.contact')}>
            <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <span class="text-[8px] font-black uppercase tracking-widest">{$t('nav.contact')}</span>
        </a>

    </nav>
</div>

<style>
  /*  Desktop Links */
  .desk-link {
    @apply px-6 py-2 text-[10px] font-black uppercase tracking-widest text-brandLight/40 rounded-full transition-all duration-300;
  }
  .desk-link.active {
    @apply bg-brandBlue/10 text-brandBlue shadow-[0_0_20px_rgba(37,99,235,0.1)] border border-brandBlue/20;
  }
  .desk-link:not(.active):hover {
    @apply text-brandLight;
  }

  .logout-btn {
    @apply p-1.5 bg-brandLight/5 text-brandLight/40 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-all active:scale-90;
  }

  /* mobile links */
  .mob-link {
    @apply flex flex-col items-center justify-center text-brandLight/40 transition-all duration-300;
  }
  .mob-link.active {
    @apply text-brandBlue blue-glow;
  }

  .blue-glow {
    text-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
  }

  * { -webkit-tap-highlight-color: transparent; }
</style>