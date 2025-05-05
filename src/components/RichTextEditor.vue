<template>
    <div class="rich-editor">
        <div class="toolbar">
            <button @click="applyFormat('bold')">
                <i class="bi bi-type-bold">加粗</i>
            </button>
            <button @click="applyFormat('italic')">
                <i class="bi bi-type-italic">斜体</i>
            </button>
            <button @click="insertLink">
                <i class="bi bi-link">插入链接</i>
            </button>
            <button @click="insertImage">
                <i class="bi bi-image">插入图片</i>
            </button>
            <button @click="insertList('unordered')">
                <i class="bi bi-list-ul">插入无序列表</i>
            </button>
            <button @click="insertList('ordered')">
                <i class="bi bi-list-ol">插入有序列表</i>
            </button>
            <button @click="undo">
                撤销
            </button>
            <button @click="redo">
                重做
            </button>
        </div>
        <div
        ref="editor"
        class="editor"
        contenteditable="true"
        @input="updateContent"
        @paste="handlePaste"
        @keydown.meta.enter.exact="insertParagraph"
        >
            {{ content }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSelection } from '../utils/hooks'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue'])

const content = ref(props.modelValue)

watch(content, (newVal) => {
    console.log('newVal: ', newVal);
    emit('update:modelValue', newVal)
})

const editor = ref(null)

// const { selection } = useSelection()

const updateSelection = () => {
    const winSelection = document.getSelection()
    if(!winSelection) {
        return
    }
    const selection: any = {value: undefined}
    selection.value = {
        text: winSelection.toString(),
        range: winSelection.getRangeAt(0),
        isCollapsed: winSelection.isCollapsed,
        anchorNode: winSelection.anchorNode,
        focusNode: winSelection.focusNode
    }
    console.log('selection: ', selection.value);
    return selection
}

const updateContent = (e: Event) => {
    content.value = (e.target as HTMLDivElement).innerHTML
}

const applyFormat = (format: string) => {
    document.execCommand(format, false, undefined)
}

const insertLink = () => {
    const url = prompt('请输入链接地址')
    const selection = updateSelection()
    if(selection)
    if(url && selection.value.range) {
        const a = document.createElement('a')
        a.href = url
        a.innerText = url
        a.style.cursor = 'pointer'
        selection.value.range.insertNode(a)
        selection.value.range.collapse(false)
        content.value = (editor.value as any).innerHTML
        //document.execCommand('insertLink', false,)
    }
}

const insertImage = () => {
    const url = prompt('请输入图片地址')
    const selection = updateSelection()
    if(selection)
    if(url && selection.value.range) {
        const img = document.createElement('img')
        img.src = url
        selection.value.range.insertNode(img)
        selection.value.range.collapse(false)
        content.value = (editor.value as any).innerHTML
        //document.execCommand('insertImage', false, img)
    }
}

const insertList = (type: 'ordered' | 'unordered') => {
    document.execCommand('insert' + (type === 'ordered' ? 'OrderedList' : 'UnorderedList'), false,)
}

const undo = () => {
    document.execCommand('undo')
}

const redo = () => {
    document.execCommand('redo')
}

const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault()
    if(!e.clipboardData) {
        alert('e.clipboardData不存在')
        console.log('e.clipboardData不存在')
        return
    }
    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, text)
}

const insertParagraph = (e: KeyboardEvent) => {
    e.preventDefault()
    document.execCommand('insertParagraph', false,)
}
</script>

<style scoped>
.rich-editor {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    min-height: 300px;
}

.toolbar {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
}

.editor {
    border: 1px solid #eee;
    padding: 10px;
    min-height: 200px;
    outline: none;
    font-size: 14px;
}

button {
    padding: 4px 8px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
}

button:hover {
    background-color: #e0e0e0;
}

.bi {
    font-size: 16px;
}
</style>