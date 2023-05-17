<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="flex flex-col items-stretch justify-start min-h-screen">
    <Navbar />
    <div class="flex-grow">
      <RouterView class="mt-16" />
    </div>
  </div>
</template>
