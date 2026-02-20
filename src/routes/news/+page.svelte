<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import SEO from '$lib/components/SEO.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    interface NewsPost {
        id: string;
        title: string;
        content: string;
        image_url: string | null;
        created_at: string;
    }

    let selectedNews = $state<NewsPost | null>(null);

    const openNews = (post: NewsPost) => (selectedNews = post);
    const closeNews = () => (selectedNews = null);

    function reveal(node: HTMLElement, delay = 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => node.classList.add('is-visible'), delay);
                    observer.unobserve(node);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(node);
        return { destroy: () => observer.disconnect() };
    }
</script>

<SEO title={data.seo.title} description={data.seo.description} />

<svelte:window onkeydown={(e) => e.key === 'Escape' && selectedNews && closeNews()} />

<section class="py-32 bg-brandDark min-h-screen relative z-10 text-brandLight">
    <div class="max-w-[1400px] mx-auto px-6">
        
        <div class="mb-20 text-center reveal-init" use:reveal>
            <span class="text-brandBlue font-mono text-xs uppercase tracking-[0.5em] block mb-4">Arhiva</span>
            <h1 class="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
                Sve <span class="text-transparent text-stroke-white">Novosti</span>
            </h1>
        </div>

        {#if data.news.length > 0}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                {#each data.news as post, i}
                    <button type="button" class="reveal-init w-full text-left bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/5 group hover:border-brandBlue/30 hover:-translate-y-2 active:scale-95 transition-all duration-700 cursor-pointer flex flex-col will-change-transform" use:reveal={i * 50} onclick={() => openNews(post)} aria-label={`Otvori vijest: ${post.title}`}>
                        {#if post.image_url}
                            <div class="h-64 w-full overflow-hidden">
                                <img src={post.image_url} alt="" loading="lazy" decoding="async" class="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                            </div>
                        {/if}
                        <div class="p-10 flex-grow flex flex-col">
                            <span class="block text-[10px] font-black text-brandBlue uppercase tracking-widest mb-4">{new Date(post.created_at).toLocaleDateString("hr-HR")}</span>
                            <h3 class="text-xl font-black uppercase leading-tight text-brandLight mb-6 line-clamp-2">{post.title}</h3>
                            <div class="mt-auto flex items-center text-[10px] font-black uppercase tracking-widest text-brandLight/30 group-hover:text-brandBlue transition-colors"><span>Pročitaj sve</span><svg class="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></div>
                        </div>
                    </button>
                {/each}
            </div>
        {:else}
            <div class="py-32 flex flex-col items-center justify-center border border-white/5 rounded-[3rem] bg-brandDeep/10 reveal-init" use:reveal>
                <svg class="w-12 h-12 text-brandLight/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L18.5 7H20"/></svg>
                <p class="text-brandLight/40 uppercase tracking-widest font-black text-sm">Arhiva je trenutno prazna</p>
            </div>
        {/if}
    </div>
</section>

{#if selectedNews}
    <div class="fixed inset-0 z-[150] bg-brandDark/98 backdrop-blur-md flex items-center justify-center p-4 md:p-12" transition:fade={{ duration: 300 }} role="dialog">
        <button class="absolute inset-0 cursor-zoom-out appearance-none bg-transparent border-none w-full h-full" onclick={closeNews} aria-label="Zatvori modal klikom u pozadinu"></button>
        <div class="relative bg-brandDeep/40 w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto rounded-[3rem] border border-white/5 shadow-2xl no-scrollbar" in:fly={{ y: 50, duration: 600, easing: quintOut }}>
            <div class="sticky top-6 right-6 z-30 flex justify-end px-6 pointer-events-none">
                 <button onclick={closeNews} class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-white hover:text-brandDark transition-all pointer-events-auto border-none" aria-label="Zatvori"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
            </div>
            {#if selectedNews.image_url}
                <div class="h-[40vh] md:h-[50vh] w-full relative shrink-0">
                     <img src={selectedNews.image_url} alt="" class="w-full h-full object-cover" />
                     <div class="absolute inset-0 bg-gradient-to-t from-brandDark to-transparent"></div>
                </div>
            {/if}
            <div class="p-10 md:p-16 relative z-10">
                <span class="text-brandBlue font-black text-[10px] uppercase tracking-[0.5em] block mb-6">Novosti</span>
                <h2 class="text-4xl md:text-6xl font-black text-white mb-10 leading-none uppercase italic">{selectedNews.title}</h2>
                <div class="prose prose-invert prose-xl text-brandLight/60 max-w-none">{@html selectedNews.content}</div>
            </div>
        </div>
    </div>
{/if}

<style>
    .text-stroke-white { -webkit-text-stroke: 1px rgba(240, 242, 245, 0.2); color: transparent; }
    .reveal-init { opacity: 0; transform: translateY(40px); transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
    :global(.reveal-init.is-visible) { opacity: 1; transform: translateY(0); }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    :global(body:has([role="dialog"])) { overflow: hidden; }
</style>