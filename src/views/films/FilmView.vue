<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const apiKey = import.meta.env.VITE_TMDB_API_KEY
const ytKey = import.meta.env.VITE_YT_API_KEY
const imgURL = 'https://image.tmdb.org/t/p/w500'

const film = ref({})
const videoId = ref({})
const watchProviders = ref({})

const fetchFilm = async () => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${route.params.id}?language=fr-EU`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    }
    const response = await axios.get(url, options)
    film.value = response.data

    // récup video yt
    try {
      const url = 'https://www.googleapis.com/youtube/v3/search'
      const options = {
        params: {
          key: ytKey,
          part: 'snippet',
          q: `${film.value.title} official trailer VF`,
          type: 'video',
          maxResults: 1
        }
      }

      const response = await axios.get(url, options)
      videoId.value = response.data.items[0].id.videoId
    } catch (error) {
      console.log(error)
      videoId.value = null
    }

    // récup watch provider
    try {
      const url = `https://api.themoviedb.org/3/movie/${route.params.id}/watch/providers`
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }

      const response = await axios.get(url, options)
      watchProviders.value = response.data.results.FR.flatrate
    } catch (error) {
      console.log(error)
      watchProviders.value = null
    }
  } catch (error) {
    console.log(error)
  }
}

const pushToWiflix = async (filmTitle) => {
  // Texte à copier
  const textToCopy = filmTitle
  const url = 'https://wiflix.voto/index.php?do=search'

  try {
    // Copier le texte dans le presse-papiers
    await navigator.clipboard.writeText(textToCopy)
    console.log('Texte copié dans le presse-papiers : ', textToCopy)

    const confirmation = window.confirm(
      'Le titre du film à été copié : ' +
        textToCopy +
        '\n' +
        'Vous allez être redirigé vers la recherche Wiflix, voulez-vous continuer ?'
    )
    if (confirmation) {
      console.log('Accepté')
      window.open(url, '_blank')
    } else {
      console.log('Refusé')
    }
  } catch (err) {
    console.error('Erreur lors de la copie dans le presse-papiers : ', err)
  }
}

const pushToYT = async (filmTitle) => {
  if (videoId.value == null) {
    const url =
      'https://www.youtube.com/results?search_query=' +
      filmTitle.split(' ').join('+') +
      '+official+trailer+VF'
    console.log(url)
    window.open(url, '_blank')
  } else {
    const url = 'https://www.youtube.com/watch?v=' + videoId.value

    window.open(url, '_blank')
  }
}

onMounted(fetchFilm)

const frameWidth = computed(() => {
  const screenWidth = window.innerWidth
  if (screenWidth > 640) {
    return 640 - 50
  } else {
    return screenWidth - 50
  }
})

const filmRuntime = computed(() => {
  const runtime = film.value.runtime
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  return hours + 'h ' + minutes + 'min'
})
</script>

<template>
  <div class="grid grid-cols-1 gap-2">
    <img
      :src="imgURL + film.poster_path"
      :alt="'poster du film : ' + film.title"
      class="w-2/3 mx-auto rounded-xl"
    />
    <h2 class="my-4 font-bold text-3xl text-center">{{ film.title }}</h2>
    <div class="border border-grey rounded p-2 mx-auto">
      <span class="font-bold">Résumé : </span>
      <p v-if="film.overview">
        {{ film.overview }}
      </p>
      <p v-else class="text-sm text-center my-2">Pas de résumé disponible</p>
      <div class="mt-2">
        <span class="font-bold me-2">Genres : </span>
        <span class="me-2" v-for="genre in film.genres" :key="genre.id">{{ genre.name }}</span>
      </div>
      <div class="mt-2">
        <span class="font-bold me-2">Date de sortie : </span>
        <span>{{ film.release_date }}</span>
      </div>
      <div class="mt-2">
        <span class="font-bold me-2">Durée : </span>
        <span>{{ filmRuntime }}</span>
      </div>
    </div>
    <div>
      <iframe
        :width="frameWidth"
        :height="(frameWidth * 9) / 16"
        :src="'https://www.youtube.com/embed/' + videoId"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="mx-auto mt-2"
      ></iframe>
      <div class="text-center mt-1">
        <button @click="pushToYT(film.title)" class="text-xs">
          Voir sur YouTube <i class="fa-brands fa-youtube text-red"></i>
        </button>
      </div>
    </div>
    <div class="my-3">
      <p class="mb-2 font-bold">Regarder en streaming sur :</p>
      <div
        v-if="Object.keys(watchProviders).length > 0"
        class="flex flex-wrap justify-center gap-4"
      >
        <div v-for="watchProvider in watchProviders" :key="watchProvider.id" class="flex gap-2">
          <img :src="imgURL + watchProvider.logo_path" alt="" class="w-12 rounded-full" />
          <span class="my-auto">{{ watchProvider.provider_name }}</span>
        </div>
      </div>
      <div v-else class="my-4">
        <p class="text-xs text-center">Pas encore disponible en streaming officiel en France</p>
      </div>
      <div class="mt-2 flex justify-center">
        <p class="my-auto">ou peut-être dispo sur</p>
        <button
          @click="pushToWiflix(film.title)"
          class="ms-1 text-center font-title text-red text-3xl"
        >
          Wiflix
        </button>
      </div>
    </div>
  </div>
</template>
