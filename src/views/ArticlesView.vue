
<script setup>
import { ref, computed } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'

// EN: Props receive data from parent App.vue.
// RU: Props получают данные от родительского компонента App.vue.
const props = defineProps({
  articles: {
    type: Array,
    required: true
  },
  category: {
    type: String,
    default: 'All'
  }
})

// EN: Emits sends events from child ArticlesView.vue to parent App.vue.
// RU: Emits отправляет события от ArticlesView.vue к App.vue.
const emit = defineEmits(['read'])

// EN: ref creates reactive state for search and category filtering.
// RU: ref создаёт реактивные данные для поиска и фильтрации.
const search = ref('')
const filter = ref(props.category)

// EN: SEARCH and CATEGORY FILTERING - Finds articles by title and category.
// RU: ПОИСК И ФИЛЬТРАЦИЯ - Находит статьи по названию и категории.
const filteredArticles = computed(() =>
  props.articles.filter(article =>
    article.title.toLowerCase().includes(search.value.trim().toLowerCase()) &&
    (filter.value === 'All' || article.category === filter.value)
  )
)
</script>

<template>
  <main class="articles-page">
    <section class="hero home-hero">

      <h1>Healthy Living</h1>
    </section>

    <section class="articles-section" aria-label="Health articles">
      <div class="content-section">
        <h1 class="page-section-heading">Health Articles</h1>

        <div class="article-tools">
          <label class="search-box">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2"/>
              <path
                d="m16 16 4 4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>

            <span class="sr-only">Search articles by title</span>

            <!-- EN: v-model connects input to reactive data. -->
            <!-- RU: v-model связывает поле ввода с реактивными данными. -->
            <input
              v-model="search"
              type="search"
              placeholder="Search articles by title"
            >
          </label>

          <div class="filter-group" aria-label="Filter articles by category">

            <!-- EN: v-for displays items from a list. -->
            <!-- RU: v-for выводит элементы списка. -->
            <button
              v-for="item in ['All', 'Fitness', 'Nutrition', 'Wellbeing']"
              :key="item"
              :class="{ active: filter === item }"
              @click="filter = item"
            >
              {{ item }}
            </button>
          </div>
        </div>

        <!-- EN: v-if shows an element if a condition is true. -->
        <!-- RU: v-if показывает элемент, если условие выполняется. -->
        <div v-if="filteredArticles.length" class="article-grid">
          <ArticleCard
            v-for="article in filteredArticles"
            :key="article.id"
            :article="article"
            @read="emit('read', $event)"
          />
        </div>

        <!-- EN: v-else shows content when the condition is false. -->
        <!-- RU: v-else показывает содержимое, если условие не выполнено. -->
        <div v-else class="empty-state">
          <h3>No articles found</h3>
          <p>Try another title or category.</p>

          <!-- EN: @click runs an action when clicked. -->
          <!-- RU: @click выполняет действие при нажатии. -->
          <button @click="search = ''; filter = 'All'">
            Clear filters
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
