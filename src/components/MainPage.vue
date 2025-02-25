<script setup>
import { computed, onMounted, nextTick, ref } from 'vue'
import { useCurrencyStore } from '../stores/currencyStore'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import ConverterResult from './ConverterResult.vue'
import ChartLayout from './chart/ChartLayout.vue'
import OmniConvert from './OmniConvert.vue'
import AboutUs from './AboutUs.vue'

// Initialize the currency store instance
const currencyStore = useCurrencyStore()
const rotated = ref(false)

// Bind currencyFrom with a custom setter that formats the selected value and triggers conversion
const currencyFrom = computed({
  get: () => currencyStore.currencyFrom,
  set: (value) => {
    currencyStore.currencyFrom = `${value[1]} (${value[0]})`
    triggerConversion()
  },
})

// Bind currencyTo similarly, with a custom setter
const currencyTo = computed({
  get: () => currencyStore.currencyTo,
  set: (value) => {
    currencyStore.currencyTo = `${value[1]} (${value[0]})`
    triggerConversion()
  },
})

// Two-way binding for the amount
const amount = computed({
  get: () => currencyStore.amount,
  set: (value) => {
    currencyStore.amount = value
  },
})

// Function to fetch conversion data when the amount is valid
const convertCurrency = async () => {
  if (amount.value >= 0) {
    await currencyStore.fetchConvertCurrency()
    // fetching conversion data
  }
}

let isSwapping = false
// Trigger conversion only if not currently swapping currencies
const triggerConversion = async () => {
  if (!isSwapping) {
    await convertCurrency()
  }
}

// Swap the "from" and "to" currencies; includes a helper to parse the formatted string
const swapCurrency = async () => {
  isSwapping = true
  const extractCurrencyInfo = (formattedValue) => {
    const code = formattedValue.slice(-4, -1)
    const name = formattedValue.slice(0, -5).trim()
    return [code, name]
  }

  rotated.value = !rotated.value

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

// On component mount, set an initial amount, trigger conversion, and fetch available currency units
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
        <label for="amount" class="selecttext">Amount</label>
        <input
          type="number"
          name="amount"
          min="0"
          v-model="amount"
          @input="convertCurrency"
          step="20"
          class="amountinput"
        />
        <!-- calls conversion api -->
      </div>
      <div class="convertinputs">
        <div>
          <label for="from" class="selecttext">From</label>
          <v-select
            :options="currencyStore.currencyUnits"
            v-model="currencyFrom"
            @input="convertCurrency"
            :searchable="true"
            class="selecttext vselect"
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
          <label for="to" class="selecttext">To</label>
          <v-select
            :options="currencyStore.currencyUnits"
            v-model="currencyTo"
            @input="convertCurrency"
            :searchable="true"
            class="selecttext vselect"
          >
            <template v-slot:option="val">
              <div class="option">
                {{ val[1] }}
                ({{ val[0] }})
                <img
                  class="countryFlag"
                  :src="`/flags/${val[0].substring(0, 2)}.png`"
                  width="25"
                  alt="Flag"
                />
              </div>
            </template>
          </v-select>
        </div>
      </div>
      <button @click="swapCurrency" class="swapbutton">
        <img src="../assets/image copy 2.png" class="swap" :class="{ rotated: rotated }" />
      </button>
      <div class="scrolltext">(scroll down or click on FXChart to see the results)</div>
    </div>
  </div>
  <hr id="result" />
  <div class="resultbox">
    <ConverterResult />
    <ChartLayout />
  </div>
  <hr id="omniconvert" />
  <OmniConvert />
  <AboutUs />
</template>

<style scoped>
.selecttext {
  width: 21vw; /* Adjust the width as needed */
}

/* Set the width of the dropdown options */
:deep(.vs__dropdown-menu) {
  width: 21vw; /* Adjust the width to match the v-select dropdown */
}

/* Ensure the options within the dropdown have the same width */
:deep(.vs__dropdown-option) {
  width: 100%;
}
.option {
  width: 100%;
}
.swap {
  height: 10vh;
  transition: transform 0.3s ease; /* Smooth transition for rotation */
}

/* Class to apply 180-degree rotation */
.rotated {
  transform: rotate(180deg);
}

.swapbutton {
  background: none;
  border: none;
  padding: 0;
}
.selecttext {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1rem;
  padding-bottom: 0.5rem;
  color: rgba(30, 30, 30, 0.7);
}
.convertinputs {
  display: flex;
  gap: 1.8rem;
}

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

.amountinput {
  width: 44.5vw;
  height: 4vh;
  border: rgba(30, 30, 30, 0.4) solid 0.1rem;
  border-radius: 10rem;
  padding: 1rem;
  color: rgba(30, 30, 30, 0.8);

  -webkit-transition: 0.5s;
  transition: 0.2s;
  outline: none;
}

input[type='number']:focus {
  border: 0.125rem solid #18c218;
}

.amount {
  display: flex;
  flex-direction: column;
}

.headtext {
  font-family: 'Anton';
  font-style: normal;
  font-weight: bolder;
  font-size: 3rem;
  line-height: 3.2rem;
  color: #d9d9db;
  -webkit-text-stroke: 0.17rem #18c218;
  letter-spacing: -0.1rem;
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

  gap: 0.7rem;
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

input[type='number'] {
  appearance: textfield;
}

:deep(.vs__dropdown-toggle) {
  border: none;
  outline: none;
}

.vselect {
  border: rgba(30, 30, 30, 0.4) solid 0.1rem;
  border-radius: 20rem;
  padding-bottom: 0;
}
</style>
