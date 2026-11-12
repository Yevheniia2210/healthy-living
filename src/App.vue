<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import ArticleCard from './components/ArticleCard.vue'
import HomeView from './views/HomeView.vue'
import ArticlesView from './views/ArticlesView.vue'
import ArticleDetailView from './views/ArticleDetailView.vue'
import AdminView from './views/AdminView.vue'

const router = useRouter()
const route = useRoute()

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
    extraImages: ["/images/protein-food-original.png", "/images/protein-meat-original.png"],
  },
]
const articles = ref(initialArticles.map(a => ({ ...a })))
const screen = computed(() => {
  if (route.name === 'article') return 'article'
  return route.name || 'home'
})


const selectedId = ref(1)
const search = ref('')
const filter = ref('All')
const editingId = ref(null)
const showForm = ref(false)
const blankArticle = () => ({ title: '', category: 'Fitness', description: '', content: '', image: '', video: '', extraImages: [] })
const form = ref(blankArticle())

const selectedArticle = computed(() => {
  const id = route.name === 'article'
    ? Number(route.params.id)
    : selectedId.value

  return articles.value.find(a => a.id === id)
})

const filteredArticles = computed(() => articles.value.filter(a => a.title.toLowerCase().includes(search.value.trim().toLowerCase()) && (filter.value === 'All' || a.category === filter.value)))
const categories = [
  { name: 'Fitness', text: 'Improve your strength and health.', image: '/images/fitness-original.png' },
  { name: 'Nutrition', text: 'Eat better and feel better.', image: '/images/nutrition-original.png' },
  { name: 'Wellbeing', text: 'Balance your body and mind.', image: '/images/yoga-original.png' },
]

 function navigate(to) {
   router.push({ name: to })
   window.scrollTo({ top: 0, behavior: 'smooth' })
 }

function showArticles(category = 'All') { filter.value = category; search.value = ''; navigate('articles') }

function showArticle(article) {
  selectedId.value = article.id
  router.push({ name: 'article', params: { id: article.id } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function showAdmin() { showForm.value = false; navigate('admin') }
function startAdd() { editingId.value = null; form.value = blankArticle(); showForm.value = true }
async function startEdit(article) { editingId.value = article.id; form.value = { ...article, extraImages: [...(article.extraImages || [])] }; showForm.value = true; await nextTick(); document.getElementById('article-form')?.scrollIntoView({ behavior: 'smooth' }) }
function saveArticle() {
  if (editingId.value === null) articles.value.push({ ...form.value, id: Math.max(0, ...articles.value.map(a => a.id)) + 1, image: form.value.image || '/images/fitness-original.png' })
  else articles.value = articles.value.map(a => a.id === editingId.value ? { ...a, ...form.value } : a)
  showForm.value = false; editingId.value = null; form.value = blankArticle()
}
function deleteArticle(article) { if (window.confirm(`Delete “${article.title}”?`)) { articles.value = articles.value.filter(a => a.id !== article.id); if (editingId.value === article.id) showForm.value = false } }
</script>

<template>
  <div class="app-shell" id="top">

<SiteHeader :screen="screen" @navigate="navigate" />

   <HomeView
     v-if="screen === 'home'"
     :categories="categories"
     @show-articles="showArticles"
   />



<ArticlesView
  v-else-if="screen === 'articles'"
  :articles="articles"
  :category="filter"
  @read="showArticle"
/>


<ArticleDetailView
  v-else-if="screen === 'article' && selectedArticle"
  :article="selectedArticle"
  @back="navigate('articles')"
/>


<AdminView
  v-else-if="screen === 'admin'"
  :articles="articles"
  :show-form="showForm"
  :editing-id="editingId"
  :form="form"
  @add="startAdd"
  @edit="startEdit"
  @delete="deleteArticle"
  @save="saveArticle"
  @cancel="showForm = false"
/>


    <footer><p class="copyright">© 2026 Healthy Living</p></footer>
  </div>
</template>
