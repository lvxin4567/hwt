namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_TimeMatchPmMgr {
        static __INS__: tea_TimeMatchPmMgr = null;
        static getInstance(zOrder) {
            if (tea_TimeMatchPmMgr.__INS__ == null) {
                tea_TimeMatchPmMgr.__INS__ = new tea_TimeMatchPmMgr();
                tea_TimeMatchPmMgr.__INS__.init();
                tea_TimeMatchPmMgr.__INS__._zOrder = zOrder;
            }
            return tea_TimeMatchPmMgr.__INS__;
        }
        _zOrder = 0;
        __selfPanel: TimeMatchPmPanel = null;
        _data: tea.Data_HouseInfo = null;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
                if (!e.data) {
                    return;
                }
                self._data = e.data;
                self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo(e.data);
            }, this, 10);


            kaayou.getController('tea').on('ui::TimeMatchPm::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::TimeMatchPm::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);
            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new TimeMatchPmPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class TimeMatchPmPanel extends kaayou.ModelLayer {
        label_member_count: ccui.Text = null;
        pnlPartner: ccui.Layout = null;
        tea_call_partner_mode: ccui.Layout = null;
        
        lbNeedApprove:ccui.Text=null;
        lbPartnerCanApprove:ccui.Text=null;
        memPlay_count_label:ccui.Text = null;
        // curIndex:number = 0;
        constructor() {
            super();
            this.initUI();
        }
        topbarMgr: lobby.TopBarMgr = null;
        searchMgr: MemSearchWidget = null;
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.TH_TimeMatchPmPanel);
            this.lbNeedApprove=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "teaActMember");
            this.lbPartnerCanApprove=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "partnerActMember");
            this.topbarMgr = new lobby.TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
            this.topbarMgr.setTitle('时段赛排名');
            this.topbarMgr.setOnCloseClick(function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }.bind(this));
            

            this.initLeftMenu();
            this.initRightPages();

            
            let historyNode:cc.Node =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_history_panel");
            tea_PropotionHistoryPanelMgr.getInstance().setNode(historyNode);

            this.Hide();
        }

        private isCreator(){
            let data: tea.Data_HouseInfo = tea.mod.__teaHouseInfo;
            if (!data || data.hid == 0) {
                return false;
            }
            return data.urole == HouseMemberRole.OWNER
        }

        private isAdmin(){
            let data: tea.Data_HouseInfo = tea.mod.__teaHouseInfo;
            if (!data || data.hid == 0) {
                return false;
            }
            return data.urole === HouseMemberRole.ADMIN
        }

        private isPartener(){
 
            let data: tea.Data_HouseInfo = tea.mod.__teaHouseInfo;
            if (!data || data.hid == 0) {
                return ;
            }
            return data.ispartner;
        }

        private isVitaAdmin(data: tea.Data_HouseInfo){
            return  data.vitamin_admin;
        }
        
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo) {

            if(data.urole==HouseMemberRole.MEMBER){
                this.Hide();
            }else if(this.isPartener()){
                this.showPageIndex = 1
            }
            (<ccui.CheckBox>this.pmMenuGroup.getChildren()[0]).setVisible((this.isCreator())||tea.mod.__teaHouseInfo.vitamin_admin||this.isAdmin());
            (<ccui.CheckBox>this.pmMenuGroup.getChildren()[1]).setVisible((this.isCreator())||(this.isPartener())||tea.mod.__teaHouseInfo.vitamin_admin);
            this.pmMenuGroup.doChildrenLayout();
        }

        showPageIndex: number = 0;   
        pmMenuGroup: ccui.ScrollView = null;
        initLeftMenu() {
            let self = this;
            //初始化左侧菜单
            this.pmMenuGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mem_menu_layout");
            this.pmMenuGroup.setPadding({ top: 40, spacingY: 10, left: 3 });
            this.pmMenuGroup.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.pmMenuGroup.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.pmMenuGroup.setScrollBarEnabled(false);

            lodash.forEach(this.pmMenuGroup.getChildren(), function (v: ccui.CheckBox , i) {
                let selfIndex = i;
                let vself = v;
                kaayou.getController('teaMem').on('ui::TimeMatchPmPanel::SubpageChange',  function (e: kaayou.Event) {
                    let { index } = e.data;
                    if (selfIndex == index) {
                        v.setSelected(true);
                        (<ccui.ImageView>vself.getChildByName("ON")).setVisible(true);
                        (<ccui.ImageView>vself.getChildByName("OFF")).setVisible(false);
                        //self.searchMgr.setSearchVisible(true);   先隐藏搜索
                        
                    } else {
                        v.setSelected(false);
                        (<ccui.ImageView>vself.getChildByName("ON")).setVisible(false);
                        (<ccui.ImageView>vself.getChildByName("OFF")).setVisible(true);
                    }
                }, v);

                v.on(kaayou.CheckEvent.SELECTED, (e: kaayou.TouchEvent) => {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    self.showPageIndex = selfIndex;
                    kaayou.emit('teaMem', 'ui::TimeMatchPmPanel::SubpageChange', { index:selfIndex })
                }, this);

                v.on(kaayou.CheckEvent.UNSELECTED, (e: kaayou.TouchEvent) => {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    kaayou.emit('teaMem', 'ui::TimeMatchPmPanel::SubpageChange', { index:selfIndex })
                }, this);
                
            })
            this.pmMenuGroup.doChildrenLayout();
        }

        
        pmMtach_item: ccui.Layout= null;
        //rowMyConfig:ccui.Layout=null;
        initRightPages() {
            this.pmMtach_item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "timeMatch_item");
    
            this.pmMtach_item.setVisible(false);

            this.searchMgr = new MemSearchWidget();
            this.searchMgr.initWidthNode(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "search_layout"), function () {
                kaayou.emit("teaMem","ui::TimeMatchPmPanel::Search");
            });

            //初始化右侧page页
            let pages = (<ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rightPageGroup")).getChildren();

            (new Pm_subMemberPanel()).setIndex(0).initWithNode(pages[0], this.searchMgr, this.pmMtach_item);
            (new Pm_subTeamPanel()).setIndex(1).initWithNode(pages[1], this.searchMgr, this.pmMtach_item);
            
        }

        private reset(){
            let pages = (<ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rightPageGroup")).getChildren();
            pages.forEach(v=>{
                v.setVisible(false);
            })
        }

        Show() {
            this.searchMgr.clearString();
            this.setVisible(true);
            let self = this;
            kaayou.pop.ShowMainAnim({
                tNode: ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"),
                bNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName('maskbg'),
                action:function(){
                    self.reset();
                    self.showPageIndex = 0;
                    self.onTeaHouseUpdateInfo(tea.mod.__teaHouseInfo)
                    kaayou.emit('teaMem', 'ui::TimeMatchPmPanel::SubpageChange', { index:self.showPageIndex })
                    // kaayou.emit('teaMem', 'ui::PropotionPanel::SubpageChange', { index:0 })
                    
                }
            });
        }

        Hide() {
            this.setVisible(false);
            kaayou.emit('teaMem', 'ui::PropotionPanel::SubpageChange', { index: -1 })
        }
    }
}