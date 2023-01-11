<template ref="data">{{ result }}</template>

<script lang="ts" setup>
import { onMounted, ref, getCurrentInstance, useSlots } from "vue";
// import { useI18n } from "../composables/useI18n.js";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const slots: any = useSlots();
const instance = getCurrentInstance();

const getSlot = slots.default()[0].children;
console.log(getSlot);

const result = ref(t(getSlot));
console.log(result.value);

// onMounted(() => {
//   console.log(instance);
// });
</script>

<style scoped>
.btn-lang {
  background: #eee;
  border: 0;
  cursor: pointer;
  line-height: 30px;
  border-radius: 3px;
  margin: 10px 5px;
  min-width: 40px;
}
.btn-lang:hover {
  color: #3fb883;
}
.btn-lang-active {
  background-color: #3fb883;
  color: #fff !important;
}
</style>
