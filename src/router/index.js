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
      redirect: '/films/discover/1',
      meta: {
        title: 'Films à découvrir - Noob Watch'
      }
    },

    // Routes Films
    {
      path: '/films/search/:q/:page',
      name: 'films_search',
      component: SearchResults,
      meta: {
        title: 'Recherche de films - Noob Watch'
      }
    },
    {
      path: '/films/popular/:page',
      name: 'films_popular',
      component: PopularFilmsView,
      meta: {
        title: 'Films populaires - Noob Watch'
      }
    },
    {
      path: '/films/trend',
      name: 'films_trend',
      component: TrendFilmsView,
      meta: {
        title: 'Films en tendance - Noob Watch'
      }
    },
    {
      path: '/films/top_rated/:page',
      name: 'films_top_rated',
      component: RatedFilmsView,
      meta: {
        title: 'Films les mieux notés - Noob Watch'
      }
    },
    {
      path: '/films/discover/:page',
      name: 'films_home',
      component: HomeFilmsView,
      meta: {
        title: 'Films à découvrir - Noob Watch'
      }
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
      component: SearchTVResults,
      meta: {
        title: 'Recherche de séries - Noob Watch'
      }
    },
    {
      path: '/tv/popular/:page',
      name: 'tv_popular',
      component: PopularTVView,
      meta: {
        title: 'Séries populaires - Noob Watch'
      }
    },
    {
      path: '/tv/trend',
      name: 'tv_trend',
      component: TrendTVView,
      meta: {
        title: 'Séries en tendance - Noob Watch'
      }
    },
    {
      path: '/tv/top_rated/:page',
      name: 'tv_top_rated',
      component: RatedTVView,
      meta: {
        title: 'Séries les mieux notées - Noob Watch'
      }
    },
    {
      path: '/tv/discover/:page',
      name: 'tv_home',
      component: HomeTVView,
      meta: {
        title: 'Séries à découvrir - Noob Watch'
      }
    },
    {
      path: '/tv/:id',
      name: 'tv',
      component: TVView,
      meta: {
        title: 'Détails de la série - Noob Watch'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'Noob Watch - Films et Séries'
  }
  next()
})
export default router
