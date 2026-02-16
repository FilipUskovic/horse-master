<script lang="ts">
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
</script>

<svelte:head>
    <title>Stranica nije pronađena | Horse Master</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="text-center max-w-2xl">
        <h1 class="text-9xl font-black text-gray-900 tracking-tighter">404</h1>
        <h2 class="text-4xl font-black text-gray-900 mt-4 uppercase">Stranica nije pronađena</h2>
        <p class="text-gray-500 text-lg mt-4 mb-8">
            Nažalost, stranica koju tražite ne postoji ili je premještena.
        </p>
        <button 
            onclick={() => goto('/')}
            class="bg-blue-600 text-white font-black px-10 py-5 rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition uppercase tracking-widest text-sm"
        >
            Povratak na početnu
        </button>
    </div>
</div>