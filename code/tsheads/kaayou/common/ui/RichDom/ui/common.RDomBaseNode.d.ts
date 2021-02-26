declare namespace common {
    namespace RDom {
        const defEventLife = 1;
        interface IRDomAttrs {
            uuid?: number;
            nodeType?: string;
            fontSize?: number;
            fontName?: string;
            fontColor?: string;
            fontActiveColor?: string;
            backgroudColor?: string;
            text?: string;
            value?: string | number;
            valueType?: string;
            checked?: boolean;
            iid?: string;
            iname?: string;
            x?: number;
            y?: number;
            zindex?: number;
            isEdit?: boolean;
            displayType?: string;
            groupStr?: string;
            inc?: number;
            unit?: string;
            maxNum?: number;
            minNum?: number;
        }
        interface IRDomGangedEvent {
            srck: string;
            srcv: string | number | boolean;
            srct: string;
            advsrct: string;
            destk: string;
            ev: string;
            destv: string | number | boolean;
            destattr: string | IRDomAttrs;
            priority: number;
        }
        abstract class UINode extends kaayou.Block {
            __nodeType: string;
            _fontSize: number;
            _fontName: string;
            _fontColor: string;
            _fontActiveColor: string;
            _deffontSize: number;
            _deffontName: string;
            _deffontColor: string;
            _deffontActiveColor: string;
            getAttr(): {
                x: number;
                y: number;
                zindex: number;
                nodeType: string;
                uuid: number;
                fontSize: number;
                fontName: string;
                fontColor: string;
                fontActiveColor: string;
            };
            setAttrAndStyle(dattr?: IRDomAttrs): void;
            mergerStyle(dattr?: IRDomAttrs): void;
            abstract updateUI(): any;
            __uuid: number;
            initWithNode(node: ccui.Widget, uuid: number): void;
            static UUID: number;
        }
        interface IDomInputChangeEvent {
            name: string;
            value: any;
            extattr?: IRDomAttrs | IRDomAttrs[];
            uuid?: number;
            force?: boolean;
            life: number;
            ext?: string;
        }
        interface IDomInputDoEvent {
            key: string;
            ext: any;
            value: any;
            life: number;
        }
        abstract class UIInput extends UINode {
            _iname: string;
            _iid: string;
            __lock: boolean;
            setAttrAndStyle(dattr?: IRDomAttrs): void;
            getAttr(): any;
            getInputName(): string;
            getInputID(): string;
            getInputFor(): string;
            doBindeChangeEvent(): void;
            protected __onInputValueChange(e: any): void;
            protected doSetExtAttr(attr?: IRDomAttrs): void;
            doValueChangeEvent(value: any, life?: number, extAttr?: IRDomAttrs): void;
            abstract onInputValueChange(name: string, uuid: number, value: any, ext: string | number | boolean, life: number, extAttr: IRDomAttrs | IRDomAttrs[]): any;
        }
    }
}
