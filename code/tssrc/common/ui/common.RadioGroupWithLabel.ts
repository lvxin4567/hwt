namespace common {
    // ccui.Node
    export class RadioGroupWithLabel {


  
        //有报错问题
        /*
        private ACTION_TAG_JUMP=1;
        public radio:RadioWithLabel=null;
        public Radios: Array<RadioWithLabel> = null;
        
        constructor() {
            this.Radios = [];
        }

        add(radioWithLabel:RadioWithLabel) {
            for (var x in this.Radios) {
                if (this.Radios[x] === radioWithLabel) {
                    return false;
                }
            }
            this.Radios.push(radioWithLabel);
            radioWithLabel['radioGroup'] = this;
            radioWithLabel.radio.setSelected(false);
        }

        jump(){
            let move1=cc.scaleTo(0.1,1.2);
            let move2=cc.scaleTo(0.1,1);
            let seq=cc.sequence(move1,move2);
            for (var x in this.Radios) {
                if (this.radio === this.Radios[x]) {
                    this.radio.jump(seq);
                } else {
                    this.Radios[x].stop(this.ACTION_TAG_JUMP);
                }
            }
        }

        onSelect(e:ccui.Button) {
            for (var x in this.Radios) {
                if (e === this.Radios[x].button) {
                    this.setSelected(this.Radios[x]);
                    break;
                } 
            }
        }

        remove(radioWithLabel:RadioWithLabel) {
            let index = -1;
            for (var x in this.Radios) {
                if (this.Radios[x] === radioWithLabel) {
                    index = Number(x);
                    break;
                }
            }
            if(index < 0){return ;}
            lodash.pullAt(this.Radios, [index]);
            radioWithLabel['radioGroup'] = null;
            radioWithLabel.radio.setSelected(false);
            radioWithLabel.uncheckedText.setString("");
            radioWithLabel.checkedText.setString("");
            // radioWithLabel.off(kaayou.CheckEvent.SELECTED, this.onSelect, this);
            // radioWithLabel.off(kaayou.CheckEvent.UNSELECTED, this.onSelect, this);
        }

        setSelected(target: RadioWithLabel) {
            if (target instanceof RadioWithLabel) {
                for (var x in this.Radios) {
                    if (target === this.Radios[x]) {
                        this.radio=this.Radios[x];
                        //this.Radios[x].radio.setSelected(true);
                        //this.Radios[x].text.setColor(cc.color("#D33A25"));
                        //this.Radios[x].text.setTextColor(cc.color("#D33A25"));
                        this.Radios[x].setSelected(true);
                        let e = kaayou.Event.create(kaayou.CheckEvent, kaayou.RadioEvent.SELECTED)
                        e.currentTarget = e.target = this.Radios[x];
                        this.Radios[x].dispatch(e);
                    } else {
                        //this.Radios[x].radio.setSelected(false);
                        this.Radios[x].setSelected(false);
                        //this.Radios[x].text.setColor(cc.color("#93692D"));
                        //this.Radios[x].text.setTextColor(cc.color("#93692D"));
                        let e = kaayou.Event.create(kaayou.CheckEvent, kaayou.RadioEvent.UNSELECTED)
                        e.currentTarget = e.target = this.Radios[x];
                        this.Radios[x].dispatch(e);
                    }
                }
            }
        }
    }

    export class RadioWithLabel extends kaayou.Block{
        public button:ccui.Button=null;
        public node:ccui.Node=null;
        public radio: ccui.CheckBox = null;
        public uncheckedText:ccui.Text=null;
        public checkedText:ccui.Text=null;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.radio=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "radioCheckBox");
            this.uncheckedText=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "uncheckedText");
            this.checkedText=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "checkedText");
            this.button=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "radioButton");
        }

        public jump(action){
            this.node.runAction(action);
        }

        public setInfo(name) {
            this.uncheckedText.setString(name);
            this.checkedText.setString(name);
        }

        public stop(actionTag){
            this.node.stopActionByTag(actionTag);
        }

        public setSelected(v:boolean){
            if(v){
                this.radio.setSelected(true);
                this.checkedText.setVisible(true);
                this.uncheckedText.setVisible(false);
            }else{
                this.radio.setSelected(false);
                this.checkedText.setVisible(false);
                this.uncheckedText.setVisible(true);
            }
        }

        public unuse() {
            this.removeFromParent();
        }
        */
    }
}