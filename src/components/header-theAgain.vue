<template>
  <div class="header">
    <div class="header-text">{{ headerTitle }}</div>
    <div class="button-ground"><slot></slot></div>
  </div>
</template>
<script>
export default {
  props:['headerTitle'],
  data(){
    return {}
  }
}
</script>
<style scoped lang="stylus" type="text/stylus">
  .header
    display flex
    align-items center
    border-bottom: 1px solid #c0c4cc;
    padding-bottom 20px
    margin-bottom 20px
    .header-text
      font-size 18px
      font-weight 600
      color: #303133
    .button-ground
      flex 1
      text-align right
</style>
