<script setup>
import axios from 'axios'
import { onMounted, ref, watchEffect } from 'vue'
import FilmCard from '@/components/CardComp.vue'

const apiKey = import.meta.env.VITE_TMDB_API_KEY

async function fetchFilms() {
  try {
    const url = 'https://api.themoviedb.org/3/trending/movie/week?language=fr-FR'
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
</script>

<template>
  <h3 class="font-title text-3xl mb-3 text-center">Films tendances cette semaine</h3>
  <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
    <FilmCard v-for="film in films" :key="film.id" :item="film" itemType="film" />
  </div>
</template>
