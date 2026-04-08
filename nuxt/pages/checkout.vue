<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">

      <div class="bg-gray-800 text-white text-center py-4 mb-8 font-semibold text-xl">
        Checkout
      </div>

      <button @click="goBack" class="text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-1">
        &lt;&lt; back
      </button>

      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        You're Almost In - Start Your 3-Day Free Trial Now!
      </h1>
      <p class="text-gray-600 mb-8 text-lg">
        Set up your account to gain instant access! You won't be charged if you decide to cancel within 3 days
      </p>

      <div v-if="pending" class="text-center py-10">Завантаження даних...</div>
      <div v-else-if="plan" class="grid grid-cols-1 md:grid-cols-12 gap-8">

        <div class="md:col-span-5">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div class="h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>
            <div class="p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">{{ plan.title }}</h2>
              <div class="text-sm text-gray-500 mb-1">{{ plan.trialDays }}-days free then:</div>
              <div class="flex items-baseline gap-1 mb-2">
                <span class="text-4xl font-extrabold text-gray-900">${{ plan.pricePerMonth.toFixed(2) }}</span>
                <span class="text-gray-500">/month</span>
              </div>

              <div v-if="billingType === 'annual'" class="text-sm text-gray-500 mb-3">
                billed yearly at <span class="line-through">${{ plan.oldPricePerYear }}</span> ${{ plan.pricePerYear }}
              </div>
              <div v-else class="text-sm text-gray-500 mb-3">
                billed monthly
              </div>

              <div v-if="billingType === 'annual' && plan.savings" class="inline-block bg-teal-50 text-teal-700 font-semibold px-3 py-1 rounded text-sm mb-6">
                ${{ plan.savings }} in savings
              </div>

              <ul class="space-y-4 mt-6">
                <li v-for="(feature, index) in plan.features" :key="index" class="flex items-start gap-3 text-sm">
                  <span class="text-teal-500 font-bold mt-0.5 mr-2">✓</span>
                  <div>
                    <span class="font-medium text-gray-800">{{ feature.text }}</span>
                    <div v-if="feature.subtext" class="text-gray-500 text-xs mt-0.5">{{ feature.subtext }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="md:col-span-7">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 class="text-lg font-bold text-gray-800 mb-6">Order Summary</h3>

            <div class="flex justify-between text-gray-700 mb-3">
              <span class="capitalize">{{ billingType }} Plan</span>
              <span>${{ plan.pricePerYear.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-700 font-bold mb-3 border-b border-gray-200 pb-3">
              <span>Total Due <span class="text-xs font-normal text-gray-500">(*not including sales tax where applicable)</span></span>
              <span>${{ plan.pricePerYear.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between font-bold text-gray-900 mb-6">
              <span>Due Today</span>
              <span>$0.00</span>
            </div>

            <div class="bg-gray-100 text-center py-3 text-sm font-medium text-gray-700 mb-8 rounded">
              Includes {{ plan.trialDays }}-Day Free Trial
            </div>

            <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              Billing Information
              <span class="text-gray-400 cursor-help" title="Secure payment info">ⓘ</span>
            </h3>

            <form @submit.prevent="submitForm">
              <div class="mb-4">
                <label class="block text-sm text-gray-600 mb-1">Card Details</label>
                <div class="flex border border-gray-300 rounded overflow-hidden bg-white">
                  <div class="px-3 py-2 bg-gray-50 border-r border-gray-300 flex items-center">💳</div>
                  <input v-model="form.cardNumber" type="text" placeholder="Number" class="w-full px-3 py-2 outline-none text-gray-900" required>
                  <input v-model="form.cardExpiry" type="text" placeholder="MM / YY" class="w-24 px-3 py-2 border-l border-gray-300 outline-none text-gray-900" required>
                  <input v-model="form.cardCvc" type="text" placeholder="CVC" class="w-20 px-3 py-2 border-l border-gray-300 outline-none text-gray-900" required>
                </div>
              </div>

              <div class="mb-6 border border-gray-300 rounded p-4 bg-gray-50">
                <div class="mb-4">
                  <label class="block text-sm text-gray-600 mb-1">Full name</label>
                  <input v-model="form.fullName" type="text" class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 text-gray-900 bg-white" required>
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Address</label>
                  <input v-model="form.address" type="text" class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 text-gray-900 bg-white" required>
                </div>
              </div>

              <div class="flex items-start gap-3 mb-6">
                <input v-model="form.consent" type="checkbox" id="consent" class="mt-1 w-4 h-4 cursor-pointer" required>
                <label for="consent" class="text-sm text-gray-600 leading-tight cursor-pointer">
                  I consent to <a href="#" class="font-bold text-gray-800 underline">Terms of Use</a> and understand my 3-day free trial will automatically convert to ${{ plan.pricePerYear.toFixed(2) }} per {{ billingType === 'annual' ? 'year' : 'month' }} starting on [Date].
                </label>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting || !form.consent"
                class="w-40 bg-[#f97316] text-white font-bold py-3 rounded hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {{ isSubmitting ? 'Processing...' : 'Try It Free' }}
              </button>

              <p v-if="errorMessage" class="text-red-500 mt-4 text-sm">{{ errorMessage }}</p>
              <p v-if="successMessage" class="text-green-600 mt-4 text-sm font-bold">{{ successMessage }}</p>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

useHead({
  title: 'Checkout | Оформлення підписки',
  meta: [
    { name: 'description', content: 'Оформлення 3-денного безкоштовного тріалу' }
  ]
})

const router = useRouter()
const subscriptionStore = useSubscriptionStore()

const { selectedPlanId, billingType, hasSelectedPlan } = storeToRefs(subscriptionStore)

onMounted(() => {
  if (!hasSelectedPlan.value) {
    router.push('/')
  }
})

const { data: plan, pending } = useFetch('/api/subscription/plan', {
  query: {
    id: selectedPlanId,
    type: billingType
  },
  lazy: true
})

const form = ref({
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  fullName: 'dev4 dev4',
  address: '',
  consent: false
})

const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const goBack = () => {
  router.back()
}

const submitForm = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isSubmitting.value = true

  try {
    const response = await $fetch('/api/subscription/create', {
      method: 'POST',
      body: {
        ...form.value,
        planId: selectedPlanId.value,
        billingType: billingType.value
      }
    })

    successMessage.value = response.message

  } catch (error) {
    errorMessage.value = error.data?.statusMessage || 'Сталася помилка при обробці платежу.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
