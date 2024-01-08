import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import $ from 'jquery'
import axios from 'axios'
import VueAxios from "vue-axios"

// import ThreeDmol from '../public/3Dmol.js'
// const ThreeDmol = require('3dmol/build/3dmol.min.js');

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).mount('#app')
app.use($)
// app.config.globalProperties.$http = axios
app.use(VueAxios,axios)



