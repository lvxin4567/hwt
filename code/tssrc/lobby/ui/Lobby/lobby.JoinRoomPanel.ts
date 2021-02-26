
//加入房间面板
namespace lobby {
    const { doBindEvent, BindEvent } = kaayou._decorator;

    export class JoinRoomPanelMgr {
        static __INS__: JoinRoomPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (JoinRoomPanelMgr.__INS__ == null) {
                JoinRoomPanelMgr.__INS__ = new JoinRoomPanelMgr();
                JoinRoomPanelMgr.__INS__.init();
                JoinRoomPanelMgr.__INS__._zOrder = _zOrder;
            }
            return JoinRoomPanelMgr.__INS__;
        }
        __selfPanel: JoinRoomPanel = null;
        public _gold = 0;
        public _zOrder = 0;
        onUpdateUserInfo(data: Data_Uerinfo) {
            this._gold = data.gold;
        }

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('lobby').on('ui::JoinRoom::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('lobby').on('ui::JoinRoom::ReInPut', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).resetLabel();
            }, this, 10);

            kaayou.getController('lobby').on('ui::JoinRoom::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new JoinRoomPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder)
            }
            return this.__selfPanel;
        }

    }


    export class JoinRoomPanel extends kaayou.ModelLayer {
        lable_Nums: Array<ccui.TextBMFont> = null;
        _curNums: string = "";
        constructor() {
            super();
            this.initWithccs(lobby.res.JoinRoomPanel_json);
            this.initUI();
        }
        btn_close: ccui.Button = null;

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

            var nums_block = ccui.helper.seekWidgetByName<ccui.Widget>(<ccui.Widget>this.node, "nums_block");

            for (var i = 0; i < 6; i++) {
                let labe = ccui.helper.seekWidgetByName<ccui.TextBMFont>(<ccui.Widget>nums_block, "tag_num_" + i);
                this.lable_Nums.push(labe);
            }

            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.setVisible(false);
        }

        resetLabel(){
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
            if (this._curNums.length > 5) {
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
            let curNums = this._curNums.split('');
            for (var i = 0; i < 6; i++) {
                if (i < curNums.length) {
                    this.lable_Nums[i].setString(curNums[i]);
                } else {
                    this.lable_Nums[i].string = '';
                }
            }
            if (curNums.length == 6) {
                kaayou.emit("lobby", "mod::RCGame::AreapkgbyRoomid", { roomid: this._curNums });
            }
        }

        bindEvent() { }

        // @BindEvent("lobby", 'ui::JoinRoom::Show')
        Show() {
            this._curNums = '';
            this.doNumShow();
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:function(){
                }
            });
        }
        // @BindEvent("lobby", 'ui::JoinRoom::Hide')
        Hide() {
            // kaayou.pop.hideAni(
            //     {
            //         cNode: this.node.getChildByName("contentPanel"),
            //         mNode: this.node.getChildByName("maskbg"),
            //         rnode: this,
            //         action:function(){
            //         }
            //     }
            // )
            this.setVisible(false);
        }

    }



}