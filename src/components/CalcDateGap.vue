<script setup>
import { ref, onMounted, watchEffect } from "vue";
import Card from "@/components/Card.vue";
import CellDate from "@/components/CellDate.vue";
import CellDay from "@/components/CellDay.vue";
import {
  getTodayFormattedDate,
  getDayOfWeek,
  calculateYearDayDifference,
  calculateMonthDayDifference,
  calculateWeekDayDifference,
  calculateTotalDaysDifference,
} from "@/utils/date.tool.ts";

const startDate = ref(getTodayFormattedDate());
const endDate = ref(getTodayFormattedDate());
const selectType = ref(""); // start || end
const calcDate = ref({
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
  const yearDay = calculateYearDayDifference(startDate.value, endDate.value, isStart.value);
  const monthDay = calculateMonthDayDifference(startDate.value, endDate.value, isStart.value);
  const weekDay = calculateWeekDayDifference(startDate.value, endDate.value, isStart.value);
  const totalDay = calculateTotalDaysDifference(startDate.value, endDate.value, isStart.value);
  calcDate.value = {
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
          currentDate = startDate.split('-');
          showPopup = true;
          selectType = 'start';
        }
      ">
      <CellDate prefix="从" suffix="开始" :date="startDate" :week="getDayOfWeek(startDate)" />
    </div>
    <div
      class="item item-input"
      @click="
        () => {
          currentDate = endDate.split('-');
          showPopup = true;
          selectType = 'end';
        }
      ">
      <CellDate prefix="至" suffix="结束" :date="endDate" :week="getDayOfWeek(endDate)" />
    </div>
    <div class="item">
      <CellDay prefix="共" :day="calcDate.totalDay" />
    </div>
    <div v-show="calcDate.yearDay" class="item"> {{ calcDate.yearDay }} </div>
    <div v-show="calcDate.monthDay" class="item"> {{ calcDate.monthDay }} </div>
    <div v-show="calcDate.weekDay" class="item"> {{ calcDate.weekDay }} </div>
    <div class="item">
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
              startDate = format;
              break;
            case 'end':
              endDate = format;
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
  gap: 10px;
  font-size: 16px;
  height: 60px;
  background-color: var(--van-background-2);
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
