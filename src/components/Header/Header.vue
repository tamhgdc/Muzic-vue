<template>
    <header class="header w-full h-[7rem] shadow-md text-2xl fixed top-0 left-0 z-[999]">
        <div class="header__inner container w-full h-full flex justify-between items-center space-x-5">
            <SearchBox />
            <nav class="header-menu">
                <ul class="header-menu__list flex justify-between items-center space-x-4">
                    <li class="header-menu__item w-[2.5rem] h-[2.5rem] settings text-4xl flex relative">
                        <img :src="settings" alt="settings" class="settings__button cursor-pointer w-full h-full object-cover">
                    </li>
                    <li class="header-menu__item user-infor bg-[#CBF3F0] w-[4rem] h-[4rem] rounded-full relative">
                        <img :src="avatar" :alt="avatar" class="w-full h-full object-cover cursor-pointer" @click="toggleFormModal">
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
import SearchBox from "../SearchBox.vue";
import { avatar, settings } from "../../composables/Icons";
import { useGlobal } from "../../stores/Global";

const { toggleFormModal } = useGlobal();
</script>

<style lang="scss" scoped>
</style>