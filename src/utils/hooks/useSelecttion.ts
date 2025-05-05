import { ref, onMounted, onUnmounted } from 'vue'

const useSelection = () => {
    const selection = ref({
        text: '',
        range: null as Range | null,
        isCollapsed: false,
        anchorNode: null as Node | null,
        focusNode: null as Node | null
    })

    const updateSelection = () => {
        const winSelection = document.getSelection()
        if(!winSelection) {
            return
        }
        selection.value = {
            text: winSelection.toString(),
            range: winSelection.getRangeAt(0),
            isCollapsed: winSelection.isCollapsed,
            anchorNode: winSelection.anchorNode,
            focusNode: winSelection.focusNode
        }
    }

    onMounted(() => {
        window.addEventListener('selectionchange', updateSelection)
    })

    onUnmounted(() => {
        window.removeEventListener('selectionchange', updateSelection)
    })

    return {
        selection
    }
}

export default useSelection