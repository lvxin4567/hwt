
namespace common {
    export class MajonSkinPanel extends kaayou.ModelLayer {
        maskBg: cc.Layer = null;
        bgScrollView: ccui.ScrollView = null;
        mjScrollView: ccui.ScrollView = null;
        curMod:mod.gameBaseMod<mod.IGame_User_Info,mod.ITableInfo> = null;
        constructor(ccs:string, mod:mod.gameBaseMod<mod.IGame_User_Info,mod.ITableInfo>) {
            super();
            this.initWithccs(ccs);
            this.curMod = mod;
        }
        initUI() {
            this.initLeftMenu();
            this.setVisible(false);
        }

        bgGroup: RadioGroup = null;
        mjGroup: RadioGroup = null;
        initLeftMenu() {
            let self = this;
            //初始化左侧菜单
            this.bgScrollView = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bgScrollView");
            this.bgScrollView.setPadding({ spacingY: 10 });
            this.bgScrollView.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.bgScrollView.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.bgScrollView.setScrollBarEnabled(false);

            this.mjScrollView = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mjScrollView");
            this.mjScrollView.setPadding({ spacingY: 10 });
            this.mjScrollView.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.mjScrollView.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.mjScrollView.setScrollBarEnabled(false);


            this.bgGroup = new RadioGroup();
            let skinIndex = cc.sys.localStorage.getItem("bgType");
            lodash.forEach(this.bgScrollView.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.setTag(11);
                v.on(kaayou.RadioEvent.SELECTED, self.onMenuSelected, self);
                self.bgGroup.add(v);
                v.setSelected(skinIndex == i);
            })

            this.mjGroup = new RadioGroup();
            let mjskinIndex = cc.sys.localStorage.getItem("mjBgType");
            lodash.forEach(this.mjScrollView.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.setTag(12);
                v.on(kaayou.RadioEvent.SELECTED, self.onMenuSelected, self);
                self.mjGroup.add(v);
                v.setSelected(mjskinIndex == i);
            })

        }

        onMenuSelected(e: kaayou.RadioEvent) {
            kaayou.SoundManager.getInstance().playSound(SoundRes.Click_btn_switch);
            let index = e.target['index'];
            if (e.target.tag == 11) {       //bg
                cc.sys.localStorage.setItem("bgType",index);
                kaayou.emit(this.curMod.getModuleName() , 'ui::MjTable::changeBgType');
            }else{                          //
                cc.sys.localStorage.setItem("mjBgType",index);
                kaayou.emit(this.curMod.getModuleName() , 'ui::MjTable::changeMjType');
            }
           
        }

        Show() {
            this.setVisible(true);
        }

    }
}