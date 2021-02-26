
//规则说明面板
namespace lobby {
    const {doBindEvent,BindEvent} = kaayou._decorator;
    export class RuleIntroducePanel extends kaayou.ModelLayer{
        
        constructor(){ super();
            return;
            // this.initWithccs(lobby.res.RuleIntroducePanel_json);
            this.initUI();            
        }
     

        ruleMenuLayout:ccui.ScrollView = null
        ruleBtnMode:ccui.CheckBox = null
        menuGroup:common.RadioGroup = null;
        topbarMgr: lobby.TopBarMgr = null;
        @doBindEvent
        initUI(){
            this.isTouchMaskHide =  false;
            let self = this;
           
            {
                let top_bar = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar");
                this.topbarMgr = new TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
                this.topbarMgr.setOnCloseClick(function () {
                    self.Hide();
                }.bind(this));
                this.topbarMgr.setBeanVisibel(false);
                this.topbarMgr.setCardVisibel(false);
                this.topbarMgr.setGoldVisibel(false);
                this.topbarMgr.doRightLayout();
                this.topbarMgr.setTitle("");
            }

            
            //设置自动排版
            this.ruleMenuLayout = ccui.helper.seekWidgetByName( <ccui.Widget>this.node , "rule_menu_layout");
            this.ruleMenuLayout.setPadding({spacingY:10});
            this.ruleMenuLayout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.ruleMenuLayout.setScrollBarEnabled(false);
            this.ruleBtnMode = ccui.helper.seekWidgetByName( <ccui.Widget>this.node , "rule_btn_mode");
            this.menuGroup = new common.RadioGroup();
            this.doSetData();
            this.Hide();
        }
        doSetData(){

            this.updateMenu();

        }

        updateMenu(){
            var btn = this.ruleBtnMode.clone();
            let self = this;
            this.ruleMenuLayout.removeAllChildren();
            for(var i = 0 ; i < 3 ; i++){
                var v = <ccui.CheckBox>this.ruleBtnMode.clone();
                v['index'] = i;
                v.getChildByName('rule_touzi').setVisible(false);
                v.getChildByName('rule_name').setPositionX(40);
                (<ccui.Text>v.getChildByName('rule_name')).setTextColor(cc.color("#1D5B85"));
                self.menuGroup.add(v);
                v.on(kaayou.RadioEvent.SELECTED, self.onMenuSelected, this);
                v.on(kaayou.RadioEvent.UNSELECTED, self.onMenuUnSelected, this);
                this.ruleMenuLayout.addChild(v);
            }
            this.ruleMenuLayout.doChildrenLayout();
        }
        onMenuSelected(e:kaayou.RadioEvent){
            let index = e.target['index'];
            console.log(index);
            
            (<cc.Node>e.target.getChildByName('rule_touzi') ).setVisible(true);
            (<cc.Node>e.target.getChildByName('rule_name') ).setPositionX(56);
            (<ccui.Text>e.target.getChildByName('rule_name')).setTextColor(cc.color("#FFFFFF"));
            (<ccui.Text>e.target.getChildByName('rule_name')).enableOutline(cc.color("#1D5B85"),3);

        }
        onMenuUnSelected(e:kaayou.RadioEvent){
            let index = e.target['index'];
            (<cc.Node>e.target.getChildByName('rule_touzi') ).setVisible(false);
            (<ccui.Text>e.target.getChildByName('rule_name') ).setPositionX(40);
            (<ccui.Text>e.target.getChildByName('rule_name')).setTextColor(cc.color("#1D5B85"));
            (<ccui.Text>e.target.getChildByName('rule_name')).enableOutline(cc.color("#FFFFFF"),0);
        }

        @BindEvent("lobby", 'ui::RuleIntroduce::Show')
        Show(){
            this.setVisible(true);
        }
        @BindEvent("lobby", 'ui::RuleIntroduce::Hide')
        Hide(){
            this.setVisible(false);
        }

    }
   


}