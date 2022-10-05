<template>
    <li class="navigation-menu__item">
        <RouterLink :to="link" class="w-full h-full">
            <span class="navigation-menu__icon w-[2.5rem] h-[2.5rem]">
                <img :src="icon" :alt="icon">
            </span>
            <span class="navigation-menu__title">
                {{ title }}
            </span>
        </RouterLink>
    </li>
</template>

<script setup lang="ts">
interface Props {
    icon: string,
    title: string,
    link: string,
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>

</style>