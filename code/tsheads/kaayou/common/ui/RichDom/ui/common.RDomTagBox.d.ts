/// <reference path="common.RDomBaseNode.d.ts" />
declare namespace common {
    namespace RDom {
        class UITagBox extends UIInput {
            lbbg: ccui.ImageView;
            label: ccui.Text;
            _defText: string;
            _text: string;
            _defbackgroudColor: string;
            _backgroudColor: string;
            initWithNode(node: ccui.Widget, uuid?: number): void;
            getAttr(): any;
            setAttrAndStyle(dattr?: IRDomAttrs): void;
            onInputValueChange(name: string, uuid: number, value: any, ext: string | boolean | number, life: number, extAttr: IRDomAttrs): void;
            updateUI(): void;
        }
    }
}
