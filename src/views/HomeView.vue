
<script setup>
// EN: Props receive the categories from App.vue.
// RU: Props получают категории из App.vue.
defineProps({
  categories: {
    type: Array,
    required: true
  }
})

// EN: Define an event to send the selected category to the parent component.
// RU: Объявляем событие для передачи выбранной категории родительскому компоненту.
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
        <!-- EN: v-for creates a button for each category. -->
        <!-- RU: v-for создаёт кнопку для каждой категории. -->

        <!-- EN: @click sends the selected category using emit. -->
        <!-- RU: @click передаёт выбранную категорию с помощью emit. -->
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
