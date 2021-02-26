/**
 * 
 * 实名认证面板
 */

namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class SuggestionPanelMgr {
        static __INS__: SuggestionPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (SuggestionPanelMgr.__INS__ == null) {
                SuggestionPanelMgr.__INS__ = new SuggestionPanelMgr();
                SuggestionPanelMgr.__INS__.init();
                SuggestionPanelMgr.__INS__._zOrder = _zOrder;
            }
            return SuggestionPanelMgr.__INS__;
        }
        public _zOrder = 0;
        __selfPanel: SuggestionPanel = null;
        init() {
            let self = this;
            kaayou.getController('lobby').on('ui::SuggestionPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('lobby').on('ui::SuggestionPanel::Hide', function (e: kaayou.Event) {
                if (!self.__selfPanel) {
                    return;
                }
                self.getPanel(false).Hide(e.data);
            }, this, 10);

            
            kaayou.getController("lobby").on("ui::LoginSucceed",()=>{
                kaayou.emit("lobby","mod::Lobby::CustomSuggestionIsNew");
            },this)


            return true;
        }
        
        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new SuggestionPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);    //这个地方怎么不管用？？？
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            if (this.__selfPanel) {
                return this.__selfPanel;  
            }
        }
    }


    class SuggestionPanelItem{

        constructor(item:cc.Node){
            this.initUI(item)
        }

        node:cc.Node = null;
        custom_ask_text:ccui.Text;
        feedback_text:ccui.Text;
        id_text:ccui.Text;

        
        initUI(item:cc.Node){
            this.initWithNode(<ccui.Widget>item);
            this.custom_ask_text = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"custom_ask_text")
            this.feedback_text = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"feedback_text")
            this.id_text = ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"id_text")
        }

        updateInfo({userid,advise,reply}){
            this.custom_ask_text.setString(advise);
            this.feedback_text.setString(`客服回复：${reply||"暂无回复"}`);
            this.id_text.setString(`账号:${userid}`)
        }

        _info:any;
        setInfo(info){
            this._info = info;
           this.updateInfo(info)
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


    class SuggestionPanel extends kaayou.Layer {
        btnClose: ccui.Button = null;
        
        boxAPI = null;
        submit: ccui.Button;
        ErrMsg: ccui.Text;
        input_mail: ccui.TextField;
        icon_wechat:ccui.Button;
        repo_list:ccui.ScrollView;
        reddot:ccui.ImageView;
        renderNode: ccui.Layout;
        btn_feedback:ccui.Button;
        lb_textcount: ccui.Text;

        constructor() {
            super();
            this.initUI();
        }
        @doBindEvent
        initUI() {
            this.initWithccs(lobby.res.SuggestionPanel_json);
            let self = this;
            let boxAPI = this.boxAPI= kaayou.editBox.target(this.node);
            
            this.ErrMsg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node ,"ErrMsg");
            this.input_mail = ccui.helper.seekWidgetByName(<ccui.Widget>this.node ,"input_mail");
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node ,"btn_close");
            this.repo_list = ccui.helper.seekWidgetByName(<ccui.Widget>this.node ,"repo_list");
            this.icon_wechat = ccui.helper.seekWidgetByName(<ccui.Widget>this.node ,"btn_wechat");
            this.btn_feedback = ccui.helper.seekWidgetByName(<ccui.Widget>this.node ,"btn_feedback");
            this.reddot = ccui.helper.seekWidgetByName(<ccui.Widget>this.btn_feedback ,"reddot");
            this.lb_textcount = ccui.helper.seekWidgetByName(<ccui.Widget>this.node ,"lb_textcount");
            this.submit  = ccui.helper.seekWidgetByName(<ccui.Widget>this.node ,"submit");

            this.repo_list.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.repo_list.setPadding({ spacingY: 10 });
            this.repo_list.setScrollBarEnabled(false);

            this.renderNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node ,"suggestion_item");

            kaayou.getController("lobby").on("ui::lobby::SuggestionList",(e)=>{
                let data = e.data;
                lodash.forEach(data.data,(info:{userid:string,nickname:string,mobile:string,advise:string,reply:string,ctime:string})=>{
                    //{"userid":"1004***","nickname":"kaa8172069","mobile":"12345678911","advise":"hello","reply":"hi","ctime":"2020-08-25 13:45:46"}
                    let item = new SuggestionPanelItem(this.renderNode);
                        item.setInfo(info)
                    this.repo_list.addChild(item.node);
                })
                
                this.repo_list.doChildrenLayout();
            },this)

            kaayou.getController("lobby").on("ui::lobby::SuggestionSuccess",(e)=>{
                kaayou.emit("common", 'ui::Dialog::Show', {
                    msg: "感谢您的建议！"
                })
                this.boxAPI.setValue("input_content","")
                this.boxAPI.setValue("input_mail","")
                this.node.setVisible(false);
            },this);

            
            // kaayou.getController("lobby").on("ui::lobby::CustomSuggestionIsNew",(e)=>{
            //     let {isNew} = e.data;
            //     this.reddot.setVisible(isNew===true);
            // },this);

            kaayou.getController("lobby").on('ui::lobby::Suggestion::backshow',()=>{
                this.node.setVisible(true);
            },this)

            kaayou.getController("lobby").on('ui::lobby::Suggestion::backhide',()=>{
                this.node.setVisible(false);
            },this)


            
            let reg = /^[《》<>:：。\.\_,，“”`'a-zA-Z0-9\u4e00-\u9fa5\s]{10,200}$/;
            
            boxAPI.attachTextEdit("input_content",(result)=>{
               
            },{
                placeholdStr:"您的满意是我们最大的动力\n请留下您的宝贵意见，吐槽....\n我会用心对待，您的每次发声。",
                phFontColor:"#3F1A0A",
                fontColor:"#3F1A0A",
                fontSize:24,
                type:"string",
                pressdown:(result)=>{
                    this.lb_textcount.setString(`${result.length}/200`)
                },
                setMaxLength:200,
                setInputMode:0
            })


            let phoneReg = /[a-zA-Z0-9]{5,30}$/;
            boxAPI.attachTextEdit("input_mail",(result)=>{
                // if(phoneReg.test(result)){
                //     this.ErrMsg.setString("请留下您的联系方式，让我们更好的为您服务。");
                //     return;
                // }
                // this.ErrMsg.setString("")
                // this.doCandoSubmit();

            },{
                placeholdStr:"QQ/微信/电话",
                phFontColor:"#3F1A0A",
                fontColor:"#3F1A0A",
                fontSize:24,
                type:"string",
                setMaxLength:30,
                setInputMode:0
            })

            this.btn_feedback.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby","ui::lobby::CustomSuggestionIsNew",{isNew:false});
                kaayou.DataSet.set("lobby::hasNotReadMessage",(false).toString())
                this.reddot.setVisible(false);
                kaayou.emit('lobby','ui::SuggestionFeedbackPanel::Show');
            },this)

            this.icon_wechat.setVisible(false);
            // this.icon_wechat.on(kaayou.TouchEvent.TouchEnd,()=>{
            //     let copyPasteString = ""
            //     let isSuccess = kaayou.PlatformMgr.getInstance().sys.copyStringToPasteBoard(copyPasteString);
            //     if (isSuccess) {
            //         kaayou.emit('common', "ui::Toast::Show", { msg: "公众号已复制，请在微信(wechat)应用中查找我们的公众号号码" })
            //     }
            // },this)

            this.btnClose.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.Hide({clean:true})
            },this)

            this.submit.on(kaayou.TouchEvent.TouchEnd,()=>{
                let res = this.doCandoSubmit();
                if(res.phone===false){
                    kaayou.emit("common", 'ui::Dialog::Show', {
                        msg: "请留下您的联系方式，让我们更好的为您服务。"
                    })
                    return;
                }

                if(res.content===false){
                    let str = this.boxAPI.getValue("input_content");

                    if(str.length < 10){
                        kaayou.emit("common", 'ui::Dialog::Show', {
                            msg: "寥寥片语，无法述说您的心声，请多留一些话吧。"
                        })
                        return;
                    }

                    if(str.length > 200){
                        kaayou.emit("common", 'ui::Dialog::Show', {
                            msg: "千言万语，才能表达您的情感，但恳请您精简语言。"
                        })
                        return;
                    }

                    kaayou.emit("common", 'ui::Dialog::Show', {
                        msg: "您输入的内容有不允许的字符哦，请您再看看。"
                    })

                    return;
                }

                this.submitCustomSuggestion();

            },this)



            self.node.setVisible(false);
            self.initSubmit();
        }
        submitCustomSuggestion() {
            let subData:any = {}
                subData.mobile = this.boxAPI.getValue("input_mail");
                subData.advise = this.boxAPI.getValue("input_content");

            kaayou.emit("lobby","mod::Lobby::CustomSuggestionCommit",subData);
        }

        initSubmit(){       
            let hasNotRead = kaayou.DataSet.get("lobby::hasNotReadMessage")===(true).toString();
            this.reddot.setVisible(hasNotRead);
            this.boxAPI.setValue("input_content","")
            this.boxAPI.setValue("input_mail","")
            this.ErrMsg.setString("")
            this.lb_textcount.setString("(0/200)")
            this.repo_list.removeAllChildren();
            this.doCandoSubmit();
        }

        doCandoSubmit() {
            let content:any = this.boxAPI.getValue("input_content")
            let phone:any = this.boxAPI.getValue("input_mail") 
                content  = !!content && (content.length>10 && content.length<201) ///^[《》<>:：。\.\_,，“”`'a-zA-Z0-9\u4e00-\u9fa5\s]{10,200}$/.test(content)
                phone  = !!phone && /[a-zA-Z0-9]{5,30}$/.test(phone);

            //Patch.SetBtnAndTextBright(this.submit, content && phone)
            return {phone , content};
        }
        Show() {
            // this.doCandoSubmit();
            this.node.setVisible(true);
            this.initSubmit();
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:function(){
                    kaayou.emit("lobby","mod::Lobby::CustomSuggestionList");
                }
            });
        }
        Hide({clean}) {
            let self = this;
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this.node,
                    action:function(){
                        if(clean){
                            self.initSubmit();
                        }
                    }
                }
            )
        }




    }
}