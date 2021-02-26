namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;
    class PropotionMyConfigCell extends kaayou.Block implements common.IPullListCell {
        constructor() {
            super();
        }

        img_floor: ccui.ImageView = null;
        lbName: ccui.Text = null;
        lbValue: ccui.Text = null;

        _index: number = -1;
        setIndex(index) {
            this._index = index;
        }
        getIndex() {
            return this._index;
        }

        isVitaAdmin() {
            return tea.mod.__teaHouseInfo.vitamin_admin === true || tea.mod.__teaHouseInfo.urole === HouseMemberRole.CPADMIN;
        }

        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);

            this.lbName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbCustomizeName");
            this.lbValue = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbValue");
            this.img_floor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ivFloor");
        }

        private edits = {}


        _data = null;
        setInfo(data) {
            if (lodash.isEmpty(data)) {
                return;
            }
            this._data = lodash.clone(data);
            this.img_floor.loadTexture("TH_Dela_Floor_font" + (data.floorindex + 1) + ".png", ccui.Widget.PLIST_TEXTURE);
            this.img_floor.ignoreContentAdaptWithSize(true);
            this.lbName.setString(data.floorname);
            if(data.myroyalty==-1){
                this.lbValue.setString("--");
            }else{
                this.lbValue.setString(data.myroyalty);
            }
        }
        
        getInfo() {
            return this._data;
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }
    }

    export class PropotionMyConfigPage {
        delafloor_cell: ccui.Layout = null;
        scrollDetail_list: ccui.ScrollView = null; //
        btnRecord: ccui.Button = null;
        node: cc.Node = null
        initWithNode(pagePartner: cc.Node, cellMod: ccui.Layout) {
            let self = this;
            this.node = pagePartner;
            this.node.setPosition(0, 0);
            this.delafloor_cell = cellMod;
            this.scrollDetail_list = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ScrollView_Detail");
            this.scrollDetail_list.setPadding({ left: 10, spacingY: 10 });
            this.scrollDetail_list.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.scrollDetail_list.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.scrollDetail_list.setScrollBarEnabled(false);

            this.btnRecord=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RecordButton");
            this.btnRecord.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea","ui::PropotionConfigChangeDialog::Show" , 
                    {uid:tea.mod.__teaHouseInfo.uid,hid:tea.mod.__teaHouseInfo.hid});
            }, this);

            kaayou.getController('teaMem').on('ui::PropotionPanel::SubpageChange', this.onSubpageChange, this);

            kaayou.getController('tea').on('ui::TeaHouse::updateMyConfigList', function (e: kaayou.Event) {
                self.scrollDetail_list.removeAllChildren();
                for (var x in e.data) {
                    let cell = self.createCell();
                    self.scrollDetail_list.addChild(cell);
                    cell.setInfo(e.data[x]);
                }
                self.scrollDetail_list.doChildrenLayout();
                self.scrollDetail_list.scrollToTop(0, false);
            }, this, 10);
        }

        _index = -1;

        setIndex(index) {
            this._index = index;
            return this;
        }

        getIndex() {
            return this._index;
        }

        onSubpageChange(e: kaayou.Event) {
            let _data = e.data;
            let { index } = _data;
            if (index == this.getIndex()) {
                if (this.node.isVisible()) {

                } else {
                    this.pullList();
                }
                this.node.setVisible(true);
            } else {
                this.node.setVisible(false);
            }
        }

        private pullList() {
            kaayou.emit("tea", "mod::TeaHouse::GetMyConfig");
        }

        private createCell(): PropotionMyConfigCell {
            let cell = new PropotionMyConfigCell();
            cell.initWithNode(this.delafloor_cell);
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }
    }
}