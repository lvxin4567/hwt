/// <reference path="common.RDomBaseNode.d.ts" />
declare namespace common {
    namespace RDom {
        class UICheckBox extends UIInput {
            checkbox: ccui.CheckBox;
            label: ccui.Text;
            _defText: string;
            _text: string;
            _defchecked: boolean;
            _checked: boolean;
            _defvalue: string;
            _value: string | number;
            initWithNode(node: ccui.Widget, uuid?: number): void;
            setAttrAndStyle(dattr?: IRDomAttrs): void;
            getAttr(): any;
            updateUI(): void;
            updateText(): void;
            onInputValueChange(name: string, uuid: number, value: any, ext: string | boolean | number, life: number, extAttr: IRDomAttrs): void;
            onClick(): void;
        }
    }
}
