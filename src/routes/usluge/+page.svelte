<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { quintOut } from 'svelte/easing';
    import SEO from '$lib/components/SEO.svelte';

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

    const uslugeData = [
        {
            id: "film",
            title: "Konji u Filmu",
            text: "Brojni filmski klasici prepoznatljivi su upravo po gracioznosti konja u pojedinim scenama. Konji i njihova pojava daju svakom filmskom projektu posebnu ljepotu i ozbiljnost ali ujedno predstavlja i izazov uvježbavanja i pripreme konja za zahtjevne scene. Naše iskustvo na filmskim setovima daje nam mogućnost prilagodbe vašim potrebama i pripremu konja za najizazovnije scene.",
            img: "/images/konjfilm.jpg" 
        },
        {
            id: "spotovi",
            title: "Konji za Spotove i Reklame",
            text: "Pojava i gracioznost konja uklopit će se u svaki spot ili reklamu, ovisno o vašim željama. Ostvarite svoj sljedeći projekt ili ideju zajedno s nama na leđima konja i sve ostavite bez daha. U potpunosti se prilagođavamo vašim potrebama kako bi finalni proizvod izgledao savršeno.",
            img: "/images/odlspace.webp" 
        },
        {
            id: "fotografiranje",
            title: "Konji za Fotografiranje",
            text: "Stvorite neizbrisive uspomene s konjima. Bilo da se radi o rođendanu, važnoj obljetnici ili vašem vjenčanju - izabrat ćemo prekrasan ambijent za fotosession i imat ćete uspomene koje ostaju za cijeli život.",
            img: "/images/wedding.jpg"
        },
        {
            id: "setnje",
            title: "Šetnje na Konjima",
            text: "U sklopu vašega važnoga događaja možemo na vašoj lokaciji ponuditi šetnje na konjima za najmlađe, ali i one starije. Upotpunite svoj rođendan ili team-building na otvorenom šetnjom na konjima i budite jedinstveni.",
            img: "/images/djeca.jpg" 
        },
        {
            id: "prijevoz",
            title: "Prijevoz Konja",
            text: "Vršimo uslugu prijevoza konja na svim destinacijama. Obratite nam se s povjerenjem.",
            img: "/images/prijevoz.jpg" 
        },
        {
            id: "kaskaderi",
            title: "Kaskaderske Usluge",
            text: "Ponekad je za savršen rezultat potreban angažman profesionalaca - kaskadera - za najzahtjevnije zadaće s konjima. Obratite nam se s povjerenjem i svoje ideje pretvorite u stvarnost.",
            img: "/images/foto.jpg"
        }
    ];

    function reveal(node: HTMLElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    node.classList.add('is-visible');
                    observer.unobserve(node); // PREVENT LAG: Stop observing once visible!
                }
            });
        }, { threshold: 0.15 }); // Lower threshold for earlier trigger
        observer.observe(node);
        return { destroy: () => observer.disconnect() };
    }
</script>

<SEO title="Naše Usluge | HorseMaster Prestige" description="Detaljan pregled naših usluga s konjima. Konji za film, spotove, vjenčanja i prijevoz." />

<main class="bg-[#020202] text-white selection:bg-blue-600 w-full relative">

    <a 
        href="/" 
        class="fixed top-6 left-6 md:top-10 md:left-10 z-[100] w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 shadow-2xl group"
        aria-label="Povratak na početnu"
    >
        <svg class="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
    </a>

    <div class="fixed inset-0 pointer-events-none z-[50] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

    {#each uslugeData as usluga, i}
        <section id={usluga.id} class="relative w-full min-h-[100svh] flex items-center py-24 overflow-hidden border-b border-white/5">
            
            <div class="absolute inset-0 w-full h-full z-0">
                <img 
                    src={usluga.img} 
                    alt={usluga.title} 
                    loading={i === 0 ? "eager" : "lazy"} 
                    decoding="async"
                    class="w-full h-full object-cover object-center opacity-40 md:opacity-50 grayscale transition-[filter,transform] duration-[1.5s] ease-out hover:grayscale-0 hover:scale-105 will-change-transform" 
                />
                <div class="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/80 to-transparent"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/50"></div>
            </div>

            <div class="relative z-10 container mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                <div class="lg:col-span-8 flex flex-col justify-center reveal-block" use:reveal>
                    <span class="text-blue-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 md:mb-6 block drop-shadow-md">0{i+1} // Ekspertiza</span>
                    
                    <h2 class="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8 italic drop-shadow-xl">
                        {@html usluga.title.includes('Konji') ? usluga.title.replace('Konji', '<span class="text-transparent text-stroke-white">Konji</span>') : usluga.title}
                    </h2>

                    <div class="h-[2px] w-20 bg-blue-600 mb-8 md:mb-10 shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>

                    <p class="text-gray-300 text-lg md:text-2xl font-light leading-relaxed max-w-3xl drop-shadow-md">
                        {usluga.text}
                    </p>

                    <div class="mt-12 md:mt-16">
                        <a href="/contact" class="inline-flex items-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white hover:text-blue-500 transition-colors duration-300 group">
                            Zatražite ovu uslugu
                            <span class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-600/10 transition-all duration-300">
                                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7-7m7-7H3"/></svg>
                            </span>
                        </a>
                    </div>
                </div>

            </div>

            <div class="absolute right-10 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden xl:block opacity-[0.04] pointer-events-none select-none">
                <span class="text-[10vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap">{usluga.title}</span>
            </div>
        </section>
    {/each}

    <section class="py-40 px-6 text-center bg-blue-600 text-white relative z-20 overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div class="relative z-10 reveal-block" use:reveal>
            <h3 class="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-12 drop-shadow-xl">Spremni za <br> <span class="text-black">Suradnju?</span></h3>
            <a href="/contact" class="inline-block px-14 py-6 bg-black text-white rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 active:scale-95">
                Kontaktirajte nas
            </a>
        </div>
    </section>

</main>

<style>
    /* OPTIMIZED ANIMATION: Only animate opacity and transform, hardware accelerated */
    :global(.reveal-block) {
        opacity: 0;
        transform: translateY(30px); /* Changed to translateY for a more elegant reveal */
        transition: opacity 1s cubic-bezier(0.2, 1, 0.3, 1), transform 1s cubic-bezier(0.2, 1, 0.3, 1);
        will-change: opacity, transform;
    }
    
    :global(.reveal-block.is-visible) {
        opacity: 1;
        transform: translateY(0);
    }

    :global(html) {
        scroll-behavior: smooth;
        scrollbar-width: thin;
        scrollbar-color: #2563eb #020202;
    }
</style>