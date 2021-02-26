namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export namespace mod {
        export class HouseSet {
            static __INS__: tea.mod.HouseSet = null;
            static getInstance(): tea.mod.HouseSet {
                if (HouseSet.__INS__ == null) {
                    HouseSet.__INS__ = new HouseSet();
                    HouseSet.__INS__.initMod();
                }
                return HouseSet.__INS__;
            }
            _data:any[]=[];
            pageStart:number=0;
            @doBindEvent
            initMod() { }

            //获取亲友圈消息
            @BindEvent("tea","mod::HouseSet::GetMessage")
            async getMessage(data) {
                // kaayou.emit("common","ui::Loading::Show");
                // if(data.clear){
                //     this.pageStart=0;
                //     this._data=[];
                // }
                // let sdata :proto_housemsg = {
                //     hid:tea.mod.__teaHouseInfo.hid,
                //     start:this.pageStart,
                //     end:this.pageStart+10,//这个接口是0-10
                // }
                // let info:proto_housemsg_res[]  = await kaayou.sendMessage("lobby",HouseSetHead.housemsg, sdata, kaayou.MakeResultMessageHead(HouseSetHead.housemsg));
                // kaayou.emit("common","ui::Loading::Hide");
                // if (info["errcode"]) {
                //     kaayou.emit("common","ui::Toast::Show", { msg: info["msg"] || "查询失败！" });
                //     return;
                // }
            
            }
        }
    }
    tea.mod.HouseSet.getInstance();
}