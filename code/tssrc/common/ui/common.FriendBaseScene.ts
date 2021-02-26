
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export abstract class FriendBaseScene<IFriendModT extends common.mod.friendBaseMod<mod.IFriendGame_User_Info>, IPlayerLayerT extends common.IPlayerLayer> extends kaayou.kScene {
        curMod: IFriendModT = null;
        gameState: number = 0;
        playerLayer: Array<IPlayerLayerT> = null;

        readyTime: ccui.Text = null;

        comeTime: number = null;

        //界面公用Ui按钮
        btn_menu: ccui.Button = null;
        btn_chat: ccui.Button = null;
        btn_mic: ccui.Button = null;
        btn_gps: ccui.Button = null;
        btn_ready: ccui.Button = null;
        btn_invite: ccui.Button = null;

        ksrkj: ccui.ImageView = null;
        tog_ksrkj2: ccui.CheckBox = null;
        tog_ksrkj3: ccui.CheckBox = null;

        //
        inviteLayer: gameShareLayer = null;

        //实时语音加入成功后的房间号
        iGVoiceRoomId: number = 0;
        //实时语音房间麦克风/喇叭状态
        bGVoiceMicStaCur: boolean = false;    //麦克风权限
        bGVoiceStaMicNext: boolean = false;
        // bGVoiceStaCur: boolean = false;
        bGVoiceSpeakerStaCur: boolean = false; //扬声器权限
        bGVoiceStaSpeakerNext: boolean = false;
        iGvoiceStaCnt: number = 0; //开麦/喇叭时可尝试次数，避免没给权限时，导致开麦失败然后一直重试开麦

        constructor() {
            super();
            // this.initUI();
        }
        // @doBindEvent
        initUI() {
            let self = this;
            cc.spriteFrameCache.addSpriteFrames(common.res.gps_plist);
            cc.spriteFrameCache.addSpriteFrames(common.res.magicEmotion_plist);

            this.btn_invite = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_invite");
            this.btn_invite.visible = false;
            this.btn_ready = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_ready");
            this.btn_ready.visible = false;
            this.readyTime = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Text_time");
            //200309zyx
            if (this.readyTime) this.readyTime.ignoreContentAdaptWithSize(true);

            this.btn_menu = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_menu");
            this.btn_chat = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_chat");
            this.btn_mic = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_mic");
            this.btn_gps = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_gps");

            this.ksrkj = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "font_KSRKJ");
            if (this.ksrkj) { this.ksrkj.visible = false; }
            this.tog_ksrkj2 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "OPEN_KSRKJ2");
            if (this.tog_ksrkj2) { this.tog_ksrkj2.visible = false; }
            this.tog_ksrkj3 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "OPEN_KSRKJ3");
            if (this.tog_ksrkj3) { this.tog_ksrkj3.visible = false; }


            cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function () {
                cc.log("游戏进入后台");
                kaayou.emit(self.curMod.getModuleName(), "ui::MjTable::backGround");
                kaayou.NetManager.getInstance().getSocket(self.curMod.getModuleName()).close({ Initiative: false });
                if (self.curMod && self.curMod._eventQueue) {
                    console.log("清理消息队列：", self.curMod.getModuleName());
                    self.curMod._eventQueue.release();
                }
                //如果加入了实时语音房间，后台时暂停语音
                if (self.iGVoiceRoomId) {
                    kaayou.PlatformMgr.getInstance().gvoice.pause();
                }
            });
            cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function () {
                cc.log("重新返回游戏");
                //如果加入了实时语音房间，返回游戏时继续语音
                if (self.iGVoiceRoomId) {
                    kaayou.PlatformMgr.getInstance().gvoice.resume();
                }
            });
        }

        OnUpdateGVoiceEnterRoom() {
            if (this.curMod.getTableInfo() && this.curMod.getTableInfo().tableid && this.curMod.getTableInfo().gameconfig["gvoice"] == "true" && !this.iGVoiceRoomId) {
                //加入实时语音房间成功后，会收到 OnGvoiceJoinRoomOK 消息通知
                kaayou.PlatformMgr.getInstance().gvoice.EnterRoom(this.curMod.getTableInfo().tableid.toString());
            } else {
                this.unschedule(this.OnUpdateGVoiceEnterRoom);
            }
        }

        onReEnter() {
            if (this.ksrkj) { this.ksrkj.setVisible(false) }
            if (this.tog_ksrkj2) { this.tog_ksrkj2.setVisible(false) }
            if (this.tog_ksrkj3) { this.tog_ksrkj3.setVisible(false) }
            if (this.inviteLayer) {
                this.inviteLayer.setVisible(false);
            }
            kaayou.PlatformMgr.getInstance().sys.GetBatteryInfo();

            //实时语音
            this.iGVoiceRoomId = 0;
            this.bGVoiceStaMicNext = false;
            this.bGVoiceStaSpeakerNext = false;
            this.iGvoiceStaCnt = 0;
            this.bGVoiceMicStaCur = false;
            this.bGVoiceSpeakerStaCur = false;

            if (this.curMod.tableInfo.gameconfig["gvoice"] == "true" && !this.curMod.getIsGuest()) {
                this.bindGVoiceEvents();
                this.unschedule(this.OnUpdateGVoiceEnterRoom);
                this.schedule(this.OnUpdateGVoiceEnterRoom, 3);
                this.OnUpdateGVoiceEnterRoom();
            }
            let isGuest = this.curMod.getIsGuest();
            //开启实时语音，这里只是设置状态，会等收到OnGvoiceJoinRoomOK后才调用开麦+喇叭接口
            if (this.curMod.getTableInfo() && this.curMod.getTableInfo()['join_type'] != 2) {
                kaayou.emit(this.curMod.getModuleName(), 'gvoice::setMicAndSpeakerSta', { gvoiceSta: !isGuest, gvoiceMic: !isGuest });
            }
            this.cleanUp();
        }

        onReExit() {
            //实时语音
            if (this.curMod.tableInfo.gameconfig["gvoice"] == "true" && !this.curMod.getIsGuest()) {
                this.unschedule(this.OnUpdateGVoiceEnterRoom);
                this.unschedule(this.OnUpdateGVoiceMicAndSpeaker);
                this.offGVoiceEvents();
            }
            if (this.iGVoiceRoomId) {
                kaayou.PlatformMgr.getInstance().gvoice.QuitRoom(this.iGVoiceRoomId.toString());
                this.iGVoiceRoomId = 0;
            }
        }

        //开启/关闭麦克风+喇叭
        /**
         * 
         * @param data gvoiceSta扬声器  gvoiceSpeaker
         * 因为已经有很多游戏绑定了这个消息  注意当第二个参数没传递的情况  当没传麦克风参数时候  直接取是否关闭扬声器
         */
        setGVoiceMicAndSpeakerSta(data: { gvoiceSta: boolean, gvoiceMic: boolean }) { //from emit "gvoice::setMicAndSpeakerSta"
            this.bGVoiceStaSpeakerNext = data.gvoiceSta;
            if (lodash.isUndefined(data.gvoiceMic)) {
                this.bGVoiceStaMicNext = data.gvoiceSta;
            } else {
                this.bGVoiceStaMicNext = data.gvoiceMic;
            }
            //如果是游客 强制为false
            if(this.curMod.getIsGuest()){
                this.bGVoiceStaSpeakerNext = false;
                this.bGVoiceStaMicNext = false;
            }
            this.iGvoiceStaCnt = 3; //最多可尝试3次开麦/语音
        }

        //屏蔽指定玩家的语音
        setGVoiceForBidMemberVoice(data: { index: number, isForbid: boolean }) { //from emit "gvoice::ForbidMemberVoice"
            if (!data || (data.index == 0 && !this.curMod.getIsGuest())) { return; } //不能屏蔽自己
            if (!this.curMod.getTableInfo() || !this.curMod.getTableInfo().tableid) { return; }
            let player = this.curMod.getPlayerByClientID(data.index);
            if (!player) { return; }

            player.gvoicesta = data.isForbid ? -1 : 0;
            let roomid = this.curMod.getTableInfo().tableid.toString();
            kaayou.PlatformMgr.getInstance().gvoice.ForbidMemberVoice(player.gvoicemenberid, data.isForbid, roomid);
            kaayou.emit(this.curMod.getModuleName(), "ui::UpdateMemberVoice", { index: data.index, gvoicesta: player.gvoicesta });
        }

        bindGVoiceEvents() {
            //进入房间成功
            kaayou.getController("").on("OnGvoiceJoinRoomOK", this.OnGvoiceJoinRoomOKFunc, this);
            //成员状态改变回调
            kaayou.getController("").on("OnGvoiceMemberVoice", this.OnGvoiceMemberVoiceFunc, this);
            //开麦成功
            kaayou.getController("").on("OnGvoiceOpenMicOK", this.OnGvoiceOpenMicOKFunc, this);
            //关麦成功
            kaayou.getController("").on("OnGvoiceCloseMicOK", this.OnGvoiceCloseMicOKFunc, this);
            //开扬声器成功
            kaayou.getController("").on("OnGvoiceOpenSpeakerOK", this.OnGvoiceOpenSpeakerOKFunc, this);
            //关扬声器成功
            kaayou.getController("").on("OnGvoiceCloseSpeakerOK", this.OnGvoiceCloseSpeakerOKFunc, this);
        }

        offGVoiceEvents() {
            kaayou.getController("").off("OnGvoiceJoinRoomOK", this.OnGvoiceJoinRoomOKFunc, this);
            kaayou.getController("").off("OnGvoiceMemberVoice", this.OnGvoiceMemberVoiceFunc, this);
            kaayou.getController("").off("OnGvoiceOpenMicOK", this.OnGvoiceOpenMicOKFunc, this);
            kaayou.getController("").off("OnGvoiceCloseMicOK", this.OnGvoiceCloseMicOKFunc, this);
            kaayou.getController("").off("OnGvoiceOpenSpeakerOK", this.OnGvoiceOpenSpeakerOKFunc, this);
            kaayou.getController("").off("OnGvoiceCloseSpeakerOK", this.OnGvoiceCloseSpeakerOKFunc, this);
        }

        //加入实时语音房间成功
        OnGvoiceJoinRoomOKFunc(e: kaayou.Event) {
            if (!!e.data) {
                let memberID = e.data.memberID;
                this.iGVoiceRoomId = this.curMod.getTableInfo().tableid;
                console.log("GVoice OnGvoiceJoinRoomOKFunc 加入实时语音房间成功，memberID =", memberID);
                //把自己的memberID发给服务器广播给其他玩家
                this.curMod.sendGVoiceMemberID({ memberid: memberID });

                //加入房间成功后，要延时3秒左右开麦克风，不然会失败
                this.unschedule(this.OnUpdateGVoiceEnterRoom);
                this.unschedule(this.OnUpdateGVoiceMicAndSpeaker);
                this.schedule(this.OnUpdateGVoiceMicAndSpeaker, 3);
            }
        }

        //当房间中的其他成员开始说话或者停止说话的时候，通过该回调进行通知
        //memberid : 改变状态的成员ID
        //status : 成员的说话状态（零值表示没有说话，非零值表示正在说话）
        OnGvoiceMemberVoiceFunc(e: kaayou.Event) {
            let memberID = e.data.memberid;
            let status = e.data.status;
            // console.log("GVoice OnGvoiceMemberVoiceFunc 收到玩家语音状态变更消息，memberID = " + memberID + ", status = " + status);
            //把消息转到mod，更新该ID对应玩家的状态
            kaayou.emit(this.curMod.getModuleName(), "gvoice::UpdateMemberVoice", { memberID: memberID, status: status });
        }

        OnGvoiceOpenMicOKFunc() {
            this.bGVoiceMicStaCur = true;
        }

        OnGvoiceCloseMicOKFunc() {
            this.bGVoiceMicStaCur = false;
        }

        OnGvoiceOpenSpeakerOKFunc() {
            this.bGVoiceSpeakerStaCur = true;
        }

        OnGvoiceCloseSpeakerOKFunc() {
            this.bGVoiceSpeakerStaCur = false;
        }

        OnUpdateGVoiceMicAndSpeaker() {
            if (this.iGvoiceStaCnt > 0 && this.bGVoiceStaMicNext != this.bGVoiceMicStaCur) {
                if (this.bGVoiceStaMicNext) {
                    kaayou.PlatformMgr.getInstance().gvoice.OpenMic();
                } else {
                    kaayou.PlatformMgr.getInstance().gvoice.CloseMic();
                }
            }
            if (this.iGvoiceStaCnt > 0 && this.bGVoiceStaSpeakerNext != this.bGVoiceSpeakerStaCur) {
                if (this.bGVoiceStaSpeakerNext) {
                    kaayou.PlatformMgr.getInstance().gvoice.OpenSpeaker();
                } else {
                    kaayou.PlatformMgr.getInstance().gvoice.CloseSpeaker();
                }
            }
            if (this.iGvoiceStaCnt > 0) this.iGvoiceStaCnt--;
        }

        bindUiEvent() {
            let self = this;
            //common里按钮点击回调不要用匿名函数，否则子类无法重载
            this.btn_ready && this.btn_ready.on(kaayou.TouchEvent.TouchEnd, this.onReadyClick, this);
            this.btn_invite && this.btn_invite.on(kaayou.TouchEvent.TouchEnd, this.onInviteClick, this);
            this.btn_menu && this.btn_menu.on(kaayou.TouchEvent.TouchEnd, this.onMenuClick, this);
            this.btn_chat && this.btn_chat.on(kaayou.TouchEvent.TouchEnd, this.onChatClick, this);
            this.btn_gps && this.btn_gps.on(kaayou.TouchEvent.TouchEnd, this.onGpsClick, this);

            this.bindGameBgEvent();

            let configs = common.mod.Config.AppConfig;
            let feature: IFeature = lodash.extend({}, configs.feature);
            if (configs && feature && feature.iOSsh && cc.sys.isNative) {
                this.btn_invite.setVisible(false)
                this.btn_gps.setVisible(false);
            }

            this.tog_ksrkj2 && this.tog_ksrkj2.on(kaayou.CheckEvent.SELECTED, self.onToggleClick, this);
            this.tog_ksrkj3 && this.tog_ksrkj3.on(kaayou.CheckEvent.SELECTED, self.onToggleClick, this);
        }

        bindGameBgEvent() {
            let self = this;
            let gameBg: ccui.ImageView = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "gameBg");
            gameBg.setTouchEnabled(true);
            gameBg.on(kaayou.TouchEvent.TouchEnd, function () {
                if (self.inviteLayer) self.inviteLayer.setVisible(false);
            }, this);
        }

        onReadyClick(event: kaayou.CheckEvent) {
            console.log("点击准备");
            let self = this;
            self.curMod.sendReady();
            self.btn_ready.visible = false;
        }

        onInviteClick(event: kaayou.CheckEvent) {
            let self = this;
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            if (self.inviteLayer) self.inviteLayer.setVisible(true);
        }

        onMenuClick(event: kaayou.CheckEvent) {
            let self = this;
            kaayou.emit(self.curMod.getModuleName(), "ui::MajonMenuPanel::Show");
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
        }

        onChatClick(event: kaayou.CheckEvent) {
            let self = this;
            kaayou.emit(self.curMod.getModuleName(), "ui::chatLayer::Show");
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
        }

        onGpsClick(event: kaayou.CheckEvent) {
            console.log("base gps ");
            let self = this;
            kaayou.emit(self.curMod.getModuleName(), 'ui::GPSLayer::Show');
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
        }

        onToggleClick(event: kaayou.CheckEvent) {
            console.log('onToggleClick name=' + event.target.name + ', isSelected=' + event.target.isSelected());
            kaayou.SoundManager.getInstance().playSound(SoundRes.Click_btn_switch);
            if (event.target.name == "OPEN_KSRKJ2" || event.target.name == "OPEN_KSRKJ3") {
                if (event.target.isSelected()) {
                    kaayou.sendMessage(this.curMod.getModuleName(), 'fewerfriend', {});
                }
            }
        }

        bindModEvents() {
            let self = this;

            kaayou.getController(this.curMod.getModuleName()).on('ui::cleanUp', function (e: kaayou.Event) {
                self.cleanUp();
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on('UpdatePlayer', function (e: kaayou.Event) {
                self.onUpdatePlayer(e.data);
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on('ui::UpdateMemberVoice', function (e: kaayou.Event) {
                self.onUpdateGVoiceMemberSta(e.data);
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on('ienterRoom', function (e: kaayou.Event) {
                self.onIenterRoom();
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on('onIready', function (e: kaayou.Event) {
                self.onIready();
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on('ui::Table::broadcastUseMagic', function (e: kaayou.Event) {
                self.broadcastUseMagic(e.data);
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on("ui::onMicChat", function (e: kaayou.Event) {
                self.onMicChat(e.data);
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on("ui::MjTable::lastPlayerCome", function (e: kaayou.Event) {
                self.onLastPlayerCome(e.data);
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on("ui::MjTable::showKSRKJ", function (e: kaayou.Event) {
                self.showKSRKJ(e.data);
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on("ui::MjTable::hideKSRKJ", function (e: kaayou.Event) {
                self.hideKSRKJ(e.data);
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on("ui::MjTable::unSelect", function (e: kaayou.Event) {
                self.unSelect();
            }, this);

            //开启/关闭麦克风+喇叭
            kaayou.getController(this.curMod.getModuleName()).on("gvoice::setMicAndSpeakerSta", function (e: kaayou.Event) {
                self.setGVoiceMicAndSpeakerSta(e.data);
            }, this);

            //屏蔽指定玩家的语音
            kaayou.getController(self.curMod.getModuleName()).on('gvoice::ForbidMemberVoice', function (e: kaayou.Event) {
                self.setGVoiceForBidMemberVoice(e.data);
            }, this);
        }

        showKSRKJ(data: { num: number }) {
            if (!this.ksrkj || !this.tog_ksrkj2 || !this.tog_ksrkj3) {
                return;
            }
            this.ksrkj.visible = true;
            if (data.num == 2) {
                this.tog_ksrkj2.visible = true;
                this.tog_ksrkj3.visible = false;
            } else if (data.num == 3) {
                this.tog_ksrkj2.visible = false;
                this.tog_ksrkj3.visible = true;
            }
            this.tog_ksrkj2.setSelected(false);
            this.tog_ksrkj3.setSelected(false);
        }

        hideKSRKJ(data: { b: boolean }) {
            if (!this.ksrkj || !this.tog_ksrkj2 || !this.tog_ksrkj3) {
                return;
            }
            this.ksrkj.visible = data.b;
            this.tog_ksrkj2.visible = false;
            this.tog_ksrkj3.visible = false;
        }

        unSelect() {
            if (!this.ksrkj || !this.tog_ksrkj2 || !this.tog_ksrkj3) {
                return;
            }
            this.tog_ksrkj2.setSelected(false);
            this.tog_ksrkj3.setSelected(false);
        }

        cleanUp() {
            console.log("清理界面: cleanUp");
            this.gameState = common.mod.GAME_STATE.NONE;
            this.btn_ready.visible = false;
            this.btn_invite.visible = false;
            if (this.inviteLayer) {
                this.inviteLayer.setVisible(false);
            }
            for (var x in this.playerLayer) {
                this.playerLayer[x].cleanUp();
            }
        }


        onUpdatePlayer(data: { Players: Array<common.mod.IGame_User_Info> }) {
            let personNum = 0;
            for (let x in this.playerLayer) {
                this.playerLayer[x].visible = false;
                if (!data.Players[x]) continue;
                personNum++;
                this.playerLayer[x].visible = true;
                this.playerLayer[x].setPlayerInfo(data.Players[x]);
            }
            console.log('btn_invite', personNum < this.curMod.getMaxNum());
            this.btn_invite.visible = personNum < this.curMod.getMaxNum();
            let configs = common.mod.Config.AppConfig;
            let feature: IFeature = lodash.extend({}, configs.feature);
            if (configs && feature && feature.iOSsh && cc.sys.isNative) {
                this.btn_invite.setVisible(false)
            }
        }

        onUpdateGVoiceMemberSta(data: { index: number, gvoicesta: number }) { // from emit "ui::UpdateMemberVoice"
            if (!this.playerLayer[data.index]) { return; }
            this.playerLayer[data.index].onGVoiceSta(data.gvoicesta);
        }

        onIenterRoom() {
            this.btn_ready.visible = true;
            let configs = common.mod.Config.AppConfig;
            let feature: IFeature = lodash.extend({}, configs.feature);
            if (this.btn_invite) this.btn_invite.visible = true && !!this.curMod.getConfigWx();
            if (configs && feature && feature.iOSsh && cc.sys.isNative) {
                this.btn_invite.setVisible(false)
            }
            return true;
        }

        broadcastUseMagic(data: { type: number, dwindex: number, dwtoindex: number, index: number }) {
            let self = this;
            let animstr = ["flower", "aixin", "egg", "tuoxie", "zhadan"];

            let Panel_player: ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Panel_player");
            if (!Panel_player || !Panel_player.children[data.dwindex]) {
                cc.error('找不到玩家节点层');
                return;
            }
            let size = Panel_player.children[data.dwindex].getContentSize();
            let offset = cc.p(size.width / 2, size.height / 2);
            let startpos = cc.pAdd(offset, Panel_player.children[data.dwindex].getPosition());
            let endpos = cc.pAdd(offset, Panel_player.children[data.dwtoindex].getPosition());
            startpos = Panel_player.convertToWorldSpace(startpos);
            endpos = Panel_player.convertToWorldSpace(endpos);
            startpos = this.node.convertToNodeSpace(startpos);
            endpos = this.node.convertToNodeSpace(endpos);

            let time = cc.pDistance(startpos, endpos) / 1500;
            time = time < 0.3 ? 0.3 : time;

            let cb = function () {
                let img = ccui.ImageView.create("me.img_" + animstr[data.index] + ".png", ccui.Widget.PLIST_TEXTURE);
                img.setPosition(startpos.x, startpos.y);

                let bezier = [cc.p(startpos.x + 50, startpos.y + 100), cc.p(endpos.x - 50, endpos.y + 150), endpos];
                let bezierTo = cc.bezierTo(time, bezier);

                let acMove: cc.Action = bezierTo;
                //花不旋转
                if (data.index != 0) {
                    acMove = cc.spawn([bezierTo, cc.rotateBy(time, 360)]);
                }
                img.runAction(cc.sequence(acMove, cc.callFunc(function (sender) {
                    sender.removeFromParent();
                    self.showSkeleton(animstr[data.index], endpos);
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes["Emoj_" + animstr[data.index]]);
                })));
                self.node.addChild(img, 30);
            }
            let count = data.type == 5 ? 10 : 1;
            this.schedule(cb, 0.15, count - 1);
        }

        showSkeleton(aniStr: string, pos: cc.Point) {
            let spineAnim: sp.SkeletonAnimation = sp.SkeletonAnimation.createWithJsonFile(common.res[aniStr + "Json"], common.res[aniStr + "Atals"], 1);
            spineAnim.setAnimation(1, aniStr, false);
            this.node.addChild(spineAnim, 30);
            spineAnim.setPosition(pos);
            spineAnim.setCompleteListener(function () {
                spineAnim.setVisible(false);
                setTimeout(() => {
                    spineAnim.removeFromParent();
                }, 500);
            })
            // spineAnim.runAction(cc.sequence(cc.delayTime(1.0), cc.callFunc(function (sender) {
            //     sender.removeFromParent();
            // }, spineAnim)))
        }

        onMicChat(data: { index: number, start: boolean }) {
            if (!this.playerLayer[data.index]) {
                console.log("onMicChat Error");
                return;
            }
            this.playerLayer[data.index].onMicChat(data.start);
        }

        onLastPlayerCome(data: { leftTime: number }) {
            console.log(data);
            this.btn_ready.visible = true;
            this.btn_invite.visible = false;
            this.readyTime.string = data.leftTime.toString();
            this.comeTime = Math.floor(new Date().getTime()) + data.leftTime * 1000;
            this.schedule(this.onAutoReady, 0.2);
        }

        //自己准备
        onIready() {
            console.log("onIready");
            this.cleanUp();
            this.btn_invite.visible = true;
            this.btn_ready.visible = false;
            if (this.btn_invite) this.btn_invite.visible = true && !!this.curMod.getConfigWx();
        }

        onAutoReady() {
            let curtime = Math.floor(this.comeTime - Math.floor(new Date().getTime()));
            this.readyTime.string = Math.floor(curtime / 1000).toString();
            if (curtime <= 0) {
                this.btn_ready.visible = false;
                this.unschedule(this.onAutoReady);
                this.curMod.sendReady();
            }
        }

        // async onInvite(e) {
        //     console.log(e);

        //     let data = await kaayou.emit(this.curMod.getModuleName(), 'mod::getInviteData', null, true);

        //     console.log(data);

        //     switch (e.name) {
        //         case 'btn_wx':
        //             kaayou.SoundManager.getInstance().setBtnClickSounds();
        //             kaayou.PlatformMgr.getInstance().wx.ShareURL(data['title'], data['text'], data['url']);
        //             break;
        //         case 'btn_dd':
        //             kaayou.SoundManager.getInstance().setBtnClickSounds();
        //             kaayou.PlatformMgr.getInstance().dd.DDShareURL(data['title'], data['text'], data['url']);
        //             break;
        //     }
        // }
    }
}