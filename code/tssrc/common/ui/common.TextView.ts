namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class TextViewMgr{
        static __INS__: TextViewMgr = null;
        private __selfPanel = {};
        private _zOrder = 0;
        static getInstance(order) {
            if (TextViewMgr.__INS__ == null) {
                TextViewMgr.__INS__ = new TextViewMgr();
                TextViewMgr.__INS__.init();
                TextViewMgr.__INS__._zOrder = order
            }
            return TextViewMgr.__INS__;
        }
        init(){
            let self = this;

            kaayou.getController('common').on('ui::TextView::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data.string);
            }, this, 10);

            kaayou.getController('common').on('ui::TextView::Hide', function (e: kaayou.Event) {
                self.getPanel(false).Hide();
            }, this, 10);


            return true;
        }
        getPanel(create: boolean = false) {
            let stage = kaayou.UIManager.getInstance().getCurRuningSceneName()
            if (create && !this.__selfPanel[stage]) {
                this.__selfPanel[stage] = new TextView();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel[stage],this._zOrder);
            }
            return this.__selfPanel[stage];
        }
    }


    class TextView extends kaayou.Layer {

        constructor() {
            super()
            this.initUI();
        }


        private _content: string = "";
        private btn_ok: ccui.Button = null;
        private contentView: ccui.ScrollView = null;

        @doBindEvent
        private initUI() {

            this.initWithccs(res.TextView_json);
            let render = new common.htmlRender
            let self = this;
            Object.defineProperty(this, "content", {
                get: function () {
                    return this._content;
                },
                set: function (str) {

                    if (typeof str !== "string") {
                        throw new Error("TextView Error:please set string")
                    }

                    this._content = str;
                    render.render(self.contentView,str);
                    //this.render();
                }
            })

            this.btn_ok = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_ok");
            this.btn_ok.on(kaayou.TouchEvent.TouchEnd,()=>{
                this.Hide();
            },this)
            this.contentView = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "agreeScroll");
            this.contentView.setPadding({ spacingY: 10,spacingX:10 });
            this.contentView.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.contentView.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.contentView.setScrollBarEnabled(false);

            this.setVisible(false);
        }


       

        // @BindEvent("common","ui::TextView::show")
        Show(str) {
            let self:any = this;
            self.setVisible(true);
            self.content = str;

        }

        // @BindEvent("common","ui::TextView::hide")
        Hide() {
            this.setVisible(false)
        }

    }
}
