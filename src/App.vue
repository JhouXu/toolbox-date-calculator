<script setup>
import { ref, onMounted, onBeforeMount, watch, computed } from "vue";
import { useSettingStore } from "@/stores/setting";
import NavBar from "@/components/NavBar.vue";
import CalcDate from "@/components/CalcDate.vue";
import CalcDateGap from "@/components/CalcDateGap.vue";

const settingsStore = useSettingStore();

const theme = computed(() => {
  return settingsStore.theme;
});
</script>

<template>
  <van-config-provider :theme="settingsStore.theme">
    <div class="theme" :class="theme === 'dark' ? 'theme-dark' : 'theme-light'">
      <NavBar />

      <div class="container">
        <CalcDate />
        <CalcDateGap />
      </div>
    </div>
  </van-config-provider>
</template>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 768px;
}
</style>
