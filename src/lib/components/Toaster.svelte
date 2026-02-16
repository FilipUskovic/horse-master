<script lang="ts">
    import { toast } from '$lib/toast.svelte';
   import { fly, fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
</script>

<div class="fixed top-8 right-8 z-[600] flex flex-col gap-3 w-full max-w-xs pointer-events-none">
    {#each toast.list as item (item.id)}
        <div 
            animate:flip={{ duration: 300 }}
            in:fly={{ x: 100, duration: 400 }}
            out:fade={{ duration: 200 }}
            class="pointer-events-auto p-5 rounded-3xl shadow-2xl border backdrop-blur-xl flex items-center gap-4 border-white/20
            {item.type === 'success' ? 'bg-green-600/90' : item.type === 'error' ? 'bg-red-600/90' : 'bg-blue-600/90'} text-white"
        >
            <div class="flex-grow font-black uppercase text-[10px] tracking-widest leading-tight">
                {item.message}
            </div>
            <button onclick={() => toast.remove(item.id)} class="opacity-50 hover:opacity-100 font-bold px-2">✕</button>
        </div>
    {/each}
</div>