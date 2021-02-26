declare namespace tea {
    class ChangeFloorPanel extends kaayou.ModelLayer {
        cell_posX: number;
        _data: any;
        floorItemGroup: ccui.ScrollView;
        tea_cell_change_mode: ccui.Layout;
        Floor_top_Layout: ccui.Layout;
        Floor_add_Layout: ccui.Layout;
        Floor_add_Layout_Index_label: ccui.Text;
        floor_Panel: ccui.Layout;
        btn_vip: ccui.Button;
        btn_mix_floor: ccui.Button;
        bottom_control_panel: ccui.Layout;
        constructor();
        initUI(): void;
        private createCell;
        onFloorUpdate(data: {
            hasrole: boolean;
            data: FloorUpdateInfo;
        }): void;
        private initWithUrole;
        unwatchRole(): void;
        watchRole(): void;
        checkUserRole(): void;
        Show(): void;
        Hide(): void;
    }
}
