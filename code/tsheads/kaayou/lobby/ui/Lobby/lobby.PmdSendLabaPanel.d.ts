declare namespace lobby {
    class PmdSendLabaPanelMgr {
        static __INS__: PmdSendLabaPanelMgr;
        static getInstance(): PmdSendLabaPanelMgr;
        __selfPanel: PmdSendLabaPanel;
        _gold: number;
        onUpdateUserInfo(data: Data_Uerinfo): void;
        init(): boolean;
        getPanel(create?: boolean): PmdSendLabaPanel;
    }
    class PmdSendLabaPanel extends kaayou.Layer {
        constructor();
        maskBg: cc.Layer;
        contentPanel: ccui.Layout;
        btn_close: ccui.Button;
        btn_send_laba: ccui.Button;
        edx_laba: ccui.TextField;
        text_expend_score: ccui.Text;
        ScrollView_History: ccui.ScrollView;
        History_panel: ccui.Layout;
        text_name: ccui.Text;
        text_info: ccui.Text;
        announcement_msg: Array<string>;
        str_name: Array<string>;
        mug_num: number;
        initUI(): void;
        onConfigUpdate(): void;
        sendPmdConfirm(): void;
        ShowPmdHistory(): void;
        Show(): void;
        Show2(data: {
            PmdArray: string;
        }): void;
        Show1(data: {
            PmdArray: string;
        }): void;
        cleanEditBoxString(ref: ccui.TextField): void;
        Hide(): void;
    }
}
