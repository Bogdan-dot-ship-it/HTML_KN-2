<script setup>
const userStore = useUserStore()

const { name, isLoggedIn, welcomeMessage, profileData, isLoading } = storeToRefs(userStore)

const inputName = ref('')

const handleLogin = () => {
  if (inputName.value) {
    userStore.login(inputName.value)
    inputName.value = ''

    userStore.fetchProfile()
  }
}
</script>

<template>
  <div class="container">
    <h1>{{ welcomeMessage }}</h1>

    <div v-if="!isLoggedIn" class="login-box">
      <input v-model="inputName" placeholder="Введіть ваше ім'я" />
      <button @click="handleLogin">Увійти</button>
    </div>

    <div v-else>
      <p class="status">Ви зайшли о: {{ userStore.loginTime }}</p>

      <div v-if="isLoading">Завантаження профілю Github...</div>
      <div v-else-if="profileData" class="profile-card">
        <p><strong>GitHub логін:</strong> {{ profileData.login }}</p>
        <img :src="profileData.avatar_url" alt="Avatar" width="100" />
      </div>

      <button @click="userStore.logout" class="logout-btn">Вийти</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 2rem;
  font-family: sans-serif;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  margin-left: 0.5rem;
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover { background: #2563eb; }
.logout-btn { background: #ef4444; margin-top: 20px; margin-left: 0;}
.logout-btn:hover { background: #dc2626; }
.status { color: #6b7280; margin-bottom: 20px; }
.profile-card { background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;}
</style>
