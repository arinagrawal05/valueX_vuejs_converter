import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useCurrencyStore = defineStore('currency', () => {
  const apiBase = 'https://api.frankfurter.app'
  const currencyUnits = ref([])
  const currencyFrom = ref('United States Dollar (USD)')
  const currencyTo = ref('Great British Pound (GBP)')
  const amount = ref(100)
  const toAmount = ref(null)
  const convertValue = ref(null)
  const date = ref('')
  const currencyChartData = ref([])

  const getCurrencyUnits = computed(() => currencyUnits.value)

  const getConvertData = computed(() => ({
    amount: amount.value,
    toAmount: toAmount.value,
    convertValue: convertValue.value,
    currencyFrom: currencyFrom.value,
    currencyTo: currencyTo.value,
    date: date.value,
  }))
  const getCurrencyChartData = computed(() => currencyChartData.value)

 

  return {
    currencyUnits,
    currencyFrom,
    currencyTo,
    amount,
    toAmount,
    convertValue,
    date,
    currencyChartData,
    getCurrencyUnits,
    getConvertData,
    getCurrencyChartData,
    fetchCurrencyUnits,
    fetchConvertCurrency,
    fetchCurrencyHistory,
  }
})
