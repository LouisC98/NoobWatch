<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const inputStatus = ref(false)
const inputSearch = ref('')

const handleInput = async () => {
  if (inputSearch.value === '') {
    inputStatus.value = !inputStatus.value
  } else {
    router.push({ name: 'films_search', params: { page: 1, q: inputSearch.value } })
    inputStatus.value = false
  }
}
const cancelInput = () => {
  inputSearch.value = ''
  inputStatus.value = false
}
</script>

<template>
  <div class="my-auto">
    <form @submit.prevent="handleInput">
      <div class="absolute -translate-x-full flex">
        <div class="bg-black p-1 rounded-s">
          <i
            @click.self="cancelInput"
            v-if="inputStatus === true"
            class="fa-solid fa-xmark text-3xl me-1 cursor-pointer"
          ></i>
        </div>
        <input
          v-if="inputStatus === true"
          type="text"
          class="rounded p-1 bg-grey mb-1"
          placeholder="Recherche nom de film"
          v-model="inputSearch"
        />
      </div>
      <i
        @click.self="handleInput"
        class="fa-solid fa-magnifying-glass ms-2 mt-1 text-3xl cursor-pointer"
      ></i>
    </form>
  </div>
</template>
