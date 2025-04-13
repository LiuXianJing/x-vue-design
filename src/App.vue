<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import WaterMark from './components/WaterMark.vue';
import Link from './components/Link.vue';
import Button from './components/Button.vue';

</script>

<template>
  <HelloWorld msg="X Vue Design" />
  <h2>Component</h2>
  <div>
    <p class="component-name">水印:</p>
    <div>
      <WaterMark />
      请见界面
    </div>
  </div>
  <div>
    <p class="component-name">链接:</p>
    <div>
      <Link link-text="点击链接" />
    </div>
  </div>
  <div>
    <p class="component-name">按钮:</p>
    <div>
      <Button button-text="点击按钮" />
    </div>
  </div>
  <div></div>
</template>

<style scoped>
.component-name {
  color: #f1e;
  font-weight: bold;
}
</style>
