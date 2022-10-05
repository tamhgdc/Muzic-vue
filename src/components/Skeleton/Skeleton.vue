<template>
    <div class="skeleton skeleton--shine w-full h-full rounded"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.skeleton {
    background-color: hsl(210, 15%, 85%);
    box-shadow: 0rem 5rem 3rem rgba(255, 255, 255, 0.5);

    &--shine {
        animation: shine 3s infinite linear;
        background: linear-gradient(-45deg, hsl(210, 15%, 85%) 40%, hsl(210, 15%, 95%) 50%, hsl(210, 15%, 85%) 60%);
        background-size: 200% 100%;
        background-position: 150% 0%;

        @keyframes shine {
            0% {
                opacity: 1;
                background-position: 150% 0%;
            }

            30% {
                opacity: 0.7;
                background-position: 100% 0%;
            }

            60% {
                opacity: 1;
                background-position: 50% 0%;
            }

            90% {
                opacity: 0.7;
                background-position: 0% 0%;
            }

            100% {
                opacity: 1;
                background-position: -50% 0%;
            }
        }
    }
}
</style>