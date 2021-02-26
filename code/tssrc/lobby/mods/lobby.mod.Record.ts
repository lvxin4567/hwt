namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export namespace mod {
        export class RecordMod {
            pageStart: number = 0;
            _data: any[] = [];
            static __INS__: lobby.mod.RecordMod = null;
            static getInstance(): lobby.mod.RecordMod {
                if (RecordMod.__INS__ == null) {
                    RecordMod.__INS__ = new RecordMod();
                    RecordMod.__INS__.initMod();
                }
                return RecordMod.__INS__;
            }

            @doBindEvent
            initMod() { }

            //请求战绩房间面板
            @BindEvent('lobby', "mod::Record::GetRecord")
            async getRecord(data: { start: number, end: number, clear: boolean }) {
                kaayou.emit('common', "ui::Loading::Show");
                if (data.clear) {
                    this.pageStart = 0;
                    this._data = [];
                }
                let sendData = {
                    clear: data.clear,
                    end: data.end,
                    pbegin: this.pageStart,
                    pend: this.pageStart + 9,
                    start: data.start
                };

                let res = await kaayou.sendMessage('lobby', "gamerecord", sendData, "ws::Msg::gamerecord");
                kaayou.emit('common', 'ui::Loading::Hide');
                if (res.errcode) {
                    kaayou.emit('lobby', 'ui::Dialog::Show', {
                        msg: res.msg || "获取战绩列表失败！", btns: [{
                            name: "确定",
                        }]
                    })
                    return;
                }
                if (!!res) {
                    if (res.length == 0) {
                        kaayou.emit("common", 'ui::Toast::Show', { msg: "没有数据！" });
                        return;
                    }
                    for (let i = 0; i < res.length; ++i) {
                        let row = res[i];
                        this._data.push(row);
                    }
                    this.pageStart += res.length;

                    kaayou.emit('lobby', 'ui::RePlay::Show', this._data);
                    kaayou.DataSet.set('Record::isBack', JSON.stringify(this._data));
                }
            }

            //请求战绩房间详情数据
            // @BindEvent('lobby', "mod::Record::GetRecordDetails")
            // async getRecordDetails(data: { gamenum: string }) {
            //     kaayou.emit('common', "ui::Loading::Show");
            //     let res = await kaayou.sendMessage('lobby', "gamerecordinfo", data, "ws::Msg::gamerecordinfo");
            //     kaayou.emit('common', 'ui::Loading::Hide');
            //     if (res.errcode) {
            //         kaayou.emit('lobby', 'ui::Dialog::Show', {
            //             msg: res.msg || "获取战绩详情失败！", btns: [{
            //                 name: "确定",
            //             }]
            //         })
            //         return;
            //     }
            //     kaayou.emit('lobby', 'ui::RePlayDetails::Show', res);
            //     kaayou.DataSet.set('ReCordDetails::isBack', JSON.stringify(res));
            // }
            
            
            @BindEvent("lobby", 'mod::Record::GetRecordAllDetail')
            async doGetRecordDetail(data) {
            
                kaayou.emit("common", "ui::Loading::Show");
                // let info = await kaayou.sendMessge("gamerecordinfo", data, "ws::Msg::gamerecordinfo");
                let result = await kaayou.sendMessage("lobby", "gamerecordinfo", data, "ws::Msg::gamerecordinfo");
                kaayou.emit("common", "ui::Loading::Hide");
                if (result.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: result.msg || "获取列表失败！" });
                    return;
                }

                let info = result;
                var recorddetail = {
                    gname: data.gname || "",
                    floorindex:info.floorindex || 0,
                    gamenum: info.gamenum,
                    kindid: info.kindid,
                    roomid: info.roomid,
                    time: info.time,
                    totalround:info.totalround || 0,
                    totallist:[],
                    list: []
                }
                let mapUser = {};
                for (let x in info.userArr) {

                    mapUser[info.userArr[x].uid] = {
                        nickname: info.userArr[x].nickname,
                        imgurl: info.userArr[x].imgurl,
                        sex: info.userArr[x].sex
                    }

                    recorddetail.totallist.push(lodash.clone(info.userArr[x]));
                }

                // var recorddetail: ITH_RECORD_DETAIL_ITEM[] = [];
                for (var x in info.scoreArr) {
                    let item: ITH_RECORD_DETAIL_ITEM = {
                        player: [],
                        replayid: info.scoreArr[x].iReplayid,
                        starttime: info.scoreArr[x].starttime,
                        endtime: info.scoreArr[x].endtime
                    }
                    //lw200428每一小局座位可能会变
                    for (var y in info.userArr) {
                        let uid = info.scoreArr[x].uids[y];
                        let itplayer = {
                            uid: uid,
                            "nickname": mapUser[uid].nickname,
                            headurl: mapUser[uid].imgurl,
                            "sex": mapUser[uid].sex,
                            "score": info.scoreArr[x].score[y] || 0,
                        }
                        item.player.push(itplayer);
                    }
                    recorddetail.list.push(item)
                }

                //kaayou.emit('ui::TeaHouse::Record::UpdateRecordDetail', recorddetail);
                // kaayou.DataSet.set("tea::HouseRecordDetail", JSON.stringify(recorddetail));
                kaayou.emit("lobby", 'ui::recordDetailDialog::Show', recorddetail);
            }


        
            //请求战绩房间详情数据
            @BindEvent('lobby', "mod::Record::GetRecordInfo")
            async getRecordInfo(data: { moduleName: string, replayid: string, call: Function }) {

                if (!data) { return; }
                if (!data.moduleName) { return; }
                if (!data.call) { return; }
                if (!data.replayid) { return; }
                let { moduleName, call, replayid } = data;

                var self = this;
                let temp = {
                    "head": "getreplay",
                    "data": JSON.stringify({ replayid: replayid }),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }

                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }

                let url = common.mod.Config.AppConfig.recordUrl;

                let res = <string>await kaayou.Http.POST(url + '/service', { msgdata: JSON.stringify(temp) });
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);

                if (!msg || msg.errcode != 0) {
                    let options = {
                        msg: msg?msg.data:"没有查询到回放数据，请与GM联系",
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    kaayou.emit(moduleName, "ui::RunSceneError");
                                },
                                colorType: 'green'
                            },
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                    return;
                }
                call && call(msg.data);
            }

            //回放码验证，成功后跳转
            @BindEvent('lobby', "mod::Record::RunData")
            async getRunData(data: { replayid: string }) {
                if (data.replayid.length < 1) { return; }
                let res = await kaayou.sendMessage('lobby', "checkreplayid", data, "ws::Msg::checkreplayid");
                if (res.errcode) {
                    kaayou.emit('lobby', 'ui::Dialog::Show', {
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
                }
                kaayou.DataSet.set("game::config", JSON.stringify(tempRes));
                ///跳转回放场景  写下面

                //从回放或者查看他人回放返回战绩界面的判断
                if (kaayou.DataSet.get('Record::isBack') && kaayou.DataSet.get('ReCordDetails::isBack')) {
                    let data_record = kaayou.DataSet.get('Record::isBack');
                    let data_recorddetails = kaayou.DataSet.get('ReCordDetails::isBack');

                    kaayou.DataSet.set('ReCord::DataIsBack', data_record);
                    kaayou.DataSet.set('ReCordDetails::DataIsBack', data_recorddetails);
                }
                else if (kaayou.DataSet.get('Record::isBack') && !kaayou.DataSet.get('ReCordDetails::isBack')) {
                    let data_record = kaayou.DataSet.get('Record::isBack');

                    kaayou.DataSet.set('ReCord::DataIsBack', data_record);
                }

                kaayou.emit('lobby', "mod::Room::inReCordSence", { kindid: tempRes.kindid })

            }
        }
    }

    lobby.mod.RecordMod.getInstance();
}