<script setup>
import { ref, onMounted } from 'vue'

const showInstallButton = ref(false)
const deferredPrompt = ref(null)

onMounted(() => {
  // Écouter l'événement beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (e) => {
    // Empêcher Chrome d'afficher automatiquement le prompt
    e.preventDefault()

    // Sauvegarder l'événement pour l'utiliser plus tard
    deferredPrompt.value = e

    // Afficher le bouton d'installation
    showInstallButton.value = true
  })

  // Masquer le bouton si l'app est déjà installée
  window.addEventListener('appinstalled', () => {
    showInstallButton.value = false
    deferredPrompt.value = null
  })
})

function installApp() {
  if (!deferredPrompt.value) {
    return
  }

  // Afficher le prompt d'installation
  deferredPrompt.value.prompt()

  // Attendre que l'utilisateur réponde
  deferredPrompt.value.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log("Utilisateur a accepté l'installation")
    } else {
      console.log("Utilisateur a refusé l'installation")
    }
    // Réinitialiser
    deferredPrompt.value = null
  })
}
</script>

<template>
  <button
    v-if="showInstallButton"
    @click="installApp"
    class="fixed bottom-5 right-5 bg-red text-white rounded-full shadow-lg z-50 transition-transform duration-200 hover:scale-105 active:scale-100 flex items-center gap-2 p-4 md:px-4"
    aria-label="Installer l'application"
  >
    <i class="fa-solid fa-download"></i>
    <span class="hidden md:inline">Installer</span>
  </button>
</template>
