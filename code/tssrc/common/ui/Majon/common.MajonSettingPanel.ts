
namespace common {
    export class MajonSettingPanel extends kaayou.ModelLayer {

        bgm_CheckBox: ccui.CheckBox = null;
        effect_CheckBox: ccui.CheckBox = null;
        yuyan: ccui.Layout = null;
        closeBtn: ccui.Button = null;
        majonModel:ccui.Layout = null;

        constructor(ccs: string , moduleName:string) {
            super();
            this.setModuleName(moduleName);
            this.initWithccs(ccs);
            this.setVisible(false);

        }

        initUI() {
            let self = this;
            this.bgm_CheckBox = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bg_CheckBox")
            this.effect_CheckBox = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "xx_CheckBox");
            this.closeBtn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "closeBtn")
            this.yuyan = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "yuyan");
            this.majonModel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "majonModel");
            this.closeBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(SoundRes.Click_btn_close);
                self.setVisible(false);
            }, this);
            this.bgm_CheckBox.on(kaayou.CheckEvent.SELECTED, self.onToggleClick, this);
            this.bgm_CheckBox.on(kaayou.CheckEvent.UNSELECTED, self.onToggleClick, this);
            this.effect_CheckBox.on(kaayou.CheckEvent.SELECTED, self.onToggleClick, this);
            this.effect_CheckBox.on(kaayou.CheckEvent.UNSELECTED, self.onToggleClick, this);

            for(let i = 0; i < this.yuyan.childrenCount ; i++){
                let c = <ccui.CheckBox>this.yuyan.children[i];
                c.setTag(i);
                c.on(kaayou.CheckEvent.SELECTED, self.onLanagueClick, self);
                c.on(kaayou.CheckEvent.UNSELECTED, self.onLanagueClick, self);
            }
            if(this.majonModel){
                for(let i = 0; i < this.majonModel.childrenCount ; i++){
                    let c = <ccui.CheckBox>this.majonModel.children[i];
                    c.setTag(i);
                    c.on(kaayou.CheckEvent.SELECTED, self.onMajonModelClick, self);
                    c.on(kaayou.CheckEvent.UNSELECTED, self.onMajonModelClick, self);
                }
            }
            this.resetFangYanStatue();
            this.resetMajonModel();
        }

        onToggleClick(event: kaayou.CheckEvent) {
            console.log('onToggleClick name=' + event.target.name + ', isSelected=' + event.target.isSelected());
            kaayou.SoundManager.getInstance().playSound(SoundRes.Click_btn_switch);
            if (event.target.name == "bg_CheckBox") {   //bgm
                cc.sys.localStorage.setItem('tog_music', event.target.isSelected() ? 'true' : 'false');
                if (event.target.isSelected()) {
                    kaayou.emit(this._moduleName, "playBGM");
                } else {
                    kaayou.SoundManager.getInstance().stopMusic();
                }
            } else { //xx
                cc.sys.localStorage.setItem('tog_effect', event.target.isSelected() ? 'true' : 'false');
            }
        }

        onLanagueClick(event: kaayou.CheckEvent){
            cc.sys.localStorage.setItem("lanagueType_" + this._moduleName , event.target.tag);
            this.resetFangYanStatue();
        }

        onMajonModelClick(event: kaayou.CheckEvent){
            cc.sys.localStorage.setItem("majonModel_" + this._moduleName , event.target.tag);
            kaayou.emit(this.getModuleName() , 'ui::MjTable::changeMajonModel' , {model:event.target.tag});
            this.resetMajonModel();
        }

        resetFangYanStatue() {
            // kaayou.SoundManager.getInstance().playSound(SoundRes.Click_btn_switch);
            let index = cc.sys.localStorage.getItem("lanagueType_" + this._moduleName);
            for (var i = 0; i < this.yuyan.childrenCount; i++) {
                let cell: ccui.CheckBox = <ccui.CheckBox>this.yuyan.children[i];
                if (i == Number(index)) {
                    cell.setSelected(true);
                    cell.setTouchEnabled(false);
                } else {
                    cell.setSelected(false);
                    cell.setTouchEnabled(true);
                }
            }
        }

        resetMajonModel(){
            if(!this.majonModel){
                return;
            }
            let index = cc.sys.localStorage.getItem("majonModel_" + this._moduleName);
            for (var i = 0; i < this.majonModel.childrenCount; i++) {
                let cell: ccui.CheckBox = <ccui.CheckBox>this.majonModel.children[i];
                if (i == Number(index)) {
                    cell.setSelected(true);
                    cell.setTouchEnabled(false);
                } else {
                    cell.setSelected(false);
                    cell.setTouchEnabled(true);
                }
            }

        }

        onMenuSelected(e: kaayou.RadioEvent) {
            let index = e.target['index'];
            cc.sys.localStorage.setItem("lanagueType_" + this._moduleName, index);
        }

        Show() {
            this.setVisible(true);
            let bgcheck = cc.sys.localStorage.getItem("tog_music");
            if (bgcheck == "true") {
                this.bgm_CheckBox.setSelected(true);
            } else {
                this.bgm_CheckBox.setSelected(false);
            }
            let xxcheck = cc.sys.localStorage.getItem("tog_effect");
            if (xxcheck == "true") {
                this.effect_CheckBox.setSelected(true);
            } else {
                this.effect_CheckBox.setSelected(false);
            }
            this.resetFangYanStatue();
            this.resetMajonModel();
        }
    }
}