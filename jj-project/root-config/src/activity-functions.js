// 单个应用是否加载
function frame(location) {
  return true
}

function gcjs(location) {
  return location.pathname.startsWith('/gcjs')
}

function ghjh(location) {
  return location.pathname.startsWith('/ghjh')
}

export default {
  frame,
  gcjs,
  ghjh
}
