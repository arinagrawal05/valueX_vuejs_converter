import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCurrencyStore } from '@/stores/currencyStore'

describe('currencyStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with correct default values', () => {
    const store = useCurrencyStore()
    expect(store.amount).toBe(100)
    expect(store.currencyFrom).toBe('United States Dollar (USD)')
  })

  it('updates amount correctly', () => {
    const store = useCurrencyStore()
    store.amount = 500
    expect(store.amount).toBe(500)
  })
})
