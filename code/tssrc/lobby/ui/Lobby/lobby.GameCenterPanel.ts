namespace lobby {
    const { doBindEvent, BindEvent } = kaayou._decorator;

    export class GameCell extends kaayou.Block {
        constructor() {
            super();
        }
        game_key: string = "";
        txt_gameName: ccui.Text = null;
        img_gameIconBg: ccui.Layout = null;
        img_head: cc.Sprite = null;

        initWithNode(node: ccui.Widget, callback) {
            let self = this;
            super.initWithNode(node);
            this.txt_gameName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "txt_gameName");
            this.img_gameIconBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Panel_iconBg");
            this.img_head = new cc.Sprite();
            this.img_gameIconBg.addChild(this.img_head);

            let clickBg: ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "clickPanel");
            clickBg.on(kaayou.TouchEvent.TouchEnd, function () {

                if (!!callback) {
                    callback(self.game_key);
                    return;
                }
                else {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    kaayou.emit('lobby', "ui::Loading::Show", { msg: "正在检查游戏资源", noAni: true });

                    kaayou.emit("lobby", "mod::Package::GameListAndRule", {
                        key: this.game_key,
                        call: function (list: Array<{ kindId: number, name: string, rule: string, ruleVersion: number }>) {
                            kaayou.emit('lobby', 'ui::CreateRoom::Show', {
                                list: list,
                                call: function (data: { kindid: number, configData: any }) {
                                    console.log(data);
                                    kaayou.emit("lobby", "mod::RCGame::CreaterRoom", data);
                                }
                            });
                        }
                    });
                }
            }, this);

        }

        setGame(key, gameName, index, icon) {
            let self = this;
            if (index > -1) {
                self.game_key = key;
                self.txt_gameName.setString(gameName);
                let localicon = lobby.GameIcons[key];
                if (localicon) {
                    this.img_head.initWithFile(localicon);
                    NetImage.doSpriteContentSizeAndPosition(this.img_head, this.img_gameIconBg.getContentSize());
                } else {
                    NetImage.doLoadHeadImageWithLayout(0, icon || "", this.img_head, this.img_gameIconBg.getContentSize(), function () { });
                }
            }
        }

        unuse() {
            this.removeFromParent();
        }
    }

    export class GameCenterMgr {
        static __INS__: GameCenterMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (GameCenterMgr.__INS__ == null) {
                GameCenterMgr.__INS__ = new GameCenterMgr();
                GameCenterMgr.__INS__.init();
                GameCenterMgr.__INS__._zOrder = _zOrder;
            }
            return GameCenterMgr.__INS__;
        }
        __selfPanel: GameCenter = null;
        public _zOrder = 0;
        init() {
            let self = this;

            kaayou.getController('lobby').on('ui::GameCenter::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('lobby').on('ui::GameCenter::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);
            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new GameCenter();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder)
            }
            return this.__selfPanel;
        }
    }

    const gameType = {
        area:5,
        all : 0,
        hp:1,
        zp:2,
        pk:3,
        mj:4,
    }



    export class GameCenter extends kaayou.Layer {
        constructor() {
            super();
            this.initWithccs(lobby.res.GameCenterPanel_json, true);
            this.initUI();
        }

        game_mode: ccui.Layout = null;
        game_all: ccui.ScrollView = null;
        topbarMgr: lobby.TopBarMgr = null;
        leftMenu: ccui.Layout = null;
        edit_searchRed: any = null;
        search_btn: ccui.Button = null;
        gc_NoGame: ccui.ImageView = null;
        cancel_btn:ccui.Button = null;
        initUI() {
            let self = this;
            let ctrName = "lobbyRC"
            let subpageChangeEventName = "ui::record::SubpageChange";
            this.topbarMgr = new TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
            this.topbarMgr.setTitle("游戏中心");
            this.topbarMgr.setOnCloseClick(function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }.bind(this));
            this.gc_NoGame = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Gc_NoGameBg");
            this.game_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "game_mode");
            this.game_all = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "game_all");
            this.search_btn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "search_btn");
            this.search_btn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                console.log(self.edit_searchRed.getString());
                if (self.edit_searchRed.getString().length == 0) {
                    kaayou.emit('common', "ui::Toast::Show", { msg: "请输入搜索关键字！" });
                    return;
                }
                self.search_btn.setVisible(false);
                self.cancel_btn.setVisible(true);
                self.onGetGameCenterList(self.gameIndex);
            }, this);

            this.cancel_btn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cancle_btn");
            this.cancel_btn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                console.log(self.edit_searchRed.getString());
                //self.onGetGameCenterList(self.gameIndex);
                self.search_btn.setVisible(true);
                self.cancel_btn.setVisible(false);
                self.edit_searchRed.setString("");
                //kaayou.emit(ctrName, subpageChangeEventName, { index: 0 });
                // self.onGetGameCenterList(0)
                self.onGetGameCenterList(self.gameIndex);
            }, this);

            let attr = {
                "fontSize": 28,
                "fontColor": "#C1E2FF",
                "setInputMode": 6,
                "setMaxLength": 20,
                "setPlaceholderFontSize": 28,
            };
            this.edit_searchRed = kaayou.editBox.attachTextEdit(this.node, "lobbyRecordsearch_edit", "", null, attr);

            this.game_all.setPadding({ spacingX: 20, spacingY: 4 });
            this.game_all.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
            this.game_all.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.game_all.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.game_all.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
            this.game_all.setGridColumn(4);
            this.initLeftMenu();
            this.Hide();
        }

      
        initLeftMenu() {
            let self = this;
            let ctrName = "lobbyRC"
            let subpageChangeEventName = "ui::record::SubpageChange";

            //初始化左侧菜单
            this.leftMenu = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "left");
            this.leftMenu.setPadding({  top: 30, spacingY: 10 });
            this.leftMenu.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.leftMenu.setVertical(ccui.Layout.LayoutVertical.TOP);
            //this.leftMenu.setScrollBarEnabled(false);


            lodash.forEach(this.leftMenu.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = gameType[v.name];
                v.on(kaayou.CheckEvent.SELECTED, (e: kaayou.TouchEvent) => {
                    let target = e.target;
                    let { index } = target;
                    console.log(index);
                    kaayou.emit(ctrName, subpageChangeEventName, { index })
                    self.onGetGameCenterList(index)



                }, this);
                v.on(kaayou.CheckEvent.UNSELECTED, (e: kaayou.TouchEvent) => {
                    let target = e.target;
                    let { index } = target;
                    kaayou.emit(ctrName, subpageChangeEventName, { index })
                }, this);
                v['onSubpageChange'] = function (e: kaayou.Event) {
                    let _data = e.data;
                    let { index } = _data;
                    let areaName = common.mod.ChineseMap.getInstance().getName(lobby.mod.User.getInstance().getUserInfo().area);
                    if (this.index == index) {
                        //self._pageIndex = index;
                        this.setSelected(true);
                        if (this.index == 5) {
                                
                            (<ccui.Text>this.getChildByName("Text")).setString(areaName+"游戏");
                            (<ccui.Text>this.getChildByName("Text")).setTextColor(cc.color("#975638"));
                            (<ccui.ImageView>this.getChildByName("ON")).setVisible(false);
                            (<ccui.ImageView>this.getChildByName("OFF")).setVisible(false);
                        } else {
                            (<ccui.ImageView>this.getChildByName("ON")).setVisible(true);
                            (<ccui.ImageView>this.getChildByName("OFF")).setVisible(false);
                        }
                   
                    } else {
                        this.setSelected(false);
                        if (this.index == 5) {
                            (<ccui.Text>this.getChildByName("Text")).setString(areaName+"游戏");
                            (<ccui.ImageView>this.getChildByName("ON")).setVisible(false);
                            (<ccui.ImageView>this.getChildByName("OFF")).setVisible(false);
                            (<ccui.Text>this.getChildByName("Text")).setTextColor(cc.color("#3967b2"));
                        } else {
                        (<ccui.ImageView>this.getChildByName("ON")).setVisible(false);
                        (<ccui.ImageView>this.getChildByName("OFF")).setVisible(true);
                    }
                    }
                }
                kaayou.getController(ctrName).on(subpageChangeEventName, v['onSubpageChange'], v);
            })
            this.leftMenu.doChildrenLayout();
        }



        private createCell(): GameCell {
            let cell = kaayou.pool.getFromPool(GameCell);
            if (!cell) {
                cell = new GameCell();
            }
            cell.initWithNode(this.game_mode);
            return cell;
        }
        gameIndex:number = 0;
        private onGetGameCenterList(index: number) {
            let self = this;
            self.gameIndex = index;
            this.game_all.removeAllChildren();

            kaayou.emit('lobby', "mod::Package::Search", {
                code: self.gameIndex == 5? lobby.mod.User.getInstance().getUserInfo().area: "", keyword: self.edit_searchRed.getString(), type: 0, package_type: self.gameIndex==5?0:self.gameIndex, call: function (r) {
                    let res =self.orderByAreaFirst(r);
                    
                    self.gc_NoGame.setVisible(lodash.isEmpty(res));
                    for (let i = 0; i < res.length; ++i) {
                        let key = res[i].package_key;
                        let index = lobby.mod.Package.getInstance().getPackageIndex(key);
                        if (index > -1) {
                            let cell = self.createCell();
                            cell.setGame(key, res[i].package_name, index, res[i].icon);
                            self.game_all.addChild(cell);
                        }
                    }
                    self.game_all.doChildrenLayout();
                }
            });
        }


        private orderByAreaFirst(list){
            
            let user = kaayou.DataSet.get('user::info')
                user = JSON.parse(user);
            let area = user.area;
            let out = list.slice(0);

            let head = 0,tail = list.length;

            if(tail<2)
                return list;

            while(--tail){

                if(head === tail)
                    break;
                
                if(out[head].city == area)
                    head++;
                
                if(out[tail].city == area){
                    let  temp = out[head];
                    out[head] = out[tail]
                    out[tail]  = temp;
                    head++;
                }
                
            }
            return out;
        }

        // @BindEvent("lobby", 'ui::GameCenter::Show')
        async Show() {
            let self = this;
            let ctrName = "lobbyRC"
            let subpageChangeEventName = "ui::record::SubpageChange";
            this.edit_searchRed.setString("");
            kaayou.pool.putAllChildrenInPool(this.game_all);
            this.setVisible(true);
            kaayou.pop.ShowMainAnim({
                tNode: ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"),
                bNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName('maskbg'),
                action: function () {
                    kaayou.emit(ctrName, subpageChangeEventName, { index: 5 });
                    self.onGetGameCenterList(5)
                },
            });
        }


        // @BindEvent("lobby", 'ui::GameCenter::Hide')
        Hide() {
            this.search_btn.setVisible(true);
            this.cancel_btn.setVisible(false);
            this.game_all.removeAllChildren();
            this.setVisible(false);
        }
    }
}