import { defineStore } from "pinia";
import { ref, onMounted, onBeforeUnmount } from "vue";

export const useSettingStore = defineStore("setting", () => {
  const theme = ref("light");

  function updateTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      theme.value = savedTheme;
    } else {
      theme.value = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
  }

  function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
    localStorage.setItem("theme", theme.value);
  }

  onMounted(() => {
    updateTheme();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateTheme);
  });

  onBeforeUnmount(() => {
    window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", updateTheme);
  });

  return { theme, toggleTheme };
});
