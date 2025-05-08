<script setup>
import axios from 'axios'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import FilmCard from '@/components/CardComp.vue'

const route = useRoute()
const apiKey = import.meta.env.VITE_TMDB_API_KEY

async function fetchFilms() {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=${route.params.page}&region=FR`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    }

    const response = await axios.get(url, options)
    films.value = response.data.results
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
  <div>
    <!-- Section title in Netflix style -->
    <h3 class="font-title text-2xl mb-5 text-white">Films populaires</h3>

    <!-- Films grid with Netflix-like spacing -->
    <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
      <FilmCard
        v-for="film in films"
        :key="film.id"
        :item="film"
        itemType="film"
      />
    </div>

    <!-- Pagination in Netflix style -->
    <div class="flex justify-between mt-8 mb-3">
      <button
        v-if="route.params.page > 1"
        @click="() => { $router.push({ name: 'films_popular', params: { page: previousPage } }); scrollToTop(); }"
        class="bg-transparent border border-gray-600 text-white hover:bg-red hover:border-red transition-colors duration-300 py-2 px-4 rounded-md flex items-center"
      >
        <i class="fa-solid fa-arrow-left me-2"></i> Page précédente
      </button>
      <div v-else class="w-[120px]"></div>

      <p class="my-auto text-center text-white/70">Page {{ page }}</p>

      <button
        @click="() => { $router.push({ name: 'films_popular', params: { page: nextPage } }); scrollToTop(); }"
        class="bg-transparent border border-gray-600 text-white hover:bg-red hover:border-red transition-colors duration-300 py-2 px-4 rounded-md flex items-center"
      >
        Page suivante <i class="fa-solid fa-arrow-right ms-2"></i>
      </button>
    </div>
  </div>
</template>