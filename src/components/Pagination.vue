<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  pages: number
}

const props = defineProps<Props>()

const emit = defineEmits(['changePage'])

const rangeStart = ref(1)
const pageSize = 5

const currentPage = ref(1)

const pageRange = computed(() => {
  const start = rangeStart.value
  const end = start + pageSize > props.pages ? props.pages : start + pageSize
  return Array.from({ length: end - start + 1 }, (_, i) => i + start)
})

const goToNextPageRange = () => {
  if (rangeStart.value + pageSize <= props.pages) {
    rangeStart.value += pageSize
  }
}

const goToPreviousPageRange = () => {
  if (rangeStart.value - pageSize >= 1) {
    rangeStart.value -= pageSize
  }
}

const changePage = (page: number) => {
  currentPage.value = page
  emit('changePage', page)
}
</script>

<template>
  <div>
    <ul class="inline-flex items-center -space-x-px">
      <li @click="goToPreviousPageRange">
        <a
          class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </li>

      <li v-for="page in pageRange">
        <a
          @click="changePage(page)"
          class="px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :class="
            page === currentPage
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-500 bg-white'
          "
          >{{ page }}</a
        >
      </li>

      <li @click="goToNextPageRange">
        <a
          class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>
