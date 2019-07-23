<template>
  <div>
    <div v-show="showLoading">
      <div class="tq_loading__mask"></div>
      <div class="tq_loading-wrapper">
        <div class="tq_loading__loading-wrapper">
          <square :background="'#409eff'"></square>
        </div>
        <div class="tq_loading__text">{{$store.state.loadingText}}</div>
      </div>
    </div>
    <div class="header">
      <div style="display: flex;flex: 1;justify-content: space-between; margin: 0 auto;">
        <router-link to="/course" class="login" style="text-align:center;">
          <!-- <img :src="require('@/assets/images/header_logo.png')" height="40px"> -->
          <span style="font-size: 30px">大国微农</span>
          <span style="margin-left: 10px">后台管理</span>
        </router-link>
        <!-- <el-menu
          :default-active="defaultActiveIndex"
          background-color="#263238"
          style="font-size:16px;flex:1;border-bottom:0"
          text-color="#fff"
          active-text-color="#fff"
          mode="horizontal"
          :router="true"
        >
          <el-menu-item :index="item.path" v-for="item in nav" :key="item.id">{{item.name}}</el-menu-item>
        </el-menu> -->
        <el-dropdown class="avator" trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <el-badge
              style="border:0"
              :value="$store.state.msgNum"
              class="item"
              v-if="$store.state.msgNum > 0"
            >
              <img
                :src="this.$store.state.userAvatar"
                alt
                style="width: 35px;height: 35px;border-radius: 50%"
              >
            </el-badge>
            <el-badge v-else>
              <img
                :src="this.$store.state.userAvatar"
                alt
                style="width: 35px;height: 35px;border-radius: 50%"
              >
            </el-badge>
            <span style="margin-left:10px">{{this.realName}}</span>
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/user/index">个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <router-link to="/user/message">消息管理</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="doLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// import { menuList, logout, reToken } from "@/api/login";
import { constantRouterMap } from "@/router/index";
import { removeToken, getUserId, removeUserInfo } from "@/utils/auth";
// import { getUserInfo, getMeInfo, userInit } from "../../api/user";
import { unReadyMsg } from "@/api/course";
import { getErrorMsg } from "../../utils/utils";
import MenuUtils from "@/utils/MenuUtils";
import Cookie from "js-cookie";
import { mapGetters } from "vuex";
import Square from "@/components/cubeShadow.vue";

export default {
  props: ["navs"],
  data() {
    return {
      defaultActiveIndex: "/course",
      nav: this.$router.options.routes,
      realName: "",
      userAvatar: require("../../assets/images/user.png"),
      menuList: constantRouterMap,
      nameInit: "",
      msgNumber: 1,
      nameDialog: false
    };
  },
  created() {
    console.log(this.nav);
    // this.$store.state.allMenu.filter(item => {
    //   if (item.level === 1) {
    //     return item;
    //   }
    // });
    // this.nav.push(...this.$store.state.allMenu);
    // // console.log(this.nodes)
    // sessionStorage.setItem("isLoadNodes", "true");
    // this.fetchNavData();
    // if (!Cookie.get("realName")) {
    //   this.getUserInfo();
    // }
    // this.realName = Cookie.get("realName");
    // this.getMsg();
  },
  computed: {
    ...mapGetters(["showLoading"])
  },
  components: {
    Square
  },
  methods: {
    //退出登录
    doLogout() {
      removeToken();
      removeUserInfo();
      this.$store.state.allMenu = [];
      localStorage.removeItem("menuList");
      logout();
      this.$router.push("/login");
    },
    fetchNavData(to, from) {
      //console.log(to,from)
      // 初始化菜单激活项
      // var nav_type = "courseCenter"
      let nav_name = this.$route.matched[0].name;
      let nav_path = this.$route.matched[0].path;
      // this.$store.state.topNavState = nav_type; // 改变topNavState状态的值
      this.$store.state.leftNavState = nav_name; // 改变leftNavState状态的值
      this.defaultActiveIndex = nav_path;
      //console.log(this.$route.matched[0].path)
    },
    //获取用户信息
    getUserInfo() {
      let data = getUserId();
      getMeInfo()
        .then(res => {
          let status;
          if (Number(res.code) === 200) {
            this.realName = res.data.realName;
            status = res.data.initStatus;
            // res.data.avatar ? this.userAvatar= res.data.avatar : this.userAvatar = require('../../assets/images/user.png')
            this.$store.commit("CHANGE_AVATAR", res.data.avatar);
            Cookie.set("avatar", res.data.avatar);
            Cookie.set("realName", res.data.realName);
            Cookie.set("tenantId", res.data.gender);
          } else {
            // this.$message.error('请登录')
            // this.$message.error(getErrorMsg(res.msg));
          }
          return status;
        })
        .then(status => {
          if (status === 2) {
            this.nameDialog = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //status为3 时修改用户名
    userNameInit() {
      let data = { userName: this.nameInit };
      userInit(data)
        .then(res => {
          if (Number(res.code) === 200) {
            // console.log(res.data)
            this.$message.success("修改成功");
            this.nameDialog = false;
          } else {
            this.$message.error(getErrorMsg(res.msg));
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMsg() {
      unReadyMsg()
        .then(res => {
          // console.log(res)
          if (Number(res.code) === 200) {
            this.msgNumber = res.data;
            this.$store.commit("SET_MSG", res.data);
          } else {
            this.$message.error("请登录");
            // this.$message.error(getErrorMsg(res.msg));
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    $route: function(to, from) {
      // 路由改变时执行
      //console.info("to.path:" + to.path);
      this.fetchNavData(to, from);
    }
  }
};
</script>

<style scoped lang="stylus" type="text/stylus">
.el-menu-item {
  text-align: center;
  font-size: 1em;
}

.is-active {
  background: rgb(94, 98, 110) !important;
  border: none !important;
}

.header {
  position: fixed;
  top: 0;
  // max-width 1620px
  // margin 0 auto
  z-index: 120;
  width: 100%;
  height: 60px;
  background: #263238;
  display: flex;
  justify-content: space-between;

  .login {
    color: #ffffff;
    font-size: 22px;
    line-height: 60px;
    width: 220px;
    margin-left 20px;

    .sizes {
      font-size: 16px;
      margin-left: 10px;
      margin-top: 20px;
      position: relative;
      bottom: -3px;
    }
  }

  .list {
    display: inline-block;
    font-size: 18px;
    color: #ffffff;
    height: 60px;
    line-height: 60px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 10px;
  }

  .yes-list {
    background: #697583;
  }
}

.el-menu
  background-color #263238
.avator {
  display: flex;
  align-items: center;
  color: #fff;
  margin-right: 3%;
  cursor: pointer;

  .userinfo-inner {
    display: flex;
    align-items: center;
    color: #fff;
  }
}
</style>
