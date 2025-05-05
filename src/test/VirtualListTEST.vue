<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VirtualList from '../components/VirtualList.vue'

interface Item {
    id: string | number
    content: string
}

const items = ref<Item[]>([])

onMounted(() => {
    const arr = []
    for (let i = 0; i < 1000; i++) {
        const element = {
            id: crypto.randomUUID(),
            content: `${i}-content`
        }
        arr.push(element)
    }
    items.value = arr
})
</script>

<template>
  <div>
    <p class="component-name">VirtualList: </p>
    <div>
      <VirtualList :items="items"/>
    </div>
  </div>
</template>