
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export interface IDIALOG_OPTION {
        title?: string, //标题
        msg: string, //显示
        close?: { isShow?: boolean, action?: Function },
        btns?: Array<{ name: string, action: Function, colorType: string }>,
        isDomText?: boolean, //是否是超文本   暂时不用 
        localZOrder?: number //自定义z轴
        onshow?: (index: number, dialog: DialogPanel) => void,
        ismutual?: boolean,
        mutualkey?: string
    }

    export class DialogManager {
        static __INS__: DialogManager = null;
        static getInstance(_zOrder) {
            if (DialogManager.__INS__ == null) {
                DialogManager.__INS__ = new DialogManager();
                DialogManager.__INS__.init();
                DialogManager.__INS__._zOrder = _zOrder;
            }
            return DialogManager.__INS__;
        }
        private _zOrder = 0;
        private _dialogs: { [key: string]: common.DialogPanel };
        private _dialogsIndex = 1;
        init() {
            let self = this;
            this._dialogs = {};
            kaayou.getController('common').on('ui::Dialog::Show', function (e: kaayou.Event) {
                self.DialogShow(e.data);
            }, this, 10);
            kaayou.getController('common').on('ui::Dialog::Removed', function (e: kaayou.Event) {
                self.DialogRemoved(e.data);
            }, this, 10);
            kaayou.getController('common').on('ui::Dialog::Hide', function (e: kaayou.Event) {
                self.DialogHide(e.data);
            }, this, 10);
            return true;

        }
        DialogShow(data: IDIALOG_OPTION) {
            if (data.ismutual) {
                let di = this.GetDialogByMutualKey(data.mutualkey || '__NULL__');
                if (di) {
                    di.Show(data);
                    return;
                }
            }
            let dialog = new common.DialogPanel();
            dialog.setIndex(this._dialogsIndex++);
            dialog.setMutualKey(data.mutualkey || "");
            this._dialogs[dialog.getIndex()] = dialog;
            kaayou.UIManager.getInstance().getMainScene().addChild(dialog, this._zOrder);
            dialog.Show(data);
        }

        GetDialogByMutualKey(mutualKey) {
            let dialog = null;
            for (var x in this._dialogs) {
                if (mutualKey == this._dialogs[x].getMutualKey()) {
                    dialog = this._dialogs[x];
                    break;
                }
            }
            return dialog;
        }

        DialogHide(data) {
            for (var x in this._dialogs) {
                this._dialogs[x].Hide();
            }
        }

        DialogRemoved(data: { index: number }) {
            let dialog = this._dialogs[data.index];
            this._dialogs[data.index] = null;
            delete this._dialogs[data.index];
            if (dialog && dialog.isRunning()) {
                dialog.removeFromParent();
            }
        }

    }



    export class DialogPanel extends kaayou.Layer {
        maskBg: cc.Layer = null;
        contentPanel: ccui.Layout = null;
        btnPanel: ccui.Layout = null;
        btn_close: ccui.Button = null;
        msgLabel: ccui.Text = null;
        titleLabel: ccui.Text = null;
        btnArr: Array<ccui.Button> = null;
        constructor() {
            super();
            this.initUI();
        }
        // @doBindEvent
        initUI() {
            this.initWithccs(common.res.DialogPanel_json);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.btnPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnPanel");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.titleLabel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "titleLabel");
            this.msgLabel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "msgLabel");
            this.btnArr = <Array<ccui.Button>>this.btnPanel.children;

            for (var i = 0; i < this.btnArr.length; i++) {
                this.btnArr[i].setVisible(false);
                this.btnArr[i]['index'] = i;
                this.btnArr[i].on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                    //kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    let index = e.target['index'];
                    let c = self.btnCall[index] || null;

                    if (c) {
                        if (false === c()) {
                            let i = 0;
                        } else {
                            self.Hide();
                        }
                    } else {
                        self.Hide();
                    }
                }, self);
            }
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                let c = self.close_call || null;

                if (c) {
                    if (false === c()) {

                    } else {
                        self.Hide();
                    }
                } else {
                    self.Hide();
                }
            }, this)

            this.btn_close.setVisible(false);
            this.setVisible(false);
        }


        btnCall: Array<Function> = null;
        close_call: Function = null;
        // @BindEvent('common', 'ui::Dialog::Show')
        Show(data: IDIALOG_OPTION) {
            if (!data) { this.Hide(); return false; }
            if (!data.msg) { this.Hide(); return false; }
            for (var x in this.btnArr) {
                this.btnArr[x].setVisible(false);
            }
            // showAni(this.node.getChildByName("bg"),this.node.getChildByName("mask"));

            //设置回和大厅一样的默认值10110，需要修改则人工赋值
            // this.node.setLocalZOrder(10110);
            let default_BtnOptions_One = { name: "确定", action: null, colorType: 'blue', x: 235, y: 0 }
            let default_BtnOptions = [
                { name: "确定", action: null, colorType: 'green', x: 101, y: 0 },
                { name: "取消", action: null, colorType: 'blue', x: 369.00, y: 0 }
            ];
            // let default_2 = { name: "取消", action: null, colorType: 0 };
            data.title = data.title || "温馨提示";
            data.close = data.close || { isShow: false, action: null };
            data.btns = data.btns || [];
            if (!lodash.isArray(data.btns)) {
                return;
            }
            if (data.btns.length <= 1) {
                data.btns[0] = lodash.extend({}, default_BtnOptions_One, data.btns[0] || {});
            } else {
                for (var x in data.btns) {
                    if (Number(x) > 1) {
                        kaayou.addLog("对话框按钮超过了2个");
                        return;
                    }
                    data.btns[x] = lodash.extend({}, default_BtnOptions[Number(x)], data.btns[Number(x)])
                }
            }
            this.btnCall = [];
            for (var x in data.btns) {
                var i = Number(x)
                if (i > 1) { return; }
                let colorStr = data.btns[i].colorType;
                this.btnCall[i] = data.btns[i].action || null;
                this.btnArr[i].setVisible(true);
                Patch.ChangeTextBMFontFntFile(this.btnArr[i].getChildByName<ccui.TextBMFont>("label"), Patch.Dithering(data.btns[i]["name"]), common.FontRes[colorStr]);
                this.btnArr[i].loadTextureNormal(`${common.BtnResNames[colorStr]}.png`, ccui.Widget.PLIST_TEXTURE);
                this.btnArr[i].loadTexturePressed(`${common.BtnResNames[colorStr]}_deep.png`, ccui.Widget.PLIST_TEXTURE);
                // this.btnArr[i].loadTextureNormal(`btn_${data.btns[i].colorType}.png`,ccui.Widget.PLIST_TEXTURE);
                // this.loadTexture(`${MaJonCard.res_prefix}.${color}_${direction}_${cardtype}_${cover}board.png`, ccui.Widget.PLIST_TEXTURE);
                // this.btnArr[i].getComponent(cc.Sprite).spriteFrame = this.btnAtlas.getSpriteFrame(`btn_${data.btns[i].colorType}`);
                // this.btnArr[i].getComponent(cc.Button).normalSprite = this.btnAtlas.getSpriteFrame(`btn_${data.btns[i].colorType}`);
                // this.btnArr[i].getComponent(cc.Button).pressedSprite = this.btnAtlas.getSpriteFrame(`btn_${data.btns[i].colorType}_deep`);;
                this.btnArr[i].setPositionX(data.btns[i]['x']);
                // this.btnArr[i].x = data.btns[i]['x'];
                // this.btnArr[i].y = data.btns[i]['y'];
            }
            this.btn_close.setVisible(!!data.close.isShow);
            this.close_call = data.close["action"];
            this.titleLabel.setString(data.title);
            this.msgLabel.setString(data.msg);
            if (data.localZOrder) {
                this.node.setLocalZOrder(data.localZOrder);
            }
            this.setVisible(true);
            data.onshow && data.onshow(this.getIndex(), this);

            // showAni({
            //     cNode: this.node.getChildByName("ChildNode"),
            //     mNode: this.node.getChildByName("mask")
            // });
        }
        private _index = -1;
        private _mutualkey = "";
        setMutualKey(mutualkey) {
            this._mutualkey = mutualkey;
        }
        getMutualKey() {
            return this._mutualkey;
        }
        setIndex(index: number) {
            this._index = index;
        }
        getIndex(): number {
            return this._index;
        }
        // @BindEvent('common', 'ui::Dialog::Hide')
        Hide() {
            // hideAni({
            //     cNode: this.node.getChildByName("ChildNode"),
            //     mNode: this.node.getChildByName("mask"),
            //     rnode: this.node,
            // })
            this.close_call = null;
            this.btnCall = null;
            // this.setVisible(false);
            // this.removeFromParent(true);
            // this.node.active = false;
            kaayou.emit('common', 'ui::Dialog::Removed', { index: this.getIndex() });
        }
    }
}