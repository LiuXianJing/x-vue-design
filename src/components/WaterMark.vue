<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue'

const props = defineProps({
  isTrue: {
    type: Boolean,
    default: true
  },
  text: {
    type: String,
    default: '机密文件，禁止截图'
  },
  opacity: {
    type: Number,
    default: 1,
  },
  density: {
    type: Number,
    default: 1
  }
})
const { text, opacity, density } = toRefs(props)

const waterMarkRef = ref(null)

const generateWaterMark = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if(!context) {
        return
    }
    canvas.width = density.value * 200
    canvas.height = density.value * 200
    context.rotate(- 45 * Math.PI / 180)
    context.fillText(props.text, 20, density.value * 100)
    context.fillStyle = `rgba(100, 100, 100, ${opacity.value})`
    context.font = '16px'
    const dataUrl = canvas.toDataURL('image/png')
    return dataUrl
}

// 禁止用户删除水印
const initObserve = () => {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => {
            const removedNodes = mutation.removedNodes
            if(removedNodes.length) {
                const removedNodesArr = Array.from(removedNodes)
                if(removedNodesArr.some(node => node === waterMarkRef.value)) {
                    if(waterMarkRef.value) {
                        document.body.appendChild(waterMarkRef.value)
                        alert('Dont delete water mark!')
                    }
                }
            }
        })
    })
    observer.observe(document.body, {childList: true, subtree: true})
}

onMounted(() => {
  initObserve()
})

watch(text, (newVal) => {
  console.log('text', newVal);
})

</script>

<template>
  <div 
  ref="waterMarkRef" 
  :style="{backgroundImage: `url(${generateWaterMark()})`}"
  class="water-mark"
  >
  </div>
</template>

<style scoped>
.water-mark {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: v-bind('opacity');
    background-repeat: repeat;
    z-index: 1000000;
    pointer-events: none;
}
</style>
