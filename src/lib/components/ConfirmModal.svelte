<script lang="ts">
    import { fade, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    // onCancel je sada opcionalan
    let { 
        show = $bindable(false), 
        title = "Jeste li sigurni?", 
        message = "Ova radnja se ne može poništiti.", 
        onConfirm, 
        onCancel = () => {} 
    } = $props();

    function handleConfirm() {
        onConfirm();
        show = false;
    }

    function handleCancel() {
        onCancel(); 
        show = false;
    }
</script>

{#if show}
    <div 
        class="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-sm" 
        transition:fade={{ duration: 200 }}
        role="dialog"
        aria-modal="true"
    >
        <button 
            type="button" 
            class="absolute inset-0 w-full h-full cursor-default bg-transparent border-none" 
            onclick={handleCancel}
            aria-label="Zatvori"
        ></button>

        <div 
            class="relative bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl border border-gray-100 text-center pointer-events-auto"
            transition:scale={{ duration: 400, start: 0.9, easing: quintOut }}
        >
            <div class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                !
            </div>

            <h3 class="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">
                {title}
            </h3>
            
            <p class="text-gray-500 font-medium mb-8 leading-relaxed">
                {message}
            </p>
            
            <div class="flex flex-col gap-3">
                <button 
                    onclick={handleConfirm} 
                    class="w-full py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition active:scale-95 uppercase tracking-widest text-xs"
                >
                    Da, potvrđujem
                </button>

                <button 
                    onclick={handleCancel} 
                    class="w-full py-4 bg-gray-100 text-gray-900 font-black rounded-2xl hover:bg-gray-200 transition uppercase tracking-widest text-xs"
                >
                    Odustani
                </button>
            </div>
        </div>
    </div>
{/if}