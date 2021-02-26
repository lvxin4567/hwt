declare namespace tea {
    interface Data_PropotionConfigChangeItem {
        "createdat": number;
        "optfloorindex": number;
        "optfloorname": string;
        "optinfo": string;
        "optusertype": string;
    }
    export class tea_propotionConfigChangeDialogMgr {
        static __INS__: tea_propotionConfigChangeDialogMgr;
        static getInstance(_zOrder?: number): tea_propotionConfigChangeDialogMgr;
        _zOrder: number;
        __selfDialog: PropotionConfigChangeDialog;
        init(): boolean;
        getPanel(create?: boolean): PropotionConfigChangeDialog;
    }
    export class PropotionConfigChangeDialog extends kaayou.Layer {
        constructor();
        private listNode;
        private closeNode;
        private item;
        private SV_pullList;
        private label_player_name;
        private label_player_id;
        private uid;
        initUI(): void;
        cleanList(): void;
        pullConfigList({ uid }: {
            uid: any;
        }): Promise<void>;
        Show(data: any): void;
        Hide(): void;
    }
    export class PropotionConfigChangeItem extends kaayou.Block implements common.IPullListCell {
        node: cc.Node;
        private index;
        label_time: ccui.Text;
        label_op_user: ccui.Text;
        lable_op_floor: ccui.Text;
        label_op_floorname: ccui.Text;
        label_op_result: ccui.Text;
        initUI(item: cc.Node): void;
        reset(): void;
        private _info;
        setInfo(info: Data_PropotionConfigChangeItem): void;
        timeformat(time: any): string;
        floorFormat(i: any): string;
        getInfo(): Data_PropotionConfigChangeItem;
        setIndex(index: number): void;
        getIndex(): number;
    }
    export {};
}
