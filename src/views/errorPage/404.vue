<template>
    <div class="error">
      <div class="box">
        <div class="left">
          <div class="logo">
            <router-link to="/course/list">
              <img :src="require('@/assets/images/logo.png')" alt="">
            </router-link>
          </div>
          <div>
            <p style="margin-bottom: 20px"><b >404</b></p>
            <p>这个网页被老师没收了!!!
              <router-link to="/login" style="color: #777;margin-left: 10px;">返回首页</router-link>
            </p>
          </div>
        </div>
        <div class="right">
          <img :src="require('@/assets/images/404.png')" style="" alt="">
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "",
    data(){
      return {
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  //#6fb2ff——#095fff
  .error
    width 100%
    height 100%
    position relative
    .box
      margin 0 auto
      width 600px;
      min-height 300px;
      overflow hidden
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .left
        width 50%
        float left
        .logo
          width 100px
          height 100px
          img
            /*cursor: pointer*/
            height 60px
      .right
        width 40%
        float right
        img
          width: 250px;
          height: 250px;
</style>