
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

// EN: Emits sends events from AdminView.vue to parent App.vue.
// RU: Emits отправляет события из AdminView.vue в App.vue.
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

        <!-- EN: CREATE - Opens the form to add a new article. -->
        <!-- RU: CREATE - Открывает форму добавления новой статьи. -->
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

          <!-- EN: READ - Displays the list of articles. -->
          <!-- RU: READ - Показывает список статей. -->
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

              <!-- EN: UPDATE - Opens the form to edit an article. -->
              <!-- RU: UPDATE - Открывает форму редактирования статьи. -->
              <button @click="emit('edit', article)">
                Edit
              </button>

              <!-- EN: DELETE - Sends an event to delete an article. -->
              <!-- RU: DELETE - Отправляет событие для удаления статьи. -->
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

      <!-- EN: Shows the form when adding or editing an article. -->
      <!-- RU: Показывает форму при добавлении или редактировании статьи. -->
      <section
        v-if="showForm"
        id="article-form"
        class="form-panel"
      >
        <h2>
          {{ editingId === null ? 'Add Article' : 'Edit Article' }}
        </h2>

        <!-- EN: Saves the article without reloading the page. -->
        <!-- RU: Сохраняет статью без перезагрузки страницы. -->
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
