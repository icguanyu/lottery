<template>
  <div class="loading">
    <img src="@/assets/img/loading.gif" alt="">
  </div>
</template>

<script>
export default {
  name: "loading",
};
</script>

<style scoped lang="scss" scoped>
.loading{
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: #fff;
  opacity: .8;
  z-index: 10;
  img{
    width: 200px;
  }
}
</style>
