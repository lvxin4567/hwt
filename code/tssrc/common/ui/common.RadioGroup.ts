


namespace common {

    export class RadioGroup {

        private _radios: Array<ccui.CheckBox> = null;

        constructor() {
            this._radios = [];
        }
        add(radio: ccui.CheckBox) {
            for (var x in this._radios) {
                if (this._radios[x] === radio) {
                    return false;
                }
            }
            this._radios.push(radio);
            radio['radioGroup'] = this;
            radio.setSelected(false);
            radio.on(kaayou.CheckEvent.SELECTED, this.onSelect, this);
            radio.on(kaayou.CheckEvent.UNSELECTED, this.onSelect, this);
            // for(var x in this._radios){
            //     this._radios[x].setSelected(Number(x) == 0);
            // }
        }
        remove(radio: ccui.CheckBox) {
            let index = -1;
            for (var x in this._radios) {
                if (this._radios[x] === radio) {
                    index = Number(x);
                    break;
                }
            }
            if (index < 0) { return; }
            lodash.pullAt(this._radios, [index]);
            radio['radioGroup'] = null;
            radio.setSelected(false);
            radio.off(kaayou.CheckEvent.SELECTED, this.onSelect, this);
            radio.off(kaayou.CheckEvent.UNSELECTED, this.onSelect, this);
        }

        removeAll() {
            for (var x in this._radios) {
                let radio = this._radios[x];
                radio['radioGroup'] = null;
                radio.setSelected(false);
                radio.off(kaayou.CheckEvent.SELECTED, this.onSelect, this);
                radio.off(kaayou.CheckEvent.UNSELECTED, this.onSelect, this);
            }
            this._radios = [];
        }

        setSelected(target: ccui.CheckBox) {
            if (target instanceof ccui.CheckBox) {
                for (var x in this._radios) {
                    if (target === this._radios[x]) {
                        this._radios[x].setSelected(true);
                        let e = kaayou.Event.create(kaayou.CheckEvent, kaayou.RadioEvent.SELECTED)
                        e.currentTarget = e.target = this._radios[x];
                        this._radios[x].dispatch(e);
                    } else {
                        this._radios[x].setSelected(false);
                        let e = kaayou.Event.create(kaayou.CheckEvent, kaayou.RadioEvent.UNSELECTED)
                        e.currentTarget = e.target = this._radios[x];
                        this._radios[x].dispatch(e);
                    }
                }
            }
        }


        onSelect(e: kaayou.CheckEvent) {
            let target: ccui.CheckBox = e.target;
            if (target instanceof ccui.CheckBox) {
                for (var x in this._radios) {
                    let bc = !this._radios[x].isSelected();
                    if (target === this._radios[x]) {
                        this._radios[x].setSelected(true);
                        if (bc != true) {
                            let e = kaayou.Event.create(kaayou.CheckEvent, kaayou.RadioEvent.SELECTED)
                            e.currentTarget = e.target = this._radios[x];
                            this._radios[x].dispatch(e);
                        }
                    } else {
                        this._radios[x].setSelected(false);
                        if (bc == false) {
                            let e = kaayou.Event.create(kaayou.CheckEvent, kaayou.RadioEvent.UNSELECTED)
                            e.currentTarget = e.target = this._radios[x];
                            this._radios[x].dispatch(e);
                        }
                    }
                }
            }
        }


    }


}