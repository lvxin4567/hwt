namespace common {

    export namespace mod {

        export interface EventQueueCall {
            data: any,
            func: Function,
            target: any,
            mname?: string,
            ename?: string
        }

        export class EventQueue {
            private _queueArray: Array<EventQueueCall> = null;
            constructor() {
                this._queueArray = [];
            }
            private _isCleaning = false;

            public clean() {
                this._isCleaning = true;
                this._queueArray = [];
                this._isCleaning = false;
            }

            public push(c: EventQueueCall) {
                if (!this._queueArray) {
                    this._queueArray = [];
                }
                this._queueArray.push(c);
            }

            public release() {
                if (this._t) {
                    clearInterval(this._t);
                    this._t = null;
                }
                this.clean();
            }

            _t = null;
            public start() {
                let self = this;
                this.release();
                this._t = setInterval(function () {
                    self._loop()
                }, 0);
            }

            // _bPostBugly = false;
            private _loop() {
                if (this._queueArray.length > 0) {
                    if (this._isCleaning) { return; }
                    let q: EventQueueCall = this._queueArray[0];
                    if (this._isCleaning) { return; }
                    try {
                        if (true === q.func.apply(q.target, [q.data])) {
                            if (this._isCleaning) { return; }
                            this._queueArray.shift();
                        }
                    } catch (err) {
                        if (this._isCleaning) { return; }
                        this._queueArray.shift();
                        if (/*this._bPostBugly == false && */err.name) {
                            // this._bPostBugly = true;
                            let message = err.message;
                            if (cc.sys.isNative) {
                                if (typeof message == 'string') {
                                    if (!message) { message = "no message"; }
                                } else if (typeof message == 'object') {
                                    try {
                                        message = JSON.stringify(message, null, 2);
                                    } catch (er) {
                                        message = "err message object";
                                    }
                                } else {
                                    message = "no message";
                                }

                                let stack = err.stack;
                                if (typeof stack == 'string') {
                                    if (!stack) { stack = "no stack"; }
                                } else if (typeof stack == 'object') {
                                    try {
                                        stack = JSON.stringify(stack, null, 2);
                                    } catch (er) {
                                        stack = "err stack object";
                                    }
                                } else {
                                    stack = "no stack";
                                }
                                let mname = q.mname || "[no mname]";
                                let ename = q.ename || "[no ename]";
                                console.error("event queue err :" + kaayou.getLobbyVersion(), `${mname} ${ename} ${message}`, stack);
                                let sname = kaayou.UIManager.getInstance().getCurRuningSceneName();
                                if (sname != "LOBBY") {
                                    kaayou.PlatformMgr.getInstance().sys.PostBugly("SubgameName:" + sname + "SubGameVersion:" + kaayou.getSubGameVersion(sname.toLowerCase()) + "LobbyVersion:" + kaayou.getLobbyVersion(), `${mname} ${ename} ${message}`, stack);
                                } else {
                                    kaayou.PlatformMgr.getInstance().sys.PostBugly("LobbyVersion:" + kaayou.getLobbyVersion(), `${mname} ${ename} ${message}`, stack);
                                }
                            } else {
                                console.error(err);
                            }

                            let options = {
                                msg: "系统检测到异常，点击确定后自动重启！\n\n  *." + message,
                                close: { isShow: true },
                                btns: [
                                    {
                                        name: "确定",
                                        action: function () {
                                            if (!cc.sys.isNative) {
                                                if (window && window.location) {
                                                    window.location.reload();
                                                }
                                            } else {
                                                cc.game.restart();
                                            }
                                        },
                                        colorType: 'yellow'
                                    }
                                ]
                            }
                            let configData = common.mod.Config.GetAppConfig();
                            if (configData && configData.isDebug == 'true') {
                                kaayou.emit('common', 'ui::Dialog::Show', options);
                            }
                        }
                    }
                }
            }
        }

    }



}