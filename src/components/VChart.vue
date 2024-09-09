<script setup>
import { ref } from "vue";
import { GGanttChart, GGanttRow } from "@infectoone/vue-ganttastic";
import randomRgba from "@/helper/randomRgba"
import jobsJSON from "../data/jobs.json";
const startDate = ref(null);
const endDate = ref(null);

const jobs = ref([]);
jobs.value = jobsJSON.map((data)=> {
  const background= randomRgba();
  const value = data.tasks.map(v=> {
    const ganttBarConfig= {
        id: v.taskId,
        immobile: true,
        hasHandles: true,
        label: v.taskId,
        style: {
          background
        }
      };
      startDate.value = parseInt(startDate.value) < parseInt(v.beginDate) ? startDate.value : v.beginDate;
      endDate.value = parseInt(endDate.value) > parseInt(v.endDate) ? endDate.value : v.endDate;
      return {jobId: data.jobId,  background, ganttBarConfig, taskId: v.taskName, beginDate: v.beginDate, endDate: v.endDate};
  });
  return value
}).flat().reduce((acc, item) => {
  acc[item.taskId] ? acc[item.taskId].cells.push({...item}) : (acc[item.taskId] = {taskId: item.taskId, cells: [{query: item.query, ...item}]})
  return acc
}, {});

const values= Object.values(jobs.value);

</script>

<template>
  <g-gantt-chart
    :chart-start="startDate"
    :chart-end="endDate"
    precision="hour"
    date-format="HH:mm"
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
    /> 
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

