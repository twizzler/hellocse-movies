<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()

const movie = ref()

const fetchMovie = async (movieId: string | string[]) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR&api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    )

    movie.value = response.data

    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  console.log(route.params.id)
  fetchMovie(route.params.id)
})
</script>

<template>
  <div
    v-if="movie"
    class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4"
  >
    <div>
      <img
        class="h-auto max-w-sm rounded-lg cursor-pointer"
        :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
        alt="image description"
      />
    </div>
    <div class="text-center md:text-left">
      <h6 class="text-lg font-bold dark:text-white">
        {{ movie.title }}
      </h6>

      <p class="text-justify text-gray-500 dark:text-gray-400">
        {{ movie.overview }}
      </p>

      <p class="text-justify mt-3 text-gray-500 dark:text-gray-400">
        <span class="font-bold">Sortie le</span>
        <span class="text-blue-500 ml-1">{{ movie.release_date }}</span>
      </p>

      <p class="text-justify mt-3 text-gray-500 dark:text-gray-400">
        <span class="font-bold">Genre: </span>
        <span class="text-blue-500 ml-1">{{
          movie.genres.map((item) => item.name).join(', ')
        }}</span>
      </p>

      <p class="text-justify mt-3 text-gray-500 dark:text-gray-400">
        <span class="font-bold">Note: </span>
        {{ movie.vote_average }}/10 sur {{ movie.vote_count }} votes
      </p>

      <p class="text-justify mt-3 text-gray-500 dark:text-gray-400">
        <span class="font-bold">Budget: </span>
        <span class="text-blue-500 ml-1">{{ movie.budget }}$</span>
      </p>
    </div>
  </div>
</template>
