<template>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
      <template v-for="(list, tableIndex) in tables">
        <template v-if="list.popover">
          <template v-if="list.popover===true">
            <el-table-column
              :key="tableIndex"
              :prop="list.prop"
              :label="list.name"
              :width="list.width">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>{{list.popoverTitle}}: {{scope.row.popover}}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{scope.row[list.prop]}}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </template>
        </template>
        <template v-else>
          <el-table-column
            :key="tableIndex"
            :prop="list.prop"
            :label="list.name"
            :width="list.width">
          </el-table-column>
        </template>
      </template>
      
      <el-table-column
          fixed="right"
          label="操作"
          fit="true"
          v-if="buttonStylus && buttonStylus.length > 0"
          :width="buttonStylus.length * 100"
          align="center">
        <template slot-scope="scope">
          <!-- <el-button v-for="(item, buttonIndex) in buttonStylus" v-if="item.show(scope.row)" :key="buttonIndex" type="text" size="small" @click="returnData(scope.row,item.type, scope.$index)">{{ item.name }}</el-button> -->
          <template v-for="(item, buttonIndex) in buttonStylus"  v-if="item.show">
            <el-button v-if="item.show(scope.row)" :key="buttonIndex" type="text" size="small" @click="returnData(scope.row,item.type, scope.$index)">{{ item.name }}</el-button>
          </template>
          <template v-else>
            <el-button type="text" size="small" @click="returnData(scope.row,item.type, scope.$index)">{{ item.name }}</el-button>
          </template>
          <!--
            buttonStylus：{
              name：'xx'，
              type：‘操作类型’
            }
          -->
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
  export default {
    props:["tables","tableData","buttonStylus"],
    methods:{
      returnData(e,type){
        // let data = {
        //   date:e,
        //   sys:type
        // }
        // console.log(data)
        this.$emit('showComponentInfo',type,e)
      },
      handleSelectionChange(data) {
        let type = 'selected'
        this.$emit('showComponentInfo', type, data)
      }
    },
    mounted() {
      // console.log(this.tables)
    }
  }
</script>

<style scoped>

</style>
