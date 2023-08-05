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
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/partyEditor',
      name: 'partyEditor',
      component: () => import('@/views/calculator/CalculatorView.vue')
    },
    {
      path: '/partySearcher',
      name: 'partySearcher',
      component: () => import('@/views/PartySearcherView.vue')
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('@/views/EventsView.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('@/views/CalendarView.vue')
    },
    {
      path: '/pr/:release_id',
      name: 'partyRelease',
      component: () => import('@/views/party/PartyReleaseView.vue')
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
      path: '/editor',
      name: 'editor',
      component: () => import('@/views/EditorView.vue')
    },
    {
      path: '/editor/table',
      name: 'table_editor',
      component: () => import('@/views/editor/TableEditorView.vue')
    },
    {
      path: '/editor/nickname',
      name: 'nickname_editor',
      component: () => import('@/views/editor/NicknameEditorView.vue')
    },
    {
      path: '/editor/event',
      name: 'event_editor',
      component: () => import('@/views/editor/EventEditorView.vue')
    },
    {
      path: '/gacha',
      name: 'test_gacha_list',
      component: () => import('@/views/test/GachaList.vue')
    },
    {
      path: '/card/test',
      name: 'card_test',
      component: () => import('@/views/TestCardView.vue')
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
      path: '/card/unit',
      name: 'card_unit',
      component: () => import('@/views/card/UnitCardView.vue')
    },
    {
      path: '/card/armament',
      name: 'card_armament',
      component: () => import('@/views/card/ArmamentCardView.vue')
    },
    {
      path: '/card/table',
      name: 'card_table',
      component: () => import('@/views/card/TableCardView.vue')
    },
    {
      path: '/card/room',
      name: 'room_card',
      component: () => import('@/views/card/RoomCardView.vue')
    },
  ]
})

export default router
