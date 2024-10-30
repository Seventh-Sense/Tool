import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import svgIcon from './icons/svgIcon.vue'


createApp(App).component('svg-icon', svgIcon).mount('#app')
