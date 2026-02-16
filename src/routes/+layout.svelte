<script>
    import '../app.css'; 
    import favicon from '$lib/assets/favicon.svg'; 
    import Navbar from '$lib/components/Navbar.svelte'; 
    import Footer from '$lib/components/Footer.svelte'; // Uvozimo Footer

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href="{favicon}" />
    <title>Horse Master</title>
</svelte:head>

<div class="flex flex-col min-h-screen font-sans text-gray-900 antialiased bg-gray-50">
    
    <Navbar />

    <main class="flex-grow pt-16">
        {@render children()} 
    </main>

    <Footer />

</div>