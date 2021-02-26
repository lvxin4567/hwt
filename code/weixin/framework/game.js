require('libs/weapp-adapter-min');
window.DOMParser = require('libs/xmldom/dom-parser').DOMParser

require("wdk")
require('game.min');
require("./src/kaayoulibs.module");

var absPath = "20200723/lobby.zip"
var gamePath = "20200723/dydg.zip"

var config = window.WXJSConfig = {
  openTest: false,
  forceDownload: false,
  currentVersion: "1.0.4",
  appkey: "wx636a66593816f45f", //小程序 appId
  midasID: "", //米大师分配的offer_id
  midasKey: "", //米大师密钥
  gameArea: "dydg",
  sdb: 1,
  zipPath: "https://d-oss.heeyou.cn/dydg/" + absPath,
  gamePath: "https://d-oss.heeyou.cn/dydg/" + gamePath,
}

if (config.openTest === true) {
  config.zipPath = "https://testupdate.kaayou.cn/xyy_qichun/dydg/" + absPath;
  config.gamePath = "https://testupdate.kaayou.cn/xyy_qichun/dydg/" + gamePath;
  window.ConfigUrl = "https://testxcx1.heeyou.cn";
} else if (config.openTest === false)
  window.ConfigUrl = "https://apiyxxyy.heeyou.cn"


cc.sys.isWeChat = true;

// 这里需要先加载微信脚本，不然 window 对象会报错
window.REMOTE_SERVER_ROOT = WXJSBridge.file.path; //远程服务器地址

window.REMOTE_LOCAL_TYPE = [""] //本地读取的类型

window.REMOTE_LOCAL_ALLOW_PATH = ["src"] //本地允许的文件夹

var version = wx.getStorageSync("version");
if (version !== config.currentVersion) {
  if (WXJSBridge.file.remove()) {
    console.log('清除本地缓存数据')
  } else {
    config.forceDownload = true
    console.log('清除本地缓存数据失败')
  }
  wx.setStorageSync("version", config.currentVersion)
}

WXJSBridge.file.readLocalFile("res/BlackList.txt")
WXJSBridge.file.readLocalFile("res/Default.png")
WXJSBridge.file.readLocalFile("project.json")

require("boot")



wx.showShareMenu({
  success: function () {

    wx.onShareAppMessage(function () {
      return {
        imageUrlId: "yQHw3i-iRpCFBJbwvYqXdA",
        imageUrl: "https://mmocgame.qpic.cn/wechatgame/NbzesCR54FlNibHlPhdoRDjOc7UdzP7bVkky6n6U3wxZBcuzCXW1IwNyRvmI8KXVx/0"
      }
    })

  }
})