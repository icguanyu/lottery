<template>
  <div id="app">
    <loading v-if="isLoading"></loading>
    <router-view/>
  </div>
</template>
<script>
import Loading from "@/components/Loading";
export default {
  name: "App",
  components: {
    Loading
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>
<style lang="scss">
@import "./assets/scss/_normalize";
@import "./assets/scss/all.scss";
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
body,
html {
  font-family: "Noto Sans TC", sans-serif;
}
</style>
