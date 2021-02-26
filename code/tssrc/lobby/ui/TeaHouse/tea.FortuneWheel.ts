namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_FortuneWheelMgr {
        static __INS__: tea_FortuneWheelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_FortuneWheelMgr.__INS__ == null) {
                tea_FortuneWheelMgr.__INS__ = new tea_FortuneWheelMgr();
                tea_FortuneWheelMgr.__INS__.init();
                tea_FortuneWheelMgr.__INS__._zOrder = _zOrder;
            }
            return tea_FortuneWheelMgr.__INS__;
        }
        _zOrder: number = 0
        __selfPanel: FortuneWheel = null;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::FortuneWheel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::FortuneWheel::Hide', function (e: kaayou.Event) {
                self.getPanel(true).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new FortuneWheel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    class FortuneWheelRecordItem {

        constructor(node: ccui.Widget) {
            this.initUI(node)
        }
        txt_record_info: ccui.Text = null;
        initUI(node: ccui.Widget) {
            this.initWithNode(node);
            this.txt_record_info = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "txt_record_info");
        }

        setInfo(data: Data_ActivityUserModel) {

            this.txt_record_info.setString(`抽奖时间:${new Date(data.created_time * 1000).format("yyyy-MM-dd hh:mm")}  ${this.rank(data.rank.toString())}`)
        }

        node: cc.Node
        initWithNode(node: ccui.Widget) {
            this.node = node.clone();
            this.node.setVisible(true);
            this.node.setPosition(0, 0);
            this.node.setAnchorPoint(0, 0);
            ccui.helper.doLayout(this.node);
        }

        rank(r) {
            switch (r) {
                case "1":
                    return "一等奖"
                case "2":
                    return "二等奖"
                case "3":
                    return "三等奖"
                case "4":
                    return "四等奖"
                case "5":
                    return "五等奖"
                case "6":
                    return "六等奖"
                case "7":
                    return "七等奖"
                case "8":
                    return "八等奖"
                default:
                    return "未中奖"

            }
        }

    }

    enum FortuneWheelStatus {
        NOTSTART,
        START,
        END,
        NOTVAILD
    }

    export class FortuneWheel extends kaayou.ModelLayer {


        constructor() {
            super();
            this.initUI();
        }
        btnClose: ccui.Button = null;
        btn_start: ccui.Button = null;
        wheel_light: ccui.Layout = null;
        txt_time_start: ccui.Text = null;
        txt_time_end: ccui.Text = null;
        txt_coin_count: ccui.Text = null;
        txt_game_count: ccui.Text = null;
        txt_game_coin: ccui.Text = null;
        record_list: ccui.ScrollView = null;
        record_item: ccui.Layout = null;
        tab_btn1: ccui.ImageView = null;
        tab_btn2: ccui.ImageView = null;
        cursor: ccui.ImageView = null;
        panel1: ccui.Layout = null;
        panel2: ccui.Layout = null;
        btn_start_dis: ccui.Button;
        linerAnimate = null;
        _task: any[];
        _rank: number;
        private rewardAngle = { none: 280, "1": 320, "2": 360, "3": 40, "4": 80, "5": 120, "6": 160, "7": 200, "8": 240 }
        startTime: number
        endTime: number;
        lockTime: number;
        initUI() {
            this.initWithccs(tea.res.TH_FortuneWheel);
            //关闭按钮
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.wheel_light = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "wheel_light");
            this.tab_btn1 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tab_btn1");
            this.tab_btn2 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tab_btn2");
            this.txt_time_start = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "txt_time_start");
            this.txt_time_end = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "txt_time_end");
            this.txt_coin_count = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "txt_coin_count");
            this.txt_game_count = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "txt_game_count");
            this.record_list = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "record");
            this.record_item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "record_item");
            this.cursor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cursor");
            this.btn_start = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_start");
            this.btn_start_dis = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_start_disable");
            this.panel1 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "panel1");
            this.panel2 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "panel2");
            this.txt_game_coin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "txt_game_coin");

            this.scheduleUpdate();


            this.btnClose.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.emit("tea", 'mod::TeaHouse::GetActList');
                this.Hide();
            }, this)

            this.record_list.setPadding({ spacingY: 10, top: 10 });
            this.record_list.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.record_list.setVertical(ccui.Layout.LayoutVertical.TOP);

            this.linerAnimate = kaayou.linear.easeOutCubic();

            this.panel2.setVisible(false);

            let wheel_light = sp.SkeletonAnimation.createWithJsonFile(tea.res.TH_FortuneWheel_Animate_json, tea.res.TH_FortuneWheel_Animate_atlas, 1);
            wheel_light.setVisible(true);
            wheel_light.setAnimation(0, 'animation', true);
            wheel_light.setPosition(this.wheel_light.width / 2, this.wheel_light.height / 2);

            this.wheel_light.addChild(wheel_light);

            let task = this._task = []

            let watcher = (obj, key, fn) => {

                let old = obj[key];

                task.push(function () {
                    if (obj[key] !== old) {
                        fn(obj[key], old)
                        old = obj[key];
                    }
                });

            }

            this._rank = 9;

            watcher(this.status, "run", (n) => {
                if (n === true) {
                    //开始游戏
                    this.lock = true;
                } else if (n === false) {

                    if (this._rank <= 8 && this._rank >= 1)
                        kaayou.emit('common', 'ui::Dialog::Show', {
                            msg: `恭喜你抽中${this.rank(this._rank)}`
                        })

                    this.lock=false;
                    if(this._info.count>0)
                        this.setEnableWheel(true);
                    else
                        this.setEnableWheel(false);
                }

            })


            let backend = false;
            cc.eventManager.addCustomListener(cc.game.EVENT_HIDE,  ()=> {
               // if(cc.sys.OS_IOS)
                    if(this.isVisible()){
                        backend = true;
                    }
            });

            cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, () => {
                //if(cc.sys.OS_IOS)
                    if(this.isVisible() && backend){
                        this.cursor.setRotation(this.rewardAngle[this._rank]||this.rewardAngle.none);
                        this.resetWheelStatus();
                        this.lock=false;
                        if(this._rank<=8 && this._rank>=1)
                            kaayou.emit('common', 'ui::Dialog::Show', {
                                msg: `恭喜你抽中${this.rank(this._rank)}`
                            })
                        backend = false;
                    }
               
            });

            kaayou.getController("lobby").on("ws::onConnect",()=>{
                kaayou.emit("common", "ui::Loading::Show", { msg: "信息加载中", time: 3 });
                if (this.isVisible()) {
                    this.pullStatus();
                    this.pullInfo();
                    this.lock = false;
                    this.resetWheelStatus();
                    this.cursor.setRotation(this.rewardAngle[this._rank]);
                }
            }, this)

            this.btn_start.on(kaayou.TouchEvent.TouchEnd, () => {
                //kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (this.status.run === true || this.lock === true) {
                    if (this.lock) {
                        kaayou.emit('common', 'ui::Toast::Show', { msg: "请稍后..." });
                    }
                    return;
                }

                this.lock = true;
                this.lockTime = 0;
                this.playWheel().then(({ rank }) => {
                    kaayou.SoundManager.getInstance().playSound(tea.res.TH_FortuneWheel_playsound_mp3);
                    let attr: any = this.status.attr;
                    let count = --this._info.count;
                    this._rank = rank;
                    this.status.run = true;
                    this.setEnableWheel(false);
                    this.status.duation = 3000 ;
                    this.status.attr.cursorAt = this.cursor.rotation%360
                    attr.rotate = 360 * Math.floor(3 + Math.random() * 4 ) + (this.rewardAngle[this._rank.toString()] || this.rewardAngle.none) + (360 - this.status.attr.cursorAt);
                    this.txt_coin_count.setString(`个人剩余次数:${count}`);
                    this.txt_game_coin.setString(`可转动${Math.min(99, count)}次`);

                    if (count <= 0) {
                        this.setEnableWheel(false);
                        this.ErrorMsg = "未满足抽奖条件";
                    }

                }).catch((msg) => {
                    this.lock = false;
                    this.ErrorMsg = msg;
                    this.setEnableWheel(false);
                })

            }, this);

            this.btn_start_dis.on(kaayou.TouchEvent.TouchEnd, () => {


                if(this.status.run)
                    return;

                //let msg:string;
                /* let status = this.isGameActive();
                 
                 switch(status){
                     case FortuneWheelStatus.NOTSTART:
                         msg = "抽奖活动还未开始"
                     break
                     case FortuneWheelStatus.END:
                         msg = "抽奖活动已结束"
                     break;
                     case FortuneWheelStatus.NOTVAILD:
                     default:
                         msg =  "未满足抽奖条件";
                     
                 }*/

                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: this.ErrorMsg
                })
            }, this);

            /*const reflash = 0.016;

            this.getScheduler().scheduleCallbackForTarget(this,()=>{
                this.RunWheel();    
            },reflash,Infinity,0,false)*/

            this.tab_btn1.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.tab_btn1.loadTexture("btn_wheel_inst_on.png", ccui.Widget.PLIST_TEXTURE)
                this.tab_btn2.loadTexture("btn_wheel_record.png", ccui.Widget.PLIST_TEXTURE)
                this.panel1.setVisible(true);
                this.panel2.setVisible(false);
                this.pullInfo();
            }, this)


            this.tab_btn2.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.tab_btn1.loadTexture("btn_wheel_inst.png", ccui.Widget.PLIST_TEXTURE)
                this.tab_btn2.loadTexture("btn_wheel_record_on.png", ccui.Widget.PLIST_TEXTURE);
                this.panel2.setVisible(true);
                this.panel1.setVisible(false);
                this.pullRecord();
            }, this)



            this.status.finish.push(() => {
                this.resetWheelStatus();
            })


        }

        resetWheelStatus() {
            this.status.run = false;
            this.status.disntane = null;
            this.status.i = 0;
        }

        frame = 0.0016;
        lock = false;
        update(dt) {
            this.RunWheel();
            this._task.forEach(v => {
                v();
            })
            if (this.lock) {
                this.lockTime += dt;
                if (this.lockTime > 4) {
                    this.lockTime = 0;
                    this.lock = false;
                }
            }
        }


        private _info = { actid: 0, count: 0, total_count: 0, act_time: 0, user_left_count: 0, act_ticket: 0, left_ticket: 0 }

        private status = { run: false, duation: 0, attr: { rotate: 0, cursorAt: 0 }, i: 0, disntane: null, finish: [] }

        rank(r) {
            switch (r.toString()) {
                case "1":
                    return "一等奖"
                case "2":
                    return "二等奖"
                case "3":
                    return "三等奖"
                case "4":
                    return "四等奖"
                case "5":
                    return "五等奖"
                case "6":
                    return "六等奖"
                case "7":
                    return "七等奖"
                case "8":
                    return "八等奖"
                default:
                    return "未中奖"

            }
        }

        /*
        isGameActive(){
            const {startTime,endTime} = this;
            const now = (new Date().getTime() / 1000)|0;
            const {isactivity} = tea.mod.__teaHouseInfo;
            const {actid,count} = this._info; 
            
            let isbetween = now > startTime && now < endTime

            if(count===0 && isactivity)
                return FortuneWheelStatus.NOTVAILD;

            if(isbetween && isactivity && count > 0)
                return FortuneWheelStatus.START;
            
            if(isbetween===false && now < startTime)
                return FortuneWheelStatus.NOTSTART;
            
            if(isbetween===false && now > endTime)
                return FortuneWheelStatus.END;
            
 

        }*/

        RunWheel() {
            let status = this.status
            if (status.run !== true)
                return;

            if (this.status.disntane === null) {
                this.status.disntane = Math.ceil(status.duation / 16);
                this.status.i = 0;
            }

            if (this.status.i >= this.status.disntane) {
                this.status.finish.forEach(v => {
                    v.call(this);
                });
                return;
            }


            let p = status.i / status.disntane;
            let n = this.linerAnimate(p)

            this.cursor.setRotation(status.attr.cursorAt + status.attr.rotate * n);

            this.status.i++;

        }

        intistatus() {
            this.updateWheel();
            lodash.extend(this.status, { run: false, duation: 0, attr: { rotate: 0 }, i: 0, disntane: null });
            this.cursor.setRotation(this.rewardAngle[this._rank] || 0);
            this.status.attr.cursorAt = this.rewardAngle[this._rank] || 0;
            this.tab_btn1.loadTexture("btn_wheel_inst_on.png", ccui.Widget.PLIST_TEXTURE)
            this.tab_btn2.loadTexture("btn_wheel_record.png", ccui.Widget.PLIST_TEXTURE)
            this.panel1.setVisible(true);
            this.panel2.setVisible(false);
        }

        playWheel() {
            return new Promise(async (resolve, reject) => {
                const { actid } = this._info
                const hid = tea.mod.__teaHouseInfo.hid;
                let data = await kaayou.sendMessage("lobby", "housemembergetluck", { actid, hid }, "ws::Msg::housemembergetluck");
                if (data.errcode) {
                    kaayou.emit('common', 'ui::Toast::Show', {
                        msg: data.msg || "获取信息失败!"
                    })

                    reject(data.msg || "获取信息失败!")
                    return;
                }

                resolve(data);
            })
        }

        async pullRecord() {
            const { actid } = this._info
            const hid = tea.mod.__teaHouseInfo.hid;
            const uid = tea.mod.__teaHouseInfo.uid;
            let data = await kaayou.sendMessage("lobby", "houseactivityinfo", { actid, hid, uid }, "ws::Msg::houseactivityinfo");
            if (data.errcode) {
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: data.msg || "获取信息失败!"
                })
                return;
            }

            this.record_list.removeAllChildren();

            data.useritems.forEach(v => {
                let item = new FortuneWheelRecordItem(this.record_item);
                item.setInfo(v)
                this.record_list.addChild(item.node);
            })


            this.record_list.doChildrenLayout();
            this.record_list.scrollToTop(0, false);

        }

        async pullInfo() {
            //houseactdetail
            const { actid } = this._info
            const hid = tea.mod.__teaHouseInfo.hid;
            let data = await kaayou.sendMessage("lobby", "houseactdetail", { actid, hid }, "ws::Msg::houseactdetail");
            if (data.errcode) {
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: data.msg || "获取信息失败!"
                })
                return;
            }

            this.setInfo(data);
        }

        setEnableWheel(bool: boolean) {
            if (bool === true) {
                this.btn_start_dis.setVisible(false);
                this.btn_start.setVisible(true)
            } else {
                this.btn_start_dis.setVisible(true);
                this.btn_start.setVisible(false)
            }
        }

        setInfo(info: any) {
            const count = info.count;
            const act_time = info.act_time;
            const user_left_count = info.user_left_count;
            const total_count = info.total_count;
            const act_ticket = info.act_ticket;
            const left_ticket = info.left_ticket;

            if (count !== void 0)
                this._info.count = count;
            if (act_time !== void 0)
                this._info.act_time = act_time;
            if (user_left_count !== void 0)
                this._info.user_left_count = user_left_count;
            if (total_count !== void 0)
                this._info.total_count = total_count;
            if (act_ticket !== void 0)
                this._info.act_ticket = act_ticket;
            if (left_ticket !== void 0)
                this._info.left_ticket = left_ticket;

            this.updateWheel();
        }

        updateWheel() {
            let { count, act_time, user_left_count, total_count, act_ticket, left_ticket } = this._info;
            this.txt_game_coin.setString(`可转动${Math.min(99, count)}次`);
            this.txt_time_start.setString(`开始时间:${new Date(this.startTime * 1000).format("yyyy-MM-dd hh:mm")}`)
            this.txt_time_end.setString(`结束时间:${new Date(this.endTime * 1000).format("yyyy-MM-dd hh:mm")}`)
            this.txt_coin_count.setString(`个人剩余次数:${count}`);
            this.txt_game_count.setString(`局数累计:${left_ticket}/${act_ticket}`);
            //let status = this.isGameActive();
            //if(status===FortuneWheelStatus.START)
            //    this.setEnableWheel(true);
            //else
            //    this.setEnableWheel(false);
        }

        private ErrorMsg: string = ""
        async pullStatus() {
            const hid = tea.mod.__teaHouseInfo.hid;
            const { actid } = this._info
            let data = await kaayou.sendMessage("lobby", "housemembercanluck", { hid, actid }, "ws::Msg::housemembercanluck");
            console.log("------------抽奖数据：" + JSON.stringify(data))
            if (data.errcode) {
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: data.msg || "获取信息失败!"
                })
                this.ErrorMsg = data.msg || "获取信息失败!"
                this.setEnableWheel(false)
                return;
            }

            const { count } = data;
            if (count === 0) {
                this.setEnableWheel(false)
                this.ErrorMsg = "未满足抽奖条件"
            }
            else
                this.setEnableWheel(true)
            this.setInfo(data);

        }

        Show({ actstartime, actendime, actid }) {
            this._info.actid = actid;
            this.startTime = actstartime;
            this.endTime = actendime;
            this.setVisible(true);
            this.intistatus();
            this.pullStatus();
            this.pullInfo();
            this.lock = false;
            this.lockTime = 0;
        }

        Hide() {
            this.setVisible(false);
            
        }
    }
}