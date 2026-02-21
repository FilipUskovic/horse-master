<script lang="ts">
    import { PUBLIC_WEB3FORMS_ACCESS_KEY } from '$env/static/public';
    import { fade, slide, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { goto } from '$app/navigation';
    import { t } from 'svelte-i18n';

    // Svelte 5 Runes
    let name = $state("");
    let email = $state("");
    let message = $state("");
    let botcheck = $state(false); 
    
    let isSubmitting = $state(false);
    let isSuccess = $state(false);
    let submittedName = $state(""); 
    let statusMessage = $state("");
    let errors = $state({ name: "", email: "", message: "" });

    async function handleSubmit(e: Event) {
        e.preventDefault();
        
        if (botcheck) return;

        isSubmitting = true;
        statusMessage = "";
        errors = { name: "", email: "", message: "" };

        // validations
        if (name.trim().length < 2) errors.name = $t('errors_form.name_short');
        if (!email.includes('@') || !email.includes('.')) errors.email = $t('errors_form.email_invalid');
        if (message.trim().length < 10) errors.message = $t('errors_form.msg_short');

        if (errors.name || errors.email || errors.message) {
            isSubmitting = false;
            statusMessage = $t('errors_form.form_invalid');
            return;
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: PUBLIC_WEB3FORMS_ACCESS_KEY,
                    name,
                    email,
                    message,
                    from_name: "Horse Master Prestige",
                    subject: `Prestige Inquiry: ${name}`,
                    botcheck: botcheck 
                })
            });

            const result = await response.json();

            if (result.success) {
                submittedName = name; 
                isSuccess = true;
                name = ""; email = ""; message = ""; 
            } else {
                statusMessage = result.message || $t('errors_form.network_error');
            }
        } catch (err) {
            statusMessage = $t('errors_form.network_error');
        } finally {
            isSubmitting = false;
        }
    }
</script>

<svelte:head><title>{$t('contact.page_title')} | HorseMaster Prestige</title></svelte:head>

<div class="fixed inset-0 pointer-events-none z-0">
    <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brandBlue/5 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brandDeep/20 blur-[120px] rounded-full"></div>
</div>
<div class="fixed inset-0 pointer-events-none z-[900] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

<section class="min-h-screen bg-brandDark py-24 px-6 flex items-center justify-center relative z-10">
    
    <div class="max-w-xl w-full glass-card p-10 md:p-14 rounded-[3rem] relative overflow-hidden border border-white/5 shadow-2xl">
        
        <button 
            onclick={() => goto('/')} 
            class="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full text-brandLight/50 hover:text-white transition-all z-50 focus:outline-none"
            aria-label={$t('contact.aria_close')}
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        {#if isSuccess}
            <div in:fly={{ y: 20, duration: 800, easing: quintOut }} class="text-center py-6 relative z-10 flex flex-col items-center">
                <div class="flex items-center justify-center h-24 w-24 rounded-full bg-brandBlue/10 border border-brandBlue/20 mb-8">
                    <svg class="h-12 w-12 text-brandBlue blue-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/></svg>
                </div>
                
                <h2 class="text-4xl md:text-5xl font-black text-brandLight tracking-tighter uppercase italic mb-4">{$t('contact.success_title')}</h2>
                
                <p class="text-brandLight/60 text-lg font-light mb-10">
                    {@html $t('contact.success_msg', { values: { name: submittedName } })}
                </p>
                
                <button 
                    onclick={() => goto('/')} 
                    class="w-full bg-brandBlue text-white font-black py-5 rounded-2xl overflow-hidden transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 uppercase tracking-[0.3em] text-[10px]"
                >
                    {$t('contact.btn_back')}
                </button>

                <button 
                    onclick={() => isSuccess = false} 
                    class="mt-8 text-[9px] font-black uppercase tracking-[0.4em] text-brandLight/40 hover:text-brandBlue transition-colors cursor-pointer"
                >
                    {$t('contact.btn_new')}
                </button>
            </div>

        {:else}
            <div class="relative z-10" in:fade>
                <div class="mb-14">
                    <span class="text-brandBlue font-mono text-[10px] uppercase tracking-[0.5em] block mb-4">{$t('contact.header_tag')}</span>
                    <h2 class="text-5xl font-black text-brandLight tracking-tighter uppercase italic leading-none">
                        {$t('contact.header_title')} <br> <span class="text-transparent text-stroke-white blue-glow">{$t('contact.header_highlight')}</span>
                    </h2>
                </div>

                <form onsubmit={handleSubmit} class="space-y-12">
                    {#if statusMessage}
                        <div transition:slide class="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest text-center italic">
                            ⚠️ {statusMessage}
                        </div>
                    {/if}
                    
                    <input type="checkbox" name="botcheck" class="hidden" tabindex="-1" bind:checked={botcheck}>

                    <div class="relative group">
                        <input 
                            type="text" 
                            id="contact_name" 
                            bind:value={name} 
                            required
                            class="peer block py-4 px-0 w-full text-brandLight bg-transparent border-0 border-b border-white/10 focus:outline-none focus:border-brandBlue transition-all placeholder-transparent text-xl md:text-2xl" 
                            placeholder="" 
                        />
                        <label for="contact_name" class="absolute text-brandLight/20 duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 uppercase tracking-[0.3em] text-[10px] font-black peer-focus:text-brandBlue transition-all">
                            {$t('contact.label_name')}
                        </label>
                        {#if errors.name} 
                            <p transition:slide class="text-[9px] text-red-500 mt-2 font-bold uppercase tracking-wider">{errors.name}</p> 
                        {/if}
                    </div>

                    <div class="relative group">
                        <input 
                            type="email" 
                            id="contact_email" 
                            bind:value={email} 
                            required
                            class="peer block py-4 px-0 w-full text-brandLight bg-transparent border-0 border-b border-white/10 focus:outline-none focus:border-brandBlue transition-all placeholder-transparent text-xl md:text-2xl" 
                            placeholder=" " 
                        />
                        <label for="contact_email" class="absolute text-brandLight/20 duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 uppercase tracking-[0.3em] text-[10px] font-black peer-focus:text-brandBlue transition-all">
                            {$t('contact.label_email')}
                        </label>
                        {#if errors.email} 
                            <p transition:slide class="text-[9px] text-red-500 mt-2 font-bold uppercase tracking-wider">{errors.email}</p> 
                        {/if}
                    </div>

                    <div class="relative group">
                        <textarea 
                            id="contact_message" 
                            rows="3" 
                            bind:value={message} 
                            required
                            class="peer block py-4 px-0 w-full text-brandLight bg-transparent border-0 border-b border-white/10 focus:outline-none focus:border-brandBlue transition-all placeholder-transparent text-xl md:text-2xl resize-none" 
                            placeholder=" "
                        ></textarea>
                        <label for="contact_message" class="absolute text-brandLight/20 duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 uppercase tracking-[0.3em] text-[10px] font-black peer-focus:text-brandBlue transition-all">
                           {$t('contact.label_message')}
                        </label>
                        {#if errors.message} 
                            <p transition:slide class="text-[9px] text-red-500 mt-2 font-bold uppercase tracking-wider">{errors.message}</p> 
                        {/if}
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        class="group relative w-full bg-brandLight text-brandDark font-black py-6 rounded-2xl overflow-hidden transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        <span class="relative z-10 uppercase tracking-[0.4em] text-[10px] group-hover:text-white transition-colors duration-500">
                            {isSubmitting ? $t('contact.btn_sending') : $t('contact.btn_send')}
                        </span>
                        <div class="absolute inset-0 bg-brandBlue translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[quintOut]"></div>
                    </button>
                </form>
            </div>
        {/if}
    </div>
</section>

<style>
    .text-stroke-white {
        -webkit-text-stroke: 1px rgba(240, 242, 245, 0.2);
        color: transparent;
    }
    .blue-glow {
        text-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
    }
    .glass-card {
        @apply bg-brandDeep/20 backdrop-blur-xl border border-white/5 shadow-2xl;
    }
    
    /* Uklanja defaultnu plavu crtu na mobitelima pri kliku */
    button {
        -webkit-tap-highlight-color: transparent;
    }
</style>