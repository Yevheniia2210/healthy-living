
<script setup>
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

      <button @click="emit('read', article)">
        Read More
      </button>
    </div>
  </article>
</template>
