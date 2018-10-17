import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(vuex)
Vue.use(router)

export default new vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    numbers: [],
    selected: [],
    date: ''
  },
  actions: {
    getData (context) {
      context.commit('LOADING', true)
      axios.get('data.json').then(function (response) {
        context.commit('NUMBERS', response.data)
        context.commit('LOADING', false)
      })
    },
    select (context, item) {
      context.commit('SELECTED', item)
    },
    reset (context) {
      context.commit('SELECTED', '')
    },
    go (context) {
      if (this.state.selected.length < 6) {
        alert('還沒選滿六個號碼')
        return
      }
      let now = new Date()
      let date = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      context.commit('DATE', date)
      console.log(this)
      router.push('/Result')
    }
  },
  mutations: {
    LOADING (state, payload) {
      state.isLoading = payload
    },
    NUMBERS (state, payload) {
      state.selected.forEach(select => {
        let selected = payload.find(number => {
          return number.number === select.number
        })
        selected.select = true
      })
      state.numbers = payload
    },
    SELECTED (state, item) {
      if (item && state.selected.length < 6) {
        item.select = !item.select
      } else if (item === '') {
        state.numbers.forEach((item) => {
          item.select = false
          state.selected = ''
        })
      } else if (item.select) {
        item.select = false
      } else {
        alert('超過囉')
      }
      state.selected = state.numbers.filter((number) => {
        return number.select
      })
    },
    DATE (state, payload) {
      state.date = payload
    }
  }
})
