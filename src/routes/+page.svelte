<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    let { data } = $props();
    let loaded = $state(false);

    onMount(() => {
        loaded = true;
    });

    const services = [
        { 
            title: 'Nacionalni transport', 
            desc: 'Pouzdadn prijvoz osiguravamo i organiziramo mi i tako to....',
            icon: '🇭🇷' 
        },
        { 
            title: 'Međunarodne rute', 
            desc: 'Kompletna logistika i papirologija za siguran prijelaz granica EU.',
            icon: '🇪🇺' 
        },
        { 
            title: 'Specijalna njega', 
            desc: 'Individualni pristup svakome klijenut.',
            icon: '🐴' 
        }
    ];
</script>

<svelte:head>
    <title>{data.seo.title}</title>
    <meta name="description" content={data.seo.description} />
</svelte:head>

<section class="relative h-screen w-full overflow-hidden bg-gray-950">
    <div class="absolute inset-0">
        <img 
            src="/images/image00006.jpeg" 
            alt="Transport konja u pokretu" 
            class="w-full h-full object-cover transition-transform duration-[10000ms] {loaded ? 'scale-110' : 'scale-100'}"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-950"></div>
    </div>

    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {#if loaded}
            <span in:fly={{ y: 20, duration: 800 }} class="text-blue-400 font-black tracking-[0.3em] uppercase mb-6 text-sm">
                Vrhunski standardi transporta
            </span>
            
            <h1 in:fly={{ y: 30, duration: 1000, delay: 200 }} class="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase">
                HORSE<span class="text-blue-600 italic">MASTER</span>
            </h1>
            
            <p in:fade={{ duration: 1000, delay: 500 }} class="text-gray-300 text-lg md:text-2xl max-w-2xl mb-12 font-light leading-relaxed italic">
                "Jer oni nisu samo konji, oni su dio vaše obitelji."
            </p>
            
            <div in:fade={{ duration: 1000, delay: 800 }} class="flex flex-col sm:flex-row gap-6">
                <a href="/contact" class="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-2xl shadow-blue-500/40 uppercase tracking-widest text-sm">
                    Zatraži ponudu
                </a>
                <a href="/gallery" class="px-10 py-5 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md border border-white/20 font-black rounded-2xl uppercase tracking-widest text-sm">
                    Galerija
                </a>
            </div>
        {/if}
    </div>

    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30 hidden md:block">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
    </div>
</section>

<section class="py-20 bg-blue-600 text-white border-y border-white/10">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div class="space-y-2">
            <h3 class="text-5xl font-black italic">24/7</h3>
            <p class="text-blue-100 uppercase tracking-widest text-[10px] font-bold">Nadzor uživo</p>
        </div>
        <div class="space-y-2">
            <h3 class="text-5xl font-black italic">10k+</h3>
            <p class="text-blue-100 uppercase tracking-widest text-[10px] font-bold">Prijeđenih kilometara</p>
        </div>
        <div class="space-y-2">
            <h3 class="text-5xl font-black italic">100%</h3>
            <p class="text-blue-100 uppercase tracking-widest text-[10px] font-bold">Sigurna dostava</p>
        </div>
    </div>
</section>

<section class="py-24 bg-white overflow-hidden relative">
    <div class="max-w-7xl mx-auto px-4">
        <div class="mb-16 text-center md:text-left">
            <h2 class="text-4xl md:text-6xl font-black text-gray-900 leading-none uppercase tracking-tighter">
                Što nudimo <br><span class="text-blue-600 italic">vašim konjima</span>
            </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {#each services as service}
                <div class="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
                    <span class="text-5xl block mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</span>
                    <h3 class="text-xl font-black text-gray-900 mb-4 uppercase">{service.title}</h3>
                    <p class="text-gray-500 leading-relaxed font-medium">{service.desc}</p>
                </div>
            {/each}
        </div>
    </div>
</section>