<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  itemType: {
    type: String,
    default: 'film',
    validator: (value) => ['film', 'tv'].includes(value)
  }
})

const imgURL = 'https://image.tmdb.org/t/p/w500'
</script>

<template>
  <RouterLink
    :to="{ name: itemType, params: { id: item.id } }"
    class="relative group transition-transform duration-300 hover:scale-105 overflow-hidden rounded-md"
  >
    <!-- Image -->
    <div class="relative aspect-[2/3] overflow-hidden">
      <img
        :src="imgURL + item.poster_path"
        :alt="`poster de ${itemType === 'film' ? 'film' : 'série'} ${itemType === 'film' ? item.title : item.name}`"
        class="w-full h-full object-cover"
      />

      <!-- Netflix-style gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
    </div>

    <!-- Title and Rating -->
    <div class="absolute bottom-0 left-0 right-0 p-3">
      <h4 class="font-bold text-white text-base mb-1 line-clamp-1">
        {{ itemType === 'film' ? item.title : item.name }}
      </h4>

      <div class="flex justify-between items-center">
        <!-- Rating Badge -->
        <span class="text-xs font-semibold text-white bg-red inline-block px-2 py-0.5 rounded-sm">
          {{ Number(item.vote_average).toFixed(1) }}
        </span>

        <!-- Date -->
        <span class="text-xs text-white/80">
          {{ (itemType === 'film' ? item.release_date : item.first_air_date)?.substring(0, 4) }}
        </span>
      </div>
    </div>

    <!-- Hover overlay with play icon (Netflix style) -->
    <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div class="w-12 h-12 rounded-full bg-red/80 flex items-center justify-center">
        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4.5 3.5A.5.5 0 0 0 4 4v8a.5.5 0 0 0 .8.4l6-4a.5.5 0 0 0 0-.8l-6-4a.5.5 0 0 0-.3-.1z"/>
        </svg>
      </div>
    </div>
  </RouterLink>
</template>