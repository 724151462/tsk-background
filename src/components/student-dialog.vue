<template>
    <!-- <el-dialog
        title="添加学生"
        :visible.sync="show"
        width="50%"
        >
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="学号">
                <el-input v-model="form.studentNo"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.realName"></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="院名称">
                <el-select v-model="collegeId" placeholder="院名称">
                    <el-option value="-1" label="全部"></el-option>
                    <el-option value="-2" label="无院"></el-option>
                    <el-option 
                        v-for="item in collegeList" 
                        :key="item.collegeId" 
                        :label="item.collegeName"
                        :value="item.collegeId"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="系名称">
                <el-select v-model="departmentId" placeholder="系名称">
                    <el-option value="-1" label="全部"></el-option>
                    <el-option value="-2" label="无系"></el-option>
                    <el-option 
                        v-for="item in departmentList" 
                        :key="item.departmentId" 
                        :label="item.departmentName"
                        :value="item.departmentId"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="专业">
                <el-select v-model="specialityId" placeholder="专业">
                    <el-option value="-1" label="全部"></el-option>
                    <el-option 
                        v-for="item in specialityList" 
                        :key="item.specialityId" 
                        :label="item.specialityName"
                        :value="item.specialityId"></el-option>
                    </el-select>
                </el-select>
            </el-form-item>
            <el-form-item label="班级">
                <el-select v-model="classId" placeholder="班级">
                    <el-option value="-1" label="请添加班级"></el-option>
                    <el-option 
                        v-for="item in classList" 
                        :key="item.classId" 
                        :label="item.className"
                        :value="item.classId"></el-option>
                    </el-select>
            </el-form-item>
        <el-form-item>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addNewStudent">立即创建</el-button>
            <el-button>取消</el-button>
        </span>
    </el-dialog> -->
    <el-dialog
  :title="formData.title"
  :visible.sync="dialogShow"
  @close="$emit('update:show', false)"
  :show="show"
  width="30%"
  :before-close="modalClose">
  <el-form ref="form" :model="formData" label-width="80px">
            <el-form-item label="学号">
                <el-input v-model="formData.studentNo"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="formData.realName"></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="formData.mobile"></el-input>
            </el-form-item>
            <el-form-item label="院名称">
                <el-select v-model="collegeId" placeholder="院名称">
                    <el-option value="-1" label="全部"></el-option>
                    <el-option value="-2" label="无院"></el-option>
                    <el-option 
                        v-for="item in listData.collegeList" 
                        :key="item.collegeId" 
                        :label="item.collegeName"
                        :value="item.collegeId"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="系名称">
                <el-select v-model="departmentId" placeholder="系名称">
                    <el-option value="-1" label="全部"></el-option>
                    <el-option value="-2" label="无系"></el-option>
                    <el-option 
                        v-for="item in listData.departmentList" 
                        :key="item.departmentId" 
                        :label="item.departmentName"
                        :value="item.departmentId"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="专业">
                <el-select v-model="specialityId" placeholder="专业">
                    <el-option value="-1" label="全部"></el-option>
                    <el-option 
                        v-for="item in listData.specialityList" 
                        :key="item.specialityId" 
                        :label="item.specialityName"
                        :value="item.specialityId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="班级">
                <el-select v-model="classId" placeholder="班级">
                    <el-option value="-1" label="请添加班级"></el-option>
                    <el-option 
                        v-for="item in listData.classList" 
                        :key="item.classId" 
                        :label="item.className"
                        :value="item.classId"></el-option>
                    </el-select>
            </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit('a',formData)">立即创建</el-button>
        <el-button>取消</el-button>
    </span>
</el-dialog>
</template>
<script>
export default {
    props: ['formData','listData', 'dialogShow','classId','collegeId','specialityId','departmentId', 'type'],
    mounted(){
        console.log(this.show)
    },
    data(){
        return {
            visible: this.show
        };

    },
    methods: {
        submit(eventType,info){
            this.$emit('dialogEventListen','edit',info)
        },
        modalClose(){
            this.modalShow = false;
        },
    },
    watch:{
        collegeId: function(val){
            console.log(val)
            if(val == -1 || val == -2){
                this.listData.departmentList = this.listData.departmentRows
            }else{
                this.listData.departmentList = this.listData.departmentRows.filter(function (x) { return x.collegeId == val });
            }
            this.listData.departmentId = this.listData.departmentList.length>0 ? this.listData.departmentList[0].departmentId : "";
        },
        departmentId: function(val){
            if(val == -1 || val == -2){
                this.listData.specialityList = this.listData.specialityRows
            }else{
                this.listData.specialityList = this.listData.specialityRows.filter(function (x) { return x.departmentId == val });
            }
            this.listData.specialityId = this.listData.specialityList.length>0 ? this.listData.specialityList[0].specialityName : "";
        },
        specialityId: function(val){
            if(val == -1){
                this.listData.classList = this.listData.classRows
            }else{
                this.listData.classList = this.listData.classRows.filter(function (x) { return x.specialityId == val });
            }
            this.listData.classId = this.listData.classList.length>0 ? this.listData.classList[0].classId : "";
        },
        modalShow : function (val) {
            this.$emit('update:modalShow', val);
        }
    }
}
</script>
