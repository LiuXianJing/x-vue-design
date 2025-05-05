<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import WaterMark from './components/WaterMark.vue';
import Link from './components/Link.vue';
import Button from './components/Button.vue';
//import EnoughTextEditor from './components/EnoughTextEditor.vue';
import RichTextEditor from './components/RichTextEditor.vue';
import Form from './components/Form.vue'
import VirtualListTEST from './test/VirtualListTEST.vue'

const richContent = ref('搜索')
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
    <p class="component-name">链接：</p>
    <div>
      <Link link-text="点击链接" />
    </div>
  </div>
  <div>
    <p class="component-name">按钮：</p>
    <div>
      <Button button-text="点击按钮" />
    </div>
  </div>
  <div>
    <p class="component-name">富文本：</p>
    <div>
      <RichTextEditor v-model="richContent" />
    </div>
    <p>富文本内容如下：</p>
    <div class="preview" v-html="richContent"></div>
  </div>
  <div>
    <p class="component-name">Form表单: </p>
    <div>
      <Form />
    </div>
  </div>
  <div style="height: 10vh;"></div>
  <VirtualListTEST />
</template>

<style scoped>
.component-name {
  color: #f1e;
  font-weight: bold;
}
</style>
