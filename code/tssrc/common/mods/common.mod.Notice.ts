
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export namespace mod {

        export class Notice {
            static __INS__: common.mod.Notice = null;
            static getInstance(): common.mod.Notice {
                if (Notice.__INS__ == null) {
                    Notice.__INS__ = new Notice();
                    Notice.__INS__.initMod();
                }
                return Notice.__INS__;
            }

            @doBindEvent
            initMod() { }

            //玩家发送的跑马灯
            private _playsendnotice = null;
            //@BindEvent("common", 'ws::Msg::userareabroadcast')
            onPlaySendNotice(data) {
                console.log("userareabroadcast", data);
                this._playsendnotice = data;

                if (lodash.isEmpty(this._playsendnotice) || data.errcode) {
                    //kaayou.emit('common', 'ui::PmdSendLabaPanel::Show2', { PmdArray: [] });
                    return;
                }

                let pmdStr = [];
                pmdStr.push(this._playsendnotice.nickname);
                pmdStr.push(this._playsendnotice.content);
                kaayou.emit('common', 'ui::GamePmdBlock::Show', { PmdArray: pmdStr, type: 1 });
            }
        }
    }
    common.mod.Notice.getInstance();
}