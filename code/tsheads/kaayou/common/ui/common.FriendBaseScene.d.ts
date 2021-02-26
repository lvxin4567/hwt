declare namespace common {
    abstract class FriendBaseScene<IFriendModT extends common.mod.friendBaseMod<mod.IFriendGame_User_Info>, IPlayerLayerT extends common.IPlayerLayer> extends kaayou.kScene {
        curMod: IFriendModT;
        gameState: number;
        playerLayer: Array<IPlayerLayerT>;
        readyTime: ccui.Text;
        comeTime: number;
        btn_menu: ccui.Button;
        btn_chat: ccui.Button;
        btn_mic: ccui.Button;
        btn_gps: ccui.Button;
        btn_ready: ccui.Button;
        btn_invite: ccui.Button;
        ksrkj: ccui.ImageView;
        tog_ksrkj2: ccui.CheckBox;
        tog_ksrkj3: ccui.CheckBox;
        inviteLayer: gameShareLayer;
        iGVoiceRoomId: number;
        bGVoiceMicStaCur: boolean;
        bGVoiceStaMicNext: boolean;
        bGVoiceSpeakerStaCur: boolean;
        bGVoiceStaSpeakerNext: boolean;
        iGvoiceStaCnt: number;
        constructor();
        initUI(): void;
        OnUpdateGVoiceEnterRoom(): void;
        onReEnter(): void;
        onReExit(): void;
        /**
         *
         * @param data gvoiceSta扬声器  gvoiceSpeaker
         * 因为已经有很多游戏绑定了这个消息  注意当第二个参数没传递的情况  当没传麦克风参数时候  直接取是否关闭扬声器
         */
        setGVoiceMicAndSpeakerSta(data: {
            gvoiceSta: boolean;
            gvoiceMic: boolean;
        }): void;
        setGVoiceForBidMemberVoice(data: {
            index: number;
            isForbid: boolean;
        }): void;
        bindGVoiceEvents(): void;
        offGVoiceEvents(): void;
        OnGvoiceJoinRoomOKFunc(e: kaayou.Event): void;
        OnGvoiceMemberVoiceFunc(e: kaayou.Event): void;
        OnGvoiceOpenMicOKFunc(): void;
        OnGvoiceCloseMicOKFunc(): void;
        OnGvoiceOpenSpeakerOKFunc(): void;
        OnGvoiceCloseSpeakerOKFunc(): void;
        OnUpdateGVoiceMicAndSpeaker(): void;
        bindUiEvent(): void;
        bindGameBgEvent(): void;
        onReadyClick(event: kaayou.CheckEvent): void;
        onInviteClick(event: kaayou.CheckEvent): void;
        onMenuClick(event: kaayou.CheckEvent): void;
        onChatClick(event: kaayou.CheckEvent): void;
        onGpsClick(event: kaayou.CheckEvent): void;
        onToggleClick(event: kaayou.CheckEvent): void;
        bindModEvents(): void;
        showKSRKJ(data: {
            num: number;
        }): void;
        hideKSRKJ(data: {
            b: boolean;
        }): void;
        unSelect(): void;
        cleanUp(): void;
        onUpdatePlayer(data: {
            Players: Array<common.mod.IGame_User_Info>;
        }): void;
        onUpdateGVoiceMemberSta(data: {
            index: number;
            gvoicesta: number;
        }): void;
        onIenterRoom(): boolean;
        broadcastUseMagic(data: {
            type: number;
            dwindex: number;
            dwtoindex: number;
            index: number;
        }): void;
        showSkeleton(aniStr: string, pos: cc.Point): void;
        onMicChat(data: {
            index: number;
            start: boolean;
        }): void;
        onLastPlayerCome(data: {
            leftTime: number;
        }): void;
        onIready(): void;
        onAutoReady(): void;
    }
}
