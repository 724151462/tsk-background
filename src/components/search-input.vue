<template>
  <div class="search-input">
    <input type="text" autocomplete="off" :placeholder="placeholder" class="search-input-inner">
    <i class="el-icon-search" @click="main"></i>
  </div>
</template>

<script>
  export default {
    name: "search-input",
    props: {
      placeholder:{
        type: String,
        default: '请输入'
      },
      main: Function,
      isPublished: Boolean,
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .search-input
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    .search-input-inner
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      & :hover
        border-color: #c0c4cc;
      & :focus
        border-color: #409EFF;
        outline: 0;
</style>