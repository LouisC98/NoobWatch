<script setup>
import axios from 'axios'
import { onMounted, ref, watchEffect } from 'vue'

const apiKey = import.meta.env.VITE_TMDB_API_KEY
const imgURL = 'https://image.tmdb.org/t/p/w500'

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
  <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2">
    <RouterLink
      :to="{ name: 'film', params: { id: film.id } }"
      v-for="film in films"
      :key="film.id"
      class="shadow-grey border border-grey rounded shadow mx-auto w-36 flex flex-wrap justify-between"
    >
      <div>
        <img
          :src="imgURL + film.poster_path"
          :alt="'poster du film ' + film.title"
          class="rounded-t w-36 mx-auto"
        />
      </div>
      <h4 class="font-bold text-center m-auto p-1">
        {{ film.title }}
      </h4>
      <div class="flex flex-wrap content-end p-1">
        <p class="text-grey text-sm sm:text-md">
          <span class="font-bold">Note :</span> {{ film.vote_average.toFixed(1) }}
        </p>
        <p class="text-grey text-sm sm:text-md">
          <span class="font-bold">Sortie :</span> {{ film.release_date }}
        </p>
      </div>
    </RouterLink>
  </div>
</template>
