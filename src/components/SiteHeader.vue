
<script setup>
defineProps({
  screen: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['navigate'])
</script>

<template>
  <header class="site-header">
    <nav aria-label="Main navigation">
      <button
        :class="{ active: screen === 'home' }"
        @click="emit('navigate', 'home')"
      >
        Home
      </button>

      <button
        :class="{ active: screen === 'articles' || screen === 'article' }"
        @click="emit('navigate', 'articles')"
      >
        Articles
      </button>

      <button
        :class="{ active: screen === 'admin' }"
        @click="emit('navigate', 'admin')"
      >
        Admin
      </button>
    </nav>
  </header>
</template>
