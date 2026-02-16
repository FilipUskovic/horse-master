<script lang="ts">
    import '../app.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import favicon from '$lib/assets/favicon.svg';
    import { fade } from 'svelte/transition';
    import { page } from '$app/state';

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href="{favicon}" />
    <title>Horse Master</title>
</svelte:head>

<div class="flex flex-col min-h-screen font-sans text-gray-900 antialiased bg-gray-50">
    <Navbar />

    <main class="flex-grow pt-16 pb-24 sm:pb-0">
        {#key page.url.pathname}
            <div in:fade={{ duration: 300, delay: 150 }}>
                {@render children()}
            </div>
        {/key}
    </main>

    <Footer />
</div>