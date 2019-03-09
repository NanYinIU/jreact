// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
// 在localStroage中可以将antd-pro-authority设置为数组或者是字符串 格式大概为 'adming','user'
  return authority || ['admin'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}

export function setHeader(header){
  return localStorage.setItem('Authorization',header);
}

export function getHeader(){
  const auth = localStorage.getItem('Authorization');
  let header = {};
  if(auth){
    header = {'Authorization':auth};
  }
  return header;
}