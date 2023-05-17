import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Movie from '../views/Movie.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Films populaires',
      },
    },
    {
      path: '/movie/:id',
      name: 'Movie',
      component: Movie,
      meta: {
        title: 'Film',
      },
    },
  ],
})
