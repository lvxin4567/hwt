/// <reference path="Socket.ts" />
namespace kaayou {
    interface __IReconect__ {
        delaytime: number,
        count: number
    }
    interface __INetEvent__ {
        name: string,
        type: number,
        ext: any
    }
    export class NetManager {
        static __INS__: NetManager = null;
        static getInstance() {
            if (NetManager.__INS__ == null) {
                NetManager.__INS__ = new NetManager();
                NetManager.__INS__.init();
            }
            return NetManager.__INS__;
        }

        public ctor(...args): void {

        }
        public description(): string {
            return "NetManager";
        }
        private _eventPool: __INetEvent__[] = null;
        init() {
            this._eventPool = [];
            this.runingSockets = {};
            this._needReConnectSockets = {};
            cc.director.getScheduler().scheduleUpdateForTarget(this, cc.Scheduler.PRIORITY_NON_SYSTEM, false);
        }
        __watchTime = 0;
        update(dt: number) {
            this.__watchTime += dt;
            this.doPool();
            if (this.__watchTime < 0.3) { return; }
            this.__watchTime = 0;
            this.isDisconnect();
            this.checkReConnect();
        }
        private _needReConnectSockets: { [key: string]: __IReconect__ } = null;
        checkReConnect() {
            for (var x in this._needReConnectSockets) {
                let t = Date.unix();
                if (t - this._needReConnectSockets[x].delaytime > 1) {
                    this._needReConnectSockets[x].delaytime = t;
                    this.doReConnect(x);
                    if (x != "lobby") {
                        kaayou.emit(x, `ws::Msg::ping`, {wsname:x,ms:460});  
                    }
                }
            }
        }
        _maxReConnectCount: number = 20;
        _reConConfig = {};
        doReConnect(name: string) {
            let self = this;
            let options: common.IDIALOG_OPTION = {
                title: "",
                msg: "您的网络已断开，请重试！",
                close: {
                    isShow: false,
                    action: null,
                },
                ismutual: true,
                mutualkey: "socketreconnct",
                btns: [
                    {
                        name: "重试",
                        action: function () {
                            // self._needReConnectSockets[name] = {
                            //     delaytime: Date.unix(),
                            //     count: 0
                            // }
                            if (self._reConConfig[name]) {
                                // this._reConConfig[name]
                                self.getSocket(name).doConnect(self._reConConfig[name]);
                                let optionsT = {
                                    msg: "您的网络不稳定，正在尝试重新连接服务器 ",
                                    time: 30
                                }
                                kaayou.emit('common', 'ui::Loading::Show', optionsT);
                            }

                            return;
                        }.bind(this),
                        colorType: 'green'
                    }
                ]
            }
            this._reConConfig[name] = null;
            if (this._needReConnectSockets[name].count >= this._maxReConnectCount) {
                this._reConConfig[name] = this.runingSockets[name].getconConfig();
                NetManager.getInstance().deleteSocket(name);
                this._needReConnectSockets[name] = null;
                delete this._needReConnectSockets[name];
                kaayou.emit('common', "ui::Dialog::Show", options);
                return;
            }
            ++this._needReConnectSockets[name].count;
            let optionsT = {
                msg: "您的网络不稳定，正在尝试重新连接服务器 ",
                time: 5
            }
            kaayou.emit('common', 'ui::Loading::Show', optionsT);
            if (!this.runingSockets[name]) {
                this._needReConnectSockets[name] = null;
                delete this._needReConnectSockets[name];
                return;
            }
            this.runingSockets[name].doReconnect();
        }

        cleanNeedConnect(name) {
            this._needReConnectSockets[name]
        }
        onWsConnectEvent(event: kaayou.Event) {
            let data: { name: string } = event.data;
            if (!data) { return; }
            this._eventPool.push({ name: data.name, type: 1, ext: null });
        }
        onWsCloseEvent(event: kaayou.Event) {
            let data: { name: string, code: number } = event.data;
            if (!data) { return; }
            if (!lodash.isEmpty(data.name) && data.code) {
                this._eventPool.push({ name: data.name, type: 2, ext: data.code });
            }

            // if (data.code != 1000 && !lodash.isEmpty(data.name)) {
            //     let s = this.runingSockets[data.name];
            //     if (!s) { return; }
            //     console.error(data.name + "意外断开");

            // }
        }
        doPool() {
            if (this._eventPool.length > 0) {
                let n = this._eventPool.length;
                while (n > 0) {
                    let e = this._eventPool.shift();
                    n = this._eventPool.length;
                    if (!e) { continue; }
                    if (1 == e.type) {
                        this._needReConnectSockets[e.name] = null;
                        delete this._needReConnectSockets[e.name];
                    } else if (2 == e.type) {
                        if (e.ext != 1000) {
                            console.error(e.name + "意外断开");
                            if (!this._needReConnectSockets[e.name]) {
                                this._needReConnectSockets[e.name] = {
                                    delaytime: Date.unix(),
                                    count: 0
                                }
                            }

                        }
                    }
                }
            }

        }

        isDisconnect() {
            for (var x in this.runingSockets) {
                let s = this.runingSockets[x];
                if (!s) { break; }
                if (true == s.getIsConnected() && false == s.getInitiative()/*&& false == s.checkLife() && */) {
                    //说明是已启动的so
                    if (Date.unix() - s.getLastTime() > 15) {
                        s.close({ Initiative: false })
                    }
                }
            }
        }

        protected runingSockets: { [key: string]: kaayou.kaWebSocket } = {};
        getSocket(name: string): kaayou.kaWebSocket {
            if (!this.runingSockets[name]) {
                this.runingSockets[name] = new kaWebSocket(name);
                kaayou.getController(name).on("ws::onClose", this.onWsCloseEvent, this);
                kaayou.getController(name).on("ws::onConnect", this.onWsConnectEvent, this);

            }

            return this.runingSockets[name];
        }
        deleteAllSocket() {
            let keys = Object.keys(this.runingSockets);
            for (var x in keys) {
                this.deleteSocket(keys[x]);
            }
        }
        deleteSocket(name: string) {
            if (!this.runingSockets[name]) {
                return;
            }
            this.runingSockets[name].close({ Initiative: true });
            kaayou.getController(name).offBytarger("ws::onClose", this);
            kaayou.getController(name).offBytarger("ws::onConnect", this);
            delete this.runingSockets[name];
            if (this._needReConnectSockets[name]) {
                delete this._needReConnectSockets[name];
            }
        }
    }


    export function sendMessage(coname, head, data?: any, reshead?: string, callback?: Function, target?: any) {
        var pro = null;
        if (reshead) {
            if (callback) {
                kaayou.getController(coname).onece(reshead, function (e: kaayou.Event) {
                    if (target) {
                        callback.apply(target, [e.data]);
                    } else {
                        callback(e.data);
                    }
                }, target);
                NetManager.getInstance().getSocket(coname).send({
                    msghead: head,
                    msgdata: data ? data : null
                });
                return pro;
            } else {
                pro = new Promise(function (resole, rejct) {
                    kaayou.getController(coname).onece(reshead, function (e: kaayou.Event) {
                        if (callback) {
                            if (target) {
                                callback.apply(target, [e.data]);

                            } else {
                                callback(e.data);
                            }
                            return;
                        }
                        resole(e.data);
                    }, target);
                    NetManager.getInstance().getSocket(coname).send({
                        msghead: head,
                        msgdata: data ? data : null
                    });
                });
                return pro;
            }

        } else {
            NetManager.getInstance().getSocket(coname).send({
                msghead: head,
                msgdata: data ? data : null
            });
        }
        return pro;

    }

}