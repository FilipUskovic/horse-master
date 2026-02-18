<script lang="ts">
    import { supabase } from '$lib/supabase';
    import { fade, fly, scale } from 'svelte/transition'; 
    import { quintOut } from 'svelte/easing';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    // Svelte 5 Runes 
    let email = $state("");
    let password = $state("");
    let loading = $state(false);
    let errorMessage = $state("");
    let showPassword = $state(false);
    let loaded = $state(false);

    onMount(() => {
        loaded = true;
    });

    async function handleLogin(e: Event) {
        e.preventDefault(); 
        loading = true;
        errorMessage = "";

        try {
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
                await goto('/admin', { replaceState: true });
            }
        } catch (err) {
            errorMessage = "Neočekivana greška sustava.";
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>Prijava | HorseMaster Admin</title>
</svelte:head>

{#if loaded}
    <div in:fade={{ duration: 1000 }} class="fixed inset-0 pointer-events-none z-0">
        <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brandBlue/5 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brandDeep/20 blur-[120px] rounded-full"></div>
    </div>

    <div in:fade={{ duration: 2000 }} class="fixed inset-0 pointer-events-none z-[900] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
{/if}

<div class="min-h-screen flex items-center justify-center p-6 bg-brandDark relative z-10">
    
    <div 
        class="max-w-md w-full glass-card rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/50"
        in:fly={{ y: 30, duration: 1000, easing: quintOut }}
    >
        <div class="bg-brandDark/40 p-10 text-center relative border-b border-white/5">
            <div class="relative z-10 flex flex-col items-center">
                <div class="w-14 h-14 bg-brandBlue/10 rounded-2xl flex items-center justify-center mb-6 border border-brandBlue/20 shadow-lg">
                    <svg class="w-7 h-7 text-brandBlue blue-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <h1 class="text-3xl font-black text-brandLight tracking-tighter uppercase italic">
                    HORSE<span class="text-brandBlue blue-glow">MASTER</span>
                </h1>
                <p class="text-brandLight/20 text-[9px] mt-4 uppercase tracking-[0.4em] font-black border-t border-white/5 pt-4 w-24 mx-auto">Admin</p>
            </div>
        </div>

        <div class="p-8 sm:p-12">
            {#if errorMessage}
                <div in:scale={{ duration: 400, easing: quintOut }} class="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 italic">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    {errorMessage}
                </div>
            {/if}

            <form onsubmit={handleLogin} class="space-y-10">
                <div class="space-y-3 group text-left">
                    <label for="login_email" class="block text-[10px] font-black text-brandLight/30 uppercase tracking-[0.3em] ml-1 group-focus-within:text-brandBlue transition-colors">Identitet</label>
                    <div class="relative">
                        <input 
                            id="login_email"
                            type="email" 
                            bind:value={email} 
                            required 
                            placeholder="vaš@email.com"
                            class="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-14 text-sm font-medium text-brandLight outline-none focus:border-brandBlue focus:bg-white/[0.08] transition-all duration-300 placeholder:text-white/10"
                        />
                        <svg class="w-5 h-5 text-white/20 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-brandBlue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                    </div>
                </div>

                <div class="space-y-3 group text-left">
                    <label for="login_pass" class="block text-[10px] font-black text-brandLight/30 uppercase tracking-[0.3em] ml-1 group-focus-within:text-brandBlue transition-colors">Lozinka</label>
                    <div class="relative">
                        <input 
                            id="login_pass"
                            type={showPassword ? "text" : "password"} 
                            bind:value={password} 
                            required 
                            placeholder="••••••••"
                            class="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-14 pr-14 text-sm font-medium text-brandLight outline-none focus:border-brandBlue focus:bg-white/[0.08] transition-all duration-300 placeholder:text-white/10"
                        />
                        <svg class="w-5 h-5 text-white/20 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-brandBlue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        
                        <button 
                            type="button"
                            onclick={() => showPassword = !showPassword}
                            class="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-brandBlue focus:outline-none p-1 transition-colors"
                            aria-label={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
                        >
                            {#if showPassword}
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                            {:else}
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                            {/if}
                        </button>
                    </div>
                </div>

                <div class="pt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        class="group relative w-full bg-brandLight text-brandDark font-black py-6 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
                    >
                        <div class="absolute inset-0 bg-brandBlue translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[quintOut]"></div>
                        <span class="relative z-10 flex items-center justify-center uppercase tracking-[0.4em] text-[10px]">
                            {#if loading}
                                <svg class="animate-spin h-4 w-4 mr-3" viewBox="0 0 24 24" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Autorizacija...
                            {:else}
                                Pristupi panelu
                            {/if}
                        </span>
                    </button>
                </div>
            </form>

            <div class="mt-12 text-center">
                <a href="/" class="text-[9px] font-black text-white/20 hover:text-brandBlue transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-2 group">
                    <span class="group-hover:-translate-x-1 transition-transform">←</span> Početna
                </a>
            </div>
        </div>
    </div>
</div>

<style>
    .blue-glow {
        text-shadow: 0 0 15px rgba(37, 99, 235, 0.5);
    }

    .glass-card {
        @apply bg-brandDeep/20 backdrop-blur-xl border border-white/5;
    }

    input:-webkit-autofill {
        -webkit-text-fill-color: #f0f2f5;
        -webkit-box-shadow: 0 0 0px 1000px #0a192f inset;
    }
</style>