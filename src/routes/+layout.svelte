<script lang="ts">
    import '../app.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import favicon from '$lib/assets/favicon.svg';
    import { fade } from 'svelte/transition';
    import { page } from '$app/state';
    import Toaster from '$lib/components/Toaster.svelte';

    let { children } = $props();

    // Provjeravamo jesmo li u admin sekciji
    const isAdmin = $derived(page.url.pathname.startsWith('/admin'));
</script>

<svelte:head>
    <link rel="icon" href="{favicon}" />
    <title>Horse Master</title>
</svelte:head>

<div class="flex flex-col min-h-screen font-sans text-gray-900 antialiased bg-gray-50">
    {#if !isAdmin}
        <Navbar />
    {/if}

    <Toaster />

    <main class="flex-grow {isAdmin ? '' : 'pt-16 pb-24 sm:pb-0'}">
        {#key page.url.pathname}
            <div in:fade={{ duration: 300, delay: 150 }}>
                {@render children()}
            </div>
        {/key}
    </main>

    {#if !isAdmin}
        <Footer />
    {/if}
</div>