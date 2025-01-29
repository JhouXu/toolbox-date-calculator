<script setup>
import { ref, onMounted, watchEffect } from "vue";
import Card from "@/components/Card.vue";
import {
  getTodayFormattedDate,
  getDayOfWeek,
  calculateYearDayDifference,
  calculateMonthDayDifference,
  calculateWeekDayDifference,
  calculateTotalDaysDifference,
} from "@/utils/date.tool.ts";

const startDay = ref(getTodayFormattedDate());
const endDay = ref(getTodayFormattedDate());
const selectType = ref(""); // start || end
const calcDay = ref({
  yearDay: "",
  monthDay: "",
  weekDay: "",
  totalDay: "",
});
const isStart = ref(false);

const showPopup = ref(false);
const currentDate = ref(getTodayFormattedDate().split("-"));
const minDate = ref(new Date(1950, 0, 1));
const maxDate = ref(new Date(2100, 11, 31));

watchEffect(() => {
  const yearDay = calculateYearDayDifference(startDay.value, endDay.value, isStart.value);
  const monthDay = calculateMonthDayDifference(startDay.value, endDay.value, isStart.value);
  const weekDay = calculateWeekDayDifference(startDay.value, endDay.value, isStart.value);
  const totalDay = calculateTotalDaysDifference(startDay.value, endDay.value, isStart.value);
  calcDay.value = {
    yearDay: formatDay(yearDay),
    monthDay: formatDay(monthDay),
    weekDay: formatDay(weekDay),
    totalDay: totalDay,
  };
});

function formatDay(diff) {
  if (diff.years !== undefined) {
    return diff.years ? `${diff.years} 年 ${diff.months} 月 ${diff.days} 天` : "";
  } else if (diff.months !== undefined) {
    return diff.months ? `${diff.months} 月 ${diff.days} 天` : "";
  } else if (diff.weeks !== undefined) {
    return diff.weeks ? `${diff.weeks} 周 ${diff.days} 天` : "";
  }
  return "";
}
</script>

<template>
  <Card title="计算日期间隔" type="card">
    <div
      class="item item-input"
      @click="
        () => {
          currentDate = startDay.split('-');
          showPopup = true;
          selectType = 'start';
        }
      ">
      <span>从</span>
      <span class="item-input-date"> {{ startDay }} {{ getDayOfWeek(startDay) }} </span>
      <span style="transform: rotate(90deg) translateX(-2px)">
        <van-icon name="play" />
      </span>
      <span>开始</span>
    </div>
    <div
      class="item item-input"
      @click="
        () => {
          currentDate = endDay.split('-');
          showPopup = true;
          selectType = 'end';
        }
      ">
      <span>至</span>
      <span class="item-input-date"> {{ endDay }} {{ getDayOfWeek(endDay) }} </span>
      <span style="transform: rotate(90deg) translateX(-2px)">
        <van-icon name="play" />
      </span>
      <span>结束</span>
    </div>
    <div class="item">
      <span>共</span>
      <span class="item-day">{{ calcDay.totalDay }}</span>
      <span>
        <van-tag type="primary" size="large">Days</van-tag>
      </span>
    </div>
    <div v-show="calcDay.yearDay" class="item"> {{ calcDay.yearDay }} </div>
    <div v-show="calcDay.monthDay" class="item"> {{ calcDay.monthDay }} </div>
    <div v-show="calcDay.weekDay" class="item"> {{ calcDay.weekDay }} </div>
    <div class="item item-input">
      <van-checkbox v-model="isStart">包含起始日</van-checkbox>
    </div>
  </Card>

  <van-popup v-model:show="showPopup" position="bottom" round>
    <van-date-picker
      v-model="currentDate"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="showPopup = false"
      @confirm="
        ({ selectedValues }) => {
          const format = selectedValues.join('-');
          switch (selectType) {
            case 'start':
              startDay = format;
              break;
            case 'end':
              endDay = format;
              break;
          }
          showPopup = false;
        }
      " />
  </van-popup>
</template>

<style lang="scss" scoped>
.item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  height: 60px;
  gap: 10px;
  background-color: var(--van-background-2);

  &-input-date,
  &-day {
    color: #1989fa;
    font-weight: bold;
  }
  &-input-date {
    font-size: 18px;
  }
  &-day {
    font-size: 36px;
  }
}

.item:not(:last-child)::after {
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
</style>
