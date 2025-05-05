<template>
  <div>
    <p class="component-name">富文本：</p>
    <div>
      <RichTextEditor v-model="richContent" />
    </div>
    <p>富文本内容如下：</p>
    <div class="preview" v-html="richContent"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RichTextEditor from '../components/RichTextEditor.vue';

const richContent = ref('搜索')
</script>