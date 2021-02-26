
//加入房间面板
namespace lobby {
    const { doBindEvent, BindEvent } = kaayou._decorator;

    export class NumberInputPanelMgr {
        static __INS__: NumberInputPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (NumberInputPanelMgr.__INS__ == null) {
                NumberInputPanelMgr.__INS__ = new NumberInputPanelMgr();
                NumberInputPanelMgr.__INS__.init();
                NumberInputPanelMgr.__INS__._zOrder = _zOrder;
            }
            return NumberInputPanelMgr.__INS__;
        }
        __selfPanel: NumberInputPanel = null;
        public _gold = 0;
        public _zOrder = 0;
        onUpdateUserInfo(data: Data_Uerinfo) {
            this._gold = data.gold;
        }

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('lobby').on('ui::NumberInputPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::NumberInputPanel::ReInPut', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).resetLabel();
            }, this, 10);

            kaayou.getController('lobby').on('ui::NumberInputPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new NumberInputPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder)
            }
            return this.__selfPanel;
        }

    }


    export class NumberInputPanel extends kaayou.ModelLayer {
        btnAdd: ccui.Button = null;
        btnMinus: ccui.Button = null;
        btnDot: ccui.Button = null;
        lbResult: ccui.TextBMFont = null;
        lable_Nums: Array<ccui.TextBMFont> = null;
        mask:ccui.Layout=null;
        _curNums: string = "";
        constructor() {
            super();
            this.initWithccs(lobby.res.NumberInputPanel_json);
            this.initUI();
        }

        //lw191225支持两位小数
        checkPrecision() {
            let dotIndex=this._curNums.indexOf('.');
            if(dotIndex<0) return true;
            else if (dotIndex > 0 && dotIndex <= this._curNums.length - 1
                && dotIndex >= this._curNums.length - 2) return true;
            else return false;
        }

        initUI() {
            this.isTouchMaskHide = false;
            let self = this;
            this.lable_Nums = [];
            this.btnAdd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnAdd");
            this.btnAdd.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (this._curNums.substr(0, 1) != "+") {
                    if (this._curNums.substr(0, 1) == "-") {
                        this._curNums = this._curNums.substring(1, this._curNums.length);
                        this._curNums = "+" + this._curNums;
                    } else if (this._curNums.substr(0, 1) == "+") {

                    } else {
                        this._curNums = "+" + this._curNums;
                    }
                }
                this.doNumShow();
            }, this);
            this.btnDot = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnDot");
            this.btnDot.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (this._curNums.indexOf('.') < 0) {
                    if (this._curNums == "") {
                        this._curNums = "0.";
                    } else if(this._curNums == "-"){
                        this._curNums = "-0.";
                    } else {
                        this._curNums += ".";
                    }
                }
                this.doNumShow();
            }, this);

            this.btnMinus = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnMinus");
            this.btnMinus.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (this._curNums.substr(0, 1) != "-") {
                    if (this._curNums.substr(0, 1) == "+") {
                        this._curNums = this._curNums.substring(1, this._curNums.length);
                        this._curNums = "-" + this._curNums;
                    } else if (this._curNums.substr(0, 1) == "-") {

                    } else {
                        this._curNums = "-" + this._curNums;
                    }
                }
                this.doNumShow();
            }, this);

            this.lbResult = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Result");

            this.mask=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.mask.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                kaayou.emit("lobby", "ui::NumberInputPanel::Hide");
            }, this);

            var NumBtnPanel = ccui.helper.seekWidgetByName<ccui.Widget>(<ccui.Widget>this.node, "NumBtnPanel");

            for (var i = 0; i < 10; i++) {
                let btn = ccui.helper.seekWidgetByName<ccui.Button>(<ccui.Widget>NumBtnPanel, "btn" + i);
                // this.btn_Nums.push()      ; 
                btn['_index'] = i;
                btn.on(kaayou.TouchEvent.TouchEnd, this.onNumsClick, this);
            }
            let btnreset = ccui.helper.seekWidgetByName<ccui.Button>(<ccui.Widget>NumBtnPanel, 'btnreset');
            btnreset.on(kaayou.TouchEvent.TouchEnd, this.onResetClick, this);

            let btndelete = ccui.helper.seekWidgetByName<ccui.Button>(<ccui.Widget>NumBtnPanel, 'btndelete');
            btndelete.on(kaayou.TouchEvent.TouchEnd, this.onDeleteClick, this);

            var nums_block = ccui.helper.seekWidgetByName<ccui.Widget>(<ccui.Widget>this.node, "nums_block");

            for (var i = 0; i < 6; i++) {
                let labe = ccui.helper.seekWidgetByName<ccui.TextBMFont>(<ccui.Widget>nums_block, "tag_num_" + i);
                this.lable_Nums.push(labe);
            }


            this.setVisible(false);
        }

        resetLabel() {
            this._curNums = '';
            this.doNumShow();
        }


        onResetClick(e: kaayou.TouchEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            console.log('reset');
            this._curNums = '';
            this.doNumShow();
        }

        onDeleteClick(e: kaayou.TouchEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            console.log('onDeleteClick');
            this.subNums();
        }

        onNumsClick(e: kaayou.TouchEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let num = e.target['_index'] || 0;
            this.addNums(num)
        }

        addNums(nums: number) {
            if (this._curNums.length > 10 || !this.checkPrecision()) {
                return;
            }
            this._curNums += nums;
            this.doNumShow();
        }

        subNums() {
            if (this._curNums.length < 1) {
                return;
            }
            this._curNums = this._curNums.substr(0, this._curNums.length - 1);
            this.doNumShow();
        }

        doNumShow() {
            this.lbResult.setString(this._curNums);
            kaayou.emit("lobby", "ui::NumberInput::Change", this._curNums);
        }

        bindEvent() { }

        // let enableBtnOp = {
        //     add:false,
        //     red:false,
        //     point:false
        // }

        Show(data:{defualtNum:number,op?:any}) {
            let num = data.defualtNum?data.defualtNum.toString():"";
            this._curNums = "" + num ;
            this.doNumShow();
            if (!!data.op) {
                this.btnAdd.setEnabled(data.op.add);
                this.btnMinus.setEnabled(data.op.red);
                this.btnDot.setEnabled(data.op.point);
            }else{
                this.btnAdd.setEnabled(true);
                this.btnMinus.setEnabled(true);
                this.btnDot.setEnabled(true);
            }


            this.setPositionX(2500);
            let x = (cc.winSize.width - this.node.getChildByName("contentPanel").getContentSize().width) / 2;
            let action = cc.moveTo(0.4, x, this.getPositionY());
            this.setVisible(true);
            this.runAction(action);
        }

        Hide() {
            let x = 2500;
            let action = cc.moveTo(0.4, x, this.getPositionY());
            this.runAction(action);
        }
    }
}