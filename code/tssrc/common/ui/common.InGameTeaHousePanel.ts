/// <reference path="common.PullListView.ts" />
namespace common {
    class TH_InGameApply_Cell extends kaayou.Block implements common.IPullListCell {
        constructor() {
            super();
        }
        _index = -1;
        setIndex(index) {
            this._index = index;
        }
        getIndex() {
            return this._index;
        }

        img_head: ccui.ImageView = null;   //头像
        label_uname: ccui.Text = null;   //用户名称标签
        label_uid: ccui.Text = null;   //用户id标签
        label_time: ccui.Text = null;   //用户积分标签
        label_typejoin: ccui.Text = null;   //申请类型：加入申请
        label_typeout: ccui.Text = null;   //申请类型：退出申请
        checkbox_online: ccui.CheckBox = null;
        btn_agree: ccui.Button = null;   //同意按钮
        btn_reject: ccui.Button = null;//拒绝按钮

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);

            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.label_uname = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_uname");
            this.label_uid = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_uid");
            this.label_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_time");
            this.label_typejoin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_typejoin");
            this.label_typeout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_typeout");
            this.btn_agree = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_agree");
            this.btn_reject = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_reject");
            this.checkbox_online = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "checkbox_online");
            let ctrName = this.getModuleName();

            this.btn_agree.on(kaayou.TouchEvent.TouchEnd, () => {
                if (!this._data) { return; }
                if (!this._data.uid) { return; }
                kaayou.emit("tea", "mod::GameTable::ApplyAgree", { uid: this._data.uid, apply_type: this._data.apply_type });
            }, this);

            this.btn_reject.on(kaayou.TouchEvent.TouchEnd, () => {
                if (!this._data) { return; }
                if (!this._data.uid) { return; }
                kaayou.emit("tea", "mod::GameTable::ApplyReject", { uid: this._data.uid, apply_type: this._data.apply_type });
            }, this);

            kaayou.getController(ctrName).on('ui::ApplyRow::HideButton', function (e: kaayou.Event) {
                self.btn_agree.setVisible(false);
                self.btn_reject.setVisible(false);
            }, this, 10);

            kaayou.getController(ctrName).on('ui::ApplyRow::ShowButton', function (e: kaayou.Event) {
                self.btn_agree.setVisible(true);
                self.btn_reject.setVisible(true);
            }, this, 10);
        }

        reset() {

            this.img_head.setVisible(false);
            this.label_uname.setString("");
            this.label_uid.setString("");
            this.label_time.setString("");
            this.label_typejoin.setVisible(false);
            this.label_typeout.setVisible(false);
            this.checkbox_online.setSelected(false);
            this.btn_agree.setVisible(false);
            this.btn_reject.setVisible(false);
        }
        _data: tea.ITH_DATA_USER_INFO = null;
        setInfo(data: tea.ITH_DATA_USER_INFO) {
            var self = this;
            if( lodash.eq(this._data , data)){return;}
            this._data = !!data ? lodash.cloneDeep(data) : null;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }

            this.label_uname.setString(kaayou.Identify.nickNameSubByLength(this._data.uname, 6, 4));
            this.label_uid.setString("ID:" + this._data.uid.toString());

            this.label_typejoin.setVisible(this._data.apply_type == 0);
            this.label_typeout.setVisible(this._data.apply_type == 1);
            this.label_time.setString("时间:" + new Date(this._data.apply_time*1000).format("yyyy-MM-dd hh:mm"));
            this.checkbox_online.setSelected(!!this._data.is_online);

            NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.gender, (url) => {
                if (!self._data) return false;
                if (url !== self._data.uurl) {
                    return false;
                }
                return true;
            });
            this.img_head.setVisible(true);
        }
    }

    interface IIG_Table_CELL_PLAYER {
        layout_player: ccui.Layout, //玩家块本身
        img_head: ccui.ImageView, //头像
        label_uname: ccui.Text,//用户名
        btn_sit: ccui.Button,//积分
    }

    export class TH_InGameTable_Cell extends kaayou.Block implements common.IPullListCell {
        constructor() {
            super();
        }
        _index = -1;
        setIndex(index) {
            this._index = index;
        }
        getIndex() {
            return this._index;
        }

        btn_dis: ccui.Button = null;
        label_gameRule: ccui.Text = null;
        label_roomNum: ccui.Text = null;
        label_seq: ccui.Text = null;   //序号标签
        label_gameing: ccui.Text = null;   //玩法标签
        lbNotStart:ccui.Text=null;
        playerItems: Array<IIG_Table_CELL_PLAYER> = null;
        layout_player_group: ccui.Layout = null;
        _data: tea.Data_HosueFtableItems = null;
        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.label_seq = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_seq");
            this.label_gameing = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_gameing");
            this.lbNotStart = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NotStart");
            this.label_gameRule = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Text_rule");
            this.label_roomNum = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Text_num");
            //player
            this.playerItems = [];
            for (var i = 0; i < 5; i++) {
                let it: IIG_Table_CELL_PLAYER = {
                    layout_player: null,
                    img_head: null,
                    label_uname: null,
                    btn_sit: null,
                }
                it.layout_player = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_player" + i);
                it.img_head = ccui.helper.seekWidgetByName(it.layout_player, "img_head");
                it.label_uname = ccui.helper.seekWidgetByName(it.layout_player, "label_uname");
                it.btn_sit = ccui.helper.seekWidgetByName(it.layout_player, "btn_sit");
                this.playerItems.push(it);
            }

            this.layout_player_group = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_player_group");
            this.layout_player_group.on(kaayou.TouchEvent.TouchEnd, () => {
                let self = this;
                if (!this._data) { return; }
                if (!this._data.fid) { return; }
                if (this._data.ntid == undefined) { return; }
                if(this._data.begin){
                    kaayou.emit("common","ui::Toast::Show",{msg:"该桌已开始，请尝试其它桌"});
                    return;
                }
                if (self._data.trule && self._data.trule.playernum && self._data.tmemitems.length >= self._data.trule.playernum) {
                    kaayou.emit("common","ui::Toast::Show",{msg:"该桌已满，请尝试其它桌"});
                    return;
                }
                kaayou.emit("tea", 'mod::GameTable::ChangeJoin', { fid: self._data.fid, ntid: self._data.ntid, package_key: self._data.package_key });
            }, this);

            this.btn_dis = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_dis");
            this.btn_dis.on(kaayou.TouchEvent.TouchEnd, () => {
                if (!this._data) { return; }
                if (!this._data.fid) { return; }
                if(!this._data.tid && !this._data.atid){ return; } //没有人的空桌子
                let self = this;
                let tableid=self._data.tid;
                let msg=`是否解散【${self._data.kname}-房号：${tableid}】的牌桌吗？`;
                if(self._data.tid==0){
                    tableid=self._data.atid;
                    msg=`是否解散牌桌？`;
                } 
                let options = {
                    msg: msg,
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.emit("tea", 'mod::GameTable::TableDismiss', { fid: self._data.fid, tid: tableid });
                            },
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            colorType: 'blue'
                        }
                    ]
                }
                kaayou.emit('common', 'ui::Dialog::Show', options);
            }, this);
        }


        reset() {
            this.label_seq.setString("");
            this.label_gameing.setVisible(false);
            this.lbNotStart.setVisible(false);
            this.label_gameRule.setString("");
            this.label_roomNum.setString("");
            this.btn_dis.setVisible(false);
            this.resetPlayers();
        }

        resetPlayers() {
            lodash.forEach(this.playerItems, (v: IIG_Table_CELL_PLAYER, i) => {
                v.label_uname.setString("");
                v.img_head.setVisible(false);
                v.btn_sit.setVisible(true);
                v.layout_player.setVisible(false);
            });
        }

        setInfo(data: tea.Data_HosueFtableItems) {
            var self = this;
            if( lodash.isEqual(this._data , data)){return;}
            this._data = !!data ? lodash.cloneDeep(data) : null;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            this.label_seq.setString((this.getIndex() + 1).toString());
            this.label_gameing.setVisible(!!this._data.begin);
            this.lbNotStart.setVisible(!this._data.begin);
            this.label_gameRule.setString(kaayou.Identify.nickNameSubFive(this._data.kname));
            if (this._data.tid && this._data.tmemitems && this._data.tmemitems.length > 0) {
                this.label_roomNum.setString("房号：" + this._data.tid);
            } else {
                this.label_roomNum.setString("");
            }
            this.btn_dis.setVisible(this._data.showdis);
            this.setPlayerInfo();
        }

        setPlayerInfo() {
            this.resetPlayers();
            let self = this;

            let maxScore = 0;
            let __player = this._data.tmemitems;
            if (!__player) { return; }

            lodash.forEach(this.playerItems, (v: IIG_Table_CELL_PLAYER, i) => {
                if (!v) { return; }
                let it = __player[i];
                if (!it) { 
                    //未开始的桌子，按最大人数显示
                    if (!self._data.begin && i < self._data.trule.playernum) {
                        v.layout_player.setVisible(true);
                    }
                    return; 
                }
                v.btn_sit.setVisible(false);
                v.label_uname.setString(kaayou.Identify.nickNameSubByLength(it.uname, 6, 4));
                NetImage.setPlayerHead(v.img_head, it.uurl, it.ugender || 0, (url) => {
                    if (!self._data) return false;
                    if (!self._data.tmemitems) return false;
                    if (!self._data.tmemitems[i]) return false;
                    if (url !== self._data.tmemitems[i].uurl) {
                        return false;
                    }
                    return true;
                });
                v.img_head.setVisible(true);
                v.layout_player.setVisible(true);
            });
        }
    }


    class TH_InGameMem_Cell extends kaayou.Block implements common.IPullListCell {
        constructor() {
            super();
        }
        _index = -1;
        setIndex(index) {
            this._index = index;
        }
        getIndex() {
            return this._index;
        }
        img_head: ccui.ImageView = null;   //头像
        label_uname: ccui.Text = null;   //用户名称标签
        label_online: ccui.Text = null;   //用户id标签
        btn_invite: ccui.Button = null;   //详情按钮
        label_invite_detail: ccui.Text = null;
        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);

            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.label_uname = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_uname");
            this.label_online = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_online");
            this.btn_invite = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_invite");
            this.label_invite_detail = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_invite_detail");

            let ctrName = this.getModuleName();
            let setSearchEventName = "ui::record::setSearch";
            let subpageChangeEventName = "ui::record::SubpageChange";
            this.btn_invite.on(kaayou.TouchEvent.TouchEnd, () => {
                if (!this._data) { return; }
                if (!this._data.uid) { return; }
                kaayou.emit("tea", "mod::GameTable::InviteUser", { uid: this._data.uid });
                // kaayou.emit(ctrName, subpageChangeEventName, { index: 2, searchkeep: true });
            }, this);
           
        }


        reset() {
            this.img_head.setVisible(false);
            this.label_uname.setString("");
            this.label_online.setString("");
            this.label_invite_detail.setString("");
            this.unscheduleUpdate();
            // this.btn_invite 
        }
        _caninvite = false;
        _data: tea.ITH_DATA_USER_INFO = null;


        setInfo(data: tea.ITH_DATA_USER_INFO) {
            var self = this;
            if( lodash.eq(this._data , data)){return;}
            this._data = !!data ? lodash.cloneDeep(data) : null;
            if (!data || lodash.isEmpty(data)) {
                return this.reset();
            }

            this.label_uname.setString(kaayou.Identify.nickNameSubByLength(this._data.uname, 6, 4));
            if(this._data.inTable) this.label_online.setString("游戏中");
            else this.label_online.setString(!!this._data.is_online ? "在线" : "离线");
            this.label_online.setTextColor(!!this._data.is_online ? cc.color("#288728") : cc.color("#C43304"));

            this.checkCanInvite();

            NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.gender, (url) => {
                if (!self._data) return false;
                if (url !== self._data.uurl) {
                    return false;
                }
                return true;
            });
            this.img_head.setVisible(true);
        }

        checkCanInvite() {
            let lastcan = this._caninvite;
            this._caninvite = false;
            if (!this._data.lastInvite) {
                this._data.lastInvite = Date.Unix() - 4;
            }
            let ltime = Date.Unix() - this._data.lastInvite;
            this._caninvite = !!this._data.is_online && (ltime > 3);
            if (lastcan != this._caninvite) {
                this.btn_invite.setBright(this._caninvite);
                this.btn_invite.setEnabled(this._caninvite);
                if (this._caninvite) {
                    this.label_invite_detail.setString("");
                    this.unscheduleUpdate();
                } else {
                    let d = Math.floor((this._data.lastInvite + 3  - Date.Unix()));
                    if (d >= 0) {
                        this.label_invite_detail.setString(d + "");
                        this.scheduleUpdate();
                    } else {
                        this.label_invite_detail.setString("");
                        this.unscheduleUpdate()
                    }
                }
            }

        }
        _dtaileTime = 0;
        update(dt) {
            if (!this._data || this._caninvite) {
                this._dtaileTime = 0;
                return;
            }
            this._dtaileTime += dt;
            if (this._dtaileTime < 0.5) { return; }
            this._dtaileTime = 0;
            let lastInvite = this._data.lastInvite;
            if (!lastInvite) { return; }
            let d = Math.floor((lastInvite + 3  - Date.Unix()));
            if (d >= 0) {
                this.label_invite_detail.setString(d + "");
            } else {
                this._caninvite = !!this._data.is_online;
                this.label_invite_detail.setString("");
                this.btn_invite.setBright(this._caninvite);
                this.btn_invite.setEnabled(this._caninvite);
                this.unscheduleUpdate();
            }



        }
    }

    export abstract class InGameTeaHousePanel extends kaayou.Layer {
        constructor() {
            super();
            this.initUI();
        }
        _data=null;
        btn_close: ccui.Button = null;
        dataApply=null;
        dataOnline=null;
        layout_title: ccui.Layout = null;
        layout_pageGroup: ccui.Layout = null;
        lbHouseId:ccui.Text=null;

        scr_apply: PullList = null;
        scr_tables: PullList = null;
        scr_member: PullList = null;
        tea_apply_cell: ccui.Layout = null;  //申请cell
        tea_table_cell: ccui.Layout = null;  //桌子cell
        tea_invite_cell: ccui.Layout = null;  //邀请cell

        auth() {
            if (this._data.user_info.partner == 1 && this._data.is_partner_apply != true) {
                kaayou.emit(this.getModuleName(), "ui::ApplyRow::HideButton");
            } else {
                kaayou.emit(this.getModuleName(), "ui::ApplyRow::ShowButton");
            }
        }

        initWithccs(path: string = '', full: boolean = true) {
            if (!lodash.isString(path) || lodash.isEmpty(path)) {
                path = common.res.InGameTeaHousePanel_json;
            }
            super.initWithccs(path, full);
        }
        abstract getModuleName(): string;
        abstract getNetName(): string;
        initUI() {
            let self=this;
            this.initWithccs();
            this.lbHouseId=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "HouseID");

            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");


            this.btn_close.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                this.Hide();
            }, this)


            this.layout_title = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_title");
            this.layout_pageGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_pageGroup");

            let ctrName = this.getModuleName();
            let subpageChangeEventName = "ui::ingame::subpagechange";
            lodash.forEach(this.layout_title.getChildren(), (v: ccui.CheckBox, i) => {
                v['index'] = i;
                v['onSubpageChange'] = function (e: kaayou.Event) {
                    let _data = e.data;
                    let { index } = _data;

                    if (index > 1) {
                        this.setVisible(this.index > 1);
                    } else {
                        this.setVisible(this.index <= 1);
                    }

                    if (this.index > 1) {
                        return;
                    }

                    if (this.index == index) {
                        this.setSelected(true);
                    } else {
                        this.setSelected(false);
                    }
                }
                kaayou.getController(ctrName).on(subpageChangeEventName, v['onSubpageChange'], v);
                if (i > 1) {
                    // v.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                    //     let target = e.target;
                    //     let { index } = target;
                    //     kaayou.emit(ctrName, subpageChangeEventName, { index })
                    // }, this);
                    return;
                }
                v.on(kaayou.CheckEvent.SELECTED, (e: kaayou.TouchEvent) => {
                    let target = e.target;
                    let { index } = target;
                    kaayou.emit(ctrName, subpageChangeEventName, { index })
                }, this);
                v.on(kaayou.CheckEvent.UNSELECTED, (e: kaayou.TouchEvent) => {
                    let target = e.target;
                    let { index } = target;
                    kaayou.emit(ctrName, subpageChangeEventName, { index })
                }, this);
            })
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onPageChange, this);

            kaayou.getController(ctrName).on("ui::ApplyList::Add",function (e: kaayou.Event) {
                self.dataApply.push(e.data);
                this.doUpdateApply(self.dataApply);
            }, this);
            
            kaayou.getController(ctrName).on("ui::OnlineList::InTable",function (e: kaayou.Event) {
                for(let i=0;i<self.dataOnline.length;++i){
                    if(self.dataOnline[i].uid==e.data.uid){
                        self.dataOnline.splice(i,1);
                        break;
                    }
                }
                this.doUpdateMember(self.dataOnline);
            }, this);

            this.initApplyList();
            this.initMemList();
            this.initTableList();
            this.bindUIEvents();
        }

        onPageChange(e: kaayou.Event) {
            let _data = e.data;
            let { index } = _data;
            if (index > 1) {
                index = 1;
            }
            lodash.forEach(this.layout_pageGroup.getChildren(), (v: ccui.Layout, i: number) => {
                v.setVisible(i == index);
            });
        }

        initApplyList() {
            this.tea_apply_cell = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_apply_cell");
            this.scr_apply = new common.PullList();
            this.scr_apply.initWithNode(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "scr_apply"));
            this.scr_apply.setSpacingY(8);
            this.scr_apply.setEnabledBar(false);
            this.scr_apply.setAdpter({
                datas: [],
                getCell: () => {
                    return this.getApplyCell();
                }
            })
            this.scr_apply.initPullEnv(false);
        }
        getApplyCell(): common.IPullListCell {
            let v = new TH_InGameApply_Cell();
            v.setModuleName(this.getModuleName());
            v.initWithNode(this.tea_apply_cell);
            return v;
        }
        onUpdateApply(e: kaayou.Event) {
            this.doUpdateApply(e.data);
        }

        doUpdateApply(data: tea.ITH_DATA_USER_INFO[]) {
            this.dataApply=data;
            this.scr_apply.getAdpter().datas = lodash.clone(data);
            this.scr_apply.refresh();
            this.auth();
        }
        initMemList() {
            this.tea_invite_cell = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_invite_cell");
            this.scr_member = new common.PullList();
            this.scr_member.initWithNode(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "scr_member"));
            this.scr_member.setSpacingY(8);
            this.scr_member.setEnabledBar(false);
            this.scr_member.setAdpter({
                datas: [],
                getCell: () => {
                    return this.getMemCell();
                }
            });
            this.scr_member.initPullEnv(false);
        }

        getMemCell(): common.IPullListCell {
            let v = new TH_InGameMem_Cell();
            v.setModuleName(this.getModuleName());
            v.initWithNode(this.tea_invite_cell);
            return v;
        }

        onUpdateMember(e: kaayou.Event) {
            this.doUpdateMember(e.data);
        }
        doUpdateMember(data: tea.ITH_DATA_USER_INFO[]) {
            this.dataOnline=data;
            this.scr_member.getAdpter().datas = lodash.clone(data);
            this.scr_member.refresh();
        }
        initTableList() {
            this.tea_table_cell = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_table_cell");
            this.scr_tables = new common.PullList();
            this.scr_tables.initWithNode(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "scr_tables"))
            this.scr_tables.setSpacingY(8);
            this.scr_tables.setEnabledBar(false);
            this.scr_tables.setAdpter({
                datas: [],
                getCell: () => {
                    return this.getTableCell();
                }
            });
            this.scr_tables.initPullEnv(false);
        }
        getTableCell(): common.IPullListCell {
            let v = new TH_InGameTable_Cell();
            v.setModuleName(this.getModuleName());
            v.initWithNode(this.tea_table_cell);
            return v;
        }
        onUpdateTable(e: kaayou.Event) {
            this.doUpdateTable(e.data);
        }

        doUpdateTable(data: Array<tea.Data_HosueFtableItems>) {
            this.scr_tables.getAdpter().datas = lodash.clone(data)||[];
            this.scr_tables.refresh();
        }

        bindUIEvents() {
            kaayou.getController(this.getModuleName()).on("ui::ingame::updateApply", this.onUpdateApply, this);
            kaayou.getController(this.getModuleName()).on("ui::ingame::updateMember", this.onUpdateMember, this);
            kaayou.getController(this.getModuleName()).on("ui::ingame::updateTable", this.onUpdateTable, this);
        }

        Show(data: tea.ITH_DATA_INGAME_HouseInfo) {
            this._data=data;
            let ctrName = this.getModuleName();
            let subpageChangeEventName = "ui::ingame::subpagechange";
            if (!data.user_info) {
                kaayou.emit(ctrName, subpageChangeEventName, { index: 2 })
            } else {
                if (data.user_info.urole == tea.HouseMemberRole.OWNER || data.user_info.urole == tea.HouseMemberRole.ADMIN
                    || data.user_info.partner == 1) {
                    kaayou.emit(ctrName, subpageChangeEventName, { index: 1 })
                    if (data.apply_users) {
                        this.doUpdateApply(data.apply_users);
                    }
                } else {
                    kaayou.emit(ctrName, subpageChangeEventName, { index: 2 })
                }
            }

            if (data.ftableitems) {
                this.doUpdateTable(data.ftableitems);
                this.scr_tables.setScrollToOffsetTop(0);
            }
            if (data.online_users) {
                this.doUpdateMember(data.online_users);
            }
            if (data.hid > 0) {
                this.lbHouseId.setString("亲友圈："+data.hid);
            } else {
                this.lbHouseId.setString("");
            }
            this.auth();
            this.setVisible(true);
        }

        Hide() {
            kaayou.emit("tea", "mod::GameTable::unsubscriptionFloor", { netname: this.getNetName(), modulename: this.getModuleName() });
            this.setVisible(false)
        }
    }
}