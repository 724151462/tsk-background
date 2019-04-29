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
            tableOperate:[{content:'批量删除',}]
            columnNameList:[
                {
                  type:'selection'   //多选框
                }
                {
                    name:'工号',
                    prop:'id'，
                    slot: true, //表头自定义，name="prop"
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
    <div class="tableOperate">
      <el-button
        v-for="(item,index) in tableOperate"
        :key="index"
        type="text"
        style="font-size:16px;margin-right:10px"
        @click="onSubmit(item.type,multipleSelection)"
      >{{ item.content }}</el-button>
    </div>
    <el-table
      ref="multipleTable"
      border
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <template v-for="(list,index) in columnNameList">
        <template v-if="list.formatter">
          <el-table-column
            :min-width="list.minWidth"
            :width="list.width"
            :label="list.name"
            align="center"
            :key="index"
          >
            <template scope="scope">
              <div>{{ list.formatter(scope.row[list.prop],scope.row) }}</div>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="list.imgList">
          <el-table-column :width="list.width" :label="list.name" align="center" :key="index">
            <template scope="scope">
              <img  :width="list.imgWidth" :src="scope.row[list.prop]" :key="index">
            </template>
          </el-table-column>
        </template>
        <template v-else-if="list.slot">
          <el-table-column
            :min-width="list.minWidth"
            :prop="list.prop"
            :width="list.width"
            align="center"
            :formatter="formatter"
            :key="index"
          >
            <template slot="header" slot-scope="scope">
              <template v-if="list.select">
                <slot :name="list.prop"></slot>
                <i
                  style="vertical-align: super;"
                  class="el-icon-search select-icon blue-icon"
                  @click="()=>{list.select= !list.select}"
                ></i>
              </template>
              <div v-else>
                {{list.name}}
                <i
                  style="vertical-align: text-bottom;;margin-left:10px"
                  class="el-icon-search select-icon"
                  @click="()=>{list.select= !list.select}"
                ></i>
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
            :min-width="list.minWidth"
            align="center"
            :key="index"
            :formatter="formatter"
          ></el-table-column>
        </template>
      </template>
      <el-table-column
        width="80px"
        fixed="right"
        label="是否启用"
        fit="true"
        align="center"
        v-if="switchColumn == 'open'"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="2"
            active-color="#13ce66"
            inactive-color="#dcdfe6"
            @change="onSubmit('switch',scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        v-if="operateList"
        fixed="right"
        label="操作"
        :width="operateList.length * 80"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item,index) in operateList"
            @click="onSubmit(item.type,scope.row)"
            :key="index"
            type="text"
          >{{ item.content }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: [
    "tableTitle",
    "tableOperate",
    "columnNameList",
    "tableData",
    "operateList",
    "switchColumn",
    "slotData"
  ],
  data() {
    return {
      multipleSelection: []
      //value2: true
    };
  },
  methods: {
    formatter(row, column) {
      //对没有数据的行进行填充
      if (!row[column.property]) {
        if (row[column.property] == "0") {
          return row[column.property];
        }
        return "-";
      }
      return row[column.property];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    onSubmit(type, info) {
      console.log("子组件类型：", type, "\n子组件信息:", info);
      this.$emit("showComponentInfo", type, info);
    }
  },
  created: function() {
    //console.log('是否开启',this.switchColumn,'类型',typeof(this.switchColumn ) )
    //console.log('fff', this.tableData)
  }
};
</script>
<style scoped lang="stylus" type="text/stylus">
.table-theAgain {
  position: relative;

  .tableOperate, a {
    display: inline-block;
    margin-right: 5px;
  }

  .select-icon {
    font-size: 20px;
    cursor: pointer;
    text-align: right;
  }
  .blue-icon{
    color: #409EFF;
  }
}
</style>
