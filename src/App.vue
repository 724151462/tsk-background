<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
  }
</script>
<style lang="stylus" type="text/stylus">
  @import "assets/css/reset.styl"
    #app
      width: 100%
      height:100%
      .course-tab-container .el-collapse-item__header
        border-bottom:none;
      .course-tab-container .el-collapse
        border: none;
      .interact .el-collapse-item__header
        background-color rgb(237,241,244)
      .interact .el-collapse-item__content
        padding-bottom: 0;
      .interact .el-tooltip__popper
        cursor pointer
    .header
      .el-badge__content
        border 0
    /*试题管理*/
    .test .cell,.resource .cell ,.activity .cell
      text-align center
    .test .cell span div,.resource .cell span div, .activity .cell span div
      overflow: hidden!important;
      white-space: nowrap!important;
      text-overflow: ellipsis!important;
    .test,.resource,.activity
      .el-tree-node__content
        height 50px!important
        border-bottom 1px solid #e3e8ee
        &:hover .hide-button
          opacity 1
    .teacher-dialog
      & .el-dialog__body
        min-height 300px;
    .model-resource
      .el-breadcrumb__inner
        font-size: 1.2em;
        cursor pointer!important
        user-select none
        &:hover
          color: #409EFF!important
    .model-checked
      .header
        .nav-search
          .el-input__inner
            height 32px
            line-height 32px
    .has-text-input
      input 
        padding-right 50px
    .my-select
      padding-left 0!important
      width 80%
      div
        padding-left 0
        padding 0
        span
          i
            color #909399!important
        input 
          padding-left 0
          padding-right 17px!important
          border 0
          border-radius 0
          border-bottom 1px solid #dcdfe6
          &::-webkit-input-placeholder{
            color:#909399;
          }
          &::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#909399;
          }
          &:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#909399;
          }
          &:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#909399;
          }
    .el-table .warning-row {
      background: oldlace !important;
    }

  .el-table .success-row {
    background: #f0f9eb !important;
  }
  .modelStrome .el-textarea__inner
    min-height 200px !important
  .modelVote .el-textarea__inner
    min-height 200px !important
    
  /*加载动画*/
  .tq_loading-wrapper {
    position: fixed;
    z-index: 99999;
    width: 91px;
    min-height: 91px;
    text-align: center;
    border-radius: 5px;
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .tq_loading__loading-wrapper {
    position: absolute;
    top: 17%;
    left: 17%;
  }
  .tq_loading__text {
    font-size: 14px;
    letter-spacing: 2px;
    color: white;
    position: absolute;
    bottom: -16px;
    text-align: center;
    width: 100%;
  }
  .tq_loading__mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #000;
    opacity: .6;
    z-index: 6000;
  }
    .el-table .success-row {
      background: #f0f9eb !important;
    }
    .modelStrome .el-textarea__inner
      min-height 200px !important
    .modelVote .el-textarea__inner
      min-height 200px !important
</style>

