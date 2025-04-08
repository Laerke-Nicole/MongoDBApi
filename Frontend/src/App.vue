<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Book } from '../../src/interfaces/book'

const books = ref<Book[]>([]);

onMounted(async () => {
  try {
    const response = await fetch('https://mongodbapi-w61d.onrender.com/api/books');
    const data = await response.json();
    books.value = data;
  } catch (error) {
    console.error('Failed to fetch books:', error);
  }
});
</script>

<template>
  <main>
    <div v-for="book in books" :key="book.id" class="book-card">
      <img :src="book.imageURL" :alt="book.title" />
      <h4>{{ book.title }}</h4>
      <p>{{ book.author }}</p>
    </div>
  </main>
</template>

<style scoped>

</style>
