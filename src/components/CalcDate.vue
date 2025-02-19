<script setup>
import { ref, onMounted, watchEffect } from "vue";
import Card from "@/components/Card.vue";
import CellDate from "@/components/CellDate.vue";
import CellInput from "@/components/CellInput.vue";
import * as D from "@/utils/date.tool.ts";
import { minDate, maxDate, actions } from "@/config.js";

const startDate = ref(D.getTodayFormattedDate());
const beforeDate = ref(D.getTodayFormattedDate());
const afterDate = ref(D.getTodayFormattedDate());
const beforeNumber = ref("");
const afterNumber = ref("");
const beforeUnit = ref(actions.at(-1).value);
const afterUnit = ref(actions.at(-1).value);

const showPopup = ref(false);
const currentDate = ref(D.getTodayFormattedDate().split("-"));
const minDatePicker = ref(new Date(minDate));
const maxDatePicker = ref(new Date(maxDate));

watchEffect(() => {
  beforeDate.value = D.calculateDate(startDate.value, beforeNumber.value, beforeUnit.value, "before");
});

watchEffect(() => {
  afterDate.value = D.calculateDate(startDate.value, afterNumber.value, afterUnit.value, "after");
});
</script>

<template>
  <Card title="计算日期" type="card">
    <div class="content">
      <div
        @click="
          () => {
            currentDate = startDate.split('-');
            showPopup = true;
            selectType = 'start';
          }
        ">
        <CellDate prefix="从" suffix="开始" :date="startDate" :week="D.getDayOfWeek(startDate)" />
      </div>
      <div>
        <CellInput
          :number="beforeNumber"
          suffix="之前"
          @updateNumber="(num) => (beforeNumber = num)"
          @updateUnit="(unit) => (beforeUnit = unit)" />
      </div>
      <div class="item-display">
        <span>公元</span>
        <span class="item-display-date">{{ beforeDate }}</span>
        <span>{{ D.getDayOfWeek(beforeDate) }}</span>
      </div>
      <div>
        <CellInput
          :number="afterNumber"
          suffix="之后"
          @updateNumber="(num) => (afterNumber = num)"
          @updateUnit="(ratio) => (afterUnit = ratio)" />
      </div>
      <div class="item-display">
        <span>公元</span>
        <span class="item-display-date">{{ afterDate }}</span>
        <span>{{ D.getDayOfWeek(afterDate) }}</span>
      </div>
    </div>
  </Card>

  <van-popup v-model:show="showPopup" position="bottom" round>
    <van-date-picker
      v-model="currentDate"
      :min-date="minDatePicker"
      :max-date="maxDatePicker"
      @cancel="showPopup = false"
      @confirm="
        ({ selectedValues }) => {
          const format = selectedValues.join('-');
          startDate = format;
          showPopup = false;
        }
      " />
  </van-popup>
</template>

<style lang="scss" scoped>
.content > div {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  min-height: 60px;
  background-color: var(--van-background-2);
}

.content > div:not(:last-child)::after {
  position: absolute;
  right: var(--van-padding-md);
  left: var(--van-padding-md);
  bottom: 0;
  border-bottom: 1px solid #737373;
  transform: scaleY(0.2);
  box-sizing: border-box;
  pointer-events: none;
  content: "";
}

.item-display {
  font-weight: bold;
  opacity: 0.9;

  &-date {
    font-size: 18px;
  }
}
</style>
