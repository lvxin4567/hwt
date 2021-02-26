declare namespace common {
    namespace RDom {
        class UILayoutCache {
            static __INS__: UILayoutCache;
            static getInstance: () => UILayoutCache;
            static CHECKBOX: string;
            static NUMBOX: string;
            static RADIOBOX: string;
            static LABELBOX: string;
            static TIPBOX: string;
            static TAGBOX: string;
            private _richDombL;
            private _radioModel;
            private _checkModel;
            private _numModel;
            private _labelModel;
            private _tipModel;
            private _tagModel;
            constructor();
            getModel(name: any): any;
            _values: {
                [key: string]: {
                    type: string;
                    value: any;
                };
            };
            clearValues(): void;
            submit(): {};
        }
        class UILayout extends kaayou.Block {
            initWithNull(): void;
            _isScrollView: boolean;
            initWithNodeNoClone(node: ccui.Widget): void;
            _isScorllView: boolean;
            setIsScorllView(b: any): void;
            submit(): any;
            _maXwidgetZindex: number;
            createWidget(attr: common.RDom.IRDomAttrs): void;
            createRadioBox(attr: {
                [key: string]: any;
            }): UIRadioBox;
            createCheckBox(attr: {
                [key: string]: any;
            }): UICheckBox;
            createTipBox(attr: {
                [key: string]: any;
            }): UITipBox;
            createTagBox(attr: {
                [key: string]: any;
            }): UITagBox;
            createLableBox(attr: {
                [key: string]: any;
            }): UILabelBox;
            AttrGriddle(attr: any, istoh5?: boolean): any;
            createNumBox(attr: {
                [key: string]: any;
            }): UINumBox;
            getNodeContentSize(): cc.Size;
            setNodeContentSize(size: cc.Size): void;
            submitValues: {
                [key: string]: number | string;
            };
            submitInputEvents: {
                [key: string]: {
                    nodeType: string;
                    valueType: string;
                };
            };
            setContent(content: any, lastValus?: {
                [key: string]: string | number | boolean;
            }, frozen?: boolean): void;
            __evList: Array<common.RDom.IRDomGangedEvent>;
            getValueInChange(key: any, value: any): any;
            onValueChange(e: kaayou.Event): void;
            parseAdvsrct(advsrct: string): {
                srct: string;
                srcv: any;
                vkey: string;
            }[];
            /**
             *  检查事件是否被触发
             * @param srct 触发条件
             * @param advsrct 高级条件
             * @param srcv 触发值
             * @param value 当前值
             */
            checkEventSent(srct: string, advsrct: string, srcv: string | number | boolean, value: string | number | boolean): boolean;
            doValueChangeEvent(name: any, value: any, ext: any, life?: number, extAttr?: IRDomAttrs): void;
        }
    }
}
