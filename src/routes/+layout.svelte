<script lang="ts">
    import '../app.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import favicon from '$lib/assets/favicon.svg';
    import { page } from '$app/state';
    import Toaster from '$lib/components/Toaster.svelte';
    import { onNavigate } from '$app/navigation';
    import CookieConsent from '$lib/components/CookieConsent.svelte';

    let { children } = $props();

    const hideLayout = $derived(
    page.url.pathname.startsWith('/admin') || 
    page.url.pathname.startsWith('/usluge')
);

    onNavigate((navigation) => {
        // if view transation is not posiible - contune normally
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                // wait to laod site 
                await navigation.complete;
            });
        });
    });
</script>

<svelte:head>
    <link rel="icon" href="{favicon}" />
    <title>Horse Master</title>
</svelte:head>

<div class="flex flex-col min-h-screen font-sans text-brandLight antialiased bg-brandDark">
    {#if !hideLayout}
        <Navbar />
    {/if}

    <Toaster />
    <CookieConsent />

    <main class="flex-grow {hideLayout ? '' : 'pt-0 pb-24 sm:pb-0'}">
        {@render children()}
    </main>

    {#if !hideLayout}
        <Footer />
    {/if}
</div>