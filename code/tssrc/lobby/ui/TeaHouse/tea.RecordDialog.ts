//对局详情+大赢家详情
namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;


    export class tea_RecordDialogMgr {
        static __INS__: tea_RecordDialogMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_RecordDialogMgr.__INS__ == null) {
                tea_RecordDialogMgr.__INS__ = new tea_RecordDialogMgr();
                tea_RecordDialogMgr.__INS__.init();
                tea_RecordDialogMgr.__INS__._zOrder = _zOrder
            }
            return tea_RecordDialogMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog: RecordDialog = null

        init() {
            let self = this;
            this.__selfDialog = null;


            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
                if (!e.data) {
                    return;
                }
                self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::RecordDialog::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::RecordDialog::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new RecordDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog, this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }
    }


    
    class floorListItem extends kaayou.Block implements common.IPullListCell {
        _index = -1;
        setIndex(index) {
            this._index = index;
        }
        getIndex() {
            return this._index;
        }
        _data: Array<number> = null;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.reset();
        }


        reset() {
            for (let i = 0; i < 8; i++) {
                let data_label = <ccui.Text>(this.node.getChildren()[i]);
                data_label.setString("");
            }
        }

        setInfo(data: Array<number>) {
            if (lodash.eq(this._data, data)) { return; }
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            this.reset();
            for (let i = 0; i < data.length; i++) {
                let data_label = <ccui.Text>(self.node.getChildren()[i]);
                if (i == 0) {
                    data_label.setString("" + data[i] + "楼");
                    continue;
                }
                data_label.setString("" + data[i]);
            }
        }
    }

    class floorList {

        
        lyTotalCard: ccui.Layout = null;   //房卡消耗
        scr_business: common.PullList = null; //成员列表
        totle_Layout: ccui.Layout = null;
        date_layout: ccui.Layout = null;
        //获取战绩列表数据 
        doGetBusinessList() {
            kaayou.emit("tea", 'mod::Record::GetBusinessdList');
        }
        _page: cc.Node = null;
        _index = -1;
        setIndex(index) {
            this._index = index;
            return this;
        }
        getIndex() {
            return this._index;
        }
        onSubpageChange(e: kaayou.Event) {
            let _data = e.data;
            let { index } = _data;
            if (index == this.getIndex()) {
                if (this._page.isVisible()) {

                } else {
                    this.reset();
                }
                this._page.setVisible(true);
            } else {
                this._page.setVisible(false);
            }
        }
        _isInitPull = false;
        reset() {
            if (false == this._isInitPull) {
                this._isInitPull = true;
                this.scr_business.initPullEnv();
            }
            this.scr_business.getAdpter().datas = [];
            this.scr_business.refresh();
            this.doGetBusinessList();
        }
        
        //初始化成员列表页面
        initWidthNode(page: cc.Node, cellMod: ccui.Widget) {

            let self = this;
            this._page = page;

            let ctrName = "teaRC"
            let subpageChangeEventName = "ui::record::SubDialogPageChange";
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);
            // this.lyTotalCard = ccui.helper.seekWidgetByName(<ccui.Widget>page, "lyTotalCard");
            this.totle_Layout = ccui.helper.seekWidgetByName(<ccui.Widget>page, "bg_tf");
            this.date_layout = ccui.helper.seekWidgetByName(<ccui.Widget>page, "bg_th");
            this.scr_business = new common.PullList();
            // this.scroll_member._debugRect = true;
            this.scr_business.setSpacingY(8);
            this.scr_business.initWithNode(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>page, "list"));

            this.scr_business.setFootDoingText("上拉刷新");
            this.scr_business.setFootDidFinishText("松开刷新");
            this.scr_business.setFootFinishText("正在刷新");
            this.scr_business.setAdpter({
                getCell: () => {
                    let v = new floorListItem;
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });

            this.scr_business.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetBusinessList();
                }, 500);

            }, this);
            this.scr_business.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetBusinessList();
                }, 500);
            }, this);
             
            kaayou.getController('tea').on('ui::Record::updateBusinessList', function (e: kaayou.Event) {
                let result: { data: ITH_RECORD_BUSS_RES, update: boolean } = e.data
                if (result && result.data) {
                    let data = result.data;
                    if (result.update) {

                        for (let i = 0; i < data.timeArr.length; i++) {
                            let data_label = <ccui.Text>(self.date_layout.getChildren()[i+1]);
                            data_label.setString(Date.format(data.timeArr[i] * 1000, "MM-dd"));

                            let totalStr = `${data.totalArr[i]}\n     \n${data.totalCard[i]}`
                            let totle_label = <ccui.Text>(self.totle_Layout.getChildren()[i + 1]);
                                totle_label.setString(totalStr);
                            // let lbCard=<ccui.Text>(self.lyTotalCard.getChildren()[i+1]);
                            // lbCard.setString(""+data.totalCard[i]);
                        }

                        self.scr_business.getAdpter().datas = lodash.clone(data.itemArr || []);
                    }
                } else {
                    self.scr_business.getAdpter().datas = [];
                }
                self.scr_business.refresh();
            }, this, 10);
        }


    }



    class bigWinListItem extends kaayou.Block implements common.IPullListCell {
        constructor() {
            super();
        }
        _index = -1;
        setIndex(index) {
            this._index = index;
            this.floor.setString(index+1);
        }
        getIndex() {
            return this._index;
        }

        initWithNode(node: ccui.Widget) {
            
            super.initWithNode(node);
            let self = this;
            this.head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"head")
            this.lb_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"lb_name")
            this.lb_uid = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"lb_uid")
            this.lb_round = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"lb_round")
            this.floor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"floor")
            this.btn_clean = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"Button_7");
            let hid = tea.mod.__teaHouseInfo.hid
            this.btn_clean.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if(!this._data)return;

                let options = {
                    title: "",
                    msg: "是否清空【{name}】的大赢家次数？".format({ name: self._data.uname }),
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea",'mod::Record::ClearBigWin',{uid: this._data.uid, recordtype: 0,hid})
                            }.bind(self),
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                //return false;
                            }.bind(self),
                            colorType: 'blue'
                        }
                    ]
                }

                kaayou.emit("common", "ui::Dialog::Show", options);
                    
            },this);

            kaayou.getController('tea').on("ui::BigWin::Clear", function (e: kaayou.Event) {
                if (!self._data) return;
                if (e.data.uid == self._data.uid) {
                    self._data.recordtimes = 0;
                    self.lb_round.setString("大赢家次数：" + self._data.recordtimes.toString());
                }
            }, this, 10);

            kaayou.getController('tea').on("ui::BigWin::ClearAll", function (e: kaayou.Event) {
                if (!!self._data) self._data.recordtimes = 0;
                self.lb_round.setString("大赢家次数：0");
            }, this, 10);


            this.reset();
        }

        head:ccui.ImageView;
        lb_name:ccui.Text;
        lb_uid:ccui.Text;
        lb_round:ccui.Text;
        floor:ccui.Text;
        btn_clean:ccui.Button;
        
        reset() {
            this.head.setVisible(false);
            this.lb_name.setString("");
            this.lb_uid.setString("");
            this.lb_round.setString("");
            this.btn_clean.setVisible(false);
        }

        _data = null;
        setInfo(data) {
            if (lodash.eq(this._data, data)) { return; }
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            this.lb_name.setString(kaayou.Identify.nickNameSubByLength(this._data.uname, 8, 5));
            this.lb_uid.setString("ID:" + this._data.uid.toString());

            this.lb_round.setString("大赢家次数：" + this._data.recordtimes.toString());
            this.head.setVisible(true);
            NetImage.setPlayerHead(this.head, this._data.uurl, this._data.ugender, (url) => {
                if (!self._data) return false;
                if (url !== self._data.uurl) {
                    return false;
                }
                return true;
            });
            this.btn_clean.setVisible(true);
        }
    }

    class bigWinList {
        btnClear: ccui.Button = null;
      
        list: common.PullList = null; //成员列表
     
        //获取战绩列表数据 
        GetBigWinList(clear) {
            kaayou.emit("tea", 'mod::Record::GetBigWinList', {
                // begin:self.iBegin,
                clear: clear,
                param: "",
                type: 0
            });
        }
        _page: cc.Node = null;
        _index = -1;
        setIndex(index) {
            this._index = index;
            return this;
        }
        getIndex() {
            return this._index;
        }
        onSubpageChange(e: kaayou.Event) {
            let _data = e.data;
            let { index } = _data;
            if (index == this.getIndex()) {
                if (this._page.isVisible()) {

                } else {
                    this.reset();
                }
                this._page.setVisible(true);
            } else {
                this._page.setVisible(false);
            }
        }
        _isInitPull = false;
        reset() {
            if (false == this._isInitPull) {
                this._isInitPull = true;
                this.list.initPullEnv();
            }
            this.list.getAdpter().datas = [];
            this.list.refresh();
            this.GetBigWinList(true);
        }

        //初始化成员列表页面
        initWidthNode(page: cc.Node, cellMod: ccui.Widget) {

            let self = this;
            this._page = page;
            

            let ctrName = "teaRC"
            let subpageChangeEventName = "ui::record::SubDialogPageChange";
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);

            let hid = tea.mod.__teaHouseInfo.hid


            this.btnClear = ccui.helper.seekWidgetByName(<ccui.Widget>page, "btn_cleanAll")
            this.btnClear.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);

                let options = {
                    title: "",
                    msg: "是否清除所有大赢家数据？",
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea", 'mod::Record::ClearAllBigWin',{recordtype:0,hid});
                            }.bind(self),
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                //return false;
                            }.bind(self),
                            colorType: 'blue'
                        }
                    ]
                }

                kaayou.emit("common", "ui::Dialog::Show", options);

               
            },this);

            this.list = new common.PullList();
            // this.scroll_member._debugRect = true;
            this.list.setSpacingY(8);
            this.list.initWithNode(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>page, "list"));



            this.list.setFootDoingText("上拉刷新");
            this.list.setFootDidFinishText("松开刷新");
            this.list.setFootFinishText("正在刷新");
            this.list.setAdpter({
                getCell: () => {
                    let v = new bigWinListItem();
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });

            this.list.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.GetBigWinList(true);
                }, 500);

            }, this);
            this.list.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.GetBigWinList(false);
                }, 500);
            }, this);

            kaayou.getController('tea').on('ui::Record::updateBigWinList', function (e: kaayou.Event) {
                let result: { data, update: boolean } = e.data
                if (result && result.data) {
                    let data = result.data;
                    if (result.update) {
                        self.list.getAdpter().datas = lodash.clone(data || []);
                    }
                } else {
                    self.list.getAdpter().datas = [];
                }
                self.list.refresh();
            }, this, 10);
        }
    }



    class GameListItem extends kaayou.Block implements common.IPullListCell {
        constructor() {
            super();
        }
        _index = -1;
        setIndex(index) {
            this._index = index;
            this.floor.setString(index+1);
        }
        getIndex() {
            return this._index;
        }

        initWithNode(node: ccui.Widget) {
            
            super.initWithNode(node);
            let self = this;
            this.head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"head")
            this.lb_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"lb_name")
            this.lb_uid = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"lb_uid")
            this.lb_round = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"lb_round")
            this.floor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"floor")
            this.btn_clean = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"Button_7");
            let hid = tea.mod.__teaHouseInfo.hid
            this.btn_clean.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if(!this._data)return ;
                let options = {
                    title: "",
                    msg: "是否清空【{name}】的对局次数？".format({ name: self._data.uname }),
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea", 'mod::Record::ClearGameNumber',{uid: this._data.uid, recordtype: 1,hid})
                            }.bind(self),
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                //return false;
                            }.bind(self),
                            colorType: 'blue'
                        }
                    ]
                }

                kaayou.emit("common", "ui::Dialog::Show", options);

                    
            },this);

            kaayou.getController('tea').on("ui::GameNumber::Clear", function (e: kaayou.Event) {
                if (!self._data) return;
                if (e.data.uid == self._data.uid) {
                    self._data.recordtimes = 0;
                    self.lb_round.setString("对局次数：" + self._data.recordtimes.toString());
                }
            }, this, 10);

            kaayou.getController('tea').on("ui::GameNumber::ClearAll", function (e: kaayou.Event) {
                if (!!self._data) self._data.recordtimes = 0;
                self.lb_round.setString("对局次数：0");
            }, this, 10);


            this.reset();
        }

        head:ccui.ImageView;
        lb_name:ccui.Text;
        lb_uid:ccui.Text;
        lb_round:ccui.Text;
        floor:ccui.Text;
        btn_clean:ccui.Button;
        
        reset() {
            this.head.setVisible(false);
            this.lb_name.setString("");
            this.lb_uid.setString("");
            this.lb_round.setString("");
            this.btn_clean.setVisible(false);
        }

        _data = null;
        setInfo(data) {
            if (lodash.eq(this._data, data)) { return; }
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            this.lb_name.setString(kaayou.Identify.nickNameSubByLength(this._data.uname, 8, 5));
            this.lb_uid.setString("ID:" + this._data.uid.toString());

            this.lb_round.setString("对局次数：" + this._data.recordtimes.toString());
            this.head.setVisible(true);
            NetImage.setPlayerHead(this.head, this._data.uurl, this._data.ugender, (url) => {
                if (!self._data) return false;
                if (url !== self._data.uurl) {
                    return false;
                }
                return true;
            });
            this.btn_clean.setVisible(true);
        }
    }



    class GameList {
        btnClear: ccui.Button = null;
      
        list: common.PullList = null; //成员列表
     
        //获取战绩列表数据 
        doGetGameNumberList(clear) {
            kaayou.emit("tea", 'mod::Record::GetGameNumberList', {
                clear: clear,
                param: "",
                type: 1
            });
        }
        _page: cc.Node = null;
        _index = -1;
        setIndex(index) {
            this._index = index;
            return this;
        }
        getIndex() {
            return this._index;
        }
        onSubpageChange(e: kaayou.Event) {
            let _data = e.data;
            let { index } = _data;
            if (index == this.getIndex()) {
                if (this._page.isVisible()) {

                } else {
                    this.reset();
                }
                this._page.setVisible(true);
            } else {
                this._page.setVisible(false);
            }
        }
        _isInitPull = false;
        reset() {
            if (false == this._isInitPull) {
                this._isInitPull = true;
                this.list.initPullEnv();
            }
            this.list.getAdpter().datas = [];
            this.list.refresh();
            this.doGetGameNumberList(true);
        }

        //初始化成员列表页面
        initWidthNode(page: cc.Node, cellMod: ccui.Widget) {

            let self = this;
            this._page = page;
            
            let hid = tea.mod.__teaHouseInfo.hid

            let ctrName = "teaRC"
            let subpageChangeEventName = "ui::record::SubDialogPageChange";
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);




            this.btnClear = ccui.helper.seekWidgetByName(<ccui.Widget>page, "btn_cleanAll")
            this.btnClear.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);

                let options = {
                    title: "",
                    msg: "是否清除所有的对局次数？",
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea", 'mod::Record::ClearAllGameNumber',{recordtype:1,hid});
                            }.bind(self),
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                //return false;
                            }.bind(self),
                            colorType: 'blue'
                        }
                    ]
                }

                kaayou.emit("common", "ui::Dialog::Show", options);

            },this);

            this.list = new common.PullList();
            // this.scroll_member._debugRect = true;
            this.list.setSpacingY(8);
            this.list.initWithNode(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>page, "list"));

            this.list.setFootDoingText("上拉刷新");
            this.list.setFootDidFinishText("松开刷新");
            this.list.setFootFinishText("正在刷新");
            this.list.setAdpter({
                getCell: () => {
                    let v = new GameListItem();
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });

            this.list.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetGameNumberList(true);
                }, 500);

            }, this);
            this.list.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetGameNumberList(false);
                }, 500);
            }, this);

            kaayou.getController('tea').on('ui::Record::updateGameNumberList', function (e: kaayou.Event) {
                let result: { data: ITH_RECORD_BUSS_RES, update: boolean } = e.data
                if (result && result.data) {
                    let data = result.data;
                    if (result.update) {
                        self.list.getAdpter().datas = lodash.clone(data || []);
                    }
                } else {
                    self.list.getAdpter().datas = [];
                }
                self.list.refresh();
            }, this, 10);
        }


    }
    


    class RecordDialog extends kaayou.Layer {

        

        constructor() {
            super()
            this.initUI();
        }

        btnClose:ccui.Button;
        memberlist:ccui.Layout
        titleContainer:ccui.Layout
        initUI() {
            this.initWithccs(tea.res.TH_RecordDialog)
            
            this.memberlist = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"memberlist");
            this.titleContainer = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"titleContainer");

            this.btnClose = <ccui.Button>ccui.helper.seekWidgetByName(<ccui.Widget>this.node , "btnClose");
            this.btnClose.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.Hide();
            },this)

            this.initTopSelection();
            this.initListPanel();
            this.watchRole();
        }

        setTopSelect(){
            let houseinfo = tea.mod.__teaHouseInfo;
            this.onTeaHouseUpdateInfo(houseinfo);
        }

        watchRole(){
            let promission = tea.mod.House.getPromissionInstance();

            promission.watch("大赢家统计",(data)=>{
                setTimeout(() => {
                    this.setTopSelect();
                    this.setTopSelected(1)
                }, 16);
            })

            promission.watch("对局统计",(data)=>{
                setTimeout(() => {
                    this.setTopSelect();
                    this.setTopSelected(0)
                }, 16);
            })

        }

        unwatchRole(){
            let promission = tea.mod.House.getPromissionInstance();
        }

        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo) {

            
              // (<ccui.CheckBox>this._MenuGroup.getChildren()[4]).setVisible(!!(data.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_CARD));
            // (<ccui.CheckBox>this._MenuGroup.getChildren()[this.bigWinIndex]).setVisible(!!(data.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_WIN));
            // (<ccui.CheckBox>this._MenuGroup.getChildren()[6]).setVisible(!!(data.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY));


            if(!(data.urole == HouseMemberRole.OWNER || data.urole == HouseMemberRole.ADMIN)){
                this.node.setVisible(false);
                return ;
            }

            let po = [
                [],
                [213],
                [107,319],
                [0,213,426]
            ]

            let border = {
                left:"common_titile_bg_leftborder",
                none:"common_titile_bg_noborder",
                right:"common_titile_bg_rightborder",
                all:"common_titile_bg_fullborder"
            }
            

            let promission = tea.mod.House.getPromissionInstance();
         

            let seebigwin = /*!!(data.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_WIN) ||*/ promission.query("大赢家统计") === tea.mod.House.PERMISSION_TYPE.ESCALATION
            let seefloor = /*!!(data.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY) &&*/ data.urole == HouseMemberRole.OWNER
            let seeRecord = promission.query("对局统计") === tea.mod.House.PERMISSION_TYPE.ESCALATION || data.urole == HouseMemberRole.OWNER;
            let life = 3;
            life-=+!seebigwin;
            life-=+!seefloor;
            life-=+!seeRecord;

            if(life===0){
                this.node.setVisible(false)
                return ;
            }

            let child = <Array<any>>this.titleContainer.getChildren()
            lodash.forEach(child,v=>{
                v.setVisible(false);
            })
            if(life===3){
                child[0].loadTextureBackGround(border.left+".png", ccui.Widget.PLIST_TEXTURE);
                child[0].loadTextureBackGroundSelected(border.left+"_on.png", ccui.Widget.PLIST_TEXTURE);
                child[0].loadTextureFrontCross(border.left+"_on.png", ccui.Widget.PLIST_TEXTURE);
                child[1].loadTextureBackGround(border.none+".png", ccui.Widget.PLIST_TEXTURE);
                child[1].loadTextureBackGroundSelected(border.none+"_on.png", ccui.Widget.PLIST_TEXTURE);
                child[1].loadTextureFrontCross(border.none+"_on.png", ccui.Widget.PLIST_TEXTURE);
                child[2].loadTextureBackGround(border.right+".png", ccui.Widget.PLIST_TEXTURE);
                child[2].loadTextureBackGroundSelected(border.right+"_on.png", ccui.Widget.PLIST_TEXTURE);
                child[2].loadTextureFrontCross(border.right+"_on.png", ccui.Widget.PLIST_TEXTURE);

                po[life].forEach((v,i)=>{
                    child[i].x = v;
                });

            }else if(life===2){

                let lf = life;

                if(seeRecord){
                    
                    child[0].loadTextureBackGround(border.left+".png", ccui.Widget.PLIST_TEXTURE);
                    child[0].loadTextureBackGroundSelected(border.left+"_on.png", ccui.Widget.PLIST_TEXTURE);
                    child[0].loadTextureFrontCross(border.left+"_on.png", ccui.Widget.PLIST_TEXTURE);
                    lf--;
                }


                if(seebigwin){
                    
                    
                    child[1].loadTextureBackGround( (lf!=1? border.left:border.right)+".png", ccui.Widget.PLIST_TEXTURE);
                    child[1].loadTextureBackGroundSelected((lf!=1? border.left:border.right)+"_on.png", ccui.Widget.PLIST_TEXTURE);
                    child[1].loadTextureFrontCross((lf!=1? border.left:border.right)+"_on.png", ccui.Widget.PLIST_TEXTURE);
                    
                    lf--;
                }

                if(seefloor){
                    child[2].loadTextureBackGround(border.right+".png", ccui.Widget.PLIST_TEXTURE);
                    child[2].loadTextureBackGroundSelected(border.right+"_on.png", ccui.Widget.PLIST_TEXTURE);
                    child[2].loadTextureFrontCross(border.right+"_on.png", ccui.Widget.PLIST_TEXTURE);
                }
                
                po[life].forEach((v,i)=>{
                    child[i].x = v;
                })

            }else if(life===1){

                let o = 0;

                if(seebigwin)
                    o=1;

                child[o].loadTextureBackGround(border.all+"_on.png", ccui.Widget.PLIST_TEXTURE);
                child[o].loadTextureBackGroundSelected(border.all+"_on.png", ccui.Widget.PLIST_TEXTURE);
                child[o].loadTextureFrontCross(border.all+"_on.png", ccui.Widget.PLIST_TEXTURE);
                child[o].x = po[life][0]
            }

            child[0].setVisible(seeRecord)
            child[1].setVisible(seebigwin);
            child[2].setVisible(seefloor);

        }

        
        initListPanel() {
            
            let children = this.memberlist.getChildren();
            let item0:ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"panel_item0"); 
            let item1:ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"panel_item1"); 
            let item2:ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"panel_item2"); 

            children.forEach(v=>{
                v.setPosition(0,0);
                v.setVisible(false);
            });

            (new GameList).setIndex(0).initWidthNode(children[0],item0);
            (new bigWinList).setIndex(1).initWidthNode(children[1],item1);
            (new floorList).setIndex(2).initWidthNode(children[2],item2);

      

        }

        initSelect(){
            let promission = tea.mod.House.getPromissionInstance();
            if(promission.query("对局统计") === tea.mod.House.PERMISSION_TYPE.ESCALATION)
                this.setTopSelected(0)
            else if(promission.query("大赢家统计"))
                this.setTopSelected(1);
        }


        setTopSelected(index){
            
            let child = <Array<ccui.CheckBox>>this.titleContainer.getChildren()

            if(child[index].isVisible()===false)
                return ;


            child.forEach((it:ccui.CheckBox , i)=>{
                let label = <ccui.ImageView >it.getChildByName("label");
                let labelon = <ccui.ImageView >it.getChildByName("label_on");

                    label.setVisible(index!=i);
                    labelon.setVisible(index==i);
                    child[i].setSelected(index==i);
                
            })

            kaayou.emit("teaRC","ui::record::SubDialogPageChange",{index:index});

        }

        initTopSelection() {
            
            

            let titleContainer:ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"titleContainer");
            let child:any = titleContainer.getChildren()

            
            lodash.forEach(child,(item:ccui.CheckBox,index)=>{

                item.on(kaayou.CheckEvent.SELECTED,()=>{
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                        child.forEach((v:ccui.CheckBox,i)=>{
                            if(index==i){
                                this.setTopSelected(i)
                            }
                        })
                },this);


                item.on(kaayou.CheckEvent.UNSELECTED,()=>{
                    child.forEach((v:ccui.CheckBox,i)=>{
                        if(index==i){
                            v.setSelected(true);
                        }
                    })
            },this);


            })

        }


        clean(){
            let children = this.memberlist.getChildren();
            children.forEach(v=>{
                v.setVisible(false);
            })
        }
  
        Show(data) {
            this.node.setVisible(true);
            this.setTopSelect();
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: () => {
                    this.initSelect()
                }
            });
        }

        Hide() {
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this.node,
                    action:()=>{
                        this.clean();
                    }
                }
            )
        }
    }


   
}