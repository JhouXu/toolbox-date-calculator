<script setup>
const props = defineProps({
  prefix: { type: String, default: "" }, // 前缀
  day: { type: Number, default: 0 }, // 星期几
});
</script>

<template>
  <div class="content">
    <span>{{ props.prefix }}</span>
    <span class="day">{{ props.day }}</span>
    <span>
      <van-tag type="primary" size="large">
        {{ day < 10 ? "Day" : "Days" }}
      </van-tag>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  height: 60px;

  .day {
    color: #1989fa;
    font-weight: bold;
    font-size: 36px;
  }
}
</style>
