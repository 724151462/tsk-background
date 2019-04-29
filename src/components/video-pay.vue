<template>
  <div class="container">
    <div class="player">
      <video-player  class="video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
                     @ended="onPlayerEnded($event)"
      >
      </video-player>
    </div>
    <div class="test-wrap" v-if="testDialog === true">
        <div class="test-container" v-if="subjectInfo.quizId">
          <div class="quiz-title"> &nbsp;视频内测验 <span class="intoCourse"> 仅作练习 , 不计入课程成绩</span> </div>
          <div class="quiz-main">
            <span>{{typeTranslate(subjectInfo.quizType)}}</span>
            <span>{{subjectInfo.quizTitle}}</span>
            <div class="quiz-options" v-if="subjectInfo.quizType === 10">
              <p v-for="(item, i) in subjectInfo.quizOption" :key="item.optionId">
                {{`${options[i]} : ${item.optionTitle}`}}
              </p>
            </div>
            <div class="quiz-options" v-else>
              <p v-for="(item, i) in subjectInfo.quizOption" :key="item.optionId">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox :label="item.optionId">{{`${options[i]} : ${item.optionTitle}`}}</el-checkbox>
                </el-checkbox-group>
              </p>
            </div>
          </div>
          <div class="quiz-footer">
            <span v-if="answerRes === false" style="color: red">回答错误，正确答案：{{answerStr}}</span>
            <span v-else-if="answerRes === true" style="color: green">回答正确</span>
            <span class="quiz-submit" @click="submit(subjectInfo)">提交</span>
            <span class="quiz-submit" v-if="answerRes !== ''" @click="goOnLook">继续观看</span>
          </div>
        </div>
        <!-- <div class="test-container no-content" v-else>
          <div class="quiz-main" style="text-align: center;line-height: 200px">
            <span>您所选的时间点还未添加题目</span>
          </div>
        </div> -->
    </div>
  </div>
</template>

<script>
  import { videoPlayer } from 'vue-video-player'
  export default {
    props:{
      isMp4:{
        default:''
      },
      cover:{
        default:'poster.jpg'
      },
      state:{
        default:false
      },
      timePoint:{
        default: 0
      },
      subjectInfo: {
        default: function () {
            return {}
        }
      }
    },
    data(){
      return{
        videoStatus: this.state,
        point: this.timePoint,
        playerOptions: {
          playbackRates: [0.5, 1.0, 1.2, 1.5, 1.8, 2.0],
          autoplay: false,
          muted: false,
          loop: false,
          preload: 'auto',
          language: 'zh-CN',
          aspectRatio: '16:9',
          fluid: true,
          sources: [{
            type: "video/mp4",
            src: this.isMp4 //你的m3u8地址（必填）
          }],
          poster: this.cover,
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
        },
        testDialog: false,
        options: ['A','B','C','D','E','F','G','H','I','J'],
        checkList: [],
        answerRes: '',
        answerStr: '',
        timer: '',
        shortTimePoint: false // 防止时间点过早重复触发暂停事件
      }
    },
    mounted() {
      console.log(this.isMp4)
    },
    components: {
      videoPlayer
    },
    methods: {
      submit(subjectInfo) {
        if(subjectInfo.quizType === 10) {
          
        }else{
          // 筛选正确答案
          let correctAns = subjectInfo.quizOption.filter(res=> res.correctFlag === 1)
          // 答案个数不对return
          if(this.checkList.length !== correctAns.length) {
            this.answerRes = false
            this.answerStr = ''
            correctAns.forEach(ele => {
              this.answerStr += ele.optionTitle + ','
            })
            this.answerStr = this.answerStr.substring(0,this.answerStr.length-1)
            return
          }
          // 判断答题是否正确
          this.checkList.forEach(res => {
            correctAns.forEach(ele => {
              if(res !== ele.optionId) {
                this.answerRes = false
                return
              }
              this.answerRes = true
            })
          })
          // 循环获取正确答案
          if (!this.answerRes) {
            this.answerStr = ''
            correctAns.forEach(ele => {
              this.answerStr += ele.optionTitle + ','
            })
            this.answerStr = this.answerStr.substring(0,this.answerStr.length-1)
          }
          this.checkList = []
        }
      },
      goOnLook() {
        clearTimeout(this.timer)
        this.testDialog = false
        this.shortTimePoint = true
        this.$refs.videoPlayer.player.play()
      },
      getParentUrl(url) {
        this.playerOptions.sources[0].src = url
      },
      onPlayerPlay(player) {
        console.log(this.timePoint)
        if(this.shortTimePoint === false && this.timePoint) {
          // 当前时间店判断
        // if(this.timePoint < 4) {
        //   player.currentTime(this.timePoint)
        // }else{
        //   player.currentTime(this.timePoint-3)
        // }
        // if(player.currentTime() === this.timePoint) {
        //   this.timer = setTimeout(() => {
        //     this.$refs.videoPlayer.player.pause()
        //     this.testDialog = true
        //   },0)
        // }
        console.log(this.timePoint)
        player.currentTime(0)
        // 没有回答过
        if(this.answerRes === '') {
          console.log(this.timePoint)
          if(this.timePoint === 0) {
            this.$refs.videoPlayer.player.pause()
            this.testDialog = true
          }else if(this.timePoint > 0 && this.timePoint < 4){
            this.timer = setTimeout(() => {
              this.$refs.videoPlayer.player.pause()
              this.testDialog = true
            }, (this.timePoint + 1) * 1000);
          }else{
            player.currentTime(this.timePoint - 3)
            this.timer = setTimeout(() => {
              this.$refs.videoPlayer.player.pause()
              this.testDialog = true
            }, 4000);
          }
        }
        }
        
      },
      onPlayerPause(player){
        // alert("pause");
        console.log(this.$refs.videoPlayer.player)
        console.log(this.point)
      },
      onPlayerEnded(player) {
        console.log(player)
      },
      typeTranslate(val) {
        console.log(val)
        switch (val) {
          case 10:
            return '单选'
            break;
          case 20:
            return '多选'
            break;
          default:
            return '主观题'
            break;
        }
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      },
    },
    watch: {
      isMp4: function (val) {
        // const myPlayer = this.$refs.videoPlayer.player
        if (val !== '') {
          this.$refs.videoPlayer.player.src(val)
        }
      },
      timePoint(val) {
        console.log(val)
        if(val === 'reset') {
          this.testDialog = false
        }
        this.shortTimePoint = false
        this.answerRes = ''
        this.$refs.videoPlayer.player.src(this.isMp4)
        this.testDialog = false
        console.log(this.$refs.videoPlayer.player)
      },
      state: function (val) {
        console.log(val)
        // this.myResult = val
        if (val) {
          this.$refs.videoPlayer.player.pause()
          this.$emit('resetStatus', false)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .container
    background-color: #efefef
    min-height: 80%
    width: inherit;
    height: inherit;
  .test-wrap
    position: absolute;
    left: 20px;
    top: 83px;
    width: inherit;
    height: inherit;
    background: rgba(0,0,0,0.5);
  .test-container
    background: #fff;
    height: 94%;
    width: 98%;
    margin: 0 auto;
    position: relative;
    top: 38px;
  .quiz-title
    height: 15px;
    padding: 10px 40px 15px;
    background: #f8f9fb;
    border-bottom: 1px solid #e1e7eb;
  .quiz-main
    overflow: auto;
    height: 240px;
    padding: 10px;
  .intoCourse
    font-size: 12px
  .quiz-footer
    height: 50px;
    width: 100%;
    background: #f8f9fb;
    .quiz-submit
      background: #FFF;
      border: 1px solid #17A1E6;
      border-radius: 5px;
      color: #17A1E6;
      cursor: pointer;
      text-align: center;
      vertical-align: middle;
      width: 90px;
      height: 30px;
      line-height: 30px;
      margin: 5px 15px;
      float right 
  .quiz-options
    margin-top 5px
    margin-left 10px
</style>
