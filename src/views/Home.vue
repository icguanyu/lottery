<template>
  
  <div id="all">
    <div class="logo">
      <img src="@/assets/img/lottodemo-03.png" alt="">
    </div>
    <div class="login_box">
      <div class="hello" v-if="userData.name">
        你好 {{ userData.name }} , 祝您中獎！
        <div class="btn logout" @click="logout()">登出</div>
      </div>
      <div class="login" v-else>
        <div class="btn signin" @click="login()">使用臉書登入</div>
      </div>
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
      if(userData){
        this.$store.dispatch("userSelect", item);
      }else{
        this.checkLoginState();
      }
    },
    go() {
      this.$store.dispatch("go");
    },
    reset() {
      this.$store.dispatch("reset");
    },
    checkLoginState() {
      const vm = this
      FB.getLoginStatus(function(response) {
        if (response.status === "connected") {
          //如果狀態為登入,就不用登入嘛
          console.log("你已經登入囉");
        } else {
          vm.login();
        }
      });
    },
    login() {
      const vm = this
      FB.login(
        function(response) {
          console.log(response);
          if (response.status === "connected") {
            FB.api(
              "/me",
              {
                fields: "id,name,email,picture"
              },
              function(response) {
                vm.$store.dispatch('getUser',response)
                console.log(response);
              }
            );
          }
        },
        {
          scope: "email",
          auth_type: "rerequest"
        }
      );
    },
    logout() {
      const vm = this
      FB.logout(function (response) {
        console.log(response)
        vm.$store.dispatch('getUser')
        vm.reset()
      });
    }
  },
  computed: {
    numbers() {
      return this.$store.state.numbers;
    },
    selected() {
      return this.$store.state.userNumber;
    },
    userData() {
      return this.$store.state.fb_user;
    }
  },
  created() {
    this.$store.dispatch("getData");
  },
  mounted() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: "488858244949249",
        cookie: true,
        xfbml: true,
        version: "v3.1"
      });
      FB.AppEvents.logPageView();
    };
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/zh_TW/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }
};
</script>