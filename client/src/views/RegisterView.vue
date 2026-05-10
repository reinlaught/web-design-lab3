<template>
  <main
    class="flex-grow container mx-auto px-4 py-8 flex justify-center items-center"
  >
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
        Реєстрація акаунту
      </h2>

      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">ПІБ</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Іванов Іван"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Стать</label>
          <select
            v-model="form.gender"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Оберіть стать</option>
            <option value="male">Чоловіча</option>
            <option value="female">Жіноча</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2"
            >Дата народження</label
          >
          <input
            v-model="form.dob"
            type="date"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 font-semibold mb-2">Пароль</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Створіть пароль"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Зареєструватися
        </button>
      </form>

      <p class="text-center mt-4 text-sm text-gray-600">
        Вже маєте акаунт?
        <router-link to="/login" class="text-blue-600 hover:underline"
          >Увійти</router-link
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

const form = ref({
  name: "",
  email: "",
  gender: "",
  dob: "",
  password: "",
});

const handleRegister = async () => {
  try {
    const today = new Date().toLocaleDateString("uk-UA");

    // Відправляємо дані на сервер
    const response = await axios.post("http://localhost:3000/api/register", {
      ...form.value,
      regDate: today,
    });

    alert(response.data.message);
    router.push("/login"); // Перекидаємо на сторінку входу
  } catch (error) {
    alert(error.response?.data?.error || "Помилка з'єднання з сервером");
  }
};
</script>
