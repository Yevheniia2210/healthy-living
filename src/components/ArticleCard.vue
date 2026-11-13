
<script setup>
// EN: Receive the article information from the parent component.
// RU: Получаем информацию о статье из родительского компонента.
defineProps({
  article: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['read'])
</script>

<template>
  <article class="article-card">
    <div class="article-media">
      <video
        v-if="article.video"
        controls
        :poster="article.image"
        preload="metadata"
      >
        <source :src="article.video" type="video/mp4">
      </video>

      <img
        v-else
        :class="{ 'contain-image': article.id === 5 }"
        :src="article.image"
        :alt="article.title"
      >
    </div>

    <div class="article-copy">
      <span>{{ article.category }}</span>
      <h3>{{ article.title }}</h3>
      <p>{{ article.description }}</p>

      <!-- EN: The Read More button opens the full article. -->
      <!-- RU: Кнопка Read More открывает полную статью. -->
      <button @click="emit('read', article)">
        Read More
      </button>
    </div>
  </article>
</template>
