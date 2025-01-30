export function getTodayFormattedDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = padZero(today.getMonth() + 1);
  const day = padZero(today.getDate());
  return `${year}-${month}-${day}`;
}

export function getDayOfWeek(dateString: string): string {
  const daysOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const date = new Date(dateString);
  const dayOfWeekIndex = date.getDay();
  return daysOfWeek[dayOfWeekIndex];
}

export function calculateYearDayDifference(startDate: string, endDate: string, isStart: boolean = false) {
  let start = new Date(startDate);
  let end = new Date(endDate);

  if (end < start) {
    [start, end] = [end, start];
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (isStart) {
    days += 1;
  }

  return { years, months, days };
}

export function calculateMonthDayDifference(startDate: string, endDate: string, isStart: boolean = false) {
  let start = new Date(startDate);
  let end = new Date(endDate);

  if (end < start) {
    [start, end] = [end, start];
  }

  let months = end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (isStart) {
    days += 1;
  }

  return { months, days };
}

export function calculateWeekDayDifference(startDate: string, endDate: string, isStart: boolean = false) {
  let start = new Date(startDate);
  let end = new Date(endDate);

  if (end < start) {
    [start, end] = [end, start];
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const millisecondsPerWeek = 7 * millisecondsPerDay;

  const totalMilliseconds = end.getTime() - start.getTime();
  const totalDays = Math.floor(totalMilliseconds / millisecondsPerDay);

  const weeks = Math.floor(totalDays / 7);
  let days = totalDays % 7;

  if (isStart) {
    days += 1;
  }

  return { weeks, days };
}

export function calculateTotalDaysDifference(startDate: string, endDate: string, isStart: boolean = false) {
  let start = new Date(startDate);
  let end = new Date(endDate);

  if (end < start) {
    [start, end] = [end, start];
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const totalMilliseconds = end.getTime() - start.getTime();
  let totalDays = Math.floor(totalMilliseconds / millisecondsPerDay);

  if (isStart) {
    totalDays += 1;
  }

  return totalDays;
}

// utils/date.tool.js

export function calculateDate(dateString: string, days: number, type: string = "after") {
  // 将输入的日期字符串转换为 Date 对象
  const date = new Date(dateString);

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  // 根据类型调整日期
  if (type === "before") {
    date.setDate(date.getDate() - days);
  } else if (type === "after") {
    date.setDate(date.getDate() + days);
  } else {
    throw new Error("Invalid type. Use 'before' or 'after'");
  }

  // 返回格式化后的日期字符串
  return date.toISOString().split("T")[0];
}

export function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}
