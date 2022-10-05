<template>
    <div class="navigation-menu text-2xl fixed bottom-0 left-0 w-full h-[7rem] flex justify-center items-center z-[999]">
        <ul class="navigation-menu__list container flex w-full h-full justify-around relative">
            <NavigationItem v-for="item in menuItems" 
                :key="item.title" 
                :icon="item.icon" 
                :title="item.title" 
                :link="item.link"
                :class="{'active': item.link === $route.path}"
            />
            <!-- Indicator -->
            <div v-if="isShowIndicator" class="indicator absolute w-full h-full">
                <div class="indicator__inner container grid grid-cols-5 grid-rows-1 grid-flow-col">
                    <div class="indicator__item"></div>
                </div>
            </div>
            <!-- Indicator -->
        </ul>
    </div>
</template>

<script setup lang="ts">
import NavigationItem from "./NavigationItem.vue";
import { home, library, star, statsChart, person } from "../../composables/Icons";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

interface NavMenu {
    icon: string,
    title: string,
    link: string,
}

const route = useRoute();
const menuItems: NavMenu[] = [
    {
        icon: home,
        title: "Home",
        link: "/"
    },
    {
        icon: library,
        title: "Thể loại",
        link: "/categories",
    },
    {
        icon: star,
        title: "TOP 100",
        link: "/top100",
    },
    {
        icon: statsChart,
        title: "BXH",
        link: "#"
    },
    {
        icon: person,
        title: "Cá nhân",
        link: "#"
    }
];
const navigation = menuItems.map(item => item.link);
const isShowIndicator = ref<boolean>(true);

watch(route, () => {
    isShowIndicator.value = navigation.includes(route.path);
});
</script>

<style lang="scss">
@import "../../css/mixins.scss";

.navigation-menu {
    &__item {
        position: relative;
        z-index: 1;
        width: 7rem;
        height: 7rem;

        & > a {
            position: relative;
            @include flexbox(center, center, column);
            width: 100%;
            text-align: center;
            font-weight: 600;
        }
    }

    &__icon {
        position: relative;
        display: block;
        line-height: 7.5rem;
        font-size: 2.25rem;
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    }

    &__item.active &__icon {
        transform: translateY(-3.5rem);
    }

    &__title {
        position: absolute;
        font-weight: 500;
        font-size: 1.4rem;
        letter-spacing: 0.1rem;
        transform: translateY(2rem);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    }

    &__item.active &__title {
        transform: translateY(1rem);
        opacity: 1;
    }

    .indicator__item {
        position: relative;
        width: 7rem;
        height: 7rem;
        top: -50%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #FF9F1C;
        border-radius: 50%;
        border: 0.5rem solid #FFFFFF;
        transition: all 0.75s cubic-bezier(0.19, 1, 0.22, 1);
    }

    &__item.active:nth-child(1) ~ .indicator .indicator__item {
        margin-left: calc(0 * 100%);
    }

    &__item.active:nth-child(2) ~ .indicator .indicator__item {
        margin-left: calc(1 * 100%);
    }

    &__item.active:nth-child(3) ~ .indicator .indicator__item {
        margin-left: calc(2 * 100%);
    }

    &__item.active:nth-child(4) ~ .indicator .indicator__item {
        margin-left: calc(3 * 100%);
    }
}
</style>