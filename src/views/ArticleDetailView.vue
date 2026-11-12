
<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back'])
</script>

<template>
  <main class="detail-page">
    <section class="hero page-hero">
      <h1>{{ article.title }}</h1>
    </section>

    <section class="detail-content">
      <article class="detail-card">

        <span class="detail-category">
          {{ article.category }}
        </span>

        <video
          v-if="article.video"
          controls
          :poster="article.image"
        >
          <source
            :src="article.video"
            type="video/mp4"
          >
        </video>

        <img
          v-else
          class="detail-main-image"
          :class="{ 'contain-image': article.id === 5 }"
          :src="article.image"
          :alt="article.title"
        >

        <div class="detail-text">
          <p
            v-for="(paragraph, i) in article.content.split('\n\n')"
            :key="i"
          >
            {{ paragraph }}
          </p>
        </div>

        <div
          v-if="article.extraImages?.length"
          class="detail-gallery"
        >
          <img
            v-for="(image, i) in article.extraImages"
            :key="image"
            :src="image"
            :alt="`${article.title} example ${i + 2}`"
          >
        </div>

        <button
          class="blue-button"
          @click="emit('back')"
        >
          Back to Articles
        </button>

      </article>
    </section>
  </main>
</template>
