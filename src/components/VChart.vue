<script setup>
import { ref } from 'vue'
import { GGanttChart, GGanttRow } from '@infectoone/vue-ganttastic'
import randomRgba from '@/helper/randomRgba'
import jobsJSON from '../data/jobs.json'
const startDate = ref(null)
const endDate = ref(null)

const jobs = ref([])
jobs.value = jobsJSON
  .map((data) => {
    const background = randomRgba()
    const value = data.tasks.map((v) => {
      const ganttBarConfig = {
        id: v.taskId,
        immobile: true,
        hasHandles: true,
        label: v.taskId,
        style: {
          background
        }
      }
      startDate.value =
        parseInt(startDate.value) < parseInt(v.beginDate) ? startDate.value : v.beginDate
      endDate.value = parseInt(endDate.value) > parseInt(v.endDate) ? endDate.value : v.endDate
      return {
        jobId: data.jobId,
        background,
        ganttBarConfig,
        taskId: v.taskName,
        beginDate: v.beginDate,
        endDate: v.endDate
      }
    })
    return value
  })
  .flat()
  .reduce((acc, item) => {
    acc[item.taskId]
      ? acc[item.taskId].cells.push({ ...item })
      : (acc[item.taskId] = { taskId: item.taskId, cells: [{ query: item.query, ...item }] })
    return acc
  }, {})

const values = Object.values(jobs.value)
console.log(
  values.map((v) => v.taskId),
  'values'
)
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
    color-scheme="vue"
  >
    <g-gantt-row
      v-for="item in values"
      :key="item.taskId"
      :label="item.taskId"
      immobile="true"
      hasHandles="true"
      highlight-on-hover
      :bars="[...item.cells]"
    />
    />
  </g-gantt-chart>
</template>