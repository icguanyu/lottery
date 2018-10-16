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
        <div v-for="item in number" :key="item.number" class="number" :class="{'selected': item.select }" @click="select(item)">{{item.number}}</div>
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
      number: [],
      date: ""
    };
  },
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
      return this.number.filter(item => {
        return item.select;
      });
    }
  },
  created() {
    const vm = this;
    axios.get("data.json").then(function(response) {
      vm.number = response.data;
    });
  }
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
  .card {
    position: relative;
    animation: fadeIn 1s ease-in-out;
    width: 480px;
    padding: 20px;
    margin: 20px auto;
    box-sizing: border-box;
    border-radius: 5px;
    background: $primary;
    overflow: hidden;
    .shadow {
      position: absolute;
      background: $second;
      width: 660px;
      height: 800px;
      bottom: -50%;
      left: 30%;
      transform: rotate(45deg);
    }
    .title {
      width: 80%;
      margin: 0 auto;
      border-bottom: 2px solid #fff;
      img {
        width: 100%;
      }
    }
    .numbers {
      position: relative;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin-top: 20px;
      .number {
        position: relative;
        cursor: pointer;
        font-size: 24px;
        background: #fff;
        margin: 5px;
        border-radius: 3px;
        padding: 12px;
        transition: all 0.2s;
        &:hover {
          background: $third;
        }
      }
    }
    .selected {
      &:after {
        content: "";
        position: absolute;
        background: url('../assets/img/draw.png');
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        opacity: 0.8;
      }
    }
    .mynumber {
      position: relative;
      background: #fff;
      padding: 15px 10px;
      margin: 5px;
      box-sizing: border-box;
      border-radius: 5px;
      p {
        display: inline-block;
        margin: 0 5px;
        font-weight: bold;
        letter-spacing: 1px;
        background: $second;
        border-radius: 50%;
        padding: 5px;
      }
    }
    .btn {
      position: relative;
      display: flex;
      * {
        cursor: pointer;
        flex: 1;
        text-align: center;
        padding: 8px 0;
        margin: 5px;
        border-radius: 3px;
        background: #fff;
        color: $third;
        transition: all 0.3s;
        &:hover {
          color: #fff;
          background: #ff6046;
        }
      }
    }
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
</style>
