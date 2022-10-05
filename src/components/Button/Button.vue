<template>
    <button class="btn">
        <slot>
            <span>Button</span>
        </slot>
    </button>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@import '../../css/mixins.scss';
.btn {
    position: relative;
    color: #FFFFFF;
    padding: 0.75rem 1.5rem;
    min-width: 5rem;
    border-radius: 0.5rem;
    border: none;
    outline: none;
    @include flexbox(center, center);
    box-shadow: inset 0.2rem 0.2rem 0.2rem rgba(255, 255, 255, .5),
                0.5rem 0.5rem 1.5rem rgba(0, 0, 0, .1),
                1rem 1rem 2rem rgba(0, 0, 0, .1);
    background-color: #4ADE80;
    background-image: linear-gradient(300deg, #4ADE80 0%, #82e1a5 75%);
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);

    &::before, &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        box-shadow: inset 0.4rem 0.4rem 0.7rem rgba(133, 236, 234, .3),
                    0.4rem 0.4rem 0.7rem rgba(255, 255, 255, .4),
                    -0.4rem -0.4rem 0.7rem rgba(133, 236, 234, .3),
                    inset -0.4rem -0.4rem 0.7rem rgba(255, 255, 255, .4);
    }

    &::before {
        width: 0%;
        height: 0.1rem;
    }

    &::after {
        width: 0.1rem;
        height: 0%;
    }

    &:hover {
        background-color: #85ecea;
        background-image: linear-gradient(300deg, #82e1a5 0%, #85ecea 75%);

        &::before {
            width: 100%;
        }

        &::after {
            height: 100%;
        }
    }

    & > span {
        position: relative;
        width: 100%;
        height: 100%;
        display: block;

        &::before, &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            box-shadow: inset 0.4rem 0.4rem 0.7rem rgba(255, 255, 255, .8),
                        0.4rem 0.4rem 0.7rem rgba(116, 125, 136, .3),
                        -0.4rem -0.4rem 0.7rem rgba(255, 255, 255, .8),
                        inset -0.4rem -0.4rem 0.7rem rgba(116, 125, 136, .3);
            transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        &:hover {
        &::before {
            width: 100%;
        }

        &::after {
            height: 100%;
        }
    }
    }
}
</style>