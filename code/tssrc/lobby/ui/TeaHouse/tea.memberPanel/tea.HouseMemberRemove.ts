namespace tea {
    var { doBindEvent, BindEvent } = kaayou._decorator;
    export class MemberRemovePanelManager {
        static __INS__: MemberRemovePanelManager = null;
        static getInstance() {
            if (MemberRemovePanelManager.__INS__ == null) {
                MemberRemovePanelManager.__INS__ = new MemberRemovePanelManager();
                MemberRemovePanelManager.__INS__.init();
            }
            return MemberRemovePanelManager.__INS__;
        }
        memberremovePanel:tea.MemberRemovePanel = null
        init() {
            let self = this;
            kaayou.getController('tea').on('ui::MemberRemovePanel::Show', function (e: kaayou.Event) {
                self.removeDialogShow(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::MemberRemovePanel::Hide', function (e: kaayou.Event) {
                self.DialogRemoved();
            }, this, 10);
            return true;

        }
        removeDialogShow(data) {
            let dialog = new tea.MemberRemovePanel();
            this.memberremovePanel = dialog;
            kaayou.UIManager.getInstance().getCurRuningScene().addChild(dialog);
            dialog.Show(data);
        }

        DialogRemoved() {
            if (this.memberremovePanel && this.memberremovePanel.isRunning()) {
                this.memberremovePanel.removeFromParent();
            }
            this.memberremovePanel = null;
        }
    }

    export class MemberRemovePanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_cancel: ccui.Button = null;
        black_check:ccui.CheckBox = null;
        btn_sure:ccui.Button = null;
        _data:Data_HouseMemberItem
        initUI() {
            this.initWithccs(tea.res.MemberRemove_Json);
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_cancel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_cancel");
            this.btn_sure = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_sure");
            this.black_check = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "black_check");
            this.btn_cancel.on(kaayou.TouchEvent.TouchEnd, function () {
                self.Hide();
            }, this);
            this.btn_sure.on(kaayou.TouchEvent.TouchEnd,function(){
                kaayou.emit("tea", 'mod:::Member::KickMember',{ uid: self._data.uid,joinBlack:this.black_check.isSelected()});
            },this);
        }
        Show(data) {
            let self=this;
            this._data = data;
            if(!!data.addBlack){
                self.black_check.setSelected(true);
            }else{
                self.black_check.setSelected(false);
            }
            this.setVisible(true);
        }
        Hide() {
            kaayou.emit('tea', 'ui::MemberRemovePanel::Hide');
        }
    }
}