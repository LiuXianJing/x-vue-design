<script setup lang="ts">
import Menu from './components/Menu.vue'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <Menu />
  <main>
    <HelloWorld msg="X Vue Design" />
    <RouterView />
  </main>
</template>

<style scoped>
main {
  flex: 1;
  padding: 30px
}
.component-name {
  color: #f1e;
  font-weight: bold;
}
</style>
