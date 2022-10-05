import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import './css/index.css';
import './css/style.scss';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VueLazyload from "vue-lazyload";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(VueSweetalert2);
app.use(VueLazyload, {
    observer: true,

    observerOptions: {
        rootMargin: '0px',
        threshold: 0.1,
    }
});
app.use(FloatingVue);
app.mount("#app");
