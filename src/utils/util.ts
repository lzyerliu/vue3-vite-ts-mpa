
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
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    // @ts-ignore
    function(m: any, key: string, value: string) {
      vars[key] = <string>value
    }
  );
  return vars
 }

export {
  getUrlQueryParam,
  getUrlVars
}
