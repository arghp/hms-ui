// Composables
import { createRouter, createWebHistory } from 'vue-router'
import SearchReserve from "@/views/SearchReserve.vue";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
      {
        path: "search-reserve",
        name: "SearchReserve",
        component: () => import('@/views/SearchReserve.vue'),
      },
    ],
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router;
