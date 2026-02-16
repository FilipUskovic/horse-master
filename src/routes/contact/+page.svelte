<script lang="ts">
    // 1. Koristimo JAVNI ključ (onaj s PUBLIC_ prefiksom)
    import { PUBLIC_WEB3FORMS_ACCESS_KEY } from '$env/static/public';

    let isSubmitting = false;
    let isSuccess = false;
    let errorMessage = "";

    async function handleSubmit(event: Event) {
        event.preventDefault();
        isSubmitting = true;
        errorMessage = "";

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        
        // Dodajemo ključ u podatke
        formData.append("access_key", PUBLIC_WEB3FORMS_ACCESS_KEY);

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            // Šaljemo DIREKTNO iz preglednika (browsera)
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            });

            const result = await response.json();

            if (result.success) {
                isSuccess = true;
                form.reset();
            } else {
                errorMessage = result.message || "Nešto nije u redu s ključem ili domenom.";
            }
        } catch (e) {
            errorMessage = "Greška u povezivanju. Provjeri internet.";
        } finally {
            isSubmitting = false;
        }
    }
</script>

<svelte:head>
    <title>Kontakt | Horse Master</title>
</svelte:head>

<section class="bg-white py-16">
    <div class="max-w-7xl mx-auto px-4">
        
        {#if isSuccess}
            <div class="max-w-md mx-auto text-center py-20 bg-gray-50 rounded-2xl border border-green-100">
                <div class="h-16 w-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900">Uspješno poslano!</h2>
                <p class="text-gray-600 mt-2">Hvala vam na javljanju.</p>
                <button on:click={() => isSuccess = false} class="mt-6 text-blue-600 font-bold hover:underline">Pošalji novu poruku</button>
            </div>
        {:else}
            <div class="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <form on:submit={handleSubmit} class="space-y-6">
                    <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Kontaktirajte nas</h2>
                    
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Ime i prezime</label>
                        <input type="text" name="name" id="name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Vaš Email</label>
                        <input type="email" name="email" id="email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
                    </div>

                    <div>
                        <label for="message" class="block text-sm font-medium text-gray-700">Vaša poruka</label>
                        <textarea name="message" id="message" rows="4" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border bg-gray-50 focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>

                    {#if errorMessage}
                        <div class="p-3 bg-red-50 text-red-600 rounded-md text-sm text-center font-bold">
                            {errorMessage}
                        </div>
                    {/if}

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        class="w-full py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all transform active:scale-95 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Slanje...' : 'Pošalji poruku'}
                    </button>
                </form>
            </div>
        {/if}

    </div>
</section>