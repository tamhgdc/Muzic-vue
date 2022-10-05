<template>
  <Header/>
  <Transition name="fade-slide">
      <Credential v-show="isShowForm"/>
  </Transition>
  <RouterView v-slot="{ Component }">
    <KeepAlive>
        <component :is="Component"/>
    </KeepAlive>
  </RouterView>
  <Transition name="fade-in-down">
    <Player v-if="currentSong.encodeId !== ''"/>
  </Transition>
  <NavigationMenu/>
</template>

<script setup lang="ts">
import Header from './components/Header/Header.vue';
import Credential from "./components/Form/Credential.vue";
import Player from './components/Player/Player.vue';
import NavigationMenu from './components/Navigation/NavigationMenu.vue';
import { toRefs, watch, computed } from 'vue';
import { useGlobal } from './stores/Global';
import { useCurrentSong } from './stores/CurrentSong';

const { isShowForm } = toRefs(useGlobal());
const { handleClickOutsideFormModal } = useGlobal();
const currentSongStore = useCurrentSong();
const currentSong = computed(() => currentSongStore.currentSong);

watch(isShowForm, (newValue, oldValue) => {
  newValue !== oldValue && handleClickOutsideFormModal();
})
</script>

<style lang="scss" scoped>

.fade-slide-enter-active,
.fade-in-down-enter-active {
    transition: transform 0.9s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.9s cubic-bezier(0.19, 1, 0.22, 1);
}
.fade-slide-leave-active,
.fade-in-down-leave-active {
    transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translate(-50%, -100%);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translate(-50%, 50%);
}

.fade-in-down-enter-from {
    opacity: 0;
    transform: translateY(100%);
}
.fade-in-down-leave-to {
    opacity: 0;
    transform: translateY(0);
}
</style>
