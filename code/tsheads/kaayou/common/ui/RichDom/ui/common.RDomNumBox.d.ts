/// <reference path="common.RDomBaseNode.d.ts" />
declare namespace common {
    namespace RDom {
        class UINumBox extends UIInput {
            btn_add: ccui.Button;
            btn_sub: ccui.Button;
            label: ccui.Text;
            initWithNode(node: ccui.Widget, uuid?: number): void;
            _maxNum: number;
            _minNum: number;
            _unit: string;
            _inc: number;
            _isGroup: boolean;
            _group: Array<{
                n: string;
                v: number;
            }>;
            _curGroupNum: number;
            getAttr(): any;
            _displayType: string;
            _value: number;
            _valueStr: string;
            _defgroupStr: string;
            _groupStr: string;
            _isErr: boolean;
            setAttrAndStyle(dattr?: IRDomAttrs): void;
            doError(str: any): void;
            setValue(text: string | number): void;
            setGroupValue(value: number): void;
            checkBtnState(i: any, max: any, min: any, a?: boolean): void;
            updateUI(): void;
            updateText(): void;
            getInputValue(): number;
            onInputValueChange(name: string, uuid: number, value: any, ext: string | boolean | number, life: number, extAttr: IRDomAttrs): void;
            getGroupIndexByValue(value: any): number;
            getGroupNextValue(): number;
            getGroupPrevValue(): number;
            getGroupValueByValueProtect(value: any): number;
            onSubClick(): void;
            onAddClick(): void;
        }
    }
}
