export function HttpString(s) {
  //var reg = /(https:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
  const reg = /(https?|http):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
  s = s.match(reg);
  return(s)
}

export function getDomain(url){
  let urlReg=/https:\/\/([^]+)/i;
  let domain = url.match(urlReg);
  if (domain === null) {
    urlReg=/http:\/\/([^]+)/i;
    domain = url.match(urlReg);
    return ((domain != null && domain.length>0)?domain[0]:"");
  } else {
    return ((domain != null && domain.length>0)?domain[0]:"");
  }

}