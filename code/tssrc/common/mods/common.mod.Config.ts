namespace common {
    export namespace mod {
        export interface Data_Game_Package_Item {
            kind_id: number,
            name: string,
            rule: string, //创建面板
            package_key: string,
        }

        export enum SHARE_TYPE {
            TEAHOUSE_LOBBY,
            TEAHOUSE_RECORD,
            LOBBY_RECORD,
            LOBBY,
        }

        export interface Data_Game_Package_RichItem {
            kind_id: number,
            name: string,
            package_name: string,
            package_type?: string,
            icon: string,
        }

        export interface Data_Game_Package_Base {
            package_key: string,
            package_name: string,
            package_type?: string,
            icon: string,
            game_names?: string
        }

        export interface Data_Game_Package extends Data_Game_Package_Base {
            version?: string,
            games: Array<Data_Game_Package_Item>
        }

        export class Config {
            //static ConfigUrl = "http://121.43.54.124:8006";// 镜像线专门给第三方测试用的
            static ConfigUrl = "http://apiyxdq.kaayou.com";// "http://apiyxdq.kaayou.com";//http://203.107.40.117:8004
            static HttpSchema = "http://";
            static HttpsSchema = "http://";
            static DownloadUrl = `/api/package/getOSSZip?type={keyname}&engine=2`;
            static CheckUpdateUrl = `/api/package/getVersion?a={action}&type={type}&engine=2`;
            static isLoginEncryp = true;
            static async LoadAppConfig() {
                kaayou.addLog("开始从服务端获取客户端配置");
                kaayou.emit("common", "ui::Loading::Show", { msg: "信息加载中", time: 1 });
                let localVer: string = kaayou.PlatformMgr.getInstance().sys.GetLocalVersionName();
                let platform: number = 1;
                if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
                    platform = 2;
                }
                let temp = {
                    "data": { ver: localVer, platform: platform },
                    "time": new Date().getTime(),
                    "encrypt": true,
                    "sign": "",
                }
                if (temp.encrypt) temp.data = kaayou.AES.encryptPHP(JSON.stringify(temp.data));
                let postUrl = Config.ConfigUrl + "/api/configure/getClientConfig";
                let res: any = await kaayou.Http.POST(postUrl, { msgdata: JSON.stringify(temp) }, null, null, true);
                kaayou.emit("common", "ui::Loading::Hide");
                Config.ParseConfig(res);
            }

            static async LoadLocalAppConf() {
                return new Promise(async function (resolve, reject) {
                    let cof = kaayou.PlatformMgr.getInstance().sys.GetLocalAppConfig();
                    return resolve(cof);
                });
            }

            static AppConfig: Ka_APP_CONFIG = null;
            static GetAppConfig() {
                return Config.AppConfig;
            }

            static async ParseConfig(jstr: string) {
                if (!jstr) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "获取配置项失败！" });
                    kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "获取配置项失败！" });
                    return;
                }
                let msg: Ka_MSG_PHP_RES = JSON.parse(jstr);
                if (!msg) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "解析配置项失败！" });
                    kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "解析配置项失败！" });
                    return;
                }
                if (msg.code != 0) {
                    console.log({ msg: msg.msg || "获取配置项失败！" });
                    kaayou.emit('common', 'ui::Toast::Show', { msg: msg.msg || "获取配置项失败！" });
                    kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "获取配置项失败！" });
                    return;
                }
                kaayou.addLog("获取配置成功！");
                kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "获取配置成功！", code: -1 });
                var appconfig: any = await Config.LoadLocalAppConf();
                let clientConfig: Ka_APP_CONFIG = {};

                let jsonCf = { "btnShow": 1, "shares": 1, "shareUrl": 1, "AppVersion": 1, "SuggestAppVersion": 1, "gps": 1, 'feature': 1, 'kfinfo': 1, "isActivity": 1 };
                for (var i = 0; i < msg.data.length; i++) {
                    let kname = msg.data[i]["bolt"];
                    clientConfig[kname] = msg.data[i]["val"];

                    if (jsonCf[kname]) {
                        try {
                            clientConfig[kname] = JSON.parse(msg.data[i]["val"]);
                        } catch (e) {
                            kaayou.emit('common', 'ui::Toast::Show', { msg: "配置项" + kname + "格式错误，请联系GM！" });
                            return;
                        }
                    }
                }
                
                if (clientConfig["AppVersion"] && clientConfig["AppVersion"].login_url) {
                    let [_ip, _port] = clientConfig["AppVersion"].login_url.split(':');
                    //lw190903连特定服务端测试时使用
                    let debugLoginIp = cc.sys.localStorage.getItem("debugLoginUrl");
                    if (!!debugLoginIp && debugLoginIp.indexOf(':') > -1) [_ip, _port] = debugLoginIp.split(':');
                    //登录地址获取
                    if (!cc.sys.isNative) {
                        clientConfig.loginUrl = common.mod.Config.HttpSchema + (kaayou.Http.GetRequest(location.search)['ip'] || _ip) + ":" + (kaayou.Http.GetRequest(location.search)['port'] || _port);
                    } else {
                        if (appconfig) {
                            if (appconfig.ip && appconfig.port) {
                                _ip = appconfig.ip;
                                _port = appconfig.ip;
                            }
                        }
                        clientConfig.loginUrl = common.mod.Config.HttpSchema + (_ip) + ":" + (_port);
                    }
                    clientConfig.payurl = clientConfig["AppVersion"].product_url;
                    clientConfig.diamond_url = clientConfig["AppVersion"].diamond_url;
                }
                //设置登录地址
                clientConfig.loginUrl = clientConfig.loginUrl;

                clientConfig.partnerUrl = "http://to.douqi.com/index/index";
                //设置回放url
                clientConfig.recordUrl = clientConfig.loginUrl;

                //格式化AppConfig
                Config.AppConfig = {};
                for (var x in clientConfig) {
                    Config.AppConfig[x] = clientConfig[x];
                }

                //判断是否要强更
                let bUpdateApp = await Update.UpdateApp();
                if (bUpdateApp) return;
                if (Config.AppConfig.feature && Config.AppConfig.feature.ho) {
                    //判断是否要热更新
                    Update.UpdateLobby(function () {
                        if (!lodash.isEmpty(Config.AppConfig) && !lodash.isEmpty(Config.AppConfig.btnShow)) {
                            try {
                                kaayou.emit("common", "Config::Update");
                            } catch (err) {

                            }
                        }
                    });
                } else {
                    kaayou.emit("common", "Config::Update");
                }
                kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "整体检查执行完毕" });
            }
        }
    }
}