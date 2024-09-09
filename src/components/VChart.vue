<script setup>
import { ref } from "vue";
import { GGanttChart, GGanttRow } from "@infectoone/vue-ganttastic";
import jobsJSON from "../data/jobs.json";

const jobs = ref([]);
jobs.value = jobsJSON.map(data=> {
  return {
    jobId: data.jobId,
    tasks: data.tasks.map(item=> {
      return {
      taskId: item.taskName,
      beginDate: item.beginDate,
      endDate: item.endDate,
      ganttBarConfig: {
        id: item.taskId,
        immobile: true,
        hasHandles: true,
        label: item.taskId,
        style: {
              background: "#77d6fa"
        }
      }
  }})
}}
);

console.log(jobs, '')
const context = ref([
  [
    {
      taskId: "Print",
      beginDate: "08:00",
      endDate: "09:00",
      ganttBarConfig: {
        id: "0",
        hasHandles: true,
        label: "A1-1",
        style: {
          background: "#e96560"
        }
      }
    }
  ],
  [
    {
      taskId: "Laminate",
      beginDate: "09:00",
      endDate: "10:00",
      ganttBarConfig: {
        id: "1",
        hasHandles: true,
        label: "A1-2",
        style: {
          background: "#e96560"
        }
      }
    }
  ],
  [
    {
      taskId: "Trim",
      beginDate: "10:00",
      endDate: "12:00",
      ganttBarConfig: {
        id: "2",
        hasHandles: true,
        label: "A1-3",
        style: {
          background: "#e96560"
        }
      }
    }
  ]
]);

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
    chart-start="2021-07-12 12:00"
    chart-end="2021-07-14 12:00"
    precision="hour"
    bar-start="myBeginDate"
    bar-end="myEndDate"
  >
    <g-gantt-row label="My row 1" :bars="[...row1BarList, ...row2BarList]" />
    <!-- <g-gantt-row label="My row 1" :bars="row2BarList" /> -->
  </g-gantt-chart>
</template>
