import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Header from '@/views/layout/header.vue'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)


export const constantRouterMap = [
  {
    path: '/',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('errorPage/404'),
    hidden: true
  },
  {
    path: '*',
    component: _import('errorPage/404'),
  },
  // {
  //   path: '/course',    // 访问路径
  //   component: Header,  // 组件
  //   name: '课程中心',    // 页面名称
  //   level: 1,           // 路由等级，用来判断是否是头部（一级）导航
  //   menuShow: true,     // 是否显示于侧边栏
  //   // type: 'courseCenter',
  //   redirect: '/course/list', // 重定向
  //   children: [{        // 子路由
  //       path: '/course/list',
  //       component: Layout,
  //       name: '课程列表',
  //       leaf: true,
  //       menuShow: true,
  //       children: [{
  //           path: '/course/list',
  //           component: _import('course/list'),
  //           name: '课程列表',
  //           meta:{
  //             father: '课程中心'
  //           }
  //         },
  //         {
  //           path: '/course/addCourse',
  //           component: _import('course/addCourse'),
  //           name: '课程编辑'
  //         },
  //         {
  //           path: '/course/list/chapter',
  //           component: _import('course/courseMain'),
  //           name: '课程列表',
  //           leaf: true,
  //           redirect: '/course/list/chapter',
  //           children: [{
  //               path: '/course/list/chapter',
  //               component: _import('course/chapter'),
  //               name: '章节内容',
  //             },
  //             {
  //               path: '/course/list/interact',
  //               component: _import('course/interact'),
  //               name: '互动',
  //             },
  //             {
  //               path: '/course/list/interact/vote',
  //               component: _import('course/interactContent/vote'),
  //               name: '发布投票',
  //             },
  //             {
  //               path: '/course/list/interact/voteresult',
  //               component: _import('course/interactContent/voteResult'),
  //               name: '投票结果',
  //             },
  //             {
  //               path: 'interact/brainstorm',
  //               component: _import('course/interactContent/brainStorm'),
  //               name: '发布头脑风暴',
  //             },
  //             {
  //               path: '/course/list/interact/brainresult',
  //               component: _import('course/interactContent/brainResult'),
  //               name: '头脑风暴结果',
  //             },
  //             {
  //               path: 'interact/homework',
  //               component: _import('course/interactContent/homeWork'),
  //               name: '作业/小组任务',
  //             },
  //             {
  //               path: '/course/list/interact/homeworkresult',
  //               component: _import('course/interactContent/workResult'),
  //               name: '作业/小组任务结果',
  //             },
  //             {
  //               path: 'interact/test',
  //               component: _import('course/interactContent/test'),
  //               name: '发布测试',
  //             },
  //             {
  //               path: '/course/list/interact/testresult',
  //               component: _import('course/interactContent/testResult'),
  //               name: '测试结果',
  //             },
  //             {
  //               path: '/course/list/member',
  //               component: _import('course/member'),
  //               name: '成员',
  //             },
  //             {
  //               path: '/course/list/member/manage',
  //               component: _import('course/memberContent/groupPlan'),
  //               name: '成员方案管理',
  //             },

  //             {
  //               path: '/course/list/teach',
  //               component: _import('course/teach'),
  //               name: '教学管理',
  //               redirect: '/course/list/teach/grade',
  //               children: [{
  //                   path: '/course/list/teach/grade',
  //                   component: _import('course/teachContent/grade'),
  //                   name: '成绩管理',
  //                 },
  //                 {
  //                   path: '/course/list/teach/notes',
  //                   component: _import('course/teachContent/notes'),
  //                   name: '笔记管理',
  //                 },
  //                 {
  //                   path: '/course/list/teach/homework',
  //                   component: _import('course/teachContent/homeworkList'),
  //                   name: '作业管理',
  //                 },
  //                 {
  //                   path: '/course/list/teach/homeworkdetail',
  //                   component: _import('course/teachContent/homeworkDetail'),
  //                   name: '学生作业详情',
  //                 },
  //                 {
  //                   path: '/course/list/teach/storm',
  //                   component: _import('course/teachContent/storm'),
  //                   name: '头脑风暴',
  //                 },
  //                 {
  //                   path: '/course/list/teach/questionnaire',
  //                   component: _import('course/teachContent/questionnaire'),
  //                   name: '投票问卷',
  //                 },
  //                 {
  //                   path: '/course/list/teach/test',
  //                   component: _import('course/teachContent/test'),
  //                   name: '测试管理',
  //                 },
  //                 {
  //                   path: '/course/list/teach/testmark',
  //                   component: _import('course/teachContent/testMark'),
  //                   name: '测试成绩',
  //                 },
  //                 {
  //                   path: '/course/list/teach/video',
  //                   component: _import('course/teachContent/videos'),
  //                   name: '视频',
  //                 },
  //               ]
  //             },
  //             {
  //               path: '/course/list/notice',
  //               component: _import('course/notice'),
  //               name: '通知管理',
  //             },
  //             {
  //               path: '/course/list/discuss',
  //               component: _import('course/discuss'),
  //               name: '讨论中心',
  //             }
  //           ]
  //         },
  //         {
  //           path: '/course/list/interact',
  //           component: _import('course/courseMain'),
  //           name: '互动',
  //         },
  //         {
  //           path: '/course/list/member',
  //           component: _import('course/courseMain'),
  //           name: '成员',
  //         },
  //         {
  //           path: '/course/list/teach',
  //           component: _import('course/courseMain'),
  //           name: '教学管理',
  //           // redirect: '/course/list/teach/grade'
  //         },
  //         {
  //           path: '/course/list/notice',
  //           component: _import('course/courseMain'),
  //           name: '通知管理',
  //         },
  //         {
  //           path: '/course/list/discuss',
  //           component: _import('course/courseMain'),
  //           name: '讨论中心',
  //         },
  //         {
  //           path: '/course/list/discuss/disinfo',
  //           component: _import('course/discussDialog'),
  //           name: '讨论详情',
  //         },
  //         {
  //           path: '/course/list/interact/vote',
  //           component: _import('course/interactContent/vote'),
  //           name: '发布投票',
  //         },
  //         {
  //           path: '/course/list/teach/grade',
  //           component: _import('course/courseMain'),
  //           name: '成绩',
  //         },
  //       ]
  //     },
  //     {
  //       path: 'appraisal',
  //       component: Layout,
  //       name: '课程评价',
  //       leaf: true,
  //       menuShow: true,
  //       redirect: '/appraisal/list',
  //       children: [{
  //         path: '/appraisal/list',
  //         component: _import('course/appraisal'),
  //         name: '课程评价',
  //       }]
  //     },
  //     {
  //       path: 'test',
  //       component: Layout,
  //       name: '试题管理',
  //       children: [{
  //           path: '/course/resource/test',
  //           component: _import('course/resourse/test/test'),
  //           name: '试题管理',
  //           menuShow: true
  //         },
  //         {
  //           path: '/course/resource/addtest/:catalog',
  //           component: _import('course/resourse/test/addTest'),
  //           name: '试题添加',
  //         },
  //         {
  //           path: '/course/resource/edittest/:quiz',
  //           component: _import('course/resourse/test/editTest'),
  //           name: '试题编辑',
  //         }
  //       ]
  //     },
  //     {
  //       path: 'resource',
  //       component: Layout,
  //       name: '资源管理',
  //       children: [{
  //         path: '/course/resource/resource',
  //         component: _import('course/resourse/resourse/resourse'),
  //         name: '资源管理',
  //         menuShow: true
  //       }]
  //     },
  //     {
  //       path: 'activity',
  //       component: Layout,
  //       name: '活动管理',
  //       children: [{
  //         path: '/course/activity/activity',
  //         component: _import('course/resourse/activity/activity'),
  //         name: '活动管理',
  //         menuShow: true
  //       }]
  //     }
  //   ],
  // },
  // {
  //   path: '/learn',
  //   component: Header,
  //   name: '学习中心',
  //   level: 1,
  //   type: 'studyManage',
  //   menuShow: true,
  //   redirect: '/learn/inclass',
  //   children: [{
  //     path: '/learn/inclass',
  //     // leaf: true,
  //     component: Layout,
  //     name: '学习管理',
  //     menuShow: true,
  //     children: [{
  //         path: '/learn/inclass',
  //         leaf: true,
  //         component: _import('learn/inClass'),
  //         name: '课堂',
  //         menuShow: true,
  //       },
  //       {
  //         path: '/learn/afterclass',
  //         leaf: true,
  //         component: _import('learn/afterClass'),
  //         name: '课后',
  //         menuShow: true,
  //       },
  //       // {
  //       //   path: '/learn/teachdata',
  //       //   leaf: true,
  //       //   component: _import('learn/teachData'),
  //       //   name: '教学数据',
  //       //   menuShow: true,
  //       // }
  //     ]
  //   }]
  // },
  // {
  //   path: '/school',
  //   component: Header,
  //   name: '校管中心',
  //   type: 'schoolManageCenter',
  //   menuShow: true,
  //   level: 1,
  //   redirect: '/school/student',
  //   children: [{
  //     path: '/school/student',
  //     menuShow: true,
  //     component: Layout,
  //     name: '用户管理',
  //     children: [{
  //       path: '/school/student',
  //       component: _import('school/student'),
  //       name: '学生管理',
  //       menuShow: true
  //     },
  //       {
  //         path: '/school/teacher',
  //         component: _import('school/teacher'),
  //         name: '教师管理',
  //         menuShow: true,
  //       },
  //       {
  //         path: '/school/teacher/addteacher',
  //         component: _import('school/addTeacher'),
  //         name: '添加教师',
  //       },
  //       {
  //         path: '/school/teacher/modifyteacher',
  //         component: _import('school/modifyTeacher'),
  //         name: '修改教师'
  //       },
  //     ],
  //   },
  //     {
  //       path: 'notice',
  //       component: Layout,
  //       name: '消息管理',
  //       leaf: true,
  //       menuShow: true,
  //       redirect: '/school/notice',
  //       children: [{
  //         path: '/school/notice',
  //         component: _import('school/schoolNotice'),
  //         name: '消息管理',
  //         menuShow: true
  //       }, ]
  //     },
  //     {
  //       path: 'portal',
  //       component: Layout,
  //       name: 'school门户配置',
  //       leaf: true,
  //       menuShow: true,
  //       redirect: '/school/portal/mould',
  //       children: [{
  //         path: '/school/portal/mould',
  //         component: _import('school/portal'),
  //         name: '模板配置',
  //         menuShow: true,
  //         children: [{
  //           path: '/school/portal/mould',
  //           component: _import('school/portalMould'),
  //           name: '模板配置',
  //           menuShow: true,
  //         },
  //           {
  //             path: '/school/portal/platform',
  //             component: _import('school/portalPlatform'),
  //             name: '平台信息',
  //             menuShow: true,
  //           },
  //           {
  //             path: '/school/portal/banner',
  //             component: _import('school/portalBanner'),
  //             name: '轮播图',
  //             menuShow: true,
  //           },
  //           {
  //             path: '/school/portal/recommend',
  //             component: _import('school/portalRecommend'),
  //             name: '课程推荐',
  //             menuShow: true,
  //           },
  //           {
  //             path: '/school/portal/teacher',
  //             component: _import('school/portalTeacher'),
  //             name: '名师风采',
  //             menuShow: true,
  //           }
  //         ]
  //       },
  //         {
  //           path: '/school/portal/platform',
  //           component: _import('school/portalPlatform'),
  //           name: '平台信息',
  //           menuShow: true,
  //         },
  //         {
  //           path: '/school/portal/banner',
  //           component: _import('school/portalBanner'),
  //           name: '轮播图',
  //           menuShow: true,
  //         },
  //         {
  //           path: '/school/portal/recommend',
  //           component: _import('school/portalRecommend'),
  //           name: '课程推荐',
  //           menuShow: true,
  //         },
  //         {
  //           path: '/school/portal/teacher',
  //           component: _import('school/portalTeacher'),
  //           name: '名师风采',
  //           menuShow: true,
  //         }
  //       ]
  //     },
  //     {
  //       path: 'course',
  //       component: Layout,
  //       name: '课程管理',
  //       redirect: "/school/course/course",
  //       children: [{
  //         path: '/school/course/course',
  //         component: _import('school/course'),
  //         name: '课程管理',
  //         menuShow: true,
  //       },
  //         {
  //           path: '/school/course/certificate',
  //           component: _import('school/certificate'),
  //           name: '证书审核',
  //           menuShow: true,
  //         },
  //         {
  //           path: '/school/course/courseReview',
  //           component: _import('school/courseReview'),
  //           name: '课程包审核',
  //           menuShow: true,
  //         },
  //       ]
  //     },
  //     {
  //       path: 'structure',
  //       component: Layout,
  //       name: '组织架构',
  //       redirect: "/school/structure/academy",
  //       children: [{
  //         path: '/school/structure/academy',
  //         component: _import('school/academy'),
  //         name: '院管理',
  //         menuShow: true,
  //       },
  //         {
  //           path: '/school/structure/department',
  //           component: _import('school/department'),
  //           name: '系管理',
  //           menuShow: true,
  //         },
  //         {
  //           path: '/school/structure/speciality',
  //           component: _import('school/speciality'),
  //           name: '专业管理',
  //           menuShow: true,
  //         },
  //         {
  //           path: '/school/structure/class',
  //           component: _import('school/class'),
  //           name: '班级管理',
  //           menuShow: true,
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/user',
  //   component: Header,
  //   redirect: '/user/index',
  //   name: '个人中心',
  //   children: [
  //     {
  //       path: '/user/index',
  //       component: _import('user/index'),
  //       name: '个人中心',
  //     },
  //     {
  //       path: '/user/message',
  //       component: _import('user/message'),
  //       name: '消息管理'
  //     },
  //     {
  //       path: '/user/certificate',
  //       component: _import('user/certificate'),
  //       name: '我的证书'
  //     },
  //   ]
  // },
  // {
  //   path: '/system',
  //   component: Header,
  //   name: '系统管理',
  //   menuShow: true,
  //   level: 1,
  //   type: 'systemManage',
  //   redirect: '/system/tenantManager',
  //   meta: {
  //     address: 'system'
  //   },
  //   children: [{
  //       path: '/system/tenantManager',
  //       component: Layout,
  //       name: '租户管理',
  //       children: [{
  //           path: '/system/tenantManager',
  //           component: _import('system/tenantManager'),
  //           name: '租户管理',
  //           menuShow: true
  //         },
  //         {
  //           path: '/system/tenantAccountManager',
  //           component: _import('system/tenantAccountManager'),
  //           name: '租户账号管理',
  //           menuShow: true
  //         },
  //       ]
  //     },
  //     {
  //       path: '/system/system',
  //       component: Layout,
  //       name: '系统管理',
  //       children: [{
  //           path: '/system/courseCategory',
  //           component: _import('system/courseCategory'),
  //           name: '课程分类',
  //           menuShow: true
  //         },
  //         {
  //           path: '/system/help',
  //           component: _import('system/help'),
  //           name: '帮助中心管理',
  //           menuShow: true
  //         },
  //         // {
  //         //   path: '/system/templates',
  //         //   component: _import('system/templates'),
  //         //   name: '模板管理',
  //         //   menuShow: true
  //         // },
  //         {
  //           path: '/system/notice',
  //           component: _import('system/sysNotice'),
  //           name: '消息管理',
  //           menuShow: true
  //         },
  //       ]
  //     },
  //     {
  //       path: '/system/student',
  //       component: Layout,
  //       name: '用户中心',
  //       children: [{
  //           path: '/system/student',
  //           component: _import('system/student'),
  //           name: '学生管理',
  //           menuShow: true
  //         },
  //         {
  //           path: '/system/teacher',
  //           component: _import('system/teacher'),
  //           name: '教师管理',
  //           menuShow: true
  //         },
  //         {
  //           path: '/system/school',
  //           component: _import('system/school'),
  //           name: '学校管理员',
  //           menuShow: true
  //         },
  //         {
  //           path: '/system/teacher/teacherdetail',
  //           component: _import('system/teacherDetail'),
  //           name: '教师详情',
  //         },
  //         {
  //           path: '/system/manager',
  //           component: _import('system/system'),
  //           name: '系统管理员',
  //           menuShow: true
  //         },
  //         {
  //           path: '/system/tag',
  //           component: _import('system/tag'),
  //           name: '标签管理',
  //           menuShow: true
  //         },
  //       ]
  //     },
  //     {
  //       path: '/system/power',
  //       component: Layout,
  //       name: '权限管理',
  //       children: [{
  //           path: '/system/menu',
  //           component: _import('system/menu'),
  //           name: '菜单管理',
  //           menuShow: true
  //         },
  //         {
  //           path: '/system/role',
  //           component: _import('system/role'),
  //           name: '角色管理',
  //           menuShow: true
  //         },
  //       ]
  //     },
  //     {
  //       path: 'portal',
  //       component: Layout,
  //       name: '门户配置',
  //       redirect: '/system/portal/mould',
  //       leaf: true,
  //       menuShow: true,
  //       children: [{
  //           path: '/system/portal/mould',
  //           component: _import('system/portal'),
  //           name: '模板配置',
  //           menuShow: true,
  //           children: [{
  //               path: '/system/portal/mould',
  //               component: _import('system/portalMould'),
  //               name: '模板配置',
  //               menuShow: true,
  //             },
  //             {
  //               path: '/system/portal/platform',
  //               component: _import('system/portalPlatform'),
  //               name: '平台信息',
  //               menuShow: true,
  //             },
  //             {
  //               path: '/system/portal/banner',
  //               component: _import('system/portalBanner'),
  //               name: '轮播图',
  //               menuShow: true,
  //             },
  //             {
  //               path: '/system/portal/recommend',
  //               component: _import('system/portalRecommend'),
  //               name: '课程推荐',
  //               menuShow: true,
  //             },
  //             {
  //               path: '/system/portal/teacher',
  //               component: _import('system/portalTeacher'),
  //               name: '名师风采',
  //               menuShow: true,
  //             }
  //           ]
  //         },
  //         {
  //           path: '/system/portal/platform',
  //           component: _import('system/portalPlatform'),
  //           name: '平台信息',
  //           menuShow: true,
  //         },
  //         {
  //           path: '/system/portal/banner',
  //           component: _import('system/portalBanner'),
  //           name: '轮播图',
  //           menuShow: true,
  //         },
  //         {
  //           path: '/system/portal/recommend',
  //           component: _import('system/portalRecommend'),
  //           name: '课程推荐',
  //           menuShow: true,
  //         },
  //         {
  //           path: '/system/portal/teacher',
  //           component: _import('system/portalTeacher'),
  //           name: '名师风采',
  //           menuShow: true,
  //         }
  //       ]
  //     },
  //     // {
  //     //   path: 'tenantManager',
  //     //   component: _import('system/tenantManager'),
  //     //   name: 'system租户管理'
  //     // },
  //     // {
  //     //   path: 'tenantAccountManager',
  //     //   component: _import('system/tenantAccountManager'),
  //     //   name: 'system租户账号管理'
  //     // },


  //     // {
  //     //   path: 'courseCategory',
  //     //   component: _import('system/courseCategory'),
  //     //   name: 'system课程分类'
  //     // },
  //     // {
  //     //   path: 'help',
  //     //   component: _import('system/help'),
  //     //   name: 'system帮助中心管理'
  //     // },
  //     // {
  //     //   path: 'templates',
  //     //   component: _import('system/templates'),
  //     //   name: 'system模板管理'
  //     // },


  //     // {
  //     //   path: 'portal',
  //     //   component: _import('system/portal'),
  //     //   name: 'system门户配置',
  //     //   redirect: '/system/portal/mould',
  //     //   children: [{
  //     //       path: 'mould',
  //     //       component: _import('system/portalMould'),
  //     //       name: 'system模板配置'
  //     //     },
  //     //     {
  //     //       path: 'platform',
  //     //       component: _import('system/portalPlatform'),
  //     //       name: 'system平台信息'
  //     //     },
  //     //     {
  //     //       path: 'banner',
  //     //       component: _import('system/portalBanner'),
  //     //       name: 'system轮播图'
  //     //     },
  //     //     {
  //     //       path: 'recommend',
  //     //       component: _import('system/portalRecommend'),
  //     //       name: 'system课程推荐'
  //     //     },
  //     //     {
  //     //       path: 'teacher',
  //     //       component: _import('system/portalTeacher'),
  //     //       name: 'system名师风采'
  //     //     }
  //     //   ]
  //     // },
  //   ]
  // },
  // {
  //   path: '/course/classmodel',
  //   component: _import('classModel/index'),
  //   name: 'classIndex',
  //   leaf: true,
  // },
  // {
  //   path: '/course/check',
  //   component: _import('classModel/check'),
  //   name: 'modelCheck',
  // },
  // {
  //   path: '/course/checked',
  //   //签退
  //   component: _import('classModel/checked'),
  //   name: 'modelChecked',
  // },
  // {
  //   path: '/course/classend',
  //   //课堂结束，课堂数据展示
  //   component: _import('classModel/classOver'),
  //   name: 'classEnd',
  // },
  // {
  //   path: '/course/classchapter',
  //   component: _import('classModel/modelMain'),
  //   name: 'modelMain',
  //   redirect: '/course/modelChapter',
  //   children: [{
  //       path: '/course/modelChecked',
  //       //签到结束，数据展示
  //       component: _import('classModel/modelContent/modelChecked'),
  //       name: 'modelChecked',
  //     },
  //     {
  //       path: '/course/modelChapter',
  //       component: _import('classModel/modelContent/modelChapter'),
  //       name: 'modelMain',
  //     },
  //     {
  //       path: '/course/modelTest',
  //       component: _import('classModel/modelContent/modelTest'),
  //       name: 'modelMain',
  //     },
  //     {
  //       path: '/course/modelStrome',
  //       component: _import('classModel/modelContent/modelStrome'),
  //       name: 'modelMain',
  //     },
  //     {
  //       path: '/course/modelVote',
  //       component: _import('classModel/modelContent/modelVote'),
  //       name: 'modelMain',
  //     },
  //     {
  //       path: '/course/modelChooseAns',
  //       component: _import('classModel/modelContent/modelChooseAns'),
  //       name: 'modelMain',
  //     },
  //     {
  //       path: '/course/modelAnsqd',
  //       component: _import('classModel/modelContent/modelAnsqd'),
  //       name: 'modelMain',
  //     },
  //     {
  //       path: '/course/modelAnssj',
  //       component: _import('classModel/modelContent/modelAnssj'),
  //       name: 'modelMain',
  //     },
  //     {
  //       path: '/course/modelAnssd',
  //       component: _import('classModel/modelContent/modelAnssd'),
  //       name: 'modelMain',
  //     },
  //     {
  //       path: '/course/modelResource',
  //       component: _import('classModel/modelContent/modelResource'),
  //       name: 'modelMain',
  //     }
  //   ]
  // },
  // {
  //   path: '/*',
  //   redirect: '/404'
  // },
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})

