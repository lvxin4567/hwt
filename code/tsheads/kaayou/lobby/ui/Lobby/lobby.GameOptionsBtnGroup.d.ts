declare namespace lobby {
    class GameOptionsBtnGroup extends kaayou.Layer {
        btnCreate: ccui.Button;
        btnJoinTea: ccui.Button;
        btnMoreGame: ccui.Button;
        btnQuickTeahouse: ccui.Button;
        createTeahouseBtn: ccui.Button;
        gameButtons: Array<ccui.ImageView>;
        gameTexts: Array<ccui.TextBMFont>;
        gameList: Array<{
            key: string;
            name: string;
        }>;
        ivBoli: ccui.ImageView;
        ivMask: ccui.ImageView;
        ivMao: ccui.ImageView;
        joinRoomBtn: ccui.Button;
        joinRoomBtn1: ccui.Button;
        ndShortcut: ccui.Layout;
        saIcon: ccui.TextAtlas;
        spMask: cc.Sprite;
        tbMember: ccui.Text;
        tbTable: ccui.Text;
        goldEnter_layout: ccui.Layout;
        goldEnter_layout2: ccui.Layout;
        quick_data: any;
        btn_ddz: ccui.Button;
        goldEnter_Ddz: ccui.Layout;
        constructor();
        getGameList(res: IPackageItem[]): Promise<void>;
        initUI(): void;
        doShowQuickTeaInfo(data: any): void;
        setQuickInfo(data: any): void;
        onClickCreateRoom(key: string): void;
        onConfigUpdate(): void;
    }
}
