<script lang="ts">
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';
    import { page } from '$app/state'; 
    import { goto, afterNavigate } from '$app/navigation';
    import { slide, fade } from 'svelte/transition';
    import type { Session } from '@supabase/supabase-js';

    let session = $state<Session | null>(null);
    let isMenuOpen = $state(false);
    let isLoggingOut = $state(false);

    let activePath = $derived(page.url.pathname);

    // OVO POPRAVLJA ROUTING:
    // Svaki put kad se promijeni stranica, zatvori meni i resetiraj stanje
    afterNavigate(() => {
        isMenuOpen = false;
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
        goto('/');
    }

    const toggleMenu = () => isMenuOpen = !isMenuOpen;
    // Helper za aktivni link
    const isActive = (path: string) => activePath === path || (path !== '/' && activePath.startsWith(path));
</script>

{#if isMenuOpen}
    <div 
        role="presentation"
        class="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm sm:hidden" 
        onclick={toggleMenu}
        transition:fade={{ duration: 200 }}
    ></div>
{/if}

<header class="fixed top-6 inset-x-0 z-50 flex flex-col items-center px-4 pointer-events-none">
    <nav class="pointer-events-auto flex items-center justify-between py-2 px-4 md:px-6 bg-white/75 backdrop-blur-xl border border-white/20 shadow-lg rounded-full w-full max-w-lg transition-all duration-500 hover:shadow-xl">
        
        <a href="/" class="flex items-center mr-2 group" aria-label="Početna">
            <span class="text-xs font-black tracking-widest text-gray-900 uppercase">
                HORSE<span class="text-blue-600">MASTER</span>
            </span>
        </a>

        <div class="hidden sm:flex items-center space-x-1">
            <a href="/about" class="nav-item" class:active={isActive('/about')}>O nama</a>
            <a href="/gallery" class="nav-item" class:active={isActive('/gallery')}>Galerija</a>
            <a href="/contact" class="nav-item" class:active={isActive('/contact')}>Kontakt</a>
        </div>

        <button onclick={toggleMenu} class="sm:hidden p-2 text-gray-600" aria-label="Izbornik">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"}/>
            </svg>
        </button>

        <div class="flex items-center ml-2 pl-2 border-l border-gray-200/50">
            {#if session}
                <div class="flex items-center space-x-2">
                    <a href="/admin" class="hidden md:block text-[10px] font-bold uppercase text-gray-400 hover:text-blue-600">Admin</a>
                    <button onclick={handleSignOut} disabled={isLoggingOut} class="logout-btn">
                        {#if isLoggingOut} <span class="animate-spin text-[8px]">...</span> {:else} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg> {/if}
                    </button>
                </div>
            {:else}
                <a href="/login" class="p-2 text-gray-400 hover:text-blue-600 transition-all" aria-label="Prijava">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </a>
            {/if}
        </div>
    </nav>

    {#if isMenuOpen}
        <div transition:slide={{ duration: 300 }} class="mobile-menu">
            <div class="flex flex-col space-y-1">
                <a href="/about" class="mobile-link" onclick={toggleMenu} class:active={isActive('/about')}>O nama</a>
                <a href="/gallery" class="mobile-link" onclick={toggleMenu} class:active={isActive('/gallery')}>Galerija</a>
                <a href="/contact" class="mobile-link" onclick={toggleMenu} class:active={isActive('/contact')}>Kontakt</a>
            </div>
        </div>
    {/if}
</header>

<style>
    .nav-item { @apply px-3 py-1.5 text-[11px] md:text-sm font-medium text-gray-500 rounded-full transition-all duration-300; }
    .nav-item.active { @apply bg-white text-blue-600 shadow-sm border border-gray-100; }
    .nav-item:not(.active):hover { @apply text-blue-600 bg-blue-50/50; }
    .logout-btn { @apply p-2 bg-gray-900 text-white rounded-full hover:bg-red-500 transition-all active:scale-90 disabled:opacity-50; }
    .mobile-menu { @apply pointer-events-auto mt-2 w-full max-w-xs bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-4 sm:hidden; }
    .mobile-link { @apply block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all; }
    .mobile-link.active { @apply bg-blue-50 text-blue-700 font-bold; }
</style>