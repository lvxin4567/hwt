/// <reference path="./protos/mergeService.proto.ts" />
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export namespace mod {
        export class mergeService {    //大厅零散请求
            static __INS__: lobby.mod.mergeService = null;
            static getInstance(): lobby.mod.mergeService {
                if (mergeService.__INS__ == null) {
                    mergeService.__INS__ = new mergeService();
                    mergeService.__INS__.initMod();
                }
                return mergeService.__INS__;
            }
            @doBindEvent
            initMod() { }

            //获取公告
            @BindEvent("lobby", 'mod::CustomService::GetList')
            async getList() {
                let res = await kaayou.sendMessage('lobby', mergeServiceHead.areacswx, {}, kaayou.MakeResultMessageHead(mergeServiceHead.areacswx));
                if (res.errcode) {
                    kaayou.emit('common', 'ui::Dialog::Show', {
                        msg: res.msg || "获取客服信息失败！"
                    })
                    return;
                }
                kaayou.emit("lobby", 'ui::CustomService::ShowData', res);
            }

            //获取邀请码人的信息
            @BindEvent("lobby", 'mod::mergeService::GetBindPersonInfo')//
            async GetBindPersonInfo(data: { code: string }) {
                kaayou.emit("common", "ui::Loading::Show");
                let sData: proto_housejoinbypcode = { code: data.code }
                let res = await kaayou.sendMessage('lobby', mergeServiceHead.housejoinbypcode, sData, kaayou.MakeResultMessageHead(mergeServiceHead.housejoinbypcode));
                kaayou.emit("common", 'ui::Loading::Hide');
                if (res.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: res.msg || "创建楼层失败！" })
                    return;
                }
                kaayou.emit("lobby", "ui::lobbyBottomBindIDPanel::Hide")
                kaayou.emit("lobby", 'ui::BindInvitePanel::Show', res);
            }

            //统计金币场玩家点击数量
            @BindEvent("lobby", 'mod::mergeService::PlayerClickGold')//
            async onPlayerClickGold() {
                let res = await kaayou.sendMessage('lobby', mergeServiceHead.entergoldgame, {}, kaayou.MakeResultMessageHead(mergeServiceHead.housejoinbypcode));
            }
        }
    }
    lobby.mod.mergeService.getInstance();
}