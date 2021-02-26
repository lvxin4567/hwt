namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export namespace mod {
        export class HouseMessage {
            static __INS__: tea.mod.HouseMessage = null;
            static getInstance(): tea.mod.HouseMessage {
                if (HouseMessage.__INS__ == null) {
                    HouseMessage.__INS__ = new HouseMessage();
                    HouseMessage.__INS__.initMod();
                }
                return HouseMessage.__INS__;
            }
            _data:any[]=[];
            pageStart:number=0;
            @doBindEvent
            initMod() { }

            //获取亲友圈消息
            @BindEvent("tea","mod::TeaHouse::GetMessage")
            async getMessage(data) {
                kaayou.emit("common","ui::Loading::Show");
                if(data.clear){
                    this.pageStart=0;
                    this._data=[];
                }
                let sdata :proto_housemsg = {
                    hid:tea.mod.__teaHouseInfo.hid,
                    start:this.pageStart,
                    end:this.pageStart+10,//这个接口是0-10
                }
                let info:proto_housemsg_res[]  = await kaayou.sendMessage("lobby",houseMessageHead.housemsg, sdata, kaayou.MakeResultMessageHead(houseMessageHead.housemsg));
                kaayou.emit("common","ui::Loading::Hide");
                if (info["errcode"]) {
                    kaayou.emit("common","ui::Toast::Show", { msg: info["msg"] || "查询失败！" });
                    return;
                }
                if(!!info){
                    if (info.length == 0) {
                        kaayou.emit("common", 'ui::Toast::Show', { msg: "没有更多数据！" });
                        return;
                    }
                    for(let i=0;i<info.length;++i){
                        let row=info[i];
                        this._data.push(row);
                    }
                    this.pageStart+=info.length;
                    kaayou.emit("tea","ui::TeaHouse::ShowMessage", this._data);                  
                }
            }
        }
    }
    tea.mod.HouseMessage.getInstance();
}