<template>
    <div>
      <el-row style="margin-bottom: 30px">
        <el-button round size="small" :class="{'active':isActice}" @click="courseType()">全部课程</el-button>
        <el-button round size="small" @click="courseType(30)">已发布</el-button>
        <el-button round size="small" @click="courseType(10)">未发布</el-button>
        <el-button round size="small" @click="courseType(40)">已关闭</el-button>
        <el-button type="primary" style="float: right" @click="goAddCourse">创建课程</el-button>
        <div class="list-search" style="float:right">
          <el-input v-model="listQuery.courseName" type="text" placeholder="请输入课程名称" style="width:250px;margin-left: 30px;"></el-input>
          <el-button type="primary" style="position: relative;right: 68px;border-radius: 0" @click="getList">搜索</el-button>
        </div>
      </el-row>
    </div>
</template>

<script>
var routers = []
import { coursePage, publish, copy, close, courseDel } from '../../api/course'
import MenuUtils from '@/utils/MenuUtils'
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      data: [],
      selectValue: '',
      sellTime: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      options: [],
      isDialog: false,
      isActice:true,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        courseName: '',
        courseStatus: ''
      },
      copyDialog: false, // 复制弹窗
      copyCourseObj: {}  // 复制的课程
    }
  },
  created () {
  },
  methods: {
    goGetList (e) {
    },
    courseType(type = '') {
      type ? this.isActice = false : this.isActice = true
      this.listQuery.courseStatus = type
      this.listQuery.pageIndex = 1
      coursePage(this.listQuery).then(res => {
        if (res.code === 200) {
          this.data = res.data.pageData
          this.listQuery.total = res.data.totalCount
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    upData (e) {
      this.$router.push({
        path: '/course/addCourse',
        query: {
          type: 'upData',
          courseId: e
        }
      })
    },
    courseStatus (val) {
      let vals = Number(val)
      if (vals === 10) {
        return '未发布'
      } else if (vals === 30) {
        return '已发布'
      } else if (vals === 40) {
        return '关闭'
      }
    },
    goAddCourse (e) {
      this.$router.push({
        path: '/course/addcourse',
      })
    },
    release (val) {
      publish(val).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
          this.getList()
        } else {
          this.$message({
            message: '发布失败',
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getList () {
      coursePage(this.listQuery).then(res => {
        if (res.code === 200) {
          this.data = res.data.pageData
          this.listQuery.total = res.data.totalCount
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped lang="stylus" type="text/stylus">
  .list-search
    display: inline-block
  .active
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  .course-table
    overflow hidden
    height 170px
    /*margin-bottom:10px*/
    // border-bottom:1px solid #CCCCCC

    .img
      position: relative
      width:280px
      height:160px
      // border:1px solid #CCCCCC
      display:inline-block
      vertical-align:top
      .tib
        background: #3EABA8
        padding:2px 5px
        z-index 10
        color:#ffffff;
        font-size: 16px
        position: absolute
        left: 0
        top: 0

      img
        width:100%
        height:100%
        position: absolute
        top: 50%
        transform:translateY(-50%)

    .center
      display:inline-block
      padding-left:30px
      .title
        font-size:20px
        margin-top:5px
        color: rgb(61, 61, 70)
      .list
        margin-bottom:10px
    .button
      height 100%
      float: right
      text-align:right
      vertical-align top
      display inline-block
      .top
        margin-bottom:20px
        height calc(100% - 70px)
      .list
        margin-right:20px
        color: #909399
        cursor: pointer
        &:hover
          color #3399ff
</style>
