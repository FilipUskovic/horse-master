<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { fade, fly, scale, slide } from 'svelte/transition';

    let photos = $state<any[]>([]);
    let uploading = $state(false);
    let title = $state("");
    let file = $state<File | null>(null);
    let previewUrl = $state<string | null>(null);

    // objave
    let newsPosts = $state<any[]>([]);
    let newsTitle = $state("");
    let newsContent = $state("");
    let newsFile = $state<File | null>(null);
    let newsPreviewUrl = $state<string | null>(null);
    let newsLoading = $state(false);

    let statusMessage = $state({ text: "", type: "" });


    onMount(() => {
        fetchPhotos();
        fetchNews();
    });

    // clear preview when compontnts die
    onDestroy(() => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        if (newsPreviewUrl) URL.revokeObjectURL(newsPreviewUrl);
    });

    // pgotos 
    async function fetchPhotos() {
        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error) photos = data || [];
    }

    function handleFileChange(e: Event) {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            // Brišemo stari preview ako postoji
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            
            file = target.files[0];
            previewUrl = URL.createObjectURL(file);
        }
    }

    async function uploadPhoto() {
        if (!file) return;
        uploading = true;
        statusMessage = { text: "Učitavanje slike...", type: "info" };

        try {
            const fileName = `${Date.now()}-${file.name}`;
            const { error: storageError } = await supabase.storage
                .from('photos')
                .upload(fileName, file);
            if (storageError) throw storageError;

            const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl(fileName);

            const { error: dbError } = await supabase
                .from('gallery')
                .insert([{ image_url: publicUrl, title: title }]);
            if (dbError) throw dbError;

            statusMessage = { text: "Slika je uspješno objavljena!", type: "success" };
            resetForm();
            await fetchPhotos();
        } catch (err: any) {
            statusMessage = { text: "Greška: " + err.message, type: "error" };
        } finally {
            uploading = false;
        }
    }

    function resetForm() {
        title = "";
        file = null;
        if (previewUrl) URL.revokeObjectURL(previewUrl); // clearing 
        previewUrl = null;
        const input = document.getElementById('image-upload') as HTMLInputElement;
        if (input) input.value = '';
    }

     async function deletePhoto(id: string, imageUrl: string) {
        if (!confirm('Obrisati sliku trajno?')) return;
        try {
            const fileName = imageUrl.split('/').pop();
            if (fileName) {
                await supabase.storage.from('photos').remove([fileName]);
            }
            await supabase.from('gallery').delete().eq('id', id);
            photos = photos.filter(p => p.id !== id);
        } catch (err) {
            statusMessage = { text: "Greška pri brisanju.", type: "error" };
        }
    }

    // news
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
            statusMessage = { text: "Naslov i sadržaj su obavezni!", type: "error" };
            return;
        }
        newsLoading = true;
        statusMessage = { text: "Objavljivanje novosti...", type: "info" };

        try {
            let finalImageUrl = null;

            // Ako korisnik želi sliku uz vijest
            if (newsFile) {
                const fileName = `news/${Date.now()}-${newsFile.name}`;
                await supabase.storage.from('photos').upload(fileName, newsFile);
                const { data } = supabase.storage.from('photos').getPublicUrl(fileName);
                finalImageUrl = data.publicUrl;
            }

            const { error } = await supabase.from('updates').insert([{
                title: newsTitle,
                content: newsContent,
                image_url: finalImageUrl
            }]);

            if (error) throw error;
            statusMessage = { text: "Novost uspješno objavljena!", type: "success" };
            resetNewsForm();
            await fetchNews();
        } catch (err: any) {
            statusMessage = { text: "Greška: " + err.message, type: "error" };
        } finally { newsLoading = false; }
    }

    function resetNewsForm() {
        newsTitle = ""; newsContent = ""; newsFile = null;
        if (newsPreviewUrl) URL.revokeObjectURL(newsPreviewUrl);
        newsPreviewUrl = null;
    }

    async function deleteNews(id: string, imageUrl: string | null) {
        if (!confirm('Obrisati vijest trajno?')) return;
        try {
            if (imageUrl) {
                const fileName = imageUrl.split('/').pop();
                if (fileName) await supabase.storage.from('photos').remove([`news/${fileName}`]);
            }
            await supabase.from('updates').delete().eq('id', id);
            newsPosts = newsPosts.filter(n => n.id !== id);
        } catch (err) { statusMessage = { text: "Greška pri brisanju.", type: "error" }; }
    }

    async function handleLogout() {
        await supabase.auth.signOut();
        window.location.href = '/login';
    }

   
</script>
<div class="min-h-screen bg-gray-100 pb-20 font-sans">
    <nav class="bg-white border-b border-gray-200 px-6 py-4 mb-8 shadow-sm">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <h1 class="text-xl font-black tracking-tighter text-gray-900 uppercase">
                HORSE<span class="text-blue-600">MASTER</span> <span class="text-gray-400 font-light ml-2">ADMIN</span>
            </h1>
            <button onclick={handleLogout} class="text-xs font-bold text-red-500 bg-red-50 px-4 py-2 rounded-lg">Odjava</button>
        </div>
    </nav>

    <main class="max-w-6xl mx-auto px-4 space-y-16">
        
        {#if statusMessage.text}
            <div transition:slide class="p-4 rounded-2xl font-bold text-center text-sm shadow-sm 
                {statusMessage.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}">
                {statusMessage.text}
            </div>
        {/if}

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div class="lg:col-span-1">
                <div class="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-8">
                    <h2 class="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Nova Slika</h2>
                    <div class="space-y-4">
                        <input type="text" bind:value={title} class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 outline-none focus:border-blue-600 transition" placeholder="Naslov slike...">
                        <input id="image-upload" type="file" onchange={handleFileChange} accept="image/*" class="hidden" />
                        <label for="image-upload" class="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer bg-gray-50 overflow-hidden">
                            {#if previewUrl} <img src={previewUrl} alt="Preview" class="w-full h-full object-cover" /> 
                            {:else} <span class="text-[10px] font-black text-gray-400 uppercase">Dodaj Sliku</span> {/if}
                        </label>
                        <button onclick={uploadPhoto} disabled={uploading || !file} class="w-full bg-blue-600 text-white font-black py-4 rounded-2xl uppercase text-xs">Objavi Sliku</button>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-2">
                <h2 class="text-xl font-black mb-6 uppercase tracking-tight">Aktivna Galerija ({photos.length})</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {#each photos as p (p.id)}
                        <div class="relative group aspect-square rounded-2xl overflow-hidden shadow-lg">
                            <img src={p.image_url} alt="" class="w-full h-full object-cover" />
                            <button onclick={() => deletePhoto(p.id, p.image_url)} class="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition">X</button>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 border-t pt-16 border-gray-200">
            <div class="lg:col-span-1">
                <div class="bg-gray-900 rounded-3xl p-8 shadow-xl text-white sticky top-8">
                    <h2 class="text-2xl font-black mb-6 uppercase tracking-tight">Nova Obavijest</h2>
                    <div class="space-y-4">
                        <input type="text" bind:value={newsTitle} class="w-full bg-white/10 border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500 transition text-white" placeholder="Naslov vijesti...">
                        <textarea bind:value={newsContent} rows="4" class="w-full bg-white/10 border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500 transition text-white resize-none" placeholder="Sadržaj obavijesti..."></textarea>
                        
                        <input id="news-upload" type="file" onchange={handleNewsFileChange} accept="image/*" class="hidden" />
                        <label for="news-upload" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer bg-white/5 hover:bg-white/10 overflow-hidden transition">
                            {#if newsPreviewUrl} <img src={newsPreviewUrl} alt="Preview" class="w-full h-full object-cover" /> 
                            {:else} <span class="text-[10px] font-black text-white/40 uppercase">Slika (Opcionalno)</span> {/if}
                        </label>
                        
                        <button onclick={uploadNews} disabled={newsLoading} class="w-full bg-white text-gray-900 font-black py-4 rounded-2xl uppercase text-xs hover:bg-blue-500 hover:text-white transition">Objavi Novost</button>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-2">
                <h2 class="text-xl font-black mb-6 uppercase tracking-tight">Popis Novosti ({newsPosts.length})</h2>
                <div class="space-y-4">
                    {#each newsPosts as post (post.id)}
                        <div class="bg-white p-6 rounded-[2rem] shadow-md border border-gray-100 flex gap-6 items-start">
                            {#if post.image_url}
                                <img src={post.image_url} alt="" class="w-24 h-24 rounded-2xl object-cover flex-shrink-0" />
                            {/if}
                            <div class="flex-grow">
                                <h3 class="font-black text-lg uppercase leading-tight">{post.title}</h3>
                                <p class="text-gray-500 text-sm mt-2 line-clamp-2">{post.content}</p>
                                <div class="flex justify-between items-center mt-4">
                                    <span class="text-[10px] font-bold text-gray-300 uppercase">{new Date(post.created_at).toLocaleDateString('hr-HR')}</span>
                                    <button onclick={() => deleteNews(post.id, post.image_url)} class="text-red-500 font-bold text-xs uppercase hover:underline">Obriši</button>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </main>
</div>