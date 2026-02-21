<script lang="ts">
    import { fade, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { t } from 'svelte-i18n';

    // Svelte 5 Props (Zadržana tvoja logika)
    let { 
        show = $bindable(false), 
        title = undefined, 
        message = undefined, 
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
        class="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-brandDark/80 backdrop-blur-xl" 
        transition:fade={{ duration: 300 }}
        role="dialog"
        aria-modal="true"
    >
        <button 
            type="button" 
            class="absolute inset-0 w-full h-full cursor-default bg-transparent border-none outline-none" 
            onclick={handleCancel}
            aria-label={$t('modal.close')}
        ></button>

        <div 
            class="relative bg-brandDark/95 rounded-[3rem] p-10 md:p-14 max-w-md w-full shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/5 text-center pointer-events-auto overflow-hidden"
            transition:scale={{ duration: 500, start: 0.9, easing: quintOut }}
        >
            <div class="absolute -top-20 -left-20 w-40 h-40 bg-red-500/10 blur-[80px] rounded-full"></div>

            <div class="relative w-20 h-20 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-black shadow-[0_0_30px_rgba(239,68,68,0.15)] italic">
                !
            </div>

            <h3 class="text-3xl font-black text-brandLight mb-4 uppercase italic tracking-tighter">
                {title ?? $t('modal.title')}
            </h3>
            
            <p class="text-brandLight/40 text-lg font-light mb-12 leading-relaxed uppercase tracking-widest text-[10px]">
               {message ?? $t('modal.message')}
            </p>
            
            <div class="flex flex-col gap-4">
                <button 
                    type="button"
                    onclick={handleConfirm} 
                    class="group relative w-full py-6 bg-red-600 text-white font-black rounded-2xl transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-[0.3em] text-[10px] overflow-hidden shadow-2xl shadow-red-900/20"
                >
                    <span class="relative z-10">{$t('modal.confirm')}</span>
                    <div class="absolute inset-0 bg-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[quintOut]"></div>
                </button>

                <button 
                    type="button"
                    onclick={handleCancel} 
                    class="w-full py-6 bg-white/5 text-brandLight/60 font-black rounded-2xl hover:bg-white/10 hover:text-brandLight transition-all uppercase tracking-[0.3em] text-[10px] border border-white/5"
                >
                    {$t('modal.cancel')}
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    /* stop treptanje click on mobile  */
    button { -webkit-tap-highlight-color: transparent; }

    /* Fix za scroll lock when modal opened */
    :global(body:has([role="dialog"])) {
        overflow: hidden;
    }
</style>