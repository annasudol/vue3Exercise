import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ganttastic from '@infectoone/vue-ganttastic'

const app = createApp(App)

app.use(ganttastic)
app.mount('#app')
