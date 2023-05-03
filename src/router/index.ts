import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/partyEditor',
      name: 'partyEditor',
      component: () => import('@/views/CalculatorView.vue')
    },
    {
      path: '/partySearcher',
      name: 'partySearcher',
      component: () => import('@/views/PartySearcherView.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('@/views/TableListView.vue')
    },
    {
      path: '/table/:table_id',
      name: 'table_content',
      component: () => import('@/views/table/TableContentView.vue')
    },
    {
      path: '/profile/character/:unit_id',
      name: 'character_view',
      component: () => import('@/views/profile/CharacterView.vue')
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('@/views/EditorView.vue')
    },
    {
      path: '/editor/character',
      name: 'character_editor',
      component: () => import('@/views/editor/CharacterEditorView.vue')
    },
    {
      path: '/editor/equipment',
      name: 'equipment_editor',
      component: () => import('@/views/editor/EquipmentEditorView.vue')
    },
    {
      path: '/editor/table',
      name: 'table_editor',
      component: () => import('@/views/editor/TableEditorView.vue')
    },
    {
      path: '/test/room',
      name: 'test_room',
      component: () => import('@/views/TestRoomView.vue')
    },
    {
      path: '/test/player',
      name: 'test_player',
      component: () => import('@/views/TestPlayerView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/pure/test',
      name: 'pure_test',
      component: () => import('@/views/pure/TestView.vue')
    },
    {
      path: '/card/unit',
      name: 'card_unit',
      component: () => import('@/views/card/UnitCardView.vue')
    },
    {
      path: '/card/room',
      name: 'room_card',
      component: () => import('@/views/card/RoomCardView.vue')
    },
  ]
})

export default router
