<script lang="ts">
    import { supabase } from '$lib/supabase';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let loading = false;
    let errorMessage = '';

    async function handleLogin() {
        loading = true;
        errorMessage = '';

        // Pokušaj prijave preko Supabase Auth sustava
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            errorMessage = 'Pogrešan email ili lozinka.';
            loading = false;
        } else {
            // Ako je sve u redu, šaljemo ga na /admin
            goto('/admin');
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Horse Master</h1>
            <p class="text-gray-500 mt-2">Prijava za admina</p>
        </div>
        
        <form on:submit|preventDefault={handleLogin} class="space-y-6">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email adresa</label>
                <input 
                    id="email"
                    type="email" 
                    bind:value={email} 
                    required 
                    class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>
            
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Lozinka</label>
                <input 
                    id="password"
                    type="password" 
                    bind:value={password} 
                    required 
                    class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>

            {#if errorMessage}
                <div class="text-red-600 text-sm text-center font-medium">
                    {errorMessage}
                </div>
            {/if}

            <button 
                type="submit" 
                disabled={loading} 
                class="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
                {loading ? 'Provjera...' : 'Ulogiraj se'}
            </button>
        </form>
    </div>
</div>