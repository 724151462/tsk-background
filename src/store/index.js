import Vue from 'vue'
import Vuex from 'vuex'
import socket from './modules/socket'
import {
  stat
} from 'fs';
import Cookie from 'js-cookie'
import Globe_VM from '../main'
import {
  getErrorMsg
} from "@/utils/utils";
import {
  SHOWLOADING,
  HIDELOADING,
  DELETECONFIRM
} from './mutation-types'

Vue.use(Vuex)
const state = {
  showLoading: false,
  allMenu: [],
  filterMenu: [],
  leftNavState: '课程中心',
  modelActive: Cookie.get('modelActive') || "1",
  msgNum: 0,
  isFullScreen: false,
  loadingText: '正在加载',
  userAvatar: Cookie.get('avatar') || require('@/assets/images/user.png'),
  isYuan: '100', //是否启用分院(临时)
}

const mutations = {
  [SHOWLOADING](state) {
    state.showLoading = true;
  },
  [HIDELOADING](state) {
    state.showLoading = false;
  },
  [DELETECONFIRM](state, data) {
    Globe_VM.$confirm(data.message, data.title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      data.fn()
    }).catch(() => {
      Globe_VM.$message({
        type: 'info',
        message: '已取消删除'
      });
    });
  },
  setAllMenu: (state, list) => {
    // console.log('rwq', list)
    if (state.allMenu.length !== 0) {
      return
    }
    list.forEach(element => {
      state.allMenu.push(element)
    });
  },
  //接口请求失败消息弹窗
  ERR_MSG: (state, data) => {
    Globe_VM.$message.error(getErrorMsg(data));
  },
  //�޸�δ����Ϣ
  MSG_READY: (state, data) => {
    state.msgNum = state.msgNum - Number(data)
  },
  SET_LOADING_TEXT: (state, data) => {
    state.loadingText = data
  },
  SET_MSG: (state, data) => {
    state.msgNum = Number(data)
  },
  //�޸��û�ͷ��
  CHANGE_AVATAR: (state, data) => {
    state.userAvatar = data
  },
  //ȫ��
  SET_FULLSCREEN(state, data) {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();

      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();

      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
      state.isFullScreen = true
      // console.log('ȫ��')
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      state.isFullScreen = false
      // console.log('全屏')
    }
  },
  //是否启用分院，临时
  CHANGE_YUAN(state,data){
    state.isYuan = data
  }
}

const getters = {
  showLoading(state) {
    return state.showLoading
  }
}

const actions = {}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    socket
  }
})