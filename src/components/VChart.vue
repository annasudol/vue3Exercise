<script setup>
import { ref } from "vue";
import { GGanttChart, GGanttRow } from "@infectoone/vue-ganttastic";
import jobsJSON from "../data/jobs.json";
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};
const jobs = ref([]);
jobs.value = jobsJSON.map((data)=> {
  const background= randomHexColorCode();
  const value = data.tasks.map(v=> {
    const ganttBarConfig= {
        id: v.taskId,
        immobile: true,
        hasHandles: true,
        label: v.taskId
      };
      return {jobId: data.jobId,  background, ganttBarConfig, taskId: v.taskName, beginDate: v.beginDate, endDate: v.endDate};
  });
  return value
}).flat().reduce((acc, item) => {
  acc[item.taskId] ? acc[item.taskId].cells.push({...item}) : (acc[item.taskId] = {taskId: item.taskId, cells: [{query: item.query, ...item}]})
  return acc
}, {});

console.log(jobs, '')


 const row1BarList = ref([
    {
      myBeginDate: "2021-07-13 13:00",
      myEndDate: "2021-07-13 19:00",
      ganttBarConfig: {
        // each bar must have a nested ganttBarConfig object ...
        id: "unique-id-1", // ... and a unique "id" property
        label: "Lorem ipsum dolor"
      }
    }
  ])
  const row2BarList = ref([
    {
      myBeginDate: "2021-07-13 00:00",
      myEndDate: "2021-07-14 02:00",
      ganttBarConfig: {
        id: "another-unique-id-2",
        hasHandles: true,
        label: "Hey, look at me",
        style: {
          // arbitrary CSS styling for your bar
          background: "#e09b69",
          borderRadius: "20px",
          color: "black"
        },
        class: "foo" // you can also add CSS classes to your bars!
      }
    }
  ])

</script>
<template>
  <g-gantt-chart
    v-for="job in jobs"
    v-bind:key="job.taskId"
    chart-start="08:00"
    chart-end="12:00"
    precision="hour"
    bar-start="myBeginDate"
    bar-end="myEndDate"
  >
    <!-- <g-gantt-row label="My row 1" :bars="[...row1BarList, ...row2BarList]" /> -->
    <!-- <g-gantt-row label="My row 1" :bars="row2BarList" /> -->
  </g-gantt-chart>
</template>
