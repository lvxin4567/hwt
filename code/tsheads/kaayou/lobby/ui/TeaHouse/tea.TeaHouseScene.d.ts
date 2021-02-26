declare namespace tea {
    class TeaHouseScene extends kaayou.kScene {
        mask: ccui.Layout;
        constructor();
        bg_layout: ccui.Layout;
        initUI(): void;
        onConfigUpdate(data: Ka_APP_CONFIG): void;
        onTeaHouseClean(): void;
        capUroleChangeClean(): void;
        adminUroleChangeClean(): void;
        onTeaHouseExit(): void;
        dochangerFloorAnimation(data: {
            pos: cc.Point;
            msg: string;
        }): void;
        updateBg(): void;
    }
}
