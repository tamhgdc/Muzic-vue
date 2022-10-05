<template>
    <div 
        class="credential-form w-[clamp(30rem,90%,45rem)] bg-secondary text-2xl shadow-lg fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-2xl z-[9999] overflow-hidden">
        <div class="credential-form__inner container py-8 flex flex-col justify-between items-start space-y-8">
            <div class="credential-form__heading uppercase font-bold w-full h-[3rem] self-center text-center relative flex justify-around items-center">
                <h2 class="credential-form__heading--login active cursor-pointer" @click="showLoginForm">
                    Đăng nhập
                </h2>    
                <h2 class="credential-form__heading--register cursor-pointer" @click="showRegisterForm">
                    Đăng ký
                </h2>    
            </div>
            <div class="form-group w-[200%] flex justify-center items-center">
                <Login class="w-[50%]" :style="{marginLeft: margin}"/>
                <Register class="w-[50%] translate-x-[10%]"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Login from "./Login.vue";
import Register from "./Register.vue";
import { showLoginForm, showRegisterForm, margin } from "../../composables/ToggleForm";
</script>

<style lang="scss" scoped>
.credential-form {
    &__heading {
        > h2 {
            display: inline-block;
            height: 100%;
            position: relative;
            transition: color 0.75s cubic-bezier(0.19, 1, 0.22, 1);

            &:hover, 
            &.active {
                color: #2EC4B6;
            }

            &::before {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0.5rem;
                width: 100%;
                height: 0.4rem;
                background-image: linear-gradient(300deg, #4ADE80 0%, #82e1a5 75%);
                border-radius: 0.2rem;
                transform: scaleX(0);
                transform-origin: bottom right;
                transition: transform 0.75s cubic-bezier(0.19, 1, 0.22, 1);
            }

            &:hover::before,
            &.active::before {
                transform: scaleX(1);
                transform-origin: bottom left;
            }
        }
    }
}
</style>