<script lang="ts">
    import { supabase } from '$lib/supabase';
    import { fade, fly } from 'svelte/transition';

    let email = $state("");
    let password = $state("");
    let loading = $state(false);
    let errorMessage = $state("");

    async function handleLogin(e: Event) {
        e.preventDefault();
        loading = true;
        errorMessage = "";

        // try via supabase -a auth system
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            errorMessage = "Pristup odbijen. Provjerite podatke.";
            loading = false;
        } else {
            // redirecf if success
            window.location.href = '/admin';
        }
    }
</script>

<svelte:head>
    <title>Prijava | Horse Master Admin</title>
</svelte:head>

<div class="min-h-[80vh] flex items-center justify-center p-4">
    <div 
        class="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden"
        in:fly={{ y: 20, duration: 800 }}
    >
        <div class="bg-gray-900 p-10 text-center relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full -mr-16 -mt-16 blur-3xl opacity-20"></div>
            <h1 class="text-2xl font-black text-white tracking-tighter uppercase relative z-10">
                ADMIN<span class="text-blue-500">LOGIN</span>
            </h1>
            <p class="text-gray-400 text-xs mt-2 uppercase tracking-widest font-bold">Horse Master Management</p>
        </div>

        <div class="p-10">
            {#if errorMessage}
                <div transition:fade class="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold text-center italic">
                    {errorMessage}
                </div>
            {/if}

            <form onsubmit={handleLogin} class="space-y-6">
                <div class="space-y-2">
                    <label for="login_email" class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email Adresa</label>
                    <input 
                        id="login_email"
                        type="email" 
                        bind:value={email} 
                        required 
                        placeholder="admin@horsemaster.hr"
                        class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                </div>

                <div class="space-y-2">
                    <label for="login_pass" class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Lozinka</label>
                    <input 
                        id="login_pass"
                        type="password" 
                        bind:value={password} 
                        required 
                        placeholder="••••••••"
                        class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                </div>

                <div class="pt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        class="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 uppercase tracking-widest text-sm"
                    >
                        {#if loading}
                            <span class="flex items-center justify-center">
                                <svg class="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Provjera...
                            </span>
                        {:else}
                            Prijavi se
                        {/if}
                    </button>
                </div>
            </form>

            <div class="mt-8 text-center">
                <a href="/" class="text-[10px] font-black text-gray-300 hover:text-blue-600 transition uppercase tracking-[0.2em]">
                    ← Povratak na početnu
                </a>
            </div>
        </div>
    </div>
</div>