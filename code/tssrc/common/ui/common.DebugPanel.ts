namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class DebugPanel extends kaayou.Layer {
        btnClear: ccui.Button = null;
        btnClose: ccui.Button = null;
        checkIndex: number = 0;
        contentPanel: ccui.Layout = null;
        isChecking: boolean = false;
        maskBg: cc.Layer = null;
        msg: string = "";
        packageUrl: string = "";
        result: number = -1;
        svPanel: ccui.ScrollView = null;
        msgLabel: ccui.Text = null;
        constructor() {
            super();
            this.initUI();
        }

        @BindEvent('common', 'ui::DebugPan00el::Hide')
        hide() {
            this.setVisible(false);
        }

        @doBindEvent
        initUI() {
            this.initWithccs(common.res.DebugPanel_json, true);
            let self = this;
            this.svPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "svPanel");
            this.svPanel.setPadding({ left: 10, spacingY: 10 });
            this.svPanel.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.svPanel.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.svPanel.setScrollBarEnabled(false);
            this.btnClear = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnClear");
            this.btnClear.setVisible(false);
            this.btnClear.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.msgLabel.setString("");
            }, this);
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnClose");
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                this.isChecking = false;
                self.hide();
            }, this);
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.msgLabel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "msgLabel");
            this.setVisible(false);
            this.maskBg.setVisible(false);
        }

        async check() {
            let self = this;
            this.isChecking = true;
            let postUrl: string = "";
            let res: any = null;
            switch (this.checkIndex) {
                case 0:
                    //getClientConfig
                    this.show({ msg: "正在检测是否能获取服务器配置...", code: -1, changeLine: false });
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
                    let postUrl = mod.Config.ConfigUrl + "/api/configure/getClientConfig";
                    let res: any = await kaayou.Http.POST(postUrl, { msgdata: JSON.stringify(temp) }, null, null, true);
                    this.show({ msg: "正常。", code: 0 });
                    break;
                case 1:
                    //getVersion
                    this.show({ msg: "正在检测是否能获取热更版本...", code: -1, changeLine: false });
                    postUrl = mod.Config.ConfigUrl + mod.Config.CheckUpdateUrl.format({ action: "version", type: "GameLobby" });
                    res = await kaayou.Http.GET(postUrl, null, false, false);
                    let oJson = JSON.parse(res);
                    this.packageUrl = oJson.packageUrl + "GameLobby.zip";
                    this.show({ msg: "正常。", code: 0 });
                    break;
                case 2:
                    //GameLobby.zip
                    this.show({ msg: "正在检测热更包大小...", code: -1, changeLine: false });
                    res = await kaayou.PlatformMgr.getInstance().sys.GetFileLength(this.packageUrl);
                    if (res == "-1") {
                        res = "失败";
                        self.show({ msg: res.toString(), code: -1 });
                    } else {
                        self.show({ msg: res.toString(), code: 0 });
                    }
                    break;
                case 3:
                    //getOSSZip
                    this.show({ msg: "正在检测是否能获取游戏包...", code: -1, changeLine: false });
                    postUrl = mod.Config.ConfigUrl + mod.Config.DownloadUrl.format({ keyname: "bmhm" })
                    res = await kaayou.Http.GET(postUrl, null, false, false);
                    this.show({ msg: "正常。", code: 0 });
                    break;
                case 4:
                    //bugly
                    this.show({ msg: "正在执行整体检测...", code: -1 });
                    common.mod.Config.LoadAppConfig();
                    break;
                case 5:
                    //bugly
                    this.show({ msg: "正在发送检测数据...", code: -1, changeLine: false });
                    setTimeout(() => {
                        kaayou.sendLog();
                        self.show({ msg: "完成。", code: 0 });
                    }, 1000);
                    break;
            }
        }

        //data.result=0就开始下一项检测
        @BindEvent('common', 'ui::DebugPanel::ShowMsg')
        ShowMsg(data: { msg: string, code?: number }) {
            if (data.code == undefined) data.code = 0;
            this.show({ msg: data.msg, code: data.code });
        }

        @BindEvent('common', 'ui::DebugPanel::Check')
        async startCheck() {
            let phoneBrand = kaayou.PlatformMgr.getInstance().sys.getPhoneBrand();
            this.msg = phoneBrand + "\n";
            let now = new Date(Date.now()).format("yyyy-MM-dd hh:mm:ss");
            this.msg += now + "\n";
            let res: any = await kaayou.Http.GET(mod.Config.ConfigUrl + "/api/ip/get", null, false, false);
            let ip = "未知";
            if (!!res) {
                let oRes=JSON.parse(res);
                if (oRes.code == 0) {
                    ip = oRes.data.ip;
                }
            }
            this.msg += "IP:" + ip + "\n";
            this.msg += "正在进行单项检测..." + "\n";
            this.msgLabel.setString(this.msg);
            this.checkIndex = 0;
            this.check();
        }

        @BindEvent('common', 'ui::DebugPanel::Show')
        show(data: { msg: string, code: number, changeLine?: boolean }) {
            if (!this.isChecking) return;
            if (!data) { return false; }
            if (!data.msg) { return false; }
            if (data.changeLine == undefined) data.changeLine = true;
            this.result = data.code;
            this.msg += data.msg;
            if (data.changeLine) this.msg += "\n";
            this.msgLabel.setString(this.msg);
            this.msgLabel.ignoreContentAdaptWithSize(true);

            this.svPanel.doChildrenLayout()
            this.svPanel.scrollToBottom(0, false)

            if (this.result == 0) {
                this.checkIndex++;
                this.check();
            }
            this.setVisible(true);
        }
    }
}