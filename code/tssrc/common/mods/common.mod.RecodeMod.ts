
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export namespace mod {

        export class ReCodeMod {
            static __INS__: common.mod.ReCodeMod = null;
            static getInstance(): common.mod.ReCodeMod {
                if (ReCodeMod.__INS__ == null) {
                    ReCodeMod.__INS__ = new ReCodeMod();
                    ReCodeMod.__INS__.initMod();
                }
                return ReCodeMod.__INS__;
            }

            @doBindEvent
            initMod() { }
            //回放码验证，成功后跳转
            @BindEvent("common","mod::Record::RunData")
            async getRunData(data: { replayid: string }) {
                if (data.replayid.length < 1) { return; }
                // let res = await kaayou.sendMessge("checkreplayid", data, "ws::Msg::checkreplayid");
                let res = await kaayou.sendMessage("lobby", "checkreplayid", data, "ws::Msg::checkreplayid");
                if (res.errcode) {
                    kaayou.emit("common",'ui::Dialog::Show', {
                        msg: res.msg || "回放码错误！！"
                    })
                    return;
                }
                let tempRes = {
                    id: "",
                    gameid: "",
                    kindid: res.kindid,
                    ip: "",
                    replayid: Number(data.replayid),
                    pakeageKey:res.pkgkey,
                }
                kaayou.DataSet.set("game::config", JSON.stringify(tempRes));
                ///跳转回放场景  写下面


                //从回放或者查看他人回放返回战绩界面的判断
                if (kaayou.DataSet.get('Record::isBack') && kaayou.DataSet.get('ReCordDetails::isBack')) {
                    let data_recode = kaayou.DataSet.get('Record::isBack');
                    let data_recodedetails = kaayou.DataSet.get('ReCordDetails::isBack');

                    kaayou.DataSet.set('ReCord::DataIsBack', data_recode);
                    kaayou.DataSet.set('ReCordDetails::DataIsBack', data_recodedetails);
                }
                else if (kaayou.DataSet.get('Record::isBack') && !kaayou.DataSet.get('ReCordDetails::isBack')) {
                    let data_recode = kaayou.DataSet.get('Record::isBack');

                    kaayou.DataSet.set('ReCord::DataIsBack', data_recode);
                }

                // kaayou.emit('lobby' , "mod::Room::inReCordSence", { kindid: tempRes.kindid })

                // kaayou.LobbyToGame('xtmj');
                kaayou.LobbyToRecord(tempRes.pakeageKey);
                // if (res.kindid == 897 || res.kindid == 896) {
                //     kaayou.LobbyToRecord('cymj');
                // }else{
                //     kaayou.LobbyToRecord('jzmj');
                // }

            }
        }
    }
    common.mod.ReCodeMod.getInstance();
}