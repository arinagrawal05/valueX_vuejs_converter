// Mock the store first, before any imports
import { vi } from 'vitest'
import { describe, it, expect, beforeEach } from 'vitest'

// Mocking the fetchCurrencyUnits and fetchConvertCurrency methods
vi.mock('@/stores/currencyStore', () => {
  return {
    useCurrencyStore: vi.fn().mockReturnValue({
      currencyUnits: [
        ['USD', 'United States Dollar (USD)'],
        ['GBP', 'Great British Pound (GBP)'],
      ],
      currencyFrom: 'United States Dollar (USD)',
      currencyTo: 'Great British Pound (GBP)',
      amount: 100,
      convertValue: '75.00',
      fetchCurrencyUnits: vi.fn(),
      fetchConvertCurrency: vi.fn(),
    }),
  }
})

import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MainPage from '@/components/MainPage.vue'
import { useCurrencyStore } from '@/stores/currencyStore'

describe('MainPage.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia()) // Set Pinia for the test
  })

  it('renders the component correctly', async () => {
    const wrapper = mount(MainPage)

    // Ensure the component mounts correctly
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('ValueX')
  })

  it('displays correct amount', async () => {
    const wrapper = mount(MainPage)

    // Check initial amount display
    const amountInput = wrapper.find('input[name="amount"]')
    expect(amountInput.element.value).toBe('100')

    // Change amount and check update
    await amountInput.setValue('500')
    expect(amountInput.element.value).toBe('500')
  })

  it('updates currencyFrom and currencyTo correctly when selecting from the dropdown', async () => {
    const wrapper = mount(MainPage)

    const selectFrom = wrapper.findComponent({ name: 'v-select' }).at(0)
    await selectFrom.vm.$emit('input', ['GBP', 'Great British Pound (GBP)'])
    expect(wrapper.vm.currencyFrom).toBe('Great British Pound (GBP)')

    const selectTo = wrapper.findComponent({ name: 'v-select' }).at(1)
    await selectTo.vm.$emit('input', ['USD', 'United States Dollar (USD)'])
    expect(wrapper.vm.currencyTo).toBe('United States Dollar (USD)')
  })

  it('calls convertCurrency when amount or currencies are changed', async () => {
    const wrapper = mount(MainPage)
    const store = useCurrencyStore()

    const spy = vi.spyOn(store, 'fetchConvertCurrency')

    // Trigger conversion by changing amount
    const amountInput = wrapper.find('input[name="amount"]')
    await amountInput.setValue('200')
    expect(spy).toHaveBeenCalled()

    // Trigger conversion by changing currencyFrom
    const selectFrom = wrapper.findComponent({ name: 'v-select' }).at(0)
    await selectFrom.vm.$emit('input', ['GBP', 'Great British Pound (GBP)'])
    expect(spy).toHaveBeenCalled()

    // Trigger conversion by changing currencyTo
    const selectTo = wrapper.findComponent({ name: 'v-select' }).at(1)
    await selectTo.vm.$emit('input', ['USD', 'United States Dollar (USD)'])
    expect(spy).toHaveBeenCalled()
  })

  it('displays the correct converted value', async () => {
    const wrapper = mount(MainPage)

    // Check if the convertValue is displayed
    expect(wrapper.vm.convertValue).toBe('75.00')

    // You could add logic to assert the result if needed.
  })
})
