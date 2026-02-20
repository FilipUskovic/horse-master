<script lang="ts">
  import { fade, scale, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import SEO from "$lib/components/SEO.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  interface GalleryImage {
    image_url: string;
    title: string;
    size?: "large" | "tall" | "normal";
  }

  let localImages: GalleryImage[] = [
    {
      image_url: "/images/image00001.jpeg",
      title: "Snimanje 1",
      size: "large",
    },
    { image_url: "/images/image00003.jpeg", title: "Naš tim", size: "normal" },
    {
      image_url: "/images/image00005.jpeg",
      title: "Veličanstveni konj",
      size: "tall",
    },
    {
      image_url: "/images/image00006.jpeg",
      title: "Trenutak u galopu",
      size: "normal",
    },
    {
      image_url: "/images/image00007.jpeg",
      title: "Transport Prestige",
      size: "normal",
    },
    {
      image_url: "/images/image00008.jpeg",
      title: "Zadovoljni Klijenti",
      size: "tall",
    },
  ];

  // Pratimo indeks slike umjesto samog URL-a
  let selectedIndex = $state<number | null>(null);

  let allImages = $derived([...localImages, ...(data.supabasePhotos || [])]);

  //  trenutna sliku na temelju indeksa
  let currentImage = $derived(
    selectedIndex !== null ? allImages[selectedIndex] : null,
  );

  // open pics has num
  const openImage = (index: number) => (selectedIndex = index);
  const closeImage = () => (selectedIndex = null);

  const nextImage = () => {
    if (selectedIndex !== null) {
      selectedIndex = (selectedIndex + 1) % allImages.length;
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null) {
      selectedIndex = (selectedIndex - 1 + allImages.length) % allImages.length;
    }
  };

  function reveal(node: HTMLElement, delay = 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => node.classList.add("visible"), delay);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.05 },
    );
    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }

  // za mobitel swape
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50; // Minimalna duljina poteza u pikselima da se registrira
    if (touchEndX < touchStartX - swipeThreshold) nextImage(); // Potez ulijevo
    if (touchEndX > touchStartX + swipeThreshold) prevImage(); // Potez udesno
  };
</script>

<SEO
  title="Galerija - Foto Reportaža | HorseMaster Prestige"
  description="Pogledajte ekskluzivne trenutke s naših snimanja, evenata i transporta."
/>

<svelte:window
  onkeydown={(e) => {
    if (selectedIndex === null) return;
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeImage();
  }}
  ontouchstart={(e) => {
    if (selectedIndex === null) return;
    touchStartX = e.changedTouches[0].screenX;
  }}
  ontouchend={(e) => {
    if (selectedIndex === null) return;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }}
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
  class="fixed inset-0 pointer-events-none z-[900] opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
></div>

<section
  class="relative z-10 bg-brandDark py-24 md:py-32 min-h-screen text-brandLight selection:bg-brandBlue/30"
>
  <div class="max-w-[1600px] mx-auto px-6">
    <div
      class="mb-24 flex flex-col md:flex-row justify-between items-end gap-10"
    >
      <div class="reveal-init" use:reveal>
        <div class="overflow-hidden">
          <h1
            in:fly={{ y: 80, duration: 1000, easing: quintOut }}
            class="text-[12vw] md:text-[7vw] leading-[0.85] font-black tracking-tighter uppercase mb-4"
          >
            Foto <br />
            <span
              class="text-brandBlue blue-glow italic lowercase tracking-tight"
              >Reportaža</span
            >
          </h1>
        </div>
        <p
          class="text-brandLight/30 font-mono text-[10px] uppercase tracking-[0.4em]"
        >
          Arhiva radova i trenutaka
        </p>
      </div>

      <div
        class="max-w-xs text-right hidden md:block reveal-init"
        use:reveal={200}
      >
        <p
          class="text-brandLight/40 text-sm italic font-light leading-relaxed border-r border-brandBlue/30 pr-6"
        >
          "Bilježimo snagu, eleganciju i neizbrisive uspomene kroz objektiv
          naših suradnika."
        </p>
      </div>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 md:auto-rows-[300px]"
    >
      {#if allImages.length > 0}
        {#each allImages as img, i (img.image_url)}
          <button
            type="button"
            onclick={() => openImage(i)}
            use:reveal={i * 50}
            class="reveal-init group relative overflow-hidden rounded-[2rem] bg-brandDeep/10 border border-white/5 transition-all duration-700 active:scale-95 {img.size ===
            'large'
              ? 'md:col-span-2 md:row-span-2'
              : ''} {img.size === 'tall' ? 'md:row-span-2' : ''}"
            aria-label="Povećaj sliku: {img.title}"
          >
            <div
              class="h-full w-full scale-105 transition-transform duration-[1.5s] ease-out group-hover:scale-100 will-change-transform"
            >
              <img
                src={img.image_url}
                alt={img.title}
                loading={i < 4 ? "eager" : "lazy"}
                decoding="async"
                class="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 will-change-[opacity]"
              />
            </div>
            <div
              class="absolute inset-0 bg-gradient-to-t from-brandDark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-8 text-left"
            >
              <span
                class="text-brandBlue font-mono text-[10px] mb-2 tracking-widest"
                >/ {(i + 1).toString().padStart(2, "0")}</span
              >
              <h3
                class="text-brandLight text-xl font-black uppercase tracking-tight italic"
              >
                {img.title}
              </h3>
            </div>
          </button>
        {/each}
      {:else}
        <div
          class="col-span-full py-32 flex flex-col items-center justify-center border border-white/5 rounded-[3rem] bg-brandDeep/10"
        >
          <svg
            class="w-12 h-12 text-brandLight/20 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            /></svg
          >
          <p
            class="text-brandLight/40 uppercase tracking-widest font-black text-sm"
          >
            Arhiva je trenutno prazna
          </p>
        </div>
      {/if}
    </div>
  </div>
</section>

{#if currentImage}
  <div
    class="fixed inset-0 z-[1000] bg-brandDark/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
    transition:fade={{ duration: 300 }}
    role="dialog"
    aria-modal="true"
    aria-label="Pregled slike"
  >
    <button
      type="button"
      class="absolute inset-0 w-full h-full cursor-zoom-out border-none bg-transparent z-0"
      onclick={closeImage}
      aria-label="Zatvori pregled slike iz pozadine"
    ></button>

    <div
      class="relative w-full max-w-7xl h-[85vh] flex items-center justify-center pointer-events-none z-10 group"
    >
      {#key currentImage.image_url}
        <img
          src={currentImage.image_url}
          alt={currentImage.title}
          class="max-w-full max-h-full object-contain rounded-xl shadow-[0_0_100px_rgba(37,99,235,0.15)] pointer-events-auto"
          in:scale={{ duration: 400, start: 0.95, easing: quintOut }}
        />
      {/key}

      <div
        class="absolute bottom-[-2rem] left-0 right-0 text-center pointer-events-none"
      >
        <span
          class="text-brandLight/40 font-mono text-[10px] tracking-widest uppercase"
          >{currentImage.title} &mdash; {(selectedIndex! + 1)
            .toString()
            .padStart(2, "0")} / {allImages.length
            .toString()
            .padStart(2, "0")}</span
        >
      </div>

      <button
        type="button"
        onclick={prevImage}
        class="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 text-brandLight/20 hover:text-brandBlue transition-all pointer-events-auto p-4 md:p-8 active:scale-90"
        aria-label="Prethodna slika"
      >
        <svg
          class="w-10 h-10 md:w-16 md:h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M15 19l-7-7 7-7"
          /></svg
        >
      </button>

      <button
        type="button"
        onclick={nextImage}
        class="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 text-brandLight/20 hover:text-brandBlue transition-all pointer-events-auto p-4 md:p-8 active:scale-90"
        aria-label="Sljedeća slika"
      >
        <svg
          class="w-10 h-10 md:w-16 md:h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 5l7 7-7 7"
          /></svg
        >
      </button>

      <button
        type="button"
        onclick={closeImage}
        class="absolute -top-6 -right-6 md:-top-16 md:-right-16 text-brandLight/40 hover:text-brandBlue transition-all pointer-events-auto p-4 active:scale-90"
        aria-label="Zatvori prozor"
      >
        <svg
          class="w-10 h-10 md:w-12 md:h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.2"
            d="M6 18L18 6M6 6l12 12"
          /></svg
        >
      </button>
    </div>
  </div>
{/if}

<style>
  .blue-glow {
    text-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
  }
  :global(.reveal-init) {
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.8s cubic-bezier(0.2, 1, 0.3, 1),
      transform 0.8s cubic-bezier(0.2, 1, 0.3, 1);
    will-change: opacity, transform;
  }
  :global(.reveal-init.visible) {
    opacity: 1;
    transform: translateY(0);
  }
  button {
    -webkit-tap-highlight-color: transparent;
  }
</style>
