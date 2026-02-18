<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';

    // Svelte 5 Props - Zadržano bindable
    let { value = $bindable('') } = $props();

    let element = $state<HTMLElement>();
    let editor = $state<Editor>();

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [StarterKit],
            content: value,
            editorProps: {
                attributes: {
                   class: 'prose prose-invert prose-sm sm:prose-base max-w-none focus:outline-none min-h-[150px] text-brandLight p-6' 
                }
            },
            onUpdate: ({ editor }) => {
                const html = editor.getHTML();
                if (html !== value) {
                    value = html;
                }
            }
        });
    });

    // sinkronizatoin outside to inside
    $effect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    });

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });
    
    // active state buttnoba
    const isActive = (type: string, opts?: any) => 
        editor?.isActive(type, opts) 
            ? 'bg-brandBlue text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]' 
            : 'hover:bg-white/10 text-white/40';
</script>

<div class="border border-white/5 rounded-[2rem] bg-brandDeep/10 overflow-hidden focus-within:border-brandBlue/50 transition-all duration-500 shadow-2xl">
    {#if editor}
    <div class="flex flex-wrap gap-1.5 p-3 border-b border-white/5 bg-white/[0.02] backdrop-blur-md">
        <button 
            type="button"
            onclick={() => editor?.chain().focus().toggleBold().run()} 
            class="w-10 h-10 rounded-xl transition-all flex items-center justify-center font-black {isActive('bold')}"
            aria-label="Podebljano"
            title="Podebljano"
        >
            B
        </button>
        <button 
            type="button"
            onclick={() => editor?.chain().focus().toggleItalic().run()} 
            class="w-10 h-10 rounded-xl transition-all flex items-center justify-center italic font-serif {isActive('italic')}"
            aria-label="Kurziv"
            title="Kurziv"
        >
            I
        </button>
        <button 
            type="button"
            onclick={() => editor?.chain().focus().toggleStrike().run()} 
            class="w-10 h-10 rounded-xl transition-all flex items-center justify-center line-through {isActive('strike')}"
            aria-label="Precrtano"
            title="Precrtano"
        >
            S
        </button>

        <div class="w-[1px] h-6 bg-white/5 mx-2 self-center"></div>

        <button 
            type="button"
            onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} 
            class="px-3 h-10 rounded-xl transition-all flex items-center justify-center text-xs font-black uppercase tracking-tighter {isActive('heading', { level: 2 })}"
            aria-label="Naslov 2"
            title="Naslov 2"
        >
            H2
        </button>
        <button 
            type="button"
            onclick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} 
            class="px-3 h-10 rounded-xl transition-all flex items-center justify-center text-xs font-black uppercase tracking-tighter {isActive('heading', { level: 3 })}"
            aria-label="Naslov 3"
            title="Naslov 3"
        >
            H3
        </button>

        <div class="w-[1px] h-6 bg-white/5 mx-2 self-center"></div>

        <button 
            type="button"
            onclick={() => editor?.chain().focus().toggleBulletList().run()} 
            class="px-3 h-10 rounded-xl transition-all flex items-center justify-center text-[10px] font-black uppercase tracking-widest {isActive('bulletList')}"
            aria-label="Lista s grafičkim oznakama"
            title="Lista"
        >
            • Lista
        </button>
        <button 
            type="button"
            onclick={() => editor?.chain().focus().toggleOrderedList().run()} 
            class="px-3 h-10 rounded-xl transition-all flex items-center justify-center text-[10px] font-black uppercase tracking-widest {isActive('orderedList')}"
            aria-label="Numerirana lista"
            title="Numerirana lista"
        >
            1. Lista
        </button>
    </div>
    {/if}

    <div bind:this={element} class="bg-transparent"></div>
</div>

<style>
    /* hide TipTap focus  */
    :global(.tiptap:focus) {
        outline: none;
    }

    /* Placeholder still*/
    :global(.tiptap p.is-editor-empty:first-child::before) {
        content: "Napišite nešto...";
        float: left;
        color: rgba(240, 242, 245, 0.15); 
        pointer-events: none;
        height: 0;
    }

    button { -webkit-tap-highlight-color: transparent; }
</style>