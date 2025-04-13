<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRefs, watch, type VNodeRef } from 'vue'

type Config = {
    fontSize?: number | string // 水印字体大小
    textRotate?: number // 水印文字倾斜角度
}

interface PropsInterface {
    readonly isTrue?: boolean;
    readonly text: string;
    readonly opacity: number;
    readonly density: number; // 水印密度
    readonly config?: Config;
}

const props: PropsInterface = defineProps({
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
    default: 0.3,
  },
  density: {
    type: Number,
    default: 1
  },
  config: {
    type: Object,
    default: {
      fontSize: '16px',
      textRotate: 45
    }
  }
})
const { text, opacity, density, config } = toRefs<PropsInterface>(props)

const waterMarkRef = ref<VNodeRef | null>(null)
const observerRef = ref<MutationObserver>()

const generateWaterMark: () => string = () => {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
    if(!context) {
        return ''
    }
    canvas.width = density.value * 200
    canvas.height = density.value * 200
    context.rotate(- (config?.value?.textRotate || 45) * Math.PI / 180)
    context.fillText(text.value, 20, density.value * 100)
    context.fillStyle = `rgba(100, 100, 100, ${opacity.value})`
    const fontSize: number | string | undefined = config?.value?.fontSize
    let fontSize_: string = ''
    if(fontSize === 'number') {
      fontSize_ = `${fontSize}px`
    }
    context.font = fontSize_ || '16px'
    const dataUrl: string = canvas.toDataURL('image/png')
    return dataUrl
}

// 禁止用户删除水印
const initObserve: () => void = () => {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => {
            const removedNodes: NodeList = mutation.removedNodes
            if(removedNodes.length) {
                const removedNodesArr: Node[] = Array.from(removedNodes)
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
    observerRef.value = observer
}

onMounted(() => {
  initObserve()
})

onUnmounted(() => {
  observerRef.value?.disconnect()
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
    opacity: v-bind(opacity);
    background-repeat: repeat;
    z-index: 1000000;
    pointer-events: none;
}
</style>
