/// <reference path="../Lobby/lobby.CreateRoomPanel.d.ts" />
declare namespace tea {
    class CreateRoomPanelMgr {
        static __INS__: CreateRoomPanelMgr;
        static getInstance(): CreateRoomPanelMgr;
        __selfPanel: CreateRoomPanel;
        _gold: number;
        onUpdateUserInfo(data: Data_Uerinfo): void;
        init(): boolean;
        getPanel(create?: boolean): CreateRoomPanel;
    }
    class CreateRoomPanel extends lobby.CreateRoomPanel {
        constructor();
        isDownload(): boolean;
        getModuleName(): string;
    }
}
