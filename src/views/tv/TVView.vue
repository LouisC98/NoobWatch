<script setup>
import axios from 'axios'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const apiKey = import.meta.env.VITE_TMDB_API_KEY
const ytKey = import.meta.env.VITE_YT_API_KEY
const imgURL = 'https://image.tmdb.org/t/p/w500'
const backdropURL = 'https://image.tmdb.org/t/p/original'

const tvShow = ref({})
const videoId = ref({})
const watchProviders = ref({})
const seasons = ref([])
const loading = ref(true)

// Titre dynamique avec computed qui se met à jour automatiquement
const pageTitle = computed(() => {
  if (tvShow.value?.name) {
    const year = tvShow.value.first_air_date?.substring(0, 4) || ''
    return `${tvShow.value.name} (${year}) - Noob Watch`
  }
  return 'Détails de la série - Noob Watch'
})

// Observer qui met à jour le titre dès que pageTitle change
watch(
  pageTitle,
  (newTitle) => {
    document.title = newTitle
  },
  { immediate: true }
)
// Recharger les données si l'ID change
watch(() => route.params.id, fetchTVShow, { immediate: true })
async function fetchTVShow() {
  try {
    loading.value = true
    const url = `https://api.themoviedb.org/3/tv/${route.params.id}?language=fr-EU`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    }
    const response = await axios.get(url, options)
    tvShow.value = response.data
    seasons.value = response.data.seasons

    // récup video yt
    try {
      const url = 'https://www.googleapis.com/youtube/v3/search'
      const options = {
        params: {
          key: ytKey,
          part: 'snippet',
          q: `${tvShow.value.name} official tv show trailer VF`,
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
      const url = `https://api.themoviedb.org/3/tv/${route.params.id}/watch/providers`
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }

      const response = await axios.get(url, options)
      watchProviders.value = response.data.results.FR?.flatrate || []
    } catch (error) {
      console.log(error)
      watchProviders.value = []
    }
  } catch (error) {
    console.log(error)
    tvShow.value = null
  } finally {
    loading.value = false
  }
}
async function pushToWiflix(tvShowTitle) {
  // Texte à copier
  const textToCopy = tvShowTitle
  const url = 'https://wiflix.name'

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
async function pushToYT(showTitle) {
  if (videoId.value == null) {
    const url =
      'https://www.youtube.com/results?search_query=' +
      showTitle.split(' ').join('+') +
      '+official+tv+show+trailer+VF'
    console.log(url)
    window.open(url, '_blank')
  } else {
    const url = 'https://www.youtube.com/watch?v=' + videoId.value
    window.open(url, '_blank')
  }
}

onMounted(fetchTVShow)

const frameWidth = computed(() => {
  const screenWidth = window.innerWidth
  if (screenWidth > 640) {
    return 640 - 50
  } else {
    return screenWidth - 32
  }
})
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center min-h-[50vh]">
    <div class="w-12 h-12 rounded-full border-4 border-red border-t-transparent animate-spin"></div>
  </div>

  <div v-else-if="tvShow" class="-mx-2 sm:mx-0">
    <!-- Hero section with backdrop -->
    <div class="relative">
      <!-- Backdrop image -->
      <div class="w-full h-[50vh] md:h-[60vh] relative">
        <img
          :src="backdropURL + tvShow.backdrop_path"
          :alt="tvShow.name + ' backdrop'"
          class="w-full h-full object-cover object-center"
        />
        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

        <!-- Content overlaid on backdrop -->
        <div
          class="absolute bottom-0 left-0 w-full p-4 md:p-6 flex flex-col md:flex-row items-start md:items-end"
        >
          <!-- Poster (hidden on mobile, shown on larger screens) -->
          <img
            :src="imgURL + tvShow.poster_path"
            :alt="'poster de la série : ' + tvShow.name"
            class="hidden md:block w-32 md:w-40 rounded-md shadow-lg mr-6"
            loading="lazy"
          />

          <!-- Show info -->
          <div class="w-full md:flex-1">
            <h1 class="text-3xl md:text-4xl font-bold mb-2 text-white">{{ tvShow.name }}</h1>

            <!-- Show specs row -->
            <div class="flex flex-wrap items-center gap-3 mb-3 text-sm text-white/90">
              <span class="bg-red px-2 py-0.5 rounded-sm">{{
                Number(tvShow.vote_average).toFixed(1)
              }}</span>
              <span>{{ tvShow.first_air_date?.substring(0, 4) }}</span>
              <span
                >{{ tvShow.number_of_seasons }} saison{{
                  tvShow.number_of_seasons > 1 ? 's' : ''
                }}</span
              >
            </div>

            <!-- Watch buttons -->
            <div class="flex gap-2 mt-4">
              <button
                @click="pushToYT(tvShow.name)"
                class="flex items-center bg-white text-black py-2 px-4 rounded-md hover:bg-white/90 transition"
              >
                <i class="fa-solid fa-play mr-2"></i>
                Voir la bande-annonce
              </button>
              <a
                href="#providerSection"
                v-if="watchProviders && watchProviders.length > 0"
                class="flex items-center bg-transparent border border-white/40 text-white py-2 px-4 rounded-md hover:bg-white/10 transition"
              >
                <i class="fa-solid fa-info-circle mr-2"></i>
                Plus d'infos
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="px-4 py-6">
      <!-- Overview section -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-3">Synopsis</h2>
        <p v-if="tvShow.overview" class="text-white/80 leading-relaxed">
          {{ tvShow.overview }}
        </p>
        <p v-else class="text-white/50 italic">Pas de synopsis disponible</p>
      </section>

      <!-- Genres section -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-3">Genres</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="genre in tvShow.genres"
            :key="genre.id"
            class="bg-transparent border border-white/20 px-3 py-1 rounded-full text-sm text-white/80"
          >
            {{ genre.name }}
          </span>
        </div>
      </section>

      <!-- Trailer section -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-3">Bande-annonce</h2>
        <div class="relative overflow-hidden rounded-lg bg-black/30">
          <iframe
            v-if="videoId"
            :width="frameWidth"
            :height="(frameWidth * 9) / 16"
            :src="'https://www.youtube.com/embed/' + videoId"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="mx-auto"
          ></iframe>
          <div v-else class="flex justify-center items-center h-48 bg-black/40 rounded-lg">
            <button
              @click="pushToYT(tvShow.name)"
              class="flex items-center bg-red text-white py-2 px-4 rounded-md hover:bg-red/90 transition"
            >
              <i class="fa-brands fa-youtube mr-2"></i>
              Rechercher sur YouTube
            </button>
          </div>
        </div>
      </section>

      <!-- Seasons section -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-3">Saisons</h2>
        <div class="space-y-4">
          <div
            v-for="season in seasons"
            :key="season.id"
            class="flex bg-black/20 rounded-lg overflow-hidden hover:bg-black/30 transition cursor-pointer"
          >
            <img
              :src="season.poster_path ? imgURL + season.poster_path : '/images/no-poster.png'"
              :alt="'poster de ' + season.name"
              class="w-20 h-30 object-cover"
            />
            <div class="p-3 flex-1">
              <h3 class="font-bold text-lg">{{ season.name }}</h3>
              <div class="flex justify-between mt-1 text-sm text-white/70">
                <span
                  >{{ season.episode_count }} épisode{{ season.episode_count > 1 ? 's' : '' }}</span
                >
                <span>{{ season.air_date?.substring(0, 4) || 'À venir' }}</span>
              </div>
              <p v-if="season.overview" class="mt-2 text-sm text-white/60 line-clamp-2">
                {{ season.overview }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Watch providers section -->
      <section class="mb-8" id="providerSection">
        <h2 class="text-xl font-semibold mb-3">Où regarder</h2>

        <div v-if="watchProviders && watchProviders.length > 0" class="bg-black/30 rounded-lg p-4">
          <div class="flex items-center mb-3">
            <div class="w-1.5 h-5 bg-red rounded-sm mr-2"></div>
            <h3 class="text-white font-medium">Disponible en streaming sur</h3>
          </div>

          <div class="flex flex-wrap gap-4">
            <div
              v-for="provider in watchProviders"
              :key="provider.id"
              class="provider-card group flex flex-col items-center"
              style="width: 85px"
            >
              <div class="relative overflow-hidden rounded-md bg-black/40">
                <!-- Logo -->
                <img
                  :src="imgURL + provider.logo_path"
                  :alt="provider.provider_name"
                  class="w-16 h-16 object-cover"
                  loading="lazy"
                />
              </div>

              <!-- Provider name avec ellipsis pour les noms longs -->
              <p
                class="text-center text-xs mt-1.5 text-white/80 group-hover:text-white transition-colors w-full truncate px-1"
              >
                {{ provider.provider_name }}
              </p>
            </div>
          </div>
        </div>

        <div v-else class="bg-black/30 rounded-lg overflow-hidden">
          <!-- Header -->
          <div class="bg-black/50 p-3 border-b border-white/10">
            <p class="text-center text-white/80">
              Pas encore disponible en streaming officiel en France
            </p>
          </div>
        </div>
        <!-- Alternative -->
        <div class="p-4">
          <div class="flex items-center mb-3">
            <div class="w-1.5 h-5 bg-red rounded-sm mr-2"></div>
            <h3 class="text-white font-medium">Alternatives</h3>
          </div>

          <div class="flex justify-center items-center py-2">
            <button
              @click="pushToWiflix(tvShow.name)"
              class="wiflix-button flex items-center gap-2 bg-gradient-to-r from-black/60 to-red/20 hover:from-red/20 hover:to-black/60 border border-red/40 py-2.5 px-5 rounded-md transition-all duration-300 group"
            >
              <i class="fa-solid fa-search text-red group-hover:text-white transition-colors"></i>
              <span class="font-title text-red text-xl group-hover:text-white transition-colors"
                >Wiflix</span
              >
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
