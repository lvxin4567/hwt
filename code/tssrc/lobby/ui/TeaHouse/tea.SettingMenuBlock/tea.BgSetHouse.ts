//设置牌桌背景和亲友圈背景
namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;
    export class tea_TeaBgSetMgr {
        static __INS__: tea_TeaBgSetMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_TeaBgSetMgr.__INS__ == null) {
                tea_TeaBgSetMgr.__INS__ = new tea_TeaBgSetMgr();
                tea_TeaBgSetMgr.__INS__.init();
                tea_TeaBgSetMgr.__INS__._zOrder = _zOrder;
            }
            return tea_TeaBgSetMgr.__INS__;
        }
        __selfPanel: TeaBgSetPanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaBgSetPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::TeaBgSetPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new TeaBgSetPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }
    export class TeaBgSetPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        // floorLayout: ccui.ScrollView = null;
        // floorItem: ccui.CheckBox = null;
        // floorGroup:common.RadioGroup = null;
        teaBg_layout:ccui.Layout = null;
        bgInfo = null;
        btn_submit:ccui.Button = null;
        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.TH_setbg_Json);
            this.isTouchMaskHide = false;
            let self = this;
            this.teaBg_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "setbg_layout");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            lodash.forEach(this.teaBg_layout.getChildren(),function(v:ccui.ImageView,i:number){
                v["i"] = i;
                v.getChildByName("bgSlectImg").setVisible(false);
                v.getChildByName("bgSlectbtn").setVisible(false);
                v.on(kaayou.TouchEvent.TouchEnd,self.onTeaBgset,self);
            })
          

            this.btn_submit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_submit");
            this.btn_submit.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                if (!tea.mod.__teaHouseInfo || !tea.mod.__teaHouseInfo.hid) {
                    return;
                }
                cc.sys.localStorage.setItem(lobby.mod.User.getInstance().getUserInfo().uid+"teaBgInfo"+tea.mod.__teaHouseInfo.hid,JSON.stringify(self.bgInfo));
                //需要去刷新桌子颜色  以及  亲友圈背景
                //kaayou.emit("tea", 'mod::Table::GetUpdateList');
                kaayou.emit("tea","ui::teaHouse::updateBg");
                self.Hide();
            }, this);

            this.Hide();
        }

        onTeaBgset(e:kaayou.TouchEvent){
            console.log(e.target.i);
            this.setTeaBgSelect(e.target.i);
            
        }
        Show() {
            var self = this;
            this.setUI();
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {
                }
            });
        }


        setUI(){
            let teaInfo = tea.mod.__teaHouseInfo;
            if (!teaInfo || !teaInfo.hid) {
                return;
            }
            this.bgInfo = lodash.clone(JSON.parse(cc.sys.localStorage.getItem(lobby.mod.User.getInstance().getUserInfo().uid+"teaBgInfo"+tea.mod.__teaHouseInfo.hid)));
            this.setTeaBgSelect(this.bgInfo.teaBg);
        }
    

        setTeaBgSelect(index:number){
            if (index < 0 || index > 2) {
                return
            }
            lodash.forEach(this.teaBg_layout.getChildren(),function(v:ccui.ImageView,i:number){
                v.getChildByName("bgSlectImg").setVisible(false);
                v.getChildByName("bgSlectbtn").setVisible(false);
            })
            let teaBg = this.teaBg_layout.getChildren()[index];
            teaBg.getChildByName("bgSlectImg").setVisible(true);
            teaBg.getChildByName("bgSlectbtn").setVisible(true);
            this.bgInfo.teaBg = index;
            console.log(this.bgInfo);
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