<script setup>
import { computed, onMounted, nextTick } from 'vue'
import { useCurrencyStore } from '../stores/currencyStore'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import ConverterResult from './ConverterResult.vue'
import ChartLayout from './chart/ChartLayout.vue'
import OmniConvert from './OmniConvert.vue'
import AboutUs from './AboutUs.vue'

const currencyStore = useCurrencyStore()

const currencyFrom = computed({
  get: () => currencyStore.currencyFrom,
  set: (value) => {
    currencyStore.currencyFrom = `${value[1]} (${value[0]})`
    triggerConversion()
  },
})

const currencyTo = computed({
  get: () => currencyStore.currencyTo,
  set: (value) => {
    currencyStore.currencyTo = `${value[1]} (${value[0]})`
    triggerConversion()
  },
})

const amount = computed({
  get: () => currencyStore.amount,
  set: (value) => {
    currencyStore.amount = value
  },
})

const convertCurrency = async () => {
  if (amount.value >= 0) {
    await currencyStore.fetchConvertCurrency()
  }
}

let isSwapping = false
const triggerConversion = async () => {
  if (!isSwapping) {
    await convertCurrency()
  }
}

const swapCurrency = async () => {
  isSwapping = true
  const extractCurrencyInfo = (formattedValue) => {
    const code = formattedValue.slice(-4, -1)
    const name = formattedValue.slice(0, -5).trim()
    return [code, name]
  }

  const fromInfo = extractCurrencyInfo(currencyFrom.value)
  const toInfo = extractCurrencyInfo(currencyTo.value)

  if (fromInfo && toInfo) {
    currencyFrom.value = toInfo
    currencyTo.value = fromInfo
    await nextTick()
    convertCurrency()
  }
  isSwapping = false
}

onMounted(async () => {
  currencyStore.amount = 100
  convertCurrency()
  await currencyStore.fetchCurrencyUnits()
})
</script>

<template>
  <div class="background" id="homepage">
    <div class="converterbox">
      <h1 class="headtext">ValueX</h1>
      <div class="amount">
        <label for="amount" class="amounttext">Amount</label>
        <input
          type="number"
          name="amount"
          min="0"
          v-model="amount"
          @input="convertCurrency"
          step="20"
          class="amountinput"
        />
      </div>
      <div>
        <div>
          <label for="from">From</label>
          <v-select
            :options="currencyStore.currencyUnits"
            v-model="currencyFrom"
            @input="convertCurrency"
            :searchable="true"
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
        <div>
          <label for="to">To</label>
          <v-select
            :options="currencyStore.currencyUnits"
            v-model="currencyTo"
            @input="convertCurrency"
            :searchable="true"
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
      </div>
      <button @click="swapCurrency"><img src="../assets/image copy 2.png" /></button>
      <div class="scrolltext">(scroll down or click on FXChart to see the results)</div>
    </div>
  </div>
  <div class="resultbox">
    <ConverterResult id="result" />
    <ChartLayout />
  </div>
  <OmniConvert />
  <AboutUs />
</template>

<style scoped>
.scrolltext {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 1rem;

  color: rgba(30, 30, 30, 0.62);
}

.resultbox {
  height: 90vh;
}
/* .amounttext {
}

.amountinput {
} */
.amount {
  display: flex;
  flex-direction: column;
}

.headtext {
  font-family: 'Anton';
  font-style: normal;
  font-weight: bolder;
  font-size: 2.7rem;
  line-height: 2.9rem;
  color: #d9d9db;
  -webkit-text-stroke: 0.1rem #18c218;
  letter-spacing: -0.12rem;
}

.converterbox {
  width: 50vw;
  padding: 5vh 2.5vw;
  border-radius: 5vh;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.background {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(../assets/image.png);
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: cover;
  background-size: cover;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  appearance: textfield;
}
</style>
