declare namespace common {
    class VersionDialogPanel extends common.DialogPanel {
        lable_leftMsg: ccui.Text;
        lable_rightMsg: ccui.Text;
        constructor();
        initWithccs(path?: string): void;
        initUI(): void;
        Show(data: {
            rightMsg: string;
            leftMsg: string;
            title: string;
            msg: string;
            close?: {
                isShow?: boolean;
                action?: Function;
            };
            btns: Array<{
                name: string;
                action: Function;
                colorType: string;
            }>;
            isDomText: boolean;
            localZOrder?: number;
        }): boolean;
        Hide(): void;
    }
}
