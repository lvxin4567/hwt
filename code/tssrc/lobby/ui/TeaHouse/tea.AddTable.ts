namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    class AddMixTableRow extends kaayou.Block {
        constructor() {
            super();
        }
        _data = null;
        btnAdd: ccui.Layout = null;
        btnDelete: ccui.Button = null;
        changeNumber = 0;
        ivGame: ccui.ImageView = null;
        ivAddNumber: ccui.ImageView = null;
        ivDeleteNumber: ccui.ImageView = null;
        lbAddNumber: ccui.Text = null;
        lbCustomizeName: ccui.Text = null;
        lbDeleteNumber: ccui.Text = null
        lbFloor: ccui.Text = null;
        lbGameName: ccui.Text = null;
        tableNumber = 0;
        tableMin = 0;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.lbCustomizeName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CustomizeName");
            this.lbFloor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Floor");
            this.lbGameName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "GameName");
            this.btnAdd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AddButton");
            this.btnAdd.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                //if(self.changeNumber+self.tableNumber+1>tea.mod.__teaHouseInfo.hmaxtable){
                if (self.changeNumber + self.tableNumber + 1 > 30) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "当前桌子已加到上限" });
                    return;
                }
                self.changeNumber++;
                self.showNumber();
            }, this);
            this.btnDelete = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RemoveButton");
            this.ivGame = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "GameImage");

            this.btnDelete.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                //lw190719桌子可以减到比默认桌数还少
                //if(self.tableNumber+self.changeNumber-1<self.tableMin){
                if (self.tableNumber + self.changeNumber - 1 < 0) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "当前没有可减的桌子" });
                    return;
                }
                self.changeNumber--;
                self.showNumber();
                //kaayou.emit("tea","mod::TeaHouse::DeleteMixTable",{hid:tea.mod.__teaHouseInfo.hid,fid:self._data.fid});
            }, this);


            this.ivAddNumber = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AddCircle");
            this.ivDeleteNumber = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RemoveCircle");
            this.lbAddNumber = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AddNumber");
            this.lbDeleteNumber = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RemoveNumber");
        }

        setInfo(level, data, tableCount, tableMin) {
            var self = this;
            self._data = data;
            self.changeNumber=0;
            self.showNumber();
            if (lodash.isEmpty(data)) {
                return;
            }
            self.tableNumber = tableCount;
            self.tableMin = tableMin;
            self.lbFloor.setString(level + "楼");
            NetImage.setPlayerHead(self.ivGame, data.imageurl);
            self.lbGameName.setString(data.packagename);
            if (data.name == "") self.lbCustomizeName.setString(data.kindname);
            else self.lbCustomizeName.setString(data.name);
        }

        showNumber() {
            if (this.changeNumber > 0) {
                this.lbAddNumber.setString("+" + this.changeNumber.toString());
                this.ivAddNumber.setVisible(true);
                this.ivDeleteNumber.setVisible(false);
            } else if (this.changeNumber == 0) {
                this.lbAddNumber.setString("");
                this.lbDeleteNumber.setString("");
                this.ivAddNumber.setVisible(false);
                this.ivDeleteNumber.setVisible(false);
            } else {
                this.lbDeleteNumber.setString(this.changeNumber.toString());
                this.ivAddNumber.setVisible(false);
                this.ivDeleteNumber.setVisible(true);
            }
            kaayou.emit("tea", "ui::TeaHouse::AddTable", { fid: this._data.fid, table_num: this.changeNumber });
        }

        unuse() {
            this._data = null;
            this.changeNumber=0;
            this.removeFromParent();
        }

    }

    export class tea_AddTableMgr {
        static __INS__: tea_AddTableMgr = null;
        static getInstance() {
            if (tea_AddTableMgr.__INS__ == null) {
                tea_AddTableMgr.__INS__ = new tea_AddTableMgr();
                tea_AddTableMgr.__INS__.init();
            }
            return tea_AddTableMgr.__INS__;
        }
        __selfPanel: AddTable = null;

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::TeaHouse::ShowAddTable', function (e: kaayou.Event) {
                if (kaayou.UIManager.getInstance().getCurRuningSceneName() != "TEAHOUSE") return;
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::AddTable::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new AddTable();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class AddTable extends kaayou.ModelLayer {
        arrChange: any[] = [];
        btnClose: ccui.Button = null;
        btnSave: ccui.Button = null;
        prfRow: ccui.Layout = null;
        svTable: ccui.ScrollView = null;
        constructor() {
            super();
            this.initUI();
        }

        @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.AddTable_json);

            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CloseButton");
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.prfRow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AddTableRow");
            this.svTable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ScrollView");
            this.svTable.setPadding({ left: 0, right: 0, spacingY: 2, top: 0, bottom: 0 });
            this.svTable.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.svTable.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.svTable.setScrollBarEnabled(false);

            this.btnSave = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SaveButton");
            this.btnSave.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::TeaHouse::AddMixTable", { hid: tea.mod.__teaHouseInfo.hid, detail: self.arrChange });
            }, this);
            kaayou.getController('tea').on('ui::TeaHouse::AddTable', function (e: kaayou.Event) {
                let info = e.data;
                for (let i = 0; i < self.arrChange.length; ++i) {
                    if (self.arrChange[i].fid == info.fid) {
                        self.arrChange[i].table_num = info.table_num;
                        break;
                    }
                }
            }, this, 10);
            kaayou.getController('tea').on('ui::AddTable::Hide', function (e: kaayou.Event) {
                self.Hide();
            }, this, 10);
            this.setVisible(false);
        }

        createRow(): AddMixTableRow {
            let cell = kaayou.pool.getFromPool(AddMixTableRow);
            if (!cell) {
                cell = new AddMixTableRow();
                cell.initWithNode(this.prfRow);
            }
            cell.setAnchorPoint(0, 1);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }

        Show(data) {
            let self = this;
            self.showAddTableList();
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {

                }
            });
        }

        showAddTableList() {
            let self = this;
            let floors = tea.mod.__teaHouseInfo.floorsMap;
            self.arrChange = [];
            kaayou.pool.putAllChildrenInPool(this.svTable);

            for (let x in floors) {
                let floor = floors[x];
                let floorInfo = floor.floorItem;
                if (floorInfo.is_mix) {
                    let cell = this.createRow();
                    cell.setInfo((floor.level + 1), floorInfo, floor.tableCount, floor.tableMin);
                    self.svTable.addChild(cell);
                    self.arrChange.push({
                        fid: floorInfo.fid,
                        table_num: 0
                    });
                }
            }
            this.svTable.doChildrenLayout();
        }

        Hide() {
            let self = this;
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action: function () {
                    }
                }
            )
        }
    }
}