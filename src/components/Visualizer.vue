<template>
    <div class="visualizer w-full h-full flex justify-center items-center space-x-1">
        <div 
            v-for="i in 4" 
            class="visualizer__item w-[0.5rem] h-[3rem] max-h-[3rem] rounded-sm relative"
            :style="{'--i': i}"
        >
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.visualizer__item::before {
    position: absolute;
    content: '';
    right: 0;
    left: 0;
    width: 100%;
    border-radius: 0.125rem;
    background: white;
    animation: visualizer 800ms cubic-bezier(0.16, 1, 0.22, 1) infinite alternate;
    animation-delay: calc(0.35s * var(--i));
}

@keyframes visualizer {
    50% {
        top: 0;
        bottom: 0;
    }
    100% {
        top: 100%;
        bottom: 0;
    }
}
</style>