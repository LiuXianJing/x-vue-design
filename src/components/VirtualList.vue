<template>
    <div
    ref="containerRef"
    class="virtual-list"
    @scroll="handleScroll"
    style="{
        height: `{containerHeight}px`
    }"
    >
        <div
        ref="scrollRef"
        class="scroller"
        style="{
            transform: `translateY(${scrollOffset}px)`
            height: `${totalHeight}px`
        }"
        >
            <template
            v-for="(item, index) in visibleItems"
            :key="item.id"
            >
                <div
                :ref="(ele) => setItemRef(ele, index)"
                class="item"
                :style="{
                    height: `${itemHeights[index]}px`
                }"
                >
                    {{ item.content }}
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue"

interface Item {
    id: string | number
    content: string
}

const props = defineProps<{
    items: Item[]
}>

const containerRef = ref<HTMLElement>()
const scrollRef = ref<HTMLElement>()
const itemRefs = ref<HTMLElement[]>([])
const itemHeights = ref<number[]>([])
const containerHeight = ref(0)
const scrollOffset = ref(0)
const totalHeight = ref(0)

const getVisibleRange = (scrollTop: number): [number, number] => {
    const start = itemHeights.value.findIndex(
        (height, index) => {
            const offset = itemHeights.value.slice(0, index).reduce((sum, h) => sum + h, 0)
            return offset >= scrollTop
        }
    )
    const end = itemHeights.value.findIndex(
        (height, index) => {
            const offset = itemHeights.value.slice(0, index + 1).reduce((sum, h) => sum + h, 0)
            return offset > scrollTop + containerHeight.value
        }
    )
    return [start === -1 ? 0 : start, end === -1 ? itemHeights.value.length : end]
}

const visibleItems = computed(() => {
    const [start, end] = getVisibleRange(scrollOffset.value)
    return props.items.slice(start, end)
})

const updateScroll = () => {
    const container = containerRef.value
    if(container) {
        scrollOffset.value = container.scrollTop
        totalHeight.value = itemHeights.value.reduce((sum, h) => sum + h, 0)
    }
}

const setItemHeights = () => {
    itemHeights.value = itemRefs.value.map((ele) => ele?.offsetHeight ?? 0)
    totalHeight.value = itemHeights.value.reduce((sum, h) => sum + h, 0)
}

const setItemRef = (ele: HTMLElement | null, index: number) => {
    if(ele) {
        itemRefs.value[index] = ele
        nextTick(setItemHeights)
    }
}

const handleScroll = () => {
    updateScroll()
}

onMounted(() => {
    const container = containerRef.value
    if(container) {
        containerHeight.value = container.clientHeight
        container.addEventListener("scroll", handleScroll)
    }
})

watch(() => props.items, () => {
    itemRefs.value = []
    itemHeights.value = []
    nextTick(setItemHeights)
})
</script>

<style scoped>
.virtual-list {
    overflow: auto;
    position: relative;
}

.scroller {
    position: absolute;
    width: 100%;
    transition: transform 0.3s ease;
}

.item {
    padding: 16px;
    border-bottom: 1px solid #eee
}
</style>