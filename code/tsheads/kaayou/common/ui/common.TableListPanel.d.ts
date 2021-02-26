declare namespace common {
    class BaseTableViewCell extends kaayou.Block implements common.ICuttingScrollViewCell {
        constructor();
        _index: number;
        label_no: ccui.Text;
        btn_detail: ccui.Button;
        img_lock: ccui.ImageView;
        head_layouts: ccui.Layout[];
        initUI(): void;
        initWithccs(path?: string): void;
        getIndex(): number;
        setIndex(i: number): void;
        _data: any;
        setInfo(info: any): void;
    }
    interface ICuttingScrollViewCell extends ccui.ILayout {
        initUI(): any;
        getIndex(): any;
        setIndex(i: number): any;
        setInfo(info: any): any;
    }
    class TableListPanel extends kaayou.Layer {
        constructor();
        _cellClass: common.ICuttingScrollViewCellConstructor;
        _cuttingSV: common.CuttingScrollView;
        _cellColumn: number;
        _maxcellCount: number;
        _cellLayout: ICuttingScrollViewCell;
        setMaxcellCount(count: number): void;
        getMaxcellCount(): number;
        setCellColumn(column: number): void;
        getCellColumn(): number;
        setCellClass(cellClass: common.ICuttingScrollViewCellConstructor): void;
        getCellClass(): common.ICuttingScrollViewCellConstructor;
        _cuttingSVParent: cc.Node;
        initUI(): void;
        initTableListView(): void;
        afterTableListView(): void;
        changeMaxTable(tableNum: number, isClear: boolean): void;
        resetTabelList(isClear: boolean): void;
        initWithccs(path?: string, full?: boolean): void;
    }
    abstract class GameTableListPanel extends common.TableListPanel {
        initWithccs(path?: string): void;
        topbarMgr: common.TopBarMgr;
        btn_quick: ccui.Button;
        setCellClass(cellClass: common.ICuttingScrollViewCellConstructor): void;
        getCellClass(): common.ICuttingScrollViewCellConstructor;
        initTableListView(): void;
        afterTableListView(): void;
        resetTabelList(): void;
        _isBindEvent: boolean;
        bindUiEvents(): void;
        initUI(): void;
        onUpdateInfo(info: common.mod.SiteInfo): void;
        __changeeventquene: Array<{
            min: number;
            max: number;
        }>;
        __willdoSend: boolean;
        onCuttingScrollChange(e: kaayou.CustomEvent): void;
        __delayT: number;
        update(dt: any): void;
        emitChangeEvent(): void;
        onTabelUpdate(data: Array<any>): void;
        Show(data: {
            title: string;
        }): void;
        Hide(data: any): void;
    }
    abstract class GameTableListPlayerPanel extends kaayou.ModelLayer {
        constructor();
        label_uid: ccui.Text;
        label_name: ccui.Text;
        label_score: ccui.Text;
        label_sex: ccui.Text;
        label_ip: ccui.Text;
        initWithccs(path?: string): void;
        initUI(): void;
        _isBindEvent: boolean;
        bindUIEvents(): void;
        Show(data: {
            player: {
                uid: number;
                name: string;
                imgurl: string;
                sex: number;
                ip: string;
                gold: number;
            };
        }): void;
        Hide(): void;
    }
    class GameTableCell extends kaayou.Block implements common.ICuttingScrollViewCell {
        constructor();
        btn_detail: ccui.Button;
        _index: number;
        label_no: ccui.Text;
        img_bg: ccui.ImageView;
        img_lock: ccui.ImageView;
        head_layouts: ccui.Layout[];
        head_image_layouts: ccui.Layout[];
        label_names: ccui.Text[];
        label_scores: ccui.Text[];
        _maxPlayerCpunt: number;
        initWithccs(path?: string): void;
        setMaxPlayerCpunt(count: number): void;
        getMaxPlayerCount(): number;
        initUI(): void;
        _curTouchTarget: any;
        doBindTouchEvent(widget: ccui.Widget, callEndFunc: (e: kaayou.TouchEvent) => void, orTagert: any): void;
        getIndex(): number;
        setIndex(i: number): void;
        _data: ITabelListItem;
        setInfo(info: ITabelListItem): void;
    }
}
