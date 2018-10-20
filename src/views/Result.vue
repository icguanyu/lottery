<template>
  <div id="all">
    <div class="logo">
      <img src="@/assets/img/lottodemo-03.png" alt="">
    </div>
    <div class="lottery">
      <div class="ticket">
        <div class="logo">
          <img src="@/assets/img/lottodemo-03.png" alt="">
        </div>
        <div class="code">0001 1010 1100 0111 0110 1110 0011</div>
        <div class="col">
          <div class="title">★ 銷售日期 ★</div>
          <div class="info">{{date}}</div>
        </div>
        <div class="mynumber">
          <div class="number" v-for="item in userSelected" :key="item.number">{{item.number}}</div>
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
      <div class="result">
        <div class="display">
          <div class="number" v-for="(item,index) in lotto_result" :key="index">
            {{ item.num }}
          </div>
        </div>
        <div class="output">
          <div class="period">
            <p>第00000001期</p>
            <img src="@/assets/img/lottodemo-03.png" alt="">
          </div>
          <div class="output_number_box">
            <div class="output_number" v-for="lotto in resultOrder" :key="lotto">
              <span>{{lotto}}</span>
            </div>
            <div class="output_number" v-if="special_number">
              <span>{{special_number}}</span>
            </div>
          </div>
        </div>
        <div class="operation">
          <div class="order item">
            <div class="title">★ 排序方式</div>
            <div class="sort">
              <input type="radio" id="one" v-model="sort" value ="on" name="radio">
              <label for="one">由小到大</label>
              <input type="radio" id="two" v-model="sort" value ="off"
              name="radio">
              <label for="two">開獎順序</label>
            </div>
          </div>
          <div class="switch item">
            <div class="title">★ 操作</div>
            <div class="btn">
              <div class="pause">暫停</div>
              <div class="start" @click="goloto()">開獎</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let timer;
export default {
  name: "Result",
  data() {
    return {
      allLotto: [],
      random: "", // 取隨機數(0~未開選中個數)
      lotto_result: [
        {
          num: "00"
        },
        {
          num: "00"
        },
        {
          num: "00"
        },
        {
          num: "00"
        },
        {
          num: "00"
        },
        {
          num: "00"
        }
      ],
      output_result: [],
      nowIndex: 0,
      special_number: "",
      time: 0,
      sort: "off",
      intervalTimer: 500, 
      // 每次選號間隔時間 
      randomTimer: 50,
      // 每更新一次隨機號碼的速度(號碼跑的速度)
      limit_times: 20
      // 要更新幾次隨機號碼
      // 所以：每產一個數字實際花費時間為 = randomTimer * limit_times 毫秒
    };
  },
  methods: {
    goloto() {
      if (this.special_number) return;
      clearTimeout(timer);
      timer = setTimeout(this.lotto, this.randomTimer);
    },
    lotto() {
      console.log(this.time)
      if (this.time < this.limit_times) { 
        // 如果 this.time 還沒超過 randomTimer 的時間就再次呼叫 goloto()
        this.time++;
        this.random = Math.floor(Math.random() * this.unselected.length);
        this.lotto_result[this.nowIndex].num = this.unselected[this.random].number;
        //
        this.goloto();
      } else {
        this.time = 0;
        // 把選到的那顆球標記為true(選到)
        this.allLotto.find(item => {
          return item.number === this.lotto_result[this.nowIndex].num;
        }).selected = true;
        // 已選五顆就換特別號
        if (this.output_result.length < 5) {
          this.output_result.push(this.lotto_result[this.nowIndex].num);
          this.nowIndex += 1;
          // 選完後隔 intervalTimer 毫秒後再呼叫一次 lotto() 繼續選
          setTimeout(this.lotto, this.intervalTimer);
        } else {
          this.special_number = this.lotto_result[this.nowIndex].num;
        }
      }
    }
  },
  computed: {
    userSelected() {
      return this.$store.state.userNumber; // 使用者選的
    },
    date() {
      return this.$store.state.date;
    },
    // 以上為使用者號碼,資料來自vuex
    // 以下為樂透號碼,未使用vuex
    unselected() {
    // 剩下的,沒被選到的
      return this.allLotto.filter(ball => {
        return !ball.selected;
      });
    },
    resultOrder() {
      if (this.sort == "on") {
        let temp = [...this.output_result]; // PS:傳值/傳參考
        return temp.sort((a, b) => {
          return a - b;
        });
      } else {
        return this.output_result;
      }
    }
  },
  created() {
    // 避免出現沒選號碼的結果,自動導回首頁
    let selected = this.$store.state.userNumber.length;
    if (selected < 6) {
      this.$router.push("/");
    } else {
    // 先產出球 push 到 allLotto[]
      for (var i = 0; i < 49; i++) {
        this.allLotto.push({
          number: i < 9 ? "0" + (i + 1).toString() : (i + 1).toString(),
          selected: false
        });
      }
    }
  }
};
</script>