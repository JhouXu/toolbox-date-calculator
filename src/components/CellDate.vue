<script setup>
const props = defineProps({
  prefix: { type: String, default: "" }, // 前缀
  suffix: { type: String, default: "" }, // 后缀
  date: { type: String, default: "1970-01-01" }, // yyyy-mm-dd
  week: { type: String, default: "星期八" }, // 星期几
});
</script>

<template>
  <div class="content">
    <span>{{ props.prefix }}</span>
    <span class="date"> {{ props.date }} {{ props.week }} </span>
    <span style="transform: rotate(90deg) translateX(-2px)">
      <van-icon name="play" />
    </span>
    <span>{{ props.suffix }}</span>
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

  .date {
    color: #1989fa;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
