<script setup>
import { ref, onMounted, watchEffect } from "vue";
import Card from "@/components/Card.vue";
import CellDate from "@/components/CellDate.vue";
import CellDay from "@/components/CellDay.vue";
import * as D from "@/utils/date.tool.ts";

const startDate = ref(D.getTodayFormattedDate());
const endDate = ref(D.getTodayFormattedDate());
const selectType = ref(""); // start || end
const calcDate = ref({
  yearDay: "",
  monthDay: "",
  weekDay: "",
  totalDay: "",
});
const isStart = ref(false);

const showPopup = ref(false);
const currentDate = ref(D.getTodayFormattedDate().split("-"));
const minDate = ref(new Date(1950, 0, 1));
const maxDate = ref(new Date(2100, 11, 31));

watchEffect(() => {
  const yearDay = D.calculateYearDayDifference(startDate.value, endDate.value, isStart.value);
  const monthDay = D.calculateMonthDayDifference(startDate.value, endDate.value, isStart.value);
  const weekDay = D.calculateWeekDayDifference(startDate.value, endDate.value, isStart.value);
  const totalDay = D.calculateTotalDaysDifference(startDate.value, endDate.value, isStart.value);
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
      <div
        @click="
          () => {
            currentDate = endDate.split('-');
            showPopup = true;
            selectType = 'end';
          }
        ">
        <CellDate prefix="至" suffix="结束" :date="endDate" :week="D.getDayOfWeek(endDate)" />
      </div>
      <div>
        <CellDay prefix="共" :day="calcDate.totalDay" />
      </div>
      <div v-show="calcDate.yearDay"> {{ calcDate.yearDay }} </div>
      <div v-show="calcDate.monthDay"> {{ calcDate.monthDay }} </div>
      <div v-show="calcDate.weekDay"> {{ calcDate.weekDay }} </div>
      <div>
        <van-checkbox v-model="isStart">包含起始日</van-checkbox>
      </div>
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
</style>
