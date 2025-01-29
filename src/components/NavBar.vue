<script setup>
import { ref, onMounted } from "vue";
import { useSettingStore } from "@/stores/setting";
import { title } from "@/config.js";

const settingsStore = useSettingStore();

const iconLight = new URL("../assets/light-theme.svg", import.meta.url).href;
const iconDark = new URL("../assets/dark-theme.svg", import.meta.url).href;
</script>

<template>
  <van-nav-bar :title="title">
    <template #right>
      <div class="theme-icon" @click="settingsStore.toggleTheme">
        <van-icon size="25" v-show="settingsStore.theme === 'dark'" :name="iconLight" />
        <van-icon size="25" v-show="settingsStore.theme === 'light'" :name="iconDark" />
      </div>
    </template>
  </van-nav-bar>
</template>

<style lang="scss" scoped>
.theme-icon {
  display: grid;
  place-content: center;
  font-size: 0;
  border: 1px solid #242424;
  border-radius: 100%;
}
</style>
