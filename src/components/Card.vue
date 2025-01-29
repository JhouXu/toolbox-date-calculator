<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: { type: String, default: "卡片" },
  type: {
    type: String,
    default: "fill",
    validator(value) {
      return ["fill", "card"].includes(value);
    },
  },
});
</script>

<template>
  <div class="card">
    <div class="card-title">{{ props.title }}</div>
    <div class="card-content" :class="props.type === 'card' ? 'type-card' : 'type-fill'">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card-title {
  margin: 0;
  padding: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  opacity: 0.8;
}

.card-content {
}

.type-card {
  margin: 0 16px;
  border-radius: 8px;
  overflow: hidden;
}
</style>
