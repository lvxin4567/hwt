/**
 * 
 *  茶楼桌子详情面板
 * 
 */
namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;


    export class Tea_TableDetailPanelMgr {
        static __INS__: Tea_TableDetailPanelMgr = null;
        static getInstance() {
            if (Tea_TableDetailPanelMgr.__INS__ == null) {
                Tea_TableDetailPanelMgr.__INS__ = new Tea_TableDetailPanelMgr();
                Tea_TableDetailPanelMgr.__INS__.init();
            }
            return Tea_TableDetailPanelMgr.__INS__;
        }
        __selfPanel: TableDetailPanel = null;

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::TableDetail::Show', function (e: kaayou.Event) {
                if (kaayou.UIManager.getInstance().getCurRuningSceneName() != "TEAHOUSE") return;
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::TableDetail::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);


            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new TableDetailPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class TableDetailPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        layout_players: ccui.ScrollView = null;
        btn_dismiss: ccui.Button = null;
        btnJoin: ccui.Button = null;
        progress_label: ccui.Text = null;
        num: number = 0;
        dataDetail: proto_tableinfo_res = null;        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.TableDetailPanel_json);
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_dismiss = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_dissmiss");
            this.btnJoin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_join");
            this.progress_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "pro");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);

            this.layout_players = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_players");
            this.layout_players.setPadding({ spacingY: 10 });
            this.layout_players.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.layout_players.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.layout_players.setScrollBarEnabled(false);
            this.layout_players.doChildrenLayout();
            this.btn_dismiss.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);

                let msg = "是否【解散】当前牌桌?";
                var suceessCall = function () {
                    kaayou.emit("tea", "mod::teahouse::tabledel", { id: self.dataDetail.tid, fid: self.dataDetail.fid })
                }
                let options = {
                    title: "",
                    msg: msg,
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: suceessCall,
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                //return false;
                            }.bind(self),
                            colorType: 'blue'
                        }
                    ]
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this)

            this.btnJoin.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                //|| lodash.isEmpty(tea.mod.__teaHouseTableList) 
                if (!!!tea.mod.__teaHouseInfo || tea.mod.__teaHouseInfo.only_quick) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "当前亲友圈设置为仅支持点击“快速入桌”按钮入桌" });
                    return;
                }
                kaayou.emit('tea', "mod::Table::joinTable", { fid: self.dataDetail.fid, index: self._curTindex, ignorerule: false })
            }, this)

            lodash.forEach(this.layout_players.getChildren(), function (v: ccui.Layout, i) {
                v['index'] = i;
                v.getChildByName("btn_kick").on(kaayou.TouchEvent.TouchEnd, function () {
                    if (!!v["info"]) {
                        console.log("需要踢出的玩家", v["info"]);
                        let options = {
                            title: "温馨提示",
                            msg: `确定踢出玩家${v["info"].nickname}吗？`,
                            close: {
                                isShow: false,
                                action: null,
                            },
                            btns: [
                                {
                                    name: "确定",
                                    action: function () {
                                        kaayou.emit("tea", "mod::TeaHouse::kickUser", { tid: self.dataDetail.tid, uid: v["info"].id })
                                    }.bind(this),
                                    colorType: 'blue'
                                },
                                {
                                    name: "取消",
                                    colorType: 'green'
                                }
                            ]
                        }
                        kaayou.emit("common", 'ui::Dialog::Show', options);
                    }
                }, self)
                v.setVisible(false);
            });

            kaayou.getController('tea').on('ui::tableDetail::update', function (e: kaayou.Event) {
                let data = e.data;
                if (!self.node.isVisible()) {
                    return;
                }
                if (self.dataDetail && self.dataDetail.person.length > 1) {
                    let personArr = [];
                    lodash.pullAllBy(self.dataDetail.person, [{ id: lodash.toInteger(data.uid) }], 'id');
                    self.doUpdataPlayers(!!(self.dataDetail.tid) ? self.dataDetail.person : null);
                    this.showDetailOther(!!(self.dataDetail.tid) ? self.dataDetail : null)
                } else {
                    self.Hide();
                }
            }, this, 10);

            this.watchRole();
            this.Hide();
        }

        doUpdataPlayers(item: Array<{ id: number, imgurl: string, ip: string, nickname: string, online: boolean, partner: string }>) {
            var self = this;
            if (!item) {
                if (!this._isClean) {

                    lodash.forEach(this.layout_players.getChildren(), function (v: ccui.Layout, i) {
                        v.setVisible(false);
                    });
                }
                this._isClean = true;
                return;
            }
            let kickRole = tea.mod.House.getPromissionInstance().query("房间踢人")===tea.mod.House.PERMISSION_TYPE.ESCALATION;
            this.btn_dismiss.setVisible(false);
            this._isClean = false;
            let teaInfo: Data_HouseInfo = tea.mod.__teaHouseInfo
            lodash.forEach(this.layout_players.getChildren(), function (v: ccui.Layout, i) {
                let pi = item[i] || null;
                if (pi) {
                    (<ccui.Text>v.getChildByName('Online')).setVisible(pi.online);
                    (<ccui.Text>v.getChildByName('Offline')).setVisible(!pi.online);
                    (<ccui.Text>v.getChildByName('label_name')).setString(kaayou.Identify.nickNameSubSix(pi.nickname));
                    (<ccui.Text>v.getChildByName('label_id')).setString("ID:" + pi.id.toString());
                    (<ccui.Text>v.getChildByName('label_partnerId')).setString("队长:" + pi.partner);
                    //圈主和管理员才显示
                    (<ccui.Text>v.getChildByName('label_partnerId')).setVisible(!!pi.partner && pi.partner.length != 0 && !!(teaInfo.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY));
                    if (pi.ip) {
                        (<ccui.Text>v.getChildByName("label_ip")).setString("IP:" + pi.ip.toString());
                    }
                    NetImage.setPlayerHead(<ccui.ImageView>v.getChildByName("Image_3").getChildByName("img_head"), pi.imgurl);
                    v.setVisible(true);
                    v["info"] = pi;
                    (<ccui.Button>v.getChildByName("btn_kick")).setVisible(kickRole && !self.dataDetail.begin && !!(tea.mod._isManager() || tea.mod._isMaster()));
                } else {
                    v.setVisible(false);
                }
            });
            self.layout_players.doChildrenLayout();

        }

        _curTindex = -1;
        _isClean = false;


        watchRole(){
            let promiss = tea.mod.House.getPromissionInstance();

            promiss.watch("解散房间",(data)=>{
                if(!!this._data){
                    let Role = data["minor_status"].new === tea.mod.House.PERMISSION_TYPE.ESCALATION;
                    if (!!tea.mod.__teaHouseInfo && !!((tea.mod.__teaHouseInfo.teahouserule & HouseRoleTable.DISMISS_TEA_TABLE)) && !lodash.isEmpty(this._data.person)) {
                        this.btn_dismiss.setVisible(!!(this._data.person.length != 0) && Role);
                    }
                }
            })


            promiss.watch("房间踢人",(data)=>{
                let kickRole = data["minor_status"].new === tea.mod.House.PERMISSION_TYPE.ESCALATION;
                this.layout_players.getChildren().forEach(v=>{
                    (<ccui.Button>v.getChildByName("btn_kick")).setVisible(kickRole && !this.dataDetail.begin && !!(tea.mod._isManager() || tea.mod._isMaster()));
                })
            })


        }
        private _data;
        showDetailOther(data) {
            if (data) {
                let proStr = "当前进度：" + this.dataDetail.currentround + "/" + this.dataDetail.roundnum;
                this.progress_label.setString(proStr);
                this.progress_label.setVisible(true);
                if (lodash.isEmpty(data.person)) {
                    this.btnJoin.setVisible(true);
                } else if (data.canwatch) {
                    this.btnJoin.setVisible(true);
                } else {
                    this.btnJoin.setVisible(!!(data.person.length < data.maxplayernum))
                }
                if (!!tea.mod.__teaHouseInfo && !!((tea.mod.__teaHouseInfo.teahouserule & HouseRoleTable.DISMISS_TEA_TABLE)) && !lodash.isEmpty(data.person)) {
                    let dismissrole =  tea.mod.House.getPromissionInstance().query("解散房间")===tea.mod.House.PERMISSION_TYPE.ESCALATION;
                    this.btn_dismiss.setVisible(!!(data.person.length != 0) && dismissrole);
                } else {

                }
                this._data = data;
            } else {
                this.progress_label.setString("0/0");
                this.progress_label.setVisible(false);
                this.btn_dismiss.setVisible(false);
                this.btnJoin.setVisible(true);
            }
        }

        Show(data: proto_tableinfo_res) {
            this._isClean = false;
            this.dataDetail = data;
            this._curTindex = data.ntid
            //lw200927假桌子可能为空，设为-1
            if (this._curTindex == undefined) this._curTindex = -1;
            this.doUpdataPlayers(!!(data.tid) ? data.person : null);
            this.showDetailOther(!!(data.tid) ? data : null)
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg")
            });
        }
        // @BindEvent("tea", 'ui::TableDetail::Hide')
        Hide() {
            this._isClean = false;
            this._curTindex = -1;
            this.setVisible(false);
            //需要去清除搜索牌桌信息
            kaayou.emit("tea", "ui::SearchTablePanel::clear")
            // kaayou.pop.hideAni(
            //     {
            //         cNode: this.node.getChildByName("contentPanel"),
            //         mNode: this.node.getChildByName("maskbg"),
            //         rnode: this
            //     }
            // )
        }

    }



}