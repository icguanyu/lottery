import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
Vue.use(vuex)

export default new vuex.Store({
  strict: true,
  state: {
    numbers: [],
    selected: [],
    date: ''
  },
  actions: {
    getData (context) {
      axios.get('data.json').then(function (response) {
        context.commit('NUMBERS', response.data)
      })
    },
    select (context, item) {
      if (this.state.selected.length < 6) {
        context.commit('SELECTED', item)
      } else {
        alert('最多只能選擇6個號碼')
      }
    },
    reset (context) {
      context.commit('SELECTED', '')
    },
    go (context) {
      let now = new Date()
      let date = `
        ${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      context.commit('DATE', date)
    }
  },
  mutations: {
    NUMBERS (state, payload) {
      state.numbers = payload
    },
    SELECTED (state, item) {
      if (item) {
        let target = state.numbers.find((number) => {
          return number.number === item.number
        })
        target.select = !target.select
        state.selected = state.numbers.filter((number) => {
          return number.select
        })
      } else {
        state.numbers.forEach((item) => {
          item.select = false
          state.selected = ''
        })
      }
    },
    DATE (state, payload) {
      state.date = payload
    }
  }
})
