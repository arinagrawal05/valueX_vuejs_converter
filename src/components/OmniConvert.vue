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
  <div class="omnibox" id="omniconvert">
    <div>
      <h1><u>OmniConvert</u></h1>
      <p>
        A market exchange rates table that displays exchange between a currency to every other
        currency.
      </p>
    </div>
    <div>
      <h3>Choose a currency :</h3>
      <v-select
        :options="currencyStore.currencyUnits"
        :searchable="true"
        v-model="currencychange"
        @input="getConversions"
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
    <ul v-for="(currency, index) in conversions" :key="index">
      <div>{{ currency[0] + ' : ' + currency[1] }}</div>
    </ul>
  </div>
</template>

<style scoped>
.omnibox {
  height: max-content;
}
</style>
