<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { quintOut } from 'svelte/easing';
    import SEO from '$lib/components/SEO.svelte'

    let { data } = $props();
    
    let loaded = $state(false);
    let selectedNews = $state<any | null>(null);

    const openNews = (post: any) => (selectedNews = post);
    const closeNews = () => (selectedNews = null);

    onMount(() => {
        // Instant load state za sliku
        loaded = true;
    });

    const services = [
        { 
            title: 'Konji u filmu', 
            desc: 'Profesionalna priprema za filmske setove i povijesne spektakle.',
            icon: '🎬' 
        },
        { 
            title: 'Konji za spotove', 
            desc: 'Jedinstvena estetika i koreografija za glazbene produkcije.',
            icon: '🎵' 
        },
        { 
            title: 'Konji za fotografiranje', 
            desc: 'Elegancija za modne editorijale, vjenčanja i privatne sessione.',
            icon: '📸' 
        },
        { 
            title: 'Šetnje na konjima', 
            desc: 'Vođene terenske šetnje prirodom prilagođene vašem iskustvu.',
            icon: '🌲' 
        }
    ];

    function reveal(node: HTMLElement, delay = 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => node.classList.add('is-visible'), delay);
                    observer.unobserve(node);
                }
            });
        }, { threshold: 0.05 });
        observer.observe(node);
        return { destroy: () => observer.disconnect() };
    }
</script>

<SEO 
    title={data.seo?.title || "Početna - HorseMaster Prestige"} 
    description={data.seo?.description || "Vrhunske usluge s konjima za filmove, spotove i vjenčanja."}
    image="/images/Prva.PNG"
/>

<section class="relative h-[100svh] w-full overflow-hidden bg-black flex flex-col justify-center">
    
    <div class="absolute inset-0 z-0 flex items-center justify-center pt-20 md:pt-0">
        <img 
            src="/images/Prva.PNG" 
            width="1920" height="1280"
            alt="HorseMaster Hero"
            fetchpriority="high" 
            class="w-full h-full md:h-[90%] object-contain object-center transition-transform duration-[20s] ease-linear scale-100 hover:scale-105 will-change-transform"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
    </div>

    <div class="relative z-10 flex flex-col items-center justify-end h-full pb-24 md:pb-16 pointer-events-none">
        {#if loaded}
            <h1 in:fly={{ y: 50, duration: 1000, easing: quintOut }} class="text-6xl md:text-[8rem] font-black text-white mb-6 tracking-tighter uppercase leading-[0.8] drop-shadow-2xl mix-blend-overlay opacity-80">
                HORSE<span class="text-transparent text-stroke-white">MASTER</span>
            </h1>
            
            <div in:fade={{ duration: 800, delay: 500 }} class="flex gap-4 pointer-events-auto">
                <a href="/contact" class="px-8 py-4 bg-blue-600 text-white font-black rounded-full shadow-[0_0_30px_rgba(37,99,235,0.6)] uppercase tracking-widest text-[10px] md:text-xs hover:scale-110 hover:bg-blue-500 transition-all">
                    Zatraži ponudu
                </a>
                <a href="/gallery" class="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-full uppercase tracking-widest text-[10px] md:text-xs hover:bg-white hover:text-black transition-all">
                    Galerija
                </a>
            </div>
        {/if}
    </div>
</section>

<section class="py-16 bg-black text-white border-y border-white/10 relative z-20">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div><h3 class="text-4xl font-black italic">10+</h3><p class="text-blue-500 text-[10px] font-bold uppercase tracking-widest mt-1">Godina</p></div>
        <div><h3 class="text-4xl font-black italic">HNK</h3><p class="text-blue-500 text-[10px] font-bold uppercase tracking-widest mt-1">Partner</p></div>
        <div><h3 class="text-4xl font-black italic">100%</h3><p class="text-blue-500 text-[10px] font-bold uppercase tracking-widest mt-1">Sigurnost</p></div>
        <div><h3 class="text-4xl font-black italic">HRT</h3><p class="text-blue-500 text-[10px] font-bold uppercase tracking-widest mt-1">Produkcija</p></div>
    </div>
</section>

<section class="py-24 bg-black text-white">
    <div class="max-w-7xl mx-auto px-6">
        <div class="mb-16 text-center reveal-init" use:reveal>
            <h2 class="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
                Naše <span class="text-blue-600">Usluge</span>
            </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each services as service, i}
                <div 
                    class="group relative p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-[#050505] hover:border-blue-600 transition-all duration-500 reveal-init overflow-hidden cursor-default"
                    use:reveal={i * 100}
                >
                    <span class="absolute -right-6 -top-6 text-[10rem] opacity-[0.03] group-hover:opacity-[0.1] group-hover:rotate-12 transition-all duration-700 select-none grayscale">
                        {service.icon}
                    </span>

                    <div class="relative z-10 flex flex-col h-full">
                        <span class="text-5xl mb-6 block w-max transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6 group-hover:drop-shadow-[0_0_15px_rgba(37,99,235,0.8)]">
                            {service.icon}
                        </span>
                        
                        <h3 class="text-2xl font-black uppercase tracking-tight mb-3 group-hover:text-blue-500 transition-colors">
                            {service.title}
                        </h3>
                        
                        <p class="text-gray-400 text-sm leading-relaxed max-w-sm group-hover:text-gray-200 transition-colors">
                            {service.desc}
                        </p>
                        
                        <div class="mt-auto pt-8">
                            <div class="h-1 w-12 bg-white/20 group-hover:w-full group-hover:bg-blue-600 transition-all duration-500 ease-out"></div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

{#if data.news && data.news.length > 0}
    <section class="py-24 bg-black border-t border-white/10">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex items-end justify-between mb-16">
                <h2 class="text-3xl font-black uppercase tracking-tighter text-white italic">Aktualno</h2>
                <a href="/gallery" class="text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-white transition-colors">Arhiva -></a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                {#each data.news as post, i}
                    <button 
                        type="button"
                        class="reveal-init w-full text-left bg-[#080808] rounded-3xl overflow-hidden border border-white/5 group hover:border-blue-600/40 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col shadow-lg"
                        use:reveal={i * 150}
                        onclick={() => openNews(post)}
                        aria-label={`Pročitaj: ${post.title}`}
                    >
                        {#if post.image_url}
                            <div class="h-56 w-full overflow-hidden">
                                <img src={post.image_url} alt="" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        {/if}
                        <div class="p-8 flex-grow flex flex-col">
                            <span class="block text-[9px] font-black text-blue-600 uppercase tracking-widest mb-3">{new Date(post.created_at).toLocaleDateString('hr-HR')}</span>
                            <h3 class="text-lg font-black uppercase leading-tight text-white mb-4 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                {post.title}
                            </h3>
                            <div class="mt-auto flex items-center text-[9px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                                <span>Pročitaj</span>
                                <svg class="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </div>
                    </button>
                {/each}
            </div>
        </div>
    </section>
{/if}

{#if selectedNews}
    <div 
        class="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex items-end md:items-center justify-center p-0 md:p-6"
        transition:fade={{ duration: 200 }}
        role="dialog"
        aria-modal="true"
    >
        <button class="absolute inset-0 w-full h-full cursor-default appearance-none bg-transparent border-none" onclick={closeNews} aria-label="Zatvori"></button>

        <div 
            class="relative bg-[#050505] w-full max-w-3xl h-[85vh] md:h-auto md:max-h-[90vh] overflow-y-auto rounded-t-[2.5rem] md:rounded-[3rem] border border-white/10 shadow-2xl flex flex-col"
            in:fly={{ y: 100, duration: 400, easing: quintOut }}
        >
            <div class="absolute top-6 right-6 z-30">
                 <button onclick={closeNews} class="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-white hover:text-black transition-all" aria-label="Zatvori">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
            
            {#if selectedNews.image_url}
                <div class="h-64 md:h-96 w-full relative shrink-0">
                     <img src={selectedNews.image_url} alt="" class="w-full h-full object-cover" />
                     <div class="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                </div>
            {/if}

            <div class="p-8 md:p-12 relative z-10">
                <span class="text-blue-600 font-black text-[10px] uppercase tracking-widest block mb-4">Novost</span>
                <h2 class="text-3xl md:text-5xl font-black text-white mb-8 leading-tight uppercase italic">{selectedNews.title}</h2>
                <div class="prose prose-invert prose-lg text-gray-300 max-w-none">
                    {@html selectedNews.content}
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .text-stroke-white {
        -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
    }

    :global(.reveal-init) {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    }
    :global(.reveal-init.is-visible) {
        opacity: 1;
        transform: translateY(0);
    }

    :global(body:has([role="dialog"])) {
        overflow: hidden;
    }

    button, a { -webkit-tap-highlight-color: transparent; }
</style>