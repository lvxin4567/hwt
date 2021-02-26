namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;
    interface FloorInfo {
        cname: string,//自定义名称
        fid: number,
        is_mix: boolean,//是否混排
        is_vip: boolean,//是否VIP
        isNew: boolean,
        kindid: number,
        gname: string,
        rule: number, //1 查看 2 设置  4 删除
        icon: string,
        desc: string,//描述
        isCurLevel: boolean // 是否是当前楼层
        isHeadImg:boolean   // 设置楼层头像显示隐藏
    }
    class ChangeFloorCell extends kaayou.Block {
        constructor() {
            super();
        }
        btnRename: ccui.Button = null;
        btn_delete: ccui.Button = null;
        btn_set: ccui.Button = null;
        btn_show: ccui.Button = null;
        ebCustom: any = null;
        game_head: ccui.Layout = null;
        game_head_add: ccui.ImageView = null;
        index = 0;
        ivRenameBg: ccui.ImageView = null;
        img_remote: cc.Sprite = null;
        label_desc: ccui.Text = null;
        label_add: ccui.Text = null;
        label_num: ccui.Text = null;
        lbName: ccui.Text = null;
        ndCustomName: ccui.Layout = null;
        oldName: string = "";
        sel_bg: cc.Sprite = null;
        ivMixFlag: ccui.ImageView = null;
        ivVIP: ccui.ImageView = null;
        btn_floorHeadShow:ccui.Button = null;
        changeFloorCellAuth() {
            let role = tea.mod.__teaHouseInfo.urole;
            if (role == HouseMemberRole.OWNER) {
                this.btnRename.setVisible(true);
                this.ivRenameBg.setVisible(true);
                this.lbName.setVisible(false);
                this.ebCustom.setVisible(true);
            } else {
                this.btnRename.setVisible(false);
                this.ivRenameBg.setVisible(false);
                this.lbName.setVisible(true);
                this.ebCustom.setVisible(false);
            }
        }

        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            let self = this;
            this.game_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "game_head");
            this.img_remote = new cc.Sprite();
            this.game_head.addChild(this.img_remote);
            this.game_head_add = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "game_head_add");
            this.lbName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_desc = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_desc");
            this.label_add = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_add");

            this.btn_delete = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_delete");
            this.btn_set = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_set");
            this.btnRename = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RenameButton");
            this.btn_show = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_show");
            this.label_num = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "numlabel")
            this.sel_bg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "checkmark");
            this.ivMixFlag = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "flag");
            this.ivVIP = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ivVIP");
            this.ivRenameBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RenameBg");
            this.btn_floorHeadShow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_floorHeadShow");
            this.btn_floorHeadShow.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                //设置楼层隐藏头像功能
                kaayou.emit("tea", "mod::TeaHouse::Housefloorhideimg", { fid: self._data.fid, ishide: !!!self._data.isHeadImg });
            }, this);


            this.game_head_add.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) {
                    kaayou.emit("tea", "mod::TeaHouse::DoShowCreate", {});
                } else {
                    (!self._data.isCurLevel) && kaayou.emit("tea", "mod::TeaHouse::ChangeFloor", { fid: self._data.fid, showToast: true });
                }
            }, this);


            this.node.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) {
                    kaayou.emit("tea", "mod::TeaHouse::DoShowCreate", {});
                } else {
                    (!self._data.isCurLevel) && kaayou.emit("tea", "mod::TeaHouse::ChangeFloor", { fid: self._data.fid, showToast: true });
                }
            }, this);

            this.btn_delete.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                let options = {
                    title: "",
                    msg: "是否确定删除该楼层【{level}楼】".format({ level: self.index + 1 }),
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                //return false;
                                kaayou.emit("lobby", "mod::teaHouse::deleteFloor", { fid: self._data.fid });
                            }.bind(this),
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                //return false;

                            }.bind(this),
                            colorType: 'blue'
                        }
                    ]
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            this.btn_set.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                kaayou.emit("tea", "mod::TeaHouse::DoSetCreate", { fid: self._data.fid });
            }, this);

            this.btn_show.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                kaayou.emit("tea", "mod::TeaHouse::DoSetOnlyShow", { fid: self._data.fid });
            }, this);

            this.ndCustomName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CustomName");
            let sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb: cc.Node = cc["EditBox"].create(this.ndCustomName.getContentSize(), sp);
            this.ebCustom = eb;
            eb.setAnchorPoint(0, 0);
            eb.setPosition(0, 5);
            eb.setOpacity(0);
            eb['setFontSize'](16);
            eb['setFontColor'](cc.color("#9394D1"));
            eb['setInputMode'](6);
            eb['setMaxLength'](16);

            eb['setDelegate'](
                {
                    /**
                     * This method is called when an edit box gains focus after keyboard is shown.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidBegin: function (sender) {
                        //console.log('editBoxEditingDidBegin');
                        self.oldName = self.lbName.getString();
                        if (cc.sys.isNative) {
                            kaayou.emit("tea", "ui::Mask::Show");
                        }
                    },

                    /**
                     * This method is called when an edit box loses focus after keyboard is hidden.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidEnd: function (ref) {
                        //console.log('editBoxEditingDidEnd',sender.getString());
                        setTimeout(() => {
                            kaayou.emit("tea", "ui::Mask::Hide");
                        }, 200);
                        let gstr = ref.getString();
                        if (self.oldName == gstr) return;
                        if (gstr.length > 8) {
                            kaayou.emit("common", "ui::Toast::Show", { msg: "楼层名称不能超过8个字符" });
                            self.ebCustom.setString(self.oldName);
                            return;
                        }
                        gstr=kaayou.blackList.checkBlackList(gstr);
                        self.lbName.setString(gstr);
                        kaayou.emit("tea", "mod::TeaHouse::RenameFloor", {
                            hid: tea.mod.__teaHouseInfo.hid,
                            floor_id: self._data.fid,
                            name: gstr
                        });
                    },

                    /**
                     * This method is called when the edit box text was changed.
                     * @param {cc.EditBox} sender
                     * @param {String} text
                     */
                    editBoxTextChanged: function (sender, text) {
                        //console.log('editBoxTextChanged');
                        self.lbName.setString(text);
                    },

                    /**
                     * This method is called when the return button was pressed.
                     * @param {cc.EditBox} sender
                     */
                    editBoxReturn: function (sender) {
                        //console.log('editBoxReturn',sender.getString());
                    }
                }
            )
            this.ndCustomName.addChild(eb);
        }

        setIndex(i: number) {
            this.label_num.setString("" + (i + 1));
            this.index = i;

            this.doUpdate();
        }

        doUpdate() {
            let self = this;
            // this.img_level.loadTexture(`lobby.tea.cgl.num${this.index + 1}nor.png`, ccui.Widget.PLIST_TEXTURE);
            this.label_num.setTextColor(cc.color(158, 139, 222));
            // this.label_num.setColor(cc.color(158, 139, 222));
            if (!this._data) {
                this.game_head_add.setVisible(true);
                this.label_add.setVisible(true);
                this.lbName.setString("");
                this.label_desc.setString("");
                this.ebCustom.setVisible(false);
                this.lbName.setVisible(false);
                this.label_desc.setVisible(false);
                this.sel_bg.setVisible(false);
                this.btn_delete.setVisible(false);
                this.btn_set.setVisible(false);
                this.btnRename.setVisible(false);
                this.btn_show.setVisible(false);
                self.img_remote.setVisible(false);
                this.ivMixFlag.setVisible(false);
                self.ivVIP.setVisible(false);
                this.ivRenameBg.setVisible(false);
                return;
            }
            this.sel_bg.setVisible(false);
            if (this._data.isCurLevel) {
                // this.img_level.loadTexture(`lobby.tea.cgl.num${this.index + 1}sel.png`, ccui.Widget.PLIST_TEXTURE);
                this.sel_bg.setVisible(true);
                this.label_num.setTextColor(cc.color(116, 61, 31));
                // this.label_num.setColor(cc.color(116, 61, 31));
            }

            NetImage.loadImage(this._data.icon).then(function (tex: cc.Texture2D) {
                if (!self.img_remote.isRunning() || !self.game_head.isRunning()) { return; }
                self.img_remote.setVisible(true);
                self.img_remote.initWithTexture(tex);
                NetImage.doSpriteContentSizeAndPosition(self.img_remote, self.game_head.getContentSize());
            });

            this.game_head_add.setVisible(false);
            this.label_add.setVisible(false);
            this.lbName.setVisible(true);
            if (this._data.cname == "") this.lbName.setString(this._data.gname);
            else this.lbName.setString(this._data.cname);
            this.ebCustom.setString(this.lbName.getString());
            this.label_desc.setVisible(true);
            this.label_desc.setString(this._data.desc);

            this.btn_delete.setVisible(!!(this._data.rule & 4));
            this.btn_set.setVisible(!!(this._data.rule & 2));
            this.btn_show.setVisible(this._data.rule == 1);
            this.ivMixFlag.setVisible(this._data.is_mix);
            this.ivVIP.setVisible(this._data.is_vip);

            //不需要这个功能
            this.btn_floorHeadShow.setVisible(false);
            this.btn_floorHeadShow.getChildByName("off").setVisible(!this._data.isHeadImg);
            this.btn_floorHeadShow.getChildByName("on").setVisible(this._data.isHeadImg);
            
            this.changeFloorCellAuth();
        }

        _data: FloorInfo = null;
        setInfo(data: FloorInfo) {
            if (lodash.isEmpty(data)) {
                this._data = null;
            } else {
                this._data = data;
                if (data.isNew) {
                    this._data = null;
                }
            }

            this.doUpdate();
        }

    }

    export class ChangeFloorPanel extends kaayou.ModelLayer {
        cell_posX = 15;
        _data = null;
        floorItemGroup: ccui.ScrollView = null;
        tea_cell_change_mode: ccui.Layout = null;
        Floor_top_Layout: ccui.Layout = null;
        Floor_add_Layout: ccui.Layout = null;
        Floor_add_Layout_Index_label: ccui.Text = null;
        floor_Panel: ccui.Layout = null;
        btn_vip:ccui.Button
        btn_mix_floor: ccui.Button;
        bottom_control_panel: ccui.Layout;
        constructor() {
            super();
            this.initUI();
        }

        @doBindEvent
        initUI() {
            let self = this;
            this.initWithccs(tea.res.ChangeFloorPanel_json, false);
            this.Floor_top_Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_Layout");
            this.Floor_add_Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Floor_add_Layout");
            this.Floor_add_Layout_Index_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Add_numlabel");
            this.floorItemGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Scroll_Floor");
            this.tea_cell_change_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_cell_change_mode");
            this.floorItemGroup.setPadding({ spacingY: 0 });
            this.floorItemGroup.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.floorItemGroup.setVertical(ccui.Layout.LayoutVertical.BOTTOM);
            this.floorItemGroup.setScrollBarEnabled(false);
            this.floor_Panel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floor_panel");
            this.bottom_control_panel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bottom_control_panel");
            
            this.btn_vip = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_vip");
            this.btn_vip.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea",'mod::TeaHouse::GetVipFloorList',{hid:tea.mod.__teaHouseInfo.hid});
            },this)

            this.btn_mix_floor  = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_mix_floor");
            this.btn_mix_floor.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::TeaHouse::GetMixInfo");
            },this);

            this.Floor_add_Layout.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.emit("tea", "mod::TeaHouse::DoShowCreate", {});
            }, this);

            this.btn_vip.setVisible(false)
            this.btn_mix_floor.setVisible(false)
            this.bottom_control_panel.setVisible(false);
            this.floor_Panel.y = 0;
            this.Hide();
        }
        private createCell(): ChangeFloorCell {
            let cell = kaayou.pool.getFromPool(ChangeFloorCell);
            if (!cell) {
                cell = new ChangeFloorCell();
                cell.initWithNode(this.tea_cell_change_mode);
            }
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }

        @BindEvent("tea", "ui::Floor::Update")
        onFloorUpdate(data: { hasrole: boolean, data: FloorUpdateInfo }) {
            // return;
            // kaayou.pool.putAllChildrenInPool(this.floorItemGroup);
            this.floorItemGroup.removeAllChildren();
            let cdata: Array<FloorInfo> = [];
            let info = data.data;
            if (!lodash.isEmpty(info) && !lodash.isEmpty(info.floorMap)) {
                for (var x in info.floorMap) {
                    let level = lodash.toInteger(info.floorMap[x].level);
                    let temp = info.floorMap[x];
                    cdata[level] = {
                        cname: temp.floorItem.name,
                        fid: temp.floorItem.fid,
                        is_mix: temp.floorItem.is_mix,
                        is_vip: temp.floorItem.is_vip,
                        isCurLevel: Number(x) == info.fid,
                        kindid: temp.floorItem.frule.kindid,
                        rule: data.hasrole ? 7 : 1,
                        gname: temp.richRule.name,
                        desc: "{name} ({num}局)".format(
                            {
                                name: temp.richRule.name,
                                num: temp.floorItem.frule.roundnum,
                                // count: temp.floorItem.frule.playernum 
                            }),
                        icon: temp.richRule.icon,
                        isNew: false,
                        isHeadImg:!!temp.floorItem.hideimg,
                    }
                }
            }
            // let needSize = 5 - lodash.size(cdata);
            // for (var i = 0; i < needSize; i++) {
            //     if (!data.hasrole) {
            //         cdata.push(null);
            //         continue;
            //     }
            //     if (i == 0) {
            //         cdata.push(
            //             {
            //                 cname:"",
            //                 fid: 0,
            //                 is_mix:false,
            //                 kindid: 0,
            //                 isCurLevel: false,
            //                 rule: 0,
            //                 gname: "",
            //                 desc: "",
            //                 icon: "",
            //                 isNew: true
            //             }
            //         );
            //     } else {
            //         cdata.push(null);
            //     }
            // }

            // let children = this.floorItemGroup.getChildren();
            // for (var x in cdata) {
            //     (<ChangeFloorCell>children[x]).setInfo(cdata[x]);
            //     (<ChangeFloorCell>children[x]).setVisible(!!cdata[x]);
            // }
            for (var x in cdata) {
                let cell = this.createCell();
                this.floorItemGroup.addChild(cell);
                cell.setInfo(cdata[x]);
                cell.setIndex(Number(x));
            }
            // this.floorItemGroup.doChildrenLayout();
            // this.floorItemGroup.scrollToBottom(0,false)
            let topHeight = 0;
            if (data.hasrole) {
                if (lodash.size(cdata) < 20) {
                    topHeight = lodash.size(cdata) > 5 ? 450  : lodash.size(cdata) * 96 ;
                    this.Floor_add_Layout.setVisible(true);
                    this.Floor_add_Layout_Index_label.setString("" + (lodash.size(cdata) + 1))
                    this.Floor_add_Layout.setEnabled(true);
                    this.Floor_top_Layout.setEnabled(true);
                } else  {
                    topHeight = lodash.size(cdata) > 5 ? (450  - 96) : lodash.size(cdata) * 96 - 96;
                    this.Floor_add_Layout.setVisible(false);
                    this.Floor_add_Layout.setEnabled(false);
                    this.Floor_top_Layout.setEnabled(false);
                }


            } else {
                topHeight = lodash.size(cdata) > 5 ? (450 - 96) : (lodash.size(cdata) - 1) * 96 ;
                this.Floor_add_Layout.setVisible(false);
                this.Floor_add_Layout.setEnabled(false);
                this.Floor_top_Layout.setEnabled(false);
            }
            this.Floor_top_Layout.setPositionY(topHeight)
            this.floor_Panel.setContentSize(602, topHeight + 172);
            this.floorItemGroup.setContentSize(602, lodash.size(cdata) > 5 ? 450 : lodash.size(cdata) * 96);
            this.floorItemGroup.doChildrenLayout();
        }

        @BindEvent('tea', 'ui::TeaHouse::UpdateInfo')
        private initWithUrole(){
            let self = this;
            this.bottom_control_panel.setVisible(false);
            if (!!tea.mod.__teaHouseInfo) {
                let role = tea.mod.__teaHouseInfo.urole;
                 this.btn_vip.setVisible(false);
                 this.btn_mix_floor.setVisible(false);
                if (role == HouseMemberRole.OWNER) {
                     this.btn_vip.x = 180;
                     this.btn_vip.setVisible(true);
                     this.bottom_control_panel.setVisible(true)
                     this.btn_mix_floor.setVisible(true);
                } else if (role == HouseMemberRole.ADMIN) {  
                     this.btn_vip.setVisible(true);
                     this.btn_vip.x = 325;
                     this.bottom_control_panel.setVisible(true)
                     
                } else if (role == HouseMemberRole.CAPTAIN) {  
                    this.btn_vip.setVisible(true);
                    this.btn_vip.x = 325;
                    this.bottom_control_panel.setVisible(true)
                    
               } 
            }

            if(this.bottom_control_panel.isVisible()){
                this.floor_Panel.y = 96;
            }else{
                this.floor_Panel.y = 0;
            }

            if(tea.mod.__teaHouseInfo.urole === HouseMemberRole.ADMIN || tea.mod.__teaHouseInfo.urole === HouseMemberRole.CAPTAIN){
                this.unwatchRole()
                this.watchRole()
                this.checkUserRole()
            }

        }

        unwatchRole(){

            let promiss = tea.mod.House.getPromissionInstance();
            promiss.removeWatch("VIP楼层设置",(data)=>{
                console.log(data);
            })

        }

        watchRole(){

            let promiss = tea.mod.House.getPromissionInstance();

            promiss.watch("VIP楼层设置",(data)=>{
                let isCanUse = data["minor_status"].new === tea.mod.House.PERMISSION_TYPE.ESCALATION;
                this.bottom_control_panel.setVisible(isCanUse);
                if(isCanUse){
                    this.floor_Panel.y = 96;
                }else{
                    this.floor_Panel.y = 0;
                }

            })

        }

        checkUserRole(){

            let promiss = tea.mod.House.getPromissionInstance();
            
            let vipFloorCan = tea.mod.Permission.getInstance().hasPermission("VIP楼层设置")

            this.bottom_control_panel.setVisible(vipFloorCan);
            if(vipFloorCan){
                this.floor_Panel.y = 96;
            }else{
                this.floor_Panel.y = 0;
            }

        }

        @BindEvent("tea", 'ui::ChangeFloor::Show')
        Show() {
            this.initWithUrole();
            this.setVisible(true);
        }

        @BindEvent("tea", 'ui::ChangeFloor::Hide')
        Hide() {
            this.setVisible(false);
        }
    }
}