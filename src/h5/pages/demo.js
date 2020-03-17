import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from 'components/demo/demo.vue'
import data from '@/store/getdata'

Vue.use(Vuex)
Vue.use(VueRouter)

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
]

const router = new VueRouter({
  routes
})

const store = new Vuex.Store({
  modules: {
    data
  }
})

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount(root)