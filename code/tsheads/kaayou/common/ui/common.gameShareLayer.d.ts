declare namespace common {
    class gameShareLayer extends kaayou.Layer {
        btn_wx: ccui.Button;
        btn_xl: ccui.Button;
        btn_dd: ccui.Button;
        btn_xx: ccui.Button;
        btn_qyq: ccui.Button;
        btn_layout: ccui.Layout;
        type: number;
        private ShareStatus;
        constructor(type: number);
        initUI(type: number): void;
        onInvite(e: any): Promise<void>;
        onShareBtn(): void;
        onShareClose(): void;
        fullPath: string;
        setRenderTexture(): void;
        onShare(e: any): void;
        setShareStatus(v: boolean): void;
        getShareStatus(): boolean;
    }
}
