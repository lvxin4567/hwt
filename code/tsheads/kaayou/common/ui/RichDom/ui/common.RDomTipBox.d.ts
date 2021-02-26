/// <reference path="common.RDomBaseNode.d.ts" />
declare namespace common {
    namespace RDom {
        class UITipBox extends UIInput {
            tip_alert: ccui.ImageView;
            label: ccui.Text;
            mask: ccui.Layout;
            _defText: string;
            _text: string;
            initWithNode(node: ccui.Widget, uuid?: number): void;
            getAttr(): any;
            setAttrAndStyle(dattr?: IRDomAttrs): void;
            onInputValueChange(name: string, uuid: number, value: any, ext: string | boolean | number, life: number, extAttr: IRDomAttrs): void;
            onClick(): void;
            onMaskClick(): void;
            updateUI(): void;
        }
    }
}
