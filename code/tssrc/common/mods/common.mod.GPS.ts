namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export namespace mod {
        export class GPS {
            static __INS__: common.mod.GPS = null;
            static getInstance(): common.mod.GPS {
                if (GPS.__INS__ == null) {
                    GPS.__INS__ = new GPS();
                    GPS.__INS__.initMod();
                }
                return GPS.__INS__;
            }

            @doBindEvent
            initMod() { }

            //@BindEvent("common", 'ws::Msg::userareabroadcast')
            getGPSInfo() {
                kaayou.DataSet.set("user::Map", "");
                kaayou.PlatformMgr.getInstance().map.GetMapInfo();

                return new Promise(function (resolve, reject) {
                    let times = 0;
                    let tid = setInterval(() => {
                        times++;
                        if (times > 5) {
                            clearInterval(tid);
                            reject("timeout");
                        } else {
                            let sMap = kaayou.DataSet.get("user::Map");
                            if (!!sMap) {
                                clearInterval(tid);
                                resolve(sMap);
                            }
                        }
                    }, 1000);
                }
                )
            }

            // @BindEvent("common", "mod::GPS::SetInfo")
            // async onGPSInfo(data) {
            //     console.log("收到了gps");
            //     kaayou.emit("common", "ui::Loading::Hide");
            // }
        }
    }
    common.mod.GPS.getInstance();
}