<script setup>
import { onMounted, ref, computed } from 'vue'
import { useCurrencyStore } from '../stores/currencyStore'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import axios from 'axios'

const conversions = ref([])

const currencyStore = useCurrencyStore()

const currency = ref('United States Dollar (USD)')

const extractCurrencyInfo = (formattedValue) => {
  const code = formattedValue.slice(-4, -1)
  const name = formattedValue.slice(0, -5).trim()
  return [code, name]
}

const getConversions = async () => {
  try {
    const code = extractCurrencyInfo(currency.value)[0]
    console.log(code)
    const response = await axios.get(`https://api.frankfurter.app/latest?base=${code}`)
    conversions.value = Object.keys(response.data.rates).map((key) => [
      key,
      response.data.rates[key],
    ])
    console.log(conversions)
  } catch (e) {
    console.error(e)
  }
}

const currencychange = computed({
  get: () => currency.value,
  set: (value) => {
    currency.value = `${value[1]} (${value[0]})`
    getConversions()
  },
})

console.log('hello')

onMounted(() => {
  getConversions()
})
</script>

<template>
  <div class="omnibox">
    <div>
      <h1 class="omnihead"><u>OmniConvert</u></h1>
      <p class="omnidescript">
        A market exchange rates table that displays exchange between a currency to every other
        currency.
      </p>
    </div>
    <div class="choicebox">
      <h3 class="choicehead">Choose a currency :</h3>
      <v-select
        :options="currencyStore.currencyUnits"
        :searchable="true"
        v-model="currencychange"
        @input="getConversions"
        class="vselect"
      >
        <template v-slot:option="val">
          {{ val[1] }}
          ({{ val[0] }})
          <img
            class="countryFlag"
            :src="`/flags/${val[0].substring(0, 2)}.png`"
            width="25"
            alt="Flag"
          />
        </template>
      </v-select>
    </div>

    <div class="headers" style="margin-top: 2rem">
      <div style="padding: 0.4rem; width: 15vw" class="name">Unicode</div>
      <div style="display: flex">
        <hr style="height: 2rem; width: 0.1rem; color: #18c218" />
        <div
          style="
            padding: 0.4rem;
            width: 6.6vw;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 300;
            font-size: 1.1rem;
            line-height: 1.2rem;
          "
        >
          Rate
        </div>
      </div>
    </div>
    <div>
      <ul v-for="(currency, index) in conversions" :key="index" style="display: grid" class="table">
        <div class="name">{{ currency[0] }}</div>
        <hr style="color: #18c218" />
        <div class="rate">{{ currency[1] }}</div>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.name {
  padding: 0.4rem;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.2rem;
  color: #198619;
}

.rate {
  padding: 0.4rem;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 250;
  font-size: 1rem;
  line-height: 1.2rem;
}

.headers {
  display: flex;
  border: #18c218 solid 0.1rem;
  width: 20vw;
}
.table {
  grid-template-columns: 2fr 0.01fr 1fr;
  width: 20vw;
  border: #18c218 solid 0.1rem;
}

.choicehead {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 1.7rem;
  line-height: 1.9rem;
  text-align: left;

  background: linear-gradient(0deg, #0c5c0c 0%, #18c218 33%, #0c5c0c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.choicebox {
  display: flex;
  gap: 1rem;
}

.omnidescript {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.4rem;

  color: rgba(30, 30, 30, 0.62);
  width: 40vw;
  margin: 0.5rem 0.1rem 1.75rem 0.1rem;
}
.omnihead {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.2rem;
  text-decoration-line: underline;

  color: rgba(30, 30, 30, 0.62);
}

.omnibox {
  height: max-content;
  margin: 4rem 0rem;
  padding: 0rem 3rem;
}
:deep(.vs__dropdown-toggle) {
  border: none;
  outline: none;
  width: 21vw;
  height: 6vh;
}

:deep(.vs__dropdown-menu) {
  width: 21vw; /* Adjust the width to match the v-select dropdown */
}

.vselect {
  border: rgba(30, 30, 30, 0.4) solid 0.1rem;
  border-radius: 15rem;
  padding-bottom: 0;
  font-size: 1rem;
  padding: 0.03rem;
  font-family: 'Inter';
  font-style: normal;
  color: rgba(30, 30, 30, 0.62);
}
</style>
