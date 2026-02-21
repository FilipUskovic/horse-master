<script lang="ts">
    import { fade, fly, scale } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { quintOut } from 'svelte/easing';
    import SEO from '$lib/components/SEO.svelte';
    import { t, locale } from 'svelte-i18n';

    let loaded = $state(false);
    let win = $state({ w: 0, h: 0 });
    let mouse = { x: 0, y: 0 };
    let lerpMouse = $state({ x: 0, y: 0 });
    let activeProject = $state<number | null>(null);

    onMount(() => {
        setTimeout(() => loaded = true, 100);

        let frame: number;
        const tick = () => {
            if (win.w > 1024) {
                // lerp logic
                lerpMouse.x += (mouse.x - lerpMouse.x) * 0.08;
                lerpMouse.y += (mouse.y - lerpMouse.y) * 0.08;
            }
            frame = requestAnimationFrame(tick);
        };
        tick();
        return () => cancelAnimationFrame(frame);
    });

    interface Project {
        year: string;
        title: string;
        title_en: string;
        client: string;
        client_en: string;
        link: string;
        type: string;
        type_en: string;
        icon: string;
    }

    const projects: Project[] = [
        {
            year: "2025—",
            title: "Ero s onoga svijeta",
            title_en: "Ero the Joker",
            client: "Hrvatsko narodno kazalište u Zagrebu",
            client_en: "Croatian National Theatre in Zagreb",
            link: "https://www.hnk.hr/hr/opera/predstave/ero-s-onoga-svijeta/",
            type: "Opera / Teatar",
            type_en: "Opera / Theatre",
            icon: `<path d="M11 5L1 12l10 7V5zM23 5l-10 7 10 7V5z" />`
        },
        {
            year: "2026",
            title: "Dioklecijan",
            title_en: "Diocletian",
            client: "HRT Povijesni spektakl",
            client_en: "HRT Historical Spectacle",
            link: "https://magazin.hrt.hr/kultura/hrt-ov-povijesni-spektakl-o-dioklecijanu-vjerojatno-najvaznija-osoba-s-nasih-prostora--12460626",
            type: "TV Produkcija",
            type_en: "TV Production",
            icon: `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />`
        },
        {
            year: "2013—",
            title: "Kravat pukovnija",
            title_en: "Cravat Regiment",
            client: "Počasna satnija",
            client_en: "Honorary Company",
            link: "https://www.kravatpukovnija.com/",
            type: "Povijesna postrojba",
            type_en: "Historical Unit",
            icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />`
        },
        {
            year: "Ref.",
            title: "Grad Novska",
            title_en: "City of Novska",
            client: "Gradska suradnja",
            client_en: "Municipal Cooperation",
            link: "#",
            type: "Institucija",
            type_en: "Institution",
            icon: `<path d="M3 21h18M3 10h18M5 10V21M19 10V21M9 21V10M15 21V10M12 3L2 10h20L12 3z" />`
        }
    ];

    function getField(p: Project, field: 'title' | 'client' | 'type') {
        if ($locale === 'en') return p[`${field}_en`];
        return p[field];
    }

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

<SEO title="{$t('portfolio.seo_title')} | HorseMaster Prestige" description={$t('portfolio.seo_desc')} />

<div class="fixed inset-0 pointer-events-none z-0">
    <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brandBlue/5 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brandDeep/20 blur-[120px] rounded-full"></div>
</div>

{#if loaded}
    <div in:fade={{ duration: 2000 }} class="fixed inset-0 pointer-events-none z-[900] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
{/if}

{#if activeProject !== null && win.w > 1024}
    <div 
        class="fixed z-[100] pointer-events-none flex items-center justify-center w-32 h-32 rounded-full bg-brandBlue/10 border border-brandBlue/30 shadow-[0_0_60px_rgba(37,99,235,0.2)] backdrop-blur-xl"
        style="left: {lerpMouse.x - 64}px; top: {lerpMouse.y - 64}px;"
        transition:scale={{ duration: 400, start: 0.5, easing: quintOut }}
    >
        <span class="text-[10px] font-black uppercase tracking-widest text-brandBlue animate-pulse italic">
            {$t('portfolio.cursor_view')}
        </span>
    </div>
{/if}

<main class="relative z-10 bg-brandDark text-brandLight min-h-screen selection:bg-brandBlue/30">
    
    <section class="pt-48 pb-24 px-6 max-w-[1400px] mx-auto border-b border-white/5">
        {#if loaded}
            <div class="space-y-6">
                <p in:fly={{ y: 20, duration: 1000, easing: quintOut }} class="text-brandBlue font-mono text-xs uppercase tracking-[0.6em] block">
                    {$t('portfolio.tag')}
                </p>
                <h1 in:fly={{ y: 50, duration: 1200, delay: 200, easing: quintOut }} class="text-[14vw] md:text-[10vw] font-black uppercase italic tracking-tighter leading-[0.85]">
                    {$t('portfolio.title_main')}<span class="text-transparent text-stroke-white blue-glow">{$t('portfolio.title_highlight')}</span>
                </h1>
            </div>
        {/if}
    </section>

    <section class="px-6 py-20 md:py-32 max-w-[1400px] mx-auto">
        <div class="divide-y divide-white/5">
            {#each projects as project, i}
                <div class="group relative py-12 md:py-24 reveal-init" use:reveal={i * 100}>
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group/link outline-none"
                        onmouseenter={() => activeProject = i}
                        onmouseleave={() => activeProject = null}
                        aria-label="View project: {getField(project, 'title')}"
                    >
                        <div class="lg:col-span-3 space-y-2">
                            <span class="block text-brandBlue font-mono text-xs tracking-widest uppercase">
                                {project.year}
                            </span>
                            <span class="block text-brandLight/30 text-[9px] font-black uppercase tracking-[0.3em]">
                                {getField(project, 'type')}
                            </span>
                        </div>

                        <div class="lg:col-span-7 transition-all duration-700 ease-[quintOut] group-hover/link:pl-6 md:group-hover/link:pl-10">
                            <h2 class="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none transition-colors duration-500 group-hover/link:text-brandBlue italic">
                                {getField(project, 'title')}
                            </h2>
                            <p class="text-brandLight/40 text-xs md:text-sm mt-6 font-bold uppercase tracking-[0.2em] opacity-60">
                                {getField(project, 'client')}
                            </p>
                        </div>

                        <div class="lg:col-span-2 flex justify-end">
                            <div class="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center transition-all duration-500 group-hover/link:border-brandBlue group-hover/link:bg-brandBlue/5 group-hover/link:rotate-45">
                                <svg class="w-6 h-6 text-brandLight/20 group-hover/link:text-brandBlue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
                                    {@html project.icon}
                                </svg>
                            </div>
                        </div>
                    </a>
                </div>
            {/each}
        </div>
    </section>

    <section class="py-32 md:py-48 px-6 text-center relative overflow-hidden rounded-t-[3rem] md:rounded-t-[6rem] border-t border-white/5">
        <div class="absolute inset-0 bg-brandBlue/[0.02] -z-10"></div>
        <div class="reveal-init space-y-12" use:reveal>
            <h3 class="text-6xl md:text-[9vw] font-black uppercase tracking-tighter italic leading-none text-brandLight">
                {$t('portfolio.cta_title')} <br> <span class="text-brandBlue blue-glow">{$t('portfolio.cta_highlight')}</span>
            </h3>
            
            <a href="/contact" class="group relative inline-flex items-center gap-6 px-16 py-8 bg-brandLight text-brandDark rounded-full font-black uppercase tracking-[0.4em] text-[10px] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
                <span class="relative z-10">{$t('portfolio.cta_btn')} &rarr;</span>
                <div class="absolute inset-0 bg-brandBlue translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[quintOut]"></div>
            </a>
        </div>
    </section>
</main>

<style>
    .text-stroke-white { -webkit-text-stroke: 1px rgba(240, 242, 245, 0.15); color: transparent; }
    .blue-glow { text-shadow: 0 0 20px rgba(37, 99, 235, 0.4); }
    .reveal-init { opacity: 0; transform: translateY(50px); transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
    :global(.reveal-init.is-visible) { opacity: 1; transform: translateY(0); }
    h1, h2, h3 { text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }
</style>