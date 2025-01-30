<script setup>
import { ref, onMounted } from "vue";
import { actions } from "@/config.js";

const props = defineProps({
  number: { type: [Number, String], default: "" },
  suffix: { type: String, default: "" },
});

const emits = defineEmits(["updateNumber", "updateUnit"]);

const showPopover = ref(false);
const type = ref("");
const actionsPopover = ref(actions);
const actionColor = "#1989fa";

onMounted(() => {
  console.log(actionsPopover.value);
  selectAction(actionsPopover.value.at(-1).text);
});

function selectAction(text) {
  let value = 0;
  type.value = text;
  actionsPopover.value.map((item) => {
    if (item.text === type.value) {
      item.color = actionColor;
      value = item.value;
    } else {
      item.color = "";
    }
  });

  console.log(actionsPopover.value);
  emits("updateUnit", value);
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
