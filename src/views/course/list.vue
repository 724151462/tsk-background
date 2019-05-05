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

      <el-row>
        <el-card class="box-card" style="margin-bottom: 10px" v-for="list in data" :key="list.id" shadow="hover">
          <div class="course-table">
            <div class="img">
              <span class="tib">{{courseStatus(list.courseStatus)}}</span>
              <img :src="list.courseCover" height="">
            </div>
            <div class="center">
              <div class="title" style="margin-bottom:10px;font-weight:bold">{{list.courseName }}</div>
              <div class="list">学生数：{{list.userCount}}人</div>
              <div class="list">课程时间：{{list.beginTime}} ~ {{list.endTime}}</div>
              <div class="list">所属学校：{{list.tenantName}}</div>
              <div class="list">开放范围：{{Number(list.courseMode) === 10 ? '教师指定学员' : Number(list.courseMode) === 20 ? '本校学生' : Number(list.courseMode) === 30 ? '全部学员' : '' }}</div>
            </div>
            <div class="button">
              <div class="top">
                <a class="list" @click="upData(list.courseId)" v-if="list.courseStatus !== 40">编辑</a>
                <a class="list" @click="copyCourse(list)" >复制</a>
                <a class="list" @click="closeCourse(list.courseId)" v-if="list.courseStatus === 30">关闭</a>
                <a class="list" v-else-if="list.courseStatus === 10" @click="release(list.courseId)">发布</a>
                <a class="list" @click="deleteCourse(list.courseId)" v-if="list.courseStatus === 40 || list.courseStatus === 10">删除</a>
              </div>
              <el-button type="success" @click="goCourseModel(list.courseId)" v-if="list.courseStatus === 30">课堂模式</el-button>
              <el-button type="primary" @click="goCourseChapter(list)">教学管理</el-button>
            </div>
          </div>

        </el-card>
        <div style="text-align:right;" v-show="data.length!=0">
          <el-pagination
              background
              layout="prev, pager, next"
              @current-change="goGetList"
              :total="listQuery.total">
          </el-pagination>
        </div>
      </el-row>

      <!--弹出框-->

      <el-dialog title="售卖" :visible.sync="isDialog">
        <el-row>
          <div>
            <span>*</span>
            <span>开课时间：</span>
            <el-date-picker
                v-model="sellTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                change="yesTimeSell"
            >
            </el-date-picker>
          </div>
          <div>
            <span>*</span>
            <span>选择学校：</span>
<!--
            <el-select v-model="value" placeholder="请选择学校">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
-->
          </div>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isDialog = false">取 消</el-button>
          <el-button type="primary" @click="isDialog = false">保 存</el-button>
        </div>
      </el-dialog>
      <el-dialog title="复制课程" :visible.sync="copyDialog">
        <el-input placeholder="输入课程名" v-model="copyCourseObj.courseName"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="copyDialog = false">取 消</el-button>
            <el-button type="primary" @click="ensureCopy">确 定</el-button>
          </span>
      </el-dialog>
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
    this.getList()
  },
  methods: {
    goGetList (e) {
      this.listQuery.pageIndex = e
      this.getList()
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
    deleteCourse(courseId) {
      courseDel([courseId])
      .then(response=> {
        if(response.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        }
      })
    },
    copyCourse (course) {
      let data = Object.assign({}, course)
      this.copyCourseObj = data
      this.copyCourseObj.courseName = this.copyCourseObj.courseName + '(复制)'
      this.copyDialog = true
      
    },
    ensureCopy() {
      console.log(this.copyCourseObj)
      let data = {
        courseName: this.copyCourseObj.courseName,
        courseId: this.copyCourseObj.courseId
      }
      copy(data)
        .then(response=> {
          if(response.code === 200) {
            this.$message({
              message: '复制成功',
              type: 'success'
            })
            this.getList()
            this.copyDialog = false
          }
      })
    },
    closeCourse(id) {
      this.$store.commit(
        'DELETECONFIRM',{
          title: '提示',
          message: '确认关闭课程?', 
          fn:() => {
            close(id)
            .then(response=> {
              if(response.code === 200) {
                this.$message({
                  message: '关闭成功',
                  type: 'success'
                })
                this.getList()
              }
            })
          }
        }
        
      )
      
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
    yesTimeSell (e) {
      console.log('确定了', e)
    },
    sell () {
      this.isDialog = true
    },
    goCourseModel(e) {
      this.$router.push({
        path: '/course/classmodel',
        query: {id: e}
      })
    },
    goCourseChapter(e) {
      sessionStorage.setItem('courseName', e.courseName)
      console.log(e)
      if(e.courseStatus === 40) {
        this.$confirm('该课程已关闭，如添加内容可能造成学生成绩变动', '提示', {
          confirmButtonText: '确认进入',
          cancelButtonText: '再看看',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            path: '/course/list/chapter',
            query: {id: e.courseId}
          })
        })
      }else{
        this.$router.push({
          path: '/course/list/chapter',
          query: {id: e.courseId}
        })
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
