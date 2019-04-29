<template>
    <div>
        <el-tree :data="sourceData" :node-key="nodeKey" :default-checked-keys="dataActNode" :accordion="isAccordion" :ref="treeName" @check="test" show-checkbox :props="props">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <img
                :width="15"
                v-if="sourceData.catalogId"
                style="margin-right: 3px"
                :src="require('@/assets/images/folder.png')"
                alt
                >
                <span>{{ node.label }}</span>
            </span>
        </el-tree>
    </div>
    
    
</template>

<script>
export default {
    data() {
        return{
            dataActNode: []
        }
    },
    props: ['sourceData', 'props', 'treeName','isAccordion', 'activeNode','nodeKey'],
    mounted() {
        console.log(this.sourceData,this.activeNode)
    },
    methods: {
        test(...params) {
            let checkedList = params[1].checkedNodes.filter(element=> {
                console.log(element)
                return element.catalogId === undefined
            })
            this.$emit('checkedList', checkedList)
        },
        clear() {
            this.$refs.tree3.setCheckedNodes([])
        }
    },
    watch: {
        activeNode(val) {
            this.dataActNode = val
            console.log(this.dataActNode)
        }
    }
}
</script>

<style>

</style>
