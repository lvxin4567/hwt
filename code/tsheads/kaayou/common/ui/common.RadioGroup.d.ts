declare namespace common {
    class RadioGroup {
        private _radios;
        constructor();
        add(radio: ccui.CheckBox): boolean;
        remove(radio: ccui.CheckBox): void;
        removeAll(): void;
        setSelected(target: ccui.CheckBox): void;
        onSelect(e: kaayou.CheckEvent): void;
    }
}
