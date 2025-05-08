import { createRouter, createWebHistory } from 'vue-router'
import HomeFilmsView from '../views/films/HomeFilmsView.vue'
import FilmView from '../views/films/FilmView.vue'
import PopularFilmsView from '../views/films/PopularFilmsView.vue'
import TrendFilmsView from '../views/films/TrendFilmsView.vue'
import RatedFilmsView from '../views/films/RatedFilmsView.vue'
import SearchResults from '../views/films/SearchFilmsResults.vue'

// Import des composants TV
import HomeTVView from '../views/tv/HomeTVView.vue'
import TVView from '../views/tv/TVView.vue'
import PopularTVView from '../views/tv/PopularTVView.vue'
import TrendTVView from '../views/tv/TrendTVView.vue'
import RatedTVView from '../views/tv/RatedTVView.vue'
import SearchTVResults from '../views/tv/SearchTVResults.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/films/discover/1'
    },

    // Routes Films
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
    },

    // Routes TV
    {
      path: '/tv/search/:q/:page',
      name: 'tv_search',
      component: SearchTVResults
    },
    {
      path: '/tv/popular/:page',
      name: 'tv_popular',
      component: PopularTVView
    },
    {
      path: '/tv/trend',
      name: 'tv_trend',
      component: TrendTVView
    },
    {
      path: '/tv/top_rated/:page',
      name: 'tv_top_rated',
      component: RatedTVView
    },
    {
      path: '/tv/discover/:page',
      name: 'tv_home',
      component: HomeTVView
    },
    {
      path: '/tv/:id',
      name: 'tv',
      component: TVView
    }
  ]
})

export default router