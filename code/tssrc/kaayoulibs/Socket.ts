/// <reference path="decorator.ts" />
namespace kaayou {
    let { doBindEvent, BindEvent, CustomBindEvetn } = kaayou._decorator;
    export class kaWebSocket {

        /////1111
        private ws: WebSocket = null;
        // onconnect: (id: number) => void = null;
        // onmessage: (id: number, mid: number, sid: number, data: any, datalen: number) => void = null;
        // onclose: (id: number) => void = null;
        // ondisconnect: (id: number) => void = null;
        // onreconnect: (id: number) => void = null;
        name: string = "";
        constructor(name: string) {
            this.name = name;
            // this.init();
        }
        _conConfig: { ip: string, port: number, path?: string } = null;
        _resUrl: string = "";
        public doReconnect() {
            if (this.name != "lobby") {
                kaayou.emit(this.name, `ws::Msg::ping`, {wsname:this.name,ms:460});  
            }
            if (lodash.isEmpty(this._resUrl)) { return; }
            this.connect(this._resUrl);
        }
        public getconConfig() {
            return this._conConfig;
        }
        public doConnect(data: { ip: string, port: number, path?: string }) {
            this._conConfig = lodash.clone(data);
            let resUrl = `ws://${data.ip}:${data.port}/${data.path || ""}`;
            this.connect(resUrl);
        }
        public _isInitiative = false;
        public _isConnected = false;
        public getIsConnected() {
            return this._isConnected;
        }
        protected connect(resUrl: string) {

            this._isInitiative = false;
            this._isDoClose = false;
            this.__lastMsgTime = Date.unix();
            this._isConnected = true;
            this._resUrl = resUrl;
            if (this.ws) { return; }
            try {
                console.log(this.name + "socket 开始链接  " + resUrl);
                this.ws = new WebSocket(resUrl);
                this.ws.binaryType = 'arraybuffer';
                this.ws.onopen = this.__onOpen.bind(this);
                this.ws.onmessage = this.__onmessage.bind(this);
                this.ws.onclose = this.__onclose.bind(this);
                this.ws.onerror = this.__onError.bind(this)

            } catch (err) {
                kaayou.emit(this.name, "ws::onError", { name: this.name, err: err });
            }
        }
        private __onError(err, a) {
            kaayou.emit(this.name, "ws::onError", { name: this.name, err: err });
            if (this.name != "lobby") {
                kaayou.emit(this.name, `ws::Msg::ping`, {wsname:this.name,ms:460});  
            }
            // this.ws = null;
        }
        private __onOpen() {
            console.log(this.name + "socket 链接成功");
            kaayou.emit(this.name, "ws::onConnect", { name: this.name });
            this.__doPing();
        }
        private __t = null;
        private __delayT:number = 0;

        private __doPing() {
            let self = this;
            if (!this.isOpend()) { console.log("退出ping"); return; };
            this.send({ msghead: "ping" });
            if (!this.isOpend()) { console.log("退出ping"); return; }
            this.__delayT = new Date().getTime() / 1000;
            let pingTime = 0;
            pingTime = !!(this.name == "lobby")? 7000:5000;
            this.__t = setTimeout(function () {
                self.__doPing.apply(self);
            }, pingTime);
        }
        private __clearT() {
            if (this.__t) {
                try {
                    clearTimeout(this.__t);
                    if (this.name != "lobby") {
                        kaayou.emit(this.name, `ws::Msg::ping`, {wsname:this.name,ms:460});  
                    }
                    this.__t = null;
                } catch (e) { }
            }
            this.__t = null;
        }
        __lastMsgTime = 0;
        getLastTime() {
            return this.__lastMsgTime;
        }
        private __onmessage(e) {

            // console.log(e.data);

            // var buf = new Uint8Array(e.data);
            // var pdata = TextCoder.decode('utf8' , new Uint8Array(e.data)) ;
            let unit8Arr = new Uint8Array(e.data);
            let t = new Date().getTime() / 1000;
            let encodedString
            if(cc.sys.isNative)
                encodedString = String.fromCharCode.apply(null, unit8Arr);
            else
                encodedString = bigUnit8ToChar(unit8Arr);
            let pdata = decodeURIComponent(escape((encodedString)));//没有这一步中文会乱码
            kaayou.emit(this.name, "ws::onMessage", pdata);

            try {

                let res: Ka_MSG_RES = JSON.parse(pdata);
                if (typeof res != 'object') {
                    console.error("Ka_MSG_RES", pdata);
                    throw Error('message is not object');
                } // "object"  )
                let msghead = res.head;
                if (!msghead) {
                    console.error("Ka_MSG_RES", pdata);
                    throw Error('msghead is undefine');
                }

                if ("ping" !== msghead) {
                    console.log("sendMessage:接受" + this.name, msghead, res);
                } else {
                    // console.log(this.name , 'pong');
                }
                this.__lastMsgTime = Date.unix();

                if (msghead == 'forceclose') {
                    cc.log('强制解散');
                    this._isInitiative = true;
                    return;
                }
                let sign = res["msgsign"];
                if (sign.encode == 1) {
                    res.data = AES.decrypt(res.data);
                }
                if (res.errcode) {
                    console.error(res);
                    kaayou.emit(this.name, `ws::Msg::${msghead}`, { errcode: res.errcode, msg: res.data });
                    return;
                }

                let msgdata = null;
                if (res.data && lodash.isString(res.data) && res.data != 'null') {
                    msgdata = JSON.parse(res.data);
                } else {
                    msgdata = {};
                }
                kaayou.DataSet.set('time:offfset::time', (res.msgsign.time - t).toString());
                if (msghead == "ping") {   //通过ping来计算网络延时
                    msgdata = {wsname:this.name,ms:Math.ceil((t - this.__delayT)*1000)};
                }
                kaayou.emit(this.name, `ws::Msg::${msghead}`, msgdata);
            } catch (err) {
                console.error("Ka_MSG_RES_err", pdata);
                console.error(err);
                if (this.name != "lobby") {
                    kaayou.emit(this.name, `ws::Msg::ping`, {wsname:this.name,ms:460});  
                }
            }
            
            function bigUnit8ToChar(array){
                let res = '';
                //utf-8 最高会用到 3个8位进行记录 utf-16扩展可以最大到两个 0xff 65535 + 65535的组合   
                const  chunk = 4 * 3 * 1024;
                let i
                for (i = 0; i < array.length / chunk; i++) {
                res += String.fromCharCode.apply(null, array.slice(i * chunk, (i + 1) * chunk));
                }
                res += String.fromCharCode.apply(null, array.slice(i * chunk));
                return res;
            }

            // if (this.onmessage) {
            //     // let buf = new kaBuffer(e.data);
            //     // // let mid = buf.readUsort();
            //     // // let sid = buf.readUsort();
            //     // // let len = buf.readUint();
            //     // // buf.Offset = 10;

            //     // buf.Offset =0;
            //     // let mid = buf.readUsort();
            //     // let sid = buf.readUsort();
            //     // let len = buf.byteLength - 4;
            //     // let ub = new Uint8Array(buf.readByteArray(len))
            //     // this.onmessage(this.id, mid, sid, ub.buffer, len);
            // }
        }
        public isOpend() {
            if (!this.ws) { return false; }
            if (this._isDoClose) { return false; }
            return this.ws.readyState == WebSocket.OPEN;
        }
        public getInitiative(): boolean {
            return this._isInitiative;
        }

        public checkLife() {
            if (!this.ws) { return false; }
            if (this._isDoClose) { return false; }
            return this.ws.readyState == WebSocket.OPEN || this.ws.readyState == WebSocket.CONNECTING;
            // readonly CLOSED: number;
            // readonly CLOSING: number;
            // readonly CONNECTING: number;
            // readonly OPEN: number;
        }

        private __onclose(e) {
            cc.log(e);
            this.__clearT();
            //e.code
            // 1000          正常关闭       当你的会话成功完成时发送这个代码

            // 1001          离开           因应用程序离开且不期望后续的连接尝试而关闭连接时，发送这一代码。服务器可能关闭，或者客户端应用程序可能关闭

            // 1002          协议错误       当因协议错误而关闭连接时发送这一代码

            // 1003     不可接受的数据类型  当应用程序接收到一条无法处理的意外类型消息时发送这一代码

            // 1004          保留           不要发送这一代码。根据 RFC 6455，这个状态码保留，可能在未来定义

            // 1005          保留           不要发送这一代码。WebSocket API 用这个代码表示没有接收到任何代码

            // 1006          保留           不要发送这一代码。WebSocket API 用这个代码表示连接异常关闭

            // 1007          无效数据       在接收一个格式与消息类型不匹配的消息之后发送这一代码。如果文本消息包含错误格式的 UTF-8 数据，连接应该用这个代码关闭

            // 1008          消息违反政策    当应用程序由于其他代码所不包含的原因终止连接，或者不希望泄露消息无法处理的原因时，发送这一代码

            // 1009          消息过大        当接收的消息太大，应用程序无法处理时发送这一代码（记住，帧的载荷长度最多为64 字节。即使你有一个大服务器，有些消息

            // 也仍然太大。）

            // 1010          需要扩展        当应用程序需要一个或者多个服务器无法协商的特殊扩展时，从客户端（浏览器）发送这一代码

            // 1011          意外情况       当应用程序由于不可预见的原因，无法继续处理连接时，发送这一代码

            // 1015      TLS失败（保留） 不要发送这个代码。WebSocket API 用这个代码表示 TLS 在 WebSocket 握手之前失败。

            // 0 ～ 999        禁止              1000 以下的代码是无效的，不能用于任何目的

            // 1000 ～ 2999    保留              这些代码保留以用于扩展和 WebSocket 协议的修订版本。按照标准规定使用这些代码，参见表 3-4

            // 3000 ～ 3999   需要注册          这些代码用于“程序库、框架和应用程序”。这些代码应该在 IANA（互联网编号分配机构）公开注册

            // 4000 ～ 4999   私有             在应用程序中将这些代码用于自定义用途。因为它们没有注册，所以不要期望它们能被其他 WebSocket广泛理解


            console.log("socket已断开：" + this.name, JSON.stringify(e));
            kaayou.emit(this.name, "ws::onClose", this._isInitiative ? { name: this.name, code: 1000 } : { name: this.name, code: 2000 });
            this.ws = null;
            this._isDoClose = true;
        }
        public _isDoClose = false;
        public close(data?: { Initiative: boolean }) {
            this.__clearT();
            if (!this.ws) { return; }
            if (data) {
                this._isInitiative = !!data.Initiative;
            } else {
                this._isInitiative = false;
            }
            if (this._isInitiative) {
                this._isConnected = false;
            }
            this._isDoClose = true;
            this.ws.onopen = function () { };
            this.ws.onmessage = function () { };
            this.ws.onclose = function () { };
            this.ws.onerror = function () { };
            this.ws.close();
            this.ws = null;
            console.log("close socket:" + this.name, this._isInitiative);
            kaayou.emit(this.name, "ws::onClose", this._isInitiative ? { name: this.name, code: 1000 } : { name: this.name, code: 2000 });

        }

        public send(data: { msghead: string, msgdata?: any }) {

            if (!this.isOpend()) {
                console.log(`the ${this.name} socket is closed can not send message`)
                return;
            }

            if (!data) {
                console.error("message is undefine");
                return;
            }
            if (!data.msghead) {
                console.error("msghead is undefine");
                return;
            }
            if (data.msgdata) {
                console.log("socket发送的数据", data.msgdata);
            }

            try {
                let toData: { head: string, data?: string } = {
                    head: data.msghead
                }
                if (data.msgdata) {
                    toData.data = JSON.stringify(data.msgdata);
                }
                toData.data = AES.encrypt(toData.data);
                toData["msgsign"] = {
                    "time": new Date().getTime(),
                    "encode": 1
                }
                if ("ping" == toData.head) {
                    //console.log(this.name , 'ping' );
                } else {
                    console.log("sendMessage:发送" + this.name, toData, JSON.stringify(toData));
                }

                this.ws.send(JSON.stringify(toData));
            } catch (err) {

            }

            //  let buf = new kaBuffer(4 + len);
            //  buf.reset();
            // // buf.wirteSort(mid);
            // // buf.wirteSort(sid);
            // // buf.wirteUint(len);
            // // buf.Offset = 10;
            // // buf.wirteByteArray(buff, 0, len);
            // // buf.Offset = 4;
            // buf.wirteUSort(mid);
            // buf.wirteUSort(sid);
            // buf.wirteByteArray(buff, 0, len);

            // this.ws.send(buf.buffer);

            // cc.log(new Uint8Array(buf.buffer)); 
        }
    }



}