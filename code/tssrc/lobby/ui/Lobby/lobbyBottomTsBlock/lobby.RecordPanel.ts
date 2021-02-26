namespace lobby {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class RecordCell extends kaayou.Block {
        constructor() {
            super();
        }

        img_iconBg: ccui.ImageView = null;
        txt_wf: ccui.Text = null;
        txt_roomNum: ccui.Text = null;
        txt_playCount: ccui.Text = null;
        txt_peopleCount: ccui.Text = null;
        txt_playTime: ccui.Text = null;
        code: string = "";
        mjIcon: ccui.ImageView = null;
        playerName: Array<ccui.Text> = [];
        playerScore: Array<ccui.Text> = [];
        btn_detail: ccui.Button = null;


        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);

            this.img_iconBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_iconBg");
            this.txt_wf = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "txt_wf");
            this.txt_roomNum = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "txt_roomNum");
            this.txt_playCount = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "txt_playCount");
            this.txt_peopleCount = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "txt_peopleCount");
            this.txt_playTime = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "txt_playTime");
            this.btn_detail = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_detail");
            let txt_play1 = ccui.helper.seekWidgetByName<ccui.Text>(<ccui.Widget>this.node, "txt_play1");
            let txt_play2 = ccui.helper.seekWidgetByName<ccui.Text>(<ccui.Widget>this.node, "txt_play2");
            let txt_play3 = ccui.helper.seekWidgetByName<ccui.Text>(<ccui.Widget>this.node, "txt_play3");
            let txt_play4 = ccui.helper.seekWidgetByName<ccui.Text>(<ccui.Widget>this.node, "txt_play4");
            let txt_play5 = ccui.helper.seekWidgetByName<ccui.Text>(<ccui.Widget>this.node, "txt_play5");

            let txt_Score1 = ccui.helper.seekWidgetByName<ccui.Text>(<ccui.Widget>this.node, "txt_score1");
            let txt_Score2 = ccui.helper.seekWidgetByName<ccui.Text>(<ccui.Widget>this.node, "txt_score2");
            let txt_Score3 = ccui.helper.seekWidgetByName<ccui.Text>(<ccui.Widget>this.node, "txt_score3");
            let txt_Score4 = ccui.helper.seekWidgetByName<ccui.Text>(<ccui.Widget>this.node, "txt_score4");
            let txt_Score5 = ccui.helper.seekWidgetByName<ccui.Text>(<ccui.Widget>this.node, "txt_score5");

            this.mjIcon = ccui.helper.seekWidgetByName<ccui.ImageView>(<ccui.Widget>this.node, "Image_gameIcon");
            txt_play1.setVisible(false);
            txt_play2.setVisible(false);
            txt_play3.setVisible(false);
            txt_play4.setVisible(false);
            txt_play5.setVisible(false);

            this.playerName = [];
            this.playerName.push(txt_play1);
            this.playerName.push(txt_play2);
            this.playerName.push(txt_play3);
            this.playerName.push(txt_play4);
            this.playerName.push(txt_play5);

            this.playerScore = [];
            this.playerScore.push(txt_Score1);
            this.playerScore.push(txt_Score2);
            this.playerScore.push(txt_Score3);
            this.playerScore.push(txt_Score4);
            this.playerScore.push(txt_Score5);

            this.btn_detail.on(kaayou.TouchEvent.TouchEnd,  ()=> {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('lobby', "mod::Record::GetRecordAllDetail", { gamenum: this.code, gname:this.txt_wf.getString()});
            }, this);
        }

        setInfo(data: {
            gamenum: number, icon: string, roomid: number, wf: string, time: number, curNum: number,
            playerArr: Array<{ nickname: string, score: number }>, player_count: number, round_played: number, round_sum, number
        }) {
            let self = this;
            self.code = data.gamenum.toString();
            // NetImage.doLoadHeadImageWithLayout(0, data.icon, this.mjIcon, this.img_iconBg.getContentSize(), function () { });
            NetImage.setPlayerHead(this.mjIcon, data.icon);

            self.txt_playCount.setString(data.round_played + "/" + data.round_sum + "局 ");
            self.txt_peopleCount.setString(data.player_count + "人");
            self.txt_roomNum.setString(String('房号' + data.roomid));
            self.txt_wf.setString(data.wf);
            self.txt_playTime.setString(new Date(data.time * 1000).format("yyyy-MM-dd hh:mm"));

            for (var i = 0; i < data.playerArr.length; i++) {
                //从支持5人开始，只保留4个字
                let tempNickName = kaayou.Identify.nickNameSubByLength(data.playerArr[i].nickname, 4, 4);
                self.playerName[i].string = tempNickName;
                self.playerName[i].setVisible(true);
                self.playerScore[i].string = data.playerArr[i].score + "";
                if (data.playerArr[i].score < 0) {
                    self.playerScore[i].setTextColor(cc.color(0, 140, 7));
                } else {
                    self.playerScore[i].setTextColor(cc.color(255, 73, 37));
                }
            }
        }

        unuse() {
            this.removeFromParent();
        }
    }

    export class LobbyRecordPanelMgr {
        static __INS__: LobbyRecordPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (LobbyRecordPanelMgr.__INS__ == null) {
                LobbyRecordPanelMgr.__INS__ = new LobbyRecordPanelMgr();
                LobbyRecordPanelMgr.__INS__.init();
                LobbyRecordPanelMgr.__INS__._zOrder = _zOrder;
            }
            return LobbyRecordPanelMgr.__INS__;
        }
        public _zOrder = 0;
        __selfPanel: LobbyRecordPanel = null;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('lobby').on('ui::Record::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('lobby').on('ui::Record::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new LobbyRecordPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder)
            }
            return this.__selfPanel;
        }

    }

    export class LobbyRecordPanel extends kaayou.Layer {
        constructor() {
            super();
            this.initWithccs(lobby.res.RecordPanel_json);
            this.initUI();
        }

        iMenuIndex: number = 0;//左侧第几个菜单项
        iLastInnerHeight: number = 0;//翻页前内高
        ivTips: ccui.ImageView = null;
        topbarMgr: lobby.TopBarMgr = null;

        svRecord: ccui.ScrollView = null;
        btn_playBack: ccui.Button = null;
        menuGroup: common.RadioGroup = null;
        record_mode: Node = null;

        //@doBindEvent
        initUI() {
            let self = this;

            this.record_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "record_mode");

            this.topbarMgr = new TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
            this.topbarMgr.setTitle("我的战绩");
            this.topbarMgr.setOnCloseClick(function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }.bind(this));

            this.btn_playBack = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_playBack");
            this.ivTips = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_tips");
            this.svRecord = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "record_list");

            let leftLayout: cc.Node = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "left");

            this.ivTips.setVisible(false);

            this.btn_playBack.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby", 'ui::JoinRecord::Show');
            }, this);

            this.menuGroup = new common.RadioGroup();
            lodash.forEach(leftLayout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, self.onMenuSelected, self);
                self.menuGroup.add(v);
            })

            this.svRecord.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.svRecord.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);

            this.svRecord.addEventListener(function (scroll: ccui.ScrollView, e) {
                //e==1回弹
                if (1 == e && !scroll['needUpdate']) {
                    scroll['needUpdate'] = true;
                    scroll['needUpdateOffsetTop'] = scroll['getInnerOffSetTop']();
                    this.refreshView(false);
                }
            }.bind(this));

            kaayou.getController('lobby').on('ui::RePlay::Show', function (e: kaayou.Event) {
                self.setRePlayList(e.data);
            }, this, 10);

            this.Hide();
        }

        onMenuSelected(e: kaayou.RadioEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let index = e.target['index'];
            this.iMenuIndex = index;

            kaayou.pool.putAllChildrenInPool(this.svRecord);
            this.svRecord.jumpToTop();
            // this.svRecord.scrollToTop(0,false);
            this.refreshView(true);
        }

        Today(clear) {
            //发送今日战绩

            kaayou.emit('lobby', "mod::Record::GetRecord", { start: 0, end: 0, clear: clear });
        }

        Yesterday(clear) {
            kaayou.emit('lobby', "mod::Record::GetRecord", { start: 1, end: 1, clear: clear });
        }

        BeforeYesterday(clear) {
            kaayou.emit('lobby', "mod::Record::GetRecord", { start: 2, end: 2, clear: clear });
        }

        Week(clear) {
            kaayou.emit('lobby', "mod::Record::GetRecord", { start: 1, end: 7, clear: clear });
        }

        refreshView(clear) {
            kaayou.emit('common', 'ui::Loading::Show');
            switch (this.iMenuIndex) {
                case 0:
                    this.Today(clear);
                    break;
                case 1:
                    this.Yesterday(clear);
                    break;
                case 2:
                    this.BeforeYesterday(clear);
                    break;
                case 3:
                    this.Week(clear);
                    break;
            }
        }

        private createCell(): RecordCell {
            let cell = kaayou.pool.getFromPool(RecordCell);
            if (!cell) {
                cell = new RecordCell();
            }
            cell.initWithNode(this.record_mode);

            // cell.setAnchorPoint(0.5, 0);
            cell.setPositionX(0);
            return cell;
        }


        //@BindEvent("lobby", 'ui::Record::Show')
        Show() {
            let check: ccui.CheckBox = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CheckBox_0");
            check.setRadioSelected();
            this.setVisible(true);
            kaayou.pop.ShowMainAnim({
                tNode: ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"),
                bNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName('maskbg'),
            });
        }

        //@BindEvent("lobby", 'ui::Record::Hide')
        Hide() {
            this.setVisible(false);
        }

        // @BindEvent('lobby','ui::RePlay::Show')
        setRePlayList(data) {
            let self = this;
            let sv = this.svRecord;
            var offset = sv.getInnerOffSetTop();
            sv['needUpdate'] = false;
            kaayou.pool.putAllChildrenInPool(sv);
            let tempData = lodash.clone(data);
            if (!tempData || !lodash.isArray(tempData) || tempData.length < 1) {
                this.ivTips.setVisible(true);
                return;
            }
            //kaayou.emit("common","ui::Toast::Show",{msg:"查询到"+tempData.length+"条战绩"});
            kaayou.emit('common', 'ui::Loading::Hide');
            this.ivTips.setVisible(false);
            lodash.forEach(data, function (v) {
                let cell = self.createCell();
                cell.setInfo(v);
                sv.addChild(cell);
            });
            sv.doChildrenLayout();
            offset = Math.min(-1 * Math.abs(Math.max(sv.getInnerContainerSize().height - sv.getLayoutSize().height) - offset), 0);
            console.log("offset:", offset);
            sv.setInnerContainerPosition(cc.p(0, offset));
            // let layoutHeight=sv.getLayoutSize().height;
            // sv.jumpToPercentVertical(this.iLastInnerHeight-layoutHeight/sv.getInnerContainer().height*100);
            // this.iLastInnerHeight=sv.getInnerContainer().height;
        }
    }
}