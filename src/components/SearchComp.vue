<script setup>
import { nextTick, ref, inject, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const contentMode = inject('contentMode', 'films') // Injecter le mode actuel

const isSearchOpen = ref(false)
const inputSearch = ref('')
const searchInputRef = ref(null)
const isSearching = ref(false)

function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    nextTick(() => {
      searchInputRef.value.focus()
    })
  } else {
    inputSearch.value = ''
  }
}

async function handleSearch() {
  if (!inputSearch.value.trim()) {
    return
  }

  isSearching.value = true

  try {
    // Rediriger vers la page de recherche appropriée selon le mode
    if (contentMode.value === 'films') {
      await router.push({
        name: 'films_search',
        params: { page: 1, q: inputSearch.value.trim() }
      })
    } else {
      await router.push({
        name: 'tv_search',
        params: { page: 1, q: inputSearch.value.trim() }
      })
    }
    isSearchOpen.value = false
    inputSearch.value = ''
  } finally {
    isSearching.value = false
  }
}

// Close search when user clicks outside
function handleClickOutside(event) {
  if (isSearchOpen.value && searchInputRef.value && !event.target.closest('.search-container')) {
    isSearchOpen.value = false
  }
}

// Listen for escape key to close search
function handleKeyDown(event) {
  if (event.key === 'Escape' && isSearchOpen.value) {
    isSearchOpen.value = false
  }
}

// Watch for route changes to close the search
watch(() => router.currentRoute.value, () => {
  isSearchOpen.value = false
  inputSearch.value = ''
})

// Add event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="search-container relative">
    <!-- Search toggle button -->
    <button
      @click="toggleSearch"
      class="flex items-center justify-center text-white/80 hover:text-white transition-colors p-1"
      :class="isSearchOpen ? 'text-white' : ''"
    >
      <i class="fa-solid" :class="isSearchOpen ? 'fa-xmark text-xl' : 'fa-magnifying-glass text-xl'"></i>
    </button>

    <!-- Search input field - animated -->
    <div
      class="absolute right-0 top-0 overflow-hidden transition-all duration-300 flex items-center"
      :class="isSearchOpen ? 'w-56 opacity-100' : 'w-0 opacity-0'"
    >
      <form @submit.prevent="handleSearch" class="relative w-full">
        <input
          ref="searchInputRef"
          v-model="inputSearch"
          type="text"
          placeholder="Rechercher un titre..."
          class="w-full bg-black/80 border border-white/20 focus:border-red/70 text-white pl-3 pr-9 py-1.5 rounded-sm outline-none text-sm"
        />
        <button
          type="submit"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
          :disabled="isSearching"
        >
          <i v-if="isSearching" class="fa-solid fa-spinner fa-spin"></i>
          <i v-else class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  </div>
</template>