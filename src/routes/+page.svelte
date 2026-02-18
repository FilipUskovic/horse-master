<script lang="ts">
  import { fade, fly, scale } from "svelte/transition";
  import { onMount } from "svelte";
  import { quintOut } from "svelte/easing";
  import SEO from "$lib/components/SEO.svelte";

  let { data } = $props();

  let loaded = $state(false);
  let selectedNews = $state<any | null>(null);
  let scrollY = $state(0);

  const openNews = (post: any) => (selectedNews = post);
  const closeNews = () => (selectedNews = null);

  onMount(() => {
    loaded = true;
  });

  const services = [
    {
      title: "Konji u filmu",
      desc: "Profesionalna priprema za filmske setove i povijesne spektakle.",
      icon: "🎬",
    },
    {
      title: "Konji za spotove",
      desc: "Jedinstvena estetika i koreografija za glazbene produkcije.",
      icon: "🎵",
    },
    {
      title: "Konji za fotografiranje",
      desc: "Elegancija za modne editorijale i vjenčanja.",
      icon: "📸",
    },
    {
      title: "Šetnje na konjima",
      desc: "Vođene terenske šetnje prirodom prilagođene iskustvu.",
      icon: "🌲",
    },
    {
      title: "Prijevoz konja",
      desc: "Siguran i profesionalan transport konja vrhunskom opremom.",
      icon: "🚛",
    },
    {
      title: "Kaskaderske usluge",
      desc: "Obučeni konji i jahači za najzahtjevnije akcijske scene.",
      icon: "🏇",
    },
  ];

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
      { threshold: 0.05 },
    );
    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }
</script>

<svelte:window bind:scrollY />

<SEO
  title={data.seo?.title || "Početna - HorseMaster Prestige"}
  description={data.seo?.description ||
    "Vrhunske usluge s konjima za filmove, spotove i vjenčanja."}
  image="/images/Prva.PNG"
/>

<div class="fixed inset-0 pointer-events-none z-0">
  <div
    class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brandBlue/5 blur-[120px] rounded-full"
  ></div>
  <div
    class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brandDeep/20 blur-[120px] rounded-full"
  ></div>
</div>

<div
  class="fixed inset-0 pointer-events-none z-[900] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
></div>

<section
  class="relative h-[100svh] w-full overflow-hidden bg-brandDark flex flex-col justify-center"
>
  <div
    class="absolute inset-0 z-0 flex items-center justify-center pt-20 md:pt-0 overflow-hidden"
  >
    <img
      src="/images/Prva.PNG"
      alt="HorseMaster Hero"
      class="w-full h-full md:h-[95%] object-contain object-center opacity-60 grayscale transition-transform duration-[20s] ease-linear"
      style="transform: translateY({scrollY * 0.2}px) scale({1.05 +
        scrollY * 0.0002})"
    />
    <div
      class="absolute inset-0 bg-gradient-to-t from-brandDark via-transparent to-transparent pointer-events-none"
    ></div>
  </div>

  <div
    class="relative z-10 flex flex-col items-center justify-end h-full pb-24 md:pb-32 pointer-events-none px-6"
  >
    {#if loaded}
      <div class="overflow-hidden mb-6">
        <span
          in:fly={{ y: 20, duration: 800, easing: quintOut }}
          class="block text-brandBlue font-mono text-xs uppercase tracking-[0.5em]"
          >Est. 2014 &mdash; Prestige</span
        >
      </div>

      <h1
        in:fly={{ y: 50, duration: 1200, easing: quintOut }}
        class="text-6xl md:text-[10rem] font-black text-white/80 mb-12 tracking-tighter uppercase leading-[0.8] text-center italic mix-blend-overlay"
      >
        HORSE<span class="text-transparent text-stroke-white blue-glow"
          >MASTER</span
        >
      </h1>

      <div
        in:fade={{ duration: 1000, delay: 600 }}
        class="flex flex-col md:flex-row gap-6 pointer-events-auto"
      >
        <a
          href="/contact"
          class="group relative px-12 py-5 bg-brandBlue text-white font-black rounded-full overflow-hidden uppercase tracking-[0.2em] text-[10px] md:text-xs transition-transform hover:scale-105 shadow-2xl"
        >
          <span class="relative z-10">Započnimo suradnju</span>
          <div
            class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[quintOut]"
          ></div>
        </a>
        <a
          href="/gallery"
          class="px-12 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-black rounded-full uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-white hover:text-brandDark transition-all"
        >
          Galerija Radova
        </a>
      </div>
    {/if}
  </div>
</section>

<section
  class="py-24 bg-brandDark text-brandLight border-y border-white/5 relative z-20"
>
  <div
    class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
  >
    <div class="reveal-init" use:reveal>
      <h3 class="text-5xl font-black italic leading-none">10+</h3>
      <p
        class="text-brandBlue text-[10px] font-black uppercase tracking-[0.3em] mt-4"
      >
        Godina Rada
      </p>
    </div>
    <div class="reveal-init" use:reveal={100}>
      <h3 class="text-5xl font-black italic leading-none">HNK</h3>
      <p
        class="text-brandBlue text-[10px] font-black uppercase tracking-[0.3em] mt-4"
      >
        Partner
      </p>
    </div>
    <div class="reveal-init" use:reveal={200}>
      <h3 class="text-5xl font-black italic leading-none">100%</h3>
      <p
        class="text-brandBlue text-[10px] font-black uppercase tracking-[0.3em] mt-4"
      >
        Sigurnost
      </p>
    </div>
    <div class="reveal-init" use:reveal={300}>
      <h3 class="text-5xl font-black italic leading-none">HRT</h3>
      <p
        class="text-brandBlue text-[10px] font-black uppercase tracking-[0.3em] mt-4"
      >
        Produkcija
      </p>
    </div>
  </div>
</section>

<section class="py-32 bg-brandDark relative z-10">
  <div class="max-w-7xl mx-auto px-6">
    <div class="mb-24 text-center reveal-init" use:reveal>
      <span
        class="text-brandBlue font-mono text-xs uppercase tracking-[0.5em] block mb-4"
        >Ekspertiza</span
      >
      <h2
        class="text-5xl md:text-8xl font-black uppercase tracking-tighter italic text-brandLight"
      >
        Naše <span class="text-transparent text-stroke-white">Usluge</span>
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each services as service, i}
        <div
          class="group relative p-10 md:p-14 rounded-[3rem] border border-white/5 bg-brandDeep/10 backdrop-blur-sm transition-all duration-700 reveal-init overflow-hidden cursor-default"
          use:reveal={i * 100}
        >
          <div
            class="absolute -right-10 -top-10 text-[10rem] opacity-[0.02] group-hover:opacity-[0.08] group-hover:rotate-12 transition-all duration-1000 grayscale"
          >
            {service.icon}
          </div>

          <div class="relative z-10 flex flex-col h-full min-h-[220px]">
            <span
              class="text-5xl mb-10 block transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6 drop-shadow-2xl"
            >
              {service.icon}
            </span>

            <h3
              class="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-brandBlue transition-colors italic"
            >
              {service.title}
            </h3>

            <p
              class="text-brandLight/40 text-base leading-relaxed group-hover:text-brandLight transition-colors"
            >
              {service.desc}
            </p>

            <div class="mt-auto pt-10">
              <div
                class="h-[1px] w-12 bg-white/10 group-hover:w-full group-hover:bg-brandBlue transition-all duration-700 ease-[quintOut]"
              ></div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

{#if data.news && data.news.length > 0}
  <section class="py-32 bg-brandDark border-t border-white/5 relative z-10">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex items-end justify-between mb-20">
        <h2
          class="text-4xl font-black uppercase tracking-tighter text-white italic leading-none"
        >
          Aktualno
        </h2>
        <a
          href="/gallery"
          class="text-[10px] font-black uppercase tracking-[0.4em] text-brandBlue hover:text-white transition-colors"
          >Arhiva &rarr;</a
        >
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each data.news as post, i}
          <button
            type="button"
            class="reveal-init w-full text-left bg-brandDeep/10 rounded-[2.5rem] overflow-hidden border border-white/5 group hover:border-brandBlue/30 hover:-translate-y-2 transition-all duration-700 cursor-pointer flex flex-col"
            use:reveal={i * 150}
            onclick={() => openNews(post)}
            aria-label={`Pročitaj: ${post.title}`}
          >
            {#if post.image_url}
              <div
                class="h-64 w-full overflow-hidden grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              >
                <img
                  src={post.image_url}
                  alt=""
                  loading="lazy"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
            {/if}
            <div class="p-10 flex-grow flex flex-col">
              <span
                class="block text-[10px] font-black text-brandBlue uppercase tracking-widest mb-4"
                >{new Date(post.created_at).toLocaleDateString("hr-HR")}</span
              >
              <h3
                class="text-xl font-black uppercase leading-tight text-brandLight mb-6 line-clamp-2 italic"
              >
                {post.title}
              </h3>
              <div
                class="mt-auto flex items-center text-[10px] font-black uppercase tracking-widest text-brandLight/20 group-hover:text-brandBlue transition-colors"
              >
                <span>Detaljnije</span>
                <svg
                  class="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  /></svg
                >
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
    class="fixed inset-0 z-[150] bg-brandDark/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
    transition:fade={{ duration: 300 }}
    role="dialog"
    aria-modal="true"
  >
    <button
      class="absolute inset-0 w-full h-full cursor-zoom-out border-none bg-transparent"
      onclick={closeNews}
      aria-label="Zatvori"
    ></button>

    <div
      class="relative bg-brandDeep/40 w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto rounded-[3rem] border border-white/5 shadow-2xl flex flex-col no-scrollbar"
      in:fly={{ y: 50, duration: 600, easing: quintOut }}
    >
      <div
        class="sticky top-6 right-6 z-30 flex justify-end px-6 pointer-events-none"
      >
        <button
          onclick={closeNews}
          class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-white hover:text-brandDark transition-all pointer-events-auto shadow-2xl"
          aria-label="Zatvori"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"><path d="M6 18L18 6M6 6l12 12" /></svg
          >
        </button>
      </div>

      {#if selectedNews.image_url}
        <div class="h-[40vh] md:h-[50vh] w-full relative shrink-0">
          <img
            src={selectedNews.image_url}
            alt=""
            class="w-full h-full object-cover"
            in:scale={{ duration: 800, start: 0.95, easing: quintOut }}
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-brandDark via-transparent to-transparent"
          ></div>
        </div>
      {/if}

      <div class="p-10 md:p-16 relative z-10">
        <span
          class="text-brandBlue font-black text-[10px] uppercase tracking-[0.5em] block mb-6"
          >Novost</span
        >
        <h2
          class="text-4xl md:text-6xl font-black text-brandLight mb-10 leading-none uppercase italic"
        >
          {selectedNews.title}
        </h2>
        <div class="prose prose-invert prose-xl text-brandLight/60 max-w-none">
          {@html selectedNews.content}
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

  .blue-glow {
    text-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
  }

  :global(.reveal-init) {
    opacity: 0;
    transform: translateY(40px);
    transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  }
  :global(.reveal-init.is-visible) {
    opacity: 1;
    transform: translateY(0);
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  :global(body:has([role="dialog"])) {
    overflow: hidden;
  }

  button,
  a {
    -webkit-tap-highlight-color: transparent;
  }
</style>
