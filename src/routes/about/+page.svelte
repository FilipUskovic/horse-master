<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import SEO from '$lib/components/SEO.svelte';

    // --- STATE ---
    let loaded = $state(false);
    let scrollY = $state(0);
    let innerWidth = $state(0);
    let innerHeight = $state(0);
    
    // Mouse logic (Desktop)
    let mouse = { x: 0, y: 0 };
    let lerpMouse = $state({ x: 0, y: 0 });
    let isHoveringLink = $state(false);

    // --- LOGIC ---
    onMount(() => {
        setTimeout(() => loaded = true, 500);

        let frame: number;
        const tick = () => {
            // Lerp kursor samo na desktopu
            if (innerWidth > 1024) {
                lerpMouse.x += (mouse.x - lerpMouse.x) * 0.1;
                lerpMouse.y += (mouse.y - lerpMouse.y) * 0.1;
            }
            frame = requestAnimationFrame(tick);
        };
        tick();
        return () => cancelAnimationFrame(frame);
    });

    // Reveal Action (Intersection Observer)
    function reveal(node: HTMLElement, { delay = 0 } = {}) {
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

    // Ikone
    const icons = {
        film: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
        rings: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
        camera: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    };
</script>

<svelte:window 
    bind:scrollY 
    bind:innerWidth 
    bind:innerHeight
    on:mousemove={(e) => { mouse.x = e.clientX; mouse.y = e.clientY; }} 
/>

<SEO title="O nama | HorseMaster Prestige" description="Excellence defined." />

{#if !loaded}
    <div out:fade={{ duration: 500 }} class="fixed inset-0 z-[1000] bg-[#050505] flex items-center justify-center">
        <span class="text-white/20 font-black tracking-[0.5em] text-xs animate-pulse">LOADING</span>
    </div>
{/if}

<div class="fixed inset-0 pointer-events-none z-[900] opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

{#if innerWidth > 1024}
    <div 
        class="fixed z-[999] pointer-events-none rounded-full mix-blend-difference transition-all duration-300 ease-out flex items-center justify-center bg-white"
        style="
            left: {lerpMouse.x}px; 
            top: {lerpMouse.y}px; 
            width: {isHoveringLink ? 80 : 12}px; 
            height: {isHoveringLink ? 80 : 12}px; 
            transform: translate(-50%, -50%);
        "
    ></div>
{/if}

<main class="bg-[#050505] text-[#f0f0f0] overflow-x-hidden selection:bg-blue-600 selection:text-white">

    <section class="relative h-[85vh] md:h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        <div class="absolute inset-0 w-full h-full scale-110 will-change-transform" style="transform: translateY({scrollY * (innerWidth > 768 ? 0.4 : 0.15)}px)">
            <img 
                src="/images/image00001.jpeg" 
                alt="Hero Horse" 
                class="w-full h-full object-cover opacity-50 grayscale contrast-125"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#050505]"></div>
        </div>

        <div class="relative z-10 text-center px-4 mix-blend-difference">
            {#if loaded}
                <div class="overflow-hidden mb-4">
                    <p in:fly={{ y: 30, duration: 1000 }} class="text-blue-500 font-mono text-[10px] md:text-sm tracking-[0.4em] uppercase">
                        Est. 2014 &mdash; Zagreb
                    </p>
                </div>
                <h1 class="text-[15vw] md:text-[14vw] leading-[0.9] md:leading-[0.85] font-black tracking-tighter uppercase italic flex flex-col items-center">
                    <span class="overflow-hidden block">
                        <span in:fly={{ y: 150, duration: 1200, easing: quintOut }} class="block">Horse</span>
                    </span>
                    <span class="overflow-hidden block text-transparent text-stroke-white">
                        <span in:fly={{ y: 150, duration: 1200, delay: 150, easing: quintOut }} class="block">Master</span>
                    </span>
                </h1>
            {/if}
        </div>

        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
            <span class="text-[9px] uppercase tracking-widest">Scroll</span>
        </div>
    </section>

    <section class="py-20 md:py-40 px-6 max-w-[1400px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-end">
            <div class="lg:col-span-8 reveal-block" use:reveal>
                <p class="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.2] md:leading-[1.15] tracking-tight text-white/90">
                    Tvrtka HorseMaster već se više od desetljeća profesionalno bavi aktivnostima vezanima uz konje. 
                    <span class="text-blue-600 font-serif italic">Ove plemenite životinje naša su ljubav i poziv.</span>
                </p>
            </div>
            <div class="lg:col-span-4 reveal-block" use:reveal={{ delay: 200 }}>
                <p class="text-gray-400 text-sm md:text-base leading-relaxed border-l-2 border-blue-600/30 pl-6">
                    Tu smo da ih prilagodimo svim vašim potrebama i idejama. Velik broj uspješno realiziranih projekata i povjerenje zadovoljnih klijenata.
                </p>
            </div>
        </div>
    </section>

    <section class="px-4 md:px-6 pb-24 md:pb-32">
        <div class="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            
            <div class="group relative h-[65vh] md:h-[85vh] w-full rounded-[2rem] overflow-hidden bg-gray-900 reveal-block transition-transform duration-300 active:scale-[0.98]" use:reveal>
                
                <div class="absolute inset-0 overflow-hidden">
                    <img 
                        src="/images/image00007.jpeg" 
                        alt="Filmska produkcija" 
                        class="w-full h-full object-cover opacity-70 transition-transform duration-[1.5s] ease-out scale-100 group-hover:scale-105"
                    />
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                <div class="absolute bottom-0 left-0 p-8 md:p-14 w-full z-20">
                    <div class="flex items-center gap-3 mb-4 md:mb-6">
                        <span class="w-8 h-[1px] bg-blue-500"></span>
                        <span class="text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">Za Ekrane</span>
                    </div>
                    <h2 class="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 md:mb-6 text-white leading-none">
                        Produkcija<br>& Film
                    </h2>
                    
                    <div class="transform transition-all duration-500 opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                        <p class="text-gray-300 max-w-md text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                            Ako su vam konji potrebni za reklame, spotove ili filmove — mi smo tu za vas. Naši konji su istrenirani za set.
                        </p>
                    </div>

                    <div class="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icons.film} /></svg>
                    </div>
                </div>
            </div>

            <div class="relative h-auto md:h-[85vh] w-full rounded-[2rem] bg-[#0a0a0a] border border-white/5 p-8 md:p-14 flex flex-col justify-between reveal-block" use:reveal={{ delay: 150 }}>
                
                <div>
                    <span class="text-blue-500 font-mono text-[10px] md:text-xs uppercase tracking-widest mb-8 md:mb-10 block">Specijalne Prigode</span>
                    <h2 class="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-10 md:mb-12 text-white leading-none">
                        Eventi & <br><span class="text-stroke-white text-transparent">Uspomene</span>
                    </h2>

                    <div class="space-y-4">
                        <div class="group/item flex items-start gap-5 md:gap-6 p-5 md:p-6 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 active:bg-white/10 transition-all duration-300 cursor-default">
                            <div class="mt-1 w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 shrink-0 transition-colors group-hover/item:bg-blue-600 group-hover/item:text-white">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={icons.rings}/></svg>
                            </div>
                            <div>
                                <h3 class="text-lg md:text-xl font-bold uppercase tracking-wide mb-2 group-hover/item:text-blue-400 transition-colors">Vjenčanja</h3>
                                <p class="text-gray-400 text-sm leading-relaxed max-w-sm">
                                    Želite imati neizbrisive uspomene i photosession s vjenčanja uz konje?
                                </p>
                            </div>
                        </div>

                        <div class="group/item flex items-start gap-5 md:gap-6 p-5 md:p-6 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 active:bg-white/10 transition-all duration-300 cursor-default">
                            <div class="mt-1 w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 shrink-0 transition-colors group-hover/item:bg-blue-600 group-hover/item:text-white">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={icons.camera}/></svg>
                            </div>
                            <div>
                                <h3 class="text-lg md:text-xl font-bold uppercase tracking-wide mb-2 group-hover/item:text-blue-400 transition-colors">Privatni Photosession</h3>
                                <p class="text-gray-400 text-sm leading-relaxed max-w-sm">
                                    Bilo koja svrha snimanja ili jednostavno ljubav prema fotografiji.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-12 md:mt-0 pt-8 border-t border-white/10 flex justify-between items-end">
                    <p class="text-gray-500 text-[10px] md:text-xs font-mono uppercase max-w-[200px]">
                        Prilagođavamo se svim vašim potrebama i idejama.
                    </p>
                    <span class="text-3xl md:text-4xl text-blue-600 animate-pulse">✦</span>
                </div>
            </div>

        </div>
    </section>

    <section class="py-24 md:py-40 bg-blue-600 text-black rounded-t-[3rem] md:rounded-t-[4rem] relative overflow-hidden z-20">
        <div class="container mx-auto px-6 text-center relative z-10">
            
            <p class="text-xs md:text-base font-bold uppercase tracking-[0.3em] mb-10 md:mb-12 opacity-70">
                Obratite nam se s povjerenjem
            </p>

            <div class="relative inline-block group">
                <h2 class="text-[12vw] leading-[0.8] font-black uppercase italic tracking-tighter mb-12 md:mb-16 relative z-10 transition-transform duration-500 group-hover:skew-x-6">
                    Budite na <br> <span class="text-white drop-shadow-xl block mt-2">Konju.</span>
                </h2>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/0 blur-3xl rounded-full group-hover:bg-white/20 transition-all duration-500 -z-10"></div>
            </div>

            <br>

            <a 
                href="/contact" 
                class="relative inline-flex items-center gap-4 md:gap-6 px-10 py-5 md:px-12 md:py-6 bg-black text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl group/btn"
                onmouseenter={() => isHoveringLink = true}
                onmouseleave={() => isHoveringLink = false}
            >
                <span class="relative z-10 text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] group-hover/btn:text-blue-500 transition-colors">Započnimo Suradnju</span>
                <span class="relative z-10 text-xl md:text-2xl transition-transform group-hover/btn:translate-x-2">→</span>
            </a>
        </div>
        
        <div class="absolute bottom-4 left-0 w-full text-center text-[10px] uppercase font-bold text-black/40">
            &copy; 2024 HorseMaster Prestige
        </div>
    </section>

</main>

<style>
    /* UTILS */
    .text-stroke-white {
        -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        color: transparent;
    }

    /* REVEAL ANIMATION */
    :global(.reveal-block) {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.2, 1, 0.3, 1);
    }
    :global(.reveal-block.is-visible) {
        opacity: 1;
        transform: translateY(0);
    }

    /* SCROLLBAR */
    :global(::-webkit-scrollbar) { width: 6px; }
    :global(::-webkit-scrollbar-track) { background: #050505; }
    :global(::-webkit-scrollbar-thumb) { background: #2563eb; border-radius: 10px; }
</style>