<script setup>
import axios from 'axios'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import FilmCard from '@/components/CardComp.vue'

const route = useRoute()
const apiKey = import.meta.env.VITE_TMDB_API_KEY

async function fetchTVShows() {
  try {
    const url = `https://api.themoviedb.org/3/tv/popular?language=fr-FR&page=${route.params.page}&region=FR`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    }

    const response = await axios.get(url, options)
    tvShows.value = response.data.results
  } catch (error) {
    console.error('Erreur lors de la récupération des séries:', error)
  }
}

onMounted(fetchTVShows)

watchEffect(fetchTVShows)

const tvShows = ref()

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
  <h3 class="font-title text-3xl mb-3 text-center">Séries populaires</h3>
  <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
    <FilmCard v-for="show in tvShows" :key="show.id" :item="show" itemType="tv" />
  </div>
  <div class="grid grid-cols-3 my-3">
    <RouterLink
      :to="{ name: 'tv_popular', params: { page: previousPage } }"
      v-if="route.params.page > 1"
      class="bg-red p-2 rounded text-center text-sm"
      @click="scrollToTop()"
      ><i class="fa-solid fa-arrow-left me-2"></i> Page précédente</RouterLink
    >
    <p class="my-auto text-center">Page {{ page }}</p>
    <RouterLink
      :to="{ name: 'tv_popular', params: { page: nextPage } }"
      class="bg-red p-2 rounded text-center text-sm"
      @click="scrollToTop()"
      >Page suivante <i class="fa-solid fa-arrow-right ms-2"></i
    ></RouterLink>
  </div>
</template>
