<template>
    <!--
        这个组件是对ele的el-table进行的二次封装。

        说明：
        操作按钮事件  对一条记录进行操作，不管什么操作,都返回该行数据给父组件
                      对表格进行操作，不管什么操作，都返回选中的行信息给父组件

        需要传入的参数：
            表的名称：tableTitle
            对表的操作：tableOperate
            列名数组：columnNameList
            渲染数据：tableData
            自定义的操作按钮列表：operateList

        数据结构：
            tableTitle:string,
            tableOperate:[
                {
                    content:'批量删除',
                    type:'check'
                }
            ]
            columnNameList:[
                {
                    name:'工号',
                    prop:'id'
                }
            ],
            ableData3: [
                    {
                        id:'20180900', //属性名称跟columnNameList中的prop一一对应
                    }
            ],
            operateList:[
                    {
                        content:'查看',
                        type:'check'
                    }
                ],
    -->
    <div class="table-theAgain">
        <div class="tableOperate" v-if="tableOperate">
            <el-button v-for="item in tableOperate" type="primary" class="" @click="onSubmit(item.type,multipleSelection)" >{{ item.content }}</el-button>
        </div>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 95%;margin-left:2.5%;position: relative"
                @selection-change="handleSelectionChange">

            <el-table-column :label="tableTitle" class="addButton" >
              <template v-for="(list,index) in columnNameList">
                <template v-if="list.formatter">
                  <el-table-column :label="list.name"
                                   align="center"
                                    :key="index">
                    <template scope="scope">
                      <div>
                        {{ list.formatter(scope.row[list.prop],scope.row) }}
                      </div>
                    </template>
                  </el-table-column>
                </template>
                <template v-else-if="list.imgList">
                  <el-table-column :label="list.name"
                                   align="center"
                                   :key="index">
                    <template scope="scope">
                      <div>
                        <img v-for="(item, index) in scope.row[list.prop]" :src="item.imgUrl" :key="index"/>
                      </div>
                    </template>
                  </el-table-column>
                </template>
                <template v-else-if="list.progress">
                  <el-table-column :label="list.name"
                                   align="center"
                                   :key="index">
                    <template scope="scope">
                      <div>
                        <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row[list.prop]" status="success"></el-progress>
                      </div>
                    </template>
                  </el-table-column>
                </template>
                <template v-else>

                  <el-table-column
                                   :prop="list.prop"
                                   :label="list.name"
                                   :width="list.width"
                                   :type="list.type"
                                   align="center"
                                   :key="index"
                                    v-if="list.other">
                                   <template slot-scope="scope">
                                        <p>{{ scope.row.status }}</p>
                                        <div slot="reference" class="name-wrapper">
                                            <el-button @click="onSubmit(list.other.type,scope.row)" size="small">{{list.other.name}}</el-button>
                                        </div>
                                    </template>
                  </el-table-column>
                  <el-table-column
                                   :prop="list.prop"
                                   :label="list.name"
                                   :width="list.width"
                                   :type="list.type"
                                   align="center"
                                   :key="index"
                                    v-else>
                  </el-table-column>
                </template>
              </template>
                <el-table-column
                        v-if="operateList"
                        fixed="right"
                        label="操作"
                        :width="operateList.length * 100"
                        align="center">
                    <template slot-scope="scope">

                         <el-button  v-for="item in operateList"  @click="onSubmit(item.type,scope.row)"
                                   v-if="item.type === 'edit'"
                                   size="small">{{ item.content }}</el-button>
                        <el-button v-for="item in operateList" @click="onSubmit(item.type,scope.row)"
                                   v-if="item.type === 'delete'"
                                   type="danger"
                                   size="small">{{ item.content }}</el-button>
                        <el-button v-for="item in operateList" @click="onSubmit(item.type,scope.row)"
                                   v-if="item.type !== 'delete' && item.type !== 'edit'"
                                   type="primary"
                                   size="small">{{ item.content }}</el-button>


                        <!-- <el-button v-for="item in operateList" @click="onSubmit(item.type,scope.row)" type="text" size="small">{{ item.content }}</el-button> -->
                    </template>
                </el-table-column>

                <el-table-column
                    fixed="right"
                    label="是否启用"
                    fit="true"
                    align="center"
                    v-if="switchColumn == 'open'">
                  <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.status"
                        active-value=1
                        inactive-value=2
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="onSubmit('switch',scope.row)">
                    </el-switch>
                  </template>
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default{
        props:[ 'tableTitle','tableOperate','columnNameList','tableData','operateList','switchColumn' ],
        data(){
            return {
                multipleSelection: [],
              //value2: true
            }
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log( this.multipleSelection )
            },
            onSubmit( type,info ) {
                console.log( '子组件类型：' , type , '\n子组件信息:' , info );
                this.$emit('showComponentInfo',type,info);
            }
        },
      created:function(){
          //console.log('是否开启',this.switchColumn,'类型',typeof(this.switchColumn ) )
          // console.log('fff', this.tableData)
      }

    }

</script>
<style scoped lang="stylus" type="text/stylus">
    .table-theAgain
        position relative

        .tableOperate
            box-sizing:border-box
            padding-left: 10px
            padding-right: 10px
            position:absolute;
            top:4px
            right:7.5%;
            display:inline-block
            z-index:1

        a
            display:inline-block
            margin-right:5px

    img
      width :35px
      height :35px
      background-size:100% 100%

</style>
