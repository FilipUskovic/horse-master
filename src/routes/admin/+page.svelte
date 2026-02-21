<script lang="ts">
  import { onDestroy } from "svelte";
  import { supabase } from "$lib/supabase";
  import { fade, fly, scale, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { toast } from "$lib/toast.svelte";
  import ConfirmModal from "$lib/components/ConfirmModal.svelte";
  import { compressImage } from "$lib/ImageUtils";
  import RichEditor from "$lib/components/RichEditor.svelte";
  import { invalidateAll } from "$app/navigation";
  import { t } from "svelte-i18n";
  import { dndzone } from 'svelte-dnd-action';

  // fetch data form ts file
  let { data } = $props();

  // --- Globalni states---
  let uploadProgress = $state(0);
  let confirmShow = $state(false);
  let confirmTitle = $state("");
  let confirmMessage = $state("");
  let confirmAction = $state<() => void>(() => {});

  // --- Forme fallery ---
  let uploading = $state(false);
  let title = $state("");
  let titleEn = $state(""); 
  let description = $state("");
  let descriptionEn = $state(""); 
  let file = $state<File | null>(null);
  let previewUrl = $state<string | null>(null);

  // --- Forme news ---
  let newsTitle = $state("");
  let newsTitleEn = $state(""); 
  let newsContent = $state("");
  let newsContentEn = $state(""); 
  let newsFile = $state<File | null>(null);
  let newsPreviewUrl = $state<string | null>(null);
  let newsLoading = $state(false);
  let editingId = $state<string | null>(null);
  let editorKey = $state(0);


  const flipDurationMs = 300;
  let galleryItems = $state<{id: string, image_url: string, title: string, display_order: number}[]>([]);
  $effect(() => {
    galleryItems = [...data.photos].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
});

  onDestroy(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (newsPreviewUrl) URL.revokeObjectURL(newsPreviewUrl);
  });


  async function refreshData() {
    await invalidateAll();
  }

  function openConfirm(titleKey: string, messageKey: string, action: () => void) {
    confirmTitle = $t(titleKey);
    confirmMessage = $t(messageKey);
    confirmAction = action;
    confirmShow = true;
  }

  // --- pohotos adn new logic---
  function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      file = target.files[0];
      previewUrl = URL.createObjectURL(file);
    }
  }

  function handleNewsFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      if (newsPreviewUrl) URL.revokeObjectURL(newsPreviewUrl);
      newsFile = target.files[0];
      newsPreviewUrl = URL.createObjectURL(newsFile);
    }
  }

  function removeNewsImage(e: Event) {
    e.preventDefault();
    newsPreviewUrl = null;
    newsFile = null;
  }


  async function uploadPhoto() {
    if (!file) {
        toast.add("toast.required", "error");
        return;
    }

    uploading = true;
    uploadProgress = 5; 
    toast.add("toast.uploading", "info");

    try {
      const compressedBlob = await compressImage(file);
      
      const interval = setInterval(() => {
        if (uploadProgress < 92) {
          uploadProgress += (Math.random() * 7); 
        }
      }, 250);

      const fileName = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}.jpg`;

      const { error: storageError } = await supabase.storage
        .from("photos")
        .upload(fileName, compressedBlob, { contentType: "image/jpeg" });

      if (storageError) throw storageError;

      clearInterval(interval);
      uploadProgress = 100; 

      const { data: { publicUrl } } = supabase.storage.from("photos").getPublicUrl(fileName);
      await supabase.from("gallery").insert([{ 
        image_url: publicUrl, 
        title, 
        title_en: titleEn,
        description,
        description_en: descriptionEn 
      }]);

      toast.add("toast.gallery_saved", "success");
      resetForm();
      await refreshData();

    } catch (err: any) {
      toast.add("toast.error_baza", "error");
    } finally {
      setTimeout(() => {
        uploading = false;
        uploadProgress = 0;
      }, 800);
    }
  }

  async function deletePhoto(id: string, imageUrl: string) {
    try {
      const fileName = imageUrl.split("/").pop();
      if (fileName) await supabase.storage.from("photos").remove([fileName]);
      await supabase.from("gallery").delete().eq("id", id);
      toast.add("toast.gallery_deleted", "success");
      await refreshData();
    } catch (err) {
      toast.add("toast.error_baza", "error");
    }
  }

  function resetForm() {
     title = ""; titleEn = ""; description = ""; descriptionEn = ""; 
    file = null; previewUrl = null;
    }

  async function uploadNews() {
    if (!newsTitle || !newsContent) {
      toast.add("toast.required", "error");
      return;
    }
    newsLoading = true;
    try {
      let finalImageUrl = newsPreviewUrl;
      if (newsFile) {
        const fileName = `news/${Date.now()}-${newsFile.name}`;
        await supabase.storage.from("photos").upload(fileName, newsFile);
        const { data } = supabase.storage.from("photos").getPublicUrl(fileName);
        finalImageUrl = data.publicUrl;
      }

      const payload = { 
        title: newsTitle, title_en: newsTitleEn, 
        content: newsContent, content_en: newsContentEn, 
        image_url: finalImageUrl 
      };

      if (editingId) {
        await supabase.from("updates").update(payload).eq("id", editingId);
        toast.add("toast.news_updated", "success");
      } else {
        await supabase.from("updates").insert([payload]);
        toast.add("toast.news_saved", "success");
      }
      resetNewsForm();
      await refreshData();
    } catch (err: any) {
      toast.add("toast.error_baza", "error");
    } finally {
      newsLoading = false;
    }
  }

  async function deleteNews(id: string, imageUrl: string | null) {
    try {
      if (imageUrl) {
        const fileName = imageUrl.split("/").pop();
        if (fileName) await supabase.storage.from("photos").remove([`news/${fileName}`]);
      }
      await supabase.from("updates").delete().eq("id", id);
      toast.add("toast.news_deleted", "success");
      await refreshData();
    } catch (err) {
      toast.add("toast.error_baza", "error");
    }
  }

  function editNews(post: any) {
    editingId = post.id; 
    newsTitle = post.title; 
    newsTitleEn = post.title_en || "";
    newsContent = post.content;
    newsContentEn = post.content_en || "";
    newsPreviewUrl = post.image_url;
    editorKey++; 
    document.getElementById("news-form-container")?.scrollIntoView({ behavior: "smooth" });
  }

  function resetNewsForm() { 
    editingId = null; newsTitle = ""; newsTitleEn = ""; newsContent = ""; newsContentEn = ""; 
    newsFile = null; newsPreviewUrl = null; editorKey++;
  }
  
  async function handleLogout() { 
    await supabase.auth.signOut(); 
    window.location.href = "/login"; 
  }


  // drag n drop
  function handleDndConsider(e: CustomEvent<any>) {
    galleryItems = e.detail.items;
}

async function handleDndFinalize(e: CustomEvent<any>) {
    galleryItems = e.detail.items;
    
    toast.add("toast.uploading", "info");
    
    try {
        // Azuriramo display_order za svaku sliku u bazi
        await Promise.all(galleryItems.map((item, index) => 
            supabase.from("gallery").update({ display_order: index }).eq("id", item.id)
        ));
        
        toast.add("toast.saved", "success");
    } catch (err) {
        toast.add("toast.error_baza", "error");
    }
}

</script>

<div class="min-h-screen bg-brandDark text-brandLight font-sans pb-20 relative overflow-hidden" in:fade>
  
  <div class="fixed inset-0 pointer-events-none z-0">
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brandBlue/5 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brandDeep/20 blur-[120px] rounded-full"></div>
  </div>

  <nav class="bg-brandDark/40 backdrop-blur-xl border-b border-white/5 px-6 py-5 mb-12 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <h1 class="text-xl font-black tracking-tighter uppercase italic">
          HORSE<span class="text-brandBlue blue-glow">MASTER</span>
          <span class="text-white/20 font-mono ml-4 text-[10px] tracking-[0.4em] border-l border-white/10 pl-4 uppercase not-italic">Admin</span>
      </h1>
      <div class="flex items-center gap-6">
        <a href="/" class="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-brandBlue transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            {$t('admin.nav_site')}
        </a>
        <button onclick={handleLogout} class="text-[10px] font-black uppercase tracking-[0.3em] text-red-500/60 hover:text-red-500 transition-colors flex items-center gap-2" aria-label="Odjavi se">
            {$t('admin.nav_logout')}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
        </button>
      </div>
    </div>
  </nav>

  <main class="max-w-7xl mx-auto px-6 space-y-24 relative z-10">
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div class="lg:col-span-4">
        <div class="glass-card rounded-[2.5rem] p-8 space-y-8 sticky top-32">
          <h2 class="text-3xl font-black uppercase italic tracking-tighter text-white">{$t('admin.gallery_new')}</h2>
          <div class="space-y-6">
            
            <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                    <label for="img-title-hr" class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] ml-2">{$t('admin.label_title_hr')}</label>
                    <input id="img-title-hr" type="text" bind:value={title} class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium outline-none focus:border-brandBlue transition-all text-white" placeholder="..." />
                </div>
                <div class="space-y-2">
                    <label for="img-title-en" class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] ml-2">{$t('admin.label_title_en')}</label>
                    <input id="img-title-en" type="text" bind:value={titleEn} class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium outline-none focus:border-brandBlue transition-all text-white opacity-60" placeholder="..." />
                </div>
            </div>

            <div class="space-y-2">
                <span class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] ml-2 block">{$t('admin.label_desc_hr')}</span>
                <textarea bind:value={description} class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium outline-none focus:border-brandBlue transition-all text-white h-20" placeholder="..."></textarea>
            </div>

             <div class="space-y-2">
                <span class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] ml-2 block">{$t('admin.label_desc_en')}</span>
                <textarea bind:value={descriptionEn} class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium outline-none focus:border-brandBlue transition-all text-white h-20 opacity-60" placeholder="..."></textarea>
            </div>

            <input id="image-upload" type="file" onchange={handleFileChange} accept="image/*" class="hidden" />
            <label for="image-upload" class="relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-white/5 rounded-[2rem] cursor-pointer bg-white/[0.02] hover:bg-brandBlue/5 transition-all overflow-hidden group">
              {#if previewUrl}
                <img src={previewUrl} alt="Preview" class="w-full h-full object-cover" />
              {:else}
                <span class="text-[10px] font-black text-white/20 uppercase tracking-widest text-center">{$t('admin.label_photo_req')}</span>
              {/if}
            </label>

            {#if uploading}
                <div class="w-full bg-white/5 h-1 rounded-full overflow-hidden" transition:slide>
                    <div class="bg-brandBlue h-full transition-all duration-300 shadow-[0_0_10px_rgba(37,99,235,0.5)]" style="width: {uploadProgress}%"></div>
                </div>
            {/if}

            <button onclick={uploadPhoto} disabled={uploading} class="group relative w-full bg-brandBlue text-white font-black py-5 rounded-2xl uppercase text-[10px] tracking-[0.3em] overflow-hidden transition-all active:scale-95 disabled:opacity-30">
                <span class="relative z-10">{uploading ? '...' : $t('admin.btn_publish')}</span>
                <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[quintOut]"></div>
            </button>
          </div>
        </div>
      </div>
      
      <div class="lg:col-span-8">
        <h2 class="text-xl font-black uppercase tracking-widest italic text-white/40 mb-8 flex items-center gap-4">
            {$t('admin.gallery_active')} <span class="text-[10px] font-mono bg-brandBlue/10 text-brandBlue px-3 py-1 rounded-full not-italic tracking-normal">{galleryItems.length}</span>
        </h2>
        
        <div 
          use:dndzone={{items: galleryItems, flipDurationMs}} 
          onconsider={handleDndConsider} 
          onfinalize={handleDndFinalize} 
          class="grid grid-cols-2 md:grid-cols-3 gap-6 min-h-[200px]"
        >
          {#each galleryItems as p (p.id)}
            <div class="group relative aspect-square rounded-[2rem] overflow-hidden bg-white/5 border border-white/5 cursor-grab active:cursor-grabbing" in:scale={{ duration: 600, easing: quintOut }}>
              <img src={p.image_url} alt={p.title} class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 pointer-events-none" />
              <button onclick={() => openConfirm('modal.title', 'modal.message', () => deletePhoto(p.id, p.image_url))} 
                      class="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-2xl"
                      title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-24 border-t border-white/5">
      <div id="news-form-container" class="lg:col-span-5">
        <div class="glass-card rounded-[3rem] p-10 space-y-10 sticky top-32">
          <h2 class="text-3xl font-black uppercase italic tracking-tighter text-white">{editingId ? $t('admin.news_edit') : $t('admin.news_new')}</h2>
          <div class="space-y-8">
            <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                    <label for="news-title-hr-input" class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] ml-2">{$t('admin.label_title_hr')} *</label>
                    <input id="news-title-hr-input" type="text" bind:value={newsTitle} class="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-brandLight outline-none focus:border-brandBlue transition-all" placeholder="..." />
                </div>
                 <div class="space-y-2">
                    <label for="news-title-en-input" class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] ml-2">{$t('admin.label_title_en')}</label>
                    <input id="news-title-en-input" type="text" bind:value={newsTitleEn} class="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-brandLight outline-none focus:border-brandBlue transition-all opacity-60" placeholder="..." />
                </div>
            </div>

            <div class="space-y-4">
              <span class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] ml-2 block">{$t('admin.label_content_hr')} *</span>
              <div class="bg-white/5 rounded-3xl overflow-hidden border border-white/5">
                {#key editorKey} <RichEditor bind:value={newsContent} /> {/key}
              </div>
            </div>

             <div class="space-y-4">
              <span class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] ml-2 block">{$t('admin.label_content_en')}</span>
              <div class="bg-white/5 rounded-3xl overflow-hidden border border-white/5 opacity-60">
                {#key editorKey} <RichEditor bind:value={newsContentEn} /> {/key}
              </div>
            </div>

            <input id="news-upload" type="file" onchange={handleNewsFileChange} accept="image/*" class="hidden" />
            <label for="news-upload" class="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/5 rounded-[2rem] cursor-pointer bg-white/[0.02] hover:bg-brandBlue/5 transition-all overflow-hidden group">
              {#if newsPreviewUrl}
                <img src={newsPreviewUrl} alt="Preview" class="w-full h-full object-cover" />
                <button onclick={removeNewsImage} class="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-md z-10 transition-all active:scale-90" title="Ukloni sliku">✕</button>
              {:else}
                <span class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">{$t('admin.label_photo_opt')}</span>
              {/if}
            </label>
            <div class="flex gap-4">
              <button onclick={uploadNews} disabled={newsLoading} class="group relative flex-grow bg-brandLight text-brandDark font-black py-6 rounded-2xl uppercase text-[10px] tracking-[0.4em] overflow-hidden transition-all active:scale-95 disabled:opacity-30">
                <span class="relative z-10">{newsLoading ? "..." : $t('admin.btn_save')}</span>
                <div class="absolute inset-0 bg-brandBlue translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[quintOut]"></div>
              </button>
              {#if editingId}
                <button onclick={resetNewsForm} class="bg-red-500/10 text-red-500 px-6 rounded-2xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">✕</button>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-7 space-y-8">
        <h2 class="text-xl font-black uppercase tracking-widest italic text-white/40 mb-10">{$t('admin.news_archive')}</h2>
        <div class="space-y-6">
          {#each data.newsPosts as post (post.id)}
            <div class="group bg-brandDeep/10 p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row gap-8 items-start hover:border-brandBlue/30 transition-all duration-500" in:fly={{ x: 20 }}>
              {#if post.image_url}
                <img src={post.image_url} alt="" class="w-full md:w-32 h-32 rounded-2xl object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              {/if}
              <div class="flex-grow space-y-4 text-left">
                <div class="flex justify-between items-start">
                    <span class="text-[9px] font-black text-brandBlue uppercase tracking-[0.4em]">{new Date(post.created_at).toLocaleDateString("hr-HR")}</span>
                    <div class="flex gap-4">
                        <button onclick={() => editNews(post)} class="text-white/20 font-black text-[9px] uppercase hover:text-brandBlue tracking-widest transition-colors">{$t('admin.btn_edit')}</button>
                        <button onclick={() => openConfirm('modal.title', 'modal.message', () => deleteNews(post.id, post.image_url))} class="text-red-500/40 font-black text-[9px] uppercase hover:text-red-500 tracking-widest transition-colors">{$t('admin.btn_delete')}</button>
                    </div>
                </div>
                <h3 class="font-black text-2xl uppercase italic text-brandLight leading-tight">{post.title}</h3>
                <p class="text-[10px] font-mono text-white/40 uppercase tracking-tighter truncate">{post.title_en || '---'}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </main>

  <ConfirmModal bind:show={confirmShow} title={confirmTitle} message={confirmMessage} onConfirm={confirmAction} />
</div>

<style>
    .blue-glow { text-shadow: 0 0 15px rgba(37, 99, 235, 0.5); }
    .glass-card { @apply bg-brandDeep/20 backdrop-blur-xl border border-white/5 shadow-2xl; }
    
    :global(body) { 
        scrollbar-width: none; 
        -ms-overflow-style: none; 
        background-color: #050505; 
    }
    :global(body::-webkit-scrollbar) { display: none; }
</style>