<template>

<!-- 
show: false,
dialogConfig: {
    btnShow: true,
    title: '查看笔记',
    width: '40',
    labelWidth: '120',
    top: '20',
    inputWidth: '70',
    eventType: ''
}, 
dataObj: {
    notesTitle: '笔记123',
    fbr: '小明',
    fbsj: '2018-11-29',
    noteContent: 'werwrq'
}, 
formData: [
          {
            key: '笔记标题：',
            inputType: 'string',
            value: 'notesTitle'
          },
          {
            key: '发布人：',
            inputType: 'string',
            value: 'fbr'
          },
          {
            key: '发布日期：',
            inputType: 'string',
            value: 'fbsj'
          },
          {
            key: '笔记内容：',
            inputType: 'string',
            value: 'notesContent'
          },
          {
            key:'笔记图片',
            inputType:'img',
            value:'imgSrc',
            imgWidth: 50
          },
        ]


<adialog :dialogConfig="dialogConfig"
      :dataObj="dataObj"
      :formData="formData"
      @showComponentInfo="showComponentInfo"
      :show.sync="show">
      </adialog>
-->
    <el-dialog
    :title="dialogConfig.title"
    :visible.sync="visible"
    :dataObj="dataObj"
    :top="dialogTop"
    :width="dialogConfig.width+'%'"
    @close="$emit('update:show', false)"
    >
        <slot name="header"></slot>
        <el-form ref="form" :model="form" :label-width="labelWidth">
            <el-form-item v-for="(item, index) in formData" :key="index" :label="item.key">
                <template v-if="item.inputType==='string'">
                    <el-input v-model="dataObj[item.value]" style="width: 200px"></el-input>
                    <span v-if="item.remark" style="margin-left: 10px">{{item.remark}}</span>
                </template>
                <el-input type="textarea" v-else-if="item.inputType==='textarea'" v-model="dataObj[item.value]"></el-input>
                <template v-else-if="item.inputType==='img'">
                    <img v-for="(img, i) in dataObj[item.value]" :key="i" :src="img.src" :width="item.imgWidth" style="margin-right: 15px"/>
                </template>
                <template v-else-if="item.inputType==='info'">
                    <span>{{dataObj[item.value]}}<br></span>
                </template>
                <template v-else-if="item.inputType==='tip'" v-for="(tip,i) in dataObj[item.value]">
                    <div :key="i">
                        <p>评分点：{{tip.markPoint}}</p>
                        <span>分值：{{tip.markScore}}</span>
                    </div>
                </template>
                <el-radio-group v-else-if="item.inputType==='radio'" v-model="dataObj[item.value]">
                    <el-radio v-for="(val, i) in item.option" :key="i" :label="val"></el-radio>
                </el-radio-group>
                <el-select v-else-if="item.inputType==='select'" :label="item.key" v-model="dataObj[item.value]">
                    <el-option v-for="(val, i) in item.option" :key="i" :label="val.label" :value="val.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" v-if="dialogConfig.btnShow===true">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit(dataObj)">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data () {
        return {
            visible: this.show,
            labelWidth: this.dialogConfig.labelWidth + 'px',
            dialogTop: this.dialogConfig.top + 'vh',
            form: {
            }
        };
    },
    props: ['show', 'formData', 'dialogConfig', 'dataObj'],
    created(){
        console.log(this.dialogConfig.btnShow)

    },
    methods: {
        onSubmit(info) {
            this.visible = false
            console.log( '子组件类型：' , this.dialogConfig.eventType , '\n子组件信息:' , info );
            this.$emit('showComponentInfo',this.dialogConfig.eventType,info);
        }
    },
    watch: {
        show () {
            this.visible = this.show;
        }
    }
}
</script>

<style>
</style>