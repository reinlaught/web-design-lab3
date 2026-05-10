<template>
  <main
    class="flex-grow container mx-auto px-4 py-8 flex justify-center items-center"
  >
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
        Вхід до системи
      </h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 font-semibold mb-2">Пароль</label>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Увійти
        </button>
      </form>

      <p class="text-center mt-4 text-sm text-gray-600">
        Ще не маєте акаунту?
        <router-link to="/register" class="text-blue-600 hover:underline"
          >Зареєструватись</router-link
        >
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/login", {
      email: email.value,
      password: password.value,
    });

    // Зберігаємо стан авторизації
    localStorage.setItem("currentUser", JSON.stringify(response.data.user));
    localStorage.setItem("isLoggedIn", "true");

    router.push("/profile");
  } catch (error) {
    alert(error.response?.data?.error || "Помилка з'єднання з сервером");
  }
};
</script>
