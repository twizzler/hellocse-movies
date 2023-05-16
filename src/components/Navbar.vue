<script setup lang="ts"></script>

<template>
  <header class="fixed left-0 top-0 w-full bg-blue-500 shadow-lg z-50">
    <nav class="flex items-center justify-between gap-4 text-white py-6 w-full">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-10">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">HelloCSE Movies</p>
        </div>
      </RouterLink>
    </nav>
  </header>
</template>
