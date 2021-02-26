declare namespace tea {
    class TableCell extends kaayou.Block implements common.ICuttingScrollViewCell {
        constructor();
        _data: tea.ITeaHouseTableItem;
        _index: number;
        btn_detail: ccui.Button;
        lbGameNO: ccui.Text;
        label_no: ccui.Text;
        img_lock: ccui.ImageView;
        head_layouts: ccui.Layout[];
        join_btn: ccui.Layout;
        roomImg_bg: ccui.ImageView;
        roomID_label: ccui.Text;
        roomTableBg: ccui.ImageView;
        tableDetailbtn_Bg: ccui.ImageView;
        match_Label: ccui.Text;
        match_label_left: ccui.Text;
        fullTableNum: ccui.Text;
        tableBg_light: ccui.ImageView;
        mainTablelayout: ccui.Layout;
        huxiAnilayout: ccui.Layout;
        posMap: {
            2: cc.Point[];
            3: cc.Point[];
            4: cc.Point[];
            5: cc.Point[];
        };
        lyWatchers: ccui.Layout[];
        fid: number;
        initWithccs(): void;
        initUI(): void;
        _curTouchTarget: any;
        showDetailPanel(): void;
        doBindTouchEvent(widget: ccui.Widget, callEndFunc: (e: kaayou.TouchEvent) => void, orTagert: any): void;
        getIndex(): number;
        setIndex(i: number): void;
        setInfo(info: ITeaHouseTableItem): void;
        initTableImageNode(headLayout: ccui.Layout): void;
        initWatcherImageNode(headLayout: ccui.Layout): void;
        onlineAction(headLayout: ccui.Layout): void;
        setType(type: number, fid: number): void;
    }
    class TableListPanel extends common.TableListPanel {
        ivNoRuleMember: ccui.ImageView;
        img_mgrtag: ccui.ImageView;
        btn_mgrgame: ccui.Button;
        initTableListView(): void;
        initUI(): void;
        initWithccs(path?: string): void;
        dosetMacCount(data: {
            num: number;
            isClear: boolean;
        }): void;
        onFloorUpdate(data: {
            hasrole: boolean;
            data: FloorUpdateInfo;
        }): void;
        onCuttingScrollChange(e: kaayou.CustomEvent): void;
        onTabelUpdate1(data: any[]): void;
    }
}
