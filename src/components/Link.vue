<script setup lang="ts">

interface Props {
    linkText: string
    href?: string
    style?: Record<string, any>
    onClick?: () => void
}

defineProps<Props>()

</script>

<template>
    <a 
    class="link-container"
    :href="href"
    :style="style"
    @click="onClick"
    >
        {{ linkText }}
    </a>
</template>

<style scoped>
.link-container {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
    cursor: pointer;
}
.link-container:hover {
    color: #535bf2;
}
</style>
