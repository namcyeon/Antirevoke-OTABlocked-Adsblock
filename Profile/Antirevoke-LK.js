const DEBUG = "PROXY 127.0.0.1:8423";
const PROXY = "PROXY 127.0.0.1:80";
let DIRECT = "DIRECT";
const blacklist = {"appldnld.apple.com":1,"appldnld.apple.com.akadns.net":1,"appldnld.g.aaplimg.com":1,"mesu.apple.com":1,"mesu-cdn.apple.com.akadns.net":1,"mesu-cdn.origin-apple.com.akadns.net":1,"mesu.g.aaplimg.com":1,"ads.mopub.com":1,"api.getrocketapp.io":1,"mesu.apple.com":1,"ocsp.int-x3.letsencrypt.org":1,"gdmf.apple.com":1,"gdmf.apple.com":1,"gdmf.apple.com.akadns.net":1,"ocsp.apple.com":1};
function PingThor(host, port, pong) {
  let started = new Date().getTime();
  let http = new XMLHttpRequest();
  http.open("GET", "http://" + host + ":" + port, /*async*/true);
  http.timeout = 10;
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      let ended = new Date().getTime();
      if (ended - started > 20)
        pong(-1)
      else
        pong(1);
    } else {
    }
  };
  try {
    http.send(null);
  } catch(exception) {
  }
}
function FindProxyForURL(url, host) {
  host = host.toLowerCase();
  // PingThor('127.0.0.1', 8423, function(pong) {
  //   if (pong > 0)
  //     DIRECT = DEBUG;
  //   if (blacklist[host]) {
  //     return PROXY;
  //   }
  //   return DIRECT;
  // });
  if (blacklist[host]) {
    return PROXY;
  }
  return DIRECT;
}