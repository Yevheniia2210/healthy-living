
<script setup>
import { ref, computed } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'

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

const emit = defineEmits(['read'])

const search = ref('')
const filter = ref(props.category)

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
              <path d="m16 16 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span class="sr-only">Search articles by title</span>
            <input
              v-model="search"
              type="search"
              placeholder="Search articles by title"
            >
          </label>

          <div class="filter-group" aria-label="Filter articles by category">
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

        <div v-if="filteredArticles.length" class="article-grid">
          <ArticleCard
            v-for="article in filteredArticles"
            :key="article.id"
            :article="article"
            @read="emit('read', $event)"
          />
        </div>

        <div v-else class="empty-state">
          <h3>No articles found</h3>
          <p>Try another title or category.</p>
          <button @click="search = ''; filter = 'All'">
            Clear filters
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
