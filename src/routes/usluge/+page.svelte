<script lang="ts">
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { quintOut } from 'svelte/easing';
    import SEO from '$lib/components/SEO.svelte';
    import { t, locale } from 'svelte-i18n';

    let loaded = $state(false);

    onMount(() => {
        setTimeout(() => loaded = true, 100);
        
        const hash = window.location.hash;
        if (hash) {
            const el = document.querySelector(hash);
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 500);
            }
        }
    });

    interface Usluga {
        id: string;
        title: string;
        title_en: string;
        text: string;
        text_en: string;
        img: string;
    }

    const uslugeData: Usluga[] = [
        {
            id: "film",
            title: "Konji u Filmu",
            title_en: "Horses in Film",
            text: "Brojni filmski klasici prepoznatljivi su upravo po gracioznosti konja u pojedinim scenama. Konji i njihova pojava daju svakom filmskom projektu posebnu ljepotu i ozbiljnost ali ujedno predstavlja i izazov uvježbavanja i pripreme konja za zahtjevne scene. Naše iskustvo na filmskim setovima daje nam mogućnost prilagodbe vašim potrebama i pripremu konja za najizazovnije scene.",
            text_en: "Many film classics are recognizable by the grace of horses in specific scenes. Horses give every film project special beauty and seriousness, but also represent a challenge in training and preparation. Our experience on film sets allows us to adapt to your needs and prepare horses for the most demanding scenes.",
            img: "/images/konjfilm.jpg" 
        },
        {
            id: "spotovi",
            title: "Konji za Spotove i Reklame",
            title_en: "Horses for Music Videos & Ads",
            text: "Pojava i gracioznost konja uklopit će se u svaki spot ili reklamu, ovisno o vašim željama. Ostvarite svoj sljedeći projekt ili ideju zajedno s nama na leđima konja i sve ostavite bez daha. U potpunosti se prilagođavamo vašim potrebama kako bi finalni proizvod izgledao savršeno.",
            text_en: "The presence and grace of horses fit into any music video or commercial. Realize your next project with us on horseback and leave everyone breathless. We fully adapt to your needs so the final product looks perfect.",
            img: "/images/odlspace.webp" 
        },
        {
            id: "fotografiranje",
            title: "Konji za Fotografiranje",
            title_en: "Horses for Photoshoots",
            text: "Stvorite neizbrisive uspomene s konjima. Bilo da se radi o rođendanu, važnoj obljetnici ili vašem vjenčanju - izabrat ćemo prekrasan ambijent za fotosession i imat ćete uspomene koje ostaju za cijeli život.",
            text_en: "Create indelible memories with horses. Whether it's a birthday, important anniversary, or your wedding - we will choose a beautiful setting for the photoshoot and you'll have memories that last a lifetime.",
            img: "/images/wedding.jpg"
        },
        {
            id: "setnje",
            title: "Šetnje Konja",
            title_en: "Horseback Rides",
            text: "U sklopu vašega važnoga događaja možemo na vašoj lokaciji ponuditi šetnje na konjima za najmlađe, ali i one starije. Upotpunite svoj rođendan ili team-building na otvorenom šetnjom na konjima i budite jedinstveni.",
            text_en: "As part of your important event, we can offer horseback rides at your location for the youngest and the oldest. Complete your birthday or team-building with an outdoor horse ride and be unique.",
            img: "/images/djeca.jpg" 
        },
        {
            id: "prijevoz",
            title: "Prijevoz Konja",
            title_en: "Horse Transport",
            text: "Vršimo uslugu prijevoza konja na svim destinacijama. Obratite nam se s povjerenjem.",
            text_en: "We provide horse transport services to all destinations. Contact us with confidence.",
            img: "/images/prijevoz.jpg" 
        },
        {
            id: "kaskaderi",
            title: "Kaskaderske Usluge",
            title_en: "Stunt Services",
            text: "Ponekad je za savršen rezultat potreban angažman profesionalaca - kaskadera - za najzahtjevnije zadaće s konjima. Obratite nam se s povjerenjem i svoje ideje pretvorite u stvarnost.",
            text_en: "Sometimes a perfect result requires professional stunt performers for the most demanding tasks with horses. Turn your ideas into reality with our professional team.",
            img: "/images/foto.jpg"
        }
    ];

    function getTitle(u: Usluga) {
        return $locale === 'en' ? u.title_en : u.title;
    }
    
    function getText(u: Usluga) {
        return $locale === 'en' ? u.text_en : u.text;
    }

    // Specijalna logika za bojanje riječi "Konji" ili "Horses"
    function formatTitle(u: Usluga) {
        const title = getTitle(u);
        const keyword = $locale === 'en' ? 'Horses' : 'Konji';
        if (title.includes(keyword)) {
            return title.replace(keyword, `<span class="text-transparent text-stroke-white">${keyword}</span>`);
        }
        return title;
    }

    function reveal(node: HTMLElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    node.classList.add('is-visible');
                    observer.unobserve(node); 
                }
            });
        }, { threshold: 0.15 }); 
        observer.observe(node);
        return { destroy: () => observer.disconnect() };
    }
</script>

<SEO title="{$t('services_page.seo_title')} | HorseMaster Prestige" description={$t('services_page.seo_desc')} />

<main class="bg-[#020202] text-white selection:bg-blue-600 w-full relative">

    {#if loaded}
        <a 
            in:fly={{ x: -30, duration: 800, easing: quintOut }}
            href="/" 
            class="fixed top-6 left-6 md:top-10 md:left-10 z-[100] w-12 h-12 md:w-16 md:h-16 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] group"
            aria-label={$t('services_page.aria_back')}
        >
            <svg class="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </a>
    {/if}

    <div class="fixed inset-0 pointer-events-none z-[50] opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

    {#each uslugeData as usluga, i}
        <section id={usluga.id} class="relative w-full min-h-[100svh] flex items-center py-24 border-b border-white/5 overflow-hidden">
            
            <div class="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <img 
                    src={usluga.img} 
                    alt={getTitle(usluga)} 
                    loading={i === 0 ? "eager" : "lazy"} 
                    decoding="async"
                    class="w-full h-full object-cover object-center opacity-60 md:opacity-75 grayscale-[50%] transition-[filter,transform,opacity] duration-[1.5s] ease-out lg:hover:grayscale-0 lg:hover:scale-105 lg:hover:opacity-100 will-change-transform" 
                />
                <div class="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/60 to-transparent w-[100%] md:w-[70%] pointer-events-none"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent md:hidden pointer-events-none"></div>
            </div>

            <div class="relative z-10 container mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pointer-events-none">
                
                <div class="lg:col-span-8 flex flex-col justify-center reveal-block" use:reveal>
                    <span class="text-blue-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 md:mb-6 block drop-shadow-md">
                        0{i+1} // {$t('services_page.expertise_tag')}
                    </span>
                    
                    <h2 class="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8 italic drop-shadow-2xl">
                        {@html formatTitle(usluga)}
                    </h2>

                    <div class="h-[3px] w-24 bg-blue-600 mb-8 md:mb-10 shadow-[0_0_15px_rgba(37,99,235,0.6)]"></div>

                    <p class="text-gray-200 text-lg md:text-2xl font-light leading-relaxed max-w-3xl drop-shadow-xl bg-black/20 p-4 rounded-xl backdrop-blur-[2px] md:bg-transparent md:p-0 md:backdrop-blur-none border border-white/5 md:border-none pointer-events-auto">
                        {getText(usluga)}
                    </p>

                    <div class="mt-12 md:mt-16 pointer-events-auto">
                        <a href="/contact" class="inline-flex items-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white hover:text-blue-500 transition-colors duration-300 group bg-black/40 md:bg-transparent p-2 md:p-0 pr-6 md:pr-0 rounded-full md:rounded-none backdrop-blur-md md:backdrop-blur-none border border-white/10 md:border-none">
                            <span class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-600/20 transition-all duration-300 bg-black/50 md:bg-transparent">
                                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7-7m7-7H3"/></svg>
                            </span>
                            {$t('services_page.btn_request')}
                        </a>
                    </div>
                </div>

            </div>

            <div class="absolute right-10 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden xl:block opacity-[0.06] pointer-events-none select-none mix-blend-overlay">
                <span class="text-[12vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap">
                    {getTitle(usluga)}
                </span>
            </div>
        </section>
    {/each}

    <section class="py-40 px-6 text-center bg-blue-600 text-white relative z-20 overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div class="relative z-10 reveal-block" use:reveal>
            <h3 class="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-12 drop-shadow-xl">
                {$t('services_page.cta_title')} <br> <span class="text-black">{$t('services_page.cta_highlight')}</span>
            </h3>
            <a href="/contact" class="inline-block px-14 py-6 bg-black text-white rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 active:scale-95">
                {$t('services_page.cta_btn')}
            </a>
        </div>
    </section>

</main>

<style>
    :global(.reveal-block) { opacity: 0; transform: translateY(30px); transition: opacity 1s cubic-bezier(0.2, 1, 0.3, 1), transform 1s cubic-bezier(0.2, 1, 0.3, 1); will-change: opacity, transform; }
    :global(.reveal-block.is-visible) { opacity: 1; transform: translateY(0); }
    :global(html) { scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: #2563eb #020202; }
    a { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
</style>