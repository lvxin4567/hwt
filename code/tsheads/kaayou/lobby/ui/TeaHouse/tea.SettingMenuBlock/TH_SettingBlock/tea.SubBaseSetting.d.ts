declare namespace tea {
    class TH_BaseSet_Cell extends kaayou.Block implements common.IPullListCell {
        constructor();
        _index: number;
        setIndex(index: any): void;
        getIndex(): number;
        decImg: ccui.ImageView;
        cell_title: ccui.Text;
        cell_dec: ccui.Text;
        type_layout: ccui.Layout;
        Img_Click: ccui.ImageView;
        edit_TeaName: any;
        edit_TeaName_input: ccui.TextField;
        TableShowNum_layout: ccui.Layout;
        TableShowNum_Group: common.RadioGroup;
        TableShowNum: number;
        JoinTableSet_layout: ccui.Layout;
        JoinTeaSet_layout: ccui.Layout;
        JoinTeaSet_Group: common.RadioGroup;
        JoinTeaSetNum: number;
        ExitTeaSet_layout: ccui.Layout;
        ExitTeaSet_Group: common.RadioGroup;
        ExitTeaSetNum: number;
        CaptainAuthSet_layout: ccui.Layout;
        CaptainSetCaptain_layout: ccui.Layout;
        CaptainSetCaptain_Group: common.RadioGroup;
        CaptainSetCaptainNum: number;
        TeaFrozeSet_layout: ccui.Layout;
        TeaFrozeSet_Group: common.RadioGroup;
        TeaFrozeSetNum: number;
        edit_Distance: any;
        edit_Distance_input: ccui.TextField;
        edit_lowCard: any;
        edit_lowCard_input: ccui.TextField;
        NoWechat_layout: ccui.Layout;
        NoWechat_Group: common.RadioGroup;
        NoWechatNum: number;
        recordTimeSelect_layout: ccui.Layout;
        recordTimeSelect_Group: common.RadioGroup;
        recordTimeSelectNum: number;
        radioDict: {
            3: number;
            6: number;
            8: number;
            12: number;
        };
        numDict: {
            0: number;
            1: number;
            2: number;
            3: number;
        };
        recordDetailBind_layout: ccui.Layout;
        recordDetailBind_Group: common.RadioGroup;
        recordDetailBindNum: number;
        initWithNode(node: ccui.Widget): void;
        initCellUI(): void;
        onTextColorShow(e: kaayou.Event): void;
        reset(): void;
        _data: any;
        setInfo(data: any): void;
        showWithType(type: string): void;
        emitEventWithType(type: string): void;
    }
    export class SubStBasePage {
        scr_BaseSet: ccui.ScrollView;
        cell_Mod: ccui.Widget;
        _page: cc.Node;
        _index: number;
        cellMap: {
            [type: string]: TH_BaseSet_Cell;
        };
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        reset(): void;
        initWidthNode(page: cc.Node, cellMod: ccui.Widget): void;
        updateListWithUright(): any[];
        private createCell;
    }
    export {};
}
