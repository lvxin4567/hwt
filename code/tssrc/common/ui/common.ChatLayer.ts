
namespace common {
    export abstract class ChatLayer extends kaayou.ModelLayer {
        _isInit: boolean = false;
        _emotionScr: ccui.ScrollView = null;
        _quyuScr: ccui.ScrollView = null;
        _quyuStrsArray: Array<string> = null;

        _curMod: mod.gameBaseMod<mod.IGame_User_Info, mod.ITableInfo> = null;

        //聊天面板相关属性,全部都要在initProperties里面赋好值
        _rowNum: number = 0;
        _maxNum: number = 0;
        _emotionPosX: number[] = null;
        _emotionPosY: number = 0;
        _emotionChatLineName: string = null;
        _emotionBgName: string = null;
        _emotionName = null;
        _talkNormalCol: cc.Color = null;
        _talkPressCol: cc.Color = null;

        constructor(ccsName: string) {
            super();
            this._isInit = false;
            this._emotionScr = null;
            this._quyuScr = null;
            this._quyuStrsArray = [];

            //聊天面板相关属性,全部都要在initProperties里面赋好值
            this._rowNum = 0;
            this._maxNum = 0;
            this._emotionPosX = [];
            this._emotionPosY = 0;
            this._emotionChatLineName = "";
            this._emotionBgName = "";
            this._emotionName = "";
            this._talkNormalCol = cc.color(0, 0, 0, 0);
            this._talkPressCol = cc.color(0, 0, 0, 0);
            this.initUI(ccsName);
        }

        initUI(ccsName: string) {
            let self = this;
            if (this._isInit) return;
            this._isInit = true;
            this.initWithccs(ccsName);
            this.initProperties();
            this.initEmotionScr();
            this.initQuYuScr();
            this.Hide();

            //点击别处隐藏聊天面板
            let hideBG: ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "chatPanel");
            if (hideBG) {
                hideBG.on(kaayou.TouchEvent.TouchEnd, function () {
                    self.Hide();
                }, this);
            }
        }

        setCurMod(curMod: common.mod.gameBaseMod<common.mod.IGame_User_Info, common.mod.ITableInfo>) {
            this._curMod = curMod;
        }

        abstract initProperties();

        initEmotionScr() {
            let self = this;
            //加载表情资源
            this._emotionScr = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "emotionScr");
            this._emotionScr.setPadding({ spacingY: 0 });
            this._emotionScr.setScrollBarEnabled(true);
            this._emotionScr.setChildrenLayoutDirection(ccui.ScrollView.DIR_VERTICAL);
            let cellPanel: ccui.Layout = ccui.helper.seekWidgetByName(this._emotionScr, "cellPanel");
            for (let i = 0; i < this._maxNum; i++) {
                //添加分割线
                if (i < this._maxNum - this._maxNum % this._rowNum) {
                    let line: ccui.ImageView = ccui.ImageView.create(this._emotionChatLineName, ccui.Widget.PLIST_TEXTURE);
                    line.setPosition(cellPanel.getContentSize().width * 0.5, -2);
                    cellPanel.addChild(line, 3);
                }

                if (i % this._rowNum == 0 && i != 0) {
                    cellPanel = <ccui.Layout>cellPanel.clone();
                    cellPanel.removeAllChildren();
                    this._emotionScr.addChild(cellPanel);
                }

                //表情背景
                let emotionbg_img: ccui.ImageView = ccui.ImageView.create(this._emotionBgName, ccui.Widget.PLIST_TEXTURE);
                emotionbg_img.setCapInsets(cc.rect(2, 2, 2, 2));
                emotionbg_img.setAnchorPoint(0.5, 0.5);
                emotionbg_img.setVisible(false);
                emotionbg_img.setPosition(this._emotionPosX[i % this._rowNum], this._emotionPosY);
                emotionbg_img.setTag(1000);
                cellPanel.addChild(emotionbg_img, 1, `emotionbg_img_${i % this._rowNum}`);

                //表情
                let emotion_img: ccui.ImageView = ccui.ImageView.create(`${this._emotionName}${i + 1}.png`, ccui.Widget.PLIST_TEXTURE);
                emotion_img['index'] = i;
                emotion_img.setVisible(true);
                emotion_img.setAnchorPoint(0.5, 0.5);
                emotion_img.setPosition(this._emotionPosX[i % this._rowNum], this._emotionPosY);
                emotion_img.setTag(i);
                emotion_img.setTouchEnabled(true);
                emotion_img.on(kaayou.TouchEvent.TouchStart, this.onTouchStartEmotion, this);
                emotion_img.on(kaayou.TouchEvent.TouchEnd, this.onTouchEndEmotion, this);
                cellPanel.addChild(emotion_img, 2);
            }
            this._emotionScr.doChildrenLayout();
            this._emotionScr.addEventListener(function (scroll: ccui.ScrollView, type: number) {
                if (type == ccui.ScrollView.EVENT_SCROLLING) {
                    self.resetEmotionScr();
                }
            });
        }

        onTouchStartEmotion(e: kaayou.TouchEvent) {
            let emotion_img: ccui.ImageView = e.target;
            let emotionbg_img = emotion_img.getParent().getChildByName(`emotionbg_img_${emotion_img.getTag() % this._rowNum}`);
            emotionbg_img.setVisible(true);
        }

        onTouchEndEmotion(e: kaayou.TouchEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let emotion_img: ccui.ImageView = e.target;
            this.resetEmotionScr();
            this.sendEmotionMsg(emotion_img.getTag());
            this.Hide();
        }

        resetEmotionScr() {
            let cellsArray = this._emotionScr.getChildren();
            for (let i = 0; i < cellsArray.length; i++) {
                let cell = cellsArray[i];
                let children = cell.getChildren();
                for (let j = 0; j < children.length; j++) {
                    if ((<cc.Node>children[j]).getTag() == 1000) {
                        children[j].setVisible(false);
                    }
                }
            }
        }

        abstract sendEmotionMsg(index: number);

        initQuYuScr() {
            let self = this;
            this._quyuScr = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "quyuScr");
            this._quyuScr.setPadding({ spacingY: 0 });
            this._quyuScr.setScrollBarEnabled(true);
            this._quyuScr.setChildrenLayoutDirection(ccui.ScrollView.DIR_VERTICAL);
            let cellPaneldemo: ccui.Layout = ccui.helper.seekWidgetByName(this._quyuScr, "cellPanel");
            for (let i = 0; i < this._quyuStrsArray.length; i++) {
                // if (i > 0) {
                //     cellPanel = <ccui.Layout>cellPanel.clone();
                //     this._quyuScr.addChild(cellPanel);
                // }
                let cellPanel = new chatLayerCell();
                // cellPanel.initUi();
                this._quyuScr.addChild(cellPanel);

                cellPanel.setTag(i);
                cellPanel.setTouchEnabled(true);
                cellPanel.on(kaayou.TouchEvent.TouchStart, this.onTouchStartTalk, this);
                cellPanel.on(kaayou.TouchEvent.TouchEnd, this.onTouchEndTalk, this);

                // let talk_text: ccui.Text = ccui.helper.seekWidgetByName(cellPanel, "Text_1");
                // talk_text.ignoreContentAdaptWithSize(true);
                cellPanel.textNormal.setString(`${i + 1}.` + this._quyuStrsArray[i]);
                cellPanel.textNormal.setTextColor(this._talkNormalCol);
                cellPanel.textNormal.setVisible(true);
                cellPanel.textPress.setString(`${i + 1}.` + this._quyuStrsArray[i]);
                cellPanel.textPress.setTextColor(this._talkPressCol);
                cellPanel.textPress.setVisible(false);

                // talk_text.setTag(1002);

                // let imgBg: ccui.ImageView = ccui.helper.seekWidgetByName(cellPanel, "Image_2");
                cellPanel.textBg.setVisible(false);
                // imgBg.setTag(1001);
            }
            if (cellPaneldemo) {
                cellPaneldemo.removeFromParent();
            }
            this._quyuScr.doChildrenLayout();
            this._quyuScr.addEventListener(function (scroll: ccui.ScrollView, type: number) {
                if (type == ccui.ScrollView.EVENT_SCROLLING) {
                    self.resetTalkScr();
                }

            });
        }

        onTouchStartTalk(e: kaayou.TouchEvent) {
            let cellPanel: chatLayerCell = e.target;
            // cellPanel.text = Patch.ChangeTextColor(cellPanel.text ,cellPanel.text.getString()  ,this._talkPressCol );
            cellPanel.textNormal.setVisible(false);
            cellPanel.textPress.setVisible(true);
            cellPanel.textBg.setVisible(true);
        }

        onTouchEndTalk(e: kaayou.TouchEvent) {
            let cellPanel: chatLayerCell = e.target;
            this.resetTalkScr();
            this.sendTalkMsg(cellPanel.getTag());
            this.Hide();
        }

        resetTalkScr() {
            let cellsArray = this._quyuScr.getChildren();
            for (let i = 0; i < cellsArray.length; i++) {
                let cellPanel: chatLayerCell = cellsArray[i];
                cellPanel.textNormal.setVisible(true);
                cellPanel.textPress.setVisible(false);
                cellPanel.textBg.setVisible(false);
            }
        }

        abstract sendTalkMsg(index: number);
    }

    export class chatLayerCell extends ccui.Layout {
        textNormal: ccui.Text = null;
        textPress:ccui.Text = null;
        textBg: ccui.ImageView = null;
        constructor() {
            super();

            this.setAnchorPoint(0, 0.5);
            this.setContentSize(420, 65);
            this.textBg = new ccui.ImageView();
            this.textBg.loadTexture("text-l-bg.png", ccui.Widget.PLIST_TEXTURE);
            this.textBg.setAnchorPoint(0, 0.5);
            this.textBg.setScale9Enabled(true);
            this.textBg.setContentSize(this.getContentSize());
            this.textBg.setPosition(cc.p(0, this.getContentSize().height / 2));
            this.addChild(this.textBg);

            this.textNormal = new ccui.Text("", "Arial", 23);
            this.textNormal.ignoreContentAdaptWithSize(true);
            this.textNormal.setAnchorPoint(0, 0.5);
            this.textNormal.setPosition(cc.p(20, this.getContentSize().height / 2));
            this.addChild(this.textNormal);

            this.textPress = new ccui.Text("", "Arial", 23);
            this.textPress.ignoreContentAdaptWithSize(true);
            this.textPress.setAnchorPoint(0, 0.5);
            this.textPress.setPosition(cc.p(20, this.getContentSize().height / 2));
            this.addChild(this.textPress);
        }
        // initUi() {

        // }
    }
}