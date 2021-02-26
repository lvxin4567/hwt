namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;

    interface ITH_DETAIL_CELL_PLAYER {
        layout_player: ccui.Layout, //玩家块本身
        img_head: ccui.ImageView, //头像
        label_uname: ccui.Text,//用户名
        label_uscore: ccui.Text,//积分
    }


    class TH_RC_Detail_Cell extends kaayou.Block implements common.IPullListCell {
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

        label_seq: ccui.Text = null;   //序号标签
        label_time: ccui.Text = null;   //时间标签(天)

        bg: ccui.Layout = null;



        btn_record: ccui.Button = null;   //回放按钮
        btn_share: ccui.Button = null;   //分享按钮
        playerItems: Array<ITH_DETAIL_CELL_PLAYER> = null;


        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.bg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bg");
            this.label_seq = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_seq");
            this.label_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_time");

            this.btn_record = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_record");
            this.btn_share = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_share");



            //player
            this.playerItems = [];
            for (var i = 0; i < 5; i++) {
                let it: ITH_DETAIL_CELL_PLAYER = {
                    layout_player: null,
                    img_head: null,
                    label_uname: null,
                    label_uscore: null,
                }
                it.layout_player = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_player" + i);
                it.img_head = ccui.helper.seekWidgetByName(it.layout_player, "head");
                it.label_uname = ccui.helper.seekWidgetByName(it.layout_player, "label_uname");
                it.label_uscore = ccui.helper.seekWidgetByName(it.layout_player, "label_uscore");
                this.playerItems.push(it);
            }

            this.btn_share.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);

                if (!self._data) { return; }
                if (!self._data.replayid) { return; }

                let info = JSON.parse(kaayou.DataSet.get("user::info"))
                if (!info) { return; }
                if (!info.name) { return; }

                var pos = self.btn_share.parent.convertToWorldSpace(self.btn_share.getPosition());
                let data = {
                    type: common.mod.SHARE_TYPE.LOBBY_RECORD,
                    title: "",
                    text: "玩家【" + info.name + "】分享了一个回放码：" + self._data.replayid + "，进入斗棋后，打开战绩点击查看回放按钮，输入回放码点击确定即可查看。",
                    url: "",
                }
                kaayou.emit("lobby", "ui::ShareRecordPanel::Show", { pos: cc.p(pos.x, pos.y), shareData: data, hideWX: !tea.mod.__teaHouseInfo.hm_switch.BanWeChat })
            }, this);

            this.btn_record.on(kaayou.TouchEvent.TouchEnd, kaayou.TouchMask.clickHandle(function () {
                // self.btn_record.setEnabled(false);
                kaayou.emit("common", "ui::Loading::Show");
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self._data) { return; }
                if (!self._data.replayid) { return; }            //这个地方是取做回放的
                // self.btn_record.setEnabled(true);
                kaayou.emit("common", "mod::Record::RunData", { replayid: self._data.replayid })
            }, this), this);
        }

        reset() {

            this.label_seq.setString("");
            this.label_time.setString("");
            this.btn_record.setVisible(false);
            this.btn_share.setVisible(false);
            this.resetPlayers();
        }


        resetPlayers() {
            lodash.forEach(this.playerItems, (v: ITH_DETAIL_CELL_PLAYER, i) => {
                v.label_uname.setString("");
                v.label_uscore.setString("");
                v.img_head.setVisible(false);
                v.layout_player.setVisible(false);
            });
        }


        _data: ITH_RECORD_DETAIL_ITEM = null;
        setInfo(data: ITH_RECORD_DETAIL_ITEM) {
            if (lodash.eq(this._data, data)) { return; }
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            let seq = this.getIndex() + 1;

            this.label_seq.setString(`第${seq}局`);
            this.label_time.setString(Date.format(this._data.endtime * 1000, "yyyy-MM-dd hh:mm:ss"));
            this.btn_record.setVisible(true);
            this.btn_share.setVisible(true);
            this.setPlayerInfo();
        }

        setPlayerInfo() {
            this.resetPlayers();
            let self = this;

            let maxScore = 0;
            let __player = this._data.player;
            if (!__player) { return; }
            lodash.forEach(__player, (it: ITH_DATA_RECORD_PLAYER, i) => {
                maxScore = Math.max(maxScore, it.score);
            });

            lodash.forEach(__player, (it: ITH_DATA_RECORD_PLAYER, i) => {
                let v = this.playerItems[i];
                v.label_uname.setString(kaayou.Identify.nickNameSubByLength(it.nickname, 4, 4));
                let sctext = it.score > 0 ? "+" + it.score : it.score.toString();
                v.label_uscore.setString(sctext);
                v.label_uscore.setTextColor(it.score > 0 ? cc.color("#ff4925") : cc.color("#008c07"));
                NetImage.setPlayerHead(v.img_head, it.headurl, it.sex || 0, (url) => {
                    if (!self._data) return false;
                    if (!self._data.player) return false;
                    if (!self._data.player[i]) return false;
                    if (url !== self._data.player[i].headurl) {
                        return false;
                    }
                    return true;
                });
                v.img_head.setVisible(true);
                v.layout_player.setVisible(true);
            });

        }
    }

    export class tea_TeaRecordDetailPanelMgr {
        static __INS__: tea_TeaRecordDetailPanelMgr = null;
        static getInstance(z) {
            if (tea_TeaRecordDetailPanelMgr.__INS__ == null) {
                tea_TeaRecordDetailPanelMgr.__INS__ = new tea_TeaRecordDetailPanelMgr();
                tea_TeaRecordDetailPanelMgr.__INS__.init();
                tea_TeaRecordDetailPanelMgr.__INS__._zindex = z;
            }
            return tea_TeaRecordDetailPanelMgr.__INS__;
        }
        _zindex: number = null;
        __selfPanel: RecordDetail = null;

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::recordDetail::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::recordDetail::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new RecordDetail();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zindex);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }


    export class RecordDetail extends kaayou.Layer {
        constructor() {
            super();
            this.initUI();
        }
        lb_gamename: ccui.Text;
        

        btn_close: ccui.Button;
        btn_copy_allrecord: ccui.Button;
        btn_share_image: ccui.Button;

        recordsum: ccui.ScrollView
        memberlist: ccui.Layout

        SV_pullList: common.PullList

        th_record_detail_cell_mode: ccui.Layout = null;

        _info: ITH_RECORD_DETAIL_INFO
        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.RecordDetailDialog_json);
            let self = this;
            
            this.lb_gamename = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lb_gamename");

            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_copy_allrecord = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_copy_allrecord");
            this.btn_share_image = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_share_image");

            this.recordsum = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "recordsum");
            this.memberlist = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "memberlist");

            this.btn_copy_allrecord.on(kaayou.TouchEvent.TouchEnd, () => {
                this.copyrecord();
            }, this)

            this.btn_share_image.on(kaayou.TouchEvent.TouchEnd, () => {
                let pos = self.btn_share_image.parent.convertToWorldSpace(self.btn_share_image.getPosition());
                pos.y -= 150;
                let config = {
                    type: common.mod.SHARE_TYPE.LOBBY_RECORD,
                    title: "",
                    text: ""
                }
                //kaayou.emit("lobby", "ui::ShareRecordPanel::Show", { pos: cc.p(pos.x, pos.y), shareData: config, type: "image", hideWX: !tea.mod.__teaHouseInfo.hm_switch.BanWeChat })
                kaayou.emit("lobby", "ui::ShareRecordPanel::Show", { pos: cc.p(pos.x, pos.y), shareData: this._info, type: "node", hideWX: !tea.mod.__teaHouseInfo.hm_switch.BanWeChat })
            }, this)

            this.recordsum.setPadding({ spacingX: 10 });
            this.recordsum.getChildren().forEach(v => v.setVisible(false));

            this.th_record_detail_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "th_record_detail_cell");

            this.btn_close.on(kaayou.TouchEvent.TouchEnd, () => {
                this.Hide();
            }, this)

            let listcontent: ccui.ScrollView = ccui.helper.seekWidgetByName(<ccui.Widget>this.memberlist, "content");

            this.SV_pullList = new common.PullList()
            this.SV_pullList.setSpacingY(10)
            this.SV_pullList.initWithNode(listcontent)
            this.SV_pullList.setAdpter({
                getCell: () => {
                    let item = new TH_RC_Detail_Cell();
                    item.initWithNode(this.th_record_detail_cell_mode)
                    return item;
                },
                datas: []
            });



            this.SV_pullList.setFootDoingText(" ");
            this.SV_pullList.setFootDidFinishText(" ");
            this.SV_pullList.setFootFinishText(" ");

            this.SV_pullList.setHeadDoingText(" ");
            this.SV_pullList.setHeadDidFinishText(" ");
            this.SV_pullList.setHeadFinishText(" ");
            this.SV_pullList.setEnabledBar(false);

            this.SV_pullList.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                this.SV_pullList.refresh();
            }, this);

            this.SV_pullList.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                this.SV_pullList.refresh();
            }, this);

            this.SV_pullList.initPullEnv(false);
            
            this.Hide();
        }

        copyrecord() {
            let inf = this._info
            let qid = tea.mod.__teaHouseInfo.hid
            let endtime: any = inf.list[inf.list.length - 1].endtime
            endtime = Date.format(endtime * 1000, "yyyy-MM-dd hh:mm:ss")
            let copyPasteString = inf.gname + "\n" +
                "亲友圈：" + qid + "\n" +
                "房号：" + inf.roomid + "\n" +
                "人数：" + inf.totallist.length + "\n" +
                "局数：" + inf.list.length + "/" + inf.totalround + "局\n" +
                "结束时间：" + endtime + "\n";

            let o = { idx: -1, score: -Infinity };

            inf.totallist.reduce((v, m, i) => {

                if (m.score > v.score) {
                    v.score = m.score;
                    v.idx = i;
                }

                return v;

            }, o)

            inf.totallist.forEach((v, i) => {
                copyPasteString += `【${v.nickname}】 ID:${v.uid} 总分数${v.score} ${o.idx === i ? "🌹" : ""}\n`;
                //201118不显示所属队长
                // if (v.cap_id > 1) {
                //     copyPasteString += `【队长】${v.cap_nickname}:${v.cap_id}\n`
                // } else if (v.cap_id == 1) {
                //     copyPasteString += `【队长】${v.nickname}:${v.uid}\n`
                // }
            });

            copyPasteString += "游戏结果仅供娱乐，禁止赌博！";
            console.log(copyPasteString);
            let isSuccess = kaayou.PlatformMgr.getInstance().sys.copyStringToPasteBoard(copyPasteString);
            if (isSuccess) {
                kaayou.emit('common', "ui::Toast::Show", { msg: "您的战绩已复制，请切换到微信粘贴战绩信息" })
            }
        }


        updateInfo() {
            let inf = this._info
            //楼层基本信息
            this.lb_gamename.setString(`${inf.gname}（${inf.floorindex + 1}楼） 房号：${inf.roomid}`)
            //统计部分
            let recordNodes = this.recordsum.getChildren();
            recordNodes.forEach((v, i) => {
                let node = recordNodes[i]
                node.setVisible(false);
            });
            inf.totallist.forEach((v, i) => {

                let node = recordNodes[i]
                node.setVisible(true);
                let head: ccui.ImageView = ccui.helper.seekWidgetByName(<ccui.Widget>node, "head");
                let uname: ccui.Text = node.getChildByName("lb_uname");
                let uid: ccui.Text = node.getChildByName("lb_uid");
                let score: ccui.Text = node.getChildByName("lb_score");
                let upartner: ccui.Text = node.getChildByName("lb_upartner");
                let showUp = v.cap_id > 1 && v.cap_id !== v.uid && tea.mod.__teaHouseInfo.hm_switch.IsRecShowParent;

                NetImage.setPlayerHead(head, v.imgurl, v.sex);
                uname.setString(kaayou.Identify.nickNameSubSix(v.nickname));
                uid.setString("ID:" + v.uid);
                let capName=kaayou.Identify.nickNameSubByLength(v.cap_nickname,5,5);

                upartner.setString(showUp ? `${v.cap_id}/${capName}` : "");
                upartner.setVisible(!!showUp)
                if (v.score >= 0) {
                    score.setString("+" + v.score)
                    score.setTextColor(cc.color("#FF4925"))
                } else {
                    score.setString(v.score + "")
                    score.setTextColor(cc.color("#008C07"));
                }

            })

            //列表部分
            this.SV_pullList.getAdpter().datas = inf.list;
            this.SV_pullList.refresh();

        }


        Show(data: ITH_RECORD_DETAIL_INFO) {
            this._info = data;
            this.node.setVisible(true);
            // kaayou.pop.showAni({
            //     cNode: this.node.getChildByName("contentPanel"),
            //     mNode: this.node.getChildByName("maskbg"),
            //     action: () => { 
            this.updateInfo();
            //     }
            // });

            // this.lbHouseId.setString("(" + data.gname + " " + "房号：" + data.roomid + ")");
            // this.scr_detail.getAdpter().datas = lodash.clone(data.list || []);
            // this.scr_detail.refresh();

        }
        // @BindEvent("tea", 'ui::recordDetail::Hide')
        Hide() {
            this.node.setVisible(false);
        }
    }
}