
const _import = require('@/router/_import_' + process.env.NODE_ENV)
export default (data) => {
  //这里之所以要重新遍历一下，是因为，通常我们动态路由的时候，是获取服务端数据，这个component属性是一个字符串，或者可能连字段名都是其他的key
  //所以这里要做一些转换
   return generaMenu(data)
}


function generaMenu(data){
  data.forEach((item)=>{
    if(item.list != null) {
      generaMenu(item.list)
    }
    try {
      item.component = _import(item.component)
    }
    catch(err){
      console.log(item)
    }
    item.children = item.list
    item.path = item.url
    delete item.list
    delete item.comment
    delete item.icon
    delete item.menuCode
    delete item.open
    delete item.orderNo
    delete item.parentName
    delete item.perms
    delete item.type

  })
  return data
}
