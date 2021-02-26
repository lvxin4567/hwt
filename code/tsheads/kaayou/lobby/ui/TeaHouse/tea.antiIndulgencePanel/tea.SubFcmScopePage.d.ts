declare namespace tea {
    class SubFcmScopePage {
        _page: cc.Node;
        _index: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        reset(): void;
        bAdminAdjust: boolean;
        bAdminVisible: boolean;
        bSwitch: boolean;
        btnBigWinAdd: ccui.Button;
        btnBigWinSub: ccui.Button;
        btnMinAdd: ccui.Button;
        btnMinSub: ccui.Button;
        btnPerAdd: ccui.Button;
        btnPerSub: ccui.Button;
        btnSave: ccui.Button;
        ebBigWin: ccui.TextField;
        ebMin: ccui.TextField;
        ebPer: ccui.TextField;
        iBigWin: number;
        imgOff: string;
        imgOn: string;
        iPer: number;
        ivAdminAdjust: ccui.ImageView;
        ivAdminVisible: ccui.ImageView;
        ivSwitch: ccui.ImageView;
        lbBigWin: ccui.Text;
        lbPer: ccui.Text;
        doAdminAdjustChange(): void;
        doAdminVisiableChange(): void;
        doSwitchChange(): void;
        initWidthNode(pageMem: cc.Node, cellMod: ccui.Widget): void;
        onAdminVisibleChange(e: kaayou.CheckEvent): void;
        onSwitchChange(e: kaayou.CheckEvent): void;
        Show(): void;
    }
}
