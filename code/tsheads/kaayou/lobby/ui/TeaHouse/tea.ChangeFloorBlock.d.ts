declare namespace tea {
    class ChangeFloorBlock extends kaayou.Layer {
        constructor();
        _level: number;
        _fidArr: Array<number>;
        bMix: boolean;
        btnAdd: ccui.Button;
        currentFloorId: number;
        downFloorId: number;
        btn_down: ccui.Button;
        btn_up: ccui.Button;
        floorGrpup: ccui.Layout;
        floorNum: cc.Label;
        upFloorId: number;
        auth(): void;
        initUI(): void;
        onFloorUpdate(data: {
            hasrole: boolean;
            data: FloorUpdateInfo;
            showToast?: boolean;
        }): void;
        checkUpAndDown(data: any): void;
        doSetAllEnabled(b: any): void;
    }
}
