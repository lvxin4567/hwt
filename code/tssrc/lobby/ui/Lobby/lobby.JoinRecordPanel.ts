
//加入房间面板
namespace lobby {
    const { doBindEvent, BindEvent } = kaayou._decorator;



    export class JoinRecordPanelMgr {
        static __INS__: JoinRecordPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (JoinRecordPanelMgr.__INS__ == null) {
                JoinRecordPanelMgr.__INS__ = new JoinRecordPanelMgr();
                JoinRecordPanelMgr.__INS__.init();
                JoinRecordPanelMgr.__INS__._zOrder = _zOrder;
            }
            return JoinRecordPanelMgr.__INS__;
        }
        public _zOrder = 0;
        __selfPanel: JoinRecordPanel = null;
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('lobby').on('ui::JoinRecord::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('lobby').on('ui::JoinRecord::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new JoinRecordPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder)
            }
            return this.__selfPanel;
        }

    }




    export class JoinRecordPanel extends kaayou.ModelLayer {
        lable_Nums: Array<ccui.TextBMFont> = null;
        _curNums: string = "";
        constructor() {
            super();
            this.initWithccs(lobby.res.JoinRecordPanel_json);
            this.initUI();
        }
        btn_close: ccui.Button = null;
        // @doBindEvent
        initUI() {
            this.isTouchMaskHide = false;
            let self = this;
            this.lable_Nums = [];
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
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

            let btnentry = ccui.helper.seekWidgetByName<ccui.Button>(<ccui.Widget>NumBtnPanel, 'btnentry');
            btnentry.on(kaayou.TouchEvent.TouchEnd, this.onEnterClick, this);

            var nums_block = ccui.helper.seekWidgetByName<ccui.Widget>(<ccui.Widget>this.node, "nums_block");

            for (var i = 0; i < 1; i++) {
                let labe = ccui.helper.seekWidgetByName<ccui.TextBMFont>(<ccui.Widget>nums_block, "tag_num_" + i);
                this.lable_Nums.push(labe);
            }

            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);

            this.Hide();
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

        onEnterClick() {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            kaayou.emit('lobby', "ui::Loading::Show");
            if (this.lable_Nums[0].string.length > 0) {
                this.lable_Nums[0].string = '';
                kaayou.emit('common', 'mod::Record::RunData', { replayid: Number(this._curNums) });
                this._curNums = '';
            }
            else {
                kaayou.emit('lobby', 'ui::Toast::Show', { msg: '请输入他人分享的回访码' });
            }
        }


        onNumsClick(e: kaayou.TouchEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let num = e.target['_index'] || 0;
            this.addNums(num)
        }


        addNums(nums: number) {
            if (this._curNums.length > 9) {
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
            this.lable_Nums[0].setString(this._curNums);
        }

        bindEvent() { }

        //@BindEvent("lobby", 'ui::JoinRecord::Show')
        Show() {
            this._curNums = '';
            this.doNumShow();
            this.setVisible(true);
        }
        //@BindEvent("lobby", 'ui::JoinRecord::Hide')
        Hide() {
            this.setVisible(false);
        }

    }



}