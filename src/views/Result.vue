<template>
  <div id="all">
    <div class="logo">
      <img src="@/assets/img/lottodemo-03.png" alt="">
    </div>
    <div class="lottery">
      <div class="ticket">
        <div class="logo">
          <img src="@/assets/img/lottodemo-03.png" alt="">
          <div class="code">0001 1010 1100 0111 0110 1110 0011</div>
        </div>
        <div class="col">
          <div class="title">★ 銷售日期 ★</div>
          <div class="info">{{date}}</div>
        </div>
        <div class="mynumber">
          <div class="number" v-for="item in selected" :key="item.number">{{item.number}}</div>
        </div>
        <div class="col">
          <div class="row">
            <div class="title">★ 開獎日期 ★</div>
            <div class="info">請點擊右方開獎</div>
          </div>
          <div class="row">
            <div class="title">★ 總金額 ★</div>
            <div class="info">NT$50.00</div>
          </div>
        </div>
        <div class="col">
          <div class="row">
            <div class="title green">★ 經銷商 ★</div>
            <div class="info">00000110</div>
          </div>
          <div class="row">
            <div class="title green">★ 投注機 ★</div>
            <div class="info">00000101</div>
          </div>
        </div>
        <div class="unicode"></div>
      </div>
      <div class="result"></div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Result",
  methods: {
  },
  computed: {
    selected() {
      return this.$store.state.selected
    },
    date() {
      return this.$store.state.date
    }
  },
  created(){
    //避免出現沒選號碼的結果,自動導回首頁
    let selected = this.$store.state.selected.length
    if( selected < 6) {
      this.$router.push('/')
    }
    
  }
};
</script>