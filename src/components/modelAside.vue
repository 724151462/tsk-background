/**
<modelAside 
@dialogShow="dialogShow" 
:sourceList="testList" 
:textObj="textObj"
:dataKey="dataKey"
@activeEvent="activeTest"
@beginInteract="beginInteract"></modelAside> 

data:
textObj: {
        addBtn: "添加头脑风暴",
        interactItemBtn: "开始活动"
      },
      dataKey: {
          itemId: 'examId',
          itemTitle: 'examTitle' 
      },

event:
activeTest
dialogShow
beginEvent
*/

<template>
    <el-aside class="side" style="width:280px; border: 1px solid #F2F6FC; position: fixed;height:85%">
        <div style="margin: 20px 50px">
          <el-button type="primary" style="width: 150px;font-size: 1.2em" @click="addEvent">{{textObj.addBtn}}</el-button>
          <p style="margin-top: 5px">点击题目查看详细情况</p>
        </div>
        <div
          :class="['test-container',item[dataKey.itemId]===activeIndex?'test-active':'']"
          v-for="(item, index) in sourceList"
          @click="activeEvent(item)"
          :key="index"
        >
          <p
            style="width: 200px; display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden; font-size: 1.2em"
          >{{item[dataKey.itemTitle]}}</p>
          <el-button
            v-if="item.interactionStatus === 10"
            type="primary"
            @click.stop="beginInteract(item)"
          >{{textObj.interactItemBtn}}</el-button>
          <el-button v-else-if="item.interactionStatus === 20" :disabled="true">进行中...</el-button>
          <el-button v-else :disabled="true" style="background: rgb(158,167,180);color: #fff">已结束</el-button>
        </div>
      </el-aside>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: "",
            parentStatus: this.status
        }
    },
    methods: {
        addEvent() {
            this.$emit('dialogShow', true)
        },
        activeEvent(item) {
            // if(item.interactionStatus === 10) {
                this.$emit('activeEvent', item)
            // }
            this.activeIndex = item[this.dataKey.itemId]
        },
        beginInteract(item) {
            this.activeIndex = item[this.dataKey.itemId]
            this.$emit('beginEvent', item)
        }
    },
    props: ['sourceList','textObj','dataKey','status'],
    computed: {
        interactionStatus() {
    　　　　return this.status.interactionStatus
    　　}
    },
    watch: {
        interactionStatus(newVal) {
            this.sourceList.forEach(element => {
                if(element[this.dataKey.itemId] === this.status[this.dataKey.itemId]) {
                    element.interactionStatus = newVal
                }
            });
        }
    }
        
}
</script>

<style lang="stylus" scoped>
.test-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 3px solid rgb(158, 167, 180);
  border-radius: 10px;
  width: 80%;
  height: 100px;
  padding: 15px;
  margin: 10px auto;
}

.side::-webkit-scrollbar {display:none}

.test-active {
  border-color: rgb(63, 159, 255);
}
</style>

