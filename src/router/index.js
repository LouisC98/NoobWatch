import { createRouter, createWebHistory } from 'vue-router'
import HomeFilmsView from '../views/films/HomeFilmsView.vue'
import FilmView from '../views/films/FilmView.vue'
import PopularFilmsView from '../views/films/PopularFilmsView.vue'
import TrendFilmsView from '../views/films/TrendFilmsView.vue'
import RatedFilmsView from '../views/films/RatedFilmsView.vue'
import SearchResults from '../views/films/SearchResults.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/films/discover/1'
    },

    {
      path: '/films/search/:q/:page',
      name: 'films_search',
      component: SearchResults
    },
    {
      path: '/films/popular/:page',
      name: 'films_popular',
      component: PopularFilmsView
    },
    {
      path: '/films/trend',
      name: 'films_trend',
      component: TrendFilmsView
    },
    {
      path: '/films/top_rated/:page',
      name: 'films_top_rated',
      component: RatedFilmsView
    },
    {
      path: '/films/discover/:page',
      name: 'films_home',
      component: HomeFilmsView
    },
    {
      path: '/film/:id',
      name: 'film',
      component: FilmView
    }
  ]
})

export default router
