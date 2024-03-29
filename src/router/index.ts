import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// import HomeView from '@/views/HomeView.vue'

const views: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    // component: HomeView,
    // component: () => import('@/views/HomeView.vue')
    component: () => import('@/views/calculator/CalculatorView.vue')
  },
  {
    path: '/partyEditor',
    name: 'partyEditor',
    component: () => import('@/views/calculator/CalculatorView.vue')
  },
  {
    path: '/partyRecords',
    component: () => import('@/views/PartyRecordsView.vue')
  },
  {
    path: '/partySearcher',
    name: 'partySearcher',
    component: () => import('@/views/PartySearcherView.vue')
  },
  {
    path: '/cardCreator',
    name: 'cardCreator',
    component: () => import('@/views/CardCreatorView.vue')
  },
  {
    path: '/toolbox',
    name: 'toolbox',
    component: () => import('@/views/ToolboxView.vue')
  },
  // {
  //   path: '/lab',
  //   component: () => import('@/views/LabView.vue')
  // },
  // {
  //   path: '/lab/character',
  //   component: () => import('@/views/lab/CharacterLabView.vue')
  // },
  {
    path: '/events',
    name: 'events',
    component: () => import('@/views/EventsView.vue')
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
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  }
]

const cards: RouteRecordRaw[] = [
  {
    path: '/card/unit',
    component: () => import('@/views/card/CharacterCardView.vue')
  },
  {
    path: '/card/armament',
    component: () => import('@/views/card/EquipmentCardView.vue')
  },
  {
    path: '/card/character',
    component: () => import('@/views/card/CharacterCardView.vue')
  },
  {
    path: '/card/equipment',
    component: () => import('@/views/card/EquipmentCardView.vue')
  },
  {
    path: '/card/table',
    component: () => import('@/views/card/TableCardView.vue')
  },
  {
    path: '/card/party_refer',
    component: () => import('@/views/card/PartyReferCardView.vue')
  },
  {
    path: '/card/room',
    component: () => import('@/views/card/RoomCardView.vue')
  }
]

const index = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...views,
    ...cards,
    {
      path: '/pure/partySearcher',
      name: 'pure_partySearcher',
      component: () => import('@/views/PurePartySearcherView.vue')
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
      path: '/editor/character',
      component: () => import('@/views/editor/CharacterEditorView.vue')
    },
    {
      path: '/editor/query',
      component: () => import('@/views/editor/QueryEditorView.vue')
    },
    {
      path: '/editor/table',
      name: 'table_editor',
      component: () => import('@/views/table/TableEditorView.vue')
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
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

export default index
