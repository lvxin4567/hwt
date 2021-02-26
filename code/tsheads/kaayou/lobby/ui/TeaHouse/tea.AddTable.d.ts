declare namespace tea {
    class AddMixTableRow extends kaayou.Block {
        constructor();
        _data: any;
        btnAdd: ccui.Layout;
        btnDelete: ccui.Button;
        changeNumber: number;
        ivGame: ccui.ImageView;
        ivAddNumber: ccui.ImageView;
        ivDeleteNumber: ccui.ImageView;
        lbAddNumber: ccui.Text;
        lbCustomizeName: ccui.Text;
        lbDeleteNumber: ccui.Text;
        lbFloor: ccui.Text;
        lbGameName: ccui.Text;
        tableNumber: number;
        tableMin: number;
        initWithNode(node: ccui.Widget): void;
        setInfo(level: any, data: any, tableCount: any, tableMin: any): void;
        showNumber(): void;
        unuse(): void;
    }
    export class tea_AddTableMgr {
        static __INS__: tea_AddTableMgr;
        static getInstance(): tea_AddTableMgr;
        __selfPanel: AddTable;
        init(): boolean;
        getPanel(create?: boolean): AddTable;
    }
    export class AddTable extends kaayou.ModelLayer {
        arrChange: any[];
        btnClose: ccui.Button;
        btnSave: ccui.Button;
        prfRow: ccui.Layout;
        svTable: ccui.ScrollView;
        constructor();
        initUI(): void;
        createRow(): AddMixTableRow;
        Show(data: any): void;
        showAddTableList(): void;
        Hide(): void;
    }
    export {};
}
