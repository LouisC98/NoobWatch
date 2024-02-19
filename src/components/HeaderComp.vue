<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import SearchComp from './SearchComp.vue'

const route = useRoute()

const active = computed(() => {
  return route.name
})
</script>

<template>
  <header class="p-2">
    <div class="flex justify-around">
      <RouterLink :to="{ name: 'films_home', params: { page: 1 } }">
        <img src="/images/logo.webp" alt="logo noob movie" class="w-40 xs:w-48 sm:w-64" />
      </RouterLink>
      <SearchComp />
    </div>

    <nav class="max-w-screen-sm mt-2 grid grid-cols-3 mx-auto xs:text-lg">
      <RouterLink
        :to="{ name: 'films_popular', params: { page: 1 } }"
        class="flex justify-center gap-1 sm:gap-2 my-auto"
        :class="active === 'films_popular' ? 'font-bold' : ''"
        :style="active === 'films_popular' ? 'text-shadow: 0px 0px 3px #f3f3f3' : ''"
        ><i class="fa-solid fa-fire my-auto"></i> Populaires</RouterLink
      >
      <RouterLink
        :to="{ name: 'films_trend' }"
        class="flex justify-center my-auto gap-1 sm:gap-2"
        :class="active === 'films_trend' ? 'font-bold' : ''"
        :style="active === 'films_trend' ? 'text-shadow: 0px 0px 3px #f3f3f3' : ''"
        ><i class="fa-solid fa-arrow-trend-up my-auto"></i>Tendances</RouterLink
      >
      <RouterLink
        :to="{ name: 'films_top_rated', params: { page: 1 } }"
        class="flex justify-center my-auto gap-1 sm:gap-2"
        :class="active === 'films_top_rated' ? 'font-bold' : ''"
        :style="active === 'films_top_rated' ? 'text-shadow: 0px 0px 3px #f3f3f3' : ''"
        ><i class="fa-regular fa-star my-auto me-1"></i>Mieux notés</RouterLink
      >
    </nav>
    <hr class="max-w-screen-xl mx-auto mt-3 shadow shadow-white" />
  </header>
</template>
