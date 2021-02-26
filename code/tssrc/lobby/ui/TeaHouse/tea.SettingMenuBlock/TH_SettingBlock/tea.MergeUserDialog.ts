namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;
    enum MergeUserDialogType{
        NONE,
        QUAN_OP,
        QUAN_MODIFY,
        QUAN_TIP
    }

    enum MERGE_TASK_TYPE{
        SAME_SCENE,
        OTHER_SCENE
    }

    export class tea_MergeUserDialoglMgr {
        static MergeUserDialogType=MergeUserDialogType;
        static __INS__: tea_MergeUserDialoglMgr = null;
        static getInstance(zOrder?: number) {
            if (tea_MergeUserDialoglMgr.__INS__ == null) {
                tea_MergeUserDialoglMgr.__INS__ = new tea_MergeUserDialoglMgr();
                tea_MergeUserDialoglMgr.__INS__.zOrder = zOrder;
                tea_MergeUserDialoglMgr.__INS__.init();
            }
            return tea_MergeUserDialoglMgr.__INS__;
        }
        zOrder: number = null;
        __selfPanel: MergeUserDialog = null;
        init() {
            let self = this;
            this.__selfPanel = null;
            let sm:any = kaayou.UIManager.getInstance();

            kaayou.getController('tea').on('ui::mergeUserDialog::show', function (e: kaayou.Event) {
                if (e.data) {
                    if(e.data.keepalive===true){
                        let linkid
                        ["LOBBY","TEAHOUSE"].forEach(v=>{
                            let __selfPanel:any = new MergeUserDialog();
                                __selfPanel.Show(e.data)
                            linkid =linkid||  __selfPanel._hash_id
                            __selfPanel.linkid = linkid;
                            sm.runingScenes[v].addChild(__selfPanel,self.zOrder);
                        });
                    }else{
                        self.getPanel().Show(e.data) 
                    }
                }
            }, this);



            this.runningScene = sm.getCurRuningSceneName();            
            let list = tea_MergeUserDialoglMgr.scenehook
            function updateSceneChange(scene){
                list.forEach(v=>{
                    let {mask,taskType,task} = v;
                    if(taskType===MERGE_TASK_TYPE.SAME_SCENE && mask === scene){
                        task(mask,scene);
                    }else if(taskType===MERGE_TASK_TYPE.OTHER_SCENE && mask!==scene){
                        task(mask,scene);
                    }

                    v.mask = scene;
                })
            }

            let timer;
            let callbackQueue = function(){
                if(timer)
                    clearTimeout(timer)
                
                let scene = sm.getCurRuningSceneName();
                if(scene !== self.runningScene){
                    self.runningScene = scene;
                    updateSceneChange(scene);
                }

                timer = setTimeout(callbackQueue, 30);
            }

             callbackQueue();


        }

        getPanel() {
            let __selfPanel = new MergeUserDialog();
            kaayou.UIManager.getInstance().getCurRuningScene().addChild(__selfPanel, this.zOrder);
            return __selfPanel;
        }


        static scenehook = []; 
        // private _proxy = null;
        runningScene:string = ""

        static TASK_TYPE = MERGE_TASK_TYPE;

        static sceneWatcher(tid,mask,taskType,task){
            this.scenehook.push({tid,mask,taskType,task});
        }

        static removeWatcher(tid){
            let hoks = tea_MergeUserDialoglMgr.scenehook;
            let idx = (function(){

                for(let i =0 ; i <hoks.length;i++ )
                    if(hoks[i].tid ===tid)
                        return i;

                return -1;

            })()
         
            if(idx!==-1)
                hoks.splice(idx,1);
        }


    }

    class MergeUserDialog extends kaayou.Layer{

        constructor(){
            super();
            this.initUI();
        }

        static tasks = {__all__:{}}
        

        private agreePanel:ccui.Layout = null;
        private confirmPanel:ccui.Layout = null;
        private tipPanel:ccui.Layout = null;
        private contentPanel:ccui.Layout = null;
        private btn_close:ccui.Button = null;
        _hash_id=null;
        initUI(){
            this.initWithccs(res.TH_MergeUserDialog_All_json);
            this.agreePanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node , "agreePanel")
            this.confirmPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node , "confirmPanel")
            this.tipPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node , "tipPanel")
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node , "content")
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node , "btn_close")

            this.agreePanel.setVisible(false)
            this.confirmPanel.setVisible(false)
            this.tipPanel.setVisible(false)

            this.btn_close.on(kaayou.TouchEvent.TouchEnd,()=>{
                this.Hide();
            },this)

        }

        configDialog(data){
            let {type} = data;
            switch(type){
                case MergeUserDialogType.QUAN_OP:
                    this.opDialog(data)
                break;
                case MergeUserDialogType.QUAN_MODIFY:
                    this.modifyDialog(data)
                break;
                case MergeUserDialogType.QUAN_TIP:
                    this.tipDialog(data)
                break;
            }
        }


        // private destory(){
        //     this.contentPanel.removeAllChildren();
        // }

        private initDialog(node:ccui.Layout){
            let cp = node.clone();
            this.contentPanel.addChild(cp)
            cp.setPosition(0,0);
            cp.setVisible(true);
        }

        opDialog(data){
            this.initDialog(this.agreePanel);
            let {tip=null,text,subText=null,action} = data;
            let msgLabel:ccui.Text =ccui.helper.seekWidgetByName(<ccui.Widget>this.contentPanel , "msgLabel") 
                msgLabel.ignoreContentAdaptWithSize(true)
            let msgLabel2:ccui.Text =ccui.helper.seekWidgetByName(<ccui.Widget>this.contentPanel , "msgLabel2") 
                msgLabel2.ignoreContentAdaptWithSize(true)
            let tipLabel:ccui.Text =ccui.helper.seekWidgetByName(<ccui.Widget>this.contentPanel , "tip") 
                tipLabel.ignoreContentAdaptWithSize(true)
            let cancel:ccui.Button =ccui.helper.seekWidgetByName(<ccui.Widget>this.contentPanel , "cancel") 
            let submit:ccui.Button =ccui.helper.seekWidgetByName(<ccui.Widget>this.contentPanel , "submit") 

            msgLabel.string = text;

            if(subText===null)
                msgLabel2.setVisible(false);
            else
                msgLabel2.string = subText;
            

            if(tip===null)
                tipLabel.setVisible(false)
            else{
                tipLabel.setVisible(false)
                tipLabel.string = tip;
            }

            cancel.on(kaayou.TouchEvent.TouchEnd,(e)=>{
                data.cancel && data.cancel(this.Hide.bind(this));
            },this)

            submit.on(kaayou.TouchEvent.TouchEnd,()=>{
                action && action(this.Hide.bind(this));
            },this)
            
        }

        modifyDialog(data){
            this.initDialog(this.confirmPanel);
            let {text,action} = data;
            let msgLabel:ccui.Text =ccui.helper.seekWidgetByName(<ccui.Widget>this.contentPanel , "msgLabel") 
            let cancel:ccui.Button =ccui.helper.seekWidgetByName(<ccui.Widget>this.contentPanel , "cancel") 
            let submit:ccui.Button =ccui.helper.seekWidgetByName(<ccui.Widget>this.contentPanel , "submit") 

            msgLabel.string = text;

            cancel.on(kaayou.TouchEvent.TouchEnd,(e)=>{
                data.cancel && data.cancel(this.Hide.bind(this));
            },this)

            submit.on(kaayou.TouchEvent.TouchEnd,()=>{
                action && action(this.Hide.bind(this))
            },this)

        }

        tipDialog(data){
            this.initDialog(this.tipPanel);
            let self:any =this;
            let {text,keepalive} = data;
            let msgLabel:ccui.Text =ccui.helper.seekWidgetByName(<ccui.Widget>this.contentPanel , "msgLabel") 
            msgLabel.string = text;

            if(keepalive===true){
                tea_MergeUserDialoglMgr.sceneWatcher(
                    this._hash_id ,
                    tea_MergeUserDialoglMgr.getInstance().runningScene, 
                    tea_MergeUserDialoglMgr.TASK_TYPE.OTHER_SCENE,
                    function(sOld,sNew){
                        //由于两边都有，切换就清
                        let manager:any = kaayou.UIManager.getInstance();
                        let lold = manager.runingScenes[sOld].children.filter(v=>self.linkid===v.linkid);
                        lold.forEach(v=>{
                            manager.runingScenes[sOld].removeChild(v)
                        })
                        // let lnew = manager.runingScenes[sNew].children.filter(v=>self.linkid===v.linkid);
                        // lnew.forEach(v => {
                        //     manager.runingScenes[sNew].removeChild(v);
                        // });
                         
                        
                    })
            }

        }


        private cleanAllDialogWithLinkid(){
            let sm:any = kaayou.UIManager.getInstance();
            let self:any = this;
            ["LOBBY","TEAHOUSE"].forEach(scene=>{
                let list =  sm.runingScenes[scene].children.filter(v=>self.linkid===v.linkid);
                list.forEach(v=>{
                    sm.runingScenes[scene].removeChild(v)
                })
            });
        }

        Hide(){
            // this.node.setVisible(false)
            let node:any = this.getPanelByHash();
            let parent = kaayou.UIManager.getInstance().getCurRuningScene();
            let self:any = this
            // node.setVisible(false);
            if(node){
                node.setVisible(false);
                parent.removeChild(node,true);
                MergeUserDialog.tasks.__all__[node._hash_id] && (MergeUserDialog.tasks.__all__[node._hash_id].status = 2);
            }
            if(self.linkid){
                this.cleanAllDialogWithLinkid();
            }
            tea_MergeUserDialoglMgr.removeWatcher(this._hash_id);
        }

        private getPanelByHash(){
            let parent = kaayou.UIManager.getInstance().getCurRuningScene()
            let child = parent.getChildren();
            let target = child.filter((v:any)=>{
                return v._hash_id === this._hash_id;
            })
            return target.pop()
        }
        
        Show(data){
            let self = this;
            this.configDialog(data);
            this._hash_id = Number(Math.random().toString().substr(2,10)).toString(16) + (new Date);
            //单窗口需求
            if(data.keep===false){
                //{hash:this._hash_id,status:0,closeFn:function(){self.Hide()}.bind(this)}
                MergeUserDialog.tasks[data.ID] = MergeUserDialog.tasks[data.ID] || [];
                //挤掉无用的窗体
                if(MergeUserDialog.tasks[data.ID].length>0){
                    MergeUserDialog.tasks[data.ID].filter(v=>v.status===0).forEach(v=>{
                        v.status = 1;
                        v.closeFn();
                    })
                }
                let task = {hash:this._hash_id,status:0,closeFn:function(){self.Hide()}.bind(this)}
                MergeUserDialog.tasks[data.ID].push(task)
                MergeUserDialog.tasks.__all__[this._hash_id] = task;
            }
            this.node.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg")
            });
        }

    }

}