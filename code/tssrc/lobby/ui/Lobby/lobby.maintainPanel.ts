
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;


    export class MaintainManager {
        static __INS__: MaintainManager = null;
        static getInstance() {
            if (MaintainManager.__INS__ == null) {
                MaintainManager.__INS__ = new MaintainManager();
                MaintainManager.__INS__.init();
            }
            return MaintainManager.__INS__;
        }
        private _Maintains: { [key: string]: lobby.MaintainPanel };
        private _MaintainssIndex = 1;
        init() {
            let self = this;
            this._Maintains = {};
            kaayou.getController('lobby').on('ui::Maintain::Show', function (e: kaayou.Event) {
                self.MaintainShow(e.data);
            }, this, 10);
            kaayou.getController('lobby').on('ui::Maintain::Removed', function (e: kaayou.Event) {
                self.MaintainRemoved(e.data);
            }, this, 10);
            kaayou.getController('lobby').on('ui::Maintain::Hide', function (e: kaayou.Event) {
                self.MaintainHide(e.data);
            }, this, 10);
            return true;

        }
        MaintainShow(data: {msg: string ,code:number}) {
            let Maintain = new lobby.MaintainPanel();
            Maintain.setIndex(this._MaintainssIndex++);
            this._Maintains[Maintain.getIndex()] = Maintain;
            kaayou.UIManager.getInstance().getMainScene().addChild(Maintain);
            Maintain.Show(data);
        }

        MaintainHide(data) {
            for (var x in this._Maintains) {
                this._Maintains[x].Hide();
            }
        }

        MaintainRemoved(data: { index: number }) {
            let Maintain = this._Maintains[data.index];
            this._Maintains[data.index] = null;
            delete this._Maintains[data.index];
            if (Maintain && Maintain.isRunning()) {
                Maintain.removeFromParent();
            }
        }

    }



    export class MaintainPanel extends kaayou.Layer {
        maskBg: cc.Layer = null;
        contentPanel: ccui.Layout = null;
        btnPanel: ccui.Layout = null;
        msgLabel: ccui.Text = null;
        btn_exit:ccui.Text = null;
        exit_Title:ccui.TextBMFont = null
        _maintainData = null;
        constructor() {
            super();
            this.initUI();
        }
        initUI() {
            this.initWithccs(lobby.res.MaintainNotice_Json);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.btnPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnPanel");
            this.msgLabel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "content");
            this.btn_exit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_exit");
            this.exit_Title = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bmfont");
            this.btn_exit.on(kaayou.TouchEvent.TouchEnd,function(){
                console.log("-----------------------------------------------------------");
                self.Hide();
                if (!!!self._maintainData.code || self._maintainData.code == 135) {
                    cc.game.end();
                }
            },this);
            this.setVisible(false);
        }


        btnCall: Array<Function> = null;
        close_call: Function = null;
        // @BindEvent('common', 'ui::Dialog::Show')
        Show(data:{code:number, msg: string}) {
            this._maintainData = data
            if (data.code == 136) {
                this.exit_Title.setString("确定");
            }else{
                this.exit_Title.setString("退出游戏");
            }

            this.msgLabel.setString(data.msg.toString());
            this.setVisible(true);
        }
        private _index = -1;
        setIndex(index: number) {
            this._index = index;
        }
        getIndex(): number {
            return this._index;
        }

        Hide() {
            this.close_call = null;
            this.btnCall = null;
            kaayou.emit('lobby', 'ui::Maintain::Removed', { index: this.getIndex() });
        }
    }
}