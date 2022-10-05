<template>
    <div
        ref="gallery"
        class="gallery w-full mx-auto mt-[2rem]">
        <div class="gallery__inner container w-full h-full relative flex justify-center items-center">
            <div v-if="!isLoading" class="gallery__navigate absolute flex w-full z-10 text-3xl lg:text-4xl text-white px-8">
                <div class="gallery__navigate--prev flex justify-center items-center" @click="prevSlide">
                    <img :src="chevronBack" alt="chevron-back" class="w-[2.5rem] h-[2.5rem]">
                </div>
                <div class="gallery__navigate--next flex justify-center items-center" @click="nextSlide">
                    <img :src="chevronForward" alt="chevron-forward" class="w-[2.5rem] h-[2.5rem]">
                </div>
            </div>
            <TransitionGroup 
                v-if="!isLoading"
                tag="ul" 
                name="gallery"
                class="gallery__list w-full h-full flex justify-between items-center relative overflow-hidden"
            >
                <li
                    v-for="item in items"
                    :key="item.encodeId"
                    class="gallery__item bg-gray-200 rounded-2xl overflow-hidden cursor-pointer"
                    ref="galleryItem"
                >
                    <img :src="item.banner" :alt="item.encodeId">
                </li>
            </TransitionGroup>
            <!-- Skeleton -->
            <div v-else class="gallery__list w-full h-full flex justify-between items-center relative overflow-hidden">
                <Skeleton v-for="i in 3" class="gallery__item"/>
            </div>
            <!-- Skeleton -->
        </div>
    </div>
</template>

<script setup lang="ts">
import Skeleton from "../Skeleton/Skeleton.vue";
import { ref, onMounted, computed } from "vue";
import type { Banner } from "../../types/Types";
import { useGlobal } from "../../stores/Global";
import { chevronBack, chevronForward } from "../../composables/Icons";

const props = defineProps<{
    items: Banner[],
}>();

const globalStore = useGlobal();
const isLoading = computed(() => globalStore.isLoadingHome);
const gallery = ref<Element | null>(null);
const lastTimestamp = ref<number>(0);
const duration = 5000;
const runSlide = ref<any>(null);

const nextSlide = (): void => {
    const lastItem = props.items.pop();
    lastItem && props.items.unshift(lastItem);
}

const prevSlide = (): void => {
    const firstItem = props.items.shift();
    firstItem && props.items.push(firstItem);
}

const autoplay = (currentTimestamp: number): void => {
    const elapsed = currentTimestamp - lastTimestamp.value;
    const isRunning = !lastTimestamp.value || elapsed >= duration;
    
    if (isRunning) {
        lastTimestamp.value = currentTimestamp;
        prevSlide();
    }

    runSlide.value = requestAnimationFrame(autoplay);
}

const pause = (): void => {
    if (runSlide.value) {
        cancelAnimationFrame(runSlide.value);
        runSlide.value = null;
    }
}

onMounted(() => {
    runSlide.value = requestAnimationFrame(autoplay);
    gallery.value?.addEventListener("mouseover", () => {
        pause();
    });
    gallery.value?.addEventListener("mouseleave", () => {
        runSlide.value = requestAnimationFrame(autoplay);
    })
});
</script>

<style lang="scss" scoped>
.gallery {
    aspect-ratio: calc(16 * 2 / 9);

    &__item {
        flex: 1 0 calc(100% / 2 - 2rem);
        width: calc(100% / 2 - 2rem);
        margin: 0 1rem;
        aspect-ratio: 16 / 9;

        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__navigate {
        opacity: 0;
        visibility: hidden;
        transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);

        > div {
            position: absolute;
            width: 3rem;
            height: 3rem;
            top: 50%;
            transform: translateY(-50%);
            margin: 0 1.5rem;
            cursor: pointer;
            background-color: rgba(0, 0, 0, .4);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;

            &:first-child {
                left: 0;
            }

            &:last-child {
                right: 0;
            }
        }
    }

    &__inner:hover &__navigate {
        opacity: 1;
        visibility: visible;
    }
    
    @media (min-width: 768px) {
        aspect-ratio: calc(16 * 3 / 9);

        &__item {
            flex: 1 0 calc(100% / 3 - 2rem);
            width: calc(100% / 3 - 2rem);
        }
    }

    @media (min-width: 1024px) {
        &__navigate {
            > div {
                width: 4rem;
                height: 4rem;
            }
        }
    }
}

.gallery-move,
.gallery-enter-active {
    transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
}

.gallery-enter-from,
.gallery-leave-to {
    opacity: 0;
}

.gallery-enter-to,
.gallery-leave-from {
    opacity: 1;
}

.gallery-leave-active {
    position: absolute;
    transition: all 0.75s cubic-bezier(0.19, 1, 0.22, 1);
}
</style>