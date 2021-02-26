/**
 *  排行榜设置
 */

namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;

  export class tea_RankListSetMgr {
        static __INS__: tea_RankListSetMgr = null;
        static getInstance(_zOrder:number) {
            if (tea_RankListSetMgr.__INS__ == null) {
                tea_RankListSetMgr.__INS__ = new tea_RankListSetMgr();
                tea_RankListSetMgr.__INS__.init();
                tea_RankListSetMgr.__INS__._zOrder = _zOrder
            }
            return tea_RankListSetMgr.__INS__;
        }
        __selfPanel: RankListSetPanel = null;
        _zOrder:number = 0
        init() {
            let self = this;
            this.__selfPanel = null;
            // kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
            //     self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo();
            // }, this, 10);

            kaayou.getController('tea').on('ui::RankListSetPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::RankListSetPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new RankListSetPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }











    export class RankListSetPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        btn_set: ccui.Button = null;
        rankSwitch:ccui.Layout = null;
        rankSwitch_group:common.RadioGroup = null;
        rankSwitchNum:number = 0;

        playCountRank_layout:ccui.Layout = null;
        playWinRank_layout:ccui.Layout = null;
        playRecordRank:ccui.Layout = null;
  
        // btn_unfroze: ccui.Button = null;
        // froze: ccui.Layout = null;
        // unfroze: ccui.Layout = null;
        // label_tips: ccui.Text = null;

        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.RankListSetPanel_json);
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_set = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_set");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);

            this.btn_set.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.submitSet();                                
            }, this);
            this.rankSwitch = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rankSwitch");
            this.rankSwitch_group = new common.RadioGroup();
            lodash.forEach(this.rankSwitch.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                    self.rankSwitchNum = i;
                    console.log(i);
                }, self);
                v.on(kaayou.RadioEvent.UNSELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                    console.log(i);
                }, self);
                self.rankSwitch_group.add(v);
            });

            this.playCountRank_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "playCountRank");
            lodash.forEach(this.playCountRank_layout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = Math.pow(2,i);
                v.on(kaayou.CheckEvent.SELECTED, function () {
                    (<ccui.CheckBox>v.getChildByName("cb")).setSelected(true);
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                    console.log(v['index']);
                }, self);
                v.on(kaayou.CheckEvent.UNSELECTED, function () {
                    (<ccui.CheckBox>v.getChildByName("cb")).setSelected(false);
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                    // console.log(i);
                }, self);
            });
            
            this.playWinRank_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "playWinRank");
            lodash.forEach(this.playWinRank_layout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = Math.pow(2,i);
                v.on(kaayou.CheckEvent.SELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                    (<ccui.CheckBox>v.getChildByName("cb")).setSelected(true);
                    console.log(v['index']);
                }, self);
                v.on(kaayou.CheckEvent.UNSELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                    (<ccui.CheckBox>v.getChildByName("cb")).setSelected(false);
                    // console.log(i);
                }, self);
            });

            this.playRecordRank = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "playRecordRank");
            lodash.forEach(this.playRecordRank.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = Math.pow(2,i);
                v.on(kaayou.CheckEvent.SELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                    (<ccui.CheckBox>v.getChildByName("cb")).setSelected(true);
                    console.log(v['index']);
                }, self);
                v.on(kaayou.CheckEvent.UNSELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                    (<ccui.CheckBox>v.getChildByName("cb")).setSelected(false);
                }, self);
            });

       
            this.Hide();
        }

        submitSet(){
            let a = 0;
            lodash.forEach(this.playCountRank_layout.getChildren(), function (v: ccui.CheckBox, i) {
                if ((<ccui.CheckBox>v).isSelected()) {
                    a += v["index"];
                }
            });

            let b = 0;
            lodash.forEach(this.playWinRank_layout.getChildren(), function (v: ccui.CheckBox, i) {
                if ((<ccui.CheckBox>v).isSelected()) {
                    b += v["index"];
                }
            });

            let c = 0;
            lodash.forEach(this.playRecordRank.getChildren(), function (v: ccui.CheckBox, i) {
                if ((<ccui.CheckBox>v).isSelected()) {
                    c += v["index"];
                }
            });
            console.log(a+"----"+b+"----"+c)
            kaayou.emit("tea","mod::TeaHouse::ranklistset",{rank_round:a,rank_winer:b,rank_record:c,rank_open:!this.rankSwitchNum})
        }



        Show(data:{rank_round:number,"rank_winer":number,"rank_record":number,"rank_open":boolean}) {
            var self = this;
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:function(){
                    let openNum = data.rank_open?0:1;
                    (<ccui.CheckBox>self.rankSwitch.getChildren()[openNum]).setRadioSelected();
                    lodash.forEach(self.playCountRank_layout.getChildren(), function (v: ccui.CheckBox, i) {
                        if (v["index"]&data.rank_round) {
                            <ccui.CheckBox>v.setSelected(true);
                            (<ccui.CheckBox>v.getChildByName("cb")).setSelected(true);
                            (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                        }else{
                            <ccui.CheckBox>v.setSelected(false);
                            (<ccui.CheckBox>v.getChildByName("cb")).setSelected(false);
                            (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                        }
                    });
                    lodash.forEach(self.playWinRank_layout.getChildren(), function (v: ccui.CheckBox, i) {
                        if (v["index"]&data.rank_winer) {
                            <ccui.CheckBox>v.setSelected(true);

                            (<ccui.CheckBox>v.getChildByName("cb")).setSelected(true);
                            (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                        }else{
                            <ccui.CheckBox>v.setSelected(false);

                            (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                            (<ccui.CheckBox>v.getChildByName("cb")).setSelected(false);
                        }
                    });
                    lodash.forEach(self.playRecordRank.getChildren(), function (v: ccui.CheckBox, i) {
                        if (v["index"]&data.rank_record) {
                            <ccui.CheckBox>v.setSelected(true);

                            (<ccui.CheckBox>v.getChildByName("cb")).setSelected(true);
                            (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                        }else{
                            <ccui.CheckBox>v.setSelected(false);

                            (<ccui.CheckBox>v.getChildByName("cb")).setSelected(false);
                            (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                        }
                    });
                }
            });
        }




        Hide() {
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this
                }
            )
        }

    }



}