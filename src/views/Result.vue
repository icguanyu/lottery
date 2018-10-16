<template>
  <div id="all">
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
    select(item) {
      if (this.selected.length < 6) {
        item.select = !item.select;
      } else {
        alert("最多只能選擇6個號碼");
      }
    },
    go() {
      let now = new Date();
      this.date = `${now.getFullYear()}/${now.getMonth() +
        1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      this.$router.push('/Result')
    },
    reset() {
      this.number.forEach(item => {
        item.select = false;
      });
    }
  },
  computed: {
    selected() {
      return this.$store.state.selected
    },
    date() {
      return this.$store.state.date
    }
  },
};
</script>

<style scoped lang="scss" scoped>
$primary: #ffd985;
$second: #ffcf57;
$third: #ffb600;
$orange: #f76b40;
$green: #60bfac;

body,
html {
  display: flex;
  height: 100vh;
  justify-content: center;
  font-family: 微軟正黑體;
  //overflow: hidden;
}
#all {
  margin-top: 60px;
  .logo {
    width: 480px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .lottery{
    display: flex;
    width: 1080px;
    padding: 10px;
    .ticket{
      background: #fff;
      position: relative;
      flex:1;
      border: .5px solid #ddd;
      padding: 20px;
      .logo{
        width: 100%;
      }
      .code{
        text-align: center;
        margin-bottom: 20px;
        font-size: 18px;
      }
      .col{
        display: flex;
        justify-content: space-around;
        align-items: center;
        
      }
      .title{
        background: $orange;
        color: #fff;
        text-align: center;
        padding: 3px 30px;
        border-radius: 5px;
      }
      .row{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 5px 0;
        .info{
          font-size: 20px;
          padding: 15px 0;
        }
        .green{
          background: $green;
        }
      }
      .mynumber{
        background: $primary;
        margin: 15px 0;
        display: flex;
        height: 90px;
        justify-content: space-around;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;
        .number{
          background: #fff;
          border-radius: 3px;
          padding: 10px 8px;
          font-size: 18px;
          margin: 0 5px;
          font-size: 26px;
          font-weight: bold;
        }
      }
      .unicode{
        padding: 30px 0;
        background: url(../assets/img/lottodemo-06.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
      &:after{
        content: '';
        position: absolute;
        width: 100%;
        height: 50px;
        bottom: -25px;
        left: 0;
        background: url(../assets/img/lottodemo-07.png);
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
    .result{
      flex:2
    }
  }
}
</style>

