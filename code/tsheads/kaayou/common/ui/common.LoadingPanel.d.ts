declare namespace common {
    class LoadingPanel extends kaayou.Layer {
        maskBg: ccui.Layout;
        loadNode: cc.Node;
        lbMsg: ccui.Text;
        dotLable: ccui.Text;
        call: Function;
        message: string;
        msgIndex: number;
        arrMessage: string[];
        addDot: boolean;
        toastCall: Function;
        Sprite_1: cc.Sprite;
        constructor();
        initUI(): void;
        show(data: {
            time: number;
            action: Function;
            msg: string;
            arrMsg: string[];
            addDot: boolean;
            refresh: boolean;
            noAni: boolean;
            overtimetext?: boolean;
        }): void;
        hide(data: {
            force: boolean;
        }): void;
        changeDot(dt: any): void;
        __dttime: number;
        changeText(dt: any): void;
        __dtotime: number;
        __isNoOvertimeText: boolean;
        doOvertimeText(dt: any): void;
        __beganTime: number;
        __closeTime: number;
        __ddtime: number;
        forcehide(): void;
        __dhotime: number;
        needHide(dt: any): void;
        update(dt: any): void;
    }
}
