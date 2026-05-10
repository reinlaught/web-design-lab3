<template>
  <div class="bg-gray-50 flex flex-col min-h-screen text-gray-800">
    <header class="bg-blue-600 text-white shadow-md">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <h1 class="text-2xl font-bold">CalcApp</h1>
        <nav class="space-x-4">
          <router-link
            to="/"
            class="hover:text-blue-200"
            active-class="underline"
            >Калькулятор</router-link
          >
          <router-link
            to="/about"
            class="hover:text-blue-200"
            active-class="underline"
            >Про додаток</router-link
          >
          <router-link
            to="/profile"
            class="hover:text-blue-200"
            active-class="underline"
            >Профіль</router-link
          >
          <router-link
            to="/login"
            class="hover:text-blue-200"
            active-class="underline"
            >Вхід</router-link
          >
          <router-link
            to="/register"
            class="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >Реєстрація</router-link
          >
        </nav>
      </div>
    </header>

    <router-view />

    <footer class="bg-gray-800 text-gray-300 text-center py-4">
      <p>
        &copy; 2026 НТУУ КПІ ім. Сікорського. Лабораторна робота №3. Студент
        групи КВ-32: Клубук Максим
      </p>
    </footer>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<style>
/* Сюди підключиться наш main.css із Tailwind */
@import "./assets/main.css";
</style>
