<template>
  <main class="flex-grow container mx-auto px-4 py-8 max-w-3xl">
    <div class="bg-white p-8 rounded-lg shadow-md">
      <div class="flex items-center space-x-4 mb-6 border-b pb-4">
        <div
          class="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
        >
          {{ userInitials }}
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Особистий кабінет</h2>
          <p class="text-gray-500">Інформація про користувача</p>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <tbody>
            <tr class="border-b hover:bg-gray-50">
              <th class="py-4 px-4 font-semibold text-gray-700 w-1/3">Ім'я:</th>
              <td class="py-4 px-4 text-gray-600">
                <span v-if="!isEditing">{{ user.name }}</span>
                <input
                  v-else
                  v-model="editData.name"
                  type="text"
                  class="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
            <tr class="border-b hover:bg-gray-50">
              <th class="py-4 px-4 font-semibold text-gray-700">Email:</th>
              <td class="py-4 px-4 text-gray-600">{{ user.email }}</td>
            </tr>
            <tr class="border-b hover:bg-gray-50">
              <th class="py-4 px-4 font-semibold text-gray-700">Стать:</th>
              <td class="py-4 px-4 text-gray-600">
                <span v-if="!isEditing">{{ formatGender(user.gender) }}</span>
                <select
                  v-else
                  v-model="editData.gender"
                  class="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">Чоловіча</option>
                  <option value="female">Жіноча</option>
                </select>
              </td>
            </tr>
            <tr class="border-b hover:bg-gray-50">
              <th class="py-4 px-4 font-semibold text-gray-700">
                Дата народження:
              </th>
              <td class="py-4 px-4 text-gray-600">
                <span v-if="!isEditing">{{ user.dob }}</span>
                <input
                  v-else
                  v-model="editData.dob"
                  type="date"
                  class="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <th class="py-4 px-4 font-semibold text-gray-700">
                Дата реєстрації:
              </th>
              <td class="py-4 px-4 text-gray-600">
                {{ user.regDate || "Невідомо" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6 flex justify-end">
        <button
          @click="toggleEdit"
          :class="
            isEditing
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
          "
          class="text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          {{ isEditing ? "Зберегти зміни" : "Редагувати профіль" }}
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Реактивні дані користувача
const user = ref({
  name: "Гість",
  email: "-",
  gender: "-",
  dob: "-",
  regDate: "-",
});

const isEditing = ref(false);
const editData = ref({});

// Обчислення ініціалів
const userInitials = computed(() => {
  if (!user.value.name || user.value.name === "Гість") return "--";
  const words = user.value.name.trim().split(" ");
  return words.length >= 2
    ? (words[0][0] + words[1][0]).toUpperCase()
    : words[0][0].toUpperCase();
});

const formatGender = (gender) => {
  if (gender === "male") return "Чоловіча";
  if (gender === "female") return "Жіноча";
  return "Не вказано";
};

// При завантаженні сторінки перевіряємо авторизацію
onMounted(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    router.push("/login"); // Перекидаємо на вхід, якщо не авторизований
    return;
  }

  const savedUserData = localStorage.getItem("currentUser");
  if (savedUserData) {
    user.value = JSON.parse(savedUserData);
  }
});

// Логіка редагування
const toggleEdit = () => {
  if (!isEditing.value) {
    // Вмикаємо режим редагування, копіюємо дані
    editData.value = { ...user.value };
    isEditing.value = true;
  } else {
    // Зберігаємо дані
    user.value = { ...editData.value };
    localStorage.setItem("currentUser", JSON.stringify(user.value));
    isEditing.value = false;
  }
};
</script>
