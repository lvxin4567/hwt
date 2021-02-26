namespace tea {


    export class tea_MergeUserPanelMgr {
        static __INS__: tea_MergeUserPanelMgr = null;
        static getInstance(zOrder: number) {
            if (tea_MergeUserPanelMgr.__INS__ == null) {
                tea_MergeUserPanelMgr.__INS__ = new tea_MergeUserPanelMgr();
                tea_MergeUserPanelMgr.__INS__.zOrder = zOrder;
                tea_MergeUserPanelMgr.__INS__.init();
            }
            return tea_MergeUserPanelMgr.__INS__;
        }
        zOrder: number = null;
        __selfPanel: SubMergeTeaPage = null;
        private _cache = {timer:null,queue:[],dialogQueue:[]}
        init() {
            let self = this;
            this.__selfPanel = null;

            cc.spriteFrameCache.addSpriteFrames(res.TH_MergeUser_plist);

            let isTeaHouse = ()=>{
                return kaayou.UIManager.getInstance().getCurRuningSceneName() === "TEAHOUSE"
            }


            let isLobby = ()=>{
                return kaayou.UIManager.getInstance().getCurRuningSceneName() === "LOBBY"
            }

            let  isHQ = ()=> {
                return tea.mod.__teaHouseInfo.urefhid !== 0
            }

            this._cache.timer = setTimeout(function(){
                
                if(isTeaHouse() && self._cache.queue.length){
                    self._cache.queue.forEach(function(fn){
                        fn();
                    })
                    self._cache.queue.splice(0,self._cache.queue.length)
                    clearTimeout(self._cache.timer)
                }

                self._cache.timer = setTimeout(arguments.callee,60);

            }, 60);



            
            // kaayou.getController('tea').on('ui::mergeUserPanel::show', function (e: kaayou.Event) {
            //     self.getPanel(true).Show()    
            // }, this);

            // kaayou.getController('tea').on('ui::mergeUserPanel::hide', function (e: kaayou.Event) {
            //     self.getPanel(false) && self.getPanel(false).Hide();
            // }, this);


            
            kaayou.getController("lobby").on("ws::Msg::housemergeok",function(e: kaayou.Event){
                let data = e.data;
                if(isTeaHouse() && data.hid===tea.mod.__teaHouseInfo.hid || data.msg)
                    kaayou.emit('common', 'ui::Dialog::Show', {
                        msg: data.msg || "收到错误消息!",
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    if(isTeaHouse()){
                                        kaayou.emit("tea", 'ui::TeaHouse::Quit');
                                        // self.getPanel(false) && self.getPanel(false).Hide();
                                    }

                                    if(isLobby()){
                                        kaayou.emit("tea", "mod::TeaHouse::doGetList")
                                    }

                                },
                                colorType: 'green'
                            },
                        ]

                    })

                self.updateTeaHouseShotCut(data);

            },this)


            kaayou.getController("lobby").on("ws::Msg::houserevokeok",function(e: kaayou.Event){
                let data = e.data;
                
                if(isTeaHouse() && data.hid===tea.mod.__teaHouseInfo.hid || data.msg)
                    kaayou.emit('common', 'ui::Dialog::Show', {
                        msg: data.msg || "收到错误消息!",
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                
                                    if(isTeaHouse()){
                                        // self.getPanel(false) && self.getPanel(false).Hide();
                                        kaayou.emit("tea", 'ui::TeaHouse::Quit');
                                    
                                    }

                                    if(isLobby()){
                                        kaayou.emit("tea", "mod::TeaHouse::doGetList")
                                    }
                                },
                                colorType: 'green'
                            },
                        ]

                    })
            },this)
            

            kaayou.getController("lobby").on("ws::Msg::housemerge_ntf", function(e: kaayou.Event){
                let data = e.data
                if(isTeaHouse()){
                    // let panel = self.getPanel(true)
                    self.HQRequest(data,function (){
                        // panel.renderHQRecord({hid:tea.mod.__teaHouseInfo.hid});
                        kaayou.emit("tea","ui::mregeUserPanel::updateList",{hid:tea.mod.__teaHouseInfo.hid});
                    })
                    // panel.renderHQRecord({hid:tea.mod.__teaHouseInfo.hid});
                    kaayou.emit("tea","ui::mregeUserPanel::updateList",{hid:tea.mod.__teaHouseInfo.hid});
                }
                else
                    self.HQRequest(data)
            }, this);

            
            // kaayou.getController("lobby").on("ws::Msg::housemergersp_ntf", function(e: kaayou.Event){
            //     let data = e.data
            //     if(isTeaHouse())
            //         self.getPanel(true).HQRequestResult(data);
            //     else
            //         self._cache.queue.push(function(){
            //             self.getPanel(true).HQRequestResult(data);
            //         }.bind(self))

            // }, this);
            
            //撤圈请求（解除合并请求）：houserevokereq
            kaayou.getController("lobby").on("ws::Msg::houserevoke_ntf",(e:kaayou.Event)=>{
                //改成全局推送
                let data = e.data
                if(isTeaHouse()){
                    // let panel = self.getPanel(true);
                    self.houserevokersp(data , function(isOK){
                        
                        if(isOK && isHQ()===false){
                            // panel.renderHQRecord({hid:tea.mod.__teaHouseInfo.hid});
                            kaayou.emit("tea","ui::mregeUserPanel::updateList",{hid:tea.mod.__teaHouseInfo.hid});
                        }
                        if(isOK===false){
                            // panel.renderHQRecord({hid:tea.mod.__teaHouseInfo.hid});
                            kaayou.emit("tea","ui::mregeUserPanel::updateList",{hid:tea.mod.__teaHouseInfo.hid});
                        }
                    });
                    // panel.renderHQRecord({hid:tea.mod.__teaHouseInfo.hid});
                    kaayou.emit("tea","ui::mregeUserPanel::updateList",{hid:tea.mod.__teaHouseInfo.hid});
                }else
                    self.houserevokersp(data)
                // else
                //     self._cache.queue.push(function(){
                //         self.getPanel(true).houserevokersp(data);
                //     }.bind(self))
                
            },this)

            //对方圈主收到请求推送：hhouserevokersp_ntf
            // kaayou.getController("lobby").on("ws::Msg::hhouserevokersp_ntf",(e:kaayou.Event)=>{
            //     let data = e.data
            //     if(isTeaHouse())
            //         self.getPanel(true).houserevokerspResult(e.data);
            //     else
            //         self._cache.queue.push(function(){
            //             self.getPanel(true).houserevokerspResult(data);
            //         }.bind(self))
                
            // },this)

            
            kaayou.getController("lobby").on("ws::Msg::housemergereqrevoke_ntf",function(e: kaayou.Event){
                if(isTeaHouse()){
                    // self.getPanel(true).housemergereqrevokeResult(e.data);
                    kaayou.emit("tea","ui::mregeUserPanel::updateList",{hid:tea.mod.__teaHouseInfo.hid});
                }
                self.cancelthids.push(e.data.thid);
      
                
            },this)


            kaayou.getController("lobby").on("ws::Msg::notify",(e:kaayou.Event)=>{
                kaayou.emit("tea","ui::mergeUserDialog::show" , {
                    keepalive:true,
                    type:tea_MergeUserDialoglMgr.MergeUserDialogType.QUAN_TIP,
                    text:e.data.msg
                })
                if(isTeaHouse()){
                    // self.getPanel(true).renderHQRecord({hid:tea.mod.__teaHouseInfo.hid});
                    kaayou.emit("tea","ui::mregeUserPanel::updateList",{hid:tea.mod.__teaHouseInfo.hid});
                }
            },this)

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new SubMergeTeaPage();
                // kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this.zOrder);
                // this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

        private cancelthids = []


        private HQRequest(data , opHandle?) {
            let {hid,thid} = data;
            let subData: {hid:Number
                thid:Number
                result:Boolean
                } = {hid:hid,thid:thid,result:false}
            // let self = this;

            let cancelthididx = this.cancelthids.indexOf(thid)
            if(cancelthididx!==-1)
                this.cancelthids.splice(cancelthididx,1)

            let submit = async (data,success?)=>{
                //合圈操作
                let info = await kaayou.sendMessage("lobby","housemergersp",data,"ws::Msg::housemergersp");
                if(info.errcode){
                    kaayou.emit('common', 'ui::Toast::Show', {
                        msg: info.msg || "操作失败，请重试!"
                    })
                    kaayou.emit("common", "ui::Loading::Hide");
                    return false;
                }
                success && success();
            }

            kaayou.emit("tea","ui::mergeUserDialog::show" , {
                type:tea_MergeUserDialoglMgr.MergeUserDialogType.QUAN_OP,
                text:`亲友圈${thid}申请被您合并\n是否同意？`,
                keep:false,
                ID:"housemerge_ntf",
                action:(hide)=>{

                    if(this.cancelthids.indexOf(thid)!==-1){
                        kaayou.emit('common', 'ui::Toast::Show', {
                            msg:  "对方已取消合圈申请!"
                        })
                        kaayou.emit("common", "ui::Loading::Hide");
                        hide();
                        return ;
                    }

                    subData.result=true;
                    kaayou.emit("common", "ui::Loading::Show", {time: 15 ,msg:"数据转移中"});
                    submit(subData,function(){
                        // hide();
                        kaayou.emit("common", "ui::Loading::Hide");
                        kaayou.emit('common', 'ui::Toast::Show', {
                            msg:  "合圈成功!"
                        })
                        opHandle && opHandle(true);
                        // self.renderHQRecord({hid:tea.mod.__teaHouseInfo.hid})
                    });
                    hide();
                },
                cancel:(hide)=>{
                    submit(subData,function(){
                        hide();
                        // self.renderHQRecord({hid:tea.mod.__teaHouseInfo.hid})
                        kaayou.emit("common", "ui::Loading::Hide");
                        opHandle && opHandle(false);
                    });
                }
            })
            // self.renderHQRecord({hid:tea.mod.__teaHouseInfo.hid})
            opHandle && opHandle();
        }

        private updateTeaHouseShotCut({thid,thname}){
            let {uid} = JSON.parse(kaayou.DataSet.get("user::info"));
            let shotcutInfo:Array<any> = JSON.parse(cc.sys.localStorage.getItem("LAST3TEAHOUSE::"+uid));
                shotcutInfo[0].id = thid;
                shotcutInfo[0].name = thname;
            cc.sys.localStorage.setItem("LAST3TEAHOUSE::"+uid,JSON.stringify(shotcutInfo));
        }


        private houserevokersp({hid,thid} , opHandle?){
            // let info = await kaayou.sendMessage("lobby","housemergereqrevoke",{hid,thid},"ws::Msg::housemergereqrevoke");
            let subData = {hid,thid,result:false}
            // let self = this;
            let submit = async (data , success?)=>{
                //合圈操作
                let info = await kaayou.sendMessage("lobby","houserevokersp",data,"ws::Msg::houserevokersp");
                if(info.errcode){
                    kaayou.emit('common', 'ui::Toast::Show', {
                        msg: info.msg || "操作失败，请重试!"
                    });
                    kaayou.emit("common", "ui::Loading::Hide");
                    return false;
                }
                success && success();
            }

            kaayou.emit("tea","ui::mergeUserDialog::show" , {
                type:tea_MergeUserDialoglMgr.MergeUserDialogType.QUAN_OP,
                text:`亲友圈${thid}申请解除合圈\n`,
                tip:"温馨提示：可以先查看该队长比赛分状态哦",
                keep:false,
                ID:"houserevoke_ntf",
                subText:"是否同意?",
                action:(hide)=>{
                    subData.result=true;
                    kaayou.emit("common", "ui::Loading::Show", {time: 15 ,msg:"数据转移中"});
                   submit(subData,function(){
                        // hide();
                        kaayou.emit("common", "ui::Loading::Hide");
                        kaayou.emit('common', 'ui::Toast::Show', {
                            msg:  "解除合圈成功!"
                        })
                        opHandle && opHandle(true)
                        // if(self.isHQ()===false)
                        //     self.renderHQRecord({hid:tea.mod.__teaHouseInfo.hid})
                   });
                   hide();
                   
                },
                cancel:(hide)=>{
                    submit(subData,function(){
                        hide();
                        kaayou.emit("common", "ui::Loading::Hide");
                        opHandle && opHandle(false);
                        // self.renderHQRecord({hid:tea.mod.__teaHouseInfo.hid})
                    });
                }
            })
        }

    }


    export class SubMergeTeaPage {
        scr_business: ccui.ScrollView = null; //成员列表
        _page: cc.Node = null;
        _index = -1;
        edit_TeaID: any = null;
        edit_TeaMasterId: any = null;
        btn_submit: ccui.Button = null;
        btn_reCord: ccui.ImageView = null;
        private _sub_data: { hid: number, thid: number, owner: number } = { hid: null, thid: null, owner: null };

        private tab_listview: cc.Node = null;
        private tab1: ccui.ImageView = null;
        private tab2: ccui.ImageView = null;
        private jl_panel: ccui.Layout = null;
        private hq_panel: ccui.Layout = null;
        private jl_item: ccui.Layout = null;
        private content: ccui.Layout = null;
        private btn_close: ccui.Button = null;



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
                this.saveInfo();
                this._page.setVisible(false);
            }
        }
        reset() {
            this.initStatus();

        }
        //初始化成员列表页面
        initWidthNode(page: cc.Node) {
            let self = this;
            this._page = page;
            let ctrName = "teaST"
            let subpageChangeEventName = "ui::Setting::SubpageChange";
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);//
            this.initUI1();
        }

        private isListOpen: boolean = false;
        initUI1() {
            let self = this;
            this.tab_listview = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "tab_listview");
            (<ccui.ScrollView>this.tab_listview).setScrollBarAutoHideEnabled(true);
            this.tab1 = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "tab1");
            this.tab2 = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "tab2");
            this.jl_item = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "jl_item");
            this.hq_panel = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "hq_panel");
            this.jl_panel = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "jl_panel");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "btn_close");
            this.content = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "content");
            this.hq_panel.setVisible(false)
            this.jl_panel.setVisible(false)


            this.renderWithNode(this.jl_panel);
            this.renderWithNode(this.hq_panel);

            let cp_hqpanel: ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.content, "hq_panel");
            let cp_jlpanel: ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.content, "jl_panel");
            // let quan_id = 
            this.initInput(cp_hqpanel, "quan_id", {
                fontSize: 28,
                color: "#D2C7B8",
                placeHolderColor: "#D2C7B8",
                placeHolder: "请输入亲友圈ID",
                type: "number",
                endInput: (str) => {
                    this._sub_data.thid = Number(str);
                }
            })


            this.initInput(cp_hqpanel, "owner_id", {
                fontSize: 28,
                color: "#D2C7B8",
                placeHolderColor: "#D2C7B8",
                placeHolder: "请输入圈主ID",
                type: "number",
                endInput: (str) => {
                    this._sub_data.owner = Number(str);
                }
            })

            let hq_submit: cc.Node = ccui.helper.seekWidgetByName(<ccui.Widget>cp_hqpanel, "submit");

            hq_submit.on(kaayou.TouchEvent.TouchEnd,
                kaayou.TouchMask.clickHandle(() => {
                    this.submitHQ();
                }, this)
                , this)


            this.tab1.on(kaayou.TouchEvent.TouchEnd, (e) => {
                this.setTabStyle(this.tab1, true);
                this.setTabStyle(this.tab2, false);
                cp_hqpanel.setVisible(true)
                cp_hqpanel.setEnabled(true)
                cp_jlpanel.setVisible(false)
                cp_jlpanel.setEnabled(false)
                this.isListOpen = false;
            }, this)

            this.tab2.on(kaayou.TouchEvent.TouchEnd, (e) => {
                this.setTabStyle(this.tab1, false);
                this.setTabStyle(this.tab2, true);
                cp_hqpanel.setVisible(false)
                cp_hqpanel.setEnabled(false)
                cp_jlpanel.setVisible(true)
                cp_jlpanel.setEnabled(true)
                this.isListOpen = true;
                this.renderHQRecord({ hid: tea.mod.__teaHouseInfo.hid })
            }, this)

            // this.btn_close.on(kaayou.TouchEvent.TouchEnd, (e) => {
            //     this.Hide();
            // }, this)

            let that = this;
            kaayou.getController('tea').on('ui::mergeUserPanel::requireHQ', (e: kaayou.Event) => {
                this.requireHQ(e.data);
            }, this);


            kaayou.getController('tea').on("ui::mregeUserPanel::housemergereqrevoke", (e: kaayou.Event) => {
                this.housemergereqrevoke(e.data)
            }, this)


            kaayou.getController('tea').on("ui::mregeUserPanel::houserevokereq", (e: kaayou.Event) => {
                this.houserevoke(e.data)
            }, this)

            kaayou.getController('tea').on("ui::mregeUserPanel::updateList", (e: kaayou.Event) => {
                this.renderHQRecord(e.data)
            }, this)

            // let isTeaHouse = ()=>{
            //     return kaayou.UIManager.getInstance().getCurRuningSceneName() === "TEAHOUSE"
            // }


            // let isLobby = ()=>{
            //     return kaayou.UIManager.getInstance().getCurRuningSceneName() === "LOBBY"
            // }
            // kaayou.getController("lobby").on("ws::Msg::notify",(e:kaayou.Event)=>{
            //     if(isTeaHouse()){
            //         self.renderHQRecord({hid:tea.mod.__teaHouseInfo.hid});
            //     }
            // },this)


            // kaayou.getController("lobby").on("ws::Msg::housemergereqrevoke_ntf",function(e: kaayou.Event){
            //     if(isTeaHouse()){
            //         self.housemergereqrevokeResult(e.data);
            //     }                
            //     self.cancelthids.push(e.data.thid);
            // },this)

            cp_hqpanel.setVisible(true)
            cp_hqpanel.setEnabled(true)
        }
        private cancelthids = []
        private initStatus() {
            let cp_hqpanel: ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.content, "hq_panel");
            let cp_jlpanel: ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.content, "jl_panel");
            let quan_id: any = ccui.helper.seekWidgetByName(<ccui.Widget>this.content, "quan_id");
            let owner_id: any = ccui.helper.seekWidgetByName(<ccui.Widget>this.content, "owner_id");
            let savedInfo: any = cc.sys.localStorage.getItem("tea::mergeuser::mergecache") || "{}";
            savedInfo = JSON.parse(savedInfo);
            savedInfo = savedInfo[tea.mod.__teaHouseInfo.hid] || {};
            if (quan_id) {
                let edit = quan_id.getChildByName("search_edit");
                if (edit && edit.children.length) {
                    //由于存在下一帧的函数问题 用settimeout延迟
                    setTimeout(() => {
                        try {
                            edit.children[0].setString(savedInfo.thid || "")
                        } catch (e) { }
                    }, 60);

                }
            }
            if (owner_id) {
                let edit = owner_id.getChildByName("search_edit");
                if (edit && edit.children.length) {
                    try {
                        edit.children[0].setString(savedInfo.owner || "")
                    } catch (e) { }
                }
            }

            this._sub_data.thid = savedInfo.thid || null
            this._sub_data.owner = savedInfo.owner || null;

            if (this.isHQ()) {
                this.setTabStyle(this.tab1, false);
                this.setTabStyle(this.tab2, true);
                this.isListOpen = true;
                //该死的下一帧渲染
                setTimeout(() => {
                    this.tab2.setPosition(this.tab1.getPosition())
                    this.tab1.setVisible(false);
                }, 30);

                cp_hqpanel.setVisible(false)
                cp_hqpanel.setEnabled(false)
                cp_jlpanel.setVisible(true)
                cp_jlpanel.setEnabled(true)
                this.renderHQRecord({ hid: tea.mod.__teaHouseInfo.hid });

            } else {
                this.setTabStyle(this.tab1, true);
                this.setTabStyle(this.tab2, false);
                this.tab1.setVisible(true);
                (<ccui.ScrollView>this.tab_listview).doChildrenLayout();
                cp_hqpanel.setVisible(true)
                cp_hqpanel.setEnabled(true)
                cp_jlpanel.setVisible(false)
                cp_jlpanel.setEnabled(false)
            }

        }

        isHQ() {
            return tea.mod.__teaHouseInfo.urefhid !== 0
        }



        private renderWithNode(node: ccui.Layout) {
            let cp = node.clone();
            this.content.addChild(cp);
            cp.setPosition(0, 0)
            cp.setAnchorPoint(0, 0);
        }

        private initInput(node, name, attr) {

            let input = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>node, name);
            let label = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>input, "search_label");
            label.setVisible(false)
            input = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>input, "search_edit");

            let sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb: cc.Node = cc["EditBox"].create(input.getContentSize(), sp);
            eb.setAnchorPoint(0, 0);
            eb.setPosition(0, 0);
            eb.setOpacity(0);
            eb['setFontSize'](attr.fontSize || 24);
            eb['setFontColor'](cc.color(attr.color || "#CFB7A6"));
            eb['setInputMode'](6);
            eb['setMaxLength'](attr.length || 8);
            eb["setPlaceholderFontSize"](24)
            eb["setPlaceholderFontColor"](cc.color(attr.placeHolderColor || "#CFB7A6"))
            input.addChild(eb);


            (<any>eb).setPlaceHolder(attr.placeHolder || "点击输入")


            let config: any = {
                editBoxEditingDidEnd: function (ref) {
                    attr.endInput(ref.getString())
                }
            }

            if (attr.type === "number")
                config.editBoxTextChanged = function (ref) {
                    let str = ref.getString();

                    while (isNaN(Number(str))) {
                        str = str.slice(0, str.length - 1);
                        if (str.length === 0)
                            break;
                    }

                    ref.setString(str)
                }

            eb['setDelegate'](config)

        }


        private setTabStyle(node: ccui.ImageView, toggle: boolean) {
            if (node.name == "tab1") {
                node.loadTexture(toggle ? "TH_SetMergeImages_btn13.png" : "TH_SetMergeImages_btn12.png", ccui.Widget.PLIST_TEXTURE);
            }else{
                node.loadTexture(toggle ? "TH_SetMergeImages_btn15.png" : "TH_SetMergeImages_btn14.png", ccui.Widget.PLIST_TEXTURE);
            }
        }


        async renderHQRecord({ hid }) {

            if (this.isListOpen === false)
                return;

            //不知道为啥这样，但是还是先过掉0
            if (hid === 0)
                return;

            let data = await kaayou.sendMessage("lobby", "housemergerecord", { hid }, "ws::Msg::housemergerecord");
            if (data.errcode) {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "获取合圈记录失败!"
                })
                return;
            }


            let self = this;
            let cp_jlpanel: ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.content, "jl_panel");
            let container: ccui.ScrollView = ccui.helper.seekWidgetByName(<ccui.Widget>cp_jlpanel, "scrollcontent");
            container.removeAllChildren();
            container.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            container.setVertical(ccui.Layout.LayoutVertical.TOP);

            if (!data.items)
                return;

            data.items.forEach((v, i) => {
                let it = new MergeUserPanelRecordItem(this.jl_item);
                it.initWithData({ ...v, index: i })
                it.initOperSuccessCallback(() => {
                    self.renderHQRecord({ hid: tea.mod.__teaHouseInfo.hid })
                })
                container.addChild(it.node)
            });

            container.doChildrenLayout();
            container.scrollToTop(0, false);
        }
        async requireHQ({ hid }) {
            let data = kaayou.sendMessage('lobby', "housemergereq", { hid }, "ws::Msg::housemergereq")
            if (data.errcode) {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "合圈失败，请重试!"
                })
                return;
            }

            kaayou.emit('common', 'ui::Toast::Show', {
                msg: "请求发送成功!"
            })
            this.renderHQRecord({ hid: tea.mod.__teaHouseInfo.hid })
        }

        //撤回合并请求，反悔
        async housemergereqrevoke({ hid, thid }) {
            let info = await kaayou.sendMessage("lobby", "housemergereqrevoke", { hid, thid }, "ws::Msg::housemergereqrevoke");
            if (info.errcode) {
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: info.msg || "操作失败，请重试!"
                })
                return false;
            }
            this.renderHQRecord({ hid: tea.mod.__teaHouseInfo.hid })
            return true;
        }

        //撤回通知
        housemergereqrevokeResult({ hid, thid, msg }) {
            this.renderHQRecord({ hid: tea.mod.__teaHouseInfo.hid })
        }

        //解除合圈通知
        houserevokerspResult({ hid, thid, ok }) {
            kaayou.emit("tea", "ui::mergeUserDialog::show", {
                type: tea_MergeUserDialoglMgr.MergeUserDialogType.QUAN_TIP,
                text: `解除合圈${ok ? "成功" : "被拒绝"}\n\n亲友圈${thid}${ok ? "解除" : "保持"}与亲友圈${hid}的绑定关系`
            })
            this.renderHQRecord({ hid: tea.mod.__teaHouseInfo.hid })
        }

        async houserevoke({ hid, thid }) {
            let info = await kaayou.sendMessage("lobby", "houserevokereq", { hid, thid }, "ws::Msg::houserevokereq");
            if (info.errcode) {
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: info.msg || "操作失败，请重试!"
                })
                return false;
            }
            this.renderHQRecord({ hid: tea.mod.__teaHouseInfo.hid })
            return true;
        }

        HQRequestResult(data) {
            let { ok, num } = data;
            kaayou.emit("tea", "ui::mergeUserDialog::show", {
                type: tea_MergeUserDialoglMgr.MergeUserDialogType.QUAN_TIP,
                text: `${ok ? "合圈成功" : "您的合圈申请被拒绝"}` + (ok ? `\n\n有${num}个玩家同时也是被合亲友圈成员\n将不会和您成为绑定关系` : "")
            })
            this.renderHQRecord({ hid: tea.mod.__teaHouseInfo.hid })
        }


        //提交合圈请求
        async submitHQ() {
            let subData = lodash.extend({}, this._sub_data, { hid: tea.mod.__teaHouseInfo.hid })
            let data = await kaayou.sendMessage("lobby", "housemergeintention", subData, "ws::Msg::housemergeintention");

            if (data.errcode) {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "合圈失败，请重试!"
                })
                return;
            }


            kaayou.emit("tea", 'ui::mergeUserDialog::show',
                {
                    type: tea_MergeUserDialoglMgr.MergeUserDialogType.QUAN_MODIFY,
                    text: `您正在向亲友圈${subData.thid}申请被合并\n\n合并后您的亲友圈将会被注销\n玩家将会被迁移至新的亲友圈`,
                    action: (hide) => {
                        this.checkHQ(subData.hid);
                        hide();
                    },
                    cancel: (hide) => {
                        hide();
                    }
                })


        }


        //检查茶楼状态
        private async checkHQ(hid) {
            let data = await kaayou.sendMessage("lobby", "housemergecheck", { hid }, "ws::Msg::housemergecheck");


            if (data.errcode) {
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: data.msg || "合圈失败，请重试!"
                })
                return;
            }

            kaayou.emit('tea', 'ui::mergeCheckDialog::show', data)
        }


        private saveInfo() {
            let data: any = cc.sys.localStorage.getItem("tea::mergeuser::mergecache") || "{}"
            data = JSON.parse(data);
            let { thid, owner } = this._sub_data;
            data[tea.mod.__teaHouseInfo.hid] = { thid, owner }
            cc.sys.localStorage.setItem("tea::mergeuser::mergecache", JSON.stringify(data));
        }
    }
    enum MergeUserStatus {
        RECEIVE = 1,// 收到申请
        SEND = 2,// 发送申请
        RECEIVE_DENIED = 3,// 拒绝了收到的申请
        SEND_DENIED = 4,// 发送申请被拒绝
        RECEIVE_AGREE = 5,// 同意了收到的申请
        SEND_AGREE = 6,// 发送的申请通过了
        SEND_CANCEL = 7,// 合圈申请被撤销
        SEND_CANCEN_REQUIRE = 8,// 发送撤圈申请
        RECEIVE_CANCEN_REQUIRE = 9,// 收到撤圈申请
        SEND_CANCEN_REQUIRE_DENIED = 10,// 发送撤圈申请被拒绝
        RECEIVE_CANCEN_REQUIRE_DENIED = 11// 收到撤圈申请已拒绝
    }

    class MergeUserPanelRecordItem {

        node: ccui.Layout = null;
        static MergeUserStatus = MergeUserStatus;
        private operator_cancel: cc.Node = null;
        private operator_undo: cc.Node = null;
        private operator_agree: cc.Node = null;
        private operator_igore: cc.Node = null;
        private move: ccui.Text = null;
        private result: ccui.Text = null;
        private quan_id: ccui.Text = null;
        private time: ccui.Text = null;
        private action: ccui.Text = null;
        private bg: ccui.ImageView = null;
        // {at: 1569293100, state: 1, thid: 557411, hid: 586562, msg: "亲友圈 557411 申请被合并"}
        private _data = { hid: null, thid: null, at: 0, state: -1 }
        private successCallBack = null
        constructor(node: cc.Node) {
            this.initWithNode(node);
            this.initUI();
        }


        initUI() {

            this.operator_cancel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "operator_cancel");
            this.operator_undo = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "operator_undo");
            this.operator_agree = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "operator_agree");
            this.operator_igore = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "operator_igore");
            this.result = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "result");
            this.result.ignoreContentAdaptWithSize(false)
            this.quan_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "quan_id");
            this.quan_id.ignoreContentAdaptWithSize(false)
            this.move = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "move");
            this.move.ignoreContentAdaptWithSize(false)
            this.time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "time");
            this.time.ignoreContentAdaptWithSize(false)
            this.action = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "action");
            this.action.ignoreContentAdaptWithSize(false)
            this.bg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bg");
            this.operator_cancel.setVisible(false)
            this.operator_undo.setVisible(false)
            this.operator_agree.setVisible(false)
            this.operator_igore.setVisible(false)

            let self = this;
            this.operator_cancel.on(kaayou.TouchEvent.TouchEnd, (e) => {
                //撤回合圈请求：housemergereqrevoke
                // hid   当前亲友圈id
                // thid  对方亲友圈id

                let msg = ""
                if (self.isBigQuanOwner()) {
                    msg = `您正在申请解除与亲友圈${self._data.thid}的合并关系\n发起解除申请后会冻结名下所有玩家的入桌权限\n\n是否确定?`
                } else {
                    msg = `您正在申请解除与亲友圈${self._data.thid}的合并关系\n解除合并后将会为您恢复合并前的亲友圈`
                }

                kaayou.emit("tea", 'ui::mergeUserDialog::show',
                    {
                        type: tea_MergeUserDialoglMgr.MergeUserDialogType.QUAN_MODIFY,
                        text: msg,
                        action: (hide) => {
                            kaayou.emit("tea", "ui::mregeUserPanel::houserevokereq", self._data)
                            hide();
                        },
                        cancel: (hide) => {
                            hide();
                        }
                    })


            }, this);

            this.operator_undo.on(kaayou.TouchEvent.TouchEnd, (e) => {
                //撤圈请求（解除合并请求）：houserevokereq
                // hid   当前亲友圈id
                // thid  对方亲友圈id
                kaayou.emit("tea", 'ui::mergeUserDialog::show',
                    {
                        type: tea_MergeUserDialoglMgr.MergeUserDialogType.QUAN_MODIFY,
                        text: `您正在向亲友圈${self._data.thid}申请撤销合圈申请\n\n撤销后将不会再向对方发送申请`,
                        action: (hide) => {
                            kaayou.emit("tea", "ui::mregeUserPanel::housemergereqrevoke", self._data)
                            hide();
                        },
                        cancel: (hide) => {
                            hide();
                        }
                    })

            }, this);


            //             客户端请求：对方圈主响应请求：housemergersp
            // hid 当前亲友圈id
            // thid 申请被合的亲友圈id
            // result  同意true 拒绝false
            this.operator_agree.on(kaayou.TouchEvent.TouchEnd, (e) => {
                let { hid, thid, state } = self._data

                if (state === 9) {
                    this.submitCancelRequest({ hid, thid, result: true })
                    return;
                }

                this.submitMergeRequest({ hid, thid, result: true })
            }, this);

            this.operator_igore.on(kaayou.TouchEvent.TouchEnd, (e) => {
                let { hid, thid, state } = self._data
                if (state === 9) {
                    this.submitCancelRequest({ hid, thid, result: false });
                    return;
                }

                this.submitMergeRequest({ hid, thid, result: false })
            }, this);

        }

        private isBigQuanOwner() {
            return this._data.thid !== tea.mod.__teaHouseInfo.hid
        }

        private setBG(i) {
            this.bg.loadTexture((i % 2) ? "TH_SetMergeImages_CellBg.png" : "TH_SetMergeImages_CellBg1.png", ccui.Widget.PLIST_TEXTURE)
        }

        private async submitMergeRequest(data) {
            let info = await kaayou.sendMessage("lobby", "housemergersp", data, "ws::Msg::housemergersp");
            if (info.errcode) {
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: data.msg || "操作失败，请重试!"
                })
                kaayou.emit('tea', 'ui::mergeUserPanel::hide');
                return false;
            }
            this.successCallBack();
        }

        private async submitCancelRequest({ hid, thid, result }) {

            let info = await kaayou.sendMessage("lobby", "houserevokersp", { hid, thid, result }, "ws::Msg::houserevokersp");
            if (info.errcode) {
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: info.msg || "操作失败，请重试!"
                })
                kaayou.emit('tea', 'ui::mergeUserPanel::hide');
                return false;
            }
            this.successCallBack();
        }

        initOperSuccessCallback(fn) {
            this.successCallBack = fn;
        }

        initStatus() {
            this.operator_cancel.setVisible(false)
            this.operator_undo.setVisible(false)
            this.operator_agree.setVisible(false)
            this.operator_igore.setVisible(false)
            this._data = { hid: null, thid: null, at: 0, state: -1 }
        }

        initWithNode(node: cc.Node) {
            this.node = <ccui.Layout>((<ccui.Widget>node).clone());
            this.node.setVisible(true);
            this.node.setAnchorPoint(0, 0);
            this.node.setPosition(0, 0);
            ccui.helper.doLayout(this.node);
            return this;
        }



        initWithData({ hid, thid, state, at, index }) {
            this._data.hid = hid;
            this._data.thid = thid;
            this._data.state = state;
            this._data.at = at;
            this.renderData();
            this.setBG(index);
        }


        /**
         *         RECEIVE=1,// 收到申请
    SEND=2,// 发送申请
    RECEIVE_DENIED=3,// 拒绝了收到的申请
    SEND_DENIED=4,// 发送申请被拒绝
    RECEIVE_AGREE=5,// 同意了收到的申请
    SEND_AGREE=6,// 发送的申请通过了
    SEND_CANCEL=7,// 合圈申请被撤销
    SEND_CANCEN_REQUIRE= 8,// 发送撤圈申请
    RECEIVE_CANCEN_REQUIRE= 9,// 收到撤圈申请
    SEND_CANCEN_REQUIRE_DENIED=10,// 发送撤圈申请被拒绝
    RECEIVE_CANCEN_REQUIRE_DENIED=11// 收到撤圈申请已拒绝
         * 
         */
        private renderData() {
            let { state } = this._data;

            switch (state) {
                case MergeUserStatus.SEND:
                    this.operator_undo.setVisible(true);
                    break;
                case MergeUserStatus.RECEIVE_CANCEN_REQUIRE:
                case MergeUserStatus.RECEIVE:
                    this.operator_agree.setVisible(true);
                    this.operator_igore.setVisible(true)
                    break;
                case MergeUserStatus.SEND_AGREE:
                case MergeUserStatus.RECEIVE_AGREE:
                case MergeUserStatus.SEND_CANCEN_REQUIRE_DENIED:
                case MergeUserStatus.RECEIVE_CANCEN_REQUIRE_DENIED:
                    this.operator_cancel.setVisible(true);
                    break;
                case MergeUserStatus.RECEIVE_DENIED:
                case MergeUserStatus.SEND_DENIED:
                case MergeUserStatus.SEND_CANCEL:
                //撤销合圈全部没操作，如果取消则可以用状态6再申请
                case MergeUserStatus.SEND_CANCEN_REQUIRE:
                    break;

            }

            this.renderText();
        }

        /*
    = 1  // 收到申请
    = 2  // 发送申请
    = 3  // 拒绝了收到的申请
    = 4  // 发送申请被拒绝
    = 5  // 同意了收到的申请
    = 6  // 发送的申请通过了
    = 7  // 合圈申请被撤销
    = 8  // 发送撤圈申请
    = 9  // 收到撤圈申请
    = 10 // 发送撤圈申请被拒绝
    = 11 // 收到撤圈申请已拒绝
*/
        private renderText() {

            let { state, thid, at } = this._data;
            let { quan_id, time, result, move, action } = this;

            enum color {
                agree = "#37CAA6",
                denind = "#FF6651",
                nomarl = "#04FF16"
            }


            switch (state) {
                case MergeUserStatus.RECEIVE:
                    result.setTextColor(cc.color(color.nomarl))
                    move.setString("亲友圈")
                    result.setString("")
                    action.setString("申请被合并")
                    break;
                case MergeUserStatus.SEND:
                    result.setTextColor(cc.color(color.nomarl))
                    move.setString("向亲友圈")
                    result.setString("等待答复")
                    action.setString("申请合并")
                    break;
                case MergeUserStatus.RECEIVE_DENIED:
                    result.setTextColor(cc.color(color.denind))
                    move.setString("亲友圈")
                    result.setString("已拒绝")
                    action.setString("申请被合并")
                    break;
                case MergeUserStatus.SEND_DENIED:
                    result.setTextColor(cc.color(color.denind))
                    move.setString("向亲友圈")
                    result.setString("已拒绝")
                    action.setString("申请合并")
                    break;
                case MergeUserStatus.RECEIVE_AGREE:
                    result.setTextColor(cc.color(color.agree))
                    move.setString("亲友圈")
                    result.setString("已同意")
                    action.setString("申请被合并")
                    break;
                case MergeUserStatus.SEND_AGREE:
                    result.setTextColor(cc.color(color.agree))
                    move.setString("向亲友圈")
                    result.setString("已同意")
                    action.setString("申请合并")
                    break;
                case MergeUserStatus.SEND_CANCEL:
                    result.setTextColor(cc.color(color.denind))
                    move.setString("亲友圈")
                    result.setString("已撤销")
                    action.setString("申请合并")
                    break;
                case MergeUserStatus.SEND_CANCEN_REQUIRE:
                    result.setTextColor(cc.color(color.nomarl))
                    move.setString("向亲友圈")
                    result.setString("等待答复")
                    action.setString("申请撤销")
                    break;
                case MergeUserStatus.RECEIVE_CANCEN_REQUIRE:
                    result.setTextColor(cc.color(color.nomarl))
                    move.setString("亲友圈")
                    result.setString("")
                    action.setString("申请撤销")
                    break;
                case MergeUserStatus.SEND_CANCEN_REQUIRE_DENIED:
                    result.setTextColor(cc.color(color.denind))
                    move.setString("向亲友圈")
                    result.setString("已拒绝")
                    action.setString("申请撤销")
                    break;
                case MergeUserStatus.RECEIVE_CANCEN_REQUIRE_DENIED:
                    result.setTextColor(cc.color(color.denind))
                    move.setString("亲友圈")
                    result.setString("已拒绝")
                    action.setString("申请撤销")
                    break;
            }

            time.setString(parseTime(at * 1000))
            quan_id.setString(thid);

            function parseTime(num) {
                let date = new Date(num);
                return `${date.getMonth() + 1}-${date.getDate()}`
            }

        }

        getData() {
            return lodash.clone(this._data);
        }



    }


}