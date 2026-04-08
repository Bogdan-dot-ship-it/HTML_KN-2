import { defineStore } from 'pinia'

export const useSubscriptionStore = defineStore('subscription', () => {
  const selectedPlanId = ref<string | null>(null)
  const billingType = ref<'annual' | 'monthly'>('annual')

  function selectPlan(planId: string, type: 'annual' | 'monthly') {
    selectedPlanId.value = planId
    billingType.value = type
  }

  const hasSelectedPlan = computed(() => selectedPlanId.value !== null)

  return {
    selectedPlanId,
    billingType,
    hasSelectedPlan,
    selectPlan
  }
})
