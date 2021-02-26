declare namespace tea {
    class tea_FortuneWheelMgr {
        static __INS__: tea_FortuneWheelMgr;
        static getInstance(_zOrder?: number): tea_FortuneWheelMgr;
        _zOrder: number;
        __selfPanel: FortuneWheel;
        init(): boolean;
        getPanel(create?: boolean): FortuneWheel;
    }
    class FortuneWheel extends kaayou.ModelLayer {
        constructor();
        btnClose: ccui.Button;
        btn_start: ccui.Button;
        wheel_light: ccui.Layout;
        txt_time_start: ccui.Text;
        txt_time_end: ccui.Text;
        txt_coin_count: ccui.Text;
        txt_game_count: ccui.Text;
        txt_game_coin: ccui.Text;
        record_list: ccui.ScrollView;
        record_item: ccui.Layout;
        tab_btn1: ccui.ImageView;
        tab_btn2: ccui.ImageView;
        cursor: ccui.ImageView;
        panel1: ccui.Layout;
        panel2: ccui.Layout;
        btn_start_dis: ccui.Button;
        linerAnimate: any;
        _task: any[];
        _rank: number;
        private rewardAngle;
        startTime: number;
        endTime: number;
        lockTime: number;
        initUI(): void;
        resetWheelStatus(): void;
        frame: number;
        lock: boolean;
        update(dt: any): void;
        private _info;
        private status;
        rank(r: any): "一等奖" | "二等奖" | "三等奖" | "四等奖" | "五等奖" | "六等奖" | "七等奖" | "八等奖" | "未中奖";
        RunWheel(): void;
        intistatus(): void;
        playWheel(): Promise<unknown>;
        pullRecord(): Promise<void>;
        pullInfo(): Promise<void>;
        setEnableWheel(bool: boolean): void;
        setInfo(info: any): void;
        updateWheel(): void;
        private ErrorMsg;
        pullStatus(): Promise<void>;
        Show({ actstartime, actendime, actid }: {
            actstartime: any;
            actendime: any;
            actid: any;
        }): void;
        Hide(): void;
    }
}
