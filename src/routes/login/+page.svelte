<script lang="ts">
    import { supabase } from '$lib/supabase';
    import { fade, fly , scale} from 'svelte/transition';
    import { goto } from '$app/navigation'

    let email = $state("");
    let password = $state("");
    let loading = $state(false);
    let errorMessage = $state("");
    let showPassword = $state(false);

    async function handleLogin(e: Event) {
        e.preventDefault(); // prevent refresh website
        loading = true;
        errorMessage = "";

        try {
            // supa base login auth
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                if (error.message.includes("Invalid login")) {
                    errorMessage = "Pogrešan email ili lozinka.";
                } else if (error.message.includes("Too many requests")) {
                    errorMessage = "Previše pokušaja. Pričekajte malo.";
                } else {
                    errorMessage = "Došlo je do greške. Pokušajte ponovno.";
                }
                loading = false;
            } else {
                // 'replaceState' da se korisnik ne može vratiti na login s 'Back' gumbom
                await goto('/admin', { replaceState: true });
            }
        } catch (err) {
            errorMessage = "Neočekivana greška sustava.";
            loading = false;
        }
    }

</script>

<svelte:head>
    <title>Prijava | Horse Master Admin</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center p-4 bg-gray-50/50">
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>

    <div 
        class="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-white/50 overflow-hidden backdrop-blur-sm"
        in:fly={{ y: 30, duration: 800, delay: 100 }}
    >
        <div class="bg-gray-900 p-10 text-center relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-40 h-40 bg-blue-600 rounded-full -mr-20 -mt-20 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000"></div>
            <div class="relative z-10 flex flex-col items-center">
                <div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/10 shadow-inner">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <h1 class="text-2xl font-black text-white tracking-tighter uppercase">
                    HORSE<span class="text-blue-500">MASTER</span>
                </h1>
                <p class="text-gray-400 text-[10px] mt-2 uppercase tracking-[0.3em] font-bold border-t border-gray-800 pt-2 w-full max-w-[120px]">Admin Panel</p>
            </div>
        </div>

        <div class="p-8 sm:p-10">
            {#if errorMessage}
                <div in:scale class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-red-600 text-xs font-bold shadow-sm flex items-center gap-3">
                    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    {errorMessage}
                </div>
            {/if}

            <form onsubmit={handleLogin} class="space-y-6">
                <div class="space-y-2 group">
                    <label for="login_email" class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-blue-600 transition-colors">Email Adresa</label>
                    <div class="relative">
                        <input 
                            id="login_email"
                            type="email" 
                            bind:value={email} 
                            required 
                            placeholder="vaš@email.com"
                            class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 pl-12 text-sm font-medium text-gray-900 outline-none focus:border-blue-600 focus:bg-white focus:shadow-lg focus:shadow-blue-100 transition-all duration-300 placeholder:text-gray-300"
                        />
                        <svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                    </div>
                </div>

                <div class="space-y-2 group">
                    <label for="login_pass" class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-blue-600 transition-colors">Lozinka</label>
                    <div class="relative">
                        <input 
                            id="login_pass"
                            type={showPassword ? "text" : "password"} 
                            bind:value={password} 
                            required 
                            placeholder="••••••••"
                            class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 pl-12 pr-12 text-sm font-medium text-gray-900 outline-none focus:border-blue-600 focus:bg-white focus:shadow-lg focus:shadow-blue-100 transition-all duration-300 placeholder:text-gray-300"
                        />
                        <svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        
                        <button 
                            type="button"
                            onclick={() => showPassword = !showPassword}
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-md transition-colors"
                            aria-label={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
                        >
                            {#if showPassword}
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                            {:else}
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                            {/if}
                        </button>
                    </div>
                </div>

                <div class="pt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        class="group relative w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-600/30 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                    >
                        <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span class="relative flex items-center justify-center uppercase tracking-widest text-xs">
                            {#if loading}
                                <svg class="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Provjera...
                            {:else}
                                Prijavi se
                            {/if}
                        </span>
                    </button>
                </div>
            </form>

            <div class="mt-8 text-center">
                <a href="/" class="text-[10px] font-black text-gray-300 hover:text-blue-600 transition-colors uppercase tracking-[0.2em] flex items-center justify-center gap-2 group">
                    <span class="group-hover:-translate-x-1 transition-transform">←</span> Povratak na početnu
                </a>
            </div>
        </div>
    </div>
</div>