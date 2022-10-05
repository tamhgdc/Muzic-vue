import { ref } from "vue";

const margin = ref<string>('');

const showLoginForm = (): void => {
    const loginHeading = document.querySelector(".credential-form__heading--login");
    const registerHeading = document.querySelector(".credential-form__heading--register");
    loginHeading?.classList.add("active");
    registerHeading?.classList.remove("active");
    margin.value = "0";
}

const showRegisterForm = (): void => {
    const loginHeading = document.querySelector(".credential-form__heading--login");
    const registerHeading = document.querySelector(".credential-form__heading--register");
    loginHeading?.classList.remove("active");
    registerHeading?.classList.add("active");
    margin.value = "-110%";
}

export { showLoginForm, showRegisterForm, margin };