<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Book } from '../../Backend/src/interfaces/book'

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
    <div class="book-container">
      <div v-for="book in books" :key="book.id" class="book-card">
        <img :src="book.imageURL" :alt="book.title" />
  
        <div class="book-details">
          <h4>{{ book.title }}</h4>
          <p>{{ book.price }} DKK</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.book-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  padding: 2rem;
}

.book-card {
  border-radius: 7px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding-bottom: 12px;
}

.book-card img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.book-details {
  padding: 10px 0;
}

.book-details h4 {
  font-size: 14px;
  color: #000;
  padding-bottom: 4px;
  font-weight: normal;
  line-height: 16px;
  font-family: "open sans";
}

.book-details p {
  font-size: 14px;
  color: #000;
  font-weight: bold;
  line-height: 16px;
  font-family: "open sans";
}
</style>
