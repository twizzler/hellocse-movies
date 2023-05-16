<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MovieCard from '../components/MovieCard.vue'

interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: Array<number>
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

const movies = ref<Movie[]>([])
const failedLoading = ref(false)

const fetchMovies = async () => {
  failedLoading.value = false

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    )

    movies.value = response.data.results
  } catch (_) {
    failedLoading.value = true
  }
}

onMounted(() => {
  fetchMovies()
})
</script>

<template>
  <div v-if="movies.length > 0">
    <div class="flex flex-wrap justify-center gap-8">
      <MovieCard
        v-for="movie in movies"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/3"
        :title="movie.original_title"
        :description="movie.overview"
        :image="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
        url="/test"
      />
    </div>

    <div v-if="failedLoading">
      <p
        class="max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-white"
      >
        Nous n'avons pas pu charger les affiches de films.
      </p>
      <button
        type="button"
        class="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="fetchMovies()"
      >
        Réessayer
      </button>
    </div>
  </div>
</template>
