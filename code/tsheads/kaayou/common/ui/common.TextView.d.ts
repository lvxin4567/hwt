declare namespace common {
    class TextViewMgr {
        static __INS__: TextViewMgr;
        private __selfPanel;
        private _zOrder;
        static getInstance(order: any): TextViewMgr;
        init(): boolean;
        getPanel(create?: boolean): any;
    }
}
