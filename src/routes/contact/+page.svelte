<script lang="ts">
    import { PUBLIC_WEB3FORMS_ACCESS_KEY } from '$env/static/public';
    import { fade, scale, slide, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

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
        if (name.trim().length < 2) errors.name = "Ime mora imati barem 2 slova.";
        if (!email.includes('@') || !email.includes('.')) errors.email = "Unesite valjanu email adresu.";
        if (message.trim().length < 10) errors.message = "Poruka je prekratka.";

        if (errors.name || errors.email || errors.message) {
            isSubmitting = false;
            statusMessage = "Molimo ispravite označena polja.";
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
                    subject: `Novi Upit: ${name}`,
                    botcheck: botcheck 
                })
            });

            const result = await response.json();

            if (result.success) {
                submittedName = name; 
                isSuccess = true;
                name = ""; email = ""; message = ""; 
            } else {
                statusMessage = result.message || "Slanje nije uspjelo.";
            }
        } catch (err) {
            statusMessage = "Mrežna greška. Provjerite vezu.";
        } finally {
            isSubmitting = false;
        }
    }
</script>

<svelte:head><title>Kontakt | HorseMaster Prestige</title></svelte:head>

<div class="fixed inset-0 pointer-events-none z-0">
    <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brandBlue/5 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brandDeep/20 blur-[120px] rounded-full"></div>
</div>

<div class="fixed inset-0 pointer-events-none z-[900] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

<section class="min-h-screen bg-brandDark py-24 px-6 flex items-center justify-center relative z-10">
    
    <div class="max-w-xl w-full glass-card p-10 md:p-14 rounded-[3rem] relative overflow-hidden border border-white/5 shadow-2xl">
        
        {#if isSuccess}
            <div in:fly={{ y: 20, duration: 800, easing: quintOut }} class="text-center py-10 relative z-10">
                <div class="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-brandBlue/10 border border-brandBlue/20 mb-8">
                    <svg class="h-10 w-10 text-brandBlue blue-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h2 class="text-4xl font-black text-brandLight tracking-tighter uppercase italic">Poslano!</h2>
                <p class="text-brandLight/40 mt-4 text-lg font-light">
                    Hvala vam, <span class="text-brandBlue font-bold">{submittedName}</span>. <br> Javit ćemo se uskoro.
                </p>
                <button 
                    onclick={() => isSuccess = false} 
                    class="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-brandBlue hover:text-brandLight transition-colors cursor-pointer"
                >
                    &larr; Pošalji novu poruku
                </button>
            </div>
        {:else}
            <div class="relative z-10" in:fade>
                <div class="mb-14">
                    <span class="text-brandBlue font-mono text-[10px] uppercase tracking-[0.5em] block mb-4">Upit</span>
                    <h2 class="text-5xl font-black text-brandLight tracking-tighter uppercase italic leading-none">
                        Budite na <br> <span class="text-transparent text-stroke-white blue-glow">Konju.</span>
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
                            placeholder="Ime" 
                        />
                        <label for="contact_name" class="absolute text-brandLight/20 duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 uppercase tracking-[0.3em] text-[10px] font-black peer-focus:text-brandBlue transition-all">
                            Ime i Prezime
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
                            placeholder="Email" 
                        />
                        <label for="contact_email" class="absolute text-brandLight/20 duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 uppercase tracking-[0.3em] text-[10px] font-black peer-focus:text-brandBlue transition-all">
                            Email Adresa
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
                            placeholder="Poruka"
                        ></textarea>
                        <label for="contact_message" class="absolute text-brandLight/20 duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 uppercase tracking-[0.3em] text-[10px] font-black peer-focus:text-brandBlue transition-all">
                            Detalji Upita
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
                        <span class="relative z-10 uppercase tracking-[0.4em] text-[10px]">
                            {isSubmitting ? 'Slanje...' : 'Pošalji Upit'}
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
</style>