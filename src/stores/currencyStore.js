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

  async function fetchCurrencyUnits() {
    try {
      const response = await axios.get(`${apiBase}/currencies`)
      currencyUnits.value = Object.keys(response.data).map((key) => [key, response.data[key]])
    } catch (error) {
      console.error('Error fetching currencies:', error)
    }
  }

  async function fetchConvertCurrency() {
    try {
      if (!currencyFrom.value || !currencyTo.value) return

      const minimizecFrom = currencyFrom.value.slice(-4, -1)
      const minimizecTo = currencyTo.value.slice(-4, -1)

      const response = await axios.get(`${apiBase}/latest?from=${minimizecFrom}&to=${minimizecTo}`)
      if (response.data && response.data.rates[minimizecTo]) {
        const rate = response.data.rates[minimizecTo]
        convertValue.value = amount.value === 0 ? '0' : (amount.value * rate).toFixed(2)
        toAmount.value = rate
        date.value = response.data.date
        fetchCurrencyHistory()
      }
    } catch (error) {
      console.error('Error fetching conversion:', error)
    }
  }

  async function fetchCurrencyHistory() {
    try {
      if (!currencyFrom.value || !currencyTo.value) return
      const minimizecFrom = currencyFrom.value.slice(-4, -1)
      const minimizecTo = currencyTo.value.slice(-4, -1)
      const endDate = new Date().toISOString().split('T')[0]
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 7)
      const formattedStartDate = startDate.toISOString().split('T')[0]

      const response = await axios.get(
        `${apiBase}/${formattedStartDate}..${endDate}?from=${minimizecFrom}&to=${minimizecTo}`,
      )

      if (response.data && response.data.rates) {
        currencyChartData.value = Object.keys(response.data.rates).map((date) => ({
          date,
          value: response.data.rates[date][minimizecTo],
        }))
      }
    } catch (error) {
      console.error('Error fetching historical data:', error)
      currencyChartData.value = []
    }
  }

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
