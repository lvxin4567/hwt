namespace lobby {
    export class TopBarMgr extends common.TopBarMgr {

        onBindEvent() {
            let self = this;
            super.onBindEvent();
            kaayou.getController("lobby").on('ui::UpdateUserInfo', function (e: kaayou.Event) {
                self.onUpdateUserInfo(e.data);
            }, this);

            kaayou.getController("common").on('Config::Update', function (e: kaayou.Event) {
                self.onConfigUpdate();
            }, this);
        }

        onConfigUpdate() {
            let configs = common.mod.Config.AppConfig;
            if (cc.sys.isWeChat) {
                // this.layout_topbar_glod.isVisible() && this.layout_topbar_glod.setVisible(true);
                // this.layout_topbar_card.isVisible() && this.layout_topbar_card.setVisible(false);
                // this.layout_topbar_bean.isVisible() && this.layout_topbar_bean.setVisible(false);
            } else {
                let appmodel = configs.appmodel || 0;
                // this.layout_topbar_glod.isVisible() && this.layout_topbar_glod.setVisible((!!(appmodel & 1)));
                // this.layout_topbar_bean.isVisible() && this.layout_topbar_bean.setVisible((!!(appmodel & 1)));
                // this.layout_topbar_card.isVisible() && this.layout_topbar_card.setVisible((!!(appmodel & 2)));
            }
            // this.layout_topbar_rightmeun.doChildrenLayout();
        }

        onUpdateUserInfo(data: Data_Uerinfo) {
            if (!data) { return; }
            // this.lable_topbar_bean.setString((data.gold_bean || 0) + "");
            // this.lable_topbar_card.setString(data.card.toString());
            let mScoreStr = kaayou.Identify.changeScoreToSortString(data.gold)
            // this.lable_topbar_gold.setString(mScoreStr);
        }

    }
}

