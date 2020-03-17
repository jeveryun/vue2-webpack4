// b.js
import Vue from 'vue'
import Vuex from 'vuex'
import App from 'components/more-entry/b'
import data from 'store/getdata'


Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    data
  }
})

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App),
  store
}).$mount(root)