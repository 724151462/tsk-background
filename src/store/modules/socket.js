export default {
  state:{
    isConnect:false,
    stompClient : '',
    token : '',
    courseId:'',
    courseName:'默认课程',
    userId:'1',
    classroomId:'',
    signUrl : '/teamsking/course/sign/start'
  },
  getters:{},
  mutations:{
    SAVE_INFO:(state, data)=>{
      state.userId = data.userId
      state.token = data.token
      state.courseId = data.courseId
      state.classroomId = data.classroomId
    },
    NEW_SOCKET:(state,data)=>{
      state.stompClient = data
    },
    SAVE_CLASSROME:(state,data)=>{
      state.classroomId = data
    },
    SAVE_NAME:(state,data)=>{
      state.courseName = data
    }
  },
  actions:{
    GET_SOCKET:()=>{}
  }
}