/// <reference path="../Lobby/lobby.CreateRoomPanel.ts" />

namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class CreateRoomPanelMgr {
        static __INS__: CreateRoomPanelMgr = null;
        static getInstance() {
            if (CreateRoomPanelMgr.__INS__ == null) {
                CreateRoomPanelMgr.__INS__ = new CreateRoomPanelMgr();
                CreateRoomPanelMgr.__INS__.init();
            }
            return CreateRoomPanelMgr.__INS__;
        }
        __selfPanel: CreateRoomPanel = null;
        public _gold = 0;
        onUpdateUserInfo(data: Data_Uerinfo) {
            this._gold = data.gold;
        }
        init() {
            let self = this;
            this.__selfPanel = null;
    
            kaayou.getController('tea').on("ui::CreateRoom::Show", function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this);
    
            kaayou.getController('tea').on("ui::CreateRoom::Hide", function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this);
    
            return true;
        }
    
        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new CreateRoomPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel)
            }
            return this.__selfPanel;
        }
    
    }

    export class CreateRoomPanel extends lobby.CreateRoomPanel{       
        constructor(){
            super();
        }
        isDownload() {
            return false;
        }
        getModuleName() {
            return this._moduleName = 'tea';
        }
        
    }

}