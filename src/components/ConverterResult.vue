<script setup>
import { computed } from 'vue'
import { useCurrencyStore } from '@/stores/currencyStore'

// Access the currency store to retrieve conversion data
const currencyStore = useCurrencyStore()

// Create a computed property to easily access conversion details from the store
const getConvertData = computed(() => currencyStore.getConvertData)

// Utility function to format numbers with a specified number of decimals
const financial = (x, val) => {
  return Number.parseFloat(x).toFixed(val)
}
</script>

<template>
  <div class="conversion-result-wrapper">
    <!-- Display the conversion rate -->
    <div class="divider">
      1
      <u>{{ getConvertData.currencyFrom }}</u>
      = {{ financial(getConvertData.toAmount, 5) }}
      <u>{{ getConvertData.currencyTo }}</u>
    </div>
    <!-- convert result -->
    <div class="conversion-result" v-if="getConvertData.convertValue">
      <div class="conversion-from">
        {{ getConvertData.amount }}
        <span class="currency">{{ getConvertData.currencyFrom }}</span>
      </div>
      <span class="equal">=</span>
      <div class="conversion-to">
        {{ financial(getConvertData.convertValue, 2) }}
        <span class="currency">{{ getConvertData.currencyTo }}</span>
      </div>
    </div>
    <!-- end / convert result -->
    <div class="divider update-date" title="Last updated">
      {{ getConvertData.date }}
    </div>
  </div>
</template>

<style scoped>
.conversion-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  font-weight: 600;
}

.conversion-result-wrapper {
  margin-top: 30px;
  margin-bottom: 30px;
  margin-top: 4rem;
}

.conversion-result {
  font-size: 24px;

  line-height: 1.2;
}

.equal {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.6rem;

  color: rgba(30, 30, 30, 0.53);
}

.conversion-result .currency {
  font-size: 20px;
  font-weight: 400;
}

.conversion-result {
  font-size: 28px;
}

.conversion-from {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 2rem;
  line-height: 2.2rem;
  letter-spacing: 0.06rem;
  text-align: right;

  color: rgba(30, 30, 30, 0.53);
}

.conversion-result {
  font-size: 38px;
  font-weight: 800;
}

.conversion-to {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 3rem;
  line-height: 3.2rem;
  text-align: right;

  background: linear-gradient(0deg, #0c5c0c 0%, #18c218 48%, #0c5c0c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.05rem;
}

.update-date .feather {
  margin-right: 5px;
}

u {
  margin: 0 5px;
}

.divider {
  width: 100%;
  display: flex;
  align-items: center;
  flex: 0 1 0%;
  color: rgba(0, 0, 0, 0.6);

  letter-spacing: 0.5px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 1.5rem;

  color: rgba(30, 30, 30, 0.53);
}

.divider::before,
.divider::after {
  content: '';
  flex-grow: 1;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.divider::before {
  margin-right: 20px;
}

.divider::after {
  margin-left: 20px;
}
</style>
