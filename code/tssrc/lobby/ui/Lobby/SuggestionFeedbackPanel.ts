/**
 * 
 * 实名认证面板
 */

namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class SuggestionFeedbackPanelMgr {
        static __INS__: SuggestionFeedbackPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (SuggestionFeedbackPanelMgr.__INS__ == null) {
                SuggestionFeedbackPanelMgr.__INS__ = new SuggestionFeedbackPanelMgr();
                SuggestionFeedbackPanelMgr.__INS__.init();
                SuggestionFeedbackPanelMgr.__INS__._zOrder = _zOrder;
            }
            return SuggestionFeedbackPanelMgr.__INS__;
        }
        public _zOrder = 0;
        __selfPanel: SuggestionFeedbackPanel = null;
        init() {
            let self = this;
            kaayou.getController('lobby').on('ui::SuggestionFeedbackPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('lobby').on('ui::SuggestionFeedbackPanel::Hide', function (e: kaayou.Event) {
                if (!self.__selfPanel) {
                    return;
                }
                self.getPanel(false).Hide();
            }, this, 10);
            return true;
        }
        
        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new SuggestionFeedbackPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);    //这个地方怎么不管用？？？
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            if (this.__selfPanel) {
                return this.__selfPanel;  
            }
        }
    }


    class SuggestionFeedbackPanelItem{
        

        constructor(item:cc.Node){
            this.initUI(item)
        }

        node:cc.Node = null;
        btn_back:ccui.Button;
        btn_detail:ccui.Button;
        detailcontainer:ccui.Layout
        container:ccui.Layout;
        sugg_content:ccui.Text;
        sugg_time:ccui.Text;
        feedback:ccui.Text;
        feed_container: ccui.ScrollView;
        
        initUI(item:cc.Node){
            this.initWithNode(<ccui.Widget>item);
            this.detailcontainer = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"detailcontainer");
            this.feed_container =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"feed_container");
            this.container = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"container");
            this.feedback = ccui.helper.seekWidgetByName(<ccui.Widget>this.detailcontainer,"feedback");
            this.sugg_content = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"sugg_content");
            this.sugg_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"sugg_time");

            this.feed_container.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.feed_container.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.feed_container.setScrollBarEnabled(false);

            this.btn_back = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"btn_back");

            this.btn_detail = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"btn_detail");

            this.btn_back.on(kaayou.TouchEvent.TouchEnd , ()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.node.height = 100;
                this.container.y=0;
                this.btn_back.setVisible(false)
                this.btn_detail.setVisible(true)
                this.detailcontainer.setVisible(false)
                kaayou.emit("lobby","ui::lobby::suggestionfeedback::layoutfeedlist",{index:this.index})
            },this);

            this.btn_detail.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.btn_back.setVisible(true)
                this.btn_detail.setVisible(false)
                this.detailcontainer.setVisible(true)
                this.container.y=150;
                this.node.height = 250;
                kaayou.emit("lobby","ui::lobby::suggestionfeedback::layoutfeedlist",{index:this.index})
            },this)
            


        }

        private measureText(str: string, width: number,size=24) {
            
            let text = <ccui.Text>ccui.Text.create();
            text.setTextAreaSize(cc.size(width, 0));
            text.ignoreContentAdaptWithSize(false)
            text.setFontSize(size);
            text.setString(str);
            return text.getVirtualRendererSize()
        }

        //"code":0,"msg":"ok","data":[{"userid":"1004***","nickname":"kaa0722014","mobile":"123123123122","advise":"1312312312312","reply":null,"ctime":"2020-08-28 10:39:13","replytime":null}]}
        renderInfo(info:{userid:string, nickname:string, mobile: string, advise: string, reply:string, replytime:string,ctime:string}){
            let feed = info.reply || "暂无回复"
            this.sugg_content.setString(info.advise);
            let size =  this.measureText(feed,520,24);
            this.feedback.height=  size.height;
            this.feedback.setString(feed)
            this.sugg_time.setString(info.ctime.substr(0,10));
            this.feed_container.doChildrenLayout();
        }

        _info:{userid:string, nickname:string, mobile: string, advise: string, reply:string, replytime:string};
        setInfo(info){
            this._info = info;
            this.renderInfo(info)
        }

        getInfo(){
            return this._info;
        }

        initWithNode(node: ccui.Widget) {
            this.node = node.clone();
            this.node.setVisible(true);
            this.node.setPosition(0,0);
            // this.node.
            ccui.helper.doLayout(this.node);

            
            // this.addChild(this.node);
        }

          
        index:number;
        setIndex(index: number) {
            this.index = index;
        }
        getIndex(): number {
            return this.index
        }

    }


    class SuggestionFeedbackPanel extends kaayou.Layer {
        btnClose: ccui.Button = null;
        suggestion_container:any;
        feedback_item:ccui.Layout;
        submit:ccui.Button;
        btn_close:ccui.Button;

        constructor() {
            super();
            this.initUI();
        }
        @doBindEvent
        initUI() {
            this.initWithccs(lobby.res.SuggestionFeedbackPanel_json);
            let self = this;

            this.suggestion_container = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"suggestion_container");
            this.suggestion_container.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.suggestion_container.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.suggestion_container.setScrollBarEnabled(false);

            this.feedback_item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"feedback_item");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"btn_close");
            //"lobby").on('ui::lobby::Suggestion::backshow'
            this.submit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"submit");

            this.submit.on(kaayou.TouchEvent.TouchEnd,()=>{
                this.Hide()
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby",'ui::lobby::Suggestion::backshow');
            },this)

            this.btn_close.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.Hide();
            },this)

            kaayou.getController("lobby").on("ui::lobby::suggestionfeedback::renderFeedList",(e)=>{
                this.renderFeedbackList(e.data)
            },this)

            kaayou.getController("lobby").on("ui::lobby::suggestionfeedback::layoutfeedlist",(e)=>{
                let {index}  = e.data;
                
                this.suggestion_container.doChildrenLayout();
                this.suggestion_container.jumpToItem(index,cc.p(0,0),cc.p(0,0));
                
            },this)
            
            
            self.Hide();
        }



        renderFeedbackList({data}){
            lodash.forEach(data,(it,i)=>{
                let item = new SuggestionFeedbackPanelItem(this.feedback_item);
                    item.setInfo(it);
                    item.setIndex(i);
                    this.suggestion_container.addChild(item.node);
            });
            this.suggestion_container.doChildrenLayout();
        }


        Show() {
            this.suggestion_container.removeAllChildren();
            kaayou.emit("lobby","mod::Lobby::CustomSuggestionFeedback",{callback:(res)=>{
                if(res===true){
                    this.node.setVisible(true);
                    kaayou.emit("lobby",'ui::lobby::Suggestion::backhide');
                    kaayou.emit("lobby","ui::lobby::CustomSuggestionIsNew",{isNew:false});
                }
                else{
                    kaayou.emit("lobby",'ui::lobby::Suggestion::backshow');
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "暂无回复" });
                }
            }});
            
           
        }
        Hide() {
            this.node.setVisible(false);
        }




    }
}