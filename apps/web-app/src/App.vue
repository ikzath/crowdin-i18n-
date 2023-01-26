<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import I18n from "./components/i18n/i18n.vue";
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld>welcome </HelloWorld>
  <!-- <I18n> {{ $t("hello") }}</I18n> -->
  <I18n message="my message" plural="count" vars="{msg: 1}">hello</I18n>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
