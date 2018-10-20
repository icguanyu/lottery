<template>
  
  <div id="all">
    <div class="logo">
      <img src="@/assets/img/lottodemo-03.png" alt="">
    </div>
    <div class="card">
      <div class="shadow"></div>
      <div class="title">
        <img src="@/assets/img/lottodemo-04.png" alt="">
      </div>
      <div class="numbers">
        <div v-for="item in numbers" :key="item.number" class="number" :class="{'selected': item.select }" @click="select(item)">{{item.number}}</div>
      </div>
      <div class="mynumber">
        您的號碼：<p v-for="item in selected" :key="item.number">{{item.number}}</p>
      </div>
      <div class="btn">
        <div class="reset" @click="reset()">全部重選</div>
        <div class="done"  @click="go()">開獎去</div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      date: ""
    };
  },
  methods: {
    select(item) {
      this.$store.dispatch('userSelect' ,item)
    },
    go() {
      this.$store.dispatch('go')
    },
    reset() {
      this.$store.dispatch('reset')
    }
  },
  computed: {
    numbers(){
      return this.$store.state.numbers
    },
    selected() {
      return this.$store.state.userNumber
    }
  },
  created() {
    this.$store.dispatch('getData')
  }
};
</script>