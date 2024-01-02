import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'step', params: {step: 1} }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
    {
      path: '/formulario/:step',
      name: 'step',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/sucesso',
      name: 'success',
      component: () => import('../views/Success.vue')
    },
  ]
})

export default router
