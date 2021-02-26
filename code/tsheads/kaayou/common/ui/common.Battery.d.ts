declare namespace common {
    class Battery extends kaayou.Block {
        bProgress: ccui.LoadingBar;
        imageCharge: ccui.ImageView;
        Text_ping: ccui.Text;
        Text_ping_num: ccui.Text;
        saveLevel: number;
        level: number;
        pingData: {
            wsname: string;
            ms: number;
        };
        initUi(node: ccui.Widget, pos?: cc.Point): void;
        bindEvent(): void;
        cleanUp(): void;
        timer: number;
        onUpdate(): void;
        showBattery(batteryData: {
            msg: {
                level: string;
                state: string;
            };
        }): void;
        showPing(pingData: {
            wsname: string;
            ms: number;
        }): void;
        playChargingAnim(): void;
    }
}
