/// <reference path="./protos/notice.proto.ts" />
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export interface INoticeData {
        "tag": string;
        "id": number,
        "kind_id": number, //0 就是没有
        "content_type": number, //1 文字公告  2 图片公告
        "image": string;//"",
        "content": string;// "通融通融拖若拖拖拖拖拖拖拖拖",
        "position_type": 1,
        "show_type": number//2, 1 每日显示一次  2 登录显示  3 通用
        "start_at": string;//"2019-07-23 16:00:00",
        "end_at": string;//"2019-07-25 19:55:00"
    }

    export namespace mod {
        export class Notice {
            static __INS__: lobby.mod.Notice = null;
            static getInstance(): lobby.mod.Notice {
                if (Notice.__INS__ == null) {
                    Notice.__INS__ = new Notice();
                    Notice.__INS__.initMod();
                }
                return Notice.__INS__;
            }
            @doBindEvent
            initMod() { }
            private __onceNotice: any = null;
            //获取公告
            @BindEvent("lobby", 'mod::Notice::getList')
            async getList(data: { call: Function }) {
                let c = data.call || null;

                let res = await kaayou.sendMessage('lobby', NoticeMessageHead.dialognoticelist, {}, kaayou.MakeResultMessageHead(NoticeMessageHead.dialognoticelist));
                if (res.errcode) {
                    kaayou.emit('common', 'ui::Dialog::Show', {
                        msg: res.msg || "获取公告失败！"
                    })
                    return;
                }
                c && c(res);
            }

            //维护公告
            private __maintainNotice = null
            @BindEvent("lobby", kaayou.MakeResultMessageHead(NoticeMessageHead.maintainnotice))
            onMaintainnotice(data) {
                console.log("maintainnotice", data);
                this.__maintainNotice = data;
                this.emitMaintainNotice();
            }
            emitMaintainNotice() {

                if (lodash.isEmpty(this.__maintainNotice)) {
                    return;
                }

                kaayou.emit('lobby', 'ui::Maintain::Show', { msg: this.__maintainNotice.content, code: this.__maintainNotice.errcode });

            }


            //跑马灯公告
            private __marqueenotice = null;
            @BindEvent("lobby", kaayou.MakeResultMessageHead(NoticeMessageHead.marqueenotice))
            onMarqueenotice(data) {
                console.log("marqueenotice", data);
                this.__marqueenotice = data;
                this.emitMarqueenotice();
            }

            //玩家发送的跑马灯
            private _playsendnotice = null;
            @BindEvent("lobby", kaayou.MakeResultMessageHead(NoticeMessageHead.userareabroadcast))
            onPlaySendNotice(data) {
                console.log("userareabroadcast", data);
                this._playsendnotice = data;

                if (lodash.isEmpty(this._playsendnotice) || data.errcode) {
                    kaayou.emit('lobby', 'ui::PmdSendLabaPanel::Show2', { PmdArray: [] });
                    return;
                }

                let pmdStr = [];

                pmdStr.push(this._playsendnotice.nickname);
                pmdStr.push(this._playsendnotice.content);

                kaayou.DataSet.set('pmdMsg', JSON.stringify(pmdStr));
                kaayou.emit('lobby', 'ui::Pmd::Show', { PmdArray: pmdStr, type: 1 });
                kaayou.emit('lobby', 'ui::PmdSendLabaPanel::Show2', { PmdArray: pmdStr });
            }

            @BindEvent("lobby", "mod::Notice::doSendPmd")
            async onSendPmd(data: { content: string }) {
                let info = await kaayou.sendMessage('lobby', NoticeMessageHead.userareabroadcast, data, kaayou.MakeResultMessageHead(NoticeMessageHead.userareabroadcast));
                if (!info) {
                    console.error("发送失败，请稍后再试");
                    return;
                }
                if (info.errcode) {
                    console.error("发送失败，请稍后再试");
                    return;
                }
            }

            emitMarqueenotice() {
                if (lodash.isEmpty(this.__marqueenotice)) {
                    kaayou.emit('lobby', 'ui::Pmd::Show', { PmdArray: [] });
                    return;
                }
                let pmdArr = [];
                for (let i = 0; i < this.__marqueenotice.length; i++) {
                    pmdArr.push(this.__marqueenotice[i].content);
                }
                kaayou.DataSet.set('pmdMsg', JSON.stringify(pmdArr));
                kaayou.emit('lobby', 'ui::Pmd::Show', { PmdArray: pmdArr, type: 0 });
                kaayou.emit('lobby', 'ui::PmdSendLabaPanel::Show1', { PmdArray: pmdArr });

            }

            @BindEvent("lobby", kaayou.MakeResultMessageHead(NoticeMessageHead.hotupdate_ntf))
            onHotupdateNotice(data) {
                if (!!data) {
                    let version = data.version;
                    common.mod.HotUpdate.checkNeedUpdate(version);
                }
            }
        }
    }
    lobby.mod.Notice.getInstance();
}