import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue'),
    meta: { title: 'Home' }
  },
  {
    path: '/transferencia',
    name: 'transferencia',
    component: () => import('../views/financeiro/NovaTransferencia.vue'),
    meta: { title: 'Nova Transferência' }
  },
  {
    path: '/extrato',
    name: 'extrato',
    component: () => import('../views/financeiro/ExtratoTransferencias.vue'),
    meta: { title: 'Extrato Transferências' }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});



export default router;
