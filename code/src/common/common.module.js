var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var common;
(function (common) {
    common.res = {
        DebugPanel_json: "res/common/DebugPanel/DebugPanel.json",
        Loading_spine_atlas: "res/common/LoadingPanel/loading.atlas",
        Loading_spine_json: "res/common/LoadingPanel/loading.json",
        Loading_spine_png: "res/common/LoadingPanel/loading.png",
        LoadingPanel_json: "res/common/LoadingPanel/LoadingPanel.json",
        RichDom_json: "res/common/RichDom/RichDom.json",
        UserHead_plist: "res/common/Users/HeadImg.plist",
        DialogPanel_json: "res/common/DialogPanel/DialogPanel.json",
        ToastPanel_json: "res/common/ToastPanel/ToastPanel.json",
        SharePanel_json: "res/common/SharePanel/SharePanel.json",
        LobbySettingPanel_json: "res/common/SettingPanel/LobbySettingPanel.json",
        VerifyPhone_json: "res/common/VerifyPhone/VerifyPhone.json",
        TextView_json: "res/common/TextView/TextView.json",
        ////////////////////////////////
        //坐桌列表
        TableListPanel_json: "res/common/TableListPanel/TableListPanel.json",
        TableListPanelCell3p_json: "res/common/TableListPanel/TableListPanelCell3p.json",
        TableListPanelCell4p_json: "res/common/TableListPanel/TableListPanelCell4p.json",
        TableListPanelCell5p_json: "res/common/TableListPanel/TableListPanelCell5p.json",
        TableListPlayerPanel_json: "res/common/TableListPanel/TableListPlayerPanel.json",
        //游戏茶楼数据相关面板
        InGameTeaHousePanel_json: "res/common/InGameTeaHousePanel/InGameTeaHousePanel.json",
        //游戏购买记牌器相关面板
        BuyCardRecordPanel_json: "res/common/BuyCardRecordPanel/BuyCardRecordPanel.json",
        //扑克
        PokerTag_plist: "res/common/Poker/pokerTag.plist",
        Poker_BigCard01_plist: "res/common/Poker/PokerBigCard01.plist",
        // Poker_BigCard02_plist: "res/common/Poker/PokerBigCard02.plist",
        Poker_SmallCard01_plist: "res/common/Poker/PokerSmallCard01.plist",
        Poker_SmallCard02_plist: "res/common/Poker/PokerSmallCard02.plist",
        //魔法表情资源
        aixinJson: "res/common/MagicExpression/Hurl_ske_aixin.json",
        aixinAtals: "res/common/MagicExpression/Hurl_ske_aixin.atlas",
        aixinPng: "res/common/MagicExpression/Hurl_ske_aixin.png",
        eggJson: "res/common/MagicExpression/Hurl_ske_egg.json",
        eggAtals: "res/common/MagicExpression/Hurl_ske_egg.atlas",
        eggPng: "res/common/MagicExpression/Hurl_ske_egg.png",
        flowerJson: "res/common/MagicExpression/Hurl_ske_flower.json",
        flowerAtals: "res/common/MagicExpression/Hurl_ske_flower.atlas",
        flowerPng: "res/common/MagicExpression/Hurl_ske_flower.png",
        tuoxieJson: "res/common/MagicExpression/Hurl_ske_tuoxie.json",
        tuoxieAtals: "res/common/MagicExpression/Hurl_ske_tuoxie.atlas",
        tuoxiePng: "res/common/MagicExpression/Hurl_ske_tuoxie.png",
        zhadanJson: "res/common/MagicExpression/Hurl_ske_zhadan.json",
        zhadanAtals: "res/common/MagicExpression/Hurl_ske_zhadan.atlas",
        zhadanPng: "res/common/MagicExpression/Hurl_ske_zhadan.png",
        // magicExpressionAtals: "res/common/MagicExpression/Hurl_ske.atlas",
        // magicExpressionPng: "res/common/MagicExpression/Hurl_ske.png",
        VersionDialogPanel_json: "res/common/VersionDialogPanel/VersionDialogPanel.json",
        //shaders
        example_ColorBars_vsh: "res/common/Shaders/example_ColorBars.vsh",
        example_ColorBars_fsh: "res/common/Shaders/example_ColorBars.fsh",
        //语音
        micLayer_json: "res/common/micLayer/micLayer.json",
        micLayerPlist: "res/common/micLayer/voices.plist",
        //
        PokerEmotion_plist: "res/common/Poker/PokerEmotion1.plist",
        PokerEmotionAction1_plist: "res/common/Poker/emotion/E1.plist",
        PokerEmotionAction2_plist: "res/common/Poker/emotion/E2.plist",
        PokerEmotionAction3_plist: "res/common/Poker/emotion/E3.plist",
        PokerEmotionAction4_plist: "res/common/Poker/emotion/E4.plist",
        PokerEmotionAction5_plist: "res/common/Poker/emotion/E5.plist",
        PokerEmotionAction6_plist: "res/common/Poker/emotion/E6.plist",
        PokerEmotionAction7_plist: "res/common/Poker/emotion/E7.plist",
        PokerEmotionAction8_plist: "res/common/Poker/emotion/E8.plist",
        PokerEmotionAction9_plist: "res/common/Poker/emotion/E9.plist",
        PokerEmotionAction10_plist: "res/common/Poker/emotion/E10.plist",
        PokerEmotionAction11_plist: "res/common/Poker/emotion/E11.plist",
        PokerEmotionAction12_plist: "res/common/Poker/emotion/E12.plist",
        PokerEmotionAction13_plist: "res/common/Poker/emotion/E13.plist",
        //房卡场资源
        GPSLayer_json: "res/common/GPSLayer/MajonGPSLayer.json",
        PlayerFleeLayer_json: "res/common/playerFleeLayer/playerFleeLayer.json",
        DissMissLayer_json: "res/common/DissRoom/MajonDissRoom.json",
        chatLayer_json: "res/common/MajonRes/ChatLayer/ChatLayer.json",
        Fewerfriend_json: "res/common/Fewerfriend/FewerfriendLayer.json",
        AntiNoteCardLayer_json: "res/common/Poker/AntiNoteCard/AntiNoteCard.json",
        //麻将资源
        //majonGameEnd_json: "res/common/MajonRes/gameEndLayer/gameEndLayer.json",
        MajonSkinPanel_json: "res/common/MajonRes/SkinPanel/MajonSkinPanel.json",
        MajonMenuPanel_json: "res/common/MajonRes/MenuPanel/MajonMenuPanel.json",
        MajonNewMenuPanel_json: "res/common/MajonRes/MenuPanel/MajonNewMenuPanel.json",
        MajonOperate_json: "res/common/MajonRes/operateLayer/operateLayer.json",
        MajonTingLayer_json: "res/common/MajonRes/tingLayer/tingLayer.json",
        MajonUserInfo_json: "res/common/MajonRes/userInfoLayer/userInfoLayer.json",
        gameShareLayer_json: "res/common/SharePanel/InviteLayer.json",
        MajonNewSetingPanel_json: "res/common/MajonRes/SettingPanel/MajonNewSetingPanel.json",
        alpha_4x4: "res/common/bgs/alpha4x4.png",
        bg_0: "res/common/bgs/mj_lv_game_bg.png",
        bg_1: "res/common/bgs/mj_lan_game_bg.png",
        bg_2: "res/common/bgs/mj_huang_game_bg.png",
        bg_3d_0: "res/common/bgs/3d_mj_lv_game_bg.png",
        bg_3d_1: "res/common/bgs/3d_mj_lan_game_bg.png",
        bg_3d_2: "res/common/bgs/3d_mj_huang_game_bg.png",
        MajonCardAll01_png: "res/common/MajonRes/MajonCardAll01.png",
        MajonCardAll01_plist: "res/common/MajonRes/MajonCardAll01.plist",
        MajonCardAll02_png: "res/common/MajonRes/MajonCardAll02.png",
        MajonCardAll02_plist: "res/common/MajonRes/MajonCardAll02.plist",
        MajonCard3D_png: "res/common/MajonRes/3DMajonCard.png",
        MajonCard3D_plist: "res/common/MajonRes/3DMajonCard.plist",
        MajonCard3DFlower_png: "res/common/MajonRes/3DMajonFlower.png",
        MajonCard3DFlower_plist: "res/common/MajonRes/3DMajonFlower.plist",
        MajonCardPos_json: "res/common/MajonRes/mjInfo.json",
        MajonCardPos3D_json: "res/common/MajonRes/mjInfo3D.json",
        gps_png: "res/common/GPSLayer/xt_mjGPSLayer.png",
        gps_plist: "res/common/GPSLayer/xt_mjGPSLayer.plist",
        magicEmotion_plist: "res/common/MagicEmotion/common.MagicEmotion.plist",
        //骨骼动画
        cardTypeAni_ske_anxiao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_anxiao.json",
        cardTypeAni_ske_Atlas_anxiao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_anxiao.atlas",
        cardTypeAni_ske_Png_anxiao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_anxiao.png",
        cardTypeAni_ske_chaotian: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_chaotian.json",
        cardTypeAni_ske_Atlas_chaotian: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_chaotian.atlas",
        cardTypeAni_ske_Png_chaotian: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_chaotian.png",
        cardTypeAni_ske_chenglaizi: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_chenglaizi.json",
        cardTypeAni_ske_Atlas_chenglaizi: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_chenglaizi.atlas",
        cardTypeAni_ske_Png_chenglaizi: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_chenglaizi.png",
        cardTypeAni_ske_chi: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_chi.json",
        cardTypeAni_ske_Atlas_chi: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_chi.atlas",
        cardTypeAni_ske_Png_chi: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_chi.png",
        cardTypeAni_ske_liangdao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_liangdao.json",
        cardTypeAni_ske_Atlas_liangdao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_liangdao.atlas",
        cardTypeAni_ske_Png_liangdao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_liangdao.png",
        cardTypeAni_ske_dianxiao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_dianxiao.json",
        cardTypeAni_ske_Atlas_dianxiao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_dianxiao.atlas",
        cardTypeAni_ske_Png_dianxiao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_dianxiao.png",
        cardTypeAni_ske_feng: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_feng.json",
        cardTypeAni_ske_Atlas_feng: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_feng.atlas",
        cardTypeAni_ske_Png_feng: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_feng.png",
        cardTypeAni_ske_fengyise: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_fengyise.json",
        cardTypeAni_ske_Atlas_fengyise: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_fengyise.atlas",
        cardTypeAni_ske_Png_fengyise: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_fengyise.png",
        cardTypeAni_ske_gang: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_gang.json",
        cardTypeAni_ske_Atlas_gang: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_gang.atlas",
        cardTypeAni_ske_Png_gang: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_gang.png",
        cardTypeAni_ske_gangshangkaihua: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_gangshangkaihua.json",
        cardTypeAni_ske_Atlas_gangshangkaihua: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_gangshangkaihua.atlas",
        cardTypeAni_ske_Png_gangshangkaihua: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_gangshangkaihua.png",
        cardTypeAni_ske_haidilao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_haidilao.json",
        cardTypeAni_ske_Atlas_haidilao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_haidilao.atlas",
        cardTypeAni_ske_Png_haidilao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_haidilao.png",
        cardTypeAni_ske_heimo: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_heimo.json",
        cardTypeAni_ske_Atlas_heimo: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_heimo.atlas",
        cardTypeAni_ske_Png_heimo: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_heimo.png",
        cardTypeAni_ske_hu: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_hu.json",
        cardTypeAni_ske_Atlas_hu: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_hu.atlas",
        cardTypeAni_ske_Png_hu: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_hu.png",
        cardTypeAni_ske_huitouxiao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_huitouxiao.json",
        cardTypeAni_ske_Atlas_huitouxiao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_huitouxiao.atlas",
        cardTypeAni_ske_Png_huitouxiao: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_huitouxiao.png",
        cardTypeAni_ske_jiangyise: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_jiangyise.json",
        cardTypeAni_ske_Atlas_jiangyise: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_jiangyise.atlas",
        cardTypeAni_ske_Png_jiangyise: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_jiangyise.png",
        cardTypeAni_ske_laizigang: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_laizigang.json",
        cardTypeAni_ske_Atlas_laizigang: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_laizigang.atlas",
        cardTypeAni_ske_Png_laizigang: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_laizigang.png",
        cardTypeAni_ske_menqianqing: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_menqianqing.json",
        cardTypeAni_ske_Atlas_menqianqing: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_menqianqing.atlas",
        cardTypeAni_ske_Png_menqianqing: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_menqianqing.png",
        cardTypeAni_ske_peng: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_peng.json",
        cardTypeAni_ske_Atlas_peng: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_peng.atlas",
        cardTypeAni_ske_Png_peng: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_peng.png",
        cardTypeAni_ske_pengpenghu: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_pengpenghu.json",
        cardTypeAni_ske_Atlas_pengpenghu: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_pengpenghu.atlas",
        cardTypeAni_ske_Png_pengpenghu: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_pengpenghu.png",
        cardTypeAni_ske_piaolaizi: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_piaolaizi.json",
        cardTypeAni_ske_Atlas_piaolaizi: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_piaolaizi.atlas",
        cardTypeAni_ske_Png_piaolaizi: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_piaolaizi.png",
        cardTypeAni_ske_qiangganghu: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_qiangganghu.json",
        cardTypeAni_ske_Atlas_qiangganghu: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_qiangganghu.atlas",
        cardTypeAni_ske_Png_qiangganghu: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_qiangganghu.png",
        cardTypeAni_ske_qidui: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_qidui.json",
        cardTypeAni_ske_Atlas_qidui: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_qidui.atlas",
        cardTypeAni_ske_Png_qidui: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_qidui.png",
        cardTypeAni_ske_qingyise: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_qingyise.json",
        cardTypeAni_ske_Atlas_qingyise: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_qingyise.atlas",
        cardTypeAni_ske_Png_qingyise: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_qingyise.png",
        cardTypeAni_ske_quanqiuren: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_quanqiuren.json",
        cardTypeAni_ske_Atlas_quanqiuren: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_quanqiuren.atlas",
        cardTypeAni_ske_Png_quanqiuren: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_quanqiuren.png",
        cardTypeAni_ske_rechong: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_rechong.json",
        cardTypeAni_ske_Atlas_rechong: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_rechong.atlas",
        cardTypeAni_ske_Png_rechong: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_rechong.png",
        cardTypeAni_ske_ruanmo: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_ruanmo.json",
        cardTypeAni_ske_Atlas_ruanmo: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_ruanmo.atlas",
        cardTypeAni_ske_Png_ruanmo: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_ruanmo.png",
        cardTypeAni_ske_shua: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_shua.json",
        cardTypeAni_ske_Atlas_shua: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_shua.atlas",
        cardTypeAni_ske_Png_shua: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_shua.png",
        cardTypeAni_ske_shuakai: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_shuakai.json",
        cardTypeAni_ske_Atlas_shuakai: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_shuakai.atlas",
        cardTypeAni_ske_Png_shuakai: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_shuakai.png",
        cardTypeAni_ske_xiaoyige: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_xiaoyige.json",
        cardTypeAni_ske_Atlas_xiaoyige: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_xiaoyige.atlas",
        cardTypeAni_ske_Png_xiaoyige: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_xiaoyige.png",
        cardTypeAni_ske_zimo: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_zimo.json",
        cardTypeAni_ske_Atlas_zimo: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_zimo.atlas",
        cardTypeAni_ske_Png_zimo: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Png_zimo.png",
        // cardTypeAni_ske_mm: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_mm.json",
        // cardTypeAni_ske_Atlas_mm: "res/common/MajonRes/SpineAnim/cardTypeAni/cardTypeAni_ske_Atlas_mm.atlas",
        // cardTypeAni_ske_Png_mm: "res/common/MajonRes/SpineAnim/cardTypeAni/pokerma_ske.png",
        // cardTypeAni_ske_Png_mm2: "res/common/MajonRes/SpineAnim/cardTypeAni/pokerma_ske2.png",
        // cardTypeAni_ske_Png_mm3: "res/common/MajonRes/SpineAnim/cardTypeAni/pokerma_ske3.png",
        maimaJson: "res/common/MajonRes/SpineAnim/maima_ske.json",
        maimaAtlas: "res/common/MajonRes/SpineAnim/maima_ske.atlas",
        maimaPng: "res/common/MajonRes/SpineAnim/maima_ske.png",
        // pokermaJson: "res/common/MajonRes/SpineAnim/pokerma_ske.json",
        // pokermaAtlas: "res/common/MajonRes/SpineAnim/pokerma_ske.atlas",
        // pokermaPng: "res/common/MajonRes/SpineAnim/pokerma_ske.png",
        // pokermaPng2: "res/common/MajonRes/SpineAnim/pokerma_ske2.png",
        // pokermaPng3: "res/common/MajonRes/SpineAnim/pokerma_ske3.png",
        zhuaniaoJson: "res/common/MajonRes/SpineAnim/zhuaniao/zhuaniao_ske.json",
        zhuaniaoAtlas: "res/common/MajonRes/SpineAnim/zhuaniao/zhuaniao_ske.atlas",
        zhuaniaoPng: "res/common/MajonRes/SpineAnim/zhuaniao/zhuaniao_ske.png",
        recskeJson: "res/common/MajonRes/SpineAnim/rec_ske.json",
        recskeAtlas: "res/common/MajonRes/SpineAnim/rec_ske.atlas",
        recskePng: "res/common/MajonRes/SpineAnim/rec_ske.png",
        szdhJson: "res/common/MajonRes/SpineAnim/szdh.json",
        szdhAtlas: "res/common/MajonRes/SpineAnim/szdh.atlas",
        szdhPng: "res/common/MajonRes/SpineAnim/szdh.png",
        szdhPng2: "res/common/MajonRes/SpineAnim/szdh2.png",
        seziPlist: "res/common/MajonRes/Majon_sezi.plist",
        seziPng: "res/common/MajonRes/Majon_sezi.png",
        //破产礼包
        bankruptPanel_Json: "res/common/BankruptPanel/BankruptPanel.json",
        //观战层
        watch_cell_json: "res/common/watchLayer/watchCell.json",
    };
    for (var x in common.res) {
        kaayou.ResManager.getInstance().pushRes(common.res[x]);
    }
    common.FontRes = {
        iconName: "res/common/Fonts/common.game_icon_font.fnt",
        green: 'res/common/Fonts/common.green_font.fnt',
        blue: 'res/common/Fonts/common.blue_font.fnt',
        yellow: 'res/common/Fonts/common.yellow_font.fnt',
        red: 'res/common/Fonts/common.red_font.fnt',
    };
    common.BtnResNames = {
        green: 'common_btn_green',
        blue: 'common_btn_blue',
        yellow: 'common_btn_yellow',
        red: 'common_btn_red',
    };
    common.SoundRes = {
        'Close': 'res/common/Sound/CloseButton.mp3',
        'Default': 'res/common/Sound/OpenPanel.mp3',
        'Emoj_aixin': 'res/common/Sound/JoyEmoj/aixin.mp3',
        'Emoj_egg': 'res/common/Sound/JoyEmoj/egg.mp3',
        'Emoj_flower': 'res/common/Sound/JoyEmoj/flower.mp3',
        'Emoj_tuoxie': 'res/common/Sound/JoyEmoj/tuoxie.mp3',
        'Emoj_zhadan': 'res/common/Sound/JoyEmoj/zhadan.mp3',
        'Clock': 'res/common/Sound/Clock.mp3',
        'Warning': 'res/common/Sound/Warning.mp3',
        'ClickBtnSwitch': 'res/common/Sound/ClickBtnSwitch.mp3',
        'ClickBtnDefault': 'res/common/Sound/ClickBtnDefault.mp3',
        'ClickBtnClose': 'res/common/Sound/ClickBtnClose.mp3',
        'ClickBtn': 'res/common/Sound/CLICK_BTN.mp3',
        'GameOpen': 'res/common/Sound/GameOpen.mp3',
        'Button_People': 'res/common/Sound/Button_People.mp3',
        'GetScore': 'res/common/Sound/GetScore.mp3',
        'PaoYou': 'res/common/Sound/PaoYou.mp3',
        "YaoQing": "res/common/Sound/yaoqing.mp3",
        //麻将音效
        "Game_bgm": "res/common/Sound/GameSound.mp3",
        "Game_end": "res/common/Sound/GAME_END.mp3",
        "Game_win": "res/common/Sound/GAME_WIN.mp3",
        "Game_lose": "res/common/Sound/GAME_LOST.mp3",
        "Click_btn": "res/common/Sound/CLICK_BTN.mp3",
        "Click_btn_close": "res/common/Sound/ClickBtnClose.mp3",
        "Click_btn_switch": "res/common/Sound/ClickBtnSwitch.mp3",
        "outSound": "res/common/Sound/outCard.mp3",
        "Game_time_click": "res/common/Sound/GAME_TIME_TICK.mp3",
        "Game_Click_Card": "res/common/Sound/GAME_CLICK_CARD.mp3",
        "Game_Open": "res/common/Sound/GameOpen.mp3",
        "Game_JieSan": "res/common/Sound/GAME_JIESAN.mp3",
        "Send_Card": "res/common/Sound/SEND_CARD0.mp3"
    };
})(common || (common = {}));
var common;
(function (common) {
    var GameKindID;
    (function (GameKindID) {
        GameKindID[GameKindID["KindID_NULL"] = 0] = "KindID_NULL";
        GameKindID[GameKindID["KindID_XTMJ_LH"] = 598] = "KindID_XTMJ_LH";
        GameKindID[GameKindID["KindID_XTMJ_YLDD"] = 597] = "KindID_XTMJ_YLDD";
        GameKindID[GameKindID["KindID_XTMJ_YLKZC"] = 596] = "KindID_XTMJ_YLKZC";
        GameKindID[GameKindID["KindID_JZMJ_YJLY"] = 595] = "KindID_JZMJ_YJLY";
        GameKindID[GameKindID["KindID_JZMJ_JLJM"] = 599] = "KindID_JZMJ_JLJM";
        GameKindID[GameKindID["KindID_HHHJ_YH"] = 594] = "KindID_HHHJ_YH";
        GameKindID[GameKindID["KindID_HHHJ_LH"] = 593] = "KindID_HHHJ_LH";
        GameKindID[GameKindID["KindID_HHHJ_YLKZC"] = 592] = "KindID_HHHJ_YLKZC";
        GameKindID[GameKindID["KindID_CBMJ_DD"] = 591] = "KindID_CBMJ_DD";
        GameKindID[GameKindID["KindID_CBMJ_YH"] = 590] = "KindID_CBMJ_YH";
        GameKindID[GameKindID["KindID_CBMJ_HZ"] = 589] = "KindID_CBMJ_HZ";
        GameKindID[GameKindID["KindID_HHMJ_LH"] = 569] = "KindID_HHMJ_LH";
        GameKindID[GameKindID["KindID_HHMJ_YLDD"] = 570] = "KindID_HHMJ_YLDD";
        GameKindID[GameKindID["KindID_HHMJ_YH"] = 568] = "KindID_HHMJ_YH";
        GameKindID[GameKindID["KindID_CYMJ_MJ"] = 897] = "KindID_CYMJ_MJ";
        GameKindID[GameKindID["KindID_CYMJ_HH"] = 896] = "KindID_CYMJ_HH";
        GameKindID[GameKindID["KindID_QJMJ_HH"] = 578] = "KindID_QJMJ_HH";
        GameKindID[GameKindID["KindID_QJMJ_DT"] = 577] = "KindID_QJMJ_DT";
        GameKindID[GameKindID["KindID_QJMJ_HZ"] = 576] = "KindID_QJMJ_HZ";
        GameKindID[GameKindID["KindID_JYMJ_HZ"] = 581] = "KindID_JYMJ_HZ";
        GameKindID[GameKindID["KindID_JYMJ_HH"] = 580] = "KindID_JYMJ_HH";
        GameKindID[GameKindID["KindID_JYMJ_YQ"] = 579] = "KindID_JYMJ_YQ";
        GameKindID[GameKindID["KindID_BMHM"] = 889] = "KindID_BMHM";
        GameKindID[GameKindID["KindID_BMHM_HH"] = 587] = "KindID_BMHM_HH";
        GameKindID[GameKindID["KindID_HZLZG"] = 984] = "KindID_HZLZG";
    })(GameKindID = common.GameKindID || (common.GameKindID = {}));
    //买马类型
    var GameMaiMaType;
    (function (GameMaiMaType) {
        GameMaiMaType[GameMaiMaType["Type_Null"] = 0] = "Type_Null";
        GameMaiMaType[GameMaiMaType["Type_Maima"] = 1] = "Type_Maima";
        GameMaiMaType[GameMaiMaType["Type_Zhuaniao"] = 2] = "Type_Zhuaniao";
        GameMaiMaType[GameMaiMaType["Type_Zhuaniao159"] = 3] = "Type_Zhuaniao159";
    })(GameMaiMaType = common.GameMaiMaType || (common.GameMaiMaType = {}));
    //用来区分不同kindid游戏间的差别
    var Rule = /** @class */ (function () {
        function Rule() {
        }
        //设置当前游戏KindId
        Rule.setKindID = function (kindid) {
            Rule.kindId = kindid;
        };
        //获取当前游戏KindId
        Rule.getKindID = function () {
            return Rule.kindId;
        };
        //是否有赖子
        Rule.getHasMagic = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_CBMJ_YH || kindId == GameKindID.KindID_HHHJ_YH || kindId == GameKindID.KindID_CBMJ_DD || kindId == GameKindID.KindID_HHMJ_YH || kindId == GameKindID.KindID_QJMJ_HZ
                || kindId == GameKindID.KindID_JZMJ_JLJM) {
                return false;
            }
            else {
                return true;
            }
        };
        //是否是潜江红中
        Rule.isQJHZ = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_QJMJ_HZ) {
                return true;
            }
            else {
                return false;
            }
        };
        //是否有朝天
        Rule.getHasChaotian = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_XTMJ_LH || kindId == GameKindID.KindID_XTMJ_YLDD || kindId == GameKindID.KindID_XTMJ_YLKZC) {
                return true;
            }
            else if (kindId == GameKindID.KindID_HHMJ_LH || kindId == GameKindID.KindID_HHMJ_YH || kindId == GameKindID.KindID_HHMJ_YLDD) {
                return true;
            }
            else if (kindId == GameKindID.KindID_HHHJ_YH || kindId == GameKindID.KindID_HHHJ_LH || kindId == GameKindID.KindID_HHHJ_YLKZC) {
                return true;
            }
            else if (kindId == GameKindID.KindID_JZMJ_YJLY) {
                return true;
            }
            else if (kindId == GameKindID.KindID_QJMJ_HH || kindId == GameKindID.KindID_QJMJ_DT) {
                return true;
            }
            else {
                return false;
            }
        };
        //多个赖子是否可胡
        Rule.getCanMultiMagic = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_CBMJ_HZ || kindId == GameKindID.KindID_XTMJ_LH || kindId == GameKindID.KindID_HHHJ_LH || kindId == GameKindID.KindID_HHMJ_LH) {
                return true;
            }
            else {
                return false;
            }
        };
        //是否允许见字胡
        Rule.getCanJianzihu = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_JZMJ_YJLY) {
                return false;
            }
            else {
                return true;
            }
        };
        //赖子是否作为普通牌打出
        Rule.getCanOutMagicCard = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_CBMJ_HZ || kindId == GameKindID.KindID_CYMJ_MJ) {
                return true;
            }
            else {
                return false;
            }
        };
        //赖子打出是否播放飘赖子音效
        Rule.getPlayPiaoLaizi = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_QJMJ_DT || kindId == GameKindID.KindID_XTMJ_LH || kindId == GameKindID.KindID_XTMJ_YLDD || kindId == GameKindID.KindID_XTMJ_YLKZC) {
                return true;
            }
            else if (kindId == GameKindID.KindID_HHMJ_LH || kindId == GameKindID.KindID_HHMJ_YLDD) {
                return true;
            }
            else {
                return false;
            }
        };
        //赖子打出是否播放逞赖子音效
        Rule.getPlayChengLaizi = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_JZMJ_YJLY) {
                return true;
            }
            else {
                return false;
            }
        };
        //显示买马或抓鸟，返回：GameMaiMaType
        Rule.getMaiMaType = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_CBMJ_DD || kindId == GameKindID.KindID_CBMJ_YH) {
                //return GameMaiMaType.Type_Zhuaniao;
                //抓鸟全都改的跟赤壁红中一样
                return GameMaiMaType.Type_Zhuaniao159;
            }
            else if (kindId == GameKindID.KindID_CBMJ_HZ) {
                return GameMaiMaType.Type_Zhuaniao159;
            }
            else {
                return GameMaiMaType.Type_Maima;
            }
        };
        Rule.saveLanagueType = function (type) {
            var kindId = Rule.getKindID();
            cc.sys.localStorage.setItem('lanagueType_xtmj' + kindId, type.toString() || "0");
        };
        Rule.getLanagueType = function () {
            var kindId = Rule.getKindID();
            if (!cc.sys.localStorage.getItem('lanagueType_xtmj' + kindId)) {
                cc.sys.localStorage.setItem('lanagueType_xtmj' + kindId, '1');
            }
            var lanagueType = Number(cc.sys.localStorage.getItem('lanagueType_xtmj' + kindId));
            return lanagueType;
        };
        Rule.getLanaguePath = function () {
            // 0:普通话，1:江汉话，2:荆州话，3:鄂南话
            var pathArr = ['pt', 'fy'];
            // let kindId: number = Rule.getKindID();
            // if (!cc.sys.localStorage.getItem('lanagueType_xtmj' + kindId)) {
            //     cc.sys.localStorage.setItem('lanagueType_xtmj' + kindId, '1');
            // }
            var lanagueType = Number(cc.sys.localStorage.getItem('lanagueType_' + this.modName));
            // if (!kindId || !lanagueType || lanagueType >= pathArr.length) {
            //     return pathArr[0];
            // }
            return pathArr[lanagueType];
        };
        //是否显示普通话
        Rule.getHasLanaguePT = function () {
            return true;
        };
        //是否显示江汉话
        Rule.getHasLanagueJH = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_XTMJ_LH || kindId == GameKindID.KindID_XTMJ_YLDD || kindId == GameKindID.KindID_XTMJ_YLKZC) {
                return true;
            }
            else if (kindId == GameKindID.KindID_HHMJ_LH || kindId == GameKindID.KindID_HHMJ_YH || kindId == GameKindID.KindID_HHMJ_YLDD) {
                return true;
            }
            else {
                return false;
            }
        };
        //是否显示荆州话
        Rule.getHasLanagueJZ = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_JZMJ_YJLY) {
                return true;
            }
            else {
                return false;
            }
        };
        //是否显示鄂南话
        Rule.getHasLanagueEN = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_CBMJ_DD || kindId == GameKindID.KindID_CBMJ_YH || kindId == GameKindID.KindID_CBMJ_HZ) {
                return true;
            }
            else {
                return false;
            }
        };
        //大结算显示游戏信息
        Rule.getAllEndGameMsg = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_QJMJ_HH) {
                return '潜江麻将·潜江晃晃';
            }
            if (kindId == GameKindID.KindID_QJMJ_DT) {
                return '潜江麻将·激情单挑';
            }
            if (kindId == GameKindID.KindID_QJMJ_HZ) {
                return '潜江麻将·潜江红中';
            }
            if (kindId == GameKindID.KindID_CBMJ_DD) {
                return '赤壁玩法·剁刀';
            }
            if (kindId == GameKindID.KindID_CBMJ_HZ) {
                return '赤壁玩法·红中';
            }
            if (kindId == GameKindID.KindID_CBMJ_YH) {
                return '赤壁玩法·硬晃';
            }
            if (kindId == GameKindID.KindID_HHHJ_LH) {
                return '晃晃合集·赖晃';
            }
            if (kindId == GameKindID.KindID_HHHJ_YH) {
                return '晃晃合集·硬晃';
            }
            if (kindId == GameKindID.KindID_HHHJ_YLKZC) {
                return '晃晃合集·一赖可捉铳';
            }
            if (kindId == GameKindID.KindID_XTMJ_LH) {
                return '仙桃麻将·赖晃';
            }
            if (kindId == GameKindID.KindID_XTMJ_YLDD) {
                return '仙桃麻将·一赖到底';
            }
            if (kindId == GameKindID.KindID_XTMJ_YLKZC) {
                return '仙桃麻将·一赖可捉铳';
            }
            if (kindId == GameKindID.KindID_HHMJ_LH) {
                return '洪湖麻将·洪湖赖晃';
            }
            if (kindId == GameKindID.KindID_HHMJ_YH) {
                return '洪湖麻将·洪湖硬晃';
            }
            if (kindId == GameKindID.KindID_HHMJ_YLDD) {
                return '洪湖麻将·一赖到底';
            }
            if (kindId == GameKindID.KindID_JZMJ_YJLY) {
                return '荆州麻将·一脚赖油·逞赖子';
            }
            if (kindId == GameKindID.KindID_JZMJ_JLJM) {
                return '荆州麻将·江陵揪马';
            }
            if (kindId == GameKindID.KindID_CYMJ_MJ) {
                return '崇阳麻将·崇阳麻将';
            }
            if (kindId == GameKindID.KindID_CYMJ_HH) {
                return '崇阳麻将·崇阳晃晃';
            }
            if (kindId == GameKindID.KindID_BMHM) {
                return '斑马汉麻-武汉麻将';
            }
            if (kindId == GameKindID.KindID_BMHM_HH) {
                return '斑马汉麻-武汉晃晃';
            }
            if (kindId == GameKindID.KindID_HZLZG) {
                return '红中赖子杠';
            }
        };
        //大厅Table显示游戏信息
        Rule.getGameMsg = function (data) {
            var kindId = Rule.getKindID();
            var ruleStr = "";
            //几人玩
            var playerNumStr = data.gameconfig.playernum == 4 ? '' : (data.gameconfig.playernum == 3 ? "3人玩·" : "2人玩·"); //四人玩不显示
            if (kindId == GameKindID.KindID_XTMJ_LH || kindId == GameKindID.KindID_XTMJ_YLDD || kindId == GameKindID.KindID_XTMJ_YLKZC) {
                ruleStr += "仙桃麻将·";
                if (kindId == GameKindID.KindID_XTMJ_LH) {
                    ruleStr += '赖晃·';
                }
                if (kindId == GameKindID.KindID_XTMJ_YLDD) {
                    ruleStr += '一赖到底·';
                }
                if (kindId == GameKindID.KindID_XTMJ_YLKZC) {
                    ruleStr += '一赖可捉铳·';
                }
                ruleStr += playerNumStr;
            }
            else if (kindId == GameKindID.KindID_HHMJ_LH || kindId == GameKindID.KindID_HHMJ_YH || kindId == GameKindID.KindID_HHMJ_YLDD) {
                ruleStr += "洪湖麻将·";
                if (kindId == GameKindID.KindID_HHMJ_LH) {
                    ruleStr += '洪湖赖晃·';
                }
                if (kindId == GameKindID.KindID_HHMJ_YLDD) {
                    ruleStr += '一赖到底·';
                }
                if (kindId == GameKindID.KindID_HHMJ_YH) {
                    ruleStr += '洪湖硬晃·';
                }
                ruleStr += playerNumStr;
            }
            else if (kindId == GameKindID.KindID_HHHJ_LH || kindId == GameKindID.KindID_HHHJ_YH || kindId == GameKindID.KindID_HHHJ_YLKZC) {
                ruleStr += ""; //晃晃合集·不显示大玩法
                if (kindId == GameKindID.KindID_HHHJ_LH) {
                    ruleStr += '赖晃·';
                }
                if (kindId == GameKindID.KindID_HHHJ_YH) {
                    ruleStr += '硬晃·';
                }
                if (kindId == GameKindID.KindID_HHHJ_YLKZC) {
                    ruleStr += '一赖可捉铳·';
                }
                ruleStr += playerNumStr;
            }
            else if (kindId == GameKindID.KindID_CBMJ_DD || kindId == GameKindID.KindID_CBMJ_HZ || kindId == GameKindID.KindID_CBMJ_YH) {
                ruleStr += "赤壁麻将·";
                if (kindId == GameKindID.KindID_CBMJ_DD) {
                    ruleStr += '剁刀·';
                }
                if (kindId == GameKindID.KindID_CBMJ_HZ) {
                    ruleStr += '红中·';
                }
                if (kindId == GameKindID.KindID_CBMJ_YH) {
                    ruleStr += '硬晃·';
                }
                ruleStr += playerNumStr;
            }
            else if (kindId == GameKindID.KindID_JZMJ_YJLY || kindId == GameKindID.KindID_JZMJ_JLJM) {
                if (kindId == GameKindID.KindID_JZMJ_JLJM) {
                    ruleStr += "荆州麻将·江陵揪马·" + playerNumStr;
                }
                else {
                    ruleStr += "荆州麻将·一脚赖油·逞赖子·" + playerNumStr;
                }
            }
            else if (kindId == GameKindID.KindID_CYMJ_MJ) {
                ruleStr += "崇阳麻将·" + playerNumStr;
            }
            else if (kindId == GameKindID.KindID_CYMJ_HH) {
                var playerNumStr_1 = data.gameconfig.playernum + "人玩·";
                ruleStr += "崇阳晃晃·" + playerNumStr_1;
            }
            else if (kindId == GameKindID.KindID_QJMJ_HH || kindId == GameKindID.KindID_QJMJ_DT || kindId == GameKindID.KindID_QJMJ_HZ) {
                // ruleStr += "潜江麻将·";
                if (kindId == GameKindID.KindID_QJMJ_HH) {
                    ruleStr += '潜江晃晃·';
                }
                if (kindId == GameKindID.KindID_QJMJ_DT) {
                    ruleStr += '激情单挑·';
                }
                if (kindId == GameKindID.KindID_QJMJ_HZ) {
                    ruleStr += '潜江红中·';
                    ruleStr += playerNumStr;
                }
            }
            else if (kindId == GameKindID.KindID_JYMJ_YQ || kindId == GameKindID.KindID_JYMJ_HH || kindId == GameKindID.KindID_JYMJ_HZ) {
                ruleStr += "嘉鱼麻将·";
                if (kindId == GameKindID.KindID_JYMJ_YQ) {
                    ruleStr += '硬巧·';
                }
                if (kindId == GameKindID.KindID_JYMJ_HH) {
                    ruleStr += '晃晃·';
                }
                if (kindId == GameKindID.KindID_JYMJ_HZ) {
                    ruleStr += '红中赖子杠·';
                }
                ruleStr += playerNumStr;
            }
            if (data.gameconfig['fengding'] == 1) { //红中赖子杠的封顶： 1.金顶  2.极顶   3.单边极顶
                ruleStr += '金顶·';
            }
            else if (data.gameconfig['fengding'] == 2) {
                ruleStr += '极顶·';
            }
            else if (data.gameconfig['fengding'] == 3) {
                ruleStr += '单边极顶·';
            }
            if (data.gameconfig['fengding'] == 6) { //嘉鱼玩法-硬巧的封顶倍数
                ruleStr += '6倍封顶·';
            }
            else if (data.gameconfig['fengding'] == 12) {
                ruleStr += '12倍封顶·';
            }
            else if (data.gameconfig['fengding'] == 24) {
                ruleStr += '24倍封顶·';
            }
            else if (data.gameconfig['fengding'] == -1) {
                ruleStr += '不封顶·';
            }
            if (data.gameconfig['yilaidaodi'] && eval(data.gameconfig['yilaidaodi'].toLowerCase()) == true) {
                ruleStr += '一赖到底·';
            }
            if (data.gameconfig['gangkainozimo'] && eval(data.gameconfig['gangkainozimo'].toLowerCase()) == true) {
                ruleStr += '杠开不计自摸·';
            }
            if (data.gameconfig['haidinozimo'] && eval(data.gameconfig['haidinozimo'].toLowerCase()) == true) {
                ruleStr += '海底捞不计自摸·';
            }
            if (data.gameconfig['qufeng'] && eval(data.gameconfig['qufeng'].toLowerCase()) == true) {
                ruleStr += '去风·';
            }
            if (data.gameconfig.fengnum) {
                ruleStr += data.gameconfig.fengnum + '张风·';
            }
            if (data.gameconfig.xxf && eval(data.gameconfig.xxf.toLowerCase()) == true) {
                ruleStr += '喜相逢·';
            }
            if (data.gameconfig.gangtype) {
                if (data.gameconfig.gangtype == 1) {
                    ruleStr += '土豪必杠·';
                    this.isTHBG = true;
                }
                else if (data.gameconfig.gangtype == 2) {
                    ruleStr += '潜江赖晃·';
                }
                else if (data.gameconfig.gangtype == 3) {
                    ruleStr += '铁三角·';
                }
            }
            if (data.gameconfig.angangfan) {
                ruleStr += '暗杠' + data.gameconfig.angangfan + '倍·';
            }
            if (data.gameconfig.zmh && eval(data.gameconfig.zmh.toLowerCase()) == true) {
                ruleStr += '自摸胡·';
            }
            if (data.gameconfig.gkj && eval(data.gameconfig.gkj.toLowerCase()) == true) {
                ruleStr += '杠开加分·';
            }
            if (data.gameconfig.plyj && eval(data.gameconfig.plyj.toLowerCase()) == true) {
                ruleStr += '飘赖有奖·';
            }
            if (data.gameconfig.sdh && eval(data.gameconfig.sdh.toLowerCase()) == true) {
                ruleStr += '双大胡·';
            }
            if (data.gameconfig.zxzm && eval(data.gameconfig.zxzm.toLowerCase()) == true) {
                ruleStr += '只许自摸·';
            }
            if (data.gameconfig.rc && eval(data.gameconfig.rc.toLowerCase()) == true) {
                ruleStr += '热铳·';
            }
            if (data.gameconfig.qw && eval(data.gameconfig.qw.toLowerCase()) == true && (data.gameconfig.playernum == 3 || data.gameconfig.playernum == 2)) {
                ruleStr += '去万·';
            }
            if (data.gameconfig.sc9 && eval(data.gameconfig.sc9.toLowerCase()) == true) {
                ruleStr += '9秒场·';
            }
            if (data.gameconfig.zhuangx && eval(data.gameconfig.zhuangx.toLowerCase()) == true) {
                ruleStr += '庄闲·';
            }
            if (data.gameconfig.mm && data.gameconfig.mm > 0) {
                if (kindId == GameKindID.KindID_CBMJ_DD || kindId == GameKindID.KindID_CBMJ_HZ || kindId == GameKindID.KindID_CBMJ_YH) {
                    ruleStr += "抓" + data.gameconfig.mm + "鸟·";
                }
                else {
                    ruleStr += "买" + data.gameconfig.mm + "马·";
                }
            }
            if (data.gameconfig.ibird && data.gameconfig.ibird > 0) {
                ruleStr += "买" + data.gameconfig.ibird + "马·";
            }
            if (data.gameconfig.dff && data.gameconfig.dff > 1) {
                ruleStr += data.gameconfig.dff + "底·";
            }
            if (data.gameconfig.difen && data.gameconfig.difen > 1) {
                ruleStr += data.gameconfig.difen + "底·";
            }
            //如果字符串最后有一个点，就把这个点去掉
            if (ruleStr.substr(ruleStr.length - 1, 1) === '·') {
                ruleStr = ruleStr.slice(0, ruleStr.length - 1);
            }
            return ruleStr;
        };
        //微信钉钉分享标题
        Rule.getShareTitle = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_CBMJ_DD) {
                return '赤壁麻将';
            }
            if (kindId == GameKindID.KindID_CBMJ_HZ) {
                return '赤壁麻将';
            }
            if (kindId == GameKindID.KindID_CBMJ_YH) {
                return '赤壁麻将';
            }
            if (kindId == GameKindID.KindID_HHHJ_LH) {
                return '晃晃合集';
            }
            if (kindId == GameKindID.KindID_HHHJ_YH) {
                return '晃晃合集';
            }
            if (kindId == GameKindID.KindID_HHHJ_YLKZC) {
                return '晃晃合集';
            }
            if (kindId == GameKindID.KindID_XTMJ_LH) {
                return '仙桃麻将';
            }
            if (kindId == GameKindID.KindID_XTMJ_YLDD) {
                return '仙桃麻将';
            }
            if (kindId == GameKindID.KindID_XTMJ_YLKZC) {
                return '仙桃麻将';
            }
            if (kindId == GameKindID.KindID_HHMJ_LH || kindId == GameKindID.KindID_HHMJ_YH || GameKindID.KindID_HHMJ_YLDD) {
                return '洪湖麻将';
            }
            if (kindId == GameKindID.KindID_JZMJ_YJLY || kindId == GameKindID.KindID_JZMJ_JLJM) {
                return '荆州麻将';
            }
            if (kindId == GameKindID.KindID_CYMJ_MJ) {
                return "崇阳麻将";
            }
            if (kindId == GameKindID.KindID_CYMJ_HH) {
                return "崇阳晃晃";
            }
            if (kindId == GameKindID.KindID_QJMJ_HH) {
                return '潜江晃晃';
            }
            if (kindId == GameKindID.KindID_QJMJ_DT) {
                return '激情单挑';
            }
            if (kindId == GameKindID.KindID_QJMJ_HZ) {
                return '潜江红中';
            }
        };
        //微信钉钉分享内容
        Rule.getShareText = function (data) {
            var kindId = Rule.getKindID();
            var ruleStr = "";
            //几人玩
            var playerNumStr = data.gameconfig.playernum == 4 ? '' : (data.gameconfig.playernum == 3 ? "3人玩、" : "2人玩、"); //四人玩不显示
            if (kindId == GameKindID.KindID_XTMJ_LH) {
                ruleStr += '赖晃、';
            }
            if (kindId == GameKindID.KindID_XTMJ_YLDD) {
                ruleStr += '一赖到底、';
            }
            if (kindId == GameKindID.KindID_XTMJ_YLKZC) {
                ruleStr += '一赖可捉铳、';
            }
            if (kindId == GameKindID.KindID_HHMJ_LH) {
                ruleStr += '洪湖赖晃、';
            }
            if (kindId == GameKindID.KindID_HHMJ_YLDD) {
                ruleStr += '一赖到底、';
            }
            if (kindId == GameKindID.KindID_HHMJ_YH) {
                ruleStr += '洪湖硬晃、';
            }
            if (kindId == GameKindID.KindID_HHHJ_LH) {
                ruleStr += '赖晃、';
            }
            if (kindId == GameKindID.KindID_HHHJ_YH) {
                ruleStr += '硬晃、';
            }
            if (kindId == GameKindID.KindID_HHHJ_YLKZC) {
                ruleStr += '一赖可捉铳、';
            }
            if (kindId == GameKindID.KindID_CBMJ_DD) {
                ruleStr += '剁刀、';
            }
            if (kindId == GameKindID.KindID_CBMJ_HZ) {
                ruleStr += '红中、';
            }
            if (kindId == GameKindID.KindID_CBMJ_YH) {
                ruleStr += '硬晃、';
            }
            if (kindId == GameKindID.KindID_JZMJ_YJLY) {
                ruleStr += "一脚赖油·逞赖子、";
            }
            if (kindId == GameKindID.KindID_JZMJ_JLJM) {
                ruleStr += "揪马玩法、";
            }
            if (kindId == GameKindID.KindID_CYMJ_MJ) {
                ruleStr += "麻将";
            }
            if (kindId == GameKindID.KindID_CYMJ_HH) {
                ruleStr += "晃晃";
            }
            if (kindId == GameKindID.KindID_QJMJ_HH) {
                ruleStr += '潜江晃晃、';
            }
            if (kindId == GameKindID.KindID_QJMJ_DT) {
                ruleStr += '激情单挑、';
            }
            if (kindId == GameKindID.KindID_QJMJ_HZ) {
                ruleStr += '潜江红中、';
            }
            //显示几人玩，4人玩默认不显示
            if (data.gameconfig.playernum != 4) {
                ruleStr += playerNumStr;
            }
            //可选项
            if (data.gameconfig.fengnum) {
                ruleStr += data.gameconfig.fengnum + '张风、';
            }
            if (data.gameconfig.xxf && eval(data.gameconfig.xxf.toLowerCase()) == true) {
                ruleStr += '喜相逢、';
            }
            if (data.gameconfig.gangtype) {
                if (data.gameconfig.gangtype == 1) {
                    ruleStr += '土豪必杠、';
                }
                else if (data.gameconfig.gangtype == 2) {
                    ruleStr += '潜江赖晃、';
                }
                else if (data.gameconfig.gangtype == 3) {
                    ruleStr += '铁三角、';
                }
            }
            if (data.gameconfig.angangfan) {
                ruleStr += '暗杠' + data.gameconfig.angangfan + '倍、';
            }
            if (data.gameconfig.zmh && eval(data.gameconfig.zmh.toLowerCase()) == true) {
                ruleStr += '自摸胡、';
            }
            if (data.gameconfig.gkj && eval(data.gameconfig.gkj.toLowerCase()) == true) {
                ruleStr += '杠开加分、';
            }
            if (data.gameconfig.plyj && eval(data.gameconfig.plyj.toLowerCase()) == true) {
                ruleStr += '飘赖有奖、';
            }
            if (data.gameconfig.sdh && eval(data.gameconfig.sdh.toLowerCase()) == true) {
                ruleStr += '双大胡·';
            }
            if (data.gameconfig.zxzm && eval(data.gameconfig.zxzm.toLowerCase()) == true) {
                ruleStr += '只许自摸·';
            }
            if (data.gameconfig.rc && eval(data.gameconfig.rc.toLowerCase()) == true) {
                ruleStr += '热铳·';
            }
            if (data.gameconfig.qw && eval(data.gameconfig.qw.toLowerCase()) == true && (data.gameconfig.playernum == 3 || data.gameconfig.playernum == 2)) {
                ruleStr += '去万、';
            }
            if (data.gameconfig.sc9 && eval(data.gameconfig.sc9.toLowerCase()) == true) {
                ruleStr += '9秒场、';
            }
            if (data.gameconfig.zhuangx && eval(data.gameconfig.zhuangx.toLowerCase()) == true) {
                ruleStr += '庄闲、';
            }
            if (data.gameconfig.mm && data.gameconfig.mm > 0) {
                if (kindId == GameKindID.KindID_CBMJ_DD || kindId == GameKindID.KindID_CBMJ_HZ || kindId == GameKindID.KindID_CBMJ_YH) {
                    ruleStr += "抓" + data.gameconfig.mm + "鸟、";
                }
                else {
                    ruleStr += "买" + data.gameconfig.mm + "马、";
                }
            }
            if (data.gameconfig.dff && data.gameconfig.dff > 1) {
                ruleStr += data.gameconfig.dff + "底、";
            }
            ruleStr += '大战' + data.gameconfig.roundnum + "局,速来！";
            return ruleStr;
        };
        //是否是红中玩法
        Rule.isCBHZ = function () {
            var kindId = Rule.getKindID();
            if (kindId == GameKindID.KindID_CBMJ_HZ) {
                return true;
            }
            else {
                return false;
            }
        };
        Rule.kindId = GameKindID.KindID_NULL;
        Rule.modName = "";
        Rule.isTHBG = false;
        return Rule;
    }());
    common.Rule = Rule;
})(common || (common = {}));
var common;
(function (common) {
    var mod;
    (function (mod) {
        var SHARE_TYPE;
        (function (SHARE_TYPE) {
            SHARE_TYPE[SHARE_TYPE["TEAHOUSE_LOBBY"] = 0] = "TEAHOUSE_LOBBY";
            SHARE_TYPE[SHARE_TYPE["TEAHOUSE_RECORD"] = 1] = "TEAHOUSE_RECORD";
            SHARE_TYPE[SHARE_TYPE["LOBBY_RECORD"] = 2] = "LOBBY_RECORD";
            SHARE_TYPE[SHARE_TYPE["LOBBY"] = 3] = "LOBBY";
        })(SHARE_TYPE = mod.SHARE_TYPE || (mod.SHARE_TYPE = {}));
        var Config = /** @class */ (function () {
            function Config() {
            }
            Config.LoadAppConfig = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var localVer, platform, temp, postUrl, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                kaayou.addLog("开始从服务端获取客户端配置");
                                kaayou.emit("common", "ui::Loading::Show", { msg: "信息加载中", time: 1 });
                                localVer = kaayou.PlatformMgr.getInstance().sys.GetLocalVersionName();
                                platform = 1;
                                if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
                                    platform = 2;
                                }
                                temp = {
                                    "data": { ver: localVer, platform: platform },
                                    "time": new Date().getTime(),
                                    "encrypt": true,
                                    "sign": "",
                                };
                                if (temp.encrypt)
                                    temp.data = kaayou.AES.encryptPHP(JSON.stringify(temp.data));
                                postUrl = Config.ConfigUrl + "/api/configure/getClientConfig";
                                return [4 /*yield*/, kaayou.Http.POST(postUrl, { msgdata: JSON.stringify(temp) }, null, null, true)];
                            case 1:
                                res = _a.sent();
                                kaayou.emit("common", "ui::Loading::Hide");
                                Config.ParseConfig(res);
                                return [2 /*return*/];
                        }
                    });
                });
            };
            Config.LoadLocalAppConf = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var cof;
                                    return __generator(this, function (_a) {
                                        cof = kaayou.PlatformMgr.getInstance().sys.GetLocalAppConfig();
                                        return [2 /*return*/, resolve(cof)];
                                    });
                                });
                            })];
                    });
                });
            };
            Config.GetAppConfig = function () {
                return Config.AppConfig;
            };
            Config.ParseConfig = function (jstr) {
                return __awaiter(this, void 0, void 0, function () {
                    var msg, appconfig, clientConfig, jsonCf, i, kname, _a, _ip, _port, debugLoginIp, x, bUpdateApp;
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!jstr) {
                                    kaayou.emit('common', 'ui::Toast::Show', { msg: "获取配置项失败！" });
                                    kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "获取配置项失败！" });
                                    return [2 /*return*/];
                                }
                                msg = JSON.parse(jstr);
                                if (!msg) {
                                    kaayou.emit('common', 'ui::Toast::Show', { msg: "解析配置项失败！" });
                                    kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "解析配置项失败！" });
                                    return [2 /*return*/];
                                }
                                if (msg.code != 0) {
                                    console.log({ msg: msg.msg || "获取配置项失败！" });
                                    kaayou.emit('common', 'ui::Toast::Show', { msg: msg.msg || "获取配置项失败！" });
                                    kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "获取配置项失败！" });
                                    return [2 /*return*/];
                                }
                                kaayou.addLog("获取配置成功！");
                                kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "获取配置成功！", code: -1 });
                                return [4 /*yield*/, Config.LoadLocalAppConf()];
                            case 1:
                                appconfig = _c.sent();
                                clientConfig = {};
                                jsonCf = { "btnShow": 1, "shares": 1, "shareUrl": 1, "AppVersion": 1, "SuggestAppVersion": 1, "gps": 1, 'feature': 1, 'kfinfo': 1, "isActivity": 1 };
                                for (i = 0; i < msg.data.length; i++) {
                                    kname = msg.data[i]["bolt"];
                                    clientConfig[kname] = msg.data[i]["val"];
                                    if (jsonCf[kname]) {
                                        try {
                                            clientConfig[kname] = JSON.parse(msg.data[i]["val"]);
                                        }
                                        catch (e) {
                                            kaayou.emit('common', 'ui::Toast::Show', { msg: "配置项" + kname + "格式错误，请联系GM！" });
                                            return [2 /*return*/];
                                        }
                                    }
                                }
                                if (clientConfig["AppVersion"] && clientConfig["AppVersion"].login_url) {
                                    _a = clientConfig["AppVersion"].login_url.split(':'), _ip = _a[0], _port = _a[1];
                                    debugLoginIp = cc.sys.localStorage.getItem("debugLoginUrl");
                                    if (!!debugLoginIp && debugLoginIp.indexOf(':') > -1)
                                        _b = debugLoginIp.split(':'), _ip = _b[0], _port = _b[1];
                                    //登录地址获取
                                    if (!cc.sys.isNative) {
                                        clientConfig.loginUrl = common.mod.Config.HttpSchema + (kaayou.Http.GetRequest(location.search)['ip'] || _ip) + ":" + (kaayou.Http.GetRequest(location.search)['port'] || _port);
                                    }
                                    else {
                                        if (appconfig) {
                                            if (appconfig.ip && appconfig.port) {
                                                _ip = appconfig.ip;
                                                _port = appconfig.ip;
                                            }
                                        }
                                        clientConfig.loginUrl = common.mod.Config.HttpSchema + (_ip) + ":" + (_port);
                                    }
                                    clientConfig.payurl = clientConfig["AppVersion"].product_url;
                                    clientConfig.diamond_url = clientConfig["AppVersion"].diamond_url;
                                }
                                //设置登录地址
                                clientConfig.loginUrl = clientConfig.loginUrl;
                                clientConfig.partnerUrl = "http://to.douqi.com/index/index";
                                //设置回放url
                                clientConfig.recordUrl = clientConfig.loginUrl;
                                //格式化AppConfig
                                Config.AppConfig = {};
                                for (x in clientConfig) {
                                    Config.AppConfig[x] = clientConfig[x];
                                }
                                return [4 /*yield*/, mod.Update.UpdateApp()];
                            case 2:
                                bUpdateApp = _c.sent();
                                if (bUpdateApp)
                                    return [2 /*return*/];
                                if (Config.AppConfig.feature && Config.AppConfig.feature.ho) {
                                    //判断是否要热更新
                                    mod.Update.UpdateLobby(function () {
                                        if (!lodash.isEmpty(Config.AppConfig) && !lodash.isEmpty(Config.AppConfig.btnShow)) {
                                            try {
                                                kaayou.emit("common", "Config::Update");
                                            }
                                            catch (err) {
                                            }
                                        }
                                    });
                                }
                                else {
                                    kaayou.emit("common", "Config::Update");
                                }
                                kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "整体检查执行完毕" });
                                return [2 /*return*/];
                        }
                    });
                });
            };
            //static ConfigUrl = "http://121.43.54.124:8006";// 镜像线专门给第三方测试用的
            Config.ConfigUrl = "http://apiyxdq.kaayou.com"; // "http://apiyxdq.kaayou.com";//http://203.107.40.117:8004
            Config.HttpSchema = "http://";
            Config.HttpsSchema = "http://";
            Config.DownloadUrl = "/api/package/getOSSZip?type={keyname}&engine=2";
            Config.CheckUpdateUrl = "/api/package/getVersion?a={action}&type={type}&engine=2";
            Config.isLoginEncryp = true;
            Config.AppConfig = null;
            return Config;
        }());
        mod.Config = Config;
    })(mod = common.mod || (common.mod = {}));
})(common || (common = {}));
var common;
(function (common) {
    var mod;
    (function (mod) {
        var EventQueue = /** @class */ (function () {
            function EventQueue() {
                this._queueArray = null;
                this._isCleaning = false;
                this._t = null;
                this._queueArray = [];
            }
            EventQueue.prototype.clean = function () {
                this._isCleaning = true;
                this._queueArray = [];
                this._isCleaning = false;
            };
            EventQueue.prototype.push = function (c) {
                if (!this._queueArray) {
                    this._queueArray = [];
                }
                this._queueArray.push(c);
            };
            EventQueue.prototype.release = function () {
                if (this._t) {
                    clearInterval(this._t);
                    this._t = null;
                }
                this.clean();
            };
            EventQueue.prototype.start = function () {
                var self = this;
                this.release();
                this._t = setInterval(function () {
                    self._loop();
                }, 0);
            };
            // _bPostBugly = false;
            EventQueue.prototype._loop = function () {
                if (this._queueArray.length > 0) {
                    if (this._isCleaning) {
                        return;
                    }
                    var q = this._queueArray[0];
                    if (this._isCleaning) {
                        return;
                    }
                    try {
                        if (true === q.func.apply(q.target, [q.data])) {
                            if (this._isCleaning) {
                                return;
                            }
                            this._queueArray.shift();
                        }
                    }
                    catch (err) {
                        if (this._isCleaning) {
                            return;
                        }
                        this._queueArray.shift();
                        if ( /*this._bPostBugly == false && */err.name) {
                            // this._bPostBugly = true;
                            var message = err.message;
                            if (cc.sys.isNative) {
                                if (typeof message == 'string') {
                                    if (!message) {
                                        message = "no message";
                                    }
                                }
                                else if (typeof message == 'object') {
                                    try {
                                        message = JSON.stringify(message, null, 2);
                                    }
                                    catch (er) {
                                        message = "err message object";
                                    }
                                }
                                else {
                                    message = "no message";
                                }
                                var stack = err.stack;
                                if (typeof stack == 'string') {
                                    if (!stack) {
                                        stack = "no stack";
                                    }
                                }
                                else if (typeof stack == 'object') {
                                    try {
                                        stack = JSON.stringify(stack, null, 2);
                                    }
                                    catch (er) {
                                        stack = "err stack object";
                                    }
                                }
                                else {
                                    stack = "no stack";
                                }
                                var mname = q.mname || "[no mname]";
                                var ename = q.ename || "[no ename]";
                                console.error("event queue err :" + kaayou.getLobbyVersion(), mname + " " + ename + " " + message, stack);
                                var sname = kaayou.UIManager.getInstance().getCurRuningSceneName();
                                if (sname != "LOBBY") {
                                    kaayou.PlatformMgr.getInstance().sys.PostBugly("SubgameName:" + sname + "SubGameVersion:" + kaayou.getSubGameVersion(sname.toLowerCase()) + "LobbyVersion:" + kaayou.getLobbyVersion(), mname + " " + ename + " " + message, stack);
                                }
                                else {
                                    kaayou.PlatformMgr.getInstance().sys.PostBugly("LobbyVersion:" + kaayou.getLobbyVersion(), mname + " " + ename + " " + message, stack);
                                }
                            }
                            else {
                                console.error(err);
                            }
                            var options = {
                                msg: "系统检测到异常，点击确定后自动重启！\n\n  *." + message,
                                close: { isShow: true },
                                btns: [
                                    {
                                        name: "确定",
                                        action: function () {
                                            if (!cc.sys.isNative) {
                                                if (window && window.location) {
                                                    window.location.reload();
                                                }
                                            }
                                            else {
                                                cc.game.restart();
                                            }
                                        },
                                        colorType: 'yellow'
                                    }
                                ]
                            };
                            var configData = common.mod.Config.GetAppConfig();
                            if (configData && configData.isDebug == 'true') {
                                kaayou.emit('common', 'ui::Dialog::Show', options);
                            }
                        }
                    }
                }
            };
            return EventQueue;
        }());
        mod.EventQueue = EventQueue;
    })(mod = common.mod || (common.mod = {}));
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var mod;
    (function (mod) {
        var GR_US_Status;
        (function (GR_US_Status) {
            GR_US_Status[GR_US_Status["US_NULL"] = 0] = "US_NULL";
            GR_US_Status[GR_US_Status["US_FREE"] = 1] = "US_FREE";
            GR_US_Status[GR_US_Status["US_SIT"] = 2] = "US_SIT";
            GR_US_Status[GR_US_Status["US_READY"] = 3] = "US_READY";
            GR_US_Status[GR_US_Status["US_LOOKON"] = 4] = "US_LOOKON";
            GR_US_Status[GR_US_Status["US_PLAY"] = 5] = "US_PLAY";
            GR_US_Status[GR_US_Status["US_OFFLINE"] = 6] = "US_OFFLINE";
            GR_US_Status[GR_US_Status["US_TICKOUT"] = 7] = "US_TICKOUT"; // 踢出房间
        })(GR_US_Status = mod.GR_US_Status || (mod.GR_US_Status = {}));
        var GAME_STATE;
        (function (GAME_STATE) {
            GAME_STATE[GAME_STATE["NONE"] = 0] = "NONE";
            GAME_STATE[GAME_STATE["ROAR"] = 1] = "ROAR";
            GAME_STATE[GAME_STATE["GAMEING"] = 2] = "GAMEING";
            GAME_STATE[GAME_STATE["GAME_END"] = 3] = "GAME_END";
            GAME_STATE[GAME_STATE["GAME_OVER"] = 4] = "GAME_OVER";
            GAME_STATE[GAME_STATE["GAMEPAUSE"] = 5] = "GAMEPAUSE"; //游戏暂停
        })(GAME_STATE = mod.GAME_STATE || (mod.GAME_STATE = {}));
        var gameBaseMod = /** @class */ (function (_super) {
            __extends(gameBaseMod, _super);
            function gameBaseMod() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                //protected _NetName = "";
                _this._maxPlayer = 0; //最大玩家数
                _this.gameName = null; //游戏名称
                _this._players = null;
                _this.userId = 0;
                _this.myServerchair = -1;
                _this.gameState = 0;
                _this.sendChatLastTime = 0;
                _this._isGameStart = false; //只要第一局开始了,就为true
                _this.token = '';
                _this._gameInfo = null;
                _this.maxRound = 0;
                _this.mapinfo = null;
                _this.tableInfo = null;
                _this.isOpenGps = true;
                _this.isFriendRoom = false;
                _this._isSceneIn = false;
                _this.needOffset = true; //needOffset像打拱类固定座位号需要转一次座位    像扎金花,牛牛类型游戏不需要转
                _this._wait = false; //主要用于消息队列,如果wait为true,则这个消息的回调方法会一直执行
                _this._isBindEvent = false;
                _this.fleeTime = 0;
                _this.hasExit = [false, false, false, false, false, false, false, false]; //是否已经弹了离线提示,这个会在玩家上线的时候重置
                return _this;
            }
            gameBaseMod.prototype.initMod = function () {
                this._players = {};
                this._gameInfo = { status: 0 };
                this._eventQueue = new common.mod.EventQueue();
                this.bindModEvents();
                var self = this;
                kaayou.getController().on('MicOk', function (e) {
                    console.log("MicOk", e.data);
                    var url = e.data;
                    cc.log('micOk', url);
                    //向服务器发送url
                    self.sendMicChat(url);
                }, this);
                kaayou.getController().on('MicPlayStart', function (e) {
                    console.log("MicPlayStart", e.data);
                    //显示对话框
                    var uid = e.data;
                    var index = self.getIndexByUid(uid);
                    if (index < 0) {
                        return;
                    }
                    kaayou.emit(this.getModuleName(), 'ui::onMicChat', { index: index, start: true });
                }, this);
                kaayou.getController().on('MicPlayEnd', function (e) {
                    console.log("MicPlayEnd", e.data);
                    //显示对话框
                    var uid = e.data;
                    var index = self.getIndexByUid(uid);
                    if (index < 0) {
                        return;
                    }
                    kaayou.emit(this.getModuleName(), 'ui::onMicChat', { index: index, start: false });
                }, this);
                // kaayou.getController().on("ui::Battery::showBattery",function(e: kaayou.Event){
                //     console.log("---------------电池-------------");
                // },this)
            };
            gameBaseMod.prototype.bindModEvents = function () {
                var _this = this;
                var self = this;
                if (this._isBindEvent) {
                    return console.error('多次绑定');
                }
                if (this.getModuleName().length < 1) {
                    return console.error('ModuleName is empty');
                }
                this._isBindEvent = true;
                kaayou.getController(this.getModuleName()).on('mod::User::Login', function (e) {
                    self.doLogin();
                }, this);
                kaayou.getController(this.getModuleName()).on('mod::Data::Clear', function (e) {
                    ///clear
                    _this.cleanMod();
                }, this);
                //为了避免名字冲突新抛出的一个消息
                kaayou.getController(this.getModuleName()).on('mod::User::LoginF', function (e) {
                    self.doLogin();
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::OfflineTime', function (e) {
                    // self.onoffline(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onoffline, target: self });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::userchat', function (e) {
                    self.onChat(e.data);
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::yyinfo', function (e) {
                    self.onYYinfo(e.data);
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::relogin', function (e) {
                    self.onReLog();
                }, this);
            };
            gameBaseMod.prototype.doConnect = function () {
                console.log('开始连接游戏服务', new Date().getTime());
                var ip = this.gameEnterConfig.ip.split(':')[0];
                var port = Number(this.gameEnterConfig.ip.split(':')[1]);
                var gameconfig = { ip: ip, port: port };
                kaayou.NetManager.getInstance().getSocket(this.getModuleName()).doConnect(gameconfig);
            };
            //清理所有数据
            gameBaseMod.prototype.cleanMod = function () {
                console.log("清理游戏数据");
                this._maxPlayer = 0;
                this._players = {};
                this.userId = 0;
                this.token = "";
                this.gameEnterConfig = null;
                this.gameState = GAME_STATE.NONE;
                this._isSceneIn = false;
                this.myServerchair = -1;
                this._isGameStart = false;
                this._eventQueue.release();
            };
            //清理游戏数据
            gameBaseMod.prototype.resetData = function () {
                //解决麻将类游戏一人出牌 另一人有牌权 第一人home出去  第一人可以出牌bug
                if (this["_curPlayerIndex"] != undefined) {
                    this["_curPlayerIndex"] = -1;
                }
            };
            gameBaseMod.prototype.doLogin = function () {
                console.log("doLogin");
                try {
                    var _a = JSON.parse(kaayou.DataSet.get('user::token')), token = _a.token, uid = _a.uid;
                    var enterConfig = JSON.parse(kaayou.DataSet.get("game::config"));
                    var userinfo = JSON.parse(kaayou.DataSet.get("user::info"));
                    if (!token) {
                        console.error("token is undefine");
                        throw "token is undefine";
                    }
                    if (!userinfo) {
                        throw "userinfo is undefine";
                    }
                    if (!enterConfig) {
                        throw "enterConfig is undefine";
                    }
                    if (!enterConfig.ip || lodash.isEmpty(enterConfig.ip)) {
                        throw "ip is undefine";
                    }
                    var ip = enterConfig.ip.split(':')[0];
                    var port = Number(enterConfig.ip.split(':')[1]);
                    if (!ip || !port || lodash.isEmpty(ip) || !lodash.isNumber(port) || port < 1) {
                        throw "ip or port is error";
                    }
                    if (!this.isValidKindID(enterConfig.kindid)) {
                        throw this.getModuleName() + " : this.isValidKindID(" + enterConfig.kindid + ") == false";
                    }
                    this.token = token;
                    this.gameEnterConfig = enterConfig;
                    this.userId = uid;
                    kaayou.NetManager.getInstance().getSocket(this.getModuleName()).doConnect({ ip: ip, port: port });
                }
                catch (err) {
                    console.error(err);
                    kaayou.emit(this.getModuleName(), "ui::RunSceneError");
                }
            };
            gameBaseMod.prototype.CleanAndGotoLobby = function () {
                if (this._isSceneIn) {
                    kaayou.emit(this.getModuleName(), 'ui::InGameTeaHousePanel::Hide');
                    kaayou.emit(this.getModuleName(), 'ui::ExitGameScene');
                    kaayou.GameToLobby();
                }
                else {
                    kaayou.emit(this.getModuleName(), "ui::RunSceneError");
                }
                this.cleanMod();
            };
            //校验kindid，避免出现包名和kindid不匹配的情况
            gameBaseMod.prototype.isValidKindID = function (kindid) {
                return true;
            };
            gameBaseMod.prototype.isValidAddr = function (longitude, latitude) {
                if (longitude < -180 || latitude > -0.1 && longitude < 0.1 || latitude > 180) {
                    return false;
                }
                ;
                if (latitude < -90 || latitude > -0.1 && latitude < 0.1 || latitude > 90) {
                    return false;
                }
                ;
                //if (latitude > 39.9 && latitude < 39.95 && longitude > 116.35 && longitude < 116.45) { return false };//过滤北京东城区
                return true;
            };
            gameBaseMod.prototype.playerExtends = function (player) {
                player = lodash.extend({
                    isReady: false,
                    seat: -1,
                    userStatus: GR_US_Status.US_NULL,
                    gold: 0,
                    name: '',
                    imgurl: '',
                    draw_count: 0,
                    flee_count: 0,
                    lost_count: 0,
                    win_count: 0,
                    total_count: 0,
                    fleeTime: 0,
                }, player);
                return player;
            };
            gameBaseMod.prototype.toOriginalArrayPlayer = function () {
                var pArr = [];
                for (var i = 0; i < this._maxPlayer; i++) {
                    var player = null;
                    for (var x in this._players) {
                        if (i == this._players[x].seat) {
                            player = this._players[x];
                        }
                    }
                    pArr[i] = player;
                }
                // return this.changeArr(pArr);
                return pArr;
            };
            //游戏是逆时针
            gameBaseMod.prototype.toArrayPlayer = function () {
                var selfChairID = -1;
                if (this._players[this.userId]) {
                    selfChairID = this._players[this.userId].seat;
                }
                if (selfChairID == -1) {
                    return [];
                }
                var pArr = [];
                for (var i = 0; i < this._maxPlayer; i++) {
                    var player = null;
                    for (var x in this._players) {
                        if (i == this._players[x].seat) {
                            player = this._players[x];
                        }
                    }
                    pArr[i] = player;
                    if (player && selfChairID == player.seat) {
                        this.myServerchair = i;
                    }
                }
                return this.offsetPlayer(pArr);
            };
            /**
             * 把服务数组转成客户端数组
             */
            //转成客户端位置
            gameBaseMod.prototype.offsetPlayer = function (arr) {
                var outArr = [];
                var count = this._maxPlayer;
                for (var i = 0; i < count; i++) {
                    outArr[(count + i - this.myServerchair) % count] = arr[i] ? arr[i] : null;
                }
                if (!this.needOffset) {
                    return outArr;
                }
                return this.changeArr(outArr);
            };
            gameBaseMod.prototype.changeArr = function (outArr) {
                if (outArr.length == 4) {
                    return outArr;
                }
                else if (outArr.length == 3) {
                    return [outArr[0], outArr[1], null, outArr[2]];
                }
                else if (outArr.length == 2) {
                    return [outArr[0], null, outArr[1], null];
                }
            };
            gameBaseMod.prototype.getCurPlayerNum = function () {
                var players = this.toArrayPlayer();
                var curnum = 0;
                for (var i = 0; i < players.length; i++) {
                    if (players[i]) {
                        curnum++;
                    }
                }
                return curnum;
            };
            /**
             *
             * @param chairID 服务器座位号
             * 返回值:客户端座位号
             */
            gameBaseMod.prototype.getIndexByChairID = function (chairID) {
                var players = this.toArrayPlayer();
                for (var x in players) {
                    if (!players[x])
                        continue;
                    if (players[x].seat == chairID) {
                        if (this._maxPlayer == 3 && Number(x) == 2) {
                            return 3;
                        }
                        else if (this._maxPlayer == 2 && Number(x) == 1) {
                            return 2;
                        }
                        else {
                            return Number(x);
                        }
                    }
                }
                return -1;
            };
            /**
             *
             * @param chairID 服务器座位号
             * 返回值:玩家的uid
             */
            gameBaseMod.prototype.getUidByChairID = function (chairID) {
                var players = this.toArrayPlayer();
                for (var x in players) {
                    if (!players[x])
                        continue;
                    if (players[x].seat == chairID) {
                        return players[x].uid;
                    }
                }
                return -1;
            };
            /**
             *
             * @param uid
             * 根据userID获取客户端座位号
             */
            gameBaseMod.prototype.getIndexByUid = function (uid) {
                var players = this.toArrayPlayer();
                for (var x in players) {
                    if (!players[x])
                        continue;
                    if (players[x].uid == uid) {
                        return Number(x);
                    }
                }
                return -1;
            };
            gameBaseMod.prototype.getPlayerByUid = function (uid) {
                return this._players[uid] || null;
            };
            gameBaseMod.prototype.getPlayerByChairID = function (chairID) {
                for (var x in this._players) {
                    if (this._players[x].seat == chairID) {
                        return this._players[x];
                    }
                }
                return null;
            };
            gameBaseMod.prototype.getPlayerByClientID = function (chairID) {
                var player = this.toArrayPlayer();
                return player[chairID];
            };
            gameBaseMod.prototype.getTableInfo = function () {
                return this.tableInfo;
            };
            gameBaseMod.prototype.getSelfPlayer = function () {
                return this._players[this.userId];
            };
            gameBaseMod.prototype.getMaxNum = function () {
                return this._maxPlayer;
            };
            gameBaseMod.prototype.getGpsState = function () {
                return this.isOpenGps;
            };
            gameBaseMod.prototype.setGameState = function (status) {
                this.gameState = GAME_STATE.NONE;
                if (status == 101 || status == 102) {
                    this.gameState = GAME_STATE.GAMEING;
                }
            };
            gameBaseMod.prototype.getGameState = function () {
                return this.gameState;
            };
            gameBaseMod.prototype.getPlayerInfo = function () {
                return this.toArrayPlayer();
            };
            //获取准备玩家的个数
            gameBaseMod.prototype.getReadyNum = function () {
                var readyNum = 0;
                for (var x in this._players) {
                    if (!this._players[x])
                        continue;
                    if (this._players[x].isReady) {
                        readyNum++;
                    }
                }
                return readyNum;
            };
            //或者微信配置
            gameBaseMod.prototype.getConfigWx = function () {
                var configs = common.mod.Config.AppConfig;
                var feature = lodash.extend({}, configs.feature);
                return feature.wx && cc.sys.isWeChat;
            };
            //=====================通用发给服务器的消息=========================
            //发送邀请消息
            gameBaseMod.prototype.sendInvite = function () {
                kaayou.sendMessage(this.getModuleName(), 'htinvite_send', {});
            };
            //发送聊天信息
            /**
             *
             * @param data type:聊天类型(4、5为魔法表情)  index:具体是哪一句话或者哪个表情  targetuserid:如果有魔法表情
             */
            gameBaseMod.prototype.sendChat = function (data) {
                cc.log('发送聊天', data);
                var msg = {
                    color: data.type,
                    index: data.index,
                    userid: this.userId,
                    targetuserid: data.targetuserid,
                    message: data.message,
                };
                kaayou.sendMessage(this.getModuleName(), 'userchat', msg);
            };
            //发送语音聊天
            gameBaseMod.prototype.sendMicChat = function (micUrl) {
                cc.log('发送语音聊天', micUrl);
                kaayou.sendMessage(this.getModuleName(), 'yyinfo', { userid: this.userId, addr: micUrl });
            };
            //发送魔法表情信息
            gameBaseMod.prototype.sendUseMagic = function (data) {
                cc.log("发送魔法表情", data);
                var type = 4;
                if (cc.sys.localStorage.getItem('CheckBox_shilianfa') === 'true') {
                    type = 5;
                }
                if (!this.getPlayerByClientID(data.toIndex)) {
                    return;
                }
                var toUserId = this.getPlayerByClientID(data.toIndex).uid;
                this.sendChat({ type: type, index: data.toolId, targetuserid: toUserId });
            };
            //发送准备
            gameBaseMod.prototype.sendReady = function () {
                cc.log('发送准备');
                kaayou.sendMessage(this.getModuleName(), 'gameready', { uid: this.userId });
            };
            //===================通用收到服务器的消息=========================
            //玩家聊天消息
            gameBaseMod.prototype.onChat = function (chat) {
                cc.log('RES_聊天信息', chat);
                if (chat.errcode) {
                    var options = {
                        msg: chat.msg,
                        btns: [
                            {
                                name: "确定",
                                colorType: 'green'
                            },
                        ]
                    };
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                    return;
                }
                var provideIndex = this.getIndexByUid(chat.userid);
                var toIndex = this.getIndexByUid(chat.targetuserid);
                if (provideIndex == -1) {
                    return;
                }
                //一定是魔法表情
                if (toIndex >= 0) {
                    cc.log("发送魔法表情消息" + toIndex);
                    if (cc.sys.localStorage.getItem('isAuto_Anim') == 'false') {
                        //未勾选播放动画选项
                        return;
                    }
                    kaayou.emit(this.getModuleName(), 'ui::Table::broadcastUseMagic', { type: chat.color, dwindex: provideIndex, dwtoindex: toIndex, index: chat.index });
                }
                else {
                    kaayou.emit(this.getModuleName(), 'onChat', { dwindex: provideIndex, type: chat.color, index: chat.index, sex: this.getPlayerByUid(chat.userid).sex, message: chat.message });
                }
            };
            gameBaseMod.prototype.onYYinfo = function (data) {
                console.log('收到服务器玩家语音消息', JSON.stringify(data));
                if (!data.userid || !data.addr) {
                    return;
                }
                if (cc.sys.localStorage.getItem('isHide_Mic') == 'true') {
                    //勾选了屏蔽语音选项
                    return;
                }
                kaayou.PlatformMgr.getInstance().im.PlayMic(data.userid.toString(), data.addr.toString());
            };
            gameBaseMod.prototype.onoffline = function (offTime) {
                if (this._wait) {
                    return false;
                }
                cc.log('RES_玩家离线', offTime);
                this.fleeTime = 0;
                for (var i = 0; i < this._maxPlayer; i++) {
                    var player_1 = this.getPlayerByChairID(i);
                    if (!player_1)
                        continue;
                    if (offTime.time[i] > 0) {
                        if (this.fleeTime == 0) {
                            this.fleeTime = offTime.time[i];
                        }
                        else {
                            this.fleeTime = Math.min(this.fleeTime, offTime.time[i]);
                        }
                    }
                    if (offTime.code[i] != GR_US_Status.US_OFFLINE) {
                        this.hasExit[i] = false;
                    }
                    player_1.userStatus = offTime.code[i];
                    player_1.fleeTime = offTime.time[i] || 0;
                }
                var minName = "";
                var minIndex = offTime.time.indexOf(this.fleeTime);
                var player = this.getPlayerByChairID(minIndex);
                if (player) {
                    minName = player.name;
                }
                kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: this.toArrayPlayer() });
                this.putFlee(minName);
                return true;
            };
            /**
             *
             * @param minName 离线时间最长的玩家名字
             */
            gameBaseMod.prototype.putFlee = function (minName) {
                if (this._isGameStart) {
                    var fleePNams = [];
                    for (var x in this._players) {
                        if (this._players[x].userStatus == GR_US_Status.US_OFFLINE) {
                            // fleePNams.push(this._players[x].name);
                            var index = this._players[x].seat;
                            fleePNams.push({ name: this._players[x].name, index: index, hasExit: this.hasExit[index] });
                        }
                    }
                    if (fleePNams.length < 1) {
                        this.fleeTime = 0;
                    }
                    // this.playerFleeData = { names: fleePNams, time: this.fleeTime };
                    kaayou.emit(this.getModuleName(), 'ui::playerFleeLayer::setInfo', { fleeinfo: fleePNams, time: this.fleeTime, minName: minName });
                    kaayou.emit(this.getModuleName(), 'ui::DissmissRoom::updatePlayer', this.toOriginalArrayPlayer());
                }
                else {
                    kaayou.emit(this.getModuleName(), 'ui::FewerOpen::updatePlayer', this.toOriginalArrayPlayer());
                }
            };
            /**
             *
             * @param data index:如果在离线页面弹了，在没回来之前不会在弹该玩家离线
             */
            // @BindEvent('game', 'baseMod::setHasExit')
            gameBaseMod.prototype.setHasExit = function (data) {
                this.hasExit[data.index] = true;
            };
            //主要得到玩家的分数信息   __Game_User_Score__
            // onUserExtInfo(data) {
            //     let player = this.getPlayerByChairID(data.chairid);
            //     player.userScoreInfo = data.scoreinfo;
            //     kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: this.toArrayPlayer() })
            // }
            //账号被挤的时候的消息
            gameBaseMod.prototype.onReLog = function () {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: "您的账号在别处登录!", btns: [{
                            name: "确定",
                            action: function () {
                                // kaayou.PlatformMgr.getInstance().im.StopPlayAudio();
                                // kaayou.UIManager.getInstance().runScene('lobby');
                                kaayou.emit("lobby", "mod::User::LogOut");
                            }
                        }]
                });
            };
            gameBaseMod.prototype.setWait = function (v) {
                this._wait = v;
                ;
            };
            return gameBaseMod;
        }(kaayou.mod.Base));
        mod.gameBaseMod = gameBaseMod;
    })(mod = common.mod || (common.mod = {}));
})(common || (common = {}));
/// <reference path="common.mod.gameBaseMod.ts" />
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var mod;
    (function (mod) {
        var DismissRoomState;
        (function (DismissRoomState) {
            DismissRoomState[DismissRoomState["AGREE"] = 1] = "AGREE";
            DismissRoomState[DismissRoomState["DISAGREE"] = 2] = "DISAGREE";
            DismissRoomState[DismissRoomState["DISMISS_CREATOR"] = 3] = "DISMISS_CREATOR";
            DismissRoomState[DismissRoomState["WATING"] = 4] = "WATING";
            DismissRoomState[DismissRoomState["DISSMISS_MAX"] = 5] = "DISSMISS_MAX";
        })(DismissRoomState = mod.DismissRoomState || (mod.DismissRoomState = {}));
        var FewerState;
        (function (FewerState) {
            FewerState[FewerState["AGREE"] = 1] = "AGREE";
            FewerState[FewerState["DISAGREE"] = 2] = "DISAGREE";
            FewerState[FewerState["Fewer_CREATOR"] = 3] = "Fewer_CREATOR";
            FewerState[FewerState["WATING"] = 4] = "WATING";
            FewerState[FewerState["Fewer_MAX"] = 5] = "Fewer_MAX";
        })(FewerState = mod.FewerState || (mod.FewerState = {}));
        var friendBaseMod = /** @class */ (function (_super) {
            __extends(friendBaseMod, _super);
            function friendBaseMod() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.curRound = 0;
                _this.scoreRadix = 1; //积分放大倍数
                _this.gameConfig = null;
                _this._isGuestState = false;
                _this.srkjNum = -1;
                return _this;
            }
            friendBaseMod.prototype.initMod = function () {
                this.isFriendRoom = true;
                this.scoreRadix = 1;
                this._isGuestState = false;
                _super.prototype.initMod.call(this);
            };
            friendBaseMod.prototype.getIsOpenGps = function () {
                console.log("是否开启GPS", common.mod.Config.AppConfig["gps"]["enabled"]);
                return common.mod.Config.AppConfig["gps"]["enabled"] ? true : false;
            };
            friendBaseMod.prototype.setIsGuestState = function (v) {
                this._isGuestState = v;
            };
            friendBaseMod.prototype.getIsGuest = function () {
                return this._isGuestState;
            };
            friendBaseMod.prototype.bindModEvents = function () {
                var self = this;
                _super.prototype.bindModEvents.call(this);
                kaayou.getController(this.getModuleName()).on('ws::onConnect', function (e) {
                    self.onConnect();
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::ping', function (e) {
                    kaayou.emit("", "ui::ping::netStatus", JSON.stringify(e.data));
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::gvoicemember', function (e) {
                    console.log('GVoice 收到gvoicemember广播消息', JSON.stringify(e.data));
                    self.OnGVoiceMember(e.data);
                }, this);
                kaayou.getController(this.getModuleName()).on('gvoice::UpdateMemberVoice', function (e) {
                    self.OnGvoiceMemberVoice(e.data);
                }, this);
                // kaayou.getController(this.getModuleName()).on('ws::Msg::sitein', function (e: kaayou.Event) {
                //     // self.onSiteIn(e.data);
                //     self._eventQueue.push({data:e.data,func:self.onSiteIn,target:self});
                // }, this);
                // kaayou.getController(this.getModuleName()).on('ws::Msg::siteinfo', function (e: kaayou.Event) {
                //     // self.onSiteInfo(e.data);
                //     self._eventQueue.push({data:e.data,func:self.onSiteInfo,target:self});
                // }, this);
                // kaayou.getController(this.getModuleName()).on('mod::User::doSiteTableIn', function (e: kaayou.Event) {
                //     // self.onDoSiteTableIn(e.data);
                //     self._eventQueue.push({data:e.data,func:self.onDoSiteTableIn,target:self});
                // }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::gameinfo', function (e) {
                    console.log('RES_获取游戏信息', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGameInfo, target: self, mname: self.getModuleName(), ename: "ws::Msg::gameinfo" });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::tableinfo', function (e) {
                    cc.log('桌子信息', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onTableInfo, target: self, mname: self.getModuleName(), ename: "ws::Msg::tableinfo" });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::statusFree', function (e) {
                    console.log('空闲状态', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGameFree, target: self, mname: self.getModuleName(), ename: "ws::Msg::statusFree" });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::userStatus', function (e) {
                    console.log('RES_玩家状态消息', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onUpdateuserStatus, target: self, mname: self.getModuleName(), ename: "ws::Msg::userStatus" });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::gamepause', function (e) {
                    console.log('RES_玩家竞技点暂停状态消息', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onUpdatePlayerFcmPause, target: self, mname: self.getModuleName(), ename: "ws::Msg::gamepause" });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::gamecontinue', function (e) {
                    console.log('RES_玩家竞技点继续状态消息', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onUpdatePlayerFcmContinue, target: self, mname: self.getModuleName(), ename: "ws::Msg::gamecontinue" });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::housevitaminset_ntf', function (e) {
                    console.log('RES_游戏竞技点更新推送', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onUpdatePlayerVitamin, target: self, mname: self.getModuleName(), ename: "ws::Msg::housevitaminset_ntf" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::dissmissfriend", function (e) {
                    console.log('RES_收到解散申请', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onDissmissRep, target: self, mname: self.getModuleName(), ename: "ws::Msg::dissmissfriend" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::gameGoOnNextGame", function (e) {
                    console.log('RES_下一局', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onNextGame, target: self, mname: self.getModuleName(), ename: "ws::Msg::gameGoOnNextGame" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::gameStatus", function (e) {
                    cc.log('RES_场景状态返回', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGameStatus, target: self, mname: self.getModuleName(), ename: "ws::Msg::gameStatus" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::tableexit", function (e) {
                    cc.log('RES_退出桌子', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onTableExit, target: self, mname: self.getModuleName(), ename: "ws::Msg::tableexit" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::forcetabledel", function (e) {
                    console.log('RES_房主解散', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onForcetabledel, target: self, mname: self.getModuleName(), ename: "ws::Msg::forcetabledel" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::dissmissfriendrep", function (e) {
                    cc.log('RES_收到解散申请', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onDissmissRep, target: self, mname: self.getModuleName(), ename: "ws::Msg::dissmissfriendrep" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::dismissRoom", function (e) {
                    cc.log('RES_解散房间', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onDissmissRoom, target: self, mname: self.getModuleName(), ename: "ws::Msg::dismissRoom" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::dissmissresult", function (e) {
                    console.log('RES_解散状态', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGuestDismissFriendState, target: self, mname: self.getModuleName(), ename: "ws::Msg::dissmissresult" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::userinfohead", function (e) {
                    console.log("RES_玩家计分信息", e.data);
                    self._eventQueue.push({ data: e.data, func: self.onUserExtInfo, target: self, mname: self.getModuleName(), ename: "ws::Msg::userinfohead" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::tablein", function (e) {
                    self._eventQueue.push({ data: e.data, func: self.onTableInErr, target: self, mname: self.getModuleName(), ename: "ws::Msg::tablein" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::fewershow", function (e) {
                    self._eventQueue.push({ data: e.data, func: self.onFewershow, target: self, mname: self.getModuleName(), ename: "ws::Msg::fewershow" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::fewerhide", function (e) {
                    self._eventQueue.push({ data: e.data, func: self.onFewerhide, target: self, mname: self.getModuleName(), ename: "ws::Msg::fewerhide" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::fewerclose", function (e) {
                    self._eventQueue.push({ data: e.data, func: self.onFewerclose, target: self, mname: self.getModuleName(), ename: "ws::Msg::fewerclose" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::fewerinfo", function (e) {
                    self._eventQueue.push({ data: e.data, func: self.onFewerinfo, target: self, mname: self.getModuleName(), ename: "ws::Msg::fewerinfo" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::fewerfriend", function (e) {
                    self._eventQueue.push({ data: e.data, func: self.onFewerfriend, target: self, mname: self.getModuleName(), ename: "ws::Msg::fewerfriend" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::fewerresult", function (e) {
                    self._eventQueue.push({ data: e.data, func: self.onFewerresult, target: self, mname: self.getModuleName(), ename: "ws::Msg::fewerresult" });
                }, this);
                kaayou.getController(this.getModuleName()).on("ws::Msg::tablewatcherlist", function (e) {
                    // self._eventQueue.push({ data: e.data, func: self.onTablewatcherlist, target: self, mname: self.getModuleName(), ename: "ws::Msg::fewerresult" });
                    self.onTablewatcherlist(e.data);
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::gamemessage', function (e) {
                    // self.onGameMessage(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGameMessage, target: self });
                }, this);
            };
            friendBaseMod.prototype.onGameMessage = function (data) {
                var _this = this;
                if (this._wait) {
                    return false;
                }
                console.log("收到通知消息:", data);
                if (data.content && data.content.length > 0) {
                    var options = {
                        msg: data.content,
                        btns: [
                            {
                                name: "确定",
                                colorType: 'green',
                                action: function () {
                                    _this.CleanAndGotoLobby();
                                }
                            },
                        ],
                    };
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                }
                // //type:消息类型，0x1000:退出游戏
                // if (data.type & 0x1000) {
                //     kaayou.emit(this.getModuleName(), "Exit", { exitType: 0 });
                //     kaayou.emit(this.getModuleName(), 'ui::cleanUp');
                // }
                return true;
            };
            friendBaseMod.prototype.onTablewatcherlist = function (data) {
                kaayou.emit(this.getModuleName(), "ui::watchLayer::getGuestList", data.items);
            };
            friendBaseMod.prototype.onGameStatus = function (status) {
                if (this._wait) {
                    return false;
                }
                this._gameInfo.status = status.bGameStatus;
                return true;
            };
            friendBaseMod.prototype.doPlayBGM = function () {
                console.log('doPlayBGM');
            };
            friendBaseMod.prototype.playerExtends = function (player) {
                player = lodash.extend({
                    dismissState: DismissRoomState.WATING,
                    fewerState: FewerState.WATING,
                    gvoicemenberid: -1,
                    gvoicesta: 0,
                }, player);
                _super.prototype.playerExtends.call(this, player);
                return player;
            };
            friendBaseMod.prototype.IsMaster = function () {
                return this.userId == this.tableInfo.creator;
            };
            friendBaseMod.prototype.toArrayPlayer = function () {
                if (this._isGuestState) {
                    var pArr = [];
                    for (var i = 0; i < this._maxPlayer; i++) {
                        var player = null;
                        for (var x in this._players) {
                            if (i == this._players[x].seat) {
                                player = this._players[x];
                            }
                        }
                        pArr[i] = player;
                    }
                    return this.offsetPlayer(pArr);
                }
                else {
                    return _super.prototype.toArrayPlayer.call(this);
                }
            };
            friendBaseMod.prototype.getSelfPlayer = function () {
                if (this._isGuestState) {
                    // return this._players[]
                    for (var x in this._players) {
                        if (this._players[x].seat == this.myServerchair) {
                            return this._players[x];
                        }
                    }
                }
                else {
                    return this._players[this.userId];
                }
            };
            friendBaseMod.prototype.setServerChair = function (chair) {
                this.myServerchair = chair;
            };
            //用户加入实时语音房间时的广播消息
            friendBaseMod.prototype.OnGVoiceMember = function (data) {
                if (!data || !data.user) {
                    return;
                }
                if (data.user.length == 0) {
                    return;
                }
                for (var i = 0; i < data.user.length; i++) {
                    var player = this.getPlayerByUid(data.user[i].uid);
                    if (player) {
                        player.gvoicemenberid = data.user[i].id;
                    }
                }
            };
            //实时语音房间成员语音状态消息
            friendBaseMod.prototype.OnGvoiceMemberVoice = function (data) {
                var isUpdate = false;
                for (var i = 0; i < this._maxPlayer; i++) {
                    var player = this.getPlayerByChairID(i);
                    if (!player)
                        continue;
                    if (player.gvoicemenberid == -1 || player.gvoicemenberid != data.memberID)
                        continue;
                    if (player.gvoicesta == -1)
                        break;
                    player.gvoicesta = data.status;
                    kaayou.emit(this.getModuleName(), "ui::UpdateMemberVoice", { index: this.getIndexByChairID(i), gvoicesta: data.status });
                    isUpdate = true;
                    break;
                }
                if (!isUpdate) {
                    console.error("GVoice 收到语音状态变更消息，但是头像上状态未更新 ");
                    console.log("GVoice data:", JSON.stringify(data));
                    for (var i = 0; i < this._maxPlayer; i++) {
                        var player = this.getPlayerByChairID(i);
                        if (!player)
                            continue;
                        console.log("GVoice uid=" + player.uid + ", gvoicemenberid=", player.gvoicemenberid + ", gvoicesta=", player.gvoicesta);
                    }
                }
            };
            //如果游戏是空闲状态,就会收到这个消息
            friendBaseMod.prototype.onGameFree = function (freedata) {
                if (this._wait) {
                    return false;
                }
                this.gameState = common.mod.GAME_STATE.NONE;
                return true;
            };
            friendBaseMod.prototype.onConnect = function () {
                var gameconfig = null;
                try {
                    gameconfig = JSON.parse(kaayou.DataSet.get("game::config") || ""); //  , JSON.stringify(tempRes));
                }
                catch (err) {
                }
                if (!gameconfig) {
                    kaayou.emit(this.getModuleName(), "ui::RunSceneError");
                    return;
                }
                var areaInfo = kaayou.DataSet.get("user::Map");
                console.log("进桌子的时候玩家地区信息：" + areaInfo);
                if (!lodash.isEmpty(areaInfo)) {
                    this.mapinfo = JSON.parse(areaInfo);
                }
                var isValid = true;
                if (this.mapinfo) {
                    isValid = this.isValidAddr(Number(this.mapinfo.longitude), Number(this.mapinfo.latitude));
                }
                if (this._eventQueue) {
                    this._eventQueue.start();
                }
                kaayou.emit('common', 'ui::Loading::Hide');
                this.gameConfig = gameconfig;
                var self = this;
                kaayou.sendMessage(this.getModuleName(), 'tablein', { id: gameconfig.id, uid: this.userId, token: this.token, minfo: isValid ? JSON.stringify(this.mapinfo) : '{}' });
            };
            friendBaseMod.prototype.onTableInErr = function (info) {
                if (this._wait) {
                    return false;
                }
                var self = this;
                if (this.gameState != mod.GAME_STATE.GAME_OVER) {
                    if (info.errcode != 0) {
                        var options = {
                            msg: info.msg,
                            btns: [
                                {
                                    name: "确定",
                                    action: function () {
                                        self.CleanAndGotoLobby();
                                    },
                                    colorType: 'green'
                                },
                            ]
                        };
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                    }
                }
                return true;
            };
            friendBaseMod.prototype.onFewershow = function (data) {
                cc.log("显示少人开局", data.num);
                this.srkjNum = data.num;
                kaayou.emit(this.getModuleName(), 'ui::MjTable::showKSRKJ', { num: data.num });
                return true;
            };
            //发起少人开局的按钮隐藏
            friendBaseMod.prototype.onFewerhide = function () {
                kaayou.emit(this.getModuleName(), "ui::MjTable::hideKSRKJ");
                return true;
            };
            // 少人申请过程中有人加入房间  会给客户端推送这个消息  关闭申请面板   //  State    int `json:"state"` //   1申请前  2申请中 3申请通过或人满
            friendBaseMod.prototype.onFewerclose = function (data) {
                cc.log(data);
                if (data.state == 3) {
                    this._maxPlayer = data.num;
                    kaayou.emit(this.getModuleName(), "ui::MjTable::btnInviteHide");
                }
                kaayou.emit(this.getModuleName(), "ui::FewerOpen::hide");
                kaayou.emit(this.getModuleName(), "ui::MjTable::hideKSRKJ", { b: data.state == 1 });
                for (var x in this._players) {
                    this._players[x].fewerState = FewerState.WATING;
                }
                return true;
            };
            //断线重连服务器推送过来的可少人开局的信息（如果有）
            friendBaseMod.prototype.onFewerinfo = function (data) {
                cc.log('RES_少人开房', data);
                for (var i = 0; i < this._maxPlayer; i++) {
                    var player = this.getPlayerByChairID(i);
                    if (!player)
                        continue;
                    player.fewerState = data.situation[i];
                }
                kaayou.emit(this.getModuleName(), 'ui::FewerOpen::show', {
                    Players: this.toOriginalArrayPlayer(),
                    myServerchair: this.myServerchair,
                    isCan: this.getSelfPlayer().fewerState == FewerState.WATING,
                    srkjNum: this._maxPlayer - 1,
                    isShow: true
                });
                return true;
            };
            // 第一个人点击之后 服务器返回
            friendBaseMod.prototype.onFewerfriend = function (data) {
                cc.log("收到srkj", data);
                if (!this._players[data.uid]) {
                    return;
                }
                this._players[data.uid].fewerState = FewerState.Fewer_CREATOR;
                kaayou.emit(this.getModuleName(), 'ui::FewerOpen::show', {
                    Players: this.toOriginalArrayPlayer(),
                    myServerchair: this.myServerchair,
                    isCan: this.getSelfPlayer().fewerState == FewerState.WATING,
                    srkjNum: this.srkjNum,
                    isShow: true
                });
                return true;
            };
            // 返回申请少人开局玩家状态
            friendBaseMod.prototype.onFewerresult = function (dis) {
                cc.log('RES_少人开局玩家状态', dis);
                if (!this._players[dis.id]) {
                    return;
                }
                ;
                if (dis.flag == true) {
                    this._players[dis.id].fewerState = FewerState.AGREE;
                    kaayou.emit(this.getModuleName(), "ui::FewerOpen::show", {
                        Players: this.toOriginalArrayPlayer(), myServerchair: this.myServerchair,
                        isCan: this.getSelfPlayer().fewerState == FewerState.WATING,
                        srkjNum: this._maxPlayer - 1,
                        isShow: false
                    });
                }
                else if (dis.flag == false) {
                    this._players[dis.id].fewerState = FewerState.DISAGREE;
                    var playerinfo = this.getPlayerByUid(dis.id);
                    kaayou.emit(this.getModuleName(), 'ui::FewerOpen::hide');
                    kaayou.emit(this.getModuleName(), 'ui::MjTable::unSelect');
                    for (var x in this._players) {
                        this._players[x].fewerState = FewerState.WATING;
                    }
                    if (this.getIndexByChairID(dis.id) != 0 && dis.id != this.userId) {
                        var tempNickName = kaayou.Identify.nickNameSubFive(playerinfo.name);
                        var options = {
                            title: "温馨提示",
                            msg: "玩家" + tempNickName + "不同意少人开局",
                            close: {
                                isShow: false,
                                action: null,
                            },
                            btns: [
                                {
                                    name: "确定",
                                    colorType: 'green'
                                },
                            ]
                        };
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                    }
                }
                else {
                    for (var x in this._players) {
                        this._players[x].fewerState = FewerState.WATING;
                    }
                }
                return true;
            };
            //gamestatus: 0 空闲状态  101游戏状态  102海底捞状态  103一局结束状态
            friendBaseMod.prototype.onGameInfo = function (data) {
                if (this._wait) {
                    return false;
                }
                this.setGameState(data.gamestatus);
                //当小结的时候断线重连会有问题  因为服务端发的状态为0(应该103)
                for (var i = 0; i < this._maxPlayer; i++) {
                    var player = this.getPlayerByChairID(i);
                    if (player) {
                        player.isReady = data.userready[i]; //
                        player.userStatus = data.userstatus[i];
                        //游戏开始前断线重连过的玩家，服务器下发的isReady不正确，需要通过userStatus判断玩家是否准备
                        if (player.userStatus == mod.GR_US_Status.US_READY) {
                            player.isReady = true;
                        }
                    }
                }
                if (this._isGameStart) {
                    return true;
                }
                var curPlayerNum = 0;
                for (var i = 0; i < this._maxPlayer; i++) {
                    var player = this.getPlayerByChairID(i);
                    if (player) {
                        // player.isReady = data.userready[i];
                        // player.userStatus = data.userstatus[i];
                        curPlayerNum++;
                        if (player.uid == this.userId) {
                            if (!player.isReady && this.gameState != mod.GAME_STATE.GAMEING) {
                                if (curPlayerNum < this._maxPlayer) {
                                    if (this.tableInfo.gameconfig["fewerstart"] == 'true') {
                                        kaayou.emit(this.getModuleName(), "ui::MjTable::showKSRKJ", { num: 1 });
                                    }
                                    this.sendReady();
                                }
                                else {
                                    if (!this._isGameStart) {
                                        kaayou.emit(this.getModuleName(), 'ui::MjTable::lastPlayerCome', { leftTime: 5 });
                                    }
                                }
                            }
                        }
                    }
                }
                return true;
            };
            friendBaseMod.prototype.onTableInfo = function (data) {
                if (this._wait) {
                    return false;
                }
                this.maxRound = data.gameconfig.roundnum;
                this._maxPlayer = data.gameconfig.playernum;
                this.scoreRadix = data.gameconfig["scoreradix"] || 1;
                this.tableInfo = data;
                this.curRound = data.step;
                this._isGameStart = data.step > 0;
                this._isSceneIn = true;
                if (!data.person) {
                    data.person = [];
                }
                // //保存kindId
                // common.Rule.setKindID(data.kindid);
                //与服务器数据保持一致
                for (var x in this._players) {
                    var find = false;
                    for (var i = 0; i < data.person.length; i++) {
                        if (this._players[x].uid == data.person[i].uid) {
                            find = true;
                            break;
                        }
                    }
                    if (!find) {
                        delete this._players[x];
                    }
                }
                console.log(this._players);
                for (var i = 0; i < data.person.length; i++) {
                    if (!data.person[i])
                        continue;
                    if (!this._players[data.person[i].uid]) {
                        this.onPlayerCome(data.person[i]);
                    }
                    else {
                        this._players[data.person[i].uid] = lodash.extend(this._players[data.person[i].uid], data.person[i]);
                    }
                }
                kaayou.emit(this.getModuleName(), "ui::playerInfoLayer::hideAddress");
                //如果没有我 那么就是游客
                if (!this._players[this.userId]) {
                    this.setIsGuestState(true);
                    if (this.myServerchair < 0) {
                        //在旁观玩家里面查找当前玩家的座位号
                        var lookonper = {};
                        for (var i = 0; i < data.lookonperson.length; i++) {
                            for (var j = 0; data.lookonperson[i] && j < data.lookonperson[i].length; j++) {
                                if (!data.lookonperson[i][j])
                                    continue;
                                lookonper[data.lookonperson[i][j].uid] = lodash.extend(lookonper[data.lookonperson[i][j].uid], data.lookonperson[i][j]);
                            }
                        }
                        if (lookonper[this.userId]) {
                            this.setServerChair(lookonper[this.userId].seat);
                        }
                        else {
                            this.setServerChair(0);
                        }
                    }
                    kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: this.toArrayPlayer() });
                }
                else {
                    this.setIsGuestState(false);
                }
                kaayou.emit(this.getModuleName(), "ui::RunScene");
                kaayou.emit(this.getModuleName(), 'showTableInfo', { roomid: data.tableid, gameconfig: data.gameconfig, curRound: '' + this.curRound + ' / ' + data.gameconfig.roundnum, hid: data.hid, ntid: data.ntid });
                return true;
            };
            friendBaseMod.prototype.gameOutConfirm = function () {
                var _this = this;
                var self = this;
                //网络断开时，直接返回大厅
                if (!kaayou.NetManager.getInstance().getSocket(this.getModuleName()).isOpend()) {
                    this.CleanAndGotoLobby();
                    return;
                }
                if (this._isGuestState) {
                    kaayou.sendMessage(this.getModuleName(), 'tablewatcherquit', { tableid: this.getTableInfo().tableid, uid: this.userId });
                    kaayou.emit('common', 'ui::Toast::Show', { msg: '正在返回大厅,请稍后...', time: 1, mask: true });
                    //延迟1秒返回大厅 避免socket断开链接频繁
                    setTimeout(function () {
                        _this.CleanAndGotoLobby();
                    }, 1000);
                    return;
                }
                var getMsg = function () {
                    var msg = "";
                    if (self._isGameStart) {
                        msg = "确定要申请解散吗";
                    }
                    else {
                        //lw181219亲友圈里不提示退还房卡
                        if (self.IsMaster() && self.tableInfo.hid <= 0) {
                            msg = "游戏未开始房卡将退还";
                        }
                        else {
                            msg = "确定退出房间吗?";
                        }
                    }
                    return msg;
                };
                var options = {
                    title: "温馨提示",
                    msg: getMsg(),
                    close: {
                        isShow: false,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                if (!self._isGameStart) {
                                    self.sendLeftGame();
                                }
                                else {
                                    self.sendDissmiss();
                                }
                            },
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            colorType: 'blue'
                        }
                    ]
                };
                kaayou.emit('common', 'ui::Dialog::Show', options);
            };
            //离开游戏
            friendBaseMod.prototype.sendLeftGame = function () {
                kaayou.sendMessage(this.getModuleName(), 'tableexit', {});
            };
            friendBaseMod.prototype.sendDissmiss = function () {
                cc.log('发送申请解散');
                kaayou.sendMessage(this.getModuleName(), 'dissmissfriend', { userId: this.userId });
            };
            friendBaseMod.prototype.sendDissResult = function (data) {
                kaayou.sendMessage(this.getModuleName(), 'dissmissresult', { id: this.userId, flag: data.isAgree });
            };
            //可少人开局
            friendBaseMod.prototype.sendFewerresult = function (data) {
                cc.log('发送申请解散');
                kaayou.sendMessage(this.getModuleName(), 'fewerresult', { flag: data.isAgree });
            };
            //发送自己的gvoice memberid
            friendBaseMod.prototype.sendGVoiceMemberID = function (data) {
                cc.log('GVoice 发送自己的 memberid:', data.memberid);
                kaayou.sendMessage(this.getModuleName(), 'gvoicemember', { uid: this.userId, id: data.memberid });
            };
            //===================通用收到服务器的消息=========================
            friendBaseMod.prototype.onNextGame = function (data) {
                console.log('RES_下一局', data);
                if (this._wait) {
                    return false;
                }
                if (!this._players || !data.id || !this._players[data.id]) {
                    return;
                }
                this._players[data.id].isReady = true;
                if (data.id == this.userId) {
                    kaayou.emit(this.getModuleName(), 'onIready');
                }
                kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: this.toArrayPlayer() });
                return true;
            };
            //游戏没开始,退出
            friendBaseMod.prototype.onTableExit = function (data) {
                if (this._wait) {
                    return false;
                }
                if (!this._players[data.uid]) {
                    return true;
                }
                delete this._players[data.uid];
                console.log(this._players);
                var self = this;
                if (data.uid == this.userId) {
                    // lw181213亲友圈一律显示退出
                    if (this.tableInfo.hid > 0) {
                        kaayou.emit('common', 'ui::Toast::Show', { msg: '退出成功', time: 1, mask: false });
                    }
                    else {
                        // if (data.uid == this.tableInfo.creator) {
                        //     kaayou.emit('common', 'ui::Toast::Show', { msg: '解散成功', time: 1, mask: false });
                        // } else {
                        //     kaayou.emit('common', 'ui::Toast::Show', { msg: '退出成功', time: 1, mask: false });
                        // }
                    }
                    // setTimeout(function () {
                    //     kaayou.PlatformMgr.getInstance().im.StopPlayAudio();
                    //     kaayou.UIManager.getInstance().runScene('lobby');
                    // }, 1);
                    self.CleanAndGotoLobby();
                }
                else {
                    var players = this.toArrayPlayer();
                    kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: players });
                }
                return true;
            };
            //游戏没开始,房主解散(或者圈主解散)
            friendBaseMod.prototype.onForcetabledel = function (data) {
                if (this._wait) {
                    return false;
                }
                var self = this;
                var options = {
                    title: "温馨提示",
                    msg: data.msg,
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                // kaayou.PlatformMgr.getInstance().im.StopPlayAudio();
                                // kaayou.UIManager.getInstance().runScene('lobby');
                                self.CleanAndGotoLobby();
                            },
                            colorType: 'green'
                        },
                    ]
                };
                if (this._isGameStart) {
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                    return true;
                }
                // if(this.tableInfo.hid > 0){
                //1为非房主解散
                if (data.type != 1) {
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                }
                else {
                    if (this.userId != this.tableInfo.creator) {
                        //lw181207产品要求改为弱提示
                        kaayou.emit('common', 'ui::Toast::Show', { msg: '房间已被解散', time: 1, mask: false });
                    }
                    else {
                        kaayou.emit('common', 'ui::Toast::Show', { msg: '解散成功', time: 1, mask: false });
                    }
                    // setTimeout(function () {
                    //     kaayou.PlatformMgr.getInstance().im.StopPlayAudio();
                    //     kaayou.UIManager.getInstance().runScene('lobby');
                    // }, 1);
                    self.CleanAndGotoLobby();
                }
                return true;
            };
            /**
             *
             * @param dis id:操作人的id   flag:  1:同意解散  0:不同意解散
             */
            friendBaseMod.prototype.onGuestDismissFriendState = function (dis) {
                if (this._wait) {
                    return false;
                }
                if (!this._players[dis.id]) {
                    return true;
                }
                ;
                if (dis.flag == 1) {
                    this._players[dis.id].dismissState = DismissRoomState.AGREE;
                    // kaayou.emit(this.getModuleName(), "ui::DissmissRoom::Show", {
                    kaayou.emit(this.getModuleName(), "ui::MjTable::showDissmissRoom", {
                        Players: this.toOriginalArrayPlayer(), myServerchair: this.myServerchair, isCan: this.getSelfPlayer().dismissState == DismissRoomState.WATING, leftTime: null
                    });
                }
                else if (dis.flag == 0) {
                    this._players[dis.id].dismissState = DismissRoomState.DISAGREE;
                    var playerinfo = this.getPlayerByUid(dis.id);
                    kaayou.emit(this.getModuleName(), 'ui::DissmissRoom::Hide');
                    for (var x in this._players) {
                        this._players[x].dismissState = DismissRoomState.WATING;
                    }
                    if (this.getIndexByChairID(dis.id) != 0 && dis.id != this.userId) {
                        var tempNickName = kaayou.Identify.nickNameSubFive(playerinfo.name);
                        var options = {
                            title: "温馨提示",
                            msg: "玩家" + tempNickName + "不同意解散对局",
                            close: {
                                isShow: false,
                                action: null,
                            },
                            btns: [
                                {
                                    name: "确定",
                                    colorType: 'green'
                                },
                            ]
                        };
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                        return true;
                    }
                }
                else {
                    for (var x in this._players) {
                        this._players[x].dismissState = DismissRoomState.WATING;
                    }
                }
                return true;
            };
            //断线重连服务器推送过来的解散房间的信息（如果有）
            friendBaseMod.prototype.onDissmissRoom = function (data) {
                if (this._wait) {
                    return false;
                }
                if (data.timer <= 0) {
                    for (var x in this._players) {
                        this._players[x].dismissState = DismissRoomState.WATING;
                    }
                    kaayou.emit(this.getModuleName(), 'ui::DissmissRoom::Hide');
                    return true;
                }
                for (var i = 0; i < this._maxPlayer; i++) {
                    var player = this.getPlayerByChairID(i);
                    if (!player)
                        continue;
                    player.dismissState = data.situation[i];
                }
                // kaayou.emit(this.getModuleName(), 'ui::DissmissRoom::Show', {
                kaayou.emit(this.getModuleName(), 'ui::MjTable::showDissmissRoom', {
                    Players: this.toOriginalArrayPlayer(), myServerchair: this.myServerchair, leftTime: data.timer,
                    isCan: this.getSelfPlayer().dismissState == DismissRoomState.WATING
                });
                return true;
            };
            /**
             * @param data id:申请解散的玩家uid  timer:离线申请的剩余时间
             */
            friendBaseMod.prototype.onDissmissRep = function (data) {
                if (this._wait) {
                    return false;
                }
                if (!this._players[data.id]) {
                    return true;
                }
                this._players[data.id].dismissState = DismissRoomState.DISMISS_CREATOR;
                kaayou.emit(this.getModuleName(), 'ui::MjTable::showDissmissRoom', {
                    Players: this.toOriginalArrayPlayer(), myServerchair: this.myServerchair, leftTime: data.timer,
                    isCan: this.getSelfPlayer().dismissState == DismissRoomState.WATING
                });
                return true;
            };
            //玩家竞技点状态变换status-- 1防沉迷玩家  0正常
            friendBaseMod.prototype.onUpdatePlayerFcmPause = function (data) {
                if (this._wait) {
                    return false;
                }
                var self = this;
                lodash.forEach(data.status, function (v, i) {
                    self._players[i].fcm_status = v;
                });
                this.gameState = mod.GAME_STATE.GAMEPAUSE;
                var players = this.toArrayPlayer();
                kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: players });
                kaayou.emit(this.getModuleName(), "ui::FCM::FcmStatus", { isShow: true, content: data.content });
                return true;
            };
            //玩家竞技点状态变换status-- 1防沉迷玩家  0正常
            friendBaseMod.prototype.onUpdatePlayerFcmContinue = function () {
                if (this._wait) {
                    return false;
                }
                this.gameState = mod.GAME_STATE.GAMEING;
                var players = this.toArrayPlayer();
                players.forEach(function (v) {
                    if (!!v) {
                        v.fcm_status = 0;
                    }
                });
                kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: players });
                kaayou.emit(this.getModuleName(), "ui::FCM::FcmStatus", { isShow: false, content: "" });
                return true;
            };
            //玩家竞技点状态
            friendBaseMod.prototype.onUpdatePlayerVitamin = function (data) {
                if (this._wait) {
                    return false;
                }
                this._players[data.uid].vitamin = data.vitamin;
                var players = this.toArrayPlayer();
                kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: players });
                return true;
            };
            //更新玩家状态消息
            friendBaseMod.prototype.onUpdateuserStatus = function (status) {
                if (this._wait) {
                    return false;
                }
                var uid = status.userid;
                if (!this._players[uid]) {
                    return true;
                }
                this._players[uid].userStatus = status.userstatus;
                if (status.userstatus == mod.GR_US_Status.US_READY) {
                    this._players[uid].isReady = true;
                    // kaayou.emit(this.getModuleName(), 'playReadyMusic', { player: this._players[uid] });
                }
                else if (status.userstatus == common.mod.GR_US_Status.US_SIT) {
                    this._players[uid].isReady = false;
                }
                if (uid == this.userId) {
                    if (status.userstatus <= 1) {
                        delete this._players[uid];
                        return true;
                    }
                    else {
                        if (status.userstatus == mod.GR_US_Status.US_SIT) {
                            // this.sendReady();
                        }
                        else if (status.userstatus == mod.GR_US_Status.US_READY || status.userstatus == common.mod.GR_US_Status.US_PLAY) {
                            kaayou.emit(this.getModuleName(), 'onIready');
                        }
                    }
                }
                else {
                    if (status.userstatus <= 1) {
                        delete this._players[uid];
                    }
                    else {
                    }
                }
                var players = this.toArrayPlayer();
                kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: players });
                return true;
            };
            friendBaseMod.prototype.onUserExtInfo = function (data) {
                if (this._wait) {
                    return false;
                }
                var player = this.getPlayerByChairID(data.chairid);
                if (player) {
                    player.score = data.scoreinfo.score;
                    player.vitamin = data.scoreinfo.vitamin;
                }
                if (this._isGuestState) {
                    kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: this.toArrayPlayer() });
                }
                return true;
            };
            //发送魔法表情信息
            friendBaseMod.prototype.sendUseMagic = function (data) {
                cc.log("发送魔法表情", data);
                var type = 4;
                //好友房没有十连发
                // if(cc.sys.localStorage.getItem('CheckBox_shilianfa') === 'true'){
                //     type = 5;
                // }
                if (!this.getPlayerByClientID(data.toIndex)) {
                    return;
                }
                var toUserId = this.getPlayerByClientID(data.toIndex).uid;
                this.sendChat({ type: type, index: data.toolId, targetuserid: toUserId });
            };
            //游客发送获取观战列表
            friendBaseMod.prototype.sendGetGuestList = function () {
                kaayou.sendMessage(this.getModuleName(), "tablewatcherlist", {});
            };
            //游客切换视角
            friendBaseMod.prototype.sendGuestSwitch = function (seat) {
                if (!this.getIsGuest()) {
                    console.error("您不是游客");
                    return;
                }
                if (!this.tableInfo) {
                    return;
                }
                kaayou.sendMessage(this.getModuleName(), "tablewatcherswitch", {
                    tableid: this.tableInfo.tableid,
                    uid: this.userId,
                    seat: seat
                });
            };
            return friendBaseMod;
        }(mod.gameBaseMod));
        mod.friendBaseMod = friendBaseMod;
    })(mod = common.mod || (common.mod = {}));
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var mod;
    (function (mod) {
        var goldBaseMod = /** @class */ (function (_super) {
            __extends(goldBaseMod, _super);
            function goldBaseMod() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.huanzhuo = false;
                _this.siteInfo = null;
                _this.isOpenGps = true;
                _this.__isfake = false;
                return _this;
            }
            goldBaseMod.prototype.initMod = function () {
                this.isFriendRoom = false;
                _super.prototype.initMod.call(this);
            };
            goldBaseMod.prototype.bindModEvents = function () {
                var _this = this;
                var self = this;
                _super.prototype.bindModEvents.call(this);
                kaayou.getController(this.getModuleName()).on('ws::onConnect', function (e) {
                    console.log(this.getModuleName() + "qs 链接成功");
                    self.onConnect();
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::sitein', function (e) {
                    // self.onSiteIn(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onSiteIn, target: self });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::siteinfo', function (e) {
                    // self.onSiteInfo(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onSiteInfo, target: self });
                }, this);
                kaayou.getController(this.getModuleName()).on('mod::User::doSiteTableIn', function (e) {
                    // self.onDoSiteTableIn(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onDoSiteTableIn, target: self });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::gameinfo', function (e) {
                    // self.onGameInfo(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGameInfo, target: self });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::tableinfo', function (e) {
                    // self.onTableInfo(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onTableInfo, target: self });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::statusFree', function (e) {
                    // self.onGameFree(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGameFree, target: self });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::userStatus', function (e) {
                    // self.onUpdateuserStatus(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onUpdateuserStatus, target: self });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::userscore', function (e) {
                    // self.onUpdateUserScore(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onUpdateUserScore, target: self });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::tableexit', function (e) {
                    // self.onTableExit(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onTableExit, target: self });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::changetablein', function (e) {
                    // self.onChangeTableIn(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onChangeTableIn, target: self });
                }, this);
                kaayou.getController(this.getModuleName()).on('Exit', function (e) {
                    // self.doExit(e.data);
                    self._eventQueue.push({ data: e.data, func: self.doExit, target: self });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::gamemessage', function (e) {
                    // self.onGameMessage(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGameMessage, target: self });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::userareabroadcast', function (e) {
                    // self.onGameMessage(e.data);
                    // self._eventQueue.push({data:e.data,func:self.onPlaySendNotice,target:self});
                    mod.Notice.getInstance().onPlaySendNotice(e.data);
                }, this);
                kaayou.getController('common').on('ui::gameToLobby', function (e) {
                    _this.sendLeftGame();
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::faketablein', function (e) {
                    self._eventQueue.push({ data: e.data, func: self.onfaketablein, target: self });
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::usergoldupdate', function (e) {
                    self._eventQueue.push({ data: e.data, func: self.onUpdateMyGold, target: self });
                }, this);
            };
            /**
             *
             * @param bankrupt  玩家是否因为破产而进入假房间， 目前false代表 准备超时 进入假房间 true代表金币不足进入假房间, 此时需调用破产礼包接口
             */
            goldBaseMod.prototype.onfaketablein = function (data) {
                if (this._wait) {
                    return false;
                }
                this.__isfake = true;
                //如果是因为破产
                if (data.bankrupt) {
                    //小结算延迟了2S  比小结算晚出来0.5S
                    setTimeout(function () {
                        kaayou.emit("common", "mod::GDGame::getallowanceinfo", {
                            ignore_gift: false, callBack: function (info) {
                                if (info && info.data && info.data.allowance) { //  有这个时候弹破产补助
                                    kaayou.emit("lobby", "ui::DisposeAllowances::Show", info.data.allowance);
                                }
                                else {
                                    //弹破产礼包
                                    // kaayou.emit("common", "ui::BankruptPanel::Show", info.data.gift);
                                    kaayou.emit("lobby", "mod::Mall::getBankRupt");
                                }
                            }
                        });
                    }, 2500);
                }
                //通知ui层
                kaayou.emit(this.getModuleName(), 'ui::Scene::canContinue', { bankrupt: data.bankrupt });
                return true;
            };
            /**
             *
             * @param data 假房间时候更新金币
             */
            goldBaseMod.prototype.onUpdateMyGold = function (data) {
                if (this._wait) {
                    return false;
                }
                if (data.uid != this.userId) {
                    console.error("不是自己userId");
                    return;
                }
                if (data.type == 27) {
                    kaayou.emit("common", "ui::GetRewardSusPanel::Show", { name: data.offset + "个金币" });
                }
                this._players[data.uid].gold = data.gold;
                kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: this.toArrayPlayer() });
                if (!this.__isfake) {
                    return true;
                }
                if (!data.bankrupt) {
                    kaayou.emit(this.getModuleName(), 'ui::Scene::canContinue', { bankrupt: data.bankrupt });
                }
                return true;
            };
            goldBaseMod.prototype.setIsFake = function (flag) {
                this.__isfake = flag;
            };
            goldBaseMod.prototype.getIsFake = function () {
                return this.__isfake;
            };
            goldBaseMod.prototype.doPlayBGM = function () {
                console.log('doPlayBGM');
            };
            goldBaseMod.prototype.onConnect = function () {
                var gameconfig = null;
                try {
                    gameconfig = JSON.parse(kaayou.DataSet.get("game::config") || ""); //  , JSON.stringify(tempRes));
                }
                catch (err) {
                }
                if (!gameconfig) {
                    kaayou.emit(this.getModuleName(), "ui::RunSceneError");
                    return;
                }
                if (this._eventQueue) {
                    this._eventQueue.start();
                }
                kaayou.sendMessage(this.getModuleName(), 'sitein', { sitetype: gameconfig.site_type, kindid: gameconfig.kindid, uid: this.userId, token: this.token, minfo: '{}' });
            };
            goldBaseMod.prototype.onSiteIn = function (info) {
                if (this._wait) {
                    return false;
                }
                console.log("收到sitein:", info);
                var self = this;
                if (this.gameState != mod.GAME_STATE.GAME_OVER) {
                    if (info.errcode != 0) {
                        var options = {
                            msg: info.msg,
                            btns: [
                                {
                                    name: "确定",
                                    action: function () {
                                        self.CleanAndGotoLobby();
                                    },
                                    colorType: 'green'
                                },
                            ]
                        };
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                    }
                }
                return true;
            };
            //场次信息消息
            goldBaseMod.prototype.onSiteInfo = function (data) {
                if (this._wait) {
                    return false;
                }
                cc.log('桌子信息', data);
                this.maxRound = data.gameconfig.roundnum;
                this._maxPlayer = data.gameconfig.playernum;
                this.siteInfo = data;
                this._isSceneIn = true;
                //断线重连时，会显示加载中，重连成功后隐藏加载中
                kaayou.emit("common", "ui::Loading::Hide");
                kaayou.emit(this.getModuleName(), "ui::RunScene");
                //清除界面
                kaayou.emit(this.getModuleName(), 'ui::cleanUp');
                //先关闭大厅的背景音乐
                kaayou.SoundManager.getInstance().stopMusic(true);
                //判断是否为坐桌模式
                if (this.siteInfo.sit_mode == 1) {
                    if (this.siteInfo.person) {
                        if (this.siteInfo.person.ntid == -1) {
                            kaayou.emit(this.getModuleName(), "ui::TabelList::Show", { title: this.getGameName() });
                            return true;
                        }
                    }
                }
                //坐下
                this.onSiteTableIn();
                return true;
            };
            goldBaseMod.prototype.onDoSiteTableIn = function (data) {
                if (this._wait) {
                    return false;
                }
                var tid = -1;
                if (data) {
                    if (data.tid > -1) {
                        tid = data.tid;
                    }
                }
                var seat = -1;
                if (data) {
                    if (data.seat > -1) {
                        seat = data.seat;
                    }
                }
                this._players = {};
                this.onSiteTableIn(tid, seat);
                return true;
            };
            goldBaseMod.prototype.onSiteTableIn = function (tid, seat) {
                if (tid === void 0) { tid = -1; }
                if (seat === void 0) { seat = -1; }
                return __awaiter(this, void 0, void 0, function () {
                    var info, self, options;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("发送sitetablein: tid=" + tid + ",seat=" + seat);
                                return [4 /*yield*/, kaayou.sendMessage(this.getModuleName(), 'sitetablein', { id: tid, uid: this.userId, seat: seat }, "ws::Msg::sitetablein")];
                            case 1:
                                info = _a.sent();
                                console.log("收到sitetablein:", info);
                                self = this;
                                if (info.errcode) {
                                    options = {
                                        msg: info.msg,
                                        btns: [
                                            {
                                                name: "确定",
                                                action: function () {
                                                    if (self.siteInfo && self.siteInfo.sit_mode == 1) {
                                                        //-1:椅子上有人，118:房间已满
                                                        if (info.errcode != -1 && info.errcode != 118) {
                                                            self.CleanAndGotoLobby();
                                                        }
                                                    }
                                                    else {
                                                        self.CleanAndGotoLobby();
                                                    }
                                                },
                                                colorType: 'green'
                                            },
                                        ]
                                    };
                                    kaayou.emit('common', 'ui::Dialog::Show', options);
                                    return [2 /*return*/];
                                }
                                //坐下成功
                                this.doPlayBGM();
                                //
                                kaayou.emit(this.getModuleName(), 'ui::cleanUp');
                                return [2 /*return*/];
                        }
                    });
                });
            };
            goldBaseMod.prototype.onGameInfo = function (data) {
                cc.log('收到游戏信息', data);
                if (this._wait) {
                    return false;
                }
                this.setGameState(data.gamestatus);
                var curPlayerNum = 0;
                for (var i = 0; i < this._maxPlayer; i++) {
                    var player = this.getPlayerByChairID(i);
                    if (player) {
                        // player.isReady = data.userready[i];
                        player.userStatus = data.userstatus[i];
                        //游戏开始前断线重连过的玩家，服务器下发的isReady不正确，需要通过userStatus判断玩家是否准备
                        if (player.userStatus == common.mod.GR_US_Status.US_READY) {
                            player.isReady = true;
                        }
                    }
                }
                kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: this.toArrayPlayer() });
                return true;
            };
            //桌子信息消息
            goldBaseMod.prototype.onTableInfo = function (data) {
                cc.log('桌子信息', data);
                if (this._wait) {
                    return false;
                }
                this.__isfake = false;
                this.maxRound = data.gameconfig.roundnum;
                this._maxPlayer = data.gameconfig.playernum;
                this.tableInfo = data;
                //this.curRound = data.step;
                //与服务器数据保持一致
                for (var x in this._players) {
                    var find = false;
                    for (var i = 0; i < data.person.length; i++) {
                        if (this._players[x].uid == data.person[i].uid) {
                            find = true;
                            break;
                        }
                    }
                    if (!find) {
                        delete this._players[x];
                    }
                }
                console.log(this._players);
                for (var i = 0; i < data.person.length; i++) {
                    if (!data.person[i])
                        continue;
                    if (!this._players[data.person[i].uid]) {
                        this.onPlayerCome(data.person[i]);
                    }
                    else {
                        this._players[data.person[i].uid] = lodash.extend({}, this._players[data.person[i].uid], data.person[i]);
                    }
                }
                kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: this.toArrayPlayer() });
                kaayou.emit(this.getModuleName(), 'showTableInfo', { roomid: data.tableid, gameconfig: data.gameconfig });
                kaayou.emit(this.getModuleName(), 'ui::TabelList::Hide');
                return true;
            };
            goldBaseMod.prototype.onUpdateuserStatus = function (status) {
                if (this._wait) {
                    return false;
                }
                cc.log('RES_玩家状态消息', status);
                var uid = status.userid;
                // this.tableId = status.tableid;
                if (!this._players[uid]) {
                    return true;
                }
                this._players[uid].userStatus = status.userstatus;
                if (status.userstatus == mod.GR_US_Status.US_READY) {
                    this._players[uid].isReady = true;
                }
                else if (status.userstatus == common.mod.GR_US_Status.US_SIT) {
                    this._players[uid].isReady = false;
                }
                if (uid == this.userId) {
                    if (status.userstatus <= 1) {
                        delete this._players[uid];
                        kaayou.emit(this.getModuleName(), "Exit", { exitType: 1 });
                        kaayou.emit(this.getModuleName(), 'ui::cleanUp');
                        return true;
                    }
                    else {
                        if (status.userstatus == mod.GR_US_Status.US_SIT) {
                            kaayou.emit(this.getModuleName(), 'ienterRoom');
                        }
                        else if (status.userstatus == mod.GR_US_Status.US_READY) {
                            //自己准备好了，清除游戏数据
                            this.resetData();
                            this.gameState = common.mod.GAME_STATE.NONE;
                            kaayou.emit(this.getModuleName(), 'onIready');
                        }
                    }
                }
                else {
                    if (status.userstatus <= 1) {
                        delete this._players[uid];
                    }
                    else {
                    }
                }
                var players = this.toArrayPlayer();
                cc.log('players:', players);
                kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: players });
                return true;
            };
            goldBaseMod.prototype.onUpdateUserScore = function (data) {
                console.log("收到玩家积分变化:", data);
                if (this._wait) {
                    return false;
                }
                for (var i = 0; i < this._maxPlayer; i++) {
                    var player = this.getPlayerByChairID(i);
                    if (player) {
                        player.gold = data.score[i];
                    }
                }
                kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: this.toArrayPlayer() });
                return true;
            };
            goldBaseMod.prototype.onChangeTableIn = function (info) {
                console.log("收到换桌:", info);
                if (this._wait) {
                    return false;
                }
                if (info.errcode) {
                    var self = this;
                    var options = {
                        msg: info.msg,
                        btns: [
                            {
                                name: "确定" || "换桌失败！",
                                action: function () {
                                    //errcode 118:房间已满 157:人数已满
                                    if (info.errcode == 157 || info.errcode == 118) {
                                        self.CleanAndGotoLobby();
                                    }
                                },
                                colorType: 'green'
                            },
                        ]
                    };
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                    return true;
                }
                //清除玩家数据
                this._players = {};
                kaayou.emit(this.getModuleName(), 'ui::cleanUp');
                return true;
            };
            //游戏没开始,退出
            goldBaseMod.prototype.onTableExit = function (data) {
                console.log('RES_玩家退出', data);
                if (this._wait) {
                    return false;
                }
                if (!this._players[data.uid]) {
                    return true;
                }
                ;
                if (!this.__isfake) {
                    delete this._players[data.uid];
                    console.log(this._players);
                    if (data.uid == this.userId) {
                        kaayou.emit(this.getModuleName(), "Exit", { exitType: 1 });
                        kaayou.emit(this.getModuleName(), 'ui::cleanUp');
                    }
                    else {
                        var players = this.toArrayPlayer();
                        kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: players });
                    }
                }
                else {
                    //只显示自己头像
                    for (var x in this._players) {
                        if (Number(x) == this.userId) {
                            continue;
                        }
                        delete this._players[x];
                    }
                    kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: this.toArrayPlayer() });
                }
                return true;
            };
            //如果游戏是空闲状态,就会收到这个消息
            goldBaseMod.prototype.onGameFree = function (freedata) {
                if (this._wait) {
                    return false;
                }
                console.log('空闲状态', freedata);
                this.gameState = common.mod.GAME_STATE.NONE;
                return true;
            };
            //退出游戏
            //exitType: 0退出到大厅; 1退出到坐桌列表(非坐桌模式时始终退出到大厅)
            goldBaseMod.prototype.doExit = function (data) {
                if (this._wait) {
                    return false;
                }
                if (!this.__isfake) {
                    data = data || {};
                    data.exitType = data.exitType || 0;
                    if (data.exitType == 1 && this.siteInfo.sit_mode == 1) {
                        kaayou.emit(this.getModuleName(), "ui::TabelList::Show", { title: this.getGameName() });
                    }
                    else {
                        this.CleanAndGotoLobby();
                    }
                }
                else {
                    this.sendLeftGame();
                }
                return true;
            };
            //通知消息
            goldBaseMod.prototype.onGameMessage = function (data) {
                console.log("收到通知消息:", data);
                if (this._wait) {
                    return false;
                }
                if (data.content && data.content.length > 0) {
                    var options = {
                        msg: data.content,
                        btns: [
                            {
                                name: "确定",
                                colorType: 'green'
                            },
                        ]
                    };
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                }
                //type:消息类型，0x1000:退出游戏
                if (data.type & 0x1000) {
                    kaayou.emit(this.getModuleName(), "Exit", { exitType: 0 });
                    kaayou.emit(this.getModuleName(), 'ui::cleanUp');
                }
                return true;
            };
            goldBaseMod.prototype.CleanAndGotoLobby = function () {
                if (this._isSceneIn) {
                    kaayou.SoundManager.getInstance().stopMusic(true);
                }
                _super.prototype.CleanAndGotoLobby.call(this);
            };
            //离开游戏
            goldBaseMod.prototype.gameOutConfirm = function () {
                console.log('点击退出');
                var self = this;
                if (this.gameState == mod.GAME_STATE.ROAR || this.gameState == mod.GAME_STATE.GAMEING) {
                    //游戏开始后，发送强退消息
                    var options = {
                        title: "温馨提示",
                        msg: "\u60A8\u771F\u7684\u8981\u6B8B\u5FCD\u7684\u79BB\u5F00\u6E38\u620F\u5417\uFF1F\u79BB\u5F00\u5C06\u6263\u9664" + self.tableInfo.gameconfig.fa + "\u500D\u5E95\u5206\uFF0C\u662F\u5426\u771F\u7684\u9000\u51FA\uFF1F",
                        close: {
                            isShow: false,
                        },
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    if (self.gameState == mod.GAME_STATE.ROAR || self.gameState == mod.GAME_STATE.GAMEING) {
                                        self.sendDissmiss();
                                    }
                                    else {
                                        self.sendLeftGame();
                                    }
                                },
                                colorType: 'green'
                            },
                            {
                                name: "取消",
                                colorType: 'blue'
                            }
                        ]
                    };
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                }
                else {
                    console.log('发送退出');
                    self.sendLeftGame();
                }
            };
            //离开游戏
            goldBaseMod.prototype.sendLeftGame = function () {
                console.log('发送退出');
                if (!this.__isfake) {
                    if (this._players && this._players[this.userId]) {
                        kaayou.sendMessage(this.getModuleName(), 'tableexit', {});
                    }
                    else {
                        console.log('玩家不在桌子上，直接退出');
                        this.CleanAndGotoLobby();
                    }
                }
                else {
                    kaayou.sendMessage(this.getModuleName(), 'siteexit', {});
                    this.CleanAndGotoLobby();
                    kaayou.NetManager.getInstance().getSocket(this.getModuleName()).close({ Initiative: true });
                }
            };
            //解散游戏，在金币场里是强退
            goldBaseMod.prototype.sendDissmiss = function () {
                console.log('发送强退');
                if (this._players && this._players[this.userId]) {
                    kaayou.sendMessage(this.getModuleName(), 'forceexit', {});
                }
                else {
                    console.log('玩家不在桌子上，直接退出');
                    this.CleanAndGotoLobby();
                }
            };
            //发送换桌
            goldBaseMod.prototype.sendChangeTable = function () {
                cc.log('发送换桌');
                var auto_ready = false;
                if (this.__isfake) {
                    auto_ready = true;
                }
                kaayou.sendMessage(this.getModuleName(), 'changetablein', { id: -1, uid: this.userId, auto_ready: auto_ready });
            };
            //发送托管
            goldBaseMod.prototype.sendTrustee = function (isTrustee) {
                if (this.gameState != common.mod.GAME_STATE.NONE) {
                    cc.log('发送托管/取消托管');
                    kaayou.sendMessage(this.getModuleName(), 'gameTrustee', { id: this.userId, trustee: isTrustee });
                }
            };
            //发送魔法表情信息
            goldBaseMod.prototype.sendUseMagic = function (data) {
                cc.log("发送魔法表情", data);
                var type = 4;
                if (cc.sys.localStorage.getItem('CheckBox_shilianfa') === 'true') {
                    type = 5;
                }
                if (!this.getPlayerByClientID(data.toIndex)) {
                    return;
                }
                var toUserId = this.getPlayerByClientID(data.toIndex).uid;
                this.sendChat({ type: type, index: data.toolId, targetuserid: toUserId });
            };
            //发送聊天信息
            /**
             *
             * @param data type:聊天类型(4、5为魔法表情)  index:具体是哪一句话或者哪个表情  targetuserid:如果有魔法表情
             */
            goldBaseMod.prototype.sendChat = function (data) {
                cc.log('发送聊天', data);
                var msg = {
                    color: data.type,
                    index: data.index,
                    userid: this.userId,
                    targetuserid: data.targetuserid,
                    message: data.message,
                };
                //假房间模拟服务端
                if (this.__isfake) {
                    // kaayou.sendMessage(this.getModuleName(), 'ws::Msg::userchat', msg);
                    kaayou.emit(this.getModuleName(), "ws::Msg::userchat", msg);
                }
                else {
                    kaayou.sendMessage(this.getModuleName(), 'userchat', msg);
                }
            };
            //获取分享配置（剩余分享次数）
            goldBaseMod.prototype.sendGetShareConfig = function (cb) {
                return __awaiter(this, void 0, void 0, function () {
                    var temp, res, msg;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this.userId || !this.tableInfo) {
                                    return [2 /*return*/];
                                }
                                temp = {
                                    "head": "gameshareconfig",
                                    "data": JSON.stringify({ uid: this.userId, kindid: this.tableInfo.kindid }),
                                    "msgsign": {
                                        "time": new Date().getTime(),
                                        "encode": 0
                                    }
                                };
                                if (!common.mod.Config) {
                                    return [2 /*return*/];
                                }
                                if (common.mod.Config.isLoginEncryp) {
                                    temp.msgsign.encode = 1;
                                    temp.data = kaayou.AES.encrypt(temp.data);
                                }
                                return [4 /*yield*/, kaayou.Http.POST(common.mod.Config.GetAppConfig().hallUrl + "/service", { msgdata: JSON.stringify(temp) })];
                            case 1:
                                res = _a.sent();
                                console.log("获取分享配置结果：", res);
                                try {
                                    msg = kaayou.Http.parseResult(res);
                                    if (!!msg) {
                                        cb && cb(msg);
                                    }
                                }
                                catch (err) {
                                    console.error("解析分享配置结果异常：", err);
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            };
            //领取分享奖励
            goldBaseMod.prototype.sendGetShareReward = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var temp, res, msg;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this.userId || !this.tableInfo) {
                                    return [2 /*return*/];
                                }
                                temp = {
                                    "head": "gamesharesuc",
                                    "data": JSON.stringify({ uid: this.userId, kindid: this.tableInfo.kindid }),
                                    "msgsign": {
                                        "time": new Date().getTime(),
                                        "encode": 0
                                    }
                                };
                                if (!common.mod.Config) {
                                    return [2 /*return*/];
                                }
                                if (common.mod.Config.isLoginEncryp) {
                                    temp.msgsign.encode = 1;
                                    temp.data = kaayou.AES.encrypt(temp.data);
                                }
                                return [4 /*yield*/, kaayou.Http.POST(common.mod.Config.GetAppConfig().hallUrl + "/service", { msgdata: JSON.stringify(temp) })];
                            case 1:
                                res = _a.sent();
                                console.log("领取分享奖励结果：", res);
                                try {
                                    msg = kaayou.Http.parseResult(res);
                                    if (!!msg) {
                                        this.onGetShareReward(msg);
                                    }
                                }
                                catch (err) {
                                    console.error("解析分享奖励结果异常：", err);
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            };
            goldBaseMod.prototype.onGetShareReward = function (msg) {
                if (msg.errcode) {
                    console.log("领取分享奖励失败：", msg);
                    return;
                }
                if (msg.data.rewardcount > 0) {
                    kaayou.emit("common", "ui::GetRewardSusPanel::Show", { name: msg.data.rewardcount + "个金币" });
                }
            };
            //获取游戏名字
            goldBaseMod.prototype.getGameName = function () {
                var GameType = ['新手房', '初级房', '高级房', '龙虎房'];
                if (this.siteInfo.sitetype <= 0 || this.siteInfo.sitetype > GameType.length) {
                    return this.gameName;
                }
                else {
                    return this.gameName + GameType[this.siteInfo.sitetype - 1];
                }
            };
            return goldBaseMod;
        }(mod.gameBaseMod));
        mod.goldBaseMod = goldBaseMod;
    })(mod = common.mod || (common.mod = {}));
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var mod;
    (function (mod) {
        var GPS = /** @class */ (function () {
            function GPS() {
            }
            GPS.getInstance = function () {
                if (GPS.__INS__ == null) {
                    GPS.__INS__ = new GPS();
                    GPS.__INS__.initMod();
                }
                return GPS.__INS__;
            };
            GPS.prototype.initMod = function () { };
            //@BindEvent("common", 'ws::Msg::userareabroadcast')
            GPS.prototype.getGPSInfo = function () {
                kaayou.DataSet.set("user::Map", "");
                kaayou.PlatformMgr.getInstance().map.GetMapInfo();
                return new Promise(function (resolve, reject) {
                    var times = 0;
                    var tid = setInterval(function () {
                        times++;
                        if (times > 5) {
                            clearInterval(tid);
                            reject("timeout");
                        }
                        else {
                            var sMap = kaayou.DataSet.get("user::Map");
                            if (!!sMap) {
                                clearInterval(tid);
                                resolve(sMap);
                            }
                        }
                    }, 1000);
                });
            };
            GPS.__INS__ = null;
            __decorate([
                doBindEvent
            ], GPS.prototype, "initMod", null);
            return GPS;
        }());
        mod.GPS = GPS;
    })(mod = common.mod || (common.mod = {}));
    common.mod.GPS.getInstance();
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var mod;
    (function (mod) {
        var ChineseMap = /** @class */ (function () {
            function ChineseMap() {
                this.AreaList = [
                    {
                        city: "AnYang",
                        district: [{ name: "安阳市", code: "410500" }],
                        province: "HeNan"
                    },
                    {
                        city: "ChuZhou",
                        district: [{ name: "滁州市", code: "341100" }, { name: "来安县", code: "341122" }, { name: "全椒县", code: "341124" }],
                        province: "AnHui"
                    },
                    {
                        city: "EnShi",
                        district: [{ name: "恩施市", code: "422801" }, { name: "利川市", code: "422802" }, { name: "鹤峰县", code: "422828" }
                            //{ name: "恩施州", code: "422800" }, 
                            // { name: "建始县", code: "422822" }, { name: "巴东县", code: "422823" },
                            // { name: "宣恩县", code: "422825" }, { name: "咸丰县", code: "422826" }, { name: "来凤县", code: "422827" }
                        ],
                        province: "HuBei"
                    },
                    {
                        city: "EZhou",
                        district: [{ name: "鄂州市", code: "420700" }],
                        province: "HuBei"
                    },
                    {
                        city: "FuYang",
                        district: [{ name: "阜阳市", code: "341200" }],
                        province: "AnHui"
                    },
                    {
                        city: "HeBi",
                        district: [{ name: "鹤壁市", code: "410600" }],
                        province: "HeNan"
                    },
                    {
                        city: "HuangGang",
                        district: [{ name: "黄冈市", code: "421100" }, { name: "黄州区", code: "421102" }, { name: "团风县", code: "421121" }, { name: "红安县", code: "421122" }, { name: "罗田县", code: "421123" },
                            { name: "英山县", code: "421124" }, { name: "浠水县", code: "421125" }, { name: "蕲春县", code: "421126" }, { name: "黄梅县", code: "421127" },
                            { name: "龙感湖", code: "421171" }, { name: "麻城市", code: "421181" }, { name: "武穴市", code: "421182" }],
                        province: "HuBei"
                    },
                    {
                        city: "HuangShi",
                        district: [{ name: "黄石市", code: "420200" }, { name: "阳新县", code: "420222" }, { name: "大冶市", code: "420281" }],
                        province: "HuBei"
                    },
                    {
                        city: "JiYuan",
                        district: [{ name: "济源市", code: "419001" }],
                        province: "HeNan"
                    },
                    {
                        city: "JiaoZuo",
                        district: [{ name: "焦作市", code: "410800" }],
                        province: "HeNan"
                    },
                    {
                        city: "JingMen",
                        district: [{ name: "荆门市", code: "420800" }, { name: "沙洋县", code: "420822" }, { name: "钟祥市", code: "420881" }, { name: "京山市", code: "420821" }],
                        province: "HuBei"
                    },
                    {
                        city: "JingZhou",
                        district: [{ name: "荆州市", code: "421000" }, { name: "公安县", code: "421022" }, { name: "监利县", code: "421023" }, { name: "江陵县", code: "421024" },
                            { name: "石首市", code: "421081" }, { name: "洪湖市", code: "421083" }, { name: "松滋市", code: "421087" }],
                        province: "HuBei"
                    },
                    {
                        city: "KaiFeng",
                        district: [{ name: "开封市", code: "410200" }],
                        province: "HeNan"
                    },
                    {
                        city: "LuoHe",
                        district: [{ name: "漯河市", code: "411100" }],
                        province: "HeNan"
                    },
                    {
                        city: "LuoYang",
                        district: [{ name: "洛阳市", code: "410300" }],
                        province: "HeNan"
                    },
                    {
                        city: "NanYang",
                        district: [{ name: "南阳市", code: "411300" }],
                        province: "HeNan"
                    },
                    {
                        city: "PingDingShan",
                        district: [{ name: "平顶山市", code: "410400" }],
                        province: "HeNan"
                    },
                    {
                        city: "PuYang",
                        district: [{ name: "濮阳市", code: "410900" }],
                        province: "HeNan"
                    },
                    {
                        city: "QianJiang",
                        district: [{ name: "潜江市", code: "429005" }],
                        province: "HuBei"
                    },
                    {
                        city: "SanMenXia",
                        district: [{ name: "三门峡市", code: "411200" }],
                        province: "HeNan"
                    },
                    {
                        city: "ShangQiu",
                        district: [{ name: "商丘市", code: "411400" }],
                        province: "HeNan"
                    },
                    {
                        city: "ShiYan",
                        district: [{ name: "十堰市", code: "420300" }, { name: "郧西县", code: "420322" }, { name: "竹山县", code: "420323" }, { name: "房县", code: "420325" },
                            { name: "丹江口市", code: "420381" }],
                        province: "HuBei"
                    },
                    {
                        city: "SuiZhou",
                        district: [{ name: "随州市", code: "421300" }, { name: "随县", code: "421321" }, { name: "广水市", code: "421381" }],
                        province: "HuBei"
                    },
                    {
                        city: "TianMen",
                        district: [{ name: "天门市", code: "429006" }],
                        province: "HuBei"
                    },
                    {
                        city: "WuHan",
                        district: [{ name: "武汉市", code: "420100" }],
                        province: "HuBei"
                    },
                    {
                        city: "XiangYang",
                        district: [{ name: "襄阳市", code: "420600" }, { name: "南漳县", code: "420624" }, { name: "谷城县", code: "420625" }, { name: "保康县", code: "420626" },
                            { name: "老河口市", code: "420682" }, { name: "枣阳市", code: "420683" }, { name: "宜城市", code: "420684" }],
                        province: "HuBei"
                    },
                    {
                        city: "XianNing",
                        district: [{ name: "咸宁市", code: "421200" }, { name: "咸安区", code: "421202" }, { name: "嘉鱼县", code: "421221" }, { name: "通城县", code: "421222" }, { name: "崇阳县", code: "421223" },
                            { name: "通山县", code: "421224" }, { name: "赤壁市", code: "421281" }],
                        province: "HuBei"
                    },
                    {
                        city: "XianTao",
                        district: [{ name: "仙桃市", code: "429004" }],
                        province: "HuBei"
                    },
                    {
                        city: "XiaoGan",
                        district: [{ name: "孝感市", code: "420900" }, { name: "孝昌县", code: "420921" }, { name: "大悟县", code: "420922" }, { name: "云梦县", code: "420923" },
                            { name: "应城市", code: "420981" }, { name: "安陆市", code: "420982" }, { name: "汉川市", code: "420984" }],
                        province: "HuBei"
                    },
                    {
                        city: "XinXiang",
                        district: [{ name: "新乡市", code: "410700" }],
                        province: "HeNan"
                    },
                    {
                        city: "XinYang",
                        district: [{ name: "信阳市", code: "411500" }],
                        province: "HeNan"
                    },
                    {
                        city: "XuChang",
                        district: [{ name: "许昌市", code: "411000" }],
                        province: "HeNan"
                    },
                    {
                        city: "YiChang",
                        district: [{ name: "宜昌市", code: "420500" }, { name: "远安县", code: "420525" }, { name: "兴山县", code: "420526" }, { name: "秭归县", code: "420527" },
                            { name: "长阳县", code: "420528" }, { name: "五峰县", code: "420529" }, { name: "宜都市", code: "420581" }, { name: "当阳市", code: "420582" },
                            { name: "枝江市", code: "420583" }],
                        province: "HuBei"
                    },
                    {
                        city: "ZhangJiaKou",
                        district: [{ name: "张家口市", code: "130700" }],
                        province: "HeBei"
                    },
                    {
                        city: "ZhengZhou",
                        district: [{ name: "郑州市", code: "410100" }],
                        province: "HeNan"
                    },
                    {
                        city: "ZhouKou",
                        district: [{ name: "周口市", code: "411600" }],
                        province: "HeNan"
                    },
                    {
                        city: "ZhuMaDian",
                        district: [{ name: "驻马店市", code: "411700" }],
                        province: "HeNan"
                    }
                ];
            }
            ChineseMap.getInstance = function () {
                if (ChineseMap.__INS__ == null) {
                    ChineseMap.__INS__ = new ChineseMap();
                }
                return ChineseMap.__INS__;
            };
            ChineseMap.prototype.getAdcode = function (cityId) {
                for (var i = 0; i < this.AreaList.length; ++i) {
                    if (this.AreaList[i].city == cityId) {
                        return this.AreaList[i].district[0].code;
                    }
                }
                return "000000";
            };
            ChineseMap.prototype.getAdcodeByName = function (cityName) {
                for (var i = 0; i < this.AreaList.length; ++i) {
                    for (var j = 0; j < this.AreaList[i].district.length; ++j) {
                        if (this.AreaList[i].district[j].name == cityName) {
                            return this.AreaList[i].district[j].code;
                        }
                    }
                }
                return "000000";
            };
            ChineseMap.prototype.getCityAdcode = function (code) {
                var self = this;
                if (code.substr(2, 2) != "90") {
                    return code.substr(0, 4) + "00";
                }
                else
                    return code;
            };
            ChineseMap.prototype.getCityId = function (adcode) {
                for (var i = 0; i < this.AreaList.length; ++i) {
                    for (var j = 0; j < this.AreaList[i].district.length; ++j) {
                        if (this.AreaList[i].district[j].code == adcode) {
                            return this.AreaList[i].city;
                        }
                    }
                }
                return "";
            };
            ChineseMap.prototype.getDistrictByCityKey = function (city) {
                for (var i = 0; i < this.AreaList.length; ++i) {
                    if (this.AreaList[i].city == city) {
                        return this.AreaList[i].district;
                    }
                }
                return [];
            };
            ChineseMap.prototype.getDistrictByAreacode = function (areacode) {
                for (var i = 0; i < this.AreaList.length; ++i) {
                    if (this.AreaList[i].district[0].code == areacode) {
                        return this.AreaList[i].district;
                    }
                }
                return [];
            };
            ChineseMap.prototype.getName = function (code) {
                for (var i = 0; i < this.AreaList.length; ++i) {
                    for (var j = 0; j < this.AreaList[i].district.length; ++j) {
                        if (this.AreaList[i].district[j].code == code) {
                            return this.AreaList[i].district[j].name;
                        }
                    }
                }
                return "未知";
            };
            ChineseMap.prototype.getProvince = function (cityId) {
                for (var i = 0; i < this.AreaList.length; ++i) {
                    if (cityId == this.AreaList[i].city) {
                        return this.AreaList[i].province;
                    }
                }
                return "";
            };
            //单例模式
            ChineseMap.__INS__ = null;
            return ChineseMap;
        }());
        mod.ChineseMap = ChineseMap;
    })(mod = common.mod || (common.mod = {}));
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var mod;
    (function (mod) {
        var Notice = /** @class */ (function () {
            function Notice() {
                //玩家发送的跑马灯
                this._playsendnotice = null;
            }
            Notice.getInstance = function () {
                if (Notice.__INS__ == null) {
                    Notice.__INS__ = new Notice();
                    Notice.__INS__.initMod();
                }
                return Notice.__INS__;
            };
            Notice.prototype.initMod = function () { };
            //@BindEvent("common", 'ws::Msg::userareabroadcast')
            Notice.prototype.onPlaySendNotice = function (data) {
                console.log("userareabroadcast", data);
                this._playsendnotice = data;
                if (lodash.isEmpty(this._playsendnotice) || data.errcode) {
                    //kaayou.emit('common', 'ui::PmdSendLabaPanel::Show2', { PmdArray: [] });
                    return;
                }
                var pmdStr = [];
                pmdStr.push(this._playsendnotice.nickname);
                pmdStr.push(this._playsendnotice.content);
                kaayou.emit('common', 'ui::GamePmdBlock::Show', { PmdArray: pmdStr, type: 1 });
            };
            Notice.__INS__ = null;
            __decorate([
                doBindEvent
            ], Notice.prototype, "initMod", null);
            return Notice;
        }());
        mod.Notice = Notice;
    })(mod = common.mod || (common.mod = {}));
    common.mod.Notice.getInstance();
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var mod;
    (function (mod) {
        var ReCodeMod = /** @class */ (function () {
            function ReCodeMod() {
            }
            ReCodeMod.getInstance = function () {
                if (ReCodeMod.__INS__ == null) {
                    ReCodeMod.__INS__ = new ReCodeMod();
                    ReCodeMod.__INS__.initMod();
                }
                return ReCodeMod.__INS__;
            };
            ReCodeMod.prototype.initMod = function () { };
            //回放码验证，成功后跳转
            ReCodeMod.prototype.getRunData = function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var res, tempRes, data_recode, data_recodedetails, data_recode;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (data.replayid.length < 1) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, kaayou.sendMessage("lobby", "checkreplayid", data, "ws::Msg::checkreplayid")];
                            case 1:
                                res = _a.sent();
                                if (res.errcode) {
                                    kaayou.emit("common", 'ui::Dialog::Show', {
                                        msg: res.msg || "回放码错误！！"
                                    });
                                    return [2 /*return*/];
                                }
                                tempRes = {
                                    id: "",
                                    gameid: "",
                                    kindid: res.kindid,
                                    ip: "",
                                    replayid: Number(data.replayid),
                                    pakeageKey: res.pkgkey,
                                };
                                kaayou.DataSet.set("game::config", JSON.stringify(tempRes));
                                ///跳转回放场景  写下面
                                //从回放或者查看他人回放返回战绩界面的判断
                                if (kaayou.DataSet.get('Record::isBack') && kaayou.DataSet.get('ReCordDetails::isBack')) {
                                    data_recode = kaayou.DataSet.get('Record::isBack');
                                    data_recodedetails = kaayou.DataSet.get('ReCordDetails::isBack');
                                    kaayou.DataSet.set('ReCord::DataIsBack', data_recode);
                                    kaayou.DataSet.set('ReCordDetails::DataIsBack', data_recodedetails);
                                }
                                else if (kaayou.DataSet.get('Record::isBack') && !kaayou.DataSet.get('ReCordDetails::isBack')) {
                                    data_recode = kaayou.DataSet.get('Record::isBack');
                                    kaayou.DataSet.set('ReCord::DataIsBack', data_recode);
                                }
                                // kaayou.emit('lobby' , "mod::Room::inReCordSence", { kindid: tempRes.kindid })
                                // kaayou.LobbyToGame('xtmj');
                                kaayou.LobbyToRecord(tempRes.pakeageKey);
                                return [2 /*return*/];
                        }
                    });
                });
            };
            ReCodeMod.__INS__ = null;
            __decorate([
                doBindEvent
            ], ReCodeMod.prototype, "initMod", null);
            __decorate([
                BindEvent("common", "mod::Record::RunData")
            ], ReCodeMod.prototype, "getRunData", null);
            return ReCodeMod;
        }());
        mod.ReCodeMod = ReCodeMod;
    })(mod = common.mod || (common.mod = {}));
    common.mod.ReCodeMod.getInstance();
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var mod;
    (function (mod) {
        var TabelList = /** @class */ (function (_super) {
            __extends(TabelList, _super);
            function TabelList() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.__tableListItemMap = null;
                _this._isBindEvent = false;
                return _this;
            }
            TabelList.prototype.initMod = function () {
                this.__tableListItemMap = {};
                this.bindModEvents();
            };
            TabelList.prototype.bindModEvents = function () {
                if (this._isBindEvent) {
                    return console.error('多次绑定');
                }
                if (this.getModuleName().length < 1) {
                    return console.error('ModuleName is empty');
                }
                this._isBindEvent = true;
                kaayou.getController(this.getModuleName()).on('mod::Table::Reset', function (e) {
                    this.resetTabel(e.data);
                }, this);
                kaayou.getController(this.getModuleName()).on('mod::TabelList::GetUpdateList', function (e) {
                    this.doSitelistin(e.data);
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::sitetablelist', function (e) {
                    this.onSitelistUpdate(e.data);
                }, this);
                kaayou.getController(this.getModuleName()).on('ws::Msg::sitetable_ntf', function (e) {
                    this.onSitetable_ntf(e.data);
                }, this);
                kaayou.getController(this.getModuleName()).on('mod::TabelList::Sitelistout', function (e) {
                    this.doSitelistout(e.data);
                }, this);
            };
            //@BindEvent("qcdg", 'mod::Table::Reset')
            TabelList.prototype.resetTabel = function (data) {
                this.__tableListItemMap = {};
                kaayou.emit(this.getModuleName(), "ui::TabelList::UpdateList", this.__tableListItemMap);
            };
            //@BindEvent("qcdg", 'mod::TabelList::GetUpdateList')
            TabelList.prototype.doSitelistin = function (data) {
                var req = {
                    start: data.min,
                    end: data.max
                };
                kaayou.sendMessage(this.getModuleName(), 'sitelistin', req);
            };
            // @BindEvent("qcdg", 'mod::TabelList::Sitelistout')
            TabelList.prototype.doSitelistout = function (data) {
                var req = {};
                kaayou.sendMessage(this.getModuleName(), 'sitelistout', req);
            };
            // @BindEvent('qcdg', 'ws::Msg::sitetablelist')
            TabelList.prototype.onSitelistUpdate = function (data) {
                for (var x in data) {
                    this.__tableListItemMap[data[x].ntid] = data[x];
                }
                kaayou.emit(this.getModuleName(), "ui::TabelList::UpdateList", this.__tableListItemMap);
            };
            // @BindEvent('qcdg', 'ws::Msg::sitetable_ntf')
            TabelList.prototype.onSitetable_ntf = function (data) {
                console.log("有更新", data);
                this.__tableListItemMap[data.ntid] = data;
                kaayou.emit(this.getModuleName(), "ui::TabelList::UpdateList", this.__tableListItemMap);
                console.log("有更新", data);
            };
            return TabelList;
        }(kaayou.mod.Base));
        mod.TabelList = TabelList;
    })(mod = common.mod || (common.mod = {}));
})(common || (common = {}));
/// <reference path="common.mod.Config.ts" />
var kaayou;
(function (kaayou) {
    var SceneJumper = /** @class */ (function () {
        function SceneJumper() {
        }
        SceneJumper.getInstance = function () {
            if (SceneJumper.__INS__ == null) {
                SceneJumper.__INS__ = new SceneJumper();
            }
            return SceneJumper.__INS__;
        };
        SceneJumper.prototype.LobbyToGame = function (name) {
            // common.mod.Update.ExistsSubGame(name, function () {
            var time = new Date().getTime();
            kaayou.emit("common", "ui::Loading::Show", { msg: '正在加载资源', time: 3, addDot: true, noAni: true });
            console.log("lobbytogame");
            setTimeout(function () {
                kaayou.UIManager.getInstance().preLoadScene(name);
                kaayou.emit("common", "ui::Loading::Hide");
                kaayou.NetManager.getInstance().deleteAllSocket();
                kaayou.emit(name, "mod::Data::Clear");
                kaayou.emit(name, "mod::User::Login");
                kaayou.emit("common", "ui::Loading::Show", { msg: "加载中...", time: 3, noAni: true });
            }, 100);
            kaayou.getController(name).onece("ui::RunScene", function (e) {
                kaayou.emit("common", "ui::Loading::Hide", { force: true });
                console.log("进入游戏时间", (new Date().getTime() - time) / 1000);
                kaayou.UIManager.getInstance().runScene(name);
            }, this);
            kaayou.getController(name).onece("ui::RunSceneError", function (e) {
                kaayou.NetManager.getInstance().deleteAllSocket();
                kaayou.emit('lobby', "mod::User::Login");
                kaayou.emit("common", "ui::Loading::Hide", { force: true });
            }, this);
            // });
        };
        SceneJumper.prototype.GameToLobby = function () {
            kaayou.emit("common", "ui::Loading::Show", { msg: '正在返回大厅', time: 3, addDot: true, noAni: true });
            kaayou.NetManager.getInstance().deleteAllSocket();
            kaayou.emit('lobby', "mod::User::Login");
            kaayou.emit("common", "ui::Loading::Show", { msg: "加载中...", time: 3, noAni: true });
            kaayou.getController('lobby').onece("ui::RunScene", function (e) {
                kaayou.emit("common", "ui::Loading::Hide", { force: true });
                kaayou.UIManager.getInstance().popScene();
            }, this);
            kaayou.getController('lobby').onece("ui::RunSceneError", function (e) {
                kaayou.NetManager.getInstance().deleteAllSocket();
                kaayou.emit("common", "ui::Loading::Hide", { force: true });
                kaayou.emit('lobby', "mod::User::Login");
                kaayou.UIManager.getInstance().runScene('lobby');
            }, this);
        };
        SceneJumper.prototype.LobbyToRecord = function (name) {
            common.mod.Update.ExistsSubGame(name, "", function () {
                kaayou.emit("common", "ui::Loading::Show", { msg: '正在加载资源', time: 3, addDot: true, noAni: true });
                kaayou.UIManager.getInstance().preLoadScene(name);
                kaayou.emit("common", "ui::Loading::Hide");
                kaayou.NetManager.getInstance().deleteAllSocket();
                kaayou.emit(name, "mod::Record::Run");
                kaayou.emit("common", "ui::Loading::Show", { msg: "加载中...", time: 3, noAni: true });
                kaayou.getController(name).onece("ui::RunScene", function (e) {
                    kaayou.emit("common", "ui::Loading::Hide", { force: true });
                    kaayou.UIManager.getInstance().runScene(name);
                }, this);
                kaayou.getController(name).onece("ui::RunSceneError", function (e) {
                    kaayou.NetManager.getInstance().deleteAllSocket();
                    kaayou.emit('lobby', "mod::User::Login");
                    kaayou.emit("common", "ui::Loading::Hide", { force: true });
                }, this);
            });
        };
        SceneJumper.__INS__ = null;
        return SceneJumper;
    }());
    function LobbyToGame(name) {
        SceneJumper.getInstance().LobbyToGame(name);
    }
    kaayou.LobbyToGame = LobbyToGame;
    function GameToLobby() {
        SceneJumper.getInstance().GameToLobby();
    }
    kaayou.GameToLobby = GameToLobby;
    function LobbyToRecord(name) {
        SceneJumper.getInstance().LobbyToRecord(name);
    }
    kaayou.LobbyToRecord = LobbyToRecord;
})(kaayou || (kaayou = {}));
var common;
(function (common) {
    var mod;
    (function (mod) {
        var _global = typeof window === 'undefined' ? global : window;
        var LocalPackage = /** @class */ (function () {
            function LocalPackage() {
            }
            LocalPackage.uzipSubGame = function (pakegeName, call) {
                if (!cc.sys.isNative) {
                    if (call) {
                        call();
                    }
                    return false;
                }
                var zipName = pakegeName + ".zip";
                var zipprePath = "";
                if (cc.sys.os == cc.sys.OS_ANDROID) {
                    zipprePath = "assets/";
                }
                else {
                }
                zipprePath = zipprePath + zipName;
                var zipPath = jsb.fileUtils.fullPathForFilename(zipprePath);
                if (!(zipPath && zipPath != '' && -1 < zipPath.indexOf(zipName))) {
                    //文件不存在
                    if (call) {
                        call();
                    }
                    return false;
                }
                var remoteSeachPathRoot = kaayou.getRemotePath();
                var tmpgameDir = remoteSeachPathRoot + pakegeName + "_tmp/";
                var gamedir = remoteSeachPathRoot + pakegeName + "";
                if (jsb.fileUtils.isDirectoryExist(gamedir)) {
                    //已经解压过了
                    if (call) {
                        call();
                    }
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show", { msg: '正在释放资源', time: 3, addDot: false, noAni: true });
                //删除上次失败的 tmp目录
                if (jsb.fileUtils.isDirectoryExist(tmpgameDir)) {
                    jsb.fileUtils.removeDirectory(tmpgameDir);
                }
                if (jsb.fileUtils.isFileExist(tmpgameDir)) {
                    jsb.fileUtils.removeFile(tmpgameDir);
                }
                //创建临时目录
                jsb.fileUtils.createDirectory(tmpgameDir);
                var tmpzipPath = tmpgameDir + pakegeName + ".zip";
                //开始复制zip包
                if (!kaayou_jsb.File.copyFile(zipPath, tmpzipPath)) {
                    if (call) {
                        call();
                    }
                    return false;
                }
                //复制失败
                if (!jsb.fileUtils.isFileExist(tmpzipPath)) {
                    if (call) {
                        call();
                    }
                    return false;
                }
                //开始解压
                var kzip = new kaayou_jsb.File.ZIP();
                if (!kzip.unzip(tmpzipPath)) {
                    if (call) {
                        call();
                    }
                    return false;
                }
                //删除临时zip
                jsb.fileUtils.removeFile(tmpzipPath);
                //修改文件夹名称
                if (jsb.fileUtils.isDirectoryExist(tmpgameDir)) {
                    jsb.fileUtils.renameFile(tmpgameDir, gamedir);
                }
                if (call) {
                    call();
                }
                return true;
            };
            return LocalPackage;
        }());
        mod.LocalPackage = LocalPackage;
        var Update = /** @class */ (function () {
            function Update() {
            }
            Update.versionCompareHandle = function (versionA, versionB) {
                var vA = versionA.split('.');
                var vB = versionB.split('.');
                for (var i = 0; i < vA.length; ++i) {
                    var a = parseInt(vA[i]);
                    var b = parseInt(vB[i] || "0");
                    if (a === b) {
                        continue;
                    }
                    else {
                        return a - b;
                    }
                }
                if (vB.length > vA.length) {
                    return -1;
                }
                else {
                    return 0;
                }
            };
            Update.UpdateApp = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var promise;
                    return __generator(this, function (_a) {
                        promise = new Promise(function (resolve) {
                            kaayou.addLog("检测是否需要强更");
                            kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "正在检测是否需要强更", code: -1 });
                            //if (Config.AppConfig["AppVersion"]) {
                            if (mod.Config.AppConfig["AppVersion"] && cc.sys.isNative) {
                                var localVer = kaayou.PlatformMgr.getInstance().sys.GetLocalVersionName();
                                var remoteVer = mod.Config.AppConfig["AppVersion"].version;
                                var _url_1 = mod.Config.AppConfig["AppVersion"].url;
                                var content = mod.Config.AppConfig["AppVersion"].content;
                                var suggestVer = "";
                                var suggestUrl_1 = "";
                                var suggestContent = "";
                                if (!!mod.Config.AppConfig["SuggestAppVersion"]) {
                                    suggestVer = mod.Config.AppConfig["SuggestAppVersion"].version;
                                    suggestUrl_1 = mod.Config.AppConfig["SuggestAppVersion"].url;
                                    suggestContent = mod.Config.AppConfig["SuggestAppVersion"].content;
                                }
                                console.log("app版本:" + localVer);
                                console.log("强更版本：" + remoteVer);
                                console.log("推荐版本：" + suggestVer);
                                var updateTo = 0;
                                //如果强更版本比本地高
                                if (Update.versionCompareHandle(remoteVer, localVer) > 0) {
                                    updateTo = 1;
                                }
                                //如果强更没本地高，但建议比本地高
                                else if (!!mod.Config.AppConfig["SuggestAppVersion"] && Update.versionCompareHandle(suggestVer, localVer) > 0) {
                                    updateTo = 2;
                                }
                                if (updateTo > 0) {
                                    var versionDialogPanel_1 = new common.VersionDialogPanel();
                                    var fn_1 = function (url) {
                                        kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                        versionDialogPanel_1.removeFromParent();
                                        if (cc.sys.os == cc.sys.OS_ANDROID) {
                                            new DownloadApk();
                                            kaayou.PlatformMgr.getInstance().sys.DownloadApk(url);
                                            kaayou.emit("common", "ui::Loading::Show", { msg: "正在下载Apk", time: 0, noAni: true });
                                        }
                                        else if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
                                            kaayou.PlatformMgr.getInstance().sys.OpenUrl(url);
                                        }
                                        resolve(true);
                                    };
                                    kaayou.UIManager.getInstance().getMainScene().addChild(versionDialogPanel_1);
                                    var op = {
                                        title: "温馨提示",
                                        msg: content,
                                        leftMsg: "当前版本：" + localVer,
                                        rightMsg: "最新版本：" + remoteVer,
                                        isDomText: false,
                                        btns: [{
                                                name: '退出游戏',
                                                colorType: 'blue',
                                                action: function () {
                                                    cc.game.end();
                                                    resolve(true);
                                                }
                                            }, {
                                                name: "立即更新",
                                                colorType: 'green',
                                                action: function () {
                                                    fn_1(_url_1);
                                                }
                                            }],
                                    };
                                    var op2 = {
                                        title: "温馨提示",
                                        msg: suggestContent,
                                        leftMsg: "当前版本：" + localVer,
                                        rightMsg: "最新版本：" + suggestVer,
                                        isDomText: false,
                                        btns: [{
                                                name: '下次再说',
                                                colorType: 'blue',
                                                action: function () {
                                                    versionDialogPanel_1.removeFromParent();
                                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                                    resolve(false);
                                                }
                                            }, {
                                                name: "立即更新",
                                                colorType: 'green',
                                                action: function () {
                                                    fn_1(suggestUrl_1);
                                                }
                                            }],
                                    };
                                    if (updateTo == 1)
                                        versionDialogPanel_1.Show(op);
                                    else if (updateTo == 2)
                                        versionDialogPanel_1.Show(op2);
                                }
                                else {
                                    resolve(false);
                                }
                            }
                            else {
                                resolve(false);
                            }
                        });
                        return [2 /*return*/, promise];
                    });
                });
            };
            Update.loadNewModule = function (modulename, call) {
                var self = this;
                var remoteSeachPathRoot = jsb.fileUtils.getWritablePath() + "remote-assets/";
                var gamemodulelistPath = [];
                var element = modulename;
                var modulepathRoot = "" + remoteSeachPathRoot + element;
                var modulepathSrc = modulepathRoot + "/src";
                var modulepath = modulepathSrc + "/" + element;
                var modulepathjs = modulepath + "/" + element + ".module.js";
                var moduleSearchPath = modulepath + "/" + element + ".module.js";
                var moduleSearchPathJS = "src/" + element + "/" + element + ".module.js";
                console.log("可能需加载的模块:::  ", element, modulepathRoot, modulepathSrc, modulepath, modulepathjs);
                if (jsb.fileUtils.isFileExist(modulepathjs)) {
                    cc.sys.cleanScript(moduleSearchPathJS);
                    gamemodulelistPath.push(moduleSearchPathJS);
                    jsb.fileUtils.addSearchPath(modulepathRoot);
                }
                console.log("需加载的新搜索路径:::  ", JSON.stringify(jsb.fileUtils.getSearchPaths()));
                console.log("需加载的新模块:::  ", JSON.stringify(gamemodulelistPath));
                cc.loader.loadJsWithImg("", gamemodulelistPath, function (err) {
                    if (err) {
                        return;
                    }
                    console.log("loadJsWithImg  ok"); //
                    console.log('文件数量' + kaayou.ResManager.getInstance().RESDB.length);
                    Update.callOnce(call);
                });
            };
            Update.callOnce = function (call) {
                return __awaiter(this, void 0, void 0, function () {
                    var i, index, element;
                    return __generator(this, function (_a) {
                        Update.isload = false;
                        i = 0;
                        for (index = 0; index < kaayou.ResManager.getInstance().RESDB.length; index++) {
                            element = kaayou.ResManager.getInstance().RESDB[index];
                            (function (path) {
                                cc.loader.load(path, function (err) {
                                    i++;
                                    if (i == kaayou.ResManager.getInstance().RESDB.length) {
                                        call();
                                    }
                                });
                            })(element);
                        }
                        return [2 /*return*/];
                    });
                });
            };
            Update.DeleteTempDir = function (name) {
                var tmpPath = kaayou.getRemotePath() + name + "_tmp";
                console.log("删除历史残留：" + tmpPath);
                if (jsb.fileUtils.isDirectoryExist(tmpPath)) {
                    console.log("删除历史残留1：" + tmpPath);
                    jsb.fileUtils.removeDirectory(tmpPath);
                }
                var tempPath = kaayou.getRemotePath() + name + "_temp"; //安卓好像是这
                console.log("删除历史残留：" + tempPath);
                if (jsb.fileUtils.isDirectoryExist(tempPath)) {
                    console.log("删除历史残留1：" + tempPath);
                    jsb.fileUtils.removeDirectory(tempPath);
                }
            };
            /**
                *
                * @param name      包的key
                * @param remoteVs  包远程版本(大厅传空数据保持原来的方式，子游戏传远程版本)
                * @param call      回调函数
            */
            Update.ExistsSubGame = function (name, remoteVs, call) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (!cc.sys.isNative) {
                            if (!_global[name]) {
                                cc.loader.loadJs("", ["src/" + name + "/" + name + ".module.js"], function (err) {
                                    if (err) {
                                        kaayou.emit('common', 'ui::Toast::Show', { msg: '没有相关游戏资源', time: 3, mask: true });
                                        return;
                                    }
                                    kaayou.emit("common", "ui::Loading::Show", { msg: '准备加载游戏', time: 3, addDot: true, noAni: true });
                                    cc.loader.load(kaayou.ResManager.getInstance().RESDB, function (result, tatolcount, loadedCount) {
                                        if (cc.sys.isNative) {
                                            return;
                                        }
                                        if (!lodash.isNumber(tatolcount) || tatolcount < 1) {
                                            return;
                                        }
                                        if (!lodash.isNumber(loadedCount) || loadedCount < 0) {
                                            return;
                                        }
                                        var cnum = Math.max(0, Math.min(100, Math.ceil((loadedCount / tatolcount) * 100)));
                                        kaayou.emit("common", "ui::Loading::Show", { msg: '游戏加载中…' + cnum + '%', time: 60, addDot: false, noAni: true });
                                    }, function () {
                                        setTimeout(function () {
                                            kaayou.emit('common', 'ui::Loading::Hide');
                                            return call();
                                        }, 100);
                                    });
                                });
                            }
                            else {
                                return [2 /*return*/, call()];
                            }
                            return [2 /*return*/];
                        }
                        else {
                            //这个时候先判断一下有没有热更的缓存包name_tmp   如果有的话就先删除
                            Update.DeleteTempDir(name);
                        }
                        if (g_dw) {
                            return [2 /*return*/, console.log("正在下载")];
                        }
                        if (g_up) {
                            return [2 /*return*/, console.log("正在更新")];
                        }
                        if (!_global[name] && !kaayou.ExistModule(name)) {
                            console.log("模块未加载  且未下载");
                            if (!(mod.Config.AppConfig.feature && mod.Config.AppConfig.feature.ho)) {
                                return [2 /*return*/, Update.loadNewModule(name, call)];
                            }
                            kaayou.emit("common", "ui::Loading::Show", { msg: '正在获取下载地址', time: 15, addDot: true });
                            kaayou.addLog("开始获取热更包的下载地址");
                            kaayou.Http.GET(mod.Config.ConfigUrl + mod.Config.DownloadUrl.format({ keyname: name })).then(function (res) {
                                console.log("ExistsSubGame res:" + res);
                                kaayou.emit("common", "ui::Loading::Show", { msg: '准备下载游戏', time: 4, addDot: true, noAni: true });
                                try {
                                    if (lodash.isEmpty(res)) {
                                        throw "";
                                    }
                                    if (res.length < 10 + name.length) {
                                        throw "";
                                    }
                                    var dpurl = "";
                                    if (res.indexOf(name + ".zip") == res.length - name.length - 4) {
                                        dpurl = res;
                                    }
                                    else {
                                        var data = JSON.parse(res);
                                        if (data.error) {
                                            throw "";
                                        }
                                        dpurl = data.path;
                                    }
                                    g_dw = new DownLoadSubGame(dpurl, name, function () {
                                        g_dw = null;
                                        console.log("游戏包解压完成，开始加载模块");
                                        Update.loadNewModule(name, call);
                                    }, function () {
                                        g_dw = null;
                                        kaayou.emit("common", "ui::Loading::Show", { msg: '游戏下载失败', time: 4, addDot: true, noAni: true });
                                    });
                                    g_dw.download();
                                }
                                catch (err) {
                                    kaayou.emit("common", "ui::Loading::Show", { msg: '获取下载地址失败', time: 4, addDot: false, noAni: true });
                                }
                            }).catch(function () {
                                kaayou.emit("common", "ui::Loading::Show", { msg: '获取下载地址失败', time: 4, addDot: false, noAni: true });
                            });
                        }
                        else if (_global[name]) {
                            console.log("模块已存在");
                            if (!(mod.Config.AppConfig.feature && mod.Config.AppConfig.feature.ho)) {
                                return [2 /*return*/, call()];
                            }
                            g_up = new HotUpdate(mod.Config.ConfigUrl + mod.Config.CheckUpdateUrl, name, remoteVs, function (needHot) {
                                g_up = null;
                                if (needHot) {
                                    kaayou.emit("common", "ui::Loading::Show", { msg: '热更新完毕，正在加载游戏', time: 15, addDot: false, noAni: true });
                                    if (_global[name].uninstall) {
                                        //如果是当前显示的场景，uninstall前需要先onReExit
                                        if (kaayou.UIManager.getInstance().getCurRuningSceneName() == name.toUpperCase()) {
                                            kaayou.UIManager.getInstance().getCurRuningScene().onReExit();
                                        }
                                        _global[name].uninstall();
                                    }
                                    Update.loadNewModule(name, call);
                                }
                                else {
                                    console.log("无更新");
                                    kaayou.emit("common", "ui::Loading::Show", { msg: '正在加载资源', time: 4, addDot: true, noAni: true });
                                    call();
                                }
                            }, function () {
                                console.log("报错");
                                kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新失败', time: 4, addDot: true, noAni: true });
                                g_up = null;
                            });
                            //@vsen 2019.08.17
                            kaayou.emit("common", "ui::Loading::Show", { msg: '检测游戏更新', time: 33, addDot: true, noAni: true });
                            g_up.run();
                        }
                        else {
                            console.log("模块未加载  但已下载");
                            if (!(mod.Config.AppConfig.feature && mod.Config.AppConfig.feature.ho)) {
                                return [2 /*return*/, Update.loadNewModule(name, call)];
                            }
                            g_up = new HotUpdate(mod.Config.ConfigUrl + mod.Config.CheckUpdateUrl, name, remoteVs, function (needHot) {
                                g_up = null;
                                if (needHot) {
                                    console.log("有更新");
                                    kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新中…100%', time: 60, addDot: false, noAni: true });
                                    console.log("卸载已存在的模块");
                                    // if (_global[name].uninstall) {
                                    //     _global[name].uninstall();
                                    // }
                                    Update.loadNewModule(name, call);
                                }
                                else {
                                    console.log("无更新");
                                    kaayou.emit("common", "ui::Loading::Show", { msg: '正在加载资源', time: 15, addDot: true, noAni: true });
                                    Update.loadNewModule(name, call);
                                    // call();
                                }
                            }, function () {
                                console.log("报错");
                                kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新失败', time: 4, addDot: true, noAni: true });
                                g_up = null;
                            });
                            kaayou.emit("common", "ui::Loading::Show", { msg: '检测游戏更新', time: 33, addDot: true, noAni: true });
                            g_up.run();
                        }
                        return [2 /*return*/];
                    });
                });
            };
            Update.UpdateLobby = function (call) {
                return __awaiter(this, void 0, void 0, function () {
                    var name;
                    return __generator(this, function (_a) {
                        kaayou.addLog("检测是否需要热更大厅");
                        kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "正在检测是否需要热更大厅", code: -1 });
                        if (!cc.sys.isNative) {
                            return [2 /*return*/, call()];
                        }
                        if (g_dw) {
                            return [2 /*return*/, console.log("正在下载")];
                        }
                        if (g_up) {
                            return [2 /*return*/, console.log("正在更新")];
                        }
                        name = 'GameLobby';
                        //第三个参数是成功后回调
                        //第四个参数是失败后回调
                        g_up = new HotUpdate(mod.Config.ConfigUrl + mod.Config.CheckUpdateUrl, name, "", function (needHot) {
                            g_up = null;
                            if (needHot) {
                                cc.game.restart();
                            }
                            else {
                                call();
                            }
                        }, function (errmsg) {
                            console.log("报错");
                            kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新失败', time: 1, addDot: true, noAni: true });
                            setTimeout(function () {
                                cc.game.restart();
                            }, 1);
                            g_up = null;
                        });
                        kaayou.emit("common", "ui::Loading::Show", { msg: '检测游戏更新', time: 33, addDot: true, noAni: true });
                        g_up.run();
                        return [2 /*return*/];
                    });
                });
            };
            //比较版本
            Update.isload = false;
            return Update;
        }());
        mod.Update = Update;
        var g_da = null;
        var g_dw = null;
        var g_up = null;
        var DownloadApk = /** @class */ (function () {
            function DownloadApk() {
                this._lobbyPath = "";
                this._apkPath = "";
                this._isExit = false;
                this._downloadSucceed = false;
                this.message = "";
                this.downloadStatus = "";
                this.apkUrl = "";
                this.isBackGround = false;
                var self = this;
                kaayou.getController('common').on(cc.game.EVENT_SHOW, function (e) {
                    self.onReShow();
                }, this);
                kaayou.getController('common').on(cc.game.EVENT_HIDE, function (e) {
                    if (!self.isBackGround) {
                        self.isBackGround = true;
                    }
                }, this);
                kaayou.getController('common').offBytarger('ui::apk::onDownload', this);
                kaayou.getController('common').on('ui::apk::onDownload', function (e) {
                    self.onDownloadApk(e.data);
                }, this);
            }
            DownloadApk.prototype.onReShow = function () {
                kaayou.emit('common', "ui::Dialog::Hide");
                var self = this;
                if (self.isBackGround)
                    self.isBackGround = false;
                if (self._downloadSucceed) {
                    var options = {
                        title: "温馨提示",
                        msg: "请安装最新版本",
                        btns: [
                            {
                                name: "安装",
                                action: function () {
                                    if (self._apkPath)
                                        kaayou.PlatformMgr.getInstance().sys.InstallApk(self._apkPath);
                                }.bind(this),
                                colorType: 'green'
                            }
                        ]
                    };
                    kaayou.emit('common', "ui::Dialog::Show", options);
                }
                else if (self.downloadStatus == "fail") {
                    self.onDownloadFail();
                }
            };
            DownloadApk.prototype.onDownloadFail = function () {
                var self = this;
                //lw200527如果手机系统时间不对，也会导致下载失败
                kaayou.emit('common', 'ui::Loading::Hide');
                self.message = "下载更新包失败，请前往官网 http://www.douqi.com 下载。";
                //self.apkUrl = data.extend;
                //console.log("下载地址：", self.apkUrl);
                var options = {
                    title: "温馨提示",
                    msg: "下载更新包失败，请前往官网 http://www.douqi.com 下载。",
                    btns: [
                        {
                            name: "重试",
                            action: function () {
                                Update.UpdateApp();
                            }.bind(this),
                            colorType: 'green'
                        },
                        {
                            name: "前往",
                            action: function () {
                                kaayou.PlatformMgr.getInstance().sys.OpenUrl("http://www.douqi.com");
                            }.bind(this),
                            colorType: 'green'
                        }
                    ]
                };
                //lw181207如果此时在后台，字会黑
                if (!self.isBackGround)
                    kaayou.emit('common', "ui::Dialog::Show", options);
            };
            // @BindEvent("ui::apk::onDownload")
            DownloadApk.prototype.onDownloadApk = function (data) {
                var self = this;
                self.downloadStatus = data.code;
                switch (data.code) {
                    case "fail":
                        self.onDownloadFail();
                        break;
                    case "loading":
                        var obj = JSON.parse(data.extend);
                        var mDownloaded = Math.floor(obj.downloaded / 1024 / 1024);
                        var mTotal = Math.floor(obj.total / 1024 / 1024);
                        self.message = "游戏下载中 " + obj.progress + '%…(' + mDownloaded + 'M/' + mTotal + 'M)';
                        if (!self.isBackGround)
                            kaayou.emit('common', "ui::Loading::Show", { msg: self.message, time: 0, addDot: false, noAni: true });
                        break;
                    case "success":
                        self._downloadSucceed = true;
                        //self.mask.node.active = true;
                        //self.mask.node.width = self.pb.width;
                        self._apkPath = data.extend;
                        //self.btnInstall.getComponent(cc.Sprite).spriteFrame = self.sfInstall;
                        kaayou.emit('common', "ui::Loading::Show", { msg: "游戏下载完成，请安装", time: 0, addDot: false, noAni: true });
                        setTimeout(function () {
                            if (self._apkPath)
                                kaayou.PlatformMgr.getInstance().sys.InstallApk(self._apkPath);
                        }, 200);
                        kaayou.emit('common', 'ui::Loading::Hide');
                        break;
                }
            };
            return DownloadApk;
        }());
        var DownLoadSubGame = /** @class */ (function () {
            function DownLoadSubGame(baseurl, pakegeName, successCallBack, errorCallBack) {
                this.d = null;
                this._pakegeName = "";
                this.__successCallBack = null;
                this.__errorCallBack = null;
                this._baseUrl = "";
                this._pakegeName = pakegeName;
                this.__successCallBack = successCallBack;
                this.__errorCallBack = errorCallBack;
                this._baseUrl = baseurl;
                console.log("下载", this._baseUrl);
            }
            DownLoadSubGame.prototype.download = function () {
                if (!cc.sys.isNative) {
                    return;
                }
                var self = this;
                console.log("download", kaayou_jsb.File.DownLoad);
                this.d = new kaayou_jsb.File.DownLoad();
                var pakegeName = this._pakegeName;
                var remoteSeachPathRoot = jsb.fileUtils.getWritablePath() + "remote-assets/";
                var tmpgameDir = remoteSeachPathRoot + pakegeName + "_tmp/";
                var gamedir = remoteSeachPathRoot + pakegeName + "";
                if (jsb.fileUtils.isDirectoryExist(tmpgameDir)) {
                    jsb.fileUtils.removeDirectory(tmpgameDir);
                }
                if (jsb.fileUtils.isFileExist(tmpgameDir)) {
                    jsb.fileUtils.removeFile(tmpgameDir);
                }
                jsb.fileUtils.createDirectory(tmpgameDir);
                var zipPath = tmpgameDir + pakegeName + ".zip";
                this.d.DownLoadFile("" + this._baseUrl, zipPath);
                this.d.onProgress = function (total, downloaded) {
                    kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新中…' + parseInt((downloaded / total * 100).toString()) + '%', time: 60, addDot: false, noAni: true });
                };
                this.d.onError = function (errcode, errorCodeInternal, errorStr) {
                    console.log("down err", errcode, errorCodeInternal, errorStr);
                    var kzip = new kaayou_jsb.File.ZIP();
                    var c = self.__errorCallBack;
                    self.__successCallBack = null;
                    self.__errorCallBack = null;
                    if (c) {
                        c();
                    }
                };
                this.d.onSuccess = function (url, storagePath) {
                    console.log("游戏包下载完成，开始解压");
                    kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新中…100%', time: 60, addDot: false, noAni: true });
                    setTimeout(function () {
                        kaayou.emit("common", "ui::Loading::Show", { msg: '下载完成正在解压', time: 10, addDot: true, noAni: true });
                        var kzip = new kaayou_jsb.File.ZIP();
                        //lw181023同步解压
                        if (!kzip.unzip(storagePath)) {
                            return false;
                        }
                        jsb.fileUtils.removeFile(storagePath);
                        if (jsb.fileUtils.isDirectoryExist(tmpgameDir)) {
                            jsb.fileUtils.renameFile(tmpgameDir, gamedir);
                        }
                        var c = self.__successCallBack;
                        self.__successCallBack = null;
                        self.__errorCallBack = null;
                        if (c) {
                            c();
                        }
                    }, 500);
                };
            };
            return DownLoadSubGame;
        }());
        var HotUpdate = /** @class */ (function () {
            function HotUpdate(baseurl, gameName, subGameRemoteVs, successCallBack, errorCallBack) {
                this._am = null;
                this.gameName = '';
                this.baseurl = '';
                this.sceneName = '';
                this.subgameSettings = null;
                this.zipUrlSize = 0;
                this._storagePath = null;
                this.__successCallBack = null;
                this.__errorCallBack = null;
                this.isUpdating = false;
                this._updateListener = null;
                this.subGameRemoteVs = null;
                this.gameName = gameName;
                this.baseurl = baseurl;
                this.__successCallBack = successCallBack;
                this.__errorCallBack = errorCallBack;
                this.subGameRemoteVs = subGameRemoteVs;
            }
            HotUpdate.prototype.run = function () {
                try {
                    var self = this;
                    this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + "remote-assets/" + this.gameName);
                    if (this.gameName == 'GameLobby') {
                        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + "remote-assets/");
                    }
                    else { //只有子游戏先检验本地版本
                        if (this.subGameRemoteVs && this.subGameRemoteVs.length > 0) {
                            var curLocalVs = kaayou.getSubGameVersion(this.gameName);
                            console.log("远程子游戏版本" + this.subGameRemoteVs + ",本地子游戏版本" + curLocalVs);
                            var are_you_need = Update.versionCompareHandle(this.subGameRemoteVs, curLocalVs);
                            console.log("是否需要热更？++++++" + are_you_need);
                            if (are_you_need <= 0) { //不需要热更
                                setTimeout(function () {
                                    self.callSuccess(false);
                                }, 100);
                                return;
                            }
                        }
                    }
                    console.log("downloadGame storagePath:" + this._storagePath);
                    var customManifestStr = JSON.stringify({
                        "packageUrl": "",
                        "remoteManifestUrl": this.baseurl.format({ action: "project", type: this.gameName }),
                        "remoteVersionUrl": this.baseurl.format({ action: "version", type: this.gameName }),
                        "version": "0.0.1",
                        "assets": {},
                        "searchPaths": []
                    });
                    this._am = jsb.AssetsManager.create('', this._storagePath, Update.versionCompareHandle);
                    if (!cc.sys['ENABLE_GC_FOR_NATIVE_OBJECTS']) {
                        this._am.retain();
                    }
                    if (cc.sys.os === cc.sys.OS_ANDROID) {
                        this._am.setMaxConcurrentTask(2);
                    }
                    this._updateListener = jsb.EventListenerAssetsManager.create(this._am, this.checkCb.bind(this));
                    cc.eventManager.addListener(this._updateListener, 1);
                    var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
                    this._am.loadLocalManifest(manifest, this._storagePath);
                    this._am.checkUpdate();
                }
                catch (err) {
                    console.log("error ", err.toString());
                }
            };
            HotUpdate.prototype.callSuccess = function (bRestart) {
                var self = this;
                console.log("热更新完毕，正在回调，这里不要用toast，因为大厅和游戏的热更新都会走这里");
                var c = this.__successCallBack;
                this.__successCallBack = null;
                self.isUpdating = false;
                if (c) {
                    c(bRestart);
                }
            };
            HotUpdate.prototype.callError = function (errstr) {
                var self = this;
                kaayou.addLog("更新出错：" + errstr);
                kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "更新出错：" + errstr, code: 0 });
                var c = this.__errorCallBack;
                this.__errorCallBack = null;
                self.isUpdating = false;
                if (c) {
                    c(errstr);
                }
            };
            HotUpdate.prototype.checkCb = function (event) {
                var self = this;
                switch (event.getEventCode()) {
                    case jsb.EventCode.ERROR_NO_LOCAL_MANIFEST:
                        /*0 本地没有配置文件*/
                        //this.lbMsg.string = '没有找到配置文件...';
                        this.callError('没有找到本地配置文件...');
                        break;
                    case jsb.EventCode.ERROR_DOWNLOAD_MANIFEST:
                        /*1下载配置文件错误*/
                        //this.lbMsg.string = '没有找到资源文件...';
                        this.callError('没有找到远程配置文件...');
                        break;
                    case jsb.EventCode.ERROR_PARSE_MANIFEST:
                        /*2 解析文件错误*/
                        //this.lbMsg.string = '解析文件错误...';
                        this.callError('配置文件解析文件错误');
                        break;
                    case jsb.EventCode.NEW_VERSION_FOUND:
                        /*3发现新的更新*/
                        kaayou.addLog("发现新的版本");
                        kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "发现新的版本", code: -1 });
                        kaayou.emit("common", "ui::Loading::Show", { msg: '检测到游戏有更新', time: 0, addDot: true, noAni: true });
                        this.subgameSettings = undefined;
                        this._am.update();
                        break;
                    case jsb.EventCode.ALREADY_UP_TO_DATE:
                        /*4 已经是最新的*/
                        //kaayou.emit('ui::Toast::Show', { msg: "已经是最新版本！" });
                        //this.lbMsg.string = '已经是最新版本！...';
                        console.log("已经是最新版本！");
                        if (this.gameName != 'GameLobby') {
                            kaayou.emit("common", "ui::Loading::Show", { msg: '正在进入游戏', time: 30, addDot: true, noAni: true });
                        }
                        else {
                            kaayou.emit("common", "ui::Loading::Hide", { force: true });
                        }
                        setTimeout(function () {
                            self.callSuccess(false);
                        }, 200);
                        break;
                    case jsb.EventCode.UPDATE_PROGRESSION:
                        /*5 最新进展  做 进度的*/
                        console.log(event);
                        if (event.getDownloadedFiles() == 0) {
                            //this.node.active=true;
                            //this.lbMsg.string = '游戏更新中...0%';
                            //lw181207如果不做==0的判断，会显示进度是NaN
                            kaayou.emit("common", "ui::Loading::Show", { msg: '检测游戏更新', time: 18, addDot: true, noAni: true });
                        }
                        else {
                            //this.mask.node.active=true;
                            //this.mask.node.width=this.pb.width*event.getPercent();
                            //this.lbMsg.string = '游戏更新中...'+  parseInt((event.getPercent()*100).toString()) + "%";
                            kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新中…' + parseInt((event.getPercent() * 100).toString()) + '%', time: 60, addDot: false, noAni: true });
                        }
                        break;
                    case jsb.EventCode.ASSET_UPDATED:
                        /*6需要更新*/
                        break;
                    case jsb.EventCode.ERROR_UPDATING:
                        /*7更新错误*/
                        //this.lbMsg.string = '更新发生错误，请重试';
                        this.callError('更新发生错误，请重试');
                        break;
                    case jsb.EventCode.UPDATE_FINISHED:
                        /*8更新完成*/
                        kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新中…100%', time: 60, addDot: false, noAni: true });
                        setTimeout(function () {
                            self.callSuccess(true);
                        }, 200);
                        break;
                    case jsb.EventCode.UPDATE_FAILED:
                        /*9更新失败*/
                        //this.lbMsg.string = '更新失败，请重试';
                        this.callError('更新失败，请重试');
                        break;
                    case jsb.EventCode.ERROR_DECOMPRESS:
                        /*10解压失败*/
                        //this.lbMsg.string = '解压失败，请重试';
                        this.callError('解压失败，请重试');
                        break;
                }
            };
            HotUpdate.checkNeedUpdate = function (remoteVersion) {
                if (!remoteVersion)
                    return;
                var curLocalVs = kaayou.getLobbyVersion();
                var are_you_need = common.mod.Update.versionCompareHandle(remoteVersion, curLocalVs);
                console.log("远程版本号：" + remoteVersion);
                console.log("是否需要热更？++++++" + are_you_need);
                if (are_you_need > 0) {
                    var options = {
                        msg: "检测到新版本，点击确定后自动重启",
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    if (!cc.sys.isNative) {
                                        if (window && window.location) {
                                            window.location.reload();
                                        }
                                    }
                                    else {
                                        cc.game.restart();
                                    }
                                },
                                colorType: 'yellow'
                            }
                        ]
                    };
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                }
            };
            return HotUpdate;
        }());
        mod.HotUpdate = HotUpdate;
    })(mod = common.mod || (common.mod = {}));
})(common || (common = {}));
var common;
(function (common) {
    var AntiNoteCardLayer = /** @class */ (function (_super) {
        __extends(AntiNoteCardLayer, _super);
        function AntiNoteCardLayer(ccs) {
            var _this = _super.call(this) || this;
            _this.curRound = 0;
            _this.outCardRow = null;
            _this.outCardNode = null;
            _this.initWithccs(ccs);
            _this.initUI();
            _this.setVisible(false);
            _this.curRound = 0;
            return _this;
        }
        AntiNoteCardLayer.prototype.initUI = function () {
            var self = this;
            this.outCardRow = [];
            this.outCardNode = [];
            var outCardNodes = ccui.helper.seekWidgetByName(this.node, "Panel_outCards");
            outCardNodes.setContentSize(cc.winSizeCustom);
            ccui.helper.doLayout(outCardNodes);
            for (var x in outCardNodes.children) {
                var cardNode = outCardNodes.children[x];
                this.outCardNode.push(cardNode);
                var outCardRow = this.getCardRow();
                outCardRow.setAnchorPoint(cardNode.getAnchorPoint());
                outCardRow.setPosition(cardNode.width * cardNode.anchorX, cardNode.height * cardNode.anchorY);
                outCardRow.dealCard([]);
                outCardRow.setTag(10);
                cardNode.addChild(outCardRow);
                this.outCardRow.push(outCardRow);
            }
        };
        AntiNoteCardLayer.prototype.RandOutCard = function () {
            var cards = [];
            var count = 5;
            for (var i = 0; i < count; i++) {
                var randNum = Math.floor(Math.random() * 54) + 1;
                cards.push(randNum);
            }
            return cards;
        };
        AntiNoteCardLayer.prototype.UpdateOutCard = function (data) {
            for (var x in this.outCardRow) {
                if (!data.Players || !data.Players[x] || Number(x) == 0) {
                    this.outCardRow[x].setNums([]);
                }
                else {
                    this.outCardRow[x].setNums(data.Players[x]['randCard']);
                }
            }
        };
        AntiNoteCardLayer.prototype.PlayOutCardAnim = function (data) {
            var self = this;
            //每个玩家随机5张手牌
            for (var i_1 = 0; i_1 < data.Players.length; i_1++) {
                if (!data.Players[i_1])
                    continue;
                data.Players[i_1]['randCard'] = this.RandOutCard();
            }
            var i = 1;
            var de = function () {
                i++;
                if (i > data.Players.length) {
                    setTimeout(function () {
                        self.cleanUp();
                        self.setVisible(false);
                    }, 1800);
                    return;
                }
                if (!data.Players[i - 1]) {
                    de();
                    return;
                }
                self.UpdateOutCard({ Players: data.Players.slice(0, i) });
                setTimeout(function () {
                    de();
                }, 1800);
            };
            setTimeout(function () {
                de();
            }, 1800);
        };
        AntiNoteCardLayer.prototype.cleanUp = function () {
            this.UpdateOutCard({ Players: null });
        };
        AntiNoteCardLayer.prototype.setCurRound = function (curRound) {
            this.curRound = curRound;
        };
        //curRound：传了当前局数则每局只播放一次，不传则每次调用都播放
        AntiNoteCardLayer.prototype.Show = function (data) {
            var self = this;
            //每小局只播一次
            if (data.curRound != undefined && this.curRound == data.curRound) {
                return;
            }
            this.curRound = data.curRound;
            self.cleanUp();
            self.setVisible(true);
            self.PlayOutCardAnim(data);
        };
        AntiNoteCardLayer.prototype.Hide = function () {
            this.cleanUp();
            this.setVisible(false);
        };
        return AntiNoteCardLayer;
    }(kaayou.Layer));
    common.AntiNoteCardLayer = AntiNoteCardLayer;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, doBindEvent = _a.doBindEvent, BindEvent = _a.BindEvent;
    var BankruptPanelMgr = /** @class */ (function () {
        function BankruptPanelMgr() {
            this.__selfPanel = null;
            this._zOrder = 0;
        }
        BankruptPanelMgr.getInstance = function (_zOrder) {
            if (_zOrder === void 0) { _zOrder = 0; }
            if (BankruptPanelMgr.__INS__ == null) {
                BankruptPanelMgr.__INS__ = new BankruptPanelMgr();
                BankruptPanelMgr.__INS__.init();
                BankruptPanelMgr.__INS__._zOrder = _zOrder;
            }
            return BankruptPanelMgr.__INS__;
        };
        BankruptPanelMgr.prototype.init = function () {
            var self = this;
            this.__selfPanel = null;
            kaayou.getController('common').on('ui::BankruptPanel::Show', function (e) {
                self.showBankruptPanel(e.data);
            }, this, 10);
            kaayou.getController('common').on('ui::BankruptPanel::Hide', function (e) {
                self.hideBankruptPanel();
            }, this, 10);
            return true;
        };
        BankruptPanelMgr.prototype.getPanel = function (create) {
            if (create === void 0) { create = false; }
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new BankruptPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        };
        BankruptPanelMgr.prototype.showBankruptPanel = function (data) {
            if (!this.__selfPanel) {
                this.__selfPanel = new BankruptPanel();
                kaayou.UIManager.getInstance().getMainScene().addChild(this.__selfPanel);
            }
            this.__selfPanel.Show(data);
        };
        BankruptPanelMgr.prototype.hideBankruptPanel = function () {
            if (this.__selfPanel) {
                this.__selfPanel.removeFromParent();
                this.__selfPanel = null;
            }
        };
        BankruptPanelMgr.__INS__ = null;
        return BankruptPanelMgr;
    }());
    common.BankruptPanelMgr = BankruptPanelMgr;
    var BankruptPanel = /** @class */ (function (_super) {
        __extends(BankruptPanel, _super);
        function BankruptPanel() {
            var _this = _super.call(this) || this;
            _this.btn_close = null;
            _this.label_content = null;
            _this.label_count = null;
            _this.contentPanel = null;
            _this.btn_buy = null;
            _this.label_diamond = null;
            _this.pkg_img = null;
            _this._data = null;
            _this.initWithccs(common.res.bankruptPanel_Json);
            _this.initUI();
            return _this;
        }
        BankruptPanel.prototype.initUI = function () {
            this.isTouchMaskHide = false;
            var self = this;
            this.btn_close = ccui.helper.seekWidgetByName(this.node, "Close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                console.log("点击了关闭");
                kaayou.emit("common", "ui::BankruptPanel::Hide");
                kaayou.emit("common", "mod::GDGame::getallowanceinfo", {
                    ignore_gift: true, callBack: function (info) {
                        console.log(info);
                        if (info && info.data && info.data.allowance) { //  有这个时候弹破产补助
                            kaayou.emit("lobby", "ui::DisposeAllowances::Show", info.data.allowance);
                        }
                        else {
                            //弹破产礼包
                            kaayou.emit("common", "ui::BankruptPanel::Show", info.data.gift);
                        }
                    }
                });
            }, this);
            this.pkg_img = ccui.helper.seekWidgetByName(this.node, "pkg_img");
            this.label_diamond = ccui.helper.seekWidgetByName(this.node, "diamond_label");
            this.label_content = ccui.helper.seekWidgetByName(this.node, "label_content");
            this.contentPanel = ccui.helper.seekWidgetByName(this.node, "contentPanel");
            this.label_count = ccui.helper.seekWidgetByName(this.node, "label_Count");
            this.btn_buy = ccui.helper.seekWidgetByName(this.node, "btn_sure");
            this.btn_buy.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.TouchMask.addTouchMask({ soundtype: kaayou.SoundType.NORMAL, masktime: 1.5 });
                var userInfo = lobby.mod.User.getInstance().getUserInfo();
                if (self._data.price <= userInfo.diamond) {
                    kaayou.emit("lobby", "mod::Mall::ExchangeGiftPkgToGold", { gid: self._data.id, callBack: function () {
                            console.log("----");
                            kaayou.emit("common", "ui::BankruptPanel::Hide");
                            kaayou.emit("common", "ui::GetRewardSusPanel::Show", { name: self._data.details[0].productName });
                        } });
                    return;
                }
                //去检测是否已经购买了。
                kaayou.emit("lobby", "mod::GDGame::check", { callBack: function () {
                        var options = {
                            title: "温馨提示",
                            msg: "\u94BB\u77F3\u4E0D\u8DB3\uFF01\u662F\u5426\u4F7F\u7528\u3010\u00A5" + self._data.zuanshi.price / 100 + "\u3011\u5145\u503C\u3010" + self._data.zuanshi.num + "\u94BB\u77F3\u3011\uFF1F\u5145\u503C\u6210\u529F\u540E\u5C06\u4F1A\u4E3A\u60A8\u81EA\u52A8\u8D2D\u4E70\u3010" + self._data.details[0].productName + "\u3011",
                            close: {
                                isShow: false,
                            },
                            btns: [
                                {
                                    name: "确定",
                                    action: function () {
                                        var expend_num = self._data.price;
                                        var expend_type = 4; //hx写死
                                        var got = [];
                                        lodash.forEach(self._data.details, function (v, i) {
                                            var gotModel = {
                                                wt: Number(v.type),
                                                wn: Number(v.num),
                                            };
                                            got.push(gotModel);
                                        });
                                        var extra = JSON.stringify({
                                            expend_num: Number(expend_num),
                                            expend_type: Number(expend_type),
                                            got: got
                                        });
                                        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                                            kaayou.emit("lobby", "mod::Mall::sendPayBankRupt", { pid: self._data.zuanshi.id, way: 3, extra: extra, grant_type: 3 });
                                        }
                                        else {
                                            kaayou.emit('common', 'ui::ChannelPanel::Show', {
                                                productname: self._data.bagname,
                                                productmoney: "钻石" + self._data.price,
                                                onSelected: function (res) {
                                                    if (res === 'zfb') {
                                                        kaayou.emit("lobby", "mod::Mall::sendPayBankRupt", { pid: self._data.zuanshi.id, way: 2, extra: extra, grant_type: 3 });
                                                    }
                                                    else if (res === 'wx') {
                                                        kaayou.emit("lobby", "mod::Mall::sendPayBankRupt", { pid: self._data.zuanshi.id, way: 1, extra: extra, grant_type: 3 });
                                                    }
                                                    kaayou.emit('common', 'ui::ChannelPanel::Hide');
                                                },
                                                onCancel: function (res) {
                                                }
                                            });
                                        }
                                    },
                                    colorType: 'green'
                                },
                                {
                                    name: "取消",
                                    colorType: 'blue'
                                }
                            ]
                        };
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                    } });
            }, this);
            this.setVisible(false);
        };
        BankruptPanel.prototype.Show = function (data) {
            if (!data) {
                return;
            }
            data.people = data.people || 0;
            var self = this;
            // data = data || {gold:100000};
            this._data = data;
            var RichLabelAiSuper = this.node.getChildByName('label_content');
            if (RichLabelAiSuper) {
                RichLabelAiSuper.removeFromParent();
            }
            this.label_diamond.setString("" + data.price);
            this.label_content.setString(data.desc);
            // RichLabelAiSuper = new ccui.RichText();
            // let str1 = new ccui.RichElementText(1, cc.hexToColor('#B07B43'), 255, '输光了！量身推荐', "Arial", 26);
            // let str2 = new ccui.RichElementText(1, cc.hexToColor('#D44716'), 255, ''+data.exchange_gold_num , "Arial", 26);
            // let str3 = new ccui.RichElementText(1, cc.hexToColor('#B07B43'), 255, '金币超值优惠礼包，翻倍报仇', "Arial", 26);
            // RichLabelAiSuper.pushBackElement(str1);
            // RichLabelAiSuper.pushBackElement(str2);
            // RichLabelAiSuper.pushBackElement(str3);
            // RichLabelAiSuper.setAnchorPoint(cc.p(0.5, 0.5));
            // RichLabelAiSuper.ignoreContentAdaptWithSize(true);
            // RichLabelAiSuper.setPosition(this.label_content.getPosition());
            // RichLabelAiSuper.setVisible(true);
            // this.contentPanel.addChild(RichLabelAiSuper);
            // RichLabelAiSuper.setName('rich_label_ai_super');
            var RichLabelAiSuper1 = this.node.getChildByName('label_Count');
            if (RichLabelAiSuper1) {
                RichLabelAiSuper1.removeFromParent();
            }
            RichLabelAiSuper1 = new ccui.RichText(); //data.purchased_count + data.base_count
            var countStr1 = new ccui.RichElementText(1, cc.hexToColor('#B07B43'), 255, '已有', "Arial", 24);
            var countStr2 = new ccui.RichElementText(1, cc.hexToColor('#D44716'), 255, '' + (data.people), "Arial", 24);
            var countStr3 = new ccui.RichElementText(1, cc.hexToColor('#B07B43'), 255, '人抢购', "Arial", 24);
            RichLabelAiSuper1.pushBackElement(countStr1);
            RichLabelAiSuper1.pushBackElement(countStr2);
            RichLabelAiSuper1.pushBackElement(countStr3);
            RichLabelAiSuper1.setAnchorPoint(cc.p(0.5, 0.5));
            RichLabelAiSuper1.ignoreContentAdaptWithSize(true);
            RichLabelAiSuper1.setPosition(cc.p(this.label_count.getPosition().x - 70 + data.people.toString().length * 8, this.label_count.getPosition().y));
            RichLabelAiSuper1.setVisible(true);
            this.contentPanel.addChild(RichLabelAiSuper1);
            RichLabelAiSuper1.setName('rich_label_ai_super1');
            if (!!data.pic_url && data.pic_url.indexOf('http') == 0) {
                this.pkg_img.setVisible(false);
                NetImage.loadImage(data.pic_url).then(function (tex) {
                    if (!self.pkg_img.isRunning() || !self.isRunning()) {
                        return;
                    }
                    self.pkg_img.getVirtualRenderer().initWithTexture(tex);
                    self.pkg_img.setVisible(true);
                });
            }
            this.setVisible(true);
        };
        return BankruptPanel;
    }(kaayou.ModelLayer));
    common.BankruptPanel = BankruptPanel;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, doBindEvent = _a.doBindEvent, BindEvent = _a.BindEvent;
    var Battery = /** @class */ (function (_super) {
        __extends(Battery, _super);
        function Battery() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.bProgress = null;
            _this.imageCharge = null;
            _this.Text_ping = null;
            _this.Text_ping_num = null;
            _this.saveLevel = 0; //实际电量
            _this.level = 100; //当前显示电量
            //wsname: 网络类型(wifi  4g  none)
            //ms: 网络延时(460表示socket报错了)
            _this.pingData = null;
            _this.timer = 0;
            return _this;
        }
        Battery.prototype.initUi = function (node, pos) {
            _super.prototype.initWithNodeNoClone.call(this, node);
            //
            this.bProgress = ccui.helper.seekWidgetByName(this.node, 'battery_bar');
            this.imageCharge = ccui.helper.seekWidgetByName(this.node, 'battery_charge');
            this.Text_ping = ccui.helper.seekWidgetByName(this.node, 'Text_ping');
            if (this.Text_ping)
                this.Text_ping.setVisible(false);
            this.Text_ping_num = ccui.helper.seekWidgetByName(this.node, 'Text_ping_num');
            if (this.Text_ping_num)
                this.Text_ping_num.setVisible(false);
            if (this.Text_ping_num)
                this.Text_ping_num.ignoreContentAdaptWithSize(true);
            if (this.imageCharge)
                this.imageCharge.setVisible(false);
            this.bindEvent();
            this.setVisible(false);
            if (pos) {
                this.setPosition(pos);
            }
            else {
                this.setPosition(70.5, 72);
            }
            this.unschedule(this.onUpdate);
            this.schedule(this.onUpdate, 1);
        };
        Battery.prototype.bindEvent = function () {
            var self = this;
            // kaayou.getController().on("ui::Battery::showBattery", function (e: kaayou.TouchEvent) {
            //     self.showBattery(e.data);
            // }, this);
            kaayou.getController().on("ui::ping::netStatus", function (e) {
                // self.showPing(e.data);
                self.pingData = e.data;
            }, this);
        };
        Battery.prototype.cleanUp = function () {
        };
        Battery.prototype.onUpdate = function () {
            this.timer++;
            //电池5s刷新一次
            if (this.timer % 5 == 0 && kaayou.PlatformMgr.getInstance().sys.batteryInfo) {
                this.showBattery({ msg: kaayou.PlatformMgr.getInstance().sys.batteryInfo });
            }
            if (this.timer % 2 == 0 && this.pingData) {
                this.showPing(this.pingData);
            }
        };
        Battery.prototype.showBattery = function (batteryData) {
            // console.log('电池状态变化', JSON.stringify(batteryData));
            var data = batteryData.msg;
            this.level = Number(data.level);
            this.saveLevel = Number(data.level);
            this.setVisible(true);
            if (this.bProgress)
                this.bProgress.setPercent(Number(data.level));
            if (data.state == "Charging") {
                if (this.imageCharge)
                    this.imageCharge.setVisible(true);
                this.unschedule(this.playChargingAnim);
                this.schedule(this.playChargingAnim, 0.1);
            }
            else {
                if (this.imageCharge)
                    this.imageCharge.setVisible(false);
                this.unschedule(this.playChargingAnim);
            }
            // if (data.level < 20) {
            //     this.bProgress.getComponent(cc.Sprite).spriteFrame = this.batteryBg[1];
            //     this.bProgress.barSprite.spriteFrame = this.progressBg[1];
            // }else{
            //     this.bProgress.getComponent(cc.Sprite).spriteFrame = this.batteryBg[0];
            //     this.bProgress.barSprite.spriteFrame = this.progressBg[0];
            // }
        };
        Battery.prototype.showPing = function (pingData) {
            var data = pingData;
            //ms：460表示socket报错了
            if (!data || data.ms == 460) {
                return;
            }
            if (!this.Text_ping || !this.Text_ping_num) {
                return;
            }
            this.Text_ping_num.setString(data.ms.toString());
            if (data.ms <= 100) {
                this.Text_ping_num.setColor(cc.color("#00B181"));
            }
            else if (data.ms < 200) {
                this.Text_ping_num.setColor(cc.color("#EAA802"));
            }
            else {
                this.Text_ping_num.setColor(cc.color("#E03007"));
            }
            this.Text_ping_num.setVisible(true);
            this.Text_ping.setVisible(true);
        };
        Battery.prototype.playChargingAnim = function () {
            this.level++;
            if (this.level > 100) {
                this.level = this.saveLevel;
            }
            if (this.bProgress)
                this.bProgress.setPercent(Number(this.level));
        };
        __decorate([
            doBindEvent
        ], Battery.prototype, "initUi", null);
        return Battery;
    }(kaayou.Block));
    common.Battery = Battery;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var BuyCardRecordPanel = /** @class */ (function (_super) {
        __extends(BuyCardRecordPanel, _super);
        function BuyCardRecordPanel() {
            var _this = _super.call(this) || this;
            _this.maskBg = null;
            _this.contentPanel = null;
            _this.Text_lefttime = null; //记牌器剩余天数
            _this.ScrollView = null; //记牌器选择容器
            _this.Panel_cell = null; //记牌器选项模板
            _this.cellInfoArr = null; //服务端发送过来的购买选项信息
            _this.curChooseIndex = 0; //当前选择的下标
            _this.tip_CheckBox = null;
            _this.tipImage_CheckBox = null;
            _this.tip_Layout = null;
            _this.initUI();
            return _this;
        }
        // @doBindEvent
        BuyCardRecordPanel.prototype.initUI = function () {
            this.initWithccs(common.res.BuyCardRecordPanel_json);
            var self = this;
            self.maskBg = ccui.helper.seekWidgetByName(self.node, "maskbg");
            self.contentPanel = ccui.helper.seekWidgetByName(self.node, "contentPanel");
            self.Text_lefttime = ccui.helper.seekWidgetByName(self.node, "Text_lefttime");
            if (self.Text_lefttime)
                self.Text_lefttime.ignoreContentAdaptWithSize(true);
            self.ScrollView = ccui.helper.seekWidgetByName(self.node, "ScrollView");
            if (self.ScrollView) {
                self.ScrollView.setPadding({ left: 65, right: 65, top: 7.5, bottom: 7.5, spacingX: 50 });
                self.ScrollView.setScrollBarEnabled(true);
            }
            self.Panel_cell = ccui.helper.seekWidgetByName(self.node, "Panel_cell");
            self.tip_Layout = ccui.helper.seekWidgetByName(self.node, "checkIp_TipPanel");
            self.tipImage_CheckBox = ccui.helper.seekWidgetByName(self.node, "checkIp_Tip_image");
            self.tip_CheckBox = ccui.helper.seekWidgetByName(self.node, "checkIp_Tip");
            self.tip_CheckBox.on(kaayou.TouchEvent.TouchStart, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.tipImage_CheckBox.visible = true;
            }, this);
            self.tip_CheckBox.on(kaayou.TouchEvent.TouchEnd, function () {
                self.tipImage_CheckBox.visible = false;
            }, this);
            self.tip_CheckBox.on(kaayou.TouchEvent.TouchCance, function () {
                self.tipImage_CheckBox.visible = false;
            }, this);
            //确定购买
            var Button_comfirm = ccui.helper.seekWidgetByName(self.node, "Button_comfirm");
            if (Button_comfirm) {
                Button_comfirm.on(kaayou.TouchEvent.TouchEnd, function (e) {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                    self.Hide();
                    self.ExChangeCardRecord();
                }, this);
            }
            //取消购买
            var Button_cancel = ccui.helper.seekWidgetByName(self.node, "Button_cancel");
            if (Button_cancel) {
                Button_cancel.on(kaayou.TouchEvent.TouchEnd, function (e) {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                    self.Hide();
                }, this);
            }
            kaayou.getController('common').on('ui::BuyCardRecordPanel::ProductSelected', function (e) {
                self.ProductSelected(e.data);
            }, this, 10);
            self.setVisible(false);
        };
        BuyCardRecordPanel.prototype.createCell = function () {
            var self = this;
            var cell = kaayou.pool.getFromPool(BuyCardRecordPanelCell);
            if (!cell) {
                cell = new BuyCardRecordPanelCell();
            }
            cell.initWithNode(self.Panel_cell);
            cell.setAnchorPoint(0.5, 0.5);
            cell.setPositionY(cell.getContentSize().height / 2);
            cell.setChoose(false);
            cell.setVisible(true);
            return cell;
        };
        BuyCardRecordPanel.prototype.getCardRecordUrl = function () {
            return common.mod.Config.GetAppConfig().cardRecordUrl || "";
        };
        BuyCardRecordPanel.prototype.getAppID = function () {
            return common.mod.Config.GetAppConfig().payappid || "kaayou808108913";
        };
        BuyCardRecordPanel.prototype.getAppToken = function () {
            return common.mod.Config.GetAppConfig().payapptoken || "fa4417af2b585565e9e46d4307f83bfa";
        };
        BuyCardRecordPanel.prototype.getSign = function (map, webGameKey) {
            var appId = this.getAppID();
            if (lodash.isEmpty(appId)) {
                return;
            }
            var appToken = this.getAppToken();
            if (lodash.isEmpty(appToken)) {
                return;
            }
            var stringA = "";
            var allKeys = Object.keys(map);
            allKeys.sort();
            for (var x in allKeys) {
                var key = allKeys[x];
                if (stringA == "")
                    stringA += key + "=" + map[key];
                else
                    stringA += "&" + key + "=" + map[key];
            }
            // for (var key in map) {
            //     if (stringA == "") stringA += key + "=" + map[key];
            //     else stringA += "&" + key + "=" + map[key];
            // }
            //let r:string="appid="+this.appId+"&nonce_str="+this.nonce_str+"&platform="+this.platform;
            stringA += (!!webGameKey ? ("&key=" + webGameKey) : ("&key=" + appToken));
            console.log("md5之前签名---" + stringA);
            var sign = kaayou.MD5.encode(stringA).toLowerCase();
            return sign;
        };
        // @BindEvent('common', 'ui::BuyCardRecordPanel::Show')
        BuyCardRecordPanel.prototype.Show = function (modname) {
            return __awaiter(this, void 0, void 0, function () {
                var self, cardRecordUrl, appId, platform, map, sign, res, tempRes, data, left_right, spacingX, i, cell, tempdata, date;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            //console.log("BuyCardRecordPanel self" + self);
                            self.setVisible(true);
                            //面板初始化
                            //先清空容器
                            if (!self.ScrollView || !self.Panel_cell) {
                                self.Hide();
                                return [2 /*return*/, false];
                            }
                            kaayou.pool.putAllChildrenInPool(self.ScrollView);
                            self.ScrollView.removeAllChildren();
                            if (self.tipImage_CheckBox)
                                self.tipImage_CheckBox.visible = false;
                            if (self.tip_CheckBox)
                                self.tip_CheckBox.visible = true;
                            if (self.Text_lefttime)
                                self.Text_lefttime.setString("");
                            cardRecordUrl = this.getCardRecordUrl();
                            if (lodash.isEmpty(cardRecordUrl)) {
                                kaayou.emit('common', 'ui::Toast::Show', { msg: "商品列表地址没有配置，请联系客服" });
                                return [2 /*return*/];
                            }
                            appId = this.getAppID();
                            if (lodash.isEmpty(appId)) {
                                kaayou.emit('common', 'ui::Toast::Show', { msg: "支付地址，请联系客服" });
                                return [2 /*return*/];
                            }
                            platform = cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? "2" : "1";
                            kaayou.emit('common', "ui::Loading::Show");
                            map = {
                                appid: appId,
                                userid: lobby.mod.User.getInstance().getUserInfo().uid.toString(),
                                platform: platform,
                                nonce_str: parseInt(Math.random().toString().substr(2, 10)).toString(16),
                            };
                            sign = this.getSign(map);
                            map["sign"] = sign;
                            return [4 /*yield*/, kaayou.Http.POST(cardRecordUrl + "/circler/api/goods", map)];
                        case 1:
                            res = _a.sent();
                            kaayou.emit("common", "ui::Loading::Hide");
                            tempRes = JSON.parse(res);
                            if (tempRes.status) {
                                kaayou.emit('common', 'ui::Toast::Show', { msg: tempRes.message || "获取记牌器购买信息失败！" });
                                return [2 /*return*/];
                            }
                            data = tempRes.data.recorder;
                            if (!data || data.length == 0) {
                                self.Hide();
                                return [2 /*return*/, false];
                            }
                            left_right = 0;
                            spacingX = 0;
                            if (data.length >= 3) {
                                left_right = 65;
                                spacingX = 50;
                            }
                            else {
                                left_right = (740 - self.Panel_cell.getContentSize().width * data.length) / (data.length + 1);
                                spacingX = left_right;
                            }
                            self.ScrollView.setPadding({ left: left_right, right: left_right, top: 7.5, bottom: 7.5, spacingX: spacingX });
                            self.ScrollView.setScrollBarEnabled(false);
                            //循环创建产品列表
                            self.cellInfoArr = lodash.cloneDeep(data);
                            self.curChooseIndex = 1;
                            for (i = 0; i < data.length; i++) {
                                cell = self.createCell();
                                cell.setInfo(data[i], i + 1);
                                cell.setChoose(i + 1 == self.curChooseIndex);
                                self.ScrollView.addChild(cell);
                            }
                            self.ScrollView.doChildrenLayout();
                            //设置剩余时间
                            kaayou.emit('common', "ui::Loading::Show");
                            return [4 /*yield*/, kaayou.sendMessage(modname, 'toollist', {}, 'ws::Msg::toollist')];
                        case 2:
                            tempdata = _a.sent();
                            kaayou.emit("common", "ui::Loading::Hide");
                            if (!tempdata || tempdata.deadat == undefined) {
                                self.Hide();
                                return [2 /*return*/, false];
                            }
                            if (tempdata.deadat == 0) {
                                self.Text_lefttime.setString("到期时间:未开通");
                            }
                            else {
                                date = new Date(tempdata['deadat'] * 1000).Format('yyyy/MM/dd hh:mm');
                                if (self.Text_lefttime) {
                                    self.Text_lefttime.setString("到期时间:" + date);
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        BuyCardRecordPanel.prototype.ExChangeCardRecord = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self, cardRecordUrl, appId, map, sign, res, tempRes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            if (!self.cellInfoArr || self.cellInfoArr.length <= 0)
                                return [2 /*return*/];
                            if (self.curChooseIndex <= 0 || self.curChooseIndex > self.cellInfoArr.length)
                                return [2 /*return*/];
                            cardRecordUrl = this.getCardRecordUrl();
                            if (lodash.isEmpty(cardRecordUrl)) {
                                return [2 /*return*/];
                            }
                            appId = this.getAppID();
                            if (lodash.isEmpty(appId)) {
                                return [2 /*return*/];
                            }
                            kaayou.emit('common', "ui::Loading::Show");
                            map = {
                                appid: appId,
                                userid: lobby.mod.User.getInstance().getUserInfo().uid.toString(),
                                gid: self.cellInfoArr[self.curChooseIndex - 1].id.toString(),
                                nonce_str: parseInt(Math.random().toString().substr(2, 10)).toString(16),
                            };
                            sign = this.getSign(map);
                            map["sign"] = sign;
                            return [4 /*yield*/, kaayou.Http.POST(cardRecordUrl + "/circler/api/exrecorder", map)];
                        case 1:
                            res = _a.sent();
                            kaayou.emit("common", "ui::Loading::Hide");
                            tempRes = JSON.parse(res);
                            if (tempRes.status == 0) {
                                kaayou.emit('common', 'ui::Toast::Show', { msg: "兑换成功，记牌器功能下局生效" });
                            }
                            else if (tempRes.status == -11) {
                                kaayou.emit('common', 'ui::Toast::Show', { msg: "钻石不足" });
                            }
                            else if (tempRes.status == -10) {
                                kaayou.emit('common', 'ui::Toast::Show', { msg: "兑换失败，请稍后再试" });
                            }
                            else {
                                kaayou.emit('common', 'ui::Toast::Show', { msg: "其他原因，请联系客服" });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        BuyCardRecordPanel.prototype.ProductSelected = function (index) {
            var self = this;
            self.curChooseIndex = index;
            for (var i = 0; i < self.ScrollView.childrenCount; i++) {
                if (i + 1 == index) {
                    self.ScrollView.children[i].setChoose(true);
                }
                else {
                    self.ScrollView.children[i].setChoose(false);
                }
            }
        };
        // @BindEvent('common', 'ui::BuyCardRecordPanel::Hide')
        BuyCardRecordPanel.prototype.Hide = function () {
            this.setVisible(false);
        };
        __decorate([
            BindEvent('common', 'ui::BuyCardRecordPanel::ProductSelected')
        ], BuyCardRecordPanel.prototype, "ProductSelected", null);
        return BuyCardRecordPanel;
    }(kaayou.Layer));
    common.BuyCardRecordPanel = BuyCardRecordPanel;
    var BuyCardRecordPanelCell = /** @class */ (function (_super) {
        __extends(BuyCardRecordPanelCell, _super);
        function BuyCardRecordPanelCell() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.btn_buy = null;
            _this.fnt_date = null;
            _this.fnt_zhuanshi = null;
            _this.Image_choose = null;
            return _this;
        }
        BuyCardRecordPanelCell.prototype.initWithNode = function (node) {
            var self = this;
            _super.prototype.initWithNode.call(this, node);
            self.btn_buy = ccui.helper.seekWidgetByName(self.node, "btn_buy");
            self.btn_buy.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.emit("common", "ui::BuyCardRecordPanel::ProductSelected", self.index);
            }, this);
            self.fnt_date = ccui.helper.seekWidgetByName(self.node, "fnt_date");
            self.fnt_zhuanshi = ccui.helper.seekWidgetByName(self.node, "fnt_zhuanshi");
            self.Image_choose = ccui.helper.seekWidgetByName(self.node, "Image_choose");
            if (self.Image_choose)
                self.Image_choose.visible = false;
        };
        BuyCardRecordPanelCell.prototype.setInfo = function (data, index) {
            var self = this;
            self.index = index;
            self.fnt_date.setString(data.num + "天");
            self.fnt_zhuanshi.setString("X" + data.price);
        };
        BuyCardRecordPanelCell.prototype.setChoose = function (b) {
            var self = this;
            if (self.Image_choose) {
                self.Image_choose.visible = b;
            }
        };
        BuyCardRecordPanelCell.prototype.unuse = function () {
            var self = this;
            self.fnt_date.setString("");
            self.fnt_zhuanshi.setString("");
            self.Image_choose.setVisible(false);
            self.node.removeFromParent();
        };
        return BuyCardRecordPanelCell;
    }(kaayou.Block));
    common.BuyCardRecordPanelCell = BuyCardRecordPanelCell;
})(common || (common = {}));
var common;
(function (common) {
    var ChatLayer = /** @class */ (function (_super) {
        __extends(ChatLayer, _super);
        function ChatLayer(ccsName) {
            var _this = _super.call(this) || this;
            _this._isInit = false;
            _this._emotionScr = null;
            _this._quyuScr = null;
            _this._quyuStrsArray = null;
            _this._curMod = null;
            //聊天面板相关属性,全部都要在initProperties里面赋好值
            _this._rowNum = 0;
            _this._maxNum = 0;
            _this._emotionPosX = null;
            _this._emotionPosY = 0;
            _this._emotionChatLineName = null;
            _this._emotionBgName = null;
            _this._emotionName = null;
            _this._talkNormalCol = null;
            _this._talkPressCol = null;
            _this._isInit = false;
            _this._emotionScr = null;
            _this._quyuScr = null;
            _this._quyuStrsArray = [];
            //聊天面板相关属性,全部都要在initProperties里面赋好值
            _this._rowNum = 0;
            _this._maxNum = 0;
            _this._emotionPosX = [];
            _this._emotionPosY = 0;
            _this._emotionChatLineName = "";
            _this._emotionBgName = "";
            _this._emotionName = "";
            _this._talkNormalCol = cc.color(0, 0, 0, 0);
            _this._talkPressCol = cc.color(0, 0, 0, 0);
            _this.initUI(ccsName);
            return _this;
        }
        ChatLayer.prototype.initUI = function (ccsName) {
            var self = this;
            if (this._isInit)
                return;
            this._isInit = true;
            this.initWithccs(ccsName);
            this.initProperties();
            this.initEmotionScr();
            this.initQuYuScr();
            this.Hide();
            //点击别处隐藏聊天面板
            var hideBG = ccui.helper.seekWidgetByName(this.node, "chatPanel");
            if (hideBG) {
                hideBG.on(kaayou.TouchEvent.TouchEnd, function () {
                    self.Hide();
                }, this);
            }
        };
        ChatLayer.prototype.setCurMod = function (curMod) {
            this._curMod = curMod;
        };
        ChatLayer.prototype.initEmotionScr = function () {
            var self = this;
            //加载表情资源
            this._emotionScr = ccui.helper.seekWidgetByName(this.node, "emotionScr");
            this._emotionScr.setPadding({ spacingY: 0 });
            this._emotionScr.setScrollBarEnabled(true);
            this._emotionScr.setChildrenLayoutDirection(ccui.ScrollView.DIR_VERTICAL);
            var cellPanel = ccui.helper.seekWidgetByName(this._emotionScr, "cellPanel");
            for (var i = 0; i < this._maxNum; i++) {
                //添加分割线
                if (i < this._maxNum - this._maxNum % this._rowNum) {
                    var line = ccui.ImageView.create(this._emotionChatLineName, ccui.Widget.PLIST_TEXTURE);
                    line.setPosition(cellPanel.getContentSize().width * 0.5, -2);
                    cellPanel.addChild(line, 3);
                }
                if (i % this._rowNum == 0 && i != 0) {
                    cellPanel = cellPanel.clone();
                    cellPanel.removeAllChildren();
                    this._emotionScr.addChild(cellPanel);
                }
                //表情背景
                var emotionbg_img = ccui.ImageView.create(this._emotionBgName, ccui.Widget.PLIST_TEXTURE);
                emotionbg_img.setCapInsets(cc.rect(2, 2, 2, 2));
                emotionbg_img.setAnchorPoint(0.5, 0.5);
                emotionbg_img.setVisible(false);
                emotionbg_img.setPosition(this._emotionPosX[i % this._rowNum], this._emotionPosY);
                emotionbg_img.setTag(1000);
                cellPanel.addChild(emotionbg_img, 1, "emotionbg_img_" + i % this._rowNum);
                //表情
                var emotion_img = ccui.ImageView.create("" + this._emotionName + (i + 1) + ".png", ccui.Widget.PLIST_TEXTURE);
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
            this._emotionScr.addEventListener(function (scroll, type) {
                if (type == ccui.ScrollView.EVENT_SCROLLING) {
                    self.resetEmotionScr();
                }
            });
        };
        ChatLayer.prototype.onTouchStartEmotion = function (e) {
            var emotion_img = e.target;
            var emotionbg_img = emotion_img.getParent().getChildByName("emotionbg_img_" + emotion_img.getTag() % this._rowNum);
            emotionbg_img.setVisible(true);
        };
        ChatLayer.prototype.onTouchEndEmotion = function (e) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            var emotion_img = e.target;
            this.resetEmotionScr();
            this.sendEmotionMsg(emotion_img.getTag());
            this.Hide();
        };
        ChatLayer.prototype.resetEmotionScr = function () {
            var cellsArray = this._emotionScr.getChildren();
            for (var i = 0; i < cellsArray.length; i++) {
                var cell = cellsArray[i];
                var children = cell.getChildren();
                for (var j = 0; j < children.length; j++) {
                    if (children[j].getTag() == 1000) {
                        children[j].setVisible(false);
                    }
                }
            }
        };
        ChatLayer.prototype.initQuYuScr = function () {
            var self = this;
            this._quyuScr = ccui.helper.seekWidgetByName(this.node, "quyuScr");
            this._quyuScr.setPadding({ spacingY: 0 });
            this._quyuScr.setScrollBarEnabled(true);
            this._quyuScr.setChildrenLayoutDirection(ccui.ScrollView.DIR_VERTICAL);
            var cellPaneldemo = ccui.helper.seekWidgetByName(this._quyuScr, "cellPanel");
            for (var i = 0; i < this._quyuStrsArray.length; i++) {
                // if (i > 0) {
                //     cellPanel = <ccui.Layout>cellPanel.clone();
                //     this._quyuScr.addChild(cellPanel);
                // }
                var cellPanel = new chatLayerCell();
                // cellPanel.initUi();
                this._quyuScr.addChild(cellPanel);
                cellPanel.setTag(i);
                cellPanel.setTouchEnabled(true);
                cellPanel.on(kaayou.TouchEvent.TouchStart, this.onTouchStartTalk, this);
                cellPanel.on(kaayou.TouchEvent.TouchEnd, this.onTouchEndTalk, this);
                // let talk_text: ccui.Text = ccui.helper.seekWidgetByName(cellPanel, "Text_1");
                // talk_text.ignoreContentAdaptWithSize(true);
                cellPanel.textNormal.setString(i + 1 + "." + this._quyuStrsArray[i]);
                cellPanel.textNormal.setTextColor(this._talkNormalCol);
                cellPanel.textNormal.setVisible(true);
                cellPanel.textPress.setString(i + 1 + "." + this._quyuStrsArray[i]);
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
            this._quyuScr.addEventListener(function (scroll, type) {
                if (type == ccui.ScrollView.EVENT_SCROLLING) {
                    self.resetTalkScr();
                }
            });
        };
        ChatLayer.prototype.onTouchStartTalk = function (e) {
            var cellPanel = e.target;
            // cellPanel.text = Patch.ChangeTextColor(cellPanel.text ,cellPanel.text.getString()  ,this._talkPressCol );
            cellPanel.textNormal.setVisible(false);
            cellPanel.textPress.setVisible(true);
            cellPanel.textBg.setVisible(true);
        };
        ChatLayer.prototype.onTouchEndTalk = function (e) {
            var cellPanel = e.target;
            this.resetTalkScr();
            this.sendTalkMsg(cellPanel.getTag());
            this.Hide();
        };
        ChatLayer.prototype.resetTalkScr = function () {
            var cellsArray = this._quyuScr.getChildren();
            for (var i = 0; i < cellsArray.length; i++) {
                var cellPanel = cellsArray[i];
                cellPanel.textNormal.setVisible(true);
                cellPanel.textPress.setVisible(false);
                cellPanel.textBg.setVisible(false);
            }
        };
        return ChatLayer;
    }(kaayou.ModelLayer));
    common.ChatLayer = ChatLayer;
    var chatLayerCell = /** @class */ (function (_super) {
        __extends(chatLayerCell, _super);
        function chatLayerCell() {
            var _this = _super.call(this) || this;
            _this.textNormal = null;
            _this.textPress = null;
            _this.textBg = null;
            _this.setAnchorPoint(0, 0.5);
            _this.setContentSize(420, 65);
            _this.textBg = new ccui.ImageView();
            _this.textBg.loadTexture("text-l-bg.png", ccui.Widget.PLIST_TEXTURE);
            _this.textBg.setAnchorPoint(0, 0.5);
            _this.textBg.setScale9Enabled(true);
            _this.textBg.setContentSize(_this.getContentSize());
            _this.textBg.setPosition(cc.p(0, _this.getContentSize().height / 2));
            _this.addChild(_this.textBg);
            _this.textNormal = new ccui.Text("", "Arial", 23);
            _this.textNormal.ignoreContentAdaptWithSize(true);
            _this.textNormal.setAnchorPoint(0, 0.5);
            _this.textNormal.setPosition(cc.p(20, _this.getContentSize().height / 2));
            _this.addChild(_this.textNormal);
            _this.textPress = new ccui.Text("", "Arial", 23);
            _this.textPress.ignoreContentAdaptWithSize(true);
            _this.textPress.setAnchorPoint(0, 0.5);
            _this.textPress.setPosition(cc.p(20, _this.getContentSize().height / 2));
            _this.addChild(_this.textPress);
            return _this;
        }
        return chatLayerCell;
    }(ccui.Layout));
    common.chatLayerCell = chatLayerCell;
})(common || (common = {}));
var common;
(function (common) {
    var Chip = /** @class */ (function (_super) {
        __extends(Chip, _super);
        function Chip(bet, bgUrl) {
            var _this = _super.call(this) || this;
            _this._innerNum = 0;
            _this._bgurl = "";
            _this.chipFont = null;
            _this.chipFont = new ccui.Text(_this._innerNum.toString(), "", 15);
            _this.chipFont.setColor(cc.color(0, 0, 0, 255));
            _this.addChild(_this.chipFont);
            _this.initUi(bet, bgUrl);
            return _this;
        }
        Object.defineProperty(Chip.prototype, "InnerNum", {
            get: function () {
                return this._innerNum;
            },
            set: function (value) {
                if (this._innerNum != value) {
                    this._innerNum = value;
                    this.changeChip();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Chip.prototype, "BgUrl", {
            get: function () {
                return this._bgurl;
            },
            set: function (value) {
                if (this._bgurl != value) {
                    this._bgurl = value;
                    this.changeChip();
                }
            },
            enumerable: false,
            configurable: true
        });
        Chip.prototype.initUi = function (bet, bgUrl) {
            this._innerNum = bet;
            this._bgurl = bgUrl;
            this.changeChip();
        };
        Chip.prototype.unuse = function () {
            console.log('unuse');
            this.reset();
            this.removeFromParent();
        };
        Chip.prototype.changeChip = function () {
            this.loadTexture(this._bgurl, ccui.Widget.PLIST_TEXTURE);
            this.chipFont.setString(kaayou.Identify.changeScoreToSortString(this._innerNum));
            this.chipFont.setPosition(this.width / 2, this.height / 2 + 4);
        };
        Chip.prototype.reset = function () {
            this._innerNum = 0;
            this._bgurl = "";
        };
        return Chip;
    }(kaayou.ImageView));
    common.Chip = Chip;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    //    export  class BaseTableViewCell extends kaayou.Block implements ICuttingScrollViewCell{
    //     constructor(){
    //         super();
    //         this.initUI();
    //     }
    //     abstract initUI();
    //     abstract setInfo(info:any);
    //    }
    var CuttingScrollView = /** @class */ (function (_super) {
        __extends(CuttingScrollView, _super);
        function CuttingScrollView() {
            var _this = _super.call(this) || this;
            _this._cellClass = null;
            _this._lastIndex = 0;
            _this._scrollView = null;
            _this._maxCount = 200;
            _this._lastOffsetY = -1;
            _this._lastOffsetX = -1;
            _this.cells = null;
            _this._initIng = false;
            return _this;
        }
        CuttingScrollView.prototype.initUI = function (node, cellClass) {
            this.initWithNodeNoClone(node);
            this.setCellClass(cellClass);
            this._scrollView = this.node;
            this._scrollView.addEventListener(this.onScrollEvent.bind(this));
        };
        CuttingScrollView.prototype.setCellClass = function (cellClass) {
            this._cellClass = cellClass;
        };
        CuttingScrollView.prototype.getCellClass = function () {
            return this._cellClass;
        };
        CuttingScrollView.prototype.setMaxCount = function (n) {
            this._maxCount = n;
        };
        CuttingScrollView.prototype.getCells = function () {
            return this.cells;
        };
        CuttingScrollView.prototype.onScrollEvent = function (scrollview, etype) {
            // console.log(etype);
            if (this._initIng) {
                return;
            }
            if (lodash.isEmpty(this.cells)) {
                return;
            }
            if (etype == ccui.ScrollView.EVENT_CONTAINER_MOVED) {
                if (this._scrollView.getChildrenLayoutDirection() == ccui.Layout.LayoutDirection.Vertical) {
                    if (this._lastOffsetY == -1) {
                        this._lastOffsetY = scrollview.getInnerContainerPosition().y;
                    }
                    else {
                        var bshot = false;
                        var curY = scrollview.getInnerContainerPosition().y;
                        var offset = this._lastOffsetY - curY;
                        do {
                            if (0 == offset) {
                                break;
                            }
                            if (offset < 0) {
                                // console.log('up');
                                bshot = this.doUp(curY);
                            }
                            else {
                                // console.log('down');
                                bshot = this.doDown(curY);
                            }
                            if (bshot) {
                                this.cells.sort(function (a, b) {
                                    return a.getIndex() - b.getIndex();
                                });
                                this.doUpdataList();
                            }
                        } while (0);
                        this._lastOffsetY = curY;
                    }
                }
                else {
                    if (this._lastOffsetX == -1) {
                        this._lastOffsetX = scrollview.getInnerContainerPosition().x;
                    }
                    else {
                        var curX = scrollview.getInnerContainerPosition().x;
                        var offset = this._lastOffsetX - curX;
                        do {
                            var bshot = false;
                            if (0 == offset) {
                                break;
                            }
                            if (offset > 0) {
                                // console.log('left', offset, curX);
                                bshot = this.doLeft(curX);
                            }
                            else {
                                // console.log('right');
                                bshot = this.doRight(curX);
                            }
                            if (bshot) {
                                this.cells.sort(function (a, b) {
                                    return a.getIndex() - b.getIndex();
                                });
                                this.doUpdataList();
                            }
                        } while (0);
                        this._lastOffsetX = curX;
                    }
                }
            }
        };
        CuttingScrollView.prototype.doLeft = function (curX) {
            var spacingX = this._scrollView.getPadding().spacingX;
            var bshot = false;
            var width = this._scrollView.getContentSize().width;
            var cellWidth = this.cells[0].getContentSize().width;
            var self = this;
            lodash.forEach(this.cells, function (v, i) {
                if (curX + v.getLeftBoundary() < -4 * (cellWidth + spacingX)) {
                    bshot = true;
                    v.setIndex(++self._lastIndex);
                    self.setCellPosition(v);
                }
            });
            return bshot;
        };
        CuttingScrollView.prototype.getRange = function () {
            var min = Math.max(0, this._lastIndex - 19);
            var max = Math.min(this._maxCount, this._lastIndex + 1);
            console.log({ min: min, max: max });
            return { min: min, max: max };
        };
        CuttingScrollView.prototype.doUpdataList = function () {
            var range = this.getRange();
            if (range.min < 0) {
                return;
            }
            if (range.max < 1) {
                return;
            }
            if (range.max > this._maxCount) {
                return;
            }
            var e = kaayou.Event.create(kaayou.CustomEvent, "Cutting_Scroll_Change", range);
            this.emit(e, false, true);
        };
        CuttingScrollView.prototype.doRight = function (curX) {
            var spacingX = this._scrollView.getPadding().spacingX;
            var bshot = false;
            var width = this._scrollView.getContentSize().width;
            var cellWidth = this.cells[0].getContentSize().width;
            var self = this;
            lodash.forEach(this.cells, function (v, i) {
                if (curX + v.getRightBoundary() - width > 4 * (cellWidth + spacingX)) {
                    bshot = true;
                    v.setIndex((--self._lastIndex - (self.cells.length - 1)));
                    self.setCellPosition(v);
                }
            });
            return bshot;
        };
        CuttingScrollView.prototype.doUp = function (curY) {
            var spacingY = this._scrollView.getPadding().spacingY;
            var bshot = false;
            var height = this._scrollView.getContentSize().height;
            var cellHgight = this.cells[0].getContentSize().height;
            var self = this;
            lodash.forEach(this.cells, function (v, i) {
                if (curY + v.getTopBoundary() - height > 4 * (cellHgight + spacingY)) {
                    bshot = true;
                    v.setIndex(++self._lastIndex);
                    self.setCellPosition(v);
                }
            });
            return bshot;
        };
        CuttingScrollView.prototype.doDown = function (curY) {
            var spacingY = this._scrollView.getPadding().spacingY;
            var bshot = false;
            var height = this._scrollView.getContentSize().height;
            var cellHgight = this.cells[0].getContentSize().height;
            var self = this;
            lodash.forEach(this.cells, function (v, i) {
                // if(self._lastIndex - (self.cells.length - 1) < 1){return ;}
                if (curY + v.getBottomBoundary() < -4 * (cellHgight + spacingY)) {
                    bshot = true;
                    v.setIndex((--self._lastIndex - (self.cells.length - 1)));
                    self.setCellPosition(v);
                }
            });
            return bshot;
        };
        CuttingScrollView.prototype.setCellPosition = function (cell) {
            var spacingY = this._scrollView.getPadding().spacingY;
            var spacingX = this._scrollView.getPadding().spacingX;
            var allHeight = this._scrollView.getInnerContainerSize().height;
            var allWidth = this._scrollView.getInnerContainerSize().width;
            var top = this._scrollView.getPadding().top;
            var left = this._scrollView.getPadding().left;
            var row = 0;
            var column = 0;
            if (this._scrollView.getChildrenLayoutDirection() == ccui.Layout.LayoutDirection.Vertical) {
                var columnCount = this._scrollView.getGridColumn();
                if (columnCount <= 0) {
                    return;
                }
                row = Math.floor((cell.getIndex()) / columnCount);
                column = cell.getIndex() % columnCount;
            }
            else {
                var rowCount = this._scrollView.getGridRow();
                if (rowCount <= 0) {
                    return;
                }
                row = cell.getIndex() % rowCount;
                ;
                column = Math.floor((cell.getIndex()) / rowCount);
            }
            var y = allHeight - row * spacingY - row * cell.height - ((1.0 - cell.getAnchorPoint().y) * cell.height);
            var x = column * spacingX + column * cell.width + cell.getAnchorPoint().x * cell.width;
            cell.setPositionY(y - top);
            cell.setPositionX(x + left);
            cell.setVisible(!(cell.getIndex() < 0) && !(cell.getIndex() >= this._maxCount));
        };
        CuttingScrollView.prototype.initTables = function () {
            this._initIng = true;
            this.cells = [];
            this._scrollView.removeAllChildren();
            for (var i = 0; i < 20; i++) {
                var cell = new this._cellClass();
                cell.setIndex(i);
                this._scrollView.addChild(cell);
                this.cells.push(cell);
            }
            this.cells.sort(function (a, b) {
                return a.getIndex() - b.getIndex();
            });
            this._lastIndex = 20 - 1;
            if (this._scrollView.getChildrenLayoutDirection() == ccui.Layout.LayoutDirection.Vertical) {
                var rows = Math.ceil(this._maxCount / this._scrollView.getGridColumn());
                var allHeight = rows * (this.cells[0].getContentSize().height + this._scrollView.getPadding().spacingY) - this._scrollView.getPadding().spacingY +
                    this._scrollView.getPadding().top + this._scrollView.getPadding().bottom;
                this._scrollView.setInnerContainerSize(cc.size(this._scrollView.getContentSize().width, allHeight));
            }
            else {
                var columns = Math.ceil(this._maxCount / this._scrollView.getGridRow());
                var allWidth = columns * (this.cells[0].getContentSize().width + this._scrollView.getPadding().spacingX) -
                    this._scrollView.getPadding().spacingX +
                    this._scrollView.getPadding().left + this._scrollView.getPadding().right;
                if (allWidth - this._scrollView.getContentSize().width < this.cells[0].getContentSize().width / 2) {
                    allWidth = this._scrollView.getContentSize().width;
                }
                this._scrollView.setInnerContainerSize(cc.size(allWidth, this._scrollView.getContentSize().height));
            }
            for (var x in this.cells) {
                this.setCellPosition(this.cells[x]);
            }
            if (this._scrollView.getChildrenLayoutDirection() == ccui.Layout.LayoutDirection.Vertical) {
                this._scrollView.scrollToTop(0, false);
            }
            else {
                this._scrollView.scrollToLeft(0, false);
            }
            this._initIng = false;
        };
        CuttingScrollView.prototype.setHorizontal = function (v) {
            this._scrollView.setHorizontal(v);
        };
        CuttingScrollView.prototype.setGrid = function (v) {
            this._scrollView.setGrid(v);
        };
        CuttingScrollView.prototype.setVertical = function (v) {
            this._scrollView.setVertical(v);
        };
        //设置自动排版方向
        CuttingScrollView.prototype.setChildrenLayoutDirection = function (v) {
            this._scrollView.setChildrenLayoutDirection(v);
        };
        //设置自动布局
        CuttingScrollView.prototype.doChildrenLayout = function () {
            this._scrollView.doChildrenLayout();
        };
        //设置grid 布局行
        CuttingScrollView.prototype.setGridRow = function (row) {
            this._scrollView.setGridRow(row);
        };
        //设置瀑布流布局
        CuttingScrollView.prototype.setPinterest = function (b) {
            this._scrollView.setPinterest(b);
        };
        //设置grid 布局列
        CuttingScrollView.prototype.setGridColumn = function (column) {
            this._scrollView.setGridColumn(column);
        };
        CuttingScrollView.prototype.setPadding = function (padding) {
            this._scrollView.setPadding(padding);
        };
        CuttingScrollView.prototype.getPadding = function () {
            return this._scrollView.getPadding();
        };
        return CuttingScrollView;
    }(kaayou.Block));
    common.CuttingScrollView = CuttingScrollView;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var DebugPanel = /** @class */ (function (_super) {
        __extends(DebugPanel, _super);
        function DebugPanel() {
            var _this = _super.call(this) || this;
            _this.btnClear = null;
            _this.btnClose = null;
            _this.checkIndex = 0;
            _this.contentPanel = null;
            _this.isChecking = false;
            _this.maskBg = null;
            _this.msg = "";
            _this.packageUrl = "";
            _this.result = -1;
            _this.svPanel = null;
            _this.msgLabel = null;
            _this.initUI();
            return _this;
        }
        DebugPanel.prototype.hide = function () {
            this.setVisible(false);
        };
        DebugPanel.prototype.initUI = function () {
            this.initWithccs(common.res.DebugPanel_json, true);
            var self = this;
            this.svPanel = ccui.helper.seekWidgetByName(this.node, "svPanel");
            this.svPanel.setPadding({ left: 10, spacingY: 10 });
            this.svPanel.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.svPanel.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.svPanel.setScrollBarEnabled(false);
            this.btnClear = ccui.helper.seekWidgetByName(this.node, "btnClear");
            this.btnClear.setVisible(false);
            this.btnClear.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.msgLabel.setString("");
            }, this);
            this.btnClose = ccui.helper.seekWidgetByName(this.node, "btnClose");
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                this.isChecking = false;
                self.hide();
            }, this);
            this.maskBg = ccui.helper.seekWidgetByName(this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(this.node, "contentPanel");
            this.msgLabel = ccui.helper.seekWidgetByName(this.node, "msgLabel");
            this.setVisible(false);
            this.maskBg.setVisible(false);
        };
        DebugPanel.prototype.check = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self, postUrl, res, _a, localVer, platform, temp, postUrl_1, res_1, oJson;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            self = this;
                            this.isChecking = true;
                            postUrl = "";
                            res = null;
                            _a = this.checkIndex;
                            switch (_a) {
                                case 0: return [3 /*break*/, 1];
                                case 1: return [3 /*break*/, 3];
                                case 2: return [3 /*break*/, 5];
                                case 3: return [3 /*break*/, 7];
                                case 4: return [3 /*break*/, 9];
                                case 5: return [3 /*break*/, 10];
                            }
                            return [3 /*break*/, 11];
                        case 1:
                            //getClientConfig
                            this.show({ msg: "正在检测是否能获取服务器配置...", code: -1, changeLine: false });
                            localVer = kaayou.PlatformMgr.getInstance().sys.GetLocalVersionName();
                            platform = 1;
                            if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
                                platform = 2;
                            }
                            temp = {
                                "data": { ver: localVer, platform: platform },
                                "time": new Date().getTime(),
                                "encrypt": true,
                                "sign": "",
                            };
                            if (temp.encrypt)
                                temp.data = kaayou.AES.encryptPHP(JSON.stringify(temp.data));
                            postUrl_1 = common.mod.Config.ConfigUrl + "/api/configure/getClientConfig";
                            return [4 /*yield*/, kaayou.Http.POST(postUrl_1, { msgdata: JSON.stringify(temp) }, null, null, true)];
                        case 2:
                            res_1 = _b.sent();
                            this.show({ msg: "正常。", code: 0 });
                            return [3 /*break*/, 11];
                        case 3:
                            //getVersion
                            this.show({ msg: "正在检测是否能获取热更版本...", code: -1, changeLine: false });
                            postUrl_1 = common.mod.Config.ConfigUrl + common.mod.Config.CheckUpdateUrl.format({ action: "version", type: "GameLobby" });
                            return [4 /*yield*/, kaayou.Http.GET(postUrl_1, null, false, false)];
                        case 4:
                            res_1 = _b.sent();
                            oJson = JSON.parse(res_1);
                            this.packageUrl = oJson.packageUrl + "GameLobby.zip";
                            this.show({ msg: "正常。", code: 0 });
                            return [3 /*break*/, 11];
                        case 5:
                            //GameLobby.zip
                            this.show({ msg: "正在检测热更包大小...", code: -1, changeLine: false });
                            return [4 /*yield*/, kaayou.PlatformMgr.getInstance().sys.GetFileLength(this.packageUrl)];
                        case 6:
                            res_1 = _b.sent();
                            if (res_1 == "-1") {
                                res_1 = "失败";
                                self.show({ msg: res_1.toString(), code: -1 });
                            }
                            else {
                                self.show({ msg: res_1.toString(), code: 0 });
                            }
                            return [3 /*break*/, 11];
                        case 7:
                            //getOSSZip
                            this.show({ msg: "正在检测是否能获取游戏包...", code: -1, changeLine: false });
                            postUrl_1 = common.mod.Config.ConfigUrl + common.mod.Config.DownloadUrl.format({ keyname: "bmhm" });
                            return [4 /*yield*/, kaayou.Http.GET(postUrl_1, null, false, false)];
                        case 8:
                            res_1 = _b.sent();
                            this.show({ msg: "正常。", code: 0 });
                            return [3 /*break*/, 11];
                        case 9:
                            //bugly
                            this.show({ msg: "正在执行整体检测...", code: -1 });
                            common.mod.Config.LoadAppConfig();
                            return [3 /*break*/, 11];
                        case 10:
                            //bugly
                            this.show({ msg: "正在发送检测数据...", code: -1, changeLine: false });
                            setTimeout(function () {
                                kaayou.sendLog();
                                self.show({ msg: "完成。", code: 0 });
                            }, 1000);
                            return [3 /*break*/, 11];
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        //data.result=0就开始下一项检测
        DebugPanel.prototype.ShowMsg = function (data) {
            if (data.code == undefined)
                data.code = 0;
            this.show({ msg: data.msg, code: data.code });
        };
        DebugPanel.prototype.startCheck = function () {
            return __awaiter(this, void 0, void 0, function () {
                var phoneBrand, now, res, ip, oRes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            phoneBrand = kaayou.PlatformMgr.getInstance().sys.getPhoneBrand();
                            this.msg = phoneBrand + "\n";
                            now = new Date(Date.now()).format("yyyy-MM-dd hh:mm:ss");
                            this.msg += now + "\n";
                            return [4 /*yield*/, kaayou.Http.GET(common.mod.Config.ConfigUrl + "/api/ip/get", null, false, false)];
                        case 1:
                            res = _a.sent();
                            ip = "未知";
                            if (!!res) {
                                oRes = JSON.parse(res);
                                if (oRes.code == 0) {
                                    ip = oRes.data.ip;
                                }
                            }
                            this.msg += "IP:" + ip + "\n";
                            this.msg += "正在进行单项检测..." + "\n";
                            this.msgLabel.setString(this.msg);
                            this.checkIndex = 0;
                            this.check();
                            return [2 /*return*/];
                    }
                });
            });
        };
        DebugPanel.prototype.show = function (data) {
            if (!this.isChecking)
                return;
            if (!data) {
                return false;
            }
            if (!data.msg) {
                return false;
            }
            if (data.changeLine == undefined)
                data.changeLine = true;
            this.result = data.code;
            this.msg += data.msg;
            if (data.changeLine)
                this.msg += "\n";
            this.msgLabel.setString(this.msg);
            this.msgLabel.ignoreContentAdaptWithSize(true);
            this.svPanel.doChildrenLayout();
            this.svPanel.scrollToBottom(0, false);
            if (this.result == 0) {
                this.checkIndex++;
                this.check();
            }
            this.setVisible(true);
        };
        __decorate([
            BindEvent('common', 'ui::DebugPan00el::Hide')
        ], DebugPanel.prototype, "hide", null);
        __decorate([
            doBindEvent
        ], DebugPanel.prototype, "initUI", null);
        __decorate([
            BindEvent('common', 'ui::DebugPanel::ShowMsg')
        ], DebugPanel.prototype, "ShowMsg", null);
        __decorate([
            BindEvent('common', 'ui::DebugPanel::Check')
        ], DebugPanel.prototype, "startCheck", null);
        __decorate([
            BindEvent('common', 'ui::DebugPanel::Show')
        ], DebugPanel.prototype, "show", null);
        return DebugPanel;
    }(kaayou.Layer));
    common.DebugPanel = DebugPanel;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var DialogManager = /** @class */ (function () {
        function DialogManager() {
            this._zOrder = 0;
            this._dialogsIndex = 1;
        }
        DialogManager.getInstance = function (_zOrder) {
            if (DialogManager.__INS__ == null) {
                DialogManager.__INS__ = new DialogManager();
                DialogManager.__INS__.init();
                DialogManager.__INS__._zOrder = _zOrder;
            }
            return DialogManager.__INS__;
        };
        DialogManager.prototype.init = function () {
            var self = this;
            this._dialogs = {};
            kaayou.getController('common').on('ui::Dialog::Show', function (e) {
                self.DialogShow(e.data);
            }, this, 10);
            kaayou.getController('common').on('ui::Dialog::Removed', function (e) {
                self.DialogRemoved(e.data);
            }, this, 10);
            kaayou.getController('common').on('ui::Dialog::Hide', function (e) {
                self.DialogHide(e.data);
            }, this, 10);
            return true;
        };
        DialogManager.prototype.DialogShow = function (data) {
            if (data.ismutual) {
                var di = this.GetDialogByMutualKey(data.mutualkey || '__NULL__');
                if (di) {
                    di.Show(data);
                    return;
                }
            }
            var dialog = new common.DialogPanel();
            dialog.setIndex(this._dialogsIndex++);
            dialog.setMutualKey(data.mutualkey || "");
            this._dialogs[dialog.getIndex()] = dialog;
            kaayou.UIManager.getInstance().getMainScene().addChild(dialog, this._zOrder);
            dialog.Show(data);
        };
        DialogManager.prototype.GetDialogByMutualKey = function (mutualKey) {
            var dialog = null;
            for (var x in this._dialogs) {
                if (mutualKey == this._dialogs[x].getMutualKey()) {
                    dialog = this._dialogs[x];
                    break;
                }
            }
            return dialog;
        };
        DialogManager.prototype.DialogHide = function (data) {
            for (var x in this._dialogs) {
                this._dialogs[x].Hide();
            }
        };
        DialogManager.prototype.DialogRemoved = function (data) {
            var dialog = this._dialogs[data.index];
            this._dialogs[data.index] = null;
            delete this._dialogs[data.index];
            if (dialog && dialog.isRunning()) {
                dialog.removeFromParent();
            }
        };
        DialogManager.__INS__ = null;
        return DialogManager;
    }());
    common.DialogManager = DialogManager;
    var DialogPanel = /** @class */ (function (_super) {
        __extends(DialogPanel, _super);
        function DialogPanel() {
            var _this = _super.call(this) || this;
            _this.maskBg = null;
            _this.contentPanel = null;
            _this.btnPanel = null;
            _this.btn_close = null;
            _this.msgLabel = null;
            _this.titleLabel = null;
            _this.btnArr = null;
            _this.btnCall = null;
            _this.close_call = null;
            _this._index = -1;
            _this._mutualkey = "";
            _this.initUI();
            return _this;
        }
        // @doBindEvent
        DialogPanel.prototype.initUI = function () {
            this.initWithccs(common.res.DialogPanel_json);
            var self = this;
            this.maskBg = ccui.helper.seekWidgetByName(this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(this.node, "contentPanel");
            this.btnPanel = ccui.helper.seekWidgetByName(this.node, "btnPanel");
            this.btn_close = ccui.helper.seekWidgetByName(this.node, "btn_close");
            this.titleLabel = ccui.helper.seekWidgetByName(this.node, "titleLabel");
            this.msgLabel = ccui.helper.seekWidgetByName(this.node, "msgLabel");
            this.btnArr = this.btnPanel.children;
            for (var i = 0; i < this.btnArr.length; i++) {
                this.btnArr[i].setVisible(false);
                this.btnArr[i]['index'] = i;
                this.btnArr[i].on(kaayou.TouchEvent.TouchEnd, function (e) {
                    //kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    var index = e.target['index'];
                    var c = self.btnCall[index] || null;
                    if (c) {
                        if (false === c()) {
                            var i_2 = 0;
                        }
                        else {
                            self.Hide();
                        }
                    }
                    else {
                        self.Hide();
                    }
                }, self);
            }
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                var c = self.close_call || null;
                if (c) {
                    if (false === c()) {
                    }
                    else {
                        self.Hide();
                    }
                }
                else {
                    self.Hide();
                }
            }, this);
            this.btn_close.setVisible(false);
            this.setVisible(false);
        };
        // @BindEvent('common', 'ui::Dialog::Show')
        DialogPanel.prototype.Show = function (data) {
            if (!data) {
                this.Hide();
                return false;
            }
            if (!data.msg) {
                this.Hide();
                return false;
            }
            for (var x in this.btnArr) {
                this.btnArr[x].setVisible(false);
            }
            // showAni(this.node.getChildByName("bg"),this.node.getChildByName("mask"));
            //设置回和大厅一样的默认值10110，需要修改则人工赋值
            // this.node.setLocalZOrder(10110);
            var default_BtnOptions_One = { name: "确定", action: null, colorType: 'blue', x: 235, y: 0 };
            var default_BtnOptions = [
                { name: "确定", action: null, colorType: 'green', x: 101, y: 0 },
                { name: "取消", action: null, colorType: 'blue', x: 369.00, y: 0 }
            ];
            // let default_2 = { name: "取消", action: null, colorType: 0 };
            data.title = data.title || "温馨提示";
            data.close = data.close || { isShow: false, action: null };
            data.btns = data.btns || [];
            if (!lodash.isArray(data.btns)) {
                return;
            }
            if (data.btns.length <= 1) {
                data.btns[0] = lodash.extend({}, default_BtnOptions_One, data.btns[0] || {});
            }
            else {
                for (var x in data.btns) {
                    if (Number(x) > 1) {
                        kaayou.addLog("对话框按钮超过了2个");
                        return;
                    }
                    data.btns[x] = lodash.extend({}, default_BtnOptions[Number(x)], data.btns[Number(x)]);
                }
            }
            this.btnCall = [];
            for (var x in data.btns) {
                var i = Number(x);
                if (i > 1) {
                    return;
                }
                var colorStr = data.btns[i].colorType;
                this.btnCall[i] = data.btns[i].action || null;
                this.btnArr[i].setVisible(true);
                Patch.ChangeTextBMFontFntFile(this.btnArr[i].getChildByName("label"), Patch.Dithering(data.btns[i]["name"]), common.FontRes[colorStr]);
                this.btnArr[i].loadTextureNormal(common.BtnResNames[colorStr] + ".png", ccui.Widget.PLIST_TEXTURE);
                this.btnArr[i].loadTexturePressed(common.BtnResNames[colorStr] + "_deep.png", ccui.Widget.PLIST_TEXTURE);
                // this.btnArr[i].loadTextureNormal(`btn_${data.btns[i].colorType}.png`,ccui.Widget.PLIST_TEXTURE);
                // this.loadTexture(`${MaJonCard.res_prefix}.${color}_${direction}_${cardtype}_${cover}board.png`, ccui.Widget.PLIST_TEXTURE);
                // this.btnArr[i].getComponent(cc.Sprite).spriteFrame = this.btnAtlas.getSpriteFrame(`btn_${data.btns[i].colorType}`);
                // this.btnArr[i].getComponent(cc.Button).normalSprite = this.btnAtlas.getSpriteFrame(`btn_${data.btns[i].colorType}`);
                // this.btnArr[i].getComponent(cc.Button).pressedSprite = this.btnAtlas.getSpriteFrame(`btn_${data.btns[i].colorType}_deep`);;
                this.btnArr[i].setPositionX(data.btns[i]['x']);
                // this.btnArr[i].x = data.btns[i]['x'];
                // this.btnArr[i].y = data.btns[i]['y'];
            }
            this.btn_close.setVisible(!!data.close.isShow);
            this.close_call = data.close["action"];
            this.titleLabel.setString(data.title);
            this.msgLabel.setString(data.msg);
            if (data.localZOrder) {
                this.node.setLocalZOrder(data.localZOrder);
            }
            this.setVisible(true);
            data.onshow && data.onshow(this.getIndex(), this);
            // showAni({
            //     cNode: this.node.getChildByName("ChildNode"),
            //     mNode: this.node.getChildByName("mask")
            // });
        };
        DialogPanel.prototype.setMutualKey = function (mutualkey) {
            this._mutualkey = mutualkey;
        };
        DialogPanel.prototype.getMutualKey = function () {
            return this._mutualkey;
        };
        DialogPanel.prototype.setIndex = function (index) {
            this._index = index;
        };
        DialogPanel.prototype.getIndex = function () {
            return this._index;
        };
        // @BindEvent('common', 'ui::Dialog::Hide')
        DialogPanel.prototype.Hide = function () {
            // hideAni({
            //     cNode: this.node.getChildByName("ChildNode"),
            //     mNode: this.node.getChildByName("mask"),
            //     rnode: this.node,
            // })
            this.close_call = null;
            this.btnCall = null;
            // this.setVisible(false);
            // this.removeFromParent(true);
            // this.node.active = false;
            kaayou.emit('common', 'ui::Dialog::Removed', { index: this.getIndex() });
        };
        return DialogPanel;
    }(kaayou.Layer));
    common.DialogPanel = DialogPanel;
})(common || (common = {}));
var common;
(function (common) {
    var DissRoomLayer = /** @class */ (function (_super) {
        __extends(DissRoomLayer, _super);
        function DissRoomLayer(ccs, mod) {
            var _this = _super.call(this) || this;
            _this.successBtn = null;
            _this.cancelBtn = null;
            _this._timeText = null;
            _this._tishiBg = null;
            _this._waitNode = null;
            _this._pNode = null;
            _this._pBoxs = [];
            _this._t = null;
            _this._overTime = 0;
            _this._curmod = null;
            _this.initWithccs(ccs);
            _this.setVisible(false);
            _this._curmod = mod;
            return _this;
        }
        DissRoomLayer.prototype.initUi = function () {
            var self = this;
            this._timeText = ccui.helper.seekWidgetByName(this.node, "timeText");
            this._tishiBg = ccui.helper.seekWidgetByName(this.node, "tishiBg");
            this._pNode = ccui.helper.seekWidgetByName(this.node, "Pnode");
            this._pNode.setPadding({ left: 106.5, right: 106.5, spacingX: 170 });
            this._pNode.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this._pBoxs = this._pNode.children;
            this.successBtn = ccui.helper.seekWidgetByName(this.node, "successBtn");
            this.successBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes["Click_btn_close"]);
                self._curmod.sendDissResult({ isAgree: true });
            }, this);
            this.cancelBtn = ccui.helper.seekWidgetByName(this.node, "cancelBtn");
            this.cancelBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes["Click_btn_close"]);
                self._curmod.sendDissResult({ isAgree: false });
            }, this);
            this._timeText.string = '';
            this._timeText.ignoreContentAdaptWithSize(true);
            this._waitNode = ccui.helper.seekWidgetByName(this.node, "waitBg");
            this._waitNode.setVisible(false);
            for (var i = 0; i < this._pBoxs.length; i++) {
                this._pBoxs[i].getChildByName('NameText').ignoreContentAdaptWithSize(true);
                this._pBoxs[i].getChildByName('StateText').ignoreContentAdaptWithSize(true);
            }
            this.cleanUp();
        };
        DissRoomLayer.prototype.show = function (data) {
            if (!data)
                return;
            this.setVisible(true);
            this.updateInfo(data.Players, data.myServerchair);
            if (!data.isCan) {
                this.successBtn.setVisible(false);
                this.cancelBtn.setVisible(false);
                this._waitNode.setVisible(true);
            }
            if (data.leftTime) {
                this.setTime(data.leftTime);
                this.setVisible(true);
            }
            if (this._t) {
                clearInterval(this._t);
                this._t = null;
            }
            var self = this;
            this._t = setInterval(function () {
                var leftTime = Math.floor((self._overTime - (new Date()).getTime()) / 1000);
                if (leftTime >= 0) {
                    self._timeText.string = leftTime + '秒后将解散房间';
                }
                else {
                    self._timeText.string = "";
                }
            }, 500);
        };
        DissRoomLayer.prototype.cleanUp = function () {
            this._overTime = 0;
            if (this._t) {
                clearInterval(this._t);
                this._t = null;
            }
            this.setVisible(false);
            for (var x in this._pBoxs) {
                this._pBoxs[x].getChildByName('NameText').string = "";
                this._pBoxs[x].getChildByName('StateText').string = "";
                this._pBoxs[x].getChildByName('sqjs').setVisible(false);
                this._pBoxs[x].setVisible(false);
            }
        };
        DissRoomLayer.prototype.close = function () {
            this.cleanUp();
        };
        DissRoomLayer.prototype.updateInfo = function (players, myServerchair) {
            var sendIndex = -1;
            for (var i = 0; i < players.length; i++) {
                if (!players[i])
                    continue;
                if (players[i].dismissState == common.mod.DismissRoomState.DISMISS_CREATOR) {
                    sendIndex = i;
                    break;
                }
            }
            if (sendIndex == myServerchair) {
                this.cancelBtn.setVisible(false);
                this.successBtn.setVisible(false);
                this._waitNode.setVisible(true);
            }
            else {
                this.cancelBtn.setVisible(true);
                this.successBtn.setVisible(true);
                this._waitNode.setVisible(false);
            }
            this.updatePlayer(players);
        };
        DissRoomLayer.prototype.setTime = function (leftTime) {
            this._overTime = leftTime * 1000 + (new Date()).getTime();
        };
        DissRoomLayer.prototype.updatePlayer = function (players) {
            cc.log('ssssss', players);
            var statusString = {};
            statusString[common.mod.DismissRoomState.WATING] = "(等待)";
            statusString[common.mod.DismissRoomState.AGREE] = "同意";
            statusString[common.mod.DismissRoomState.DISMISS_CREATOR] = "申请人";
            statusString[common.mod.DismissRoomState.DISAGREE] = "拒绝";
            var statusColor = {};
            statusColor[common.mod.DismissRoomState.WATING] = "#000000";
            statusColor[common.mod.DismissRoomState.AGREE] = "#50C30E";
            statusColor[common.mod.DismissRoomState.DISMISS_CREATOR] = "#ff00ff";
            statusColor[common.mod.DismissRoomState.DISAGREE] = "#ff0000";
            for (var i = 0; i < this._pBoxs.length; i++) {
                if (!players[i]) {
                    this._pBoxs[i].setVisible(false);
                    continue;
                }
                NetImage.setPlayerHead(this._pBoxs[i].getChildByName('headImg'), players[i].imgurl, players[i].sex);
                var tempNickName = kaayou.Identify.nickNameSubFive(players[i].name);
                this._pBoxs[i].getChildByName('NameText').string = tempNickName;
                this._pBoxs[i].getChildByName('StateText').setTextColor(cc.hexToColor(statusColor[players[i].dismissState] || "#000000"));
                this._pBoxs[i].getChildByName('StateText').string = statusString[players[i].dismissState] || "";
                if (players[i].dismissState == common.mod.DismissRoomState.WATING) {
                    if (players[i].userStatus == common.mod.GR_US_Status.US_OFFLINE) {
                        this._pBoxs[i].getChildByName('StateText').string = "(离线)";
                        this._pBoxs[i].getChildByName('StateText').setTextColor(cc.color(255, 0, 0));
                    }
                    else {
                        this._pBoxs[i].getChildByName('StateText').string = statusString[players[i].dismissState] || "";
                    }
                }
                else {
                    this._pBoxs[i].getChildByName('StateText').string = statusString[players[i].dismissState] || "";
                }
                this._pBoxs[i].getChildByName('sqjs').setVisible(players[i].dismissState == common.mod.DismissRoomState.DISMISS_CREATOR);
                this._pBoxs[i].setVisible(true);
            }
            this._pNode.doChildrenLayout();
        };
        return DissRoomLayer;
    }(kaayou.Layer));
    common.DissRoomLayer = DissRoomLayer;
})(common || (common = {}));
var common;
(function (common) {
    var FewerOpen = /** @class */ (function (_super) {
        __extends(FewerOpen, _super);
        function FewerOpen(ccs, mod) {
            var _this = _super.call(this) || this;
            _this.successBtn = null;
            _this.cancelBtn = null;
            _this._timeText = null;
            _this._tishiBg = null;
            _this._waitNode = null;
            _this._pNode = null;
            _this._pBoxs = [];
            _this._t = null;
            _this._overTime = 0;
            _this._curmod = null;
            _this.initWithccs(ccs);
            _this.setVisible(false);
            _this._curmod = mod;
            return _this;
        }
        FewerOpen.prototype.initUi = function () {
            var self = this;
            this._timeText = ccui.helper.seekWidgetByName(this.node, "timeText");
            this._tishiBg = ccui.helper.seekWidgetByName(this.node, "tishiBg");
            this._pNode = ccui.helper.seekWidgetByName(this.node, "Pnode");
            this._pNode.setPadding({ left: 106.5, right: 106.5, spacingX: 170 });
            this._pNode.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this._pBoxs = this._pNode.children;
            this.successBtn = ccui.helper.seekWidgetByName(this.node, "successBtn");
            this.successBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes["Click_btn_close"]);
                self._curmod.sendFewerresult({ isAgree: true });
            }, this);
            this.cancelBtn = ccui.helper.seekWidgetByName(this.node, "cancelBtn");
            this.cancelBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes["Click_btn_close"]);
                self._curmod.sendFewerresult({ isAgree: false });
            }, this);
            this._timeText.string = '';
            this._waitNode = ccui.helper.seekWidgetByName(this.node, "waitBg");
            this._waitNode.setVisible(false);
            for (var i = 0; i < this._pBoxs.length; i++) {
                this._pBoxs[i].getChildByName('NameText').ignoreContentAdaptWithSize(true);
                this._pBoxs[i].getChildByName('StateText').ignoreContentAdaptWithSize(true);
            }
            this.cleanUp();
        };
        FewerOpen.prototype.show = function (data) {
            if (!data)
                return;
            this.updateInfo(data.Players, data.myServerchair);
            if (!data.isCan) {
                this.successBtn.setVisible(false);
                this.cancelBtn.setVisible(false);
                this._waitNode.setVisible(true);
            }
            if (data.isShow) {
                this.setVisible(true);
            }
            this._timeText.string = "申请" + (data.srkjNum == 2 ? "二" : "三") + "人模式";
        };
        FewerOpen.prototype.cleanUp = function () {
            this._overTime = 0;
            this.setVisible(false);
            for (var x in this._pBoxs) {
                this._pBoxs[x].getChildByName('NameText').string = "";
                this._pBoxs[x].getChildByName('StateText').string = "";
                this._pBoxs[x].getChildByName('sqjs').setVisible(false);
                this._pBoxs[x].setVisible(false);
            }
        };
        FewerOpen.prototype.close = function () {
            this.cleanUp();
        };
        FewerOpen.prototype.updateInfo = function (players, myServerchair) {
            var sendIndex = -1;
            for (var i = 0; i < players.length; i++) {
                if (!players[i])
                    continue;
                if (players[i].fewerState == common.mod.FewerState.Fewer_CREATOR) {
                    sendIndex = i;
                    break;
                }
            }
            if (sendIndex == myServerchair) {
                this.cancelBtn.setVisible(false);
                this.successBtn.setVisible(false);
                this._waitNode.setVisible(true);
            }
            else {
                this.cancelBtn.setVisible(true);
                this.successBtn.setVisible(true);
                this._waitNode.setVisible(false);
            }
            this.updatePlayer(players);
        };
        // setTime(leftTime: number) {
        //     this._overTime = leftTime * 1000 + (new Date()).getTime();
        // }
        FewerOpen.prototype.updatePlayer = function (players) {
            cc.log('ssssss', players);
            var statusString = {};
            statusString[common.mod.FewerState.WATING] = "(等待)";
            statusString[common.mod.FewerState.AGREE] = "同意";
            statusString[common.mod.FewerState.Fewer_CREATOR] = "申请人";
            statusString[common.mod.FewerState.DISAGREE] = "拒绝";
            var statusColor = {};
            statusColor[common.mod.FewerState.WATING] = "#000000";
            statusColor[common.mod.FewerState.AGREE] = "#50C30E";
            statusColor[common.mod.FewerState.Fewer_CREATOR] = "#ff00ff";
            statusColor[common.mod.FewerState.DISAGREE] = "#ff0000";
            for (var i = 0; i < this._pBoxs.length; i++) {
                if (!players[i]) {
                    this._pBoxs[i].setVisible(false);
                    continue;
                }
                NetImage.setPlayerHead(this._pBoxs[i].getChildByName('headImg'), players[i].imgurl, players[i].sex);
                var tempNickName = kaayou.Identify.nickNameSubFive(players[i].name);
                this._pBoxs[i].getChildByName('NameText').string = tempNickName;
                this._pBoxs[i].getChildByName('StateText').setTextColor(cc.hexToColor(statusColor[players[i].fewerState] || "#000000"));
                this._pBoxs[i].getChildByName('StateText').string = statusString[players[i].fewerState] || "";
                if (players[i].fewerState == common.mod.FewerState.WATING) {
                    if (players[i].userStatus == common.mod.GR_US_Status.US_OFFLINE) {
                        this._pBoxs[i].getChildByName('StateText').string = "(离线)";
                        this._pBoxs[i].getChildByName('StateText').setTextColor(cc.color(255, 0, 0));
                    }
                    else {
                        this._pBoxs[i].getChildByName('StateText').string = statusString[players[i].fewerState] || "";
                    }
                }
                else {
                    this._pBoxs[i].getChildByName('StateText').string = statusString[players[i].fewerState] || "";
                }
                this._pBoxs[i].getChildByName('sqjs').setVisible(players[i].fewerState == common.mod.FewerState.Fewer_CREATOR);
                this._pBoxs[i].setVisible(true);
            }
            this._pNode.doChildrenLayout();
        };
        return FewerOpen;
    }(kaayou.Layer));
    common.FewerOpen = FewerOpen;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var FriendBaseScene = /** @class */ (function (_super) {
        __extends(FriendBaseScene, _super);
        function FriendBaseScene() {
            var _this = _super.call(this) || this;
            _this.curMod = null;
            _this.gameState = 0;
            _this.playerLayer = null;
            _this.readyTime = null;
            _this.comeTime = null;
            //界面公用Ui按钮
            _this.btn_menu = null;
            _this.btn_chat = null;
            _this.btn_mic = null;
            _this.btn_gps = null;
            _this.btn_ready = null;
            _this.btn_invite = null;
            _this.ksrkj = null;
            _this.tog_ksrkj2 = null;
            _this.tog_ksrkj3 = null;
            //
            _this.inviteLayer = null;
            //实时语音加入成功后的房间号
            _this.iGVoiceRoomId = 0;
            //实时语音房间麦克风/喇叭状态
            _this.bGVoiceMicStaCur = false; //麦克风权限
            _this.bGVoiceStaMicNext = false;
            // bGVoiceStaCur: boolean = false;
            _this.bGVoiceSpeakerStaCur = false; //扬声器权限
            _this.bGVoiceStaSpeakerNext = false;
            _this.iGvoiceStaCnt = 0; //开麦/喇叭时可尝试次数，避免没给权限时，导致开麦失败然后一直重试开麦
            return _this;
            // this.initUI();
        }
        // @doBindEvent
        FriendBaseScene.prototype.initUI = function () {
            var self = this;
            cc.spriteFrameCache.addSpriteFrames(common.res.gps_plist);
            cc.spriteFrameCache.addSpriteFrames(common.res.magicEmotion_plist);
            this.btn_invite = ccui.helper.seekWidgetByName(this.node, "btn_invite");
            this.btn_invite.visible = false;
            this.btn_ready = ccui.helper.seekWidgetByName(this.node, "btn_ready");
            this.btn_ready.visible = false;
            this.readyTime = ccui.helper.seekWidgetByName(this.node, "Text_time");
            //200309zyx
            if (this.readyTime)
                this.readyTime.ignoreContentAdaptWithSize(true);
            this.btn_menu = ccui.helper.seekWidgetByName(this.node, "btn_menu");
            this.btn_chat = ccui.helper.seekWidgetByName(this.node, "btn_chat");
            this.btn_mic = ccui.helper.seekWidgetByName(this.node, "btn_mic");
            this.btn_gps = ccui.helper.seekWidgetByName(this.node, "btn_gps");
            this.ksrkj = ccui.helper.seekWidgetByName(this.node, "font_KSRKJ");
            if (this.ksrkj) {
                this.ksrkj.visible = false;
            }
            this.tog_ksrkj2 = ccui.helper.seekWidgetByName(this.node, "OPEN_KSRKJ2");
            if (this.tog_ksrkj2) {
                this.tog_ksrkj2.visible = false;
            }
            this.tog_ksrkj3 = ccui.helper.seekWidgetByName(this.node, "OPEN_KSRKJ3");
            if (this.tog_ksrkj3) {
                this.tog_ksrkj3.visible = false;
            }
            cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function () {
                cc.log("游戏进入后台");
                kaayou.emit(self.curMod.getModuleName(), "ui::MjTable::backGround");
                kaayou.NetManager.getInstance().getSocket(self.curMod.getModuleName()).close({ Initiative: false });
                if (self.curMod && self.curMod._eventQueue) {
                    console.log("清理消息队列：", self.curMod.getModuleName());
                    self.curMod._eventQueue.release();
                }
                //如果加入了实时语音房间，后台时暂停语音
                if (self.iGVoiceRoomId) {
                    kaayou.PlatformMgr.getInstance().gvoice.pause();
                }
            });
            cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function () {
                cc.log("重新返回游戏");
                //如果加入了实时语音房间，返回游戏时继续语音
                if (self.iGVoiceRoomId) {
                    kaayou.PlatformMgr.getInstance().gvoice.resume();
                }
            });
        };
        FriendBaseScene.prototype.OnUpdateGVoiceEnterRoom = function () {
            if (this.curMod.getTableInfo() && this.curMod.getTableInfo().tableid && this.curMod.getTableInfo().gameconfig["gvoice"] == "true" && !this.iGVoiceRoomId) {
                //加入实时语音房间成功后，会收到 OnGvoiceJoinRoomOK 消息通知
                kaayou.PlatformMgr.getInstance().gvoice.EnterRoom(this.curMod.getTableInfo().tableid.toString());
            }
            else {
                this.unschedule(this.OnUpdateGVoiceEnterRoom);
            }
        };
        FriendBaseScene.prototype.onReEnter = function () {
            if (this.ksrkj) {
                this.ksrkj.setVisible(false);
            }
            if (this.tog_ksrkj2) {
                this.tog_ksrkj2.setVisible(false);
            }
            if (this.tog_ksrkj3) {
                this.tog_ksrkj3.setVisible(false);
            }
            if (this.inviteLayer) {
                this.inviteLayer.setVisible(false);
            }
            kaayou.PlatformMgr.getInstance().sys.GetBatteryInfo();
            //实时语音
            this.iGVoiceRoomId = 0;
            this.bGVoiceStaMicNext = false;
            this.bGVoiceStaSpeakerNext = false;
            this.iGvoiceStaCnt = 0;
            this.bGVoiceMicStaCur = false;
            this.bGVoiceSpeakerStaCur = false;
            if (this.curMod.tableInfo.gameconfig["gvoice"] == "true" && !this.curMod.getIsGuest()) {
                this.bindGVoiceEvents();
                this.unschedule(this.OnUpdateGVoiceEnterRoom);
                this.schedule(this.OnUpdateGVoiceEnterRoom, 3);
                this.OnUpdateGVoiceEnterRoom();
            }
            var isGuest = this.curMod.getIsGuest();
            //开启实时语音，这里只是设置状态，会等收到OnGvoiceJoinRoomOK后才调用开麦+喇叭接口
            if (this.curMod.getTableInfo() && this.curMod.getTableInfo()['join_type'] != 2) {
                kaayou.emit(this.curMod.getModuleName(), 'gvoice::setMicAndSpeakerSta', { gvoiceSta: !isGuest, gvoiceMic: !isGuest });
            }
            this.cleanUp();
        };
        FriendBaseScene.prototype.onReExit = function () {
            //实时语音
            if (this.curMod.tableInfo.gameconfig["gvoice"] == "true" && !this.curMod.getIsGuest()) {
                this.unschedule(this.OnUpdateGVoiceEnterRoom);
                this.unschedule(this.OnUpdateGVoiceMicAndSpeaker);
                this.offGVoiceEvents();
            }
            if (this.iGVoiceRoomId) {
                kaayou.PlatformMgr.getInstance().gvoice.QuitRoom(this.iGVoiceRoomId.toString());
                this.iGVoiceRoomId = 0;
            }
        };
        //开启/关闭麦克风+喇叭
        /**
         *
         * @param data gvoiceSta扬声器  gvoiceSpeaker
         * 因为已经有很多游戏绑定了这个消息  注意当第二个参数没传递的情况  当没传麦克风参数时候  直接取是否关闭扬声器
         */
        FriendBaseScene.prototype.setGVoiceMicAndSpeakerSta = function (data) {
            this.bGVoiceStaSpeakerNext = data.gvoiceSta;
            if (lodash.isUndefined(data.gvoiceMic)) {
                this.bGVoiceStaMicNext = data.gvoiceSta;
            }
            else {
                this.bGVoiceStaMicNext = data.gvoiceMic;
            }
            //如果是游客 强制为false
            if (this.curMod.getIsGuest()) {
                this.bGVoiceStaSpeakerNext = false;
                this.bGVoiceStaMicNext = false;
            }
            this.iGvoiceStaCnt = 3; //最多可尝试3次开麦/语音
        };
        //屏蔽指定玩家的语音
        FriendBaseScene.prototype.setGVoiceForBidMemberVoice = function (data) {
            if (!data || (data.index == 0 && !this.curMod.getIsGuest())) {
                return;
            } //不能屏蔽自己
            if (!this.curMod.getTableInfo() || !this.curMod.getTableInfo().tableid) {
                return;
            }
            var player = this.curMod.getPlayerByClientID(data.index);
            if (!player) {
                return;
            }
            player.gvoicesta = data.isForbid ? -1 : 0;
            var roomid = this.curMod.getTableInfo().tableid.toString();
            kaayou.PlatformMgr.getInstance().gvoice.ForbidMemberVoice(player.gvoicemenberid, data.isForbid, roomid);
            kaayou.emit(this.curMod.getModuleName(), "ui::UpdateMemberVoice", { index: data.index, gvoicesta: player.gvoicesta });
        };
        FriendBaseScene.prototype.bindGVoiceEvents = function () {
            //进入房间成功
            kaayou.getController("").on("OnGvoiceJoinRoomOK", this.OnGvoiceJoinRoomOKFunc, this);
            //成员状态改变回调
            kaayou.getController("").on("OnGvoiceMemberVoice", this.OnGvoiceMemberVoiceFunc, this);
            //开麦成功
            kaayou.getController("").on("OnGvoiceOpenMicOK", this.OnGvoiceOpenMicOKFunc, this);
            //关麦成功
            kaayou.getController("").on("OnGvoiceCloseMicOK", this.OnGvoiceCloseMicOKFunc, this);
            //开扬声器成功
            kaayou.getController("").on("OnGvoiceOpenSpeakerOK", this.OnGvoiceOpenSpeakerOKFunc, this);
            //关扬声器成功
            kaayou.getController("").on("OnGvoiceCloseSpeakerOK", this.OnGvoiceCloseSpeakerOKFunc, this);
        };
        FriendBaseScene.prototype.offGVoiceEvents = function () {
            kaayou.getController("").off("OnGvoiceJoinRoomOK", this.OnGvoiceJoinRoomOKFunc, this);
            kaayou.getController("").off("OnGvoiceMemberVoice", this.OnGvoiceMemberVoiceFunc, this);
            kaayou.getController("").off("OnGvoiceOpenMicOK", this.OnGvoiceOpenMicOKFunc, this);
            kaayou.getController("").off("OnGvoiceCloseMicOK", this.OnGvoiceCloseMicOKFunc, this);
            kaayou.getController("").off("OnGvoiceOpenSpeakerOK", this.OnGvoiceOpenSpeakerOKFunc, this);
            kaayou.getController("").off("OnGvoiceCloseSpeakerOK", this.OnGvoiceCloseSpeakerOKFunc, this);
        };
        //加入实时语音房间成功
        FriendBaseScene.prototype.OnGvoiceJoinRoomOKFunc = function (e) {
            if (!!e.data) {
                var memberID = e.data.memberID;
                this.iGVoiceRoomId = this.curMod.getTableInfo().tableid;
                console.log("GVoice OnGvoiceJoinRoomOKFunc 加入实时语音房间成功，memberID =", memberID);
                //把自己的memberID发给服务器广播给其他玩家
                this.curMod.sendGVoiceMemberID({ memberid: memberID });
                //加入房间成功后，要延时3秒左右开麦克风，不然会失败
                this.unschedule(this.OnUpdateGVoiceEnterRoom);
                this.unschedule(this.OnUpdateGVoiceMicAndSpeaker);
                this.schedule(this.OnUpdateGVoiceMicAndSpeaker, 3);
            }
        };
        //当房间中的其他成员开始说话或者停止说话的时候，通过该回调进行通知
        //memberid : 改变状态的成员ID
        //status : 成员的说话状态（零值表示没有说话，非零值表示正在说话）
        FriendBaseScene.prototype.OnGvoiceMemberVoiceFunc = function (e) {
            var memberID = e.data.memberid;
            var status = e.data.status;
            // console.log("GVoice OnGvoiceMemberVoiceFunc 收到玩家语音状态变更消息，memberID = " + memberID + ", status = " + status);
            //把消息转到mod，更新该ID对应玩家的状态
            kaayou.emit(this.curMod.getModuleName(), "gvoice::UpdateMemberVoice", { memberID: memberID, status: status });
        };
        FriendBaseScene.prototype.OnGvoiceOpenMicOKFunc = function () {
            this.bGVoiceMicStaCur = true;
        };
        FriendBaseScene.prototype.OnGvoiceCloseMicOKFunc = function () {
            this.bGVoiceMicStaCur = false;
        };
        FriendBaseScene.prototype.OnGvoiceOpenSpeakerOKFunc = function () {
            this.bGVoiceSpeakerStaCur = true;
        };
        FriendBaseScene.prototype.OnGvoiceCloseSpeakerOKFunc = function () {
            this.bGVoiceSpeakerStaCur = false;
        };
        FriendBaseScene.prototype.OnUpdateGVoiceMicAndSpeaker = function () {
            if (this.iGvoiceStaCnt > 0 && this.bGVoiceStaMicNext != this.bGVoiceMicStaCur) {
                if (this.bGVoiceStaMicNext) {
                    kaayou.PlatformMgr.getInstance().gvoice.OpenMic();
                }
                else {
                    kaayou.PlatformMgr.getInstance().gvoice.CloseMic();
                }
            }
            if (this.iGvoiceStaCnt > 0 && this.bGVoiceStaSpeakerNext != this.bGVoiceSpeakerStaCur) {
                if (this.bGVoiceStaSpeakerNext) {
                    kaayou.PlatformMgr.getInstance().gvoice.OpenSpeaker();
                }
                else {
                    kaayou.PlatformMgr.getInstance().gvoice.CloseSpeaker();
                }
            }
            if (this.iGvoiceStaCnt > 0)
                this.iGvoiceStaCnt--;
        };
        FriendBaseScene.prototype.bindUiEvent = function () {
            var self = this;
            //common里按钮点击回调不要用匿名函数，否则子类无法重载
            this.btn_ready && this.btn_ready.on(kaayou.TouchEvent.TouchEnd, this.onReadyClick, this);
            this.btn_invite && this.btn_invite.on(kaayou.TouchEvent.TouchEnd, this.onInviteClick, this);
            this.btn_menu && this.btn_menu.on(kaayou.TouchEvent.TouchEnd, this.onMenuClick, this);
            this.btn_chat && this.btn_chat.on(kaayou.TouchEvent.TouchEnd, this.onChatClick, this);
            this.btn_gps && this.btn_gps.on(kaayou.TouchEvent.TouchEnd, this.onGpsClick, this);
            this.bindGameBgEvent();
            var configs = common.mod.Config.AppConfig;
            var feature = lodash.extend({}, configs.feature);
            if (configs && feature && feature.iOSsh && cc.sys.isNative) {
                this.btn_invite.setVisible(false);
                this.btn_gps.setVisible(false);
            }
            this.tog_ksrkj2 && this.tog_ksrkj2.on(kaayou.CheckEvent.SELECTED, self.onToggleClick, this);
            this.tog_ksrkj3 && this.tog_ksrkj3.on(kaayou.CheckEvent.SELECTED, self.onToggleClick, this);
        };
        FriendBaseScene.prototype.bindGameBgEvent = function () {
            var self = this;
            var gameBg = ccui.helper.seekWidgetByName(this.node, "gameBg");
            gameBg.setTouchEnabled(true);
            gameBg.on(kaayou.TouchEvent.TouchEnd, function () {
                if (self.inviteLayer)
                    self.inviteLayer.setVisible(false);
            }, this);
        };
        FriendBaseScene.prototype.onReadyClick = function (event) {
            console.log("点击准备");
            var self = this;
            self.curMod.sendReady();
            self.btn_ready.visible = false;
        };
        FriendBaseScene.prototype.onInviteClick = function (event) {
            var self = this;
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            if (self.inviteLayer)
                self.inviteLayer.setVisible(true);
        };
        FriendBaseScene.prototype.onMenuClick = function (event) {
            var self = this;
            kaayou.emit(self.curMod.getModuleName(), "ui::MajonMenuPanel::Show");
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
        };
        FriendBaseScene.prototype.onChatClick = function (event) {
            var self = this;
            kaayou.emit(self.curMod.getModuleName(), "ui::chatLayer::Show");
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
        };
        FriendBaseScene.prototype.onGpsClick = function (event) {
            console.log("base gps ");
            var self = this;
            kaayou.emit(self.curMod.getModuleName(), 'ui::GPSLayer::Show');
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
        };
        FriendBaseScene.prototype.onToggleClick = function (event) {
            console.log('onToggleClick name=' + event.target.name + ', isSelected=' + event.target.isSelected());
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.Click_btn_switch);
            if (event.target.name == "OPEN_KSRKJ2" || event.target.name == "OPEN_KSRKJ3") {
                if (event.target.isSelected()) {
                    kaayou.sendMessage(this.curMod.getModuleName(), 'fewerfriend', {});
                }
            }
        };
        FriendBaseScene.prototype.bindModEvents = function () {
            var self = this;
            kaayou.getController(this.curMod.getModuleName()).on('ui::cleanUp', function (e) {
                self.cleanUp();
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on('UpdatePlayer', function (e) {
                self.onUpdatePlayer(e.data);
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on('ui::UpdateMemberVoice', function (e) {
                self.onUpdateGVoiceMemberSta(e.data);
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on('ienterRoom', function (e) {
                self.onIenterRoom();
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on('onIready', function (e) {
                self.onIready();
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on('ui::Table::broadcastUseMagic', function (e) {
                self.broadcastUseMagic(e.data);
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on("ui::onMicChat", function (e) {
                self.onMicChat(e.data);
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on("ui::MjTable::lastPlayerCome", function (e) {
                self.onLastPlayerCome(e.data);
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on("ui::MjTable::showKSRKJ", function (e) {
                self.showKSRKJ(e.data);
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on("ui::MjTable::hideKSRKJ", function (e) {
                self.hideKSRKJ(e.data);
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on("ui::MjTable::unSelect", function (e) {
                self.unSelect();
            }, this);
            //开启/关闭麦克风+喇叭
            kaayou.getController(this.curMod.getModuleName()).on("gvoice::setMicAndSpeakerSta", function (e) {
                self.setGVoiceMicAndSpeakerSta(e.data);
            }, this);
            //屏蔽指定玩家的语音
            kaayou.getController(self.curMod.getModuleName()).on('gvoice::ForbidMemberVoice', function (e) {
                self.setGVoiceForBidMemberVoice(e.data);
            }, this);
        };
        FriendBaseScene.prototype.showKSRKJ = function (data) {
            if (!this.ksrkj || !this.tog_ksrkj2 || !this.tog_ksrkj3) {
                return;
            }
            this.ksrkj.visible = true;
            if (data.num == 2) {
                this.tog_ksrkj2.visible = true;
                this.tog_ksrkj3.visible = false;
            }
            else if (data.num == 3) {
                this.tog_ksrkj2.visible = false;
                this.tog_ksrkj3.visible = true;
            }
            this.tog_ksrkj2.setSelected(false);
            this.tog_ksrkj3.setSelected(false);
        };
        FriendBaseScene.prototype.hideKSRKJ = function (data) {
            if (!this.ksrkj || !this.tog_ksrkj2 || !this.tog_ksrkj3) {
                return;
            }
            this.ksrkj.visible = data.b;
            this.tog_ksrkj2.visible = false;
            this.tog_ksrkj3.visible = false;
        };
        FriendBaseScene.prototype.unSelect = function () {
            if (!this.ksrkj || !this.tog_ksrkj2 || !this.tog_ksrkj3) {
                return;
            }
            this.tog_ksrkj2.setSelected(false);
            this.tog_ksrkj3.setSelected(false);
        };
        FriendBaseScene.prototype.cleanUp = function () {
            console.log("清理界面: cleanUp");
            this.gameState = common.mod.GAME_STATE.NONE;
            this.btn_ready.visible = false;
            this.btn_invite.visible = false;
            if (this.inviteLayer) {
                this.inviteLayer.setVisible(false);
            }
            for (var x in this.playerLayer) {
                this.playerLayer[x].cleanUp();
            }
        };
        FriendBaseScene.prototype.onUpdatePlayer = function (data) {
            var personNum = 0;
            for (var x in this.playerLayer) {
                this.playerLayer[x].visible = false;
                if (!data.Players[x])
                    continue;
                personNum++;
                this.playerLayer[x].visible = true;
                this.playerLayer[x].setPlayerInfo(data.Players[x]);
            }
            console.log('btn_invite', personNum < this.curMod.getMaxNum());
            this.btn_invite.visible = personNum < this.curMod.getMaxNum();
            var configs = common.mod.Config.AppConfig;
            var feature = lodash.extend({}, configs.feature);
            if (configs && feature && feature.iOSsh && cc.sys.isNative) {
                this.btn_invite.setVisible(false);
            }
        };
        FriendBaseScene.prototype.onUpdateGVoiceMemberSta = function (data) {
            if (!this.playerLayer[data.index]) {
                return;
            }
            this.playerLayer[data.index].onGVoiceSta(data.gvoicesta);
        };
        FriendBaseScene.prototype.onIenterRoom = function () {
            this.btn_ready.visible = true;
            var configs = common.mod.Config.AppConfig;
            var feature = lodash.extend({}, configs.feature);
            if (this.btn_invite)
                this.btn_invite.visible = true && !!this.curMod.getConfigWx();
            if (configs && feature && feature.iOSsh && cc.sys.isNative) {
                this.btn_invite.setVisible(false);
            }
            return true;
        };
        FriendBaseScene.prototype.broadcastUseMagic = function (data) {
            var self = this;
            var animstr = ["flower", "aixin", "egg", "tuoxie", "zhadan"];
            var Panel_player = ccui.helper.seekWidgetByName(this.node, "Panel_player");
            if (!Panel_player || !Panel_player.children[data.dwindex]) {
                cc.error('找不到玩家节点层');
                return;
            }
            var size = Panel_player.children[data.dwindex].getContentSize();
            var offset = cc.p(size.width / 2, size.height / 2);
            var startpos = cc.pAdd(offset, Panel_player.children[data.dwindex].getPosition());
            var endpos = cc.pAdd(offset, Panel_player.children[data.dwtoindex].getPosition());
            startpos = Panel_player.convertToWorldSpace(startpos);
            endpos = Panel_player.convertToWorldSpace(endpos);
            startpos = this.node.convertToNodeSpace(startpos);
            endpos = this.node.convertToNodeSpace(endpos);
            var time = cc.pDistance(startpos, endpos) / 1500;
            time = time < 0.3 ? 0.3 : time;
            var cb = function () {
                var img = ccui.ImageView.create("me.img_" + animstr[data.index] + ".png", ccui.Widget.PLIST_TEXTURE);
                img.setPosition(startpos.x, startpos.y);
                var bezier = [cc.p(startpos.x + 50, startpos.y + 100), cc.p(endpos.x - 50, endpos.y + 150), endpos];
                var bezierTo = cc.bezierTo(time, bezier);
                var acMove = bezierTo;
                //花不旋转
                if (data.index != 0) {
                    acMove = cc.spawn([bezierTo, cc.rotateBy(time, 360)]);
                }
                img.runAction(cc.sequence(acMove, cc.callFunc(function (sender) {
                    sender.removeFromParent();
                    self.showSkeleton(animstr[data.index], endpos);
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes["Emoj_" + animstr[data.index]]);
                })));
                self.node.addChild(img, 30);
            };
            var count = data.type == 5 ? 10 : 1;
            this.schedule(cb, 0.15, count - 1);
        };
        FriendBaseScene.prototype.showSkeleton = function (aniStr, pos) {
            var spineAnim = sp.SkeletonAnimation.createWithJsonFile(common.res[aniStr + "Json"], common.res[aniStr + "Atals"], 1);
            spineAnim.setAnimation(1, aniStr, false);
            this.node.addChild(spineAnim, 30);
            spineAnim.setPosition(pos);
            spineAnim.setCompleteListener(function () {
                spineAnim.setVisible(false);
                setTimeout(function () {
                    spineAnim.removeFromParent();
                }, 500);
            });
            // spineAnim.runAction(cc.sequence(cc.delayTime(1.0), cc.callFunc(function (sender) {
            //     sender.removeFromParent();
            // }, spineAnim)))
        };
        FriendBaseScene.prototype.onMicChat = function (data) {
            if (!this.playerLayer[data.index]) {
                console.log("onMicChat Error");
                return;
            }
            this.playerLayer[data.index].onMicChat(data.start);
        };
        FriendBaseScene.prototype.onLastPlayerCome = function (data) {
            console.log(data);
            this.btn_ready.visible = true;
            this.btn_invite.visible = false;
            this.readyTime.string = data.leftTime.toString();
            this.comeTime = Math.floor(new Date().getTime()) + data.leftTime * 1000;
            this.schedule(this.onAutoReady, 0.2);
        };
        //自己准备
        FriendBaseScene.prototype.onIready = function () {
            console.log("onIready");
            this.cleanUp();
            this.btn_invite.visible = true;
            this.btn_ready.visible = false;
            if (this.btn_invite)
                this.btn_invite.visible = true && !!this.curMod.getConfigWx();
        };
        FriendBaseScene.prototype.onAutoReady = function () {
            var curtime = Math.floor(this.comeTime - Math.floor(new Date().getTime()));
            this.readyTime.string = Math.floor(curtime / 1000).toString();
            if (curtime <= 0) {
                this.btn_ready.visible = false;
                this.unschedule(this.onAutoReady);
                this.curMod.sendReady();
            }
        };
        return FriendBaseScene;
    }(kaayou.kScene));
    common.FriendBaseScene = FriendBaseScene;
})(common || (common = {}));
//炮打灯块
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var GamePmdBlock = /** @class */ (function (_super) {
        __extends(GamePmdBlock, _super);
        function GamePmdBlock() {
            var _this = _super.call(this) || this;
            _this.Text_content = null;
            _this.play_time = 15;
            _this.wait_time = 3;
            _this.isPlayOver = true;
            _this.announcement_msg = null;
            _this.play_announcement_msg = null; //玩家喇叭消息
            _this.timer = 0;
            _this.num = 0;
            _this.type = 0;
            _this.initUI();
            return _this;
        }
        GamePmdBlock.prototype.initUI = function () {
            /*
            let self = this;
            this.announcement_msg = [];
            this.play_announcement_msg = [];
            let p = ccs.load(common.res.GamePmdBlock_json, "res/").node.getChildren()[0];
            this.initWithNode(<ccui.Widget>p);
            this.Text_content = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Text_content");
            //this.setPosition(cc.winSize.width / 2, cc.winSize.height - 135);
            this.Text_content.setPositionX(10 + this.getContentSize().width);
            this.Text_content.ignoreContentAdaptWithSize(true);
            this.onHide();
            */
        };
        GamePmdBlock.prototype.MoveAction = function () {
            var self = this;
            var _type = 0;
            // self.unscheduleAllCallbacks();
            self.schedule(function () {
                self.isPlayOver = false;
                //玩家发送喇叭时下一条开始发送玩家消息
                if (self.type) {
                    if (_type == 0) {
                        self.num = 0;
                    }
                    self.Text_content.setString(self.play_announcement_msg[self.num]);
                    _type = 1;
                }
                else {
                    self.Text_content.setString(self.announcement_msg[self.num]);
                    _type = 0;
                }
                self.num++;
                //坐标回归初始位置
                self.Text_content.setPositionX(10 + this.getContentSize().width);
                //开始滚动
                var action = cc.moveTo(self.play_time, cc.p(0 - 10 - self.Text_content.getContentSize().width, self.Text_content.getPosition().y));
                self.Text_content.runAction(cc.sequence(action, cc.callFunc(function () {
                    if (self.play_announcement_msg.length > 0 && self.num == self.play_announcement_msg.length && _type) {
                        self.play_announcement_msg = [];
                        self.type = 1;
                    }
                    //当刚播放完 玩家喇叭消息 时 ，有玩家再发喇叭会出现 self.num > self.play_announcement_msg.length 的情况
                    if (self.num >= self.play_announcement_msg.length && _type) {
                        self.num = 0;
                        self.Text_content.string = "";
                        self.unscheduleAllCallbacks();
                        self.isPlayOver = true;
                        self.visible = false;
                    }
                })));
            }, self.play_time + self.wait_time, cc.REPEAT_FOREVER, self.wait_time);
        };
        GamePmdBlock.prototype.show = function (data) {
            this.visible = true;
            this.type = data.type;
            //玩家发送的，push进去
            if (this.type) {
                var str = data.PmdArray[0] + ":" + data.PmdArray[1];
                this.play_announcement_msg.push(str);
            }
            // //系统的直接赋值
            // else if (this.announcement_msg.length == 0) {
            //     this.announcement_msg = data.PmdArray || [];
            // }
            console.log(data.PmdArray);
            if (this.isPlayOver == true) {
                if (lodash.isEmpty(data) || data.PmdArray.length < 1) {
                    return;
                }
                this.unscheduleAllCallbacks();
                this.MoveAction();
            }
        };
        GamePmdBlock.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
            this.unscheduleAllCallbacks();
        };
        GamePmdBlock.prototype.onHide = function () {
            this.visible = false;
        };
        __decorate([
            doBindEvent
        ], GamePmdBlock.prototype, "initUI", null);
        __decorate([
            BindEvent('common', 'ui::GamePmdBlock::Show')
        ], GamePmdBlock.prototype, "show", null);
        return GamePmdBlock;
    }(kaayou.Block));
    common.GamePmdBlock = GamePmdBlock;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var goldBaseScene = /** @class */ (function (_super) {
        __extends(goldBaseScene, _super);
        function goldBaseScene() {
            var _this = _super.call(this) || this;
            _this.curMod = null;
            _this.gameState = 0;
            _this.changeTableTime = 0;
            _this.readyClock = null;
            _this.clockTime = 0; //准备闹钟倒计时结束的时间戳
            _this.clockTimeTotal = 0; //准备闹钟总倒计时秒数
            _this.changeTableBtn = null;
            _this.readyBtn = null;
            _this.inviteBtn = null;
            _this.playerLayer = null;
            //电量
            _this.batteryBar = null;
            _this.batteryCharge = null;
            _this.curTimeText = null;
            return _this;
            // this.initUI();
        }
        // @doBindEvent
        goldBaseScene.prototype.initUI = function () {
            var self = this;
            var batteryNode = ccui.helper.seekWidgetByName(this.node, "BatteryNode"); //this.node.getChildByName("BatteryNode");
            if (batteryNode) {
                this.batteryBar = batteryNode.getChildByName("battery_bar");
                this.batteryCharge = batteryNode.getChildByName("battery_charge");
                this.curTimeText = batteryNode.getChildByName("Text_cur_time");
                if (this.curTimeText)
                    this.curTimeText.ignoreContentAdaptWithSize(true);
            }
            this.scheduleUpdate();
            this.update();
            cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function () {
                cc.log("游戏进入后台");
                // kaayou.NetManager.getInstance().getSocket(self.curMod.getModuleName()).close({ Initiative: false });
            });
            cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function () {
                cc.log("重新返回游戏");
            });
            this.changeTableBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                console.log("点击换桌");
                kaayou.TouchMask.addTouchMask({ soundtype: kaayou.SoundType.NORMAL });
                if (self.changeTableBtn.enabled) {
                    self.curMod.sendChangeTable();
                }
                self.changeTableBtn.enabled = false;
            }, this);
            this.readyBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                console.log("点击准备");
                console.log("self.curMod.getIsFake()", self.curMod.getIsFake());
                kaayou.TouchMask.addTouchMask({ soundtype: kaayou.SoundType.NORMAL });
                if (!self.curMod.getIsFake()) {
                    self.curMod.sendReady();
                    self.readyBtn.visible = false;
                }
                else {
                    self.curMod.sendChangeTable();
                }
            }, this);
            if (this.inviteBtn) {
                this.inviteBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                    console.log("点击邀请好友", self.curMod.gameName);
                    var url = "https://mmocgame.qpic.cn/wechatgame/NbzesCR54FkJcjfPhEhpnabNicNGVXneIyCSRwZFeyYkaTYxnJtD0eArGckn83jV7/0";
                    kaayou.PlatformMgr.getInstance().wx.ShareURL(self.curMod.gameName + "，就差你上桌了", "快来和我一起玩大冶打拱，原汁原味的家乡味道。", url);
                }, this);
            }
            this.addChild(new common.GamePmdBlock());
        };
        goldBaseScene.prototype.onReEnter = function () {
            this.cleanUp();
        };
        goldBaseScene.prototype.onReExit = function () {
            this.cleanUp();
        };
        goldBaseScene.prototype.bindModEvents = function () {
            var self = this;
            kaayou.getController(this.curMod.getModuleName()).on('ui::cleanUp', function (e) {
                self.cleanUp();
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on('UpdatePlayer', function (e) {
                self.onUpdatePlayer(e.data);
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on('ienterRoom', function (e) {
                self.onIenterRoom();
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on('onIready', function (e) {
                self.onIready();
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on('ui::Table::broadcastUseMagic', function (e) {
                self.broadcastUseMagic(e.data);
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on("ui::onMicChat", function (e) {
                self.onMicChat(e.data);
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on("ui::Scene::canContinue", function (e) {
                self.onCanContinue(e.data);
            }, this);
        };
        goldBaseScene.prototype.cleanUp = function () {
            console.log("清理界面: cleanUp");
            this.gameState = common.mod.GAME_STATE.NONE;
            for (var x in this.playerLayer) {
                this.playerLayer[x].cleanUp();
            }
            //清理准备倒计时
            this.setReadyClock(-1);
            this.unschedule(this.onAutoLeft);
            console.log("关闭准备倒计时");
            kaayou.emit(this.curMod.getModuleName(), 'ui::TabelList::Hide');
        };
        goldBaseScene.prototype.update = function () {
            if (!this.isVisible()) {
                return;
            }
            var date = new Date();
            if (this.curTimeText) {
                this.curTimeText.setString(Date.format(new Date(), "MM-dd hh:mm"));
            }
        };
        goldBaseScene.prototype.onCanContinue = function (data) {
            this.changeTableBtn.setVisible(!data.bankrupt);
            this.readyBtn.setVisible(!data.bankrupt);
        };
        goldBaseScene.prototype.onUpdatePlayer = function (data) {
            if (!data) {
                return;
            }
            for (var x in this.playerLayer) {
                this.playerLayer[x].visible = false;
                if (!data.Players[x])
                    continue;
                this.playerLayer[x].visible = true;
                this.playerLayer[x].setPlayerInfo(data.Players[x]);
            }
        };
        goldBaseScene.prototype.onIenterRoom = function () {
            if (this.curMod.gameState == common.mod.GAME_STATE.GAMEING || this.curMod.gameState == common.mod.GAME_STATE.ROAR) {
                console.log("onIenterRoom", "此时正在旁观状态");
                return;
            }
            console.log("onIenterRoom");
            this.resetBtn();
            this.changeTableBtn.visible = true;
            this.readyBtn.visible = true;
            if (this.inviteBtn)
                this.inviteBtn.visible = true && !!this.curMod.getConfigWx();
            //换桌倒计时
            this.checkChangeTableTimer(4);
            //准备倒计时
            this.checkReadyTimer(20);
            return true;
        };
        //自己准备
        goldBaseScene.prototype.onIready = function () {
            console.log("onIready");
            this.cleanUp();
            this.changeTableBtn.visible = true;
            this.readyBtn.visible = false;
            if (this.inviteBtn)
                this.inviteBtn.visible = true && !!this.curMod.getConfigWx();
        };
        //换桌倒计时
        goldBaseScene.prototype.checkChangeTableTimer = function (timer) {
            this.changeTableBtn.enabled = false;
            this.changeTableTime = Math.floor(new Date().getTime()) + timer * 1000 - 1;
            this.unschedule(this.onEnableChangeTable);
            this.schedule(this.onEnableChangeTable, 0.5);
            this.onEnableChangeTable();
            console.log("开始换桌倒计时");
        };
        goldBaseScene.prototype.onEnableChangeTable = function () {
            var timeLable = this.changeTableBtn.getChildByName('Text_time');
            if (!timeLable) {
                timeLable = this.changeTableBtn.getChildByName('Text');
            }
            timeLable.visible = true;
            var curtime = Math.floor((this.changeTableTime - Math.floor(new Date().getTime())) / 1000);
            timeLable.string = curtime.toString();
            if (curtime <= 0) {
                console.log("换桌倒计时结束");
                this.unschedule(this.onEnableChangeTable);
                timeLable.visible = false;
                this.changeTableBtn.enabled = true;
            }
        };
        goldBaseScene.prototype.setReadyClock = function (time) {
            if (!this.readyClock)
                return;
            this.readyClock.visible = time >= 0;
            if (!this.readyClock.visible)
                return;
            var clockText = this.readyClock.getChildByName('Text_clock');
            if (clockText)
                clockText.ignoreContentAdaptWithSize(true);
            if (clockText)
                clockText.string = time.toString();
        };
        //进入房间或者结束一局倒计时
        goldBaseScene.prototype.checkReadyTimer = function (timer) {
            // if(this.overTime > 0) return;
            this.clockTime = Math.floor(new Date().getTime()) + timer * 1000 - 1;
            this.clockTimeTotal = timer;
            this.unschedule(this.onAutoLeft); //可能换桌前上一次定时器还在跑
            this.setReadyClock(-1);
            this.schedule(this.onAutoLeft, 0.1);
            this.onAutoLeft();
            console.log("开始准备倒计时");
        };
        goldBaseScene.prototype.onAutoLeft = function () {
            var curtime = (this.clockTime - Math.floor(new Date().getTime())) / 1000;
            if (curtime >= 3.9 && curtime < 4.0) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Clock);
            }
            curtime = Math.floor(curtime);
            this.setReadyClock(curtime);
            if (curtime < 0) {
                console.log("准备倒计时结束");
                this.unschedule(this.onAutoLeft);
                // kaayou.emit('common', 'ui::Toast::Show', { msg: "由于您长时间没有准备,已经被踢出房间!" })
                // this.curMod.sendLeftGame();
            }
        };
        //隐藏所有牌权按钮
        goldBaseScene.prototype.resetBtn = function () {
            this.changeTableBtn.visible = false;
            this.readyBtn.visible = false;
            if (this.inviteBtn)
                this.inviteBtn.visible = false;
        };
        goldBaseScene.prototype.broadcastUseMagic = function (data) {
            var self = this;
            var animstr = ["flower", "aixin", "egg", "tuoxie", "zhadan"];
            var Panel_player = ccui.helper.seekWidgetByName(this.node, "Panel_player");
            if (!Panel_player || !Panel_player.children[data.dwindex]) {
                cc.error('找不到玩家节点层');
                return;
            }
            var size = Panel_player.children[data.dwindex].getContentSize();
            var offset = cc.p(size.width / 2, size.height / 2);
            var startpos = cc.pAdd(offset, Panel_player.children[data.dwindex].getPosition());
            var endpos = cc.pAdd(offset, Panel_player.children[data.dwtoindex].getPosition());
            startpos = Panel_player.convertToWorldSpace(startpos);
            endpos = Panel_player.convertToWorldSpace(endpos);
            startpos = this.node.convertToNodeSpace(startpos);
            endpos = this.node.convertToNodeSpace(endpos);
            var time = cc.pDistance(startpos, endpos) / 1500;
            time = time < 0.3 ? 0.3 : time;
            var cb = function () {
                var img = ccui.ImageView.create("me.img_" + animstr[data.index] + ".png", ccui.Widget.PLIST_TEXTURE);
                img.setPosition(startpos.x, startpos.y);
                var bezier = [cc.p(startpos.x + 50, startpos.y + 100), cc.p(endpos.x - 50, endpos.y + 150), endpos];
                var bezierTo = cc.bezierTo(time, bezier);
                var acMove = bezierTo;
                //花不旋转
                if (data.index != 0) {
                    acMove = cc.spawn([bezierTo, cc.rotateBy(time, 360)]);
                }
                img.runAction(cc.sequence(acMove, cc.callFunc(function (sender) {
                    sender.removeFromParent();
                    self.showSkeleton(animstr[data.index], endpos, Panel_player.zIndex + 1);
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes["Emoj_" + animstr[data.index]]);
                })));
                self.node.addChild(img, Panel_player.zIndex + 1);
            };
            var count = data.type == 5 ? 10 : 1;
            this.schedule(cb, 0.15, count - 1);
        };
        goldBaseScene.prototype.showSkeleton = function (aniStr, pos, zIndex) {
            var spineAnim = sp.SkeletonAnimation.createWithJsonFile(common.res[aniStr + "Json"], common.res[aniStr + "Atals"], 1);
            spineAnim.setAnimation(1, aniStr, false);
            this.node.addChild(spineAnim, zIndex ? zIndex : 0);
            spineAnim.setPosition(pos);
            spineAnim.setCompleteListener(function () {
                spineAnim.setVisible(false);
                setTimeout(function () {
                    spineAnim.removeFromParent();
                }, 500);
            });
        };
        goldBaseScene.prototype.onMicChat = function (data) {
            this.playerLayer[data.index].onMicChat(data.start);
        };
        return goldBaseScene;
    }(kaayou.kScene));
    common.goldBaseScene = goldBaseScene;
})(common || (common = {}));
/// <reference path="common.goldBaseScene.ts" />
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var GameSceneFrDG = /** @class */ (function (_super) {
        __extends(GameSceneFrDG, _super);
        function GameSceneFrDG() {
            var _this = _super.call(this) || this;
            //游戏标题节点
            // titleNode: cc.Node = null;
            // renwuNode: cc.Node = null;
            _this.dipaiNode = null;
            _this.dipaiCard = null;
            // btn_up: ccui.Button = null;
            // btn_down: ccui.Button = null;
            // btn_paixu: ccui.Button = null;
            _this.btn_lipai = null;
            _this.chatLayerNode = null;
            _this.chatBtn = null;
            // tuoguanBtn: ccui.Button = null;
            // difenLable: ccui.Text = null;
            // roundLable: ccui.Text = null;
            _this.roundLableBig = null;
            // taskFinishText: ccui.Text = null;
            // taskText: ccui.Text = null;
            // taskRewardNum: ccui.Text = null;
            _this.menuLayerNode = null;
            _this.endLayerNode = null;
            _this.playerInfoLayer = null;
            _this.settingLayer = null;
            //牌节点
            _this.handCardRow = null;
            _this.handCardAni = null;
            _this.outCardRow = null;
            _this.outCardNode = null;
            _this.teamCardRow = null;
            _this.clockPos = null; //我的闹钟的位置，0：中间（两个按钮时显示在中间），1：左边（三个按钮时显示在左边，例如出牌牌权时，闹钟显示在不要和提示之间）
            _this.btn_menu = null;
            _this.buyaoBtn = null;
            _this.tishiBtn = null;
            _this.outCardBtn = null;
            _this.yingpaiBtn = null;
            _this.buyingBtn = null;
            //打不过上家的牌提示
            _this.tishiNode = null;
            //托管遮罩
            _this.tuoguanMask = null;
            _this.curSelCard = null;
            _this.isAct = false;
            cc.spriteFrameCache.addSpriteFrames(common.res.PokerTag_plist);
            cc.spriteFrameCache.addSpriteFrames(common.res.Poker_BigCard01_plist);
            cc.spriteFrameCache.addSpriteFrames(common.res.Poker_SmallCard01_plist);
            cc.spriteFrameCache.addSpriteFrames(common.res.Poker_SmallCard02_plist);
            return _this;
        }
        GameSceneFrDG.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
        };
        GameSceneFrDG.prototype.onReEnter = function () {
            _super.prototype.onReEnter.call(this);
            var textServerUrl = ccui.helper.seekWidgetByName(this.node, "Text_serverurl");
            var enterConfig = JSON.parse(kaayou.DataSet.get("game::config"));
            textServerUrl.ignoreContentAdaptWithSize(true);
            textServerUrl.string = enterConfig.ip.toString();
        };
        GameSceneFrDG.prototype.bindModEvents = function () {
            var self = this;
            _super.prototype.bindModEvents.call(this);
            kaayou.getController(this.curMod.getModuleName()).on('ui::EndLayer::Hide', function (e) {
                self.onCloseEndLayer();
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on('PlayScore', function (e) {
                self.onPlayScore(e.data);
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on('TurnScore', function (e) {
                self.onTurnScore(e.data);
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on('PlaySound', function (e) {
                self.onPlaySound(e.data);
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on('TeamerPai', function (e) {
                self.teamerPai(e.data);
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on('EndOut', function (e) {
                self.endOut(e.data);
            }, this);
            // kaayou.getController(this.curMod.getModuleName()).on('showTableInfo', function (e: kaayou.Event) {
            //     self.showTableInfo(e.data);
            // }, this);
        };
        GameSceneFrDG.prototype.cleanUp = function () {
            _super.prototype.cleanUp.call(this);
            this.playerLayer[0].setClockPosition(this.clockPos[0]);
            this.curSelCard = null;
            if (this.dipaiCard)
                this.dipaiCard.cleanUp();
            this.handCardRow.cleanUp();
            for (var x in this.outCardRow) {
                this.outCardRow[x].cleanUp();
            }
            for (var x in this.teamCardRow) {
                this.teamCardRow[x].cleanUp();
            }
            if (this.endLayerNode) {
                this.endLayerNode.visible = false;
            }
            if (this.playerInfoLayer) {
                this.playerInfoLayer.visible = false;
            }
            if (this.settingLayer) {
                this.settingLayer.visible = false;
            }
            if (this.chatLayerNode) {
                this.chatLayerNode.visible = false;
            }
            if (this.menuLayerNode) {
                this.menuLayerNode.visible = false;
            }
            //清除托管界面
            if (this.tuoguanMask)
                this.tuoguanMask.visible = false;
        };
        GameSceneFrDG.prototype.BindUIEvent = function () {
            var self = this;
            _super.prototype.bindUiEvent.call(this);
            // //拖管
            // self.tuoguanBtn.on(kaayou.TouchEvent.TouchEnd, function () {
            //     console.log("点击托管");
            //     // self.curMod.sendTrustee(true);
            // }, this);
            // //取消托管
            // self.tuoguanMask.on(kaayou.TouchEvent.TouchEnd, function () {
            //     console.log("点击取消托管");
            //     // self.curMod.sendTrustee(false);
            // }, this);
            // self.btn_up.on(kaayou.TouchEvent.TouchEnd, this.upfunc, this);
            // self.btn_down.on(kaayou.TouchEvent.TouchEnd, this.downfunc, this);
        };
        GameSceneFrDG.prototype.onCloseEndLayer = function () {
            console.log("ui::EndLayer::Hide");
            //小结算关闭时显示换桌/准备按钮
            // this.changeTableBtn.visible = true;
            // this.readyBtn.visible = true;
            // if (this.inviteBtn) this.inviteBtn.visible = true && !!this.curMod.getConfigWx();
        };
        // // 标题
        // upfunc() {
        //     return;
        //     let self = this;
        //     if (self.isAct) return;
        //     self.isAct = true;
        //     self.renwuNode.runAction(cc.sequence(cc.moveTo(0.3, cc.p(0, 0)), cc.callFunc(function () {
        //         self.btn_up.visible = false;
        //         self.btn_down.visible = true;
        //         self.isAct = false;
        //     })))
        //     self.titleNode.runAction(cc.moveTo(0.3, cc.p(0, 95)));
        // }
        // downfunc() {
        //     return;
        //     let self = this;
        //     if (self.isAct) return;
        //     self.isAct = true;
        //     self.renwuNode.runAction(cc.sequence(cc.moveTo(0.3, cc.p(0, 95)), cc.callFunc(function () {
        //         self.btn_up.visible = true;
        //         self.btn_down.visible = false;
        //         self.isAct = false;
        //     })))
        //     self.titleNode.runAction(cc.moveTo(0.3, cc.p(0, 0)));
        // }
        //0 没有大过上家的牌    1手中有眀鸡牌   2出牌不符合规则
        GameSceneFrDG.prototype.noticeFunc = function (type) {
            this.tishiNode.stopAllActions();
            var self = this;
            this.tishiNode.visible = true;
            self.tishiNode.opacity = 255;
            var resNotice = {
                PokerGameFont_0: "DG.font_dp.png",
                PokerGameFont_1: "DG.font_mingji.png",
                PokerGameFont_2: "DG.font_cannotout.png",
            };
            this.tishiNode.getChildByName('noticeMsg').loadTexture(resNotice["PokerGameFont_" + type], ccui.Widget.PLIST_TEXTURE);
            this.tishiNode.runAction(cc.sequence(cc.delayTime(1), cc.fadeOut(1), cc.callFunc(function () {
                self.tishiNode.visible = false;
            })));
        };
        // 抓分
        GameSceneFrDG.prototype.onPlayScore = function (data) {
            if (data.chairid == -1 || data.getscore == 0) {
                //没人抓分
                kaayou.emit(this.curMod.getModuleName(), 'ui::updateplayscore', data);
            }
            else {
                //播放抓分动画
                var startPos = this.roundLableBig.getPosition();
                startPos = this.roundLableBig.getParent().convertToWorldSpace(startPos);
                var targetPos = this.playerLayer[data.chairid].getPosition();
                var playersize = this.playerLayer[data.chairid];
                targetPos = cc.pAdd(targetPos, cc.p(playersize.width / 2 + 20, -20));
                var getScoreText_1 = new ccui.Text(data.getscore.toString(), "", 30);
                getScoreText_1.setColor(cc.color(255, 247, 28));
                getScoreText_1.setPosition(startPos);
                this.addChild(getScoreText_1);
                var timeScale = 0.4;
                var timeMove = 0.4;
                //飘分动画
                var acScale0 = cc.scaleTo(timeScale / 2, 1.5);
                var acScale1 = cc.scaleTo(timeScale / 2, 1.0);
                var acMove0 = cc.moveTo(timeMove, targetPos);
                var acScale2 = cc.scaleTo(timeMove, 0.8);
                var acMoveAndScale = cc.spawn([acMove0, acScale2]);
                var acPlaySound = cc.callFunc(function () {
                    //抓分音效
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.GetScore);
                }.bind(this));
                var acScale3 = cc.scaleTo(timeScale / 2, 1.5);
                var acScale4 = cc.scaleTo(timeScale / 2, 0.8);
                var acEnd = cc.callFunc(function () {
                    kaayou.emit(this.curMod.getModuleName(), 'ui::updateplayscore', data);
                    getScoreText_1.removeFromParent();
                }.bind(this));
                getScoreText_1.runAction(cc.sequence(acScale0, acScale1, acMoveAndScale, acPlaySound, acScale3, acScale4, acEnd));
            }
            return true;
        };
        // 本轮分
        GameSceneFrDG.prototype.onTurnScore = function (data) {
            // this.roundLable.string = data.turnscore.toString();
            this.roundLableBig.string = "\u672C\u8F6E\u5206\uFF1A" + data.turnscore;
            this.roundLableBig.visible = data.turnscore > 0;
            return true;
        };
        // 播放音效
        GameSceneFrDG.prototype.onPlaySound = function (data) {
            if (data.soundtype == 5) {
                //报警音效
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Warning);
            }
            else if (data.soundtype == 6) {
                //跑游音效
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.PaoYou);
            }
            return true;
        };
        //队友牌
        GameSceneFrDG.prototype.teamerPai = function (data) {
            this.teamCardRow[data.index].visible = true;
            this.teamCardRow[data.index].setNums(data.card);
            cc.log("TeamerPai", data);
            return true;
        };
        GameSceneFrDG.prototype.endOut = function (data) {
            cc.log("EndOut", data);
            for (var x in this.playerLayer) {
                this.outCardRow[x].setNums([]);
                this.playerLayer[x].setPassTag(false);
            }
            return true;
        };
        // showTableInfo(data: { roomid: number, gameconfig: common.mod.IGameConfig }) {
        //     this.difenLable.string = "" + data.gameconfig.difen;
        // }
        // onIenterRoom() {
        //     super.onIenterRoom();
        //     this.changeTableBtn.visible = false;
        //     this.readyBtn.visible = false;
        //     if (this.inviteBtn) this.inviteBtn.visible = false;
        //     //小结算显示时，不显示换桌/准备按钮，收到小结算关闭的消息时再显示
        //     if (!this.endLayerNode || !this.endLayerNode.visible) {
        //         this.changeTableBtn.visible = true;
        //         this.readyBtn.visible = true;
        //         if (this.inviteBtn) this.inviteBtn.visible = false;
        //     }
        //     return true
        // }
        GameSceneFrDG.prototype.onIenterRoom = function () {
            if (this.curMod.gameState < common.mod.GAME_STATE.GAMEING) {
                _super.prototype.onIenterRoom.call(this);
            }
            return true;
        };
        // cleanUp
        GameSceneFrDG.prototype.resetBtn = function () {
            // super.resetBtn();
            this.buyaoBtn.visible = false;
            this.tishiBtn.visible = false;
            this.outCardBtn.visible = false;
            this.yingpaiBtn.visible = false;
            this.buyingBtn.visible = false;
        };
        return GameSceneFrDG;
    }(common.FriendBaseScene));
    common.GameSceneFrDG = GameSceneFrDG;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var gameShareLayer = /** @class */ (function (_super) {
        __extends(gameShareLayer, _super);
        //type 0:游戏  1:小结算
        function gameShareLayer(type) {
            var _this = _super.call(this) || this;
            _this.btn_wx = null;
            _this.btn_xl = null;
            _this.btn_dd = null;
            _this.btn_xx = null;
            _this.btn_qyq = null;
            _this.btn_layout = null;
            _this.type = null;
            _this.ShareStatus = false;
            _this.fullPath = "";
            _this.type = type;
            _this.initUI(type);
            return _this;
        }
        gameShareLayer.prototype.initUI = function (type) {
            this.initWithccs(common.res.gameShareLayer_json);
            this.btn_layout = ccui.helper.seekWidgetByName(this.node, "shareLayout");
            this.btn_layout.setPadding({ left: 30, spacingX: 40, right: 30 });
            this.btn_layout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.btn_layout.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.btn_layout.doChildrenLayout();
            this.btn_wx = ccui.helper.seekWidgetByName(this.node, "btn_wx");
            this.btn_xl = ccui.helper.seekWidgetByName(this.node, "btn_xl");
            this.btn_dd = ccui.helper.seekWidgetByName(this.node, "btn_dd");
            this.btn_xx = ccui.helper.seekWidgetByName(this.node, "btn_xx");
            this.btn_qyq = ccui.helper.seekWidgetByName(this.node, "btn_qyq");
            var configData = common.mod.Config.GetAppConfig();
            var c_type = JSON.parse(configData.shareType).lobby;
            this.btn_wx.setVisible(!!(c_type & 1));
            this.btn_dd.setVisible(!!(c_type & 2));
            this.btn_xx.setVisible(!!(c_type & 4));
            this.btn_xl.setVisible(!!(c_type & 8));
            this.btn_qyq.setVisible(!!(c_type & 32));
            this.btn_layout.doChildrenLayout();
            var shareBg = ccui.helper.seekWidgetByName(this.node, "shareBg");
            shareBg.setContentSize(this.btn_layout.getContentSize());
            this.setVisible(false);
            if (this.type == 0) {
                shareBg.setPosition(cc.winSizeCustom.width / 2 - shareBg.width / 2, cc.winSizeCustom.height / 2 - shareBg.height / 2 + 80);
            }
            else {
                shareBg.setPosition(cc.winSize.width * 0.6 - shareBg.width / 2, 150);
            }
            if (type == 0) {
                this.btn_wx.on(kaayou.TouchEvent.TouchEnd, this.onInvite.bind(this, this.btn_wx), this);
                this.btn_xl.on(kaayou.TouchEvent.TouchEnd, this.onInvite.bind(this, this.btn_xl), this);
                this.btn_dd.on(kaayou.TouchEvent.TouchEnd, this.onInvite.bind(this, this.btn_dd), this);
                this.btn_xx.on(kaayou.TouchEvent.TouchEnd, this.onInvite.bind(this, this.btn_xx), this);
            }
            else {
                this.btn_wx.on(kaayou.TouchEvent.TouchEnd, this.onShare.bind(this, this.btn_wx), this);
                this.btn_xl.on(kaayou.TouchEvent.TouchEnd, this.onShare.bind(this, this.btn_xl), this);
                this.btn_dd.on(kaayou.TouchEvent.TouchEnd, this.onShare.bind(this, this.btn_dd), this);
                this.btn_xx.on(kaayou.TouchEvent.TouchEnd, this.onShare.bind(this, this.btn_xx), this);
            }
        };
        gameShareLayer.prototype.onInvite = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log(e);
                            return [4 /*yield*/, kaayou.emit(this.getModuleName(), 'mod::getInviteData', null, true)];
                        case 1:
                            data = _a.sent();
                            console.log("房间内分享的数据", data);
                            kaayou.SoundManager.getInstance().setBtnClickSounds();
                            switch (e.name) {
                                case 'btn_wx':
                                    kaayou.PlatformMgr.getInstance().wx.ShareURL(data['title'], data['text'], data['url']);
                                    break;
                                case 'btn_dd':
                                    kaayou.PlatformMgr.getInstance().dd.DDShareURL(data['title'], data['text'], data['url']);
                                    break;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        gameShareLayer.prototype.onShareBtn = function () {
            if (!this.ShareStatus) {
                this.setRenderTexture();
            }
            kaayou.SoundManager.getInstance().setBtnClickSounds();
            this.setVisible(true);
        };
        gameShareLayer.prototype.onShareClose = function () {
            this.setVisible(false);
            this.ShareStatus = false;
        };
        gameShareLayer.prototype.setRenderTexture = function () {
            if (!cc.sys.isNative) {
                return;
            }
            var winSize = cc.director.getWinSize();
            var texture = new cc.RenderTexture(Math.floor(winSize.width), Math.floor(winSize.height));
            texture.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
            texture.begin();
            cc.director.getRunningScene().visit();
            texture.end();
            var fileName = "result_share.jpg";
            this.fullPath = jsb.fileUtils.getWritablePath() + fileName;
            if (jsb.fileUtils.isFileExist(this.fullPath)) {
                jsb.fileUtils.removeFile(this.fullPath);
            }
            var self = this;
            texture.saveToFile(fileName, cc.IMAGE_FORMAT_JPEG, true, function () {
                self.ShareStatus = true;
            }.bind(this));
        };
        gameShareLayer.prototype.onShare = function (e) {
            kaayou.SoundManager.getInstance().setBtnClickSounds();
            this.visible = false;
            if (!this.ShareStatus) {
                console.log("截屏文件尚未保存完毕，请稍后尝试分享");
                kaayou.emit('common', 'ui::Toast::Show', { msg: "截屏文件尚未保存完毕，请稍后尝试分享" });
                return;
            }
            this.ShareStatus = false;
            switch (e.name) {
                case 'btn_wx':
                    kaayou.PlatformMgr.getInstance().wx.ShareImage("", this.fullPath);
                    break;
                case 'btn_dd':
                    kaayou.PlatformMgr.getInstance().dd.DDShareImage("", this.fullPath);
                    break;
            }
        };
        gameShareLayer.prototype.setShareStatus = function (v) {
            this.ShareStatus = v;
        };
        gameShareLayer.prototype.getShareStatus = function () {
            return this.ShareStatus;
        };
        __decorate([
            doBindEvent
        ], gameShareLayer.prototype, "initUI", null);
        return gameShareLayer;
    }(kaayou.Layer));
    common.gameShareLayer = gameShareLayer;
})(common || (common = {}));
var common;
(function (common) {
    var EARTH_RADIUS = 6378.137;
    var GPSLayer = /** @class */ (function (_super) {
        __extends(GPSLayer, _super);
        function GPSLayer(ccs, curMod) {
            if (curMod === void 0) { curMod = null; }
            var _this = _super.call(this) || this;
            _this._curMod = null;
            _this.closeBtn = null;
            _this.safeDis = 100;
            _this.nameText = [];
            _this.disText = [];
            _this.ctx = null;
            _this.greenColor = cc.color(37, 142, 12);
            _this.redColor = cc.color(255, 0, 0);
            _this.grayColor = cc.color(103, 103, 103);
            _this.playerNode = null;
            _this.playerNodeArr = [];
            _this.initWithccs(ccs);
            _this._curMod = curMod;
            _this.safeDis = _this.getSafeDistance();
            _this.setVisible(false);
            return _this;
        }
        GPSLayer.prototype.initUI = function () {
            var self = this;
            this.closeBtn = ccui.helper.seekWidgetByName(this.node, "btn_close");
            this.closeBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes["Click_btn_close"]);
                self.setVisible(false);
            }, this);
            this.playerNode = ccui.helper.seekWidgetByName(this.node, "playerNode");
            for (var i = 0; i < 4; i++) {
                this.playerNodeArr[i] = this.playerNode.children[i];
                this.nameText[i] = this.playerNodeArr[i].getChildByName("nameText");
                this.nameText[i].string = '';
                this.nameText[i].ignoreContentAdaptWithSize(true);
            }
            for (var i = 0; i < 4; i++) {
                this.disText[i] = [];
                for (var j = i + 1; j < 4; j++) {
                    this.disText[i][j] = ccui.helper.seekWidgetByName(this.node, "disText_" + i + '_' + j);
                    this.disText[i][j].string = '';
                    this.disText[i][j].ignoreContentAdaptWithSize(true);
                }
            }
            this.ctx = new cc.DrawNode();
            this.playerNode.addChild(this.ctx, -1);
            this.ctx.setLineWidth(3);
        };
        GPSLayer.prototype.cleanUp = function () {
            this.ctx.clear(); //清除线
            //清楚玩家头像
            for (var i = 0; i < 4; i++) {
                var headImg = this.playerNodeArr[i].getChildByName('headImg');
                this.playerNodeArr[i].setVisible(true);
                NetImage.setPlayerHead(headImg, "");
                var sp_1 = headImg.getChildByName("headImgSp");
                sp_1.initWithSpriteFrameName("gps_icon.png");
                this.nameText[i].string = "";
            }
            //清除distext
            for (var i = 0; i < 4; i++) {
                for (var j = i + 1; j < 4; j++) {
                    this.disText[i][j].string = '';
                }
            }
        };
        GPSLayer.prototype.getSafeDistance = function () {
            if (this._curMod && this._curMod.getTableInfo() && this._curMod.getTableInfo().distancelimit > 0) {
                return this._curMod.getTableInfo().distancelimit;
            }
            else if (common.mod.Config.AppConfig.gps) {
                return common.mod.Config.AppConfig.gps.distance;
            }
            else {
                return 100;
            }
        };
        GPSLayer.prototype.setInfo = function (data) {
            this.cleanUp();
            var maxPlayer = data.maxPlayer;
            //动态设置人数
            if (maxPlayer == 3) {
                this.playerNodeArr[2].setVisible(false);
            }
            else if (maxPlayer == 2) {
                this.playerNodeArr[1].setVisible(false);
                this.playerNodeArr[3].setVisible(false);
            }
            var playerInfo = data.Players;
            for (var i = 0; i < playerInfo.length; i++) {
                var longitude1 = 0;
                var latitude1 = 0;
                var ip1 = '';
                //动态设置人数
                if (maxPlayer == 3 && i == 2) {
                    continue;
                }
                else if (maxPlayer == 2 && (i == 1 || i == 3)) {
                    continue;
                }
                if (playerInfo[i]) {
                    if (playerInfo[i].longitude && playerInfo[i].latitude) {
                        longitude1 = Number(playerInfo[i].longitude); //经度
                        latitude1 = Number(playerInfo[i].latitude); //纬度
                    }
                    if (playerInfo[i].ip)
                        ip1 = playerInfo[i].ip;
                }
                var headImg = this.playerNodeArr[i].getChildByName('headImg');
                if (playerInfo[i]) {
                    NetImage.setPlayerHead(headImg, playerInfo[i].imgurl, playerInfo[i].sex);
                    var tempnickname = kaayou.Identify.nickNameSubFive(playerInfo[i].name);
                    this.nameText[i].string = tempnickname;
                }
                // else {
                //     this.playerNodeArr[i].getChildByName<ccui.ImageView>('headImg').loadTexture("icon.png" , ccui.Widget.PLIST_TEXTURE);
                //     this.nameText[i].string = "";
                // }
                for (var j = i + 1; j < playerInfo.length; j++) {
                    var longitude2 = 0;
                    var latitude2 = 0;
                    var ip2 = '';
                    //动态设置人数
                    if (maxPlayer == 3 && j == 2) {
                        continue;
                    }
                    else if (maxPlayer == 2 && (j == 1 || j == 3)) {
                        continue;
                    }
                    if (!playerInfo[j] || !playerInfo[i]) {
                        this.disText[i][j].setVisible(false);
                    }
                    else {
                        this.disText[i][j].setVisible(true);
                    }
                    if (playerInfo[j]) {
                        if (playerInfo[j].longitude && playerInfo[j].latitude) {
                            longitude2 = Number(playerInfo[j].longitude);
                            latitude2 = Number(playerInfo[j].latitude);
                        }
                        if (playerInfo[j].ip)
                            ip2 = playerInfo[j].ip;
                    }
                    if ((longitude1 == 0 && latitude1 == 0) || (longitude2 == 0 && latitude2 == 0)) {
                        this.showDistance(i, j, 0, 0, ip1 == ip2);
                    }
                    else {
                        var dis = this.getDistance(longitude1, latitude1, longitude2, latitude2);
                        this.showDistance(i, j, dis, 1, ip1 == ip2);
                    }
                }
            }
        };
        GPSLayer.prototype.showDistance = function (from, to, dis, type, sameIp) {
            var disLabelNode = this.disText[from][to];
            var startPos = this.playerNodeArr[from].getPosition();
            var endPos = this.playerNodeArr[to].getPosition();
            if (type == 1) {
                if (dis >= 1000) {
                    disLabelNode.string = Math.floor(dis / 1000).toString() + 'km';
                }
                else {
                    disLabelNode.string = dis.toString() + 'm';
                }
                if (dis < this.safeDis) {
                    disLabelNode.setTextColor(this.redColor);
                    this.ctx.setDrawColor(this.redColor);
                }
                else {
                    disLabelNode.color = this.greenColor;
                    this.ctx.setDrawColor(this.greenColor);
                }
            }
            else {
                disLabelNode.string = '无法获取';
                disLabelNode.setTextColor(this.grayColor);
                this.ctx.setDrawColor(this.grayColor);
            }
            if (sameIp) {
                disLabelNode.string += '(ip相同)';
            }
            this.ctx.drawSegment(startPos, endPos);
            disLabelNode.rotation = -(Math.atan((startPos.y - endPos.y) / (startPos.x - endPos.x)) * 180 / Math.PI);
            if (disLabelNode.getName() == 'disText_0_2') {
                disLabelNode.rotation = 270;
            }
        };
        GPSLayer.prototype.getDistance = function (longitude1, latitude1, longitude2, latitude2) {
            var radLat1 = this.Rad(latitude1);
            var radLat2 = this.Rad(latitude2);
            var a = radLat1 - radLat2;
            var b = this.Rad(longitude1) - this.Rad(longitude2);
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
            s = s * EARTH_RADIUS;
            s = Math.round(s * 10000) / 10000 * 1000; //米
            return Math.floor(s);
        };
        GPSLayer.prototype.Rad = function (d) {
            return d * Math.PI / 180;
        };
        GPSLayer.prototype.Show = function (data) {
            this.safeDis = this.getSafeDistance();
            console.log("安全距离: ", this.safeDis);
            this.setInfo(data);
            this.setVisible(true);
        };
        return GPSLayer;
    }(kaayou.Layer));
    common.GPSLayer = GPSLayer;
})(common || (common = {}));
var kaayou;
(function (kaayou) {
    /**
    * PullListEvent / PullList 相关事件
    *
    */
    var PullListEvent = /** @class */ (function (_super) {
        __extends(PullListEvent, _super);
        function PullListEvent(type, data) {
            return _super.call(this, type, data) || this;
        }
        /**下拉中*/
        PullListEvent.HeadIng = "HeadIng";
        /**下拉将要完成*/
        PullListEvent.HeadDidFinish = "HeadDidFinish";
        /**下拉完成*/
        PullListEvent.HeadFinish = "HeadFinish";
        /**下拉取消*/
        PullListEvent.HeadCancel = "HeadCancel";
        /**上拉中*/
        PullListEvent.FootIng = "FootIng";
        /**上拉将要完成*/
        PullListEvent.FootDidFinish = "FootDidFinish";
        /**上拉完成*/
        PullListEvent.FootFinish = "FootFinish";
        /**上拉取消*/
        PullListEvent.FootCancel = "FootCancel";
        /**刷新完成*/
        PullListEvent.Refreshed = "Refreshed";
        return PullListEvent;
    }(kaayou.Event));
    kaayou.PullListEvent = PullListEvent;
})(kaayou || (kaayou = {}));
var common;
(function (common) {
    var PullList = /** @class */ (function (_super) {
        __extends(PullList, _super);
        function PullList() {
            var _this = _super.call(this) || this;
            _this._debugRect = false;
            _this._spacingY = 0;
            _this._EnabledBar = true;
            _this._offtop = 0;
            _this._offfoot = 0;
            _this._uped = false;
            _this._uping = false;
            _this._downed = false;
            _this._downing = false;
            _this._adpter = null;
            _this._needPull = true;
            _this._cellHeight = 0;
            _this._preCellLen = 0;
            _this._viewlen = 0;
            _this._offlen = 0;
            _this._headDoingText = "";
            _this._headDidFinishText = "";
            _this._headFinishText = "";
            _this._footDoingText = "";
            _this._footDidFinishText = "";
            _this._footFinishText = "";
            _this._pheadoffset = 0;
            _this._pheadholdoffset = 0;
            _this._pfootoffset = 0;
            _this._pfootholdoffset = 0;
            _this.headSlot = null;
            _this.footSlot = null;
            _this._doWaitRef = false;
            _this._updateScrolling = false;
            _this.__ranger = null;
            _this.pmask = null;
            _this._nonius = 0; //游标
            _this._lastnonius = -1; //上次的游标
            return _this;
        }
        PullList.prototype.setSpacingY = function (spacing) {
            this._spacingY = spacing;
        };
        PullList.prototype.setEnabledBar = function (b) {
            this._EnabledBar = b;
            this.scview.setScrollBarEnabled(this._EnabledBar);
        };
        PullList.prototype.initWithNode = function (node) {
            var parent = node.getParent();
            if (!parent) {
                throw "parent is null";
            }
            this.__ranger = { min: 0, max: 0 };
            //copy attr
            this.setZOrder(node.getZOrder());
            this.setPosition(node.getPosition());
            this.setContentSize(node.getContentSize());
            this.setAnchorPoint(node.getAnchorPoint());
            this.setName(node.getName());
            this.setTag(node.getTag());
            parent.addChild(this, node.getZOrder());
            // this.setParent(parent);
            this.node = this;
            node.removeFromParent();
            this.setEnabled(true);
            this.setTouchEnabled(true);
            this.addScrollView();
            return this;
        };
        PullList.prototype.addScrollView = function () {
            var sc = new ccui.ScrollView();
            sc.setAnchorPoint(0.5, 0.5);
            sc.setContentSize(this.getContentSize().width, this.getContentSize().height);
            sc.setDirection(ccui.ScrollView.DIR_VERTICAL);
            sc.setInnerContainerSize(this.getContentSize());
            sc.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
            sc.setBounceEnabled(true);
            sc.setClippingEnabled(true);
            sc.setScrollBarEnabled(this._EnabledBar);
            this.addChild(sc);
            this.scview = sc;
        };
        PullList.prototype.addTouchMask = function () {
            var _this = this;
            var p = new ccui.Layout();
            p.setBackGroundColor(cc.color("#ffffff"));
            if (this._debugRect) {
                p.setBackGroundColorType(1);
                p.setBackGroundColorOpacity(125);
            }
            p.setAnchorPoint(0.5, 0.5);
            p.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
            p.setContentSize(this.getContentSize());
            this.addChild(p);
            // this.addProtectedChild(p, 999, 103);
            var touch = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: false,
                onTouchBegan: function (touch, event) {
                    var target = event.getCurrentTarget();
                    return _this.checkTouchInvalid(target, touch);
                },
                onTouchEnded: function (touch, event) {
                    _this.onScrollTouchEnd();
                    return true;
                },
                onTouchMoved: function (touch, event) {
                    // this.onScrollTouchEnd();
                    return true;
                },
                onTouchCancelled: function (touch, event) {
                    _this.onScrollTouchEnd();
                    return true;
                },
            });
            cc.eventManager.addListener(touch, p);
            this.pmask = p;
        };
        PullList.prototype.dispatchEvent = function (evtype) {
            var e = kaayou.Event.create(kaayou.PullListEvent, evtype);
            e.currentTarget = e.target = this;
            this.dispatch(e);
            if (this.headSlot) {
                e = kaayou.Event.create(kaayou.PullListEvent, evtype);
                e.currentTarget = e.target = this;
                this.headSlot.dispatch(e);
            }
            if (this.footSlot) {
                e = kaayou.Event.create(kaayou.PullListEvent, evtype);
                e.currentTarget = e.target = this;
                this.footSlot.dispatch(e);
            }
        };
        PullList.prototype.setAdpter = function (adpter) {
            this._adpter = adpter;
        };
        PullList.prototype.getAdpter = function () {
            return this._adpter;
        };
        PullList.prototype.getCell = function () {
            var adpter = this.getAdpter();
            if (adpter == null) {
                return null;
            }
            if (!adpter.pool) {
                adpter.pool = [];
            }
            var c = adpter.getCell();
            c.setAnchorPoint(0.5, 1);
            c.setPositionX(this.scview.getContentSize().width / 2);
            c.setPositionY(this.scview.getContentSize().height);
            adpter.pool.push(c);
            return c;
        };
        PullList.prototype.getCells = function () {
            var adpter = this.getAdpter();
            if (adpter == null) {
                return null;
            }
            if (!adpter.pool) {
                adpter.pool = [];
            }
            return adpter.pool;
        };
        PullList.prototype.initPullEnv = function (needpl) {
            var _this = this;
            if (needpl === void 0) { needpl = true; }
            this._needPull = needpl;
            this.scview.addEventListener(function (scroll, eType) {
                // ccui.ScrollView.EVENT_SCROLL_TO_TOP = 0;
                // ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM = 1;
                // ccui.ScrollView.EVENT_SCROLL_TO_LEFT = 2;
                // ccui.ScrollView.EVENT_SCROLL_TO_RIGHT = 3;
                // ccui.ScrollView.EVENT_SCROLLING = 4;
                // ccui.ScrollView.EVENT_BOUNCE_TOP = 5;
                // ccui.ScrollView.EVENT_BOUNCE_BOTTOM = 6;
                // ccui.ScrollView.EVENT_BOUNCE_LEFT = 7;
                // ccui.ScrollView.EVENT_BOUNCE_RIGHT = 8;
                // ccui.ScrollView.EVENT_CONTAINER_MOVED = 9;
                // ccui.ScrollView.EVENT_AUTOSCROLL_ENDED = 10;
                switch (eType) {
                    case 4: ///ccui.ScrollView.EVENT_SCROLLING 
                        _this.onScrolling(scroll);
                        break;
                    case 9: // ccui.ScrollView.EVENT_CONTAINER_MOVED
                        _this.onContainerMove(scroll);
                        break;
                    case 10:
                        break;
                    default:
                        break;
                }
            });
            if (this._needPull) {
                this.addTouchMask();
                this.addHeadSolt();
                this.addFootSolt();
            }
            this._prepareCells();
        };
        PullList.prototype._prepareCells = function () {
            if (this.getAdpter() == null) {
                return;
            }
            this.scview.setInnerContainerSize(this.scview.getContentSize());
            if (this._cellHeight < 1) {
                var c = this.getCell();
                this._cellHeight = c.getContentSize().height;
                if (this._cellHeight == 0) {
                    return;
                }
            }
            if (this._cellHeight == 0) {
                return;
            }
            if (this._preCellLen < 1) {
                this._preCellLen = Math.ceil(this.getContentSize().height / (this._cellHeight + this._spacingY));
            }
            this._offlen = 2;
            this._viewlen = this._preCellLen;
            this._preCellLen += this._offlen * 2;
            this._nonius = this._viewlen;
            this._lastnonius = -1;
            for (var i = 0; i < this._preCellLen - 1; i++) {
                var c = this.getCell();
            }
            this._normalizingCellPosition();
            // lodash.forEach(this.getCells(), (c: IPullListCell) => {
            //     c.setIndex(-1);
            //     // c.setVisible(false);
            // })
        };
        PullList.prototype._normalizingCellPosition = function () {
            var _this = this;
            var _a = this.getRange(), min = _a.min, max = _a.max;
            lodash.forEach(this.getCells(), function (c, i) {
                if (!c.getParent()) {
                    _this.scview.addChild(c);
                }
                c.setIndex(min + i);
                _this.setCellPosition(c);
            });
        };
        PullList.prototype.getScrollView = function () {
            return this.scview;
        };
        PullList.prototype.onScrolling = function (sc) {
            if (!this._needPull) {
                return;
            }
            this.headSlot && this.headSlot.setVisible(this._uping);
            this.footSlot && this.footSlot.setVisible(this._downing);
            if (this._offtop < -1 * this.getHeadOffset()) {
                this._uped = true;
                this._uping = true;
                this.headSlot && this.headSlot.setString(this.getHeadDidFinishText());
                this.dispatchEvent(kaayou.PullListEvent.HeadDidFinish);
            }
            else if (this._offtop < 0) {
                this._uped = false;
                this._uping = true;
                this.headSlot && this.headSlot.setString(this.getHeadDoingText());
                this.dispatchEvent(kaayou.PullListEvent.HeadIng);
            }
            else {
                this._uped = false;
                this._uping = false;
            }
            if (this._offfoot < 0) {
                this._downed = false;
                this._downing = false;
            }
            else if (this._offfoot < this.getFootOffset()) {
                this._downed = false;
                this._downing = true;
                this.footSlot && this.footSlot.setString(this.getFootDoingText());
                this.dispatchEvent(kaayou.PullListEvent.FootIng);
            }
            else {
                this._downed = true;
                this._downing = true;
                this.footSlot && this.footSlot.setString(this.getFootDidFinishText());
                this.dispatchEvent(kaayou.PullListEvent.FootDidFinish);
            }
        };
        PullList.prototype.setHeadDoingText = function (text) {
            this._headDoingText = text;
        };
        PullList.prototype.getHeadDoingText = function () {
            return this._headDoingText || "下拉刷新";
        };
        PullList.prototype.setHeadDidFinishText = function (text) {
            this._headDidFinishText = text;
        };
        PullList.prototype.getHeadDidFinishText = function () {
            return this._headDidFinishText || "松开刷新";
        };
        PullList.prototype.setHeadFinishText = function (text) {
            this._headFinishText = text;
        };
        PullList.prototype.getHeadFinishText = function () {
            return this._headFinishText || "正在刷新";
        };
        PullList.prototype.setFootDoingText = function (text) {
            this._footDoingText = text;
        };
        PullList.prototype.getFootDoingText = function () {
            return this._footDoingText || "上拉加载";
        };
        PullList.prototype.setFootDidFinishText = function (text) {
            this._footDidFinishText = text;
        };
        PullList.prototype.getFootDidFinishText = function () {
            return this._footDidFinishText || "松开加载";
        };
        PullList.prototype.setFootFinishText = function (text) {
            this._footFinishText = text;
        };
        PullList.prototype.getFootFinishText = function () {
            return this._footFinishText || "正在加载";
        };
        PullList.prototype.getHeadOffset = function () {
            if (!this._pheadoffset && this.headSlot) {
                return this.headSlot.getContentSize().height > 36 ? this.headSlot.getContentSize().height : 50;
            }
            else {
                return this._pheadoffset || 50;
            }
        };
        PullList.prototype.setHeadOffset = function (b) {
            return this._pheadoffset = b;
        };
        PullList.prototype.getHeadHoldOffset = function () {
            if (!this._pheadholdoffset && this.headSlot) {
                return this.headSlot.getContentSize().height > 36 ? this.headSlot.getContentSize().height : 50;
            }
            else {
                return this._pheadholdoffset || 0;
            }
        };
        PullList.prototype.setHeadHoldOffset = function (b) {
            return this._pheadholdoffset = b;
        };
        PullList.prototype.getFootOffset = function () {
            if (!this._pfootoffset && this.footSlot) {
                return this.footSlot.getContentSize().height > 36 ? this.footSlot.getContentSize().height : 50;
            }
            else {
                return this._pfootoffset || 50;
            }
        };
        PullList.prototype.setFootOffset = function (b) {
            return this._pfootoffset = b;
        };
        PullList.prototype.getFootHoldOffset = function () {
            if (!this._pfootholdoffset && this.footSlot) {
                return this.footSlot.getContentSize().height > 36 ? this.footSlot.getContentSize().height : 50;
            }
            else {
                return this._pfootholdoffset || 0;
            }
        };
        PullList.prototype.setFootHoldOffset = function (b) {
            return this._pfootholdoffset = b;
        };
        PullList.prototype.setHeadSolt = function (v) {
            this.headSlot = v;
        };
        PullList.prototype.getHeadSolt = function () {
            if (this.headSlot) {
                return this.headSlot;
            }
            var l = new ccui.Text("heiti", "SimHei", 26);
            l.setTextColor(cc.color("#Aed7fb"));
            l.setTextHorizontalAlignment(1);
            return l;
        };
        PullList.prototype.setFootSolt = function (v) {
            this.footSlot = v;
        };
        PullList.prototype.getFootSolt = function () {
            if (this.footSlot) {
                return this.footSlot;
            }
            var l = new ccui.Text("heiti", "SimHei", 26);
            l.setTextColor(cc.color("#Aed7fb"));
            l.setTextHorizontalAlignment(1);
            return l;
        };
        PullList.prototype.addHeadSolt = function () {
            this.headSlot = null;
            var l = this.getHeadSolt();
            if (!l) {
                return;
            }
            l.setAnchorPoint(0.5, 0);
            l.setPosition(this.scview.getContentSize().width / 2, this.scview.getContentSize().height);
            this.headSlot = l;
            this.scview.addProtectedChild(l, 100, 10);
        };
        PullList.prototype.addFootSolt = function () {
            this.footSlot = null;
            var l = this.getFootSolt();
            if (!l) {
                return;
            }
            l.setAnchorPoint(0.5, 1);
            l.setPosition(this.scview.getContentSize().width / 2, 0);
            this.footSlot = l;
            this.scview.addProtectedChild(l, 101, 10);
        };
        PullList.prototype.setScrollToOffsetTop = function (top) {
            this.scview.stopAutoScroll();
            var offsetY = top + (this.scview.getLayoutSize().height - this.scview.getInnerContainerSize().height);
            this.scview.setInnerContainerPosition(cc.p(0, offsetY));
            this._updateChangeInnerOffset();
        };
        PullList.prototype._clearPullState = function () {
            this._uped = false;
            this._uping = false;
            this._downed = false;
            this._downing = false;
        };
        PullList.prototype.setScrollDisable = function (b) {
            this.scview.setEnabled(b);
            this._setScrollBaI(b);
        };
        PullList.prototype._setScrollBaI = function (b) {
            var _this = this;
            if (b) {
                if (this._EnabledBar && b) {
                    setTimeout(function () {
                        _this.scview.setScrollBarEnabled(_this._EnabledBar && b);
                    }, 1000);
                }
            }
            else {
                this.scview.setScrollBarEnabled(b);
            }
            this.scview.setBounceEnabled(b);
            this.scview.setInertiaScrollEnabled(b);
        };
        PullList.prototype.onScrollTouchEnd = function () {
            this._updateScrolling = false;
            if (this._uped) {
                if (this._doWaitRef == true) {
                    return;
                }
                this._updateScrolling = true;
                console.log("upde");
                this._downed = false;
                this._downing = false;
                this._doWaitRef = true;
                this.setScrollDisable(false);
                this.setScrollToOffsetTop(-1 * this.getHeadHoldOffset());
                this.headSlot && this.headSlot.setString(this.getHeadFinishText());
                this.dispatchEvent(kaayou.PullListEvent.HeadFinish);
            }
            else if (this._uping) {
                this._clearPullState();
                this.dispatchEvent(kaayou.PullListEvent.HeadCancel);
            }
            else if (this._downed) {
                if (this._doWaitRef == true) {
                    return;
                }
                this._updateScrolling = true;
                this._uped = false;
                this._uping = false;
                this._updateScrolling = true;
                this.setScrollDisable(false);
                this.setScrollToOffsetTop(this.scview.getInnerContainerSize().height - this.scview.getLayoutSize().height + this.getFootHoldOffset());
                this.footSlot && this.footSlot.setString(this.getFootFinishText());
                this.dispatchEvent(kaayou.PullListEvent.FootFinish);
            }
            else if (this._downing) {
                this._clearPullState();
                this.dispatchEvent(kaayou.PullListEvent.FootCancel);
            }
        };
        PullList.prototype.refresh = function () {
            var _this = this;
            this.scview.setScrollBarEnabled(false);
            var uped = this._uped;
            var downed = this._downed;
            this._clearPullState();
            this._setScrollBaI(false);
            this._updateScrolling = false;
            if (uped) {
                this._updateScrolling = true;
                this.scview.scrollToTop(0.3, true);
                setTimeout(function () {
                    _this._doWaitRef = false;
                    _this._updateScrolling = false;
                    _this._nonius = _this._viewlen;
                    _this._lastnonius = _this._nonius;
                    _this.__ranger.max = _this._nonius + _this._offlen;
                    _this.__ranger.min = _this._nonius - _this._viewlen - _this._offlen;
                    _this._refreshWithData();
                }, 310);
            }
            else if (downed) {
                this._updateScrolling = true;
                // this.scview.scrollToBottom(0.3, true)
                setTimeout(function () {
                    _this._doWaitRef = false;
                    _this._updateScrolling = false;
                    _this._refreshWithData();
                }, 310);
            }
            else {
                this._doWaitRef = false;
                this._refreshWithData();
            }
        };
        PullList.prototype._refreshWithData = function () {
            var _this = this;
            //lw200610datas可能为null
            var len = 0;
            if (this.getAdpter().datas)
                len = this.getAdpter().datas.length;
            if (this._nonius > len) {
                this._nonius = this._viewlen;
            }
            var top = this.scview.getInnerOffSetTop();
            this.scview.setInnerContainerSize(cc.size(this.getContentSize().width, len * (this._cellHeight + this._spacingY)));
            top = Math.min(this.scview.getInnerContainerSize().height - this.scview.getContentSize().height, top);
            top = Math.max(0, top);
            this.setScrollToOffsetTop(top);
            this._doRefreshOffsetForce(); // 强制刷一下上下关系
            this.dispatchEvent(kaayou.PullListEvent.Refreshed);
            setTimeout(function () {
                _this.setScrollDisable(true);
            }, 200);
        };
        PullList.prototype._doRefreshOffsetForce = function () {
            this._updateChangeInnerOffset();
            this._normalizingCellPosition();
            this._doUpdateCellByIndex();
        };
        PullList.prototype.getRange = function () {
            if (this._lastnonius !== this._nonius && this._updateScrolling == false) {
                this.__ranger.max = this._nonius + this._offlen;
                this.__ranger.min = this._nonius - this._viewlen - this._offlen;
            }
            return this.__ranger;
        };
        PullList.prototype._doUpdateCellByIndex = function () {
            if (!this.getAdpter()) {
                return;
            }
            var datas = this.getAdpter().datas;
            var len = datas ? datas.length : 0;
            lodash.forEach(this.getCells(), function (c, i) {
                var idx = c.getIndex();
                if (!datas) {
                    c.setInfo(null);
                }
                else if (idx < 0 || idx >= len) {
                    c.setInfo(null);
                }
                else {
                    c.setInfo(datas[idx]);
                }
            });
            //排序一下子
            // this.getCells().sort(function (a, b) {
            //     return a.getIndex() - b.getIndex();
            // });
            // let range = this.getRange();
            // console.log(range);
            // if (range.min < 0) { return; }
            // if (range.max < 1) { return; }
        };
        PullList.prototype.onContainerMove = function (sc) {
            this._updateChangeInnerOffset();
            if (this._needPull) {
                this.headSlot && this.headSlot.setPositionY(sc.getContentSize().height + this._offtop);
                this.footSlot && this.footSlot.setPositionY(this._offfoot);
            }
            var top = this.scview.getInnerContainerPosition().y - (this.scview.getLayoutSize().height - this.scview.getInnerContainerSize().height);
            this.scview.getInnerContainerPosition().y = top + (this.scview.getLayoutSize().height - this.scview.getInnerContainerSize().height);
            this.onChangeCellPositions();
        };
        PullList.prototype._updateChangeInnerOffset = function () {
            this._offtop = this.scview.getInnerOffSetTop();
            this._offfoot = this.scview.getInnerContainerPosition().y;
        };
        PullList.prototype.setVisible = function (b) {
            // this.setVisible(b)
            ccui.Widget.prototype.setVisible.call(this, b);
            this.pmask && this.pmask.setVisible(b);
        };
        PullList.prototype.onChangeCellPositions = function () {
            if (this._viewlen < 1) {
                return;
            }
            this._nonius = Math.max(0, Math.floor(this._offtop / (this._cellHeight + this._spacingY)) + this._viewlen);
            if (this._lastnonius !== this._nonius && this._updateScrolling == false) {
                var _a = this.getRange(), min = _a.min, max = _a.max;
                if (min < 0 - this._offlen - 1) {
                    return;
                }
                if (max > this.getAdpter().datas.length + 2) {
                    return;
                }
                var a = new Array(this._preCellLen);
                lodash.fill(a, 0);
                var recycleArr = new Array(this._preCellLen);
                var recycleOff = 0;
                var cells = this.getCells();
                for (var i = 0; i < cells.length; i++) {
                    var idx = cells[i].getIndex();
                    var index = idx - min;
                    if (index < 0 || index > this._preCellLen - 1) {
                        recycleArr[recycleOff++] = cells[i];
                    }
                    else {
                        if (a[index] == 0) {
                            a[index] = 1;
                        }
                        else {
                            recycleArr[recycleOff++] = cells[i];
                        }
                    }
                }
                var temprecycleOff = 0;
                for (var i = 0; i < a.length; i++) {
                    if (a[i] == 0) {
                        if (temprecycleOff >= recycleOff) {
                            return;
                        }
                        var cell = recycleArr[temprecycleOff++];
                        cell.setIndex(i + min);
                        this.setCellPosition(cell);
                    }
                }
                this._doUpdateCellByIndex();
            }
            this._lastnonius = this._nonius;
        };
        PullList.prototype.setCellPosition = function (cell) {
            var spacingY = this._spacingY;
            var allHeight = this.scview.getInnerContainerSize().height;
            var top = 0;
            var left = 0;
            var row = cell.getIndex();
            var column = 0;
            var y = allHeight - row * spacingY - row * cell.height - ((1.0 - cell.getAnchorPoint().y) * cell.height);
            cell.setPositionY(y - top);
            var maxCount = 0;
            if (this.getAdpter() && this.getAdpter().datas) {
                maxCount = this.getAdpter().datas.length;
            }
            cell.setVisible(!(cell.getIndex() < 0) && !(cell.getIndex() >= maxCount));
        };
        PullList.prototype.checkTouchInvalid = function (target, touch) {
            if (false == this.isTureVisible()) {
                return false;
            }
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            return cc.rectContainsPoint(rect, locationInNode);
        };
        PullList.prototype.isTureVisible = function (bParentReleated) {
            if (bParentReleated === void 0) { bParentReleated = false; }
            if (!bParentReleated) {
                return this.isVisible();
            }
            var pWidget = this;
            if (this.isVisible() == true) {
                while (pWidget) {
                    if (pWidget.isVisible() != true) {
                        return false;
                    }
                    pWidget = pWidget.getParent();
                }
            }
            return this.isVisible();
        };
        return PullList;
    }(kaayou.Block));
    common.PullList = PullList;
})(common || (common = {}));
/// <reference path="common.PullListView.ts" />
var common;
(function (common) {
    var TH_InGameApply_Cell = /** @class */ (function (_super) {
        __extends(TH_InGameApply_Cell, _super);
        function TH_InGameApply_Cell() {
            var _this = _super.call(this) || this;
            _this._index = -1;
            _this.img_head = null; //头像
            _this.label_uname = null; //用户名称标签
            _this.label_uid = null; //用户id标签
            _this.label_time = null; //用户积分标签
            _this.label_typejoin = null; //申请类型：加入申请
            _this.label_typeout = null; //申请类型：退出申请
            _this.checkbox_online = null;
            _this.btn_agree = null; //同意按钮
            _this.btn_reject = null; //拒绝按钮
            _this._data = null;
            return _this;
        }
        TH_InGameApply_Cell.prototype.setIndex = function (index) {
            this._index = index;
        };
        TH_InGameApply_Cell.prototype.getIndex = function () {
            return this._index;
        };
        TH_InGameApply_Cell.prototype.initWithNode = function (node) {
            var _this = this;
            var self = this;
            _super.prototype.initWithNode.call(this, node);
            this.img_head = ccui.helper.seekWidgetByName(this.node, "img_head");
            this.label_uname = ccui.helper.seekWidgetByName(this.node, "label_uname");
            this.label_uid = ccui.helper.seekWidgetByName(this.node, "label_uid");
            this.label_time = ccui.helper.seekWidgetByName(this.node, "label_time");
            this.label_typejoin = ccui.helper.seekWidgetByName(this.node, "label_typejoin");
            this.label_typeout = ccui.helper.seekWidgetByName(this.node, "label_typeout");
            this.btn_agree = ccui.helper.seekWidgetByName(this.node, "btn_agree");
            this.btn_reject = ccui.helper.seekWidgetByName(this.node, "btn_reject");
            this.checkbox_online = ccui.helper.seekWidgetByName(this.node, "checkbox_online");
            var ctrName = this.getModuleName();
            this.btn_agree.on(kaayou.TouchEvent.TouchEnd, function () {
                if (!_this._data) {
                    return;
                }
                if (!_this._data.uid) {
                    return;
                }
                kaayou.emit("tea", "mod::GameTable::ApplyAgree", { uid: _this._data.uid, apply_type: _this._data.apply_type });
            }, this);
            this.btn_reject.on(kaayou.TouchEvent.TouchEnd, function () {
                if (!_this._data) {
                    return;
                }
                if (!_this._data.uid) {
                    return;
                }
                kaayou.emit("tea", "mod::GameTable::ApplyReject", { uid: _this._data.uid, apply_type: _this._data.apply_type });
            }, this);
            kaayou.getController(ctrName).on('ui::ApplyRow::HideButton', function (e) {
                self.btn_agree.setVisible(false);
                self.btn_reject.setVisible(false);
            }, this, 10);
            kaayou.getController(ctrName).on('ui::ApplyRow::ShowButton', function (e) {
                self.btn_agree.setVisible(true);
                self.btn_reject.setVisible(true);
            }, this, 10);
        };
        TH_InGameApply_Cell.prototype.reset = function () {
            this.img_head.setVisible(false);
            this.label_uname.setString("");
            this.label_uid.setString("");
            this.label_time.setString("");
            this.label_typejoin.setVisible(false);
            this.label_typeout.setVisible(false);
            this.checkbox_online.setSelected(false);
            this.btn_agree.setVisible(false);
            this.btn_reject.setVisible(false);
        };
        TH_InGameApply_Cell.prototype.setInfo = function (data) {
            var self = this;
            if (lodash.eq(this._data, data)) {
                return;
            }
            this._data = !!data ? lodash.cloneDeep(data) : null;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            this.label_uname.setString(kaayou.Identify.nickNameSubByLength(this._data.uname, 6, 4));
            this.label_uid.setString("ID:" + this._data.uid.toString());
            this.label_typejoin.setVisible(this._data.apply_type == 0);
            this.label_typeout.setVisible(this._data.apply_type == 1);
            this.label_time.setString("时间:" + new Date(this._data.apply_time * 1000).format("yyyy-MM-dd hh:mm"));
            this.checkbox_online.setSelected(!!this._data.is_online);
            NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.gender, function (url) {
                if (!self._data)
                    return false;
                if (url !== self._data.uurl) {
                    return false;
                }
                return true;
            });
            this.img_head.setVisible(true);
        };
        return TH_InGameApply_Cell;
    }(kaayou.Block));
    var TH_InGameTable_Cell = /** @class */ (function (_super) {
        __extends(TH_InGameTable_Cell, _super);
        function TH_InGameTable_Cell() {
            var _this = _super.call(this) || this;
            _this._index = -1;
            _this.btn_dis = null;
            _this.label_gameRule = null;
            _this.label_roomNum = null;
            _this.label_seq = null; //序号标签
            _this.label_gameing = null; //玩法标签
            _this.lbNotStart = null;
            _this.playerItems = null;
            _this.layout_player_group = null;
            _this._data = null;
            return _this;
        }
        TH_InGameTable_Cell.prototype.setIndex = function (index) {
            this._index = index;
        };
        TH_InGameTable_Cell.prototype.getIndex = function () {
            return this._index;
        };
        TH_InGameTable_Cell.prototype.initWithNode = function (node) {
            var _this = this;
            var self = this;
            _super.prototype.initWithNode.call(this, node);
            this.label_seq = ccui.helper.seekWidgetByName(this.node, "label_seq");
            this.label_gameing = ccui.helper.seekWidgetByName(this.node, "label_gameing");
            this.lbNotStart = ccui.helper.seekWidgetByName(this.node, "NotStart");
            this.label_gameRule = ccui.helper.seekWidgetByName(this.node, "Text_rule");
            this.label_roomNum = ccui.helper.seekWidgetByName(this.node, "Text_num");
            //player
            this.playerItems = [];
            for (var i = 0; i < 5; i++) {
                var it = {
                    layout_player: null,
                    img_head: null,
                    label_uname: null,
                    btn_sit: null,
                };
                it.layout_player = ccui.helper.seekWidgetByName(this.node, "layout_player" + i);
                it.img_head = ccui.helper.seekWidgetByName(it.layout_player, "img_head");
                it.label_uname = ccui.helper.seekWidgetByName(it.layout_player, "label_uname");
                it.btn_sit = ccui.helper.seekWidgetByName(it.layout_player, "btn_sit");
                this.playerItems.push(it);
            }
            this.layout_player_group = ccui.helper.seekWidgetByName(this.node, "layout_player_group");
            this.layout_player_group.on(kaayou.TouchEvent.TouchEnd, function () {
                var self = _this;
                if (!_this._data) {
                    return;
                }
                if (!_this._data.fid) {
                    return;
                }
                if (_this._data.ntid == undefined) {
                    return;
                }
                if (_this._data.begin) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "该桌已开始，请尝试其它桌" });
                    return;
                }
                if (self._data.trule && self._data.trule.playernum && self._data.tmemitems.length >= self._data.trule.playernum) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "该桌已满，请尝试其它桌" });
                    return;
                }
                kaayou.emit("tea", 'mod::GameTable::ChangeJoin', { fid: self._data.fid, ntid: self._data.ntid, package_key: self._data.package_key });
            }, this);
            this.btn_dis = ccui.helper.seekWidgetByName(this.node, "btn_dis");
            this.btn_dis.on(kaayou.TouchEvent.TouchEnd, function () {
                if (!_this._data) {
                    return;
                }
                if (!_this._data.fid) {
                    return;
                }
                if (!_this._data.tid && !_this._data.atid) {
                    return;
                } //没有人的空桌子
                var self = _this;
                var tableid = self._data.tid;
                var msg = "\u662F\u5426\u89E3\u6563\u3010" + self._data.kname + "-\u623F\u53F7\uFF1A" + tableid + "\u3011\u7684\u724C\u684C\u5417\uFF1F";
                if (self._data.tid == 0) {
                    tableid = self._data.atid;
                    msg = "\u662F\u5426\u89E3\u6563\u724C\u684C\uFF1F";
                }
                var options = {
                    msg: msg,
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.emit("tea", 'mod::GameTable::TableDismiss', { fid: self._data.fid, tid: tableid });
                            },
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            colorType: 'blue'
                        }
                    ]
                };
                kaayou.emit('common', 'ui::Dialog::Show', options);
            }, this);
        };
        TH_InGameTable_Cell.prototype.reset = function () {
            this.label_seq.setString("");
            this.label_gameing.setVisible(false);
            this.lbNotStart.setVisible(false);
            this.label_gameRule.setString("");
            this.label_roomNum.setString("");
            this.btn_dis.setVisible(false);
            this.resetPlayers();
        };
        TH_InGameTable_Cell.prototype.resetPlayers = function () {
            lodash.forEach(this.playerItems, function (v, i) {
                v.label_uname.setString("");
                v.img_head.setVisible(false);
                v.btn_sit.setVisible(true);
                v.layout_player.setVisible(false);
            });
        };
        TH_InGameTable_Cell.prototype.setInfo = function (data) {
            var self = this;
            if (lodash.isEqual(this._data, data)) {
                return;
            }
            this._data = !!data ? lodash.cloneDeep(data) : null;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            this.label_seq.setString((this.getIndex() + 1).toString());
            this.label_gameing.setVisible(!!this._data.begin);
            this.lbNotStart.setVisible(!this._data.begin);
            this.label_gameRule.setString(kaayou.Identify.nickNameSubFive(this._data.kname));
            if (this._data.tid && this._data.tmemitems && this._data.tmemitems.length > 0) {
                this.label_roomNum.setString("房号：" + this._data.tid);
            }
            else {
                this.label_roomNum.setString("");
            }
            this.btn_dis.setVisible(this._data.showdis);
            this.setPlayerInfo();
        };
        TH_InGameTable_Cell.prototype.setPlayerInfo = function () {
            this.resetPlayers();
            var self = this;
            var maxScore = 0;
            var __player = this._data.tmemitems;
            if (!__player) {
                return;
            }
            lodash.forEach(this.playerItems, function (v, i) {
                if (!v) {
                    return;
                }
                var it = __player[i];
                if (!it) {
                    //未开始的桌子，按最大人数显示
                    if (!self._data.begin && i < self._data.trule.playernum) {
                        v.layout_player.setVisible(true);
                    }
                    return;
                }
                v.btn_sit.setVisible(false);
                v.label_uname.setString(kaayou.Identify.nickNameSubByLength(it.uname, 6, 4));
                NetImage.setPlayerHead(v.img_head, it.uurl, it.ugender || 0, function (url) {
                    if (!self._data)
                        return false;
                    if (!self._data.tmemitems)
                        return false;
                    if (!self._data.tmemitems[i])
                        return false;
                    if (url !== self._data.tmemitems[i].uurl) {
                        return false;
                    }
                    return true;
                });
                v.img_head.setVisible(true);
                v.layout_player.setVisible(true);
            });
        };
        return TH_InGameTable_Cell;
    }(kaayou.Block));
    common.TH_InGameTable_Cell = TH_InGameTable_Cell;
    var TH_InGameMem_Cell = /** @class */ (function (_super) {
        __extends(TH_InGameMem_Cell, _super);
        function TH_InGameMem_Cell() {
            var _this = _super.call(this) || this;
            _this._index = -1;
            _this.img_head = null; //头像
            _this.label_uname = null; //用户名称标签
            _this.label_online = null; //用户id标签
            _this.btn_invite = null; //详情按钮
            _this.label_invite_detail = null;
            _this._caninvite = false;
            _this._data = null;
            _this._dtaileTime = 0;
            return _this;
        }
        TH_InGameMem_Cell.prototype.setIndex = function (index) {
            this._index = index;
        };
        TH_InGameMem_Cell.prototype.getIndex = function () {
            return this._index;
        };
        TH_InGameMem_Cell.prototype.initWithNode = function (node) {
            var _this = this;
            var self = this;
            _super.prototype.initWithNode.call(this, node);
            this.img_head = ccui.helper.seekWidgetByName(this.node, "img_head");
            this.label_uname = ccui.helper.seekWidgetByName(this.node, "label_uname");
            this.label_online = ccui.helper.seekWidgetByName(this.node, "label_online");
            this.btn_invite = ccui.helper.seekWidgetByName(this.node, "btn_invite");
            this.label_invite_detail = ccui.helper.seekWidgetByName(this.node, "label_invite_detail");
            var ctrName = this.getModuleName();
            var setSearchEventName = "ui::record::setSearch";
            var subpageChangeEventName = "ui::record::SubpageChange";
            this.btn_invite.on(kaayou.TouchEvent.TouchEnd, function () {
                if (!_this._data) {
                    return;
                }
                if (!_this._data.uid) {
                    return;
                }
                kaayou.emit("tea", "mod::GameTable::InviteUser", { uid: _this._data.uid });
                // kaayou.emit(ctrName, subpageChangeEventName, { index: 2, searchkeep: true });
            }, this);
        };
        TH_InGameMem_Cell.prototype.reset = function () {
            this.img_head.setVisible(false);
            this.label_uname.setString("");
            this.label_online.setString("");
            this.label_invite_detail.setString("");
            this.unscheduleUpdate();
            // this.btn_invite 
        };
        TH_InGameMem_Cell.prototype.setInfo = function (data) {
            var self = this;
            if (lodash.eq(this._data, data)) {
                return;
            }
            this._data = !!data ? lodash.cloneDeep(data) : null;
            if (!data || lodash.isEmpty(data)) {
                return this.reset();
            }
            this.label_uname.setString(kaayou.Identify.nickNameSubByLength(this._data.uname, 6, 4));
            if (this._data.inTable)
                this.label_online.setString("游戏中");
            else
                this.label_online.setString(!!this._data.is_online ? "在线" : "离线");
            this.label_online.setTextColor(!!this._data.is_online ? cc.color("#288728") : cc.color("#C43304"));
            this.checkCanInvite();
            NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.gender, function (url) {
                if (!self._data)
                    return false;
                if (url !== self._data.uurl) {
                    return false;
                }
                return true;
            });
            this.img_head.setVisible(true);
        };
        TH_InGameMem_Cell.prototype.checkCanInvite = function () {
            var lastcan = this._caninvite;
            this._caninvite = false;
            if (!this._data.lastInvite) {
                this._data.lastInvite = Date.Unix() - 4;
            }
            var ltime = Date.Unix() - this._data.lastInvite;
            this._caninvite = !!this._data.is_online && (ltime > 3);
            if (lastcan != this._caninvite) {
                this.btn_invite.setBright(this._caninvite);
                this.btn_invite.setEnabled(this._caninvite);
                if (this._caninvite) {
                    this.label_invite_detail.setString("");
                    this.unscheduleUpdate();
                }
                else {
                    var d = Math.floor((this._data.lastInvite + 3 - Date.Unix()));
                    if (d >= 0) {
                        this.label_invite_detail.setString(d + "");
                        this.scheduleUpdate();
                    }
                    else {
                        this.label_invite_detail.setString("");
                        this.unscheduleUpdate();
                    }
                }
            }
        };
        TH_InGameMem_Cell.prototype.update = function (dt) {
            if (!this._data || this._caninvite) {
                this._dtaileTime = 0;
                return;
            }
            this._dtaileTime += dt;
            if (this._dtaileTime < 0.5) {
                return;
            }
            this._dtaileTime = 0;
            var lastInvite = this._data.lastInvite;
            if (!lastInvite) {
                return;
            }
            var d = Math.floor((lastInvite + 3 - Date.Unix()));
            if (d >= 0) {
                this.label_invite_detail.setString(d + "");
            }
            else {
                this._caninvite = !!this._data.is_online;
                this.label_invite_detail.setString("");
                this.btn_invite.setBright(this._caninvite);
                this.btn_invite.setEnabled(this._caninvite);
                this.unscheduleUpdate();
            }
        };
        return TH_InGameMem_Cell;
    }(kaayou.Block));
    var InGameTeaHousePanel = /** @class */ (function (_super) {
        __extends(InGameTeaHousePanel, _super);
        function InGameTeaHousePanel() {
            var _this = _super.call(this) || this;
            _this._data = null;
            _this.btn_close = null;
            _this.dataApply = null;
            _this.dataOnline = null;
            _this.layout_title = null;
            _this.layout_pageGroup = null;
            _this.lbHouseId = null;
            _this.scr_apply = null;
            _this.scr_tables = null;
            _this.scr_member = null;
            _this.tea_apply_cell = null; //申请cell
            _this.tea_table_cell = null; //桌子cell
            _this.tea_invite_cell = null; //邀请cell
            _this.initUI();
            return _this;
        }
        InGameTeaHousePanel.prototype.auth = function () {
            if (this._data.user_info.partner == 1 && this._data.is_partner_apply != true) {
                kaayou.emit(this.getModuleName(), "ui::ApplyRow::HideButton");
            }
            else {
                kaayou.emit(this.getModuleName(), "ui::ApplyRow::ShowButton");
            }
        };
        InGameTeaHousePanel.prototype.initWithccs = function (path, full) {
            if (path === void 0) { path = ''; }
            if (full === void 0) { full = true; }
            if (!lodash.isString(path) || lodash.isEmpty(path)) {
                path = common.res.InGameTeaHousePanel_json;
            }
            _super.prototype.initWithccs.call(this, path, full);
        };
        InGameTeaHousePanel.prototype.initUI = function () {
            var _this = this;
            var self = this;
            this.initWithccs();
            this.lbHouseId = ccui.helper.seekWidgetByName(this.node, "HouseID");
            this.btn_close = ccui.helper.seekWidgetByName(this.node, "btn_close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e) {
                _this.Hide();
            }, this);
            this.layout_title = ccui.helper.seekWidgetByName(this.node, "layout_title");
            this.layout_pageGroup = ccui.helper.seekWidgetByName(this.node, "layout_pageGroup");
            var ctrName = this.getModuleName();
            var subpageChangeEventName = "ui::ingame::subpagechange";
            lodash.forEach(this.layout_title.getChildren(), function (v, i) {
                v['index'] = i;
                v['onSubpageChange'] = function (e) {
                    var _data = e.data;
                    var index = _data.index;
                    if (index > 1) {
                        this.setVisible(this.index > 1);
                    }
                    else {
                        this.setVisible(this.index <= 1);
                    }
                    if (this.index > 1) {
                        return;
                    }
                    if (this.index == index) {
                        this.setSelected(true);
                    }
                    else {
                        this.setSelected(false);
                    }
                };
                kaayou.getController(ctrName).on(subpageChangeEventName, v['onSubpageChange'], v);
                if (i > 1) {
                    // v.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                    //     let target = e.target;
                    //     let { index } = target;
                    //     kaayou.emit(ctrName, subpageChangeEventName, { index })
                    // }, this);
                    return;
                }
                v.on(kaayou.CheckEvent.SELECTED, function (e) {
                    var target = e.target;
                    var index = target.index;
                    kaayou.emit(ctrName, subpageChangeEventName, { index: index });
                }, _this);
                v.on(kaayou.CheckEvent.UNSELECTED, function (e) {
                    var target = e.target;
                    var index = target.index;
                    kaayou.emit(ctrName, subpageChangeEventName, { index: index });
                }, _this);
            });
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onPageChange, this);
            kaayou.getController(ctrName).on("ui::ApplyList::Add", function (e) {
                self.dataApply.push(e.data);
                this.doUpdateApply(self.dataApply);
            }, this);
            kaayou.getController(ctrName).on("ui::OnlineList::InTable", function (e) {
                for (var i = 0; i < self.dataOnline.length; ++i) {
                    if (self.dataOnline[i].uid == e.data.uid) {
                        self.dataOnline.splice(i, 1);
                        break;
                    }
                }
                this.doUpdateMember(self.dataOnline);
            }, this);
            this.initApplyList();
            this.initMemList();
            this.initTableList();
            this.bindUIEvents();
        };
        InGameTeaHousePanel.prototype.onPageChange = function (e) {
            var _data = e.data;
            var index = _data.index;
            if (index > 1) {
                index = 1;
            }
            lodash.forEach(this.layout_pageGroup.getChildren(), function (v, i) {
                v.setVisible(i == index);
            });
        };
        InGameTeaHousePanel.prototype.initApplyList = function () {
            var _this = this;
            this.tea_apply_cell = ccui.helper.seekWidgetByName(this.node, "tea_apply_cell");
            this.scr_apply = new common.PullList();
            this.scr_apply.initWithNode(ccui.helper.seekWidgetByName(this.node, "scr_apply"));
            this.scr_apply.setSpacingY(8);
            this.scr_apply.setEnabledBar(false);
            this.scr_apply.setAdpter({
                datas: [],
                getCell: function () {
                    return _this.getApplyCell();
                }
            });
            this.scr_apply.initPullEnv(false);
        };
        InGameTeaHousePanel.prototype.getApplyCell = function () {
            var v = new TH_InGameApply_Cell();
            v.setModuleName(this.getModuleName());
            v.initWithNode(this.tea_apply_cell);
            return v;
        };
        InGameTeaHousePanel.prototype.onUpdateApply = function (e) {
            this.doUpdateApply(e.data);
        };
        InGameTeaHousePanel.prototype.doUpdateApply = function (data) {
            this.dataApply = data;
            this.scr_apply.getAdpter().datas = lodash.clone(data);
            this.scr_apply.refresh();
            this.auth();
        };
        InGameTeaHousePanel.prototype.initMemList = function () {
            var _this = this;
            this.tea_invite_cell = ccui.helper.seekWidgetByName(this.node, "tea_invite_cell");
            this.scr_member = new common.PullList();
            this.scr_member.initWithNode(ccui.helper.seekWidgetByName(this.node, "scr_member"));
            this.scr_member.setSpacingY(8);
            this.scr_member.setEnabledBar(false);
            this.scr_member.setAdpter({
                datas: [],
                getCell: function () {
                    return _this.getMemCell();
                }
            });
            this.scr_member.initPullEnv(false);
        };
        InGameTeaHousePanel.prototype.getMemCell = function () {
            var v = new TH_InGameMem_Cell();
            v.setModuleName(this.getModuleName());
            v.initWithNode(this.tea_invite_cell);
            return v;
        };
        InGameTeaHousePanel.prototype.onUpdateMember = function (e) {
            this.doUpdateMember(e.data);
        };
        InGameTeaHousePanel.prototype.doUpdateMember = function (data) {
            this.dataOnline = data;
            this.scr_member.getAdpter().datas = lodash.clone(data);
            this.scr_member.refresh();
        };
        InGameTeaHousePanel.prototype.initTableList = function () {
            var _this = this;
            this.tea_table_cell = ccui.helper.seekWidgetByName(this.node, "tea_table_cell");
            this.scr_tables = new common.PullList();
            this.scr_tables.initWithNode(ccui.helper.seekWidgetByName(this.node, "scr_tables"));
            this.scr_tables.setSpacingY(8);
            this.scr_tables.setEnabledBar(false);
            this.scr_tables.setAdpter({
                datas: [],
                getCell: function () {
                    return _this.getTableCell();
                }
            });
            this.scr_tables.initPullEnv(false);
        };
        InGameTeaHousePanel.prototype.getTableCell = function () {
            var v = new TH_InGameTable_Cell();
            v.setModuleName(this.getModuleName());
            v.initWithNode(this.tea_table_cell);
            return v;
        };
        InGameTeaHousePanel.prototype.onUpdateTable = function (e) {
            this.doUpdateTable(e.data);
        };
        InGameTeaHousePanel.prototype.doUpdateTable = function (data) {
            this.scr_tables.getAdpter().datas = lodash.clone(data) || [];
            this.scr_tables.refresh();
        };
        InGameTeaHousePanel.prototype.bindUIEvents = function () {
            kaayou.getController(this.getModuleName()).on("ui::ingame::updateApply", this.onUpdateApply, this);
            kaayou.getController(this.getModuleName()).on("ui::ingame::updateMember", this.onUpdateMember, this);
            kaayou.getController(this.getModuleName()).on("ui::ingame::updateTable", this.onUpdateTable, this);
        };
        InGameTeaHousePanel.prototype.Show = function (data) {
            this._data = data;
            var ctrName = this.getModuleName();
            var subpageChangeEventName = "ui::ingame::subpagechange";
            if (!data.user_info) {
                kaayou.emit(ctrName, subpageChangeEventName, { index: 2 });
            }
            else {
                if (data.user_info.urole == tea.HouseMemberRole.OWNER || data.user_info.urole == tea.HouseMemberRole.ADMIN
                    || data.user_info.partner == 1) {
                    kaayou.emit(ctrName, subpageChangeEventName, { index: 1 });
                    if (data.apply_users) {
                        this.doUpdateApply(data.apply_users);
                    }
                }
                else {
                    kaayou.emit(ctrName, subpageChangeEventName, { index: 2 });
                }
            }
            if (data.ftableitems) {
                this.doUpdateTable(data.ftableitems);
                this.scr_tables.setScrollToOffsetTop(0);
            }
            if (data.online_users) {
                this.doUpdateMember(data.online_users);
            }
            if (data.hid > 0) {
                this.lbHouseId.setString("亲友圈：" + data.hid);
            }
            else {
                this.lbHouseId.setString("");
            }
            this.auth();
            this.setVisible(true);
        };
        InGameTeaHousePanel.prototype.Hide = function () {
            kaayou.emit("tea", "mod::GameTable::unsubscriptionFloor", { netname: this.getNetName(), modulename: this.getModuleName() });
            this.setVisible(false);
        };
        return InGameTeaHousePanel;
    }(kaayou.Layer));
    common.InGameTeaHousePanel = InGameTeaHousePanel;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var LoadingPanel = /** @class */ (function (_super) {
        __extends(LoadingPanel, _super);
        function LoadingPanel() {
            var _this = _super.call(this) || this;
            _this.maskBg = null;
            _this.loadNode = null;
            _this.lbMsg = null;
            _this.dotLable = null;
            ///////
            _this.call = null;
            _this.message = "";
            // callInterval: number = 0;
            _this.msgIndex = -1;
            _this.arrMessage = null;
            _this.addDot = true;
            _this.toastCall = null;
            _this.Sprite_1 = null;
            _this.__dttime = 0;
            _this.__dtotime = 0;
            _this.__isNoOvertimeText = false;
            _this.__beganTime = -1;
            _this.__closeTime = -1;
            _this.__ddtime = 0;
            _this.__dhotime = 0;
            _this.initUI();
            return _this;
        }
        LoadingPanel.prototype.initUI = function () {
            this.initWithccs(common.res.LoadingPanel_json, true);
            var self = this;
            this.maskBg = ccui.helper.seekWidgetByName(this.node, "maskbg");
            this.loadNode = ccui.helper.seekWidgetByName(this.node, "loadNode");
            this.lbMsg = ccui.helper.seekWidgetByName(this.node, "msgLable");
            this.lbMsg.ignoreContentAdaptWithSize(true);
            this.dotLable = ccui.helper.seekWidgetByName(this.node, "dotLable");
            this.dotLable.ignoreContentAdaptWithSize(true);
            this.Sprite_1 = ccui.helper.seekWidgetByName(this.node, "Sprite_1");
            //var spineBoy = sp.SkeletonAnimation.createWithJsonFile(common.res.Loading_spine_json, common.res.Loading_spine_atlas, 1);
            //spineBoy.setAnimation(0, 'KWX_Lording', true);
            // self.loadNode.addChild(spineBoy);
            this.forcehide();
            this.scheduleUpdate();
        };
        LoadingPanel.prototype.show = function (data) {
            data = data || { time: 15, action: null, msg: "信息加载中", arrMsg: null, addDot: true, refresh: true, noAni: false };
            this.addDot = !(data.addDot === false);
            data.time = lodash.isNumber(data.time) ? data.time : 15;
            data.action = data.action || null;
            data.msg = data.msg || "信息加载中";
            this.message = data.msg;
            this.call = data.action;
            this.arrMessage = data.arrMsg || null;
            this.__beganTime = new Date().getTime();
            this.__isNoOvertimeText = !!!data.overtimetext;
            if (data.time >= 0) {
                data.time = data.time == 0 ? 15 : data.time;
                this.__closeTime = this.__beganTime + data.time * 1000;
            }
            else {
                this.__closeTime = -1;
            }
            // if (this.addDot) {
            //     this.dotLable.setVisible(true);
            // }
            this.lbMsg.setVisible(true);
            this.lbMsg.setString(this.message);
            var noAni = !!data.noAni;
            if (noAni) {
                this.node.setOpacity(255);
            }
            else {
                this.node.getOpacity() == 0 && this.node.runAction(cc.sequence(cc.delayTime(1), cc.fadeIn(1)));
            }
            this.setVisible(true);
        };
        LoadingPanel.prototype.hide = function (data) {
            var t = new Date().getTime();
            data = data || { force: false };
            if (data.force) {
                this.forcehide();
            }
            if (this.__closeTime < 0) {
            }
            else if (this.__closeTime - t < 100) {
                return;
            }
            this.__closeTime = t + 100;
        };
        LoadingPanel.prototype.changeDot = function (dt) {
            this.__ddtime += dt;
            if (this.__ddtime < 0.5) {
                return;
            }
            this.__ddtime = 0;
            if (!this.isVisible()) {
                return;
            }
            if (this.__closeTime < 0) {
                return;
            }
            if (this.__beganTime < 0) {
                return;
            }
            if (this.addDot) {
                // let difftime = new Date().getTime() - this.__beganTime;
                var n = this.dotLable.getString().length;
                var s = "";
                if (n > 2) {
                    s = "";
                }
                else {
                    n++;
                    for (var i = 0; i < n; i++) {
                        s += ".";
                    }
                }
                this.dotLable.setString(s);
                this.lbMsg.setString(this.message + s);
            }
            else {
                this.dotLable.setString("");
            }
        };
        LoadingPanel.prototype.changeText = function (dt) {
            this.__dttime += dt;
            if (this.__dttime < 0.5) {
                return;
            }
            this.__dttime = 0;
            if (!this.isVisible()) {
                this.msgIndex = -1;
                return;
            }
            if (!this.arrMessage) {
                this.msgIndex = -1;
                return;
            }
            if (this.msgIndex + 1 >= this.arrMessage.length) {
                this.msgIndex = -1;
                return;
            }
            var s = this.arrMessage[++this.msgIndex];
            this.message = s;
            this.lbMsg.setString(this.message);
        };
        LoadingPanel.prototype.doOvertimeText = function (dt) {
            if (this.__isNoOvertimeText) {
                return;
            }
            this.__dtotime += dt;
            if (this.__dtotime < 0.5) {
                return;
            }
            this.__dtotime = 0;
            if (!this.isVisible()) {
                return;
            }
            if (this.__beganTime < 0) {
                return;
            }
            var t = new Date().getTime() - this.__beganTime;
            if (t > 5000) {
                var s = "";
                if (t < 6000) {
                    s = "网络状态异常...";
                }
                else if (t < 7000) {
                    s = "网络状态异常...1";
                }
                else if (t < 8000) {
                    s = "网络状态异常...2";
                }
                else if (t < 9000) {
                    s = "网络状态异常...3";
                }
                this.message = s;
                this.lbMsg.setString(this.message);
            }
        };
        LoadingPanel.prototype.forcehide = function () {
            this.__beganTime = -1;
            this.__closeTime = -1;
            this.msgIndex = -1;
            this.arrMessage = null;
            this.addDot = false;
            this.lbMsg.setString("");
            this.lbMsg.setVisible(false);
            this.dotLable.setString("");
            this.dotLable.setVisible(false);
            this.setVisible(false);
            this.node.stopAllActions();
            this.node.setOpacity(0);
            var c = this.call;
            this.call = null;
            if (c != null) {
                c();
            }
        };
        LoadingPanel.prototype.needHide = function (dt) {
            this.__dhotime += dt;
            if (this.__dhotime < 0.1) {
                return;
            }
            this.__dhotime = 0;
            if (!this.isVisible()) {
                return;
            }
            if (this.__closeTime < 0) {
                return;
            }
            if (this.__beganTime < 0) {
                return;
            }
            if (this.__closeTime - new Date().getTime() <= 0) {
                this.forcehide();
            }
        };
        LoadingPanel.prototype.update = function (dt) {
            this.Sprite_1.rotation = this.Sprite_1.rotation + dt * 600;
            this.needHide(dt);
            this.changeDot(dt);
            this.changeText(dt);
            this.doOvertimeText(dt);
        };
        __decorate([
            doBindEvent
        ], LoadingPanel.prototype, "initUI", null);
        __decorate([
            BindEvent('common', 'ui::Loading::Show')
        ], LoadingPanel.prototype, "show", null);
        __decorate([
            BindEvent('common', 'ui::Loading::Hide')
        ], LoadingPanel.prototype, "hide", null);
        return LoadingPanel;
    }(kaayou.Layer));
    common.LoadingPanel = LoadingPanel;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var LobbySettingPanel = /** @class */ (function (_super) {
        __extends(LobbySettingPanel, _super);
        function LobbySettingPanel() {
            var _this = _super.call(this) || this;
            _this.btnCheck = null;
            _this.btnExit = null;
            _this.maskBg = null;
            _this.contentPanel = null;
            _this.btn_close = null;
            _this.img_music = null;
            _this.img_effect = null;
            _this.btn_change = null;
            _this.label_version = null;
            _this.img_updatePoint1 = null;
            _this.img_updatePoint2 = null;
            _this.isMusic = false;
            _this.isEffect = false;
            _this.imgOffName = "SettingPanel.off.png";
            _this.imgOnName = "SettingPanel.on.png";
            _this.btn_auto = null;
            _this.btn_logout = null;
            _this.btn_privace = null;
            _this.btn_agreement = null;
            _this.btnCall = null;
            _this.close_call = null;
            _this.initUI();
            return _this;
        }
        LobbySettingPanel.prototype.initUI = function () {
            this.initWithccs(common.res.LobbySettingPanel_json, true);
            var self = this;
            this.maskBg = ccui.helper.seekWidgetByName(this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(this.node, "contentPanel");
            this.btnExit = ccui.helper.seekWidgetByName(this.node, "btnExit");
            this.btnExit.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                var options = {
                    msg: "您是否要退出游戏？",
                    btns: [
                        {
                            colorType: 'green',
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                cc.game.end();
                            },
                        },
                        {
                            name: "取消",
                            colorType: 'blue',
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                            }
                        }
                    ]
                };
                kaayou.emit('common', 'ui::Dialog::Show', options);
            }, this);
            this.btn_close = ccui.helper.seekWidgetByName(this.node, "btn_close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.onHide();
            }, this);
            this.btnCheck = ccui.helper.seekWidgetByName(this.node, "CheckButton");
            this.btnCheck.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                var mapStr = kaayou.DataSet.get("user::Map") || "";
                //切换账户
                var options = {
                    msg: "您的GPS信息是：" + mapStr,
                    btns: [
                        {
                            colorType: 'green',
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                            },
                        }
                    ]
                };
                kaayou.emit('common', 'ui::Dialog::Show', options);
            }, this);
            this.btn_change = ccui.helper.seekWidgetByName(this.node, "btn_change");
            this.btn_change.on(kaayou.TouchEvent.TouchEnd, function () {
                //切换账户
                var options = {
                    msg: "您是否要切换账号？",
                    btns: [
                        {
                            colorType: 'green',
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("lobby", "mod::User::LogOut");
                            },
                        },
                        {
                            name: "取消",
                            colorType: 'blue',
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                            }
                        }
                    ]
                };
                kaayou.emit('common', 'ui::Dialog::Show', options);
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            }, this);
            this.img_music = ccui.helper.seekWidgetByName(this.node, "img_music");
            this.img_music.on(kaayou.TouchEvent.TouchEnd, this.onMusicChange, this);
            this.img_effect = ccui.helper.seekWidgetByName(this.node, "img_effect");
            this.img_effect.on(kaayou.TouchEvent.TouchEnd, this.onEffectChange, this);
            this.label_version = ccui.helper.seekWidgetByName(this.node, "Text_update");
            this.img_updatePoint1 = ccui.helper.seekWidgetByName(this.node, "Image_updatePoint1");
            this.img_updatePoint2 = ccui.helper.seekWidgetByName(this.node, "Image_updatePoint2");
            this.btn_auto = ccui.helper.seekWidgetByName(this.node, "btn_auto");
            this.btn_auto.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                console.log("btn_auto");
                kaayou.emit("lobby", "ui::authSetting::Show");
            }, this);
            this.btn_logout = ccui.helper.seekWidgetByName(this.node, "btn_logout");
            this.btn_logout.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                console.log("btn_logout");
                kaayou.emit('lobby', 'ui::CustomRegOutPanel::Show');
            }, this);
            this.btn_privace = ccui.helper.seekWidgetByName(this.node, "btn_privace");
            this.btn_privace.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                console.log("btn_privace");
                kaayou.emit('lobby', 'ui::Policy::Show');
            }, this);
            this.btn_agreement = ccui.helper.seekWidgetByName(this.node, "btn_agreement");
            this.btn_agreement.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                console.log("btn_agreement");
                kaayou.emit('lobby', 'ui::Agreement::Show');
            }, this);
            this.setVisible(false);
        };
        LobbySettingPanel.prototype.onMusicChange = function (e) {
            this.isMusic = !this.isMusic;
            cc.sys.localStorage.setItem('tog_music', this.isMusic ? 'true' : 'false');
            this.doMusicChange();
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
        };
        LobbySettingPanel.prototype.doMusicChange = function () {
            var b = !('false' === cc.sys.localStorage.getItem('tog_music'));
            this.isMusic = b;
            this.img_music.loadTexture(b ? this.imgOnName : this.imgOffName, ccui.Widget.PLIST_TEXTURE);
            var isPlaying = cc.audioEngine.isMusicPlaying();
            if (isPlaying && b)
                return;
            if (b) {
                kaayou.SoundManager.getInstance().playBgm(common.SoundRes.Game_bgm);
            }
            else {
                kaayou.SoundManager.getInstance().stopMusic();
            }
            // this.btn_music.getChildren()[0].setPositionX(b ? 120 : 26);
        };
        LobbySettingPanel.prototype.onEffectChange = function (e) {
            this.isEffect = !this.isEffect;
            cc.sys.localStorage.setItem('tog_effect', this.isEffect ? 'true' : 'false');
            this.doEffectChange();
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
        };
        LobbySettingPanel.prototype.doEffectChange = function () {
            var b = !('false' === cc.sys.localStorage.getItem('tog_effect'));
            this.isEffect = b;
            this.img_effect.loadTexture(b ? this.imgOnName : this.imgOffName, ccui.Widget.PLIST_TEXTURE);
            // this.btn_effect.getChildren()[0].setPositionX(b ? 120 : 26);
        };
        LobbySettingPanel.prototype.show = function (data) {
            {
                var configs = common.mod.Config.AppConfig;
                var feature = lodash.extend({}, configs.feature);
                if (configs && feature) {
                    this.btn_change.setVisible(!!(feature.stc));
                }
            }
            this.doMusicChange();
            this.doEffectChange();
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {
                }
            });
        };
        LobbySettingPanel.prototype.onHide = function () {
            kaayou.pop.hideAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                rnode: this,
                action: function () {
                }
            });
            //this.setVisible(false);
        };
        __decorate([
            doBindEvent
        ], LobbySettingPanel.prototype, "initUI", null);
        __decorate([
            BindEvent('common', 'ui::LobbySettingPanel::Show')
        ], LobbySettingPanel.prototype, "show", null);
        __decorate([
            BindEvent('common', 'ui::LobbySettingPanel::Hide')
        ], LobbySettingPanel.prototype, "onHide", null);
        return LobbySettingPanel;
    }(kaayou.Layer));
    common.LobbySettingPanel = LobbySettingPanel;
})(common || (common = {}));
var common;
(function (common) {
    var MicLayer = /** @class */ (function (_super) {
        __extends(MicLayer, _super);
        function MicLayer(minBtn, mod) {
            var _this = _super.call(this) || this;
            _this.minBtn = null;
            _this.voicesSp = null;
            _this.cancelBox = null;
            _this.effective = true;
            _this.mod_game = null;
            _this._isCancel = false;
            _this.curPIndex = 1;
            _this.lasttime = 0;
            _this.isMicStart = false;
            _this.isMicPlayStart = false;
            cc.spriteFrameCache.addSpriteFrames(common.res.micLayerPlist);
            _this.minBtn = minBtn;
            _this.mod_game = mod;
            _this.initUi();
            return _this;
        }
        MicLayer.prototype.initUi = function () {
            this.initWithccs(common.res.micLayer_json);
            this.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
            this.voicesSp = ccui.helper.seekWidgetByName(this.node, "voicesSp");
            this.cancelBox = ccui.helper.seekWidgetByName(this.node, "cancelBox");
            if (!this.minBtn) {
                cc.error("minBtn is null");
                return;
            }
            // this.lasttime = Date.unix();
            this.lasttime = Math.floor((new Date()).getTime() / 1000);
            this.cancelBox.visible = false;
            this.voicesSp.visible = false;
            this.bindEvent();
            // let userinfo = UserMod.getInstance().getUserInfo();
            this.minBtn.visible = kaayou.PlatformMgr.getInstance().im.IsLoginOK();
        };
        MicLayer.prototype.bindEvent = function () {
            var self = this;
            this.schedule(function () {
                if (!self.voicesSp.visible) {
                    return;
                }
                if (!self.effective)
                    return;
                self.curPIndex = self.curPIndex > 5 ? 1 : self.curPIndex;
                self.voicesSp.loadTexture('yy_' + self.curPIndex + '.png', ccui.Widget.PLIST_TEXTURE);
                self.curPIndex++;
            }, 0.2, cc.REPEAT_FOREVER);
            kaayou.getController().on("MicLoginOK", function () {
                try {
                    if (!!self.minBtn) {
                        self.minBtn.visible = true;
                    }
                }
                catch (err) {
                    console.log("MicLoginOK ERR:", err);
                }
            }.bind(this), this);
            kaayou.getController().on("MicStart", function () {
                kaayou.SoundManager.getInstance().setMute(true);
                self.isMicStart = true;
            }, this);
            kaayou.getController().on("MicStop", function () {
                self.isMicStart = false;
            }, this);
            kaayou.getController().on("MicFail", function () {
                kaayou.SoundManager.getInstance().setMute(false || self.isMicPlayStart);
                self.isMicStart = false;
            }, this);
            kaayou.getController().on('MicPlayStart', function (e) {
                kaayou.SoundManager.getInstance().setMute(true);
                self.isMicPlayStart = true;
            }, this);
            kaayou.getController().on('MicPlayEnd', function (e) {
                console.log("on MicPlayEnd isMicStart:", self.isMicStart);
                kaayou.SoundManager.getInstance().setMute(false || self.isMicStart);
                self.isMicPlayStart = false;
            }, this);
            var testGVoiceCount = 0;
            this.minBtn.on(kaayou.TouchEvent.TouchStart, function (e) {
                self.effective = true;
                var playernum = self.mod_game.getCurPlayerNum();
                //for test GVoice
                if (!cc.sys.isNative) {
                    kaayou.PlatformMgr.getInstance().gvoice.OnMemberVoice(99, (++testGVoiceCount) % 2);
                }
                if (playernum < 2) {
                    self.effective = false;
                    kaayou.emit('common', 'ui::Toast::Show', { msg: '没有聊天对象,赶紧找一个吧', time: 0.5, mask: false });
                    return;
                }
                if (self.isMicPlayStart) {
                    self.effective = false;
                    kaayou.emit('common', 'ui::Toast::Show', { msg: '语音播放中，不能录音', time: 0.5, mask: false });
                    return;
                }
                var curTime = Math.floor((new Date()).getTime() / 1000);
                var subTime = curTime - self.lasttime;
                if (subTime <= 2) {
                    self.effective = false;
                    kaayou.emit('common', 'ui::Toast::Show', { msg: '发送太频繁了哦', time: 0.5, mask: false });
                    return;
                }
                self.lasttime = curTime;
                self.curPIndex = 3;
                self.cancelBox.visible = false;
                self.voicesSp.visible = true;
                self.voicesSp.loadTexture('yy_3.png', ccui.Widget.PLIST_TEXTURE);
                kaayou.PlatformMgr.getInstance().im.BeginMic();
            }, this);
            this.minBtn.on(kaayou.TouchEvent.TouchMove, function (e) {
                if (!self.effective) {
                    return;
                }
                var node = e.target;
                var vec = node.convertToNodeSpace(node.getTouchMovePosition());
                var rect = cc.rect(0, 0, node.width, node.height);
                var b = cc.rectContainsPoint(rect, vec);
                self._isCancel = self.cancelBox.visible = !b;
                self.voicesSp.visible = b;
            }, this);
            this.minBtn.on(kaayou.TouchEvent.TouchEnd, function (e) {
                if (!self.effective) {
                    return;
                }
                self.cancelBox.visible = false;
                self.voicesSp.visible = false;
                if (self.isMicStart) {
                    self.isMicStart = false;
                    kaayou.SoundManager.getInstance().setMute(false || self.isMicPlayStart);
                    kaayou.PlatformMgr.getInstance().im.EndMic();
                }
            }, this);
            this.minBtn.on(kaayou.TouchEvent.TouchCance, function (e) {
                if (!self.effective) {
                    return;
                }
                self.cancelBox.visible = false;
                self.voicesSp.visible = false;
                if (self.isMicStart) {
                    self.isMicStart = false;
                    kaayou.SoundManager.getInstance().setMute(false || self.isMicPlayStart);
                    kaayou.PlatformMgr.getInstance().im.CancelMic();
                }
            }, this);
        };
        return MicLayer;
    }(kaayou.Layer));
    common.MicLayer = MicLayer;
})(common || (common = {}));
var common;
(function (common) {
    var PlayerFleeLayer = /** @class */ (function (_super) {
        __extends(PlayerFleeLayer, _super);
        function PlayerFleeLayer(ccs, mod) {
            var _this = _super.call(this) || this;
            _this._curmod = null;
            _this.bg = null;
            _this.infoLabel = null;
            _this.bg1 = null;
            _this.infoLabel1 = null;
            _this._overTime = 0;
            _this.timer = 0;
            _this.minName = "";
            _this.tmpArr = [];
            _this.curShowName = "";
            _this._curmod = mod;
            _this.initWithccs(ccs);
            return _this;
        }
        PlayerFleeLayer.prototype.initUi = function () {
            this.bg = ccui.helper.seekWidgetByName(this.node, "bg");
            this.infoLabel = ccui.helper.seekWidgetByName(this.node, "infoLabel");
            this.infoLabel.ignoreContentAdaptWithSize(true);
            this.bg1 = ccui.helper.seekWidgetByName(this.node, "bg1");
            this.infoLabel1 = ccui.helper.seekWidgetByName(this.node, "infoLabel1");
            this.infoLabel1.ignoreContentAdaptWithSize(true);
            this.bg.setVisible(false);
            this.bg1.setVisible(false);
        };
        PlayerFleeLayer.prototype.ReEnter = function () {
            this.scheduleUpdate();
        };
        PlayerFleeLayer.prototype.onMyExit = function () {
            this.unscheduleUpdate();
        };
        PlayerFleeLayer.prototype.show = function (data) {
            this.minName = data.minName;
            // this.setTime(data.time);
            this._overTime = data.time;
            var tmpArr = [];
            for (var i = 0; i < data.fleeinfo.length; i++) {
                if (!data.fleeinfo[i].hasExit) {
                    tmpArr.push({ name: data.fleeinfo[i].name, index: data.fleeinfo[i].index });
                }
            }
            this.tmpArr = tmpArr;
            this.unschedule(this.cb);
            this.schedule(this.cb, 3, this.tmpArr.length, 0.01); //这里只能写0.01,写0的话就会延迟3S才会执行第一次
        };
        PlayerFleeLayer.prototype.close = function () {
            this._overTime = 0;
            this.bg.setVisible(false);
            this.bg1.setVisible(false);
        };
        PlayerFleeLayer.prototype.onSetInfo = function (data) {
            cc.log(data);
            if (!data)
                return;
            if (data.fleeinfo.length < 1 || data.time < 1) {
                this.close();
                return;
            }
            this.show(data);
        };
        PlayerFleeLayer.prototype.cb = function () {
            this.curShowName = "";
            if (this.tmpArr.length > 0) {
                var info = this.tmpArr.shift();
                var name_1 = kaayou.Identify.nickNameSubFive(info.name);
                this.curShowName = name_1;
                this.infoLabel.string = "[" + name_1 + "]离线了," + this.changeStoM(this._overTime) + "后未回来,则房间解散!";
                this.bg.setVisible(true);
                this._curmod.setHasExit({ index: info.index });
            }
            else {
                this.unschedule(this.cb);
                this.bg.setVisible(false);
            }
        };
        PlayerFleeLayer.prototype.updateOfflineTime = function () {
            this.infoLabel.string = "[" + this.curShowName + "]离线了," + this.changeStoM(this._overTime) + "后未回来,则房间解散!";
        };
        //[玩家A]已离线9分51秒,9秒后未回来,房间将自动解散
        PlayerFleeLayer.prototype.update = function (dt) {
            if (this._overTime <= 0)
                return;
            this.timer += dt;
            if (this.timer > 1) {
                this._overTime--;
                this.timer = 0;
                this.updateOfflineTime();
                if (this._overTime < 15) {
                    this.bg1.setVisible(true);
                    this.infoLabel1.string = "[" + this.minName + "]已经离线" + this.changeStoM(300 - this._overTime) + "," + this.changeStoM(this._overTime) + "后未回来,则房间将自动解散!";
                }
            }
        };
        PlayerFleeLayer.prototype.changeStoM = function (time) {
            var m = Math.floor(time / 60);
            var s = time - m * 60;
            var timestr = '0' + m + '分' + (s < 10 ? '0' + s : s) + '秒';
            return timestr;
        };
        return PlayerFleeLayer;
    }(kaayou.Layer));
    common.PlayerFleeLayer = PlayerFleeLayer;
})(common || (common = {}));
var common;
(function (common) {
    var PlayerInfoLayer = /** @class */ (function (_super) {
        __extends(PlayerInfoLayer, _super);
        function PlayerInfoLayer() {
            var _this = _super.call(this) || this;
            _this._curMod = null;
            //其他玩家信息面板
            _this._playerInfoPanel = null;
            _this._text_playerNameTitle = null;
            _this._text_playerName = null;
            _this._text_playerBeanNumTitle = null;
            _this._text_playerBeanNum = null;
            _this._text_playerZhanJiTitle = null;
            _this._text_playerZhanJi = null;
            _this._text_playerWinRateTitle = null;
            _this._text_playerWinRate = null;
            _this._text_playerEscapeRateTitle = null;
            _this._text_playerEscapeRate = null;
            _this._isShiLianFa = false;
            _this._pos_player = [];
            //当前玩家信息面板
            _this._mineInfoPanel = null;
            _this._text_mineNameTitle = null;
            _this._text_mineName = null;
            _this._text_mineBeanNumTitle = null;
            _this._text_mineBeanNum = null;
            _this._text_mineZhanJiTitle = null;
            _this._text_mineZhanJi = null;
            _this._text_mineWinRateTitle = null;
            _this._text_mineWinRate = null;
            _this._text_mineEscapeRateTitle = null;
            _this._text_mineEscapeRate = null;
            _this._pos_mine = cc.p(0, 0);
            //举报面板
            _this._reportPanel = null;
            _this._checkbox_cheat = null;
            _this._checkbox_wgnc = null;
            _this._checkbox_bwmyy = null;
            //点击index
            _this._toIndex = -1;
            _this._isBindEvent = false;
            _this._isBindEvent = false;
            _this._toIndex = -1;
            return _this;
        }
        PlayerInfoLayer.prototype.setCurMod = function (curMod) {
            if (this._isBindEvent) {
                return console.error('多次绑定 PlayerInfoLayer');
            }
            this._curMod = curMod;
            var self = this;
            kaayou.getController(this._curMod.getModuleName()).on('ui::PlayerInfo::Show', function (e) {
                var isPrCheat = false;
                var isAISuper = false;
                var tableInfo = this._curMod.getTableInfo();
                if (tableInfo && tableInfo.hasOwnProperty("join_type") && tableInfo["join_type"] == 2) {
                    isPrCheat = true;
                }
                if (tableInfo && tableInfo.hasOwnProperty("isaisuper") && tableInfo["isaisuper"] == true) {
                    isAISuper = true;
                }
                if ((isPrCheat && !this._curMod._isGameStart) || isAISuper) { //防作弊
                    return false;
                }
                self.onShowPlayerInfo(e.data);
            }, this);
            //ui::PlayerInfoLayer::Show
            kaayou.getController(this._curMod.getModuleName()).on('ui::MineInfo::Show', function (e) {
                self.onShowMineInfo();
            }, this);
            //因为特定区域的游戏GPS要隐藏
            //创建userinfolayer节点可能在tableinfo之前 也可能在之后  之前为了优化加载速度  部分节点需要的时候才会显示
            this.onHideAddress();
            kaayou.getController(this._curMod.getModuleName()).on('ui::playerInfoLayer::hideAddress', function (e) {
                self.onHideAddress();
            }, this);
        };
        PlayerInfoLayer.prototype.onHideAddress = function () {
            if (this._curMod.tableInfo && this._curMod.tableInfo.hasOwnProperty("privategps")) {
                console.log("onHideAddress");
                //麻将GPS  
                var GPS = ccui.helper.seekWidgetByName(this.node, "GPS");
                //纸牌Image_GPS  text_playerInfoaddress
                var Image_GPS = ccui.helper.seekWidgetByName(this.node, "Image_GPS");
                var text_playerInfoaddress = ccui.helper.seekWidgetByName(this.node, "text_playerInfoaddress");
                if (GPS)
                    GPS.setVisible(!this._curMod.tableInfo["privategps"]);
                if (Image_GPS)
                    Image_GPS.setVisible(!this._curMod.tableInfo["privategps"]);
                if (text_playerInfoaddress)
                    text_playerInfoaddress.setVisible(!this._curMod.tableInfo["privategps"]);
            }
        };
        return PlayerInfoLayer;
    }(kaayou.ModelLayer));
    common.PlayerInfoLayer = PlayerInfoLayer;
})(common || (common = {}));
var common;
(function (common) {
    var RadioGroup = /** @class */ (function () {
        function RadioGroup() {
            this._radios = null;
            this._radios = [];
        }
        RadioGroup.prototype.add = function (radio) {
            for (var x in this._radios) {
                if (this._radios[x] === radio) {
                    return false;
                }
            }
            this._radios.push(radio);
            radio['radioGroup'] = this;
            radio.setSelected(false);
            radio.on(kaayou.CheckEvent.SELECTED, this.onSelect, this);
            radio.on(kaayou.CheckEvent.UNSELECTED, this.onSelect, this);
            // for(var x in this._radios){
            //     this._radios[x].setSelected(Number(x) == 0);
            // }
        };
        RadioGroup.prototype.remove = function (radio) {
            var index = -1;
            for (var x in this._radios) {
                if (this._radios[x] === radio) {
                    index = Number(x);
                    break;
                }
            }
            if (index < 0) {
                return;
            }
            lodash.pullAt(this._radios, [index]);
            radio['radioGroup'] = null;
            radio.setSelected(false);
            radio.off(kaayou.CheckEvent.SELECTED, this.onSelect, this);
            radio.off(kaayou.CheckEvent.UNSELECTED, this.onSelect, this);
        };
        RadioGroup.prototype.removeAll = function () {
            for (var x in this._radios) {
                var radio = this._radios[x];
                radio['radioGroup'] = null;
                radio.setSelected(false);
                radio.off(kaayou.CheckEvent.SELECTED, this.onSelect, this);
                radio.off(kaayou.CheckEvent.UNSELECTED, this.onSelect, this);
            }
            this._radios = [];
        };
        RadioGroup.prototype.setSelected = function (target) {
            if (target instanceof ccui.CheckBox) {
                for (var x in this._radios) {
                    if (target === this._radios[x]) {
                        this._radios[x].setSelected(true);
                        var e = kaayou.Event.create(kaayou.CheckEvent, kaayou.RadioEvent.SELECTED);
                        e.currentTarget = e.target = this._radios[x];
                        this._radios[x].dispatch(e);
                    }
                    else {
                        this._radios[x].setSelected(false);
                        var e = kaayou.Event.create(kaayou.CheckEvent, kaayou.RadioEvent.UNSELECTED);
                        e.currentTarget = e.target = this._radios[x];
                        this._radios[x].dispatch(e);
                    }
                }
            }
        };
        RadioGroup.prototype.onSelect = function (e) {
            var target = e.target;
            if (target instanceof ccui.CheckBox) {
                for (var x in this._radios) {
                    var bc = !this._radios[x].isSelected();
                    if (target === this._radios[x]) {
                        this._radios[x].setSelected(true);
                        if (bc != true) {
                            var e_1 = kaayou.Event.create(kaayou.CheckEvent, kaayou.RadioEvent.SELECTED);
                            e_1.currentTarget = e_1.target = this._radios[x];
                            this._radios[x].dispatch(e_1);
                        }
                    }
                    else {
                        this._radios[x].setSelected(false);
                        if (bc == false) {
                            var e_2 = kaayou.Event.create(kaayou.CheckEvent, kaayou.RadioEvent.UNSELECTED);
                            e_2.currentTarget = e_2.target = this._radios[x];
                            this._radios[x].dispatch(e_2);
                        }
                    }
                }
            }
        };
        return RadioGroup;
    }());
    common.RadioGroup = RadioGroup;
})(common || (common = {}));
var common;
(function (common) {
    var RadioGroupWithImg = /** @class */ (function () {
        function RadioGroupWithImg() {
        }
        return RadioGroupWithImg;
    }());
    common.RadioGroupWithImg = RadioGroupWithImg;
})(common || (common = {}));
var common;
(function (common) {
    // ccui.Node
    var RadioGroupWithLabel = /** @class */ (function () {
        function RadioGroupWithLabel() {
        }
        return RadioGroupWithLabel;
    }());
    common.RadioGroupWithLabel = RadioGroupWithLabel;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var SharePanel = /** @class */ (function (_super) {
        __extends(SharePanel, _super);
        function SharePanel() {
            var _this = _super.call(this) || this;
            _this.maskBg = null;
            _this.SharePanel = null;
            _this.initUI();
            return _this;
        }
        SharePanel.prototype.initUI = function () {
            this.initWithccs(common.res.SharePanel_json);
            var self = this;
            this.SharePanel = ccui.helper.seekWidgetByName(this.node, "SharePanel_bg");
            this.SharePanel.setPosition(cc.winSize.width / 2 - this.SharePanel.width / 2, cc.winSize.height / 2 - this.SharePanel.height / 2);
            this.Hide();
        };
        SharePanel.prototype.Show = function () {
            this.setVisible(true);
        };
        SharePanel.prototype.Hide = function () {
            this.setVisible(false);
        };
        __decorate([
            doBindEvent
        ], SharePanel.prototype, "initUI", null);
        __decorate([
            BindEvent("common", 'ui::Share::Show')
        ], SharePanel.prototype, "Show", null);
        __decorate([
            BindEvent("common", 'ui::Share::Hide')
        ], SharePanel.prototype, "Hide", null);
        return SharePanel;
    }(kaayou.ModelLayer));
    common.SharePanel = SharePanel;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var BaseTableViewCell = /** @class */ (function (_super) {
        __extends(BaseTableViewCell, _super);
        function BaseTableViewCell() {
            var _this = _super.call(this) || this;
            _this._index = -1;
            _this.label_no = null;
            _this.btn_detail = null;
            _this.img_lock = null;
            _this.head_layouts = null;
            _this.initUI();
            return _this;
        }
        BaseTableViewCell.prototype.initUI = function () {
            this.initWithccs();
            this.label_no = ccui.helper.seekWidgetByName(this.node, "label_no");
            this.img_lock = ccui.helper.seekWidgetByName(this.node, "img_lock");
            this.head_layouts = [];
            for (var i = 0; i < 4; i++) {
                this.head_layouts.push(ccui.helper.seekWidgetByName(this.node, "head_layout" + i));
            }
        };
        BaseTableViewCell.prototype.initWithccs = function (path) {
            if (path === void 0) { path = ''; }
            if (!lodash.isString(path) || lodash.isEmpty(path)) {
                path = common.res.TableListPanelCell4p_json;
            }
            _super.prototype.initWithccs.call(this, path);
        };
        BaseTableViewCell.prototype.getIndex = function () {
            return this._index;
        };
        BaseTableViewCell.prototype.setIndex = function (i) {
            this._index = i;
            this.label_no.setString("NO." + i);
        };
        BaseTableViewCell.prototype.setInfo = function (info) {
            this._data = info;
        };
        return BaseTableViewCell;
    }(kaayou.Block));
    common.BaseTableViewCell = BaseTableViewCell;
    var TableListPanel = /** @class */ (function (_super) {
        __extends(TableListPanel, _super);
        function TableListPanel() {
            var _this = _super.call(this) || this;
            _this._cellClass = null;
            _this._cuttingSV = null;
            _this._cellColumn = 3;
            _this._maxcellCount = 100;
            _this._cellLayout = null;
            _this._cuttingSVParent = null;
            _this.initUI();
            return _this;
        }
        TableListPanel.prototype.setMaxcellCount = function (count) {
            this._maxcellCount = count;
        };
        TableListPanel.prototype.getMaxcellCount = function () {
            return this._maxcellCount;
        };
        TableListPanel.prototype.setCellColumn = function (column) {
            this._cellColumn = column;
        };
        TableListPanel.prototype.getCellColumn = function () {
            return this._cellColumn;
        };
        TableListPanel.prototype.setCellClass = function (cellClass) {
            this._cellClass = cellClass;
        };
        TableListPanel.prototype.getCellClass = function () {
            return this._cellClass;
        };
        TableListPanel.prototype.initUI = function () {
            this.initWithccs();
            this._cuttingSVParent = this.node;
            this.initTableListView();
            this._cuttingSVParent.addChild(this._cuttingSV);
            this.afterTableListView();
        };
        TableListPanel.prototype.initTableListView = function () {
            this._cuttingSV = new common.CuttingScrollView();
            var sv = ccui.helper.seekWidgetByName(this.node, "tabaleListScrollView");
            this._cuttingSVParent = sv.getParent();
            this._cuttingSV.initUI(sv, this.getCellClass());
            this._cuttingSV.setPadding({ top: 10, bottom: 10, left: 50, right: 0, spacingX: 20, spacingY: 30 });
            this._cuttingSV.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this._cuttingSV.setGridColumn(3);
            this._cuttingSV.initTables();
        };
        TableListPanel.prototype.afterTableListView = function () {
        };
        TableListPanel.prototype.changeMaxTable = function (tableNum, isClear) {
            this.setMaxcellCount(tableNum);
            this.resetTabelList(isClear);
        };
        TableListPanel.prototype.resetTabelList = function (isClear) {
            var p = this._cuttingSV._scrollView.getInnerOffSetLeft();
            this._cuttingSV.setCellClass(this.getCellClass());
            this._cuttingSV.setMaxCount(this.getMaxcellCount());
            this._cuttingSV.setGridColumn(this.getCellColumn());
            if (isClear) {
                console.log("true最大cell数量", this.getMaxcellCount());
                this._cuttingSV.initTables();
                return;
            }
            var offset = 0; // this._cuttingSV._scrollView.getInnerOffSetLeft();
            try {
                console.log("false最大cell数量", this.getMaxcellCount());
                var columns = Math.ceil(this.getMaxcellCount() / this._cuttingSV._scrollView.getGridRow());
                var allWidth = columns * ((new this._cellClass()).getContentSize().width + this._cuttingSV._scrollView.getPadding().spacingX) -
                    this._cuttingSV._scrollView.getPadding().spacingX +
                    this._cuttingSV._scrollView.getPadding().left + this._cuttingSV.getPadding().right;
                if (allWidth - this._cuttingSV._scrollView.getContentSize().width < (new this._cellClass()).getContentSize().width / 2) {
                    allWidth = this._cuttingSV._scrollView.getContentSize().width;
                }
                offset = Math.min(-1 * Math.abs(Math.max(this._cuttingSV._scrollView.getInnerContainerSize().width - this._cuttingSV._scrollView.getLayoutSize().width) - p), 0);
                this._cuttingSV._scrollView.setInnerContainerSize(cc.size(allWidth, this._cuttingSV._scrollView.getContentSize().height));
                // if (((Math.abs(offset)+cc.winSize.width)>allWidth)) {
                //     this._cuttingSV._scrollView.scrollToRight(0,false);//
                //     return;
                // }
                offset = !!offset ? offset : 0; //bugly报错。。。offset有可能是空的。
                this._cuttingSV._scrollView.setInnerContainerPosition(cc.p(offset, 0));
            }
            catch (error) {
                kaayou.PlatformMgr.getInstance().sys.PostBugly("setOffset" + kaayou.getLobbyVersion(), "resetTabelList", offset.toString());
            }
        };
        TableListPanel.prototype.initWithccs = function (path, full) {
            if (path === void 0) { path = ''; }
            if (full === void 0) { full = true; }
            if (!lodash.isString(path) || lodash.isEmpty(path)) {
                path = common.res.TableListPanel_json;
            }
            _super.prototype.initWithccs.call(this, path, full);
        };
        return TableListPanel;
    }(kaayou.Layer));
    common.TableListPanel = TableListPanel;
    var GameTableListPanel = /** @class */ (function (_super) {
        __extends(GameTableListPanel, _super);
        function GameTableListPanel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._isBindEvent = false;
            _this.__willdoSend = false;
            _this.__delayT = 0;
            return _this;
        }
        GameTableListPanel.prototype.initWithccs = function (path) {
            if (path === void 0) { path = ''; }
            if (!lodash.isString(path) || lodash.isEmpty(path)) {
                path = common.res.TableListPanel_json;
            }
            _super.prototype.initWithccs.call(this, path);
        };
        GameTableListPanel.prototype.setCellClass = function (cellClass) {
            this._cellClass = cellClass;
        };
        GameTableListPanel.prototype.getCellClass = function () {
            return this._cellClass;
        };
        GameTableListPanel.prototype.initTableListView = function () {
            this._cuttingSV = new common.CuttingScrollView();
            var sv = ccui.helper.seekWidgetByName(this.node, "tabaleListScrollView");
            if (!this._cellClass) {
                return console.error("cellClass is null");
            }
            this._cuttingSVParent = sv.getParent();
            this._cuttingSV.initUI(sv, this.getCellClass());
            var pl = (cc.winSize.width - 1280) / 2;
            pl = pl > 1 ? pl : 0;
            this._cuttingSV.setPadding({ top: 10, bottom: 10, left: 50 + pl, right: 0, spacingX: 20, spacingY: 30 });
            this._cuttingSV.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this._cuttingSV.setGridColumn(this.getCellColumn());
            this._cuttingSV.initTables();
            this._cuttingSV.on("Cutting_Scroll_Change", this.onCuttingScrollChange, this);
        };
        GameTableListPanel.prototype.afterTableListView = function () {
            _super.prototype.afterTableListView.call(this);
            this.btn_quick = ccui.helper.seekWidgetByName(this.node, "btn_quick");
            {
                this.topbarMgr = new common.TopBarMgr(ccui.helper.seekWidgetByName(this.node, "top_bar"));
                this.topbarMgr.setBeanVisibel(false);
                this.topbarMgr.setGoldVisibel(false);
                this.topbarMgr.setCardVisibel(false);
                this.topbarMgr.doRightLayout();
            }
        };
        GameTableListPanel.prototype.resetTabelList = function () {
            this._cuttingSV.setCellClass(this.getCellClass());
            this._cuttingSV.setMaxCount(this.getMaxcellCount());
            this._cuttingSV.setGridColumn(this.getCellColumn());
            this._cuttingSV.initTables();
        };
        GameTableListPanel.prototype.bindUiEvents = function () {
            if (this._isBindEvent) {
                return console.error('多次绑定');
            }
            this._isBindEvent = true;
            var self = this;
            do {
                if (!this.topbarMgr) {
                    break;
                }
                this.topbarMgr.setOnCloseClick(function () {
                    kaayou.emit(this.getModuleName(), "Exit");
                }.bind(this));
            } while (0);
            do {
                if (!this.btn_quick) {
                    break;
                }
                this.btn_quick.on(kaayou.TouchEvent.TouchEnd, function () {
                    kaayou.emit(this.getModuleName(), 'mod::User::doSiteTableIn', { tid: -1, seat: -1 });
                }, this);
            } while (0);
            kaayou.getController(this.getModuleName()).on('ui::TabelList::Show', function (e) {
                self.Show(e.data);
            }, this);
            kaayou.getController(this.getModuleName()).on('ui::TabelList::Hide', function (e) {
                self.Hide(e.data);
            }, this);
            kaayou.getController(this.getModuleName()).on('ui::TabelList::UpdateList', function (e) {
                self.onTabelUpdate(e.data);
            }, this);
            kaayou.getController(this.getModuleName()).on('ws::Msg::siteinfo', function (e) {
                self.onUpdateInfo(e.data);
            }, this, 10);
        };
        GameTableListPanel.prototype.initUI = function () {
            this.__changeeventquene = [];
            _super.prototype.initUI.call(this);
            this.bindUiEvents();
            this.setVisible(false);
            this.scheduleUpdate();
        };
        GameTableListPanel.prototype.onUpdateInfo = function (info) {
            if (info.sit_mode != 1) {
                return;
            }
            this.setMaxcellCount(info.tablenum);
            this.resetTabelList();
        };
        GameTableListPanel.prototype.onCuttingScrollChange = function (e) {
            if (!this.isVisible()) {
                return;
            }
            if (!e.data) {
                return;
            }
            if (!this._cuttingSV) {
                return console.error('cuttingSV is null');
            }
            var range = this._cuttingSV.getRange();
            this.__changeeventquene.push(range);
            if (this.__changeeventquene.length > 10) {
                this.__changeeventquene.shift();
            }
            this.__willdoSend = true;
            // kaayou.emit(this.getModuleName(), 'mod::TabelList::GetUpdateList', { min: range.min, max: range.max });
        };
        GameTableListPanel.prototype.update = function (dt) {
            this.__delayT += dt;
            if (this.__delayT > 0.5) {
                this.__delayT = 0;
                this.emitChangeEvent();
            }
        };
        GameTableListPanel.prototype.emitChangeEvent = function () {
            if (this.__willdoSend == false) {
                return;
            }
            if (this.__changeeventquene.length < 1) {
                return;
            }
            var range = this.__changeeventquene[this.__changeeventquene.length - 1];
            kaayou.emit(this.getModuleName(), 'mod::TabelList::GetUpdateList', { min: range.min, max: range.max });
            this.__willdoSend = false;
        };
        // @BindEvent('', "ui::TabelList::UpdateList")
        GameTableListPanel.prototype.onTabelUpdate = function (data) {
            var self = this;
            if (!this._cuttingSV) {
                return console.error('cuttingSV is null');
            }
            lodash.forEach(this._cuttingSV.getCells(), function (v) {
                v.setInfo(data[v.getIndex()] || null);
            });
        };
        // @BindEvent('', "ui::TabelList::Show")
        GameTableListPanel.prototype.Show = function (data) {
            if (!this._cuttingSV) {
                return console.error('cuttingSV is null');
            }
            data = data || { title: "" };
            this.topbarMgr.setTitle(data.title || "");
            kaayou.emit(this.getModuleName(), 'ui::TableListPlayer::Hide');
            var range = this._cuttingSV.getRange();
            kaayou.emit(this.getModuleName(), 'mod::TabelList::GetUpdateList', { min: range.min, max: range.max });
            if (!this.isVisible()) {
                kaayou.SoundManager.getInstance().pauseMusic();
            }
            this.setVisible(true);
        };
        // @BindEvent('', "ui::TabelList::Hide")
        GameTableListPanel.prototype.Hide = function (data) {
            if (!this._cuttingSV) {
                return console.error('cuttingSV is null');
            }
            kaayou.emit(this.getModuleName(), 'ui::TableListPlayer::Hide');
            kaayou.emit(this.getModuleName(), 'mod::TabelList::Sitelistout');
            if (this.isVisible()) {
                kaayou.SoundManager.getInstance().resumeMusic();
            }
            this.setVisible(false);
        };
        return GameTableListPanel;
    }(common.TableListPanel));
    common.GameTableListPanel = GameTableListPanel;
    var GameTableListPlayerPanel = /** @class */ (function (_super) {
        __extends(GameTableListPlayerPanel, _super);
        function GameTableListPlayerPanel() {
            var _this = _super.call(this) || this;
            _this.label_uid = null;
            _this.label_name = null;
            _this.label_score = null;
            _this.label_sex = null;
            _this.label_ip = null;
            _this._isBindEvent = false;
            _this.initUI();
            return _this;
        }
        GameTableListPlayerPanel.prototype.initWithccs = function (path) {
            if (path === void 0) { path = ''; }
            if (!lodash.isString(path) || lodash.isEmpty(path)) {
                path = common.res.TableListPlayerPanel_json;
            }
            _super.prototype.initWithccs.call(this, path);
        };
        GameTableListPlayerPanel.prototype.initUI = function () {
            var self = this;
            this.initWithccs();
            this.label_uid = ccui.helper.seekWidgetByName(this.node, "label_uid");
            this.label_name = ccui.helper.seekWidgetByName(this.node, "label_name");
            this.label_score = ccui.helper.seekWidgetByName(this.node, "label_score");
            this.label_sex = ccui.helper.seekWidgetByName(this.node, "label_sex");
            this.label_ip = ccui.helper.seekWidgetByName(this.node, "label_ip");
            this.bindUIEvents();
            this.Hide();
        };
        GameTableListPlayerPanel.prototype.bindUIEvents = function () {
            if (this._isBindEvent) {
                return console.error('多次绑定');
            }
            this._isBindEvent = true;
            kaayou.getController(this.getModuleName()).on('ui::TableListPlayer::Show', function (e) {
                this.Show(e.data);
            }, this);
            kaayou.getController(this.getModuleName()).on('ui::TableListPlayer::Hide', function (e) {
                this.Hide(e.data);
            }, this);
        };
        GameTableListPlayerPanel.prototype.Show = function (data) {
            if (lodash.isNull(data)) {
                return;
            }
            if (lodash.isEmpty(data)) {
                return;
            }
            if (lodash.isNull(data.player)) {
                return;
            }
            if (lodash.isEmpty(data.player)) {
                return;
            }
            var player = data.player;
            if (this.label_uid)
                this.label_uid.setString("" + player.uid);
            if (this.label_name)
                this.label_name.setString("" + kaayou.Identify.nickNameSubFive(player.name));
            if (this.label_score)
                this.label_score.setString("" + kaayou.Identify.changeScoreToSortString(player.gold));
            if (this.label_sex)
                this.label_sex.setString("" + (player.sex == 1 ? "男" : "女"));
            if (this.label_ip)
                this.label_ip.setString("" + player.ip);
            this.setVisible(true);
        };
        // @BindEvent('', 'ui::TableListPlayer::Hide')
        GameTableListPlayerPanel.prototype.Hide = function () {
            this.label_uid.setString("");
            this.label_name.setString("");
            this.label_score.setString("");
            this.label_sex.setString("");
            this.label_ip.setString("");
            this.setVisible(false);
        };
        return GameTableListPlayerPanel;
    }(kaayou.ModelLayer));
    common.GameTableListPlayerPanel = GameTableListPlayerPanel;
    var GameTableCell = /** @class */ (function (_super) {
        __extends(GameTableCell, _super);
        function GameTableCell() {
            var _this = _super.call(this) || this;
            _this.btn_detail = null;
            _this._index = -1;
            _this.label_no = null;
            _this.img_bg = null;
            _this.img_lock = null;
            _this.head_layouts = null;
            _this.head_image_layouts = null;
            _this.label_names = null;
            _this.label_scores = null;
            _this._maxPlayerCpunt = 0;
            _this._curTouchTarget = null;
            _this.initUI();
            return _this;
        }
        GameTableCell.prototype.initWithccs = function (path) {
            if (path === void 0) { path = ''; }
            if (!lodash.isString(path) || lodash.isEmpty(path)) {
                path = common.res.TableListPanelCell4p_json;
            }
            _super.prototype.initWithccs.call(this, path);
        };
        GameTableCell.prototype.setMaxPlayerCpunt = function (count) {
            this._maxPlayerCpunt = count;
        };
        GameTableCell.prototype.getMaxPlayerCount = function () {
            return this._maxPlayerCpunt;
        };
        GameTableCell.prototype.initUI = function () {
            this.initWithccs();
            var self = this;
            this.label_no = ccui.helper.seekWidgetByName(this.node, "label_no");
            this.img_lock = ccui.helper.seekWidgetByName(this.node, "img_lock");
            this.head_layouts = [];
            this.head_image_layouts = [];
            this.label_names = [];
            this.label_scores = [];
            for (var i = 0; i < this.getMaxPlayerCount(); i++) {
                var l = ccui.helper.seekWidgetByName(this.node, "head_layout" + i);
                var c = ccui.helper.seekWidgetByName(this.node, "chair" + i);
                if (!l) {
                    return console.error("not found player panel");
                }
                if (!c) {
                    return console.error("not found chair");
                }
                l['index'] = i;
                c['index'] = i;
                var t = c.getChildByName('touc');
                if (!t) {
                    return console.error("not found chair touc");
                }
                t['index'] = i;
                this.doBindTouchEvent(l, function (e) {
                    var index = e.target['index'];
                    if (lodash.isNull(self._data)) {
                        return;
                    }
                    if (lodash.isUndefined(self._data.person)) {
                        return;
                    }
                    if (lodash.isEmpty(self._data.person)) {
                        return;
                    }
                    // kaayou.emit(this.getModuleName(), 'ui::TableListPlayer::Show', { player: self._data.person[index] });
                }, this);
                this.doBindTouchEvent(t, function (e) {
                    var index = e.target['index'];
                    kaayou.emit(this.getModuleName(), 'mod::User::doSiteTableIn', { tid: self.getIndex(), seat: index });
                }, this);
                this.head_layouts.push(l);
                var l_img = ccui.helper.seekWidgetByName(l, "head_img_layout");
                var l_name = ccui.helper.seekWidgetByName(l, "label_name");
                var l_score = ccui.helper.seekWidgetByName(l, "label_score");
                this.head_image_layouts.push(l_img);
                this.label_names.push(l_name);
                this.label_scores.push(l_score);
            }
            this.img_bg = ccui.helper.seekWidgetByName(this.node, "img_bg");
            // this.doBindTouchEvent(this.img_bg, function (e) {
            //     kaayou.emit(this.getModuleName(), 'mod::User::doSiteTableIn', { tid: self.getIndex() });
            // }, this);
            this.setInfo(null);
        };
        GameTableCell.prototype.doBindTouchEvent = function (widget, callEndFunc, orTagert) {
            var self = this;
            widget.setSwallowTouches(false);
            widget['_isScrollTouchCancel'] = false;
            widget.on(kaayou.TouchEvent.TouchStart, function (e) {
                var tagert = e.target;
                if (self._curTouchTarget == null) {
                    self._curTouchTarget = tagert;
                }
                tagert['_isScrollTouchCancel'] = false;
            }, this);
            widget.on(kaayou.TouchEvent.TouchMove, function (e) {
                var tagert = e.target;
                if (self._curTouchTarget !== tagert) {
                    return;
                }
                if (tagert['_isScrollTouchCancel']) {
                    return false;
                }
                if (15 < Math.abs(tagert.getTouchBeganPosition().x - tagert.getTouchMovePosition().x)) {
                    tagert['_isScrollTouchCancel'] = true;
                    return;
                }
                if (15 < Math.abs(tagert.getTouchBeganPosition().y - tagert.getTouchMovePosition().y)) {
                    tagert['_isScrollTouchCancel'] = true;
                    return;
                }
            }, this);
            widget.on(kaayou.TouchEvent.TouchCance, function (e) {
                var tagert = e.target;
                if (self._curTouchTarget !== tagert) {
                    return;
                }
                tagert['_isScrollTouchCancel'] = false;
                self._curTouchTarget = null;
            }, this);
            widget.on(kaayou.TouchEvent.TouchEnd, function (e) {
                var tagert = e.target;
                if (self._curTouchTarget !== tagert) {
                    return;
                }
                if (!tagert['_isScrollTouchCancel']) {
                    callEndFunc.call(orTagert, e);
                }
                tagert['_isScrollTouchCancel'] = false;
                self._curTouchTarget = null;
            }, this);
        };
        GameTableCell.prototype.getIndex = function () {
            return this._index;
        };
        GameTableCell.prototype.setIndex = function (i) {
            this._index = i;
            this.label_no.setString("NO." + (i + 1));
        };
        GameTableCell.prototype.setInfo = function (info) {
            var self = this;
            if (info == null) {
                this._data = null;
                this.img_lock.setVisible(false);
                for (var x in this.head_layouts) {
                    this.head_layouts[x].setVisible(false);
                }
                return;
            }
            this._data = lodash.clone(info);
            var players = lodash.isUndefined(this._data.person) ? [] : this._data.person;
            for (var x in this.head_layouts) {
                if (players[x]) {
                    this.head_layouts[x].setVisible(true);
                    // this.head_image_layouts.push(l_img);
                    this.label_names[x].setString(kaayou.Identify.nickNameSubFive(players[x].name));
                    this.label_scores[x].setString(kaayou.Identify.changeScoreToSortString(players[x].gold));
                    var headImgSp = null;
                    if (this.head_image_layouts[x].getChildren().length < 1) {
                        headImgSp = new cc.Sprite();
                        headImgSp.setVisible(false);
                        this.head_image_layouts[x].addChild(headImgSp);
                    }
                    else {
                        headImgSp = this.head_image_layouts[x].getChildren()[0];
                        headImgSp.setVisible(false);
                    }
                    if (players[x].imgurl && !lodash.isEmpty(players[x].imgurl)) {
                        (function (sp, _layouts) {
                            if (!sp) {
                                return;
                            }
                            if (!_layouts) {
                                return;
                            }
                            NetImage.loadImage(players[x].imgurl).then(function (tex) {
                                if (!sp.isRunning() || !_layouts.isRunning()) {
                                    return;
                                }
                                sp.initWithTexture(tex);
                                NetImage.doSpriteContentSizeAndPosition(sp, _layouts.getContentSize());
                                sp.setVisible(true);
                            });
                        })(headImgSp, this.head_image_layouts[x]);
                    }
                    else {
                        // cc.spriteFrameCache.getSpriteFrame(players[x].sex == 1 ? "nan.png":"nv.png");
                        headImgSp.initWithSpriteFrameName(players[x].sex == 1 ? "nan.png" : "nv.png");
                        NetImage.doSpriteContentSizeAndPosition(headImgSp, this.head_image_layouts[x].getContentSize());
                        headImgSp.setVisible(true);
                    }
                }
                else {
                    this.head_layouts[x].setVisible(false);
                }
            }
        };
        return GameTableCell;
    }(kaayou.Block));
    common.GameTableCell = GameTableCell;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var TextViewMgr = /** @class */ (function () {
        function TextViewMgr() {
            this.__selfPanel = {};
            this._zOrder = 0;
        }
        TextViewMgr.getInstance = function (order) {
            if (TextViewMgr.__INS__ == null) {
                TextViewMgr.__INS__ = new TextViewMgr();
                TextViewMgr.__INS__.init();
                TextViewMgr.__INS__._zOrder = order;
            }
            return TextViewMgr.__INS__;
        };
        TextViewMgr.prototype.init = function () {
            var self = this;
            kaayou.getController('common').on('ui::TextView::Show', function (e) {
                self.getPanel(true).Show(e.data.string);
            }, this, 10);
            kaayou.getController('common').on('ui::TextView::Hide', function (e) {
                self.getPanel(false).Hide();
            }, this, 10);
            return true;
        };
        TextViewMgr.prototype.getPanel = function (create) {
            if (create === void 0) { create = false; }
            var stage = kaayou.UIManager.getInstance().getCurRuningSceneName();
            if (create && !this.__selfPanel[stage]) {
                this.__selfPanel[stage] = new TextView();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel[stage], this._zOrder);
            }
            return this.__selfPanel[stage];
        };
        TextViewMgr.__INS__ = null;
        return TextViewMgr;
    }());
    common.TextViewMgr = TextViewMgr;
    var TextView = /** @class */ (function (_super) {
        __extends(TextView, _super);
        function TextView() {
            var _this = _super.call(this) || this;
            _this._content = "";
            _this.btn_ok = null;
            _this.contentView = null;
            _this.initUI();
            return _this;
        }
        TextView.prototype.initUI = function () {
            var _this = this;
            this.initWithccs(common.res.TextView_json);
            var render = new common.htmlRender;
            var self = this;
            Object.defineProperty(this, "content", {
                get: function () {
                    return this._content;
                },
                set: function (str) {
                    if (typeof str !== "string") {
                        throw new Error("TextView Error:please set string");
                    }
                    this._content = str;
                    render.render(self.contentView, str);
                    //this.render();
                }
            });
            this.btn_ok = ccui.helper.seekWidgetByName(this.node, "btn_ok");
            this.btn_ok.on(kaayou.TouchEvent.TouchEnd, function () {
                _this.Hide();
            }, this);
            this.contentView = ccui.helper.seekWidgetByName(this.node, "agreeScroll");
            this.contentView.setPadding({ spacingY: 10, spacingX: 10 });
            this.contentView.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.contentView.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.contentView.setScrollBarEnabled(false);
            this.setVisible(false);
        };
        // @BindEvent("common","ui::TextView::show")
        TextView.prototype.Show = function (str) {
            var self = this;
            self.setVisible(true);
            self.content = str;
        };
        // @BindEvent("common","ui::TextView::hide")
        TextView.prototype.Hide = function () {
            this.setVisible(false);
        };
        __decorate([
            doBindEvent
        ], TextView.prototype, "initUI", null);
        return TextView;
    }(kaayou.Layer));
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var ToastPanel = /** @class */ (function (_super) {
        __extends(ToastPanel, _super);
        function ToastPanel() {
            var _this = _super.call(this) || this;
            _this.maskBg = null;
            _this.contentPanel = null;
            _this.msgLabel = null;
            _this.initUI();
            return _this;
        }
        ToastPanel.prototype.initUI = function () {
            this.initWithccs(common.res.ToastPanel_json, true);
            var self = this;
            this.maskBg = ccui.helper.seekWidgetByName(this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(this.node, "contentPanel");
            this.msgLabel = ccui.helper.seekWidgetByName(this.node, "msgLabel");
            this.msgLabel.ignoreContentAdaptWithSize(true);
            this.setVisible(false);
            this.maskBg.setVisible(false);
        };
        ToastPanel.prototype.show = function (data) {
            if (!data) {
                return false;
            }
            if (!data.msg) {
                return false;
            }
            data.mask = data.mask || false;
            data.time = data.time || 1;
            this.msgLabel.setString(data.msg);
            this.msgLabel.ignoreContentAdaptWithSize(true);
            var labelSize = this.msgLabel.getContentSize();
            var tsize = cc.size(Math.max(labelSize.width + 300, 798), Math.max(labelSize.height + 39, 75));
            this.contentPanel.setContentSize(tsize.width, tsize.height);
            this.msgLabel.setPosition(tsize.width * 0.5, tsize.height * 0.5);
            if (data.mask == true) {
                this.maskBg.setVisible(true);
            }
            else {
                this.maskBg.setVisible(false);
            }
            this.stopAllActions();
            this.node.setLocalZOrder(10120); //lw200229在dialog前面
            this.setVisible(true);
            // this.o = 255;
            this.runAction(cc.sequence(cc.delayTime(data.time), cc.fadeOut(0.5), cc.callFunc(function () {
                this.setVisible(false);
            }.bind(this))));
        };
        __decorate([
            doBindEvent
        ], ToastPanel.prototype, "initUI", null);
        __decorate([
            BindEvent('common', 'ui::Toast::Show')
        ], ToastPanel.prototype, "show", null);
        return ToastPanel;
    }(kaayou.Layer));
    common.ToastPanel = ToastPanel;
})(common || (common = {}));
var common;
(function (common) {
    var TopBarMgr = /** @class */ (function () {
        function TopBarMgr(node) {
            this.node = null;
            this.btn_close = null;
            this.lable_topbar_title = null;
            this.__onCloseClick = null;
            this.__onAddCardClick = null;
            this.__onAddGoldClick = null;
            this.__onAddBeanClick = null;
            var self = this;
            this.node = node;
            this.InitUI();
            this.onBindEvent();
        }
        TopBarMgr.prototype.InitUI = function () {
            var self = this;
            var top_bar = this.node;
            this.btn_close = ccui.helper.seekWidgetByName(top_bar, "btn_close");
            this.lable_topbar_title = ccui.helper.seekWidgetByName(top_bar, "titleFont");
        };
        TopBarMgr.prototype.onBindEvent = function () {
            var self = this;
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
        };
        TopBarMgr.prototype.setTitle = function (t) {
            if (t == "")
                this.lable_topbar_title.setVisible(false);
            else {
                // this.ivTitle.loadTexture(`tb_${t}.png`, ccui.Widget.PLIST_TEXTURE);
                // this.ivTitle.setVisible(true);
                this.lable_topbar_title.setString(t);
            }
        };
        TopBarMgr.prototype.setOnCloseClick = function (f) {
            this.__onCloseClick = f;
        };
        TopBarMgr.prototype.onCloseClick = function () {
            if (this.__onCloseClick) {
                this.__onCloseClick();
            }
        };
        TopBarMgr.prototype.setOnAddCardClick = function (f) {
            this.__onAddCardClick = f;
        };
        TopBarMgr.prototype.onAddCardClick = function () {
            if (this.__onAddCardClick) {
                this.__onAddCardClick();
            }
        };
        TopBarMgr.prototype.setOnAddGoldClick = function (f) {
            this.__onAddGoldClick = f;
        };
        TopBarMgr.prototype.onAddGoldClick = function () {
            if (this.__onAddGoldClick) {
                this.__onAddGoldClick();
            }
        };
        TopBarMgr.prototype.setOnAddBeanClick = function (f) {
            this.__onAddBeanClick = f;
        };
        TopBarMgr.prototype.onAddBeanClick = function () {
            if (this.__onAddBeanClick) {
                this.__onAddBeanClick();
            }
        };
        TopBarMgr.prototype.setBeanVisibel = function (v) {
            // this.layout_topbar_bean.setVisible(v);
        };
        TopBarMgr.prototype.setCardVisibel = function (v) {
            // this.layout_topbar_card.setVisible(v);
        };
        TopBarMgr.prototype.setGoldVisibel = function (v) {
            // this.layout_topbar_glod.setVisible(v);
        };
        TopBarMgr.prototype.setBeanBtnVisibel = function (v) {
            //this.btn_topbar_addbean.setVisible(v);
        };
        TopBarMgr.prototype.setCardBtnVisibel = function (v) {
            // this.btn_topbar_addard.setVisible(v);
        };
        TopBarMgr.prototype.setGoldBtnVisibel = function (v) {
            //  this.btn_topbar_addgold.setVisible(v);
        };
        TopBarMgr.prototype.doRightLayout = function () {
            //  this.layout_topbar_rightmeun.doChildrenLayout();
        };
        return TopBarMgr;
    }());
    common.TopBarMgr = TopBarMgr;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var VerifyPhone = /** @class */ (function (_super) {
        __extends(VerifyPhone, _super);
        function VerifyPhone() {
            var _this = _super.call(this) || this;
            _this.maskBg = null;
            _this.contentPanel = null;
            _this.btn_close = null;
            _this.titleLabel = null;
            _this.edx_tel = null;
            _this.lbTel = null;
            _this.edx_pass = null;
            _this.pass_Label = null;
            _this.btn_login = null;
            _this.btn_sendCheck = null;
            _this.timeDaoji = null;
            _this.time = 0;
            _this.initUI();
            return _this;
        }
        // @doBindEvent
        VerifyPhone.prototype.initUI = function () {
            this.initWithccs(common.res.VerifyPhone_json);
            var self = this;
            this.maskBg = ccui.helper.seekWidgetByName(this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(this.node, "contentPanel");
            this.btn_close = ccui.helper.seekWidgetByName(this.node, "btn_close");
            this.edx_tel = ccui.helper.seekWidgetByName(this.node, "edx_tel");
            this.lbTel = ccui.helper.seekWidgetByName(this.node, "lable_tel");
            this.edx_pass = ccui.helper.seekWidgetByName(this.node, "edx_pass");
            this.pass_Label = ccui.helper.seekWidgetByName(this.node, "lable_pass");
            this.btn_sendCheck = ccui.helper.seekWidgetByName(this.node, "sendMessage_btn");
            this.timeDaoji = ccui.helper.seekWidgetByName(this.node, "time");
            this.btn_login = ccui.helper.seekWidgetByName(this.node, "btn_login");
            // this.titleLabel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "titleLabel");
            this.btn_sendCheck.on(kaayou.TouchEvent.TouchEnd, this.BtnGetVerification, this);
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.btn_login.on(kaayou.TouchEvent.TouchEnd, this.BtnRegist, this);
            this.edx_tel.addEventListener(function (ref, type) {
                if (ccui.TextField.EVENT_ATTACH_WITH_IME == type) {
                    console.log("EVENT_ATTACH_WITH_IME");
                }
                else if (ccui.TextField.EVENT_DETACH_WITH_IME == type) {
                    console.log("EVENT_DETACH_WITH_IME");
                }
                else if (ccui.TextField.EVENT_INSERT_TEXT == type || ccui.TextField.EVENT_DELETE_BACKWARD == type) {
                    console.log("EVENT_INSERT_TEXT");
                    var gstr = ref.getString();
                    do {
                        var parent_1 = ref.getParent();
                        if (!parent_1) {
                            break;
                        }
                        var label_err = parent_1.getChildByName('label_err');
                        if (!label_err) {
                            break;
                        }
                        label_err.setString(kaayou.Identify.isPhone(ref.getString()) ? "" : "请输入正确的手机号");
                    } while (0);
                    self.edx_tel.setString(gstr);
                    self.lbTel.setString(gstr);
                }
            }, this);
            this.edx_pass.addEventListener(function (ref, type) {
                if (ccui.TextField.EVENT_ATTACH_WITH_IME == type) {
                    console.log("EVENT_ATTACH_WITH_IME");
                }
                else if (ccui.TextField.EVENT_DETACH_WITH_IME == type) {
                    console.log("EVENT_DETACH_WITH_IME");
                }
                else if (ccui.TextField.EVENT_INSERT_TEXT == type || ccui.TextField.EVENT_DELETE_BACKWARD == type) {
                    console.log("EVENT_INSERT_TEXT");
                    var gstr = ref.getString();
                    do {
                        var parent_2 = ref.getParent();
                        if (!parent_2) {
                            break;
                        }
                        var label_err = parent_2.getChildByName('label_err');
                        if (!label_err) {
                            break;
                        }
                        label_err.setString(kaayou.Identify.isNumber(ref.getString()) ? "" : "验证码不合规");
                    } while (0);
                    self.edx_pass.setString(gstr);
                    self.pass_Label.setString(gstr);
                }
            }, this);
            kaayou.getController('common').on('ui::VerifyPhone::Show', function (e) {
                self.Show(e.data);
            }, this, 10);
            kaayou.getController('common').on('ui::VerifyPhone::Hide', function (e) {
                self.Hide();
            }, this, 10);
            kaayou.getController('common').on('ui::VerifyPhone::Passed', function (e) {
                self.Hide();
                self.callback && self.callback();
            }, this, 10);
            self.Hide();
        };
        VerifyPhone.prototype.BtnRegist = function () {
            var self = this;
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            if (!self.btn_login.enabled) {
                return false;
            }
            self.btn_login.enabled = false;
            self.schedule(function () {
                self.btn_login.enabled = true;
            }, 0.5, 0);
            self.phoneText = this.lbTel.string;
            self.codeText = this.edx_pass.string;
            if (self.phoneText.length < 1 || self.codeText.length < 1) {
                kaayou.emit("common", 'ui::Toast::Show', { msg: '手机号和验证码不能为空' });
            }
            kaayou.emit("lobby", "mod::User::VerifyPhone", { mobile: self.phoneText, code: self.codeText });
        };
        VerifyPhone.prototype.BtnGetVerification = function () {
            var self = this;
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            //获取验证码按钮的逻辑
            console.log('获取验证码按钮被点击');
            if (this.lbTel.string.length < 1) {
                kaayou.emit("common", "ui::Toast::Show", { msg: "手机号不能为空" });
                return;
            }
            if (!kaayou.Identify.isPhone(this.lbTel.string)) {
                kaayou.emit("common", "ui::Toast::Show", { msg: "手机号格式错误!" });
                return;
            }
            if (self.btn_sendCheck.enabled == true) {
                self.phoneText = this.lbTel.string;
                self.btn_sendCheck.enabled = false;
                self.time = Math.floor((new Date()).getTime() / 1000) + 60;
                self.unschedule(self.timeline);
                self.schedule(self.timeline, 0.2, 100000000);
                //请求获取验证码
                var typ = 1;
                // self.btn_get_verification.getComponent(cc.Sprite).spriteFrame=self.sfSend;
                kaayou.emit("lobby", "mod::User::getPhoneMsgCode", { mobile: self.phoneText, type: typ });
            }
        };
        VerifyPhone.prototype.timeline = function () {
            if (this.time <= 0) {
                this.resetAuto();
                return;
            }
            var ti = this.time - Math.floor((new Date()).getTime() / 1000);
            if (ti <= 0) {
                this.resetAuto();
                return;
            }
            this.timeDaoji.string = ti.toString();
        };
        VerifyPhone.prototype.resetAuto = function (fir) {
            if (fir === void 0) { fir = false; }
            var self = this;
            if (fir) {
                // this.authcodeBtn.normalSprite = this.authBtnAtlas.getSpriteFrame('btn_sendcode');
                // this.authcodeBtn.pressedSprite = this.authBtnAtlas.getSpriteFrame('btn_sendcode_deep');
                // this.authcodeBtn.hoverSprite = this.authBtnAtlas.getSpriteFrame('btn_sendcode');
                // this.authcodeBtn.disabledSprite = this.authBtnAtlas.getSpriteFrame('btn_sendcode');
            }
            this.time = 0;
            this.timeDaoji.string = "";
            this.btn_sendCheck.enabled = true;
            // this.btn_get_verification.interactable = true;
            // this.btn_get_verification.enabled = true;
            // self.btn_get_verification.getComponent(cc.Sprite).spriteFrame=self.sfSent;
            this.unschedule(this.timeline);
        };
        VerifyPhone.prototype.Show = function (data) {
            this.cleanEditBoxString(this.edx_tel);
            this.cleanEditBoxString(this.edx_pass);
            if (!!data.tel)
                this.lbTel.setString(data.tel);
            else
                this.lbTel.setString("");
            if (!!data.callback)
                this.callback = data.callback;
            this.pass_Label.string = "";
            // if (this.time <= 0) {
            this.resetAuto(true);
            // }
            this.setVisible(true);
        };
        VerifyPhone.prototype.cleanEditBoxString = function (ref) {
            ref.setString("");
            do {
                var parent_3 = ref.getParent();
                if (!parent_3) {
                    break;
                }
                var label_err = parent_3.getChildByName('label_err');
                if (!label_err) {
                    break;
                }
                label_err.setString("");
            } while (0);
        };
        // @BindEvent('lobby', 'ui::PhoneLoginPanel::Hide')
        VerifyPhone.prototype.Hide = function () {
            this.setVisible(false);
        };
        return VerifyPhone;
    }(kaayou.Layer));
    common.VerifyPhone = VerifyPhone;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    //观战层
    var WatchLayer = /** @class */ (function (_super) {
        __extends(WatchLayer, _super);
        function WatchLayer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.btn_watch = null;
            _this.btn_watch_player = null;
            _this.curMod = null;
            _this.list_watch_playerBg = null;
            _this.list_watch_player = null;
            _this.cellStr = "";
            _this.maxShowCount = 0;
            return _this;
        }
        WatchLayer.prototype.initUI = function (node, curMod) {
            var _this = this;
            this.curMod = curMod;
            _super.prototype.initWithNodeNoClone.call(this, node);
            this.btn_watch = [];
            for (var i = 1; i < 8; i++) {
                this.btn_watch[i] = ccui.helper.seekWidgetByName(this.node, "btn_watch_" + i);
                if (this.btn_watch[i]) {
                    this.btn_watch[i].setTag(i);
                    this.btn_watch[i].on(kaayou.TouchEvent.TouchEnd, this.onWatchTouch, this);
                }
            }
            this.btn_watch_player = ccui.helper.seekWidgetByName(this.node, "btn_watch_player");
            this.btn_watch_player.on(kaayou.TouchEvent.TouchEnd, function () {
                var show = !_this.list_watch_playerBg.visible;
                _this.list_watch_playerBg.setVisible(show);
                if (show) {
                    _this.curMod.sendGetGuestList();
                }
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on("ui::watchLayer::onTableInfo", this.onTableInfo, this);
            kaayou.getController(this.curMod.getModuleName()).on("ui::watchLayer::getGuestList", this.showGuest, this);
            kaayou.getController(this.curMod.getModuleName()).on("ui::watchLayer::hideWatchPlayerList", function () {
                _this.list_watch_playerBg.setVisible(false);
            }, this);
        };
        WatchLayer.prototype.initPropertity = function (cellStr, maxShowCount) {
            this.cellStr = cellStr;
            this.maxShowCount = maxShowCount;
            this.list_watch_playerBg = ccui.helper.seekWidgetByName(this.node, "list_watch_playerBg");
            this.list_watch_player = ccui.helper.seekWidgetByName(this.node, "list_watch_player");
            this.list_watch_player.setAnchorPoint(0, 1);
            this.list_watch_playerBg.setVisible(false);
            this.list_watch_player.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.list_watch_player.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.list_watch_player.setPadding({ spacingY: 10 });
        };
        WatchLayer.prototype.showGuest = function (e) {
            // showGuest() {
            // let data = this.curMod.tableInfo["lookonperson"];
            // data = lodash.pull(data, null);
            var data = e.data;
            if (!data) {
                data = [];
            }
            for (var i = 0; i < this.maxShowCount; i++) {
                var cell = this.list_watch_player.children[i];
                if (i < data.length) {
                    if (!cell) {
                        cell = new WatchCell(this.cellStr);
                        this.list_watch_player.addChild(cell);
                    }
                    cell.setVisible(true);
                    cell.doSetInfo(data[i]);
                }
                else {
                    if (cell) {
                        cell.setVisible(false);
                    }
                }
            }
            this.list_watch_player.doChildrenLayout();
        };
        WatchLayer.prototype.onTableInfo = function () {
            if (!this.curMod) {
                return;
            }
            // this.setVisible(this.curMod.getIsGuest());
            var players = this.curMod.toArrayPlayer();
            for (var i = 1; i < players.length; i++) {
                if (!players[i]) {
                    this.btn_watch[i].setVisible(false);
                    continue;
                }
                this.btn_watch[i].setVisible(this.curMod.getIsGuest());
            }
            this.list_watch_playerBg.setVisible(false);
        };
        WatchLayer.prototype.onWatchTouch = function (e) {
            if (!this.curMod) {
                return;
            }
            var players = this.curMod.toArrayPlayer();
            var playerInfo = players[e.target.getTag()];
            // console.log("设置游客座位号:", chair);
            // this.curMod.setServerChair(playerInfo.seat);
            // let playerss = this.curMod.toArrayPlayer();
            // kaayou.emit(this.curMod.getModuleName(), "ui::Scene::onWatchTouch", { Players: playerss });
            if (playerInfo) {
                this.curMod.sendGuestSwitch(playerInfo.seat);
            }
            else {
                console.error("为找到玩家信息");
            }
        };
        WatchLayer.prototype.Hide = function () {
            // this.list_watch_player.setVisible(false);
        };
        __decorate([
            doBindEvent
        ], WatchLayer.prototype, "initUI", null);
        return WatchLayer;
    }(kaayou.Block));
    common.WatchLayer = WatchLayer;
    var WatchCell = /** @class */ (function (_super) {
        __extends(WatchCell, _super);
        function WatchCell(cellStr) {
            var _this = _super.call(this) || this;
            _this.icon = null;
            _this.userName = null;
            _this.userId = null;
            _this.initWithccs(cellStr);
            _this.icon = ccui.helper.seekWidgetByName(_this.node, "watch_icon");
            _this.userName = ccui.helper.seekWidgetByName(_this.node, "username");
            _this.userId = ccui.helper.seekWidgetByName(_this.node, "userid");
            return _this;
        }
        WatchCell.prototype.doSetInfo = function (playerInfo) {
            NetImage.setPlayerHead(this.icon, playerInfo.imageurl, playerInfo.sex, playerInfo.uid);
            this.userName.setString(playerInfo.name);
            this.userId.setString("ID:" + playerInfo.uid);
        };
        return WatchCell;
    }(kaayou.Block));
    common.WatchCell = WatchCell;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var VersionDialogPanel = /** @class */ (function (_super) {
        __extends(VersionDialogPanel, _super);
        function VersionDialogPanel() {
            var _this = _super.call(this) || this;
            _this.lable_leftMsg = null;
            _this.lable_rightMsg = null;
            _this.initUI();
            return _this;
        }
        VersionDialogPanel.prototype.initWithccs = function (path) {
            _super.prototype.initWithccs.call(this, common.res.VersionDialogPanel_json);
        };
        VersionDialogPanel.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
            this.lable_leftMsg = ccui.helper.seekWidgetByName(this.node, "lable_leftMsg");
            this.lable_rightMsg = ccui.helper.seekWidgetByName(this.node, "lable_rightMsg");
            this.lable_leftMsg.ignoreContentAdaptWithSize(true);
            this.lable_rightMsg.ignoreContentAdaptWithSize(true);
            this.lable_leftMsg.setString("");
            this.lable_rightMsg.setString("");
        };
        VersionDialogPanel.prototype.Show = function (data) {
            if (!data) {
                this.Hide();
                return false;
            }
            if (!data.msg) {
                this.Hide();
                return false;
            }
            _super.prototype.Show.call(this, data);
            this.lable_leftMsg.setString(data.leftMsg || "");
            this.lable_rightMsg.setString(data.rightMsg || "");
        };
        VersionDialogPanel.prototype.Hide = function () {
        };
        return VersionDialogPanel;
    }(common.DialogPanel));
    common.VersionDialogPanel = VersionDialogPanel;
})(common || (common = {}));
var kaayou;
(function (kaayou) {
    var blackList = /** @class */ (function () {
        function blackList() {
        }
        blackList.loadBlackList = function () {
            cc.loader.loadTxt("res/BlackList.txt", function (err, file) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                blackList.black_list = file.split("\n");
            });
        };
        blackList.checkBlackList = function (data) {
            var tem = data;
            var wordLength = data.length;
            for (var i = 0; i < blackList.black_list.length; i++) {
                var str = lodash.trim(blackList.black_list[i]);
                if (str == "") {
                    continue;
                }
                if (tem.indexOf(str) != -1) {
                    var WordReplaced = kaayou.StringHelper.toStar(str);
                    tem = tem.replace(str, WordReplaced);
                    i--;
                }
            }
            return tem;
        };
        blackList.black_list = null;
        return blackList;
    }());
    kaayou.blackList = blackList;
    blackList.loadBlackList();
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var editBox = /** @class */ (function () {
        function editBox() {
        }
        editBox.attachTextEdit = function (pNode, name, placeholdStr, handleInput, attr) {
            attr = attr || {
                "fontSize": 26,
                "fontColor": "#B97D55",
                "setInputMode": 6,
                "setMaxLength": 8,
                "setPlaceholderFontSize": 26,
            };
            var input = ccui.helper.seekWidgetByName(pNode, name);
            var sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            var eb1 = cc["EditBox"].create(input.getContentSize(), sp);
            eb1.setAnchorPoint(0, 0);
            eb1.setPosition(0, 0);
            eb1.setOpacity(0);
            eb1['setFontSize'](attr.fontSize);
            eb1['setFontColor'](cc.color(attr.fontColor));
            eb1['setInputMode'](attr.setInputMode);
            eb1['setMaxLength'](attr.setMaxLength);
            eb1["setPlaceholderFontSize"](attr.fontSize);
            eb1["setPlaceholderFontColor"](cc.color(attr.fontColor));
            eb1.setPlaceHolder(placeholdStr);
            eb1['setDelegate']({
                editBoxTextChanged: function (ref) {
                    var str = ref.getString();
                    ref.setString(str);
                },
                /**
                 * This method is called when an edit box loses focus after keyboard is hidden.
                 * @param {cc.EditBox} sender
                 */
                editBoxEditingDidEnd: function (ref) {
                    if (handleInput) {
                        handleInput(ref.getString());
                    }
                }
            });
            input.addChild(eb1);
            return eb1;
        };
        editBox.target = function (node) {
            var cache = {};
            var api = { attachTextEdit: null, getValue: null, setValue: null, setEnable: null, setAllEnable: null, getAllValue: null, setAttribute: null };
            var ef = function () { };
            api.attachTextEdit = function (name, handleInput, attr) {
                var _a = attr || {}, _b = _a.fontSize, fontSize = _b === void 0 ? 26 : _b, _c = _a.phFontColor, phFontColor = _c === void 0 ? "#B97D55" : _c, _d = _a.fontColor, fontColor = _d === void 0 ? "#B97D55" : _d, _e = _a.setInputMode, setInputMode = _e === void 0 ? 6 : _e, _f = _a.setMaxLength, setMaxLength = _f === void 0 ? 8 : _f, _g = _a.placeholdStr, placeholdStr = _g === void 0 ? "请输入" : _g, _h = _a.type, type = _h === void 0 ? "string" : _h, _j = _a.allowNavi, allowNavi = _j === void 0 ? true : _j, _k = _a.allowEmpty, allowEmpty = _k === void 0 ? true : _k, _l = _a.min, min = _l === void 0 ? -Infinity : _l, _m = _a.regExp, regExp = _m === void 0 ? null : _m, _o = _a.pressdown, pressdown = _o === void 0 ? ef : _o, _p = _a.max, max = _p === void 0 ? Infinity : _p;
                var input = ccui.helper.seekWidgetByName(node, name);
                var sp = new cc["Scale9Sprite"]();
                sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
                var eb1 = cc["EditBox"].create(input.getContentSize(), sp);
                eb1.setAnchorPoint(0, 0);
                eb1.setPosition(0, 0);
                eb1.setOpacity(0);
                eb1['setFontSize'](fontSize);
                eb1['setFontColor'](cc.color(fontColor));
                eb1['setInputMode'](setInputMode);
                eb1['setMaxLength'](setMaxLength);
                eb1["setPlaceholderFontSize"](fontSize);
                eb1["setPlaceholderFontColor"](cc.color(phFontColor));
                eb1.setPlaceHolder(placeholdStr);
                var dotCount = function (str) {
                    var dot = str.match(/\./g);
                    return null === dot ? 0 : dot.length;
                };
                var subCount = function (str) {
                    var sub = str.match(/\-/g);
                    return null === sub ? 0 : sub.length;
                };
                var oldText = null;
                eb1['setDelegate']({
                    editBoxTextChanged: function (ref) {
                        var reg, isNavi;
                        var str = ref.getString();
                        switch (type) {
                            case "string":
                                pressdown(str);
                                ref.setString(str);
                                break;
                            case "int":
                                reg = /^[0-9]+$/;
                                if (allowNavi && str.charAt(0) === "-") {
                                    isNavi = true;
                                    str = str.substring(1);
                                }
                                while (reg.test(str) === false) {
                                    str = str.slice(0, str.length - 1);
                                    if (str.length === 0)
                                        break;
                                }
                                if (allowEmpty === false)
                                    if (str.length == 0) {
                                        str = "0";
                                        if (isNavi)
                                            isNavi = false;
                                    }
                                if (str.length !== 0)
                                    str = Math.max(min, Math.min(max, +str)).toString();
                                if (isNavi)
                                    ref.setString("-" + str);
                                else
                                    ref.setString(str);
                                break;
                            case "float":
                                reg = /(^[0-9]+[\.]{0,1}[0-9]{0,2}$)|(^[0-9]+$)/;
                                var other = /[^\-^0-^9^\.]+/;
                                if (allowNavi && str.charAt(0) === "-") {
                                    isNavi = true;
                                    str = str.substring(1);
                                }
                                while (other.test(str) || dotCount(str) > 1 || reg.test(str) === false) {
                                    str = str.slice(0, str.length - 1);
                                    if (str.length === 0)
                                        break;
                                }
                                if (allowEmpty === false)
                                    if (str.length == 0) {
                                        str = "0";
                                        if (isNavi)
                                            isNavi = false;
                                    }
                                if (!allowEmpty && str.length !== 0)
                                    str = Math.max(min, Math.min(max, +str)).toString();
                                if (isNavi)
                                    ref.setString("-" + str);
                                else
                                    ref.setString(str);
                                break;
                            case "validate":
                                if (regExp === null)
                                    pressdown(true, oldText = str);
                                else {
                                    var result = regExp.test(str);
                                    result && (oldText = str);
                                    pressdown(result, oldText);
                                }
                                break;
                                break;
                        }
                    },
                    /**
                     * This method is called when an edit box loses focus after keyboard is hidden.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidEnd: function (ref) {
                        var str = ref.getString();
                        switch (type) {
                            case "validate":
                                var result = regExp && regExp.test(str) || regExp === null;
                                result && (oldText = str);
                                handleInput(result, oldText);
                                break;
                            case "string":
                            case "int":
                            case "float":
                                handleInput(str);
                        }
                    }
                });
                cache[name] = eb1;
                input.addChild(eb1);
                return eb1;
            };
            api.getValue = function (name) {
                if (cache[name] !== void 0) {
                    return cache[name].getString();
                }
                return null;
            };
            api.setValue = function (name, value) {
                if (cache[name] !== void 0) {
                    cache[name].setString(value.toString());
                }
            };
            api.getAllValue = function () {
                var out = {};
                lodash.forEach(cache, function (item, key) {
                    out[key] = item.getString();
                });
            };
            api.setEnable = function (name, config) {
                if (config === void 0) { config = true; }
                if (cache[name] !== void 0) {
                    cache[name].setTouchEnabled(!!config);
                }
            };
            api.setAllEnable = function (config) {
                if (config === void 0) { config = true; }
                lodash.forEach(cache, function (item, key) {
                    item.setTouchEnabled(!!config);
                });
            };
            api.setAttribute = function (name, attr, val) {
                if (cache[name]) {
                    switch (attr) {
                        case "fontSize":
                            cache[name]['setFontSize'](val);
                            cache[name]["setPlaceholderFontSize"](val);
                            break;
                        case "fontColor":
                            cache[name]["setPlaceholderFontColor"](cc.color(val));
                            cache[name]['setFontColor'](cc.color(val));
                            break;
                        case "setMaxLength":
                            cache[name]['setMaxLength'](val);
                            break;
                    }
                }
            };
            return api;
        };
        return editBox;
    }());
    kaayou.editBox = editBox;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var filter = /** @class */ (function () {
        function filter() {
        }
        filter.UniqueObjectListByKey = function (list, attr, cache, delOld) {
            list = lodash.clone(list);
            if (typeof cache === "boolean") {
                delOld = cache;
                cache = null;
            }
            var map = RoadMap(list, attr, cache);
            var morethan1 = [];
            for (var key in map) {
                if (map[key].length > 1)
                    morethan1.push(key);
            }
            morethan1.forEach(function (v) {
                var arr = map[v];
                if (delOld)
                    arr = arr.reverse();
                arr = arr.slice(1);
                arr.forEach(function (v) {
                    remove(list, v);
                });
            });
            return list;
            function remove(list, i) {
                list.splice(i, 1);
            }
            function RoadMap(l, attr, cache) {
                var map = cache || {};
                l.forEach(function (v, i) {
                    var ir = v[attr];
                    var code = hashcode(ir);
                    map[code] = map[code] || [];
                    map[code].push(i);
                });
                return map;
            }
            function hashcode(key) {
                var chars = key.split("");
                var hash = [];
                var start = 0;
                chars.reduce(function (v, s) {
                    var n = v + s.charCodeAt();
                    hash.push(n);
                    return n;
                }, start);
                return hash.map(function (v) { return v.toString(16); }).join("");
            }
        };
        return filter;
    }());
    kaayou.filter = filter;
})(kaayou || (kaayou = {}));
var common;
(function (common) {
    var htmlRender = /** @class */ (function () {
        function htmlRender() {
            this.contentView = null;
        }
        htmlRender.prototype.render = function (contentView, _content) {
            var _this = this;
            this.contentView = contentView;
            contentView.removeAllChildren();
            var child = this.parseToObject(this.parseEditSource(_content)).child;
            child.forEach(function (one) {
                var style = _this.getStyle(one);
                var layout;
                if (_this.isComponent(one)) {
                    layout = _this.createComponent(one);
                }
                else
                    layout = _this.createStage(one.text, style);
                contentView.addChild(layout);
            });
            contentView.doChildrenLayout();
            contentView.scrollToTop(0, false);
        };
        //是不是组件节点
        htmlRender.prototype.isComponent = function (node) {
            var child = node.child;
            return child.some(function (v) {
                switch (v.tag) {
                    case "img":
                        return true;
                }
                return false;
            });
        };
        htmlRender.prototype.replaceHTMLFormat = function (text) {
            return text.replace(/\&nbsp;/g, " ")
                .replace(/\&quot;/g, "\"")
                .replace(/\&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&#39;/g, "'");
        };
        htmlRender.prototype.loadImage = function (_a) {
            var url = _a.url, _b = _a.success, success = _b === void 0 ? void 0 : _b, _c = _a.fail, fail = _c === void 0 ? void 0 : _c;
            var ef = function () { };
            new Promise(function (resolve, reject) {
                cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, tex) {
                    if (err) {
                        return reject(err);
                        ;
                    }
                    if (typeof (tex) != "undefined" && tex != null) {
                        if (!cc.sys.isNative) {
                            var texture2d = new cc.Texture2D();
                            texture2d.initWithElement(tex);
                            texture2d.handleLoadedTexture();
                            resolve(texture2d);
                        }
                        else {
                            resolve(tex);
                        }
                    }
                });
            }).then(success || ef)
                .catch(fail || ef);
        };
        //需不需要填满还有待需求确定
        //暂时剧中
        htmlRender.prototype.fitImage = function (Sprite, layout, sw, sh) {
            var _a = this.contentView.getSize(), width = _a.width, height = _a.height;
            var anchor = this.contentView.getAnchorPoint();
            var p1 = sw / width;
            var p2 = sh / height;
            var sp = Sprite.getChildren()[0];
            if (p1 <= 1) {
                Sprite.setAnchorPoint(0.5, 0.5);
                sp.setAnchorPoint(0, 0);
                sp.setPosition(0, 0);
                //start 00
                if (cc.sys.isNative) {
                    Sprite.setPosition((width - sw) / 2, 0);
                }
                else {
                    Sprite.setPosition(width / 2, sh / 2);
                }
                return;
            }
            Sprite.setAnchorPoint(0.5, 0.5);
            sp.setAnchorPoint(0, 0);
            sp.setPosition(0, 0);
            var fw = width;
            var fh = sh / p1;
            sp.setScaleX(1 / p1);
            sp.setScaleY(1 / p1);
            Sprite.setSize(cc.size(fw, fh));
            if (cc.sys.isNative) {
                Sprite.setPosition(0, 0);
            }
            else {
                Sprite.setPosition(fw / 2, fh / 2);
            }
            layout.setSize(cc.size(fw, fh));
            //sp.setTextureRect(rect,false,cc.size(fw,fh));
        };
        htmlRender.prototype.createComponent = function (one) {
            var _this = this;
            var child = one.child;
            var layout = ccui.Layout.create();
            var contentSize = this.contentView.getSize();
            var self = this;
            child.forEach(function (v) {
                var src;
                switch (v.tag) {
                    case "img":
                        src = v.src;
                        _this.loadImage({
                            url: src,
                            success: function (texture) {
                                var width = texture.width;
                                var height = texture.height;
                                var image = ccui.ImageView.create();
                                var sp = image.getChildren()[0];
                                if (!sp) {
                                    sp = new cc.Sprite();
                                    sp.setName(Math.random().toString().substr(2, 8));
                                    sp.initWithTexture(texture);
                                    sp.setPosition(width / 2, height / 2);
                                    image.addChild(sp);
                                    image.setSize(cc.size(width, height));
                                }
                                layout.addChild(image);
                                layout.setSize(cc.size(contentSize.width, height));
                                self.fitImage(image, layout, width, height);
                                self.contentView.doChildrenLayout();
                            }
                        });
                        break;
                }
            });
            return layout;
        };
        htmlRender.prototype.createStage = function (text, style) {
            var contentSize = this.contentView.getSize();
            var layout = ccui.Layout.create();
            var word = ccui.Text.create();
            var size = this.measureText(text, parseInt(style["font-size"]) || 20);
            var width = Math.max(contentSize.width, size.width);
            var height = size.height;
            layout.setSize(cc.size(width, height));
            layout.setAnchorPoint(0, 0);
            word.setTextAreaSize(cc.size(Math.max(0, width - 16), height));
            word.setString(this.replaceHTMLFormat(text));
            word.setPosition(8, 0);
            setTextAlign(word, style["text-align"]);
            setTextColor(word, style["color"]);
            setTextSize(word, style["font-size"]);
            // setTextFontFamily(word,style["font-family"]);
            // word.setFontName("Microsoft YaHei");
            layout.addChild(word);
            return layout;
            function setTextAlign(text, type) {
                if (type === void 0) { type = "left"; }
                text.setAnchorPoint(0, 0);
                switch (type) {
                    case "left":
                        text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                        break;
                    case "right":
                        text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
                        break;
                    case "center":
                        text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                        break;
                }
            }
            function setTextFontFamily(text, val) {
                var support = {
                    "Microsoft YaHei": "Microsoft YaHei",
                    "微软雅黑": "Microsoft YaHei"
                };
                if (val === void 0)
                    return;
                text.setFontName;
            }
            function setTextColor(text, val) {
                val = val || "#000000";
                text.setColor(cc.color(val.replace(";", "")));
            }
            function setTextSize(text, val) {
                val = parseInt(val) || 20;
                text.setFontSize(val);
            }
        };
        htmlRender.prototype.getStyle = function (obj, out) {
            if (out === void 0) { out = { "font-size": null, color: null }; }
            if (lodash.isEmpty(obj.style) === false) {
                lodash.extend(out, obj.style);
                if (Object.keys(out).every(function (v) { return out[v] !== null; }))
                    return out;
            }
            for (var i = 0; i < obj.child.length; i++)
                this.getStyle(obj.child[i], out);
            return out;
        };
        htmlRender.prototype.measureText = function (str, size) {
            var width = this.contentView.getSize().width;
            var text = ccui.Text.create();
            text.setTextAreaSize(cc.size(width - 16, 0));
            text.ignoreContentAdaptWithSize(false);
            text.setFontSize(size);
            text.setString(this.replaceHTMLFormat(str));
            return text.getVirtualRendererSize();
        };
        htmlRender.prototype.parseToObject = function (tags) {
            var root = { child: [] };
            var tagsReg = new RegExp("<(\\w+).*?>((?:<\\1>[\\w\\W]*?</\\1>)|(?:[\\w\\W]*?))</\\1>", "g");
            var tagsReg1 = new RegExp("<(\\w+)[^>]*?/>", "g");
            var outTags = new RegExp("<(\\w+).*?></\\1>", "g");
            var styleReg = new RegExp("^<(\\w+)?\\s*style\\s*=\\s*[\'\"](.*?)[\'\"].*?>.+</\\1>+", "im");
            var styleAttr = /([a-zA-Z0-9%\- ]+):([a-zA-Z0-9%\-\u4e00-\u9fa5 \(,\)#'"]+)/g;
            var content = new RegExp("(?:<(\\w+).*?>([\\w\\W]+)(?:</\\1>)$)", "im");
            var src = new RegExp("<(\\w+)[^<]*?src=[\'\"](.*?)[\'\"].*?/>", "im");
            if ((tagsReg.test(tags)) === false) {
                root.child.push({ style: {}, text: "", html: tags, child: [], tag: "" });
                return root;
            }
            var splitedTag = tags.match(tagsReg);
            splitedTag.forEach(function (tag) {
                if (isSingleTag(tag)) {
                    tag.match(tagsReg).forEach(function (v) {
                        root.child.push(_parse(v));
                    });
                }
                else {
                    var tgs = tag.match(content)[2];
                    tgs = _parse(tgs);
                    var style_1 = {};
                    parseStyle(tag, style_1);
                    style_1 = lodash.pick(style_1, ["color", "font-size", "font-family", "text-align"]);
                    tgs.child.forEach(function (one) {
                        lodash.extend(one.style, style_1);
                        root.child.push(one);
                    });
                }
            });
            return root;
            function isSingleTag(str) {
                var matcher = new RegExp("<(\\w+).*?>[\\w\\W]*?(?:</\\1>)", "g");
                var content = new RegExp("(?:<(\\w+).*?>([\\w\\W]+)(?:</\\1>)$)", "im");
                var manytags = new RegExp("<(\\w+).*?>([\\w\\W]*?)(</\\1>)", "g");
                var cstr = str.match(content);
                cstr = cstr && cstr[2] || "";
                var mc = cstr.match(manytags);
                var mc1 = str.match(outTags);
                //let mc = cstr.match(new RegExp(matcher.source , "g" ) );
                if ((mc && mc1) && mc1.length === 1 && mc.length > 1)
                    return false;
                return true;
            }
            function parseStyle(str, style) {
                if (styleReg.test(str)) {
                    var satrs = str.match(styleReg)[2];
                    var matcher = satrs.match(styleAttr);
                    if (matcher)
                        matcher.forEach(function (v) {
                            var reg = new RegExp(styleAttr.source, "im");
                            var atr = v.match(reg);
                            style[atr[1]] = atr[2];
                        });
                }
            }
            function _parse(str) {
                str = str.trim();
                var out = { style: {}, text: "", html: str, child: [], tag: "", src: "" };
                out.text = getString(str).trim();
                if (str.match(tagsReg) || str.match(tagsReg1)) {
                    out.tag = RegExp.$1;
                    parseStyle(str, out.style);
                    var innerHTML = str.match(content);
                    var manytags = str.match(outTags) || str.match(tagsReg);
                    var matchRegStr = void 0;
                    if (manytags && manytags.length > 1) {
                        manytags.forEach(function (v) {
                            out.child.push(_parse(v));
                        });
                    }
                    else {
                        if (innerHTML) {
                            innerHTML = innerHTML[2].trim();
                            matchRegStr = (innerHTML).match(tagsReg);
                            if (matchRegStr) {
                                parseTagHTML(innerHTML, matchRegStr).forEach(function (v) {
                                    out.child.push(_parse(v));
                                });
                            }
                            else {
                                out.child.push(_parse(innerHTML));
                            }
                        }
                    }
                    var source = void 0;
                    switch (out.tag) {
                        case "img":
                            source = str.match(src);
                            out.src = source && source[2];
                            break;
                        default:
                            delete out.src;
                    }
                    out.style["font-size"] = out.style["font-size"] || (function () {
                        switch (out.tag) {
                            case "h1":
                                return 20 * 2;
                            case "h2":
                                return 20 * 1.5;
                            case "h3":
                                return 20 * 1.17;
                            default:
                                return 20;
                        }
                    })();
                }
                return out;
            }
            function parseTagHTML(source, arr) {
                var out = [];
                var start = 0;
                arr.forEach(function (v) {
                    walker(source, v, out);
                });
                return out;
                function walker(source, str, out) {
                    var i = source.indexOf(str);
                    if (i !== start) {
                        out.push(source.substring(start, i));
                    }
                    start = i + str.length;
                    out.push(str);
                }
            }
            function getString(str) {
                return str.replace(/<.*?>/g, "");
            }
        };
        htmlRender.prototype.parseEditSource = function (str) {
            var css1 = /<.*?style=['"](.*?)['"].*?>/g;
            var tags = new RegExp("<(\\w+).*?>([\\w\\W]*?)(</\\1>)", "g");
            var outTags = new RegExp("<(\\w+).*?>((?:<\\1>[\\w\\W]*?</\\1>)|(?:[\\w\\W]*?))</\\1>", "g");
            var inTags = new RegExp("<(\\w+).*?>([\\w\\W]*)(?:</\\1>)$", "im");
            var BR = new RegExp("<(\\w+).*?><br/>(?:</\\1>)|<br/>", "g");
            var checkP = /<(p|h1|h2|h3|h4|h5).*?>[\w\W]*?<\/\1.*?>/g;
            var replaceHTMLFormat = this.replaceHTMLFormat;
            if (tags.test(str) === false)
                return str;
            var outstr = str.match(outTags);
            outstr = outstr.map(function (v) {
                if (!css1.test(v))
                    return v;
                return v.replace(css1, function (tag, style) {
                    var cssStr = Css2Object(style);
                    cssStr = Object.keys(cssStr).map(function (v) {
                        return v + ":" + cssStr[v].replace(";", "");
                    });
                    return tag.replace(style, cssStr.join(";") + ";");
                });
            });
            //测试是否下级还是唯一标签,如果是，则合并属性
            outstr = outstr.map(function (v) {
                if (isSingleTag(v)) {
                    return mergeTag(v);
                }
                return v;
                function isSingleTag(str) {
                    var content = str.match(inTags);
                    var inner = content[2] || "";
                    var reg = new RegExp("<(\\w+).*?>[\\w\\W]*?(?:</\\1>)", "g");
                    var mc = inner.match(reg);
                    if (mc === null || mc.length > 1)
                        return false;
                    return true;
                }
                function mergeTag(v, style) {
                    if (style === void 0) { style = {}; }
                    var cssReg = new RegExp("<(\\w+).*?style=['\"](.*?)['\"].*?>[\\w\\W]*(?:</\\1>)$", "im");
                    var _style = v.match(cssReg);
                    _style = _style && _style[2] && Css2Object(_style[2]) || {};
                    var inner = v.match(inTags);
                    style = lodash.extend(style, _style);
                    if (inner && isSingleTag(inner[0])) {
                        return mergeTag(inner[2], style);
                    }
                    var css = Object.keys(style).map(function (v) {
                        return v + ":" + style[v].replace(";", "");
                    });
                    return "<p style=\"" + (css.join(";") + ";") + "\" >" + (inner && inner[2] || v) + "</p>";
                }
            });
            // str = str.map(v => {
            //     let out = v.match(inTags);
            //     if (out && BR.test(out[2])) {
            //         return out[0].replace(BR, function ($0, $1) {
            //             return `<p></p>`
            //         })
            //     }
            //     return v;
            // })
            outstr = outstr.map(function (v) {
                // let temp = v.replace(checkP, "").trim();
                // let ps;
                // if (temp.length === 0 || (ps = v.match(checkP))===null)
                //     return v;
                var ps;
                if ((ps = v.match(BR)) === null)
                    return v;
                var idxs = []; //ps.map(piece => v.indexOf(piece))
                var mAll = matchAll_polifill(v, BR); //v.matchAll(checkP);
                var one;
                while ((one = mAll.next()) && one.done === false)
                    idxs[idxs.length] = one.value.index;
                // let idxs = [...ps.matchAll()]
                idxs.length < 2 && idxs.push(Infinity);
                var out = "";
                var i = 1;
                for (; i < idxs.length; i++) {
                    var s = idxs[i - 1];
                    var e = idxs[i];
                    var tempStr = void 0;
                    // if(isEmptyTag(ps[i-1])===false)
                    // out += ps[i - 1];
                    tempStr = v.substr(s + ps[i - 1].length, e - s - (ps[i] && ps[i].length || 0));
                    if (tempStr.length > 0)
                        out += "<p>" + tempStr + "</p>";
                }
                var headStr = v.substr(0, idxs[0]);
                var tail = v.substr(idxs[i - 1] + (ps[i - 1] && ps[i - 1].length || 0));
                // if(headStr.length){
                //     out = "<p>"+headStr+"</p>" + out;
                // }
                var matchHead = matchAll_polifill(headStr, /<.*?>/g);
                var matchtail = matchAll_polifill(tail, /<\/.*?>/g);
                if (matchHead != null) {
                    var one_1 = matchHead.next();
                    var str_1 = one_1.value.string || "";
                    var temp = headStr.substr(str_1.length);
                    headStr = str_1 + "<p>" + temp + "</p>";
                }
                if (matchtail != null) {
                    var one_2 = matchtail.next();
                    var str_2 = one_2.value.string || "";
                    var temp = tail.substr(0, one_2.value.index);
                    tail = "<p>" + temp + "</p>" + str_2;
                }
                out = headStr + out + tail;
                // if(tail.length>0)
                //     out = out + "<p>" + tail + "</p>";
                return out;
            });
            outstr = outstr.join("").replace(/\n|\t|\r/g, "");
            return outstr;
            function matchAll_polifill(str, reg) {
                var strs = str.match(reg);
                if (strs === null)
                    return null;
                var maps = strs.reduce(function (o, v, i) {
                    var fix = 0;
                    var idx;
                    if (i == 0) {
                        idx = kmp(str, v);
                        o[0] = { index: idx, string: v };
                        return o;
                    }
                    fix = o[i - 1].index + o[i - 1].string.length;
                    idx = kmp(str.substr(fix), v);
                    o[i] = { index: idx + fix, string: v };
                    return o;
                }, strs);
                return (function iteratorWrapper() {
                    var i = 0;
                    var _temp = maps;
                    var api = {
                        next: function () {
                            if (_temp[i] === void 0 && _temp.length <= i)
                                return {
                                    done: true,
                                    value: void 0
                                };
                            return {
                                value: _temp[i++],
                                done: false,
                                next: api.next
                            };
                        }
                    };
                    return api;
                })();
                // return maps[Symbol.iterator]();
                function kmp(str, search) {
                    return _kmp(str, search);
                    function next(s, list) {
                        var len = s.length;
                        list[0] = 0;
                        for (var i = 1, k = 0; i < len; i++) {
                            while (k > 0 && s[k] !== s[i])
                                k = list[k - 1];
                            if (s[k] == s[i])
                                k++;
                            list[i] = k;
                        }
                    }
                    function _kmp(str, search) {
                        var len1 = str.length;
                        var len2 = search.length;
                        var table = [];
                        var i, j;
                        next(search, table);
                        for (i = 0, j = 0; i < len1; i++) {
                            while (j > 0 && str[i] != search[j]) {
                                j = table[j - 1];
                            }
                            if (str[i] == search[j])
                                j++;
                            if (j == len2)
                                return i - j + 1;
                        }
                        return -1;
                    }
                }
            }
            function replaceColor(v) {
                if (v.indexOf("#") !== -1)
                    return v;
                var rgb = v.match(/[0-9]+/g).map(function (v) {
                    var c = parseInt(v).toString(16);
                    if (c.length % 2)
                        return "0" + c;
                    return c;
                });
                return "#" + rgb.join("") + ";";
            }
            function Css2Object(one) {
                one = replaceHTMLFormat(one);
                var attbsReg = /[a-zA-Z0-9%\- ]+:[a-zA-Z0-9%\-\u4e00-\u9fa5 \(,\)#"']+/g;
                var attbs = one.match(attbsReg);
                if (attbs === null)
                    return {};
                return attbs.reduce(function (o, v) {
                    v = v.split(":");
                    var s = v[0].trim().replace("\"", "");
                    var a = v[1].trim();
                    if (/color|background-color/.test(s))
                        a = replaceColor(a);
                    o[s] = a;
                    return o;
                }, {});
            }
        };
        return htmlRender;
    }());
    common.htmlRender = htmlRender;
})(common || (common = {}));
var kaayou;
(function (kaayou) {
    var Identify = /** @class */ (function () {
        function Identify() {
        }
        //文本补空格
        //手机号格式是否正确
        Identify.isPhone = function (text) {
            return /^1[3-9]\d{9}$/.test(text);
        };
        //是否是中文
        Identify.isChinese = function (text) {
            return /^[\u4E00-\u9FA5]{2,4}$/.test(text);
        };
        Identify.isEmail = function (text) {
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+$/.test(text);
        };
        //姓名的格式是否正确
        Identify.isReName = function (text) {
            return /^[\u4E00-\u9FA5]{2,8}$/.test(text);
        };
        //身份证格式是否正确
        Identify.idCard = function (text) {
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(text);
        };
        //密码格式是否正确
        Identify.isPassWord = function (text, min, max) {
            if (min === void 0) { min = 6; }
            if (max === void 0) { max = 12; }
            var reg = new RegExp("^[\\w]{" + min + "," + max + "}$", "i");
            return reg.test(text);
        };
        //是否是 数字
        Identify.isNumber = function (val) {
            // if (val == "") return false;
            // return /^[0-9]*$/.test(val);
            var regPos = /^\d+(\.\d+)?$/; //非负浮点数
            var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
            if (regPos.test(val) || regNeg.test(val)) {
                return true;
            }
            else {
                return false;
            }
        };
        //是否是纯数字
        Identify.isPureNumber = function (val) {
            var reg = new RegExp("^[0-9]*$");
            if (reg.test(val)) {
                return true;
            }
            else {
                return false;
            }
        };
        //是否是 数字和英文
        Identify.isAbcNumber = function (text, min, max) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 12; }
            if (text == "")
                return false;
            if (text.length < min)
                return false;
            if (text.length > max)
                return false;
            return /^[a-zA-Z0-9]*$/.test(text);
        };
        //截取名字长度 保留默认 10 ，汉字 8
        Identify.nickNameSubEight = function (text) {
            text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            var b = /^[_a-zA-Z0-9]+$/.test(text);
            if (b) {
                text = text.substring(0, 10);
            }
            else {
                text = text.substring(0, 8);
            }
            return text;
        };
        //截取名字长度 保留默认 10 ，汉字 7
        Identify.nickNameSubSeven = function (text) {
            text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            var b = /^[_a-zA-Z0-9]+$/.test(text);
            if (b) {
                text = text.substring(0, 12);
            }
            else {
                text = text.substring(0, 7);
            }
            return text;
        };
        //截取名字长度 保留默认 10 ，汉字 6
        Identify.nickNameSubSix = function (text) {
            text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            var b = /^[_a-zA-Z0-9]+$/.test(text);
            if (b) {
                text = text.substring(0, 10);
            }
            else {
                //text = text.match(/(.)/g).slice(0,7).join("")
                text = text.substring(0, 6);
            }
            return text;
        };
        Identify.substrWithEmoji = function (str, start, end) {
            if (start === void 0) { start = 0; }
            var i = start;
            i = i < 0 ? 0 : i;
            var char;
            var betweenEmoji = function (char) {
                if (between(char, 0x1F601, 0x1F64F) ||
                    between(char, 0x1F680, 0x1F6C0) ||
                    between(char, 0x1F170, 0x1F251) ||
                    between(char, 0x1F600, 0x1F636) ||
                    between(char, 0x1F681, 0x1F6C5) ||
                    between(char, 0x1F30D, 0x1F567) ||
                    between(char, 0x1F300, 0x1F5FF)) {
                    return true;
                }
                return false;
                function between(cur, start, end) {
                    return cur >= start && cur <= end;
                }
            };
            if (start >= end)
                return "";
            char = str.codePointAt(Math.max(i - 1, 0));
            if (betweenEmoji(char))
                start = Math.max(start - 1, 0);
            while ((char = str.codePointAt(i))) {
                if (betweenEmoji(char)) {
                    end = end + 1;
                }
                i++;
                if (i >= end)
                    break;
            }
            return str.substring(start, end);
        };
        //截取名字长度 保留默认 10 ，汉字 5
        Identify.nickNameSubFive = function (text) {
            text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            var b = /^[_a-zA-Z0-9]+$/.test(text);
            if (b) {
                text = text.substring(0, 10);
            }
            else {
                text = text.substring(0, 5);
            }
            return text;
        };
        //截取名字长度 保留默认 8 ，汉字 4
        Identify.nickNameSubFour = function (text) {
            text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            var b = /^[_a-zA-Z0-9]+$/.test(text);
            if (b) {
                text = text.substring(0, 8);
            }
            else {
                text = text.substring(0, 4);
            }
            return text;
        };
        //截取名字长度
        Identify.nickNameSubByLength = function (text, enLength, chLength) {
            text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            var b = /^[_a-zA-Z0-9]+$/.test(text);
            if (b) {
                text = text.substring(0, enLength);
            }
            else {
                text = text.substring(0, chLength);
            }
            return text;
        };
        //检测昵称是否格式正确
        Identify.nickNameMacth = function (text) {
            return /^[\u4e00-\u9fa5A-Za-z0-9-_]{1,8}$|^[_a-zA-Z0-9]{1,10}$/.test(text);
        };
        //隐藏手机号中间
        Identify.hidePhone = function (text) {
            return text.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
        };
        Identify.nickNameCh8 = function (text) {
            return /^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(text);
        };
        Identify.nickNameEN10 = function (text) {
            return /^[_a-zA-Z0-9]*$/.test(text);
        };
        //判断中文和字母
        Identify.isChorAbc = function (text) {
            return /^[a-zA-Z\u4e00-\u9fa5]{2,6}$/.test(text);
        };
        //中文字母和数字
        Identify.isChorAbcorNum = function (text) {
            return /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(text);
        };
        //判断括号
        Identify.isBrackets = function (text) {
            for (var x in text) {
                cc.log(text[x]);
                if (text[x] == " ") {
                    return false;
                }
            }
            return true;
        };
        Identify.isJSON = function (str) {
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str);
                    if (typeof obj == 'object' && obj) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                catch (e) {
                    console.log('error：' + str + '!!!' + e);
                    return false;
                }
            }
            console.log('It is not a string!');
        };
        //补零
        Identify.addPreZero = function (num, len) {
            if (typeof (num) != "number") {
                num = parseInt(num);
            }
            if (num.toString().length >= len) {
                return num.toString();
            }
            var str = "";
            for (var i = 0; i < len - 1; i++) {
                str += "0";
            }
            return (str + num).slice(-len);
        };
        //保留2位小数，且不补0
        Identify.toDecimal2NoZero = function (num) {
            var f = Math.round(num * 100) / 100;
            var s = f.toString();
            return s;
        };
        //保留有效小数点后几位
        Identify.toDecimalNoZero = function (num, len) {
            if (!len || len <= 0) {
                return;
            }
            var f = Math.round(num * Math.pow(10, len)) / Math.pow(10, len);
            var s = f.toString();
            return s;
        };
        Identify.decNumber = function (num, len, wan, yi) {
            if (len === void 0) { len = 4; }
            if (wan === void 0) { wan = "万"; }
            if (yi === void 0) { yi = "亿"; }
            if (!num)
                return "0";
            if (!len || len < 0) {
                return "0";
            }
            var decNum = "";
            var unit = ""; //单位
            if (num >= Math.pow(10, 8)) {
                decNum = (num / Math.pow(10, 8)).toString();
                unit = yi;
            }
            else if (num >= Math.pow(10, 4)) {
                decNum = (num / Math.pow(10, 4)).toString();
                unit = wan;
            }
            else {
                return num.toString();
            }
            var decNumStr = decNum.length >= len ? decNum.substring(0, len) : decNum;
            if (decNumStr[decNumStr.length - 1] == ".") {
                decNumStr = decNum.substring(0, len - 1);
            }
            return decNumStr + unit;
            // if ((num >= Math.pow(10,7)) && (num <= Math.pow(10,8)) ) {
            //     let  decNum = parseInt((num / 10000).toString());
            //     return decNum+"万";
            // }
            // if (num / 10000 >= 1) {
            //     let  decNum = num / 10000;
            //     let a = parseInt((num / 10000).toString());
            //    if (a.toString().length == 2 || a.toString().length == 1) {
            //         var b = (num / 10000).toString().substring(0,4);
            //         var result = b + "万";
            //         return result;
            //     }else if (a.toString().length == 3) {
            //         return parseInt((num / 10000).toString()).toString();
            //     }
            //     return decNum.toPrecision(len)+"万";
            //   } else {
            //     return num.toString();
            //   }
        };
        Identify.changeScoreToSortString = function (socre) {
            var scoreStr = socre + "";
            if (socre > 99999999) {
                scoreStr = Math.max(Math.floor(socre / (10000 * 10000)), Math.floor(socre / (10000 * 1000)) / 10) + "亿";
            }
            else if (socre > 9999) {
                scoreStr = Math.max(Math.floor(socre / 10000), Math.floor(socre / 1000) / 10) + "万";
            }
            return scoreStr;
        };
        Identify.formatRealName = function (name) {
            var newStr;
            if (name.length === 2) {
                newStr = name.substr(0, 1) + '*';
            }
            else if (name.length > 2) {
                var char = '';
                for (var i = 0, len = name.length - 2; i < len; i++) {
                    char += '*';
                }
                newStr = name.substr(0, 1) + char + name.substr(-1, 1);
            }
            else {
                newStr = name;
            }
            return newStr;
        };
        //截取地址
        Identify.getSubAddstr = function (addstr) {
            if (addstr.length < 1) {
                return addstr;
            }
            var startIndex = addstr.indexOf('省');
            if (startIndex < 0) {
                startIndex = addstr.indexOf('国');
            }
            var arr = ['道', '街', '路', '村'];
            var endIndex = addstr.length - 1;
            for (var x in arr) {
                var tempIndex = addstr.indexOf(arr[x]);
                if (tempIndex > 0) {
                    endIndex = tempIndex;
                    break;
                }
            }
            addstr = addstr.substring(startIndex + 1, endIndex + 1);
            return addstr;
        };
        return Identify;
    }());
    kaayou.Identify = Identify;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var IP = /** @class */ (function () {
        function IP() {
        }
        IP.checkIP = function (ip) {
            return __awaiter(this, void 0, void 0, function () {
                var url, res, oRes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "http://apiyxdq.kaayou.com/api/ip/check/foreign?ip=" + ip;
                            return [4 /*yield*/, kaayou.Http.GET(url, null, false, false)];
                        case 1:
                            res = _a.sent();
                            oRes = JSON.parse(res);
                            if (oRes.code == 0) {
                                console.log("是否国外ip：" + res);
                                if (oRes.data.foreign && oRes.data.img) {
                                    kaayou.emit('lobby', "ui::ForeignIPPanel::Show", oRes.data.img);
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return IP;
    }());
    kaayou.IP = IP;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var linear = /** @class */ (function () {
        function linear() {
        }
        linear.CubicBezier = function (p0, p1, p2, p3) {
            var va = 1 - 3 * p2 + 3 * p0;
            var vb = 3 * p2 - 6 * p0;
            var vc = 3 * p0;
            var y1x3 = p1 * 3;
            var y2x3 = p3 * 3;
            return function (offset) {
                if (+offset >= 1)
                    return offset;
                var x = offset, slope, cx, i;
                i = 0;
                for (i; i < 3; i++) {
                    slope = 3 * va * x * x + 2 * vb * x + vc;
                    if (!slope) {
                        return x;
                    }
                    cx = ((va * x + vb) * x + vc) * x - offset;
                    x -= (cx / slope);
                }
                return (((1 - y2x3 + y1x3) * x + (y2x3 - 2 * y1x3)) * x + y1x3) * x;
            };
        };
        //,"ease-in-out-cubic":".645, .045, .355, 1","ease-in-quart":".895, .03, .685, .22","ease-out-quart":".165, .84, .44, 1","ease-in-out-quart":".77, 0, .175, 1","ease-in-quint":".755, .05, .855, .06","ease-out-quint":".23, 1, .32, 1","ease-in-out-quint":".86, 0, .07, 1","ease-in-expo":".95, .05, .795, .035","ease-out-expo":".19, 1, .22, 1","ease-in-out-expo":"cubic-bezier(1, 0, 0, 1","ease-in-circ":".6, .04, .98, .335","ease-out-circ":".075, .82, .165, 1","ease-in-out-circ":".785, .135, .15, .86","ease-in-back":".6, -.28, .735, .045","ease-out-back":".175, .885, .32, 1.275","ease-in-out-back":".68, -.55, .265, 1.55"
        //
        linear.easeOutCubic = function () {
            return kaayou.linear.CubicBezier(.215, .61, .355, 1);
        };
        linear.easeInCubic = function () {
            return kaayou.linear.CubicBezier(.55, .055, .675, .19);
        };
        linear.easeInOutQuad = function () {
            return kaayou.linear.CubicBezier(.455, .03, .515, .955);
        };
        linear.easeOutQuad = function () {
            return kaayou.linear.CubicBezier(.25, .46, .45, .94);
        };
        linear.easeInQuad = function () {
            return kaayou.linear.CubicBezier(.55, .085, .68, .53);
        };
        linear.easeInOutSine = function () {
            return kaayou.linear.CubicBezier(.445, .05, .55, .95);
        };
        linear.easeOutSine = function () {
            return kaayou.linear.CubicBezier(.39, .575, .565, 1);
        };
        linear.easeInSine = function () {
            return kaayou.linear.CubicBezier(.47, 0, .745, .715);
        };
        linear.Ease = function () {
            return kaayou.linear.CubicBezier(0.25, 0.1, 0.25, 1);
        };
        linear.EaseIn = function () {
            return kaayou.linear.CubicBezier(0.42, 0, 1, 1);
        };
        linear.EaseOut = function () {
            return kaayou.linear.CubicBezier(0, 0, 0.58, 1);
        };
        linear.EaseInOut = function () {
            return kaayou.linear.CubicBezier(0.42, 0, 0.58, 1);
        };
        linear.Linear = function () {
            return kaayou.linear.CubicBezier(0, 0, 1, 1);
        };
        return linear;
    }());
    kaayou.linear = linear;
})(kaayou || (kaayou = {}));
var NetImage = /** @class */ (function () {
    function NetImage() {
    }
    NetImage.loadImage = function (url) {
        return new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    //lw200520测试用nginx解决头像问题
                    //http://121.199.42.238:8019/image?url=http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erD6MOUwRKV9NyBAqnoFDTnltzAe2zWOkKxyDOFibVBb1ZV5CaATJwYAuNqZ5sXMBC4c8iacaHDf8RA/132&sb=213.jpg
                    //let sUrl="http://121.199.42.238:8019/image?url="+url+"&sb=213.jpg";
                    cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, tex) {
                        if (err) {
                            return reject(err);
                            ;
                        }
                        if (typeof (tex) != "undefined" && tex != null) {
                            if (!cc.sys.isNative) {
                                var texture2d = new cc.Texture2D();
                                texture2d.initWithElement(tex);
                                texture2d.handleLoadedTexture();
                                resolve(texture2d);
                            }
                            else {
                                resolve(tex);
                            }
                        }
                    });
                    return [2 /*return*/];
                });
            });
        });
    };
    NetImage.doSpriteContentSize = function (sp, size) {
        var csize = sp.getContentSize();
        sp.setScaleX(size.width / csize.width);
        sp.setScaleY(size.height / csize.height);
    };
    NetImage.doSpriteContentSizeAndPosition = function (sp, size) {
        var csize = sp.getContentSize();
        sp.setAnchorPoint(0.5, 0.5);
        sp.setPosition(size.width / 2, size.height / 2);
        sp.setScaleX(size.width / csize.width);
        sp.setScaleY(size.height / csize.height);
    };
    NetImage.doLoadHeadImageWithLayout = function (sex, imgurl, sp, size, callback, checkCall) {
        if (checkCall === void 0) { checkCall = null; }
        if (imgurl && !lodash.isEmpty(imgurl)) {
            try {
                if (sp["url"] == imgurl) {
                    sp.setVisible(true);
                    return;
                }
                //lm190821先隐藏，否则会显示上次的头像
                sp.setVisible(false);
                (function (sp1) {
                    NetImage.loadImage(imgurl).then(function (tex) {
                        if (!sp1.isRunning()) {
                            callback("err");
                            return;
                        }
                        if (checkCall && lodash.isFunction(checkCall)) {
                            var c = checkCall; // && checkCall(_url) === false
                            if (c(imgurl) === false) {
                                return;
                            }
                        }
                        sp1.initWithTexture(tex);
                        NetImage.doSpriteContentSizeAndPosition(sp1, size);
                        sp1.setVisible(true);
                        sp1["url"] = imgurl;
                        callback(null);
                        return;
                    }).catch(function (err) {
                        if (!sp1.isRunning()) {
                            callback("err");
                            return;
                        }
                        if (!!!cc.spriteFrameCache.getSpriteFrame("nan.png")) {
                            cc.spriteFrameCache.addSpriteFrames(common.res.UserHead_plist);
                        }
                        sp1.initWithSpriteFrameName(sex == 1 ? "nan.png" : "nv.png");
                        NetImage.doSpriteContentSizeAndPosition(sp1, size);
                        sp1.setVisible(true);
                        sp1["url"] = "";
                    });
                })(sp);
            }
            catch (err) {
                if (!sp.isRunning()) {
                    callback("err");
                    return;
                }
                if (!!!cc.spriteFrameCache.getSpriteFrame("nan.png")) {
                    cc.spriteFrameCache.addSpriteFrames(common.res.UserHead_plist);
                }
                sp.initWithSpriteFrameName(sex == 1 ? "nan.png" : "nv.png");
                NetImage.doSpriteContentSizeAndPosition(sp, size);
                sp.setVisible(true);
                sp["url"] = "";
                if (callback) {
                    callback(null);
                }
            }
        }
        else {
            if (!!!cc.spriteFrameCache.getSpriteFrame("nan.png")) {
                cc.spriteFrameCache.addSpriteFrames(common.res.UserHead_plist);
            }
            sp.initWithSpriteFrameName(sex == 1 ? "nan.png" : "nv.png");
            NetImage.doSpriteContentSizeAndPosition(sp, size);
            sp["url"] = "";
            sp.setVisible(true);
            if (callback) {
                callback(null);
            }
        }
    };
    NetImage.setPlayerHead = function (headImage, _url, sex, checkCall) {
        if (checkCall === void 0) { checkCall = null; }
        if (headImage == null)
            return;
        var headImgSp = null;
        if (headImage.getChildren().length < 1) {
            headImgSp = new cc.Sprite();
            headImgSp.setVisible(false);
            headImage.addChild(headImgSp);
            headImgSp.setName("headImgSp");
        }
        else {
            headImgSp = headImage.getChildren()[0];
            //如果头像地址未变化，原头像还是显示
            headImgSp.setVisible(_url == headImgSp['_url']);
        }
        if (_url && !lodash.isEmpty(_url)) {
            (function (sp, _layouts) {
                if (!sp) {
                    return;
                }
                if (!_layouts) {
                    return;
                }
                var tex = NetImage.Icache[_url];
                console.log("读取头像图片缓存：" + _url);
                if (!!tex) {
                    console.log("setPlayerHead tex:" + tex);
                    try {
                        sp.initWithTexture(tex);
                        NetImage.doSpriteContentSizeAndPosition(sp, _layouts.getContentSize());
                        sp.setVisible(true);
                        sp['_url'] = _url;
                        return;
                    }
                    catch (ex) {
                        NetImage.Icache[_url] = null;
                    }
                }
                NetImage.loadImage(_url).then(function (tex) {
                    if (!sp.isRunning() || !_layouts.isRunning()) {
                        return;
                    }
                    if (!NetImage.Icache[_url]) {
                        console.log("存头像图片缓存：" + _url);
                        NetImage.Icache[_url] = tex;
                    }
                    if (checkCall && lodash.isFunction(checkCall)) {
                        var c = checkCall; // && checkCall(_url) === false
                        if (c(_url) === false) {
                            return;
                        }
                    }
                    sp.initWithTexture(tex);
                    NetImage.doSpriteContentSizeAndPosition(sp, _layouts.getContentSize());
                    sp.setVisible(true);
                    sp['_url'] = _url;
                });
            })(headImgSp, headImage);
        }
        else {
            if (!sex) {
                sex = 1;
            }
            if (!!!cc.spriteFrameCache.getSpriteFrame("nan.png")) {
                cc.spriteFrameCache.addSpriteFrames(common.res.UserHead_plist);
            }
            headImgSp.initWithSpriteFrameName(sex == 1 ? "nan.png" : "nv.png");
            NetImage.doSpriteContentSizeAndPosition(headImgSp, headImage.getContentSize());
            headImgSp.setVisible(true);
            headImgSp['_url'] = _url;
        }
    };
    NetImage.loadImageWithSaveLocal = function (url) {
        return new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, tex) {
                        console.log("loadImageWithSaveLocal:" + url);
                        if (err) {
                            console.log("loadImageWithSaveLocal failed");
                            return reject(err);
                            ;
                        }
                        if (typeof (tex) != "undefined" && tex != null) {
                            var temp_1 = {};
                            if (!cc.sys.isNative) {
                                var texture2d = new cc.Texture2D();
                                texture2d.initWithElement(tex);
                                texture2d.handleLoadedTexture();
                                temp_1["texture2d"] = texture2d;
                                resolve(texture2d);
                            }
                            else {
                                var path = jsb.fileUtils.getWritablePath() + "imageCache/";
                                if (!jsb.fileUtils.isDirectoryExist(path)) {
                                    console.log("imageCache目录不存在，开始创建");
                                    jsb.fileUtils.createDirectory(path);
                                }
                                if (!jsb.fileUtils.isDirectoryExist(path)) {
                                    console.log("创建目录失败");
                                    return;
                                }
                                var size = cc.director.getWinSize();
                                var pBg = new cc.Sprite();
                                pBg.initWithTexture(tex);
                                pBg.setPosition(pBg.width / 2, pBg.height / 2);
                                var pRTex = new cc.RenderTexture(Math.floor(pBg.width), Math.floor(pBg.height));
                                pRTex.begin();
                                pBg.visit();
                                pRTex.end();
                                var filename = "imageCache/" + kaayou.MD5.encode(url) + ".jpg";
                                pRTex.saveToFile(filename, cc.IMAGE_FORMAT_JPEG, false, function (render, str) {
                                    temp_1["texture2d"] = texture2d;
                                    temp_1["filename"] = str;
                                    console.log("loadImageWithSaveLocal saveToFile:" + str);
                                    resolve(temp_1);
                                });
                                console.log("loadImageWithSaveLocal filename:" + filename);
                            }
                        }
                    });
                    return [2 /*return*/];
                });
            });
        });
    };
    //新增缓存
    NetImage.Icache = {};
    return NetImage;
}());
var Patch = /** @class */ (function () {
    function Patch() {
    }
    Patch.Dithering = function (text) {
        if (text.length == 2) {
            return text.split('').join(' ');
        }
        return text;
    };
    Patch.ChangeTextBMFontFntFile = function (t, text, fileName, ext) {
        if (ext === void 0) { ext = null; }
        var lba = ccui.TextBMFont.create(text, fileName);
        var pt = t.getPosition();
        var apt = t.getAnchorPoint();
        lba.setName(t.getName());
        lba.setTag(t.getTag());
        lba.setScale(t.getScale());
        lba.setPosition(pt);
        lba.setAnchorPoint(apt);
        if (ext) {
            for (var x in ext) {
                lba[ext[x]] = t[ext[x]];
            }
        }
        var parent = t.getParent();
        if (parent) {
            t.removeFromParent(true);
            parent.addChild(lba);
        }
        return lba;
    };
    Patch.ChangeTextColor = function (t, text, color, fontName, fontSize) {
        if (fontName === void 0) { fontName = null; }
        if (fontSize === void 0) { fontSize = null; }
        fontName = fontName || t.getFontName();
        fontSize = fontSize ? parseInt((fontSize + "").replace('px', '')) : t.getFontSize();
        if (text === null) {
            text = t.getString();
        }
        var lba = ccui.Text.create(text, fontName, fontSize);
        var pt = t.getPosition();
        var apt = t.getAnchorPoint();
        lba.setName(t.getName());
        lba.setTag(t.getTag());
        lba.setScale(t.getScale());
        lba.setPosition(pt);
        lba.setAnchorPoint(apt);
        lba.setTextColor(color);
        var parent = t.getParent();
        if (parent) {
            t.removeFromParent(true);
            parent.addChild(lba);
        }
        return lba;
    };
    //设置按钮灰色和按钮文字灰色
    Patch.SetBtnAndTextBright = function (btn, b, btext, tcname) {
        if (btext === void 0) { btext = true; }
        if (tcname === void 0) { tcname = ""; }
        btn.setBright(b);
        btn.setTouchEnabled(b);
        var cl = null;
        if (btext == false) {
            return;
        }
        if (tcname == "") {
            cl = btn.getChildren()[0];
        }
        else {
            cl = btn.getChildByName(tcname);
        }
        if (!cl) {
            return;
        }
        if (b) {
            kaayou.Shader.turnRestore(cl.getVirtualRenderer());
        }
        else {
            kaayou.Shader.turnGray(cl.getVirtualRenderer());
        }
    };
    //设置文字自适应
    Patch.SetAdjustText = function (label, text, ext) {
        if (ext === void 0) { ext = { width: null, height: null, fontSize: null }; }
        var width = ext.width !== null ? ext.width : label.width, height = ext.height !== null ? ext.height : label.height, fontSize = ext.fontSize !== null ? ext.fontSize : label.fontSize;
        var textLabel;
        //16作为基准数 以这个基准为跳格标准
        var px = 1 / 16;
        var targetFontSize = adjustFontSize(text, fontSize, width - 4, height);
        if (text !== label.getString())
            label.setString(text);
        if (px > Math.abs(1 - targetFontSize / fontSize))
            return;
        label.setFontSize(targetFontSize | 0);
        function measureText(str, size) {
            textLabel = textLabel || ccui.Text.create();
            //text.setTextAreaSize(cc.size(width, 0));
            //text.ignoreContentAdaptWithSize(false)
            textLabel.setFontSize(size | 0);
            textLabel.setString(str);
            return textLabel.getVirtualRendererSize();
        }
        function adjustFontSize(text, fontSize, width, height, computedScale) {
            if (computedScale === void 0) { computedScale = 1; }
            var computedSize = measureText(text, computedScale * fontSize);
            var s1 = computedSize.height / height;
            var s2 = computedSize.width / width;
            var cs = height / width;
            //let ss = computedSize.height / computedSize.width;
            var customScale;
            if (s1 > s2) {
                customScale = Math.max(0.1, 1 - s1);
            }
            else {
                customScale = Math.max(0.1, 1 - s2);
            }
            //由于字体一般只有换行，所以只判断高度的比值，如果比值过高就换行试试
            if (s1 >= 1 || s2 >= 1)
                return getFontSize();
            //更宽的，以宽为主 允许超高
            if (cs <= 1 && s2 <= 1)
                return adjustFontSize(text, fontSize, width, height, computedScale + customScale);
            if (cs > 1 && s1 <= 1)
                return adjustFontSize(text, fontSize, width, height, computedScale + customScale);
            return getFontSize();
            function getFontSize() {
                if (cs <= 1 && s2 > 1 || cs > 1 && s1 >= 1)
                    computedScale -= customScale;
                var computedFontSize = computedScale * fontSize;
                if (s1 >= s2) {
                    computedFontSize = computedFontSize / s1;
                }
                else {
                    computedFontSize = computedFontSize / s2;
                }
                return computedFontSize;
            }
        }
    };
    return Patch;
}());
var kaayou;
(function (kaayou) {
    var pop = /** @class */ (function () {
        function pop() {
        }
        //普通弹窗显示动画
        pop.showAni = function (s) {
            if (!s) {
                console.log("showAni return 1");
                return;
            }
            if (!s.cNode) {
                console.log("showAni return 2");
                return;
            }
            //清理动画
            if (s.cNode) {
                s.cNode.stopAllActions();
            }
            if (s.mNode) {
                s.mNode.stopAllActions();
            }
            s.mNode = s.mNode || null;
            s.action = s.action || null;
            s.cNode.setScale(1);
            s.cNode.opacity = 0;
            var nSq = cc.sequence(
            // cc.delayTime(0.08),
            cc.callFunc(function () {
                s.cNode.setScale(0);
                s.cNode.opacity = 255;
            }), cc.scaleTo(0.1, 1.1), cc.scaleTo(0.1, 1), cc.callFunc(function () {
                if (s.action) {
                    s.action();
                }
            }));
            s.cNode.runAction(nSq);
            if (s.mNode) {
                s.mNode.opacity = 0;
                // let maskSq = cc.sequence(
                //     cc.delayTime(0.07),
                //     cc.fadeTo(0.2, 190),
                // )
                s.mNode.runAction(cc.fadeTo(0.2, 190));
            }
        };
        //普通弹窗隐藏动画
        //mNode:通常是遮罩
        pop.hideAni = function (h) {
            if (!h) {
                return;
            }
            if (!h.cNode) {
                return;
            }
            h.mNode = h.mNode || null;
            h.rnode = h.rnode || null;
            h.action = h.action || null;
            //清理动画
            if (h.cNode) {
                h.cNode.stopAllActions();
            }
            if (h.mNode) {
                h.mNode.stopAllActions();
            }
            h.cNode.runAction(cc.sequence(cc.scaleTo(0.2, 0), cc.callFunc(function () {
                if (!h.mNode) {
                    if (h.rnode) {
                        h.rnode.setVisible(false);
                    }
                    if (h.action) {
                        h.action();
                    }
                }
            })));
            if (h.mNode) {
                h.mNode.runAction(cc.sequence(cc.fadeTo(0.3, 0), cc.callFunc(function () {
                    if (h.rnode) {
                        h.rnode.setVisible(false);
                    }
                    if (h.action) {
                        h.action();
                    }
                })));
            }
        };
        //全屏界面（蓝色）显示的动画  t：上  b：下面   
        pop.ShowMainAnim = function (s) {
            if (!s) {
                console.log('s不存在');
                return;
            }
            if (!s.tNode) {
                console.log('st不存在');
                return;
            }
            if (!s.bNode) {
                console.log('sb不存在');
                return;
            }
            s.mNode = s.mNode || null;
            s.action = s.action || null;
            s.tNode.setPositionY(720);
            // s.tNode.opacity = 255;
            s.bNode.setPositionY(0);
            // s.bNode.opacity = 255;
            var winSize = cc.winSize;
            var tSize = s.tNode.getContentSize();
            var bSize = s.bNode.getContentSize();
            //清理动画
            if (s.tNode) {
                s.tNode.stopAllActions();
            }
            if (s.bNode) {
                s.bNode.stopAllActions();
            }
            if (s.mNode) {
                s.mNode.stopAllActions();
            }
            var tnSq = cc.sequence(
            // cc.delayTime(0.08),
            cc.moveTo(0.1, cc.p(0, winSize.height - tSize.height)), 
            // cc.moveTo(0.1, cc.p(0, 657)),
            cc.callFunc(function () {
                s.tNode.setPositionY(winSize.height - tSize.height);
                s.tNode.opacity = 255;
            }));
            var bnSq = cc.sequence(
            // cc.callFunc(function () {
            //     s.bNode.setPositionY(-619);
            //     s.bNode.opacity = 255;
            // }),
            cc.moveTo(0.1, cc.p(winSize.width / 2, (winSize.height - tSize.height) / 2)), cc.callFunc(function () {
                s.bNode.setPositionY((winSize.height - tSize.height) / 2);
                // s.bNode.opacity = 255;
                // if (s.action) {
                //     s.action();
                // }
                if (s.action) {
                    s.action();
                }
            }));
            s.tNode.runAction(tnSq);
            s.bNode.runAction(bnSq);
            // if (s.mNode) {
            //     s.mNode.opacity = 0;
            //     let maskSq = cc.sequence(
            //         cc.delayTime(0.07),
            //         cc.fadeTo(0.1, 255),
            //         // cc.fadeIn(1,255),
            //     )
            //     s.mNode.runAction(maskSq);
            // }
        };
        return pop;
    }());
    kaayou.pop = pop;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var Shader = /** @class */ (function () {
        function Shader() {
        }
        Shader.turnGray = function (node) {
            //  var program = new cc['GLProgram'](common.res.example_ColorBars_vsh    ccbjs + "Shaders/example_ColorBars.vsh", ccbjs + "Shaders/example_ColorBars.fsh");
            // var program = new cc['GLProgram'](common.res.example_ColorBars_vsh, common.res.example_ColorBars_fsh);
            var program = null;
            ;
            if (!Shader._catchs['shader_gray']) {
                program = new cc['GLProgram']();
                program.initWithString(Shader.DEFAULT_VERTEX_SHADER, Shader.GRAY_SCALE_FRAGMENT_SHADER);
                program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
                program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
                program.link();
                program.updateUniforms();
                Shader._catchs['shader_gray'] = program;
            }
            else {
                program = Shader._catchs['shader_gray'];
            }
            node.setShaderProgram(program);
        };
        Shader.turnRestore = function (node) {
            var program = null;
            ;
            if (!Shader._catchs['shader_restore']) {
                program = new cc['GLProgram']();
                program.initWithString(Shader.DEFAULT_VERTEX_SHADER, Shader.RESTORE_SCALE_FRAGMENT_SHADER);
                program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
                program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
                program.link();
                program.updateUniforms();
                Shader._catchs['shader_restore'] = program;
            }
            else {
                program = Shader._catchs['shader_restore'];
            }
            node.setShaderProgram(program);
        };
        Shader.DEFAULT_VERTEX_SHADER = "\n        attribute vec4 a_position;\n        attribute vec2 a_texCoord;\n        attribute vec4 a_color;\n        varying vec2 v_texCoord;\n        varying vec4 v_fragmentColor;\n        void main()\n        {\n            gl_Position = " + (cc.sys.isNative ? 'CC_PMatrix' : 'CC_PMatrix') + " * a_position;\n            v_fragmentColor = a_color;\n            v_texCoord = a_texCoord;\n        }\n        ";
        Shader.GRAY_SCALE_FRAGMENT_SHADER = "\n        #ifdef GL_ES\n        precision mediump float;\n        #endif\n        varying vec4 v_fragmentColor;\n        varying vec2 v_texCoord;\n        void main()\n        {\n            vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n            gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b);\n            gl_FragColor.w = c.w;\n        }\n        ";
        Shader.RESTORE_SCALE_FRAGMENT_SHADER = "\n        #ifdef GL_ES\n        precision mediump float;\n        #endif\n        varying vec4 v_fragmentColor;\n        varying vec2 v_texCoord;\n        void main()\n        {\n            gl_FragColor = texture2D(CC_Texture0, v_texCoord);\n        }\n        ";
        Shader.SEPIA_FRAGMENT_SHADER = "varying vec2 v_texCoord;   \n"
            //+ "uniform sampler2D CC_Texture0; \n"
            + "uniform float u_degree; \n"
            + "void main() \n"
            + "{  \n"
            + "    vec4 texColor = texture2D(CC_Texture0, v_texCoord);  \n"
            + "    float r = texColor.r * 0.393 + texColor.g * 0.769 + texColor.b * 0.189; \n"
            + "    float g = texColor.r * 0.349 + texColor.g * 0.686 + texColor.b * 0.168; \n"
            + "    float b = texColor.r * 0.272 + texColor.g * 0.534 + texColor.b * 0.131; \n"
            + "    gl_FragColor = mix(texColor, vec4(r, g, b, texColor.a), float(u_degree));  \n"
            + "}";
        // static gaussianBlur = `
        // #ifdef GL_ES
        // precision mediump float;
        // #endif
        // #define pi 3.141592653589
        // #define tau 6.283185307179
        // #define e 2.718281828459
        // #define sqr(x) x*x
        // #define sample(c) texture(iChannel0, (c)/iResolution.xy)
        // float G( in vec2 p, in float sigma ) {
        //     return ( 1./(2.*pi*sqr(sigma)) )
        //         *exp( -(sqr(p.x)+sqr(p.y))/(2.*pow(sigma, 2.)) );
        // }
        // vec3 GaussBlur( in vec2 co, in int dim, in float sigma ) {
        //     vec3 c = vec3(0);
        //     float z = 0.;
        //     for (int i=-dim; i <= dim; ++i) {
        //         for (int j=-dim; j <= dim; ++j) {
        //             float g = G(vec2(i,j), sigma);
        //             c += g*sample(co+vec2(i,j)).rgb;
        //             z+=g;
        //         }
        //     }
        //     return c/z;
        // }
        // `
        Shader._catchs = {};
        return Shader;
    }());
    kaayou.Shader = Shader;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var StringHelper = /** @class */ (function () {
        function StringHelper() {
        }
        StringHelper.padLeft = function (word, char, wordLength) {
            return new Array(wordLength - (word + '').length + 1).join(char) + word;
        };
        StringHelper.toStar = function (word) {
            //比如word有6个字，那么就构造一个7个元素的空数组，然后用*隔开
            var wordLength = word.length;
            return new Array(wordLength + 1).join('*');
        };
        return StringHelper;
    }());
    kaayou.StringHelper = StringHelper;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var Template = /** @class */ (function () {
        function Template() {
        }
        Template.tmpl = function (str, data) {
            // Figure out if we're getting a template, or if we need to
            // load the template - and be sure to cache the result.
            var fn = 
            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" +
                // Introduce the data as local variables using with(){}
                "with(obj){p.push('" +
                // Convert the template into pure JavaScript
                str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");
            // Provide some basic currying to the user
            return data ? fn(data) : fn;
        };
        return Template;
    }());
    kaayou.Template = Template;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var TimeHelper = /** @class */ (function () {
        function TimeHelper() {
        }
        TimeHelper.splitTime = function (hour) {
            this.arrTime = [];
            switch (hour) {
                case 0:
                    this.arrTime = [];
                    break;
                default:
                    var a = 0;
                    var b = a + hour;
                    while (b <= 24) {
                        var sHa = kaayou.StringHelper.padLeft(a, '0', 2);
                        var sHb = kaayou.StringHelper.padLeft(b, '0', 2);
                        var sA = sHa + ":00";
                        var sB = sHb + ":00";
                        this.arrTime.push(sA + "-" + sB);
                        a += hour;
                        b += hour;
                    }
                    break;
            }
            this.arrTime.push("全天");
        };
        TimeHelper.getIndexByString = function (s) {
            for (var i = 0; i < this.arrTime.length; ++i) {
                if (s == this.arrTime[i]) {
                    return i;
                }
            }
            return -1;
        };
        TimeHelper.getLastIndex = function () {
            return this.arrTime.length - 1;
        };
        TimeHelper.getNowIndex = function () {
            var now = new Date();
            var h = now.getHours();
            var s = this.getTimesByHour(h);
            return kaayou.TimeHelper.getIndexByString(s);
        };
        TimeHelper.getStringByIndex = function (index) {
            return this.arrTime[index];
        };
        TimeHelper.getTimesByHour = function (hour) {
            for (var i = 0; i < this.arrTime.length; ++i) {
                var a = parseInt(this.arrTime[i].substr(0, 2));
                var b = parseInt(this.arrTime[i].substr(6, 2));
                if (hour >= a && hour < b) {
                    return this.arrTime[i];
                }
            }
            return "00:00-24:00";
        };
        TimeHelper.arrTime = null;
        return TimeHelper;
    }());
    kaayou.TimeHelper = TimeHelper;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var SoundType;
    (function (SoundType) {
        SoundType[SoundType["NONE"] = 0] = "NONE";
        SoundType[SoundType["NORMAL"] = 1] = "NORMAL";
        SoundType[SoundType["BACK"] = 2] = "BACK";
    })(SoundType = kaayou.SoundType || (kaayou.SoundType = {}));
    var TouchMask = /** @class */ (function () {
        function TouchMask() {
        }
        //添加屏蔽点击事件的遮罩层
        TouchMask.addTouchMask = function (data) {
            if (data == undefined)
                data = {};
            if (data.masktime == undefined)
                data.masktime = 0.2;
            if (data.soundtype == undefined)
                data.soundtype = SoundType.NORMAL;
            if (data.masktime && data.masktime > 0) {
                var mainScene = kaayou.UIManager.getInstance().getMainScene();
                if (mainScene) {
                    var mask = ccui.Layout.create();
                    mask.setTouchEnabled(true);
                    mask.setContentSize(cc.winSize);
                    //mask.setBackGroundColorType(1);
                    //mask.setBackGroundColor(cc.color(125, 125, 125));
                    //mask.setBackGroundColorOpacity(100);
                    mask.setAnchorPoint(0.5, 0.5);
                    mask.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
                    mask.runAction(cc.sequence(cc.delayTime(data.masktime), cc.callFunc(function (sender) {
                        sender.removeFromParent();
                    }, mask)));
                    mainScene.addChild(mask);
                }
            }
            if (data.soundtype) {
                var arr = [
                    'ClickBtnDefault',
                    'ClickBtnClose',
                ];
                if (arr[data.soundtype - 1]) {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes[arr[data.soundtype - 1]]);
                }
            }
        };
        TouchMask.clickHandle = function (method, scope, delay) {
            if (delay === void 0) { delay = 300; }
            var timeout;
            var exec = false;
            var returnValue = void 0;
            var _wrap = function () {
                var args = arguments;
                if (exec === true)
                    return returnValue;
                if (timeout)
                    clearTimeout(timeout);
                timeout = setTimeout(function () {
                    exec = false;
                    returnValue = method.apply(scope, args);
                }, delay);
            };
            return _wrap;
        };
        return TouchMask;
    }());
    kaayou.TouchMask = TouchMask;
})(kaayou || (kaayou = {}));
var common;
(function (common) {
    var MaJonCardType;
    (function (MaJonCardType) {
        var CardColor;
        (function (CardColor) {
            CardColor["GREEN"] = "lv";
            CardColor["BLUE"] = "lan";
            CardColor["YELLOW"] = "huang";
        })(CardColor = MaJonCardType.CardColor || (MaJonCardType.CardColor = {}));
        // /directions
        var CardDirection;
        (function (CardDirection) {
            CardDirection["SOUTH"] = "south";
            CardDirection["EAST"] = "east";
            CardDirection["NORTH"] = "north";
            CardDirection["WEST"] = "west";
        })(CardDirection = MaJonCardType.CardDirection || (MaJonCardType.CardDirection = {}));
        var CardType;
        (function (CardType) {
            CardType["HAND"] = "hand";
            CardType["TABLE"] = "table";
            CardType["MELD"] = "meld";
            CardType["DISCARD"] = "discard";
            CardType["PILAI"] = "pilai";
            CardType["HEAP"] = "heap";
        })(CardType = MaJonCardType.CardType || (MaJonCardType.CardType = {}));
        var CardModel;
        (function (CardModel) {
            CardModel[CardModel["model2d"] = 0] = "model2d";
            CardModel[CardModel["model3d"] = 1] = "model3d";
        })(CardModel = MaJonCardType.CardModel || (MaJonCardType.CardModel = {}));
    })(MaJonCardType = common.MaJonCardType || (common.MaJonCardType = {}));
    var MaJonCard = /** @class */ (function (_super) {
        __extends(MaJonCard, _super);
        function MaJonCard() {
            var _this = _super.call(this) || this;
            _this.InnerNum = 0;
            _this.flowerScale = 1;
            _this.flowerRotation = 0;
            _this.cardScale = 1;
            _this.flowerPos = cc.p(0, 0);
            _this.mjPos = cc.p(0, 0);
            _this.tag2Rect = null;
            _this.carddirection = MaJonCardType.CardDirection.SOUTH;
            _this.Cover = false;
            _this.cardtype = MaJonCardType.CardType.HAND;
            _this.isSelect = false;
            _this.flowersp = null;
            _this.arrow = null;
            _this.image_pilai = null;
            _this.tingTag = null;
            _this.leftCard = null;
            _this.mustRes = "";
            _this._cardInfo = null;
            _this.InnerRotations = (function () {
                var rotations = {};
                rotations[MaJonCardType.CardDirection.EAST] = -90;
                rotations[MaJonCardType.CardDirection.WEST] = 90;
                rotations[MaJonCardType.CardDirection.SOUTH] = 0;
                rotations[MaJonCardType.CardDirection.NORTH] = 0;
                return rotations;
            })();
            _this.initUi();
            return _this;
        }
        //=======的地方必须使用2D的info=======
        // setMustMajonRes(value: rowInfo , mustRes: string , ) {
        //     this.mustRes = mustRes;
        //     // this._cardInfo2d = value;
        // }
        MaJonCard.prototype.setMustMajonRes = function (mustRes) {
            this.mustRes = mustRes;
            // this._cardInfo2d = value;
        };
        //===================================
        MaJonCard.getCardColor = function (index) {
            if (index == 0) {
                return MaJonCardType.CardColor.GREEN;
            }
            else if (index == 1) {
                return MaJonCardType.CardColor.BLUE;
            }
            else if (index == 2) {
                return MaJonCardType.CardColor.YELLOW;
            }
        };
        MaJonCard.prototype.getCardDirection = function (direction) {
            return MaJonCardType.CardDirection[direction.toUpperCase()];
        };
        MaJonCard.prototype.getCardType = function (type) {
            if (type == "gang") {
                return MaJonCardType.CardType.MELD;
            }
            else if (type == "heap") {
                return MaJonCardType.CardType.HEAP;
            }
            else {
                return MaJonCardType.CardType[type.toUpperCase()];
            }
        };
        MaJonCard.prototype.initUi = function () {
            this.flowersp = new kaayou.ImageView();
            this.addChild(this.flowersp);
            this.flowersp.setName('flowersp');
            this.flowersp.ignoreContentAdaptWithSize(true);
            this.arrow = new ccui.ImageView(MaJonCard.res_prefix + ".card_provider_0.png", ccui.Widget.PLIST_TEXTURE);
            this.addChild(this.arrow);
            this.arrow.setVisible(false);
            this.image_pilai = new ccui.ImageView(MaJonCard.res_prefix + ".laizi_angle.png", ccui.Widget.PLIST_TEXTURE);
            this.addChild(this.image_pilai);
            this.image_pilai.setVisible(false);
            this.image_pilai.setContentSize(31, 36);
            this.tingTag = new ccui.ImageView(MaJonCard.res_prefix + ".card_ting_angle.png", ccui.Widget.PLIST_TEXTURE);
            this.tingTag.setPosition(18.4, 81.3);
            this.addChild(this.tingTag);
            this.tingTag.setVisible(false);
            this.leftCard = new ccui.Text("", "", 18);
            this.leftCard.setPosition(19, -15.5);
            this.leftCard.setColor(cc.color(71, 220, 255));
            this.addChild(this.leftCard);
            this.leftCard.setVisible(false);
        };
        MaJonCard.prototype.doSetInfo = function (value) {
            this.carddirection = this.getCardDirection(value.direction);
            this.cardtype = this.getCardType(value.type);
            this._cardInfo = value;
            this.setLocalZOrder(value.zOrder);
            this.mjPos = cc.p(value.posx, value.posy);
            this.setPosition(this.mjPos.x, this.mjPos.y);
            this.flowerPos = cc.p(value.flowerPosx, value.flowerPosy);
            this.flowerScale = Number(value.flowerScale);
            this.flowerRotation = Number(value.flowerRotation);
            this.arrow.setPosition(this.arrowPositions[this.carddirection]);
            this.arrow.setScale(this.arrowScale[this.carddirection]);
            if (value.scale == undefined) {
                value.scale = 1;
            }
            this.setScale(value.scale);
            if (this.cardtype == MaJonCardType.CardType.HEAP) {
                if (this.InnerNum > 0) {
                    this.Cover = false;
                }
                else {
                    this.Cover = true;
                }
            }
            this.doChangeCard();
        };
        MaJonCard.prototype.doChangeCard = function () {
            this.setColor(cc.color(255, 255, 255));
            this.changeBg();
            this.changeInner();
            this.changeLaiPi();
        };
        MaJonCard.prototype.changeBg = function () {
            //方向 
            var direction = this.carddirection;
            //颜色
            var ctype = Number(cc.sys.localStorage.getItem("mjBgType"));
            var color = MaJonCard.getCardColor(ctype);
            //是否背牌
            var cover = this.Cover ? 'cover_' : '';
            var cardtype = this.cardtype;
            if (this._cardInfo && cc.sys.localStorage.getItem('majonModel_' + MaJonCard.gameName) == "1" && this.mustRes.length == 0) {
                direction = this._cardInfo.pic.split("_")[0];
                cardtype = this._cardInfo.pic.split("_")[1];
            }
            var bgStr = "";
            if (this.mustRes.length > 0) {
                bgStr = this.mustRes + "." + color + "_" + direction + "_" + cardtype + "_" + cover + "board.png";
            }
            else {
                bgStr = MaJonCard.res_prefix + "." + color + "_" + direction + "_" + cardtype + "_" + cover + "board.png";
            }
            if (cc.spriteFrameCache.getSpriteFrame(bgStr)) {
                this.loadTexture(bgStr, ccui.Widget.PLIST_TEXTURE);
            }
            else {
                console.log("\u627E\u4E0D\u5230\u9EBB\u5C06\u7EB9\u7406:" + bgStr);
            }
        };
        MaJonCard.prototype.changeInner = function () {
            if (this.Cover) {
                this.flowersp.setVisible(false);
                return;
            }
            else {
                if (this.carddirection != MaJonCardType.CardDirection.SOUTH && this.cardtype == MaJonCardType.CardType.HAND) {
                    this.flowersp.setVisible(false);
                    return;
                }
            }
            if (!this.InnerNum)
                return;
            if (this.InnerNum <= 0)
                return;
            this.flowersp.setVisible(true);
            //2D麻将资源牌花是固定的south_table_tile_0_
            var innerstr = "south_table_tile_0_" + this.InnerNum.toString(16) + ".png";
            if (this._cardInfo && cc.sys.localStorage.getItem('majonModel_' + MaJonCard.gameName) == "1" && this.mustRes.length == 0) {
                var tmpstr = this._cardInfo.flowerPic.split("_");
                //"west_discard_tile_0_29.png"
                innerstr = tmpstr[0] + "_" + tmpstr[1] + "_tile_0_" + this.InnerNum.toString(16) + ".png";
            }
            var prestr = this.mustRes.length > 0 ? this.mustRes : common.MaJonCard.res_prefix;
            var flowerstr = prestr + "." + innerstr;
            if (!cc.spriteFrameCache.getSpriteFrame(flowerstr)) {
                console.log("\u627E\u4E0D\u5230\u724C\u82B1\u7EB9\u7406:" + flowerstr);
                this.setVisible(false);
                return;
            }
            this.flowersp.loadTexture(flowerstr, ccui.Widget.PLIST_TEXTURE);
            this.flowersp.setScale(this.flowerScale);
            this.flowersp.setRotation(this.flowerRotation);
            this.flowersp.setPosition(this.flowerPos);
        };
        MaJonCard.prototype.changeArrow = function (index, outIndex, show, type) {
            if (show === void 0) { show = true; }
            if (type === void 0) { type = 0; }
            if (!show) {
                this.arrow.visible = false;
                return;
            }
            if (this.cardtype !== MaJonCardType.CardType.MELD) {
                return;
            }
            if (index == outIndex) {
                if (type != common.MeldType.BUGANG && type != common.MeldType.ANGANG && type != common.MeldType.CHAOGANG) {
                    return;
                }
            }
            this.arrow.visible = true;
            var orginalRotation = 0;
            if (this.carddirection == MaJonCardType.CardDirection.SOUTH) {
                this.arrow.rotation = 0;
            }
            else if (this.carddirection == MaJonCardType.CardDirection.EAST) {
                this.arrow.rotation = -90;
            }
            else if (this.carddirection == MaJonCardType.CardDirection.NORTH) {
                this.arrow.rotation = -180;
            }
            else {
                this.arrow.rotation = -270;
            }
            orginalRotation = this.arrow.rotation;
            var difRotation = (index - outIndex) * 90;
            this.arrow.rotation += difRotation;
            if (type == common.MeldType.ANGANG || type == common.MeldType.BUGANG || type == common.MeldType.CHAOGANG) {
                this.arrow.loadTexture(MaJonCard.res_prefix + ".card_provider_zimo.png", ccui.Widget.PLIST_TEXTURE);
                this.arrow.rotation = orginalRotation;
            }
            else {
                this.arrow.loadTexture(MaJonCard.res_prefix + ".card_provider_0.png", ccui.Widget.PLIST_TEXTURE);
            }
        };
        MaJonCard.prototype.setSelecte = function (v) {
            this.isSelect = v;
            if (this.isSelect) {
                if (this.carddirection == MaJonCardType.CardDirection.SOUTH) {
                    this.setPosition(this.mjPos.x, this.mjPos.y + 20);
                }
            }
            else {
                this.setPosition(this.mjPos);
            }
        };
        MaJonCard.prototype.getSelect = function () {
            return this.isSelect;
        };
        MaJonCard.prototype.getCardInfo = function () {
            return this._cardInfo;
        };
        MaJonCard.prototype.reset = function () {
        };
        MaJonCard.prototype.setColor = function (c) {
            // super.setColor(c);
            // this.setCascadeColorEnabled(true);
            // this.leftCard.setColor(cc.color(71, 220, 255));
            _super.prototype.setColor.call(this, c);
            this.flowersp.setColor(c);
            this.arrow.setColor(c);
            this.image_pilai.setColor(c);
            this.tingTag.setColor(c);
        };
        MaJonCard.prototype.setGaryMask = function (b) {
            if (b) {
                this.setColor(cc.color(128, 128, 128));
            }
            else {
                this.setColor(cc.color(255, 255, 255));
            }
        };
        MaJonCard.prototype.setTing = function (b) {
            if (this.cardtype !== MaJonCardType.CardType.HAND || this.carddirection != MaJonCardType.CardDirection.SOUTH) {
                this.tingTag.setVisible(false);
            }
            this.tingTag.setVisible(b);
        };
        MaJonCard.prototype.setNum = function (num) {
            this.leftCard.setVisible(true);
            this.leftCard.setString(num.toString() + "张");
        };
        MaJonCard.prototype.setCover = function (cover) {
            if (this.Cover != cover) {
                this.Cover = cover;
                this.doChangeCard();
            }
        };
        MaJonCard.prototype.setMaskColor = function (c) {
            this.setColor(c);
        };
        MaJonCard.res_prefix = "";
        MaJonCard.cardColor = MaJonCardType.CardColor.BLUE;
        MaJonCard.gameName = "";
        MaJonCard.cardModel = MaJonCardType.CardModel.model2d;
        return MaJonCard;
    }(kaayou.ImageView));
    common.MaJonCard = MaJonCard;
})(common || (common = {}));
var common;
(function (common) {
    var MeldType;
    (function (MeldType) {
        MeldType[MeldType["NULL"] = 0] = "NULL";
        MeldType[MeldType["LEFTCHI"] = 1] = "LEFTCHI";
        MeldType[MeldType["CENTERCHI"] = 2] = "CENTERCHI";
        MeldType[MeldType["RIGHTCHI"] = 3] = "RIGHTCHI";
        MeldType[MeldType["PENG"] = 4] = "PENG";
        MeldType[MeldType["GANG"] = 5] = "GANG";
        MeldType[MeldType["ANGANG"] = 6] = "ANGANG";
        MeldType[MeldType["PILAIGANG"] = 7] = "PILAIGANG";
        MeldType[MeldType["BUGANG"] = 8] = "BUGANG";
        MeldType[MeldType["CHAOGANG"] = 9] = "CHAOGANG";
        MeldType[MeldType["LIANGDAO"] = 10] = "LIANGDAO";
    })(MeldType = common.MeldType || (common.MeldType = {}));
    //动作掩码
    var OperateMask;
    (function (OperateMask) {
        OperateMask[OperateMask["WIK_NULL"] = 0] = "WIK_NULL";
        OperateMask[OperateMask["WIK_LEFT"] = 1] = "WIK_LEFT";
        OperateMask[OperateMask["WIK_CENTER"] = 2] = "WIK_CENTER";
        OperateMask[OperateMask["WIK_RIGHT"] = 4] = "WIK_RIGHT";
        OperateMask[OperateMask["WIK_PENG"] = 8] = "WIK_PENG";
        OperateMask[OperateMask["WIK_FILL"] = 16] = "WIK_FILL";
        OperateMask[OperateMask["WIK_GANG"] = 32] = "WIK_GANG";
        OperateMask[OperateMask["WIK_CHI_HU"] = 64] = "WIK_CHI_HU";
        OperateMask[OperateMask["WIK_QIANG"] = 128] = "WIK_QIANG";
        OperateMask[OperateMask["WIK_BAO_QING"] = 256] = "WIK_BAO_QING";
        OperateMask[OperateMask["WIK_TING"] = 512] = "WIK_TING";
        OperateMask[OperateMask["WIK_HUA"] = 1024] = "WIK_HUA";
        OperateMask[OperateMask["WIK_FENG"] = 2048] = "WIK_FENG";
        OperateMask[OperateMask["WIK_JIANG"] = 4096] = "WIK_JIANG";
        OperateMask[OperateMask["WIK_LIANG"] = 16384] = "WIK_LIANG";
    })(OperateMask = common.OperateMask || (common.OperateMask = {}));
    var MajionMeld = /** @class */ (function (_super) {
        __extends(MajionMeld, _super);
        function MajionMeld(isangangback) {
            if (isangangback === void 0) { isangangback = false; }
            var _this = _super.call(this) || this;
            _this._cards = null;
            _this._meldType = MeldType.NULL;
            _this._cardNums = null;
            _this._meldInfo = null;
            _this._isangangback = false;
            _this._isangangback = isangangback;
            _this._cards = [];
            _this._cardNums = [];
            return _this;
        }
        MajionMeld.prototype.initWithInfo = function (d) {
            if (!d)
                return;
            this._meldInfo = d;
            for (var i = 0; i < d.length; i++) {
                var card = eval("new " + common.MaJonCard.gameName + ".MaJonCard()");
                card.doSetInfo(d[i]);
                this._cards.push(card);
                this.addChild(card);
            }
        };
        MajionMeld.prototype.cleanUp = function () {
            this._cardNums = [];
            for (var i = 0; i < this._cards.length; i++) {
                this._cards[i].arrow.setVisible(false);
            }
        };
        MajionMeld.prototype.setMeld = function (type, nums) {
            this._cardNums = nums;
            this._meldType = type;
            if (this._meldType == MeldType.NULL) {
                this.visible = false;
                return;
            }
            this.visible = true;
            for (var x in this._cards) {
                var card = this._cards[x];
                if (Number(x) > this._cardNums.length) {
                    card.visible = false;
                }
                else {
                    card.visible = true;
                }
                if (!this._cards[x].visible) {
                    continue;
                }
                if (this._cardNums[x] > 0) {
                    card.InnerNum = this._cardNums[x];
                    card.Cover = false;
                    card.doChangeCard();
                }
                else {
                    card.visible = false;
                }
                //为朝天杠的时候，显示第一张和第三张背牌
                if (this._meldType == MeldType.CHAOGANG) {
                    if (Number(x) == 0 || Number(x) == 2) {
                        card.Cover = true;
                    }
                    else {
                        card.Cover = false;
                    }
                    //背牌不显示朝
                    // card.changeLaiPi();
                    card.doChangeCard();
                    //正面也不显示朝
                    card.image_pilai.visible = false;
                }
                //如果为朝天杠则不return
                if (this._cardNums.length < 4 && (this._meldType == MeldType.GANG || this._meldType == MeldType.ANGANG)) {
                    return;
                }
                if (this._meldType == MeldType.ANGANG) {
                    if (Number(x) < 3) {
                        card.Cover = true;
                    }
                    else {
                        card.Cover = false;
                        if (this._isangangback) {
                            if (card.carddirection == common.MaJonCardType.CardDirection.SOUTH) {
                                card.Cover = false;
                            }
                            else {
                                card.Cover = true;
                            }
                        }
                    }
                    // card.changeLaiPi();
                    card.doChangeCard();
                }
                //最后一张牌的显示问题
                var lastCard = this._cards[3];
                if (this._meldType == MeldType.LEFTCHI || this._meldType == MeldType.PENG ||
                    this._meldType == MeldType.RIGHTCHI || this._meldType == MeldType.CENTERCHI || this._meldType == MeldType.CHAOGANG) {
                    lastCard.visible = false;
                }
                else {
                    lastCard.visible = true;
                }
            }
        };
        MajionMeld.prototype.showArrow = function (index, outIndex) {
            var card = null;
            if (this._meldType == MeldType.PENG || this._meldType == MeldType.CENTERCHI || this._meldType == MeldType.CHAOGANG) {
                card = this._cards[1];
            }
            else if (this._meldType == MeldType.RIGHTCHI) {
                card = this._cards[2];
            }
            else if (this._meldType == MeldType.LEFTCHI) {
                card = this._cards[0];
            }
            else if (this._meldType == MeldType.BUGANG || this._meldType == MeldType.ANGANG || this._meldType == MeldType.GANG) {
                card = this._cards[3];
            }
            //如果是补杠(续杠)，隐藏之前的箭头
            if (this._meldType == MeldType.BUGANG) {
                for (var i = 0; i < this.getChildrenCount(); i++) {
                    var c = this.getChildren()[i];
                    c.changeArrow(index, outIndex, false);
                }
            }
            if (card) {
                card.changeArrow(index, outIndex, true, this._meldType);
            }
        };
        MajionMeld.prototype.getMeld = function () {
            return this._cardNums;
        };
        MajionMeld.prototype.getMeldType = function () {
            return this._meldType;
        };
        MajionMeld.prototype.getMeldNode = function () {
            return this._cards;
        };
        MajionMeld.prototype.getMeldInfo = function () {
            return this._meldInfo;
        };
        return MajionMeld;
    }(kaayou.Block));
    common.MajionMeld = MajionMeld;
})(common || (common = {}));
/// <reference path="common.MaJonCard.ts" />
var common;
(function (common) {
    var MajionMeldRow = /** @class */ (function (_super) {
        __extends(MajionMeldRow, _super);
        function MajionMeldRow(isangangback) {
            if (isangangback === void 0) { isangangback = false; }
            var _this = _super.call(this) || this;
            _this._isangangback = false;
            _this._melds = null;
            _this._isangangback = isangangback;
            return _this;
        }
        MajionMeldRow.prototype.initWithInfo = function (d) {
            if (!d) {
                return;
            }
            this._melds = [];
            var zoder = 100;
            var direction = d[0][0].direction;
            for (var i = 0; i < d.length; i++) {
                if (direction == "east") {
                    zoder--;
                }
                var meld = new common.MajionMeld(this._isangangback);
                meld.initWithInfo(d[i]);
                this.addChild(meld, zoder);
                this._melds.push(meld);
            }
        };
        MajionMeldRow.prototype.setMeldNums = function (data) {
            for (var x in this._melds) {
                if (data[x]) {
                    this._melds[x].setMeld(data[x].type, data[x].nums);
                    this._melds[x].visible = true;
                    this._melds[x].showArrow(data[x].wOperateUser, data[x].wProvideUser);
                }
                else {
                    this._melds[x].cleanUp();
                    this._melds[x].visible = false;
                }
            }
        };
        MajionMeldRow.prototype.getMeldNums = function () {
            return this._melds;
        };
        return MajionMeldRow;
    }(kaayou.Layer));
    common.MajionMeldRow = MajionMeldRow;
})(common || (common = {}));
var common;
(function (common) {
    var MajonMenuPanel = /** @class */ (function (_super) {
        __extends(MajonMenuPanel, _super);
        function MajonMenuPanel(ccsName, mod) {
            var _this = _super.call(this) || this;
            _this.btn_setting = null;
            _this.btn_skin = null;
            _this.btn_exit = null;
            _this.curMod = null;
            _this.initWithccs(ccsName, false);
            _this.curMod = mod;
            _this.Hide();
            return _this;
        }
        MajonMenuPanel.prototype.initUI = function () {
            this.btn_setting = ccui.helper.seekWidgetByName(this.node, "btn_setting");
            this.btn_skin = ccui.helper.seekWidgetByName(this.node, "btn_skin");
            this.btn_exit = ccui.helper.seekWidgetByName(this.node, "btn_exit");
            this.bindUiEvent();
        };
        MajonMenuPanel.prototype.bindUiEvent = function () {
            var self = this;
            this.btn_exit.on(kaayou.TouchEvent.TouchEnd, function () {
                self.setVisible(false);
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Click_btn_switch);
                //游戏结束后点退出
                if (self.curMod.gameState == common.mod.GAME_STATE.GAME_OVER && self.curMod["sendNext"]) {
                    self.curMod["sendNext"]();
                }
                else {
                    self.curMod.gameOutConfirm();
                }
            }, this);
            if (this.btn_skin) {
                this.btn_skin.on(kaayou.TouchEvent.TouchEnd, function () {
                    self.setVisible(false);
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.Click_btn_switch);
                    kaayou.emit(self.curMod.getModuleName(), "ui::MajonSkinPanel::Show");
                }, this);
            }
            this.btn_setting.on(kaayou.TouchEvent.TouchEnd, function () {
                self.setVisible(false);
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Click_btn_switch);
                kaayou.emit(self.curMod.getModuleName(), "ui::MajonSettingPanel::Show");
            }, this);
        };
        MajonMenuPanel.prototype.Show = function () {
            this.setVisible(true);
        };
        return MajonMenuPanel;
    }(kaayou.ModelLayer));
    common.MajonMenuPanel = MajonMenuPanel;
})(common || (common = {}));
var common;
(function (common) {
    var MajonNewSettingPanel = /** @class */ (function (_super) {
        __extends(MajonNewSettingPanel, _super);
        function MajonNewSettingPanel(ccs, moduleName) {
            var _this = _super.call(this) || this;
            _this.bgm_CheckBox = null;
            _this.effect_CheckBox = null;
            _this.closeBtn = null;
            _this.yuyan = null;
            _this.paibei = null;
            _this.zhuobu = null;
            _this.majonModel = null;
            _this.setModuleName(moduleName);
            _this.initWithccs(ccs);
            _this.setVisible(false);
            return _this;
        }
        MajonNewSettingPanel.prototype.initUI = function () {
            var self = this;
            this.bgm_CheckBox = ccui.helper.seekWidgetByName(this.node, "bg_CheckBox");
            this.effect_CheckBox = ccui.helper.seekWidgetByName(this.node, "xx_CheckBox");
            this.closeBtn = ccui.helper.seekWidgetByName(this.node, "closeBtn");
            this.yuyan = ccui.helper.seekWidgetByName(this.node, "yuyan");
            this.paibei = ccui.helper.seekWidgetByName(this.node, "paibei"); //
            this.zhuobu = ccui.helper.seekWidgetByName(this.node, "zhuobu");
            this.yuyan = ccui.helper.seekWidgetByName(this.node, "yuyan");
            this.majonModel = ccui.helper.seekWidgetByName(this.node, "majonModel");
            this.closeBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Click_btn_close);
                self.setVisible(false);
            }, this);
            this.bgm_CheckBox.on(kaayou.CheckEvent.SELECTED, self.onToggleClick, this);
            this.bgm_CheckBox.on(kaayou.CheckEvent.UNSELECTED, self.onToggleClick, this);
            this.effect_CheckBox.on(kaayou.CheckEvent.SELECTED, self.onToggleClick, this);
            this.effect_CheckBox.on(kaayou.CheckEvent.UNSELECTED, self.onToggleClick, this);
            for (var i = 0; i < this.yuyan.childrenCount; i++) {
                var c = this.yuyan.children[i];
                c.setTag(i);
                c.on(kaayou.CheckEvent.SELECTED, self.onLanagueClick, self);
                c.on(kaayou.CheckEvent.UNSELECTED, self.onLanagueClick, self);
            }
            for (var i = 0; i < this.paibei.childrenCount; i++) {
                var c = this.paibei.children[i];
                c.setTag(i);
                c.on(kaayou.CheckEvent.SELECTED, self.onPaiBeiClick, self);
                c.on(kaayou.CheckEvent.UNSELECTED, self.onPaiBeiClick, self);
            }
            for (var i = 0; i < this.zhuobu.childrenCount; i++) {
                var c = this.zhuobu.children[i];
                c.setTag(i);
                c.on(kaayou.CheckEvent.SELECTED, self.onZhuoBuClick, self);
                c.on(kaayou.CheckEvent.UNSELECTED, self.onZhuoBuClick, self);
            }
            for (var i = 0; i < this.majonModel.childrenCount; i++) {
                var c = this.majonModel.children[i];
                c.setTag(i);
                c.on(kaayou.CheckEvent.SELECTED, self.onMajonModelClick, self);
                c.on(kaayou.CheckEvent.UNSELECTED, self.onMajonModelClick, self);
            }
            this.resetFangYanStatue();
            this.resetMajonModel();
            this.resetPaiBeiModel();
            this.resetZhuoBuModel();
        };
        MajonNewSettingPanel.prototype.onToggleClick = function (event) {
            console.log('onToggleClick name=' + event.target.name + ', isSelected=' + event.target.isSelected());
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.Click_btn_switch);
            if (event.target.name == "bg_CheckBox") { //bgm
                cc.sys.localStorage.setItem('tog_music', event.target.isSelected() ? 'true' : 'false');
                if (event.target.isSelected()) {
                    kaayou.emit(this._moduleName, "playBGM");
                }
                else {
                    kaayou.SoundManager.getInstance().stopMusic();
                }
            }
            else { //xx
                cc.sys.localStorage.setItem('tog_effect', event.target.isSelected() ? 'true' : 'false');
            }
        };
        MajonNewSettingPanel.prototype.onLanagueClick = function (event) {
            cc.sys.localStorage.setItem("lanagueType_" + this._moduleName, event.target.tag);
            this.resetFangYanStatue();
        };
        MajonNewSettingPanel.prototype.onPaiBeiClick = function (event) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.Click_btn_switch);
            cc.sys.localStorage.setItem("mjBgType", event.target.tag);
            kaayou.emit(this.getModuleName(), 'ui::MjTable::changeMjType');
            this.resetPaiBeiModel();
        };
        MajonNewSettingPanel.prototype.onZhuoBuClick = function (event) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.Click_btn_switch);
            cc.sys.localStorage.setItem("bgType", event.target.tag);
            kaayou.emit(this.getModuleName(), 'ui::MjTable::changeBgType');
            this.resetZhuoBuModel();
        };
        MajonNewSettingPanel.prototype.onMajonModelClick = function (event) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.Click_btn_switch);
            cc.sys.localStorage.setItem("majonModel_" + this._moduleName, event.target.tag);
            kaayou.emit(this.getModuleName(), 'ui::MjTable::changeMajonModel', { model: event.target.tag });
            this.resetMajonModel();
        };
        MajonNewSettingPanel.prototype.resetFangYanStatue = function () {
            // kaayou.SoundManager.getInstance().playSound(SoundRes.Click_btn_switch);
            var index = cc.sys.localStorage.getItem("lanagueType_" + this._moduleName);
            for (var i = 0; i < this.yuyan.childrenCount; i++) {
                var cell = this.yuyan.children[i];
                if (i == Number(index)) {
                    cell.setSelected(true);
                    cell.setTouchEnabled(false);
                }
                else {
                    cell.setSelected(false);
                    cell.setTouchEnabled(true);
                }
            }
        };
        MajonNewSettingPanel.prototype.resetMajonModel = function () {
            var index = cc.sys.localStorage.getItem("majonModel_" + this._moduleName);
            for (var i = 0; i < this.majonModel.childrenCount; i++) {
                var cell = this.majonModel.children[i];
                if (i == Number(index)) {
                    cell.setSelected(true);
                    cell.setTouchEnabled(false);
                }
                else {
                    cell.setSelected(false);
                    cell.setTouchEnabled(true);
                }
            }
        };
        MajonNewSettingPanel.prototype.resetPaiBeiModel = function () {
            var index = cc.sys.localStorage.getItem("mjBgType");
            for (var i = 0; i < this.paibei.childrenCount; i++) {
                var cell = this.paibei.children[i];
                if (i == Number(index)) {
                    cell.setSelected(true);
                    cell.setTouchEnabled(false);
                }
                else {
                    cell.setSelected(false);
                    cell.setTouchEnabled(true);
                }
            }
        };
        MajonNewSettingPanel.prototype.resetZhuoBuModel = function () {
            var index = cc.sys.localStorage.getItem("bgType");
            for (var i = 0; i < this.zhuobu.childrenCount; i++) {
                var cell = this.zhuobu.children[i];
                if (i == Number(index)) {
                    cell.setSelected(true);
                    cell.setTouchEnabled(false);
                }
                else {
                    cell.setSelected(false);
                    cell.setTouchEnabled(true);
                }
            }
        };
        MajonNewSettingPanel.prototype.onMenuSelected = function (e) {
            var index = e.target['index'];
            cc.sys.localStorage.setItem("lanagueType_" + this._moduleName, index);
        };
        MajonNewSettingPanel.prototype.Show = function () {
            this.setVisible(true);
            var bgcheck = cc.sys.localStorage.getItem("tog_music");
            if (bgcheck == "true") {
                this.bgm_CheckBox.setSelected(true);
            }
            else {
                this.bgm_CheckBox.setSelected(false);
            }
            var xxcheck = cc.sys.localStorage.getItem("tog_effect");
            if (xxcheck == "true") {
                this.effect_CheckBox.setSelected(true);
            }
            else {
                this.effect_CheckBox.setSelected(false);
            }
            this.resetFangYanStatue();
            this.resetMajonModel();
            this.resetPaiBeiModel();
            this.resetZhuoBuModel();
        };
        return MajonNewSettingPanel;
    }(kaayou.ModelLayer));
    common.MajonNewSettingPanel = MajonNewSettingPanel;
})(common || (common = {}));
var common;
(function (common) {
    var MaJonRow = /** @class */ (function (_super) {
        __extends(MaJonRow, _super);
        function MaJonRow() {
            var _this = _super.call(this) || this;
            _this._info = null;
            _this._MjCardSps = null;
            _this._cardNums = [];
            return _this;
        }
        MaJonRow.prototype.initWithInfo = function (d) {
            if (!d) {
                return;
            }
            this._MjCardSps = [];
            this.setContentSize(cc.view.getDesignResolutionSize());
            for (var i = 0; i < d.length; i++) {
                // var sp = new common.MaJonCard();
                var sp = eval("new " + common.MaJonCard.gameName + ".MaJonCard()");
                this.addChild(sp);
                this._MjCardSps.push(sp);
            }
            this._info = d;
            this.initRowInfo();
        };
        MaJonRow.prototype.initRowInfo = function () {
            var children = this._MjCardSps;
            for (var x = 0; x < children.length; x++) {
                var _mjCard = children[x];
                _mjCard.doSetInfo(this._info[x]);
                _mjCard.setVisible(false);
            }
        };
        MaJonRow.prototype.changeAllCard = function () {
            if (this._cardNums.length == 0) {
                this.setVisible(false);
                return;
            }
            this.setVisible(true);
            var children = this._MjCardSps;
            for (var x = 0; x < children.length; x++) {
                var _mjCard = children[x];
                if (x >= this._cardNums.length || this._cardNums[x] < 0) {
                    _mjCard.setVisible(false);
                }
                else {
                    _mjCard.setVisible(true);
                }
                _mjCard.InnerNum = this._cardNums[x];
                _mjCard.doChangeCard();
            }
        };
        MaJonRow.prototype.setCardSelect = function (index, v) {
            if (v === void 0) { v = false; }
            if (this._MjCardSps == null) {
                return;
            }
            if (this._MjCardSps.length < 1) {
                return;
            }
            for (var x in this._MjCardSps) {
                this._MjCardSps[x].setSelecte(false);
            }
            if (index > -1 && index < this._MjCardSps.length) {
                this._MjCardSps[index].setSelecte(true);
            }
            this.changeAllCard();
        };
        // 0代表别人的牌，看不见，要创建  -1代表已经操作过的牌
        MaJonRow.prototype.setCardNums = function (nums) {
            this._cardNums = nums;
            if (nums.length == 0) {
                this.setVisible(false);
                return;
            }
            this.setVisible(true);
            this.setCardSelect(-1, false); //出完牌的时候重置状态
        };
        MaJonRow.prototype.hitCards = function (pos) {
            if (!cc.rectContainsPoint(this.getBoundingBox(), pos)) {
                return -1;
            }
            for (var x in this.children) {
                var rect = this.children[x].getBoundingBox();
                if (true == this.children[x].visible && cc.rectContainsPoint(rect, pos)) {
                    return Number(x);
                }
            }
            return -1;
        };
        MaJonRow.prototype.getCardByIndex = function (index) {
            return this._MjCardSps[index];
        };
        MaJonRow.prototype.getLastIndex = function () {
            return this._cardNums.length - 1;
        };
        MaJonRow.prototype.getCardNums = function () {
            return this._cardNums;
        };
        MaJonRow.prototype.getRowinfo = function () {
            return this._info;
        };
        MaJonRow.prototype.setCover = function (v, len) {
            var rowLen = this._MjCardSps.length;
            if (len != null) {
                rowLen = len;
            }
            this.setVisible(true);
            for (var i = 0; i < this._MjCardSps.length; i++) {
                if (i > rowLen - 1) {
                    this._MjCardSps[i].setVisible(false);
                    continue;
                }
                this._MjCardSps[i].setVisible(true);
                this._MjCardSps[i].setCover(v);
            }
        };
        MaJonRow.prototype.setRowCover = function (nums) {
            var len = nums.length;
            if (len < 0)
                return;
            for (var i = 0; i < this._MjCardSps.length; i++) {
                this._MjCardSps[i].setVisible(i <= len - 1);
                if (i <= len - 1) {
                    this._MjCardSps[i].setCover(true);
                }
            }
        };
        return MaJonRow;
    }(kaayou.Layer));
    common.MaJonRow = MaJonRow;
})(common || (common = {}));
var common;
(function (common) {
    var MajonSettingPanel = /** @class */ (function (_super) {
        __extends(MajonSettingPanel, _super);
        function MajonSettingPanel(ccs, moduleName) {
            var _this = _super.call(this) || this;
            _this.bgm_CheckBox = null;
            _this.effect_CheckBox = null;
            _this.yuyan = null;
            _this.closeBtn = null;
            _this.majonModel = null;
            _this.setModuleName(moduleName);
            _this.initWithccs(ccs);
            _this.setVisible(false);
            return _this;
        }
        MajonSettingPanel.prototype.initUI = function () {
            var self = this;
            this.bgm_CheckBox = ccui.helper.seekWidgetByName(this.node, "bg_CheckBox");
            this.effect_CheckBox = ccui.helper.seekWidgetByName(this.node, "xx_CheckBox");
            this.closeBtn = ccui.helper.seekWidgetByName(this.node, "closeBtn");
            this.yuyan = ccui.helper.seekWidgetByName(this.node, "yuyan");
            this.majonModel = ccui.helper.seekWidgetByName(this.node, "majonModel");
            this.closeBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Click_btn_close);
                self.setVisible(false);
            }, this);
            this.bgm_CheckBox.on(kaayou.CheckEvent.SELECTED, self.onToggleClick, this);
            this.bgm_CheckBox.on(kaayou.CheckEvent.UNSELECTED, self.onToggleClick, this);
            this.effect_CheckBox.on(kaayou.CheckEvent.SELECTED, self.onToggleClick, this);
            this.effect_CheckBox.on(kaayou.CheckEvent.UNSELECTED, self.onToggleClick, this);
            for (var i = 0; i < this.yuyan.childrenCount; i++) {
                var c = this.yuyan.children[i];
                c.setTag(i);
                c.on(kaayou.CheckEvent.SELECTED, self.onLanagueClick, self);
                c.on(kaayou.CheckEvent.UNSELECTED, self.onLanagueClick, self);
            }
            if (this.majonModel) {
                for (var i = 0; i < this.majonModel.childrenCount; i++) {
                    var c = this.majonModel.children[i];
                    c.setTag(i);
                    c.on(kaayou.CheckEvent.SELECTED, self.onMajonModelClick, self);
                    c.on(kaayou.CheckEvent.UNSELECTED, self.onMajonModelClick, self);
                }
            }
            this.resetFangYanStatue();
            this.resetMajonModel();
        };
        MajonSettingPanel.prototype.onToggleClick = function (event) {
            console.log('onToggleClick name=' + event.target.name + ', isSelected=' + event.target.isSelected());
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.Click_btn_switch);
            if (event.target.name == "bg_CheckBox") { //bgm
                cc.sys.localStorage.setItem('tog_music', event.target.isSelected() ? 'true' : 'false');
                if (event.target.isSelected()) {
                    kaayou.emit(this._moduleName, "playBGM");
                }
                else {
                    kaayou.SoundManager.getInstance().stopMusic();
                }
            }
            else { //xx
                cc.sys.localStorage.setItem('tog_effect', event.target.isSelected() ? 'true' : 'false');
            }
        };
        MajonSettingPanel.prototype.onLanagueClick = function (event) {
            cc.sys.localStorage.setItem("lanagueType_" + this._moduleName, event.target.tag);
            this.resetFangYanStatue();
        };
        MajonSettingPanel.prototype.onMajonModelClick = function (event) {
            cc.sys.localStorage.setItem("majonModel_" + this._moduleName, event.target.tag);
            kaayou.emit(this.getModuleName(), 'ui::MjTable::changeMajonModel', { model: event.target.tag });
            this.resetMajonModel();
        };
        MajonSettingPanel.prototype.resetFangYanStatue = function () {
            // kaayou.SoundManager.getInstance().playSound(SoundRes.Click_btn_switch);
            var index = cc.sys.localStorage.getItem("lanagueType_" + this._moduleName);
            for (var i = 0; i < this.yuyan.childrenCount; i++) {
                var cell = this.yuyan.children[i];
                if (i == Number(index)) {
                    cell.setSelected(true);
                    cell.setTouchEnabled(false);
                }
                else {
                    cell.setSelected(false);
                    cell.setTouchEnabled(true);
                }
            }
        };
        MajonSettingPanel.prototype.resetMajonModel = function () {
            if (!this.majonModel) {
                return;
            }
            var index = cc.sys.localStorage.getItem("majonModel_" + this._moduleName);
            for (var i = 0; i < this.majonModel.childrenCount; i++) {
                var cell = this.majonModel.children[i];
                if (i == Number(index)) {
                    cell.setSelected(true);
                    cell.setTouchEnabled(false);
                }
                else {
                    cell.setSelected(false);
                    cell.setTouchEnabled(true);
                }
            }
        };
        MajonSettingPanel.prototype.onMenuSelected = function (e) {
            var index = e.target['index'];
            cc.sys.localStorage.setItem("lanagueType_" + this._moduleName, index);
        };
        MajonSettingPanel.prototype.Show = function () {
            this.setVisible(true);
            var bgcheck = cc.sys.localStorage.getItem("tog_music");
            if (bgcheck == "true") {
                this.bgm_CheckBox.setSelected(true);
            }
            else {
                this.bgm_CheckBox.setSelected(false);
            }
            var xxcheck = cc.sys.localStorage.getItem("tog_effect");
            if (xxcheck == "true") {
                this.effect_CheckBox.setSelected(true);
            }
            else {
                this.effect_CheckBox.setSelected(false);
            }
            this.resetFangYanStatue();
            this.resetMajonModel();
        };
        return MajonSettingPanel;
    }(kaayou.ModelLayer));
    common.MajonSettingPanel = MajonSettingPanel;
})(common || (common = {}));
var common;
(function (common) {
    var MajonSkinPanel = /** @class */ (function (_super) {
        __extends(MajonSkinPanel, _super);
        function MajonSkinPanel(ccs, mod) {
            var _this = _super.call(this) || this;
            _this.maskBg = null;
            _this.bgScrollView = null;
            _this.mjScrollView = null;
            _this.curMod = null;
            _this.bgGroup = null;
            _this.mjGroup = null;
            _this.initWithccs(ccs);
            _this.curMod = mod;
            return _this;
        }
        MajonSkinPanel.prototype.initUI = function () {
            this.initLeftMenu();
            this.setVisible(false);
        };
        MajonSkinPanel.prototype.initLeftMenu = function () {
            var self = this;
            //初始化左侧菜单
            this.bgScrollView = ccui.helper.seekWidgetByName(this.node, "bgScrollView");
            this.bgScrollView.setPadding({ spacingY: 10 });
            this.bgScrollView.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.bgScrollView.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.bgScrollView.setScrollBarEnabled(false);
            this.mjScrollView = ccui.helper.seekWidgetByName(this.node, "mjScrollView");
            this.mjScrollView.setPadding({ spacingY: 10 });
            this.mjScrollView.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.mjScrollView.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.mjScrollView.setScrollBarEnabled(false);
            this.bgGroup = new common.RadioGroup();
            var skinIndex = cc.sys.localStorage.getItem("bgType");
            lodash.forEach(this.bgScrollView.getChildren(), function (v, i) {
                v['index'] = i;
                v.setTag(11);
                v.on(kaayou.RadioEvent.SELECTED, self.onMenuSelected, self);
                self.bgGroup.add(v);
                v.setSelected(skinIndex == i);
            });
            this.mjGroup = new common.RadioGroup();
            var mjskinIndex = cc.sys.localStorage.getItem("mjBgType");
            lodash.forEach(this.mjScrollView.getChildren(), function (v, i) {
                v['index'] = i;
                v.setTag(12);
                v.on(kaayou.RadioEvent.SELECTED, self.onMenuSelected, self);
                self.mjGroup.add(v);
                v.setSelected(mjskinIndex == i);
            });
        };
        MajonSkinPanel.prototype.onMenuSelected = function (e) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.Click_btn_switch);
            var index = e.target['index'];
            if (e.target.tag == 11) { //bg
                cc.sys.localStorage.setItem("bgType", index);
                kaayou.emit(this.curMod.getModuleName(), 'ui::MjTable::changeBgType');
            }
            else { //
                cc.sys.localStorage.setItem("mjBgType", index);
                kaayou.emit(this.curMod.getModuleName(), 'ui::MjTable::changeMjType');
            }
        };
        MajonSkinPanel.prototype.Show = function () {
            this.setVisible(true);
        };
        return MajonSkinPanel;
    }(kaayou.ModelLayer));
    common.MajonSkinPanel = MajonSkinPanel;
})(common || (common = {}));
var common;
(function (common) {
    var tableLayer = /** @class */ (function (_super) {
        __extends(tableLayer, _super);
        function tableLayer(mjRes, mjInfo, gameName, isangangback) {
            if (isangangback === void 0) { isangangback = false; }
            var _this = _super.call(this) || this;
            _this.handRow = null;
            _this.tableRow = null;
            _this.discardRow = null;
            _this.pilaiRow = null;
            _this.heapRow = null;
            _this.chupaiArr = [];
            _this.isangangback = false;
            common.MaJonCard.res_prefix = mjRes;
            common.MaJonCard.gameName = gameName;
            _this.isangangback = isangangback;
            _this.setMajonModel(mjInfo, mjRes);
            return _this;
        }
        tableLayer.prototype.setMajonModel = function (mjInfo, mjRes) {
            this.removeAllChildren();
            common.MaJonCard.res_prefix = mjRes;
            var cardposInfos = this.parseInfo(mjInfo);
            var mjmodel = cc.sys.localStorage.getItem('majonModel_' + common.MaJonCard.gameName);
            this.meldRow = {};
            this.handRow = {};
            this.tableRow = {};
            this.discardRow = {};
            this.pilaiRow = {};
            this.heapRow = {};
            if (mjmodel == '1') {
                for (var x_1 in cardposInfos) {
                    var pinfo_1 = cardposInfos[x_1];
                    if (Number(x_1) == 0) { //自家
                        //手牌
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo_1.hand);
                        this.addChild(m, 10);
                        this.handRow[x_1] = m;
                        //手牌倒桌面牌
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo_1.table);
                        this.addChild(m, 10);
                        this.tableRow[x_1] = m;
                        //句子
                        var r = new common.MajionMeldRow(this.isangangback);
                        r.initWithInfo(pinfo_1.gang);
                        this.addChild(r, 10);
                        this.meldRow[x_1] = r;
                        //牌堆
                        if (pinfo_1.heap) {
                            var m = new common.MaJonRow();
                            m.initWithInfo(pinfo_1.heap);
                            this.addChild(m, 6);
                            this.heapRow[x_1] = m;
                        }
                        //打出去的牌
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo_1.discard);
                        this.addChild(m, 5);
                        this.discardRow[x_1] = m;
                        //皮赖
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo_1.pilai);
                        this.addChild(m, 5);
                        this.pilaiRow[x_1] = m;
                    }
                    else if (Number(x_1) == 2) { //对家
                        //手牌
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo_1.hand);
                        this.addChild(m, 1);
                        this.handRow[x_1] = m;
                        //手牌倒桌面牌
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo_1.table);
                        this.addChild(m, 1);
                        this.tableRow[x_1] = m;
                        //句子
                        var r = new common.MajionMeldRow(this.isangangback);
                        r.initWithInfo(pinfo_1.gang);
                        this.addChild(r, 1);
                        this.meldRow[x_1] = r;
                        //牌堆
                        if (pinfo_1.heap) {
                            var m = new common.MaJonRow();
                            m.initWithInfo(pinfo_1.heap);
                            this.addChild(m, 2);
                            this.heapRow[x_1] = m;
                        }
                        //打出去的牌
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo_1.discard);
                        this.addChild(m, 3);
                        this.discardRow[x_1] = m;
                        //皮赖
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo_1.pilai);
                        this.addChild(m, 3);
                        this.pilaiRow[x_1] = m;
                    }
                    else {
                        //手牌
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo_1.hand);
                        this.addChild(m, 4);
                        this.handRow[x_1] = m;
                        //手牌倒桌面牌
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo_1.table);
                        this.addChild(m, 4);
                        this.tableRow[x_1] = m;
                        //句子
                        var r = new common.MajionMeldRow(this.isangangback);
                        r.initWithInfo(pinfo_1.gang);
                        this.addChild(r, 4);
                        this.meldRow[x_1] = r;
                        //牌堆
                        if (pinfo_1.heap) {
                            var m = new common.MaJonRow();
                            m.initWithInfo(pinfo_1.heap);
                            this.addChild(m, 4);
                            this.heapRow[x_1] = m;
                        }
                        //打出去的牌
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo_1.discard);
                        this.addChild(m, 4);
                        this.discardRow[x_1] = m;
                        //皮赖
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo_1.pilai);
                        this.addChild(m, Number(x_1) == 1 ? 5 : 3);
                        this.pilaiRow[x_1] = m;
                    }
                }
            }
            else {
                for (var x in cardposInfos) {
                    var pinfo = cardposInfos[x];
                    var zz = 0;
                    if (Number(x) == 0) { //south的牌层级比较高
                        zz = 10;
                    }
                    if (Number(x) == 1) {
                        //手牌
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo.hand);
                        this.addChild(m, zz);
                        this.handRow[x] = m;
                        //手牌倒桌面牌
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo.table);
                        this.addChild(m, zz);
                        this.tableRow[x] = m;
                        //句子
                        var r = new common.MajionMeldRow(this.isangangback);
                        r.initWithInfo(pinfo.gang);
                        this.addChild(r, zz);
                        this.meldRow[x] = r;
                    }
                    else {
                        //句子
                        var r = new common.MajionMeldRow(this.isangangback);
                        r.initWithInfo(pinfo.gang);
                        this.addChild(r, zz);
                        this.meldRow[x] = r;
                        //手牌
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo.hand);
                        this.addChild(m, zz);
                        this.handRow[x] = m;
                        //手牌倒桌面牌
                        var m = new common.MaJonRow();
                        m.initWithInfo(pinfo.table);
                        this.addChild(m, zz);
                        this.tableRow[x] = m;
                    }
                    //打出去的牌
                    var m = new common.MaJonRow();
                    m.initWithInfo(pinfo.discard);
                    this.addChild(m, zz);
                    this.discardRow[x] = m;
                    //皮赖
                    var m = new common.MaJonRow();
                    m.initWithInfo(pinfo.pilai);
                    this.addChild(m, zz);
                    this.pilaiRow[x] = m;
                }
            }
        };
        tableLayer.prototype.ReEnter = function (mjRes, gameName) {
            common.MaJonCard.res_prefix = mjRes;
            common.MaJonCard.gameName = gameName;
        };
        tableLayer.prototype.initTable = function () {
            var index = cc.sys.localStorage.getItem('majonModel_' + common.MaJonCard.gameName);
            for (var i = 0; i < 4; i++) {
                this.tableRow[i].setCardNums([]);
                this.discardRow[i].setCardNums([]);
                this.pilaiRow[i].setCardNums([]);
                this.handRow[i].setCardNums([]);
                this.meldRow[i].setMeldNums([]);
                if (Number(index) != 1)
                    continue;
                if (!this.heapRow[i])
                    continue;
                this.heapRow[i].setCardNums([]);
            }
        };
        tableLayer.prototype.parseInfo = function (url) {
            var MajonCardPos = cc.loader.getRes(url).root.ele;
            // console.log(MajonCardPos);
            // let cardInfos: any = {
            //     "south": {},  //南
            //     "east": {},   //东
            //     "north": {},   //北
            //     "west": {},   //西
            // };
            var cardInfos = {
                "0": {},
                "1": {},
                "2": {},
                "3": {},
            };
            for (var i = 0; i < MajonCardPos.length; i++) {
                var scale = MajonCardPos[i].scale;
                if (!scale) {
                    scale = 1;
                }
                var info = {
                    "direction": MajonCardPos[i].direction,
                    "type": MajonCardPos[i].type,
                    "kaikou": Number(MajonCardPos[i].kaikou),
                    "index": Number(MajonCardPos[i].index),
                    "pic": MajonCardPos[i].pic,
                    "posx": Number(MajonCardPos[i].posx),
                    "posy": Number(MajonCardPos[i].posy),
                    "zOrder": Number(MajonCardPos[i].zOrder),
                    "flowerPosx": Number(MajonCardPos[i].flowerPosx),
                    "flowerPosy": Number(MajonCardPos[i].flowerPosy),
                    "flowerScale": Number(MajonCardPos[i].flowerScale),
                    "flowerRotation": Number(MajonCardPos[i].flowerRotation),
                    "scale": scale,
                    "flowerPic": MajonCardPos[i].flowerPic
                };
                var index = this.getIndexByDiection(MajonCardPos[i].direction);
                var type = MajonCardPos[i].type;
                if (!cardInfos[index][type]) {
                    cardInfos[index][type] = [];
                }
                if (type == 'gang') {
                    var kaikou = info.kaikou;
                    if (!cardInfos[index][type][kaikou]) {
                        cardInfos[index][type][kaikou] = [];
                    }
                    cardInfos[index][type][kaikou][info.index] = (info);
                }
                else {
                    cardInfos[index][type][info.index] = (info);
                }
                if (type == 'chupai') {
                    this.chupaiArr[index] = info;
                }
            }
            console.log(cardInfos);
            return cardInfos;
        };
        tableLayer.prototype.getIndexByDiection = function (direction) {
            var arr = ['south', 'east', 'north', 'west'];
            return arr.indexOf(direction);
        };
        return tableLayer;
    }(kaayou.Layer));
    common.tableLayer = tableLayer;
})(common || (common = {}));
var common;
(function (common) {
    var NewMaJonCard = /** @class */ (function (_super) {
        __extends(NewMaJonCard, _super);
        // arrowPositions;
        //  arrowScale;
        //  tingPositions;
        function NewMaJonCard() {
            var _this = _super.call(this) || this;
            _this.InnerNum = 0;
            _this.carddirection = common.MaJonCardType.CardDirection.SOUTH;
            _this.Cover = false;
            _this.cardtype = common.MaJonCardType.CardType.HAND;
            _this.cardModel = common.MaJonCardType.CardModel.model2d;
            _this.isSelect = false;
            _this.flowersp = null;
            _this.arrow = null;
            _this.image_pilai = null;
            _this.tingTag = null;
            _this.leftCard = null;
            _this.mustRes = "";
            _this.isEffective = true; //是否有效
            _this._cardInfo = null;
            _this.InnerRotations = (function () {
                var rotations = {};
                rotations[common.MaJonCardType.CardDirection.EAST] = -90;
                rotations[common.MaJonCardType.CardDirection.WEST] = 90;
                rotations[common.MaJonCardType.CardDirection.SOUTH] = 0;
                rotations[common.MaJonCardType.CardDirection.NORTH] = 0;
                return rotations;
            })();
            _this.tingPositions = (function () {
                var poss = {};
                poss[common.MaJonCardType.CardModel.model2d] = cc.p(18.4, 81.3);
                poss[common.MaJonCardType.CardModel.model3d] = cc.p(18, 91.3);
                return poss;
            })();
            _this.arrowPositions = (function () {
                var poss = {};
                poss[common.MaJonCardType.CardDirection.SOUTH] = cc.p(35, 14);
                poss[common.MaJonCardType.CardDirection.WEST] = cc.p(9, 31);
                poss[common.MaJonCardType.CardDirection.EAST] = cc.p(44, 31);
                poss[common.MaJonCardType.CardDirection.NORTH] = cc.p(21, 23);
                return poss;
            })();
            _this.arrowScale = (function () {
                var scales = {};
                scales[common.MaJonCardType.CardDirection.EAST] = 0.7;
                scales[common.MaJonCardType.CardDirection.WEST] = 0.7;
                scales[common.MaJonCardType.CardDirection.SOUTH] = 1;
                scales[common.MaJonCardType.CardDirection.NORTH] = 0.7;
                return scales;
            })();
            _this.LaiPiScale = (function () {
                var scales = {};
                //东
                scales[common.MaJonCardType.CardDirection.EAST] = {};
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HAND] = {};
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.DISCARD] = {};
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.PILAI] = {};
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.MELD] = {};
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.TABLE] = {};
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HEAP] = {};
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model2d] = 1; //用不到
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model2d] = 1; //用不到
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model2d] = 0.35;
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model2d] = 1;
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model2d] = 0.4;
                //西
                scales[common.MaJonCardType.CardDirection.WEST] = {};
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HAND] = {};
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.DISCARD] = {};
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.PILAI] = {};
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.MELD] = {};
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.TABLE] = {};
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HEAP] = {};
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model2d] = 1; //用不到
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model2d] = 1; //用不到
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model2d] = 0.35;
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model2d] = 1;
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model2d] = 0.4;
                //南  //mine
                scales[common.MaJonCardType.CardDirection.SOUTH] = {};
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HAND] = {};
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.DISCARD] = {};
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.PILAI] = {};
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.MELD] = {};
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.TABLE] = {};
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HEAP] = {};
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model2d] = 1;
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model2d] = 1; //用不到
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model2d] = 0.35; //
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model2d] = 1;
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model2d] = 0.75;
                //北
                scales[common.MaJonCardType.CardDirection.NORTH] = {};
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HAND] = {};
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.DISCARD] = {};
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.PILAI] = {};
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.MELD] = {};
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.TABLE] = {};
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HEAP] = {};
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model2d] = 1; //用不到
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model2d] = 1; //用不到
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model2d] = 0.35;
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model2d] = 1;
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model2d] = 0.4;
                //----------------------------------3d------------------------------------------
                //东
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model3d] = 1; //用不到
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model3d] = 1; //用不到
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model3d] = 0.5;
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model3d] = 1;
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model3d] = 0.4;
                scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HEAP][common.MaJonCardType.CardModel.model3d] = 1;
                //西
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model3d] = 1; //用不到
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model3d] = 1; //用不到
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model3d] = 0.5;
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model3d] = 1;
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model3d] = 0.4;
                scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HEAP][common.MaJonCardType.CardModel.model3d] = 1;
                //南  //mine
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model3d] = 1;
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model3d] = 1; //用不到
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model3d] = 0.5; //
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model3d] = 1;
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model3d] = 1;
                scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HEAP][common.MaJonCardType.CardModel.model3d] = 1;
                //北
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model3d] = 1; //用不到
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model3d] = 1; //用不到
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model3d] = 0.5;
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model3d] = 1;
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model3d] = 0.4;
                scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HEAP][common.MaJonCardType.CardModel.model3d] = 1;
                return scales;
            })();
            _this.LaiPiPositions = (function () {
                var poss = {};
                //东
                poss[common.MaJonCardType.CardDirection.EAST] = {};
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HAND] = {};
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.DISCARD] = {};
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.PILAI] = {};
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.MELD] = {};
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.TABLE] = {};
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HEAP] = {};
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model2d] = cc.p(0, 10); //用不到
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model2d] = cc.p(-14.5, -1); //用不到
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model2d] = cc.p(39, 36.6);
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model2d] =
                    poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model2d] = cc.p(43.1, 40.5);
                //西
                poss[common.MaJonCardType.CardDirection.WEST] = {};
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HAND] = {};
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.DISCARD] = {};
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.PILAI] = {};
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.MELD] = {};
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.TABLE] = {};
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HEAP] = {};
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model2d] = cc.p(0, 10); //用不到
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model2d] = cc.p(22.5, -2); //用不到
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model2d] = cc.p(7.8, 20.35);
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model2d] =
                    poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model2d] = cc.p(8.25, 19.95);
                //南  //mine
                poss[common.MaJonCardType.CardDirection.SOUTH] = {};
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HAND] = {};
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.DISCARD] = {};
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.PILAI] = {};
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.MELD] = {};
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.TABLE] = {};
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HEAP] = {};
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model2d] = cc.p(68.5, 21);
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model2d] = cc.p(15, -12); //用不到
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model2d] = cc.p(29.8, 16.8); //
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model2d] =
                    poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model2d] = cc.p(52.3, 36);
                //北
                poss[common.MaJonCardType.CardDirection.NORTH] = {};
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HAND] = {};
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.DISCARD] = {};
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.PILAI] = {};
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.MELD] = {};
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.TABLE] = {};
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HEAP] = {};
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model2d] = cc.p(0, 7); //用不到
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model2d] = cc.p(15, -12); //用不到
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model2d] = cc.p(29.8, 16.8);
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model2d] =
                    poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model2d] = cc.p(32.9, 21.8);
                //=========================3D=======================
                //东
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model3d] = cc.p(0, 10); //用不到
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model3d] = cc.p(-14.5, -1); //用不到
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model3d] = cc.p(47.6, 42.2);
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model3d] =
                    poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model3d] = cc.p(49, 42);
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HEAP][common.MaJonCardType.CardModel.model3d] = cc.p(0, 0);
                //西
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model3d] = cc.p(0, 10); //用不到
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model3d] = cc.p(22.5, -2); //用不到
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model3d] = cc.p(13, 28.4);
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model3d] =
                    poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model3d] = cc.p(11.65, 23.44);
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HEAP][common.MaJonCardType.CardModel.model3d] = cc.p(0, 0);
                //南  //mine
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model3d] = cc.p(68.5, 21);
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model3d] = cc.p(15, -12); //用不到
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model3d] = cc.p(33.3, 26); //
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model3d] =
                    poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model3d] = cc.p(52.3, 36.2);
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HEAP][common.MaJonCardType.CardModel.model3d] = cc.p(0, 0);
                //北
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HAND][common.MaJonCardType.CardModel.model3d] = cc.p(0, 7); //用不到
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.DISCARD][common.MaJonCardType.CardModel.model3d] = cc.p(15, -12); //用不到
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.PILAI][common.MaJonCardType.CardModel.model3d] = cc.p(29, 26.3);
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.MELD][common.MaJonCardType.CardModel.model3d] =
                    poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.TABLE][common.MaJonCardType.CardModel.model3d] = cc.p(5.65, 49.44);
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HEAP][common.MaJonCardType.CardModel.model3d] = cc.p(0, 0);
                return poss;
            })();
            return _this;
        }
        NewMaJonCard.prototype.setMustMajonRes = function (mustRes) {
            this.mustRes = mustRes;
        };
        NewMaJonCard.prototype.setEffective = function (effective) {
            this.isEffective = effective;
        };
        NewMaJonCard.getCardColor = function (index) {
            if (index == 0) {
                return common.MaJonCardType.CardColor.GREEN;
            }
            else if (index == 1) {
                return common.MaJonCardType.CardColor.BLUE;
            }
            else if (index == 2) {
                return common.MaJonCardType.CardColor.YELLOW;
            }
        };
        NewMaJonCard.prototype.getCardDirection = function (direction) {
            return common.MaJonCardType.CardDirection[direction.toUpperCase()];
        };
        NewMaJonCard.prototype.getCardType = function (type) {
            if (type == "gang") {
                return common.MaJonCardType.CardType.MELD;
            }
            else {
                return common.MaJonCardType.CardType[type.toUpperCase()];
            }
        };
        NewMaJonCard.prototype.initUi = function () {
            this.flowersp = new kaayou.ImageView();
            this.addChild(this.flowersp);
            this.flowersp.setName('flowersp');
            this.flowersp.ignoreContentAdaptWithSize(true);
            this.arrow = new ccui.ImageView(common.MaJonCard.res_prefix + ".card_provider_0.png", ccui.Widget.PLIST_TEXTURE);
            this.addChild(this.arrow);
            this.arrow.setVisible(false);
            this.image_pilai = new ccui.ImageView(common.MaJonCard.res_prefix + ".laizi_angle.png", ccui.Widget.PLIST_TEXTURE);
            this.addChild(this.image_pilai);
            this.image_pilai.setVisible(false);
            this.image_pilai.setContentSize(31, 36);
            this.tingTag = new ccui.ImageView(common.MaJonCard.res_prefix + ".card_ting_angle.png", ccui.Widget.PLIST_TEXTURE);
            this.addChild(this.tingTag);
            this.tingTag.setVisible(false);
            this.leftCard = new ccui.Text("", "", 18);
            this.leftCard.setPosition(19, -15.5);
            this.leftCard.setColor(cc.color(71, 220, 255));
            this.addChild(this.leftCard);
            this.leftCard.setVisible(false);
        };
        NewMaJonCard.prototype.doSetInfo = function (value) {
            if (!this.isEffective) {
                return;
            }
            this.carddirection = this.getCardDirection(value.direction);
            this.cardtype = this.getCardType(value.type);
            this._cardInfo = value;
            this.setLocalZOrder(value.zOrder);
            this.setPosition(value.posx, value.posy);
            if (value.scale == undefined) {
                value.scale = 1;
            }
            this.setScale(value.scale);
            this.doChangeCard();
        };
        NewMaJonCard.prototype.doChangeCard = function () {
            if (!this.isEffective) {
                return;
            }
            if (this.cardtype == common.MaJonCardType.CardType.HEAP || this.cardtype == common.MaJonCardType.CardType.TABLE) {
                if (this.InnerNum > 0) {
                    this.Cover = false;
                }
                else {
                    this.Cover = true;
                }
            }
            this.cardModel = common.MaJonCard.cardModel;
            //如果是3D模式下  但是必须强制使用2d麻将资源
            if (this.cardModel == common.MaJonCardType.CardModel.model3d && this.mustRes.length > 0) {
                this.cardModel = common.MaJonCardType.CardModel.model2d;
            }
            this.arrow.setPosition(this.arrowPositions[this.carddirection]);
            this.arrow.setScale(this.arrowScale[this.carddirection]);
            this.setColor(cc.color(255, 255, 255));
            this.changeBg();
            this.changeInner();
            this.changeLaiPi();
        };
        NewMaJonCard.prototype.changeBg = function () {
            //方向 
            var direction = this.carddirection;
            //颜色
            var ctype = Number(cc.sys.localStorage.getItem("mjBgType"));
            var color = common.MaJonCard.getCardColor(ctype);
            //是否背牌
            var cover = this.Cover ? 'cover_' : '';
            var cardtype = this.cardtype;
            var is3d = false;
            if (common.MaJonCard.cardModel == common.MaJonCardType.CardModel.model3d && this.mustRes.length == 0) {
                direction = this._cardInfo.pic.split("_")[0];
                cardtype = this._cardInfo.pic.split("_")[1];
                is3d = true;
            }
            var bgStr = "";
            if (this.mustRes.length > 0) {
                bgStr = this.mustRes + "." + color + "_" + direction + "_" + cardtype + "_" + cover + "board.png";
            }
            else {
                bgStr = common.MaJonCard.res_prefix + "." + color + "_" + direction + "_" + cardtype + "_" + cover + "board.png";
            }
            if (cc.spriteFrameCache.getSpriteFrame(bgStr)) {
                this.loadTexture(bgStr, ccui.Widget.PLIST_TEXTURE);
            }
            else {
                console.error("\u627E\u4E0D\u5230\u9EBB\u5C06\u7EB9\u7406:" + bgStr);
                /** if (cc.sys.isNative && (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_ANDROID)) {
                    try {
                        let arr = null;
                        arr.shift(0);
                    } catch (err) {
                        let message = err.message;
                        if (typeof message == 'string') {
                            if (!message) { message = "no message"; }
                        } else if (typeof message == 'object') {
                            try {
                                message = JSON.stringify(message, null, 2);
                            } catch (er) {
                                message = "err message object";
                            }
                        } else {
                            message = "no message";
                        }

                        let stack = err.stack;
                        if (typeof stack == 'string') {
                            if (!stack) { stack = "no stack"; }
                        } else if (typeof stack == 'object') {
                            try {
                                stack = JSON.stringify(stack, null, 2);
                            } catch (er) {
                                stack = "err stack object";
                            }
                        } else {
                            stack = "no stack";
                        }
                        let isPost = true;
                        if (cardtype == "meld" && is3d) {
                            isPost = false;
                        }
                        if (isPost) {
                            kaayou.PlatformMgr.getInstance().sys.PostBugly(`麻将牌花错误:游戏${MaJonCard.gameName}牌花:${bgStr}`, `${message}`, stack);
                        }
                    }
                }*/
            }
        };
        NewMaJonCard.prototype.changeInner = function () {
            if (this.Cover) {
                this.flowersp.setVisible(false);
                return;
            }
            else {
                if (this.carddirection != common.MaJonCardType.CardDirection.SOUTH && this.cardtype == common.MaJonCardType.CardType.HAND) {
                    this.flowersp.setVisible(false);
                    return;
                }
            }
            if (!this.InnerNum)
                return;
            if (this.InnerNum <= 0)
                return;
            this.flowersp.setVisible(true);
            //2D麻将资源牌花是固定的south_table_tile_0_
            var innerstr = "south_table_tile_0_" + this.InnerNum.toString(16) + ".png";
            if (this._cardInfo && this.cardModel == common.MaJonCardType.CardModel.model3d && this.mustRes.length == 0) {
                var tmpstr = this._cardInfo.flowerPic.split("_");
                //"west_discard_tile_0_29.png"
                innerstr = tmpstr[0] + "_" + tmpstr[1] + "_tile_0_" + this.InnerNum.toString(16) + ".png";
            }
            var prestr = this.mustRes.length > 0 ? this.mustRes : common.MaJonCard.res_prefix;
            var flowerstr = prestr + "." + innerstr;
            if (!cc.spriteFrameCache.getSpriteFrame(flowerstr)) {
                this.setVisible(false);
                return;
            }
            this.flowersp.loadTexture(flowerstr, ccui.Widget.PLIST_TEXTURE);
            this.flowersp.setScale(this._cardInfo.flowerScale);
            this.flowersp.setRotation(this._cardInfo.flowerRotation);
            this.flowersp.setPosition(this._cardInfo.flowerPosx, this._cardInfo.flowerPosy);
        };
        NewMaJonCard.prototype.changeArrow = function (index, outIndex, show, type) {
            if (show === void 0) { show = true; }
            if (type === void 0) { type = 0; }
            if (!show) {
                this.arrow.visible = false;
                return;
            }
            if (this.cardtype !== common.MaJonCardType.CardType.MELD) {
                return;
            }
            if (index == outIndex) {
                if (type != common.MeldType.BUGANG && type != common.MeldType.ANGANG && type != common.MeldType.CHAOGANG) {
                    return;
                }
            }
            this.arrow.visible = true;
            var orginalRotation = 0;
            if (this.carddirection == common.MaJonCardType.CardDirection.SOUTH) {
                this.arrow.rotation = 0;
            }
            else if (this.carddirection == common.MaJonCardType.CardDirection.EAST) {
                this.arrow.rotation = -90;
            }
            else if (this.carddirection == common.MaJonCardType.CardDirection.NORTH) {
                this.arrow.rotation = -180;
            }
            else {
                this.arrow.rotation = -270;
            }
            orginalRotation = this.arrow.rotation;
            var difRotation = (index - outIndex) * 90;
            this.arrow.rotation += difRotation;
            if (type == common.MeldType.ANGANG || type == common.MeldType.BUGANG || type == common.MeldType.CHAOGANG) {
                this.arrow.loadTexture(common.MaJonCard.res_prefix + ".card_provider_zimo.png", ccui.Widget.PLIST_TEXTURE);
                this.arrow.rotation = orginalRotation;
            }
            else {
                this.arrow.loadTexture(common.MaJonCard.res_prefix + ".card_provider_0.png", ccui.Widget.PLIST_TEXTURE);
            }
        };
        NewMaJonCard.prototype.setSelecte = function (v) {
            this.isSelect = v;
            if (this.isSelect) {
                if (this.carddirection == common.MaJonCardType.CardDirection.SOUTH) {
                    this.setPosition(this._cardInfo.posx, this._cardInfo.posy + 20);
                }
            }
            else {
                this.setPosition(this._cardInfo.posx, this._cardInfo.posy);
            }
        };
        NewMaJonCard.prototype.getSelect = function () {
            return this.isSelect;
        };
        NewMaJonCard.prototype.getCardInfo = function () {
            return this._cardInfo;
        };
        NewMaJonCard.prototype.reset = function () {
        };
        NewMaJonCard.prototype.setColor = function (c) {
            _super.prototype.setColor.call(this, c);
            // this.flowersp.setColor(c);
            // this.arrow.setColor(c);
            // this.image_pilai.setColor(c);
            // this.tingTag.setColor(c);
            for (var i = 0; i < this.childrenCount; i++) {
                var child = this.children[i];
                if (!child)
                    continue;
                if (!child.getDescription)
                    continue;
                var type_name = child.getDescription();
                if (type_name == "ImageView") {
                    child.setColor(c);
                }
            }
        };
        NewMaJonCard.prototype.setGaryMask = function (b) {
            if (b) {
                this.setColor(cc.color(128, 128, 128));
            }
            else {
                this.setColor(cc.color(255, 255, 255));
            }
        };
        NewMaJonCard.prototype.setTing = function (b) {
            if (this.cardtype !== common.MaJonCardType.CardType.HAND || this.carddirection != common.MaJonCardType.CardDirection.SOUTH) {
                this.tingTag.setVisible(false);
            }
            this.tingTag.setVisible(b);
            if (b) {
                this.tingTag.setPosition(this.tingPositions[common.MaJonCard.cardModel]);
            }
        };
        NewMaJonCard.prototype.setNum = function (num) {
            this.leftCard.setVisible(true);
            this.leftCard.setString(num.toString() + "张");
        };
        NewMaJonCard.prototype.setCover = function (cover) {
            if (this.Cover != cover) {
                this.Cover = cover;
                this.doChangeCard();
            }
        };
        NewMaJonCard.prototype.setMaskColor = function (c) {
            this.setColor(c);
        };
        return NewMaJonCard;
    }(kaayou.ImageView));
    common.NewMaJonCard = NewMaJonCard;
})(common || (common = {}));
var common;
(function (common) {
    var NewMajioMeld = /** @class */ (function (_super) {
        __extends(NewMajioMeld, _super);
        function NewMajioMeld() {
            var _this = _super.call(this) || this;
            _this._cards = null;
            _this._meldType = common.MeldType.NULL;
            _this._cardNums = null;
            _this._meldInfo = null;
            // abstract initWithInfo(info : Array<MjPosInfo>): void;
            _this._isangangback = false;
            _this._cards = [];
            _this._cardNums = [];
            return _this;
        }
        NewMajioMeld.prototype.initWithInfo = function (d) {
            if (!d)
                return;
            this._meldInfo = d;
            for (var i = 0; i < d.length; i++) {
                // var card = new MaJonCard();
                var card = eval("new " + common.MaJonCard.gameName + ".MaJonCard()");
                card.doSetInfo(d[i]);
                this._cards.push(card);
                this.addChild(card);
            }
        };
        NewMajioMeld.prototype.setIsAngangBack = function (isback) {
            this._isangangback = isback;
        };
        NewMajioMeld.prototype.cleanUp = function () {
            this._cardNums = [];
            for (var i = 0; i < this._cards.length; i++) {
                this._cards[i].arrow.setVisible(false);
            }
        };
        NewMajioMeld.prototype.setMeldInfo = function (info) {
            for (var x in this._cards) {
                this._cards[x].doSetInfo(info[x]);
            }
        };
        NewMajioMeld.prototype.setMeld = function (type, nums) {
            this._cardNums = nums;
            this._meldType = type;
            if (this._meldType == common.MeldType.NULL) {
                this.visible = false;
                return;
            }
            this.visible = true;
            for (var x in this._cards) {
                var card = this._cards[x];
                if (Number(x) > this._cardNums.length) {
                    card.visible = false;
                }
                else {
                    card.visible = true;
                }
                if (!this._cards[x].visible) {
                    continue;
                }
                if (this._cardNums[x] > 0) {
                    card.InnerNum = this._cardNums[x];
                    card.Cover = false;
                    card.doChangeCard();
                }
                else {
                    card.visible = false;
                }
                //为朝天杠的时候，显示第一张和第三张背牌
                if (this._meldType == common.MeldType.CHAOGANG) {
                    if (Number(x) == 0 || Number(x) == 2) {
                        card.Cover = true;
                    }
                    else {
                        card.Cover = false;
                    }
                    //背牌不显示朝
                    // card.changeLaiPi();
                    card.doChangeCard();
                    //正面也不显示朝
                    card.image_pilai.visible = false;
                }
                //如果为朝天杠则不return
                if (this._cardNums.length < 4 && (this._meldType == common.MeldType.GANG || this._meldType == common.MeldType.ANGANG)) {
                    return;
                }
                if (this._meldType == common.MeldType.ANGANG) {
                    if (Number(x) < 3) {
                        card.Cover = true;
                    }
                    else {
                        card.Cover = false;
                        if (this._isangangback) {
                            if (card.carddirection == common.MaJonCardType.CardDirection.SOUTH) {
                                card.Cover = false;
                            }
                            else {
                                card.Cover = true;
                            }
                        }
                    }
                    // card.changeLaiPi();
                    card.doChangeCard();
                }
                //最后一张牌的显示问题
                var lastCard = this._cards[3];
                if (this._meldType == common.MeldType.LEFTCHI || this._meldType == common.MeldType.PENG ||
                    this._meldType == common.MeldType.RIGHTCHI || this._meldType == common.MeldType.CENTERCHI || this._meldType == common.MeldType.CHAOGANG) {
                    lastCard.visible = false;
                }
                else {
                    lastCard.visible = true;
                }
            }
        };
        NewMajioMeld.prototype.showArrow = function (index, outIndex) {
            var card = null;
            if (this._meldType == common.MeldType.PENG || this._meldType == common.MeldType.CENTERCHI || this._meldType == common.MeldType.CHAOGANG) {
                card = this._cards[1];
            }
            else if (this._meldType == common.MeldType.RIGHTCHI) {
                card = this._cards[2];
            }
            else if (this._meldType == common.MeldType.LEFTCHI) {
                card = this._cards[0];
            }
            else if (this._meldType == common.MeldType.BUGANG || this._meldType == common.MeldType.ANGANG || this._meldType == common.MeldType.GANG) {
                card = this._cards[3];
            }
            //如果是补杠(续杠)，隐藏之前的箭头
            if (this._meldType == common.MeldType.BUGANG) {
                for (var i = 0; i < this.getChildrenCount(); i++) {
                    var c = this.getChildren()[i];
                    c.changeArrow(index, outIndex, false);
                }
            }
            if (card) {
                card.changeArrow(index, outIndex, true, this._meldType);
            }
        };
        NewMajioMeld.prototype.getMeld = function () {
            return this._cardNums;
        };
        NewMajioMeld.prototype.getMeldType = function () {
            return this._meldType;
        };
        NewMajioMeld.prototype.getMeldNode = function () {
            return this._cards;
        };
        NewMajioMeld.prototype.getMeldInfo = function () {
            return this._meldInfo;
        };
        return NewMajioMeld;
    }(kaayou.Block));
    common.NewMajioMeld = NewMajioMeld;
})(common || (common = {}));
var common;
(function (common) {
    var NewMajioMeldRow = /** @class */ (function (_super) {
        __extends(NewMajioMeldRow, _super);
        // abstract initWithInfo(info : Array<Array<MjPosInfo>>): void;
        function NewMajioMeldRow() {
            var _this = _super.call(this) || this;
            _this._melds = null;
            return _this;
        }
        NewMajioMeldRow.prototype.initWithInfo = function (d) {
            if (!d) {
                return;
            }
            this._melds = [];
            var zoder = 100;
            var direction = d[0][0].direction;
            for (var i = 0; i < d.length; i++) {
                if (direction == "east") {
                    zoder--;
                }
                var meld = eval("new " + common.MaJonCard.gameName + ".MajionMeld()");
                meld.initWithInfo(d[i]);
                this.addChild(meld, zoder);
                this._melds.push(meld);
            }
        };
        NewMajioMeldRow.prototype.setRowinfo = function (info) {
            for (var x in this._melds) {
                this._melds[x].setMeldInfo(info[x]);
            }
        };
        NewMajioMeldRow.prototype.setMeldNums = function (data) {
            for (var x in this._melds) {
                if (data[x]) {
                    this._melds[x].setMeld(data[x].type, data[x].nums);
                    this._melds[x].visible = true;
                    this._melds[x].showArrow(data[x].wOperateUser, data[x].wProvideUser);
                }
                else {
                    this._melds[x].cleanUp();
                    this._melds[x].visible = false;
                }
            }
        };
        NewMajioMeldRow.prototype.getMeldNums = function () {
            return this._melds;
        };
        return NewMajioMeldRow;
    }(kaayou.Layer));
    common.NewMajioMeldRow = NewMajioMeldRow;
})(common || (common = {}));
var common;
(function (common) {
    var NewMajonRow = /** @class */ (function (_super) {
        __extends(NewMajonRow, _super);
        function NewMajonRow() {
            var _this = _super.call(this) || this;
            _this._info = null;
            _this._MjCardSps = null;
            _this._cardNums = [];
            _this._MjCardSps = [];
            _this._info = [];
            return _this;
        }
        NewMajonRow.prototype.initWithInfo = function (d) {
            if (!d) {
                return;
            }
            this._MjCardSps = [];
            this.setContentSize(cc.view.getDesignResolutionSize());
            for (var i = 0; i < d.length; i++) {
                var sp = eval("new " + common.MaJonCard.gameName + ".MaJonCard()");
                this.addChild(sp);
                this._MjCardSps.push(sp);
            }
            this._info = d;
            this.initRowInfo();
        };
        NewMajonRow.prototype.setRowinfo = function (info) {
            //当前精灵少于坐标个数
            if (this._MjCardSps.length < info.length) {
                for (var i = 0; i < info.length; i++) {
                    if (i < this._info.length) {
                        var sp_2 = this._MjCardSps[i];
                        sp_2.doSetInfo(info[i]);
                        sp_2.setVisible(true);
                    }
                    else {
                        var sp_3 = eval("new " + common.MaJonCard.gameName + ".MaJonCard()");
                        sp_3.doSetInfo(info[i]);
                        this.addChild(sp_3);
                        this._MjCardSps.push(sp_3);
                    }
                }
            }
            else {
                for (var i = 0; i < this._MjCardSps.length; i++) {
                    var sp_4 = this._MjCardSps[i];
                    sp_4.setEffective(i < info.length);
                    sp_4.setVisible(i < info.length);
                    sp_4.doSetInfo(info[i]);
                }
            }
            this._info = info;
            this.initRowInfo();
        };
        NewMajonRow.prototype.initRowInfo = function () {
            var children = this._MjCardSps;
            for (var x = 0; x < children.length; x++) {
                var _mjCard = children[x];
                _mjCard.doSetInfo(this._info[x]);
                // if(!_mjCard.getChildByTag(120)){
                //     let text = new ccui.Text(x.toString(), "Arial", 25);
                //     _mjCard.addChild(text);
                //     text.setPosition(_mjCard.width / 2, _mjCard.height / 2);
                //     text.setTextColor(cc.color(255, 0, 0, 255));
                //     text.setTag(120)
                // }
                _mjCard.setVisible(false);
            }
        };
        NewMajonRow.prototype.changeAllCard = function () {
            if (this._cardNums.length == 0) {
                this.setVisible(false);
                return;
            }
            this.setVisible(true);
            var children = this._MjCardSps;
            for (var x = 0; x < children.length; x++) {
                var _mjCard = children[x];
                if (x >= this._cardNums.length || this._cardNums[x] < 0) {
                    _mjCard.setVisible(false);
                }
                else {
                    _mjCard.setVisible(true);
                }
                _mjCard.InnerNum = this._cardNums[x];
                _mjCard.doChangeCard();
            }
        };
        NewMajonRow.prototype.setCardSelect = function (index, v) {
            if (v === void 0) { v = false; }
            if (this._MjCardSps == null) {
                return;
            }
            if (this._MjCardSps.length < 1) {
                return;
            }
            for (var x in this._MjCardSps) {
                this._MjCardSps[x].setSelecte(false);
            }
            if (index > -1 && index < this._MjCardSps.length) {
                this._MjCardSps[index].setSelecte(true);
            }
            this.changeAllCard();
        };
        // 0代表别人的牌,要创建  -1代表已经操作过的牌,看不见
        NewMajonRow.prototype.setCardNums = function (nums) {
            this._cardNums = nums;
            if (nums.length == 0) {
                this.setVisible(false);
                return;
            }
            this.setVisible(true);
            this.setCardSelect(-1, false); //出完牌的时候重置状态
        };
        NewMajonRow.prototype.hitCards = function (pos) {
            if (!cc.rectContainsPoint(this.getBoundingBox(), pos)) {
                return -1;
            }
            for (var x in this.children) {
                var rect = this.children[x].getBoundingBox();
                if (true == this.children[x].visible && cc.rectContainsPoint(rect, pos)) {
                    return Number(x);
                }
            }
            return -1;
        };
        NewMajonRow.prototype.getCardByIndex = function (index) {
            return this._MjCardSps[index];
        };
        NewMajonRow.prototype.getLastIndex = function () {
            return this._cardNums.length - 1;
        };
        NewMajonRow.prototype.getCardNums = function () {
            return this._cardNums;
        };
        NewMajonRow.prototype.getRowinfo = function () {
            return this._info;
        };
        NewMajonRow.prototype.setCover = function (v, len) {
            var rowLen = this._MjCardSps.length;
            if (len != null) {
                rowLen = len;
            }
            this.setVisible(true);
            for (var i = 0; i < this._MjCardSps.length; i++) {
                if (i > rowLen - 1) {
                    this._MjCardSps[i].setVisible(false);
                    continue;
                }
                this._MjCardSps[i].setVisible(true);
                this._MjCardSps[i].setCover(v);
            }
        };
        NewMajonRow.prototype.setRowCover = function (nums) {
            var len = nums.length;
            if (len < 0)
                return;
            for (var i = 0; i < this._MjCardSps.length; i++) {
                this._MjCardSps[i].setVisible(i <= len - 1);
                if (i <= len - 1) {
                    this._MjCardSps[i].setCover(true);
                }
            }
        };
        return NewMajonRow;
    }(kaayou.Layer));
    common.NewMajonRow = NewMajonRow;
})(common || (common = {}));
var common;
(function (common) {
    var NewMajonTable = /** @class */ (function (_super) {
        __extends(NewMajonTable, _super);
        function NewMajonTable(mjRes, mjInfo, gameName, model) {
            var _this = _super.call(this) || this;
            _this.meldRow = null;
            _this.handRow = null;
            _this.tableRow = null;
            _this.discardRow = null;
            _this.pilaiRow = null;
            _this.heapRow = null;
            _this.chupaiArr = [];
            common.MaJonCard.res_prefix = mjRes;
            common.MaJonCard.gameName = gameName;
            common.MaJonCard.cardModel = model;
            _this.meldRow = {};
            _this.handRow = {};
            _this.tableRow = {};
            _this.discardRow = {};
            _this.pilaiRow = {};
            _this.heapRow = {};
            var cardposInfos = _this.parseInfo(mjInfo);
            _this.setTableCell(cardposInfos);
            return _this;
        }
        NewMajonTable.prototype.changeMajonModel = function (mjInfo, mjRes, model) {
            common.MaJonCard.res_prefix = mjRes;
            common.MaJonCard.cardModel = model;
            var cardposInfos = this.parseInfo(mjInfo);
            //如果初始是2d   3d rowinfo是没被初始化的 
            if (common.MaJonCard.cardModel == common.MaJonCardType.CardModel.model3d && !this.heapRow[0]) {
                this.createHeapRow(cardposInfos);
            }
            for (var x in cardposInfos) {
                this.handRow[x].setRowinfo(cardposInfos[x].hand);
                this.discardRow[x].setRowinfo(cardposInfos[x].discard);
                this.tableRow[x].setRowinfo(cardposInfos[x].table);
                this.meldRow[x].setRowinfo(cardposInfos[x].gang);
                this.pilaiRow[x].setRowinfo(cardposInfos[x].pilai);
                if (!this.heapRow[x])
                    continue;
                this.heapRow[x].setVisible(common.MaJonCard.cardModel == common.MaJonCardType.CardModel.model3d);
                if (common.MaJonCard.cardModel != common.MaJonCardType.CardModel.model3d) {
                    continue;
                }
                this.heapRow[x].setRowinfo(cardposInfos[x].heap);
            }
        };
        NewMajonTable.prototype.ReEnter = function (mjRes, gameName, model) {
            common.MaJonCard.res_prefix = mjRes;
            common.MaJonCard.gameName = gameName;
            common.MaJonCard.cardModel = model;
        };
        NewMajonTable.prototype.initTable = function () {
            for (var i = 0; i < 4; i++) {
                this.tableRow[i].setCardNums([]);
                this.discardRow[i].setCardNums([]);
                this.pilaiRow[i].setCardNums([]);
                this.handRow[i].setCardNums([]);
                this.meldRow[i].setMeldNums([]);
                if (!this.heapRow[i])
                    continue;
                // 修复在3D模式下发完牌后退出游戏，先进入回放再重新进入游戏时，上局牌堆会没清的问题，因为进入回放后cardModel会被设置为0
                // if (MaJonCard.cardModel != MaJonCardType.CardModel.model3d) {
                //     continue;
                // }
                this.heapRow[i].setCardNums([]);
            }
        };
        NewMajonTable.prototype.parseInfo = function (url) {
            var MajonCardPos = cc.loader.getRes(url).root.ele;
            var cardInfos = {
                "0": {},
                "1": {},
                "2": {},
                "3": {},
            };
            for (var i = 0; i < MajonCardPos.length; i++) {
                var scale = MajonCardPos[i].scale;
                if (!scale) {
                    scale = 1;
                }
                var info = {
                    "direction": MajonCardPos[i].direction,
                    "type": MajonCardPos[i].type,
                    "kaikou": Number(MajonCardPos[i].kaikou),
                    "index": Number(MajonCardPos[i].index),
                    "pic": MajonCardPos[i].pic,
                    "posx": Number(MajonCardPos[i].posx),
                    "posy": Number(MajonCardPos[i].posy),
                    "zOrder": Number(MajonCardPos[i].zOrder),
                    "flowerPosx": Number(MajonCardPos[i].flowerPosx),
                    "flowerPosy": Number(MajonCardPos[i].flowerPosy),
                    "flowerScale": Number(MajonCardPos[i].flowerScale),
                    "flowerRotation": Number(MajonCardPos[i].flowerRotation),
                    "scale": scale,
                    "flowerPic": MajonCardPos[i].flowerPic
                };
                var index = this.getIndexByDiection(MajonCardPos[i].direction);
                var type = MajonCardPos[i].type;
                if (!cardInfos[index][type]) {
                    cardInfos[index][type] = [];
                }
                if (type == 'gang') {
                    var kaikou = info.kaikou;
                    if (!cardInfos[index][type][kaikou]) {
                        cardInfos[index][type][kaikou] = [];
                    }
                    cardInfos[index][type][kaikou][info.index] = (info);
                }
                else {
                    cardInfos[index][type][info.index] = (info);
                }
                if (type == 'chupai') {
                    this.chupaiArr[index] = info;
                }
            }
            console.log(cardInfos);
            return cardInfos;
        };
        NewMajonTable.prototype.getIndexByDiection = function (direction) {
            var arr = ['south', 'east', 'north', 'west'];
            return arr.indexOf(direction);
        };
        return NewMajonTable;
    }(kaayou.Layer));
    common.NewMajonTable = NewMajonTable;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var PkAni = /** @class */ (function () {
        function PkAni() {
            this.listener = null;
            this.handRow = null;
            this.moveRow = null;
            this.node = null;
            this.isSlide = false;
            this.isDrag = false;
            this.startPoint = null;
            this.isLock = true;
            this.seletecards = null;
            this.seleteStartIndex = -1;
            this.seleteEndIndex = -1;
        }
        PkAni.prototype.init = function (maskNode, handRow) {
            this.node = maskNode;
            this.handRow = handRow;
            if (!this.node) {
                return;
            }
            // this.listener = cc.EventListener.create({
            //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
            //     swallowTouches: false,
            //     onTouchBegan: this.onTouchStart.bind(this),
            //     onTouchMoved: this.onTouchMove.bind(this),
            //     onTouchEnded: this.onTouchEnd.bind(this),
            //     onTouchCancelled: this.onTouchEnd.bind(this),
            // });
            // cc.eventManager.addListener(this.listener, this.node);
            this.node.on(kaayou.TouchEvent.TouchStart, this.onTouchStart.bind(this), this);
            this.node.on(kaayou.TouchEvent.TouchMove, this.onTouchMove.bind(this), this);
            this.node.on(kaayou.TouchEvent.TouchEnd, this.onTouchEnd.bind(this), this);
            this.node.on(kaayou.TouchEvent.TouchCance, this.onTouchEnd.bind(this), this);
        };
        PkAni.prototype.onTouchEnd = function (event) {
            var target = event.target;
            var position = target.convertToNodeSpace(target.getTouchEndPosition());
            cc.log('onTouchEnd:', position);
            this.onCardMoveEnd(position);
            if (this.isSlide) {
                this.onSlideEnd(position);
            }
            else if (this.isDrag) {
                // this.onDragEnd(event);
            }
            else {
                this.onClickEnd(position);
            }
            this.isSlide = false;
            this.isDrag = false;
        };
        PkAni.prototype.onTouchStart = function (event) {
            var target = event.target;
            var position = target.convertToNodeSpace(target.getTouchBeganPosition());
            // cc.log('onTouchStart:', position);
            this.startPoint = position;
            this.isSlide = false;
            this.isDrag = false;
            return true;
        };
        PkAni.prototype.onTouchMove = function (event) {
            var target = event.target;
            var position = target.convertToNodeSpace(target.getTouchMovePosition());
            // cc.log('onTouchMove:', position);
            if (this.onCardMoving(position)) {
            }
            else if (this.isSlide) {
                this.onSlideIng(position);
            }
            else if (this.isDrag) {
                // this.onDragIng(e);
            }
            else {
                if (Math.abs(position.x - this.startPoint.x) > 1 && Math.abs(position.y - this.startPoint.y) < 1000) {
                    this.isSlide = true;
                    this.onSlideStart(position);
                }
                // if (Math.abs(e.getLocation().y - e.getStartLocation().y) > 20) {
                //     if (this.isLock) { return; }
                //     this.isDrag = true;
                //     this.onDragStart(e);
                // }
            }
        };
        PkAni.prototype.setLock = function (v) {
            this.isLock = v;
        };
        PkAni.prototype.onClickEnd = function (position) {
            var index = this.handRow.hitCards(position);
            //console.log('点击' , index);
            if (index < 0) {
                this.handRow.setAllNoSelect();
                this.emitOutCard();
                return;
            }
            if (!this.handRow.getCardByIndex(index)) {
                return;
            }
            ;
            this.handRow.setCardSelect(index, !this.handRow.getCardByIndex(index).isSelecte());
            if (this.handRow.getCardByIndex(index).isSelecte()) {
                this.handRow.openCard(index);
                this.emitOutCard();
            }
            else {
                var isSelArr = [];
                var selectNUm = 0;
                for (var i = 0; i < this.handRow.childrenCount; i++) {
                    isSelArr.push(this.handRow.getCardByIndex(i).isSelecte());
                    if (this.handRow.getCardByIndex(i).isSelecte()) {
                        selectNUm++;
                    }
                }
                cc.log('选中:', selectNUm);
                this.handRow.setNums(this.handRow.getNums());
                for (var i = 0; i < this.handRow.childrenCount; i++) {
                    this.handRow.setCardSelect(i, isSelArr[i]);
                }
                this.emitOutCard();
            }
        };
        PkAni.prototype.onSlideStart = function (position) {
            var index = this.handRow.hitCards(position);
            if (index < 0) {
                return;
            }
            this.seleteStartIndex = index;
            this.seletecards = [index];
        };
        PkAni.prototype.onSlideIng = function (position) {
            if (this.seleteStartIndex < 0) {
                return;
            }
            var index = this.handRow.hitCards(position);
            if (index < 0) {
                return;
            }
            this.seleteEndIndex = index;
            var count = Math.abs(this.seleteStartIndex - index);
            var left = this.seleteStartIndex - index > 0;
            this.seletecards = [this.seleteStartIndex];
            for (var i = 1; i <= count; i++) {
                this.seletecards.push(this.seleteStartIndex + (left ? i * -1 : i));
            }
            this.handRow.setPreSel(this.seletecards);
        };
        PkAni.prototype.onSlideEnd = function (position) {
            this.seleteStartIndex = this.seleteEndIndex = -1;
            this.isSlide = false;
            if (!this.seletecards) {
                return;
            }
            for (var x in this.seletecards) {
                if (!this.handRow.getCardByIndex(this.seletecards[x]))
                    return;
                this.handRow.setCardSelect(this.seletecards[x], !this.handRow.getCardByIndex(this.seletecards[x]).isSelecte());
            }
            this.seletecards = null;
            this.handRow.setPreSel([]);
            this.emitOutCard();
        };
        PkAni.prototype.onCardMoving = function (position) {
            //187=手牌高度-handCardPanel向下偏移31
            if (position.y > 187 && Math.abs(position.y - this.startPoint.y) > 20 && !this.moveRow && this.node.getParent()) {
                var cardVec = this.handRow.getPreAndSelectCards();
                if (cardVec.length <= 0) {
                    return false;
                }
                //隐藏手牌
                this.handRow.setPreAndSelectCardsVisible(false);
                //创建拖动的牌
                this.moveRow = this.getCardRow();
                this.moveRow.setAnchorPoint(1, 0);
                this.moveRow.setScale(0.5);
                this.moveRow.setNums(cardVec);
                //拖动的牌层级需要在最上层
                this.node.getParent().addChild(this.moveRow);
            }
            if (!!this.moveRow) {
                this.moveRow.setPosition(position);
                this.moveRow.setPosition(position.x - this.moveRow.getContentSize().width * 0.5 * this.moveRow.getScaleX(), position.y);
                return true;
            }
            return false;
        };
        PkAni.prototype.onCardMoveEnd = function (position) {
            //拖动牌高度=手牌高度*缩放0.5
            //242=手牌高度-handCardPanel向下偏移31+拖动牌高度/2
            if (!!this.moveRow) {
                if (position.y > 242) {
                    var cardVec = this.handRow.getPreAndSelectCards();
                    this.emitMoveCard(cardVec);
                }
                //显示手牌
                this.handRow.setPreAndSelectCardsVisible(true);
                //释放拖动的牌
                this.moveRow.setNums([]);
                this.moveRow.removeFromParent(true);
                this.moveRow = null;
            }
        };
        PkAni.prototype.emitOutCard = function () {
            //出牌
            kaayou.emit("common", "SelCard");
        };
        PkAni.prototype.emitMoveCard = function (vec) {
            //出牌
            kaayou.emit("common", "MoveCard", { moveCard: vec });
        };
        return PkAni;
    }());
    common.PkAni = PkAni;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var CardTag;
    (function (CardTag) {
        CardTag[CardTag["TAG_CHICKEN_LOGO"] = 1] = "TAG_CHICKEN_LOGO";
        CardTag[CardTag["TAG_LAI_LOGO"] = 2] = "TAG_LAI_LOGO";
        CardTag[CardTag["TAG_TEAMCARDMASK"] = 3] = "TAG_TEAMCARDMASK";
    })(CardTag = common.CardTag || (common.CardTag = {}));
    var PkCard = /** @class */ (function (_super) {
        __extends(PkCard, _super);
        function PkCard() {
            var _this = _super.call(this) || this;
            _this._innerNum = -1;
            _this._cardType = "PokerBigCard01_";
            _this._cardSize = cc.rect(0, 0, 138, 192);
            //初始化界面
            _this.initUI();
            return _this;
        }
        PkCard.prototype.getInnerNum = function () {
            return this._innerNum;
        };
        PkCard.prototype.setInnerNum = function (value) {
            if (this._innerNum != value) {
                this._innerNum = value;
                this.changeCard();
            }
        };
        PkCard.prototype.unuse = function () {
            this.initUI();
            this.removeFromParent();
        };
        PkCard.prototype.initUI = function () {
            this.setPreSelecte(false);
            this._innerNum = -1;
            this.reset();
        };
        PkCard.prototype.reset = function () {
            this._innerNum = -1;
            this.changeCard();
            this.width = this._cardSize.width;
            this.height = this._cardSize.height;
            this.setPreSelecte(false);
            this.setSelecte(false);
            this.setPositionY(0);
            this.setScale(1);
            this.opacity = 255;
        };
        PkCard.prototype.setColro = function (col) {
            this.color = col;
        };
        PkCard.prototype.changeCard = function () {
            this.changeInner();
            this.width = this._cardSize.width;
            this.height = this._cardSize.height;
        };
        PkCard.prototype.changeInner = function () {
            var cardTex = "";
            this.visible = true;
            if (this._innerNum < 0 || this._innerNum > 55) { //错误牌
                this.visible = false;
                return;
            }
            else if (this._innerNum < 1) { //背牌
                cardTex = "e07.png";
            }
            else if (this._innerNum == 53) { //小王
                cardTex = "e01.png";
            }
            else if (this._innerNum == 54) {
                cardTex = "e02.png";
            }
            else if (this._innerNum == 55) {
                cardTex = "e03.png";
            }
            else {
                var tempNUm = this._innerNum - 1;
                var huaPt = Math.floor(tempNUm / 13);
                if (huaPt < 0 || huaPt > 3) { //错误牌
                    this.visible = false;
                    return;
                }
                var hua = PkCard.HuaMap[huaPt];
                var numPt = tempNUm % 13;
                numPt++;
                var num = numPt < 10 ? '0' + numPt.toString() : numPt.toString();
                cardTex = "" + hua + num + ".png";
            }
            cardTex = this._cardType + cardTex;
            //console.log("显示扑克" + this._innerNum + ":" + cardTex);
            this.loadTexture(cardTex, ccui.Widget.PLIST_TEXTURE);
        };
        PkCard.prototype.setSelecte = function (v) {
            this['isSel'] = v;
        };
        PkCard.prototype.isSelecte = function () {
            return this['isSel'] || false;
        };
        //获取是否选中
        PkCard.prototype.setPreSelecte = function (v) {
            this['isPreSel'] = v;
            if (v) {
                this.setColro(cc.color(125, 125, 125));
            }
            else {
                this.setColro(cc.color(255, 255, 255));
            }
        };
        PkCard.prototype.isPreSelecte = function () {
            return this['isPreSel'] || false;
        };
        PkCard.prototype.setChickenLogoVisible = function (visible) {
            var sp = this.getChildByTag(CardTag.TAG_CHICKEN_LOGO);
            if (sp == null && visible) {
                sp = new cc.Sprite();
                sp.initWithSpriteFrameName(this._cardType + "mask.png");
                if (sp) {
                    sp.setAnchorPoint(0, 0);
                    sp.setPosition(0, 0);
                    this.addChild(sp, CardTag.TAG_CHICKEN_LOGO, CardTag.TAG_CHICKEN_LOGO);
                }
            }
            if (sp) {
                sp.setVisible(visible);
            }
        };
        PkCard.prototype.setLaiLogoVisible = function (visible) {
            var sp = this.getChildByTag(CardTag.TAG_LAI_LOGO);
            if (sp == null && visible) {
                sp = new cc.Sprite();
                sp.initWithSpriteFrameName("DG.logoLai.png");
                if (sp) {
                    sp.setAnchorPoint(0.5, 0.5);
                    sp.setPosition(24, 62);
                    this.addChild(sp, CardTag.TAG_LAI_LOGO, CardTag.TAG_LAI_LOGO);
                }
            }
            if (sp) {
                sp.setVisible(visible);
            }
        };
        PkCard.HuaMap = ['a', 'b', 'c', 'd', 'e'];
        return PkCard;
    }(kaayou.ImageView));
    common.PkCard = PkCard;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var PkRow = /** @class */ (function (_super) {
        __extends(PkRow, _super);
        function PkRow() {
            var _this = _super.call(this) || this;
            _this._chickennum = 0;
            _this._lainum = 0;
            _this._isteamcard = false;
            _this.allWidth = 0;
            _this._nums = null;
            _this.cardWidth = 0;
            _this.cardHeight = 0;
            _this.difx = 0;
            //初始化界面
            _this._chickennum = -1;
            _this._lainum = -1;
            _this._isteamcard = false;
            _this['isTouch'] = true;
            return _this;
        }
        PkRow.prototype.cleanUp = function () {
            this._chickennum = 0;
            this._isteamcard = false;
            this.setNums([]);
        };
        PkRow.prototype.setChicken = function (_num) {
            this._chickennum = _num;
        };
        PkRow.prototype.setLai = function (_num) {
            this._lainum = _num;
        };
        PkRow.prototype.setIsTeamCard = function (b) {
            this._isteamcard = b;
        };
        PkRow.prototype.setNums = function (nums) {
            this._nums = nums;
            kaayou.pool.putAllChildrenInPool(this);
            if (this._nums.length < 1) {
                return;
            }
            //let cardWidth = this.cardWidth;
            //let cardHeight = this.cardHeight;
            for (var x in nums) {
                var card = this.createCard(Number(nums[x]));
                this.cardWidth = card.width;
                this.cardHeight = card.height;
                this.addChild(card);
            }
            //手牌右边可以超出
            this.difx = (cc.director.getWinSize().width + 60 - this.cardWidth) / ((this._nums.length - 1) * this.cardWidth);
            this.difx = this.difx > 0.35 ? 0.35 : this.difx;
            var allWidth = (this._nums.length - 1) * this.cardWidth * this.difx + this.cardWidth;
            this.allWidth = allWidth;
            this.width = allWidth;
            this.height = this.cardHeight;
            var offset = allWidth * (-this.anchorX) + this.cardWidth * this.difx * (1 + this.children[0].anchorX); //(allWidth / 2 - cardWidth / 2) * -1;
            // if (this.anchorX == 0) {
            //     offset = cardWidth * this.difx * 1.5;
            // }
            // if (this.anchorX == 1) {
            //     offset = allWidth * -1 + cardWidth * this.difx * 1.5;
            // }
            for (var x in this.children) {
                this.children[x].x = offset;
                this.children[x].y = this.cardHeight * (this.children[x].anchorY - this.anchorY);
                this.children[x]["originY"] = this.children[x].y;
                this.children[x].zIndex = Number(x);
                offset += this.cardWidth * this.difx;
            }
        };
        PkRow.prototype.getNums = function () {
            return this._nums;
        };
        //获取点数
        PkRow.prototype.getPoint = function (num) {
            var tempNUm = num - 1;
            var numPt = tempNUm % 13;
            numPt++;
            return numPt;
        };
        PkRow.prototype.dealCard = function (nums, call) {
            if (call === void 0) { call = null; }
            this.setNums(nums);
            if (this.children.length < 1) {
                return;
            }
            for (var x in this.children) {
                var offset = this.children[x].x;
                this.children[x].x = 0;
                // this.children[x].stopAllActions();
                this.children[x].runAction(cc.moveTo(0.5, offset, this.children[x]["originY"]));
            }
            if (call) {
                //TODO this.scheduleOnce(call,0.5);
            }
        };
        PkRow.prototype.dealCard2 = function (nums) {
            // this._nums = nums;
            var i = 0;
            var self = this;
            var func = function () {
                self.setNums(nums.slice(0, i));
                i++;
                if (i > nums.length) {
                    return;
                }
                setTimeout(function () {
                    func();
                }, 100);
            };
            func();
        };
        PkRow.prototype.setPreSel = function (indexs) {
            for (var x in this.children) {
                if (indexs.indexOf(Number(x)) > -1) {
                    var card = this.children[x];
                    card.setPreSelecte(true);
                }
                else {
                    var card = this.children[x];
                    card.setPreSelecte(false);
                }
            }
        };
        PkRow.prototype.getSelectCards = function () {
            var arr = [];
            for (var x in this.children) {
                var card = this.children[x];
                if (card.isSelecte()) {
                    arr.push(card.getInnerNum());
                }
            }
            return arr;
        };
        PkRow.prototype.getSelectCardIndex = function () {
            var arr = [];
            for (var x in this.children) {
                var card = this.children[x];
                if (card.isSelecte()) {
                    arr.push(Number(x));
                }
            }
            return arr;
        };
        PkRow.prototype.getPreAndSelectCards = function () {
            var arr = [];
            for (var x in this.children) {
                var card = this.children[x];
                if (card.isSelecte() || card.isPreSelecte()) {
                    arr.push(card.getInnerNum());
                }
            }
            return arr;
        };
        PkRow.prototype.setPreAndSelectCardsVisible = function (b) {
            for (var x in this.children) {
                var card = this.children[x];
                if (card.isSelecte() || card.isPreSelecte()) {
                    card.setVisible(b);
                }
            }
        };
        PkRow.prototype.hitCards = function (pos) {
            if (!cc.rectContainsPoint(this.getBoundingBoxToWorld(), pos)) {
                return -1;
            }
            // for (var x in this.children) {
            //     let rect = this.children[x].getBoundingBoxToWorld();
            //     if (Number(x) < this.children.length - 1) {
            //         rect.width -= rect.width * 0.66;
            //     }
            //     if (true == this.children[x].visible && cc.rectContainsPoint(rect, pos)) {
            //         return Number(x);
            //     }
            // }
            for (var x = this.children.length - 1; x >= 0; x--) {
                var rect = this.children[x].getBoundingBoxToWorld();
                if (true == this.children[x].visible && cc.rectContainsPoint(rect, pos)) {
                    return Number(x);
                }
            }
            return -1;
        };
        PkRow.prototype.openCard = function (index) {
            var nums = this.getNums().length;
            if (nums <= 18)
                return;
            var acount = 0;
            for (var i = 0; i < nums; i++) {
                if (Math.abs(index - i) <= 2) {
                    acount++;
                }
            }
            if (index >= nums - 3) {
                acount--;
            }
            var allWidth = this.allWidth;
            var difxnum = this.difx;
            var offset = (allWidth / 2 - this.cardWidth / 2) * -1;
            cc.log('acount ', allWidth, acount);
            //putong pai jianju
            var newdifxnum = (allWidth - this.cardWidth - (acount * this.cardWidth * 1.6 * difxnum)) / ((nums - 1 - acount) * this.cardWidth);
            newdifxnum = newdifxnum > 0.35 ? 0.35 : newdifxnum;
            var aa = this.cardWidth + (nums - 1 - acount) * this.cardWidth * newdifxnum + acount * this.cardWidth * difxnum * 1.6;
            cc.log('acount', aa, difxnum);
            for (var i = 0; i < nums; i++) {
                var card = this.children[i];
                var originY = card["originY"];
                if (card.isSelecte()) {
                    card.runAction(cc.moveTo(0.1, cc.p(offset, originY + 30)));
                }
                else {
                    card.runAction(cc.moveTo(0.1, cc.p(offset, originY)));
                }
                if (Math.abs(index - i) <= 2) {
                    offset += this.cardWidth * difxnum * 1.6;
                }
                else {
                    offset += this.cardWidth * newdifxnum;
                }
            }
        };
        PkRow.prototype.setCardSelect = function (index, v) {
            if (v === void 0) { v = false; }
            this.children[index].setSelecte(v);
            this.children[index].setPositionY(v ? this.children[index]["originY"] + 30 : this.children[index]["originY"]);
        };
        PkRow.prototype.setAllNoSelect = function () {
            this.setNums(this._nums);
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].setSelecte(false);
                this.children[i].setPositionY(this.children[i]["originY"]);
            }
        };
        PkRow.prototype.getCardByIndex = function (index) {
            if (!this.children[index])
                return null;
            return this.children[index];
        };
        return PkRow;
    }(kaayou.Layer));
    common.PkRow = PkRow;
})(common || (common = {}));
var common;
(function (common) {
    var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
    var PkSmallRow = /** @class */ (function (_super) {
        __extends(PkSmallRow, _super);
        function PkSmallRow() {
            var _this = _super.call(this) || this;
            _this._chickennum = 0;
            _this._nums = null;
            _this._maxColNum = 0; //一行最多放多少张牌
            _this._cardType = "PokerSmallCard02_";
            _this._horizontal = ccui.Layout.LayoutHorizontal.LEFT;
            _this._maxColNum = 20;
            //初始化界面
            _this.cleanUp();
            return _this;
        }
        PkSmallRow.prototype.cleanUp = function () {
            this.setNums([]);
            this._chickennum = 0;
        };
        PkSmallRow.prototype.setChicken = function (_num) {
            this._chickennum = _num;
        };
        PkSmallRow.prototype.setMaxColNum = function (n) {
            this._maxColNum = n;
        };
        PkSmallRow.prototype.setSortType = function (v) {
            this._horizontal = v;
        };
        PkSmallRow.prototype.setNums = function (nums) {
            this._nums = nums;
            this.removeAllChildren(true);
            if (this._nums.length < 1) {
                return;
            }
            for (var x in nums) {
                var smallCard = this.createCard(nums[x]);
                this.addChild(smallCard);
                if (this._chickennum && nums[x] == this._chickennum) {
                    var spChick = ccui.ImageView.create(this._cardType + "mask.png", ccui.Widget.PLIST_TEXTURE);
                    spChick.setAnchorPoint(0, 0);
                    spChick.setPosition(0, 0);
                    smallCard.addChild(spChick);
                }
            }
            this.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
            this.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
            this.setPadding({ spacingX: -4 });
            this.setHorizontal(this._horizontal);
            this.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.setGridColumn(this._maxColNum);
            this.doChildrenLayout();
        };
        PkSmallRow.prototype.createCard = function (cardnum) {
            var cardTex = "";
            this.visible = true;
            if (cardnum < 0 || cardnum > 55) { //错误牌
                this.visible = false;
                return;
            }
            else if (cardnum < 1) { //背牌
                cardTex = "e07.png";
            }
            else if (cardnum == 53) { //小王
                cardTex = "e01.png";
            }
            else if (cardnum == 54) {
                cardTex = "e02.png";
            }
            else if (cardnum == 55) {
                cardTex = "e03.png";
            }
            else {
                var tempNUm = cardnum - 1;
                var huaPt = Math.floor(tempNUm / 13);
                if (huaPt < 0 || huaPt > 3) { //错误牌
                    this.visible = false;
                    return;
                }
                var hua = PkSmallRow.HuaMap[huaPt];
                var numPt = tempNUm % 13;
                numPt++;
                var num = numPt < 10 ? '0' + numPt.toString() : numPt.toString();
                cardTex = "" + hua + num + ".png";
            }
            cardTex = this._cardType + cardTex;
            return ccui.ImageView.create(cardTex, ccui.Widget.PLIST_TEXTURE);
        };
        PkSmallRow.HuaMap = ['a', 'b', 'c', 'd', 'e'];
        return PkSmallRow;
    }(kaayou.Block));
    common.PkSmallRow = PkSmallRow;
})(common || (common = {}));
var common;
(function (common) {
    var PlayerLayer = /** @class */ (function (_super) {
        __extends(PlayerLayer, _super);
        function PlayerLayer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._index = 0;
            //基本信息
            _this.headPanel = null;
            _this.headImage = null;
            _this.nameText = null;
            _this.scoreText = null;
            _this.offlineImage = null;
            _this.zhuangImage = null;
            //聊天
            _this.textChatNode = null;
            _this.iconChatNode = null;
            _this.soundChatNode = null;
            _this.gvoicingImage = null;
            _this.gvoiceBorbidImage = null;
            _this.readyTagImage = null;
            _this.warningNode = null;
            _this.clock = null;
            _this.clockTime = 0;
            _this.fleeTime = null;
            return _this;
        }
        PlayerLayer.prototype.cleanUp = function () {
            this.setoffline(false);
            this.setZhuang(false);
            this.setReadyTag(false);
            this.setClock(-1);
            //聊天
            if (this.textChatNode)
                this.textChatNode.setVisible(false);
            if (this.iconChatNode)
                this.iconChatNode.setVisible(false);
            if (this.soundChatNode)
                this.soundChatNode.setVisible(false);
            if (this.gvoicingImage)
                this.gvoicingImage.setVisible(false);
            if (this.gvoiceBorbidImage)
                this.gvoiceBorbidImage.setVisible(false);
        };
        PlayerLayer.prototype.getIndex = function () {
            return this._index;
        };
        PlayerLayer.prototype.setIndex = function (value) {
            if (this._index != value) {
                this._index = value;
                //this.changeAllLayout();
            }
        };
        PlayerLayer.prototype.setPlayerHead = function (_url, sex, uid) {
            var headImgSp = null;
            if (this.headImage.getChildren().length < 1) {
                headImgSp = new cc.Sprite();
                headImgSp.setVisible(false);
                this.headImage.addChild(headImgSp);
            }
            else {
                headImgSp = this.headImage.getChildren()[0];
                //如果头像地址未变化，原头像还是显示
                headImgSp.setVisible(_url == headImgSp['_url']);
            }
            if (_url && !lodash.isEmpty(_url)) {
                (function (sp, _layouts) {
                    if (!sp) {
                        return;
                    }
                    if (!_layouts) {
                        return;
                    }
                    NetImage.loadImage(_url).then(function (tex) {
                        if (!sp.isRunning() || !_layouts.isRunning()) {
                            return;
                        }
                        sp.initWithTexture(tex);
                        NetImage.doSpriteContentSizeAndPosition(sp, _layouts.getContentSize());
                        sp.setVisible(true);
                        sp['_url'] = _url;
                    });
                })(headImgSp, this.headImage);
            }
            else {
                headImgSp.initWithSpriteFrameName(sex == 1 ? "nan.png" : "nv.png");
                NetImage.doSpriteContentSizeAndPosition(headImgSp, this.headImage.getContentSize());
                headImgSp.setVisible(true);
                headImgSp['_url'] = _url;
            }
        };
        PlayerLayer.prototype.setPlayerName = function (name) {
            if (!this.nameText) {
                return;
            }
            var tempNickName = kaayou.Identify.nickNameSubFour(name);
            this.nameText.setString(tempNickName);
            this.nameText.ignoreContentAdaptWithSize(true);
        };
        PlayerLayer.prototype.setScore = function (score) {
            if (!this.scoreText) {
                return;
            }
            this.scoreText.string = kaayou.Identify.changeScoreToSortString(score);
        };
        PlayerLayer.prototype.setoffline = function (b) {
            if (!this.offlineImage) {
                return;
            }
            this.offlineImage.visible = b;
        };
        PlayerLayer.prototype.setZhuang = function (b) {
            if (!this.zhuangImage) {
                return;
            }
            this.zhuangImage.visible = b;
        };
        //设置是否显示准备
        PlayerLayer.prototype.setReadyTag = function (b) {
            if (!this.readyTagImage) {
                return;
            }
            this.readyTagImage.visible = b;
        };
        //设置闹钟坐标，pos为世界坐标
        PlayerLayer.prototype.setClockPosition = function (pos) {
            if (!this.clock) {
                return;
            }
            var localPos = this.convertToNodeSpace(pos);
            this.clock.setPosition(localPos.x, localPos.y);
        };
        PlayerLayer.prototype.setClock = function (time) {
            if (!this.clock) {
                return;
            }
            if (time <= 0) {
                this.clock.visible = false;
                this.clockTime = 0;
                this.unschedule(this.onUpdateTime);
                return;
            }
            this.clock.visible = true;
            this.clockTime = Math.floor(new Date().getTime()) + time * 1000 - 1;
            this.unschedule(this.onUpdateTime);
            this.schedule(this.onUpdateTime, 0.5);
            this.onUpdateTime();
        };
        PlayerLayer.prototype.onUpdateTime = function () {
            var curtime = (this.clockTime - Math.floor(new Date().getTime())) / 1000;
            if (this.getIndex() == 0 && curtime >= 3.5 && curtime < 4.0) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Clock);
            }
            curtime = Math.floor(curtime);
            this.setTimeLabel(curtime);
            if (curtime < 0) {
                this.clock.visible = false;
                this.clockTime = 0;
                this.unschedule(this.onUpdateTime);
            }
            else {
                this.clock.visible = true;
            }
        };
        PlayerLayer.prototype.setTimeLabel = function (time) {
            this.clock.visible = time >= 0;
            var clockText = this.clock.getChildByName('Text_clock');
            clockText.ignoreContentAdaptWithSize(true);
            clockText.string = time.toString();
        };
        PlayerLayer.prototype.setWarning = function (b) {
            if (!this.warningNode) {
                return;
            }
            this.warningNode.visible = b;
        };
        PlayerLayer.prototype.onGVoiceSta = function (sta) {
            if (!this.gvoicingImage) {
                return;
            }
            if (!this.gvoiceBorbidImage) {
                return;
            }
            this.gvoicingImage.visible = sta > 0;
            this.gvoiceBorbidImage.visible = sta == -1;
        };
        return PlayerLayer;
    }(kaayou.Block));
    common.PlayerLayer = PlayerLayer;
    var DG;
    (function (DG) {
        var _a = kaayou._decorator, BindEvent = _a.BindEvent, doBindEvent = _a.doBindEvent;
        var PlayerLayer = /** @class */ (function (_super) {
            __extends(PlayerLayer, _super);
            function PlayerLayer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.youArr = null;
                _this.cardNumNode = null;
                _this.roundScoreNode = null;
                _this.scoreNode = null;
                _this.tuoguanImage = null;
                _this.mingjiImage = null;
                _this.yingpaiImage = null;
                _this.youImage = null;
                //下面几个是玩家是否准备、不出、硬牌与否标记，不是头像上的标记
                _this.passTagImage = null;
                _this.yingpaiTagImage = null;
                _this.buyingTagImage = null;
                return _this;
            }
            PlayerLayer.prototype.cleanUp = function () {
                _super.prototype.cleanUp.call(this);
                //基本标签
                this.setTuoguan(false);
                this.setMingJi(false);
                this.setYingPai(false);
                this.setYingPaiTag(false);
                this.setBuYingTag(false);
                this.setYou(0, false);
                this.setPassTag(false);
            };
            //设置牌剩余张数
            PlayerLayer.prototype.setCardNum = function (num, isPlaying) {
                if (!this.cardNumNode) {
                    return;
                }
                this.cardNumNode.setVisible(isPlaying);
                var remainText = this.cardNumNode.getChildByName('Text_cardCount');
                remainText.ignoreContentAdaptWithSize(true);
                remainText.setString(num.toString());
                if (this._index == 0)
                    this.cardNumNode.setVisible(false);
            };
            PlayerLayer.prototype.setRoundScore = function (visible, score) {
                if (!this.roundScoreNode) {
                    return;
                }
                var roundScoreText = this.roundScoreNode.getChildByName('Text_roundScore');
                if (!roundScoreText) {
                    return;
                }
                roundScoreText.string = "抓分：" + score.toString();
                roundScoreText.ignoreContentAdaptWithSize(true);
                this.roundScoreNode.visible = true;
            };
            PlayerLayer.prototype.setScore = function (score) {
                if (!this.scoreNode) {
                    return;
                }
                var text_Score = this.scoreNode.getChildByName('Text_Score');
                if (!text_Score) {
                    return;
                }
                text_Score.string = "积分：" + score.toString();
                text_Score.ignoreContentAdaptWithSize(true);
                this.scoreNode.visible = true;
            };
            PlayerLayer.prototype.setTuoguan = function (b) {
                if (!this.tuoguanImage) {
                    return;
                }
                this.tuoguanImage.visible = b;
            };
            PlayerLayer.prototype.setMingJi = function (b) {
                if (!this.mingjiImage) {
                    return;
                }
                this.mingjiImage.visible = b;
            };
            //头像上的硬牌标记
            PlayerLayer.prototype.setYingPai = function (b) {
                if (!this.yingpaiImage) {
                    return;
                }
                this.yingpaiImage.visible = b;
            };
            //设置几游显示：youIndex几游，isstart：游戏是否开始
            PlayerLayer.prototype.setYou = function (youIndex, isstart) {
                if (!this.youImage) {
                    return;
                }
                if (youIndex <= 0 || youIndex >= 255 || !isstart) {
                    this.youImage.visible = false;
                    return;
                }
                this.youImage.visible = true;
                this.youImage.loadTexture(this.youArr[youIndex - 1], ccui.Widget.PLIST_TEXTURE);
            };
            PlayerLayer.prototype.setPassTag = function (b) {
                if (!this.passTagImage) {
                    return;
                }
                this.passTagImage.visible = b;
            };
            //硬牌标记，不是头像上的标记
            PlayerLayer.prototype.setYingPaiTag = function (b) {
                if (!this.yingpaiTagImage) {
                    return;
                }
                this.yingpaiTagImage.visible = b;
            };
            PlayerLayer.prototype.setBuYingTag = function (b) {
                if (!this.buyingTagImage) {
                    return;
                }
                this.buyingTagImage.visible = b;
            };
            return PlayerLayer;
        }(common.PlayerLayer));
        DG.PlayerLayer = PlayerLayer;
    })(DG = common.DG || (common.DG = {}));
})(common || (common = {}));
var common;
(function (common) {
    var RDom;
    (function (RDom) {
        var htmlparser2 = require("htmlparser2");
        var css = require("css");
        var pasrseHTML = function (source) {
            return htmlparser2.parseDOM(source);
        };
        var isTextTag = function (node) {
            var children = node.children, type = node.type;
            var types = ["span", "label"];
            if (children.length === 1)
                return children[0].type === "text";
        };
        var isEmptyTag = function (node) {
            var children = node.children, type = node.type, attribs = node.attribs;
            var types = ["div", "p", "label", "span", "b", "strong"];
            if (isTextTag(node) && attribs === undefined)
                return (node.children[0].data.trim()).length === 0;
            if (children.length === 0 && (types.indexOf(type) !== -1) && attribs === undefined)
                return true;
            return false;
        };
        var isCSSTag = function (node) {
            var type = node.type;
            if (type === "style")
                return true;
            return false;
        };
        var perpareNode = function (node, sheet, extra, parent) {
            if (parent === void 0) { parent = new RDom.bNode; }
            //取根节点
            if (node.children)
                node.children.forEach(function (v) {
                    if ((v.type === "text" || isCSSTag(v) || isEmptyTag(v)) == false) {
                        var kid = new RDom.bNode;
                        kid.HNode = v;
                        parent.addNode(kid);
                        lodash.extend(kid.$style, RDom.conbineStyle(kid, sheet));
                        perpareNode(v, sheet, extra, kid);
                    }
                });
            return parent;
        };
        var getChildNode = function (node, out) {
            if (out === void 0) { out = []; }
            node.children.forEach(function (v) {
                getChildNode(v, out);
            });
            if (node.children.length == 0)
                out.push(node);
            return out;
        };
        var mergeChild = function (nodes, extra) {
            var defaultStyle = extra.$default;
            var root = getTop(nodes[0]);
            nodes.forEach(function (v) {
                mergeInnerBox(v);
            });
            mergeOutBox(root);
            function getTop(node) {
                if (node.parent)
                    return getTop(node.parent);
                return node;
            }
            function mergeInnerBox(node) {
                if (node.parent) {
                    var style = lodash.extend({}, defaultStyle, node.parent.$style);
                    if (style.display === "inline-block")
                        node.parent.layout = RDom.layout.col;
                    else if (style.display === "block")
                        node.parent.layout = RDom.layout.row;
                    node.parent.updateBondingBox();
                    node.parent._bondingbox.margin(parseInt(style["margin-top"]) ^ 0, parseInt(style["margin-right"]) ^ 0, parseInt(style["margin-bottom"]) ^ 0, parseInt(style["margin-left"]) ^ 0);
                    mergeInnerBox(node.parent);
                }
            }
            //由于默认root 所以从0开始
            function mergeOutBox(node) {
                var outbox = node._bondingbox.outbox;
                node.children.forEach(function (v) {
                    var _b = outbox.AA, x = _b.x, y = _b.y;
                    v._bondingbox.setPosition(x, y);
                    mergeOutBox(v);
                });
            }
        };
        /**
         *
         * @param source HTML文本
         * @param sheet 样式表对象
         * @param extra 组件说明
         * examples{
         *
         *      checkbox:{width , height , text}
         *      number:{widht , height ...,text}
         *
         * }
         *
         * text需要一个单独计算的方法
         */
        //宽高从哪拿？？？？？
        //1 通过TYPE从extra拿到大小，然后拿文本宽度高度计算出整个组件大小
        //2 只认样式表，如果没样式表默认为宽高为0,建立NET结构之后反推
        RDom.combine = function (source, extra) {
            var html = pasrseHTML("<root>" + source + "</root>")[0];
            var csses = RDom.CSSInHTMLNode(html);
            //渲染出全部节点的样式
            var root = perpareNode(html, csses, extra);
            var defaultStyle = extra.$default || {};
            var child = getChildNode(root);
            child.forEach(function (v) {
                var _attr = v.HNode.attribs || {};
                _attr = lodash.extend({ type: v.HNode.name }, _attr);
                var type = _attr.type;
                var style = lodash.extend({}, defaultStyle, v.$style);
                var size = lodash.extend({}, extra[type], style);
                v._bondingbox.resize(parseInt(size.width) ^ 0, parseInt(size.height) ^ 0);
                v._bondingbox.margin(parseInt(style["margin-top"]) ^ 0, parseInt(style["margin-right"]) ^ 0, parseInt(style["margin-bottom"]) ^ 0, parseInt(style["margin-left"]) ^ 0);
                if (style.display === "inline-block")
                    v.layout = RDom.layout.col;
                else if (style.display === "block")
                    v.layout = RDom.layout.row;
                v.parent.updateBondingBox();
            });
            mergeChild(child, extra);
            var q = RDom.queryClassSelector(child);
            return root.children;
        };
        RDom.queryClassSelector = function (all) {
            var mp = new RDom.boxMap;
            var table = {};
            var lookup = {};
            var queryLookup = {};
            var getAllNode = function (node, out) {
                if (out === void 0) { out = []; }
                //最顶
                if (node.HNode !== undefined && (node.parent !== null && node.parent.HNode !== undefined))
                    return getAllNode(node.parent);
                applyKid(node);
                return out;
                function applyKid(node) {
                    if (node.HNode)
                        out.push(node);
                    node.children.forEach(function (v) {
                        applyKid(v);
                    });
                }
            };
            var findAllClass = function (node) {
                var attr = node.HNode.attribs || {};
                if (attr.class === undefined)
                    return null;
                return klass(node);
                function klass(node, out) {
                    if (out === void 0) { out = []; }
                    if (node.HNode === undefined)
                        return out.reverse();
                    var _a = node.HNode.attribs || {};
                    if (_a.class !== undefined)
                        out.push(_a.class);
                    if (node.parent)
                        return klass(node.parent, out);
                    return out.reverse();
                }
            };
            var buidMap = function (path, scopes) {
                if (path.length === 0) {
                    return scopes;
                }
                var ps = path.shift();
                var ways = oneWay(ps);
                return buidMap(path, ways);
                function oneWay(str) {
                    var cut = str.split(/\s+/);
                    var out = [];
                    scopes.forEach(function (scope) {
                        cut.forEach(function (v) {
                            scope[v] = scope[v] || {};
                            out.push(scope[v]);
                        });
                    });
                    return out;
                }
            };
            var GetParents = function (nodes) {
                var out = [];
                nodes.forEach(function (v) {
                    var p = papa(v);
                    if (out.indexOf(p) == -1)
                        out.push(p);
                });
                return out;
                function papa(node) {
                    if (node.HNode !== undefined && (node.parent !== null && node.parent.HNode !== undefined))
                        return papa(node.parent);
                    return node;
                }
            };
            var query = function (cmd) {
                var out = [];
                var cut = cmd.split(/\s+/);
                return out;
            };
            GetParents(all).forEach(function (node) {
                getAllNode(node).forEach(function (ns) {
                    mp.push(ns);
                    var kls = findAllClass(ns).map(function (v) { return "." + v; });
                    var tmp = [];
                    kls.shift()
                        .split(/\s+/)
                        .forEach(function (start) {
                        table[start] = (table[start] || {});
                        tmp.push(table[start]);
                    });
                    var res = buidMap(kls, tmp);
                    res.forEach(function (v) {
                        v.item = v.item || [];
                        if (ns.cid !== undefined && lookup[ns.cid] === undefined) {
                            v.item.push(ns.cid);
                            lookup[ns.cid] = true;
                        }
                    });
                });
            });
            //查询从后向前
            //类似坏匹配
            return function (cmd) {
                // let path  = query.split(/\s+/);
                // let res = table[path[0]];
                var res = query(cmd);
                return res.item.map(function (v) { return mp.searchByID(v); }) || null;
            };
        };
    })(RDom = common.RDom || (common.RDom = {}));
})(common || (common = {}));
var common;
(function (common) {
    var RDom;
    (function (RDom) {
        var BBonding = /** @class */ (function () {
            function BBonding() {
                this.inbox = null;
                this.outbox = null;
                this.width = 0;
                this.height = 0;
                this.offsetLeft = 0;
                this.offsetRight = 0;
                this.offsetTop = 0;
                this.offsetBottom = 0;
                this.inbox = {
                    AA: { x: 0, y: 0 },
                    BB: { x: 0, y: 0 }
                };
                this.outbox = {
                    AA: { x: 0, y: 0 },
                    BB: { x: 0, y: 0 }
                };
            }
            BBonding.prototype.setPosition = function (x, y) {
                var _a = this, outbox = _a.outbox, inbox = _a.inbox;
                outbox.AA.x = x + inbox.AA.x;
                outbox.AA.y = y + inbox.AA.y;
                outbox.BB.x = outbox.AA.x + this.width;
                outbox.BB.y = outbox.AA.y + this.height;
            };
            BBonding.prototype.init = function () {
                this.inbox = {
                    AA: { x: 0, y: 0 },
                    BB: { x: 0, y: 0 }
                };
                this.outbox = {
                    AA: { x: 0, y: 0 },
                    BB: { x: 0, y: 0 }
                };
                this.width = 0;
                this.height = 0;
                this.offsetLeft = 0;
                this.offsetRight = 0;
                this.offsetTop = 0;
                this.offsetBottom = 0;
            };
            BBonding.prototype.moveBox = function (x, y) {
                if (x === void 0) { x = this.inbox.AA.x; }
                if (y === void 0) { y = this.inbox.AA.y; }
                var _a = this.inbox, AA = _a.AA, BB = _a.BB;
                AA.x = x;
                AA.y = y;
                BB.x = AA.x + this.width;
                BB.y = AA.y + this.height;
            };
            BBonding.prototype.margin = function (top, right, bottom, left) {
                if (top === void 0) { top = 0; }
                if (right === void 0) { right = 0; }
                if (bottom === void 0) { bottom = 0; }
                if (left === void 0) { left = 0; }
                this.offsetLeft = left;
                this.offsetRight = right;
                this.offsetTop = top;
                this.offsetBottom = bottom;
                var inbox = this.inbox;
                inbox.AA.x = left;
                inbox.AA.y = top;
                inbox.BB.x = left + this.width;
                inbox.BB.y = top + this.height;
            };
            BBonding.prototype.resize = function (width, height) {
                var _a = this, AA = _a.inbox.AA, inbox = _a.inbox;
                inbox.BB.x = AA.x + width;
                inbox.BB.y = AA.y + height;
                this.width = width;
                this.height = height;
            };
            return BBonding;
        }());
        RDom.BBonding = BBonding;
        var bNode = /** @class */ (function () {
            function bNode(o) {
                if (o === void 0) { o = {}; }
                this.cid = null;
                this.prevNode = null;
                this.nextNode = null;
                this.children = [];
                this.$style = {};
                this.parent = null;
                //没强制设置宽度则默认为父容器的最大宽度
                this.expand = true;
                this._bondingbox = null;
                this.layout = RDom.layout.row;
                var children = o.children, _a = o.parent, parent = _a === void 0 ? null : _a;
                this.children = children || this.children;
                this.parent = parent;
                this._bondingbox = new BBonding;
            }
            bNode.prototype.bindNode = function (node) {
                this.HNode = node;
            };
            bNode.prototype.resize = function (width, height) {
                this._bondingbox.resize(width, height);
            };
            //扫描子元素
            bNode.prototype.updateBondingBox = function () {
                var _this = this;
                var childs = this.children;
                this._bondingbox.init();
                childs.forEach(function (v) {
                    _this.updateNode(v);
                });
            };
            bNode.prototype.updateNode = function (node) {
                var nodeBox = node._bondingbox;
                var selfBox = this._bondingbox;
                var index = this.children.indexOf(node);
                var prev = this.children[index - 1] || null;
                // let next = this.children[index+1]||null;
                if (prev) {
                    prev.nextNode = node;
                    node.prevNode = prev;
                    var layType = prev.layout;
                    var mx = void 0, my = void 0;
                    //最后的元素为列元素
                    if (RDom.layout.col === layType) {
                        var _a = prev._bondingbox, _b = _a.inbox, AA = _b.AA, BB = _b.BB, width = _a.width, height = _a.height, offsetLeft = _a.offsetLeft, offsetRight = _a.offsetRight, offsetBottom = _a.offsetBottom, offsetTop = _a.offsetTop;
                        //行模式 只计算x轴相关
                        if (RDom.layout.col === node.layout) {
                            //位移到最后子节点的后面
                            nodeBox.moveBox(BB.x + offsetRight + nodeBox.offsetLeft, nodeBox.offsetTop);
                            //计算父级宽度 取最大
                            mx = Math.max(selfBox.width, nodeBox.inbox.AA.x + nodeBox.offsetRight + nodeBox.width);
                            my = Math.max(nodeBox.height + offsetTop + offsetBottom, nodeBox.height);
                        }
                        else if (RDom.layout.row === node.layout) {
                            //位移到最后子节点的下面
                            nodeBox.moveBox(nodeBox.offsetLeft, BB.y + offsetBottom + nodeBox.offsetTop);
                            my = nodeBox.offsetBottom + nodeBox.inbox.BB.y;
                            //计算父级高度，递增
                            mx = Math.max(nodeBox.width + nodeBox.offsetLeft + nodeBox.offsetRight, selfBox.width);
                        }
                        this.resize(mx, my);
                        //最后的元素为行元素   
                    }
                    else if (RDom.layout.row === layType) {
                        var _c = prev._bondingbox, _d = _c.inbox, AA = _d.AA, BB = _d.BB, height = _c.height, offsetBottom = _c.offsetBottom;
                        var marginX = nodeBox.offsetLeft + nodeBox.offsetRight;
                        var mx_1, my_1;
                        //无论如何都会变成0+margin为AA 这里主要计算本身元素的宽度，
                        nodeBox.moveBox(nodeBox.offsetLeft, BB.y + offsetBottom + nodeBox.offsetTop);
                        my_1 = nodeBox.inbox.BB.y + offsetBottom;
                        mx_1 = Math.max(selfBox.width, marginX + nodeBox.width);
                        //列元素 填充高度
                        if (RDom.layout.row === node.layout) {
                            //没有设置宽度
                            if (node.expand)
                                node.resize(mx_1 - marginX, nodeBox.height);
                        }
                        this.resize(mx_1, my_1);
                    }
                    //第一个节点
                }
                else {
                    var width = nodeBox.width, height = nodeBox.height, offsetLeft = nodeBox.offsetLeft, offsetRight = nodeBox.offsetRight, offsetTop = nodeBox.offsetTop, offsetBottom = nodeBox.offsetBottom;
                    var mx = offsetLeft + offsetRight + width;
                    var my = offsetTop + height + offsetBottom;
                    this.resize(mx, my);
                }
            };
            bNode.prototype.addNode = function (node) {
                var nodeBox = node._bondingbox;
                var selfBox = this._bondingbox;
                var last_child = this.children[this.children.length - 1];
                if (last_child) {
                    last_child.nextNode = node;
                    node.prevNode = last_child;
                    var layType = last_child.layout;
                    //最后的元素为列元素
                    if (RDom.layout.col === layType) {
                        var _a = last_child._bondingbox, BB = _a.inbox.BB, offsetRight = _a.offsetRight, offsetBottom = _a.offsetBottom;
                        var mx = void 0, my = void 0;
                        //行模式 只计算x轴相关
                        if (RDom.layout.col === node.layout) {
                            //位移到最后子节点的后面
                            nodeBox.moveBox(BB.x + offsetRight + nodeBox.offsetLeft);
                            mx = nodeBox.inbox.AA.x + nodeBox.offsetRight;
                            //计算父级宽度 取最大
                            mx = Math.max(selfBox.width, mx);
                            my = nodeBox.height;
                        }
                        else if (RDom.layout.row === node.layout) {
                            //位移到最后子节点的下面
                            nodeBox.moveBox(nodeBox.offsetLeft, BB.y + nodeBox.offsetTop);
                            my = nodeBox.offsetBottom + nodeBox.inbox.BB.y;
                            //计算父级高度，递增
                            mx = Math.max(nodeBox.width + nodeBox.offsetLeft + nodeBox.offsetRight, selfBox.width);
                        }
                        this.resize(mx, my);
                        //最后的元素为行元素   
                    }
                    else if (RDom.layout.row === layType) {
                        var _b = last_child._bondingbox, BB = _b.inbox.BB, offsetBottom = _b.offsetBottom;
                        var marginX = nodeBox.offsetLeft + nodeBox.offsetRight;
                        var mx = void 0, my = void 0;
                        //无论如何都会变成0+margin为AA 这里主要计算本身元素的宽度，
                        nodeBox.moveBox(nodeBox.offsetLeft, BB.y + offsetBottom + nodeBox.offsetTop);
                        my = nodeBox.inbox.BB.y + offsetBottom;
                        mx = Math.max(selfBox.width, marginX + nodeBox.width);
                        //列元素 填充高度
                        if (RDom.layout.row === node.layout) {
                            //没有设置宽度
                            if (node.expand)
                                node.resize(mx - marginX, nodeBox.height);
                        }
                        this.resize(mx, my);
                    }
                    //第一个节点
                }
                else {
                    var width = nodeBox.width, height = nodeBox.height, offsetLeft = nodeBox.offsetLeft, offsetRight = nodeBox.offsetRight, offsetTop = nodeBox.offsetTop, offsetBottom = nodeBox.offsetBottom;
                    var mx = offsetLeft + offsetRight + width;
                    var my = offsetTop + height + offsetBottom;
                    this.resize(mx, my);
                }
                //增加node节点
                node.parent = this;
                if (this.children.indexOf(node) == -1)
                    this.children.push(node);
            };
            return bNode;
        }());
        RDom.bNode = bNode;
    })(RDom = common.RDom || (common.RDom = {}));
})(common || (common = {}));
var common;
(function (common) {
    var RDom;
    (function (RDom) {
        var layout;
        (function (layout) {
            layout["row"] = "row";
            layout["col"] = "col";
            layout["abs"] = "abs";
        })(layout = RDom.layout || (RDom.layout = {}));
    })(RDom = common.RDom || (common.RDom = {}));
})(common || (common = {}));
/*
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    const htmlparser2 = require('htmlparser2');
    const cssparse = require('css');

    const boxStyle = {
        display: "block",
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        position: null,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        fontSize: 16
    };
    //转驼峰
    function transformStrToHump(str) {
        var re = /-(\w)/g;
        return str.replace(re, function ($0, $1) {
            return $1.toUpperCase();
        });
    }


    function parseCss(styles) {
        styles = lodash.trim(styles || '');
        if (!styles) return {};
        return styles
            .split(';')
            .reduce(function (obj, str) {
                var n = str.indexOf(':');
                if (n < 1 || n === str.length - 1) return obj;
                let skey = lodash.trim(str.slice(0, n));
                skey = transformStrToHump(skey);
                obj[skey] = lodash.trim(str.slice(n + 1));
                return obj;
            }, {});
    }

    function _solvePath(klass, out) {

        if (out.length === 0)
            return klass.split(/\s+/).forEach(v => {
                out.push(["." + v]);
            });
        let temp = []
        klass.split(/\s+/).forEach(function (v) {

            lodash.forEach(out, (path) => {
                temp.push([].concat("." + v, path))
            })
        })
        lodash.forEach(temp, v => {
            out.push(v);
        })

    }

    function getSheetPath(node, out = undefined, start = undefined) {

        //最上节点
        if (node.parent === null ||
            //如果一开始都没class的 不处理
            lodash.eq(node.attribs, undefined) && lodash.eq(out, undefined) ||
            !lodash.eq(start, undefined) && lodash.eq(start.attribs, undefined) ||
            !lodash.eq(start, undefined) && !lodash.eq(start.attribs, undefined) && lodash.eq(start.attribs.class, undefined))
            return out || [];

        out = out || [];
        start = start || node

        if (lodash.eq(node.attribs, undefined) === false)
            if (!lodash.eq(node.attribs.class, undefined))
                _solvePath(node.attribs.class, out)

        return getSheetPath(node.parent, out, start);

    }


    function getSheetCss(node, sheet): { [key: string]: any } {
        let paths = this.getSheetPath(node);
        let out = {}
        lodash.forEach(paths, v => {
          let css = sheet.apply(this, v) || {};
          lodash.forEach(css.$style || {}, (v, k) => {
            out[transformStrToHump(k)] = v;
          })
        })
        return out;
      }


    export class RLayout extends kaayou.Block {

        _content: string = "";
        private _rect: cc.Rect = null;
        public setContent(content: string) {
            this._content = content;
            this.doParse();
        }


        protected doParse() {
            this._rect = this.getBoundingBox();

        }

        private isNessaryNode(node) {
            let isNotEmptyText = dnode => !lodash.isEmpty(dnode.data) && !lodash.isEmpty(lodash.trim(dnode.data));
            switch (node && node.type) {
                case "checkbox":
                case "radio":
                case "number":
                case "label":
                case "tag":
                case "tip":
                case "richlabel":
                case "p":
                //先增加root。。。
                case "root":
                    return true;
                case "text":
                    return isNotEmptyText(node);
            }
            return false;
        }

        //计算相对盒子 以给定节点为起始
        protected updateAABBBox(node, root, sheet) {

            if (node.children !== undefined && node.children instanceof Array) {
                lodash.forEach(node.children, (n) => {
                    this.updateAABBBox(n, root, sheet)
                })
            }

            // this.updateAABBBox(node,root, true)
            if (!this.isNessaryNode(node))
                return;

            //N叉的最深节点
            let AA = cc.p(0, 0);
            let BB = cc.p(0, 0);
            let at = node._attr = node._attr || {};
            at.inbox = at.inbox || { AA, BB };

            let that = this;
            let rootRect = that._rect;
            let $styleSheets = (node) => parseCss(node.attribs && node.attribs.style || null);
            let css = lodash.extend({}, boxStyle, getSheetCss(node, sheet), $styleSheets(node));
            let attr = node.attribs || { text: "" };
            //如果不换行，marginbottom不做计算
            //外围盒子需做计算
            let { marginLeft, marginTop, marginRight, marginBottom, position, left, top, display } = css;
            let fontSize = parseInt(this.getParentInheritor(node, "fontSize", root) || this.getInheritorSheet(node, "font-size", sheet));
            let lineHeight = this.getParentInheritor(node, "lineHeight", root) || inheritorStyle.lineHeight;

            if (lodash.eq(display, "none"))
                return;


            handleBlock(node, function (ds) {
                display = ds;
            })

            css.fontSize = fontSize || 40
            if (lodash.eq(lineHeight, null) === false)
                css.lineHeight = parseInt(lineHeight);

            let leftBox = this.getPreNodeBox(node, sheet);
            let { width = 0, height = 0 } = getComponentSize(node.type, node, lodash.extend(css, inheritorStringStyle), attr);
            if (css.width !== 0)
                width = parseInt(css.width);
            if (css.height !== 0)
                height = parseInt(css.height);
            //absolute不计入父级宽高计算
            if (lodash.eq(position, "absolute")) {
                AA.addSelf(new cc.Vec2(parseInt(left) + parseInt(marginLeft), parseInt(top) + parseInt(marginTop)));
                BB.addSelf(new cc.Vec2(AA.x, AA.y).add(new cc.Vec2(width, height)));
                return node;
            }




            // if(lodash.eq(position,"relative")){
            //   AA.add(new cc.Vec2(leftBox.clientLeft + left + marginLeft,leftBox.clientTop + top + marginTop));
            //   BB.add((new cc.Vec2(AA.x,AA.y)).add(width,height));
            // }

            //先不做换行,所有inline-block都是一行
            //优先处理inline-block
            if (lodash.eq(display, "inline-block")) {
                // let w = that._rect.width;
                // let h = that._rect.height;

                if (lodash.eq(leftBox, null)) {
                    AA.addSelf(new cc.Vec2(parseInt(marginLeft), parseInt(marginTop)));
                } else {
                    let { clientRight } = leftBox;
                    AA.addSelf(new cc.Vec2(AA.x + clientRight + parseInt(marginLeft), AA.y + parseInt(marginTop)));
                }

                BB.addSelf(new cc.Vec2(AA.x, AA.y).add(new cc.Vec2(width, height)));

            }

            if (lodash.eq(display, "block")) {

                let pw = rootRect.width;
                //占整行
                if (lodash.eq(leftBox, null)) {
                    AA.addSelf(new cc.Vec2(parseInt(marginLeft), parseInt(marginTop)));
                    BB.addSelf((new cc.Vec2(AA.x, AA.y)).add(new cc.Vec2(pw, height)));
                } else {
                    let { clientBottom } = leftBox;
                    AA.addSelf(new cc.Vec2(AA.x + parseInt(marginLeft), clientBottom + parseInt(marginTop)));
                    BB.addSelf((new cc.Vec2(AA.x, AA.y)).add(new cc.Vec2(pw, height)));
                }


            }

            // if(lodash.eq(display,"block")){

            // }

            return node;

            // function getComponentSize(type, node, ...args) {
            //   switch (type) {
            //     case "checkbox":
            //       return that.measureCheckBox(...args);
            //     case "radio":
            //       return that.measureRadio(...args)
            //     case "number":
            //       return that.measureNumberBox(...args);
            //     case "label":
            //       let text = node.children[0]
            //       return that.measureText(text.data.trim(), ...args);
            //     case "text":
            //       return that.measureText(node.data.trim(), ...args);
            //     case "richlabel":
            //       return that.measureRichLabel(node.attribs.text.trim(), ...args);
            //     case "tip":
            //       return that.measureTip(...args)
            //     case "tag":
            //       return parseTag(node)
            //   }
            //   return { width: 0, height: 0 }

            //   function parseTag(node) {
            //     switch (node.name) {
            //       case "label":
            //         return getComponentSize(node.name, node, ...args);
            //       case "input":
            //         return getComponentSize(node.attribs.type, node, ...args);
            //     }
            //     return { wdith: 0, height: 0 };
            //   }

            // }




            // function handleBlock(node, call) {
            //   switch (node && node.type) {
            //     case "a":
            //     case "text":
            //     case "label":
            //     case "richlabel":
            //       return call("inline-block")
            //     case "tag":
            //       return handleBlock({ type: node.name }, call);
            //   }
            // }

        }

        //预解析，添加一个root节点，如果没有root节点会很麻烦
        protected preparser(domstr: string) {

            var dom = htmlparser2.parseDOM(domstr),
                // Generic root element
                root = htmlparser2.parseDOM('<root></root>')[0];

            root.type = 'root';
            // console.log(dom);
            // console.log(htmlparser2.parseDOM(domstr)[0])
            // console.log(this.measureCheckBox({},{text:"hao123"}));
            // let td = htmlparser2.parseDOM(domstr)[0];
            // console.log();

            this.updateDom(dom, root);
            // 先做显示隐藏，后续做
            // this.initEmitHandle(root);
            // this.updateHandledNode(root);
            this.updateAABBBox(root, root, this.makeCSS(root));
            this.mergeBox(root)
            // var root = htmlparser2.parseDOM(domstr);

            return root;
        }


        //更新节点树
        protected updateDom(arr, parent) {
            //序列化一下
            if (!Array.isArray(arr)) arr = [arr];

            //设置子节点
            if (parent) {
                parent.children = arr;
            } else {
                parent = null;
            }

            // 更新所有子节点的父节点
            for (var i = 0; i < arr.length; i++) {
                var node = arr[i];

                // 删除旧的父节点
                var oldParent = node.parent || node.root,
                    oldSiblings = oldParent && oldParent.children;
                if (oldSiblings && oldSiblings !== arr) {
                    oldSiblings.splice(oldSiblings.indexOf(node), 1);
                    if (node.prev) {
                        node.prev.next = node.next;
                    }
                    if (node.next) {
                        node.next.prev = node.prev;
                    }
                }

                if (parent) {
                    node.prev = arr[i - 1] || null;
                    node.next = arr[i + 1] || null;
                } else {
                    node.prev = node.next = null;
                }

                if (parent && parent.type === 'root') {
                    node.root = parent;
                    node.parent = node.root;
                } else {
                    node.root = null;
                    node.parent = parent;
                }
            }

            return parent;
        };


    }
}*/ 
var common;
(function (common) {
    var RDom;
    (function (RDom) {
        var random = function (len) {
            if (len === void 0) { len = 8; }
            var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            var betLen = alphabet.length;
            var out = [];
            var i = 0;
            while (i < len) {
                var seed = +Math.random().toString().substr(2);
                out[i] = alphabet[seed % betLen];
                i++;
            }
            return out.join("");
        };
        var boxMap = /** @class */ (function () {
            function boxMap() {
                this.boxes = new Array();
                this.ids = new Array();
            }
            boxMap.prototype.searchByID = function (id) {
                var boxes = this.boxes;
                return boxes.filter(function (v) {
                    return v.cid && v.cid === id;
                }).pop();
            };
            boxMap.prototype.push = function (box) {
                var ids = this.ids;
                if (box.cid === null) {
                    var r = random(12);
                    while (ids.indexOf(r) !== -1)
                        r = random(12);
                    box.cid = r;
                }
                if (this.searchByID(box.cid) == undefined) {
                    ids.push(box.cid);
                    this.boxes.push(box);
                }
            };
            return boxMap;
        }());
        RDom.boxMap = boxMap;
    })(RDom = common.RDom || (common.RDom = {}));
})(common || (common = {}));
var common;
(function (common) {
    var RDom;
    (function (RDom) {
        var htmlparser2 = require("htmlparser2");
        var css = require("css");
        //解决转换的问题
        RDom.parseCss = function (source) { return css.parse(source); };
        RDom.makeCss = function (sheets) {
            var lookup = remake(sheets);
            return walker(function (path, source) { return source[path]; }, lookup);
            function walker(fn, table) {
                return wrapper;
                function wrapper() {
                    var _this = this;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (args.length === 0)
                        return undefined;
                    return args.reduce(function (s, v) {
                        if (/undefined|null/.test(s))
                            return undefined;
                        return fn.call(_this, v, s);
                    }, table);
                }
            }
        };
        var solvePath = function (node, out) {
            if (out === void 0) { out = null; }
            if (node.parent === null ||
                lodash.eq(node.attribs, undefined) && lodash.eq(out, undefined))
                return out;
            out = out || [];
            if (node.attribs && node.attribs.class)
                _solvePath(node.attribs.class, out);
            return solvePath(node.parent, out);
            function _solvePath(klass, out) {
                if (out.length === 0)
                    return klass.split(/\s+/).forEach(function (v) {
                        out.push(["." + v]);
                    });
                var temp = [];
                klass.split(/\s+/).forEach(function (v) {
                    lodash.forEach(out, function (path) {
                        temp.push([].concat("." + v, path));
                    });
                });
                lodash.forEach(temp, function (v) {
                    out.push(v);
                });
            }
        };
        /**
         *
         * @param arr
         * @param sheet
         * @param base 本身的样式表，不继承
         */
        var scanCss = function (arr, sheet, base) {
            var out = {};
            arr.forEach(function (v) {
                var last = lodash.last(v);
                if (base.indexOf(last) !== -1) {
                    var query = sheet.apply(void 0, v);
                    if (query !== undefined)
                        lodash.extend(out, query.$style);
                }
                var queryAg = v.slice(0, v.length - 1);
                if (queryAg.length > 0) {
                    var queryPrev = sheet(queryAg);
                    if (queryPrev !== undefined)
                        if (queryPrev.$style)
                            lodash.extend(out, lodash.pick(queryPrev.$style, ["font-size", "color", "hover-color"]));
                }
            });
            return out;
        };
        RDom.conbineStyle = function (node, sheet) {
            var HNode = node.HNode;
            var attr = HNode.attribs || { style: {}, class: null };
            var out = {};
            var base = (attr.class && attr.class.split(/\s+/).map(function (v) { return "." + v; })) || [];
            var klass = solvePath(HNode);
            var css = scanCss(klass, sheet, base);
            lodash.extend(out, css, attr.style);
            return out;
        };
        //font-size , color , 
        RDom.parseCssAttr = function (str) {
            var cssReg = /([\w\-]+)\:([\w\-]+)/g;
            return str.match(cssReg).reduce(function (out, v) {
                v = v.split(":");
                out[v[0]] = v[1];
            }, {});
        };
        RDom.CSSInHTMLNode = function (node) {
            return RDom.makeCss(map2findCss(node));
            function map2findCss(node, out) {
                if (out === void 0) { out = []; }
                if (node.type === "style") {
                    out.push(node.children[0].data);
                    return out;
                }
                if (node.children)
                    node.children.forEach(function (v) {
                        map2findCss(v, out);
                    });
                return out;
            }
        };
        //重新建立结构，方便索引
        function remake(styles) {
            var out = {};
            styles.map(function (v) { return RDom.parseCss(v); }).forEach(function (v) {
                _remake(v.stylesheet, out);
            });
            return out;
            function _remake(sheet, css) {
                if (css === void 0) { css = {}; }
                var oper = [">"];
                lodash.forEach(sheet.rules, function (v) {
                    var declarations = v.declarations, selectors = v.selectors;
                    var selector = lodash.head(selectors).split(/\s+/);
                    var temp;
                    selector.reduce(function (a, c) {
                        if (oper.indexOf(c) === -1)
                            if (lodash.eq(temp, undefined))
                                temp = css[c] = css[c] || {};
                            else
                                temp = temp[c] = temp[c] || {};
                        applyCss(temp, declarations, a, lodash.last(selector) === c);
                        return c;
                    }, lodash.head(selector));
                });
                function format(decla) {
                    var out = {};
                    decla.forEach(function (v) {
                        var property = v.property, value = v.value;
                        out[property] = value;
                    });
                    return out;
                }
                function applyCss(tcss, attrs, prev, isLast) {
                    if (prev === void 0) { prev = null; }
                    if (isLast === void 0) { isLast = false; }
                    if (oper.indexOf(prev) !== -1) {
                        tcss.onlyChild = true;
                    }
                    if (isLast) {
                        tcss.$style = format(attrs);
                    }
                }
            }
        }
    })(RDom = common.RDom || (common.RDom = {}));
})(common || (common = {}));
var common;
(function (common) {
    var RDom;
    (function (RDom) {
        RDom.defEventLife = 1;
        var UINode = /** @class */ (function (_super) {
            __extends(UINode, _super);
            function UINode() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.__nodeType = "node";
                _this._fontSize = 32;
                _this._fontName = "SimHei";
                _this._fontColor = "#ffffff";
                _this._fontActiveColor = "#ffffff";
                _this._deffontSize = 32;
                _this._deffontName = "SimHei";
                _this._deffontColor = "#ffffff";
                _this._deffontActiveColor = "#ffffff";
                _this.__uuid = -1;
                return _this;
            }
            UINode.prototype.getAttr = function () {
                return {
                    x: Number(this.x.toFixed(2)),
                    y: Number(this.y.toFixed(2)),
                    zindex: Number(this.zIndex),
                    nodeType: this.__nodeType,
                    uuid: this.__uuid,
                    fontSize: this._fontSize,
                    fontName: this._fontName,
                    fontColor: this._fontColor,
                    fontActiveColor: this._fontActiveColor
                };
            };
            UINode.prototype.setAttrAndStyle = function (dattr) {
                if (dattr === void 0) { dattr = {}; }
                var attr = dattr || {};
                var tx = lodash.isNumber(attr.x) ? Number(attr.x.toFixed(2)) : this.x || 0;
                var ty = lodash.isNumber(attr.y) ? Number(attr.y.toFixed(2)) : this.y || 0;
                this._fontSize = attr.fontSize || this._deffontSize;
                ;
                this._fontName = attr.fontName || this._deffontName;
                this._fontColor = attr.fontColor || this._deffontColor;
                this._fontActiveColor = attr.fontActiveColor || this._deffontActiveColor;
                this.setPosition(tx, ty);
                if (lodash.isNumber(attr.zindex) && this.zIndex != Number(attr.zindex)) {
                    this.setLocalZOrder(attr.zindex);
                }
            };
            ;
            UINode.prototype.mergerStyle = function (dattr) {
                if (dattr === void 0) { dattr = {}; }
                var attr = dattr || {};
                var tx = lodash.isNumber(attr.x) ? Number(attr.x.toFixed(2)) : this.x || 0;
                var ty = lodash.isNumber(attr.y) ? Number(attr.y.toFixed(2)) : this.y || 0;
                this._fontSize = attr.fontSize || this._deffontSize;
                ;
                this._fontName = attr.fontName || this._deffontName;
                this._fontColor = attr.fontColor || this._deffontColor;
                this._fontActiveColor = attr.fontActiveColor || this._deffontActiveColor;
                this.setPosition(tx, ty);
                if (lodash.isNumber(attr.zindex) && this.zIndex != Number(attr.zindex)) {
                    this.setLocalZOrder(attr.zindex);
                }
            };
            UINode.prototype.initWithNode = function (node, uuid) {
                _super.prototype.initWithNode.call(this, node);
                this.setPosition(0, 0);
                this.setAnchorPoint(0, 1);
                if (uuid) {
                    this.__uuid = uuid;
                }
                else {
                    this.__uuid = UINode.UUID++;
                }
            };
            UINode.UUID = 10000;
            return UINode;
        }(kaayou.Block));
        RDom.UINode = UINode;
        var UIInput = /** @class */ (function (_super) {
            __extends(UIInput, _super);
            function UIInput() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._iname = "";
                _this._iid = "";
                _this.__lock = false;
                return _this;
            }
            UIInput.prototype.setAttrAndStyle = function (dattr) {
                if (dattr === void 0) { dattr = {}; }
                var attr = dattr || {};
                _super.prototype.setAttrAndStyle.call(this, dattr);
                this._iname = attr.iname || "p:" + this.__uuid;
                this._iid = attr.iid || "";
            };
            UIInput.prototype.getAttr = function () {
                return lodash.extend({}, _super.prototype.getAttr.call(this), { iname: this._iname });
            };
            UIInput.prototype.getInputName = function () {
                return this._iname || "";
            };
            UIInput.prototype.getInputID = function () {
                return this._iid || "";
            };
            UIInput.prototype.getInputFor = function () {
                return "";
            };
            UIInput.prototype.doBindeChangeEvent = function () {
                if (!lodash.isEmpty(this.getInputName())) {
                    kaayou.getController("domView").on("Value::Change::" + this.getInputName(), this.__onInputValueChange, this);
                }
            };
            UIInput.prototype.__onInputValueChange = function (e) {
                var data = e.data;
                data.force = !!data.force;
                data.life = data.life || 0;
                var life = data.life - 1;
                this.onInputValueChange && this.onInputValueChange(data.name, data.uuid, data.value, data.ext, life, data.extattr || {});
                if (this.onInputValueChange) {
                    try {
                        if (lodash.isArray(data.extattr)) {
                            var itAttrs = data.extattr;
                            for (var x in itAttrs) {
                                var itAttr = itAttrs[x];
                                this.doSetExtAttr(itAttr);
                            }
                        }
                        else if (lodash.isObject(data.extattr)) {
                            var itAttr = data.extattr;
                            this.doSetExtAttr(itAttr);
                        }
                        else {
                        }
                    }
                    catch (e) { }
                }
            };
            UIInput.prototype.doSetExtAttr = function (attr) {
                if (attr === void 0) { attr = {}; }
                var uuid = attr.uuid || null;
                if (uuid) {
                    if (lodash.isArray(uuid)) {
                        if (uuid.indexOf(this.__uuid) > -1) {
                            this.mergerStyle(attr);
                        }
                    }
                    else if (lodash.isNumber(uuid)) {
                        if (this.__uuid == uuid) {
                            this.mergerStyle(attr);
                        }
                    }
                }
                else if (uuid === null) {
                    this.mergerStyle(attr);
                }
            };
            UIInput.prototype.doValueChangeEvent = function (value, life, extAttr) {
                if (life === void 0) { life = RDom.defEventLife; }
                if (extAttr === void 0) { extAttr = {}; }
                var name = this.getInputName();
                if (!lodash.isEmpty(name)) {
                    var edata = {
                        name: name,
                        value: value,
                        extattr: extAttr,
                        uuid: this.__uuid,
                        force: false,
                        life: life
                    };
                    kaayou.emit("domView", "Value::Change::" + name, edata);
                }
            };
            return UIInput;
        }(UINode));
        RDom.UIInput = UIInput;
    })(RDom = common.RDom || (common.RDom = {}));
})(common || (common = {}));
/// <reference path="common.RDomBaseNode.ts" />
var common;
(function (common) {
    var RDom;
    (function (RDom) {
        var UICheckBox = /** @class */ (function (_super) {
            __extends(UICheckBox, _super);
            function UICheckBox() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.checkbox = null;
                _this.label = null;
                _this._defText = "ggggG";
                _this._text = "";
                _this._defchecked = false;
                _this._checked = false;
                _this._defvalue = "";
                _this._value = "";
                return _this;
            }
            UICheckBox.prototype.initWithNode = function (node, uuid) {
                if (uuid === void 0) { uuid = 0; }
                this.__nodeType = "checkbox";
                _super.prototype.initWithNode.call(this, node, uuid);
                this._deffontColor = "#587a9d";
                this._deffontActiveColor = "#5f2b06";
                this.checkbox = ccui.helper.seekWidgetByName(this.node, "checkbox");
                this.label = ccui.helper.seekWidgetByName(this.node, "label");
                this.label.ignoreContentAdaptWithSize(true);
                this.node.on(kaayou.TouchEvent.TouchEnd, this.onClick, this);
            };
            UICheckBox.prototype.setAttrAndStyle = function (dattr) {
                if (dattr === void 0) { dattr = {}; }
                var attr = dattr || {};
                _super.prototype.setAttrAndStyle.call(this, attr);
                this._text = lodash.isString(attr.text) ? attr.text : this._text || this._defText;
                this._checked = !!attr.checked;
                this._value = this._checked ? "true" : "false";
                !attr.isEdit && this.doBindeChangeEvent();
                this.updateUI();
            };
            ;
            UICheckBox.prototype.getAttr = function () {
                return lodash.extend({}, _super.prototype.getAttr.call(this), { text: this._text, checked: this._checked, value: this._checked ? "true" : "false" });
            };
            UICheckBox.prototype.updateUI = function () {
                this.checkbox.setBright(true);
                this.checkbox.setSelected(this._checked);
                this.checkbox.setBright(!this.__lock);
                this.updateText();
            };
            ;
            UICheckBox.prototype.updateText = function () {
                var text = this._text || "";
                var color = !this._checked ? cc.color(this._fontColor) : cc.color(this._fontActiveColor);
                if (!cc.colorEqual(color, this.label.getTextColor())
                    || this._fontName != this.label.getFontName()
                    || this._fontSize != this.label.getFontSize()) {
                    this.label = Patch.ChangeTextColor(this.label, text, color, this._fontName, this._fontSize);
                }
                else {
                    if (text != this.label.getString()) {
                        this.label.setString(text);
                    }
                }
            };
            UICheckBox.prototype.onInputValueChange = function (name, uuid, value, ext, life, extAttr) {
                if (ext == 'lock') {
                    this.__lock = true;
                    if (!lodash.isEmpty(value)) {
                        this._checked = (value == "true");
                        this._value = this._checked ? "true" : "false";
                    }
                }
                else if (ext == 'unlock') {
                    this.__lock = false;
                    if (!lodash.isEmpty(value)) {
                        this._checked = (value == "true");
                        this._value = this._checked ? "true" : "false";
                    }
                }
                else {
                    this._checked = (value == "true");
                    this._value = this._checked ? "true" : "false";
                }
                this.updateUI();
            };
            UICheckBox.prototype.onClick = function () {
                if (this.__lock) {
                    return;
                }
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.doValueChangeEvent(!this.checkbox.isSelected() ? "true" : "false");
            };
            ;
            return UICheckBox;
        }(RDom.UIInput));
        RDom.UICheckBox = UICheckBox;
    })(RDom = common.RDom || (common.RDom = {}));
})(common || (common = {}));
/// <reference path="common.RDomBaseNode.ts" />
var common;
(function (common) {
    var RDom;
    (function (RDom) {
        var UILabelBox = /** @class */ (function (_super) {
            __extends(UILabelBox, _super);
            function UILabelBox() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.label = null;
                _this._defText = "ggggG";
                _this._text = "";
                return _this;
            }
            UILabelBox.prototype.initWithNode = function (node, uuid) {
                if (uuid === void 0) { uuid = 0; }
                this.__nodeType = "labelbox";
                _super.prototype.initWithNode.call(this, node, uuid);
                this._deffontColor = "#1a5154";
                this.label = ccui.helper.seekWidgetByName(this.node, "label");
                this.label.ignoreContentAdaptWithSize(true);
            };
            UILabelBox.prototype.getAttr = function () {
                return lodash.extend({}, _super.prototype.getAttr.call(this), { text: this._text });
            };
            UILabelBox.prototype.setAttrAndStyle = function (dattr) {
                if (dattr === void 0) { dattr = {}; }
                var attr = dattr || {};
                _super.prototype.setAttrAndStyle.call(this, attr);
                this._text = lodash.isString(attr.text) ? attr.text : this._text || this._defText;
                !attr.isEdit && this.doBindeChangeEvent();
                this.updateUI();
            };
            ;
            UILabelBox.prototype.onInputValueChange = function (name, uuid, value, ext, life, extAttr) {
                this._text = lodash.isString(value) ? value : this._text || this._defText;
                this.updateUI();
            };
            UILabelBox.prototype.updateUI = function () {
                var text = this._text || "";
                var color = cc.color(this._fontColor);
                if (!cc.colorEqual(color, this.label.getTextColor())
                    || this._fontName != this.label.getFontName()
                    || this._fontSize != this.label.getFontSize()) {
                    this.label = Patch.ChangeTextColor(this.label, text, color, this._fontName, this._fontSize);
                }
                else {
                    if (text != this.label.getString()) {
                        this.label.setString(text);
                    }
                }
            };
            ;
            return UILabelBox;
        }(RDom.UIInput));
        RDom.UILabelBox = UILabelBox;
    })(RDom = common.RDom || (common.RDom = {}));
})(common || (common = {}));
var common;
(function (common) {
    var RDom;
    (function (RDom) {
        var UILayoutCache = /** @class */ (function () {
            function UILayoutCache() {
                this._richDombL = null;
                this._radioModel = null;
                this._checkModel = null;
                this._numModel = null;
                this._labelModel = null;
                this._tipModel = null;
                this._tagModel = null;
                this._values = null;
                this._richDombL = ccs.load(common.res.RichDom_json, "res/").node;
                if (!this._richDombL) {
                    console.error("_richDombL no");
                    return;
                }
                this._richDombL.retain && this._richDombL.retain();
                this._radioModel = ccui.helper.seekWidgetByName(this._richDombL, "dom_radio");
                this._checkModel = ccui.helper.seekWidgetByName(this._richDombL, "dom_checkbox");
                this._numModel = ccui.helper.seekWidgetByName(this._richDombL, "dom_number");
                this._labelModel = ccui.helper.seekWidgetByName(this._richDombL, "dom_labelbox");
                this._tipModel = ccui.helper.seekWidgetByName(this._richDombL, "dom_tip");
                this._tagModel = ccui.helper.seekWidgetByName(this._richDombL, "dom_tagbox");
            }
            UILayoutCache.prototype.getModel = function (name) {
                if (name == UILayoutCache.RADIOBOX) {
                    return this._radioModel;
                }
                else if (name == UILayoutCache.CHECKBOX) {
                    return this._checkModel;
                }
                else if (name == UILayoutCache.NUMBOX) {
                    return this._numModel;
                }
                else if (name == UILayoutCache.LABELBOX) {
                    return this._labelModel;
                }
                else if (name == UILayoutCache.TIPBOX) {
                    return this._tipModel;
                }
                else if (name == UILayoutCache.TAGBOX) {
                    return this._tagModel;
                }
                else {
                    return null;
                }
            };
            UILayoutCache.prototype.clearValues = function () {
                this._values = null;
            };
            UILayoutCache.prototype.submit = function () {
                var v = {};
                for (var x in this._values) {
                    v[x] = this._values[x].value;
                }
                return v;
            };
            UILayoutCache.__INS__ = null;
            UILayoutCache.getInstance = function () {
                if (null == UILayoutCache.__INS__) {
                    UILayoutCache.__INS__ = new UILayoutCache();
                }
                return UILayoutCache.__INS__;
            };
            UILayoutCache.CHECKBOX = "checkbox";
            UILayoutCache.NUMBOX = "numbox";
            UILayoutCache.RADIOBOX = "radiobox";
            UILayoutCache.LABELBOX = "labelbox";
            UILayoutCache.TIPBOX = "tipbox";
            UILayoutCache.TAGBOX = "tagbox";
            return UILayoutCache;
        }());
        RDom.UILayoutCache = UILayoutCache;
        var UILayout = /** @class */ (function (_super) {
            __extends(UILayout, _super);
            function UILayout() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._isScrollView = false;
                _this._isScorllView = false;
                _this._maXwidgetZindex = 0;
                _this.submitValues = null;
                _this.submitInputEvents = null;
                _this.__evList = null;
                return _this;
            }
            UILayout.prototype.initWithNull = function () {
                this.node = this;
                UILayoutCache.getInstance();
            };
            UILayout.prototype.initWithNodeNoClone = function (node) {
                var paret = node.getParent();
                _super.prototype.initWithNodeNoClone.call(this, node);
                if (paret) {
                    paret.addChild(this, 100);
                }
                this._isScrollView = !!this.node.getInnerContainerSize;
                if (this._isScorllView) {
                    this.node.setScrollBarEnabled(false);
                }
                UILayoutCache.getInstance();
            };
            UILayout.prototype.setIsScorllView = function (b) {
                this._isScorllView = b;
            };
            UILayout.prototype.submit = function () {
                return lodash.extend({}, this.submitValues);
            };
            UILayout.prototype.createWidget = function (attr) {
                var self = this;
                var nodeType = attr.nodeType;
                var zindex = lodash.isNumber(attr.zindex) ? Math.ceil(attr.zindex) : this._maXwidgetZindex;
                var widget = null;
                if ("radiobox" == nodeType) {
                    widget = self.createRadioBox(attr);
                }
                else if ("checkbox" == nodeType) {
                    widget = self.createCheckBox(attr);
                }
                else if ("tagbox" == nodeType) {
                    widget = self.createTagBox(attr);
                }
                else if ("numbox" == nodeType) {
                    widget = self.createNumBox(attr);
                }
                else if ("tipbox" == nodeType) {
                    widget = self.createTipBox(attr);
                }
                else if ("labelbox" == nodeType) {
                    widget = self.createLableBox(attr);
                }
                else {
                    return;
                }
                self.node.addChild(widget, zindex);
                this._maXwidgetZindex = Math.max(0, zindex + 30, this._maXwidgetZindex + 30);
            };
            UILayout.prototype.createRadioBox = function (attr) {
                var cnode = new RDom.UIRadioBox();
                cnode.initWithNode(UILayoutCache.getInstance().getModel(UILayoutCache.RADIOBOX), attr.uuid);
                cnode.setAttrAndStyle(attr);
                return cnode;
            };
            UILayout.prototype.createCheckBox = function (attr) {
                var cnode = new RDom.UICheckBox();
                cnode.initWithNode(UILayoutCache.getInstance().getModel(UILayoutCache.CHECKBOX), attr.uuid);
                cnode.setAttrAndStyle(attr);
                return cnode;
            };
            UILayout.prototype.createTipBox = function (attr) {
                var cnode = new RDom.UITipBox();
                cnode.initWithNode(UILayoutCache.getInstance().getModel(UILayoutCache.TIPBOX), attr.uuid);
                cnode.setAttrAndStyle(attr);
                return cnode;
            };
            UILayout.prototype.createTagBox = function (attr) {
                var cnode = new RDom.UITagBox();
                cnode.initWithNode(UILayoutCache.getInstance().getModel(UILayoutCache.TAGBOX), attr.uuid);
                cnode.setAttrAndStyle(attr);
                return cnode;
            };
            UILayout.prototype.createLableBox = function (attr) {
                var cnode = new RDom.UILabelBox();
                cnode.initWithNode(UILayoutCache.getInstance().getModel(UILayoutCache.LABELBOX), attr.uuid);
                cnode.setAttrAndStyle(attr);
                return cnode;
            };
            UILayout.prototype.AttrGriddle = function (attr, istoh5) {
                if (istoh5 === void 0) { istoh5 = true; }
                if (lodash.isNumber(attr.y)) {
                    var height = this.getNodeContentSize().height;
                    if (istoh5)
                        attr.y = Number((height - attr.y).toFixed(2));
                    else
                        attr.y = Number((height - attr.y).toFixed(2));
                }
                return attr;
            };
            UILayout.prototype.createNumBox = function (attr) {
                var cnode = new RDom.UINumBox();
                cnode.initWithNode(UILayoutCache.getInstance().getModel(UILayoutCache.NUMBOX), attr.uuid);
                cnode.setAttrAndStyle(attr);
                return cnode;
            };
            ;
            UILayout.prototype.getNodeContentSize = function () {
                var size = this.node.getContentSize();
                if (this._isScrollView) {
                    var innerSize = this.node.getInnerContainerSize();
                    return cc.size(Math.max(size.width, innerSize.width), Math.max(size.height, innerSize.height));
                }
                else {
                    return size;
                }
            };
            UILayout.prototype.setNodeContentSize = function (size) {
                var csize = this.node.getContentSize();
                var msize = cc.size(Math.max(size.width, csize.width), Math.max(size.height, csize.height));
                if (this._isScrollView) {
                    this.node.setInnerContainerSize(msize);
                }
                else {
                    this.node.setContentSize(msize);
                }
            };
            UILayout.prototype.setContent = function (content, lastValus, frozen) {
                if (lastValus === void 0) { lastValus = {}; }
                if (frozen === void 0) { frozen = false; }
                var __content;
                this.submitValues = null;
                if (lodash.isString(content)) {
                    __content = JSON.parse(content);
                }
                else if (lodash.isObject(content)) {
                    __content = lodash.clone(content);
                }
                kaayou.uninstallController("domView");
                this.node.removeAllChildren();
                if (!__content) {
                    return;
                }
                this.setNodeContentSize(__content.size || cc.size(0, 0));
                for (var x in __content.list) {
                    var attr = __content.list[x];
                    if (attr.nodeType) {
                        this.createWidget(this.AttrGriddle(attr));
                        if (attr.iname) {
                        }
                    }
                }
                //调度一次事件
                var defValues = __content.defValues || {};
                defValues = lodash.extend(defValues, lastValus);
                this.submitValues = lodash.extend({}, defValues);
                //绑定事件
                var inputEvents = {};
                for (var x in __content.list) {
                    var attr = __content.list[x];
                    if (attr.nodeType && attr.iname) {
                        if ("tagbox" == attr.nodeType || "labelbox" == attr.nodeType) {
                            continue;
                        }
                        inputEvents[attr.iname] = {
                            nodeType: attr.nodeType,
                            valueType: (function (__nodeType, __valueType) {
                                if (__nodeType == "numbox") {
                                    return "number";
                                }
                                return __valueType || "string";
                            })(attr.nodeType, attr.valueType)
                        };
                    }
                }
                for (var x in inputEvents) {
                    kaayou.getController("domView").on("Value::Change::" + x, this.onValueChange, this);
                }
                this.submitInputEvents = inputEvents;
                //lw200624,先清一下，否则从通城个子切到跑得快房卡就错了
                this.__evList = [];
                //设置值
                for (var x in defValues) {
                    this.doValueChangeEvent(x, defValues[x], "", 1);
                }
                this.__evList = lodash.clone(__content.evlist || []);
                //设置值
                for (var x in defValues) {
                    this.doValueChangeEvent(x, defValues[x], "", 1);
                }
                do {
                    if (!this.__evList) {
                        break;
                    }
                    if (!lodash.isArray(this.__evList)) {
                        break;
                    }
                    if (lodash.isEmpty(this.__evList)) {
                        break;
                    }
                    for (var x in this.__evList) {
                        if (this.__evList[x].priority == undefined) {
                            this.__evList[x].priority = 10;
                        }
                        if (this.__evList[x].destattr == undefined || this.__evList[x].destattr == "" || this.__evList[x].destattr == null) {
                            this.__evList[x].destattr = {};
                        }
                        else {
                            try {
                                var des = JSON.parse(this.__evList[x].destattr);
                                if (lodash.isObject(des)) {
                                    this.__evList[x].destattr = des;
                                }
                                else if (lodash.isArray(des)) {
                                    this.__evList[x].destattr = des;
                                }
                                else {
                                    this.__evList[x].destattr = {};
                                }
                            }
                            catch (e) {
                                this.__evList[x].destattr = {};
                            }
                        }
                        this.__evList[x].destattr = this.AttrGriddle(this.__evList[x].destattr);
                    }
                    this.__evList.sort(function (a, b) {
                        return a.priority - b.priority;
                    });
                    //二次触发事件
                    var filter = {};
                    for (var x in defValues) {
                        for (var y in this.__evList) {
                            if (this.__evList[y].srck == x) {
                                if (filter[this.__evList[y].destk] == x) {
                                    break;
                                }
                                filter[x] = this.__evList[y].destk;
                                this.doValueChangeEvent(x, defValues[x], "", 1);
                                break;
                            }
                        }
                    }
                } while (false);
                if (frozen) {
                    setTimeout(function () {
                        kaayou.uninstallController("domView");
                    }, 1);
                }
                //   UILayoutCache.getInstance().doDefaultRadioValue();
                // UILayoutCache.getInstance().doSetInputValues(lastValus);
                console.log(__content);
            };
            UILayout.prototype.getValueInChange = function (key, value) {
                if (!this.submitInputEvents[key]) {
                    return value;
                }
                var valueType = this.submitInputEvents[key].valueType;
                var curValue = this.submitValues[key];
                var doValueType = function (value) {
                    if (valueType == "string") {
                        return value + "";
                    }
                    else if (valueType == "number") {
                        var v = Number(value);
                        return lodash.isNumber(v) ? v : 0;
                    }
                    return "";
                };
                do {
                    if (!lodash.isString(value)) {
                        break;
                    }
                    var head = "";
                    var body = "";
                    //比较字符串头
                    if (value[0] !== '$') {
                        break;
                    }
                    if (value === "$null") {
                        head = value;
                    }
                    else {
                        //分割特殊类型字符串
                        var tarr = value.split(":");
                        if (tarr.length !== 2) {
                            break;
                        }
                        //取头和值
                        head = tarr[0];
                        body = tarr[1];
                    }
                    //判定头部
                    switch (head) {
                        case "$null":
                            return curValue;
                            ;
                            break;
                        case "$in": //包含类型 则部改变选择
                            if (body[0] == '[' && body[body.length - 1] == ']') {
                                body = body.substring(1, body.length - 1);
                                var range = body.split("-");
                                if (range.length !== 2) {
                                    break;
                                }
                                var min = Number(range[0]);
                                var max = Number(range[1]);
                                if (!lodash.isNumber(min) || !lodash.isNumber(max)) {
                                    break;
                                }
                                var a = Math.min(min, max);
                                max = Math.max(min, max);
                                min = a;
                                for (var i = min; i <= max; i++) {
                                    if (doValueType(curValue) == doValueType(i)) {
                                        //包含在类则返回原来的值
                                        return curValue;
                                        ;
                                    }
                                }
                                var defv = doValueType(min);
                                return defv;
                            }
                            else {
                                var varr = body.split(",");
                                if (varr.length < 1) {
                                    break;
                                }
                                for (var x in varr) {
                                    if (curValue == undefined && varr[x] == undefined) {
                                        return doValueType(value);
                                    }
                                    if (doValueType(curValue) == doValueType(varr[x])) {
                                        //包含在类则返回原来的值
                                        return curValue;
                                        ;
                                    }
                                }
                                //如果不在包含内则取第一个值为触发
                                var defv = doValueType(varr[0]);
                                return defv;
                            }
                            break;
                    }
                } while (false);
                return doValueType(value);
            };
            UILayout.prototype.onValueChange = function (e) {
                var _a = e.data, name = _a.name, value = _a.value, life = _a.life;
                // if (this._values[name].type == 'num') {
                //     this._values[name].value = Number(value);
                // } else {
                //     this._values[name].value = value;
                // }
                if (lodash.isString(value)) {
                    if (value[0] === '$') {
                    }
                    else {
                        this.submitValues[name] = value;
                    }
                }
                else {
                    this.submitValues[name] = value;
                }
                life--;
                if (life < 0) {
                    return;
                }
                for (var x in this.__evList) {
                    var domevnet = this.__evList[x];
                    if (domevnet.srck == name) {
                        var conds = [];
                        conds.push({
                            srct: domevnet.srct,
                            srcv: domevnet.srcv,
                            value: this.submitValues[name] //当前值
                        });
                        if (domevnet.advsrct != undefined && domevnet.advsrct != null &&
                            domevnet.advsrct != "" && domevnet.advsrct != "null") {
                            var darr = this.parseAdvsrct(domevnet.advsrct);
                            for (var x in darr) {
                                var adv = this.submitValues[darr[x].vkey];
                                if (adv != undefined) {
                                    conds.push({
                                        srct: darr[x].srct,
                                        srcv: darr[x].srcv,
                                        value: adv //当前值
                                    });
                                }
                            }
                        }
                        var isNeedSend = true;
                        for (var x in conds) {
                            isNeedSend = isNeedSend && this.checkEventSent(conds[x].srct, "", conds[x].srcv, conds[x].value);
                        }
                        if (isNeedSend) {
                            var destv = this.getValueInChange(domevnet.destk, domevnet.destv);
                            this.doValueChangeEvent(domevnet.destk, destv, domevnet.ev, life, domevnet.destattr);
                        }
                    }
                }
            };
            UILayout.prototype.parseAdvsrct = function (advsrct) {
                advsrct = lodash.trim(advsrct);
                var advsrcts = advsrct.split("and");
                var whereSybmol = {
                    "=": "$eq",
                    "!=": "$ne",
                    ">": '$gt',
                    ">=": "$gte",
                    "<": "$lt",
                    "<=": "$lte",
                    "in": "$in",
                    "not in": "$nin"
                };
                var whereSybmolKeys = Object.keys(whereSybmol);
                whereSybmolKeys.sort(function (a, b) {
                    return b.length - a.length;
                });
                function GetValue(value) {
                    var len = value.length;
                    if (value.length > 0) {
                        if (value.length > 2 && ((value[0] == "'" && value[len - 1] == "'") || (value[0] == '"' && value[len - 1] == '"'))) {
                            //string
                            return value.substring(1, len - 1);
                        }
                        else if (value.length >= 4 && (value == "false" || value == "true")) {
                            //boolen
                            return value == "true";
                        }
                        else { //number
                            return Number(value);
                        }
                    }
                }
                function getCondStruct(cond) {
                    for (var x in whereSybmolKeys) {
                        var kindex = cond.indexOf(whereSybmolKeys[x]);
                        if (kindex > 0) {
                            var ykey = whereSybmolKeys[x];
                            var conKey = whereSybmol[ykey]; // 条件
                            var k = cond.substring(0, kindex);
                            var v = cond.substring(kindex + ykey.length, cond.length);
                            k = lodash.trim(k);
                            v = lodash.trim(v);
                            if (v.length > 0 && k.length > 0) {
                                //字符串
                                if (conKey == "$in" || conKey == "$nin") {
                                    if (v[0] == "(" && v[v.length - 1] == ")") {
                                        var vr = v.substring(1, v.length - 1).split(',');
                                        for (var i in vr) {
                                            vr[i] = GetValue(vr[i]);
                                        }
                                        v = vr.join(",");
                                    }
                                }
                                else {
                                    v = GetValue(v);
                                }
                                return {
                                    srct: conKey,
                                    srcv: v,
                                    vkey: k //需要获取的键
                                };
                            }
                        }
                    }
                    return null;
                }
                var advsrctsS = [];
                for (var x in advsrcts) {
                    var vl = getCondStruct(advsrcts[x]);
                    if (vl) {
                        advsrctsS.push(vl);
                    }
                }
                return advsrctsS;
            };
            /**
             *  检查事件是否被触发
             * @param srct 触发条件
             * @param advsrct 高级条件
             * @param srcv 触发值
             * @param value 当前值
             */
            UILayout.prototype.checkEventSent = function (srct, advsrct, srcv, value) {
                var t = srct || "$eq"; // 条件
                var isNeedSend = false;
                switch (t) {
                    case '$eq': // $eq = (等于)
                        if (srcv == value) {
                            isNeedSend = true;
                        }
                        break;
                    case '$ne': // $ne != (不等于)
                        if (srcv != value) {
                            isNeedSend = true;
                        }
                        break;
                    case '$gt': // $gt > (大于)
                        if (!lodash.isNumber(Number(srcv)) || !lodash.isNumber(value)) {
                            break;
                        }
                        if (value > srcv) {
                            isNeedSend = true;
                        }
                        break;
                    case '$gte': //  $gte >= (大于等于)
                        if (!lodash.isNumber(Number(srcv)) || !lodash.isNumber(value)) {
                            break;
                        }
                        if (value >= srcv) {
                            isNeedSend = true;
                        }
                        break;
                    case '$lt': //  $lt < (小于)
                        if (!lodash.isNumber(Number(srcv)) || !lodash.isNumber(value)) {
                            break;
                        }
                        if (value < srcv) {
                            isNeedSend = true;
                        }
                        break;
                    case '$lte': // $lte <= (小于等于)
                        if (!lodash.isNumber(Number(srcv)) || !lodash.isNumber(value)) {
                            break;
                        }
                        if (value <= srcv) {
                            isNeedSend = true;
                        }
                        break;
                    case '$in': // $in in (in)
                        if (!lodash.isString(srcv)) {
                            break;
                        }
                        var vr = srcv.split(",");
                        if (lodash.findIndex(vr, function (o) { return o == value; }) != -1) {
                            isNeedSend = true;
                        }
                        break;
                    case '$nin': // $nin !in (not in)
                        if (!lodash.isString(srcv)) {
                            break;
                        }
                        var vr = srcv.split(",");
                        if (lodash.findIndex(vr, function (o) { return o == value; }) == -1) {
                            isNeedSend = true;
                        }
                        break;
                }
                return isNeedSend;
            };
            UILayout.prototype.doValueChangeEvent = function (name, value, ext, life, extAttr) {
                if (life === void 0) { life = RDom.defEventLife; }
                if (extAttr === void 0) { extAttr = {}; }
                if (!lodash.isEmpty(name)) {
                    var edata = {
                        name: name,
                        value: value,
                        extattr: extAttr,
                        uuid: 0,
                        ext: ext,
                        force: false,
                        life: life
                    };
                    kaayou.emit("domView", "Value::Change::" + name, edata);
                }
            };
            return UILayout;
        }(kaayou.Block));
        RDom.UILayout = UILayout;
    })(RDom = common.RDom || (common.RDom = {}));
})(common || (common = {}));
/// <reference path="common.RDomBaseNode.ts" />
var common;
(function (common) {
    var RDom;
    (function (RDom) {
        var UINumBox = /** @class */ (function (_super) {
            __extends(UINumBox, _super);
            function UINumBox() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.btn_add = null;
                _this.btn_sub = null;
                _this.label = null;
                //属性
                _this._maxNum = 0xffff;
                _this._minNum = 0;
                _this._unit = ""; //单位
                _this._inc = 1; //步进
                _this._isGroup = false; //是否组
                _this._group = null;
                _this._curGroupNum = -1;
                _this._displayType = "nomal"; //nomal  grup
                _this._value = 0;
                _this._valueStr = "";
                _this._defgroupStr = JSON.stringify([{ "n": "1分", "v": 1 }, { "n": "2分", "v": 2 }]);
                _this._groupStr = "";
                _this._isErr = false;
                return _this;
            }
            UINumBox.prototype.initWithNode = function (node, uuid) {
                if (uuid === void 0) { uuid = 0; }
                _super.prototype.initWithNode.call(this, node, uuid);
                this.__nodeType = "numbox";
                this._deffontColor = "#C07575";
                this.btn_add = ccui.helper.seekWidgetByName(this.node, "btn_add");
                this.btn_sub = ccui.helper.seekWidgetByName(this.node, "btn_sub");
                this.label = ccui.helper.seekWidgetByName(this.node, "label");
                this.btn_add.on(kaayou.TouchEvent.TouchEnd, this.onAddClick, this);
                this.btn_sub.on(kaayou.TouchEvent.TouchEnd, this.onSubClick, this);
            };
            // _curNumValue = 0;
            UINumBox.prototype.getAttr = function () {
                return lodash.extend({}, _super.prototype.getAttr.call(this), {
                    value: this._value,
                    displayType: this._displayType,
                    groupStr: this._groupStr,
                    inc: this._inc,
                    unit: this._unit,
                    maxNum: this._maxNum,
                    minNum: this._minNum,
                });
            };
            UINumBox.prototype.setAttrAndStyle = function (dattr) {
                if (dattr === void 0) { dattr = {}; }
                var attr = dattr || {};
                _super.prototype.setAttrAndStyle.call(this, attr);
                this._displayType = attr.displayType || "nomal";
                this._isGroup = this._displayType == "group";
                this._groupStr = attr.groupStr || this._groupStr || this._defgroupStr;
                this._inc = attr.inc || 1;
                this._unit = attr.unit || "";
                this._maxNum = attr.maxNum != undefined ? attr.maxNum : 0xffff;
                this._minNum = attr.minNum != undefined ? attr.minNum : 0;
                this._value = attr.value != undefined ? Number(attr.value) : 0;
                this._value = Math.min(this._maxNum, Math.max(this._minNum, this._value));
                do {
                    try {
                        if (this._isGroup) {
                            this._group = JSON.parse(this._groupStr);
                            this._isErr = !this._group;
                            if (this._isErr) {
                                this.doError("错误数据");
                                break;
                            }
                            var i = lodash.findIndex(this._group, { v: this._value });
                            if (i < 0) {
                                i = Math.min(this._group.length - 1, Math.max(0, i));
                                this._value = Number(this._group[i].v);
                            }
                            this.setGroupValue(this._value);
                        }
                        else {
                            this.setValue(this._value);
                        }
                    }
                    catch (err) {
                        this._isErr = true;
                        if (this._isErr) {
                            this.doError("错误数据");
                            break;
                        }
                    }
                } while (false);
                this.doBindeChangeEvent();
                this.updateUI();
            };
            ;
            UINumBox.prototype.doError = function (str) {
                this.checkBtnState(0, 0, 0, true);
                this._valueStr = str;
            };
            UINumBox.prototype.setValue = function (text) {
                this.checkBtnState(this._value, this._maxNum, this._minNum);
                this._valueStr = this._value + this._unit;
            };
            UINumBox.prototype.setGroupValue = function (value) {
                var _this = this;
                var index = lodash.findIndex(this._group, { v: this._value });
                if (this._group.length < 1) {
                    this.doError("错误值");
                    return;
                }
                if (index < 0 || index >= this._group.length) {
                    var pv_1 = this.getGroupValueByValueProtect(value);
                    if (pv_1 == null) {
                        this.doError("错误值");
                        return;
                    }
                    setTimeout(function () {
                        _this.doValueChangeEvent(pv_1);
                    }, 1);
                    return;
                }
                this.checkBtnState(index, this._group.length - 1, 0);
                this._valueStr = this._group[index].n;
            };
            UINumBox.prototype.checkBtnState = function (i, max, min, a) {
                if (a === void 0) { a = false; }
                if (a || this.__lock) {
                    this.btn_add.setBright(false);
                    this.btn_add.setTouchEnabled(false);
                    this.btn_sub.setBright(false);
                    this.btn_sub.setTouchEnabled(false);
                    return;
                }
                this.btn_add.setBright(!(i >= max));
                this.btn_add.setTouchEnabled(!(i >= max));
                this.btn_sub.setBright(!(i <= min));
                this.btn_sub.setTouchEnabled(!(i <= min));
            };
            UINumBox.prototype.updateUI = function () {
                this.updateText();
            };
            UINumBox.prototype.updateText = function () {
                var text = this._valueStr;
                if (!cc.colorEqual(cc.color(this._fontColor), this.label.getTextColor())
                    || this._fontName != this.label.getFontName()
                    || this._fontSize != this.label.getFontSize()) {
                    this.label = Patch.ChangeTextColor(this.label, text, cc.color(this._fontColor), this._fontName, this._fontSize);
                }
                else {
                    if (text != this.label.getString()) {
                        this.label.setString(text);
                    }
                }
            };
            UINumBox.prototype.getInputValue = function () {
                return this._value;
            };
            UINumBox.prototype.onInputValueChange = function (name, uuid, value, ext, life, extAttr) {
                // this.__attr.checked = e.data
                if (ext == 'lock') {
                    this.__lock = true;
                    if (!lodash.isEmpty(value)) {
                        this._value = Number(value) || 0;
                        ;
                    }
                }
                else if (ext == 'unlock') {
                    this.__lock = false;
                    if (!lodash.isEmpty(value)) {
                        this._value = Number(value) || 0;
                        ;
                    }
                }
                else {
                    this._value = Number(value) || 0;
                    ;
                }
                if (this._isGroup) {
                    this.setGroupValue(this._value);
                }
                else {
                    this.setValue(this._value);
                }
                this.updateUI();
            };
            UINumBox.prototype.getGroupIndexByValue = function (value) {
                var index = 0;
                for (var i = 0; i < this._group.length; i++) {
                    var _a = this._group[i], n = _a.n, v = _a.v;
                    if (Number(v) === Number(value)) {
                        index = i;
                        break;
                    }
                }
                return index;
            };
            UINumBox.prototype.getGroupNextValue = function () {
                var index = this.getGroupIndexByValue(this._value);
                index = Math.max(Math.min(index + 1, this._group.length - 1), 0);
                var _a = this._group[index], n = _a.n, v = _a.v;
                return Number(v);
            };
            UINumBox.prototype.getGroupPrevValue = function () {
                var index = this.getGroupIndexByValue(this._value);
                index = Math.max(Math.min(index - 1, this._group.length - 1), 0);
                var _a = this._group[index], n = _a.n, v = _a.v;
                return Number(v);
            };
            UINumBox.prototype.getGroupValueByValueProtect = function (value) {
                if (this._group.length <= 0) {
                    return null;
                }
                var index = this.getGroupIndexByValue(value);
                index = Math.max(Math.min(index, this._group.length - 1), 0);
                var _a = this._group[index], n = _a.n, v = _a.v;
                return Number(v);
            };
            UINumBox.prototype.onSubClick = function () {
                if (this.__lock) {
                    return;
                }
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                var value = 0;
                if (this._isGroup) {
                    value = this.getGroupPrevValue();
                }
                else {
                    value = Math.min(this._maxNum, Math.max(this._minNum, this._value - this._inc));
                }
                this.doValueChangeEvent(value);
            };
            ;
            UINumBox.prototype.onAddClick = function () {
                if (this.__lock) {
                    return;
                }
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                var value = 0;
                if (this._isGroup) {
                    value = this.getGroupNextValue();
                }
                else {
                    value = Math.min(this._maxNum, Math.max(this._minNum, this._value + this._inc));
                }
                this.doValueChangeEvent(value);
            };
            ;
            return UINumBox;
        }(RDom.UIInput));
        RDom.UINumBox = UINumBox;
    })(RDom = common.RDom || (common.RDom = {}));
})(common || (common = {}));
/// <reference path="common.RDomBaseNode.ts" />
var common;
(function (common) {
    var RDom;
    (function (RDom) {
        var UIRadioBox = /** @class */ (function (_super) {
            __extends(UIRadioBox, _super);
            function UIRadioBox() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._defvalueType = "string";
                _this._valueType = "string";
                return _this;
            }
            UIRadioBox.prototype.initWithNode = function (node, uuid) {
                if (uuid === void 0) { uuid = 0; }
                _super.prototype.initWithNode.call(this, node, uuid);
                this.__nodeType = "radiobox";
            };
            UIRadioBox.prototype.getAttr = function () {
                return lodash.extend({}, _super.prototype.getAttr.call(this), { checked: this._checked, text: this._text, value: this.doValueType(this._value), valueType: this._valueType });
            };
            UIRadioBox.prototype.setAttrAndStyle = function (dattr) {
                if (dattr === void 0) { dattr = {}; }
                var attr = dattr || {};
                _super.prototype.setAttrAndStyle.call(this, attr);
                this._text = lodash.isString(attr.text) ? attr.text : this._text || this._defText;
                this._checked = !!attr.checked;
                this._valueType = attr.valueType || this._defvalueType;
                this._value = this.doValueType(attr.value == undefined ? this._defvalue : attr.value);
                !attr.isEdit && this.doBindeChangeEvent();
                this.updateUI();
            };
            ;
            UIRadioBox.prototype.doValueType = function (value) {
                if (this._valueType == "string") {
                    return value + "";
                }
                else if (this._valueType == "number") {
                    var v = Number(value);
                    return lodash.isNumber(v) ? v : 0;
                }
                return "";
            };
            UIRadioBox.prototype.onInputValueChange = function (name, uuid, value, ext, life, extAttr) {
                if (ext == 'lock') {
                    this.__lock = true;
                }
                else if (ext == 'unlock') {
                    this.__lock = false;
                }
                this._checked = (this.doValueType(this._value) == this.doValueType(value));
                // this.__attr.checked = e.data;
                this.updateUI();
                // this.doForEvent(uuid, this._checked, force, life);
            };
            UIRadioBox.prototype.onClick = function () {
                if (this.__lock) {
                    return;
                }
                if (this._checked) {
                    return;
                }
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.doValueChangeEvent(this.doValueType(this._value));
            };
            ;
            return UIRadioBox;
        }(RDom.UICheckBox));
        RDom.UIRadioBox = UIRadioBox;
    })(RDom = common.RDom || (common.RDom = {}));
})(common || (common = {}));
/// <reference path="common.RDomBaseNode.ts" />
var common;
(function (common) {
    var RDom;
    (function (RDom) {
        var UITagBox = /** @class */ (function (_super) {
            __extends(UITagBox, _super);
            function UITagBox() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.lbbg = null;
                _this.label = null;
                _this._defText = "ggggG";
                _this._text = "";
                _this._defbackgroudColor = "#FF0000";
                _this._backgroudColor = "#FF0000";
                return _this;
            }
            UITagBox.prototype.initWithNode = function (node, uuid) {
                if (uuid === void 0) { uuid = 0; }
                this.__nodeType = "tagbox";
                _super.prototype.initWithNode.call(this, node, uuid);
                this._deffontColor = "#ffffff";
                this._deffontSize = 22;
                this.label = ccui.helper.seekWidgetByName(this.node, "label");
                this.label.ignoreContentAdaptWithSize(true);
                this.lbbg = ccui.helper.seekWidgetByName(this.node, "lbbg");
            };
            UITagBox.prototype.getAttr = function () {
                return lodash.extend({}, _super.prototype.getAttr.call(this), { text: this._text, backgroudColor: this._backgroudColor });
            };
            UITagBox.prototype.setAttrAndStyle = function (dattr) {
                if (dattr === void 0) { dattr = {}; }
                var attr = dattr || {};
                _super.prototype.setAttrAndStyle.call(this, attr);
                this._backgroudColor = attr.backgroudColor || this._backgroudColor || this._defbackgroudColor;
                this._text = lodash.isString(attr.text) ? attr.text : this._text || this._defText;
                !attr.isEdit && this.doBindeChangeEvent();
                this.updateUI();
            };
            ;
            UITagBox.prototype.onInputValueChange = function (name, uuid, value, ext, life, extAttr) {
                this._text = lodash.isString(value) ? value : this._text || this._defText;
                this.updateUI();
            };
            UITagBox.prototype.updateUI = function () {
                var text = this._text || "";
                if (!cc.colorEqual(cc.color(this._fontColor), this.label.getTextColor())
                    || this._fontName != this.label.getFontName()
                    || this._fontSize != this.label.getFontSize()) {
                    this.label = Patch.ChangeTextColor(this.label, text, cc.color(this._fontColor), this._fontName, this._fontSize);
                }
                else {
                    if (text != this.label.getString()) {
                        this.label.setString(text);
                    }
                }
                if (!cc.colorEqual(cc.color(this._backgroudColor), this.lbbg.getColor())) {
                    this.lbbg.setColor(cc.color(this._backgroudColor));
                }
                var strSize = this.label.getContentSize();
                var boxwidth = Math.max(80, strSize.width + 10);
                var boxheight = Math.max(32, strSize.height);
                this.label.setPosition(this.getContentSize().width * .5, this.getContentSize().height * .5);
                this.lbbg.setPosition(this.getContentSize().width * .5, this.getContentSize().height * .5);
                this.lbbg.setContentSize(boxwidth, boxheight);
            };
            ;
            return UITagBox;
        }(RDom.UIInput));
        RDom.UITagBox = UITagBox;
    })(RDom = common.RDom || (common.RDom = {}));
})(common || (common = {}));
/// <reference path="common.RDomBaseNode.ts" />
var common;
(function (common) {
    var RDom;
    (function (RDom) {
        var UITipBox = /** @class */ (function (_super) {
            __extends(UITipBox, _super);
            function UITipBox() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.tip_alert = null;
                _this.label = null;
                _this.mask = null;
                _this._defText = "ggggG";
                _this._text = "";
                return _this;
            }
            UITipBox.prototype.initWithNode = function (node, uuid) {
                if (uuid === void 0) { uuid = 0; }
                this.__nodeType = "tipbox";
                _super.prototype.initWithNode.call(this, node, uuid);
                this._deffontColor = "#ffffff";
                this.label = ccui.helper.seekWidgetByName(this.node, "tip_alert_label");
                this.label.ignoreContentAdaptWithSize(true);
                this.tip_alert = ccui.helper.seekWidgetByName(this.node, "tip_alert");
                this.node.on(kaayou.TouchEvent.TouchEnd, this.onClick, this);
                this.tip_alert.setVisible(false);
            };
            UITipBox.prototype.getAttr = function () {
                return lodash.extend({}, _super.prototype.getAttr.call(this), { text: this._text });
            };
            UITipBox.prototype.setAttrAndStyle = function (dattr) {
                if (dattr === void 0) { dattr = {}; }
                var attr = dattr || {};
                _super.prototype.setAttrAndStyle.call(this, attr);
                this._text = lodash.isString(attr.text) ? attr.text : this._text || this._defText;
                this._text = this._text.replace("\\n", "\n");
                // this.doBindeChangeEvent();
                this.updateUI();
            };
            ;
            UITipBox.prototype.onInputValueChange = function (name, uuid, value, ext, life, extAttr) {
                this._text = lodash.isString(value) ? value : this._text || this._defText;
                this.updateUI();
            };
            UITipBox.prototype.onClick = function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.tip_alert.setVisible(true);
                this.mask = ccui.Layout.create();
                this.mask.setTouchEnabled(true);
                this.mask.setAnchorPoint(0.5, 0.5);
                this.mask.setContentSize(cc.winSize.width * 2, cc.winSize.height * 2);
                this.mask.setPosition(cc.winSize.width * .5, cc.winSize.height * .5);
                // this.mask.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                // this.mask.setBackGroundColor(cc.color("#000000"));
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.mask, 9999);
                this.mask.on(kaayou.TouchEvent.TouchEnd, this.onMaskClick, this);
            };
            ;
            UITipBox.prototype.onMaskClick = function () {
                var _this = this;
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                this.tip_alert.setVisible(false);
                if (this.mask) {
                    this.mask.removeFromParent(true);
                    setTimeout(function () {
                        _this.mask = null;
                    }, 1);
                }
            };
            ;
            UITipBox.prototype.updateUI = function () {
                var text = this._text || "";
                if (!cc.colorEqual(cc.color(this._fontColor), this.label.getTextColor())
                    || this._fontName != this.label.getFontName()
                    || this._fontSize != this.label.getFontSize()) {
                    this.label = Patch.ChangeTextColor(this.label, text, cc.color(this._fontColor), this._fontName, this._fontSize);
                }
                else {
                    if (text != this.label.getString()) {
                        this.label.setString(text);
                    }
                }
                var strSize = this.label.getContentSize();
                var boxwidth = Math.max(230, strSize.width + 40);
                var boxheight = Math.max(85, 45 + strSize.height);
                this.tip_alert.setContentSize(boxwidth, boxheight);
                this.label.setPosition(boxwidth * 0.5, boxheight * 0.6);
            };
            ;
            return UITipBox;
        }(RDom.UIInput));
        RDom.UITipBox = UITipBox;
    })(RDom = common.RDom || (common.RDom = {}));
})(common || (common = {}));
