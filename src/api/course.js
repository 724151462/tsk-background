import {
  commonsAjax
} from '../utils/requery'

/**
 * 获取用户未读消息
 */
export function unReadyMsg(data) {
  return commonsAjax(`/api/v1/study/user/message/notread/count`, '', 'get')
}
/**
 * 课堂模式下获取签到用户信息列表
 */
export function checkUser(data) {
  return commonsAjax(`/api/v1/user/${data}/classroom/userinfo`, '', 'get')
}
//课堂模式下检查是否有未结束的签到
export function hasCheck(data) {
  return commonsAjax(`/api/v1/course/classroom/${data.classroomId}/sign/unfinish`, data, 'get')
}

/**
 * 获取课程列表
 */
export function coursePage(data) {
  return commonsAjax(`/api/v1/course/page`, data, 'get')
}
/**
 * 学习中心下：获取我能管理的课程列表
 */
export function myCourseList(data) {
  return commonsAjax(`/api/v1/me/course/list`, data, 'post')
}

/**
 * 获取课程列表
 */
export function courseDel(data) {
  return commonsAjax(`/api/v1/course/`, data, 'delete')
}

/**
 * 获取默认的课程封面
 */
export function coverList(data) {
  return commonsAjax(`/api/v1/course/covers`, data, 'post')
}
/**
 * 发布课程
 */
export function publish(data) {
  let url = `/api/v1/course/` + data + '/publish'
  return commonsAjax(url, '', 'put')
}

/**
 * 复制课程
 */
export function copy(data) {
  let url = '/api/v1/course/copy'
  return commonsAjax(url, data, 'get')
}

/**
 * 关闭课程
 */
export function close(data) {
  let url = `/api/v1/course/` + data + '/close'
  return commonsAjax(url, '', 'put')
}


/**
 * 课程简单信息
 */
export function courseBaseInfo(data) {
  let url = `/api/v1/course/${data}`
  return commonsAjax(url, '', 'get')
}


/**
 * 修改学习模式
 */
export function studyModeModify(data) {
  let url = `/api/v1/course/${data.courseId}/studymode/${data.studyMode}`
  return commonsAjax(url, '', 'put')
}


/**
 * 获取课程分类列表
 */
export function categories(data) {
  return commonsAjax(`/api/v1/common/categories`, '', 'get')
}

/**
 * 获取课程标签列表
 */
export function tags(data) {
  return commonsAjax(`/api/v1/common/tags`, 'data', 'get')
}

/**
 * 获取讲师列表
 */
export function instructorList(data) {
  return commonsAjax(`/api/v1/course/instructor/list`, data, 'get')
}

/**
 * 获取租户下的教师列表
 */
export function teachersList(data) {
  let url = '/api/v1/tenant/teachers'
  return commonsAjax(url, '', 'get')
}

/**
 * 添加讲师
 */
export function addInstructor(data) {
  console.log('添加讲师')
  return commonsAjax(`/api/v1/course/instructor`, data, 'post')
}

/**
 * 保存课程
 */
export function saveCourse(data) {
  return commonsAjax(`/api/v1/course/`, data, 'post')
}


/**
 * 修改课程
 */
export function putCourse(data) {
  return commonsAjax(`/api/v1/course/`, data, 'put')
}


/**
 * 查询课程信息
 */
export function courseInfo(data) {
  console.log(data)
  let url = `/api/v1/course/info/` + data
  return commonsAjax(url, '', 'get')
}

/**
 * 根据课程id获取所有章节信息
 */
export function chaptersList(data) {
  let url = `/api/v1/course/` + data + '/chapters'
  return commonsAjax(url, '', 'get')
}


export function chaptersListSimple(data) {
  let url = `/api/v1/course/chapter/list/${data.courseId}`
  return commonsAjax(url, '', 'get')
}


/**
 * 添加章
 */

export function chaptersAdd(data) {
  let url = `/api/v1/course/chapter`
  return commonsAjax(url, data, 'post')
}


/**
 * 删除章
 */

export function chaptersDelete(data) {
  let url = `/api/v1/course/chapter/chapter`
  return commonsAjax(url, data, 'delete')
}


/**
 * 添加节
 */

export function sectionAdd(data) {
  let url = `/api/v1/course/chapter/section`
  return commonsAjax(url, data, 'post')
}


/**
 * 删除节
 */

export function sectionDelete(data) {
  let url = `/api/v1/course/chapter/section`
  return commonsAjax(url, data, 'delete')
}


/**
 * 根据课程id获取成员
 */
export function memberList(data) {
  let url = `/api/v1/course/${data.courseId}/user/page`
  return commonsAjax(url, data, 'get')
}


/**
 * 根据课程id获取未分配和已分配的组员
 */
export function memberScheme(data) {
  let url = `/api/v1/course/${data.courseId}/scheme/${data.schemeId}/team/user`
  return commonsAjax(url, data, 'get')
}


/**
 * 设置为助教
 */
export function setAssistant(data) {
  let url = `/api/v1/course/${data.courseId}/user/${data.userId}/assistant`
  return commonsAjax(url, '', 'post')
}


/**
 * 取消助教
 */
export function unsetAssistant(data) {
  let url = `/api/v1/course/${data.courseId}/user/${data.userId}/assistant`
  return commonsAjax(url, '', 'delete')
}


/**
 * 取消助教
 */
export function deleteUser(data) {
  let url = `/api/v1/course/${data.courseId}/user/${data.userId}`
  return commonsAjax(url, '', 'delete')
}

// ===============资源管理===============
//

/**
 * 获取所有资源列表
 */
export function getResourceList(data) {
  let url = `/api/v1/course/resource/page`
  return commonsAjax(url, '', 'get')
}


/**
 * 添加小项
 */
export function itemAdd(data) {
  let url = `/api/v1/course/chapter/section/item`
  return commonsAjax(url, data, 'post')
}


/**
 * 删除小项
 */

export function itemDelete(data) {
  let url = `/api/v1/course/chapter/section/item`
  return commonsAjax(url, data, 'delete')
}


/**
 * 添加内嵌题
 */

export function subjectAdd(data) {
  let url = `/api/v1/course/videoquiz`
  return commonsAjax(url, data, 'post')
}

/**
 * 获取内嵌题
 */
export function subjectGet(data) {
  let url = `/api/v1/course/videoquiz/${data.itemId}`
  return commonsAjax(url, data, 'get')
}

/**
 * 删除内嵌题
 */
export function subjectDel(data) {
  let url = `/api/v1/course/videoquiz`
  return commonsAjax(url, data, 'delete')
}

/**
 * 添加成员方案名称
 */
export function schemeAdd(data) {
  let url = `/api/v1/course/scheme`
  return commonsAjax(url, data, 'post')
}


/**
 * 根据课程id获取方案列表
 */
export function schemeList(data) {
  let url = `/api/v1/course/${data}/schemes`
  return commonsAjax(url, '', 'get')
}



/**
 * 根据方案id获取方案成员列表
 */
export function memberEditList(data) {
  let url = `/api/v1/course/scheme/${data.schemeId}/teams`
  return commonsAjax(url, '', 'get')
}


/**
 * 上传成绩模板
 */
export function memberUpload(data) {
  console.log(data)
  let url = `/api/v1/sys/course/${data.get('courseId')}/user/excel`
  // let url = `/api/v1/course/${data.get('courseId')}/score/excel`
  return commonsAjax(url, data, 'post')
}


/**
 * 确认上传
 */
export function userModify(data) {
  // let url = `/api/v1/sys/course/0608367675f54267aa6960fd0557cc1b/score/excel`
  let url = `/api/v1/sys/course/${data.courseId}/user/excel`
  return commonsAjax(url, '', 'put')
}


/**
 * 新增组名
 */
export function teamNameAdd(data) {
  let url = `/api/v1/course/scheme/${data.schemeId}/team`
  return commonsAjax(url, data, 'post')
}


/**
 * 修改组名
 */
export function teamNameModify(data) {
  console.log(data)
  let url = `/api/v1/course/scheme/${data.schemeId}/team/${data.teamId}`
  return commonsAjax(url, {
    'teamName': data.teamName
  }, 'put')
}



/**
 * 根据方案id获取方案成员分配/未分配列表
 */
export function memberMatchList(data) {
  let url = `/api/v1/course/${data.courseId}/scheme/${data.schemeId}/team/user`
  return commonsAjax(url, data, 'get')
}


/**
 * 根据方案id提交小组分配方案
 */
export function memberMatch(data) {
  let url = `/api/v1/course/scheme/${data.schemeId}/team`
  return commonsAjax(url, data, 'post')
}


/**
 * 删除小组方案
 */
export function teamDelete(data) {
  let url = `/api/v1/course/scheme/${data.schemeId}/team/${data.teamId}`
  return commonsAjax(url, '', 'delete')
}


/**
 * 删除小组方案
 */
export function delGroupMember(data) {
  let url = `/api/v1/course/scheme/team/${data.teamId}/user/${data.userId}`
  return commonsAjax(url, '', 'delete')
}


/**
 * 修改方案名称
 */
export function planNameModify(data) {
  let url = `/api/v1/course/scheme/${data.schemeId}`
  return commonsAjax(url, data.nameForm, 'put')
}


/**
 * 删除方案名称
 */
export function groupDelete(data) {
  let url = `/api/v1/course/scheme/${data.schemeId}`
  return commonsAjax(url, data, 'delete')
}


/**
 * 复制方案
 */
export function groupCopy(data) {
  let url = `/api/v1/course/scheme/${data.schemeId}`
  return commonsAjax(url, '', 'post')
}

// ========测试=========


/**
 * 测试添加
 */
export function testAdd(data) {
  let url = `/api/v1/course/exam`
  return commonsAjax(url, data, 'post')
}


/**
 * 测试列表
 */
export function testList(data) {
  let url = `/api/v1/course/exam/list/${data.courseId}`
  return commonsAjax(url, data, 'get')
}


/**
 * 测试成绩
 */
export function testMark(data) {
  let url = `/api/v1/course/exam/submit/list/${data.courseId}/${data.examId}`
  return commonsAjax(url, '', 'get')
}

/**
 * 测试结果
 */
export function testRes(data) {
  let url = `/api/v1/course/exam/submit/item/${data.examId}`
  return commonsAjax(url, '', 'get')
}


/**
 * 成绩详情
 */
export function markDetail(data) {
  let url = `/api/v1/course/exam/submit/detail/${data.examId}/${data.examSubmissionId}`
  return commonsAjax(url, '', 'get')
}


/**
 * 成绩详情
 */
export function markStudentInfo(data) {
  let url = `/api/v1/course/${data.courseId}/student/${data.userId}`
  return commonsAjax(url, '', 'get')
}



/**
 * 笔记列表
 */
export function noteList(data) {
  let url = `/api/v1/course/note/list/${data.courseId}`
  return commonsAjax(url, '', 'get')
}


/**
 * 笔记删除
 */
export function noteDelete(data) {
  let url = `/api/v1/course/note`
  return commonsAjax(url, data, 'delete')
}


/**
 * 头脑风暴
 */
export function storm(data) {
  let url = `/api/v1/course/storm/${data.stormId}`
  return commonsAjax(url, '', 'get')
}


/**
 * 头脑风暴删除
 */
export function stormDelete(data) {
  let url = `/api/v1/course/storm/${data.stormId}`
  return commonsAjax(url, '', 'delete')
}


/**
 * 头脑风暴
 */
export function interactStorm(data) {
  let url = `/api/v1/course/storm/${data.stormId}`
  return commonsAjax(url, data, 'get')
}


/**
 * 作业发起
 */
export function homeWorkSave(data) {
  let url = `/api/v1/course/homework`
  return commonsAjax(url, data, 'post')
}


/**
 * 作业详情
 */
export function homeWorkDetail(data) {
  let url = `/api/v1/course/homework/${data.homeworkId}`
  return commonsAjax(url, '', 'get')
}


/**
 * 作业列表
 */
export function homeWorkList(data) {
  let url = `/api/v1/course/homeworksubmission/${data.courseId}`
  return commonsAjax(url, '', 'get')
}


/**
 * 作业回答列表
 */
export function homeWorkAnswerList(data) {
  let url = `/api/v1/course/homeworksubmission/item/${data.courseId}/${data.homeworkId}`
  return commonsAjax(url, '', 'get')
}


export function homeWorkRepulse(data) {
  let url = `/api/v1/course/homeworksubmission/repulse/${data.homeworkSubmissionId}`
  return commonsAjax(url, '', 'get')
}

/**
 * 作业评分
 */
export function homeWorkScore(data) {
  let url = `/api/v1/course/homeworksubmission`
  return commonsAjax(url, data, 'post')
}


/**
 * 作业修改
 */
export function homeworkPut(data) {
  let url = `/api/v1/course/homework/${data.homeworkId}`
  return commonsAjax(url, data, 'put')
}


/**
 * 作业删除
 */
export function homeworkDelete(data) {
  let url = `/api/v1/course/homework/${data.homeworkId}`
  return commonsAjax(url, '', 'delete')
}


// ==========活动==========
/**
 * 活动列表
 */
export function interactList(data) {
  let url = `/api/v1/course/${data.courseId}/interactions`
  return commonsAjax(url, data, 'post')
}


/**
 * 活动状态更改
 */
export function interactStatus(data) {
  let url = `/api/v1/course/interaction/${data.interactionId}`
  return commonsAjax(url, data, 'put')
}


/**
 * 投票详情
 */
export function interactVote(data) {
  let url = `/api/v1/course/vote/${data.voteId}`
  return commonsAjax(url, data, 'get')
}

/**
 * 投票列表
 */
export function voteList(data) {
  let url = `/api/v1/course/${data.courseId}/interaction/vote/${data.classroomId}`
  return commonsAjax(url, data, 'get')
}



/**
 * 保存投票
 */
export function voteSave(data) {
  let url = `/api/v1/course/vote`
  return commonsAjax(url, data, 'post')
}

/**
 * 保存课堂投票
 */
export function classVoteSave(data) {
  let params = JSON.parse(JSON.stringify(data))
  params.quizOptions.forEach((element, i) => {
    params.quizOptions[i] = element.text
  });
  console.log(params)
  let url = `/api/v1/course/vote/classroom`
  return commonsAjax(url, params, 'post')
}

/**
 * 投票删除
 */
export function voteDelete(data) {
  let url = `/api/v1/course/vote/${data.voteId}`
  return commonsAjax(url, '', 'delete')
}


/**
 * 投票修改
 */
export function votePut(data) {
  let url = `/api/v1/course/vote/${data.voteId}`
  return commonsAjax(url, data, 'put')
}


/**
 * 视频列表
 */
export function videoList(data) {
  let url = `/api/v1/course/coursevideorecord/${data.courseId}`
  return commonsAjax(url, '', 'get')
}

/**
 * 视频详情
 */
export function videoDetail(data) {
  let url = `/api/v1/course/coursevideorecord/info/${data.itemId}`
  return commonsAjax(url, data, 'get')
}


/**
 * 头脑风暴发起
 */
export function stormSave(data) {
  let url = `/api/v1/course/storm`
  return commonsAjax(url, data, 'post')
}


/**
 * 头脑风暴详情
 */
export function interactBS(data) {
  let url = `/api/v1/course/storm/record/${data.stormId}`
  return commonsAjax(url, '', 'get')
}


/**
 * 头脑风暴加分
 */
export function stormAddScore(data) {
  let url = `/api/v1/course/storm/bonus/${data.recordId}`
  return commonsAjax(url, '', 'get')
}

/**
 * 头脑风暴修改
 */
export function stormPut(data) {
  let url = `/api/v1/course/storm/${data.stormId}`
  return commonsAjax(url, data, 'put')
}


/**
 * 测试详情
 */
export function interactExam(data) {
  let url = `/api/v1/course/exam/${data.examId}`
  return commonsAjax(url, '', 'get')
}

/**
 * 测试详情
 */
export function interactExamRes(data) {
  let url = `/api/v1/course/exam/interaction/list/${data.courseId}/${data.examId}`
  return commonsAjax(url, '', 'get')
}


/**
 * 测试修改
 */
export function examPut(data) {
  console.log(data)
  let url = `/api/v1/course/exam/${data.examId}`
  return commonsAjax(url, data, 'put')
}


/**
 * 测试删除
 */
export function examDelete(data) {
  let url = `/api/v1/course/exam/${data.examId}`
  return commonsAjax(url, '', 'delete')
}

// ========课程附件=========
/**
 * 新增附件实例
 */
export function assetCreate(data) {
  let url = `/api/v1/course/asset`
  return commonsAjax(url, data, 'post')
}


// =========成绩===========
/**
 * 成绩列表
 */
export function scoreList(data) {
  let url = `/api/v1/course/coursescore/${data.courseId}`
  return commonsAjax(url, data, 'get')
}


/**
 * 成绩权重
 */
export function scoreRight(data) {
  let url = `/api/v1/course/coursescore/set/${data.courseId}`
  return commonsAjax(url, '', 'get')
}


/**
 * 线下成绩模板
 */
export function scoreModel() {
  let url = `/api/v1/course/score/excel`
  return commonsAjax(url, '', 'get', {responseType: 'blob'})
}


/**
 * 上传成绩模板
 */
export function scoreUpload(data) {
  console.log(data)
  let url = `/api/v1/course/${data.get('courseId')}/score/excel`
  // let url = `/api/v1/course/${data.get('courseId')}/score/excel`
  return commonsAjax(url, data, 'post')
}


/**
 * 确认上传
 */
export function scoreModify(data) {
  console.log(data)
  // let url = `/api/v1/sys/course/0608367675f54267aa6960fd0557cc1b/score/excel`
  let url = `/api/v1/course/${data.courseId}/score/excel`
  return commonsAjax(url, '', 'put')
}


/**
 * 课程消息列表
 */
export function courseMessage(data) {
  let url = `/api/v1/course/${data.courseId}/message`
  return commonsAjax(url, '', 'get')
}


/**
 * 课程消息新增
 */
export function courseMsgAdd(data) {
  let url = `/api/v1/course/message/course`
  return commonsAjax(url, data, 'post')
}


/**
 * 查询有无进行中的课堂
 */
export function classingInfo(data) {
  let url = `/api/v1/course/classroom/${data.courseId}/1`
  return commonsAjax(url, '', 'get')
}

/**
 * 结束课堂
 */
export function classOver(data) {
  let url = `/api/v1/course/classroom/${data.classroomId}`
  return commonsAjax(url, data, 'put')
}

/**
 * 保存课堂
 */
export function classSave(data) {
  let url = `/api/v1/course/classroom/${data.courseId}`
  return commonsAjax(url, data, 'post')
}


/**
 * 课堂章节列表
 */
export function classChapter(data) {
  let url = `/api/v1/classroom/course/chapter/list/${data.courseId}`
  return commonsAjax(url, '', 'get')
}



/**
 * 课堂小项
 */
export function classItem(data) {
  let url = `/api/v1/course/chapter/section/${data.sectionId}/item/resources`
  return commonsAjax(url, '', 'get')
}


/**
 * 课堂测试
 */
export function classTest(data) {
  let url = `/api/v1/classroom/course/chapter/exams`
  return commonsAjax(url, data, 'post')
}

/**
 * 课堂保存测试
 */
export function classTestSave(data) {
  let url = `/api/v1/classroom/course/exam`
  return commonsAjax(url, data, 'post')
}


/**
 * 课堂头脑风暴列表
 */
export function classStromeGet(data) {
  let url = `/api/v1/course/${data.courseId}/interaction/storm/${data.classroomId}`
  return commonsAjax(url, data, 'get')
}


/**
 * 课堂保存头脑风暴
 */
export function classStromeSave(data) {
  let url = `/api/v1/course/interaction/storm/classroom`
  return commonsAjax(url, data, 'post')
}

/**
 * 课堂已结束测试结果
 */
export function classTestRes(data) {
  let url = `/api/v1/classroom/course/exam/${data.examId}/statics`
  return commonsAjax(url, data, 'post')
}
/**
 * 课堂小结
 */
export function classRoomData(data) {
  // let url = `/api/v1/course/classroom/${data.classroomId}/statics`
  let url = `/api/v1/course/classroom/${data.classroomId}/statics`
  return commonsAjax(url, data, 'post')
}

// =======讨论======
/**
 * 讨论列表
 */
export function discussGet(data) {
  let url = `/api/v1/study/${data.courseId}/discussion/page`
  return commonsAjax(url, data, 'get')
}
//======长连接签到相关w
/**
 * 保存签到
 */
export function saveSign(data) {
  let url = `/api/v1/course/sign`
  return commonsAjax(url, data, 'post')
}
/**
 * 获取签到用户信息列表
 */
export function signList(data) {
  let url = `/api/v1/course/sign/${data.signId}/page`
  return commonsAjax(url, data.data, 'post')
}
/**
 * 老师修改签到
 */
export function changeSign(data) {
  let url = `/api/v1/course/sign`
  return commonsAjax(url, data, 'put')
}

/**
 * 讨论详情页主题
 */
export function discussIssue(data) {
  let url = `/api/v1/study/${data.discussId}/discussion`
  return commonsAjax(url, '', 'get')
}


/**
 * 讨论详情页主题
 */
export function discussReply(data) {
  let url = `/api/v1/study/discussion/reply/list/${data.discussId}`
  return commonsAjax(url, '', 'get')
}

/**
 * 发送讨论
 */
export function discussPost(data) {
  let url = `/api/v1/study/discussion/save/reply`
  return commonsAjax(url, data, 'post')
}


// =====评价=====
/** 
* 评价列表
*/
export function evaluatePage(data) {
  let url = `/api/v1/tenant/evaluate/page`
  return commonsAjax(url, data, 'get')
}

/** 
* 具体课程下的评价
*/
export function evaluateDetail(data) {
  let url = `/api/v1/tenant/evaluate/${data.courseId}/page`
  return commonsAjax(url, '', 'get')
}


/** 
* 刪除评价
*/
export function evaluateDelete(data) {
  let url = `/api/v1/study/courseevaluate`
  return commonsAjax(url, data, 'delete')
}


/** 
* 刷新学习中心数据
*/
export function updateLearnData(data) {
  let url = `/api/v1/study/refresh`
  return commonsAjax(url, data, 'post')
}