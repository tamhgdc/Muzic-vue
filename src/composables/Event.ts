import { onMounted, onUnmounted } from "vue";

const useEventListener = (target: any, event: any, callback: any) => {
    onMounted(() => target.addEventListener(event, callback));
    onUnmounted(() => target.removeEventListener(event, callback));
}

export { useEventListener }