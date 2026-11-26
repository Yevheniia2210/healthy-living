<script setup>
// EN: Imports Vue, Vue Router and the website header.
// RU: Импортирует Vue, Vue Router и шапку сайта.
import { ref, computed, nextTick } from 'vue'
import { useRouter, useRoute, RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import { RouterLink } from 'vue-router'

const router = useRouter()
const route = useRoute()

// EN: Stores the six original articles.
// RU: Хранит шесть исходных статей.
const initialArticles = [
  {
    id: 1,
    title: "Cardio Training",
    category: "Fitness",
    description:
      "Cardio training plays an essential role in improving heart health and increasing overall endurance.",
    content:
      "Cardio training plays an essential role in improving heart health and increasing overall endurance.\n\nIt helps the body use oxygen more efficiently and strengthens the cardiovascular system.\n\nRegular cardio workouts support weight management and improve metabolism.\n\nActivities such as running, cycling and swimming are excellent examples.\n\nRecommended: 3–5 times per week.",
    image: "/images/fitness-original.png",
  },
  {
    id: 2,
    title: "HIIT Training",
    category: "Fitness",
    description: "HIIT combines short bursts of intense exercise with rest.",
    content:
      "HIIT combines short bursts of intense exercise with rest.\n\nIt is extremely effective for burning fat quickly.\n\nThis training improves cardiovascular fitness fast.\n\nIt is more intense than traditional cardio workouts.\n\nBest for people who want fast visible results.\n\nRecommended: 2–3 times per week.",
    image: "/images/hiit-original.jpg",
    video: "/videos/hiit-original.mp4",
  },
  {
    id: 3,
    title: "Strength & Conditioning",
    category: "Fitness",
    description: "Focuses on building muscle strength and improving performance.",
    content:
      "Strength & Conditioning focuses on building muscle strength and improving performance.\n\nIt uses controlled movements and resistance exercises.\n\nIt is less intense than HIIT, but more technical.\n\nIt improves balance, coordination and stability.\n\nIt is suitable for all fitness levels.\n\nRecommended: 2–4 times per week.",
    image: "/images/strength-original.jpg",
    video: "/videos/strength-original.mp4",
  },
  {
    id: 4,
    title: "Yoga Tips for Beginners",
    category: "Wellbeing",
    description: "Yoga is one of the easiest ways to improve both physical and mental health.",
    content:
      "Yoga is one of the easiest ways to improve both physical and mental health. Many beginners feel nervous when starting yoga, but it is important to remember that yoga is not about being perfect.\n\nIt is about listening to your body and moving at your own pace. Simple poses such as child’s pose, downward dog, and light stretching can already help relax your muscles and reduce tension. Breathing is also a very important part of yoga. Slow and controlled breathing helps reduce stress, improves focus, and makes exercises more effective.\n\nEven 10–15 minutes of yoga every day can improve posture, balance, and overall wellbeing. Over time, regular practice can help you feel calmer and more confident. You do not need expensive equipment to start yoga. A simple mat and comfortable clothes are enough, and you can practice at home or in a quiet outdoor space.",
    image: "/images/yoga-original.png",
  },
  {
    id: 5,
    title: "Smart Food & Drink Swaps",
    category: "Nutrition",
    description: "Making small changes in your daily diet can have a big impact on your results.",
    content:
      "Making small changes in your daily diet can have a big impact on your results. Many people think they need to completely remove their favourite foods.\n\nHowever, this is not always necessary. A better approach is to replace high-calorie or unhealthy options with smarter alternatives. For example, instead of adding honey or sugar to drinks, you can use flavour drops that give sweetness without extra calories.\n\nRegular pasta can be replaced with lentil pasta, which contains more protein and fibre. Cream cheese is often high in fat, so choosing cottage cheese is a healthier option. Drinks are also important. Switching from sugary drinks to zero-calorie options helps reduce calorie intake and supports weight control.",
    image: "/images/food-swaps-17.png",
  },
  {
    id: 6,
    title: "Protein Diet for Fitness & Weight Loss",
    category: "Nutrition",
    description:
      "A high-protein diet is very important for people who train regularly and want to lose weight.",
    content:
      "A high-protein diet is very important for people who train regularly and want to lose weight. Protein helps build muscle and keeps you full longer.\n\nProtein also helps repair muscles and supports energy levels during the day. For active people, it is recommended to eat around 100–120 grams of protein per day. Good sources include chicken, fish, eggs, Greek yogurt, cottage cheese, and other dairy products.\n\nIt is also important to include a lot of vegetables in your meals, as they provide vitamins, minerals, and fibre that support digestion. If your goal is weight loss, you should be in a calorie deficit, meaning you consume fewer calories than your body uses. Combining protein, vegetables, and a calorie deficit helps reduce body fat while maintaining muscle mass.",
    image: "/images/protein-meal-original.png",
    extraImages: [
      "/images/protein-food-original.png",
      "/images/protein-meat-original.png"
    ],
  },
]

// EN: ref stores reactive data. Vue updates the page when articles change.
// RU: ref хранит реактивные данные. Vue обновляет страницу при изменении статей.
const articles = ref(initialArticles.map(article => ({ ...article })))

// EN: computed updates the current page name when the route changes.
// RU: computed обновляет название текущей страницы при смене маршрута.
const screen = computed(() => route.name || 'home')

const filter = ref('All')
const editingId = ref(null)
const showForm = ref(false)

// EN: Creates an empty article form.
// RU: Создаёт пустую форму статьи.
const blankArticle = () => ({
  title: '',
  category: 'Fitness',
  description: '',
  content: '',
  image: '',
  video: '',
  extraImages: []
})

const form = ref(blankArticle())

// EN: READ - Finds an article by its ID.
// RU: READ - Находит статью по её ID.
const selectedArticle = computed(() => {
  const id = Number(route.params.id)
  return articles.value.find(article => article.id === id)
})

// EN: The three website categories.
// RU: Три категории сайта.
const categories = [
  {
    name: 'Fitness',
    text: 'Improve your strength and health.',
    image: '/images/fitness-original.png'
  },
  {
    name: 'Nutrition',
    text: 'Eat better and feel better.',
    image: '/images/nutrition-original.png'
  },
  {
    name: 'Wellbeing',
    text: 'Balance your body and mind.',
    image: '/images/yoga-original.png'
  },

]

// EN: Vue Router navigates between pages without reloading the website.
// RU: Vue Router переключает страницы без перезагрузки сайта.
function navigate(to) {
  router.push({ name: to })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// EN: Opens the article list with the selected category.
// RU: Открывает список статей с выбранной категорией.
function showArticles(category = 'All') {
  filter.value = category
  navigate('articles')
}

// EN: Opens the selected article.
// RU: Открывает выбранную статью.
function showArticle(article) {
  router.push({
    name: 'article',
    params: { id: article.id }
  })

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// EN: Opens an empty form to add a new article.
// RU: Открывает пустую форму для добавления статьи.
function startAdd() {
  editingId.value = null
  form.value = blankArticle()
  showForm.value = true
}

// EN: Opens the form with the selected article's data.
// RU: Открывает форму с данными выбранной статьи.
async function startEdit(article) {
  editingId.value = article.id

  form.value = {
    ...article,
    extraImages: [...(article.extraImages || [])]
  }

  showForm.value = true

  await nextTick()

  document.getElementById('article-form')
    ?.scrollIntoView({ behavior: 'smooth' })
}

// EN: Saves a new article or updates an existing article.
// RU: Сохраняет новую статью или обновляет существующую.
function saveArticle() {
  if (editingId.value === null) {

    // EN: CREATE - Adds a new article using push().
    // RU: CREATE - Добавляет новую статью с помощью push().
    articles.value.push({
      ...form.value,
      id: Math.max(0, ...articles.value.map(a => a.id)) + 1,
      image: form.value.image || '/images/fitness-original.png'
    })

  } else {

    // EN: UPDATE - Updates an existing article using map().
    // RU: UPDATE - Обновляет существующую статью с помощью map().
    articles.value = articles.value.map(article =>
      article.id === editingId.value
        ? { ...article, ...form.value }
        : article
    )
  }

  showForm.value = false
  editingId.value = null
  form.value = blankArticle()
}

// EN: DELETE - Removes an article using filter() after confirmation.
// RU: DELETE - Удаляет статью через filter() после подтверждения.
function deleteArticle(article) {
  if (window.confirm(`Delete “${article.title}”?`)) {
    articles.value = articles.value.filter(a => a.id !== article.id)

    if (editingId.value === article.id) {
      showForm.value = false
    }
  }
}
</script>

<template>
  <div class="app-shell" id="top">

    <SiteHeader
      :screen="screen"
      @navigate="navigate"
    />

    <!-- EN: RouterView displays the current page. -->
    <!-- RU: RouterView отображает текущую страницу. -->
    <RouterView v-slot="{ Component }">
      <component
        :is="Component"

        :categories="categories"
        :articles="articles"
        :category="filter"

        :article="selectedArticle"

        :show-form="showForm"
        :editing-id="editingId"
        :form="form"

        @show-articles="showArticles"
        @read="showArticle"
        @back="showArticles('All')"

        @add="startAdd"
        @edit="startEdit"
        @delete="deleteArticle"
        @save="saveArticle"
        @cancel="showForm = false"
      />
    </RouterView>

    <footer>

      <RouterLink to="/about" class="footer-button">
        About
      </RouterLink>

      <p class="copyright">© 2026 Healthy Living</p>
    </footer>

  </div>
</template>