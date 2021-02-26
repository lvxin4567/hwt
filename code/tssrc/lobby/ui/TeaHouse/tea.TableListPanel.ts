namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class TableCell extends kaayou.Block implements common.ICuttingScrollViewCell {
        constructor() {
            super();
            this.initUI();
        }

        _data: tea.ITeaHouseTableItem;
        _index: number = -1;
        btn_detail: ccui.Button = null;
        lbGameNO: ccui.Text = null;
        label_no: ccui.Text = null;
        img_lock: ccui.ImageView = null;
        head_layouts: ccui.Layout[] = null;
        join_btn: ccui.Layout = null;
        roomImg_bg: ccui.ImageView = null
        roomID_label: ccui.Text = null;
        roomTableBg: ccui.ImageView = null;
        tableDetailbtn_Bg: ccui.ImageView = null;
        match_Label: ccui.Text = null;
        match_label_left: ccui.Text = null;
        fullTableNum: ccui.Text = null;
        tableBg_light: ccui.ImageView = null;
        mainTablelayout: ccui.Layout = null;
        huxiAnilayout: ccui.Layout = null;
        posMap = {
            2: [cc.p(36, 230), cc.p(238, 137), cc.p(189, 58), cc.p(189, 169), cc.p(189, 169),],
            3: [cc.p(135, 248), cc.p(34, 125), cc.p(235, 125), cc.p(220, 100), cc.p(189, 169),],
            4: [cc.p(37, 228), cc.p(38, 118), cc.p(232, 118), cc.p(232, 228), cc.p(189, 169),],
            5: [cc.p(133, 253), cc.p(21, 236), cc.p(48, 116), cc.p(220, 116), cc.p(242, 236),],
        }
        lyWatchers: ccui.Layout[] = null;
        fid: number = 0;
        // image_sp_head:cc.Sprite = null
        initWithccs() {
            super.initWithccs(tea.res.Table_Cell1_json);
        }
        initUI() {
            this.initWithccs();
            this.label_no = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_no");
            this.join_btn = <ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Panel_5");
            this.roomImg_bg = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "room_imgbg");
            this.roomID_label = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "roomid");
            this.lbGameNO = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "gameNO");
            this.roomTableBg = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tableStyleBg");
            this.tableDetailbtn_Bg = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tableDetailbtn_Bg");
            //this.tableBg_light = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Image_bgLight");
            this.match_Label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "match_label");
            this.match_label_left = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "match_label_left");
            this.fullTableNum = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "fullTbale_label");
            this.mainTablelayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mainTablelayout");
            this.mainTablelayout.setVisible(false);
            this.huxiAnilayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "huxiAniLayout");


            let pos = cc.p(37, 19);
            let anim: sp.SkeletonAnimation = sp.SkeletonAnimation.createWithJsonFile(lobby.res.huxiAnimation_json, lobby.res.huxiAnimation_atlas, 1);
            anim.setAnimation(0, "znHuxi", true);
            this.huxiAnilayout.addChild(anim);
            // anim.setCompleteListener(function () {
            //     anim.visible = false;
            //     data.call && data.call();
            // })
            anim.setPosition(pos);//
            anim.setScale(1.2);

            this.head_layouts = [];
            for (var i = 0; i < 5; i++) {
                this.head_layouts.push(<ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, `head_layout${i}`));
            }
            for (var x in this.head_layouts) {
                this.head_layouts[x].setVisible(false);
                this.head_layouts[x].getChildByName("mainHead").setVisible(false);
                this.initTableImageNode(this.head_layouts[x]);
            }
            this.lyWatchers = [];
            let watcherContainer: ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lyWatcher");
            for (let i = 0; i < watcherContainer.childrenCount; ++i) {
                this.lyWatchers.push(<ccui.Layout>watcherContainer.children[i]);
            }
            for (var x in this.lyWatchers) {
                // this.lyWatchers[x].setVisible(false);
                this.initWatcherImageNode(this.lyWatchers[x]);
            }

            this.btn_detail = <ccui.Button>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_detail");

            let self = this;
            this.doBindTouchEvent(this.btn_detail, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.showDetailPanel();
            }, this);
            this.doBindTouchEvent(this.join_btn, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!!!tea.mod.__teaHouseInfo) {
                    return;//
                }
                let teaInfo: Data_HouseInfo = tea.mod.__teaHouseInfo;
                //lw200910如果是圈主或管理员，就弹详情
                if (tea.mod._isManager() || tea.mod._isMaster()) {
                    if (teaInfo.house_table_join_type == 2 && self._data.ismain) {
                        //lw200927如果是防作弊模式的智能匹配入口，就不弹详情
                    } else {
                        self.showDetailPanel();
                        return;
                    }
                }

                if (!!!tea.mod.__teaHouseInfo || tea.mod.__teaHouseInfo.only_quick) { //|| lodash.isEmpty(tea.mod.__teaHouseTableList)
                    kaayou.emit("common", "ui::Toast::Show", { msg: "当前亲友圈设置为仅支持点击“快速入桌”按钮入桌" });
                    return;
                }
                if (self._data.ismain) {
                    kaayou.emit('tea', "mod::Table::joinTable", { fid: self.fid, index: -1, ignorerule: false })
                    return;
                } else {

                    if (teaInfo.mix_active && teaInfo.house_table_join_type == 2 && teaInfo.isCurFloorMix) {
                        return;
                    }
                }


                kaayou.emit('tea', "mod::Table::joinTable", { fid: self.fid, index: self._data.ntid, ignorerule: false })
            }, this);
        }

        _curTouchTarget = null;

        showDetailPanel() {
            let self = this;
            // if (self._data.ismain) {   //在
            //     return;
            // }
            let teaInfo: Data_HouseInfo = tea.mod.__teaHouseInfo  //|| (!teaInfo.ishidhide && !!self._data.hideimg && !self._data.begin)
            if (teaInfo.isheadhide && !(teaInfo.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY)) {
                return;
            }
            if (teaInfo.mix_active &&
                teaInfo.house_table_join_type == 2 &&
                teaInfo.isCurFloorMix &&
                teaInfo.isaisuper &&
                !(teaInfo.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY)) {//
                return;
            }
            if (self._data.tid) {
                kaayou.emit("lobby", "mod::TeaHouse::TableDetail", { fid: self.fid, tid: self._data.tid, ntid: self._data.ntid });
            } else if (self._data.tid == 0 && self._data.atid > 0) {
                kaayou.emit("lobby", "mod::TeaHouse::TableDetail", { fid: self.fid, tid: self._data.atid, ntid: self._data.ntid });
            }
            else {
                kaayou.emit("tea", 'ui::TableDetail::Show', { fid: self.fid, ntid: self._data.ntid });
            }
        }
        doBindTouchEvent(widget: ccui.Widget, callEndFunc: (e: kaayou.TouchEvent) => void, orTagert: any) {
            let self = this;
            widget.setSwallowTouches(false);
            widget['_isScrollTouchCancel'] = false;
            widget.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {
                let tagert: ccui.Widget = e.target;
                if (self._curTouchTarget == null) {
                    self._curTouchTarget = tagert;
                }
                tagert['_isScrollTouchCancel'] = false;
            }, this);
            widget.on(kaayou.TouchEvent.TouchMove, function (e: kaayou.TouchEvent) {
                let tagert: ccui.Widget = e.target;
                if (self._curTouchTarget !== tagert) {
                    return;
                }
                if (tagert['_isScrollTouchCancel']) {
                    return false;
                }
                if (15 < Math.abs(tagert.getTouchBeganPosition().x - tagert.getTouchMovePosition().x)) {
                    tagert['_isScrollTouchCancel'] = true;
                    return;
                }
                if (15 < Math.abs(tagert.getTouchBeganPosition().y - tagert.getTouchMovePosition().y)) {
                    tagert['_isScrollTouchCancel'] = true;
                    return;
                }

            }, this);
            widget.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
                let tagert: ccui.Widget = e.target;
                if (self._curTouchTarget !== tagert) {
                    return;
                }
                tagert['_isScrollTouchCancel'] = false;
                self._curTouchTarget = null;
            }, this);
            widget.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                let tagert: ccui.Widget = e.target;
                if (self._curTouchTarget !== tagert) {
                    return;
                }
                if (!tagert['_isScrollTouchCancel']) {
                    callEndFunc.call(orTagert, e);
                }
                tagert['_isScrollTouchCancel'] = false;
                self._curTouchTarget = null;
            }, this);
        }

        getIndex() {
            return this._index;
        }

        setIndex(i: number) {
            this._index = i;
            if (this._data == undefined) this.label_no.setString(`${i + 1}` + ".详情");
            if (this._data && !this._data.isMix) this.label_no.setString(`${i + 1}` + ".详情");
        }


        setInfo(info: ITeaHouseTableItem) {

            this._data = info;

            for (var x in this.head_layouts) {
                this.head_layouts[x].setVisible(false);
                this.head_layouts[x].getChildByName("clip").getChildByName("headImg").setVisible(false);
                this.head_layouts[x].getChildByName("readyImg").setVisible(false);
            }
            if (this._data == null) {
                this.roomImg_bg.setVisible(false);
                // this.node.setVisible(false);
                return;
            } else {
                this.node.setVisible(true);
            }
            this.mainTablelayout.setVisible(false);
            //自适应用这一行
            //lw200530当自定义名称为'时SetAdjustText有问题，所以暂时绕过
            // if (!!info.gameName && info.gameName.length != 0) {
            //     Patch.SetAdjustText(this.label_no, info.gameName);
            // } else {
            //     this.label_no.setString(info.gameName);
            // }
            this.label_no.setString(info.gameName);
            this.fid = info.fid;
            this.btn_detail.setEnabled(true)
            this.roomImg_bg.setVisible(!!(info.tid));
            if (!!info.tid) {
                this.roomID_label.setString(info.tid.toString());
            }
            //如果是只能模式下主桌
            if (info.ismain) {
                this.roomImg_bg.setVisible(false);
                this.btn_detail.setEnabled(false)
                this.mainTablelayout.setVisible(true)
                this.match_Label.string = `${info.matchIngnum}/${info.trule.playernum}`;
                this.fullTableNum.setString("" + info.fullNum);
                this.huxiAnilayout.setVisible(!!info.matchIngnum);
                this.match_label_left.setVisible(!!!info.matchIngnum);
                for (let s = 0; s < info.matchIngnum; s++) {
                    this.head_layouts[s].setVisible(true);
                    this.head_layouts[s].getChildByName("mainHead").setVisible(true);
                    let headImg = <cc.Sprite>this.head_layouts[x].getChildByName("clip").getChildByName("headImg");
                    headImg.setVisible(false);
                    (<cc.Label>ccui.helper.seekWidgetByName(this.head_layouts[s], "name")).setVisible(false);
                    this.head_layouts[s].getChildByName("online_img").setVisible(false);
                }
                return;
            }

            for (var x in this.head_layouts) {
                if (this._data.players[x]) {
                    this.head_layouts[x].setVisible(true);
                    let name = <cc.Label>ccui.helper.seekWidgetByName(this.head_layouts[x], "name");
                    name.setString("" + kaayou.Identify.nickNameSubSix(this._data.players[x].uname));
                    name.setVisible(true);
                    let headImg: cc.Sprite = null;
                    //headImg = this.getTableImageNode(this.head_layouts[x])
                    headImg = <cc.Sprite>this.head_layouts[x].getChildByName("clip").getChildByName("headImg");
                    let headUrl = this._data.players[x].uurl;
                    this.head_layouts[x].getChildByName("mainHead").setVisible(false);
                    //如果 开了混排 防作弊 在混楼  开了超级
                    let teaInfo: Data_HouseInfo = tea.mod.__teaHouseInfo
                    if (teaInfo.mix_active &&
                        teaInfo.house_table_join_type == 2 &&
                        teaInfo.isCurFloorMix && teaInfo.isaisuper &&
                        !(teaInfo.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY)) {//
                        this.roomImg_bg.setVisible(false);
                    }
                    //除开 管理员和圈主    安全盾牌匿名功能权重低于设置-群隐私中的隐藏大厅玩家头像 || (!teaInfo.ishidhide && !!info.hideimg && !info.begin) 
                    if (teaInfo.isheadhide && !(teaInfo.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY)) {
                        NetImage.doLoadHeadImageWithLayout(1, "", headImg, this.head_layouts[x].getContentSize(), function (res) { }, (url) => {
                            if (url !== headUrl) {
                                return false;
                            }
                            return true;
                        });
                        name.setString("匿名");
                    } else {
                        // this.roomImg_bg.setVisible(true);

                        NetImage.doLoadHeadImageWithLayout(1, headUrl || "", headImg, this.head_layouts[x].getContentSize(), function (res) { }, (url) => {
                            if (url !== headUrl) {
                                return false;
                            }
                            return true;
                        });
                    }
                    if (!info.begin) {
                        this.head_layouts[x].getChildByName("readyImg").setVisible(this._data.players[x].ready);
                    }
                    // 如果是圈主或者是管理员。。。能看到不在线的玩家
                    this.head_layouts[x].getChildByName("online_img").setVisible((tea.mod._isManager() || tea.mod._isMaster()) && !!!this._data.players[x].online);

                } else {
                    this.head_layouts[x].setVisible(false);
                }
            }

            //局数显示
            let step = 0;
            let total_round = 0;
            if (!!info.step) step = info.step;
            if (!!info.total_round) total_round = info.total_round;
            this.lbGameNO.setString(step.toString() + "/" + total_round.toString());

            //观战
            if (!info.watchericons) {
                for (let i = 0; i < 4; ++i) {
                    this.lyWatchers[i].setVisible(false);
                }
            } else {
                for (let i = 0; i < 4; ++i) {
                    if (info.watchericons[i] == undefined) {
                        this.lyWatchers[i].setVisible(false);
                    } else {
                        let headUrl = info.watchericons[i] || "";
                        let headImg = <cc.Sprite>this.lyWatchers[i].getChildByName("headImg");
                        NetImage.doLoadHeadImageWithLayout(1, headUrl || "", headImg, this.lyWatchers[i].getContentSize(), function (res) { }, (url) => {
                            if (url !== headUrl) {
                                return false;
                            }
                            return true;
                        });
                        this.lyWatchers[i].setVisible(true);
                    }
                }
            }

        }

        // getTableImageNode(headLayout: ccui.Layout) {
        //     let headImg = null;
        //     let clip = headLayout.getChildByTag(1000);
        //     if (!clip) {
        //         var sten = new cc.Sprite();
        //         sten.initWithFile("res/lobby/TeaHouse/TH_Table/table_imageHead_bg.png");
        //         //创建一个ClippingNode 并设置一些基础属性 容器宽高与模板有关
        //         var clipnode = new cc.ClippingNode();
        //         clipnode.attr({
        //             stencil: sten,
        //             anchorX: 0.5,
        //             anchorY: 0.5,
        //             alphaThreshold: 0.7,//设置裁剪透明值阀值 默认值为1 等于1時 alpha = 0的部分也被裁剪
        //         });
        //         clipnode.setCascadeOpacityEnabled(true);
        //         clipnode.setPosition(cc.p(0, 0));
        //         sten.setAnchorPoint(0, 0);
        //         clipnode.setTag(1000)
        //         headImg = new cc.Sprite();
        //         //headImg = headLayout.getChildByName();
        //         headImg.setVisible(false);
        //         headImg.setTag(1001);
        //         headImg.setAnchorPoint(0, 0)
        //         clipnode.addChild(headImg);

        //         headLayout.addChild(clipnode);
        //     }
        //     else {
        //         headImg = clip.getChildByTag(1001);
        //     }

        //     return headImg;
        // }

        initTableImageNode(headLayout: ccui.Layout) {
            var sten = new cc.Sprite();
            sten.initWithFile("res/lobby/TeaHouse/TH_Table/table_imageHead_bg.png");
            //创建一个ClippingNode 并设置一些基础属性 容器宽高与模板有关
            var clipnode = new cc.ClippingNode();
            clipnode.attr({
                stencil: sten,
                anchorX: 0.5,
                anchorY: 0.5,
                alphaThreshold: 0.7,//设置裁剪透明值阀值 默认值为1 等于1時 alpha = 0的部分也被裁剪
            });
            clipnode.setCascadeOpacityEnabled(true);
            clipnode.setPosition(cc.p(0, 0));
            sten.setAnchorPoint(0, 0);
            let headImg = new cc.Sprite();
            //headImg = headLayout.getChildByName();
            headImg.setVisible(false);
            headImg.setAnchorPoint(0, 0)
            headImg.setName("headImg");
            clipnode.addChild(headImg);
            clipnode.setName("clip");
            headLayout.addChild(clipnode);

            clipnode.setLocalZOrder(10);
            headLayout.getChildByName("online_img").setLocalZOrder(15);
            headLayout.getChildByName("readyImg").setLocalZOrder(14);
            this.onlineAction(headLayout);
        }

        initWatcherImageNode(headLayout: ccui.Layout) {
            var sten = new cc.Sprite();
            sten.initWithFile("res/lobby/TeaHouse/TH_Table/table_imageHead_bg.png");
            //创建一个ClippingNode 并设置一些基础属性 容器宽高与模板有关
            var clipnode = new cc.ClippingNode();
            clipnode.attr({
                stencil: sten,
                anchorX: 0.5,
                anchorY: 0.5,
                alphaThreshold: 0.7,//设置裁剪透明值阀值 默认值为1 等于1時 alpha = 0的部分也被裁剪
            });
            clipnode.setCascadeOpacityEnabled(true);
            clipnode.setPosition(cc.p(0, 0));
            sten.setAnchorPoint(0, 0);
            let headImg = new cc.Sprite();
            //headImg = headLayout.getChildByName();
            headImg.setVisible(false);
            headImg.setAnchorPoint(0, 0)
            headImg.setName("headImg");
            headLayout.addChild(headImg);
            // clipnode.addChild(headImg);
            // clipnode.setName("clip");
            // headLayout.addChild(clipnode);

            // clipnode.setLocalZOrder(10);
        }

        onlineAction(headLayout: ccui.Layout) {
            headLayout.getChildByName("online_img").stopAllActions();
            let fadein1 = cc.fadeIn(1)
            let fadeout1 = cc.fadeOut(1);
            headLayout.getChildByName("online_img").runAction(cc.repeatForever(cc.sequence(fadein1, fadeout1)));
        }


        //修改桌子的样式~~~~
        setType(type: number, fid: number) {
            if (!tea.mod.__teaHouseInfo
                || (tea.mod.__teaHouseInfo && lodash.isEmpty(tea.mod.__teaHouseInfo.floorsMap))
                || !!!tea.mod.__teaHouseInfo.floorsMap[fid]
                || type < 2
                || type > 5) {
                kaayou.emit("common", "ui::Toast::Show", { msg: "正在获取大厅桌子信息，请稍等。" });
                return;
            }
            let tableBgType = tea.mod.__teaHouseTableType;
            let FloorMap = tea.mod.__teaHouseInfo.floorsMap
            let level = 0;
            let v: Data_HosueFloorInfo = FloorMap[fid];
            level = v.floorItem.is_mix ? (v.level % 10) : 1;   //不是混排的颜色，给绿色

            //let bgStr = cc.sys.localStorage.getItem(lobby.mod.User.getInstance().getUserInfo().uid + "teaBgInfo" + tea.mod.__teaHouseInfo.hid);
            if (v.floorItem.is_mix && v.level >= 0 && v.level <= 19) {
                level = Number(tea.mod.__teaHouseInfo.floors_color[v.level]);
            }


            let bgname = "tablet" + type + "_" + tableBgType[level] + ".png";
            if (!!!cc.spriteFrameCache.getSpriteFrame(bgname)) {                            //还是要防止资源消失~~~
                cc.spriteFrameCache.addSpriteFrames(tea.res.tableStylePlist);
            }
            this.tableDetailbtn_Bg.loadTexture("tableDetailBg_" + tableBgType[level] + ".png", ccui.Widget.PLIST_TEXTURE);
            this.roomTableBg.loadTexture(bgname, ccui.Widget.PLIST_TEXTURE);
            for (var x in this.head_layouts) {
                this.head_layouts[x].setPosition(this.posMap[type][x]);
            }
        }
    }

    export class TableListPanel extends common.TableListPanel {
        ivNoRuleMember: ccui.ImageView;
        img_mgrtag: ccui.ImageView;
        btn_mgrgame: ccui.Button;
        initTableListView() {
            this.ivNoRuleMember = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoRuleMember");
            this.img_mgrtag = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_mgrtag");
            this.btn_mgrgame = <ccui.Button>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_mgrgame");

            this._cuttingSV = new common.CuttingScrollView();
            let sv = <ccui.ScrollView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tabaleListScrollView");
            // this._cuttingSV.setMaxCount(tea.mod.__teaHouseInfo.hmaxtable);
            sv.setScrollBarEnabled(false);
            this._cuttingSV.setMaxCount(20);
            this._cuttingSV.initUI(sv, tea.TableCell);
            this._cuttingSV.setPadding({ top: 0, bottom: 0, left: 100, right: 240, spacingX: 50, spacingY: 0 });
            this._cuttingSV.setGridRow(2);
            this._cellClass = tea.TableCell;
            this._cuttingSV.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this._cuttingSV.initTables();
            this._cuttingSV.on("Cutting_Scroll_Change", this.onCuttingScrollChange, this);
            this.btn_mgrgame.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::TeaHouse::DoShowCreate", {});
            }, this);
        }

        @doBindEvent
        initUI() {
            super.initUI();
        }

        initWithccs(path: string = '') {
            if (!lodash.isString(path) || lodash.isEmpty(path)) {
                path = tea.res.Table_Block_json;
            }
            super.initWithccs(path);
        }

        @BindEvent('tea', 'ui::TeaHouse::UpdateMaxTable')
        dosetMacCount(data: { num: number, isClear: boolean }) {
            if (data.num == this._maxcellCount) {
                return;
            }
            this.changeMaxTable(data.num, data.isClear);
        }

        @BindEvent("tea", "ui::Floor::Update")
        onFloorUpdate(data: { hasrole: boolean, data: FloorUpdateInfo }) {
            let hasRule = !!data.data;
            this.img_mgrtag.setVisible(data.hasrole && !hasRule);
            this.btn_mgrgame.setVisible(data.hasrole && !hasRule);
            this.ivNoRuleMember.setVisible(!data.hasrole && !hasRule);
            this._cuttingSV.setVisible(hasRule);
        }

        onCuttingScrollChange(e: kaayou.CustomEvent) {
            if (!e.data) { return; }
            console.log("lastindex", e.data.min, e.data.max);
            kaayou.emit("tea", 'mod::Table::GetUpdateList');
        }
        @BindEvent('tea', "ui::Table::UpdateList")
        onTabelUpdate1(data: any[]) {
            if (!data || !lodash.isArray(data)) {
                kaayou.emit("common", "ui::Toast::Show", { msg: "正在获取大厅桌子信息，请稍等。" });
                return;
            }
            // if(data==undefined) return;
            //lw190719可以减到0桌
            //if(data.length<1) return;  
            let self = this;
            let tables = this._cuttingSV.getCells();
            lodash.forEach(tables, function (v: TableCell) {
                let index = v.getIndex();
                // console.log(lodash.eq(v._data,data[index]));
                v.setInfo(data[index] || null);
                if (data && data[index] && data[index].trule && data[index].trule.playernum) {
                    v.setType(data[index].trule.playernum, data[index].fid);
                    v.setVisible(true);
                } else {
                    v.setVisible(false);
                }
            });
        }
    }
}