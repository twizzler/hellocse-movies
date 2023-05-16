<script setup lang="ts">
interface Props {
  title: string
  description: string
  image: string
  url: string
}

const props = defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <img class="rounded-t-lg" :src="image" alt="" />
    </a>
    <div class="flex flex-col p-5 flex-grow">
      <a href="#">
        <h5
          class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ title }}
        </h5>
      </a>
      <p
        class="description overflow-hidden text-overflow-ellipsis h-12 mb-3 font-normal text-gray-700 dark:text-gray-400 flex-grow"
      >
        <span v-if="description">{{ description }}</span>
        <span v-else>Aucune description...</span>
      </p>
      <RouterLink :to="`/movie/${url}`" class="mt-auto">
        <a
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          En savoir plus
        </a>
      </RouterLink>
    </div>
  </div>
</template>
