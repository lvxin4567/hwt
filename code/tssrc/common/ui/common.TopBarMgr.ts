namespace common {
    export class TopBarMgr {
        node: cc.Node = null;
        btn_close: ccui.Button = null;
        lable_topbar_title: ccui.TextBMFont = null;

        constructor(node: ccui.Widget) {
            let self = this;
            this.node = node;
            this.InitUI();
            this.onBindEvent();
        }
        InitUI() {
            let self = this;
            let top_bar = this.node;
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>top_bar, "btn_close");
            this.lable_topbar_title = ccui.helper.seekWidgetByName(<ccui.Widget>top_bar, "titleFont");
        }

        onBindEvent() {
            let self = this;
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                self.onCloseClick();
            }, this);

            // this.btn_topbar_addard.on(kaayou.TouchEvent.TouchEnd, function () {
            //     self.onAddCardClick();
            // }, this);

            // this.btn_topbar_addgold.on(kaayou.TouchEvent.TouchEnd, function () {
            //     self.onAddGoldClick();
            // }, this);


            // this.btn_topbar_addbean.on(kaayou.TouchEvent.TouchEnd, function () {
            //     self.onAddBeanClick();
            // }, this);
         }

        setTitle(t: string) {
            if(t=="") this.lable_topbar_title.setVisible(false);
            else{
                // this.ivTitle.loadTexture(`tb_${t}.png`, ccui.Widget.PLIST_TEXTURE);
                // this.ivTitle.setVisible(true);
                this.lable_topbar_title.setString(t);
            }
        }

        __onCloseClick: Function = null;
        setOnCloseClick(f: Function) {
            this.__onCloseClick = f;
        }
        onCloseClick() {
            if (this.__onCloseClick) { this.__onCloseClick() }
        }

        __onAddCardClick: Function = null;
        setOnAddCardClick(f: Function) {
            this.__onAddCardClick = f;
        }
        onAddCardClick() {
            if (this.__onAddCardClick) { this.__onAddCardClick() }
        }

        __onAddGoldClick: Function = null;
        setOnAddGoldClick(f: Function) {
            this.__onAddGoldClick = f;
        }

        onAddGoldClick() {
            if (this.__onAddGoldClick) { this.__onAddGoldClick() }
        }

        __onAddBeanClick: Function = null;
        setOnAddBeanClick(f: Function) {
            this.__onAddBeanClick = f;
        }
        onAddBeanClick() {
            if (this.__onAddBeanClick) { this.__onAddBeanClick() }
        }


        setBeanVisibel(v: boolean) {
           // this.layout_topbar_bean.setVisible(v);
        }
        setCardVisibel(v: boolean) {
           // this.layout_topbar_card.setVisible(v);
        }
        setGoldVisibel(v: boolean) {
           // this.layout_topbar_glod.setVisible(v);
        }

        setBeanBtnVisibel(v: boolean) {
            //this.btn_topbar_addbean.setVisible(v);
        }
        setCardBtnVisibel(v: boolean) {
           // this.btn_topbar_addard.setVisible(v);
        }
        setGoldBtnVisibel(v: boolean) {
          //  this.btn_topbar_addgold.setVisible(v);

        }
        doRightLayout() {
          //  this.layout_topbar_rightmeun.doChildrenLayout();
        }

    }
}

