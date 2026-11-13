
<script setup>
// EN: Receive the categories from App.vue.
// RU: Получаем категории из App.vue.
defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['showArticles'])
</script>

<template>
  <main>
    <section class="hero home-hero">
      <h1>Healthy Living</h1>
    </section>

    <section
      class="content-section categories"
      aria-label="Article categories"
    >
      <div class="category-grid">
        <!-- EN: Display the categories and open articles when a category is clicked. -->
        <!-- RU: Показываем категории и открываем статьи при нажатии на категорию. -->
        <button
          v-for="category in categories"
          :key="category.name"
          class="category-card"
          @click="emit('showArticles', category.name)"
        >
          <img :src="category.image" alt="">

          <div>
            <h2>{{ category.name }}</h2>
            <p>{{ category.text }}</p>
          </div>
        </button>
      </div>
    </section>
  </main>
</template>
