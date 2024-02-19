<script setup>
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const inputStatus = ref(false)
const inputSearch = ref('')
const searchInputRef = ref(null)

async function handleInput() {
  if (inputSearch.value === '') {
    inputStatus.value = !inputStatus.value
    nextTick(() => {
      searchInputRef.value.focus()
    })
  } else {
    router.push({ name: 'films_search', params: { page: 1, q: inputSearch.value } })
    inputStatus.value = false
    inputSearch.value = ''
  }
}
function cancelInput() {
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
            v-if="inputStatus"
            class="fa-solid fa-xmark text-3xl me-1 cursor-pointer"
          ></i>
        </div>
        <input
          :class="inputStatus ? 'visible' : 'hidden'"
          ref="searchInputRef"
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
