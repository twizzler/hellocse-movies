<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import MovieCard from '../components/MovieCard.vue'
import Pagination from '../components/Pagination.vue'

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

const moviesFilter = ref('')
const totalPages = ref(0)
const selectedSorting = ref('')

const movies = ref<Movie[]>([])
const failedLoading = ref(false)

const filteredMovies = computed(() => {
  if (moviesFilter.value.length > 0)
    return movies.value.filter((movie) => {
      return movie.title
        .toLowerCase()
        .includes(moviesFilter.value.toLowerCase())
    })

  return movies.value
})

const sortedMovies = computed(() => {
  let sortedMovies = [...filteredMovies.value]

  if (selectedSorting.value === 'note') {
    sortedMovies.sort((a, b) => b.vote_average - a.vote_average)
  } else if (selectedSorting.value === 'popularity') {
    sortedMovies.sort((a, b) => b.popularity - a.popularity)
  }

  return sortedMovies
})

const fetchMovies = async (page: number) => {
  failedLoading.value = false

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    )

    movies.value = response.data.results
    totalPages.value = response.data.total_pages
  } catch (_) {
    failedLoading.value = true
  }
}

const changePage = (page: number) => {
  fetchMovies(page)
}

onMounted(() => {
  fetchMovies(1)
})
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="w-full px-4">
      <form class="flex flex-wrap items-center">
        <div class="relative w-full max-w-[400px] mr-10">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            v-model="moviesFilter"
            type="text"
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Recherche de film par titre..."
            required
          />
        </div>
        <div class="flex flex-wrap mt-2">
          <div class="flex">Tri:</div>
          <div class="flex items-center mr-4">
            <label
              for="inline-radio"
              class="ml-2 mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Note</label
            >
            <input
              v-model="selectedSorting"
              type="radio"
              id="inline-radio"
              value="note"
              name="inline-radio-group"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div class="flex items-center mr-4">
            <label
              for="inline-2-radio"
              class="ml-2 mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Popularité
            </label>
            <input
              v-model="selectedSorting"
              type="radio"
              id="inline-2-radio"
              value="popularity"
              name="inline-radio-group"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </form>
    </div>

    <div class="mt-5 w-full px-4">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <MovieCard
          v-for="movie in sortedMovies"
          :title="movie.title"
          :description="movie.overview"
          :image="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
          url="/test"
        />
      </div>
    </div>

    <Pagination :pages="totalPages" class="mt-5" @change-page="changePage" />

    <div v-if="failedLoading">
      <p
        class="max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-white"
      >
        Nous n'avons pas pu charger les affiches de films.
      </p>
      <button
        type="button"
        class="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="fetchMovies(1)"
      >
        Réessayer
      </button>
    </div>
  </div>
</template>
