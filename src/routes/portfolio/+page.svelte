<script lang="ts">
    import { fade, fly, scale } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { quintOut } from 'svelte/easing';
    import SEO from '$lib/components/SEO.svelte';

    let loaded = $state(false);
    let win = $state({ w: 0, h: 0 });
    let mouse = { x: 0, y: 0 };
    let lerpMouse = $state({ x: 0, y: 0 });
    let activeProject = $state<number | null>(null);

    onMount(() => {
        // Mali delay da se osigura glatka animacija nakon učitavanja HTML-a
        setTimeout(() => loaded = true, 100);

        let frame: number;
        const tick = () => {
            if (win.w > 1024) {
                lerpMouse.x += (mouse.x - lerpMouse.x) * 0.08;
                lerpMouse.y += (mouse.y - lerpMouse.y) * 0.08;
            }
            frame = requestAnimationFrame(tick);
        };
        tick();
        return () => cancelAnimationFrame(frame);
    });

    const projects = [
        {
            year: "2025—",
            title: "Ero s onoga svijeta",
            client: "Hrvatsko narodno kazalište u Zagrebu",
            link: "https://www.hnk.hr/hr/opera/predstave/ero-s-onoga-svijeta/",
            type: "Opera / Teatar",
            icon: `<path d="M11 5L1 12l10 7V5zM23 5l-10 7 10 7V5z" />`
        },
        {
            year: "2026",
            title: "Dioklecijan",
            client: "HRT Povijesni spektakl",
            link: "https://magazin.hrt.hr/kultura/hrt-ov-povijesni-spektakl-o-dioklecijanu-vjerojatno-najvaznija-osoba-s-nasih-prostora--12460626",
            type: "TV Produkcija",
            icon: `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />`
        },
        {
            year: "2013—",
            title: "Kravat pukovnija",
            client: "Počasna satnija",
            link: "https://www.kravatpukovnija.com/",
            type: "Povijesna postrojba",
            icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />`
        },
        {
            year: "Referenca",
            title: "Grad Novska",
            client: "Gradska suradnja",
            link: "#",
            type: "Institucija",
            icon: `<path d="M3 21h18M3 10h18M5 10V21M19 10V21M9 21V10M15 21V10M12 3L2 10h20L12 3z" />`
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
        }, { threshold: 0.1 });
        observer.observe(node);
        return { destroy: () => observer.disconnect() };
    }
</script>

<svelte:window 
    bind:innerWidth={win.w} 
    bind:innerHeight={win.h}
    on:mousemove={(e) => { mouse.x = e.clientX; mouse.y = e.clientY; }} 
/>

<SEO title="Portfolio | HorseMaster Prestige" description="Reference i projekti." />

{#if loaded}
    <div in:fade={{ duration: 2000 }} class="fixed inset-0 pointer-events-none z-[900] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
{/if}

{#if activeProject !== null && win.w > 1024}
    <div 
        class="fixed z-[100] pointer-events-none flex items-center justify-center w-40 h-40 rounded-full backdrop-blur-xl bg-blue-600/10 border border-blue-500/30 shadow-[0_0_60px_rgba(37,99,235,0.2)]"
        style="left: {lerpMouse.x - 80}px; top: {lerpMouse.y - 80}px;"
        transition:scale={{ duration: 400, start: 0.5, easing: quintOut }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-blue-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            {@html projects[activeProject].icon}
        </svg>
    </div>
{/if}

<main class="bg-[#050505] text-white min-h-screen selection:bg-blue-600">
    
    <section class="pt-40 pb-20 px-6 max-w-[1400px] mx-auto border-b border-white/5">
        {#if loaded}
            <div in:fade={{ duration: 1000 }}>
                <p in:fly={{ y: 20, duration: 1000, delay: 200 }} class="text-blue-500 font-black text-[10px] md:text-xs tracking-[0.6em] uppercase mb-4">Selected Works</p>
                <h1 in:fly={{ y: 40, duration: 1200, delay: 400, easing: quintOut }} class="text-[12vw] md:text-[9vw] font-black uppercase italic tracking-tighter leading-none">
                    Port<span class="text-transparent text-stroke-white italic">folio</span>
                </h1>
            </div>
        {/if}
    </section>

    <section class="px-6 py-20 md:py-32 max-w-[1400px] mx-auto">
        <div class="space-y-0">
            {#each projects as project, i}
                <div 
                    class="group relative py-12 md:py-20 border-b border-white/5 reveal-init transition-all duration-700"
                    use:reveal={i * 100}
                >
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group/link"
                        onmouseenter={() => activeProject = i}
                        onmouseleave={() => activeProject = null}
                    >
                        <div class="lg:col-span-3">
                            <span class="block text-blue-500 font-bold text-[10px] md:text-xs tracking-widest mb-2 uppercase">
                                {project.year}
                            </span>
                            <span class="text-[9px] text-white/40 uppercase tracking-[0.3em] font-black">
                                {project.type}
                            </span>
                        </div>

                        <div class="lg:col-span-7">
                            <h2 class="text-4xl md:text-7xl font-black uppercase tracking-tighter group-hover/link:text-blue-600 group-hover/link:pl-4 transition-all duration-500 italic leading-[0.85]">
                                {project.title}
                            </h2>
                            <p class="text-gray-500 text-sm md:text-lg mt-4 font-bold uppercase tracking-widest opacity-60">
                                {project.client}
                            </p>
                        </div>

                        <div class="lg:col-span-2 flex justify-end">
                            <div class="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover/link:border-blue-600 transition-colors">
                                <svg class="w-6 h-6 md:w-8 md:h-8 text-white/10 group-hover/link:text-blue-600 group-hover/link:rotate-45 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                                    {@html project.icon}
                                </svg>
                            </div>
                        </div>
                    </a>
                </div>
            {/each}
        </div>
    </section>

    <section class="py-40 px-6 text-center bg-white text-black rounded-t-[3rem] md:rounded-t-[5rem]">
        <div class="reveal-init" use:reveal>
            <h3 class="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-12">
                Postanite dio <br> <span class="text-blue-600">Prestiža.</span>
            </h3>
            <a href="/contact" class="inline-flex items-center gap-6 px-16 py-8 bg-black text-white rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl">
                Zatražite Suradnju <span>→</span>
            </a>
        </div>
    </section>
</main>

<style>
    .text-stroke-white {
        -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
        color: transparent;
    }

    /* Reveal Init (Scroll) */
    .reveal-init {
        opacity: 0;
        transform: translateY(40px);
        transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
    }
    
    :global(.reveal-init.is-visible) {
        opacity: 1;
        transform: translateY(0);
    }

    h1, h2 {
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
</style>