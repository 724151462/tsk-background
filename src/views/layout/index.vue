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
                    <span slot="title">{{item}}</span>
                  </template>
                  
                  <template v-for="term in item.children">
                    <!-- 子菜单展示 -->
                    <el-menu-item :key="term.menuId" :index="term.path">
                      <i :class="term.iconCls"></i>
                      <span slot="title">{{term.name}}</span>
                    </el-menu-item>
                  </template>
                </el-submenu>
                <!-- 单个菜单显示 -->
                <el-menu-item
                  v-else
                  :index="item.path"
                  :key="item.menuId"
                >
                  <i :class="item.iconCls"></i>
                  <span slot="title">{{item.name}}</span>
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
      nodes: this.$router.options.routes,
      defaultOpens: [String(sessionStorage.getItem("defaultOpens"))] || []
    };
  },
  created() {
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

