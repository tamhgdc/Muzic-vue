<template>
    <form class="register w-full flex flex-col justify-between space-y-8" @submit.prevent="">
        <div class="username-group flex flex-col justify-center relative">
            <input type="text" name="username">
            <h3 class="username-group__title absolute text-gray-400 font-semibold pointer-events-none truncate">
                Tên tài khoản
            </h3>
        </div>
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
        <div class="re-password-group flex flex-col justify-center relative">
            <input type="password" name="re-password">
            <h3 class="re-password-group__title absolute text-gray-400 font-semibold pointer-events-none truncate">
                Xác nhận mật khẩu
            </h3>
        </div>
        <h3 class="have-account__title relative truncate">
            Bạn đã có tài khoản? <span class="title cursor-pointer" @click="showLoginForm">Đăng nhập ngay!</span>
        </h3>
        <Button class="btn-register self-center">
            <span>Đăng ký</span>
        </Button>
    </form>
</template>

<script setup lang="ts">
import Button from "../Button/Button.vue";
import { showLoginForm } from "../../composables/ToggleForm";
</script>

<style lang="scss" scoped>
</style>