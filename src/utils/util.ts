
/**
 * get url 查询参数
 */
 const getUrlQueryParam = (name: string) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r !== null) {
    return decodeURI(r[2])
  }
  return ''
}

/**
 * url中指定参数的值(含带hash)
 * @returns 
 */
const getUrlVars = () => {
  let vars: {[key: string]:any} = {}
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    // @ts-ignore
    function(m: any, key: string, value: string) {
      vars[key] = <string>value
    }
  );
  return vars
}

/**
 * android终端
 * @returns 
 */
const isAndroid = () => {
  var u = navigator.userAgent
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Linux') > -1
}

/**
 * ios终端
 */
const isIos = () => {
  let u = navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
/**
 * 浏览器环境
 * @returns
 */
const browserEnv = () => {
  let u = navigator.userAgent
  let browser = {
    QQ: /QQ\//.test(u),
    qq: /qq\//.test(u),
    MicroMessenger: u.indexOf('MicroMessenger') > -1 || u.indexOf('micromessenger') > -1,
    MQQBrowser: u.indexOf('MQQBrowser') > -1,
    Weibo: u.indexOf('Weibo') > -1,
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    iPhone: u.indexOf('iPhone') > -1,
    iPad: u.indexOf('iPad') > -1,
    iPod: u.indexOf('iPod') > -1,
    Chrome: u.indexOf('Chrome') > -1
  }
  return browser
}

export {
  getUrlQueryParam,
  getUrlVars,
  isAndroid,
  isIos,
  browserEnv
}
