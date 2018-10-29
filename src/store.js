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
    numbers: [], // 所有號碼
    userNumber: [], // 使用者選的
    date: '',
    fb_user: ''
  },
  actions: {
    getData (context) {
      context.commit('LOADING', true)
      axios.get('data.json').then(function (response) {
        context.commit('NUMBERS', response.data)
        context.commit('LOADING', false)
      })
    },
    userSelect (context, item) {
      context.commit('USERNUMBER', item)
    },
    reset (context) {
      context.commit('USERNUMBER', '')
    },
    go (context) {
      if (this.state.userNumber.length < 6) {
        alert('必須選滿 6 個號碼。')
        return
      }
      let now = new Date()
      let date = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      context.commit('DATE', date)
      router.push('/Result')
    },
    getUser (context, response) {
      context.commit('USERDATA',response)
    }
  },
  mutations: {
    LOADING (state, payload) {
      state.isLoading = payload
    },
    NUMBERS (state, payload) {
      // state.userNumber.forEach(select => {
      //   let selected = payload.find(number => {
      //     return number.number === select.number
      //   })
      //   selected.select = true
      // })
      state.numbers = payload
    },
    USERNUMBER (state, item) {
      if (item && state.userNumber.length < 6) {
        item.select = !item.select
      } else if (item === '') {
        state.numbers.forEach((item) => {
          item.select = false
          state.userNumber = ''
        })
      } else if (item.select) {
        item.select = false
      } else {
        alert('不能超過 6 個號碼！')
      }
      state.userNumber = state.numbers.filter((number) => {
        return number.select
      })
    },
    DATE (state, payload) {
      state.date = payload
    },
    USERDATA (state, payload) {
      if(payload) {
        state.fb_user = {
          'id' : payload.id,
          'email' : payload.email,
          'name' : payload.name,
          'picurl' : payload.picture.data.url
        }
      }else{
        state.fb_user = ''
      }
    }
  }
})
