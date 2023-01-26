<template>
  <h1>Vite + Vue</h1>
</template>

<script setup lang="ts">
import { ref, useSlots } from "vue";
import { useI18n } from "vue-i18n";

const slots: any = useSlots();
const getSlot = slots.default()[0].children?.trim().replace(/\n/g, "");
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
