<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { fade, fly, scale, slide } from 'svelte/transition';
    import { toast } from '$lib/toast.svelte'; 
    import ConfirmModal from '$lib/components/ConfirmModal.svelte';
    import { compressImage } from '$lib/imageUtils';

    // --- global states ---
    let uploadProgress = $state(0);
    let confirmShow = $state(false);
    let confirmTitle = $state("");
    let confirmMessage = $state("");
    let confirmAction = $state<() => void>(() => {});

    // --- gallery ---
    let photos = $state<any[]>([]);
    let uploading = $state(false);
    let title = $state("");
    let file = $state<File | null>(null);
    let previewUrl = $state<string | null>(null);

    // --- news ---
    let newsPosts = $state<any[]>([]);
    let newsTitle = $state("");
    let newsContent = $state("");
    let newsFile = $state<File | null>(null);
    let newsPreviewUrl = $state<string | null>(null);
    let newsLoading = $state(false);
    let editingId = $state<string | null>(null);

    onMount(() => {
        fetchPhotos();
        fetchNews();
    });

    onDestroy(() => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        if (newsPreviewUrl) URL.revokeObjectURL(newsPreviewUrl);
    });

    // --- modal actions ---
    function openConfirm(title: string, message: string, action: () => void) {
        confirmTitle = title;
        confirmMessage = message;
        confirmAction = action;
        confirmShow = true;
    }

    // --- gallery logic ---
    async function fetchPhotos() {
        const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
        if (!error) photos = data || [];
    }

    function handleFileChange(e: Event) {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            file = target.files[0];
            previewUrl = URL.createObjectURL(file);
        }
    }

    async function uploadPhoto() {
        if (!file) return;
        uploading = true;
        uploadProgress = 10;
        toast.add("Slanje slike...", "info");

        try {

            // compress
            const compressedBlob = await compressImage(file);

            const interval = setInterval(() => { if (uploadProgress < 90) uploadProgress += 5; }, 300);

            const fileName = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}.jpg`;   
                    
            const { error: storageError } = await supabase.storage
            .from('photos')
            .upload(fileName, compressedBlob, {
                contentType: 'image/jpeg'
            });

        if (storageError) throw storageError;

            clearInterval(interval);
            uploadProgress = 100;

            const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl(fileName);
            await supabase.from('gallery').insert([{ image_url: publicUrl, title: title }]);
            
            toast.add("Slika je u galeriji!", "success"); 
            resetForm();
            await fetchPhotos();
        } catch (err: any) {
            toast.add("Greška: " + err.message, "error"); 
        } finally { 
            uploading = false;
            setTimeout(() => uploadProgress = 0, 1000); 
        }
    }

    async function deletePhoto(id: string, imageUrl: string) {
        try {
            const fileName = imageUrl.split('/').pop();
            if (fileName) await supabase.storage.from('photos').remove([fileName]);
            await supabase.from('gallery').delete().eq('id', id);
            photos = photos.filter(p => p.id !== id);
            toast.add("Slika obrisana.", "success"); 
        } catch (err) { toast.add("Greška pri brisanju.", "error"); }
    }

    // --- news logic ---
    async function fetchNews() {
        const { data, error } = await supabase.from('updates').select('*').order('created_at', { ascending: false });
        if (!error) newsPosts = data || [];
    }

    function handleNewsFileChange(e: Event) {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            if (newsPreviewUrl) URL.revokeObjectURL(newsPreviewUrl);
            newsFile = target.files[0];
            newsPreviewUrl = URL.createObjectURL(newsFile);
        }
    }

    async function uploadNews() {
        if (!newsTitle || !newsContent) {
            toast.add("Popunite obavezna polja!", "error"); 
            return;
        }
        newsLoading = true;
        try {
            let finalImageUrl = newsPreviewUrl;
            if (newsFile) {
                const fileName = `news/${Date.now()}-${newsFile.name}`;
                await supabase.storage.from('photos').upload(fileName, newsFile);
                const { data } = supabase.storage.from('photos').getPublicUrl(fileName);
                finalImageUrl = data.publicUrl;
            }

            const payload = { title: newsTitle, content: newsContent, image_url: finalImageUrl };

            if (editingId) {
                const { error } = await supabase.from('updates').update(payload).eq('id', editingId);
                if (error) throw error;
                toast.add("Promjene spremljene!", "success"); 
            } else {
                const { error } = await supabase.from('updates').insert([payload]);
                if (error) throw error;
                toast.add("Novost objavljena!", "success"); 
            }

            resetNewsForm();
            await fetchNews();
        } catch (err: any) {
            toast.add("Greška: " + err.message, "error"); 
        } finally { newsLoading = false; }
    }

    async function deleteNews(id: string, imageUrl: string | null) {
        try {
            if (imageUrl) {
                const fileName = imageUrl.split('/').pop();
                if (fileName) await supabase.storage.from('photos').remove([`news/${fileName}`]);
            }
            await supabase.from('updates').delete().eq('id', id);
            newsPosts = newsPosts.filter(n => n.id !== id);
            toast.add("Vijest obrisana.", "success"); 
        } catch (err) { toast.add("Greška pri brisanju.", "error"); }
    }

    function editNews(post: any) {
        editingId = post.id;
        newsTitle = post.title;
        newsContent = post.content;
        newsPreviewUrl = post.image_url;

        // Koristimo getElementById za preciznost ili querySelector na roditelja
        const formElement = document.getElementById('news-form-container');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function resetForm() { title = ""; file = null; previewUrl = null; }
    function resetNewsForm() { editingId = null; newsTitle = ""; newsContent = ""; newsFile = null; newsPreviewUrl = null; }
    async function handleLogout() { await supabase.auth.signOut(); window.location.href = '/login'; }
</script>

<div class="min-h-screen bg-gray-100 pb-20 font-sans" in:fade> 
    <nav class="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 py-4 mb-8 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
        
        <a href="/" class="group flex items-center">
            <h1 class="text-lg sm:text-xl font-black tracking-tighter text-gray-900 uppercase">
                H<span class="text-blue-600">M</span><span class="hidden xs:inline">ORSEMASTER</span> 
                <span class="text-gray-400 font-light ml-1 sm:ml-2 text-[8px] sm:text-[10px] tracking-widest border-l pl-2 sm:pl-3 border-gray-200 uppercase">Admin</span>
            </h1>
        </a>
        
        <div class="flex items-center gap-2 sm:gap-4">
            <a href="/" class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors p-2 sm:px-4 sm:py-2 rounded-xl hover:bg-blue-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span class="hidden md:inline">Pogledaj stranicu</span> </a>

            <button onclick={handleLogout} class="group flex items-center gap-2 sm:gap-3 bg-gray-50 hover:bg-red-50 p-1.5 sm:pr-4 rounded-2xl transition-all duration-300 border border-gray-100 hover:border-red-100">
                <div class="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                </div>
                <span class="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-red-500 transition-colors">Odjava</span>
            </button>
        </div>
    </div>
    </nav>

    <main class="max-w-6xl mx-auto px-4 space-y-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div class="lg:col-span-1" in:fly={{ x: -30, duration: 600, delay: 200 }}>
                <div class="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24">
                    <h2 class="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Nova Slika</h2>
                    <div class="space-y-4">
                        <input type="text" bind:value={title} class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 outline-none focus:border-blue-600 transition" placeholder="Naslov slike...">
                        <input id="image-upload" type="file" onchange={handleFileChange} accept="image/*" class="hidden" />
                        <label for="image-upload" class="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer bg-gray-50 overflow-hidden hover:bg-gray-100 transition">
                            {#if previewUrl} <img src={previewUrl} alt="Preview" loading="lazy" decoding="async" class="w-full h-full object-cover" in:fade /> 
                            {:else} <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center px-4">Odaberi datoteku</span> {/if}
                        </label>
                        {#if uploading}
                            <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-2" transition:slide>
                                <div class="bg-blue-600 h-full transition-all duration-300" style="width: {uploadProgress}%"></div>
                            </div>
                        {/if}
                        <button onclick={uploadPhoto} disabled={uploading || !file} class="w-full bg-blue-600 text-white font-black py-4 rounded-2xl uppercase text-xs shadow-lg active:scale-95 transition disabled:opacity-50">Objavi Sliku</button>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-2">
                <h2 class="text-xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">Aktivna Galerija <span class="bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-[10px]">{photos.length}</span></h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {#each photos as p (p.id)}
                        <div class="relative group aspect-square rounded-2xl overflow-hidden shadow-lg" in:scale>
                            <img src={p.image_url} alt="" loading="lazy" decoding="async" class="w-full h-full object-cover" />
                            <button onclick={() => openConfirm("Obriši sliku?", "Trajno uklanjanje iz baze.", () => deletePhoto(p.id, p.image_url))} class="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition shadow-xl font-bold">✕</button>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 border-t pt-16 border-gray-200">
            <div id="news-form-container" class="lg:col-span-1" in:fly={{ x: -30, duration: 600, delay: 200 }}>
                <div class="bg-gray-900 rounded-3xl p-8 shadow-xl text-white sticky top-24">
                    <h2 class="text-2xl font-black mb-6 uppercase tracking-tight">
                        {editingId ? 'Uredi Obavijest' : 'Nova Obavijest'}
                    </h2>
                    <div class="space-y-4">
                        <input type="text" bind:value={newsTitle} class="w-full bg-white/10 border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500 transition text-white" placeholder="Naslov vijesti...">
                        <textarea bind:value={newsContent} rows="6" class="w-full bg-white/10 border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500 transition text-white resize-none" placeholder="Sadržaj..."></textarea>
                        
                        <input id="news-upload" type="file" onchange={handleNewsFileChange} accept="image/*" class="hidden" />
                        <label for="news-upload" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer bg-white/5 hover:bg-white/10 overflow-hidden transition">
                            {#if newsPreviewUrl} <img src={newsPreviewUrl} alt="Preview" loading="lazy" decoding="async" class="w-full h-full object-cover" in:fade /> 
                            {:else} <span class="text-[10px] font-black text-white/40 uppercase tracking-widest text-center px-4">Slika (Opcionalno)</span> {/if}
                        </label>
                        
                        <div class="flex gap-2">
                            <button onclick={uploadNews} disabled={newsLoading} class="flex-grow bg-white text-gray-900 font-black py-4 rounded-2xl uppercase text-xs hover:bg-blue-500 hover:text-white transition active:scale-95">
                                {newsLoading ? 'Spremanje...' : editingId ? 'Spremi Promjene' : 'Objavi Novost'}
                            </button>
                            {#if editingId}
                                <button onclick={resetNewsForm} class="bg-red-600 text-white px-5 rounded-2xl hover:bg-red-700 transition" in:scale>✕</button>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-2">
                <h2 class="text-xl font-black mb-6 uppercase tracking-tight">Popis Novosti ({newsPosts.length})</h2>
                <div class="space-y-4">
                    {#each newsPosts as post (post.id)}
                        <div class="bg-white p-6 rounded-[2rem] shadow-md border border-gray-100 flex gap-6 items-start hover:border-blue-200 transition-colors" in:fly={{ x: 20 }}>
                            {#if post.image_url}
                                <img src={post.image_url} alt="" loading="lazy" decoding="async" class="w-24 h-24 rounded-2xl object-cover flex-shrink-0" />
                            {/if}
                            <div class="flex-grow">
                                <h3 class="font-black text-lg uppercase leading-tight">{post.title}</h3>
                                <p class="text-gray-500 text-sm mt-2 line-clamp-2">{post.content}</p>
                                <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
                                    <span class="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{new Date(post.created_at).toLocaleDateString('hr-HR')}</span>
                                    <div class="flex gap-4">
                                        <button onclick={() => editNews(post)} class="text-blue-500 font-black text-[10px] uppercase hover:underline tracking-widest">Uredi</button>
                                        <button onclick={() => openConfirm("Obriši vijest?", "Trajno uklanjanje.", () => deleteNews(post.id, post.image_url))} class="text-red-500 font-bold text-[10px] uppercase hover:underline tracking-widest">Obriši</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </main>

    <ConfirmModal bind:show={confirmShow}
                  title={confirmTitle} 
                  message={confirmMessage} 
                  onConfirm={confirmAction} />
</div>