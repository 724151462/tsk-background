<template>
  <div class="login-warp">
    <!--加载动画-->
    <div v-show="showLoading">
      <div class="tq_loading__mask"></div>
      <div class="tq_loading-wrapper">
        <div class="tq_loading__loading-wrapper">
          <square :background="'#409eff'"></square>
        </div>
        <div class="tq_loading__text">正在加载</div>
      </div>
    </div>
    <div class="login" :style="bgImg">
      <div class="login-center">
        <div class="left">
          <img :src="require('@/assets/images/login_left.png')" class="left-img" alt>
        </div>
        <div class="right">
          <div></div>
          <div style="position: relative;height: 100%">
            <el-form :model="data" ref="data" class="login-box">
              <img :src="require('@/assets/images/logo.png')" class="logo-img" alt>
              <el-form-item label prop="tenantId">
                <el-select
                  filterable
                  class="input-item"
                  v-model="searchKey"
                  :filter-method="schoolInit"
                  placeholder="请选择学校"
                >
                  <el-option
                    v-for="item in schoolList"
                    :key="item.tenantId"
                    :label="item.tenantName"
                    :value="item.tenantName"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label prop="userName">
                <el-input placeholder="工号/电话号码" v-model="data.userName" class="input-item"></el-input>
              </el-form-item>
              <el-form-item label prop="password" style="margin-bottom: 10px">
                <el-input
                  type="password"
                  placeholder="密码"
                  v-model="data.password"
                  class="input-item"
                  @keyup.native.enter="goLogin"
                ></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 0">
                <div class="input-item" style="text-align: left">
                  <span class="login-text" @click="forgotPass.dialogVisible = true">忘记密码?</span>
                </div>
              </el-form-item>
              <el-form-item style>
                <el-button type="primary" @click="goLogin" class="input-item">马上登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="找回密码"
      :visible.sync="forgotPass.dialogVisible"
      :before-close="noRest"
      width="500px"
    >
      <!--通过手机号修改密码-->
      <div class="forgot-box" v-show="!forgotPass.isMail">
        <el-input
          type="text"
          placeholder="手机号"
          class="forgot-item"
          v-model="forgotPass.forgotForm.mobile"
          style="width: 300px"
        ></el-input>
        <div>
          <el-input
            type="text"
            placeholder="验证码"
            v-model="forgotPass.forgotForm.code"
            class="forgot-item"
            style="width: 210px;margin-right: 20px"
          ></el-input>
          <el-button
            type="primary"
            :disabled="forgotPass.codeBtn"
            @click="getMobileCode"
            plain
          >{{forgotPass.codeBtn ? `${forgotPass.codeBtnTime}s` : '获取'}}</el-button>
        </div>
        <el-input
          type="password"
          placeholder="设置新密码"
          class="forgot-item"
          v-model="forgotPass.forgotForm.password"
          style="width: 300px"
        ></el-input>
        <el-input
          type="password"
          placeholder="确认新密码"
          class="forgot-item"
          v-model="forgotPass.forgotForm.rePassWord"
          style="width: 300px;margin-bottom: 10px"
        ></el-input>
        <p style="color: red">新密码请使用字母+数字的组合</p>
        <div style="color: #b5b5b5;user-select: none">使用账号绑定的
          <el-button type="text" @click="changeMobile">手机号</el-button>或
          <el-button type="text" style="margin-left:0" @click="changeMail">邮箱</el-button>找回密码
        </div>
        <el-button style size="small" type="primary" @click="mobileRest">重置密码</el-button>
      </div>
      <!--通过邮箱找回密码-->
      <div class="forgot-box" v-show="forgotPass.isMail">
        <el-input
          type="text"
          placeholder="邮箱"
          class="forgot-item"
          v-model="forgotPass.forgotForm.email"
          style="width: 300px"
        ></el-input>
        <div v-if="!forgotPass.isEmailRest">
          <el-input
            type="text"
            placeholder="验证码"
            v-model="forgotPass.forgotForm.code"
            class="forgot-item"
            style="width: 210px;margin-right: 20px"
          ></el-input>
          <el-button
            type="primary"
            :disabled="forgotPass.codeBtn"
            @click="getMailCode"
            plain
          >{{forgotPass.codeBtn ? `${forgotPass.codeBtnTime}s` : '获取'}}</el-button>
        </div>
        <div v-else>
          <el-input
            type="password"
            placeholder="设置新密码"
            class="forgot-item"
            v-model="forgotPass.forgotForm.password"
            style="width: 300px"
          ></el-input>
          <el-input
            type="password"
            placeholder="确认新密码"
            class="forgot-item"
            v-model="forgotPass.forgotForm.rePassWord"
            style="width: 300px;margin-bottom: 10px"
          ></el-input>
        </div>
        <p style="color: red">新密码请使用字母+数字的组合</p>
        <div style="color: #b5b5b5;user-select: none">使用账号绑定的
          <el-button
            type="text"
            @click="()=>{forgotPass.isMail = false;forgotPass.forgotForm.mail = ''}"
          >手机号</el-button>或
          <el-button
            type="text"
            style="margin-left:0"
            @click="()=>{forgotPass.isMail = true;forgotPass.forgotForm.mobile = ''}"
          >邮箱</el-button>找回密码
        </div>
        <el-button
          size="small"
          type="primary"
          @click="forgotPass.isEmailRest ? emailRest() : emailRestCheck()"
        >{{this.forgotPass.isEmailRest ? '重置密码' : '下一步'}}</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="noRest">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { logins, loginDebug, getTenant } from "@/api/login";
// import { sysUserMenuList } from "@/api/system";
// import Person from '@/utils/validate'
// import {
//   setToken,
//   getToken,
//   twoWeeksExchange,
//   twoWeeksGetExchange,
//   saveUserInfo
// } from "@/utils/auth";
// import { getErrorMsg } from "@/utils/utils";
// import MenuUtils from "@/utils/MenuUtils";
import { mapGetters } from "vuex";
import Square from "@/components/cubeShadow.vue";
// import {compare} from '@/utils/MenuUtils'
// import {
//   mobileForgot,
//   emailForgot,
//   resetPass,
//   emailFotgotCheck,
//   mobileFotgotCheck
// } from "../../api/user";

var routers = [];
export default {
  data() {
    return {
      bgImg: {
        backgroundImage: "url(" + require("@/assets/images/login_bg.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
      forgotPass: {
        dialogVisible: false,
        isMail: false,
        codeBtn: false,
        codeBtnTime: 0,
        isEmailRest: false,
        forgotForm: {
          email: "",
          password: "",
          rePassWord: "",
          mobile: "",
          code: ""
        }
      },
      leftImg: require("@/assets/images/login_left.png"),
      schoolList: [], //租户列表
      searchKey: "", //搜索
      data: {
        userName: "",
        password: "",
        tenantId: ""
      },
      rules: {
        tenantId: [
          { required: true, message: "请选择所属学校", trigger: "blur" }
        ],
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    // this.schoolInit();
  },
  computed: {
    ...mapGetters(["showLoading"])
  },
  components: {
    Square
  },
  methods: {
    schoolInit() {
      getTenant()
        .then(res => {
          if (res.code === 200) {
            this.schoolList = res.data;
          } else {
            this.$message.error("获取学校信息失败，请重试");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goLogin() {
      let tenant = this.schoolList.find(value => {
        return value.tenantName == this.searchKey;
      });
      let tenantId = tenant ? tenant.tenantId : "",
        data = {
          tenantId: tenantId,
          loginAccount: this.data.userName,
          passwd: this.data.password
        };
      this.$store.commit("SHOWLOADING");
      const person=new Person();
      person.userName = data.loginAccount;
      person.password = data.passwd;
      logins(data)
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            // console.log(res)
            twoWeeksExchange(res.data.token, res.data.refreshToken);
            saveUserInfo(res.data.userId);
            sysUserMenuList().then(response => {
              // console.log(static_routes);
              let static_routes = response.data;
              // sessionStorage.setItem('menuList',JSON.stringify(response.data))
              localStorage.setItem("menuList", JSON.stringify(static_routes));
              // let routes = MenuUtils(response.data)
              let routes = MenuUtils(static_routes);
              // console.log(routes)
              this.$store.commit("setAllMenu", routes);
              this.$router.addRoutes(routes);
              this.$router.replace("/course/list");
            })
            .then(()=>{
              this.$store.commit("HIDELOADING");
            })
          } else {
            this.$message({
              message: getErrorMsg(res.msg),
              type: "error"
            });
            this.$store.commit("HIDELOADING");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //切换为手机号方式
    changeMobile() {
      this.forgotPass.isMail = false;
      this.forgotPass.codeBtn = false;
      this.forgotPass.codeBtnTime = 0;
      this.forgotPass.forgotForm.email = "";
      this.forgotPass.forgotForm.password = "";
      this.forgotPass.forgotForm.rePassWord = "";
      this.forgotPass.forgotForm.mobile = "";
      this.forgotPass.forgotForm.code = "";
    },
    //切换为邮箱方式
    changeMail() {
      this.forgotPass.isMail = true;
      (this.forgotPass.codeBtn = false),
        (this.forgotPass.codeBtnTime = 0),
        (this.forgotPass.forgotForm.email = "");
      this.forgotPass.forgotForm.password = "";
      this.forgotPass.forgotForm.rePassWord = "";
      this.forgotPass.forgotForm.mobile = "";
      this.forgotPass.forgotForm.code = "";
    },
    //手机号重置密码,获取验证码
    getMobileCode() {
      mobileForgot({ mobile: this.forgotPass.forgotForm.mobile })
        .then(res => {
          if (res.code === 200) {
            this.$message.success("验证码发送成功");
            //限时
            this.forgotPass.codeBtn = true;
            this.forgotPass.codeBtnTime = 60;
            let time = setInterval(() => {
              if (this.forgotPass.codeBtnTime > 0) {
                this.forgotPass.codeBtnTime -= 1;
              } else {
                this.forgotPass.codeBtn = false;
                clearInterval(time);
                this.forgotPass.codeBtnTime = 0;
              }
            }, 1000);
          } else {
            this.$message.error(getErrorMsg(res.msg));
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMailCode() {
      let loading = this.$loading({
        lock: true,
        text: "正在发送验证码，请稍候",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      emailForgot({ mail: this.forgotPass.forgotForm.email })
        .then(res => {
          loading.close();
          if (res.code === 200) {
            this.$message.success("验证码成功发送至邮箱");
            //限时
            this.forgotPass.codeBtn = true;
            this.forgotPass.codeBtnTime = 60;
            let time = setInterval(() => {
              if (this.forgotPass.codeBtnTime > 0) {
                this.forgotPass.codeBtnTime -= 1;
                console.log(this.forgotPass.codeBtnTime);
              } else {
                this.forgotPass.codeBtn = false;
                clearInterval(time);
                this.forgotPass.codeBtnTime = 0;
              }
            }, 1000);
          } else {
            this.$message.error(getErrorMsg(res.msg));
          }
        })
        .catch(err => {
          loading.close();
          console.log(err);
        });
    },
    //手机号重置密码
    mobileRest() {
      let data = {
        mobile: this.forgotPass.forgotForm.mobile,
        captcha: this.forgotPass.forgotForm.code,
        newPasswd: this.forgotPass.forgotForm.password,
        passwdCheck: this.forgotPass.forgotForm.rePassWord
      };
      mobileFotgotCheck(data)
        .then(res => {
          if (res.code === 200) {
            this.$message.success("密码重置成功");
            this.data.userName = this.forgotPass.forgotForm.mobile;
            this.noRest();
          } else {
            this.$message.error(getErrorMsg(res.msg));
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //邮箱验证码验证
    emailRestCheck() {
      let data = {
        mail: this.forgotPass.forgotForm.email,
        captcha: this.forgotPass.forgotForm.code
      };
      emailFotgotCheck(data)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.forgotPass.isEmailRest = true;
          } else {
            this.$message.error(getErrorMsg(res.msg));
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //邮箱重置密码
    emailRest() {
      let data = {
        mail: this.forgotPass.forgotForm.email,
        newPasswd: this.forgotPass.forgotForm.password,
        passwdCheck: this.forgotPass.forgotForm.rePassWord
      };
      resetPass(data)
        .then(res => {
          if (res.code === 200) {
            this.$message.success("密码重置成功");
            this.data.userName = this.forgotPass.forgotForm.email;
            this.noRest();
          } else {
            this.$message.error(getErrorMsg(res.msg));
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //取消重置密码
    noRest() {
      this.forgotPass.dialogVisible = false;
      this.forgotPass.forgotForm.email = "";
      this.forgotPass.forgotForm.password = "";
      this.forgotPass.forgotForm.rePassWord = "";
      this.forgotPass.forgotForm.code = "";
      this.forgotPass.forgotForm.mobile = "";
      this.forgotPass.codeBtnTime = 0;
    }
  }
};
</script>

<style scoped lang="stylus" type="text/stylus">
.login-warp {
  width: inherit;
  height: inherit;

  .login {
    width: 100%;
    position: relative;
    height: 100%;

    .login-center {
      min-width: 600px;
      min-height: 350px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
      box-shadow: #a1a1a1 0 0 10px;
      color: #ffffff;
      border-radius: 20px;
      display: flex;

      .left {
        background-color: #3a8ee6;
        width: 50%;
        float: left;

        .left-img {
          width: 100%;
          height: 100%;
        }
      }

      .right {
        width: 50%;
        /* float right */
        background-color: white;
        display: inline-block;
        text-align: center;

        .login-box {
          position: absolute;
          width: 80%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);

          .input-item {
            margin: 0 auto;
            width: 100%;
            max-width: 300px;
          }

          .login-text {
            color: #909399;
            text-align: left;
            cursor: pointer;
            margin: 10px 0;
            user-select: none;
            font-size: 13px;
          }

          .login-btn {
            cursor: pointer;
            background: linear-gradient(to right, #6fb2ff, #095fff);
            user-select: none;
          }
        }

        .logo-img {
          height: 45px;
          margin: 20px 0;
        }
      }
    }
  }

  .forgot-box {
    width: 320px;
    margin: 0 auto;

    .forgot-item {
      margin-bottom: 20px;
    }
  }
}
</style>