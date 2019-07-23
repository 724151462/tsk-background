<template>
  <div>
    <table-the-again
      :tableTitle="tableTitle"
      :tableOperate="tableOperate"
      :columnNameList="columnNameList"
      :tableData="tableData"
      :operateList="operateList"
      @showComponentInfo="showComponentInfo"
    ></table-the-again>
    <el-dialog :title="titleDialog.title" :visible.sync="titleDialog.statu">
      <el-form :model="topic" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="topic.topicTitle" style="width:300px" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="话题类型">
          <el-checkbox-group v-model="topic.tags" placeholder="请选择话题类型" >
            <el-checkbox v-for="(item, index) in allTags" :key="index" :label="item.tagId">{{item.tagName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="topic.publishStatus">
            <el-radio label="1">发布</el-radio>
            <el-radio label="2">草稿</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="titleDialog = false">取 消</el-button>
        <el-button type="primary" @click="ensure">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑内容" :visible.sync="editConDialog">
      <el-button type="primary">添加段落</el-button><upOss upDir="zixunImg" :btnText="'添加图片'" @ossUp="getImgUrl"></upOss>
      <div>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="p.content">
        </el-input>
        <el-button @click="pComplete" type="primary">确认编辑</el-button>
      </div>
      <!-- 内容预览 -->
      <div>
        <div v-for="(item, index) in nodes" :key="index" :style="item.type === 3 ? 'display:inline-block' : 'display:block'">
          <template v-if="item.type === 2">
            <p class="mar-v-20">
            {{item.content}}
            <el-button style="float: right" type="danger" size="small" icon="el-icon-delete" @click="del(index)" circle></el-button>
          </p>
          </template>
          <template v-else-if="item.type === 3">
            <img class="mar-r-20" width="100px" :src="item.content" alt="">
            <el-button style="float: right" type="danger" size="small" icon="el-icon-delete" @click="del(index)" circle></el-button>
          </template>
          
        </div>
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="titleDialog = false">取 消</el-button>
        <el-button type="primary" @click="ensureEDC">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTags, 
  addTopic, 
  getAllTopic,
  getTopicTitle, 
  getTopicDetail, 
  saveContent, 
  updateTopic,
  delTopic
} from '@/api/zixun';
import tableTheAgain from "../../components/table-theAgain";
import upOss from "@/components/up-oss";
export default {
  data() {
    return {
      titleDialog: {
        statu:false,
        title: ""
      },
      editConDialog: false,
      // 话题ID
      topicId: '',
      tableTitle: "创建话题",
      // 保存的标题对象
      topic: {
        publishStatus: "1",
        topicType: 10,
        tags: []
      },
      // 所有标签
      allTags: [],
      tableData: [],

      // 话题内容相关
      // 段落
      p: {
        "bold": 2,
        "color": "#666",
        "content": "",
        "fontSize": 30,
        "type": 2
      },
      // 图片
      img: {
        "content": "",
        "type": 3
      },
      // 全部内容
      nodes: [],
      tableOperate: [
        {
          content: "+添加动态",
          type: "addTrends"
        }
      ],
      operateList: [
        {
          content: "编辑标题",
          type: "editTitle"
        },
        {
          content: "编辑内容",
          type: "editContent"
        },
        {
          content: "删除",
          type: "delete"
        }
      ],
      columnNameList: [
        {
          name: "ID",
          prop: "topicId"
        },
        {
          name: "话题标题",
          //   minWidth: 100,
          prop: "topicTitle"
        },
        {
          name: "话题概述",
          prop: "description"
        },
        {
          name: "话题图片",
          prop: "topicImages",
          imgWidth: 200,
          imgList: {

          }
        }
      ]
    };
  },
  created() {
    this.getTags()
    this.getAllTopic()
  },
  methods: {
    showComponentInfo: function(type, info) {
      switch (type) {
        case "addTrends":
          this.addTrends();
          break;
        case "editTitle":
          this.editTitle(info);
          break;
        case "editContent":
          this.editContent(info);
          break;
        case "delete":
          this.delTopic(info);
          break;
      }
    },
    // 获取所有tags
    getTags() {
      getTags().then(res=>{
        this.allTags = res.data
      })
    },
    // 获取所有话题
    getAllTopic() {
      getAllTopic().then(res=>{
        res.data.pageData[0].topicImages = ["https://org.modao.cc/uploads4/images/3353/33532328/v2_pqhw22.png","https://org.modao.cc/uploads4/images/3353/33532328/v2_pqhw22.png"]
        this.tableData = res.data.pageData
      })
    },
    addTrends() {
      this.topic.topicTitle = ""
      this.topic.tags = []
      this.topic.publishStatus = "1"
      this.titleDialog.title = "添加话题"
      this.titleDialog.statu = true;
    },
    // 添加话题确认按钮
    ensure() {
      if(this.titleDialog === "添加话题"){
        addTopic(this.topic)
        .then(res=>{
          if (res.code === 200) {
            this.$message({
              message: "添加成功",
              type: "success"
            })
          }
          this.titleDialog.statu = false
        })
      }else{
        updateTopic(this.topic)
        .then(res=>{
          if (res.code === 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            })
          }
          this.titleDialog.statu = false
        })
      }
    },
    editTitle(info) {
      getTopicTitle({topicId: info.topicId})
      .then(res=> {
        res.data.topic.publishStatus = String(res.data.topic.publishStatus)
        let tagsArr = []
        res.data.tags.forEach(element => {
          tagsArr.push(element.tagId)
        });
        let data = res.data.topic
        data = Object.assign(data, {tags: tagsArr})
        console.log(data)
        this.topic = data
      })
      this.titleDialog.title = "编辑话题"
      this.titleDialog.statu = true
    },
    editContent(info) {
      console.log(info)
      this.topicId = info.topicId
      getTopicDetail({topicId: info.topicId})
      .then(res=> {
        this.nodes = res.data.nodes
      })
      this.editConDialog = true
    },
    // 删除内容
    del(index) {
      this.nodes.splice(index, 1);
    },
    // 删除话题
    delTopic(info) {
      console.log(info)
      this.$store.commit(
        'DELETECONFIRM',{
          title: '提示',
          message: '确认删除话题?', 
          fn:() => {
            console.log(info.topicId)
            delTopic(info.topicId)
            .then(response=> {
              if(response.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.getAllTopic()
              }
            })
          }
        }
        
      )
    },
    // 确认添加内容
    ensureEDC() {
      saveContent({
        nodes: this.nodes,
        topicId: this.topicId
      })
      .then(res=> {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.editConDialog = false
      })
    },
    // 段落编辑完成
    pComplete() {
      let content = Object.assign({}, this.p)
      this.nodes.push(content)
      this.p.content = ''
      console.log(this.nodes)
    },
    getImgUrl(...params) {
      console.log(params)
      this.img.content = params[0]
      let content = Object.assign({}, this.img)
      this.nodes.push(content)
      this.p.content = ''
    }
  },
  components: {
    tableTheAgain,
    upOss
  }
};
</script>

<style>
</style>
