<script setup>
import { computed, inject, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import SearchComp from './SearchComp.vue'
import router from '@/router/index.js'

const route = useRoute()
const contentMode = inject('contentMode')
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

// Handle scroll for transparent -> solid header transition
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const active = computed(() => {
  return route.name
})

function setContentMode(mode) {
  contentMode.value = mode
  isMobileMenuOpen.value = false
  // Rediriger vers la page d'accueil correspondante
  if (mode === 'films') {
    router.push({ name: 'films_home', params: { page: 1 } })
  } else {
    router.push({ name: 'tv_home', params: { page: 1 } })
  }
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent',
      'py-2 px-4'
    ]"
  >
    <!-- Main header row -->
    <div class="flex items-center justify-between">
      <!-- Left section: Logo and mobile menu toggle -->
      <div class="flex items-center">
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="mr-3 text-white md:hidden">
          <i
            :class="isMobileMenuOpen ? 'fa-solid fa-xmark text-xl' : 'fa-solid fa-bars text-xl'"
          ></i>
        </button>

        <RouterLink
          :to="{ name: contentMode === 'tv' ? 'tv_home' : 'films_home', params: { page: 1 } }"
          class="flex items-center"
        >
          <img src="/images/logo.webp" alt="logo noob movie" class="w-36 sm:w-44" />
        </RouterLink>
      </div>

      <!-- Desktop Navigation - hidden on mobile -->
      <nav class="hidden md:flex items-center space-x-6">
        <!-- Mode selector -->
        <div class="flex items-center space-x-5">
          <button
            class="font-semibold text-xl transition-colors"
            :class="
              contentMode === 'films' ? 'text-red font-bold' : 'text-white/60 hover:text-red/80'
            "
            @click="setContentMode('films')"
          >
            Films
          </button>
          <button
            class="font-semibold text-xl transition-colors"
            :class="contentMode === 'tv' ? 'text-red font-bold' : 'text-white/60 hover:text-red/80'"
            @click="setContentMode('tv')"
          >
            Séries
          </button>
        </div>

        <!-- Category links - Films -->
        <div v-if="contentMode === 'films'" class="flex space-x-5">
          <RouterLink
            :to="{ name: 'films_popular', params: { page: 1 } }"
            class="flex items-center font-medium text-xl transition-colors"
            :class="active === 'films_popular' ? 'text-white' : 'text-white/60 hover:text-white/80'"
          >
            <i class="fa-solid fa-fire text-xl mr-1.5"></i> Populaires
          </RouterLink>

          <RouterLink
            :to="{ name: 'films_trend' }"
            class="flex items-center font-medium text-xl transition-colors"
            :class="active === 'films_trend' ? 'text-white' : 'text-white/60 hover:text-white/80'"
          >
            <i class="fa-solid fa-arrow-trend-up text-xl mr-1.5"></i> Tendances
          </RouterLink>

          <RouterLink
            :to="{ name: 'films_top_rated', params: { page: 1 } }"
            class="flex items-center font-medium text-xl transition-colors"
            :class="
              active === 'films_top_rated' ? 'text-white' : 'text-white/60 hover:text-white/80'
            "
          >
            <i class="fa-regular fa-star text-xl mr-1.5"></i> Mieux notés
          </RouterLink>
        </div>

        <!-- Category links - TV -->
        <div v-else class="flex space-x-5">
          <RouterLink
            :to="{ name: 'tv_popular', params: { page: 1 } }"
            class="flex items-center font-medium text-xl transition-colors"
            :class="active === 'tv_popular' ? 'text-white' : 'text-white/60 hover:text-white/80'"
          >
            <i class="fa-solid fa-fire text-xl mr-1.5"></i> Populaires
          </RouterLink>

          <RouterLink
            :to="{ name: 'tv_trend' }"
            class="flex items-center font-medium text-xl transition-colors"
            :class="active === 'tv_trend' ? 'text-white' : 'text-white/60 hover:text-white/80'"
          >
            <i class="fa-solid fa-arrow-trend-up text-xl mr-1.5"></i> Tendances
          </RouterLink>

          <RouterLink
            :to="{ name: 'tv_top_rated', params: { page: 1 } }"
            class="flex items-center font-medium text-xl transition-colors"
            :class="active === 'tv_top_rated' ? 'text-white' : 'text-white/60 hover:text-white/80'"
          >
            <i class="fa-regular fa-star text-xl mr-1.5"></i> Mieux notées
          </RouterLink>
        </div>
      </nav>

      <!-- Right section: Search -->
      <div>
        <SearchComp />
      </div>
    </div>

    <!-- Mobile menu - shown only on mobile when menu is open -->
    <div v-if="isMobileMenuOpen" class="md:hidden mt-4 bg-black/95 rounded-lg p-3 animate-fadeIn">
      <!-- Mobile mode selector -->
      <div class="flex justify-center space-x-8 py-3 border-b border-gray-800">
        <button
          class="font-medium transition-colors"
          :class="contentMode === 'films' ? 'text-red' : 'text-white/70'"
          @click="setContentMode('films')"
        >
          Films
        </button>
        <button
          class="font-medium transition-colors"
          :class="contentMode === 'tv' ? 'text-red' : 'text-white/70'"
          @click="setContentMode('tv')"
        >
          Séries
        </button>
      </div>

      <!-- Mobile category links -->
      <nav class="pt-3 space-y-4">
        <!-- Films navigation -->
        <div v-if="contentMode === 'films'" class="space-y-4">
          <RouterLink
            :to="{ name: 'films_popular', params: { page: 1 } }"
            class="flex items-center py-2"
            :class="active === 'films_popular' ? 'text-red' : 'text-white/70'"
            @click="isMobileMenuOpen = false"
          >
            <i class="fa-solid fa-fire w-6"></i> Populaires
          </RouterLink>
          <RouterLink
            :to="{ name: 'films_trend' }"
            class="flex items-center py-2"
            :class="active === 'films_trend' ? 'text-red' : 'text-white/70'"
            @click="isMobileMenuOpen = false"
          >
            <i class="fa-solid fa-arrow-trend-up w-6"></i> Tendances
          </RouterLink>

          <RouterLink
            :to="{ name: 'films_top_rated', params: { page: 1 } }"
            class="flex items-center py-2"
            :class="active === 'films_top_rated' ? 'text-red' : 'text-white/70'"
            @click="isMobileMenuOpen = false"
          >
            <i class="fa-regular fa-star w-6"></i> Mieux notés
          </RouterLink>
        </div>

        <!-- TV Shows navigation -->
        <div v-else class="space-y-4">
          <RouterLink
            :to="{ name: 'tv_popular', params: { page: 1 } }"
            class="flex items-center py-2"
            :class="active === 'tv_popular' ? 'text-red' : 'text-white/70'"
            @click="isMobileMenuOpen = false"
          >
            <i class="fa-solid fa-fire w-6"></i> Populaires
          </RouterLink>

          <RouterLink
            :to="{ name: 'tv_trend' }"
            class="flex items-center py-2"
            :class="active === 'tv_trend' ? 'text-red' : 'text-white/70'"
            @click="isMobileMenuOpen = false"
          >
            <i class="fa-solid fa-arrow-trend-up w-6"></i> Tendances
          </RouterLink>

          <RouterLink
            :to="{ name: 'tv_top_rated', params: { page: 1 } }"
            class="flex items-center py-2"
            :class="active === 'tv_top_rated' ? 'text-red' : 'text-white/70'"
            @click="isMobileMenuOpen = false"
          >
            <i class="fa-regular fa-star w-6"></i> Mieux notées
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <!-- Spacer to prevent content from being hidden under fixed header -->
  <div class="h-16 md:h-16"></div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
