
//时段筛选面板
namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;

    export class TimeFliterPanelMgr {
        static __INS__: TimeFliterPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (TimeFliterPanelMgr.__INS__ == null) {
                TimeFliterPanelMgr.__INS__ = new TimeFliterPanelMgr();
                TimeFliterPanelMgr.__INS__.init();
                TimeFliterPanelMgr.__INS__._zOrder = _zOrder;
            }
            return TimeFliterPanelMgr.__INS__;
        }
        __selfPanel: TimeFliterPanel = null;
        public _gold = 0;
        public _zOrder = 0;
        onUpdateUserInfo(data: Data_Uerinfo) {
            this._gold = data.gold;
        }

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::TimeFliterPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::TimeFliterPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new TimeFliterPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder)
            }
            return this.__selfPanel;
        }

    }

    export class TimeFliterPanel extends kaayou.ModelLayer {
        arrBorder: Array<ccui.ImageView> = null;
        arrRadio: Array<ccui.Layout> = null;
        arrTypeRadio: Array<ccui.Layout> = null;
        lscArr:Array<ccui.Layout>;
        btnOK: ccui.Button = null;
        cb1: ccui.CheckBox = null;
        cb2: ccui.CheckBox = null;
        cb3: ccui.CheckBox = null;
        iLike: number = 0;
        iType: number=0;
        iTime: number = -1;
        iLowScore:number = 0;
        lbHour: ccui.TextField = null;
        ly1: ccui.Layout = null;
        ly2: ccui.Layout = null;
        ly3: ccui.Layout = null;
        lyInnerBg: ccui.Layout = null;
        lyLike: ccui.Layout = null;
        lyGameType: ccui.Layout = null;
        lyg1: ccui.Layout = null;
        lyg2: ccui.Layout = null;
        lyg3: ccui.Layout = null;
        lyg4: ccui.Layout = null;
        prfButton: ccui.Button = null;
        svTime: ccui.ScrollView = null;
        mask: ccui.Layout = null;
        lyLowScore: ccui.Layout = null;
        lscRadio: common.RadioGroup;
        

        constructor() {
            super();
            this.initWithccs(tea.res.TH_TimeFliterPanel_json);
            this.initUI();
        }

        initUI() {
            this.isTouchMaskHide = false;
            let self = this;
            
            this.lyLike = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lyLike");
            this.ly1 = ccui.helper.seekWidgetByName(<ccui.Widget>this.lyLike, "btn_0");
            this.ly2 = ccui.helper.seekWidgetByName(<ccui.Widget>this.lyLike, "btn_1");
            this.ly3 = ccui.helper.seekWidgetByName(<ccui.Widget>this.lyLike, "btn_2");
            this.arrRadio = [this.ly1, this.ly2, this.ly3];

            this.lyGameType = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lyGameType");
            this.lyg1 = ccui.helper.seekWidgetByName(<ccui.Widget>this.lyGameType, "btn_0");
            this.lyg2 = ccui.helper.seekWidgetByName(<ccui.Widget>this.lyGameType, "btn_1");
            this.lyg3 = ccui.helper.seekWidgetByName(<ccui.Widget>this.lyGameType, "btn_2");
            this.lyg4 = ccui.helper.seekWidgetByName(<ccui.Widget>this.lyGameType, "btn_3");
            this.arrTypeRadio = [this.lyg1,this.lyg2,this.lyg3,this.lyg4];

            this.lyInnerBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lyInnerBg");
            this.lyInnerBg.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.lyInnerBg.setPadding({ top: 20, spacingY: 8 });
            
            for (let i = 0; i < this.arrRadio.length; ++i) {
                this.arrRadio[i]['index'] = i;
                this.arrRadio[i].on(kaayou.TouchEvent.TouchEnd, self.onRadioTouched, self);
            }

            for (let i = 0; i < this.arrTypeRadio.length; ++i) {
                this.arrTypeRadio[i]['index'] = i;
                this.arrTypeRadio[i].on(kaayou.TouchEvent.TouchEnd, self.onTypeRadioTouched, self);
            }

            this.lscRadio =  new common.RadioGroup(); 
            this.lyLowScore = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lyLowScore");
            this.lscArr =  <Array<ccui.Layout>>this.lyLowScore.getChildren().slice(1);
            this.lscArr.forEach((v:ccui.Layout,i)=>{
                v["index"] = i;
                v.on(kaayou.TouchEvent.TouchEnd,this.onLowLowScoreSelect,self)
                let cb: ccui.CheckBox = <ccui.CheckBox>v.getChildByName("CheckBox");
                this.lscRadio.add(cb);
            })

            this.lbHour = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbHour");
            this.svTime = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "svTime");
            this.svTime.setScrollBarEnabled(false);
            this.svTime.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
            this.svTime.setPadding({ left: 20, right: 20, top: 10, bottom: 10, spacingX: 20, spacingY: 20 });
            this.svTime.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.svTime.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.svTime.setGridColumn(2);
            this.prfButton = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnTime");
            this.btnOK = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnOK");
            this.btnOK.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.setLowscore(self.iLowScore);
                kaayou.emit("tea", "ui::TimeFliter::Submit", { iTime: this.iTime, iLike: this.iLike , iLowScore:this.iLowScore,iType:this.iType });
                this.Hide();
            }, this);

            this.mask = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.mask.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                kaayou.emit("tea", "ui::TimeFliterPanel::Hide");
            }, this);

            this.setVisible(false);
        }

        onTypeRadioTouched(e: kaayou.TouchEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let index = e.target['index'];
            this.setCurTypeSelect(index)
        }

        private setLowscore(i:number){
            let hid = tea.mod.__teaHouseInfo.hid;
            let inf:any =  cc.sys.localStorage.getItem("tea::store::lowscorefilter") || "{}"
                inf = JSON.parse(inf);
                inf[hid] = i;

                cc.sys.localStorage.setItem("tea::store::lowscorefilter",JSON.stringify(inf));
        }

        onRadioTouched(e: kaayou.TouchEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let index = e.target['index'];
            this.setCurSelect(index);
        }

        onButtonTimeClicked(e: kaayou.TouchEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let index = e.target['index'];
            this.setTimeSelect(index);
        }

        setCurTypeSelect(index:number){
            
            if (index < 0 || index >= this.arrTypeRadio.length) { index = 0; }
            this.iType = index;
            for (let i = 0; i < this.arrTypeRadio.length; ++i) {
                let ly = this.arrTypeRadio[i];
                let cb = <ccui.ImageView>ly.getChildByName("Border")
                cb.setVisible(i==index)
            }
        }

        setCurSelect(index: number) {
            if (index < 0 || index >= this.arrRadio.length) { index = 0; }
            this.iLike = index;
            for (let i = 0; i < this.arrRadio.length; ++i) {
                let ly = this.arrRadio[i];
                let cb = <ccui.ImageView>ly.getChildByName("Border")
                cb.setVisible(i==index)
            }
        }

        onLowLowScoreSelect(e: kaayou.TouchEvent){
            let s = e.target;
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            this.setLowScoreSelect(s["index"]);
        }
        
        setLowScoreSelect(i:number){
            this.iLowScore = i;
            this.lscArr.forEach((v,ii)=>{
                let cb: ccui.CheckBox = <ccui.CheckBox>v.getChildByName("CheckBox")
                let lb = <ccui.Text>v.getChildByName("Text");
                if(ii===i){
                    cb.setSelected(true);
                    lb.setTextColor(cc.color("#FFF3C1"));
                } else {
                    cb.setSelected(false);
                    lb.setTextColor(cc.color("#96BCE2"));
                }

            });

        }

        setTimeSelect(index: number) {
            if (index < 0 || index >= this.arrBorder.length) { index = 0; }
            this.iTime = index;
            for (let i = 0; i < this.arrBorder.length; ++i) {
                this.arrBorder[i].setVisible(i == index);
            }
        }



        addButton() {
            let self = this;
            let arr = kaayou.TimeHelper.arrTime;
            this.svTime.removeAllChildren();
            this.arrBorder = [];
            if (this.iTime == -1) {
                let now = new Date();
                let h = now.getHours();
                let s = kaayou.TimeHelper.getTimesByHour(h);
                this.iTime = kaayou.TimeHelper.getIndexByString(s);
            }
            for (let i = 0; i < arr.length; ++i) {
                let btn = <ccui.Button>this.prfButton.clone();
                let lb: ccui.TextField = <ccui.TextField>btn.getChildByName("Text");
                lb.setString(arr[i]);
                let iv: ccui.ImageView = <ccui.ImageView>btn.getChildByName("Border");
                this.arrBorder.push(iv);
                if (i == this.iTime) {
                    this.setTimeSelect(i);
                }
                btn['index'] = i;
                btn.on(kaayou.TouchEvent.TouchEnd, self.onButtonTimeClicked, self);
                this.svTime.addChild(btn);
            }
            for (let i = 0; i < arr.length; ++i) {
                if (i == this.iTime) {
                    this.setTimeSelect(i);
                }
            }
            this.svTime.doChildrenLayout();
        }

        bindEvent() { }

        Show(data: { index: number, showLike: boolean, likeIndex: number,showLowScore:boolean,lowScoreIndex:number,showTimeSort:boolean,showSortType:boolean }) {
            this.iTime = data.index;
            this.iLike = data.likeIndex;
            this.setLowScoreSelect(data.lowScoreIndex);
            this.lyLike.setVisible(data.showLike);
            this.svTime.setVisible(data.showTimeSort);
            this.lbHour.setVisible(data.showTimeSort);
            this.lyGameType.setVisible(data.showSortType);
            this.lyLowScore.setVisible(data.showLowScore && (/5|8/.test( tea.mod.__teaHouseInfo.urole.toString())));
            if(data.showTimeSort){
                let label = <ccui.Text>this.lyLowScore.getChildByName("Radio2").getChildByName("Text")
                label.setString(tea.mod.__teaHouseInfo.urole===5?"按自己设置":"按队长设置");
            }

            this.setCurSelect(this.iLike);
            if(data.showSortType)
                this.setCurTypeSelect(this.iType||0)
            else
                this.setCurTypeSelect(0);
            let h = mod.__teaHouseInfo.record_time_interval;
            if (h == 0) h = 24;
            let s = h + "小时筛选";
            if (mod.__teaHouseInfo.urole == HouseMemberRole.OWNER) {
                s += "（可在设置 - 时段筛选中调整时段）"
            }
            this.lbHour.setString(s);
            this.addButton();
            this.lyInnerBg.doChildrenLayout();

            this.setPositionX(2500);
            let x = (cc.winSize.width - this.node.getChildByName("contentPanel").getContentSize().width) / 2;
            let action = cc.moveTo(0.4, x, this.getPositionY());
            this.setVisible(true);
            this.runAction(action);
        }

        Hide() {
            let x = 2500;
            let action = cc.moveTo(0.4, x, this.getPositionY());
            this.runAction(action);
        }
    }
}