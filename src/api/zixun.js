import {
  commonsAjax
} from '../utils/requery'

/**
 * 获取标签
 */
export function getTags(data) {
  return commonsAjax('/api/v1/tag/topic', '', 'get')
}

/**
 * 创建话题
 */
export function addTopic(data) {
  return commonsAjax('/api/v1/topic', data, 'put')
}

/**
 * 获取所有话题
 */
export function getAllTopic(data) {
  return commonsAjax('/api/v1/topic/generator', '', 'get')
}


/**
 * ID获取话题标题
 */
export function getTopicTitle(data) {
  return commonsAjax(`/api/v1/topic/${data.topicId}`, '', 'get')
}

/**
 * ID获取话题详情
 */
export function getTopicDetail(data) {
  return commonsAjax(`/api/v1/topic/${data.topicId}/node`, '', 'get')
}

/**
 * 保存内容
 */
export function saveContent(data) {
  return commonsAjax(`/api/v1/topic/node`, data, 'post')
}

/**
 * 修改话题
 */
export function updateTopic(data) {
  return commonsAjax(`/api/v1/topic`, data, 'post')
}

/**
 * 删除话题
 */
export function delTopic(data) {
  return commonsAjax(`/api/v1/topic/${data}`, '', 'delete')
}