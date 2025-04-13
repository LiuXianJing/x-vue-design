<script setup lang="ts">

interface Props {
    buttonText: string
    style?: Record<string, any>
    onClick?: () => void
}

defineProps<Props>()

</script>

<template>
  <button
  :style="style"
  @click="onClick"
  >
    {{ buttonText }}
  </button>
</template>

<style scoped>
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1298e6;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
