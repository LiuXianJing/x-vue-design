<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import WaterMark from './components/WaterMark.vue';

</script>

<template>
  <HelloWorld msg="X Vue Design" />
  <h1>Component</h1>
  <div>
    <p>水印</p>
    <div>
      <WaterMark />
    </div>
  </div>
</template>

<style scoped>
</style>
