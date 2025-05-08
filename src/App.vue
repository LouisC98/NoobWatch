<script setup>
import { RouterView } from 'vue-router'
import HeaderComp from './components/HeaderComp.vue'
import axios from 'axios'
import { ref, provide } from 'vue'

const apiKey = import.meta.env.VITE_TMDB_API_KEY
const contentMode = ref('films')
provide('contentMode', contentMode)

const url = 'https://api.themoviedb.org/3/authentication'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
}

axios.get(url, options).catch((err) => console.error('error:' + err))
</script>

<template>
  <HeaderComp />
  <div class="max-w-screen-sm mx-auto p-2">
    <RouterView />
  </div>
</template>
