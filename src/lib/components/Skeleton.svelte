<script lang="ts">
    let { class: className = "h-[300px]" } = $props();
</script>

<div class="{className} w-full bg-brandDeep/20 rounded-[2rem] border border-white/5 relative overflow-hidden">
    <div class="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
</div>

<style>
    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
</style>