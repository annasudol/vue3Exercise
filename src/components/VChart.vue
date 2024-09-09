<script setup>
import { ref } from "vue";
import { GGanttChart, GGanttRow } from "@infectoone/vue-ganttastic";
import jobsJSON from "../data/jobs.json";
import randomRgba from "@/helpers/randomRgba";
import dateFormat from "@/helpers/dateFormat";

const jobs = ref([]);
const startDate = ref(null);
const endDate = ref(null);
jobs.value = jobsJSON.map((data)=> {
  const background= randomRgba();
  const value = data.tasks.map(v=> {
    const ganttBarConfig= {
        id: v.taskId,
        immobile: true,
        hasHandles: true,
        label: v.taskId,
        style: {
          background,
          color: 'black'
        }
      };
      // const d_begin= new Date(v.beginDate);
     startDate.value = new Date(startDate.value) < new Date(v.beginDate) ? startDate.value : v.beginDate;
    //  endDate.value = new Date(endDate.value) > new Date(v.endDate) ? endDate.value : v.endDate;
      if(startDate.value) {
          startDate.value = new Date(startDate.value) < new Date(v.beginDate) ? startDate.value : v.beginDate;
      } else {
        startDate.value = v.beginDate
      }
  
      // endDate.value = new Date(endDate.value) > d_end ? endDate.value : v.endDate;
      return {jobId: data.jobId,  background, ganttBarConfig, taskId: v.taskName, beginDate: v.beginDate, endDate: v.endDate};
  });
  return value
});

//group job by the same taskId like: print, laminate, trim
const values= Object.values(jobs.value.flat().reduce((acc, item) => {
  acc[item.taskId] ? acc[item.taskId].cells.push({...item}) : (acc[item.taskId] = {taskId: item.taskId, cells: [{...item}]})
  return acc
}, {}));
// const startDateFormat = dateFormat(startDate.value, 2);
// const endDateFormat = dateFormat(endDate.value);
</script>

<template>
  <g-gantt-chart
    :chart-start="startDate"
    :chart-end="endDate"
    precision="hour"
    date-format="DD/MM/YYY, HH:MM:SS"
    bar-start="beginDate"
    bar-end="endDate"
    grid
    color-scheme="black"
  >
    <template #upper-timeunit>
      <h1>
      app
      </h1>
    </template>
    <g-gantt-row
      v-for="item in values"
      :key="item.taskId"
      :label="item.taskId"
      immobile=true
      hasHandles=true
      highlight-on-hover
      :bars="[...item.cells]" />
  </g-gantt-chart>
</template>




<!-- <template>
  <g-gantt-chart
    v-for="job in jobs"
    v-bind:key="job.taskId"
    chart-start="08:00"
    chart-end="12:00"
    precision="hour"
    bar-start="myBeginDate"
    bar-end="myEndDate"
  > -->
    <!-- <g-gantt-row label="My row 1" :bars="[...row1BarList, ...row2BarList]" /> -->
    <!-- <g-gantt-row label="My row 1" :bars="row2BarList" /> -->

