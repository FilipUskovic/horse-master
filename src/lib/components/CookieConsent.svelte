<script lang="ts">
    import { onMount } from "svelte";
    import { fade, slide } from "svelte/transition";

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
        transition:slide={{ axis: 'y', duration: 400 }}
        class="fixed bottom-0 left-0 w-full z-[9999] bg-gray-900 text-white p-6 shadow-2xl border-t border-gray-800"
    >
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-start gap-4">
                <div class="p-3 bg-blue-600/20 rounded-xl text-blue-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-1">Cijenimo vašu privatnost</h3>
                    <p class="text-gray-400 text-sm leading-relaxed max-w-2xl">
                        Koristimo osnovne kolačiće kako bismo osigurali pravilan rad web stranice i poboljšali vaše korisničko iskustvo. Nastavkom pregleda slažete se s korištenjem kolačića.
                    </p>
                </div>
            </div>
            
            <div class="flex gap-4 w-full md:w-auto">
                <button 
                    onclick={accept}
                    class="flex-1 md:flex-none px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition shadow-lg shadow-blue-900/20 uppercase tracking-widest text-xs whitespace-nowrap"
                >
                    Prihvaćam
                </button>
            </div>
        </div>
    </div>
{/if}