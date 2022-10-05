import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/categories',
      name: 'Categories',
      component: () => import(/*webpackChunkName: "Categories" */ "../views/Categories.vue")
    },
    {
      path: '/categories-detail/:id',
      name: 'CategoriesDetail',
      component: () => import(/*webpackChunkName: "CategoriesDetail" */ "../views/CategoriesDetail.vue")
    },
    {
      path: '/top100',
      name: 'TOP100',
      component: () => import(/*webpackChunkName: "TOP100" */ "../views/TOP100.vue")
    },
    {
      path: '/playlist/:id',
      name: 'Playlist',
      component: () => import(/*webpackChunkName: "PlaylistDetail" */ "../views/PlaylistDetail.vue")
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404NotFound',
      component: () => import(/*webpackChunkName: "404NotFound" */ "../views/404.vue")
    },
  ],
});

export default router;
