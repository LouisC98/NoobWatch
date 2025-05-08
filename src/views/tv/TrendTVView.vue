<script setup>
import axios from 'axios'
import { onMounted, ref, watchEffect } from 'vue'
import FilmCard from '@/components/CardComp.vue'

const apiKey = import.meta.env.VITE_TMDB_API_KEY

async function fetchTVShows() {
  try {
    const url = 'https://api.themoviedb.org/3/trending/tv/week?language=fr-FR'
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
</script>

<template>
  <h3 class="font-title text-3xl mb-3 text-center">Séries tendances cette semaine</h3>
  <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
    <FilmCard v-for="show in tvShows" :key="show.id" :item="show" itemType="tv" />
  </div>
</template>
