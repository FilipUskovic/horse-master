<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import SEO from "$lib/components/SEO.svelte";
  import { t } from "svelte-i18n";

  let loaded = $state(false);
  let scrollY = $state(0);
  let innerWidth = $state(0);
  let innerHeight = $state(0);

  let mouse = { x: 0, y: 0 };
  let lerpMouse = $state({ x: 0, y: 0 });
  let isHoveringLink = $state(false);

  //lerps smoth scroll
  onMount(() => {
    setTimeout(() => (loaded = true), 500);

    let frame: number;
    const tick = () => {
      if (innerWidth > 1024) {
        lerpMouse.x += (mouse.x - lerpMouse.x) * 0.1;
        lerpMouse.y += (mouse.y - lerpMouse.y) * 0.1;
      }
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  });

  function reveal(node: HTMLElement, { delay = 0 } = {}) {
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

  const icons = {
    film: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    rings:
      "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    camera:
      "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z",
  };
</script>

<svelte:window
  bind:scrollY
  bind:innerWidth
  bind:innerHeight
  on:mousemove={(e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }}
/>

<SEO title={$t("about.seo_title")} description={$t("about.seo_desc")} />

{#if !loaded}
  <div
    out:fade={{ duration: 500 }}
    class="fixed inset-0 z-[1000] bg-brandDark flex items-center justify-center"
  >
    <span
      class="text-brandBlue font-black tracking-[0.8em] text-[10px] animate-pulse uppercase"
      >Prestige</span
    >
  </div>
{/if}

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

{#if innerWidth > 1024}
  <div
    class="fixed z-[999] pointer-events-none rounded-full mix-blend-difference transition-all duration-300 ease-out bg-white"
    style="
            left: {lerpMouse.x}px; 
            top: {lerpMouse.y}px; 
            width: {isHoveringLink ? 80 : 12}px; 
            height: {isHoveringLink ? 80 : 12}px; 
            transform: translate(-50%, -50%);
        "
  ></div>
{/if}

<main
  class="bg-brandDark text-brandLight overflow-x-hidden selection:bg-brandBlue/30 relative z-10"
>
  <section
    class="relative h-[85vh] md:h-screen w-full flex flex-col justify-center items-center overflow-hidden"
  >
    <div
      class="absolute inset-0 w-full h-full scale-110 will-change-transform"
      style="transform: translateY({scrollY *
        (innerWidth > 768 ? 0.4 : 0.15)}px)"
    >
      <img
        src="/images/image00001.jpeg"
        alt="HorseMaster Prestige Hero"
        class="w-full h-full object-cover opacity-40 grayscale contrast-125 shadow-inner"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-brandDark/40 via-transparent to-brandDark"
      ></div>
    </div>

    <div class="relative z-10 text-center px-4 mix-blend-difference">
      {#if loaded}
        <div class="overflow-hidden mb-4">
          <p
            in:fly={{ y: 30, duration: 1000, easing: quintOut }}
            class="text-brandBlue font-mono text-[10px] md:text-sm tracking-[0.5em] uppercase"
          >
            {$t("about.est")}
          </p>
        </div>
        <h1
          class="text-[15vw] md:text-[14vw] leading-[0.85] font-black tracking-tighter uppercase italic flex flex-col items-center"
        >
          <span class="overflow-hidden block">
            <span
              in:fly={{ y: 150, duration: 1200, easing: quintOut }}
              class="block">{$t("about.hero_1")}</span
            >
          </span>
          <span
            class="overflow-hidden block text-transparent text-stroke-white blue-glow"
          >
            <span
              in:fly={{ y: 150, duration: 1200, delay: 150, easing: quintOut }}
              class="block">{$t("about.hero_2")}</span
            >
          </span>
        </h1>
      {/if}
    </div>

    <div
      class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce"
    >
      <span class="text-[9px] uppercase tracking-widest font-black">Scroll</span
      >
    </div>
  </section>

  <section class="py-24 md:py-48 px-6 max-w-[1400px] mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-end">
      <div class="lg:col-span-8 reveal-block" use:reveal>
        <p
          class="text-3xl md:text-6xl font-medium leading-tight tracking-tighter text-brandLight/90"
        >
          {$t("about.intro_main")}
          <span class="text-brandBlue italic blue-glow"
            >{$t("about.intro_highlight")}</span
          >
        </p>
      </div>
      <div class="lg:col-span-4 reveal-block" use:reveal={{ delay: 200 }}>
        <p
          class="text-brandLight/40 text-base leading-relaxed border-l border-brandBlue/30 pl-8"
        >
          {$t("about.intro_sub")}
        </p>
      </div>
    </div>
  </section>

  <section class="px-4 md:px-6 pb-24 md:pb-48">
    <div class="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div
        class="group relative h-[70vh] md:h-[85vh] w-full rounded-[3rem] overflow-hidden bg-brandDeep/10 border border-white/5 reveal-block transition-transform duration-500 active:scale-[0.98]"
        use:reveal
      >
        <div class="absolute inset-0 overflow-hidden">
          <img
            src="/images/image00007.jpeg"
            alt="Filmska produkcija"
            class="w-full h-full object-cover opacity-60 transition-transform duration-[2s] group-hover:scale-110"
          />
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-brandDark via-brandDark/40 to-transparent"
        ></div>

        <div class="absolute bottom-0 left-0 p-10 md:p-16 w-full z-20">
          <div class="flex items-center gap-4 mb-6">
            <span class="w-12 h-[1px] bg-brandBlue"></span>
            <span
              class="text-brandBlue text-[10px] font-black uppercase tracking-widest"
              >{$t("about.prod_tag")}</span
            >
          </div>
          <h2
            class="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 text-white leading-none italic"
          >
            {@html $t("about.prod_title").replace("\n", "<br>")}
          </h2>
          <p
            class="text-brandLight/60 max-w-sm text-lg leading-relaxed mb-10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700"
          >
            {$t("about.prod_desc")}
          </p>
          <div
            class="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-brandBlue group-hover:border-brandBlue shadow-2xl"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d={icons.film}
              /></svg
            >
          </div>
        </div>
      </div>

      <div
        class="relative h-auto md:h-[85vh] w-full rounded-[3rem] bg-brandDeep/10 backdrop-blur-sm border border-white/5 p-10 md:p-16 flex flex-col justify-between reveal-block"
        use:reveal={{ delay: 150 }}
      >
        <div>
          <span
            class="text-brandBlue font-mono text-[10px] uppercase tracking-widest mb-12 block"
            >{$t("about.event_tag")}</span
          >
          <h2
            class="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-16 text-brandLight leading-none italic"
          >
            {@html $t("about.event_title").replace("\n", "<br>")}
          </h2>

          <div class="space-y-6">
            <div
              class="group/item flex items-start gap-8 p-8 rounded-3xl border border-white/5 hover:border-brandBlue/30 hover:bg-brandBlue/5 transition-all duration-500 cursor-default"
            >
              <div
                in:scale={{ duration: 800, delay: 400 }}
                class="mt-1 w-12 h-12 rounded-full bg-brandBlue/10 flex items-center justify-center text-brandBlue shrink-0 transition-colors group-hover/item:bg-brandBlue group-hover/item:text-white"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"
                  ><path d={icons.rings} /></svg
                >
              </div>
              <div>
                <h3
                  class="text-2xl font-black uppercase tracking-tight mb-3 group-hover/item:text-brandBlue transition-colors"
                >
                  {$t("about.wedding_title")}
                </h3>
                <p
                  class="text-brandLight/40 text-base leading-relaxed max-w-sm"
                >
                  {$t("about.wedding_desc")}
                </p>
              </div>
            </div>

            <div
              class="group/item flex items-start gap-8 p-8 rounded-3xl border border-white/5 hover:border-brandBlue/30 hover:bg-brandBlue/5 transition-all duration-500 cursor-default"
            >
              <div
                in:scale={{ duration: 800, delay: 600 }}
                class="mt-1 w-12 h-12 rounded-full bg-brandBlue/10 flex items-center justify-center text-brandBlue shrink-0 transition-colors group-hover/item:bg-brandBlue group-hover/item:text-white"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"
                  ><path d={icons.camera} /></svg
                >
              </div>
              <div>
                <h3
                  class="text-2xl font-black uppercase tracking-tight mb-3 group-hover/item:text-brandBlue transition-colors"
                >
                  {$t("about.photo_title")}
                </h3>
                <p
                  class="text-brandLight/40 text-base leading-relaxed max-w-sm"
                >
                  {$t("about.photo_desc")}
                </p>
              </div>
            </div>
            <div
              class="mt-16 md:mt-0 pt-10 border-t border-white/5 flex justify-between items-end"
            >
              <p
                class="text-brandLight/20 text-[10px] font-mono uppercase tracking-[0.3em] max-w-[200px]"
              >
                {$t("about.event_footer")}
              </p>
              <span class="text-4xl text-brandBlue animate-pulse">✦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section
    class="py-32 md:py-48 bg-brandBlue text-brandDark rounded-t-[4rem] md:rounded-t-[6rem] relative overflow-hidden z-20"
  >
    <div class="container mx-auto px-6 text-center relative z-10">
      <p
        class="text-[10px] font-black uppercase tracking-[0.5em] mb-12 opacity-60"
      >
        {$t("about.cta_tag")}
      </p>

      <h2
        class="text-[14vw] md:text-[10vw] leading-[0.8] font-black uppercase italic tracking-tighter mb-20 transition-all duration-700 ease-[quintOut] group cursor-default hover:skew-x-[-6deg] hover:rotate-1 hover:scale-[1.02]"
      >
        <span
          class="text-white drop-shadow-2xl block mt-4 transition-transform duration-700 group-hover:translate-x-4"
        >
          {@html $t("about.cta_title").replace("\n", "<br>")}
        </span>
      </h2>

      <a
        href="/contact"
        class="group relative inline-flex items-center gap-8 px-16 py-8 bg-brandDark text-brandLight rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl"
        onmouseenter={() => (isHoveringLink = true)}
        onmouseleave={() => (isHoveringLink = false)}
      >
        <span
          class="relative z-10 text-[10px] font-black uppercase tracking-[0.4em]"
          >{$t("about.cta_btn")}</span
        >
        <div
          class="absolute inset-0 bg-brandDeep translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[quintOut]"
        ></div>
      </a>
    </div>
  </section>
</main>

<style>
  .text-stroke-white {
    -webkit-text-stroke: 1px rgba(240, 242, 245, 0.2);
    color: transparent;
  }
  .blue-glow {
    text-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
  }
  .reveal-block {
    opacity: 0;
    transform: translateY(60px);
    transition:
      opacity 1s ease-out,
      transform 1s cubic-bezier(0.22, 1, 0.36, 1);
  }
  :global(.reveal-block.is-visible) {
    opacity: 1;
    transform: translateY(0);
  }
  :global(body) {
    scrollbar-width: none;
    background-color: #050505;
  }
  :global(body::-webkit-scrollbar) {
    display: none;
  }
</style>
