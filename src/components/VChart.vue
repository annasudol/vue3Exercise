<script setup>
import { ref } from "vue";
import { GGanttChart, GGanttRow } from "@infectoone/vue-ganttastic";
import jobsJSON from "../data/jobs.json";

const jobs = ref(null);
fetch(jobsJSON)
    .then(response => response.json())
    .then(data => jobs.value = data);
console.log(jobs, 'data')

    //  "taskId": "taskA-A",
    //             "taskName": "Print",
    //             "beginDate": "08:00",
    //             "endDate": "09:00"

const context = ref([
  [
    {
      taskId: "星期一",
      beginDate: "08:00",
      endDate: "09:00",
      ganttBarConfig: {
        id: "0",
        hasHandles: true,
        label: "需求收集和分析  负责人：小张",
        style: {
          background: "#e96560"
        }
      }
    }
  ],
  [
    {
      taskId: "星期二",
      beginDate: "09:00",
      endDate: "18:00",
      ganttBarConfig: {
        id: "1",
        hasHandles: true,
        label: "系统设计  负责人：小强",
        style: {
          background: "#5ccfa3"
        }
      }
    }
  ],
  [
    {
      taskId: "星期三",
      beginDate: "07:00",
      endDate: "20:00",
      ganttBarConfig: {
        id: "2",
        hasHandles: true,
        label: "编码实现  负责人：老李",
        style: {
          background: "#77d6fa"
        }
      }
    }
  ],
  [
    {
      taskId: "星期四",
      beginDate: "06:00",
      endDate: "21:00",
      ganttBarConfig: {
        id: "3",
        hasHandles: true,
        label: "编码实现  负责人：小明",
        style: {
          color: "#fff",
          background: "#1b2a47"
        }
      }
    }
  ],
  [
    {
      taskId: "星期五",
      beginDate: "05:00",
      endDate: "19:00",
      ganttBarConfig: {
        id: "4",
        hasHandles: true,
        label: "内部测试  负责人：小雪",
        style: {
          background: "#5ccfa3"
        }
      }
    }
  ],
  [
    {
      taskId: "星期六",
      beginDate: "10:00",
      endDate: "22:00",
      ganttBarConfig: {
        id: "5",
        hasHandles: true,
        label: "系统优化和文档整理  负责人：小欣",
        style: {
          background: "#f8bc45"
        }
      }
    }
  ],
  [
    {
      taskId: "星期天",
      beginDate: "04:00",
      endDate: "23:59",
      ganttBarConfig: {
        id: "6",
        immobile: true,
        hasHandles: true,
        label: "部署和上线  负责人：老王",
        style: {
          background: "#f3953d"
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