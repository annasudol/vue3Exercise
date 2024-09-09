<script setup>
import { ref } from "vue";
import { GGanttChart, GGanttRow } from "@infectoone/vue-ganttastic";
import jobsJSON from "../data/jobs.json";

const jobs = ref(null);


jobs.value = jobsJSON.map(data=> data.tasks.map(item=> {
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
}}))
console.log(jobs, 'jobs');

const context = ref([
  [
    {
      taskId: "Print",
      beginDate: "08:00",
      endDate: "09:00",
      ganttBarConfig: {
        id: "0",
        hasHandles: true,
        label: "T1",
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
      endDate: "18:00",
      ganttBarConfig: {
        id: "1",
        hasHandles: true,
        label: "t2",
        style: {
          background: "#5ccfa3"
        }
      }
    }
  ],
  [
    {
      taskId: "Trim",
      beginDate: "07:00",
      endDate: "20:00",
      ganttBarConfig: {
        id: "2",
        hasHandles: true,
        label: "A2",
        style: {
          background: "#77d6fa"
        }
      }
    }
  ]
]);

function gettaskIdRange() {
  const today = new Date();
  const dayOftaskId = today.getDay();

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayOftaskId + 1);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const currenttaskIdStart = formatDate(startDate);
  const currenttaskIdEnd = formatDate(endDate);

  return {
    currenttaskIdStart,
    currenttaskIdEnd
  };
}

const taskIdRangeInChina = gettaskIdRange();
</script>

<template>
  <g-gantt-chart
    chart-start="00:00"
    chart-end="23:59"
    precision="hour"
    date-format="HH:mm"
    bar-start="beginDate"
    bar-end="endDate"
    grid
  >
    <template #upper-timeunit>
      <h1>
        {{
          `${taskIdRangeInChina.currenttaskIdStart} / ${taskIdRangeInChina.currenttaskIdEnd}`
        }}
      </h1>
    </template>
    <g-gantt-row
      v-for="(item) in context"
      :key="item.id"
      :bars="item"
      :label="item[0].taskId"
      immobile="true"
      hasHandles="true"
      highlight-on-hover
    />
  </g-gantt-chart>
</template>