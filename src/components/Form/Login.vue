<template>
    <form class="login w-full flex flex-col justify-between space-y-8" @submit.prevent="">
        <div class="email-group flex flex-col justify-center relative">
            <input type="text" name="email">
            <h3 class="email-group__title absolute text-gray-400 font-semibold pointer-events-none truncate">
                Email
            </h3>
        </div>
        <div class="password-group flex flex-col justify-center relative">
            <input type="password" name="password">
            <h3 class="password-group__title absolute text-gray-400 font-semibold pointer-events-none truncate">
                Mật khẩu
            </h3>
        </div>
        <div class="forgot-remember-password flex justify-between items-center">
            <div class="remember-group flex items-center space-x-4 flex-initial w-[50%] max-w-[50%] text-left">
                <input type="checkbox" name="remember">
                <h3 class="remember-group__title">
                    Ghi nhớ tôi
                </h3>
            </div>
            <div class="forgot-group flex-initial w-[50%] max-w-[50%] text-right cursor-pointer">
                <h3 class="forgot-group__title title relative truncate">
                    Quên mật khẩu?
                </h3>
            </div>
        </div>
        <h3 class="not-have-account__title relative truncate">
            Bạn chưa có tài khoản? <span class="title cursor-pointer" @click="showRegisterForm">Đăng ký ngay!</span>
        </h3>
        <Button class="btn-login self-center">
            <span>Đăng nhập</span>
        </Button>
    </form>
</template>

<script setup lang="ts">
import Button from "../Button/Button.vue";
import { showRegisterForm } from "../../composables/ToggleForm";
</script>

<style lang="scss" scoped>
</style>