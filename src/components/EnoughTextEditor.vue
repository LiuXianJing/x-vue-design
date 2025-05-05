<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const contenValue = ref<string>('')

const fontSize = ref<number>(12)
const fontSizeStr = computed(() => {
    return `${fontSize.value}px`
})

watch(fontSize, (newValue) => {
    console.log('newVal', newValue);
})
</script>

<template>
    <div class="edit-container">
        <div class="operation">
        <div class="item">
            <div class="font-size">
                字体大小<input type="number" v-model="fontSize">
            </div>
        </div>
        <div class="item">op1</div>
        <div class="item">op1</div>
        <div class="item">op1</div>
        <div class="item">op1</div>
        </div>
        <div class="content">
            <div class="render">
                {{ contenValue }}
            </div>
            <input type="text" name="" id="" v-model="contenValue">
        </div>
    </div>
</template>

<style scoped>
.edit-container {
    border: 1px solid gray;
}
.edit-container > .operation {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid gray;
}
.edit-container > .operation > .item {
    flex: 1;
    border: 1px solid rgb(216, 215, 215);
}

.edit-container > .content > .render {
    min-height: 100px;
    width: 100%;
    font-size: v-bind(fontSizeStr);
}
</style>
