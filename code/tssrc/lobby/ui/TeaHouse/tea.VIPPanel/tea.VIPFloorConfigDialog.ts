namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;



    export class tea_VIPFloorConfigDialogMgr {
        static __INS__: tea_VIPFloorConfigDialogMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_VIPFloorConfigDialogMgr.__INS__ == null) {
                tea_VIPFloorConfigDialogMgr.__INS__ = new tea_VIPFloorConfigDialogMgr();
                tea_VIPFloorConfigDialogMgr.__INS__.init();
                tea_VIPFloorConfigDialogMgr.__INS__._zOrder = _zOrder
            }
            return tea_VIPFloorConfigDialogMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog: VIPFloorConfigDialog = null

        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::VIPFloorConfigDialog::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::VIPFloorConfigDialog::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            kaayou.getController("lobby").on("ws::Msg::housefloorvipuserset_ntf", function (e: kaayou.Event) {
                let { fid, num_viper } = e.data;
                self.getPanel(false) && self.getPanel(false).setFloorNumByFid(fid, num_viper);
            }, this)

            kaayou.getController("lobby").on("ws::Msg::housefloorvipuserAllset_ntf", function (e: kaayou.Event) {
                let { fid, num_viper } = e.data;
                self.getPanel(false) && self.getPanel(false).setFloorNumByFid(fid, num_viper);
            }, this)
            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new VIPFloorConfigDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog, this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }

    }

    export class VIPFloorConfigDialog extends kaayou.Layer {

        constructor() {
            super()
            this.initUI();
        }

        private listNode: ccui.ScrollView = null;
        private list: Array<VIPFloorConfigDialogItem> = []
        private closeNode: ccui.Button = null;
        private item: ccui.Widget = null;
        private submit: ccui.Button = null;

        initUI() {
            this.initWithccs(tea.res.TH_VIPFloorConfigDialog_json)

            this.listNode = <ccui.ScrollView>((<ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "memberlist")).getChildByName("content"));
            this.listNode.setPadding({ spacingY: 10, top: 10 });
            this.listNode.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.listNode.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "th_scope_member_row");
            this.closeNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.submit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "submit");

            this.closeNode.on(kaayou.TouchEvent.TouchEnd, () => {
                this.Hide();
            }, this)

            this.submit.on(kaayou.TouchEvent.TouchEnd, kaayou.TouchMask.clickHandle(() => {
                this.submitList();
            }, this), this)

        }

        setFloorNumByFid(fid: number, vipnum: number) {
            let item = this.list.filter(v => {
                return v.getInfo().fid === fid;
            })[0]

            if (item) {
                let info = item.getInfo();
                info.num_viper = vipnum
                item.setInfo(info);
            }

        }

        async submitList() {
            let items = this.list.map(v => {
                const { fid, is_vip,is_cap_set_vip ,is_def_join_vip } = v.getInfo()
                return { fid, is_vip,is_cap_set_vip,is_def_join_vip }
            })
            let hid = tea.mod.__teaHouseInfo.hid;
            let data = await kaayou.sendMessage("lobby", "housevipfloorset", { hid, items }, "ws::Msg::housevipfloorset");

            if (data.errcode) {
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: data.msg || "提交信息失败!"
                })
                return;
            }

            kaayou.emit('common', 'ui::Toast::Show', {
                msg: "操作生效"
            })

            this.Hide();
        }

        // async pullConfigList() {
        //     let hid = tea.mod.__teaHouseInfo.hid;
        //     let map = tea.mod.__teaHouseInfo.floorsMap;
        //     let data = await kaayou.sendMessage("lobby", "housevipfloorget", { hid }, "ws::Msg::housevipfloorget");

        //     if (data.errcode) {
        //         kaayou.emit('common', 'ui::Toast::Show', {
        //             msg: data.msg || "获取信息失败!"
        //         })
        //         return;
        //     }

        //     if (!tea.mod._isMaster() && !data.items) {
        //         kaayou.emit('common', 'ui::Toast::Show', {
        //             msg: "暂无可设置楼层，请联系圈主。"
        //         })
        //         return;
        //     }


        //     if (!data.items)
        //         data.items = []
        //     let datas = []
        //     this.listNode.removeAllChildren();

        //     data.items.forEach(v => {
        //         const { fid } = v;
        //         const { level } = map[fid];
        //         datas[level] = v;
        //     });
        //     this.list = []

        //     datas.forEach((it, i) => {
        //         let initedItem = new VIPFloorConfigDialogItem(this.item);
        //         initedItem.setInfo(it);
        //         initedItem.setIndex(i);
        //         initedItem.node.setPosition(0, 0);
        //         this.list.push(initedItem);
        //         this.listNode.addChild(initedItem.node);
        //     })

        //     this.listNode.doChildrenLayout();
        //     this.listNode.scrollToTop(0, false);


        // }


        Show(data) {
            // this.pullConfigList()
            this.node.setVisible(true);
            this.submit.setVisible(!tea.mod._isPartner() && !tea.mod._isViceCaptain());
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: () => {
                    // this.pullConfigList();
                    let map = tea.mod.__teaHouseInfo.floorsMap;
                    if (!data.items)
                        data.items = []
                    let datas = []
                    this.listNode.removeAllChildren();

                    data.items.forEach(v => {
                        const { fid } = v;
                        const { level } = map[fid];
                        datas[level] = v;
                    });
                    this.list = []

                    datas.forEach((it, i) => {
                        let initedItem = new VIPFloorConfigDialogItem(this.item);
                        initedItem.setInfo(it);
                        initedItem.setIndex(i);
                        initedItem.node.setPosition(0, 0);
                        this.list.push(initedItem);
                        this.listNode.addChild(initedItem.node);
                    })

                    this.listNode.doChildrenLayout();
                    this.listNode.scrollToTop(0, false);
                }
            });
        }

        Hide() {
            this.node.setVisible(false);
        }
    }


    class VIPFloorConfigDialogItem {

        constructor(item: cc.Node) {
            this.initUI(item)
        }

        node: cc.Node = null;
        index = -1;
        checkbox: ccui.CheckBox;
        floor: ccui.Text;
        buton: ccui.Button;
        memberNum: ccui.Text;
        canCapSetCb: ccui.CheckBox = null;
        floorName:ccui.Text = null;
        defaultJoin_cb:ccui.CheckBox = null;
        cap_defualt_label:ccui.Text = null;
        initUI(item: cc.Node) {
            this.initWithNode(<ccui.Widget>item);
            this.checkbox = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "checkbox");
            this.buton = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Button_31");
            this.floor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floor");
            this.memberNum = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Text_146");
            this.floorName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floorName");
            this.canCapSetCb = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "capCanSet");
            this.defaultJoin_cb = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "defaultJoin");
            this.cap_defualt_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cap_defualt_label");
            this.checkbox.on(kaayou.CheckEvent.SELECTED, () => {
                this._info.is_vip = true
            }, this)

            this.checkbox.on(kaayou.CheckEvent.UNSELECTED, () => {
                this._info.is_vip = false
            }, this)

            this.canCapSetCb.on(kaayou.CheckEvent.SELECTED, () => {
                this._info.is_cap_set_vip = true
            }, this)

            this.canCapSetCb.on(kaayou.CheckEvent.UNSELECTED, () => {
                this._info.is_cap_set_vip = false
            }, this)

            this.defaultJoin_cb.on(kaayou.CheckEvent.SELECTED, () => {
                this._info.is_def_join_vip = true
            }, this)

            this.defaultJoin_cb.on(kaayou.CheckEvent.UNSELECTED, () => {
                this._info.is_def_join_vip = false
            }, this)

            this.buton.on(kaayou.TouchEvent.TouchEnd, () => {
                console.log("弹出设置VIp" + this._info.fid)
                kaayou.emit("tea", "ui::TeaHouse::ShowSetVipFloorMemPanel", { fid: this._info.fid, floorIndex: this.index });
            }, this)

        }

        update() {
            const { is_vip, num_viper, is_cap_set_vip ,is_def_join_vip} = this._info;
            this.checkbox.setSelected(is_vip);
            this.memberNum.setString(`已添加${num_viper}人`);
            this.canCapSetCb.setSelected(is_cap_set_vip);
            this.defaultJoin_cb.setSelected(is_def_join_vip);
            this.canCapSetCb.setVisible(tea.mod._isMaster());
            this.checkbox.setEnabled(!tea.mod._isPartner() && !tea.mod._isViceCaptain());
            this.defaultJoin_cb.setVisible(tea.mod._isMaster());
            this.cap_defualt_label.setVisible(is_def_join_vip && (tea.mod._isPartner() || tea.mod._isViceCaptain()) )
        }

        private _info = { fid: 0, is_vip: false, num_viper: 0, is_cap_set_vip: false , is_def_join_vip:false}
        setInfo({ fid, is_vip, num_viper, is_cap_set_vip,is_def_join_vip }) {
            this._info.fid = fid;
            this._info.is_vip = is_vip;
            this._info.num_viper = num_viper;
            this._info.is_cap_set_vip = is_cap_set_vip;
            this._info.is_def_join_vip = is_def_join_vip;
            let fName = tea.mod.__teaHouseInfo.floorsMap[fid].floorItem.name;
            let kindName = tea.mod.__teaHouseInfo.floorsMap[fid].floorItem.kindname;
            let floorNick = fName.length>0 ? fName:kindName;
            this.floorName.setString(floorNick.length>7 ? floorNick.substring(0,7):floorNick);
            this.update();
        }

        getInfo() {
            return this._info;
        }

        initWithNode(node: ccui.Widget) {
            this.node = node.clone();
            this.node.setVisible(true);
            this.node.setPosition(0, 0);
            this.node.setAnchorPoint(0, 0);
            ccui.helper.doLayout(this.node);
        }

        setIndex(index: number) {
            this.index = index;
            this.floor.setString(`${index + 1}楼`)
        }
        getIndex(): number {
            return this.index
        }

    }

}