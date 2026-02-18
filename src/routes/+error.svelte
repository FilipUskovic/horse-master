<script lang="ts">
    import { goto } from '$app/navigation';
    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
</script>

<svelte:head>
    <title>404 | Stranica nije pronađena</title>
</svelte:head>

<div class="fixed inset-0 pointer-events-none z-0">
    <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brandBlue/5 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brandDeep/20 blur-[120px] rounded-full"></div>
</div>

<div class="fixed inset-0 pointer-events-none z-[900] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

<div class="min-h-screen bg-brandDark text-brandLight flex items-center justify-center px-6 relative z-10 overflow-hidden">
    
    <div class="text-center max-w-4xl w-full">
        <div class="overflow-hidden mb-4">
            <span in:fly={{ y: 20, duration: 800, easing: quintOut }} class="block text-brandBlue font-mono text-[10px] md:text-xs uppercase tracking-[0.6em]">Error Code</span>
        </div>

        <h1 in:fly={{ y: 50, duration: 1000, easing: quintOut }} class="text-[25vw] md:text-[15vw] font-black leading-none tracking-tighter uppercase italic">
            4<span class="text-transparent text-stroke-white blue-glow italic">0</span>4
        </h1>

        <div in:fade={{ delay: 400, duration: 1000 }} class="mt-8 space-y-6">
            <h2 class="text-2xl md:text-4xl font-black uppercase tracking-tight italic">
                Izgubljeni u <span class="text-brandBlue">galopu?</span>
            </h2>
            <p class="text-brandLight/40 text-sm md:text-lg max-w-md mx-auto font-light leading-relaxed">
                Nažalost, stranica koju tražite ne postoji ili je premještena na drugu lokaciju.
            </p>
        </div>

        <div in:fade={{ delay: 800, duration: 1000 }} class="mt-16">
            <button 
                onclick={() => goto('/')}
                class="group relative inline-flex items-center gap-6 px-12 py-6 bg-brandLight text-brandDark rounded-full font-black uppercase tracking-[0.4em] text-[10px] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
                aria-label="Povratak na početnu stranicu"
            >
                <span class="relative z-10">Povratak na početnu</span>
                <div class="absolute inset-0 bg-brandBlue translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[quintOut]"></div>
            </button>
        </div>
    </div>
</div>

<style>
    /*  Typography */
    .text-stroke-white {
        -webkit-text-stroke: 1px rgba(240, 242, 245, 0.2);
        color: transparent;
    }

    .blue-glow {
        text-shadow: 0 0 30px rgba(37, 99, 235, 0.4);
    }

    :global(body) {
        background-color: #050505;
        overflow: hidden;
    }
</style>