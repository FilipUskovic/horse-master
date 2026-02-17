<script lang="ts">
    import { PUBLIC_WEB3FORMS_ACCESS_KEY } from '$env/static/public';
    import { fade, scale, slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    // Svelte 5 Runes
    let name = $state("");
    let email = $state("");
    let message = $state("");
    let botcheck = $state(false); // HONEYPOT ZASTITA
    
    let isSubmitting = $state(false);
    let isSuccess = $state(false);
    let statusMessage = $state("");
    let errors = $state({ name: "", email: "", message: "" });

    async function handleSubmit(e: Event) {
        e.preventDefault();
        
        //  securtiy check for bot spams
        if (botcheck) {
            console.log("Bot detektiran. Prekidam.");
            return;
        }

        isSubmitting = true;
        statusMessage = "";
        errors = { name: "", email: "", message: "" };

        //  validations
        if (name.trim().length < 2) errors.name = "Ime mora imati barem 2 slova.";
        if (!email.includes('@') || !email.includes('.')) errors.email = "Unesite valjanu email adresu.";
        if (message.trim().length < 10) errors.message = "Poruka je prekratka (min. 10 znakova).";

        if (errors.name || errors.email || errors.message) {
            isSubmitting = false;
            statusMessage = "Molimo ispravite označena polja.";
            return;
        }

        // sent via web3forms is client 
        // i need send in like static because of web3forms 
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    Accept: "application/json" 
                },
                body: JSON.stringify({
                    access_key: PUBLIC_WEB3FORMS_ACCESS_KEY,
                    name,
                    email,
                    message,
                    from_name: "Horse Master Web",
                    subject: `Upit: ${name}`,
                    botcheck: botcheck // bot zastita 
                })
            });

            const result = await response.json();

            if (result.success) {
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

<svelte:head><title>Kontakt | Horse Master</title></svelte:head>

<section class="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
    <div class="max-w-xl w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/50">
        <div class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

        {#if isSuccess}
            <div in:scale={{ duration: 600, easing: quintOut, start: 0.8 }} class="text-center py-10 relative z-10">
                <div class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6 animate-bounce">
                    <svg class="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Primljeno!</h2>
                <p class="text-gray-500 mt-2">Hvala, {name}. Odgovorit ćemo uskoro.</p>
                <button onclick={() => isSuccess = false} class="inline-block mt-8 text-blue-600 font-bold hover:underline cursor-pointer bg-transparent border-none">Pošalji novu poruku</button>
            </div>
        {:else}
            <div class="relative z-10" in:fade>
                <div class="text-center mb-10">
                    <h2 class="text-3xl font-black text-gray-900 tracking-tight uppercase">Pošaljite upit</h2>
                </div>

                <form onsubmit={handleSubmit} class="space-y-8">
                    {#if statusMessage}
                        <div transition:slide class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold text-center italic">{statusMessage}</div>
                    {/if}
                    
                    <input type="checkbox" name="botcheck" class="hidden" style="display: none;" bind:checked={botcheck}>

                    <div class="relative group">
                        <input type="text" id="contact_name" bind:value={name} class="block py-4 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 peer transition-colors placeholder-transparent" placeholder="Ime" />
                        <label for="contact_name" class="absolute text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest text-xs font-bold peer-focus:text-blue-600">Ime i Prezime</label>
                        {#if errors.name} <p transition:slide class="text-xs text-red-500 mt-2 font-bold">⚠️ {errors.name}</p> {/if}
                    </div>

                    <div class="relative group">
                        <input type="email" id="contact_email" bind:value={email} class="block py-4 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 peer transition-colors placeholder-transparent" placeholder="Email" />
                        <label for="contact_email" class="absolute text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest text-xs font-bold peer-focus:text-blue-600">Email Adresa</label>
                        {#if errors.email} <p transition:slide class="text-xs text-red-500 mt-2 font-bold">⚠️ {errors.email}</p> {/if}
                    </div>

                    <div class="relative group">
                        <textarea id="contact_message" rows="4" bind:value={message} class="block py-4 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 peer transition-colors resize-none placeholder-transparent" placeholder="Poruka"></textarea>
                        <label for="contact_message" class="absolute text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest text-xs font-bold peer-focus:text-blue-600">Vaša Poruka</label>
                        {#if errors.message} <p transition:slide class="text-xs text-red-500 mt-2 font-bold">⚠️ {errors.message}</p> {/if}
                    </div>

                    <button type="submit" disabled={isSubmitting} class="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50">
                        {isSubmitting ? 'Slanje...' : 'Pošalji Upit'}
                    </button>
                </form>
            </div>
        {/if}
    </div>
</section>