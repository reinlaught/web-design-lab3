<template>
  <main
    class="flex-grow container mx-auto px-4 py-12 flex flex-col items-center"
  >
    <div class="bg-white p-10 rounded-2xl shadow-lg max-w-2xl text-center">
      <div
        class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>

      <h2 class="text-3xl font-bold text-gray-800 mb-4">CalcApp Web</h2>

      <p class="text-gray-600 leading-relaxed mb-6">
        CalcApp — це сучасний, адаптивний веб-калькулятор, розроблений в рамках
        лабораторних робіт з дисципліни "Web-дизайн". Додаток дозволяє
        виконувати базові математичні операції та має зручний користувацький
        інтерфейс, оптимізований як для десктопних, так і для мобільних
        пристроїв.
      </p>

      <div class="bg-gray-50 border rounded-lg p-6 text-left">
        <h3 class="font-semibold text-gray-700 mb-2">Технологічний стек:</h3>
        <ul class="list-disc list-inside text-gray-600 space-y-1">
          <li>HTML5 та CSS3</li>
          <li>JavaScript (ES6+)</li>
          <li>VueJS 3 (Composition API) та Vue Router</li>
          <li>Tailwind CSS</li>
          <li>NodeJS, ExpressJS, SQLite (Backend)</li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup></script>
