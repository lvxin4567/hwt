namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class ChangeFloorBlock extends kaayou.Layer {
        constructor() {
            super();
            this.initUI();
        }
        _level = -1;
        _fidArr: Array<number> = null;
        //arrChange:any[]=[];
        bMix: boolean = false;
        btnAdd: ccui.Button = null;
        currentFloorId: number = 0;
        downFloorId: number = 0;

        btn_down: ccui.Button = null;
        btn_up: ccui.Button = null;
        floorGrpup: ccui.Layout = null;
        floorNum: cc.Label = null;

        upFloorId: number = 0;

        auth() {
            let self = this;
            let role = tea.mod.__teaHouseInfo.urole;
            self.btnAdd.setVisible(false);
            if (self.bMix && tea.mod.__teaHouseInfo.house_table_join_type == 0) {
                if (role == HouseMemberRole.OWNER) {
                    self.btnAdd.setVisible(true);
                }
            } else {
                self.btnAdd.setVisible(false);
            }
        }

        @doBindEvent
        initUI() {
            this.initWithccs(tea.res.ChangeFloorBlock_json, false);
            let self = this;
            this.floorGrpup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floor_group");
            this.floorGrpup.setAnchorPoint(0, 0.5);
            this.floorGrpup.setPosition(20, cc.winSize.height / 2);

            //右侧的加桌
            this.btnAdd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AddButton");
            this.btnAdd.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "ui::TeaHouse::ShowAddTable");
            }, this);

            //上楼
            this.btn_up = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_up");
            this.btn_up.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                e.stopPropagation();
                if (lodash.isEmpty(self._fidArr)) { return; }
                //if(self._level + 1 > self._fidArr.length -1){ return ;}
                // let fid = self._fidArr[self._level + 1];
                kaayou.emit("tea", "mod::TeaHouse::ChangeFloor", { fid: self.upFloorId, showToast: true });
            }, this);

            //下楼
            this.btn_down = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_down");

            this.btn_down.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                e.stopPropagation();
                if (lodash.isEmpty(self._fidArr)) { return; }
                //if(self._level - 1 < 0){ return ;}
                //let fid = self._fidArr[self._level - 1];
                kaayou.emit("tea", "mod::TeaHouse::ChangeFloor", { fid: self.downFloorId, showToast: true });
            }, this);

            this.floorNum = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floornum");
        }

        @BindEvent("tea", "ui::Floor::Update")
        onFloorUpdate(data: { hasrole: boolean, data: FloorUpdateInfo, showToast?: boolean }) {
            this.setVisible(!!data);
            this.setVisible(!!data.data);
            if (!data) { return; }
            let info = data.data;
            this._fidArr = null;
            this._level = -1;
            let bshow = !lodash.isEmpty(info) && info.fid && !lodash.isEmpty(info.floorMap) && !lodash.isEmpty(info.floorMap[info.fid]);
            if (!bshow) {
                this.doSetAllEnabled(false);
                return;
            }

            this._fidArr = [];
            for (var x in info.floorMap) {
                let level = lodash.toInteger(info.floorMap[x].level);
                // if (level < 0 || level > 4) {
                //     this.doSetAllEnabled(false);
                //     return;
                // }
                this._fidArr[level] = lodash.toInteger(x);
            }

            let temp = info.floorMap[info.fid];
            let level = lodash.toInteger(temp.level);
            if (level < 0 || level >= this._fidArr.length) {
                //错误
                this.doSetAllEnabled(false);
                return;
            }

            this.doSetAllEnabled(true);
            if (data.data.floorMap[info.fid].floorItem.is_mix) this.floorNum.setString("大厅");
            else this.floorNum.setString("" + (level + 1) + "楼");
            if (data.showToast) {
                let floorInfo = info.floorMap[info.fid];
                if (floorInfo.floorItem.is_mix) kaayou.emit("tea", "ui::teahouse::changeFloor", { pos: cc.p(cc.winSize.width / 2, cc.winSize.height / 2), msg: "进入大厅楼层" });
                else kaayou.emit("tea", "ui::teahouse::changeFloor", { pos: cc.p(cc.winSize.width / 2, cc.winSize.height / 2), msg: "进入" + this.floorNum.string + floorInfo.richRule.name + "玩法" })
            }
            this._level = level;
            this.bMix = temp.floorItem.is_mix;
            this.currentFloorId = info.fid;
            this.checkUpAndDown(data.data.floorMap);
            if (this.downFloorId < 1) {
                this.btn_down.setBright(false);
                this.btn_down.setEnabled(false);
            }
            if (this.upFloorId < 1) {
                this.btn_up.setBright(false);
                this.btn_up.setEnabled(false);
            }
            this.auth();
        }

        checkUpAndDown(data) {
            let arrFloors = [];
            let index = 0;
            //this.arrChange=[];
            //有没有混楼
            for (let x in data) {
                if (data[x].floorItem.is_mix) arrFloors.push({ fid: data[x].floorItem.fid, isMix: true });
            }
            for (let x in data) {
                if (!data[x].floorItem.is_mix) arrFloors.push({ fid: data[x].floorItem.fid, isMix: false });
            }
            for (let i = 0; i < arrFloors.length; ++i) {
                if (arrFloors[i].fid == this.currentFloorId) {
                    index = i;
                }
                // if(arrFloors[i].isMix){
                //     this.arrChange.push({
                //         fid:arrFloors[i].fid,
                //         table_num:0
                //     });
                // }
            }

            this.upFloorId = 0;
            for (let i = index + 1; i < arrFloors.length; ++i) {
                if (arrFloors[i].isMix) continue;
                else {
                    this.upFloorId = arrFloors[i].fid;
                    break;
                }
            }
            this.downFloorId = 0;
            for (let i = index - 1; i >= 0; --i) {
                if (arrFloors[i].isMix && this.bMix) continue;
                else {
                    this.downFloorId = arrFloors[i].fid;
                    break;
                }
            }
        }

        doSetAllEnabled(b) {
            if (!b) {
                this._fidArr = null;
                this._level = -1;
            }
            // this.img_num.setVisible(b);
            this.btn_up.setBright(b);
            this.btn_up.setEnabled(b);
            this.btn_down.setBright(b);
            this.btn_down.setEnabled(b);
        }
    }
}