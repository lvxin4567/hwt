declare namespace lobby {
    interface ICreateRoomParam {
        kindId: number;
        lastRule: any;
        name: string;
        package_key: string;
        rule: string;
        ruleVersion: number;
        timelimit_free: boolean;
    }
    export class CreateRoomPanelMgr {
        static __INS__: CreateRoomPanelMgr;
        static getInstance(_zOrder?: number): CreateRoomPanelMgr;
        __selfPanel: CreateRoomPanel;
        _gold: number;
        _zOrder: number;
        onUpdateUserInfo(data: Data_Uerinfo): void;
        init(): boolean;
        getPanel(create?: boolean): CreateRoomPanel;
    }
    export class CreateRoomPanel extends kaayou.ModelLayer {
        menuPanel: ccui.ScrollView;
        constructor();
        btn_close: ccui.Button;
        btn_create: ccui.Button;
        btn_download: ccui.Button;
        btn_save: ccui.Button;
        cbIP: ccui.CheckBox;
        label_package_version: ccui.Text;
        lbFloor: ccui.Text;
        menu_cell_model: ccui.CheckBox;
        rDom_UILayout: common.RDom.UILayout;
        ip_checkbox: ccui.Layout;
        tip_CheckBox: ccui.Button;
        tipImage_CheckBox: ccui.ImageView;
        tip_Layout: ccui.ImageView;
        game_tip: ccui.Layout;
        initUI(): void;
        getModuleName(): string;
        bindUIEvents(): void;
        onButtonCreateClicked(): void;
        __createCallFunc: (data: {
            kindid: number;
            configData: any;
            ruleVersion: number;
        }) => void;
        __saveCallFunc: (data: {
            kindid: number;
            configData: any;
            ruleVersion: number;
        }) => void;
        Show(data: {
            list: Array<ICreateRoomParam>;
            call: (data: {
                kindid: number;
                configData: any;
                ruleVersion: number;
            }) => void;
            frozen: boolean;
            issave: boolean;
            isnoclose: boolean;
            fristkind: number;
        }): void;
        showGameRule(): Promise<void>;
        private _data;
        onUpdateGameListAndRule(data: Array<ICreateRoomParam>): void;
        _fristkind: number;
        _kindID: number;
        _ruleVersion: number;
        _package_key: string;
        _frozen: boolean;
        _issave: boolean;
        _isdown: boolean;
        onChange(e: kaayou.CustomEvent): void;
        isDownload(): boolean;
        doCheckSubgame(package_key: string): void;
        Hide(): void;
    }
    export {};
}
