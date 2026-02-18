<script lang="ts">
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    let show = $state(false);

    onMount(() => {
       if(!localStorage.getItem('horse_master_consent')) {
        setTimeout(() => show = true, 1000)
       }
    });

    function accept(){
        localStorage.setItem('horse_master_consent', 'true');
        show = false;
    }
</script>

{#if show}
    <div 
        transition:fly={{ y: 50, duration: 800, easing: quintOut }}
        class="fixed bottom-0 left-0 w-full z-[9999] p-4 pb-24 sm:pb-8 pointer-events-none"
    >
        <div class="max-w-5xl mx-auto pointer-events-auto">
            <div class="glass-card p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5 bg-brandDark/90 backdrop-blur-2xl">
                
                <div class="flex items-start gap-5">
                    <div class="hidden sm:flex p-4 bg-brandBlue/10 rounded-2xl text-brandBlue border border-brandBlue/20 shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                        <svg class="w-6 h-6 blue-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                    </div>
                    
                    <div class="text-center md:text-left">
                        <h3 class="text-brandLight font-black uppercase tracking-[0.3em] text-[10px] mb-2 italic">Privatnost i iskustvo</h3>
                        <p class="text-brandLight/40 text-xs md:text-sm leading-relaxed max-w-2xl font-light uppercase tracking-widest">
                            Koristimo osnovne kolačiće kako bismo osigurali vrhunsku funkcionalnost i prestižni doživljaj naše platforme.
                        </p>
                    </div>
                </div>
                
                <div class="flex gap-4 w-full md:w-auto">
                    <button 
                        onclick={accept}
                        class="group relative flex-1 md:flex-none px-12 py-5 bg-brandLight text-brandDark font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
                        aria-label="Prihvati kolačiće"
                    >
                        <span class="relative z-10 uppercase tracking-[0.4em] text-[10px]">Prihvaćam</span>
                        <div class="absolute inset-0 bg-brandBlue translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[quintOut]"></div>
                    </button>
                </div>

            </div>
        </div>
    </div>
{/if}

<style>
    .blue-glow {
        filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.6));
    }

    button { -webkit-tap-highlight-color: transparent; }
</style>