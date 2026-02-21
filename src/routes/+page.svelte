<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import SEO from "$lib/components/SEO.svelte";
  import type { PageData } from "./$types";
  import { t, locale } from "svelte-i18n";

  let { data }: { data: PageData } = $props();
  let loaded = $state(false);

  interface NewsPost {
    id: string;
    title: string;
    title_en?: string;
    content: string;
    content_en?: string;
    image_url: string | null;
    created_at: string;
  }

  interface Service {
    id: string;
    title: string;
    title_en: string;
    desc: string;
    desc_en: string;
    icon: string;
  }

  let selectedNews = $state<NewsPost | null>(null);

  const openNews = (post: NewsPost) => (selectedNews = post);
  const closeNews = () => (selectedNews = null);

  onMount(() => {
    loaded = true;
  });

  const services: Service[] = [
    {
      id: "film",
      title: "Konji u filmu",
      title_en: "Horses in Film",
      desc: "Profesionalna priprema za filmske setove.",
      desc_en: "Professional preparation for film sets.",
      icon: "🎬",
    },
    {
      id: "spotovi",
      title: "Konji za spotove i reklame",
      title_en: "Horses for Ads & Videos",
      desc: "Jedinstvena estetika i koreografija.",
      desc_en: "Unique aesthetics and choreography.",
      icon: "🎵",
    },
    {
      id: "fotografiranje",
      title: "Konji za fotografiranje",
      title_en: "Horses for Photoshoots",
      desc: "Elegancija za modne editorijale.",
      desc_en: "Elegance for fashion editorials.",
      icon: "📸",
    },
    {
      id: "setnje",
      title: "Šetnje na konjima",
      title_en: "Horseback Rides",
      desc: "Vođene terenske šetnje prirodom.",
      desc_en: "Guided nature trail rides.",
      icon: "🌲",
    },
    {
      id: "prijevoz",
      title: "Prijevoz konja",
      title_en: "Horse Transport",
      desc: "Siguran i profesionalan transport.",
      desc_en: "Safe and professional transport.",
      icon: "🚛",
    },
    {
      id: "kaskaderi",
      title: "Kaskaderske usluge",
      title_en: "Stunt Services",
      desc: "Obučeni konji i jahači.",
      desc_en: "Trained horses and riders.",
      icon: "🏇",
    },
  ];

  function getServiceField(service: Service, field: 'title' | 'desc') {
      return $locale === 'en' ? service[`${field}_en`] : service[field];
  }

  function getNewsTitle(post: NewsPost) {
      if ($locale === 'en' && post.title_en) return post.title_en;
      return post.title;
  }

  function getNewsContent(post: NewsPost) {
      if ($locale === 'en' && post.content_en) return post.content_en;
      return post.content;
  }

  function reveal(node: HTMLElement, delay = 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => node.classList.add("is-visible"), delay);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }
</script>

<SEO title={$t('home.seo_title')} description={$t('home.seo_desc')} />

<section class="relative h-[100svh] w-full bg-brandDark overflow-hidden flex flex-col">
  <div class="h-[70%] w-full relative overflow-hidden">
    {#if loaded}
      <div in:scale={{ start: 0.95, duration: 1500, easing: quintOut }} class="w-full h-full">
        <img
          src="/images/Prva.PNG"
          alt="HorseMaster Hero"
          class="w-full h-full object-cover object-top drop-shadow-2xl filter brightness-110"
          fetchpriority="high"
          decoding="sync"
        />
        <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brandDark to-transparent pointer-events-none"></div>
      </div>
    {/if}
  </div>

  <div class="h-[30%] w-full relative z-20 bg-brandDark flex flex-col justify-start items-center text-center px-4 pt-2">
    {#if loaded}
      <h1 in:fly={{ y: 50, duration: 1000, delay: 200, easing: quintOut }} class="text-5xl md:text-[7vw] font-black uppercase italic tracking-tighter leading-none mb-6 text-white">
        Horse<span class="text-transparent text-stroke-blue blue-glow ml-2">Master</span>
      </h1>

      <div in:fade={{ duration: 800, delay: 500 }} class="flex flex-col md:flex-row gap-5">
        <a href="/contact" class="px-10 py-4 bg-brandBlue text-white font-black rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)] uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center">
          {$t('home.hero_btn_collab')}
        </a>
        <a href="/gallery" class="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-black rounded-full uppercase tracking-widest text-[10px] hover:bg-white hover:text-brandDark active:scale-95 transition-all flex items-center justify-center">
          {$t('home.hero_btn_gallery')}
        </a>
      </div>

      <div class="mt-auto mb-4 overflow-hidden">
        <span in:fade={{ delay: 1000 }} class="text-brandBlue/50 text-[9px] font-mono uppercase tracking-[0.4em]">
            {$t('home.hero_est')}
        </span>
      </div>
    {/if}
  </div>

  <div class="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>
</section>

<section class="py-24 bg-brandDark text-brandLight border-y border-white/5 relative z-20">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
    <div class="reveal-init" use:reveal>
      <h3 class="text-4xl font-black italic">10+</h3>
      <p class="text-brandBlue text-[9px] font-black uppercase tracking-[0.3em] mt-3">{$t('home.stats_years')}</p>
    </div>
    <div class="reveal-init" use:reveal={100}>
      <h3 class="text-4xl font-black italic">HNK</h3>
      <p class="text-brandBlue text-[9px] font-black uppercase tracking-[0.3em] mt-3">{$t('home.stats_partner')}</p>
    </div>
    <div class="reveal-init" use:reveal={200}>
      <h3 class="text-4xl font-black italic">100%</h3>
      <p class="text-brandBlue text-[9px] font-black uppercase tracking-[0.3em] mt-3">{$t('home.stats_security')}</p>
    </div>
    <div class="reveal-init" use:reveal={300}>
      <h3 class="text-4xl font-black italic">HRT</h3>
      <p class="text-brandBlue text-[9px] font-black uppercase tracking-[0.3em] mt-3">{$t('home.stats_reference')}</p>
    </div>
  </div>
</section>

<section class="py-32 bg-brandDark relative z-10">
  <div class="max-w-[1400px] mx-auto px-6">
    <div class="mb-20 text-center reveal-init" use:reveal>
      <span class="text-brandBlue font-mono text-xs uppercase tracking-[0.5em] block mb-4">{$t('home.services_tag')}</span>
      <h2 class="text-5xl md:text-8xl font-black uppercase tracking-tighter italic text-brandLight leading-none">
        {$t('home.services_title_1')} <span class="text-transparent text-stroke-white">{$t('home.services_title_2')}</span>
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each services as service, i}
        <a
          href="/usluge#{service.id}"
          class="group relative p-10 md:p-14 rounded-[3rem] border border-white/5 bg-brandDeep/10 backdrop-blur-sm transition-all duration-700 reveal-init overflow-hidden cursor-pointer hover:border-brandBlue/30 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-brandBlue flex flex-col"
          use:reveal={i * 100}
        >
          <div class="absolute -right-10 -top-10 text-[10rem] opacity-[0.03] group-hover:opacity-[0.08] group-hover:rotate-12 transition-all duration-1000 grayscale select-none pointer-events-none">
            {service.icon}
          </div>
          <div class="relative z-10 flex flex-col h-full min-h-[200px]">
            <span class="text-5xl mb-8 block transition-transform duration-500 group-hover:scale-110 drop-shadow-xl">{service.icon}</span>
            <h3 class="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-brandBlue transition-colors italic">
              {getServiceField(service, 'title')}
            </h3>
            <p class="text-brandLight/50 text-sm leading-relaxed group-hover:text-brandLight transition-colors">
              {getServiceField(service, 'desc')}
            </p>

            <div class="mt-auto pt-8 flex items-center justify-between">
              <div class="h-[2px] w-12 bg-white/10 group-hover:w-16 group-hover:bg-brandBlue transition-all duration-500 ease-[quintOut]"></div>
              <span class="text-[9px] font-black uppercase tracking-widest text-brandBlue opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-2 group-hover:translate-x-0">
                {$t('home.services_more')} &rarr;
              </span>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

{#if data.news && data.news.length > 0}
  <section class="py-32 bg-brandDark border-t border-white/5 relative z-10">
    <div class="max-w-[1400px] mx-auto px-6">
      <div class="flex items-end justify-between mb-20">
        <h2 class="text-4xl font-black uppercase tracking-tighter text-brandLight italic">
          {$t('home.news_tag')}
        </h2>
        <a href="/novosti" class="text-[10px] font-black uppercase tracking-[0.4em] text-brandBlue hover:text-white transition-colors">
          {$t('home.news_archive')} &rarr;
        </a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each data.news as post, i}
          <button
            type="button"
            class="reveal-init w-full text-left bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/5 group hover:border-brandBlue/30 hover:-translate-y-2 transition-all duration-700 cursor-pointer flex flex-col"
            use:reveal={i * 150}
            onclick={() => openNews(post)}
            aria-label={`Otvori vijest: ${getNewsTitle(post)}`}
          >
            {#if post.image_url}
              <div class="h-64 w-full overflow-hidden">
                <img src={post.image_url} alt="" loading="lazy" decoding="async" class="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"/>
              </div>
            {/if}
            <div class="p-10 flex-grow flex flex-col">
              <span class="block text-[10px] font-black text-brandBlue uppercase tracking-widest mb-4">
                {new Date(post.created_at).toLocaleDateString($locale === 'en' ? "en-US" : "hr-HR")}
              </span>
              <h3 class="text-xl font-black uppercase leading-tight text-brandLight mb-6 line-clamp-2">
                {getNewsTitle(post)}
              </h3>
              <div class="mt-auto flex items-center text-[10px] font-black uppercase tracking-widest text-brandLight/30 group-hover:text-brandBlue transition-colors">
                <span>{$t('home.news_more')}</span>
                <svg class="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </div>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </section>
{:else}
  <section class="py-32 bg-brandDark border-t border-white/5 relative z-10">
    <div class="max-w-[1400px] mx-auto px-6">
      <div class="mb-20 text-center reveal-init" use:reveal>
        <span class="text-brandBlue font-mono text-xs uppercase tracking-[0.5em] block mb-4">
          {$t('home.news_tag')}
        </span>
        <h2 class="text-5xl font-black uppercase tracking-tighter italic text-brandLight leading-none mb-10">
          {$t('home.news_title_empty_1')} <span class="text-transparent text-stroke-white">{$t('home.news_title_empty_2')}</span>
        </h2>
        <div class="py-24 flex flex-col items-center justify-center border border-white/5 rounded-[3rem] bg-brandDeep/10">
          <svg class="w-12 h-12 text-brandLight/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L18.5 7H20"/></svg>
          <p class="text-brandLight/40 uppercase tracking-widest font-black text-sm">
            {$t('home.news_empty_desc')}
          </p>
        </div>
      </div>
    </div>
  </section>
{/if}

{#if selectedNews}
  <div class="fixed inset-0 z-[150] bg-brandDark/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12" transition:fade={{ duration: 300 }} role="dialog">
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
        <span class="text-brandBlue font-black text-[10px] uppercase tracking-[0.5em] block mb-6">
          {$t('home.news_modal_tag')}
        </span>
        <h2 class="text-4xl md:text-6xl font-black text-white mb-10 leading-none uppercase italic">
          {getNewsTitle(selectedNews)}
        </h2>
        <div class="prose prose-invert prose-xl text-brandLight/60 max-w-none">
          {@html getNewsContent(selectedNews)}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .text-stroke-white {
    -webkit-text-stroke: 1px rgba(240, 242, 245, 0.2);
    color: transparent;
  }
  .text-stroke-blue {
    -webkit-text-stroke: 2px #2563eb;
  }
  .blue-glow {
    text-shadow: 0 0 30px rgba(37, 99, 235, 0.4);
  }

  .reveal-init {
    opacity: 0;
    transform: translateY(40px);
    transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  }
  :global(.reveal-init.is-visible) {
    opacity: 1;
    transform: translateY(0);
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  :global(body:has([role="dialog"])) {
    overflow: hidden;
  }
</style>