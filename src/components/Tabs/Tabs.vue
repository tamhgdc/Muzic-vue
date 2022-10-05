<template>
    <div class="tabs w-full h-auto text-2xl">
        <div class="tabs__inner container w-full h-full flex flex-col space-y-8 overflow-y-auto">
            <slot name="tabsTitle">
                Sample Title
            </slot>
            <ul class="tabs__heading bg-white flex space-x-6 sticky top-0 z-10">
                <li v-for="(tab, index) in TabCount" 
                    ref="tabsItem" 
                    class="tabs__item inline-block min-w-[8.5rem] text-center cursor-pointer font-medium"
                    @click="showTab(index)"
                >
                    <slot :name="`heading${tab}`">
                        Heading {{ tab }}
                    </slot>
                </li>
            </ul>
            <ul class="tabs__body w-full min-h-[30rem] max-h-[70rem] flex justify-between items-center relative">
                <li v-for="tab in TabCount" ref="tabsContent" class="tabs__content flex-auto w-full h-full absolute transition-all ease-out-expo duration-[800ms]">
                    <slot :name="`body${tab}`">
                        Body {{ tab }}
                    </slot>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Props {
    TabCount: number,
}

const props = defineProps<Props>();
const tabsItem = ref<Element[]>([]);
const tabsContent = ref<Element[]>([]);

const showTab = (index: number) => {
    tabsItem.value.forEach(item => {
        item.classList.remove("active");
    });
    tabsContent.value.forEach(item => {
        item.classList.remove("active");
    });
    tabsItem.value[index].classList.add("active");
    tabsContent.value[index].classList.add("active");
}

onMounted(() => {
    showTab(0);
})
</script>

<style lang="scss">
.tabs {
    &__inner {
        &::-webkit-scrollbar {
            width: 0.5vw;
        }

        &::-webkit-scrollbar-track {
            background-color: transparent;
            box-shadow: inset 0.05rem 0.05rem 0.15rem rgba(0, 0, 0, .4);
            border-radius: 0.5rem;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #FF9F1C;
            border-radius: 0.5rem;
        }
    }

    &__item.active {
        > div {
            background-color: #FF9F1C;
        }
    }

    &__content {
        opacity: 0;
        visibility: hidden;

        &.active {
            opacity: 1;
            visibility: visible;
        }
    }
}
</style>