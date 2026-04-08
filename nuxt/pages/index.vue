<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-7xl mx-auto">

      <div class="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 class="text-3xl font-extrabold text-gray-900">Start Your 3 Day Free Trial</h1>
        <div class="flex items-center gap-4 mt-4 md:mt-0">
          <span class="text-green-500 font-semibold text-sm">Save up to 20% ⤻</span>
          <div class="flex bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
            <button
              @click="isAnnual = true"
              :class="isAnnual ? 'bg-white shadow text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-700'"
              class="px-4 py-2 rounded-md text-sm transition-all"
            >
              Annual
            </button>
            <button
              @click="isAnnual = false"
              :class="!isAnnual ? 'bg-white shadow text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-700'"
              class="px-4 py-2 rounded-md text-sm transition-all"
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div v-for="plan in plans" :key="plan.id" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div :class="plan.colorClass" class="h-1 w-full"></div>

          <div class="p-6 flex-grow">
            <h2 class="text-xl font-bold text-gray-800 mb-4">{{ plan.name }} - {{ isAnnual ? 'Annual' : 'Monthly' }}</h2>
            <div class="text-sm text-gray-500 mb-1">3-days free then:</div>

            <div class="flex items-baseline gap-1 mb-2">
              <span class="text-5xl font-black text-gray-900">
                ${{ isAnnual ? plan.annualTotal : plan.monthlyPrice }}
              </span>
              <span class="text-gray-500 font-medium text-lg ml-1">
                {{ isAnnual ? '/year' : '/month' }}
              </span>
            </div>

            <div v-if="isAnnual" class="text-sm text-gray-500 mb-3">
              that's just <span class="font-bold">${{ plan.annualMonthlyPrice }}</span>/month!
            </div>
            <div v-else class="text-sm text-gray-500 mb-3 h-5">
              billed monthly
            </div>

            <div v-if="isAnnual" class="inline-block bg-green-100 text-green-700 font-semibold px-3 py-1 rounded text-sm mb-6">
              ${{ plan.savings }} in savings
            </div>
            <div v-else class="h-7 mb-6"></div>

            <button
              @click="goToCheckout(plan.id)"
              class="w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors mb-6 shadow-sm"
            >
              Try It Free
            </button>

            <ul class="space-y-4">
              <li v-for="(feature, idx) in plan.features" :key="idx" class="flex items-start gap-3 text-sm">
                <span class="text-green-500 font-bold mt-0.5">+</span>
                <div>
                  <span class="font-medium text-gray-700">{{ feature.text }}</span>
                  <div v-if="feature.subtext" class="text-gray-500 text-xs mt-0.5">{{ feature.subtext }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">

        <div class="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">

          <div class="flex bg-gray-50 p-1 rounded border border-gray-200">
            <button
              @click="viewMode = 'card'"
              :class="viewMode === 'card' ? 'bg-white shadow text-gray-800' : 'text-gray-500'"
              class="px-3 py-1.5 rounded flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              Card
            </button>
            <button
              @click="viewMode = 'list'"
              :class="viewMode === 'list' ? 'bg-white shadow text-gray-800' : 'text-gray-500'"
              class="px-3 py-1.5 rounded flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
              List
            </button>
          </div>

          <div class="flex items-center gap-4">
            <div class="relative">
              <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Пошук..."
                class="pl-9 pr-4 py-2 bg-[#1e293b] text-gray-200 placeholder-gray-400 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
              >
            </div>
            <button class="text-sm text-gray-600 flex items-center gap-1 hover:text-gray-900">Display</button>
            <button class="text-sm text-gray-600 flex items-center gap-1 hover:text-gray-900">Sort by</button>
            <button class="text-sm text-gray-600 flex items-center gap-1 hover:text-gray-900">Actions</button>
          </div>
        </div>

        <div v-if="pending" class="p-8 text-center text-gray-500">Завантаження даних...</div>

        <div v-else class="p-0">

          <table v-if="viewMode === 'list'" class="w-full text-left border-collapse">
            <thead>
            <tr class="bg-[#1e293b] text-white text-sm">
              <th class="p-4 font-semibold">Фото</th>
              <th class="p-4 font-semibold">Назва</th>
              <th class="p-4 font-semibold">Опис</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in filteredItems" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="p-4 w-24">
                <div class="w-12 h-12 bg-[#f1f5f9] rounded-md flex items-center justify-center text-xl shadow-sm">{{ item.icon }}</div>
              </td>
              <td class="p-4 font-bold text-gray-800">{{ item.name }}</td>
              <td class="p-4 text-gray-500 text-sm">{{ item.description }}</td>
            </tr>
            <tr v-if="filteredItems.length === 0">
              <td colspan="3" class="p-8 text-center text-gray-500">Нічого не знайдено</td>
            </tr>
            </tbody>
          </table>

          <div v-if="viewMode === 'card'" class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-50">
            <div v-for="item in filteredItems" :key="item.id" class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300">

              <div class="h-1.5 w-full bg-[#1e293b]"></div>

              <div class="p-5 flex-grow relative flex flex-col">
                <div class="absolute top-4 right-4 bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">
                  featured
                </div>

                <div class="w-14 h-14 bg-[#f8fafc] rounded-md flex items-center justify-center text-2xl mb-4 shadow-sm border border-gray-100">
                  {{ item.icon }}
                </div>

                <h3 class="font-bold text-gray-900 mb-2">{{ item.name }}</h3>
                <p class="text-sm text-gray-600 line-clamp-3 mb-5 flex-grow">{{ item.description }}</p>

                <div class="flex flex-wrap gap-2 mt-auto">
                  <span v-for="tag in item.tags" :key="tag" class="bg-blue-50 text-blue-600 font-medium px-2 py-1 rounded text-xs border border-blue-100">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="filteredItems.length === 0" class="col-span-full py-12 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
              Нічого не знайдено
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// --- ЛОГІКА ТАРИФІВ ---
const isAnnual = ref(true)

const plans = ref([
  {
    id: 'starter',
    name: 'Starter',
    colorClass: 'bg-blue-500',
    monthlyPrice: 99.00,
    annualMonthlyPrice: 83.25,
    annualOldTotal: 1188,
    annualTotal: 999, // Більша ціна за рік
    savings: 189,
    features: [
      { text: 'Primary user only', subtext: '(extra team members for $35/month)' },
      { text: 'Save unlimited properties' },
      { text: '10,000 exports', subtext: '(additional exports at $0.02 each)' }
    ]
  },
  {
    id: 'team',
    name: 'Team',
    colorClass: 'bg-teal-400',
    monthlyPrice: 249.00,
    annualMonthlyPrice: 207.50,
    annualOldTotal: 2988,
    annualTotal: 2490, // Більша ціна за рік
    savings: 498,
    features: [
      { text: 'Primary user + 2 free team members', subtext: '(extra team members for $25/month)' },
      { text: 'Save unlimited properties' },
      { text: '50,000 exports', subtext: '(additional exports at $0.01 each)' }
    ]
  },
  {
    id: 'business',
    name: 'Business',
    colorClass: 'bg-blue-200',
    monthlyPrice: 549.00,
    annualMonthlyPrice: 457.50,
    annualOldTotal: 6588,
    annualTotal: 5490, // Більша ціна за рік
    savings: 1098,
    features: [
      { text: 'Primary user + 6 free team members', subtext: '(extra team members for $20/month)' },
      { text: 'Save unlimited properties' },
      { text: '100,000 exports', subtext: '(additional exports at $0.01 each)' }
    ]
  }
])

const goToCheckout = (planId) => {
  const billingType = isAnnual.value ? 'annual' : 'monthly'
  router.push(`/checkout?plan=${planId}&billing=${billingType}`)
}

// --- ЛОГІКА ТАБЛИЦІ ТА API ---
const viewMode = ref('card')
const searchQuery = ref('')

const { data: itemsData, pending } = useFetch('/api/products', { lazy: true })

const filteredItems = computed(() => {
  if (!itemsData.value) return []
  if (!searchQuery.value) return itemsData.value

  const query = searchQuery.value.toLowerCase()
  return itemsData.value.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  )
})
</script>
