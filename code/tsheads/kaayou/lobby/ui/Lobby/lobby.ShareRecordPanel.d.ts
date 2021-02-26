declare namespace lobby {
    export class ShareRecordManager {
        static __INS__: ShareRecordManager;
        static getInstance(): ShareRecordManager;
        init(): boolean;
        __selfPanel: ShareRecordPanel;
        getPanel(create?: boolean): ShareRecordPanel;
    }
    class ShareRecordPanel extends kaayou.Layer {
        maskBg: cc.Layer;
        contentPanel: ccui.Layout;
        btn_wx: ccui.Button;
        btn_xx: ccui.Button;
        btn_xl: ccui.Button;
        btn_layout: ccui.Layout;
        share_data: any;
        constructor();
        initUI(): void;
        fullImagePath: string;
        ShareStatus: boolean;
        onImageShareClick(cb?: Function): void;
        onRecordImageShareClick(cb?: Function, data?: any): void;
        renderShareData(node: cc.Node): void;
        sii: number;
        setRenderTextureOfRecord(call: Function, data: any): void;
        setRenderTexture(cb?: Function): void;
        btnCall: Array<Function>;
        close_call: Function;
        type: number;
        Show(data: any): void;
        private _index;
        setIndex(index: number): void;
        getIndex(): number;
        Hide(): void;
    }
    export {};
}
