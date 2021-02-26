namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    class ChooseGameItem extends kaayou.Block {
        constructor() {
            super();
        }
        _data : Data_HosueFloorInfo = null;
        label_subGame: ccui.Text = null;
        label_bigGame: ccui.Text = null;
        img_gameicon:ccui.ImageView = null;
        btn_fast:ccui.Button = null;
        tableMatchLayout:ccui.Layout = null;
        fullTable_label:ccui.Text = null;
        matchCount_label:ccui.Text = null;
        bg_sel:ccui.ImageView = null;
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            let self = this;
            this.label_subGame = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "gameSubName");
            this.label_bigGame = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "gamebigname");
            this.img_gameicon = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "gameIcon");
            this.btn_fast = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_fast");
            this.tableMatchLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tableMatchLayout");
            this.matchCount_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "matchCount");
            this.fullTable_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "fulltableCount");
            this.bg_sel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bg_sel");
        }
        setInfo(data:Data_HosueFloorInfo) {
            this._data = data;
            if (lodash.isEmpty(data)) {
                this.label_subGame.setString("");
                this.label_bigGame.setString("");
                return;
            }
            this.label_subGame.setString(data.floorItem.name == ""?data.floorItem.kindname:data.floorItem.name);
            this.label_bigGame.setString(data.floorItem.packagename+"  "+data.floorItem.frule.playernum+"人"+data.floorItem.frule.roundnum+"局");//
            this.btn_fast.on(kaayou.TouchEvent.TouchEnd,function(){
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea","ui::mixfloor:fastGame",{fid:this._data.floorItem.fid});
                kaayou.emit("tea","ui::ChooseFastGame::Hide");
            }.bind(this),this);
            NetImage.setPlayerHead(this.img_gameicon,this._data.floorItem.imageurl)
            //桌数和匹配中只能圈主和管理员看
            this.tableMatchLayout.setVisible(!!(tea.mod.__teaHouseInfo.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY) && tea.mod.__teaHouseInfo.mix_active && tea.mod.__teaHouseInfo.house_table_join_type == 2);
            if (tea.mod.__teaHouseInfo.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY) {
                if (!tea.mod.__teaHouseMainTableList || lodash.isEmpty(tea.mod.__teaHouseMainTableList)) {
                    return;
                }
                for (var k in tea.mod.__teaHouseMainTableList) {
                    if (tea.mod.__teaHouseMainTableList[k].fid == data.floorItem.fid) {
                        this.matchCount_label.setString(`${tea.mod.__teaHouseMainTableList[k].matchIngnum}/${data.floorItem.frule.playernum}`);
                        this.fullTable_label.setString(""+tea.mod.__teaHouseMainTableList[k].fullNum);
                    }
                }
            }

            let fastGameInfo = cc.sys.localStorage.getItem("tea::mixFloorFast" + lobby.mod.User.__INS__.getUserInfo().uid + tea.mod.__teaHouseInfo.hid);
            if (!!fastGameInfo && fastGameInfo.length > 0) {
                let fastModel: { fid: number } = JSON.parse(fastGameInfo);
                if (!!fastModel && fastModel.fid == this._data.floorItem.fid) {
                    this.bg_sel.setVisible(true);
                }else{
                    this.bg_sel.setVisible(false);
                }
            }else{
                this.bg_sel.setVisible(false);
            }

        }

        doUpdate() {

        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }
    }

    export class tea_ChooseFastGameMgr {
        static __INS__: tea_ChooseFastGameMgr = null;
        static getInstance(_zOrder) {
            if (tea_ChooseFastGameMgr.__INS__ == null) {
                tea_ChooseFastGameMgr.__INS__ = new tea_ChooseFastGameMgr();
                tea_ChooseFastGameMgr.__INS__.init();
                tea_ChooseFastGameMgr.__INS__._zOrder = _zOrder
            }
            return tea_ChooseFastGameMgr.__INS__;
        }
        __selfPanel: ChooseFastGamePanel = null;
        _zOrder:number
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::ChooseFastGame::Show', function (e: kaayou.Event) {
                if (kaayou.UIManager.getInstance().getCurRuningSceneName() != "TEAHOUSE") return;
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::ChooseFastGame::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new ChooseFastGamePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class ChooseFastGamePanel extends kaayou.ModelLayer {
        prfRow: ccui.Layout = null;
        constructor() {
            super();
            this.initUI();
        }
        btnClose: ccui.Button = null;
        sv_ChooseGame: ccui.ScrollView = null;
        @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.TH_ChooseFastGamePanel);

            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CloseButton");
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.prfRow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "TH_gameChooseitem");
            this.prfRow.setVisible(false);
            this.sv_ChooseGame = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ScrollView");
            this.sv_ChooseGame.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
            this.sv_ChooseGame.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.sv_ChooseGame.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.sv_ChooseGame.setGridColumn(2);
            this.sv_ChooseGame.setPadding({left:8,spacingY: 5 ,spacingX: 3,});
            this.sv_ChooseGame.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
            this.sv_ChooseGame.setScrollBarEnabled(false);
            this.Hide();
        }
        
        
        private createCell(): ChooseGameItem {
            let cell = kaayou.pool.getFromPool(ChooseGameItem);
            if (!cell) {
                cell = new ChooseGameItem();
                cell.initWithNode(this.prfRow);
            }

            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(10);
            cell.setVisible(true);
            return cell;
        }


        Show() {
            var self = this;
            this.sv_ChooseGame.setVisible(false);
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:function(){
                    self.setSvData();
                    self.sv_ChooseGame.setVisible(true);
                }
            });
        }

        setSvData(){
            if(!!!tea.mod.__teaHouseInfo || !!!tea.mod.__teaHouseInfo.floorsMap)return;
            for (let k in tea.mod.__teaHouseInfo.floorsMap) {
                if (!tea.mod.__teaHouseInfo.floorsMap[k].floorItem.is_mix) {
                    continue;
                }
                let cell = this.createCell();
                cell.setInfo(tea.mod.__teaHouseInfo.floorsMap[k]);
                this.sv_ChooseGame.addChild(cell);
                // console.log(tea.mod.__teaHouseInfo.floorsMap[k]);
            }
            this.sv_ChooseGame.doChildrenLayout();//
        }

        Hide() {
            // kaayou.pool.putAllChildrenInPool(this.sv_ChooseGame);
            // this.sv_ChooseGame.scrollToTop(0,false);
            var self = this;
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action:function(){
                        self.sv_ChooseGame.removeAllChildren();
                    }
                }
            )
        }
    }
}