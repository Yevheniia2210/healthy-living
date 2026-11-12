
# Healthy Living

## Project Overview

Healthy Living is a responsive website developed using Vue 3 and Vite as part of the Web Techniques module.

The website provides information about fitness, nutrition, and wellbeing. Users can browse articles, search for information, filter articles by category, and read detailed content.

An Admin Dashboard allows articles to be added, edited, and deleted.

## Technologies Used

- Vue 3
- JavaScript
- HTML5
- CSS3
- Vue Router
- Vite
- Git and GitHub

## Main Features

### Home Page
- Introduction to the Healthy Living website
- Three categories: Fitness, Nutrition, and Wellbeing
- Navigation to articles by category

### Articles Page
- Displays available articles
- Search articles by title
- Filter articles by category
- Read More button to open full articles

### Article Detail Page
- Displays the selected article
- Includes text, images, and videos where available
- Navigation back to the Articles page

### Admin Dashboard
- View all articles
- Add new articles
- Edit existing articles
- Delete articles with confirmation
- Form validation for required fields

## Responsive Design

The website is responsive and adapts to different screen sizes.

- Desktop: three-column article layout
- Tablet: two-column article layout
- Mobile: single-column article layout

## Vue Components

The project uses reusable Vue components:

- SiteHeader.vue
- ArticleCard.vue
- HomeView.vue
- ArticlesView.vue
- ArticleDetailView.vue
- AdminView.vue

## Routing

Vue Router is used to navigate between pages.

| Route | Page |
|-------|------|
| / | Home |
| /articles | Articles |
| /articles/:id | Article Detail |
| /admin | Admin Dashboard |

## Installation and Setup

### 1. Clone the repository

git clone https://github.com/Yevheniia2210/healthy-living.git

### 2. Open the project folder

cd healthy-living

### 3. Install dependencies

npm install

### 4. Start the development server

npm run dev

Open the local address displayed in the terminal.

## Build

To create a production build:

npm run build

## Data Storage

Article data is currently stored in Vue reactive state.

Articles added, edited, or deleted through the Admin Dashboard are not permanently saved and will reset when the page is refreshed.

## GitHub Repository

https://github.com/Yevheniia2210/healthy-living

## Project Status

The website includes working navigation, article browsing, search and filtering, article details, an Admin Dashboard, and responsive layouts.
