
<script setup>
defineProps({
  articles: {
    type: Array,
    required: true
  },
  showForm: {
    type: Boolean,
    required: true
  },
  editingId: {
    type: Number,
    default: null
  },
  form: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  'add',
  'edit',
  'delete',
  'save',
  'cancel'
])
</script>

<template>
  <main class="admin-screen">
    <section class="hero home-hero">
      <h1>Healthy Living</h1>
    </section>

    <section class="admin-page">
      <div class="admin-heading">
        <h1 class="page-section-heading">
          Admin Dashboard
        </h1>

        <button
          class="blue-button"
          @click="emit('add')"
        >
          Add Article
        </button>
      </div>

      <section class="admin-panel">
        <h2>Articles</h2>

        <div class="admin-list">
          <div
            v-for="article in articles"
            :key="article.id"
            class="admin-row"
          >
            <img :src="article.image" alt="">

            <div class="admin-copy">
              <span>{{ article.category }}</span>
              <h3>{{ article.title }}</h3>
              <p>{{ article.description }}</p>
            </div>

            <div class="admin-actions">
              <button @click="emit('edit', article)">
                Edit
              </button>

              <button
                class="delete-button"
                @click="emit('delete', article)"
              >
                Delete
              </button>
            </div>
          </div>

          <p v-if="!articles.length" class="admin-empty">
            No articles available.
          </p>
        </div>
      </section>

      <section
        v-if="showForm"
        id="article-form"
        class="form-panel"
      >
        <h2>
          {{ editingId === null ? 'Add Article' : 'Edit Article' }}
        </h2>

        <form @submit.prevent="emit('save')">
          <label class="full-field">
            <span>Title</span>
            <input v-model="form.title" required>
          </label>

          <label>
            <span>Category</span>
            <select v-model="form.category">
              <option>Fitness</option>
              <option>Nutrition</option>
              <option>Wellbeing</option>
            </select>
          </label>

          <label>
            <span>Image URL</span>
            <input
              v-model="form.image"
              placeholder="/images/example.png"
            >
          </label>

          <label class="full-field">
            <span>Description</span>
            <textarea
              v-model="form.description"
              required
              rows="3"
            ></textarea>
          </label>

          <label class="full-field">
            <span>Content</span>
            <textarea
              v-model="form.content"
              required
              rows="8"
            ></textarea>
          </label>

          <div class="form-actions full-field">
            <button
              type="button"
              class="cancel-button"
              @click="emit('cancel')"
            >
              Cancel
            </button>

            <button type="submit" class="blue-button">
              Save
            </button>
          </div>
        </form>
      </section>
    </section>
  </main>
</template>
