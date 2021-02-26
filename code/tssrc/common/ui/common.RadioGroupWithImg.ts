namespace common {
    export class RadioGroupWithImg {



        //有报错问题
        /*
        
        
                private ACTION_TAG_JUMP=1;
                public radio:RadioWithImg=null;
                public Radios: Array<RadioWithImg> = null;
                
                constructor() {
                    this.Radios = [];
                }
                add(radioWithImg:RadioWithImg) {
                    for (var x in this.Radios) {
                        if (this.Radios[x] === radioWithImg) {
                            return false;
                        }
                    }
                    this.Radios.push(radioWithImg);
                    radioWithImg['radioGroup'] = this;
                    radioWithImg.radio.setSelected(false);
                    radioWithImg.radio2.setSelected(false);
                }
        
                jump(){
                    this.stop();
                    let move1=cc.moveBy(0.5,0,10);
                    let move2=cc.moveBy(0.5,0,-10);
                    let seq=cc.sequence(move1,move2,cc.delayTime(1));
                    let action=cc.repeatForever(seq);
                    action.setTag(this.ACTION_TAG_JUMP);
                    for (var x in this.Radios) {
                        if (this.radio === this.Radios[x]) {
                            this.radio.jump(action);
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
        
                remove(radioWithImg:RadioWithImg) {
                    let index = -1;
                    for (var x in this.Radios) {
                        if (this.Radios[x] === radioWithImg) {
                            index = Number(x);
                            break;
                        }
                    }
                    if(index < 0){return ;}
                    lodash.pullAt(this.Radios, [index]);
                    radioWithImg['radioGroup'] = null;
                    radioWithImg.radio.setSelected(false);
                    radioWithImg.radio2.setSelected(false);
                    // radioWithImg.off(kaayou.CheckEvent.SELECTED, this.onSelect, this);
                    // radioWithImg.off(kaayou.CheckEvent.UNSELECTED, this.onSelect, this);
                }
        
                setSelected(target: RadioWithImg) {
                    if (target instanceof RadioWithImg) {
                        for (var x in this.Radios) {
                            if (target === this.Radios[x]) {
                                this.radio=this.Radios[x];
                                this.Radios[x].radio.setSelected(true);
                                this.Radios[x].radio2.setSelected(true);
                                let e = kaayou.Event.create(kaayou.CheckEvent, kaayou.RadioEvent.SELECTED)
                                e.currentTarget = e.target = this.Radios[x];
                                this.Radios[x].dispatch(e);
                            } else {
                                this.Radios[x].radio.setSelected(false);
                                this.Radios[x].radio2.setSelected(false);
                                let e = kaayou.Event.create(kaayou.CheckEvent, kaayou.RadioEvent.UNSELECTED)
                                e.currentTarget = e.target = this.Radios[x];
                                this.Radios[x].dispatch(e);
                            }
                        }
                    }
                }
        
                stop(){
                    for (var x in this.Radios) {
                        this.Radios[x].stop(this.ACTION_TAG_JUMP);
                    }
                }
            }
        
            export class RadioWithImg extends ccui.Node{
                public button:ccui.Button=null;
                public id:string="";
                public node:ccui.Node=null;
                public radio: ccui.CheckBox = null;
                public radio2: ccui.CheckBox = null;
                public constructor(node:ccui.Node){
                    super();
                    this.node=node;
                    this.id=node.getName();
                    this.radio=<ccui.CheckBox>node.children[0];
                    this.radio2=<ccui.CheckBox>node.children[1];
                    this.button=<ccui.Button>node.children[2];
                }
        
                public jump(action){
                    this.node.runAction(action);
                }
        
                public stop(actionTag){
                    this.node.stopActionByTag(actionTag);
                }
                 */


                 
    }

}