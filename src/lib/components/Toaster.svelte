<script lang="ts">
    import { toast } from '$lib/toast.svelte';
    import { fly, fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { quintOut } from 'svelte/easing';
</script>

<div class="fixed top-8 right-8 z-[1000] flex flex-col gap-4 w-full max-w-[320px] pointer-events-none">
    {#each toast.list as item (item.id)}
        <div 
            animate:flip={{ duration: 400 }}
            in:fly={{ x: 50, duration: 600, easing: quintOut }}
            out:fade={{ duration: 300 }}
            class="pointer-events-auto p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border backdrop-blur-2xl flex items-center gap-4 relative overflow-hidden bg-brandDark/80 border-white/5"
        >
            <div class="absolute left-0 top-0 bottom-0 w-1.5
                {item.type === 'success' ? 'bg-emerald-500' : item.type === 'error' ? 'bg-red-500' : 'bg-brandBlue'}">
            </div>

            <div class="shrink-0">
                {#if item.type === 'success'}
                    <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                {:else if item.type === 'error'}
                    <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {:else}
                    <svg class="w-5 h-5 text-brandBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {/if}
            </div>

            <div class="flex-grow font-black uppercase text-[10px] tracking-[0.2em] leading-tight text-brandLight/90">
                {item.message}
            </div>

            <button 
                onclick={() => toast.remove(item.id)} 
                class="p-2 -mr-2 text-white/20 hover:text-white transition-colors"
                aria-label="Zatvori obavijest"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>
    {/each}
</div>

<style>
    /* cisenje fokusa na mobitelu */
    button { -webkit-tap-highlight-color: transparent; }
</style>