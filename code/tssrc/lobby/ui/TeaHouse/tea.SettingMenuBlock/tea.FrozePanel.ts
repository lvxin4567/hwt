/**
 *  隐私设置
 */

namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;





  export class tea_TeaFrozePanelMgr {
        static __INS__: tea_TeaFrozePanelMgr = null;
        static getInstance() {
            if (tea_TeaFrozePanelMgr.__INS__ == null) {
                tea_TeaFrozePanelMgr.__INS__ = new tea_TeaFrozePanelMgr();
                tea_TeaFrozePanelMgr.__INS__.init();
            }
            return tea_TeaFrozePanelMgr.__INS__;
        }
        __selfPanel: FrozePanel = null;

        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo();
            }, this, 10);

            kaayou.getController('tea').on('ui::FrozePanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::FrozePanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new FrozePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }











    export class FrozePanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        btn_froze: ccui.Button = null;
        btn_unfroze: ccui.Button = null;
        froze: ccui.Layout = null;
        unfroze: ccui.Layout = null;
        label_tips: ccui.Text = null;

        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.FrozePanel_json);
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.froze = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "froze");
            this.unfroze = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "unfroze");
            this.label_tips = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_tips");
            this.btn_froze = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_froze");
            this.btn_unfroze = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_unfroze");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.btn_froze.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                //抛出冻结亲友圈消息
                kaayou.emit("tea", 'mod::TeaHouse::SetOptionFrozen');
                kaayou.emit("tea", 'ui::FrozePanel::Hide');
            }, this);
            this.btn_unfroze.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                //抛出解冻亲友圈消息
                kaayou.emit("tea", 'mod::TeaHouse::SetOptionFrozen');
                kaayou.emit("tea", 'ui::FrozePanel::Hide');
            }, this);

            this.Hide();
        }

        doMemHide(b) {
            this.froze.setVisible(!b);
            this.unfroze.setVisible(b);
        }

        onTeaHouseUpdateInfo() {
            if (tea.mod.__teaHouseInfo.hisfrozen) {
                this.label_tips.string = "     " + "解除亲友圈(" + tea.mod.__teaHouseInfo.hid.toString()  + ")冻结后，所有成员正常开启房间进行游戏";
            } else {
                this.label_tips.string = "     " + "冻结亲友圈(" + tea.mod.__teaHouseInfo.hid.toString() + ")后，所有成员无法开启房间进行游戏，确认冻结吗？";
            }  
            this.doMemHide(tea.mod.__teaHouseInfo.hisfrozen);
        }

        Show() {
            var self = this;
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:function(){
                    self.onTeaHouseUpdateInfo();
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