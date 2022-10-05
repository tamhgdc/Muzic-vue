import { defineStore } from "pinia";
import { ref } from "vue";
import { createLightBox, removeLightBox } from "../composables/LightBox";

export const useGlobal = defineStore("globalStore", () => {
    const isShowForm = ref<boolean>(false);
    const isLoadingHome = ref<boolean>(false);

    const toggleFormModal = (): void => {
        isShowForm.value = !isShowForm.value;
        isShowForm.value && createLightBox();
    }

    const handleClickOutsideFormModal = (): void => {
        const lightbox = document.querySelector(".lightbox");
        lightbox?.addEventListener("click", () => {
            isShowForm.value = false;
            removeLightBox();
        })
    }

    return {
        isShowForm,
        isLoadingHome,
        toggleFormModal,
        handleClickOutsideFormModal,
    }
});