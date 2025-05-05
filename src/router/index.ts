import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'

import ButtonTEST from '../test/ButtonTEST.vue'
import RichTextEditorTEST from '../test/RichTextEditorTEST.vue'
import FormTEST from '../test/FormTEST.vue'
import VirtualListTEST from '../test/VirtualListTEST.vue'
import WaterMarkTEST from '../test/WaterMarkTEST.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: 'RichTextEditor', },
  { path: '/Button', component: ButtonTEST },
  { path: '/RichTextEditor', component: RichTextEditorTEST },
  { path: '/Form', component: FormTEST },
  { path: '/VirtualList', component: VirtualListTEST },
  { path: '/WaterMark', component: WaterMarkTEST },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router