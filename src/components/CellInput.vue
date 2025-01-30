<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  number: { type: [Number, String], default: "" },
  suffix: { type: String, default: "" },
});

const emits = defineEmits(["updateNumber", "updateRatio"]);

const showPopover = ref(false);
const type = ref("");
const actions = [
  { text: "年", color: "", ratio: 365 },
  { text: "月", color: "", ratio: 30 },
  { text: "周", color: "", ratio: 7 },
  { text: "天", color: "", ratio: 1 },
];
const actionColor = "#1989fa";

onMounted(() => {
  selectAction(actions.at(-1).text);
});

function selectAction(text) {
  let ratio = 0;
  type.value = text;
  actions.map((item) => {
    if (item.text === type.value) {
      item.color = actionColor;
      ratio = item.ratio;
    } else {
      item.color = "";
    }
  });
  emits("updateRatio", ratio);
}
</script>

<template>
  <div class="input">
    <div class="input-field">
      <van-field
        :model-value="props.number"
        type="number"
        input-align="center"
        placeholder="输入数字计算"
        center
        maxlength="3"
        @update:model-value="emits('updateNumber', $event)" />
      <van-popover v-model:show="showPopover" :actions="actions" @select="($event) => selectAction($event.text)">
        <template #reference>
          <div class="input-field__type">
            <span>{{ type }}</span>
            <span style="transform: rotate(90deg) translateX(-2px); margin-left: 4px">
              <van-icon name="play" />
            </span>
          </div>
        </template>
      </van-popover>
    </div>
    <div class="input-label">{{ props.suffix }}</div>
  </div>
</template>

<style lang="scss" scoped>
.input {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &-field {
    display: flex;
    border: 1px solid #737373;
    border-radius: 24px;
    overflow: hidden;

    .van-field {
      width: 130px;
      font-size: 16px;
    }

    &__type {
      padding: 8px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      box-sizing: border-box;
      border-left: 1px solid #737373;
    }

    &-label {
    }
  }
}
</style>
