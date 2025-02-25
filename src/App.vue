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
  const threshold = window.innerHeight * 0.65;
  isScrolled.value = window.scrollY > threshold;
}

onMounted(async () => {
  window.addEventListener('scroll', checkScroll)
  await currencyStore.fetchCurrencyHistory()
  // fetching currency history
})
</script>
<template>
  <div class="navbar" :class="{ 'changed-color': isScrolled }">
    <div class="nav">
      <img src="./assets/image copy.png" height="35rem" />
      <div class="navtext" :class="{ 'changed-colortext': isScrolled }" @click="goToHome">Home</div>
      <div class="navtext" :class="{ 'changed-colortext': isScrolled }" @click="goToOmniConvert">
        OmniConvert
      </div>
      <div class="navtext" :class="{ 'changed-colortext': isScrolled }" @click="goToResult">
        FX Chart
      </div>
      <div class="navtext" :class="{ 'changed-colortext': isScrolled }" @click="goToAbout">
        About Us
      </div>
    </div>
  </div>
  <RouterView />
</template>

<style scoped>
.navbar {
  position: fixed;
  width: 100vw;

  background: rgba(42, 221, 42, 0.19);
}
.nav {
  display: flex;
  gap: 2rem;
  padding: 0.5rem 0.8rem;
}

.navtext {
  padding-top: 0.5vh;
  font-family: 'Arial';
  font-style: normal;
  font-weight: bold;
  font-size: 1.7rem;
  line-height: 1.8rem;
  letter-spacing: 0.1em;
  cursor: pointer;

  color: rgba(42, 221, 42, 0.17);

  -webkit-text-stroke: 0.12rem white;
}

.changed-color {
  background: #18c218;
}
.changed-colortext {
  color: white;
  -webkit-text-stroke: 0rem;
}
</style>
