declare namespace tea {
    class BottomMenuBlock extends kaayou.Layer {
        bHasFloor: boolean;
        btnManage: ccui.Button;
        btnMixFloor: ccui.Button;
        chageGroup: ccui.Layout;
        ebCustom: any;
        lbName: ccui.Text;
        mask: ccui.Layout;
        menuGroup: ccui.Layout;
        ndCustomName: ccui.Layout;
        oldName: string;
        btn_chooseGame: ccui.Button;
        btnVIP: ccui.Button;
        fastGameLayout: ccui.Layout;
        btn_changeFastGame: ccui.Button;
        floorSelect_cell: ccui.CheckBox;
        floorSelct_ScrollView: ccui.ScrollView;
        constructor();
        authBottom(): void;
        initUI(): void;
        gameHeadGroup: ccui.Layout;
        gameHeadAdd: ccui.ImageView;
        label_desc: ccui.Text;
        img_remote: cc.Sprite;
        floorShow: ccui.Button;
        btnChangeName: ccui.Button;
        red_image_member: ccui.ImageView;
        initChageGroup(): void;
        menu_block: ccui.Layout;
        btn_meb: ccui.Button;
        btn_rec: ccui.Button;
        btnStat: ccui.Button;
        btn_searchTable: any;
        btnQuickStart: ccui.Button;
        btn_ranklist: ccui.Button;
        initMenuGroup(): void;
        onUpdateRedImage(data: {
            isShow: boolean;
        }): void;
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo): void;
        onFloorUpdate(data: {
            hasrole: boolean;
            data: FloorUpdateInfo;
        }): void;
        dosetMixFastGame(data: {
            fid: number;
        }): void;
        allTableCell: selectFloor_Cell;
        selectTbUpdate(data: {
            fid: number;
        }): void;
        floor_Cell_mode: ccui.CheckBox;
        selectFloor_layout: ccui.Layout;
        btn_selectShow: ccui.CheckBox;
        initSelectGroup(): void;
        isMove: boolean;
        onSlectLayoutShow(): void;
        doUpdatSelectLayout(): void;
        private createCell;
        private w1;
        watchRole(): void;
    }
    class selectFloor_Cell extends kaayou.Block {
        _data: any;
        fid: number;
        lbName: ccui.Text;
        constructor();
        initWithNode(node: ccui.Widget, callback: any): void;
        setFloorid(i: number, name: string): void;
        setCbselect(isSelected: boolean): void;
        setInfo(data: any, isSelected: any): void;
        unuse(): void;
    }
}
