<script lang="ts">
    import { fade, fly, slide } from 'svelte/transition';
    import { onMount } from 'svelte';

    let visible = $state(false);
    onMount(() => {
        visible = true;
    });

    const values = [
        { title: 'Sigurnost', desc: 'Sustavi za nadzor i blablala.', icon: '🛡️' },
        { title: 'Dobrobit', desc: 'Pauze za vodu i hranjenje prema stručnim protokolima.', icon: '🐴' },
        { title: 'Licence', desc: 'Svi vozz nešto kenjam .', icon: '📜' }
    ];
</script>

<svelte:head>
    <title>O nama | Horse Master</title>
</svelte:head>

<section class="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900">
    <div class="absolute inset-0 z-0">
        <img 
            src="/images/image00001.jpeg" 
            alt="Background" 
            class="w-full h-full object-cover opacity-40 grayscale"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
    </div>
    
    <div class="relative z-10 text-center px-4">
        {#if visible}
            <h1 in:fly={{ y: -30, duration: 1000 }} class="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
                VIŠE OD <span class="text-blue-500">TRANSPORTA</span>
            </h1>
            <p in:fade={{ delay: 500, duration: 1000 }} class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
                Posvećeni sigurnom putovanju vaših šampiona, s ljubavlju i stručnošću koju zaslužuju.
            </p>
        {/if}
    </div>
</section>

<section class="py-24 bg-white relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-center gap-20">
            
            <div class="w-full lg:w-1/2 relative">
                <div class="absolute -top-4 -left-4 w-24 h-24 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div class="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-50">
                    <img 
                        src="/images/image00008.jpeg" 
                        alt="Horse Master Ekipa" 
                        class="w-full h-[550px] object-cover hover:scale-105 transition-transform duration-700"
                    />
                </div>
                <div class="absolute -bottom-10 -right-6 bg-blue-600 text-white p-8 rounded-3xl shadow-2xl transform rotate-3">
                    <p class="text-5xl font-black italic">100%</p>
                    <p class="text-xs uppercase tracking-widest font-bold opacity-80">Sigurna dostava</p>
                </div>
            </div>

            <div class="w-full lg:w-1/2 space-y-8">
                <div>
                    <span class="text-blue-600 font-black uppercase tracking-[0.2em] text-sm">Naša povijest</span>
                    <h2 class="text-4xl md:text-5xl font-black text-gray-900 leading-none mt-2">
                        STRUKA I STRAST <br><span class="text-gray-400 font-light italic">u pokretu.</span>
                    </h2>
                </div>

                <p class="text-gray-600 text-lg leading-relaxed">
                    Kao dugogodišnji jahači i natjecatelji, shvatili smo da na tržištu nedostaje usluga koja razumije **psihologiju konja** tijekom puta. Horse Master nije samo tvrtka za transport; to je projekt nastao iz potrebe za mirom i sigurnošću.
                </p>

                <div class="grid grid-cols-1 gap-4 pt-4">
                    {#each values as value}
                        <div class="flex items-center p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors group">
                            <span class="text-3xl mr-4 group-hover:scale-110 transition-transform">{value.icon}</span>
                            <div>
                                <h4 class="font-bold text-gray-900">{value.title}</h4>
                                <p class="text-sm text-gray-500">{value.desc}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-20 bg-gray-950 text-white">
    <div class="max-w-7xl mx-auto px-4">
        <div class="bg-blue-600 rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between shadow-3xl overflow-hidden relative">
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            
            <div class="relative z-10 max-w-lg">
                <h3 class="text-3xl md:text-4xl font-black mb-6 uppercase">Spremni za vašu sljedeću destinaciju?</h3>
                <p class="text-blue-100 text-lg mb-8">Nudimo lokalni i međunarodni prijevoz s najmodernijim kamionima u regiji.</p>
                <a href="/contact" class="bg-white text-blue-600 font-black px-10 py-4 rounded-full hover:bg-gray-100 transition shadow-xl uppercase tracking-widest text-sm active:scale-95">
                    Zatraži ponudu
                </a>
            </div>

            <div class="mt-12 md:mt-0 relative z-10 grid grid-cols-2 gap-8">
                <div class="text-center">
                    <p class="text-4xl font-black">24/7</p>
                    <p class="text-xs uppercase opacity-70">Podrška</p>
                </div>
                <div class="text-center">
                    <p class="text-4xl font-black">EU</p>
                    <p class="text-xs uppercase opacity-70">Pokrivenost</p>
                </div>
            </div>
        </div>
    </div>
</section>