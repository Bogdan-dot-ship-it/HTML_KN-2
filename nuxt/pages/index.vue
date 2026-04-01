<template>
  <div class="p-8 max-w-[1200px] mx-auto font-sans bg-[#f9fafb] min-h-screen">

    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Start Your 3 Day Free Trial</h2>
      <div class="flex items-center gap-3">
        <span class="text-green-500 text-sm font-medium flex items-center">
          Save up to 20%
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
        </span>
        <div class="flex border border-gray-200 rounded-md overflow-hidden text-sm">
          <button class="px-4 py-1.5 bg-white font-semibold text-gray-800 border-r border-gray-200 shadow-sm">Annual</button>
          <button class="px-4 py-1.5 bg-gray-50 text-gray-500 font-medium hover:bg-gray-100">Monthly</button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      <div v-for="plan in pricingPlans" :key="plan.id" class="border border-gray-200 rounded-xl bg-white shadow-sm flex flex-col relative overflow-hidden pt-1">
        <div :class="['absolute top-0 left-0 w-full h-1', plan.color]"></div>
        <div class="p-6">
          <h3 class="text-[17px] font-bold text-gray-800 mb-4">{{ plan.title }}</h3>
          <p class="text-xs text-gray-500 mb-1 font-medium">{{ plan.trial }}</p>
          <div class="flex items-baseline mb-1">
            <span class="text-4xl font-extrabold text-gray-900">${{ plan.price }}</span>
            <span class="text-sm text-gray-500 ml-1">/month</span>
          </div>
          <p class="text-[13px] text-gray-500 mb-2">billed yearly at <span class="line-through">{{ plan.oldPrice }}</span> {{ plan.newPrice }}</p>
          <div class="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded mb-6">{{ plan.savings }}</div>
          <button class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-md transition-colors mb-6 shadow-sm">Try It Free</button>
          <ul class="space-y-3">
            <li v-for="(feature, index) in plan.features" :key="index" class="flex items-start">
              <svg class="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
              <div>
                <p class="text-[13px] text-gray-700 font-medium leading-tight">{{ feature.main }}</p>
                <p v-if="feature.sub" class="text-[12px] text-gray-500 mt-0.5 leading-tight">{{ feature.sub }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-white border border-gray-100 shadow-sm rounded-lg overflow-hidden">

      <div class="flex flex-wrap items-center justify-between p-4 text-sm text-gray-700">

        <div class="flex items-center space-x-4 mb-2 md:mb-0">
          <div class="flex items-center space-x-1 cursor-pointer">
            <input type="checkbox" class="rounded border-gray-300 w-4 h-4 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </div>
          <div class="flex border border-gray-200 rounded-md overflow-hidden">
            <button class="flex items-center space-x-2 px-4 py-1.5 bg-[#f8f9fa] text-gray-500 hover:bg-gray-100 border-r border-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/></svg>
              <span>Card</span>
            </button>
            <button class="flex items-center space-x-2 px-4 py-1.5 bg-white text-gray-800 font-medium shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><circle cx="4" cy="6" r="1.5"></circle><circle cx="4" cy="12" r="1.5"></circle><circle cx="4" cy="18" r="1.5"></circle></svg>
              <span>List</span>
            </button>
          </div>
        </div>

        <div class="flex items-center space-x-6 font-medium text-gray-600">

          <div class="w-48">
            <UInput v-model="q" placeholder="Пошук..." icon="i-lucide-search" size="sm" />
          </div>

          <button class="hidden md:flex items-center space-x-2 hover:text-gray-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="8" y="8" width="12" height="12" rx="2" ry="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2"></path></svg>
            <span>Display</span>
          </button>
          <button class="hidden md:flex items-center space-x-2 hover:text-gray-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="14" y2="12"></line><line x1="4" y1="18" x2="8" y2="18"></line></svg>
            <span>Sort by</span>
          </button>
          <button class="hidden md:flex items-center space-x-1.5 hover:text-gray-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="12" cy="19" r="2"></circle></svg>
            <span>Actions</span>
          </button>
        </div>
      </div>

      <UTable
        :data="paginatedRows"
        :columns="columns"
        v-model:sorting="sorting"
        class="custom-table"
      />

      <div class="p-4 flex justify-end">
        <UPagination v-model:page="page" :items-per-page="pageCount" :total="sortedRows.length" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, h } from 'vue'

useHead({ title: 'Список продуктів' })

// API
const { data: pricingPlans } = await useFetch('/api/pricing')
const { data: productsData } = await useFetch('https://dummyjson.com/products?limit=100')
const products = computed(() => productsData.value?.products || [])

const columns = [
  {
    accessorKey: 'thumbnail', header: 'Фото',
    cell: ({ row }) => h('img', {
      src: row.original.thumbnail,
      class: 'w-[100px] h-[100px] object-cover rounded bg-gray-50 border border-gray-200'
    })
  },
  { accessorKey: 'title', header: 'Назва' },
  { accessorKey: 'description', header: 'Опис' },
  {
    accessorKey: 'price', header: 'Ціна',
    cell: ({ row }) => h('span', { class: 'font-semibold text-gray-800' }, `$${row.original.price}`)
  },
  {
    accessorKey: 'rating', header: 'Оцінка',
    cell: ({ row }) => h('span', { class: row.original.rating < 4.5 ? 'text-red-500 font-bold' : 'text-green-600 font-bold' }, row.original.rating)
  },
  { accessorKey: 'brand', header: 'Бренд' },
  { accessorKey: 'category', header: 'Категорія' }
]

const q = ref('')
const page = ref(1)
const pageCount = ref(5)
const sorting = ref([{ id: 'title', desc: false }])

const filteredRows = computed(() => {
  if (!q.value) return products.value
  return products.value.filter((p) => Object.values(p).some((v) => String(v).toLowerCase().includes(q.value.toLowerCase())))
})

const sortedRows = computed(() => {
  const sorted = [...filteredRows.value]
  if (sorting.value.length > 0) {
    const { id, desc } = sorting.value[0]
    sorted.sort((a, b) => {
      if (a[id] < b[id]) return desc ? 1 : -1
      if (a[id] > b[id]) return desc ? -1 : 1
      return 0
    })
  }
  return sorted
})

const paginatedRows = computed(() => {
  const start = (page.value - 1) * pageCount.value
  return sortedRows.value.slice(start, start + pageCount.value)
})

watch([q, sorting], () => { page.value = 1 }, { deep: true })
</script>

<style scoped>

:deep(.custom-table thead tr) {
  background-color: #2d2d2d !important;
}

:deep(.custom-table thead th) {
  color: white !important;
  padding: 16px !important;
  font-weight: 600 !important;
  font-size: 0.875rem !important;
}

:deep(.custom-table thead th:first-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.custom-table tbody td:first-child) {
  border-right: 1px solid #f3f4f6 !important;
}

:deep(.custom-table tbody tr) {
  border-bottom: 1px solid #f9fafb !important;
  transition: background-color 0.2s ease;
}

:deep(.custom-table tbody tr:hover) {
  background-color: #f3f4f6 !important;
}

:deep(.custom-table tbody td) {
  padding: 12px 16px !important;
  font-size: 0.875rem !important;
}
</style>
