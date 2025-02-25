<script setup>
import { RouterView } from 'vue-router'

import { ref, onMounted } from 'vue'

import { useCurrencyStore } from '@/stores/currencyStore' // Assuming you're using Pinia

import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push({ hash: '#homepage' })
}

const goToResult = () => {
  router.push({ hash: '#result' })
}

const goToOmniConvert = () => {
  router.push({ hash: '#omniconvert' })
}

const goToAbout = () => {
  router.push({ hash: '#contactBox' })
}

const currencyStore = useCurrencyStore()
const isScrolled = ref(false)

const checkScroll = () => {
  const threshold = window.innerHeight * 1
  isScrolled.value = window.scrollY > threshold
}

onMounted(async () => {
  window.addEventListener('scroll', checkScroll)
  await currencyStore.fetchCurrencyHistory()
  // fetching currency history
})
</script>
