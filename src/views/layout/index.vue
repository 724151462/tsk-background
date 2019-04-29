<template>
  <div class="warp">
    <!-- <el-header style="padding:0">
      <headers :navs="nav"></headers>
    </el-header>-->
    <el-container style="
          background:#ffffff;
          height: calc(100% - 80px);">
      <el-aside
        width="220px"
        style="
            height:100%;
            padding-top: 60px;
            border-right:1px solid #fff;
            position: fixed"
      >
        <el-menu
          :default-active="activeIndex"
          unique-opened
          collapse-transition
          @open="handleOpen"
          :default-openeds="defaultOpens"
          ref="menu"
          router
          style="height: 100%"
        >
          <template v-for="issue in nodes">
            <!-- 筛选出父级 -->
            <template v-if="issue.name === $store.state.leftNavState">
              <template v-for="item in issue.children">
                <!-- 菜单目录层 -->
                <el-submenu v-if="!item.isLeaf" :index="String(item.menuId)" :key="item.menuId">
                  <template slot="title">
                    <i :class="item.iconCls"></i>
                    <span slot="title">{{item.name}}</span>
                  </template>
                  <template v-for="term in item.children">
                    <!-- 子菜单展示 -->
                    <el-menu-item v-if="term.showCode !== 2" :key="term.menuId" :index="term.path">
                      <i :class="term.iconCls"></i>
                      <span slot="title">{{term.name}}</span>
                    </el-menu-item>
                  </template>
                </el-submenu>
                <!-- 单个菜单显示 -->
                <el-menu-item
                  v-else-if="item.isLeaf&&item.children&&item.children.length"
                  :index="item.children[0].path"
                  :key="item.menuId"
                >
                  <i :class="item.iconCls"></i>
                  <span slot="title">{{item.children[0].name}}</span>
                </el-menu-item>
              </template>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-main style="margin-left: 220px;margin-top: 60px;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import headers from "./header.vue";
import { constantRouterMap } from "@/router/index";

export default {
  components: {
    headers
  },
  data() {
    return {
      activeIndex:  sessionStorage.getItem("activeIndex") || "",
      nodes: [],
      defaultOpens: [String(sessionStorage.getItem("defaultOpens"))] || []
    };
  },
  created() {
    //这里没有直接使用this.$router.options.routes，是因为addRoute的路由规则，在这里this.$router.options.routes获取不到
    //有兴趣的可以看一下源码，是为什么获取不到，但是却又有规则了
    //另外在开发的时候，可能由于是热部署，也会不断重复的给nodes添加元素，造成导航条有重复的，简单解决，可以设置一个开关
    // let isLoadNodes = sessionStorage.getItem('isLoadNodes')
    // if (!isLoadNodes) {
    console.log(sessionStorage.getItem("defaultOpens"))
    let data = this.$store.state.allMenu;
    this.nodes.push(...data);
    // console.log(this.nodes)
    localStorage.setItem("isLoadNodes", "true");
    // }
  },
  methods: {
    handleOpen(...params) {
      console.log(params[0])
      sessionStorage.setItem("defaultOpens", params[0]); 
    }
  },
  watch: {
    $route: function(to, from) {
      console.log(this.$route.path);
      this.activeIndex = this.$route.path;
      sessionStorage.setItem("activeIndex", this.$route.path);
      this.defaultOpens = [String(sessionStorage.getItem("defaultOpens"))];
    },
    defaultOpens: function(val) {
      // console.log(val);
      return String(sessionStorage.getItem('defaultOpens'))
    }
  }
};
</script>
<style scoped lang="stylus" type="text/stylus">
.warp {
  height: 100%;
  width: 100%;
  background: #F6F7F9;
  max-width: 1920px;
  margin: 0 auto;
}
</style>

