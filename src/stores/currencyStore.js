import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useCurrencyStore = defineStore('currency', () => {

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
