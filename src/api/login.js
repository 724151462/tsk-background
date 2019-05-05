import { commonsAjax } from '@/utils/requery'

/**
 * 刷新Token
 * */
export function reToken (data) {
  return commonsAjax(`/api/v1/token/accessToken/`, data, 'get')
}

/**
 * 获取租户列表用于登录
 * */
export function getTenant () {
  return commonsAjax('/api/v1/login/tenant', '', 'get')
}

/**
 * 登陆
 * */
export function logins (data) {
  return commonsAjax(`/api/v1/wxx/user/login/admin`, data, 'post')
}

/**
 *退出登陆
 **/
export function logout (data) {
  return commonsAjax(`/api/v1/sys/logout`, data, 'post')
}

/**
 * 登陆
 * */
export function loginDebug (data) {
  return commonsAjax(`/api/v1/sys/login/debug`, data, 'post')
}

/**
 * 菜单
 * */
export function menuList (data) {
  return commonsAjax(`/api/v1/sys/user/menu/list`, '', 'get')
}
