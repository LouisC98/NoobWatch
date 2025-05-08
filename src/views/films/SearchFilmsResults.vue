<script setup>
import axios from 'axios'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import FilmCard from '@/components/CardComp.vue'

const route = useRoute()
const apiKey = import.meta.env.VITE_TMDB_API_KEY

async function fetchFilms() {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${route.params.q}&include_adult=false&language=fr-FR&page=${route.params.page}`

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    }

    const response = await axios.get(url, options)
    films.value = response.data.results
    console.log(films.value)
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error)
  }
}

onMounted(fetchFilms)

watchEffect(fetchFilms)

const films = ref()

const page = computed(() => {
  return Number(route.params.page)
})
const nextPage = computed(() => {
  return page.value + 1
})
const previousPage = computed(() => {
  return page.value - 1
})

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <h3 class="font-title text-3xl mb-3 text-center">
    Recherche : <span class="font-roboto text-lg ms-2">{{ route.params.q }}</span>
  </h3>
  <div v-if="films && films.length > 0" class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
    <FilmCard
      v-for="film in films"
      :key="film.id"
      :item="film"
      itemType="film"
    />
  </div>
  <div v-else>
    <p class="text-center mt-6">Aucun résultat</p>
  </div>
  <div class="grid grid-cols-3 my-3" v-if="films.length > 0">
    <RouterLink
      :to="{ name: 'films_search', params: { page: previousPage, q: route.params.q } }"
      v-if="route.params.page > 1"
      class="bg-red p-2 rounded text-center text-sm"
      @click="scrollToTop()"
      ><i class="fa-solid fa-arrow-left me-2"></i> Page précédente</RouterLink
    >
    <p class="my-auto text-center">Page {{ page }}</p>
    <RouterLink
      :to="{ name: 'films_search', params: { page: nextPage, q: route.params.q } }"
      class="bg-red p-2 rounded text-center text-sm"
      @click="scrollToTop()"
      >Page suivante <i class="fa-solid fa-arrow-right ms-2"></i
    ></RouterLink>
  </div>
</template>
