//设置牌桌背景和亲友圈背景
namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;
    export class tea_tableBgSetMgr {
        static __INS__: tea_tableBgSetMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_tableBgSetMgr.__INS__ == null) {
                tea_tableBgSetMgr.__INS__ = new tea_tableBgSetMgr();
                tea_tableBgSetMgr.__INS__.init();
                tea_tableBgSetMgr.__INS__._zOrder = _zOrder;
            }
            return tea_tableBgSetMgr.__INS__;
        }
        __selfPanel: tableBgSetPanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
            }, this, 10);

            kaayou.getController('tea').on('ui::tableBgSetPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::tableBgSetPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new tableBgSetPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }
    class floor_Cb extends kaayou.Block {
        constructor() {
            super();
        }
        cb:ccui.CheckBox = null;
        cb_text:ccui.Text = null
        ;
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            var self = this;
            this.cb = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cb_floor");
            this.cb_text = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floorText");
        }

        _data: Data_ActListModel = null;
        setInfo(data: Data_ActListModel) {
            this._data = data;
            if (lodash.isEmpty(data)) {
                return
            }
            
            //this.status.loadTexture(imageName, ccui.Widget.PLIST_TEXTURE);
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }
    }
    export class tableBgSetPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        floorLayout: ccui.ScrollView = null;
        floorItem: ccui.CheckBox = null;
        floorGroup:common.RadioGroup = null;
        tablebg_layout:ccui.Layout = null;
        //teaBg_layout:ccui.Layout = null;
        bgInfo = [];
        btn_submit:ccui.Button = null;
        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.TH_setTableBg_Json);
            this.isTouchMaskHide = false;
            let self = this;
            this.tablebg_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "setTable_layout");
            //this.teaBg_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "setbg_layout");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.floorItem = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cb_floor");
            this.floorLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floorScrollview");
            this.floorLayout.setPadding({ spacingY: 10, left: 3 });
            this.floorLayout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.floorLayout.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.floorLayout.setScrollBarEnabled(false);
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.floorGroup = new common.RadioGroup();
            // lodash.forEach(this.teaBg_layout.getChildren(),function(v:ccui.ImageView,i:number){
            //     v["i"] = i;
            //     v.getChildByName("bgSlectImg").setVisible(false);
            //     v.getChildByName("bgSlectbtn").setVisible(false);
            //     v.on(kaayou.TouchEvent.TouchEnd,self.onTeaBgset,self);
            // })
            lodash.forEach(this.tablebg_layout.getChildren(),function(v:ccui.ImageView,i:number){
                v["i"] = i;
                v.getChildByName("selectBg").setVisible(false);
                v.getChildByName("selectBtnimg").setVisible(false);
                v.on(kaayou.TouchEvent.TouchEnd,self.onTableBgset,self);
            })

            this.btn_submit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_submit");
            this.btn_submit.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                if (!tea.mod.__teaHouseInfo || !tea.mod.__teaHouseInfo.hid) {
                    return;
                }
                kaayou.emit("tea","mod::TeaHouse::houseTableBgSet",{bgArr:self.bgInfo})
                //cc.sys.localStorage.setItem(lobby.mod.User.getInstance().getUserInfo().uid+"teaBgInfo"+tea.mod.__teaHouseInfo.hid,JSON.stringify(self.bgInfo));
                //需要去刷新桌子颜色  以及  亲友圈背景
                
                //kaayou.emit("tea","ui::teaHouse::updateBg");
                self.Hide();
            }, this);

            for (let i = 0; i < 20; i++) {
                let cell = (this.createFloorCb());
                cell.cb.setSelected(false);
                cell.cb_text.setString((i+1)+"楼");
                cell.cb["index"] = i;
                cell.cb.on(kaayou.RadioEvent.SELECTED, this.onMenuSelected, this);
                cell.cb.on(kaayou.RadioEvent.UNSELECTED, this.onMenuUnSelected, this);
                this.floorGroup.add(cell.cb);
                this.floorLayout.addChild(cell);  

            }
            this.floorLayout.doChildrenLayout();



            this.Hide();
        }

        // onTeaBgset(e:kaayou.TouchEvent){
        //     console.log(e.target.i);
        //     this.setTeaBgSelect(e.target.i);
            
        // }

        onTableBgset(e:kaayou.TouchEvent){
            console.log(e.target.i);
            this.setTableBgSelect(e.target.i);
        }
        private createFloorCb(): floor_Cb {
            let cell = kaayou.pool.getFromPool(floor_Cb);
            if (!cell) {
                cell = new floor_Cb();
                cell.initWithNode(this.floorItem);
            }
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(8);
            cell.setPositionX(8);
            cell.setVisible(true);
            return cell;
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
            this.bgInfo = lodash.clone(tea.mod.__teaHouseInfo.floors_color);
            this._floorLevel = 0;
            (<ccui.CheckBox>this.floorLayout.getChildren()[0].cb).setRadioSelected();
            //this.setTeaBgSelect(this.bgInfo.teaBg);
        }
        // 设置桌子背景选中的是第几个
        setTableBgSelect(index:number){
            if (index < 0 || index > 9 || index == undefined) {
                return
            }
            lodash.forEach(this.tablebg_layout.getChildren(),function(v:ccui.ImageView,i:number){
                v.getChildByName("selectBg").setVisible(false);
                v.getChildByName("selectBtnimg").setVisible(false);
            })
            let tableBg = this.tablebg_layout.getChildren()[index];
            tableBg.getChildByName("selectBg").setVisible(true);
            tableBg.getChildByName("selectBtnimg").setVisible(true);
            this.bgInfo[this._floorLevel] = index.toString();
            console.log("设置楼层"+this._floorLevel+"背景"+index);
        }

        // setTeaBgSelect(index:number){
        //     if (index < 0 || index > 2) {
        //         return
        //     }
        //     // lodash.forEach(this.teaBg_layout.getChildren(),function(v:ccui.ImageView,i:number){
        //     //     v.getChildByName("bgSlectImg").setVisible(false);
        //     //     v.getChildByName("bgSlectbtn").setVisible(false);
        //     // })
        //     let teaBg = this.teaBg_layout.getChildren()[index];
        //     teaBg.getChildByName("bgSlectImg").setVisible(true);
        //     teaBg.getChildByName("bgSlectbtn").setVisible(true);
        //     this.bgInfo.teaBg = index;
        //     console.log(this.bgInfo);
        // }
        _floorLevel = 0;
        onMenuSelected(e: kaayou.RadioEvent){
            var self = this;
            console.log("loucengindex" + e.target.index);
            
            this._floorLevel = e.target.index;
            console.log("当前楼层"+this._floorLevel);
            this.setTableBgSelect(this.bgInfo[e.target.index]);
            
            (<ccui.Text>(e.target.getChildByName("floorText"))).setTextColor(cc.hexToColor("#975638"));
        }
        onMenuUnSelected(e: kaayou.RadioEvent){
            (<ccui.Text>(e.target.getChildByName("floorText"))).setTextColor(cc.hexToColor("#CB9F6F"));
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