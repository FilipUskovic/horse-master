<script lang="ts">
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
    import { slide } from 'svelte/transition';

    let session: any = null;
    let isMenuOpen = false; //mobile menu

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
        await supabase.auth.signOut();
        isMenuOpen = false;
        goto('/');
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    $: activePath = page.url.pathname;
</script>

<div class="fixed top-6 inset-x-0 z-50 flex flex-col items-center px-4 pointer-events-none">
    <nav class="pointer-events-auto flex items-center justify-between py-2 px-4 md:px-6 bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg rounded-full w-full max-w-lg transition-all duration-500 hover:shadow-xl">
        
        <a href="/" class="flex items-center mr-2" aria-label="Početna stranica">
            <span class="text-xs font-black tracking-widest text-gray-900 uppercase">
                HORSE<span class="text-blue-600">MASTER</span>
            </span>
        </a>

        <div class="hidden sm:flex items-center space-x-1">
            <a href="/about" class="nav-item" class:active={activePath === '/about'}>O nama</a>
            <a href="/gallery" class="nav-item" class:active={activePath === '/gallery'}>Galerija</a>
            <a href="/contact" class="nav-item" class:active={activePath === '/contact'}>Kontakt</a>
        </div>

        <button on:click={toggleMenu} class="sm:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors" aria-label="Izbornik">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>

        <div class="flex items-center ml-2 pl-2 border-l border-gray-200/50">
            {#if session}
                <div class="flex items-center space-x-2">
                    <a href="/admin" class="hidden md:block text-[10px] font-bold uppercase text-gray-400 hover:text-blue-600">Admin</a>
                    <button on:click={handleSignOut} class="p-2 bg-gray-900 text-white rounded-full hover:bg-red-500 transition-all active:scale-90" aria-label="Odjava">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    </button>
                </div>
            {:else}
                <a href="/login" class="p-2 text-gray-400 hover:text-blue-600 transition-all" aria-label="Prijava">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </a>
            {/if}
        </div>
    </nav>

    {#if isMenuOpen}
        <div transition:slide={{ duration: 300, axis: 'y' }} class="pointer-events-auto mt-2 w-full max-w-xs bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-4 sm:hidden">
            <div class="flex flex-col space-y-2">
                <a href="/about" class="mobile-nav-item" on:click={toggleMenu}>O nama</a>
                <a href="/gallery" class="mobile-nav-item" on:click={toggleMenu}>Galerija</a>
                <a href="/contact" class="mobile-nav-item" on:click={toggleMenu}>Kontakt</a>
            </div>
        </div>
    {/if}
</div>

<style>
    .nav-item {
        @apply px-3 py-1.5 text-[11px] md:text-sm font-medium text-gray-500 rounded-full transition-all duration-300;
    }
    .nav-item.active {
        @apply bg-white text-blue-600 shadow-sm border border-gray-100;
    }
    .mobile-nav-item {
        @apply block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all;
    }
</style>